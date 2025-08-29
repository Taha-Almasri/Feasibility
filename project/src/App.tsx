import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StudyForm, StudyData } from './components/StudyForm';
import { StudyResults } from './components/StudyResults';

type AppState = 'home' | 'form' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studyData, setStudyData] = useState<StudyData | null>(null);

  const handleStartStudy = () => {
    setAppState('form');
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (data: StudyData) => {
    setStudyData(data);
    setAppState('results');
  };

  const handleBackToHome = () => {
    setAppState('home');
    setStudyData(null);
  };

  const handleBackToForm = () => {
    setAppState('form');
  };

  const handleNewStudy = () => {
    setStudyData(null);
    setAppState('form');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {appState === 'home' && (
        <>
          <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
          <Hero onStartStudy={handleStartStudy} />
        </>
      )}

      {appState === 'form' && (
        <StudyForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />
      )}

      {appState === 'results' && studyData && (
        <StudyResults
          data={studyData}
          onBack={handleBackToForm}
          onNewStudy={handleNewStudy}
        />
      )}
    </div>
  );
}

export default App;