/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'

function DeleteButton({ deleteSelectedFolders }) {

    const handleOnClick = () => {
        deleteSelectedFolders()
    }

    return (
        <img src="./delete.png" alt="" onClick={handleOnClick} className="delete_button"/>
    )
}

DeleteButton.propTypes = {
    deleteSelectedFolders : PropTypes.func.isRequired
}

export default DeleteButton