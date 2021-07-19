import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route } from 'react-router';
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Configuration from "./Configuration";

function App() {

  const [folderList, setFolderList] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3000/list", {
      params: {
        begin: current * Configuration.size,
        size: Configuration.size
      }
    }).then((res) => {
      if (res.data.length > 0) {
        setFolderList(folderList.concat(res.data))
        setCurrent(current + 1)
      }
    })
  }, [current])

  return (
    <div className="App">
      <Route path="/" exact>
        <FolderList folderList={folderList}/>
      </Route>
      <Route path="/:id" component={FolderDetail} exact/>
      <Route path="/:id/item" component={Item} exact/>
    </div>
  );
}

export default App;
