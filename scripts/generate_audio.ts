/**
 * RUN THIS SCRIPT LOCALLY TO GENERATE AUDIO ASSETS.
 * Usage: npx ts-node scripts/generate_audio.ts
 * Prerequisite: Google Cloud Credentials set in environment.
 */

import fs from 'fs';
import path from 'path';
import textToSpeech from '@google-cloud/text-to-speech';
// Explicit extensions added to fix ts-node resolution
import { curriculumLevels } from '../data/curriculum.ts';
import { getAudioFilename } from '../utils/audioHelpers.ts';

// Ensure output directory exists
const OUTPUT_DIR = path.join(__dirname, '../public/audio');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const client = new textToSpeech.TextToSpeechClient();

async function generateAudio(text: string, index: number, total: number) {
  const filename = getAudioFilename(text) + '.mp3';
  const filePath = path.join(OUTPUT_DIR, filename);

  if (fs.existsSync(filePath)) {
    // console.log(`[${index}/${total}] Skipping (exists): ${filename}`);
    return;
  }

  console.log(`[${index}/${total}] Generating: ${filename} for "${text}"`);

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text: text },
      // Neural2 is not supported for Finnish yet. Using WaveNet (High Quality).
      voice: { languageCode: 'fi-FI', name: 'fi-FI-WaveNet-A' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    if (response.audioContent) {
      fs.writeFileSync(filePath, response.audioContent, 'binary');
    }
  } catch (error: any) {
    // Check for Permission Denied / Service Disabled error
    if (error.code === 7 || error.message?.includes('PERMISSION_DENIED') || error.reason === 'SERVICE_DISABLED') {
      console.error('\n\x1b[31m%s\x1b[0m', '--------------------------------------------------------------------------------');
      console.error('\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: Cloud Text-to-Speech API is disabled for this project.');
      console.error('\x1b[31m%s\x1b[0m', '--------------------------------------------------------------------------------');
      console.error(`You need to enable it at: ${error.errorInfoMetadata?.activationUrl || 'https://console.cloud.google.com/apis/library/texttospeech.googleapis.com'}`);
      console.error('\nNOTE: You can skip this step! The app will fallback to the browser\'s built-in');
      console.error('text-to-speech engine if these files are missing.');
      console.error('Run "npm start" to launch the app now.\n');
      process.exit(1);
    }

    console.error(`FAILED to generate ${text}:`, error.message);
  }
}

async function run() {
  console.log('Starting Audio Generation...');
  
  // Flatten all text from the curriculum
  const allTexts = new Set<string>();

  curriculumLevels.forEach(level => {
    level.topics.forEach(topic => {
      topic.vocab.forEach(v => allTexts.add(v.fi));
      topic.sentences.forEach(s => allTexts.add(s.fi));
    });
  });

  const textsArray = Array.from(allTexts);
  console.log(`Found ${textsArray.length} unique phrases.`);

  for (let i = 0; i < textsArray.length; i++) {
    await generateAudio(textsArray[i], i + 1, textsArray.length);
  }

  console.log('Done! All audio files generated in /public/audio/');
}

// Check if being run directly
if (require.main === module) {
  run().catch(console.error);
}