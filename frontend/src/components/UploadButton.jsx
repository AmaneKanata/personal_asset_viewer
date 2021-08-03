/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUploadedFile } from '../redux_modules/loadedFileList'

function UploadButton() {
  const dispatch = useDispatch()
  const { uploadedFile } = useSelector((state) => ({
    uploadedFile: state.loadedFileList.loadedFile,
  }))

  const handleOnClick = () => {
    const formData = new FormData()
    uploadedFile.forEach((file) => {
      formData.append('fileList', file)
    })
    // formData.enctype='multipart/form-data';
    axios.post('http://localhost:3000/post', formData).then((res) => {
      console.log(res)
      dispatch(setUploadedFile([]))
    })
  }

  return (
    <img
      src="./upload.png"
      alt=""
      onClick={handleOnClick}
      className="upload_button"
    />
  )
}

export default UploadButton
