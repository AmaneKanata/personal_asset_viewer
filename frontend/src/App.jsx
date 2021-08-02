import React from 'react'
import './App.css'
import './css/header.scss'
import { Route } from 'react-router'
import { useSelector } from 'react-redux'
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Header from './components/Header'
import UploadTest from './components/UploadTest'
import Configuration from './Configuration'

function App() {
  const { scene } = useSelector((state) => ({
    scene: state.appState.scene,
  }))

  return (
    <div className="App">
      {scene !== Configuration.SCENE_ITEM && <Header />}
      <Route path="/" component={FolderList} exact />
      {/* <Route path="/upload" component={UploadTest} exact /> */}
      <Route path="/:id" component={FolderDetail} exact />
      <Route path="/:id/item" component={Item} exact />
    </div>
  )
}

export default App
