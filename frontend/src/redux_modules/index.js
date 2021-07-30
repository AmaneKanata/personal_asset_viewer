import { combineReducers } from 'redux'
import appState from './appState'
import folderList from './folderList'
import query from './query'
import selectedFolderList from './selectedFolderList'
import selectedFileList from './selectedFileList'

const rootReducer = combineReducers({
  appState,
  folderList,
  query: query.reduce,
  selectedFolderList,
  selectedFileList
})

export default rootReducer
