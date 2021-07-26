/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'

function FavoriteButton({ setQueryData, moveScrolltoTop }) {

    const queryString = {
        favorite : true
    }

    const handleOnClick = () => {
        setQueryData(queryString)
        moveScrolltoTop()
    }

    return (
        <img src="./favorite_outline.png" alt="" onClick={handleOnClick} className="favorite_search_button"/>
    )
}

FavoriteButton.propTypes = {
    setQueryData: PropTypes.func.isRequired,
    moveScrolltoTop: PropTypes.func.isRequired
}

export default FavoriteButton