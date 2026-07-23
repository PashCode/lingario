// how long we wait before the next exercise
// the user needs to see the green or red color first
export const ANSWER_ANIMATION_DELAY = 250;

export const ANSWER_RESULTS = {
  PERFECT: "perfect",
  PASSED: "passed",
  FAILED: "failed",
} as const;

export const ANSWER_COLORS = {
  SELECTED: "bg-gray-300",
  CORRECT: "bg-green-800 border-white-500 text-white",
  WRONG: "bg-red-500 border-white-500 text-white",
} as const;

export const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-[#EDDBDB]",
  A2: "bg-[#D3DBE4]",
  B1: "bg-[#D5DDD0]",
  B2: "bg-[#E8E1D8]",
} as const;