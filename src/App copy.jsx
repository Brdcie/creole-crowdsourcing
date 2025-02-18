import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "./components/ui/card"
import { useState } from 'react'

function App() {
  // État pour gérer la traduction courante
  const [currentTranslation] = useState({
    french: "Comment allez-vous ?",
    creole: "Kijan ou yé ?"
  })

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Validation des Traductions Créoles
        </h1>
      </header>
      
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Texte à valider</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Texte français */}
              <div>
                <h3 className="font-medium mb-2">Français</h3>
                <div className="p-3 bg-muted rounded-md min-h-[100px]">
                  {currentTranslation.french}
                </div>
              </div>
              
              {/* Traduction créole */}
              <div>
                <h3 className="font-medium mb-2">Créole</h3>
                <div className="p-3 bg-muted rounded-md min-h-[100px]">
                  {currentTranslation.creole}
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Rejeter</Button>
            <Button>Valider</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default App