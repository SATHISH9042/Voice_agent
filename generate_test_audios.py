"""
Test Suite and Audio Generator for Home Credit AI Voice Agent
Runs all 16 test scenarios (12 core + 4 adversarial), verifies state transitions,
generates markdown/JSON transcripts, and synthesizes audio files (.m4a) using macOS speech tools.
"""

import os
import json
import subprocess
from agent_engine import VoiceAgentEngine, AgentContext

TEST_SCENARIOS = [
    {
        "id": "test_01_eligible_customer",
        "title": "Test 1: Perfect Eligible Customer",
        "category": "Core Flow",
        "expected": "QUALIFIED_HANDOFF",
        "customer_name": "Rahul Sharma",
        "dialogue": [
            "Yes, Rahul speaking.",
            "Yes, I have a couple of minutes.",
            "It is a residential apartment in Gurgaon.",
            "It is sole ownership under my name.",
            "Yes, all original papers are kept safely at home.",
            "I need around 50 lakhs.",
            "I am salaried as a software architect and my salary is credited directly to my HDFC bank account.",
            "The market value is around 1.2 crore.",
            "I would prefer a 10 year tenure."
        ]
    },
    {
        "id": "test_02_agricultural_property",
        "title": "Test 2: Agricultural Property Disqualification",
        "category": "Immediate Disqualification",
        "expected": "DISQUALIFIED_AGRICULTURAL",
        "customer_name": "Suresh Patel",
        "dialogue": [
            "Yes, Suresh this side.",
            "Sure, go ahead.",
            "It is agricultural land in my ancestral village."
        ]
    },
    {
        "id": "test_03_cash_income",
        "title": "Test 3: Cash Income Disqualification",
        "category": "Immediate Disqualification",
        "expected": "DISQUALIFIED_CASH_INCOME",
        "customer_name": "Vikas Verma",
        "dialogue": [
            "Yes, Vikas speaking.",
            "Yes, I can talk.",
            "It's a commercial shop in Lajpat Nagar.",
            "Sole ownership.",
            "Yes, original title deed is with me.",
            "Around 35 lakhs.",
            "I am self-employed running a grocery store, and all my income is in cash."
        ]
    },
    {
        "id": "test_04_missing_documents",
        "title": "Test 4: Missing Original Documents Disqualification",
        "category": "Immediate Disqualification",
        "expected": "DISQUALIFIED_MISSING_DOCS",
        "customer_name": "Amit Saxena",
        "dialogue": [
            "Yes, this is Amit.",
            "Yes, please tell me.",
            "Residential duplex house.",
            "Sole ownership.",
            "Actually I only have photocopies, the original documents were misplaced."
        ]
    },
    {
        "id": "test_05_tenure_too_short",
        "title": "Test 5: Tenure Too Short (< 3 Years)",
        "category": "Disqualification",
        "expected": "DISQUALIFIED_TENURE_SHORT",
        "customer_name": "Deepak Joshi",
        "dialogue": [
            "Yes, Deepak here.",
            "Yeah, tell me.",
            "Residential flat.",
            "Sole owner.",
            "Yes, original papers are in my bank locker.",
            "40 lakhs.",
            "Salaried, salary comes in ICICI bank.",
            "Property is worth about 90 lakhs.",
            "I only want it for 2 years."
        ]
    },
    {
        "id": "test_06_tenure_too_long",
        "title": "Test 6: Tenure Too Long (> 15 Years)",
        "category": "Disqualification",
        "expected": "DISQUALIFIED_TENURE_LONG",
        "customer_name": "Pooja Hegde",
        "dialogue": [
            "Yes, Pooja speaking.",
            "Yes, I have time.",
            "Residential villa.",
            "Sole owner.",
            "Yes, original documents are available.",
            "60 lakhs.",
            "Salaried with bank salary credit.",
            "Valued around 1.5 crore.",
            "I need a very long tenure of 20 years to keep EMI low."
        ]
    },
    {
        "id": "test_07_loan_above_75l_accepted",
        "title": "Test 7: Loan Amount > ₹75 Lakh with Counter-Offer Acceptance",
        "category": "Edge Case / Counter-Offer",
        "expected": "QUALIFIED_HANDOFF_AT_75L",
        "customer_name": "Rajesh Singhania",
        "dialogue": [
            "Yes, Rajesh speaking.",
            "Yes, go ahead.",
            "Commercial showroom.",
            "Sole ownership.",
            "Yes, originals are available.",
            "I need 90 lakhs for my business expansion.",
            "Yes, that's fine, I can proceed with the maximum 75 lakhs.",
            "Self-employed business owner, bank account receipts.",
            "Valuation is about 2.5 crore.",
            "Tenure of 12 years."
        ]
    },
    {
        "id": "test_08_joint_ownership",
        "title": "Test 8: Joint Ownership Allowed",
        "category": "Core Flow",
        "expected": "QUALIFIED_HANDOFF",
        "customer_name": "Ananya Roy",
        "dialogue": [
            "Yes, Ananya speaking.",
            "Yes, I have two minutes.",
            "Residential apartment in Kolkata.",
            "It is jointly owned by me and my husband.",
            "Yes, original papers are at home.",
            "25 lakhs.",
            "Salaried employee with salary in Axis Bank.",
            "Market value is around 65 lakhs.",
            "7 years tenure."
        ]
    },
    {
        "id": "test_09_existing_loan_transfer",
        "title": "Test 9: Existing Loan on Property Detection",
        "category": "Special Branch",
        "expected": "TRANSFER_SPECIALIST",
        "customer_name": "Manish Tiwari",
        "dialogue": [
            "Yes, Manish speaking.",
            "Yes, go on.",
            "Actually, I already have an existing loan on this property with another bank."
        ]
    },
    {
        "id": "test_10_emi_reduction_request",
        "title": "Test 10: EMI Reduction / Balance Transfer Request",
        "category": "Special Branch",
        "expected": "TRANSFER_SPECIALIST",
        "customer_name": "Sunil Mehta",
        "dialogue": [
            "Yes, Sunil speaking.",
            "Yes, sure.",
            "I am actually looking to reduce my existing EMI through a balance transfer."
        ]
    },
    {
        "id": "test_11_out_of_order_capture",
        "title": "Test 11: Out-of-Order Multi-Slot Information Capture",
        "category": "Conversational Flexibility",
        "expected": "QUALIFIED_HANDOFF",
        "customer_name": "Kavita Reddy",
        "dialogue": [
            "Yes, Kavita speaking.",
            "Yes, tell me.",
            "It's a residential house worth about 1.1 crore, jointly owned with my brother.",
            "Yes, the original title deeds are available with me.",
            "Around 45 lakhs.",
            "I am self-employed architect and receive fees through bank transfers.",
            "8 years."
        ]
    },
    {
        "id": "test_12_busy_customer",
        "title": "Test 12: Busy Customer Callback Flow",
        "category": "Special Branch",
        "expected": "BUSY_CALLBACK_SCHEDULED",
        "customer_name": "Gaurav Malhotra",
        "dialogue": [
            "Yes, Gaurav here.",
            "I'm in an urgent client meeting right now, please call me later.",
            "Tomorrow afternoon at 3 PM would be ideal."
        ]
    },
    {
        "id": "test_13_adversarial_contradiction",
        "title": "Test 13: Adversarial - Contradiction & Self-Correction",
        "category": "Adversarial",
        "expected": "DISQUALIFIED_AGRICULTURAL",
        "customer_name": "Harish Rawat",
        "dialogue": [
            "Yes, speaking.",
            "Yes, go ahead.",
            "It's residential... wait, actually no, it's agricultural farmland."
        ]
    },
    {
        "id": "test_14_adversarial_multi_slot_single_turn",
        "title": "Test 14: Adversarial - 5 Slots Volunteered in a Single Utterance",
        "category": "Adversarial",
        "expected": "QUALIFIED_HANDOFF",
        "customer_name": "Neha Kapoor",
        "dialogue": [
            "Yes, Neha speaking.",
            "Yes, I can talk.",
            "It's my sole-owned residential property, original documents are available, I need 40 lakhs, and prefer 10 years.",
            "I work as a salaried executive with salary credited to bank account.",
            "Current market value is about 95 lakhs."
        ]
    },
    {
        "id": "test_15_adversarial_roi_diversion",
        "title": "Test 15: Adversarial - Interest Rate / ROI Diversion Handling",
        "category": "Adversarial",
        "expected": "QUALIFIED_HANDOFF",
        "customer_name": "Arjun Nair",
        "dialogue": [
            "Yes, Arjun speaking.",
            "Yes, tell me.",
            "Wait, before we start, what is your exact interest rate and ROI?",
            "Okay got it. It is a residential property.",
            "Sole owner.",
            "Original papers are available.",
            "50 lakhs.",
            "Salaried with bank credit.",
            "About 1.1 crore.",
            "10 years."
        ]
    },
    {
        "id": "test_16_adversarial_rag_branch_query",
        "title": "Test 16: Adversarial - RAG Company & Branch Inquiry Diversion",
        "category": "Adversarial",
        "expected": "QUALIFIED_HANDOFF",
        "customer_name": "Pradeep Deshmukh",
        "dialogue": [
            "Yes, Pradeep speaking.",
            "Yes, I have time.",
            "Tell me first, where is your nearest office and what are your branch hours?",
            "Understood. The property is commercial space.",
            "Sole owner.",
            "Original documents are available.",
            "60 lakhs.",
            "Self-employed consultant with bank deposit fees.",
            "Valued around 1.8 crore.",
            "12 years."
        ]
    }
]

