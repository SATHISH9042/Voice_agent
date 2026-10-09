"""
AI Voice Agent Engine for Home Credit
Implements the 5-Layer Conversational Architecture and "First Missing Question" Algorithm
as specified in the SalesAgents AI Assignment Guide.
"""

import re
from typing import Dict, Any, List, Optional, Tuple

class AgentContext:
    def __init__(
        self,
        company_name: str = "Home Credit",
        customer_name: str = "Rahul Sharma",
        agent_name: str = "Priya",
        agent_gender: str = "Female",
        language_to_speak: str = "English",
        current_date: str = "October 24, 2024",
        current_day: str = "Thursday",
        current_time: str = "11:30 AM",
        rag_context: str = "Home Credit is an established non-banking financial institution offering trusted personal finance and secured loans across India. Branch office hours are 9:30 AM to 6:30 PM, Monday through Saturday."
    ):
        self.company_name = company_name
        self.customer_name = customer_name
        self.agent_name = agent_name
        self.agent_gender = agent_gender
        self.language_to_speak = language_to_speak
        self.current_date = current_date
        self.current_day = current_day
        self.current_time = current_time
        self.rag_context = rag_context

class QualificationState:
    def __init__(self):
        # Verification & Stage 1-4 State
        self.verified: Optional[bool] = None
        self.is_busy: Optional[bool] = None
        self.callback_time: Optional[str] = None
        self.offer_acknowledged: Optional[bool] = None
        self.existing_loan_detected: Optional[bool] = None
        self.transfer_specialist_routed: bool = False
        
        # 7 Core Eligibility Variables
        self.property_type: Optional[str] = None          # 'residential' | 'commercial' | 'industrial' | 'agricultural'
        self.ownership_status: Optional[str] = None      # 'sole' | 'joint'
        self.documents_available: Optional[bool] = None  # True (Originals) | False (Photocopy/Unavailable)
        self.loan_amount: Optional[int] = None           # in INR
        self.loan_amount_pending_counter: bool = False    # When > 75L was proposed, waiting for agreement
        self.occupation: Optional[str] = None            # 'salaried' | 'self-employed' | 'other'
        self.income_mode: Optional[str] = None           # 'bank' | 'cash'
        self.market_value: Optional[str] = None          # Customer estimate
        self.tenure: Optional[int] = None                # in years (3 - 15)
        
        # Status flags
        self.disqualified: bool = False
        self.disqualification_reason: Optional[str] = None
        self.handoff_ready: bool = False
        self.call_ended: bool = False
        self.current_stage: str = "GREETING"             # GREETING, AVAILABILITY, OFFER, CHECKLIST, DISQUALIFIED, TRANSFER, HANDOFF, ENDED

    def to_dict(self) -> Dict[str, Any]:
        return {
            "verified": self.verified,
            "is_busy": self.is_busy,
            "callback_time": self.callback_time,
            "existing_loan_detected": self.existing_loan_detected,
            "transfer_specialist_routed": self.transfer_specialist_routed,
            "property_type": self.property_type,
            "ownership_status": self.ownership_status,
            "documents_available": self.documents_available,
            "loan_amount": self.loan_amount,
            "loan_amount_pending_counter": self.loan_amount_pending_counter,
            "occupation": self.occupation,
            "income_mode": self.income_mode,
            "market_value": self.market_value,
            "tenure": self.tenure,
            "disqualified": self.disqualified,
            "disqualification_reason": self.disqualification_reason,
            "handoff_ready": self.handoff_ready,
            "call_ended": self.call_ended,
            "current_stage": self.current_stage
        }


