import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { useGameStore } from './stores/gameStore'
import PigRaising from './pages/PigRaising'
import PigRunner from './pages/PigRunner'

function App() {
  const { points, feedInventory } = useGameStore()
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify之间 mb-6">
            <div className="text-3xl font-bold text-gray-800">🐷 猪游戏</div>
            <nav className="flex gap-3 items-center">
              <NavLink to="/" end className={({ isActive }) => `px-4 py-2 rounded-lg font-bold ${isActive ? 'bg-pink-500 text白' : 'bg白 text-gray-800'}`}>猪猪养成</NavLink>
              <NavLink to="/run" className={({ isActive }) => `px-4 py-2 rounded-lg font-bold ${isActive ? 'bg-pink-500 text白' : 'bg白 text-gray-800'}`}>猪猪快跑</NavLink>
              <div className="px-3 py-2 rounded-lg bg白 text-gray-800 font-bold">积分 {points}</div>
              <div className="px-3 py-2 rounded-lg bg白 text-red-600 font-bold">饲料 {feedInventory}</div>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<PigRaising />} />
            <Route path="/run" element={<PigRunner />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
