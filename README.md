# Home Credit AI Voice Agent — Loan Against Property (LAP) Qualification
### SalesAgents AI — AI Intern / Prompt Engineer Assignment Submission

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://sathish9042.github.io/Voice_agent/)
[![Status](https://img.shields.io/badge/Status-16%2F16%20Tests%20Passed-blue?style=for-the-badge)](https://sathish9042.github.io/Voice_agent/)

🌐 **Live Web Application**: [https://sathish9042.github.io/Voice_agent/](https://sathish9042.github.io/Voice_agent/)

This repository contains the complete, production-grade implementation of the **Home Credit AI Voice Agent** for Loan Against Property (LAP) qualification, strictly following the specifications and requirements defined in the **SalesAgents AI Assignment Preparation Guide**.

---

## 📁 Repository Structure

```
.
├── SYSTEM_PROMPT.md                # Fully formatted Production System Prompt with architectural notes
├── system_prompt.txt               # Raw System Prompt text ready for copy-paste into Retell AI, Bolna, Vapi
├── APPROACH_DOCUMENTATION.md       # Comprehensive Architecture, Business Rules, & Prompt Engineering Guide
├── TEST_RESULTS_SUMMARY.md         # Automated benchmark execution report (16/16 Passed)
│
├── index.html                      # Interactive Voice Agent Studio Web Application
├── style.css                       # Modern dark glassmorphism design system
├── app.js                          # Client-side audio visualizer, STT/TTS controller, test simulator
├── engine.js                       # JavaScript client engine with 5-layer state machine
├── server.py                       # Lightweight local HTTP server with media range support
│
├── agent_engine.py                 # Core Python Voice Agent Engine with First Missing Question algorithm
├── generate_test_audios.py         # Automated test runner and neural audio synthesizer
│
├── audios/                         # 16 High-Quality Call Audio Files (.m4a)
│   ├── test_01_eligible_customer.m4a
│   ├── test_02_agricultural_property.m4a
│   ├── ...
│   └── test_16_adversarial_rag_branch_query.m4a
│
└── transcripts/                    # Full Dialogue Transcripts & State Snapshots (Markdown + JSON)
    ├── test_01_eligible_customer.md
    ├── test_01_eligible_customer.json
    ├── ...
    └── test_16_adversarial_rag_branch_query.md
```

---

## 🚀 Quick Start: Launch the Interactive Voice Agent Web Studio

To launch the interactive simulator with voice input/output:

```bash
python3 server.py
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Key Features of the Interactive Studio:
1. **Live Microphone Voice Mode**: Click the mic button to speak naturally to the AI agent via Web Speech API.
2. **Text-to-Speech (TTS) Voice Synthesis**: The AI voice responds verbally with real-time waveform animations.
3. **5-Layer State Inspector**: Live visualization of the 5 layers (Conversation Layer, Business Logic, State/Memory, Out-of-Order Engine, Final Decision Gate).
4. **7 Eligibility Variables Grid**: Live table showing extracted values and real-time PASS / FAIL / PENDING status.
5. **Runtime Variables Panel**: Dynamically edit `customer_name`, `agent_name`, `agent_gender`, `language`, and `rag_context`, and see the rendered prompt update in real-time.
6. **16-Scenario Automated Benchmark Gallery**: 1-click execution for all 16 test scenarios with synchronized transcript animation and audio playback.

---

## 🧪 Re-Run the Automated Test Suite & Audio Generator

To execute the test suite across all 16 scenarios and regenerate audio files:

```bash
python3 generate_test_audios.py
```

### Benchmark Summary:
- **12 Core Scenarios**: 100% Passed
- **4 Adversarial Scenarios**: 100% Passed
- **Total Test Cases**: 16/16 Passed

---

## 🎯 Key Architectural Highlights

1. **The "First Missing Question" Algorithm**: Rather than asking rigid questions sequentially, the agent parses all information volunteered out-of-order, stores validated facts in memory, and immediately identifies and asks only the earliest unanswered checklist item.
2. **Zero-Hallucination Interest Rate Policy**: When asked about interest rates, the agent never fabricates rates; it explains that exact customized rates are provided by the Senior Loan Expert after qualification and smoothly returns to the checklist.
3. **Immediate Disqualification Protocol**: If an ineligible parameter is detected (Agricultural property, Cash income, Missing original title deeds, or Tenure outside 3–15 years), the agent immediately ceases questioning, politely explains the policy, and ends the call.
4. **Balance Transfer Detection**: If the customer mentions an existing loan or asks for EMI reduction, the agent does not ask fresh loan questions; it routes them directly to the Balance Transfer Specialist.
5. **Strict Handoff Gate**: The agent never prematurely qualifies a customer; human handoff is locked until all 7 eligibility variables have passed verification.
