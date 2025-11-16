import React from 'react'
import { useGameStore } from '../stores/gameStore'

const GameMessage: React.FC = () => {
  const { gameMessage, pigHealth } = useGameStore()
  
  return (
    <div className="text-center p-4">
      <p className="text-lg text-gray-700 mb-2">{gameMessage}</p>
      {pigHealth <= 0 && (
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200"
        >
          🔄 重新开始游戏
        </button>
      )}
    </div>
  )
}

export default GameMessage