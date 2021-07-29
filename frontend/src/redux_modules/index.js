import { combineReducers } from 'redux'
import appState from './appState'
import folderList from './folderList'
import query from './query'
import selectedFolderList from './selectedFolderList'
import selectedFileList from './selectedFileList'

const rootReducer = combineReducers({
  appState: appState.reduce,
  folderList: folderList.reduce,
  query: query.reduce,
  selectedFolderList: selectedFolderList.reduce,
  selectedFildList: selectedFileList.reduce,
})

export default rootReducer
