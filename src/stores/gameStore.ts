import { create } from 'zustand'

interface GameState {
  pigHealth: number
  maxHealth: number
  gameMessage: string
  isHitting: boolean
  isFeeding: boolean
  pigExpression: 'normal' | 'crying' | 'eating' | 'dead'
  points: number
  feedInventory: number
  hitPig: () => void
  feedPig: () => void
  setMessage: (message: string) => void
  setHitting: (hitting: boolean) => void
  setFeeding: (feeding: boolean) => void
  setPigExpression: (expression: 'normal' | 'crying' | 'eating' | 'dead') => void
  resetGame: () => void
  addPoints: (n: number) => void
  redeemFeed: () => void
}

export const useGameStore = create<GameState>((set) => ({
  pigHealth: 100,
  maxHealth: 100,
  gameMessage: '欢迎来到猪游戏！点击道具来与猪互动',
  isHitting: false,
  isFeeding: false,
  pigExpression: 'normal',
  points: 0,
  feedInventory: 0,
  
  hitPig: () => set((state) => {
    const newHealth = Math.max(0, state.pigHealth - 20)
    const isDead = newHealth <= 0
    const message = isDead ? '猪被打死了！游戏结束！' : '你用棍子打了猪！-20血，猪哭了！'
    return { 
      pigHealth: newHealth, 
      gameMessage: message,
      pigExpression: isDead ? 'dead' : 'crying',
      isHitting: true
    }
  }),
  
  feedPig: () => set((state) => {
    if (state.pigHealth <= 0) return state
    if (state.feedInventory <= 0) {
      return { gameMessage: '饲料不足，使用100积分兑换饲料后再喂猪' }
    }
    const newHealth = Math.min(state.maxHealth, state.pigHealth + 10)
    const message = state.pigHealth >= state.maxHealth ? '猪已经很饱了！' : '猪在吃饲料！+10血'
    return { 
      pigHealth: newHealth, 
      gameMessage: message,
      pigExpression: 'eating',
      isFeeding: true,
      feedInventory: state.feedInventory - 1
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
    isFeeding: false,
    feedInventory: 0
  }),
  addPoints: (n) => set((s) => ({ points: s.points + n })),
  redeemFeed: () => set((s) => {
    if (s.points < 100) return { gameMessage: '积分不足，100积分可兑换1份饲料' }
    return { points: s.points - 100, feedInventory: s.feedInventory + 1, gameMessage: '兑换成功，获得1份饲料' }
  })
}))
