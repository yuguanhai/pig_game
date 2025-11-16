import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../stores/gameStore'

type Obstacle = { id: number; x: number; width: number; height: number }

export default function PigRunner() {
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [bestScore, setBestScore] = useState(() => {
    const v = localStorage.getItem('runner_best_score')
    return v ? parseInt(v) || 0 : 0
  })
  const [lastScore, setLastScore] = useState(() => {
    const v = localStorage.getItem('runner_last_score')
    return v ? parseInt(v) || 0 : 0
  })
  const [hitMessage, setHitMessage] = useState('')
  const [pigY, setPigY] = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const velocityRef = useRef(0)
  const pigYRef = useRef(0)
  const obstaclesRef = useRef<Obstacle[]>([])
  const nextId = useRef(1)
  const lastSpawn = useRef(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const gravity = 0.5
  const jumpV = 18
  const ground = 0
  const baseSpeed = 2.0
  const maxPigY = 96
  const scoreRef = useRef(0)
  const hangFramesRef = useRef(0)
  const obstaclesPassedRef = useRef(0)
  const passedSetRef = useRef<Set<number>>(new Set())
  const lastLifeGainRef = useRef(0)
  const pigX = 80
  const pigSize = 56
  const { addPoints } = useGameStore()
  const lastAwardRef = useRef(0)

  const reset = () => {
    setRunning(false)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setHitMessage('')
    setPigY(0)
    velocityRef.current = 0
    pigYRef.current = 0
    obstaclesRef.current = []
    setObstacles([])
    nextId.current = 1
    lastSpawn.current = 0
    obstaclesPassedRef.current = 0
    passedSetRef.current.clear()
    lastLifeGainRef.current = 0
  }

  const jump = () => {
    if (!running || gameOver) return
    if (pigYRef.current <= ground + 0.01) velocityRef.current = jumpV
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!running && !gameOver) setRunning(true)
        jump()
      }
      if (e.code === 'Enter' && gameOver) reset()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [running, gameOver, pigY])

  useEffect(() => {
    let raf = 0
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!running || gameOver) return
      if (lastLifeGainRef.current === 0) lastLifeGainRef.current = t
      if (t - lastLifeGainRef.current >= 30000) {
        setLives((l) => l + 1)
        lastLifeGainRef.current = t
      }
      const passedReady = obstaclesPassedRef.current >= 3
      setScore((s) => {
        const ns = passedReady ? s + 0.01 : s
        scoreRef.current = ns
        return ns
      })
      const whole = Math.floor(scoreRef.current)
      if (whole > lastAwardRef.current) {
        addPoints(whole - lastAwardRef.current)
        lastAwardRef.current = whole
      }
      const speedCurrent = baseSpeed
      if (hangFramesRef.current > 0) {
        hangFramesRef.current -= 1
      } else {
        velocityRef.current -= gravity
      }
      pigYRef.current = Math.min(maxPigY, Math.max(ground, pigYRef.current + velocityRef.current))
      if (pigYRef.current > maxPigY * 0.9 && velocityRef.current > 0 && hangFramesRef.current === 0) {
        hangFramesRef.current = 48
        velocityRef.current = 0
      }
      if (pigYRef.current === ground && velocityRef.current < 0) velocityRef.current = 0
      obstaclesRef.current = obstaclesRef.current
        .map(o => ({ ...o, x: o.x - speedCurrent }))
        .filter(o => o.x + o.width > 0)
      const interval = 2000
      if (t - lastSpawn.current > interval) {
        lastSpawn.current = t
        const h = 22 + Math.floor(Math.random() * 10)
        const w = 12 + Math.floor(Math.random() * 10)
        obstaclesRef.current.push({ id: nextId.current++, x: 700, width: w, height: h })
      }
      for (const o of obstaclesRef.current) {
        if (o.x + o.width < pigX && !passedSetRef.current.has(o.id)) {
          passedSetRef.current.add(o.id)
          obstaclesPassedRef.current += 1
        }
      }
      const pigTop = 240 - pigYRef.current - pigSize
      const pigRect = { x: pigX, y: pigTop + 4, w: pigSize, h: pigSize - 8 }
      for (const o of obstaclesRef.current) {
        const oRect = { x: o.x, y: 240 - o.height, w: o.width, h: o.height }
        const hit = pigRect.x + 4 < oRect.x + oRect.w && pigRect.x + pigRect.w - 4 > oRect.x && pigRect.y + 4 < oRect.y + oRect.h && pigRect.y + pigRect.h - 4 > oRect.y
        if (hit) {
          setLives((l) => {
            const nl = l - 1
            if (nl <= 0) {
              setGameOver(true)
              setRunning(false)
              const finalScore = Math.floor(scoreRef.current)
              setLastScore(finalScore)
              localStorage.setItem('runner_last_score', String(finalScore))
              const best = Math.max(finalScore, bestScore)
              setBestScore(best)
              localStorage.setItem('runner_best_score', String(best))
            } else {
              setHitMessage('你这个笨猪，撞了')
              setTimeout(() => setHitMessage(''), 1500)
            }
            return Math.max(0, nl)
          })
          obstaclesRef.current = obstaclesRef.current.filter(x => x.id !== o.id)
          break
        }
      }
      setPigY(pigYRef.current)
      setObstacles([...obstaclesRef.current])
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running, gameOver])

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

    return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">🏃 猪猪快跑</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
          <div
            ref={containerRef}
            tabIndex={0}
            onClick={() => { if (!running && !gameOver) setRunning(true); jump() }}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-b from-blue-50 to-blue-100"
            style={{ height: 260 }}
          >
            <div className="absolute left-0 right-0 bottom-0 h-2 bg-green-600" />
            <div
              className="absolute text-6xl transition-transform"
              style={{ left: pigX, transform: `translateY(${240 - pigY - pigSize}px)` }}
            >
              🐷
            </div>
            {obstacles.map(o => (
              <div
                key={o.id}
                className="absolute bg-red-500 rounded-sm"
                style={{ left: o.x, top: 240 - o.height, width: o.width, height: o.height }}
              />
            ))}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
              分数 {Math.floor(score)}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div></div>
            <div className="flex gap-3">
              {!running && !gameOver && (
                <button onClick={() => setRunning(true)} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold">开始</button>
              )}
              {running && (
                <button onClick={jump} className="px-4 py-2 rounded-lg bg-purple-500 text白 font-bold">跳跃</button>
              )}
              {gameOver && (
                <button onClick={reset} className="px-4 py-2 rounded-lg bg-orange-500 text白 font-bold">重新开始</button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-red-600 text-xl font-bold">{'♥ '.repeat(lives).trim()}</div>
            <div className="text-gray-600">上次 {lastScore} | 最高 {bestScore}</div>
          </div>
          {!gameOver && hitMessage && (
            <div className="text-center text-red-600 font-bold mt-2">{hitMessage}</div>
          )}
          {gameOver && (
            <div className="text-center text-2xl font-bold text-red-600 mt-3">猪死了</div>
          )}
          <div className="text-center text-sm text-gray-600 mt-2">空格跳跃，点击也可跳</div>
        </div>
      </div>
    </div>
  )
}
