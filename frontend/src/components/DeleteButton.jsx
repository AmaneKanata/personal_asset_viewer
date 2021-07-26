/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'

function DeleteButton({ match, deleteSelectedFolders }) {

    const handleOnClick = () => {
        if(match === undefined) {
            deleteSelectedFolders()
            return
        }
        deleteSelectedFolders(match.params.id)
    }

    return (
        <img src="./delete.png" alt="" onClick={handleOnClick} className="delete_button"/>
    )
}

DeleteButton.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    deleteSelectedFolders : PropTypes.func.isRequired
}

DeleteButton.defaultProps = {
    match: undefined
}

export default DeleteButton