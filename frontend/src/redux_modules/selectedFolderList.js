// @ts-check
const SET_FOLDER_LIST = 'selectedFolderList/SET_FOLDER_LIST'
const ADD_FOLDER = 'selectedFolderList/ADD_FOLDER'
const REMOVE_FOLDER = 'selectedFolderList/REMOVE_FOLDER'

const initialState = {
  selectedFolderList: [],
}

export const setSelectedFolderList = (folderList) => ({
  type: SET_FOLDER_LIST,
  folderList,
})

export const addFolder = (folderId) => ({
  type: ADD_FOLDER,
  folderId,
})

export const removeFolder = (folderId) => ({
  type: REMOVE_FOLDER,
  folderId,
})

export default function reduce(state = initialState, action) {
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
}
