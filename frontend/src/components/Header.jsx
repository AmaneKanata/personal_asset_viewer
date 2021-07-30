import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Search from './Search'
import FavoriteButton from './FavoriteButton'
import DeleteButton from './DeleteButton'
import MenuButton from './MenuButton'
import CloseButton from './CloseButton'
import Menu from './Menu'
import Configuration from '../Configuration'

function Header() {
  const [menuState, setMenuState] = useState(false)
  const { appState } = useSelector((state) => ({
    appState: state.appState,
  }))

  return (
    <div className="header">
      {appState.mode === Configuration.STATE_NORMAL &&
      appState.scene === Configuration.SCENE_FOLDER_LIST ? (
        <>
          <MenuButton setMenuState={setMenuState} />
          <Search />
          <FavoriteButton />
          <Menu menuState={menuState} setMenuState={setMenuState} />
        </>
      ) : (
        <>
          <MenuButton setMenuState={setMenuState} />
          <Menu menuState={menuState} setMenuState={setMenuState} />
        </>
      )}
      {appState.mode === Configuration.STATE_DELETING && (
        <>
          <DeleteButton />
          <CloseButton />
        </>
      )}
    </div>
  )
}

export default Header
