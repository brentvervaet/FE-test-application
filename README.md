# 🎯 Programming Skills Test - Gamified Dashboard

## 📋 Task Overview

You are tasked with building a **Gamified Dashboard** application using Vue 3, TypeScript, and Pinia. This is a test to evaluate your programming skills, understanding of modern frontend development, and ability to work with a structured codebase.

## 🎯 What You Need to Build

Create a dashboard application that displays:
- **User Profile** - Show user information with avatar, name, and level
- **Level Progress** - Display XP progress with a progress bar and level information
- **Achievements** - Show a grid of achievements (locked/unlocked states)
- **Interactive Features** - Add XP functionality and smooth user experience

## 🛠️ Technical Requirements

### Must Use:
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **Bootstrap 5** for styling
- **Responsive design** (mobile-first)

### Must Implement:
- Proper TypeScript interfaces and types
- Component-based architecture
- State management with Pinia
- Error handling and loading states
- Responsive design
- Clean, readable code with comments

## 📁 Project Structure

```
src/
├── components/              # Vue components (TODO: Implement)
│   ├── Dashboard.vue               # Main dashboard
│   ├── ProfileCard.vue             # User profile display
│   ├── LevelProgress.vue          # XP and level progress
│   └── AchievementList.vue         # Achievements grid
├── stores/                  # Pinia stores (TODO: Implement)
│   └── userStore.ts               # User data management
├── api/                     # API layer
│   └── mockData.ts               # Mock data and API calls
├── assets/                  # Static assets
│   └── main.css                  # Global styles
├── App.vue                  # Root component
└── main.ts                  # Application entry point
```

## 🎨 Design Requirements

### Visual Design:
- Use Bootstrap 5 for styling
- Implement a modern, clean interface
- Add hover effects and transitions
- Make it responsive (mobile-first)
- Use Bootstrap Icons for icons

### User Experience:
- Show loading states while data loads
- Handle errors gracefully with retry options
- Smooth animations and transitions
- Intuitive user interactions

## 📝 Implementation Tasks

### 1. State Management (stores/userStore.ts)
```typescript
// TODO: Implement Pinia store
// TODO: Add state management
// TODO: Add computed properties
// TODO: Add actions for data fetching
```

### 2. Components
- **Dashboard.vue**: Main orchestrator component
- **ProfileCard.vue**: Display user information
- **LevelProgress.vue**: Show XP progress and level
- **AchievementList.vue**: Display achievements grid

### 3. Features to Implement
- [ ] User profile display with avatar
- [ ] Level and XP display
- [ ] Progress bar for XP
- [ ] Achievements grid with locked/unlocked states
- [ ] Add XP functionality
- [ ] Loading states
- [ ] Error handling
- [ ] Responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm package manager

### Setup
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript checking
- `npm run lint` - Run ESLint

## 📋 Evaluation Criteria

### Code Quality (40%)
- [ ] Clean, readable code
- [ ] Proper TypeScript usage
- [ ] Good component structure
- [ ] Appropriate comments and documentation

### Functionality (30%)
- [ ] All features working correctly
- [ ] Proper state management
- [ ] Error handling implemented
- [ ] Loading states working

### Design & UX (20%)
- [ ] Responsive design
- [ ] Modern, clean interface
- [ ] Smooth interactions
- [ ] Good user experience

### Technical Skills (10%)
- [ ] Vue 3 Composition API usage
- [ ] Pinia state management
- [ ] TypeScript implementation
- [ ] Component architecture

## 🎯 Bonus Points

- Add animations and transitions
- Implement advanced error handling
- Add accessibility features
- Optimize performance
- Add unit tests
- Implement dark mode
- Add data persistence

## 📝 Submission

1. Complete all TODO comments in the code see TASK_CHECKLIST.md
2. Ensure the application runs without errors
3. Test all functionality
4. Make sure it's responsive
5. Submit your completed code

## ⏰ Time Limit

**4-6 hours** - Focus on core functionality first, then add polish.

## 🤝 Questions?

If you have any questions about the requirements or need clarification, don't hesitate to ask!
sander@strivecloud.io

---

**Good luck! Show us what you can build! 🚀**