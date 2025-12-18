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
      "A city plans to build a new industrial zone near a wetland that supports 50+ bird species. What should be the priority action?",
    options: [
      "Proceed immediately to boost economy",
      "Conduct Environmental Impact Assessment first",
      "Relocate the birds to another area",
      "Build a wall around the wetland",
    ],
    correctAnswer: 1,
    points: 15,
  },
  {
    id: "l2-q2",
    question:
      "A farmer notices declining crop yields and increasing pest problems. Soil tests show low organic content. What's the most sustainable solution?",
    options: [
      "Use more chemical fertilizers and pesticides",
      "Implement crop rotation and composting",
      "Switch to monoculture farming",
      "Increase irrigation frequency",
    ],
    correctAnswer: 1,
    points: 15,
  },
  {
    id: "l2-q3",
    question:
      "A coastal village faces regular flooding due to rising sea levels. What is the most effective long-term adaptation strategy?",
    options: [
      "Build higher walls",
      "Restore mangrove forests and wetlands",
      "Relocate inland immediately",
      "Install water pumps",
    ],
    correctAnswer: 1,
    points: 15,
  },
  {
    id: "l2-q4",
    question: "A company wants to reduce its carbon footprint. Which combination would be most effective?",
    options: [
      "Use renewable energy + reduce waste + optimize transport",
      "Only switch to LED lights",
      "Plant trees but continue current operations",
      "Buy carbon credits without changing operations",
    ],
    correctAnswer: 0,
    points: 15,
  },
]

// LEVEL 3: Match & Sequence (represented as multiple choice for now)
export const level3Questions: QuizQuestion[] = [
  {
    id: "l3-q1",
    question: "Arrange the following in the correct order of the water cycle:",
    options: [
      "Evaporation → Condensation → Precipitation → Collection",
      "Condensation → Evaporation → Collection → Precipitation",
      "Precipitation → Evaporation → Condensation → Collection",
      "Collection → Precipitation → Evaporation → Condensation",
    ],
    correctAnswer: 0,
    points: 20,
  },
  {
    id: "l3-q2",
    question: "Match the correct food chain sequence in a grassland ecosystem:",
    options: [
      "Grass → Grasshopper → Frog → Snake → Hawk",
      "Hawk → Snake → Frog → Grasshopper → Grass",
      "Grasshopper → Grass → Frog → Snake → Hawk",
      "Snake → Hawk → Frog → Grass → Grasshopper",
    ],
    correctAnswer: 0,
    points: 20,
  },
  {
    id: "l3-q3",
    question: "Arrange these renewable energy sources by global installed capacity (highest to lowest):",
    options: [
      "Hydroelectric → Wind → Solar → Geothermal",
      "Solar → Wind → Hydroelectric → Geothermal",
      "Wind → Solar → Hydroelectric → Geothermal",
      "Geothermal → Solar → Wind → Hydroelectric",
    ],
    correctAnswer: 0,
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
