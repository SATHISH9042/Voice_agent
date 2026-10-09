# Call Audio Transcript: Test 11: Out-of-Order Multi-Slot Information Capture

- **Scenario Category**: Conversational Flexibility
- **Customer Name**: Kavita Reddy
- **Expected Outcome**: `QUALIFIED_HANDOFF`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Kavita Reddy, good day! I am Priya calling from Home Credit. Am I speaking with Kavita Reddy?"

👤 **Customer (Kavita Reddy)**: "Yes, Kavita speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Kavita Reddy)**: "Yes, tell me."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Kavita Reddy)**: "It's a residential house worth about 1.1 crore, jointly owned with my brother."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Kavita Reddy)**: "Yes, the original title deeds are available with me."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Kavita Reddy)**: "Around 45 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Kavita Reddy)**: "I am self-employed architect and receive fees through bank transfers."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Kavita Reddy)**: "8 years."

🤖 **AI Voice Agent (Priya)**: "Congratulations Kavita Reddy! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

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
  "loan_amount": 4500000,
  "loan_amount_pending_counter": false,
  "occupation": "self-employed",
  "income_mode": "bank",
  "market_value": "\u20b91.1 Crore",
  "tenure": 8,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
