# Master Test Execution Summary

| ID | Scenario Title | Category | Expected Outcome | Final Stage | Status |
|---|---|---|---|---|---|
| `test_01_eligible_customer` | Test 1: Perfect Eligible Customer | Core Flow | `QUALIFIED_HANDOFF` | `HANDOFF` | ✅ PASS |
| `test_02_agricultural_property` | Test 2: Agricultural Property Disqualification | Immediate Disqualification | `DISQUALIFIED_AGRICULTURAL` | `DISQUALIFIED` | ✅ PASS |
| `test_03_cash_income` | Test 3: Cash Income Disqualification | Immediate Disqualification | `DISQUALIFIED_CASH_INCOME` | `DISQUALIFIED` | ✅ PASS |
| `test_04_missing_documents` | Test 4: Missing Original Documents Disqualification | Immediate Disqualification | `DISQUALIFIED_MISSING_DOCS` | `DISQUALIFIED` | ✅ PASS |
| `test_05_tenure_too_short` | Test 5: Tenure Too Short (< 3 Years) | Disqualification | `DISQUALIFIED_TENURE_SHORT` | `DISQUALIFIED` | ✅ PASS |
| `test_06_tenure_too_long` | Test 6: Tenure Too Long (> 15 Years) | Disqualification | `DISQUALIFIED_TENURE_LONG` | `DISQUALIFIED` | ✅ PASS |
| `test_07_loan_above_75l_accepted` | Test 7: Loan Amount > ₹75 Lakh with Counter-Offer Acceptance | Edge Case / Counter-Offer | `QUALIFIED_HANDOFF_AT_75L` | `HANDOFF` | ✅ PASS |
| `test_08_joint_ownership` | Test 8: Joint Ownership Allowed | Core Flow | `QUALIFIED_HANDOFF` | `HANDOFF` | ✅ PASS |
| `test_09_existing_loan_transfer` | Test 9: Existing Loan on Property Detection | Special Branch | `TRANSFER_SPECIALIST` | `TRANSFER` | ✅ PASS |
| `test_10_emi_reduction_request` | Test 10: EMI Reduction / Balance Transfer Request | Special Branch | `TRANSFER_SPECIALIST` | `TRANSFER` | ✅ PASS |
| `test_11_out_of_order_capture` | Test 11: Out-of-Order Multi-Slot Information Capture | Conversational Flexibility | `QUALIFIED_HANDOFF` | `HANDOFF` | ✅ PASS |
| `test_12_busy_customer` | Test 12: Busy Customer Callback Flow | Special Branch | `BUSY_CALLBACK_SCHEDULED` | `ENDED` | ✅ PASS |
| `test_13_adversarial_contradiction` | Test 13: Adversarial - Contradiction & Self-Correction | Adversarial | `DISQUALIFIED_AGRICULTURAL` | `DISQUALIFIED` | ✅ PASS |
| `test_14_adversarial_multi_slot_single_turn` | Test 14: Adversarial - 5 Slots Volunteered in a Single Utterance | Adversarial | `QUALIFIED_HANDOFF` | `HANDOFF` | ✅ PASS |
| `test_15_adversarial_roi_diversion` | Test 15: Adversarial - Interest Rate / ROI Diversion Handling | Adversarial | `QUALIFIED_HANDOFF` | `HANDOFF` | ✅ PASS |
| `test_16_adversarial_rag_branch_query` | Test 16: Adversarial - RAG Company & Branch Inquiry Diversion | Adversarial | `QUALIFIED_HANDOFF` | `HANDOFF` | ✅ PASS |
