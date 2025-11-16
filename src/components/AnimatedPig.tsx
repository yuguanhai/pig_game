import React, { useEffect } from 'react'
import { useGameStore } from '../stores/gameStore'

const AnimatedPig: React.FC = () => {
  const { pigHealth, maxHealth, pigExpression, isHitting, isFeeding, setHitting, setFeeding, setPigExpression } = useGameStore()
  
  useEffect(() => {
    if (isHitting) {
      const timer = setTimeout(() => {
        setHitting(false)
        if (pigHealth > 0) {
          setPigExpression('normal')
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isHitting, pigHealth, setHitting, setPigExpression])
  
  useEffect(() => {
    if (isFeeding) {
      const timer = setTimeout(() => {
        setFeeding(false)
        if (pigHealth > 0) {
          setPigExpression('normal')
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isFeeding, pigHealth, setFeeding, setPigExpression])
  
  const getPigEmoji = () => {
    switch (pigExpression) {
      case 'crying': return '😭'
      case 'eating': return '😋'
      case 'dead': return '💀'
      default: return '🐷'
    }
  }
  
  const getPigColor = () => {
    if (pigHealth <= 20) return 'text-red-500'
    if (pigHealth <= 50) return 'text-yellow-500'
    return 'text-pink-500'
  }
  
  const getPigSize = () => {
    if (pigHealth <= 20) return 'text-6xl'
    if (pigHealth <= 50) return 'text-7xl'
    return 'text-8xl'
  }
  
  return (
    <div className="flex flex-col items-center p-8 relative">
      {isHitting && (
        <div className="absolute top-16 right-20 text-4xl animate-bounce">
          🏏
        </div>
      )}
      {isFeeding && (
        <div className="absolute top-16 left-20 text-3xl animate-bounce">
          🌾
        </div>
      )}
      <div className={`${getPigColor()} ${getPigSize()} mb-4 transition-all duration-300 ${
        isHitting ? 'animate-pulse scale-90' : isFeeding ? 'animate-pulse scale-110' : ''
      }`}>
        {getPigEmoji()}
      </div>
      {isHitting && (
        <div className="absolute top-12 text-2xl animate-ping">
          💥
        </div>
      )}
      {isFeeding && (
        <div className="absolute top-12 text-2xl animate-ping">
          ✨
        </div>
      )}
      <div className="w-64 bg-gray-200 rounded-full h-4 mb-2">
        <div 
          className={`h-4 rounded-full transition-all duration-300 ${
            pigHealth <= 20 ? 'bg-red-500' : pigHealth <= 50 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${(pigHealth / maxHealth) * 100}%` }}
        />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">血量: {pigHealth}/{maxHealth}</p>
        <p className="text-sm text-gray-600 mt-1">
          {pigHealth <= 20 && '⚠️ 猪很危险！'}
          {pigHealth <= 50 && pigHealth > 20 && '⚡ 猪有点虚弱'}
          {pigHealth > 50 && pigHealth < 100 && '😊 猪很健康'}
          {pigHealth >= 100 && '💖 猪非常健康！'}
        </p>
      </div>
    </div>
  )
}

export default AnimatedPig