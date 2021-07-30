// @ts-check
const SET_FILE_LIST = 'selectedFileList/SET_FILE_LIST'
const ADD_FILE = 'selectedFileList/ADD_FILE'
const REMOVE_FILE = 'selectedFileList/REMOVE_FILE'

const initialState = {
  selectedFileList: [],
}

export const setSelectedFileList = (fileList) => ({
  type: SET_FILE_LIST,
  fileList,
})

export const addFile = (fileIndex) => ({
  type: ADD_FILE,
  fileIndex,
})
export const removeFile = (fileIndex) => ({
  type: REMOVE_FILE,
  fileIndex,
})

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_FILE_LIST:
      return {
        ...state,
        selectedFileList: action.fileList,
      }
    case ADD_FILE:
      return {
        ...state,
        selectedFileList: state.selectedFileList.concat(action.fileIndex),
      }
    case REMOVE_FILE:
      return {
        ...state,
        selectedFileList: state.selectedFileList.filter(
          (fileIndex) => fileIndex !== action.fileIndex
        ),
      }
    default:
      return state
  }
}
