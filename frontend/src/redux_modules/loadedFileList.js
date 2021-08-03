const SET_FILE = 'loadedFileList/SET_FILE_LIST'
const ADD_FILE = 'loadedFileList/ADD_FILE'
const REMOVE_FILE = 'loadedFileList/REMOVE_FILE'

const initialState = {
  loadedFile: [],
}

export const setUploadedFile = (file) => ({
  type: SET_FILE,
  file,
})

export const addUploadedFile = (file) => ({
  type: ADD_FILE,
  file,
})

export const removeUploadedFile = (fileName) => ({
  type: REMOVE_FILE,
  fileName,
})

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        loadedFile: action.file,
      }
    case ADD_FILE:
      return {
        ...state,
        loadedFile: state.loadedFile.concat(action.file),
      }
    case REMOVE_FILE:
      return {
        ...state,
        loadedFile: state.loadedFile.filter(
          (file) => file.name !== action.fileName
        ),
      }
    default:
      return state
  }
}
