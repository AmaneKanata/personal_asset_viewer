import Configuration from '../Configuration'

const SET_MODE = 'appState/SET_MODE'
const SET_SCENE = 'appState/SET_SCENE'
const SET_FOLDER = 'appState/SET_FOLDER'

const initialState = {
  mode: Configuration.STATE_NORMAL,
  scene: Configuration.SCENE_FOLDER_LIST,
  data: {
    folderId: undefined,
  },
}

export const setMode = (mode) => ({
  type: SET_MODE,
  mode,
})

export const setScene = (scene) => ({
  type: SET_SCENE,
  scene,
})

export const setFolder = (folderId) => ({
  type: SET_FOLDER,
  folderId,
})

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
      }
    case SET_SCENE:
      return {
        ...state,
        scene: action.scene,
      }
    case SET_FOLDER:
      return {
        ...state,
        data : {
          ...state.data,
          folderId: action.folderId
        }
      }
    default:
      return state
  }
}
