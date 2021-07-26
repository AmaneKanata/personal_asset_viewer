/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'

function MenuButton({ setMenuState }) {
  const handleOnClick = () => {
    setMenuState(true)
  }

  return (
    <img
      src="./menu.png"
      alt=""
      className="menu_button"
      onClick={handleOnClick}
    />
  )
}

MenuButton.propTypes = {
  setMenuState: PropTypes.func.isRequired,
}

export default MenuButton
