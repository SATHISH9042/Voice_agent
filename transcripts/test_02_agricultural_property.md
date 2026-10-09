# Call Audio Transcript: Test 2: Agricultural Property Disqualification

- **Scenario Category**: Immediate Disqualification
- **Customer Name**: Suresh Patel
- **Expected Outcome**: `DISQUALIFIED_AGRICULTURAL`
- **Actual Final Stage**: `DISQUALIFIED`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Suresh Patel, good day! I am Priya calling from Home Credit. Am I speaking with Suresh Patel?"

👤 **Customer (Suresh Patel)**: "Yes, Suresh this side."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Suresh Patel)**: "Sure, go ahead."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Suresh Patel)**: "It is agricultural land in my ancestral village."

🤖 **AI Voice Agent (Priya)**: "Thank you for clarifying, Suresh Patel. Currently, our pre-approved Loan Against Property program is exclusively for residential, commercial, and industrial properties, and does not support agricultural land. Therefore, we cannot proceed with this offer today. We truly appreciate your relationship with Home Credit!"

## Final State Snapshot

```json
{
  "verified": true,
  "is_busy": false,
  "callback_time": null,
  "existing_loan_detected": null,
  "transfer_specialist_routed": false,
  "property_type": "agricultural",
  "ownership_status": null,
  "documents_available": null,
  "loan_amount": null,
  "loan_amount_pending_counter": false,
  "occupation": null,
  "income_mode": null,
  "market_value": null,
  "tenure": null,
  "disqualified": true,
  "disqualification_reason": "Agricultural property is strictly ineligible for Loan Against Property.",
  "handoff_ready": false,
  "call_ended": true,
  "current_stage": "DISQUALIFIED"
}
```
