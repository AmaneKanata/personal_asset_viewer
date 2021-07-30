/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useDispatch } from 'react-redux'
import queryManager from '../redux_modules/query'

function FavoriteButton() {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(
      queryManager.setQueryData({
        favorite: true,
      })
    )
    window.scrollTo(0, 0)
  }

  return (
    <img
      src="./favorite_outline.png"
      alt=""
      onClick={handleOnClick}
      className="favorite_search_button"
    />
  )
}

export default FavoriteButton
