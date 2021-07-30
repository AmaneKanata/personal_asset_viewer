import axios from 'axios'

const SET_FOLDER_LIST = 'folderList/SET_FOLDER_LIST'
// const LOAD_FOLDER_LIST = 'folderList/LOAD_FOLDER_LIST'

const initialState = {
  folderList: [],
}

export const setFolderList = (folderList) => ({
  type: SET_FOLDER_LIST,
  folderList,
})

export const loadFolderList = (queryData) => (dispatch) => {
  axios
    .get('http://localhost:3000/list', {
      params: queryData,
    })
    .then((res) => {
      dispatch(setFolderList(res.data))
    })
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_FOLDER_LIST:
      return {
        ...state,
        folderList: action.folderList,
      }
    default:
      return state
  }
}
