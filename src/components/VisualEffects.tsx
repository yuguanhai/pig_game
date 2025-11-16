import React from 'react'
import { useGameStore } from '../stores/gameStore'

const VisualEffects: React.FC = () => {
  const { isHitting, isFeeding, pigHealth } = useGameStore()
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {isHitting && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-ping text-red-500">💥</div>
          </div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-4xl animate-bounce text-red-400">💢</div>
          </div>
          <div className="absolute top-2/3 right-1/3">
            <div className="text-3xl animate-pulse text-red-300">⚡</div>
          </div>
        </>
      )}
      {isFeeding && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-spin text-green-500">✨</div>
          </div>
          <div className="absolute top-1/3 left-1/3">
            <div className="text-3xl animate-bounce text-yellow-400">⭐</div>
          </div>
          <div className="absolute top-2/3 right-1/3">
            <div className="text-3xl animate-pulse text-pink-400">💫</div>
          </div>
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
            <div className="text-4xl animate-bounce text-green-400">🌟</div>
          </div>
        </>
      )}
      {pigHealth <= 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-9xl animate-pulse text-red-600">💀</div>
        </div>
      )}
    </div>
  )
}

export default VisualEffects