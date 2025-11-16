import AnimatedPig from './components/AnimatedPig'
import AnimatedGameActions from './components/AnimatedGameActions'
import EnhancedGameMessage from './components/EnhancedGameMessage'
import VisualEffects from './components/VisualEffects'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100">
      <VisualEffects />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-pulse">
          🐷 猪游戏 🐷
        </h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border-4 border-pink-200">
          <AnimatedPig />
          <AnimatedGameActions />
          <EnhancedGameMessage />
        </div>
        
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm bg-white rounded-lg px-4 py-2 inline-block shadow-md">
            💡 游戏规则：用棍子打猪-5血，喂猪+10血
          </p>
        </div>
      </div>
    </div>
  )
}

export default App