import './App.css';
import axios from 'axios'
import { Route } from 'react-router';
import FolderList from './components/FolderList.js'
import FolderDetail from './components/FolderDetail.js'
import Item from './components/Item.js'
import { useEffect, useState } from 'react';
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
        <FolderList folderList={folderList}></FolderList>
      </Route>
      <Route path="/:id" component={FolderDetail} exact></Route>
      <Route path="/:id/item" component={Item} exact></Route>
    </div>
  );
}

export default App;
