export enum UserType {
  Standard = 'Standard',
  Elderly = 'Elderly',
  ADHD = 'ADHD',
  VisuallyImpaired = 'VisuallyImpaired',
  Traveler = 'Traveler'
}

export interface UserSettings {
  userType: UserType;
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  apiKey?: string;
  soundEffects: boolean; // New setting for ADHD/Sensory needs
}

export interface VocabItem {
  fi: string;
  en: string;
  context: string;
}

export interface SentenceItem {
  fi: string;
  en: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  vocab: VocabItem[];
  sentences: SentenceItem[];
}

export interface Level {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}