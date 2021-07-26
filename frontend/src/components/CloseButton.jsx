/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import Configuration from '../Configuration'

function CloseButton({ setState, setSelectedFolderList }) {
  const handleOnClick = () => {
    setState(Configuration.STATE_NORMAL)
    setSelectedFolderList([])
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

CloseButton.propTypes = {
  setState: PropTypes.func.isRequired,
  setSelectedFolderList: PropTypes.func.isRequired,
}

export default CloseButton
