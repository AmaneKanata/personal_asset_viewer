/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import '../css/header.scss'

function FavoriteButton({ setQueryData }) {

    const queryString = {
        favorite : true
    }

    const handleOnClick = () => {
        setQueryData(queryString)
    }

    return (
        <img src="./favorite_outline.png" alt="" onClick={handleOnClick} className="favorite_search_button"/>
    )
}

FavoriteButton.propTypes = {
    setQueryData: PropTypes.func.isRequired
}

export default FavoriteButton