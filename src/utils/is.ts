export const isImage = (ext: string) => ["image/jpeg", "image/png", "image/webp ", "image/jpg", "image/gif"].includes(ext)
export const isVideo = (ext: string) => ["video/mp4", "video/3gp"].includes(ext)
export const isDocument = (ext: string) => ["application/pdf", "application/msword"].includes(ext)
export const isAudio = (ext: string) => ["audio/mpeg"].includes(ext)

export const isPDF = (ext: string) => ["application/pdf"].includes(ext)
export const isDOC = (ext: string) => ["application/msword"].includes(ext)

export const defineType = (ext: string) => {
  if (isImage(ext)) return 'image'
  if (isVideo(ext)) return 'video'
  if (isDocument(ext)) return 'document'
  if (isAudio(ext)) return 'audio'
}


// function awaitableJsmediatags(file: File) {
//   return new Promise(function(resolve, reject) {
//     // @ts-ignore: Unreachable code error
//     jsmediatags.read(file, {
//       onSuccess: function(tag: object) {
//         // resolve(tag?.tags);
//       },
//       onError: function(error: any) {
//         reject(error);
//       }
//     });
//   });
// }

export const getCoverByType = async (file: object) => {
  console.log(file);

      // @ts-ignore: Unreachable code error
      // let tags = await awaitableJsmediatags(file);
      // console.log('TAGS L ', tags)
    
      // const album = tags?.album
      // const artist = tags?.artist
      // const title = tags?.title
      // const year = tags?.year
      // let url = null
    
      // const image = tags?.picture
    
      // if (image) {
      //   const blob = new Blob([new Uint8Array(image.data)], { type: image.format });
      //   // url = URL.createObjectURL(blob);
      //   url = blob;
      // }
}