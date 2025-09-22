/**
 * Mock Data API - Simulates backend API calls for development
 * Provides realistic data structures and network delays
 */

// ===== TYPE DEFINITIONS =====
export interface UserProfile {
  name: string;
  avatar_url: string;
  level: number;
  current_xp: number;
  xp_to_next_level: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon_url: string;
  unlocked_at?: string;
  xp_reward: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface XPResponse {
  success: boolean;
  newXP: number;
  levelUp?: boolean;
  newLevel?: number;
}

// ===== UTILITY FUNCTIONS =====
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const shouldFail = (failureRate: number = 0.1): boolean =>
  Math.random() < failureRate;

// ===== MOCK DATA =====
const mockUserProfile: UserProfile = {
  name: 'Alex Johnson',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  level: 15,
  current_xp: 1250,
  xp_to_next_level: 2000
};

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first task',
    icon_url: 'bi-flag',
    unlocked_at: '2024-01-15T10:30:00Z',
    xp_reward: 50
  },
  {
    id: 2,
    title: 'Task Master',
    description: 'Complete 10 tasks in a day',
    icon_url: 'bi-check-circle',
    unlocked_at: '2024-01-20T18:45:00Z',
    xp_reward: 100
  },
  {
    id: 3,
    title: 'Streak Champion',
    description: 'Maintain a 7-day streak',
    icon_url: 'bi-fire',
    unlocked_at: '2024-01-25T09:15:00Z',
    xp_reward: 200
  },
  {
    id: 4,
    title: 'Team Player',
    description: 'Collaborate with 5 team members',
    icon_url: 'bi-people',
    unlocked_at: '2024-01-28T14:20:00Z',
    xp_reward: 150
  },
  {
    id: 5,
    title: 'Innovator',
    description: 'Submit 3 creative solutions',
    icon_url: 'bi-lightbulb',
    unlocked_at: '2024-01-30T16:30:00Z',
    xp_reward: 300
  },
  {
    id: 6,
    title: 'Mentor',
    description: 'Help 3 new team members',
    icon_url: 'bi-person-plus',
    unlocked_at: '2024-02-01T11:00:00Z',
    xp_reward: 250
  },
  {
    id: 7,
    title: 'Quality Champion',
    description: 'Receive 5 quality awards',
    icon_url: 'bi-award',
    unlocked_at: '2024-02-03T13:45:00Z',
    xp_reward: 400
  },
  {
    id: 8,
    title: 'Speed Demon',
    description: 'Complete tasks 20% faster than average',
    icon_url: 'bi-lightning',
    unlocked_at: '2024-02-05T15:20:00Z',
    xp_reward: 350
  },
  {
    id: 9,
    title: 'Problem Solver',
    description: 'Resolve 10 complex issues',
    icon_url: 'bi-gear',
    xp_reward: 500
  },
  {
    id: 10,
    title: 'Leader',
    description: 'Lead a successful project',
    icon_url: 'bi-crown',
    xp_reward: 750
  }
];

// ===== API FUNCTIONS =====
export const fetchUserProfile = async (): Promise<UserProfile> => {
  await delay(300);

  if (shouldFail(0.05)) {
    throw new Error('Failed to fetch user profile');
  }

  return { ...mockUserProfile };
};

export const fetchAchievements = async (): Promise<Achievement[]> => {
  await delay(200);

  if (shouldFail(0.05)) {
    throw new Error('Failed to fetch achievements');
  }

  return [...mockAchievements];
};

export const addXP = async (amount: number): Promise<XPResponse> => {
  await delay(300);

  if (amount <= 0) {
    throw new Error('XP amount must be positive');
  }

  if (shouldFail(0.02)) {
    throw new Error('Failed to add XP');
  }

  const newXP = mockUserProfile.current_xp + amount;
  const newLevel = Math.floor(newXP / 100) + 1;
  const levelUp = newLevel > mockUserProfile.level;

  mockUserProfile.current_xp = newXP;
  if (levelUp) {
    mockUserProfile.level = newLevel;
    mockUserProfile.xp_to_next_level = (newLevel * 100) - newXP;
  } else {
    mockUserProfile.xp_to_next_level = ((mockUserProfile.level * 100) - newXP);
  }

  return {
    success: true,
    newXP,
    levelUp,
    newLevel: levelUp ? newLevel : undefined
  };
};

// ===== HELPER FUNCTIONS =====
export const calculateLevel = (xp: number): number =>
  Math.floor(xp / 100) + 1;

export const calculateXPToNextLevel = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  const xpForNextLevel = currentLevel * 100;
  return xpForNextLevel - xp;
};

export const validateUserProfile = (profile: UserProfile): boolean =>
  typeof profile.name === 'string' &&
  profile.name.length > 0 &&
  typeof profile.avatar_url === 'string' &&
  profile.avatar_url.length > 0 &&
  typeof profile.level === 'number' &&
  profile.level > 0 &&
  typeof profile.current_xp === 'number' &&
  profile.current_xp >= 0 &&
  typeof profile.xp_to_next_level === 'number' &&
  profile.xp_to_next_level >= 0;

export const validateAchievement = (achievement: Achievement): boolean =>
  typeof achievement.id === 'number' &&
  achievement.id > 0 &&
  typeof achievement.title === 'string' &&
  achievement.title.length > 0 &&
  typeof achievement.description === 'string' &&
  achievement.description.length > 0 &&
  typeof achievement.icon_url === 'string' &&
  achievement.icon_url.length > 0 &&
  typeof achievement.xp_reward === 'number' &&
  achievement.xp_reward >= 0;
