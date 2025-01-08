export const GIF_MIME_TYPE = 'image/gif';

export const SUPPORTED_PHOTO_CONTENT_TYPES = new Set([
  'image/png', 'image/jpeg', GIF_MIME_TYPE,
]);

export const SUPPORTED_VIDEO_CONTENT_TYPES = new Set([
  'video/mp4', 'video/quicktime',
]);

export const SUPPORTED_AUDIO_CONTENT_TYPES = new Set([
  'audio/mp3',
  'audio/ogg',
  'audio/wav',
  'audio/mpeg',
  'audio/flac',
  'audio/aac',
  'audio/m4a',
  'audio/mp4',
  'audio/x-m4a',
]);

export const CONTENT_TYPES_WITH_PREVIEW = new Set([
  ...SUPPORTED_PHOTO_CONTENT_TYPES,
  ...SUPPORTED_VIDEO_CONTENT_TYPES,
]);