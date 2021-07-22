import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route } from 'react-router';
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Search from './components/Search'

function App() {

  const [queryData, setQueryData] = useState({})
  const [folderList, setFolderList] = useState([])

  useEffect(() => {
    console.log(queryData)

    axios.get("http://localhost:3000/list", {
      params: queryData
    }).then((res) => {
      setFolderList(res.data)
    })
  }, [queryData])

  return (
    <div className="App">
      <Route path="/" exact>
        <Search setQueryData={setQueryData}/>
        <FolderList folderList={folderList}/>
      </Route>
      <Route path="/:id" component={FolderDetail} exact/>
      <Route path="/:id/item" component={Item} exact/>
    </div>
  );
}

export default App;
