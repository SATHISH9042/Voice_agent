# Call Audio Transcript: Test 9: Existing Loan on Property Detection

- **Scenario Category**: Special Branch
- **Customer Name**: Manish Tiwari
- **Expected Outcome**: `TRANSFER_SPECIALIST`
- **Actual Final Stage**: `TRANSFER`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Manish Tiwari, good day! I am Priya calling from Home Credit. Am I speaking with Manish Tiwari?"

👤 **Customer (Manish Tiwari)**: "Yes, Manish speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Manish Tiwari)**: "Yes, go on."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Manish Tiwari)**: "Actually, I already have an existing loan on this property with another bank."

🤖 **AI Voice Agent (Priya)**: "Thank you for sharing that, Manish Tiwari. Since you already have an existing loan on this property and are looking for EMI reduction or loan transfer, this is handled directly by our dedicated Loan Transfer & EMI Specialist. I am arranging a direct transfer callback for you. Thank you for your time with Home Credit!"

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
