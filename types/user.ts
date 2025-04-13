export type SkillLevel = '' | 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type NextWords = [number, number, number, number]

export interface User {
  uid: string
  email: string
  dateJoined: {
    seconds: number
    nanoseconds: number
  }
  skillLevel: SkillLevel
  nextWords: NextWords
}
