/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import '../css/upload.scss'
import { addUploadedFile, removeUploadedFile } from '../redux_modules/loadedFileList'

function UploadedFile({ dispatch, file }) {

  const handleOnClick = () => {
    dispatch(removeUploadedFile(file.name))
  }

  return (
    <div>
      {file.name}
      <button type="button" onClick={handleOnClick}>delete</button>
    </div>
  )
}

UploadedFile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

function UploadTest() {
  const dispatch = useDispatch()
  const { uploadedFile } = useSelector((state) => ({
    uploadedFile: state.loadedFileList.loadedFile,
  }))

  const handleOnChange = ({ target: { files } }) => {
    dispatch(addUploadedFile(files[0]))
  }

  return (
    <>
      <label htmlFor="file_input" className="file_input_label">
        <img src="./plus.png" alt="" />
        <label>add File</label>
      </label>
      <input
        type="file"
        name="test"
        onChange={handleOnChange}
        className="file_input"
        id="file_input"
      />
      {uploadedFile.map((file) => (
        <div key={file.name}>
          <UploadedFile file={file} dispatch={dispatch} />
        </div>
      ))}
    </>
  )
}

export default UploadTest
