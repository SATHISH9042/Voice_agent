# Call Audio Transcript: Test 12: Busy Customer Callback Flow

- **Scenario Category**: Special Branch
- **Customer Name**: Gaurav Malhotra
- **Expected Outcome**: `BUSY_CALLBACK_SCHEDULED`
- **Actual Final Stage**: `ENDED`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Gaurav Malhotra, good day! I am Priya calling from Home Credit. Am I speaking with Gaurav Malhotra?"

👤 **Customer (Gaurav Malhotra)**: "Yes, Gaurav here."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Gaurav Malhotra)**: "I'm in an urgent client meeting right now, please call me later."

🤖 **AI Voice Agent (Priya)**: "I completely understand! What would be a convenient date and time for us to call you back?"

👤 **Customer (Gaurav Malhotra)**: "Tomorrow afternoon at 3 PM would be ideal."

🤖 **AI Voice Agent (Priya)**: "Thank you, Gaurav Malhotra. We have scheduled a callback for Tomorrow afternoon at 3 PM would be ideal.. Have a great day!"

## Final State Snapshot

```json
{
  "verified": true,
  "is_busy": true,
  "callback_time": "Tomorrow afternoon at 3 PM would be ideal.",
  "existing_loan_detected": null,
  "transfer_specialist_routed": false,
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
  "current_stage": "ENDED"
}
```
