export interface GameData {
    userId: number;
    settings: Settings;
    content: any;
    translations: Translation[];
    levelsCompleted: Level[];
  }
  
  export interface Settings {
    muted: boolean;
  }
  
  export interface Translation {
    key: string;
    value: string;
  }
  
  export interface Level {
    level: number;
    score: number;
    maxScore: number;
  }