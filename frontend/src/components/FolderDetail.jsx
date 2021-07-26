import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FolderItems from './FolderItems'

function FolderDetail({
  match,
  state,
  selectedFileList,
  addSelectedFile,
  removeSelectedFile,
}) {
  const [folderDetail, setFolderDetail] = useState({
    items: [],
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`http://localhost:3000/${match.params.id}/detail`).then((res) => {
      setFolderDetail(res.data[0])
    })
  }, [])

  return (
    <div>
      <FolderItems
        data={{ id: folderDetail._id }}
        state={state}
        selectedFileList={selectedFileList}
        addSelectedFile={addSelectedFile}
        removeSelectedFile={removeSelectedFile}
      />
    </div>
  )
}

FolderDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  state: PropTypes.string.isRequired,
  selectedFileList: PropTypes.arrayOf(PropTypes.number).isRequired,
  addSelectedFile: PropTypes.func.isRequired,
  removeSelectedFile: PropTypes.func.isRequired,
}

export default FolderDetail
