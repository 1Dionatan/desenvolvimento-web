import React from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import './App.css'

function App() {
  const postData = {
    title: "Baldur's Gate 3",
    author: "Autor do Blog",
    date: "15 de agosto de 2024",
    content: [
      "Baldur's Gate 3 é ambientado no universo de Dungeons & Dragons, especificamente nos Reinos Esquecidos (Forgotten Realms), e se passa mais de um século após os eventos de Baldur's Gate 2. A história começa com o protagonista sendo sequestrado por um grupo de devoradores de mentes (Mind Flayers), que implantam uma larva parasita em seu cérebro. Porém, de forma misteriosa, o personagem principal não se transforma em um deles, o que dá início a uma jornada de descobertas e sobrevivência. Ao longo do caminho, o jogador encontra outros personagens infectados que se juntam ao grupo, cada um com sua própria história, habilidades e objetivos.",
      "O enredo se aprofunda em temas como corrupção, controle mental, escolhas morais e os limites do poder. À medida que os protagonistas tentam remover o parasita e entender seus novos poderes, enfrentam facções em guerra, divindades manipuladoras e segredos antigos enterrados nas profundezas de Faerûn. A narrativa não é linear: as decisões do jogador afetam profundamente o mundo ao redor, moldando alianças, consequências e o final da história. Baldur's Gate 3 é, ao mesmo tempo, uma continuação épica da saga clássica e uma reinterpretação moderna, com uma profundidade narrativa que honra a tradição de RPGs de mesa."
    ],
    image: {
      src: "/bg3.png",
      alt: "Imagem promocional de Baldur's Gate 3",
      caption: "Baldur's Gate 3 (From ChatGPT)"
    }
  }

  const relatedPosts = [
    "Pokemons do meta",
    "Smoke's CS2", 
    "Shadow Of The Colossus"
  ]

  return (
    <div className="app">
      <header>
        <Header />
        <Navigation />
      </header>
      
      <main>
        <Article postData={postData} />
      </main>
      
      <aside>
        <Sidebar relatedPosts={relatedPosts} />
      </aside>
      
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App

