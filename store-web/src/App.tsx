import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  const [cakes, setCakes] = useState([])

  useEffect(() => {
    async function fetchCakes() {
      const { data, error } = await supabase.from('cakes_today').select('*')
      if (error) console.error('Error fetching cakes:', error)
      else setCakes(data)
    }

    fetchCakes()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍰 Today's Cakes</h1>
      <ul>
        {cakes.map((cake) => (
          <li key={cake.id} className="text-lg">{cake.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
