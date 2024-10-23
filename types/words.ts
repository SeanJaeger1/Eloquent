export interface Word {
  definition: string
  meaning: string
  word: string
  wordType: string
}

export interface UserWord {
  word: Word
  progress: number
}
