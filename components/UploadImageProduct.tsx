import React from 'react'
import { MultiImageDropzone } from './MultiImageDropzone'
import { FileState } from './MultiImageDropzone'
type UploadImageProduct = {
fileStates:FileState[],
createImageFile:(files:FileState[]) => void,
setFileStates:React.Dispatch<React.SetStateAction<FileState[]>>
}
export const UploadImageProduct = ({fileStates,createImageFile,setFileStates}:UploadImageProduct) => {
  return (
    <MultiImageDropzone
    value={fileStates}
    dropzoneOptions={{
      maxFiles: 6,
    }}
    onChange={(files) => {
      createImageFile(files);

      setFileStates(files);
    }}
    onFilesAdded={async (addedFiles) => {
      createImageFile([...fileStates, ...addedFiles]);
      setFileStates([...fileStates, ...addedFiles]);
    }}
  />                                                                                                                       
  )
}

