/**
 * Converts Finnish text into a safe filename.
 * Example: "Hyvää huomenta!" -> "hyvaa_huomenta"
 */
export const getAudioFilename = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/å/g, 'a')
    // Replace non-alphanumeric chars (except space) with nothing
    .replace(/[^a-z0-9 ]/g, '')
    // Replace spaces with underscores
    .replace(/\s+/g, '_');
};

/**
 * Tries to play the pre-generated MP3. 
 * Fallback: Browser native TTS.
 */
export const playAudio = (text: string) => {
  const filename = getAudioFilename(text);
  const audioPath = `/audio/${filename}.mp3`;

  const audio = new Audio(audioPath);
  
  audio.play().catch((err) => {
    console.warn(`Pre-generated audio not found for: "${filename}". Falling back to browser TTS.`);
    
    // Fallback to browser synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fi-FI';
      utterance.rate = 0.9; // Slightly slower for learners
      window.speechSynthesis.speak(utterance);
    }
  });
};