export interface File {
  name: string
  artist?: string
  cover?: string
}
export interface FileMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
}
export interface AudioMetadata extends FileMetadata {
  duration?: number;
  bitrate?: number;
  sampleRate?: number;
  coverUrl?: string;
}
export interface VideoMetadata {
  duration?: number;
  width?: number;
  height?: number;
  codec?: string;
  bitrate?: number;
  fps?: number;
  thumbnailUrl?: string;
  previewUrl?: string; // URL for the low-quality version of the video
}
export interface FileInfo {
  id: string;
  name: string;
  path: string;
  url: string;
  size: number;
  mimetype: string;
  uploadDate: string;
  metadata?: FileMetadata;
  audioMetadata?: AudioMetadata;
  videoMetadata?: VideoMetadata;
}
export interface FilesState {
  loading: boolean;
  files: FileInfo[];
  photos: FileInfo[];
  publicURL: string;
  storageFilesSize: number;
  storageCapacity: number;
  loadingStates: Record<string, boolean>;
}
