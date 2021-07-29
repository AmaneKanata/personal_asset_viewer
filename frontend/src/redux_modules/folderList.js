import axios from 'axios'

const SET_FOLDER_LIST = 'folderList/SET_FOLDER_LIST'
// const LOAD_FOLDER_LIST = 'folderList/LOAD_FOLDER_LIST'

const initialState = {
  folderList: [],
}

export default {
  reduce(state = initialState, action) {
    console.log(action)
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
  setFolderList: (folderList) => ({
    type: SET_FOLDER_LIST,
    folderList,
  }),
  loadFolderList: async (queryData) => {
    console.log("before query")
    const result = await axios.get('http://localhost:3000/list', {
      params: queryData,
    })
    console.log("after query")
    return {
      type: SET_FOLDER_LIST,
      folderList: result.data,
    }
  },
}
