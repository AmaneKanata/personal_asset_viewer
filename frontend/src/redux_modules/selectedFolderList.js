// @ts-check
const SET_FOLDER_LIST = 'selectedFolderList/SET_FOLDER_LIST'
const ADD_FOLDER = 'selectedFolderList/ADD_FOLDER'
const REMOVE_FOLDER = 'selectedFolderList/REMOVE_FOLDER'

const initialState = {
  selectedFolderList: [],
}

export default {
  reduce (state = initialState, action) {
    switch (action.type) {
      case SET_FOLDER_LIST:
        return {
          ...state,
          selectedFolderList: action.folderList,
        }
      case ADD_FOLDER:
        return {
          ...state,
          selectedFolderList: state.selectedFolderList.concat(action.folderId),
        }
      case REMOVE_FOLDER:
        return {
          ...state,
          selectedFolderList: state.selectedFolderList.filter(
            (folderId) => folderId !== action.folderId
          ),
        }
      default:
        return state
    }
  },
  setFolderList: (folderList) => ({
    type: SET_FOLDER_LIST,
    folderList,
  }),
  addFile: (folderId) => ({
    type: ADD_FOLDER,
    folderId,
  }),
  File: (folderId) => ({
    type: REMOVE_FOLDER,
    folderId,
  }),
}
