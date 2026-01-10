# SuomiStart - Project Specification

## 1. Executive Summary
**SuomiStart** is an accessible Finnish language learning application designed for total beginners. It combines a **structured, researched curriculum** with **AI-powered grading and conversation practice**. 

The app prioritizes inclusivity for elderly users, individuals with ADHD, visually impaired users, and travelers through its UI design, while keeping the learning path consistent for all users. Google's Gemini API is utilized for two specific purposes:
1.  **Grading & Feedback**: Assessing user answers in quizzes and exercises (cost-effective model).
2.  **Live Conversation**: Real-time speaking practice (low-latency audio model).

## 2. Target Audience & Personas
*While the curriculum (defined in data/curriculum.md) is unified, the UI adapts to specific needs:*

### 1. The Elderly Learner (Eino)
*   **Needs**: Large font sizes, high contrast, clear navigation, no time pressure.
*   **Pain Points**: Small touch targets, accidental clicks, complex menus.
* UI/Visuals: Use high-contrast text (black on white) and a large font size (minimum 16px, preferably 18px+). Avoid rapid animations.


### 2. The ADHD Learner (Alex)
*   **Needs**: Short practices, immediate feedback, gamified progress tracking.
*   **Pain Points**: Long reading passages without interaction.

### 3. The Visually Impaired Learner (Sari)
*   **Needs**: Screen reader compatibility (ARIA), high contrast modes.
*   **Pain Points**: Low contrast text, non-semantic elements.
* Tech Specs: Ensure full compatibility with Screen Readers (e.g., JAWS, NVDA, VoiceOver). All images must have descriptive Alt Text.
* Navigation: Use clear, linear keyboard navigation (Tab key friendly). Avoid drag-and-drop exercises; use click-to-select instead.


### 4. The Traveler (Sam)
*   **Needs**: Survival phrases (Greetings, Directions) accessible quickly.
*   **Pain Points**: Getting stuck on complex grammar before learning useful phrases.

## 3. User Stories

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-1 | Elderly/Visual | As a user, I want to toggle high contrast and increase font size. | Global UI updates immediately; settings persist in LocalStorage. |
| US-2 | All | As a student, I want to study a structured lesson (e.g., "Basics 1"). | System displays a static list of researched vocab and sentences; TTS available. |
| US-3 | All | As a student, I want to take a quiz on the lesson and get AI grading. | User types/speaks answer; AI compares with correct answer and explains mistakes (e.g., "Almost! You missed the partitive case"). |
| US-4 | Traveler | As a traveler, I want to practice speaking with a local (AI). | Live 2-way audio conversation; AI alternates EN/FI; infinite replayability. |
| US-5 | All | As a user, I need to provide my own API key. | Secure input modal; Key stored in LocalStorage. |
| US-6 | ADHD | As a learner, I want immediate sensory feedback when I answer correctly. | Confetti animation triggers; satisfying "ding" sound plays; toggle available in settings to mute. |
| US-7 | ADHD | As a learner, I want to see my progress visually *during* the quiz. | Progress bar updates instantly after every question; shows percentage completed to reduce anxiety. |
| US-8 | Traveler | As a traveler, I want to access lesson content even without internet. | Static `LessonView` loads from Service Worker cache; UI warns that "AI Grading is unavailable offline." |
| US-9 | All | As a user, I want graceful error handling if the AI service disconnects. | UI shows a non-intrusive Toast notification ("Reconnecting..."); app does not crash; "Retry" button appears. |
| US-10 | All | As a user, I want graceful error handling if the AI service disconnects. | UI shows a non-intrusive Toast notification ("Reconnecting..."); app does not crash; "Retry" button appears. |
| US-11 | All | As a student, I want to hear consistent, high-quality pronunciation for vocabulary. | Audio plays instantly (no loading spinner); Voice is a standard Finnish accent (Neural TTS), not a robotic or hallucinating AI voice. |



## 4. Technical Stack

### Frontend
*   **Framework**: React 18 + TypeScript
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM
*   **State**: Context API
*   **PWA**: Vite PWA Plugin (Service Workers for offline caching)
*   **Deployment**: Dockerized Static Container

### AI & Backend Services
*   **SDK**: `@google/genai`
*   **Grading Model**: `gemini-3-pro-preview`
    *   *Rationale*: Chosen over Flash models to provide deeper reasoning and more accurate grammatical explanations for Finnish cases.
*   **Live Interaction Model**: `gemini-2.5-flash-native-audio-preview-12-2025`
    *   *Usage*: Real-time, low-latency conversational practice.
