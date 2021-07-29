// @ts-check
const SET_FILE_LIST = 'selectedFileList/SET_FILE_LIST'
const ADD_FILE = 'selectedFileList/ADD_FILE'
const REMOVE_FILE = 'selectedFileList/REMOVE_FILE'

const initialState = {
  selectedFileList: [],
}

export default {
  reduce (state = initialState, action) {
    switch (action.type) {
      case SET_FILE_LIST:
        return {
          ...state,
          selectedFileList: action.fileList,
        }
      case ADD_FILE:
        return {
          ...state,
          selectedFileList: state.selectedFileList.concat(action.fileName),
        }
      case REMOVE_FILE:
        return {
          ...state,
          selectedFileList: state.selectedFileList.filter(
            (fileName) => fileName !== action.fileName
          ),
        }
      default:
        return state
    }
  },
  setFileList: (fileList) => ({
    type: SET_FILE_LIST,
    fileList,
  }),
  addFile: (fileName) => ({
    type: ADD_FILE,
    fileName,
  }),
  removeile: (fileName) => ({
    type: REMOVE_FILE,
    fileName,
  }),
}
