import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "./components/ui/card"
import { useState } from 'react'
const StatsDisplay = ({ validations, testData }) => {
  const validated = validations.filter(v => v.status === 'validated').length
  const rejected = validations.filter(v => v.status === 'rejected').length
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{validations.length}/{testData.length}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Validées</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{validated}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Rejetées</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">{rejected}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function App() {
  // Données de test
  const testData = [
    { id: 1, french: "Comment allez-vous ?", creole: "Kijan ou yé ?" },
    { id: 2, french: "Je vais bien, merci", creole: "An byen, mèsi" },
    { id: 3, french: "Au revoir", creole: "A plita" }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [validations, setValidations] = useState([])
  const [correction, setCorrection] = useState("")
  const [contextInfo, setContextInfo] = useState("")
  const [confidenceScore, setConfidenceScore] = useState(0)

  // Fonctions de test
  const handleValidate = () => {
    setValidations(prev => [...prev, { 
      id: testData[currentIndex].id, 
      status: 'validated' 
    }])
    if (currentIndex < testData.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
    console.log('Translation validated')
  }

  const handleReject = () => {
    if (!correction) {
      alert("Veuillez proposer une correction")
      return
    }
    
    setValidations(prev => [...prev, { 
      id: testData[currentIndex].id, 
      status: 'rejected',
      correction,
      context: contextInfo,
      confidence: confidenceScore
    }])
    
    // Reset des champs
    setCorrection("")
    setConfidenceScore(0)
    
    if (currentIndex < testData.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  // Affichage des résultats de test
  const showStats = () => {
    console.log('Validations:', validations)
    return validations.length
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-5xl font-bold text-primary">
          Validation des Traductions en Créole Guadeloupéen
        </h1>
      </header>
      <StatsDisplay validations={validations} testData={testData} />
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Texte à valider ({currentIndex + 1}/{testData.length})</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Français</h3>
                <div className="p-3 bg-muted rounded-md min-h-[100px]">
                  {testData[currentIndex].french}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Créole</h3>
                <div className="p-3 bg-muted rounded-md min-h-[100px]">
                  {testData[currentIndex].creole}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="mt-4">
  <h3 className="font-medium mb-2">Correction (si rejet)</h3>
  <textarea 
    className="w-full p-2 border rounded-md"
    value={correction}
    onChange={(e) => setCorrection(e.target.value)}
    placeholder="Proposez une meilleure traduction..."
  />
</div>
  <div>
    <h3 className="font-medium mb-2">Contexte</h3>
    <select 
      className="w-full p-2 border rounded-md"
      value={contextInfo}
      onChange={(e) => setContextInfo(e.target.value)}
    >
      <option value="medical">Médical</option>
      <option value="emergency">Urgence</option>
      <option value="daily">Quotidien</option>
    </select>
  </div>
  
  <div>
    <h3 className="font-medium mb-2">Indice de confiance</h3>
    <input 
      type="range"
      min="0"
      max="100"
      value={confidenceScore}
      onChange={(e) => setConfidenceScore(e.target.value)}
      className="w-full"
    />
  </div>
</div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleReject}
              disabled={currentIndex >= testData.length - 1 && validations.length === testData.length}
            >
              Rejeter
            </Button>
            <Button 
              onClick={handleValidate}
              disabled={currentIndex >= testData.length - 1 && validations.length === testData.length}
            >
              Valider
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default App