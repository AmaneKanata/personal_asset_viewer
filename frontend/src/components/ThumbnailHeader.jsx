import Menu from './Menu'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Configuration from '../Configuration'
import MenuButton from './MenuButton'
import DeleteButton from './DeleteButton'
import CloseButton from './CloseButton'

function ThumbnailHeader({
  match,
  state,
  setState,
  deleteSelectedFiles,
  setSelectedFileList,
}) {
  const [menuState, setMenuState] = useState(false)

  useEffect(
    () => () => {
      setState(Configuration.STATE_NORMAL)
    },
    []
  )

  return (
    <div className="header">
      {state === Configuration.STATE_NORMAL && (
        <>
          <MenuButton setMenuState={setMenuState} />
          <Menu
            menuState={menuState}
            setMenuState={setMenuState}
            setState={setState}
          />
        </>
      )}
      {state === Configuration.STATE_DELETING && (
        <>
          <DeleteButton
            deleteSelectedFolders={deleteSelectedFiles}
            match={match}
          />
          <CloseButton
            setState={setState}
            setSelectedFolderList={setSelectedFileList}
          />
        </>
      )}
    </div>
  )
}

ThumbnailHeader.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  deleteSelectedFiles: PropTypes.func.isRequired,
  setSelectedFileList: PropTypes.func.isRequired,
}

export default ThumbnailHeader
