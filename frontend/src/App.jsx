import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import { Route } from 'react-router'
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Header from './components/Header'
import Configuration from './Configuration'

function App() {
  const [queryData, setQueryData] = useState({})
  const [folderList, setFolderList] = useState([])
  const [state, setState] = useState(Configuration.STATE_DELETING)
  const [selectedFolderList, setSelectedFolderList] = useState([])

  function getFolderList() {
    axios
      .get('http://localhost:3000/list', {
        params: queryData,
      })
      .then((res) => {
        setFolderList(res.data)
      })
  }

  function addSelectedFolder(id) {
    setSelectedFolderList([...selectedFolderList, id])
  }

  async function deleteSelectedFolders() {
    await Promise.all(
      selectedFolderList.map((selectedFolderId) =>
        axios.delete(`http://localhost:3000/${selectedFolderId}`)
      )
    )
    setSelectedFolderList([])
    getFolderList()
  }

  useEffect(() => {
    getFolderList()
  }, [queryData])

  return (
    <div className="App">
      <Route path="/" exact>
        <Header
          state={state}
          setQueryData={setQueryData}
          deleteSelectedFolders={deleteSelectedFolders}
        />
        <FolderList
          state={state}
          folderList={folderList}
          getFolderList={getFolderList}
          addSelectedFolder={addSelectedFolder}
        />
      </Route>
      <Route path="/:id" component={FolderDetail} exact />
      <Route path="/:id/item" component={Item} exact />
    </div>
  )
}

export default App
