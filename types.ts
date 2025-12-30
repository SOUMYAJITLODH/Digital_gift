
export interface Ratings {
  experience: number;
  flirting: number;
  feelings: number;
  comment: string;
}

export enum AppState {
  INTRO = 'INTRO',
  LETTER = 'LETTER',
  RATING = 'RATING',
  FINAL = 'FINAL'
}
