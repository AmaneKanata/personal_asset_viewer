import React from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import FavoriteButton from './FavoriteButton'
import DeleteButton from './DeleteButton'
import '../css/header.scss'
import Configuration from '../Configuration'

function Header({ state, setQueryData, deleteSelectedFolders }) {
  return (
    <div className="header">
      {state === Configuration.STATE_NORMAL && (
        <>
          <Search setQueryData={setQueryData} />
          <FavoriteButton setQueryData={setQueryData} />
        </>
      )}
      {state === Configuration.STATE_DELETING && (
        <>
          <DeleteButton deleteSelectedFolders={deleteSelectedFolders}/>
        </>
      )}
    </div>
  )
}

Header.propTypes = {
  state: PropTypes.string.isRequired,
  setQueryData: PropTypes.func.isRequired,
  deleteSelectedFolders: PropTypes.func.isRequired
}

export default Header
