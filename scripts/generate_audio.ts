/**
 * RUN THIS SCRIPT LOCALLY TO GENERATE AUDIO ASSETS.
 * Usage: npx ts-node scripts/generate_audio.ts
 * Prerequisite: Google Cloud Credentials set in environment.
 */

import fs from 'fs';
import path from 'path';
import textToSpeech from '@google-cloud/text-to-speech';
import { curriculumLevels } from '../data/curriculum';
import { getAudioFilename } from '../utils/audioHelpers';

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
      // Neural2 is the high-quality AI voice
      voice: { languageCode: 'fi-FI', name: 'fi-FI-Neural2-A' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    if (response.audioContent) {
      fs.writeFileSync(filePath, response.audioContent, 'binary');
    }
  } catch (error) {
    console.error(`FAILED to generate ${text}:`, error);
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