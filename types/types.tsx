export interface Song {
    id: string;
    title: string;
    artistName: string;
    artistId: string;
    fileName: string;
    fileUrl: string;
    duration: number;
    genre: string;
    uploadedAt: number;
    coverUrl: string;
    likes: number;
    downloads: number;
    playCount: number;
    signedUrl?: string;
  }
  
  export interface Playlist {
    id: string;
    name: string;
    description?: string;
    songs: Song[];
    createdAt: number;
  }