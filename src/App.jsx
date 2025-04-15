import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)  // Pour l'exemple du bouton de comptage
  const [num1, setNum1] = useState('')  // Premier nombre (entré par l'utilisateur)
  const [num2, setNum2] = useState('')  // Deuxième nombre (entré par l'utilisateur)
  const [sum, setSum] = useState(null)  // Résultat de la somme
  const [loading, setLoading] = useState(false)  // Indicateur de chargement

  // Fonction pour appeler l'API et récupérer la somme
  const handleSumCalculation = async () => {
    // Assurer que les deux numéros sont valides
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
      alert('Veuillez entrer des nombres valides !')
      return
    }

    setLoading(true)

    try {
      // Appel à l'API backend avec les nombres en paramètre
      const response = await fetch(`http://172.20.46.21:8080/Additionne-1/additionne/${num1}/${num2}`)

      // Vérification de la réponse
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la somme')
      }

      const data = await response.json()  // On suppose que l'API renvoie une réponse JSON
      setSum(data.result)  // Exemple de ce que pourrait être la réponse : { result: 22 }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors du calcul de la somme')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React Sumaili Lubunga</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="sum-calculation">
        <h2>Calculer la somme :</h2>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Entrez le premier nombre"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Entrez le deuxième nombre"
        />
        <button onClick={handleSumCalculation} disabled={loading}>
          {loading ? 'Calcul en cours...' : 'Calculer la somme'}
        </button>
        
        {sum !== null && (
          <p className="result">
            La somme des nombres {num1} et {num2} est : {sum}
          </p>
        )}
      </div>
      
      <p className="read-the-docs">
        Cliquez sur les logos Vite et React pour en savoir plus
      </p>
    </>
  )
}

export default App

