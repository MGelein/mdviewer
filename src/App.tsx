import React, { useEffect } from 'react';
import MainView from './components/MainView';
import SideBar from './components/SideBar';
import ProjectPicker from './components/ProjectPicker';
import { useActiveHotkeys, useApp } from './util/hooks';
import ErrorDialog from './components/ErrorDialog';

import './app.scss';

const App: React.FC = () => {
  const { workdir, error } = useApp();
  useEffect(() => nw.Window.get().maximize(), []);
  useActiveHotkeys();

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