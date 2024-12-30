import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UseCases from './components/UseCases';
import Footer from './components/Footer';
import ParallaxStars from './components/ui/ParallaxStars/ParallaxStars';
import { useGlobalRipple } from './hooks/useGlobalRipple';
import './styles/ripple.css';

function App() {
  useGlobalRipple();

  return (
    <div className="min-h-screen bg-background">
      <ParallaxStars />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] 
        bg-cover bg-center opacity-5 dark:opacity-10 fixed" />
      <Navbar />
      <Hero />
      <UseCases />
      <Footer />
    </div>
  );
}

export default App;