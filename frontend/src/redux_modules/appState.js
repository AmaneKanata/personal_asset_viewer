import Configuration from '../Configuration'

const SET_MODE = 'appState/SET_MODE'
const SET_SCENE = 'appState/SET_SCENE'

const initialState = {
  mode: Configuration.STATE_NORMAL,
  scene: Configuration.SCENE_FOLDER_LIST,
}

export default {
  reduce (state = initialState, action) {
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
      default:
        return state
    }
  },
  setMode: (mode) => ({
    type: SET_MODE,
    mode,
  }),
  setScene: (scene) => ({
    type: SET_SCENE,
    scene,
  }),
}