*   **TTS Strategy**: Google Cloud TTS API to pre-generate MP3s for static audio content, to allow students to listen to the correct Finnish pronunciation of words and sentences
    *   *Model*: `fi-FI-Neural2-A` (High-quality female) or `fi-FI-Neural2-B` (High-quality male).
    *   *Rationale*: Zero latency for users, consistent pronunciation, and lower long-term costs compared to on-the-fly 
*   **Database**: `sqlite` (Future roadmap for persistent progress).





## 5. Architecture

### 5.1 Content Pipeline (Pre-Build)
*To ensure offline access (US-8) and instant playback, curriculum audio is pre-generated.*

1.  **Script**: `scripts/generate_audio.ts`
2.  **Source**: Iterates through `data/curriculum.ts`.
3.  **Action**:
    *   Checks if `public/audio/{hash}.mp3` exists.
    *   If not, calls **Google Cloud Text-to-Speech API**.
    *   **Config**: Language: `fi-FI`, Voice: `Neural2`, Encoding: `MP3`.
    *   *Note*: We do NOT use Gemini for this, as Gemini is optimized for dialogue, not precise dictation of single words.
4.  **Output**: Saves files to `/public/audio/` and updates the curriculum manifest.



### 5.2 Client-Side Architecture

1.  **Data Layer (`curriculum.ts`)**:
    *   Contains the **Hardcoded Curriculum**: A researched JSON structure of modules (Greetings, Food, Travel).
    *   *No generative curriculum*. Everyone gets the same high-quality base content.
    *   **Assets**: Audio files can be stored in `data/audio/` mapped to curriculum IDs.

2.  **Service Layer**:
    *   **`gradingService.ts`**: Sends user input + target answer to Gemini (`gemini-3-pro-preview`). Returns a JSON object: `{ correct: boolean, feedback: string }`.
    *   **`geminiService.ts`**: Audio utilities for the Live API.

3.  **UI Component Layer**:
    *   **`DashboardView`**: The main landing page.
        *   *Function*: Displays a grid of Lesson Modules grouped by Level (0, A1.1, etc.).
        *   *Accessibility*: Uses large, high-contrast cards (minimum 48x48px touch targets) for the Elderly persona.
        *   *Status*: Visually indicates "Locked," "Unlocked," and "Completed" states.
    *   **`LessonView`**: Displays static content (Vocab/Sentences).
    *   **`QuizView`**: Input field for user translation -> Calls `gradingService`.
    *   **`LivePractice`**: WebSocket connection for open-ended conversation.





### 5.3 Data Flow (Quiz Grading)
1.  User studies "Basics 1".
2.  User enters Quiz Mode. Prompt: "Translate 'Hello' to Finnish".
3.  User types: "Moi".
4.  **Frontend Check**: App first checks `curriculum.ts` for exact string match (Instant feedback, 0 latency).
5.  **AI Fallback**: If no exact match, call `gradingService.grade("Moi", "Hei/Moi")`.
    *   *Why*: Reduces API costs and latency for obvious answers.
6.  Gemini evaluates: "Correct. 'Moi' is a common informal greeting."
7.  **Accessibility**: Result is injected into an `aria-live` region for screen readers.
8.  App shows feedback and XP reward.





## 6. Curriculum Strategy (Researched & Structured)

The app uses a fixed progression path to ensure pedagogical quality.
Please refer to data/curriculum.md.



## 7. Accessibility & UI
*   **Universal Design**: The "Traveler" or "ADHD" persona does not change the *content*, but the **Live Practice** mode can be used to roleplay specific scenarios (infinite replayability).
*   **Visuals**: High contrast toggles and font scaling remain core features.
*   **Screen Reader Support**: 
    *   Use `aria-live="polite"` for AI feedback containers so blind users hear the correction immediately.
    *   All interactive elements (Quiz inputs) must support `onKeyDown` (Enter key) submission, not just click buttons.
*   **ADHD Features (MVP)**:
    *   **Micro-Animations**: Confetti/Color flash on correct answers (using `framer-motion`).
    *   **Audio Cues**: Distinct sounds for Success/Failure (toggleable).
    *   **Progress**: A visual progress bar that updates *per question*, not just at the end.


## 8. Future Roadmap
1.  **Backend Integration**: Python + SQLite backend to store user XP and quiz history.
2.  **Containerization**: Dockerfile to package the full stack.
3.  **Gamification**: Badges for "7 Day Streak", "Vocabulary Master".

