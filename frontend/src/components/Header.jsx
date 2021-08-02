import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Search from './Search'
import FavoriteButton from './FavoriteButton'
import DeleteButton from './DeleteButton'
import MenuButton from './MenuButton'
import CloseButton from './CloseButton'
import Menu from './Menu'
import Configuration from '../Configuration'
import UploadButton from './UploadButton'

function Header() {
  const [menuState, setMenuState] = useState(false)
  const { appState } = useSelector((state) => ({
    appState: state.appState,
  }))

  let headerContent

  if (appState.mode === Configuration.STATE_NORMAL) {
    if (appState.scene === Configuration.SCENE_FOLDER_LIST) {
      headerContent = (
        <>
          <MenuButton setMenuState={setMenuState} />
          <Search />
          <FavoriteButton />
          <Menu menuState={menuState} setMenuState={setMenuState} />
        </>
      )
    } else if (appState.scene === Configuration.SCENE_FOLDER_DETAIL) {
      headerContent = (
        <>
          <MenuButton setMenuState={setMenuState} />
          <Menu menuState={menuState} setMenuState={setMenuState} />
        </>
      )
    }
  } else if (appState.mode === Configuration.STATE_DELETING) {
    headerContent = (
      <>
        <DeleteButton />
        <CloseButton />
      </>
    )
  } else if (appState.mode === Configuration.STATE_UPLOADING) {
    headerContent = (
      <>
        <UploadButton />
        <CloseButton />
      </>
    )
  }

  return <div className="header">{headerContent}</div>
}

export default Header
