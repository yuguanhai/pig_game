import React from 'react'
import { useGameStore } from '../stores/gameStore'

const GameActions: React.FC = () => {
  const { hitPig, feedPig, pigHealth } = useGameStore()
  
  const isGameOver = pigHealth <= 0
  
  return (
    <div className="flex gap-4 justify-center p-4">
      <button
        onClick={hitPig}
        disabled={isGameOver}
        className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center gap-2"
      >
        🏏 棍子打猪
      </button>
      
      <button
        onClick={feedPig}
        disabled={isGameOver}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center gap-2"
      >
        🌾 猪饲料
      </button>
    </div>
  )
}

export default GameActions