/**
 * Clean UI Application Controller for SalesAgents AI Voice Agent
 */

// 16 Benchmark Scenarios Data
const TEST_SCENARIOS = [
  {
    id: "test_01_eligible_customer",
    title: "Test 1: Perfect Eligible Customer",
    category: "Core Flow",
    expected: "QUALIFIED_HANDOFF",
    desc: "Residential, Sole, Originals, ₹50L, Salaried+Bank, ₹1.2Cr, 10 yrs -> Handoff to Senior Expert.",
    customer_name: "Rahul Sharma",
    audio_file: "audios/test_01_eligible_customer.m4a",
    dialogue: [
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
    id: "test_02_agricultural_property",
    title: "Test 2: Agricultural Property Disqualification",
    category: "Immediate Disqualification",
    expected: "DISQUALIFIED_AGRICULTURAL",
    desc: "Agricultural land mentioned -> Immediate polite call termination without asking Q2-7.",
    customer_name: "Suresh Patel",
    audio_file: "audios/test_02_agricultural_property.m4a",
    dialogue: [
      "Yes, Suresh this side.",
      "Sure, go ahead.",
      "It is agricultural land in my ancestral village."
    ]
  },
  {
    id: "test_03_cash_income",
    title: "Test 3: Cash Income Disqualification",
    category: "Immediate Disqualification",
    expected: "DISQUALIFIED_CASH_INCOME",
    desc: "Self-employed with cash income -> Immediate disqualification as bank credit is mandatory.",
    customer_name: "Vikas Verma",
    audio_file: "audios/test_03_cash_income.m4a",
    dialogue: [
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
    id: "test_04_missing_documents",
    title: "Test 4: Missing Original Documents",
    category: "Immediate Disqualification",
    expected: "DISQUALIFIED_MISSING_DOCS",
    desc: "Photocopies only -> Immediate disqualification as physical verification of originals is required.",
    customer_name: "Amit Saxena",
    audio_file: "audios/test_04_missing_documents.m4a",
    dialogue: [
      "Yes, this is Amit.",
      "Yes, please tell me.",
      "Residential duplex house.",
      "Sole ownership.",
      "Actually I only have photocopies, the original documents were misplaced."
    ]
  },
  {
    id: "test_05_tenure_too_short",
    title: "Test 5: Tenure Too Short (< 3 Years)",
    category: "Immediate Disqualification",
    expected: "DISQUALIFIED_TENURE_SHORT",
    desc: "Customer asks for 2 years tenure -> Disqualified as eligible window is strictly 3-15 years.",
    customer_name: "Deepak Joshi",
    audio_file: "audios/test_05_tenure_too_short.m4a",
    dialogue: [
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
    id: "test_06_tenure_too_long",
    title: "Test 6: Tenure Too Long (> 15 Years)",
    category: "Immediate Disqualification",
    expected: "DISQUALIFIED_TENURE_LONG",
    desc: "Customer requests 20 years tenure -> Disqualified as maximum allowable tenure is 15 years.",
    customer_name: "Pooja Hegde",
    audio_file: "audios/test_06_tenure_too_long.m4a",
    dialogue: [
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
    id: "test_07_loan_above_75l_accepted",
    title: "Test 7: Loan > ₹75L Counter-Offer Accepted",
    category: "Core Flow",
    expected: "QUALIFIED_HANDOFF_AT_75L",
    desc: "Customer wants ₹90L -> Agent offers ₹75L cap -> Customer agrees -> Continues to handoff.",
    customer_name: "Rajesh Singhania",
    audio_file: "audios/test_07_loan_above_75l_accepted.m4a",
    dialogue: [
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
    id: "test_08_joint_ownership",
    title: "Test 8: Joint Ownership Allowed",
    category: "Core Flow",
    expected: "QUALIFIED_HANDOFF",
    desc: "Joint ownership with spouse is fully eligible -> Continues smoothly to handoff.",
    customer_name: "Ananya Roy",
    audio_file: "audios/test_08_joint_ownership.m4a",
    dialogue: [
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
    id: "test_09_existing_loan_transfer",
    title: "Test 9: Existing Loan on Property Detection",
    category: "Special Branch",
    expected: "TRANSFER_SPECIALIST",
    desc: "Customer has existing loan -> Fresh questions halted -> Routed to Balance Transfer Desk.",
    customer_name: "Manish Tiwari",
    audio_file: "audios/test_09_existing_loan_transfer.m4a",
    dialogue: [
      "Yes, Manish speaking.",
      "Yes, go on.",
      "Actually, I already have an existing loan on this property with another bank."
    ]
  },
  {
    id: "test_10_emi_reduction_request",
    title: "Test 10: EMI Reduction / Balance Transfer",
    category: "Special Branch",
    expected: "TRANSFER_SPECIALIST",
    desc: "Customer asks to lower monthly EMI -> Transferred directly to Transfer Specialist.",
    customer_name: "Sunil Mehta",
    audio_file: "audios/test_10_emi_reduction_request.m4a",
    dialogue: [
      "Yes, Sunil speaking.",
      "Yes, sure.",
      "I am actually looking to reduce my existing EMI through a balance transfer."
    ]
  },
  {
    id: "test_11_out_of_order_capture",
    title: "Test 11: Out-of-Order Multi-Slot Capture",
    category: "Core Flow",
    expected: "QUALIFIED_HANDOFF",
    desc: "Customer gives Property + Value + Ownership together -> Agent captures all 3, asks only missing.",
    customer_name: "Kavita Reddy",
    audio_file: "audios/test_11_out_of_order_capture.m4a",
    dialogue: [
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
    id: "test_12_busy_customer",
    title: "Test 12: Busy Customer Callback Flow",
    category: "Special Branch",
    expected: "BUSY_CALLBACK_SCHEDULED",
    desc: "Customer in meeting -> Agent asks callback time -> Schedules callback and ends call.",
    customer_name: "Gaurav Malhotra",
    audio_file: "audios/test_12_busy_customer.m4a",
    dialogue: [
      "Yes, Gaurav here.",
      "I'm in an urgent client meeting right now, please call me later.",
      "Tomorrow afternoon at 3 PM would be ideal."
    ]
  },
  {
    id: "test_13_adversarial_contradiction",
    title: "Test 13: Adversarial - Contradiction",
    category: "Adversarial",
    expected: "DISQUALIFIED_AGRICULTURAL",
    desc: "'Residential... wait no, agricultural' -> Latest correction wins -> Agricultural disqualifies.",
    customer_name: "Harish Rawat",
    audio_file: "audios/test_13_adversarial_contradiction.m4a",
    dialogue: [
      "Yes, speaking.",
      "Yes, go ahead.",
      "It's residential... wait, actually no, it's agricultural farmland."
    ]
  },
  {
    id: "test_14_adversarial_multi_slot_single_turn",
    title: "Test 14: Adversarial - 5 Simultaneous Slots",
    category: "Adversarial",
    expected: "QUALIFIED_HANDOFF",
    desc: "Customer volunteers 5 criteria in 1 sentence -> Agent updates all slots, asks only remaining 2.",
    customer_name: "Neha Kapoor",
    audio_file: "audios/test_14_adversarial_multi_slot_single_turn.m4a",
    dialogue: [
      "Yes, Neha speaking.",
      "Yes, I can talk.",
      "It's my sole-owned residential property, original documents are available, I need 40 lakhs, and prefer 10 years.",
      "I work as a salaried executive with salary credited to bank account.",
      "Current market value is about 95 lakhs."
    ]
  },
  {
    id: "test_15_adversarial_roi_diversion",
    title: "Test 15: Adversarial - Interest Rate Diversion",
    category: "Adversarial",
    expected: "QUALIFIED_HANDOFF",
    desc: "Customer demands exact ROI -> Agent never hallucinates rate, explains expert sets rate, steers back.",
    customer_name: "Arjun Nair",
    audio_file: "audios/test_15_adversarial_roi_diversion.m4a",
    dialogue: [
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
    id: "test_16_adversarial_rag_branch_query",
    title: "Test 16: Adversarial - RAG Branch Inquiry",
    category: "Adversarial",
    expected: "QUALIFIED_HANDOFF",
    desc: "Customer asks about branch timing -> Agent retrieves verified info from RAG context, returns to flow.",
    customer_name: "Pradeep Deshmukh",
    audio_file: "audios/test_16_adversarial_rag_branch_query.m4a",
    dialogue: [
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
];

// App Controller State
let agentEngine = null;
let speechEnabled = true;
let isRecording = false;
let recognition = null;
let rawPromptTemplate = "";
let showRenderedPrompt = true;

// Init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initEngine();
  setupTabs();
  initSpeechRecognition();
  loadPromptTemplate();
  renderScenariosDeck("all");
  setupEventListeners();
  updateUI();
});

function initEngine() {
  const context = new AgentContext({
    company_name: document.getElementById("cfgCompanyName").value,
    customer_name: document.getElementById("cfgCustomerName").value,
    agent_name: document.getElementById("cfgAgentName").value,
    agent_gender: document.getElementById("cfgAgentGender").value,
    language_to_speak: document.getElementById("cfgLanguage").value,
    rag_context: document.getElementById("cfgRagSnippet").value
  });
  agentEngine = new VoiceAgentEngine(context);
}

function setupTabs() {
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

function setupEventListeners() {
  // Call Action Button (Start / End)
  const callBtn = document.getElementById("btnCallAction");
  callBtn.addEventListener("click", () => {
    if (!agentEngine || agentEngine.state.call_ended) {
      startCall();
    } else if (agentEngine.state.current_stage !== "GREETING" || agentEngine.history.length > 0) {
      endCall();
    } else {
      startCall();
    }
  });

  // Header Reset
  document.getElementById("btnHeaderReset").addEventListener("click", () => {
    resetCall();
  });

  // Header Export
  document.getElementById("btnHeaderExport").addEventListener("click", () => {
    exportCallTranscript();
  });

  // Mute Voice Toggle
  document.getElementById("btnVoiceMute").addEventListener("click", () => {
    speechEnabled = !speechEnabled;
    document.getElementById("muteIcon").innerText = speechEnabled ? "🔊" : "🔇";
    document.getElementById("muteText").innerText = speechEnabled ? "Voice: ON" : "Voice: OFF";
    if (!speechEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      stopVoiceAnimation();
    }
  });

  // Send Message
  document.getElementById("btnSend").addEventListener("click", () => handleUserUtterance());
  document.getElementById("inputUserMessage").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserUtterance();
  });

  // Mic Toggle
  document.getElementById("btnMicToggle").addEventListener("click", () => toggleMicrophone());

  // Quick Reply Tray Pills
  document.getElementById("quickReplyTray").addEventListener("click", (e) => {
    const pill = e.target.closest(".quick-pill");
    if (pill) {
      document.getElementById("inputUserMessage").value = pill.getAttribute("data-text");
      handleUserUtterance();
    }
  });

  // Scenario Filter Buttons
  document.querySelectorAll(".clean-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".clean-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderScenariosDeck(btn.getAttribute("data-filter"));
    });
  });

  // Apply Config
  document.getElementById("btnApplyConfig").addEventListener("click", () => {
    initEngine();
    resetCall();
    updatePromptDisplay();
    alert("Variables applied! Call reset.");
  });

  // Toggle Prompt Raw / Rendered
  document.getElementById("btnTogglePromptMode").addEventListener("click", () => {
    showRenderedPrompt = !showRenderedPrompt;
    updatePromptDisplay();
  });

  // Copy Prompt
  document.getElementById("btnCopyPrompt").addEventListener("click", () => {
    const text = document.getElementById("promptDisplayBox").innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("System prompt copied to clipboard!");
    });
  });
}

function startCall() {
  const callBtn = document.getElementById("btnCallAction");
  callBtn.innerText = "End Call";
  callBtn.className = "btn btn-danger";

  document.getElementById("callStatusDesc").innerText = `In Call with ${agentEngine.context.customer_name} • LAP Qualification`;
  document.getElementById("headerStatusText").innerText = "Call Connected";
  document.getElementById("headerStatusDot").style.background = "var(--success)";

  const greeting = agentEngine.getInitialGreeting();
  renderBubble("Agent", greeting);
  speakVoice(greeting);
  updateUI();
}

function endCall() {
  agentEngine.state.call_ended = true;
  const callBtn = document.getElementById("btnCallAction");
  callBtn.innerText = "Start Call";
  callBtn.className = "btn btn-primary";

  document.getElementById("callStatusDesc").innerText = `Call Concluded with ${agentEngine.context.customer_name}`;
  document.getElementById("headerStatusText").innerText = "Call Concluded";
  document.getElementById("headerStatusDot").style.background = "var(--danger)";
  stopVoiceAnimation();
  updateUI();
}

function resetCall() {
  initEngine();
  document.getElementById("chatHistory").innerHTML = `
    <div class="chat-bubble agent">
      <div class="bubble-meta"><span>🤖 AI Voice Agent</span></div>
      <div>Click <strong>Start Call</strong> or speak through your microphone to begin the qualification conversation.</div>
    </div>
  `;
  const callBtn = document.getElementById("btnCallAction");
  callBtn.innerText = "Start Call";
  callBtn.className = "btn btn-primary";

  document.getElementById("callStatusDesc").innerText = `Ready to Call ${agentEngine.context.customer_name} • Outbound LAP Offer`;
  document.getElementById("headerStatusText").innerText = "Engine: Ready";
  document.getElementById("headerStatusDot").style.background = "var(--success)";
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  stopVoiceAnimation();
  updateUI();
}

function handleUserUtterance() {
  const inputEl = document.getElementById("inputUserMessage");
  const text = inputEl.value.trim();
  if (!text) return;

  // Auto-connect call if not started
  if (agentEngine.state.current_stage === "GREETING" && agentEngine.history.length === 0) {
    startCall();
  }

  renderBubble("Customer", text);
  inputEl.value = "";

  setTimeout(() => {
    const agentReply = agentEngine.processUtterance(text);
    renderBubble("Agent", agentReply);
    speakVoice(agentReply);
    updateUI();

    if (agentEngine.state.call_ended) {
      const callBtn = document.getElementById("btnCallAction");
      callBtn.innerText = "Start Call";
      callBtn.className = "btn btn-primary";
      document.getElementById("callStatusDesc").innerText = `Call Concluded (${agentEngine.state.current_stage})`;
    }
  }, 350);
}

function renderBubble(speaker, text) {
  const historyBox = document.getElementById("chatHistory");
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${speaker.toLowerCase()}`;

  const metaDiv = document.createElement("div");
  metaDiv.className = "bubble-meta";
  const name = speaker === "Agent" ? `${agentEngine.context.agent_name} (Voice Agent)` : agentEngine.context.customer_name;
  
  metaDiv.innerHTML = `
    <span>${speaker === "Agent" ? "🤖" : "👤"} ${name}</span>
    <button class="btn-replay-voice" title="Replay voice">▶</button>
  `;

  metaDiv.querySelector(".btn-replay-voice").addEventListener("click", () => {
    speakVoice(text, speaker === "Agent" ? "agent" : "customer");
  });

  const contentDiv = document.createElement("div");
  contentDiv.innerText = text;

  bubble.appendChild(metaDiv);
  bubble.appendChild(contentDiv);
  historyBox.appendChild(bubble);

  historyBox.scrollTop = historyBox.scrollHeight;
}

// Web Speech TTS
function speakVoice(text, role = "agent") {
  if (!speechEnabled || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = role === "agent" ? 1.05 : 0.95;

  const voices = window.speechSynthesis.getVoices();
  const isFemale = agentEngine.context.agent_gender === "Female";
  const targetVoice = voices.find(v => v.lang.startsWith("en") && (isFemale ? (v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Tara")) : (v.name.includes("Male") || v.name.includes("Rishi") || v.name.includes("Daniel"))));
  if (targetVoice) utterance.voice = targetVoice;

  startVoiceAnimation();
  utterance.onend = () => stopVoiceAnimation();
  utterance.onerror = () => stopVoiceAnimation();

  window.speechSynthesis.speak(utterance);
}

function startVoiceAnimation() {
  document.getElementById("callerCard").classList.add("speaking");
}

function stopVoiceAnimation() {
  document.getElementById("callerCard").classList.remove("speaking");
}

// Speech Recognition (STT)
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById("btnMicToggle").style.display = "none";
    return;
  }
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-IN";

  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById("inputUserMessage").value = text;
    toggleMicrophone(false);
    handleUserUtterance();
  };

  recognition.onerror = () => toggleMicrophone(false);
  recognition.onend = () => toggleMicrophone(false);
}

function toggleMicrophone(force = null) {
  if (!recognition) return;
  const micBtn = document.getElementById("btnMicToggle");
  isRecording = force !== null ? force : !isRecording;

  if (isRecording) {
    try {
      recognition.start();
      micBtn.classList.add("recording");
    } catch (e) {
      isRecording = false;
    }
  } else {
    try { recognition.stop(); } catch (e) {}
    micBtn.classList.remove("recording");
  }
}

// Update State & UI
function updateUI() {
  const state = agentEngine.state;

  // 1. Minimal Pill Strip (Call Studio)
  setStripItem("stripProperty", "stripValProperty", state.property_type, state.property_type === "agricultural" ? "fail" : (state.property_type ? "pass" : "pending"));
  setStripItem("stripOwnership", "stripValOwnership", state.ownership_status, state.ownership_status ? "pass" : "pending");
  setStripItem("stripDocs", "stripValDocs", state.documents_available === null ? "Pending" : (state.documents_available ? "Originals" : "Copies Only"), state.documents_available === true ? "pass" : (state.documents_available === false ? "fail" : "pending"));
  setStripItem("stripLoan", "stripValLoan", state.loan_amount ? `₹${(state.loan_amount / 100000).toFixed(0)}L` : "Pending", state.loan_amount ? "pass" : "pending");
  setStripItem("stripIncome", "stripValIncome", (state.occupation || state.income_mode) ? `${state.occupation || ''} (${state.income_mode || ''})` : "Pending", state.income_mode === "cash" ? "fail" : (state.occupation && state.income_mode === "bank" ? "pass" : "pending"));
  setStripItem("stripValuation", "stripValValuation", state.market_value ? state.market_value : "Pending", state.market_value ? "pass" : "pending");
  setStripItem("stripTenure", "stripValTenure", state.tenure ? `${state.tenure} Yrs` : "Pending", state.tenure ? ((state.tenure >= 3 && state.tenure <= 15) ? "pass" : "fail") : "pending");

  // Call Alert Banner
  const banner = document.getElementById("callAlertBanner");
  if (state.disqualified) {
    banner.style.display = "block";
    banner.style.background = "var(--danger-bg)";
    banner.style.border = "1px solid rgba(239, 68, 68, 0.4)";
    banner.style.color = "#fca5a5";
    banner.innerHTML = `<strong>❌ Immediate Disqualification:</strong> ${state.disqualification_reason}`;
  } else if (state.transfer_specialist_routed) {
    banner.style.display = "block";
    banner.style.background = "var(--warning-bg)";
    banner.style.border = "1px solid rgba(245, 158, 11, 0.4)";
    banner.style.color = "#fde68a";
    banner.innerHTML = `<strong>🔄 Balance Transfer Routed:</strong> Active mortgage or EMI reduction requested. Specialist callback booked.`;
  } else if (state.handoff_ready) {
    banner.style.display = "block";
    banner.style.background = "var(--success-bg)";
    banner.style.border = "1px solid rgba(16, 185, 129, 0.4)";
    banner.style.color = "#86efac";
    banner.innerHTML = `<strong>🎉 Fully Qualified Lead:</strong> All 7 criteria verified. Handoff to Senior Loan Expert ready!`;
  } else {
    banner.style.display = "none";
  }

  // 2. Tab 2 Inspector Details
  document.getElementById("inspStageBadge").innerText = `STAGE: ${state.current_stage}`;
  
  // Layer Stepper
  const slotsFilled = [state.property_type, state.ownership_status, state.documents_available !== null, state.loan_amount, state.occupation && state.income_mode, state.market_value, state.tenure].filter(Boolean).length;
  document.getElementById("inspLayer3").innerText = `${slotsFilled}/7 Slots`;
  document.getElementById("inspLayer3").className = slotsFilled > 0 ? "layer-step-badge badge-active" : "layer-step-badge badge-dim";

  if (state.disqualified) {
    document.getElementById("inspLayer5").className = "layer-step-badge badge-fail";
    document.getElementById("inspLayer5").innerText = "Disqualified";
  } else if (state.transfer_specialist_routed) {
    document.getElementById("inspLayer5").className = "layer-step-badge badge-warn";
    document.getElementById("inspLayer5").innerText = "Transfer Desk";
  } else if (state.handoff_ready) {
    document.getElementById("inspLayer5").className = "layer-step-badge badge-pass";
    document.getElementById("inspLayer5").innerText = "Qualified Handoff";
  } else {
    document.getElementById("inspLayer5").className = "layer-step-badge badge-dim";
    document.getElementById("inspLayer5").innerText = "Pending";
  }

  // Inspector Table
  setTableItem("tbPropertyVal", "tbPropertyBadge", state.property_type, state.property_type === "agricultural" ? "fail" : (state.property_type ? "pass" : "pending"));
  setTableItem("tbOwnershipVal", "tbOwnershipBadge", state.ownership_status, state.ownership_status ? "pass" : "pending");
  setTableItem("tbDocsVal", "tbDocsBadge", state.documents_available === null ? "UNKNOWN" : (state.documents_available ? "Originals Available" : "Photocopies Only"), state.documents_available === true ? "pass" : (state.documents_available === false ? "fail" : "pending"));
  setTableItem("tbLoanVal", "tbLoanBadge", state.loan_amount ? `₹${(state.loan_amount / 100000).toFixed(1)} Lakhs` : "UNKNOWN", state.loan_amount ? "pass" : "pending");
  
  const occTxt = (state.occupation || state.income_mode) ? `${state.occupation || 'UNKNOWN'} (${state.income_mode || 'UNKNOWN'})` : "UNKNOWN";
  setTableItem("tbIncomeVal", "tbIncomeBadge", occTxt, state.income_mode === "cash" ? "fail" : (state.occupation && state.income_mode === "bank" ? "pass" : "pending"));
  
  setTableItem("tbMarketVal", "tbMarketBadge", state.market_value || "UNKNOWN", state.market_value ? "pass" : "pending");
  setTableItem("tbTenureVal", "tbTenureBadge", state.tenure ? `${state.tenure} Years` : "UNKNOWN", state.tenure ? ((state.tenure >= 3 && state.tenure <= 15) ? "pass" : "fail") : "pending");
}

function setStripItem(itemId, valId, valText, status) {
  const itemEl = document.getElementById(itemId);
  const valEl = document.getElementById(valId);
  if (!itemEl || !valEl) return;

  valEl.innerText = valText ? String(valText).toUpperCase() : "Pending";
  itemEl.className = `strip-item ${status}`;
}

function setTableItem(valId, badgeId, text, status) {
  const vEl = document.getElementById(valId);
  const bEl = document.getElementById(badgeId);
  if (!vEl || !bEl) return;

  vEl.innerText = text ? String(text).toUpperCase() : "UNKNOWN";
  if (status === "pass") {
    bEl.innerHTML = `<span class="layer-step-badge badge-pass">PASS ✅</span>`;
  } else if (status === "fail") {
    bEl.innerHTML = `<span class="layer-step-badge badge-fail">FAIL ❌</span>`;
  } else {
    bEl.innerHTML = `<span class="layer-step-badge badge-dim">PENDING</span>`;
  }
}

// Render 16 Benchmark Scenarios Deck
function renderScenariosDeck(filter = "all") {
  const deck = document.getElementById("scenariosDeck");
  deck.innerHTML = "";

  const filtered = filter === "all" ? TEST_SCENARIOS : TEST_SCENARIOS.filter(s => s.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(s.category.toLowerCase()));

  filtered.forEach(sc => {
    const card = document.createElement("div");
    card.className = "test-card";

    let tagBg = "background: rgba(99, 102, 241, 0.15); color: #818cf8;";
    if (sc.category.includes("Disqualification")) tagBg = "background: rgba(239, 68, 68, 0.15); color: #f87171;";
    if (sc.category.includes("Special")) tagBg = "background: rgba(245, 158, 11, 0.15); color: #fbbf24;";
    if (sc.category.includes("Adversarial")) tagBg = "background: rgba(6, 182, 212, 0.15); color: #22d3ee;";

    card.innerHTML = `
      <div class="test-card-top">
        <div class="test-meta">
          <span class="test-tag" style="${tagBg}">${sc.category}</span>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">${sc.id.split('_')[1]}</span>
        </div>
        <div class="test-title">${sc.title}</div>
        <div class="test-desc">${sc.desc}</div>
      </div>

      <div>
        <div class="audio-bar-wrapper">
          <audio controls preload="none">
            <source src="${sc.audio_file}" type="audio/mp4">
          </audio>
        </div>

        <div class="test-footer">
          <span style="font-size: 0.74rem; color: var(--accent-cyan); font-weight: 600;">Expected: ${sc.expected}</span>
          <button class="btn btn-ghost btn-run-test" style="padding: 4px 10px; font-size: 0.74rem;" data-id="${sc.id}">
            Run in Simulator
          </button>
        </div>
      </div>
    `;

    card.querySelector(".btn-run-test").addEventListener("click", () => {
      runScenarioInSimulator(sc);
    });

    deck.appendChild(card);
  });
}

// Run Scenario & Auto-Switch to Simulator Tab
async function runScenarioInSimulator(sc) {
  // Switch to Tab 1 (Simulator)
  document.querySelectorAll(".nav-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.querySelector('[data-tab="tabSimulator"]').classList.add("active");
  document.getElementById("tabSimulator").classList.add("active");

  // Configure customer
  document.getElementById("cfgCustomerName").value = sc.customer_name;
  initEngine();
  resetCall();
  startCall();

  document.getElementById("headerStatusText").innerText = `Simulating ${sc.title}`;

  for (let i = 0; i < sc.dialogue.length; i++) {
    if (agentEngine.state.call_ended) break;

    const utt = sc.dialogue[i];
    await new Promise(r => setTimeout(r, 850));

    renderBubble("Customer", utt);
    await new Promise(r => setTimeout(r, 550));

    const reply = agentEngine.processUtterance(utt);
    renderBubble("Agent", reply);
    speakVoice(reply);
    updateUI();
  }

  document.getElementById("headerStatusText").innerText = "Simulation Finished";
}

// Prompt Display Loader
async function loadPromptTemplate() {
  try {
    const res = await fetch("system_prompt.txt");
    rawPromptTemplate = await res.text();
    updatePromptDisplay();
  } catch (e) {
    rawPromptTemplate = "Loading system prompt...";
  }
}

function updatePromptDisplay() {
  const box = document.getElementById("promptDisplayBox");
  if (!box) return;

  if (showRenderedPrompt && rawPromptTemplate) {
    let rendered = rawPromptTemplate;
    const vars = {
      company_name: document.getElementById("cfgCompanyName").value,
      customer_name: document.getElementById("cfgCustomerName").value,
      agent_name: document.getElementById("cfgAgentName").value,
      agent_gender: document.getElementById("cfgAgentGender").value,
      language_to_speak: document.getElementById("cfgLanguage").value,
      additional_context_from_rag: document.getElementById("cfgRagSnippet").value,
      current_date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      current_day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      current_time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    };

    for (const [k, v] of Object.entries(vars)) {
      rendered = rendered.replaceAll(`{{${k}}}`, v);
    }
    box.innerText = rendered;
  } else {
    box.innerText = rawPromptTemplate;
  }
}

// Export Transcript
function exportCallTranscript() {
  const transcriptData = {
    customer_name: agentEngine.context.customer_name,
    agent_name: agentEngine.context.agent_name,
    company: agentEngine.context.company_name,
    date: new Date().toISOString(),
    final_stage: agentEngine.state.current_stage,
    qualification_state: agentEngine.state,
    dialogue: agentEngine.history
  };

  const blob = new Blob([JSON.stringify(transcriptData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `home_credit_call_${Date.now()}.json`;
  a.click();
}
