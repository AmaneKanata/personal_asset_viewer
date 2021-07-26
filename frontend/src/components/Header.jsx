import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import FavoriteButton from './FavoriteButton'
import DeleteButton from './DeleteButton'
import MenuButton from './MenuButton'
import CloseButton from './CloseButton'
import Menu from './Menu'
import '../css/header.scss'
import Configuration from '../Configuration'

function Header({ state, setState, setQueryData, deleteSelectedFolders, setSelectedFolderList, moveScrolltoTop }) {
  const [menuState, setMenuState] = useState(false)

  return (
    <div className="header">
      {state === Configuration.STATE_NORMAL && (
        <>
          <MenuButton setMenuState={setMenuState} />
          <Search setQueryData={setQueryData} moveScrolltoTop={moveScrolltoTop}/>
          <FavoriteButton setQueryData={setQueryData} moveScrolltoTop={moveScrolltoTop}/>
          <Menu menuState={menuState} setMenuState={setMenuState} setState={setState}/>
        </>
      )}
      {state === Configuration.STATE_DELETING && (
        <>
          <DeleteButton deleteSelectedFolders={deleteSelectedFolders} />
          <CloseButton setState={setState} setSelectedFolderList={setSelectedFolderList}/>
        </>
      )}
    </div>
  )
}

Header.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  setQueryData: PropTypes.func.isRequired,
  deleteSelectedFolders: PropTypes.func.isRequired,
  setSelectedFolderList: PropTypes.func.isRequired,
  moveScrolltoTop: PropTypes.func.isRequired
}

export default Header
