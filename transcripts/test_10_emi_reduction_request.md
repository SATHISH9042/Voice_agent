# Call Audio Transcript: Test 10: EMI Reduction / Balance Transfer Request

- **Scenario Category**: Special Branch
- **Customer Name**: Sunil Mehta
- **Expected Outcome**: `TRANSFER_SPECIALIST`
- **Actual Final Stage**: `TRANSFER`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Sunil Mehta, good day! I am Priya calling from Home Credit. Am I speaking with Sunil Mehta?"

👤 **Customer (Sunil Mehta)**: "Yes, Sunil speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Sunil Mehta)**: "Yes, sure."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Sunil Mehta)**: "I am actually looking to reduce my existing EMI through a balance transfer."

🤖 **AI Voice Agent (Priya)**: "Thank you for sharing that, Sunil Mehta. Since you already have an existing loan on this property and are looking for EMI reduction or loan transfer, this is handled directly by our dedicated Loan Transfer & EMI Specialist. I am arranging a direct transfer callback for you. Thank you for your time with Home Credit!"

## Final State Snapshot

```json
{
  "verified": true,
  "is_busy": false,
  "callback_time": null,
  "existing_loan_detected": true,
  "transfer_specialist_routed": true,
  "property_type": null,
  "ownership_status": null,
  "documents_available": null,
  "loan_amount": null,
  "loan_amount_pending_counter": false,
  "occupation": null,
  "income_mode": null,
  "market_value": null,
  "tenure": null,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": false,
  "call_ended": true,
  "current_stage": "TRANSFER"
}
```
