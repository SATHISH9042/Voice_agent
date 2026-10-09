# Call Audio Transcript: Test 15: Adversarial - Interest Rate / ROI Diversion Handling

- **Scenario Category**: Adversarial
- **Customer Name**: Arjun Nair
- **Expected Outcome**: `QUALIFIED_HANDOFF`
- **Actual Final Stage**: `HANDOFF`
- **Test Status**: `PASSED ✅`

## Dialogue Transcript

🤖 **AI Voice Agent (Priya)**: "Hello Arjun Nair, good day! I am Priya calling from Home Credit. Am I speaking with Arjun Nair?"

👤 **Customer (Arjun Nair)**: "Yes, Arjun speaking."

🤖 **AI Voice Agent (Priya)**: "Great! Do you have a couple of minutes to speak right now?"

👤 **Customer (Arjun Nair)**: "Yes, tell me."

🤖 **AI Voice Agent (Priya)**: "Thank you. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Arjun Nair)**: "Wait, before we start, what is your exact interest rate and ROI?"

🤖 **AI Voice Agent (Priya)**: "Regarding interest rates, our exact rates are personalized based on your property valuation and financial profile, and will be provided directly by our Senior Loan Expert after this brief qualification. To check your eligibility, could you please tell me what type of property you own—is it residential, commercial, or industrial?"

👤 **Customer (Arjun Nair)**: "Okay got it. It is a residential property."

🤖 **AI Voice Agent (Priya)**: "Got that. Is this property in your sole ownership, or is it jointly owned with someone else?"

👤 **Customer (Arjun Nair)**: "Sole owner."

🤖 **AI Voice Agent (Priya)**: "Thank you. Do you have the original property documents available for physical verification?"

👤 **Customer (Arjun Nair)**: "Original papers are available."

🤖 **AI Voice Agent (Priya)**: "Understood. What is the approximate loan amount you are looking to borrow?"

👤 **Customer (Arjun Nair)**: "50 lakhs."

🤖 **AI Voice Agent (Priya)**: "Could you share whether you are salaried or self-employed, and whether your income is received through bank deposit or in cash?"

👤 **Customer (Arjun Nair)**: "Salaried with bank credit."

🤖 **AI Voice Agent (Priya)**: "Approximately what is the current market value of your property?"

👤 **Customer (Arjun Nair)**: "About 1.1 crore."

🤖 **AI Voice Agent (Priya)**: "What repayment tenure would you prefer for this loan, between 3 to 15 years?"

👤 **Customer (Arjun Nair)**: "10 years."

🤖 **AI Voice Agent (Priya)**: "Congratulations Arjun Nair! Based on the preliminary details provided, you meet all the eligibility criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will contact you shortly to share the exact interest rates, customized EMI plans, and assist you with the fast-track paperwork. Thank you for choosing Home Credit, and have a wonderful day!"

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
  "loan_amount": 5000000,
  "loan_amount_pending_counter": false,
  "occupation": "salaried",
  "income_mode": "bank",
  "market_value": "\u20b91.1 Crore",
  "tenure": 10,
  "disqualified": false,
  "disqualification_reason": null,
  "handoff_ready": true,
  "call_ended": true,
  "current_stage": "HANDOFF"
}
```
