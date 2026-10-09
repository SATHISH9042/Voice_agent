# Call Audio Transcript: Test 16: Adversarial - RAG Company & Branch Inquiry Diversion

- **Scenario Category**: Adversarial
- **Customer Name**: Pradeep Deshmukh
- **Expected Outcome**: `QUALIFIED_HANDOFF`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Pradeep Deshmukh, good day! I am Priya calling from Home Credit. Am I speaking with Pradeep Deshmukh?"

👤 **Customer (Pradeep Deshmukh)**: "Yes, Pradeep speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Pradeep Deshmukh)**: "Yes, I have time."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Pradeep Deshmukh)**: "Tell me first, where is your nearest office and what are your branch hours?"

🤖 **AI Voice Agent (Priya)**: "For your information, Home Credit is an established non-banking financial institution offering trusted personal finance and secured loans across India. Branch office hours are 9:30 AM to 6:30 PM, Monday through Saturday. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Pradeep Deshmukh)**: "Understood. The property is commercial space."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Pradeep Deshmukh)**: "Sole owner."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Pradeep Deshmukh)**: "Original documents are available."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Pradeep Deshmukh)**: "60 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Pradeep Deshmukh)**: "Self-employed consultant with bank deposit fees."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Pradeep Deshmukh)**: "Valued around 1.8 crore."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Pradeep Deshmukh)**: "12 years."

🤖 **AI Voice Agent (Priya)**: "Congratulations Pradeep Deshmukh! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

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
  "loan_amount": 6000000,
  "loan_amount_pending_counter": false,
  "occupation": "self-employed",
  "income_mode": "bank",
  "market_value": "\u20b91.8 Crore",
  "tenure": 12,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
