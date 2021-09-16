import React from 'react';
import MainView from './components/MainView';
import SideBar from './components/SideBar';

import './app.scss';

const App: React.FC = () => {
  return <div className="app">
    <SideBar />
    <MainView />
  </div>
}

export default App;