import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route } from 'react-router';
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Header from './components/Header'

function App() {

  const [queryData, setQueryData] = useState({})
  const [folderList, setFolderList] = useState([])

  function getListData() {
    axios.get("http://localhost:3000/list", {
      params: queryData
    }).then((res) => {
      console.log(res.data)
      setFolderList(res.data)
    })
  }

  useEffect(() => {
    console.log("get list data")
    console.dir(queryData)
    getListData()
  }, [queryData])

  return (
    <div className="App">
      <Route path="/" exact>
        <Header setQueryData={setQueryData}/>
        <FolderList folderList={folderList} getListData={getListData}/>
      </Route>
      <Route path="/:id" component={FolderDetail} exact/>
      <Route path="/:id/item" component={Item} exact/>
    </div>
  );
}

export default App;
