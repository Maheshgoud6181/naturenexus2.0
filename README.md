# NATURE NEXUS 2.0 - Environmental Quiz Application

A beautiful, modern environmental quiz competition platform built with Next.js, featuring 6 unique quiz levels, real-time leaderboards, and anti-cheating mechanisms.

## Features

### User Experience
- 🌿 **Stunning UI** - Nature-inspired design with green gradients and glassmorphism
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Smooth Animations** - Engaging transitions and hover effects
- 🎯 **6 Unique Levels** - Image quiz, case studies, sequencing, rapid fire, and bonus challenge

### Quiz Features
- ⏱️ **Timer System** - Individual timers for each level with auto-submission
- 🏆 **Live Leaderboard** - Real-time rankings with score tracking
- 🎖️ **Time Bonus** - Rewards for faster completion
- 📊 **Detailed Results** - Level-wise performance breakdown
- 🔒 **Anti-Cheating** - Tab switching detection and violation tracking

### Technical Features
- ⚛️ **Next.js 16** - App Router with Server Components
- 🎨 **Tailwind CSS v4** - Modern styling with design tokens
- 🧩 **shadcn/ui** - Beautiful, accessible components
- 🔥 **Ready for Firebase** - Clear TODOs for backend integration
- 📦 **Type-Safe** - Full TypeScript implementation

## Project Structure

```
├── app/
│   ├── page.tsx                    # Landing page
│   ├── register/page.tsx           # Registration form
│   ├── instructions/page.tsx       # Quiz instructions
│   ├── quiz/
│   │   ├── level-1/page.tsx        # Image-based quiz
│   │   ├── level-2/page.tsx        # Mini case studies
│   │   ├── level-3/page.tsx        # Match & sequence
│   │   ├── level-4/page.tsx        # Rapid response
│   │   ├── level-5/page.tsx        # True/false + explanation
│   │   └── level-6/page.tsx        # Bonus social media challenge
│   ├── leaderboard/page.tsx        # Live rankings
│   ├── results/page.tsx            # Final results
│   └── not-found.tsx               # 404 page
├── components/
│   ├── quiz-engine.tsx             # Reusable quiz component
│   ├── anti-cheat-monitor.tsx      # Anti-cheating system
│   └── ui/                         # shadcn components
└── lib/
    ├── quiz-data.ts                # Mock quiz questions
    └── utils.ts                    # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download the repository

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Firebase Integration (Optional)

This app is designed to work with Firebase Firestore for backend functionality. Search for `TODO:` comments throughout the codebase to add Firebase integration:

### Required Firebase Features
- **Firestore Database** - Store participant data, quiz answers, scores
- **Firebase Storage** - Upload bonus level screenshots
- **Real-time Listeners** - Live leaderboard updates

### Key Integration Points
1. `app/register/page.tsx` - Save participant data
2. `components/quiz-engine.tsx` - Save answers and scores
3. `app/leaderboard/page.tsx` - Real-time leaderboard
4. `app/quiz/level-6/page.tsx` - Upload screenshots
5. `components/anti-cheat-monitor.tsx` - Log violations

## Quiz Levels

### Level 1: Image Based Quiz (10 mins)
- Identify environmental concepts from images
- Multiple choice questions
- 10 points per correct answer

### Level 2: Mini Case Study (15 mins)
- Analyze environmental scenarios
- Decision-making questions
- 15 points per correct answer

### Level 3: Match & Sequence (10 mins)
- Test logical thinking
- Pattern recognition
- 20 points per correct answer

### Level 4: Rapid Response (8 mins)
- Quick-fire questions
- Test knowledge and reflexes
- 10 points per correct answer

### Level 5: True/False + Explanation (12 mins)
- Justify answers with reasoning
- Two-step questions
- 15 points per correct answer

### Level 6: Bonus Challenge
- Social media engagement tasks
- Follow Instagram & Facebook
- Upload proof screenshot
- 50 bonus points

## Scoring System

**Final Ranking based on:**
1. Total Score (from all levels)
2. Time Bonus (faster completion)
3. Completion Time (tie-breaker)

**Time Bonus Calculation:**
- Time saved = Total time limit - Actual time taken
- Bonus points = Time saved / 10

## Anti-Cheating Features

The app monitors for:
- Tab switching
- Window losing focus
- Page refresh attempts
- Developer tools access
- Right-click (context menu)

**Violation Policy:**
- First 2 violations: Warning
- 3rd violation: Automatic disqualification

## Customization

### Changing Quiz Content
Edit `lib/quiz-data.ts` to modify:
- Questions
- Options
- Correct answers
- Point values
- Images

### Styling
The app uses design tokens in `app/globals.css`:
- Modify colors by changing CSS variables
- All components use semantic tokens
- Theme is nature-inspired with green tones

### Time Limits
Adjust time limits in each level page:
```tsx
<QuizEngine 
  timeLimit={600} // seconds
  ...
/>
```

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Inter, Space Grotesk

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Created for Prakriti - The Techno Environmental Club

---

**Built with ❤️ by v0**
