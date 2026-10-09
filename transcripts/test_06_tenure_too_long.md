# Call Audio Transcript: Test 6: Tenure Too Long (> 15 Years)

- **Scenario Category**: Disqualification
- **Customer Name**: Pooja Hegde
- **Expected Outcome**: `DISQUALIFIED_TENURE_LONG`
- **Actual Final Stage**: `DISQUALIFIED`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Pooja Hegde, good day! I am Priya calling from Home Credit. Am I speaking with Pooja Hegde?"

👤 **Customer (Pooja Hegde)**: "Yes, Pooja speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Pooja Hegde)**: "Yes, I have time."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Pooja Hegde)**: "Residential villa."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Pooja Hegde)**: "Sole owner."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Pooja Hegde)**: "Yes, original documents are available."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Pooja Hegde)**: "60 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Pooja Hegde)**: "Salaried with bank salary credit."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Pooja Hegde)**: "Valued around 1.5 crore."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Pooja Hegde)**: "I need a very long tenure of 20 years to keep EMI low."

🤖 **AI Voice Agent (Priya)**: "Thank you for sharing your tenure preference, Pooja Hegde. Our pre-approved Loan Against Property program offers repayment tenures strictly between 3 to 15 years. Since you are looking for 20 years, we cannot accommodate this tenure under the current scheme. Thank you for speaking with Home Credit!"

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
  "loan_amount": 6000000,
  "loan_amount_pending_counter": false,
  "occupation": "salaried",
  "income_mode": "bank",
  "market_value": "\u20b91.5 Crore",
  "tenure": 20,
  "disqualified": true,
  "disqualification_reason": "Requested tenure of 20 years is outside eligible window (3\u201315 years).",
  "handoff_ready": false,
  "call_ended": true,
  "current_stage": "DISQUALIFIED"
}
```
