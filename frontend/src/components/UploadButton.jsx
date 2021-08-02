/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'

function UploadButton() {

    const handleOnClick = () => {
        console.log("gogo")
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