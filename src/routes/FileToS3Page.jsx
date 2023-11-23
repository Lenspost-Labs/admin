import React from 'react'
import { FileDropZone } from "../components"

const FileToS3Page = () => {

  console.log('FileToS3Page')

  return (
    <div className='flex flex-col justify-center w-full m-8'>
      <FileDropZone/>
    </div>
  )
}

export default FileToS3Page;