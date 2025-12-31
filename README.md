# Mental Health First Responder

## Problem
Many people experience mental health distress but do not know
where to seek help immediately. In crisis situations, fast and
responsible routing can save lives.

## Solution
Mental Health First Responder is a safety-first triage system.
It classifies mental health risk and routes users to appropriate
resources without providing medical advice or diagnosis.

## How It Works
1. User describes how they are feeling.
2. The system classifies risk into:
   LOW, MEDIUM, HIGH, or CRISIS.
3. Based on risk, the system routes the user to predefined guidance.

## Safety & Ethics
- No medical advice is generated.
- No diagnosis is provided.
- No conversational AI is used.
- The system only classifies and routes.

## Technology & Architecture
- HTML + JavaScript
- Rule-based classification (AI-ready design)
- Structured event logging (Datadog-style)
- Event-driven flow (Confluent-style)

## Platform Alignment
- Datadog: Observability via structured logs
- Confluent: Event-based architecture
- ElevenLabs: Voice-ready design for accessibility

## Disclaimer
This project is for demonstration purposes only.
If you are in danger, contact emergency services immediately.
