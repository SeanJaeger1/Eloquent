export interface Word {
  definition: string
  meaning: string
  word: string
  wordType: string
}

export interface UserWord {
  id: string
  word: Word
  progress: number
}
