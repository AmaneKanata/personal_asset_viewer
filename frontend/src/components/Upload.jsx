/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios'
import React, { useState } from 'react'
import '../css/upload.scss'

function UploadTest() {
  const [file, setFile] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('test', file)
    // setFile(null)
    axios.post('http://localhost:3000/testpost', formData)
  }

  const handleOnChange = ({ target: { files } }) => {
    setFile(files[0])
  }

  return (
    <div>
      <label htmlFor='file_input' className="file_input_label">
        test!
      </label>
      <input
        type="file"
        name="test"
        onChange={handleOnChange}
        className="file_input"
        id='file_input'
      />
    </div>
  )
}

export default UploadTest
