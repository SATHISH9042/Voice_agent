# Call Audio Transcript: Test 4: Missing Original Documents Disqualification

- **Scenario Category**: Immediate Disqualification
- **Customer Name**: Amit Saxena
- **Expected Outcome**: `DISQUALIFIED_MISSING_DOCS`
- **Actual Final Stage**: `DISQUALIFIED`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Amit Saxena, good day! I am Priya calling from Home Credit. Am I speaking with Amit Saxena?"

👤 **Customer (Amit Saxena)**: "Yes, this is Amit."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Amit Saxena)**: "Yes, please tell me."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Amit Saxena)**: "Residential duplex house."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Amit Saxena)**: "Sole ownership."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Amit Saxena)**: "Actually I only have photocopies, the original documents were misplaced."

🤖 **AI Voice Agent (Priya)**: "Thank you for your honesty, Amit Saxena. As per regulatory guidelines for Loan Against Property, physical verification of the original property documents is mandatory. Since originals are not available at this time, we are unable to proceed further with this application. Thank you for your time with Home Credit!"

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
  "documents_available": false,
  "loan_amount": null,
  "loan_amount_pending_counter": false,
  "occupation": null,
  "income_mode": null,
  "market_value": null,
  "tenure": null,
  "disqualified": true,
  "disqualification_reason": "Original property documents are mandatory for verification.",
  "handoff_ready": false,
  "call_ended": true,
  "current_stage": "DISQUALIFIED"
}
```
