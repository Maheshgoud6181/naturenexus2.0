import type { QuizQuestion } from "@/components/quiz-engine"

// TODO: Fetch questions from Firebase Firestore

// LEVEL 1: Image Based Quiz
export const level1Questions: QuizQuestion[] = [
  {
    id: "l1-q1",
    question: "What environmental process does this image primarily represent?",
    imageUrl: "/photosynthesis-green-leaves-sunlight.jpg",
    options: ["Photosynthesis", "Respiration", "Decomposition", "Pollination"],
    correctAnswer: 0,
    points: 10,
  },
  {
    id: "l1-q2",
    question: "Which renewable energy source is shown in this image?",
    imageUrl: "/solar-panels-renewable-energy.jpg",
    options: ["Wind Energy", "Solar Energy", "Hydroelectric", "Geothermal"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "l1-q3",
    question: "What type of ecosystem is depicted in this image?",
    imageUrl: "/coral-reef-ocean-ecosystem.jpg",
    options: ["Desert", "Rainforest", "Coral Reef", "Grassland"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "l1-q4",
    question: "What environmental issue is shown in this image?",
    imageUrl: "/plastic-pollution-ocean-waste.jpg",
    options: ["Air Pollution", "Plastic Pollution", "Deforestation", "Soil Erosion"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "l1-q5",
    question: "Which conservation practice is illustrated here?",
    imageUrl: "/rainwater-harvesting-water-conservation.jpg",
    options: ["Composting", "Rainwater Harvesting", "Recycling", "Afforestation"],
    correctAnswer: 1,
    points: 10,
  },
]

// LEVEL 2: Mini Case Study
export const level2Questions: QuizQuestion[] = [
  {
    id: "l2-q1",
    question:
      "A village depends on groundwater, but water levels drop every year. Which action best supports long-term water availability?",
    options: [
      "Capture rainfall locally and control extraction",
      "Drill deeper and more powerful wells",
      "Restrict water use to specific hours",
      "Transport water from nearby regions",
    ],
    correctAnswer: 0,
    points: 15,
  },
  {
    id: "l2-q2",
    question:
      "A road is planned through a forested region. What approach best balances development and ecological protection?",
    options: [
      "Design crossings for animals and restore green cover elsewhere",
      "Move wildlife to controlled areas",
      "Proceed without environmental changes",
      "Stop all construction activities",
    ],
    correctAnswer: 0,
    points: 15,
  },
  {
    id: "l2-q3",
    question:
      "A city’s landfill sites are nearing capacity. What strategy addresses the root cause of the problem?",
    options: [
      "Transfer waste to nearby regions",
      "Reduce waste through segregation and recycling",
      "Identify new dumping areas",
      "Dispose waste through burning",
    ],
    correctAnswer: 1,
    points: 15,
  },
  {
    id: "l2-q4",
    question:
      "Fish populations near a coastal town are steadily declining. What response supports long-term fishing livelihoods?",
    options: [
      "Upgrade fishing equipment",
      "Change fishing locations frequently",
      "Regulate fishing and protect breeding cycles",
      "Increase fishing effort during peak seasons",
    ],
    correctAnswer: 2,
    points: 15,
  },
  {
    id: "l2-q5",
    question:
      "A town records unusually high temperatures every summer. Which solution targets the underlying cause?",
    options: [
      "Modify road surfaces",
      "Expand green cover using region-appropriate plants",
      "Increase indoor cooling systems",
      "Remove old vegetation",
    ],
    correctAnswer: 1,
    points: 15,
  },
]


// LEVEL 3: Match & Sequence (represented as multiple choice for now)
export const level3Questions: QuizQuestion[] = [
  {
    id: "l3-q1",
    question: "Arrange the following in the correct order of the carbon cycle in nature:",
    options: [
      "Animals → Plants → CO₂ → Decomposition → Atmosphere",
      "Atmospheric CO₂ → Plants → Animals → Decomposition → CO₂ release",
      "CO₂ → Decomposition → Plants → Animals → Atmosphere",
      "Plants → CO₂ → Animals → Atmosphere → Decomposition",
    ],
    correctAnswer: 1,
    points: 20,
  },
  {
    id: "l3-q2",
    question: "Match the correct sequence of energy flow in an aquatic ecosystem:",
    options: [
      "Large fish → Small fish → Phytoplankton → Sun",
      "Sun → Fish → Phytoplankton → Humans",
      "Sun → Phytoplankton → Small fish → Large fish → Humans",
      "Humans → Large fish → Small fish → Phytoplankton → Sun",
    ],
    correctAnswer: 2,
    points: 20,
  },
  {
    id: "l3-q3",
    question: "Arrange the stages of soil formation from bare rock to fertile soil:",
    options: [
      "Weathering → Organic matter → Rock → Soil",
      "Rock → Weathering → Soil particles → Organic matter → Fertile soil",
      "Soil → Rock → Organic matter → Weathering",
      "Organic matter → Rock → Weathering → Soil",
    ],
    correctAnswer: 1,
    points: 20,
  },
  {
    id: "l3-q4",
    question: "Arrange the steps showing how solar energy becomes usable electricity:",
    options: [
      "Electricity → Sunlight → Panel → Usage",
      "Usage → Panel → Sunlight → Electricity",
      "Sunlight → Solar panel → Electricity → Usage",
      "Solar panel → Usage → Sunlight → Electricity",
    ],
    correctAnswer: 2,
    points: 20,
  },
]


// LEVEL 4: Rapid Response
export const level4Questions: QuizQuestion[] = [
  {
    id: "l4-q1",
    question: "What percentage of Earth's surface is covered by water?",
    options: ["50%", "60%", "71%", "85%"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "l4-q2",
    question: "Which gas is most responsible for global warming?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "l4-q3",
    question: "What is the largest rainforest in the world?",
    options: ["Congo Rainforest", "Amazon Rainforest", "Daintree Rainforest", "Borneo Rainforest"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "l4-q4",
    question: "How long does a plastic bottle take to decompose?",
    options: ["10 years", "50 years", "450 years", "1000 years"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "l4-q5",
    question: "Which layer of atmosphere contains the ozone layer?",
    options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "l4-q6",
    question: "What is the primary cause of coral bleaching?",
    options: ["Overfishing", "Ocean acidification", "Water temperature rise", "Oil spills"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "l4-q7",
    question: "Which country has the highest renewable energy capacity?",
    options: ["USA", "China", "Germany", "India"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "l4-q8",
    question: "What percentage of freshwater is frozen in ice caps?",
    options: ["30%", "50%", "68%", "90%"],
    correctAnswer: 2,
    points: 10,
  },
]

// LEVEL 5: True/False + Explanation (represented as MCQ with T/F options)
export const level5Questions: QuizQuestion[] = [
  {
    id: "l5-q1",
    question: "True or False: All plastics are recyclable.",
    options: [
      "True - All plastics can be recycled",
      "False - Only certain types (1, 2, 5) are commonly recyclable",
      "True - But only in special facilities",
      "False - No plastics are recyclable",
    ],
    correctAnswer: 1,
    points: 15,
    explanation: "Only certain plastic types (marked 1, 2, and 5) are commonly recyclable in most facilities.",
  },
  {
    id: "l5-q2",
    question: "True or False: Electric vehicles produce zero emissions.",
    options: [
      "True - EVs produce no emissions at all",
      "False - They produce emissions during electricity generation",
      "True - Only if charged with renewable energy",
      "Both B and C are correct",
    ],
    correctAnswer: 3,
    points: 15,
    explanation:
      "EVs produce no direct emissions, but indirect emissions depend on the electricity source used for charging.",
  },
  {
    id: "l5-q3",
    question: "True or False: Planting trees is always good for the environment.",
    options: [
      "True - Trees are always beneficial",
      "False - Wrong species in wrong places can harm ecosystems",
      "True - More trees always mean more oxygen",
      "False - Trees have no environmental impact",
    ],
    correctAnswer: 1,
    points: 15,
    explanation:
      "Planting non-native species or monocultures can harm biodiversity and local ecosystems. Native species are crucial.",
  },
]
