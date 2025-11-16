import AnimatedPig from '../components/AnimatedPig'
import AnimatedGameActions from '../components/AnimatedGameActions'
import EnhancedGameMessage from '../components/EnhancedGameMessage'
import VisualEffects from '../components/VisualEffects'
import { useGameStore } from '../stores/gameStore'

export default function PigRaising() {
  const { points, feedInventory, redeemFeed } = useGameStore()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100">
      <VisualEffects />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-pulse">🐷 猪猪养成</h1>
        <div className="max-w-2xl mx-auto bg白 rounded-2xl shadow-2xl p-8 border-4 border-pink-200">
          <AnimatedPig />
          <AnimatedGameActions />
          <EnhancedGameMessage />
          <div className="mt-4 flex items-center justify-between">
            <div className="text-gray-800 font-bold">积分 {points}</div>
            <div className="flex items-center gap-4">
              <div className="text-red-600 font-bold">饲料 {feedInventory}</div>
              <button onClick={redeemFeed} className="px-3 py-2 rounded-lg bg-teal-500 text白 font-bold">兑换饲料（100积分）</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
