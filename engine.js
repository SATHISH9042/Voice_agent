/**
 * AI Voice Agent Engine (JavaScript Client implementation)
 * Implements the 5-Layer Conversational Architecture and "First Missing Question" Algorithm
 * as specified in the SalesAgents AI Assignment Guide for Home Credit.
 */

class AgentContext {
  constructor(options = {}) {
    this.company_name = options.company_name || "Home Credit";
    this.customer_name = options.customer_name || "Rahul Sharma";
    this.agent_name = options.agent_name || "Priya";
    this.agent_gender = options.agent_gender || "Female";
    this.language_to_speak = options.language_to_speak || "English";
    this.current_date = options.current_date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    this.current_day = options.current_day || new Date().toLocaleDateString('en-US', { weekday: 'long' });
    this.current_time = options.current_time || new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    this.rag_context = options.rag_context || "Home Credit is an established non-banking financial institution offering trusted personal finance and secured loans across India. Branch office hours are 9:30 AM to 6:30 PM, Monday through Saturday.";
  }
}

class QualificationState {
  constructor() {
    this.verified = null;
    this.is_busy = null;
    this.callback_time = null;
    this.existing_loan_detected = null;
    this.transfer_specialist_routed = false;

    // 7 Core Eligibility Variables
    this.property_type = null;         // 'residential' | 'commercial' | 'industrial' | 'agricultural'
    this.ownership_status = null;     // 'sole' | 'joint'
    this.documents_available = null; // true (Originals) | false (Photocopy/Unavailable)
    this.loan_amount = null;          // in INR
    this.loan_amount_pending_counter = false;
    this.occupation = null;           // 'salaried' | 'self-employed'
    this.income_mode = null;          // 'bank' | 'cash'
    this.market_value = null;         // Estimated value in INR
    this.tenure = null;               // in years (3 - 15)

    // Status flags
    this.disqualified = false;
    this.disqualification_reason = null;
    this.handoff_ready = false;
    this.call_ended = false;
    this.current_stage = "GREETING";  // GREETING, AVAILABILITY, OFFER, CHECKLIST, DISQUALIFIED, TRANSFER, HANDOFF, ENDED
  }
}

class VoiceAgentEngine {
  constructor(context = null) {
    this.context = context || new AgentContext();
    this.state = new QualificationState();
    this.history = [];
  }

  getInitialGreeting() {
    this.state.current_stage = "GREETING";
    const greeting = `Hello ${this.context.customer_name}, good day! I am ${this.context.agent_name} calling from ${this.context.company_name}. Am I speaking with ${this.context.customer_name}?`;
    this.history.push({ speaker: "Agent", text: greeting });
    return greeting;
  }

