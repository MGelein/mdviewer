import React from 'react';
import MainView from './components/MainView';
import SideBar from './components/SideBar';
import ProjectPicker from './components/ProjectPicker';
import { useApp } from './util/hooks';

import './app.scss';
import ErrorDialog from './components/ErrorDialog';

const App: React.FC = () => {
  const { workdir, error } = useApp();

  return <div className="app">
    {workdir ?
      <>
        <SideBar />
        <MainView />
      </> :
      <ProjectPicker />
    }
    {error && <ErrorDialog />}
  </div>
}

export default App;