class VoiceAgentEngine:
    def __init__(self, context: Optional[AgentContext] = None):
        self.context = context or AgentContext()
        self.state = QualificationState()
        self.history: List[Dict[str, str]] = []

    def get_initial_greeting(self) -> str:
        self.state.current_stage = "GREETING"
        greeting = (
            f"Hello {self.context.customer_name}, good day! "
            f"I am {self.context.agent_name} calling from {self.context.company_name}. "
            f"Am I speaking with {self.context.customer_name}?"
        )
        self.history.append({"speaker": "Agent", "text": greeting})
        return greeting

    def process_utterance(self, user_text: str) -> str:
        """Processes customer utterance according to the 5-layer architecture and First Missing Question algorithm."""
        if self.state.call_ended:
            return "This call has already concluded. Thank you for contacting Home Credit!"

        self.history.append({"speaker": "Customer", "text": user_text})
        text_lower = user_text.lower().strip()

        # -------------------------------------------------------------
        # 1. HANDLE DIVERSION: INTEREST RATE QUERY (Zero Hallucination)
        # -------------------------------------------------------------
        roi_query = any(q in text_lower for q in ["interest rate", "roi", "rate of interest", "what percent", "percentage"])
        roi_preface = ""
        if roi_query:
            roi_preface = (
                "Regarding interest rates, our exact rates are personalized based on your property valuation "
                "and financial profile, and will be provided directly by our Senior Loan Expert after this brief qualification. "
            )

        # -------------------------------------------------------------
        # 2. HANDLE DIVERSION: RAG / GENERAL COMPANY QUERIES
        # -------------------------------------------------------------
        rag_preface = ""
        if any(q in text_lower for q in ["branch", "office", "timing", "hours", "who are you guys", "about home credit"]):
            rag_preface = f"For your information, {self.context.rag_context} "

        # -------------------------------------------------------------
        # 3. STAGE 1: VERIFICATION
        # -------------------------------------------------------------
        if self.state.verified is None:
            if any(w in text_lower for w in ["yes", "speaking", "this is", "myself", "yeah", "correct", "yep", "i am"]):
                self.state.verified = True
                self.state.current_stage = "AVAILABILITY"
                response = f"{roi_preface}{rag_preface}Great! Do you have a couple of minutes to speak right now?"
                self.history.append({"speaker": "Agent", "text": response})
                return response
            elif any(w in text_lower for w in ["who is calling", "who is this", "why are you calling", "what is this about"]):
                response = (
                    f"I am {self.context.agent_name} from {self.context.company_name}. "
                    f"I'm calling with an exclusive customer loyalty update for {self.context.customer_name}. "
                    f"May I confirm if I am speaking with {self.context.customer_name}?"
                )
                self.history.append({"speaker": "Agent", "text": response})
                return response
            elif any(w in text_lower for w in ["wrong number", "not available", "no", "not him", "not her"]):
                self.state.verified = False
                self.state.call_ended = True
                self.state.current_stage = "ENDED"
                response = f"My apologies for the inconvenience. Thank you for your time with {self.context.company_name}. Have a good day!"
                self.history.append({"speaker": "Agent", "text": response})
                return response

        # -------------------------------------------------------------
        # 4. STAGE 2: AVAILABILITY / BUSY CHECK
        # -------------------------------------------------------------
        if self.state.is_busy is None:
            busy_indicators = ["busy", "meeting", "driving", "call later", "call me back", "not right now", "not free", "in a hurry"]
            if any(b in text_lower for b in busy_indicators):
                self.state.is_busy = True
                self.state.current_stage = "AVAILABILITY"
                response = "I completely understand! What would be a convenient date and time for us to call you back?"
                self.history.append({"speaker": "Agent", "text": response})
                return response
            elif self.state.is_busy is True and self.state.callback_time is None:
                # User is providing callback time
                self.state.callback_time = user_text
                self.state.call_ended = True
                self.state.current_stage = "ENDED"
                response = f"Thank you, {self.context.customer_name}. We have noted your preferred time of {user_text} and will connect with you then. Have a wonderful day!"
                self.history.append({"speaker": "Agent", "text": response})
                return response
            else:
                # Customer is available
                self.state.is_busy = False
                self.state.current_stage = "OFFER"

        # If busy was confirmed and callback captured, stop
        if self.state.is_busy is True:
            if not self.state.callback_time:
                self.state.callback_time = user_text
                self.state.call_ended = True
                self.state.current_stage = "ENDED"
                response = f"Thank you, {self.context.customer_name}. We have scheduled a callback for {user_text}. Have a great day!"
                self.history.append({"speaker": "Agent", "text": response})
                return response

        # -------------------------------------------------------------
        # 5. STAGE 3 & 4: OFFER PRESENTATION & EXISTING LOAN / EMI CHECK
        # -------------------------------------------------------------
        existing_loan_patterns = [
            "existing loan", "already have a loan", "already got a loan", "already have home loan",
            "reduce my emi", "lower my emi", "reduce emi", "balance transfer", "loan transfer",
            "transfer my loan", "current loan on property"
        ]
        if any(p in text_lower for p in existing_loan_patterns):
            self.state.existing_loan_detected = True
            self.state.transfer_specialist_routed = True
            self.state.call_ended = True
            self.state.current_stage = "TRANSFER"
            response = (
                f"{roi_preface}{rag_preface}Thank you for sharing that, {self.context.customer_name}. "
                "Since you already have an existing loan on this property and are looking for EMI reduction or loan transfer, "
                "this is handled directly by our dedicated Loan Transfer & EMI Specialist. "
                f"I am arranging a direct transfer callback for you. Thank you for your time with {self.context.company_name}!"
            )
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # -------------------------------------------------------------
        # 6. STAGE 5: THE 7 ELIGIBILITY CHECKLIST ITEMS
        # SLOT EXTRACTION (Extract All Slots, Out-of-Order Support)
        # -------------------------------------------------------------

        # Handle pending >75L counter-offer response
        if self.state.loan_amount_pending_counter:
            if any(w in text_lower for w in ["yes", "proceed", "fine", "okay", "ok", "agreed", "75 lakh", "75l"]):
                self.state.loan_amount = 7500000
                self.state.loan_amount_pending_counter = False
            elif any(w in text_lower for w in ["no", "cannot", "won't", "need more", "cancel", "disagree"]):
                self.state.loan_amount_pending_counter = False
                self.state.disqualified = True
                self.state.disqualification_reason = "Customer declined the maximum eligible limit of ₹75 Lakhs."
                self.state.call_ended = True
                self.state.current_stage = "DISQUALIFIED"
                response = (
                    f"Understood, {self.context.customer_name}. Since our maximum pre-approved offer for this program "
                    f"is capped at ₹75 lakhs, we are unable to fulfill a higher amount at this time. "
                    f"Thank you for speaking with {self.context.company_name}!"
                )
                self.history.append({"speaker": "Agent", "text": response})
                return response

        # Slot 1: Property Type
        # Handle contradictions: "residential... actually no agricultural"
        if "agricultural" in text_lower or "farming" in text_lower or "farmland" in text_lower:
            self.state.property_type = "agricultural"
        elif "commercial" in text_lower or "office space" in text_lower or "shop" in text_lower:
            self.state.property_type = "commercial"
        elif "industrial" in text_lower or "factory" in text_lower or "warehouse" in text_lower:
            self.state.property_type = "industrial"
        elif "residential" in text_lower or "house" in text_lower or "flat" in text_lower or "apartment" in text_lower:
            self.state.property_type = "residential"

        # Slot 2: Ownership Status
        if "joint" in text_lower or "brother" in text_lower or "wife" in text_lower or "husband" in text_lower or "co-owned" in text_lower or "partner" in text_lower:
            self.state.ownership_status = "joint"
        elif "sole" in text_lower or "own name" in text_lower or "my name" in text_lower or "single owner" in text_lower or "only me" in text_lower:
            self.state.ownership_status = "sole"

        # Slot 3: Original Documents
        if any(w in text_lower for w in ["photocopy", "photocopies", "xerox", "lost", "missing documents", "don't have original", "do not have original"]):
            self.state.documents_available = False
        elif any(w in text_lower for w in ["original", "originals", "available at home", "with me", "in locker", "yes papers are ready", "yes i have them", "original papers are available"]):
            self.state.documents_available = True
        elif "paper" in text_lower and any(w in text_lower for w in ["have", "yes", "available"]):
            self.state.documents_available = True

        # Slot 6: Market Value (parse first so market value figures are not claimed by loan_amount)
        mv_match = re.search(r'(?:market value|worth|valuation|valued at|approx value|property value)\s*(?:is|about|around|approx)?\s*(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d+)?)\s*(crore|crores|cr|lakh|lakhs|lac|lacs|l)\b', text_lower)
        if mv_match:
            num = mv_match.group(1)
            unit = mv_match.group(2)
            self.state.market_value = f"₹{num} {unit.capitalize()}"
        elif any(k in text_lower for k in ["market value", "worth", "valuation"]):
            # capture any number near market value
            mv_num = re.search(r'(\d+(?:\.\d+)?)\s*(crore|crores|cr|lakh|lakhs|lac|lacs|l)\b', text_lower)
            if mv_num:
                self.state.market_value = f"₹{mv_num.group(1)} {mv_num.group(2).capitalize()}"
        elif "crore" in text_lower and not self.state.market_value and not ("need" in text_lower or "borrow" in text_lower or "loan" in text_lower):
            c_val = re.search(r'(\d+(?:\.\d+)?)\s*(?:crore|crores|cr)', text_lower)
            if c_val:
                self.state.market_value = f"₹{c_val.group(1)} Crore"

        # Slot 4: Desired Loan Amount
        # Extract figures in Lakhs / Crores only if not already claimed by market value
        # or if explicit loan keywords exist
        is_mv_utterance = any(k in text_lower for k in ["market value", "property value", "worth"])
        lakh_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|l)\b', text_lower)
        crore_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:crore|crores|cr)\b', text_lower)

        if not is_mv_utterance or ("need" in text_lower or "loan" in text_lower or "borrow" in text_lower or "require" in text_lower):
            if lakh_match and ("need" in text_lower or "loan" in text_lower or "borrow" in text_lower or "require" in text_lower or self.state.loan_amount is None):
                val = float(lakh_match.group(1)) * 100000
                self.state.loan_amount = int(val)
            elif crore_match and ("loan" in text_lower or "need" in text_lower or "require" in text_lower or "borrow" in text_lower):
                val = float(crore_match.group(1)) * 10000000
                self.state.loan_amount = int(val)

        # Slot 5: Occupation & Income Mode
        if "salaried" in text_lower or "job" in text_lower or "employee" in text_lower or "software" in text_lower or "executive" in text_lower or "working" in text_lower:
            self.state.occupation = "salaried"
        elif "self-employed" in text_lower or "self employed" in text_lower or "business" in text_lower or "freelancer" in text_lower or "practice" in text_lower or "consultant" in text_lower or "architect" in text_lower:
            self.state.occupation = "self-employed"

        if "cash" in text_lower:
            self.state.income_mode = "cash"
        elif any(w in text_lower for w in ["bank", "account", "transfer", "neft", "cheque", "direct deposit", "salary account", "credited to bank"]):
            self.state.income_mode = "bank"

        # Slot 7: Desired Loan Tenure
        tenure_match = re.search(r'(\d+)\s*(?:year|years|yr|yrs)\b', text_lower)
        if tenure_match:
            self.state.tenure = int(tenure_match.group(1))

        # -------------------------------------------------------------
        # 7. BUSINESS RULE EVALUATION & DISQUALIFICATION CHECKS
        # -------------------------------------------------------------

        # Rule 1: Agricultural Disqualification
        if self.state.property_type == "agricultural":
            self.state.disqualified = True
            self.state.disqualification_reason = "Agricultural property is strictly ineligible for Loan Against Property."
            self.state.call_ended = True
            self.state.current_stage = "DISQUALIFIED"
            response = (
                f"{roi_preface}{rag_preface}Thank you for clarifying, {self.context.customer_name}. "
                "Currently, our pre-approved Loan Against Property program is exclusively for residential, commercial, and industrial properties, "
                "and does not support agricultural land. Therefore, we cannot proceed with this offer today. "
                f"We truly appreciate your relationship with {self.context.company_name}!"
            )
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Rule 3: Original Documents Missing Disqualification
        if self.state.documents_available is False:
            self.state.disqualified = True
            self.state.disqualification_reason = "Original property documents are mandatory for verification."
            self.state.call_ended = True
            self.state.current_stage = "DISQUALIFIED"
            response = (
                f"{roi_preface}{rag_preface}Thank you for your honesty, {self.context.customer_name}. "
                "As per regulatory guidelines for Loan Against Property, physical verification of the original property documents is mandatory. "
                "Since originals are not available at this time, we are unable to proceed further with this application. "
                f"Thank you for your time with {self.context.company_name}!"
            )
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Rule 5: Cash Income Disqualification
        if self.state.income_mode == "cash":
            self.state.disqualified = True
            self.state.disqualification_reason = "Cash income mode is strictly ineligible. Income must be credited to a bank account."
            self.state.call_ended = True
            self.state.current_stage = "DISQUALIFIED"
            response = (
                f"{roi_preface}{rag_preface}Thank you for letting me know, {self.context.customer_name}. "
                "To qualify for this Loan Against Property offer, income must be routed through verified bank credit channels. "
                "Because your income is received in cash, we cannot process this specific pre-approved offer. "
                f"We appreciate your time and trust in {self.context.company_name}!"
            )
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Rule 7: Tenure Range Evaluation (3 to 15 years)
        if self.state.tenure is not None:
            if self.state.tenure < 3 or self.state.tenure > 15:
                self.state.disqualified = True
                self.state.disqualification_reason = f"Requested tenure of {self.state.tenure} years is outside eligible window (3–15 years)."
                self.state.call_ended = True
                self.state.current_stage = "DISQUALIFIED"
                response = (
                    f"{roi_preface}{rag_preface}Thank you for sharing your tenure preference, {self.context.customer_name}. "
                    f"Our pre-approved Loan Against Property program offers repayment tenures strictly between 3 to 15 years. "
                    f"Since you are looking for {self.state.tenure} years, we cannot accommodate this tenure under the current scheme. "
                    f"Thank you for speaking with {self.context.company_name}!"
                )
                self.history.append({"speaker": "Agent", "text": response})
                return response

        # Rule 4: Loan Amount > 75 Lakh Counter-Offer Protocol
        if self.state.loan_amount and self.state.loan_amount > 7500000 and not self.state.loan_amount_pending_counter:
            self.state.loan_amount_pending_counter = True
            response = (
                f"{roi_preface}{rag_preface}The current pre-approved offer is available for up to a maximum limit of ₹75 lakhs. "
                "Would you like to proceed with the maximum eligible amount of ₹75 lakhs?"
            )
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # -------------------------------------------------------------
        # 8. THE "FIRST MISSING QUESTION" ALGORITHM
        # -------------------------------------------------------------
        self.state.current_stage = "CHECKLIST"

        # Item 1: Property Type
        if self.state.property_type is None:
            prefix = "Thank you. " if not (roi_preface or rag_preface) else ""
            response = f"{roi_preface}{rag_preface}{prefix}To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Item 2: Ownership Status
        if self.state.ownership_status is None:
            response = f"{roi_preface}{rag_preface}Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Item 3: Original Documents
        if self.state.documents_available is None:
            response = f"{roi_preface}{rag_preface}Thank you. Do you have the original property documents available for physical verification?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Item 4: Desired Loan Amount
        if self.state.loan_amount is None:
            response = f"{roi_preface}{rag_preface}Understood. What is the approximate loan amount you are looking to borrow?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Item 5: Occupation + Income Mode
        if self.state.occupation is None or self.state.income_mode is None:
            if self.state.occupation is None and self.state.income_mode is None:
                response = f"{roi_preface}{rag_preface}Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"
            elif self.state.occupation is None:
                response = f"{roi_preface}{rag_preface}Could you please clarify whether you are salaried or self-employed?"
            else:
                response = f"{roi_preface}{rag_preface}Got it. Is your monthly income credited directly to your bank account, or is it received in cash?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Item 6: Property Market Value
        if self.state.market_value is None:
            response = f"{roi_preface}{rag_preface}Approximately what is the current market value of your property?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # Item 7: Desired Loan Tenure
        if self.state.tenure is None:
            response = f"{roi_preface}{rag_preface}What repayment tenure would you prefer for this loan, between 3 to 15 years?"
            self.history.append({"speaker": "Agent", "text": response})
            return response

        # -------------------------------------------------------------
        # 9. FINAL HANDOFF GATE
        # All 7 questions answered, no disqualifications, no transfers.
        # -------------------------------------------------------------
        self.state.handoff_ready = True
        self.state.call_ended = True
        self.state.current_stage = "HANDOFF"
        handoff_response = (
            f"{roi_preface}{rag_preface}Congratulations {self.context.customer_name}! "
            "Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. "
            "I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, "
            f"customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing {self.context.company_name}, and have a wonderful day!"
        )
        self.history.append({"speaker": "Agent", "text": handoff_response})
        return handoff_response
