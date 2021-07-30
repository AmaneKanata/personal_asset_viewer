import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import FolderItems from './FolderItems'
import { setScene, setFolder } from '../redux_modules/appState'
import Configuration from '../Configuration'

function FolderDetail({ match }) {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setScene(Configuration.SCENE_FOLDER_DETAIL))
    dispatch(setFolder(match.params.id))
  }, [])

  return (
    <div>
      <FolderItems />
    </div>
  )
}

FolderDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default FolderDetail
