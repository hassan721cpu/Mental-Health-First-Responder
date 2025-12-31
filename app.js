// =========================
// MENTAL HEALTH RESOURCE ROUTER
// =========================

// Rule-based concern classification
function classifyConcernLevel(text) {
    const lowerText = text.toLowerCase();

    const highWords = ['suicide', 'kill myself', 'end my life', 'want to die', 'ending it all'];
    const mediumWords = ['depressed', 'hopeless', 'anxiety attack', 'panic attack', 'overwhelmed', 'crying all day', 'worthless']; 
    const lowWords = ['stressed', 'sad', 'worried', 'anxious', 'tired', 'frustrated', 'lonely', 'burned out'];

    for (let word of highWords) if (lowerText.includes(word)) return 'HIGH';
    for (let word of mediumWords) if (lowerText.includes(word)) return 'MEDIUM';
    for (let word of lowWords) if (lowerText.includes(word)) return 'LOW';
    return 'NEUTRAL';
}

// Randomized resources for dynamic output
function getSupportResources(level) {
    const resources = {
        HIGH: [
            '988 Suicide & Crisis Lifeline (Call or Text 988)',
            'Crisis Text Line: Text HOME to 741741',
            'Emergency Services: 911'
        ],
        MEDIUM: [
            'NAMI Helpline: 1-800-950-NAMI',
            'SAMHSA Helpline: 1-800-662-HELP',
            '7 Cups of Tea: Free emotional support listeners'
        ],
        LOW: [
            'Headspace (Meditation app)',
            'Calm (Sleep & meditation app)',
            'Mental Health America: Self-screening tools'
        ],
        NEUTRAL: [
            'Talk to a trusted friend or family member',
            'Practice self-care activities you enjoy',
            'Consider a wellness check with a healthcare provider'
        ]
    };

    // Shuffle resources to make it appear dynamic
    const list = resources[level] || resources.NEUTRAL;
    return list.sort(() => Math.random() - 0.5);
}

// =========================
// Voice recognition setup
// =========================
function setupVoiceRecognition() {
    const voiceBtn = document.getElementById('voice-btn');
    const voiceOutput = document.getElementById('voice-output');
    const languageSelect = document.getElementById('language-select');

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.onclick = () => {
            recognition.lang = languageSelect.value;
            recognition.start();
            voiceOutput.textContent = "🎤 Listening... Please speak now.";
            voiceBtn.disabled = true;
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            voiceOutput.textContent = `You said: "${transcript}"`;
            processUserInput(transcript);
            voiceBtn.disabled = false;
        };

        recognition.onerror = () => {
            voiceOutput.textContent = "Voice recognition error. Please try typing instead.";
            voiceBtn.disabled = false;
        };

        recognition.onend = () => { voiceBtn.disabled = false; };
    } else {
        voiceBtn.disabled = true;
        voiceOutput.textContent = "Voice recognition not supported in this browser. Please use text input.";
    }
}

// =========================
// Text input handling
// =========================
function processText() {
    const textInput = document.getElementById('text-input');
    if (textInput.value.trim()) processUserInput(textInput.value);
    else alert("Please type how you're feeling first.");
}

// =========================
// Main processing
// =========================
function processUserInput(text) {
    const level = classifyConcernLevel(text);
    const resources = getSupportResources(level);
    displayResults(level, resources, text);
}

// =========================
// Display results
// =========================
function displayResults(level, resources, originalText) {
    const resultsDiv = document.getElementById('results');
    const colors = { HIGH: '#ff4444', MEDIUM: '#ffaa00', LOW: '#44aa44', NEUTRAL: '#888888' };

    resultsDiv.className = 'result ' + level.toUpperCase();
    resultsDiv.innerHTML = `
        <h3>📊 Assessment: <span style="color:${colors[level]}">${level} Concern Level</span></h3>
        <p><strong>What you shared:</strong> "${originalText.substring(0, 150)}${originalText.length > 150 ? '...' : ''}"</p>
        <p><strong>Suggested support resources:</strong></p>
        <ul>${resources.map(r => `<li>${r}</li>`).join('')}</ul>
        <p><small><em>Not medical advice. These are suggested resources for support.</em></small></p>
    `;
}

// =========================
// Initialize
// =========================
window.onload = function() {
    setupVoiceRecognition();
    console.log('🚀 Mental Health First Responder initialized');
};
