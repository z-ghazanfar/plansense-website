import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isInApp, setIsInApp] = useState(false);

  return isInApp ? (
    <Dashboard onLogout={() => setIsInApp(false)} />
  ) : (
    <LandingPage onEnterApp={() => setIsInApp(true)} />
  );
};

export default App;
