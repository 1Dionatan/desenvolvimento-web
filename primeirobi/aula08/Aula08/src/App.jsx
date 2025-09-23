import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Dionatan');
  const [frutas, setFrutas] = useState(['🍌', '🍏', '🍇']);

  return (
    <>
      <h1>Contador: {name}</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
        </button>
        {count > 10 ?
          <p>
            Contagem maior que 10
          </p>
          :
          <p>
            Contagem menor ou igual a 10
          </p>
        }
        {count > 5 &&
          <p>
            Contagem maior que 5
          </p>
        }
      </div>
      <ul>
        <h3>Frutas:</h3>
        {frutas.map((fruta, index) => (
          <li key={index}>{fruta}</li>
        ))}
      </ul>
    </>
  )
}

export default App
