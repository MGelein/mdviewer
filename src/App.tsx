import React from 'react';
import MainView from './components/MainView';
import SideBar from './components/SideBar';
import ProjectPicker from './components/ProjectPicker';
import { useApp } from './util/hooks';

import './app.scss';

const App: React.FC = () => {
  const { workdir } = useApp();

  return <div className="app">
    {workdir ?
      <>
        <SideBar />
        <MainView />
      </> :
      <ProjectPicker />
    }
  </div>
}

export default App;