import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Alert } from 'react-native';
import { SongCard } from './components/SongCard';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { ActivityIndicator } from 'react-native';
import { BottomPlayer } from './components/bottomPlayer';


const BACKEND_URL = 'http://192.168.1.33:8080';

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
  const { playSound, pauseSound, playbackStatus } = useAudioPlayer();
  const [songData, setSongData] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

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

  const handleSongSelect = (song: Song) => {
    if (song.signedUrl) {
      setSelectedSong(song);
      playSound(song.signedUrl);
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
          contentContainerStyle={{ paddingBottom: selectedSong ? 100 : 0 }} // to avoid overlap
        />

        {selectedSong && (
          <BottomPlayer
            title={selectedSong.title}
            artist={selectedSong.artistName}
            coverUrl={selectedSong.coverUrl}
            isPlaying={playbackStatus.isPlaying}
            onPlay={() => playSound(selectedSong.signedUrl!)}
            onPause={pauseSound}
          />
        )}
      </>
    )}
  </SafeAreaView>
  );
}
