# Call Audio Transcript: Test 5: Tenure Too Short (< 3 Years)

- **Scenario Category**: Disqualification
- **Customer Name**: Deepak Joshi
- **Expected Outcome**: `DISQUALIFIED_TENURE_SHORT`
- **Actual Final Stage**: `DISQUALIFIED`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Deepak Joshi, good day! I am Priya calling from Home Credit. Am I speaking with Deepak Joshi?"

👤 **Customer (Deepak Joshi)**: "Yes, Deepak here."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Deepak Joshi)**: "Yeah, tell me."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Deepak Joshi)**: "Residential flat."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Deepak Joshi)**: "Sole owner."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Deepak Joshi)**: "Yes, original papers are in my bank locker."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Deepak Joshi)**: "40 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you please clarify whether you are salaried or self-employed?"

👤 **Customer (Deepak Joshi)**: "Salaried, salary comes in ICICI bank."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Deepak Joshi)**: "Property is worth about 90 lakhs."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Deepak Joshi)**: "I only want it for 2 years."

🤖 **AI Voice Agent (Priya)**: "Thank you for sharing your tenure preference, Deepak Joshi. Our pre-approved Loan Against Property program offers repayment tenures strictly between 3 to 15 years. Since you are looking for 2 years, we cannot accommodate this tenure under the current scheme. Thank you for speaking with Home Credit!"

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
  "loan_amount": 4000000,
  "loan_amount_pending_counter": false,
  "occupation": "salaried",
  "income_mode": "bank",
  "market_value": "\u20b990 Lakhs",
  "tenure": 2,
  "disqualified": true,
  "disqualification_reason": "Requested tenure of 2 years is outside eligible window (3\u201315 years).",
  "handoff_ready": false,
  "call_ended": true,
  "current_stage": "DISQUALIFIED"
}
```
