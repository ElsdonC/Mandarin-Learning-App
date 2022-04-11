import { useState, useEffect } from 'react'

function App() {
  const Mandarin = [
    { romanji: 'b', mandarin: 'ㄅ'},
    { romanji: 'p', mandarin: 'ㄆ'},
    { romanji: 'm', mandarin: 'ㄇ'},
    { romanji: 'f', mandarin: 'ㄈ'},
    { romanji: 'd', mandarin: 'ㄉ'},
    { romanji: 't', mandarin: 'ㄊ'},
    { romanji: 'n', mandarin: 'ㄋ'},
    { romanji: 'l', mandarin: 'ㄌ'},
    { romanji: 'g', mandarin: 'ㄍ'},
    { romanji: 'k', mandarin: 'ㄎ'},
    { romanji: 'h', mandarin: 'ㄏ'},
    { romanji: 'j', mandarin: 'ㄐ'},
    { romanji: 'q', mandarin: 'ㄑ'},
    { romanji: 'x', mandarin: 'ㄒ'},
    { romanji: 'zh', mandarin: 'ㄓ'},
    { romanji: 'ch', mandarin: 'ㄔ'},
    { romanji: 'sh', mandarin: 'ㄕ'},
    { romanji: 'r', mandarin: 'ㄖ'},
    { romanji: 'z', mandarin: 'ㄗ'},
    { romanji: 'c', mandarin: 'ㄘ'},
    { romanji: 's', mandarin: 'ㄙ'},
    { romanji: 'i', mandarin: 'ㄧ'},
    { romanji: 'u', mandarin: 'ㄨ'},
    { romanji: 'u', mandarin: 'ㄩ'},
    { romanji: 'a', mandarin: 'ㄚ'},
    { romanji: 'o', mandarin: 'ㄛ'},
    { romanji: 'e', mandarin: 'ㄜ'},
    { romanji: 'e', mandarin: 'ㄝ'},
    { romanji: 'ai', mandarin: 'ㄞ'},
    { romanji: 'ei', mandarin: 'ㄟ'},
    { romanji: 'ao', mandarin: 'ㄠ'},
    { romanji: 'ou', mandarin: 'ㄡ'},
    { romanji: 'an', mandarin: 'ㄢ'},
    { romanji: 'en', mandarin: 'ㄣ'},
    { romanji: 'ang', mandarin: 'ㄤ'},
    { romanji: 'eng', mandarin: 'ㄥ'},
    { romanji: 'er', mandarin: 'ㄦ'}
  ]

  const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomMandarin = () => {
		const randomIndex = Math.floor(Math.random() * Mandarin.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === Mandarin[current].romanji) {
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} else {
			const h = Mandarin[current].mandarin
			const r = Mandarin[current].romanji
			setError(`Wrong! The correct answer for ${h} is ${r}`)
			setStreak(0)
			localStorage.setItem('streak', 0)
		}

		setInput('')
		setRandomMandarin()
	}

	useEffect(() => {
		setRandomMandarin()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

  return (
    <div className="min-h-screen bg-slate-800 text-white text-center">
      <header className="p-6 mb-8">
        <h1 className="text-2xl font-bold uppercase">Mandarin Alphabet Quiz</h1>
        <div>
          <p>Streak: { streak } | Max Streak: {maxStreak}</p>
        </div>
      </header>

      <div className="text-9xl font-bold mb-8">
        { Mandarin[current].mandarin }
      </div>

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="block w-24 mx-auto pb-2 bg-transparent border-b-2 border-b-white outline-none text-center text-6xl" />
        </form>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  )
}

export default App
