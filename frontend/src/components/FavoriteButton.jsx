/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import queryManager from '../redux_modules/query'

function FavoriteButton({ moveScrolltoTop }) {

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(queryManager.setQueryData({
            favorite: true
        }))
        // setQueryData(queryString)
        moveScrolltoTop()
    }

    return (
        <img src="./favorite_outline.png" alt="" onClick={handleOnClick} className="favorite_search_button"/>
    )
}

FavoriteButton.propTypes = {
    moveScrolltoTop: PropTypes.func.isRequired
}

export default FavoriteButton