/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFolderList } from '../redux_modules/selectedFolderList'
import { setSelectedFileList } from '../redux_modules/selectedFileList'
import { setMode } from '../redux_modules/appState'
import { loadFolderList } from '../redux_modules/folderList'
import Configuration from '../Configuration'

function DeleteButton() {
  const dispatch = useDispatch()
  const { selectedFolderList, selectedFileList, scene, folderId } = useSelector(
    (state) => ({
      selectedFolderList: state.selectedFolderList.selectedFolderList,
      selectedFileList: state.selectedFileList.selectedFileList,
      scene: state.appState.scene,
      folderId: state.appState.data.folderId,
    })
  )

  const handleOnClick = async () => {
    if (scene === Configuration.SCENE_FOLDER_DETAIL) {
      if (folderId !== undefined) {
        const items = await axios
          .get(`http://localhost:3000/${folderId}/Detail`)
          .then((result) => result.data[0].items)

        await Promise.all(
          selectedFileList.map((index) =>
            axios.delete(`http://localhost:3000/${folderId}/item`, {
              params: {
                fileName: items[index],
              },
            })
          )
        )
        dispatch(setSelectedFileList([]))
      }
    } else {
      await Promise.all(
        selectedFolderList.map((selectedFolderId) =>
          axios.delete(`http://localhost:3000/${selectedFolderId}`)
        )
      )
      dispatch(setSelectedFolderList([]))
      dispatch(loadFolderList())
    }
    dispatch(setMode(Configuration.STATE_NORMAL))
  }

  return (
    <img
      src="./delete.png"
      alt=""
      onClick={handleOnClick}
      className="delete_button"
    />
  )
}

export default DeleteButton
