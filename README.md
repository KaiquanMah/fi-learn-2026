# SuomiStart - Learn to Speak Finnish 🇫🇮 in 2026

This repo contains code which you can run locally on your laptop.

* Event: [2026 SG Gemini3 Hackathon](https://luma.com/gemini3sgp)
* Date: 2026.01.10, Saturday, 9am to 9pm
* Location: Google Developers Space, Singapore
* Track 6: Real-Time Multimodal Experiences

<div align="center">
<img alt="SuomiStart Standard Blue Homepage" src="public\static\ui-homepage-standard.png" />
</div>


## Inspiration for the website/app
Inspiration for the website/app came from
1. my recent overseas travels where I needed to learn some basic words and sentences to navigate better
2. me registering for an introductory Finnish language lesson from Jan 2026 to May 2026 - so it would help other students or people new to Finland


## Development Process
* Created draft app and fixed issues in AI Studio: https://ai.studio/apps/drive/1C-ZMeP_8SBTFpXKv4V96My5x1_AIEEtr
* Committed changes to GitHub: https://github.com/KaiquanMah/fi-learn-2026
* Researched for the curriculum using `gemini-3-pro-preview` in AI Studio
* Created audio files based on the curriculum by running `npm run generate-audio` in GitHub Codespace
* Launched Antigravity IDE on my local machine to
  * work with mp3 files (which was slow and not possible in AI Studio)
  * containerise the app
  * debug and test the app locally
  * debug and deploy the app to Vercel
* To understand
  * the project, please read `markdown.md`
  * instructions on how to run the app locally or to deploy on a hosting service such as Vercel, please read `markdown.md section ## 9. Deployment Guide`
    * local: `localhost:3000`
    * vercel: https://fi-learn-2026.vercel.app
  * the curriculum researched by `gemini-3-pro-preview` in AI Studio, visit `data/curriculum.ts` and `data/curriculum.md`
    * the words and sentences found in the curriculum were used to generate a corresponding audio/mp3 file using `Google Cloud Text-to-Speech API (enabled in my Google Cloud Platform project)`
    * the mp3 files are stored in the `public/audio` folder, with file naming convention: `{finnish word or sentence}.mp3`
* 3-minute demo video for the 2026.01.10 Saturday - SG Gemini3 Hackathon
  * https://www.youtube.com/watch?v=UjYpcIp_nRQ



## Google APIs / Tools Used
<div align="center">
<img width="1200" height="475" alt="Google AI Studio - Build Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

| API/Tool | Description |
| --- | --- |
| Google AI Studio - Build | Create draft app |
| Google AI Studio - Playground (Gemini 3 Pro Preview) | Research words and sentences for the curriculum |
| Antigravity IDE (Gemini 3 Pro High) | Debug and test the app |
| Google Cloud Text-to-Speech API | Create audio files for the curriculum (Google Cloud TTS API was used instead of `gemini-2.5-pro-preview-tts` or `gemini-2.5-flash-preview-tts` because these 2 gemini models needed me to manually enter each word or sentence into the AI Studio UI 1 by 1 to generate each audio file. That was before I discovered the [documentation for these 2 gemini audio generation models on 2026.01.12 (after the hackathon)](https://ai.google.dev/gemini-api/docs/speech-generation). So during the hackathon, given time constraints, I was running a script calling the Google Cloud TTS API to generate audio files programmatically for the curriculum) |
| Google Gemini Live API (`gemini-2.5-flash-native-audio-preview-12-2025`) | Grade students' writing during word and sentence writing quizzes |
| Google Gemini API (`gemini-3-pro-preview`) | Conversation practice |

