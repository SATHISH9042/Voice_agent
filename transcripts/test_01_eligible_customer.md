# Call Audio Transcript: Test 1: Perfect Eligible Customer

- **Scenario Category**: Core Flow
- **Customer Name**: Rahul Sharma
- **Expected Outcome**: `QUALIFIED_HANDOFF`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Rahul Sharma, good day! I am Priya calling from Home Credit. Am I speaking with Rahul Sharma?"

👤 **Customer (Rahul Sharma)**: "Yes, Rahul speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Rahul Sharma)**: "Yes, I have a couple of minutes."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Rahul Sharma)**: "It is a residential apartment in Gurgaon."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Rahul Sharma)**: "It is sole ownership under my name."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Rahul Sharma)**: "Yes, all original papers are kept safely at home."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Rahul Sharma)**: "I need around 50 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Rahul Sharma)**: "I am salaried as a software architect and my salary is credited directly to my HDFC bank account."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Rahul Sharma)**: "The market value is around 1.2 crore."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Rahul Sharma)**: "I would prefer a 10 year tenure."

🤖 **AI Voice Agent (Priya)**: "Congratulations Rahul Sharma! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

## Final State Snapshot

```json
{
  "verified": true,
  "is_busy": false,
  "callback_time": null,
  "existing_loan_detected": null,
  "transfer_specialist_routed": false,
  "property_type": "residential",
  "ownership_status": "sole",
  "documents_available": true,
  "loan_amount": 5000000,
  "loan_amount_pending_counter": false,
  "occupation": "salaried",
  "income_mode": "bank",
  "market_value": "\u20b91.2 Crore",
  "tenure": 10,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
