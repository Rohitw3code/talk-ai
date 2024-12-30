import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UseCases from './components/UseCases';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] 
        bg-cover bg-center opacity-5 dark:opacity-10 fixed" />
      <Navbar />
      <Hero />
      <UseCases />
      <Footer />
    </div>
  );
}

export default App;