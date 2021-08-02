import axios from 'axios'
import React, { useState } from 'react'

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
      <form onSubmit={handleSubmit}>
        <input type="file" name="test" onChange={handleOnChange} />
        <button type="submit">upload</button>
      </form>
    </div>
  )
}

export default UploadTest
