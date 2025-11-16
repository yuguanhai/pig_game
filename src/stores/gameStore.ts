import { create } from 'zustand'

interface GameState {
  pigHealth: number
  maxHealth: number
  gameMessage: string
  isHitting: boolean
  isFeeding: boolean
  pigExpression: 'normal' | 'crying' | 'eating' | 'dead'
  hitPig: () => void
  feedPig: () => void
  setMessage: (message: string) => void
  setHitting: (hitting: boolean) => void
  setFeeding: (feeding: boolean) => void
  setPigExpression: (expression: 'normal' | 'crying' | 'eating' | 'dead') => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  pigHealth: 100,
  maxHealth: 100,
  gameMessage: '欢迎来到猪游戏！点击道具来与猪互动',
  isHitting: false,
  isFeeding: false,
  pigExpression: 'normal',
  
  hitPig: () => set((state) => {
    const newHealth = Math.max(0, state.pigHealth - 5)
    const isDead = newHealth <= 0
    const message = isDead ? '猪被打死了！游戏结束！' : '你用棍子打了猪！-5血，猪哭了！'
    return { 
      pigHealth: newHealth, 
      gameMessage: message,
      pigExpression: isDead ? 'dead' : 'crying',
      isHitting: true
    }
  }),
  
  feedPig: () => set((state) => {
    if (state.pigHealth <= 0) return state
    const newHealth = Math.min(state.maxHealth, state.pigHealth + 10)
    const message = state.pigHealth >= state.maxHealth ? '猪已经很饱了！' : '猪在吃饲料！+10血'
    return { 
      pigHealth: newHealth, 
      gameMessage: message,
      pigExpression: 'eating',
      isFeeding: true
    }
  }),
  
  setMessage: (message) => set({ gameMessage: message }),
  setHitting: (hitting) => set({ isHitting: hitting }),
  setFeeding: (feeding) => set({ isFeeding: feeding }),
  setPigExpression: (expression) => set({ pigExpression: expression }),
  resetGame: () => set({
    pigHealth: 100,
    gameMessage: '游戏重新开始！',
    pigExpression: 'normal',
    isHitting: false,
    isFeeding: false
  })
}))