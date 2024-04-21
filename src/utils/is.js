export const isImage = ext => ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(ext)
export const isVideo = ext => ["video/mp4", "video/3gp"].includes(ext)
export const isDocument = ext => ["application/pdf", "application/msword"].includes(ext)
export const isAudio = ext => ["audio/mpeg"].includes(ext)

// export const isPDF = ext => ["application/pdf"].includes(ext)
// export const isDOC = ext => ["application/msword"].includes(ext)