def run_tests_and_generate_artifacts():
    os.makedirs("transcripts", exist_ok=True)
    os.makedirs("audios", exist_ok=True)
    
    summary_results = []
    
    for sc in TEST_SCENARIOS:
        sc_id = sc["id"]
        print(f"\n==========================================")
        print(f"Running {sc['title']}...")
        print(f"==========================================")
        
        context = AgentContext(customer_name=sc["customer_name"])
        engine = VoiceAgentEngine(context)
        
        # Initial greeting
        greeting = engine.get_initial_greeting()
        
        # Process customer dialogue turns
        for user_utterance in sc["dialogue"]:
            if engine.state.call_ended:
                break
            engine.process_utterance(user_utterance)
            
        final_state = engine.state.to_dict()
        
        # Verify expectations
        expected_status = sc["expected"]
        passed = False
        if expected_status == "QUALIFIED_HANDOFF" and engine.state.handoff_ready and not engine.state.disqualified:
            passed = True
        elif expected_status == "QUALIFIED_HANDOFF_AT_75L" and engine.state.handoff_ready and engine.state.loan_amount == 7500000:
            passed = True
        elif expected_status == "DISQUALIFIED_AGRICULTURAL" and engine.state.disqualified and engine.state.property_type == "agricultural":
            passed = True
        elif expected_status == "DISQUALIFIED_CASH_INCOME" and engine.state.disqualified and engine.state.income_mode == "cash":
            passed = True
        elif expected_status == "DISQUALIFIED_MISSING_DOCS" and engine.state.disqualified and engine.state.documents_available is False:
            passed = True
        elif expected_status == "DISQUALIFIED_TENURE_SHORT" and engine.state.disqualified and engine.state.tenure == 2:
            passed = True
        elif expected_status == "DISQUALIFIED_TENURE_LONG" and engine.state.disqualified and engine.state.tenure == 20:
            passed = True
        elif expected_status == "TRANSFER_SPECIALIST" and engine.state.transfer_specialist_routed:
            passed = True
        elif expected_status == "BUSY_CALLBACK_SCHEDULED" and engine.state.is_busy and engine.state.callback_time:
            passed = True
            
        print(f"Result: {'PASS' if passed else 'FAIL'} (Expected: {expected_status}, Final Stage: {engine.state.current_stage})")
        
        summary_results.append({
            "id": sc_id,
            "title": sc["title"],
            "category": sc["category"],
            "expected": expected_status,
            "final_stage": engine.state.current_stage,
            "passed": passed,
            "turns_count": len(engine.history)
        })
        
        # Save transcript to markdown
        md_transcript_path = os.path.join("transcripts", f"{sc_id}.md")
        json_transcript_path = os.path.join("transcripts", f"{sc_id}.json")
        
        with open(json_transcript_path, "w") as jf:
            json.dump({
                "scenario": sc,
                "final_state": final_state,
                "history": engine.history
            }, jf, indent=2)
            
        with open(md_transcript_path, "w") as mf:
            mf.write(f"# Call Audio Transcript: {sc['title']}\n\n")
            mf.write(f"- **Scenario Category**: {sc['category']}\n")
            mf.write(f"- **Customer Name**: {sc['customer_name']}\n")
            mf.write(f"- **Expected Outcome**: `{sc['expected']}`\n")
            mf.write(f"- **Actual Final Stage**: `{engine.state.current_stage}`\n")
            mf.write(f"- **Test Status**: `{'PASSED ✅' if passed else 'FAILED ❌'}`\n\n")
            mf.write("## Dialogue Transcript\n\n")
            
            for turn in engine.history:
                speaker_icon = "🤖 **AI Voice Agent (Priya)**" if turn["speaker"] == "Agent" else f"👤 **Customer ({sc['customer_name']})**"
                mf.write(f"{speaker_icon}: \"{turn['text']}\"\n\n")
                
            mf.write("## Final State Snapshot\n\n```json\n")
            mf.write(json.dumps(final_state, indent=2))
            mf.write("\n```\n")
            
        # Audio generation for representative key scenarios
        generate_audio_for_scenario(sc_id, engine.history)

    # Save master test results summary
    with open("TEST_RESULTS_SUMMARY.md", "w") as smf:
        smf.write("# Master Test Execution Summary\n\n")
        smf.write("| ID | Scenario Title | Category | Expected Outcome | Final Stage | Status |\n")
        smf.write("|---|---|---|---|---|---|\n")
        for res in summary_results:
            status_badge = "✅ PASS" if res["passed"] else "❌ FAIL"
            smf.write(f"| `{res['id']}` | {res['title']} | {res['category']} | `{res['expected']}` | `{res['final_stage']}` | {status_badge} |\n")
    print("\nSaved TEST_RESULTS_SUMMARY.md and transcripts!")

def generate_audio_for_scenario(sc_id: str, history: List[Dict[str, str]]):
    """Generates audio files using macOS say utility with distinct voices."""
    audio_output = os.path.join("audios", f"{sc_id}.m4a")
    aiff_temp = os.path.join("audios", f"{sc_id}_temp.aiff")
    
    # We create a concatenated speech text with speech tags or pauses
    full_speech_script = ""
    for turn in history:
        full_speech_script += f"{turn['speaker']}: {turn['text']}\n[[slnc 600]]\n"
        
    try:
        # Generate AI voice with Tara (Indian English) or Samantha
        agent_voice = "Tara"
        # Run say to aiff
        subprocess.run(["say", "-v", agent_voice, "-o", aiff_temp, full_speech_script], check=True, capture_output=True)
        # Convert to m4a
        subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", aiff_temp, audio_output], check=True, capture_output=True)
        if os.path.exists(aiff_temp):
            os.remove(aiff_temp)
        print(f"Generated audio: {audio_output}")
    except Exception as e:
        print(f"Audio generation skipped for {sc_id} (fallback to web audio synthesizer): {e}")

if __name__ == "__main__":
    run_tests_and_generate_artifacts()
