import React from 'react'
import { useGameStore } from '../stores/gameStore'

const EnhancedGameMessage: React.FC = () => {
  const { gameMessage, pigHealth, resetGame } = useGameStore()
  
  return (
    <div className="text-center p-4">
      <div className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[80px] flex items-center justify-center">
        <p className="text-lg text-gray-700 font-medium">{gameMessage}</p>
      </div>
      {pigHealth <= 0 && (
        <div className="space-y-4">
          <div className="text-6xl animate-bounce">💀</div>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto shadow-lg"
          >
            🔄 重新开始游戏
          </button>
        </div>
      )}
      {pigHealth > 0 && pigHealth <= 20 && (
        <div className="text-4xl animate-pulse">⚠️</div>
      )}
      {pigHealth >= 100 && (
        <div className="text-4xl animate-bounce">🎉</div>
      )}
    </div>
  )
}

export default EnhancedGameMessage