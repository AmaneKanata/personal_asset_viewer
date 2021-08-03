/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMode } from '../redux_modules/appState'
import { setSelectedFolderList } from '../redux_modules/selectedFolderList'
import { setSelectedFileList } from '../redux_modules/selectedFileList'
import Configuration from '../Configuration'
import { setUploadedFile } from '../redux_modules/loadedFileList'

function CloseButton() {

  const dispatch = useDispatch()
  const { scene } = useSelector(state => ({
    scene: state.appState.scene
  }))

  const handleOnClick = () => {
    if(scene === Configuration.SCENE_FOLDER_LIST) {
      dispatch(setSelectedFolderList([]))
    } else if(scene === Configuration.SCENE_FOLDER_DETAIL) {
      dispatch(setSelectedFileList([]))
    } else if(scene === Configuration.SCENE_UPLOADING) {
      dispatch(setUploadedFile([]))
    }
    dispatch(setMode(Configuration.STATE_NORMAL))
  }

  return (
    <img
      src="./close.png"
      alt=""
      className="close_button"
      onClick={handleOnClick}
    />
  )
}

export default CloseButton
