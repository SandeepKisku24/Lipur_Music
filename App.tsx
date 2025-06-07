import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Alert } from 'react-native';
import { SongCard } from './components/SongCard';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { ActivityIndicator } from 'react-native';
import { BottomPlayer } from './components/bottomPlayer';

const BACKEND_URL = 'http://192.168.1.56:8080';

interface Song {
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

export default function App() {
  const { playSound, pauseSound, stopSound, seekTo, playbackStatus } = useAudioPlayer();
  const [songData, setSongData] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [loadingSongId, setLoadingSongId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/songs`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const { songs } = await response.json();

        const updatedSongs = await Promise.all(
          songs.map(async (song: Song) => {
            try {
              const urlResponse = await fetch(
                `${BACKEND_URL}/stream-url?file=${encodeURIComponent(song.fileName)}`
              );
              if (!urlResponse.ok) {
                throw new Error(`HTTP ${urlResponse.status}`);
              }
              const { url } = await urlResponse.json();
              return { ...song, signedUrl: url };
            } catch (error: unknown) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              console.error(`Error fetching signed URL for ${song.fileName}:`, error);
              Alert.alert('Error', `Failed to load ${song.fileName}: ${errorMessage}`);
              return { ...song, signedUrl: '' };
            }
          })
        );
        setSongData(updatedSongs);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        Alert.alert('Error', `Failed to load songs: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
    const refreshInterval = setInterval(fetchSongs, 50 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  const handleSongSelect = async (song: Song) => {
    if (song.signedUrl && !playbackStatus.isLoading) {
      if (selectedSong?.id === song.id && playbackStatus.isPlaying) {
        pauseSound();
      } else {
        stopSound();
        setSelectedSong(song);
        setLoadingSongId(song.id); 
        await playSound(song.signedUrl);
        setLoadingSongId(null); 
      }
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <>
          <FlatList
            data={songData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SongCard
                title={item.title}
                artist={item.artistName}
                coverUrl={item.coverUrl}
                onPress={() => handleSongSelect(item)}
              />
            )}
            contentContainerStyle={{ paddingBottom: selectedSong ? 100 : 0 }}
          />
          {selectedSong && (
            <BottomPlayer
              title={selectedSong.title}
              artist={selectedSong.artistName}
              coverUrl={selectedSong.coverUrl}
              isPlaying={playbackStatus.isPlaying}
              isLoading={playbackStatus.isLoading}
              position={playbackStatus.position}
              duration={playbackStatus.duration}
              onPlay={() => handleSongSelect(selectedSong)}
              onPause={pauseSound}
              onSeek={seekTo}
              isBusy={loadingSongId === selectedSong?.id}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}