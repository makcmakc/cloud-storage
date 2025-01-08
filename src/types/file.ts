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
  previewUrl?: string; // URL для низкокачественной версии видео
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

export type FileType = 'audio' | 'image' | 'document' | 'other';
export interface FileCardProps {
  file: FileInfo;
  onDelete: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
  onShare?: (id: string) => void;
} 