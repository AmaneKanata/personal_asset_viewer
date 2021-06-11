import './App.css';
// import axios from 'axios'
// import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import FolderList from './components/FolderList.js'
import FolderDetail from './components/FolderDetail.js'
import Item from './components/Item.js'

function App() {

  // const [path, setPath] = useState('test_1')

  // useEffect(() => {
  //   axios.get("http://localhost:3000/test_1")
  //     .then((res) => {
  //       //setData(res.data)
  //       console.log(res.data)
  //     })
  // }, [])

  // const onImageClicked = function() {
  //   if(path === "test_1" ) {
  //     setPath("test_2")
  //   } else {
  //     setPath("test_1")
  //   }
  // }

  return (
    <div className="App">
      <Route path="/" component={FolderList} exact></Route>
      <Route path="/:folderId" component={FolderDetail} exact></Route>
      <Route path="/item/:id/:type/:index" component={Item} exact></Route>
    </div>
  );
}

export default App;
