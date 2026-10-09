# Call Audio Transcript: Test 14: Adversarial - 5 Slots Volunteered in a Single Utterance

- **Scenario Category**: Adversarial
- **Customer Name**: Neha Kapoor
- **Expected Outcome**: `QUALIFIED_HANDOFF`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Neha Kapoor, good day! I am Priya calling from Home Credit. Am I speaking with Neha Kapoor?"

👤 **Customer (Neha Kapoor)**: "Yes, Neha speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Neha Kapoor)**: "Yes, I can talk."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Neha Kapoor)**: "It's my sole-owned residential property, original documents are available, I need 40 lakhs, and prefer 10 years."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Neha Kapoor)**: "I work as a salaried executive with salary credited to bank account."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Neha Kapoor)**: "Current market value is about 95 lakhs."

🤖 **AI Voice Agent (Priya)**: "Congratulations Neha Kapoor! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

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
  "market_value": "\u20b995 Lakhs",
  "tenure": 10,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
