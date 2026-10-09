# Call Audio Transcript: Test 7: Loan Amount > ₹75 Lakh with Counter-Offer Acceptance

- **Scenario Category**: Edge Case / Counter-Offer
- **Customer Name**: Rajesh Singhania
- **Expected Outcome**: `QUALIFIED_HANDOFF_AT_75L`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Rajesh Singhania, good day! I am Priya calling from Home Credit. Am I speaking with Rajesh Singhania?"

👤 **Customer (Rajesh Singhania)**: "Yes, Rajesh speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Rajesh Singhania)**: "Yes, go ahead."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Rajesh Singhania)**: "Commercial showroom."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Rajesh Singhania)**: "Sole ownership."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Rajesh Singhania)**: "Yes, originals are available."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Rajesh Singhania)**: "I need 90 lakhs for my business expansion."

🤖 **AI Voice Agent (Priya)**: "The current pre-approved offer is available for up to a maximum limit of ₹75 lakhs. Would you like to proceed with the maximum eligible amount of ₹75 lakhs?"

👤 **Customer (Rajesh Singhania)**: "Yes, that's fine, I can proceed with the maximum 75 lakhs."

🤖 **AI Voice Agent (Priya)**: "Got it. Is your monthly income credited directly to your bank account, or is it received in cash?"

👤 **Customer (Rajesh Singhania)**: "Self-employed business owner, bank account receipts."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Rajesh Singhania)**: "Valuation is about 2.5 crore."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Rajesh Singhania)**: "Tenure of 12 years."

🤖 **AI Voice Agent (Priya)**: "Congratulations Rajesh Singhania! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

## Final State Snapshot

```json
{
  "verified": true,
  "is_busy": false,
  "callback_time": null,
  "existing_loan_detected": null,
  "transfer_specialist_routed": false,
  "property_type": "commercial",
  "ownership_status": "sole",
  "documents_available": true,
  "loan_amount": 7500000,
  "loan_amount_pending_counter": false,
  "occupation": "self-employed",
  "income_mode": "bank",
  "market_value": "\u20b92.5 Crore",
  "tenure": 12,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
