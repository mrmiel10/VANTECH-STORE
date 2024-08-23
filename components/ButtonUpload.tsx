// import React from 'react'

// const ButtonUpload = () => {
//   return (
//     <Button
//         className="mt-2"
//         onClick={async () => {
//           await Promise.all(
//             fileStates.map(async (fileState,_) => {
//               try {
//                 if (
//                   fileState.progress !== 'PENDING' ||
//                   typeof fileState.file === 'string'
//                 ) {
//                   return;
//                 }
//                 const res = await edgestore.publicFiles.upload({
//                   file: fileState.file,
//                   options:{

//                   },
//                   onProgressChange: async (progress) => {
//                     updateFileProgress(fileState.key, progress);
//                     if (progress === 100) {
//                       // wait 1 second to set it to complete
//                       // so that the user can see the progress bar
//                       await new Promise((resolve) => setTimeout(resolve, 1000));
//                       updateFileProgress(fileState.key, 'COMPLETE');
//                     }
//                   },
//                 });
         
//               } catch (err) {
//                 updateFileProgress(fileState.key, 'ERROR');
//               }
//             }),
//           );
//         }}
//         disabled={
//           !fileStates.filter((fileState) => fileState.progress === 'PENDING')
//             .length
//         }
//       >
//         Upload
//       </Button>
//   )
// }

// export default ButtonUpload