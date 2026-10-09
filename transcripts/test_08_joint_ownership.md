# Call Audio Transcript: Test 8: Joint Ownership Allowed

- **Scenario Category**: Core Flow
- **Customer Name**: Ananya Roy
- **Expected Outcome**: `QUALIFIED_HANDOFF`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Ananya Roy, good day! I am Priya calling from Home Credit. Am I speaking with Ananya Roy?"

👤 **Customer (Ananya Roy)**: "Yes, Ananya speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Ananya Roy)**: "Yes, I have two minutes."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Ananya Roy)**: "Residential apartment in Kolkata."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Ananya Roy)**: "It is jointly owned by me and my husband."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Ananya Roy)**: "Yes, original papers are at home."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Ananya Roy)**: "25 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Ananya Roy)**: "Salaried employee with salary in Axis Bank."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Ananya Roy)**: "Market value is around 65 lakhs."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Ananya Roy)**: "7 years tenure."

🤖 **AI Voice Agent (Priya)**: "Congratulations Ananya Roy! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

## Final State Snapshot

```json
{
  "verified": true,
  "is_busy": false,
  "callback_time": null,
  "existing_loan_detected": null,
  "transfer_specialist_routed": false,
  "property_type": "residential",
  "ownership_status": "joint",
  "documents_available": true,
  "loan_amount": 2500000,
  "loan_amount_pending_counter": false,
  "occupation": "salaried",
  "income_mode": "bank",
  "market_value": "\u20b965 Lakhs",
  "tenure": 7,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
