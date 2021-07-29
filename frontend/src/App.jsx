import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import './css/header.scss'
import { Route } from 'react-router'
import FolderList from './components/FolderList'
import FolderDetail from './components/FolderDetail'
import Item from './components/Item'
import Header from './components/Header'
import ThumbnailHeader from './components/ThumbnailHeader'
import Configuration from './Configuration'

function App() {

  const [state, setState] = useState(Configuration.STATE_NORMAL)
  const [thumbnailListState, setThumbnailListState] = useState(
    Configuration.STATE_NORMAL
  )
  const [selectedFolderList, setSelectedFolderList] = useState([])
  const [selectedFileList, setSelectedFileList] = useState([])

  function moveScrolltoTop() {
    window.scrollTo(0, 0)
  }

  function addSelectedFolder(id) {
    setSelectedFolderList([...selectedFolderList, id])
  }

  function removeSelectedFolder(id) {
    setSelectedFolderList(selectedFolderList.filter((value) => value !== id))
  }

  async function deleteSelectedFolders() {
    // await Promise.all(
    //   selectedFolderList.map((selectedFolderId) =>
    //     axios.delete(`http://localhost:3000/${selectedFolderId}`)
    //   )
    // )
    // setSelectedFolderList([])
    // setState(Configuration.STATE_NORMAL)
    // getFolderList()
  }

  function addSelectedFile(index) {
    setSelectedFileList([...selectedFileList, index])
  }

  function removeSelectedFile(index) {
    setSelectedFileList(selectedFileList.filter((value) => value !== index))
  }

  async function deleteSelectedFiles(selectedFolderId) {
    const items = await axios
      .get(`http://localhost:3000/${selectedFolderId}/Detail`)
      .then((result) => result.data[0].items)

    await Promise.all(
      selectedFileList.map((index) =>
        axios.delete(`http://localhost:3000/${selectedFolderId}/item`, {
          params: {
            fileName: items[index],
          },
        })
      )
    )
    setSelectedFileList([])
    setThumbnailListState(Configuration.STATE_NORMAL)
  }

  return (
    <div className="App">
      <Route path="/" exact>
        <Header
          state={state}
          setState={setState}
          deleteSelectedFolders={deleteSelectedFolders}
          setSelectedFolderList={setSelectedFolderList}
          moveScrolltoTop={moveScrolltoTop}
        />
        <FolderList
          state={state}
          addSelectedFolder={addSelectedFolder}
          removeSelectedFolder={removeSelectedFolder}
          selectedFolderList={selectedFolderList}
        />
      </Route>
      <Route
        path="/:id"
        render={({ match }) => (
          <>
            <ThumbnailHeader
              match={match}
              state={thumbnailListState}
              setState={setThumbnailListState}
              setSelectedFileList={setSelectedFileList}
              deleteSelectedFiles={deleteSelectedFiles}
            />
            <FolderDetail
              match={match}
              state={thumbnailListState}
              selectedFileList={selectedFileList}
              addSelectedFile={addSelectedFile}
              removeSelectedFile={removeSelectedFile}
            />
          </>
        )}
        exact
      />
      <Route path="/:id/item" component={Item} exact />
    </div>
  )
}

export default App
