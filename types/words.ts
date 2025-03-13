export interface Word {
  definition: string
  difficulty: string
  index: number
  examples: string[]
  synonyms: string[]
  antonyms: string[]
  word: string
  wordType: string
}

export interface UserWord {
  id: string
  alreadyKnown: boolean
  difficulty: string
  lastSeenAt: string | null
  learned: boolean
  progress: number
  userId: string
  word: Word
}
