
export interface CreativeSolution {
  techniqueName: string;
  techniqueDescription: string;
  problemClassification: string;
  whyChosen: string;
  comparisonReasoning: string;
  steps: {
    title: string;
    content: string;
    icon?: string;
  }[];
  finalRecommendation: string;
  suggestedActionItems: string[];
}

export enum CreativityTechnique {
  SCAMPER = "SCAMPER",
  SIX_HATS = "Six Thinking Hats",
  TRIZ = "TRIZ",
  DESIGN_THINKING = "Design Thinking",
  LATERAL_THINKING = "Lateral Thinking",
  BLUE_OCEAN = "Blue Ocean Strategy",
  FIRST_PRINCIPLES = "First Principles Thinking",
  DISNEY_METHOD = "Disney Method",
  REVERSE_BRAINSTORMING = "Reverse Brainstorming",
  LOTUS_BLOSSOM = "Lotus Blossom",
  MORPHOLOGICAL_ANALYSIS = "Morphological Analysis",
  SYNECTICS = "Synectics",
  FIVE_WHYS = "Five Whys (Root Cause)",
  FORCE_FIELD = "Force Field Analysis",
  MIND_MAPPING = "Mind Mapping",
  SWOT_CREATIVE = "Creative SWOT",
  RANDOM_WORD = "Random Word Association",
  STORYBOARDING = "Storyboarding",
  EMPATHY_MAPPING = "Empathy Mapping",
  MEDICI_EFFECT = "Medici Effect",
  PARALLEL_THINKING = "Parallel Thinking",
  BIOMIMICRY = "Biomimicry",
  ANALOGICAL_THINKING = "Analogical Thinking"
}

export interface ProblemHistory {
  id: string;
  problem: string;
  solution: CreativeSolution;
  timestamp: number;
}
