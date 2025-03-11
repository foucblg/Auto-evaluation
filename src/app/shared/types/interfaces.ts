export interface AuditData {
  topics: string[],
  possible_answers: string[],
  questions: Record<string, AuditSegment[]>,
}

export interface AuditSegment {
  question: string,
  outOf: number,
}