  processUtterance(userText) {
    if (this.state.call_ended) {
      return "This call has already concluded. Thank you for contacting Home Credit!";
    }

    this.history.push({ speaker: "Customer", text: userText });
    const textLower = userText.toLowerCase().trim();

    // 1. DIVERSION: Interest Rate Query
    let roiPreface = "";
    if (/interest rate|roi|rate of interest|what percent|percentage/i.test(textLower)) {
      roiPreface = "Regarding interest rates, our exact rates are personalized based on your property valuation and financial profile, and will be provided directly by our Senior Loan Expert after this brief qualification. ";
    }

    // 2. DIVERSION: RAG / General Info Query
    let ragPreface = "";
    if (/branch|office|timing|hours|who are you|about home credit/i.test(textLower)) {
      ragPreface = `For your information, ${this.context.rag_context} `;
    }

    // 3. STAGE 1: VERIFICATION
    if (this.state.verified === null) {
      if (/yes|speaking|this is|myself|yeah|correct|yep|i am/i.test(textLower)) {
        this.state.verified = true;
        this.state.current_stage = "AVAILABILITY";
        const response = `${roiPreface}${ragPreface}Great! Do you have a couple of minutes to speak right now?`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      } else if (/who is calling|who is this|why are you calling|what is this about/i.test(textLower)) {
        const response = `I am ${this.context.agent_name} from ${this.context.company_name}. I'm calling with an exclusive customer loyalty update for ${this.context.customer_name}. May I confirm if I am speaking with ${this.context.customer_name}?`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      } else if (/wrong number|not available|not him|not her/i.test(textLower)) {
        this.state.verified = false;
        this.state.call_ended = true;
        this.state.current_stage = "ENDED";
        const response = `My apologies for the inconvenience. Thank you for your time with ${this.context.company_name}. Have a good day!`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      }
    }

    // 4. STAGE 2: AVAILABILITY / BUSY CHECK
    if (this.state.is_busy === null) {
      const busyIndicators = /busy|meeting|driving|call later|call me back|not right now|not free|in a hurry/i;
      if (busyIndicators.test(textLower)) {
        this.state.is_busy = true;
        this.state.current_stage = "AVAILABILITY";
        const response = "I completely understand! What would be a convenient date and time for us to call you back?";
        this.history.push({ speaker: "Agent", text: response });
        return response;
      } else if (this.state.is_busy === true && !this.state.callback_time) {
        this.state.callback_time = userText;
        this.state.call_ended = true;
        this.state.current_stage = "ENDED";
        const response = `Thank you, ${this.context.customer_name}. We have noted your preferred time of ${userText} and will connect with you then. Have a wonderful day!`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      } else {
        this.state.is_busy = false;
        this.state.current_stage = "OFFER";
      }
    }

    if (this.state.is_busy === true) {
      if (!this.state.callback_time) {
        this.state.callback_time = userText;
        this.state.call_ended = true;
        this.state.current_stage = "ENDED";
        const response = `Thank you, ${this.context.customer_name}. We have scheduled a callback for ${userText}. Have a great day!`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      }
    }

    // 5. STAGE 3 & 4: EXISTING LOAN / EMI TRANSFER DETECTION
    const existingLoanPatterns = /existing loan|already have a loan|already got a loan|already have home loan|reduce my emi|lower my emi|reduce emi|balance transfer|loan transfer|transfer my loan|current loan on property/i;
    if (existingLoanPatterns.test(textLower)) {
      this.state.existing_loan_detected = true;
      this.state.transfer_specialist_routed = true;
      this.state.call_ended = true;
      this.state.current_stage = "TRANSFER";
      const response = `${roiPreface}${ragPreface}Thank you for sharing that, ${this.context.customer_name}. Since you already have an existing loan on this property and are looking for EMI reduction or loan transfer, this is handled directly by our dedicated Loan Transfer & EMI Specialist. I am arranging a direct transfer callback for you. Thank you for your time with ${this.context.company_name}!`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // 6. STAGE 5: SLOT EXTRACTION
    // Counter-Offer for >75L pending response
    if (this.state.loan_amount_pending_counter) {
      if (/yes|proceed|fine|okay|ok|agreed|75 lakh|75l/i.test(textLower)) {
        this.state.loan_amount = 7500000;
        this.state.loan_amount_pending_counter = false;
      } else if (/no|cannot|won't|need more|cancel|disagree/i.test(textLower)) {
        this.state.loan_amount_pending_counter = false;
        this.state.disqualified = true;
        this.state.disqualification_reason = "Customer declined the maximum eligible limit of ₹75 Lakhs.";
        this.state.call_ended = true;
        this.state.current_stage = "DISQUALIFIED";
        const response = `Understood, ${this.context.customer_name}. Since our maximum pre-approved offer for this program is capped at ₹75 lakhs, we are unable to fulfill a higher amount at this time. Thank you for speaking with ${this.context.company_name}!`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      }
    }

    // Slot 1: Property Type (Handles contradiction: agricultural takes precedence if present)
    if (/agricultural|farming|farmland/i.test(textLower)) {
      this.state.property_type = "agricultural";
    } else if (/commercial|office space|shop/i.test(textLower)) {
      this.state.property_type = "commercial";
    } else if (/industrial|factory|warehouse/i.test(textLower)) {
      this.state.property_type = "industrial";
    } else if (/residential|house|flat|apartment|villa/i.test(textLower)) {
      this.state.property_type = "residential";
    }

    // Slot 2: Ownership Status
    if (/joint|brother|wife|husband|co-owned|partner/i.test(textLower)) {
      this.state.ownership_status = "joint";
    } else if (/sole|own name|my name|single owner|only me/i.test(textLower)) {
      this.state.ownership_status = "sole";
    }

    // Slot 3: Original Documents
    if (/photocopy|photocopies|xerox|lost|missing documents|don't have original|do not have original/i.test(textLower)) {
      this.state.documents_available = false;
    } else if (/original|originals|available at home|with me|in locker|papers are ready|i have them|papers are available/i.test(textLower)) {
      this.state.documents_available = true;
    } else if (/paper/i.test(textLower) && /have|yes|available/i.test(textLower)) {
      this.state.documents_available = true;
    }

    // Slot 6: Market Value (Parsed before Loan Amount so valuation is disambiguated)
    const mvMatch = textLower.match(/(?:market value|worth|valuation|valued at|approx value|property value)\s*(?:is|about|around|approx)?\s*(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d+)?)\s*(crore|crores|cr|lakh|lakhs|lac|lacs|l)\b/i);
    if (mvMatch) {
      this.state.market_value = `₹${mvMatch[1]} ${mvMatch[2].charAt(0).toUpperCase() + mvMatch[2].slice(1)}`;
    } else if (/market value|worth|valuation/i.test(textLower)) {
      const anyNum = textLower.match(/(\d+(?:\.\d+)?)\s*(crore|crores|cr|lakh|lakhs|lac|lacs|l)\b/i);
      if (anyNum) {
        this.state.market_value = `₹${anyNum[1]} ${anyNum[2].charAt(0).toUpperCase() + anyNum[2].slice(1)}`;
      }
    } else if (/crore|cr\b/i.test(textLower) && !this.state.market_value && !(/need|borrow|loan/i.test(textLower))) {
      const crVal = textLower.match(/(\d+(?:\.\d+)?)\s*(?:crore|crores|cr)/i);
      if (crVal) {
        this.state.market_value = `₹${crVal[1]} Crore`;
      }
    }

    // Slot 4: Desired Loan Amount
    const isMvUtterance = /market value|property value|worth/i.test(textLower);
    const lakhMatch = textLower.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|l)\b/i);
    const croreMatch = textLower.match(/(\d+(?:\.\d+)?)\s*(?:crore|crores|cr)\b/i);

    if (!isMvUtterance || /need|loan|borrow|require/i.test(textLower)) {
      if (lakhMatch && (/need|loan|borrow|require/i.test(textLower) || this.state.loan_amount === null)) {
        this.state.loan_amount = Math.round(parseFloat(lakhMatch[1]) * 100000);
      } else if (croreMatch && /loan|need|require|borrow/i.test(textLower)) {
        this.state.loan_amount = Math.round(parseFloat(croreMatch[1]) * 10000000);
      }
    }

    // Slot 5: Occupation & Income Mode
    if (/salaried|job|employee|software|executive|working/i.test(textLower)) {
      this.state.occupation = "salaried";
    } else if (/self-employed|self employed|business|freelancer|practice|consultant|architect/i.test(textLower)) {
      this.state.occupation = "self-employed";
    }

    if (/cash/i.test(textLower)) {
      this.state.income_mode = "cash";
    } else if (/bank|account|transfer|neft|cheque|direct deposit|salary account|credited to bank/i.test(textLower)) {
      this.state.income_mode = "bank";
    }

    // Slot 7: Desired Loan Tenure
    const tenureMatch = textLower.match(/(\d+)\s*(?:year|years|yr|yrs)\b/i);
    if (tenureMatch) {
      this.state.tenure = parseInt(tenureMatch[1], 10);
    }

    // 7. BUSINESS RULE EVALUATION & DISQUALIFICATION CHECKS

    // Rule 1: Agricultural Disqualification
    if (this.state.property_type === "agricultural") {
      this.state.disqualified = true;
      this.state.disqualification_reason = "Agricultural property is strictly ineligible for Loan Against Property.";
      this.state.call_ended = true;
      this.state.current_stage = "DISQUALIFIED";
      const response = `${roiPreface}${ragPreface}Thank you for clarifying, ${this.context.customer_name}. Currently, our pre-approved Loan Against Property program is exclusively for residential, commercial, and industrial properties, and does not support agricultural land. Therefore, we cannot proceed with this offer today. We truly appreciate your relationship with ${this.context.company_name}!`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Rule 3: Missing Documents Disqualification
    if (this.state.documents_available === false) {
      this.state.disqualified = true;
      this.state.disqualification_reason = "Original property documents are mandatory for verification.";
      this.state.call_ended = true;
      this.state.current_stage = "DISQUALIFIED";
      const response = `${roiPreface}${ragPreface}Thank you for your honesty, ${this.context.customer_name}. As per regulatory guidelines for Loan Against Property, physical verification of the original property documents is mandatory. Since originals are not available at this time, we are unable to proceed further with this application. Thank you for your time with ${this.context.company_name}!`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Rule 5: Cash Income Disqualification
    if (this.state.income_mode === "cash") {
      this.state.disqualified = true;
      this.state.disqualification_reason = "Cash income mode is strictly ineligible. Income must be credited to a bank account.";
      this.state.call_ended = true;
      this.state.current_stage = "DISQUALIFIED";
      const response = `${roiPreface}${ragPreface}Thank you for letting me know, ${this.context.customer_name}. To qualify for this Loan Against Property offer, income must be routed through verified bank credit channels. Because your income is received in cash, we cannot process this specific pre-approved offer. We appreciate your time and trust in ${this.context.company_name}!`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Rule 7: Tenure Range Evaluation (3 to 15 years)
    if (this.state.tenure !== null) {
      if (this.state.tenure < 3 || this.state.tenure > 15) {
        this.state.disqualified = true;
        this.state.disqualification_reason = `Requested tenure of ${this.state.tenure} years is outside eligible window (3–15 years).`;
        this.state.call_ended = true;
        this.state.current_stage = "DISQUALIFIED";
        const response = `${roiPreface}${ragPreface}Thank you for sharing your tenure preference, ${this.context.customer_name}. Our pre-approved Loan Against Property program offers repayment tenures strictly between 3 to 15 years. Since you are looking for ${this.state.tenure} years, we cannot accommodate this tenure under the current scheme. Thank you for speaking with ${this.context.company_name}!`;
        this.history.push({ speaker: "Agent", text: response });
        return response;
      }
    }

    // Rule 4: Loan Amount > 75 Lakh Counter-Offer
    if (this.state.loan_amount && this.state.loan_amount > 7500000 && !this.state.loan_amount_pending_counter) {
      this.state.loan_amount_pending_counter = true;
      const response = `${roiPreface}${ragPreface}The current pre-approved offer is available for up to a maximum limit of ₹75 lakhs. Would you like to proceed with the maximum eligible amount of ₹75 lakhs?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // 8. THE "FIRST MISSING QUESTION" ALGORITHM
    this.state.current_stage = "CHECKLIST";

    // Item 1: Property Type
    if (this.state.property_type === null) {
      const prefix = (!roiPreface && !ragPreface) ? "Thank you. " : "";
      const response = `${roiPreface}${ragPreface}${prefix}To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Item 2: Ownership Status
    if (this.state.ownership_status === null) {
      const response = `${roiPreface}${ragPreface}Got that. Is this property in your sole ownership, or is it jointly owned with someone else?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Item 3: Original Documents
    if (this.state.documents_available === null) {
      const response = `${roiPreface}${ragPreface}Thank you. Do you have the original property documents available for physical verification?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Item 4: Desired Loan Amount
    if (this.state.loan_amount === null) {
      const response = `${roiPreface}${ragPreface}Understood. What is the approximate loan amount you are looking to borrow?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Item 5: Occupation + Income Mode
    if (this.state.occupation === null || this.state.income_mode === null) {
      let response = "";
      if (this.state.occupation === null && this.state.income_mode === null) {
        response = `${roiPreface}${ragPreface}Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?`;
      } else if (this.state.occupation === null) {
        response = `${roiPreface}${ragPreface}Could you please clarify whether you are salaried or self-employed?`;
      } else {
        response = `${roiPreface}${ragPreface}Got it. Is your monthly income credited directly to your bank account, or is it received in cash?`;
      }
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Item 6: Property Market Value
    if (this.state.market_value === null) {
      const response = `${roiPreface}${ragPreface}Approximately what is the current market value of your property?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // Item 7: Desired Loan Tenure
    if (this.state.tenure === null) {
      const response = `${roiPreface}${ragPreface}What repayment tenure would you prefer for this loan, between 3 to 15 years?`;
      this.history.push({ speaker: "Agent", text: response });
      return response;
    }

    // 9. FINAL HANDOFF GATE
    this.state.handoff_ready = true;
    this.state.call_ended = true;
    this.state.current_stage = "HANDOFF";
    const handoffResponse = `${roiPreface}${ragPreface}Congratulations ${this.context.customer_name}! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing ${this.context.company_name}, and have a wonderful day!`;
    this.history.push({ speaker: "Agent", text: handoffResponse });
    return handoffResponse;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VoiceAgentEngine, AgentContext, QualificationState };
}
