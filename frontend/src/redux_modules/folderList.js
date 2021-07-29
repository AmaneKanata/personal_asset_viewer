const SET_FOLDER_LIST = 'folderList/SET_FOLDER_LIST'

const initialState = {
  folderList: [],
}

export default {
  reduce (state = initialState, action) {
    switch (action.type) {
      case SET_FOLDER_LIST:
        return {
          ...state,
          folderList: action.folderList,
        }
      default:
        return state
    }
  },
  setFolderList: folderList => ({
    type: SET_FOLDER_LIST,
    folderList
  })
}
