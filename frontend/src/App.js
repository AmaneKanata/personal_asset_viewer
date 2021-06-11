import './App.css';
// import axios from 'axios'
// import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import FolderList from './components/FolderList.js'
import FolderDetail from './components/FolderDetail.js'
import Item from './components/Item.js'

function App() {

  return (
    <div className="App">
      <Route path="/" component={FolderList} exact></Route>
      <Route path="/:folderId" component={FolderDetail} exact></Route>
      <Route path="/:id/item/:type/" component={Item} exact></Route>
    </div>
  );
}

export default App;
