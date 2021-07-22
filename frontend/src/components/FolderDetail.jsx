import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FolderItems from "./FolderItems"

function FolderDetail(props) {
  const [folderDetail, setFolderDetail] = useState({
    items: [],
  })

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${props.match.params.id}/detail`)
      .then((res) => {
        setFolderDetail(res.data[0])
      })
  }, [])

  return (
    <div>
      <FolderItems data={{ id: folderDetail._id }} />
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
