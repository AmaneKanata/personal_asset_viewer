import React from 'react'
import './App.css'
import './css/header.scss'
import { Route } from 'react-router'
import { useSelector } from 'react-redux'
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Header from './components/Header'
import Upload from './components/Upload'
import Configuration from './Configuration'

function App() {
  const { scene, mode } = useSelector((state) => ({
    scene: state.appState.scene,
    mode: state.appState.mode
  }))

  return (
    <div className="App">
      {scene !== Configuration.SCENE_ITEM && <Header />}
      <Route path="/" exact>
        {
          mode === Configuration.STATE_NORMAL 
          ? <FolderList />
          : <Upload />
        }
      </Route>
      <Route path="/:id" component={FolderDetail} exact />
      <Route path="/:id/item" component={Item} exact />
    </div>
  )
}

export default App
