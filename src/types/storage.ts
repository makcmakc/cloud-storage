export interface StorageStats {
  totalSize: number;      // Total size of all files in bytes
  usedSize: number;       // The size used, in bytes
  availableSize: number;  // Available size in bytes
  filesCount: number;     // Number of files
  storageLimit: number;   // Storage limit in bytes
}
