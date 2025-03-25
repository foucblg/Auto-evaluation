export interface AutoevalData {
  topics: string[],
  possible_answers: string[],
  questions: Record<string, AutoevalSegment[]>,
}

export interface AutoevalSegment {
  question: string,
  outOf: number,
}
