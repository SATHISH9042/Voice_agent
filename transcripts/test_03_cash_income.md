# Call Audio Transcript: Test 3: Cash Income Disqualification

- **Scenario Category**: Immediate Disqualification
- **Customer Name**: Vikas Verma
- **Expected Outcome**: `DISQUALIFIED_CASH_INCOME`
- **Actual Final Stage**: `DISQUALIFIED`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Vikas Verma, good day! I am Priya calling from Home Credit. Am I speaking with Vikas Verma?"

👤 **Customer (Vikas Verma)**: "Yes, Vikas speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Vikas Verma)**: "Yes, I can talk."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Vikas Verma)**: "It's a commercial shop in Lajpat Nagar."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Vikas Verma)**: "Sole ownership."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Vikas Verma)**: "Yes, original title deed is with me."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Vikas Verma)**: "Around 35 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Vikas Verma)**: "I am self-employed running a grocery store, and all my income is in cash."

🤖 **AI Voice Agent (Priya)**: "Thank you for letting me know, Vikas Verma. To qualify for this Loan Against Property offer, income must be routed through verified bank credit channels. Because your income is received in cash, we cannot process this specific pre-approved offer. We appreciate your time and trust in Home Credit!"

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
  "loan_amount": 3500000,
  "loan_amount_pending_counter": false,
  "occupation": "self-employed",
  "income_mode": "cash",
  "market_value": null,
  "tenure": null,
  "disqualified": true,
  "disqualification_reason": "Cash income mode is strictly ineligible. Income must be credited to a bank account.",
  "handoff_ready": false,
  "call_ended": true,
  "current_stage": "DISQUALIFIED"
}
```
