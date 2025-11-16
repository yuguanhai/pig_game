import React from 'react'
import { useGameStore } from '../stores/gameStore'

const AnimatedGameActions: React.FC = () => {
  const { hitPig, feedPig, pigHealth, isHitting, isFeeding } = useGameStore()
  
  const isGameOver = pigHealth <= 0
  
  return (
    <div className="flex gap-6 justify-center p-4">
      <div className="relative">
        <button
          onClick={hitPig}
          disabled={isGameOver || isHitting || isFeeding}
          className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-110 disabled:scale-100 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <div className="text-3xl mb-1">🏏</div>
          <div>棍子打猪</div>
        </button>
        {isHitting && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-red-600 font-bold animate-bounce">
            🏏 打！
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={feedPig}
          disabled={isGameOver || isHitting || isFeeding}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-110 disabled:scale-100 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <div className="text-3xl mb-1">🌾</div>
          <div>猪饲料</div>
        </button>
        {isFeeding && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-green-600 font-bold animate-bounce">
            🌾 吃吧！
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimatedGameActions