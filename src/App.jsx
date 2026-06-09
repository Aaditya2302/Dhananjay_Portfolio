import { useState } from 'react'
import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingActions from './components/ui/FloatingActions'

// Section imports
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Booking from './components/sections/Booking'
import ExportTimeline from './components/sections/ExportTimeline'
import Achievements from './components/sections/Achievements'
import Research from './components/sections/Research'
import Blog from './components/sections/Blog'
import Testimonials from './components/sections/Testimonials'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      
      <main className="bg-bg-light">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Booking />
        <ExportTimeline />
        <Achievements />
        <Research />
        <Blog />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}

export default App
