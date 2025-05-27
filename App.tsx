import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Alert, Platform } from 'react-native';
import { SongCard } from './components/SongCard';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { ActivityIndicator } from 'react-native';

// Use your computer's local IP address
const BACKEND_URL = 'http://192.168.1.33:8080';

const songs = [
  {
    id: '1',
    title: 'Santhali Soul',
    artist: 'Soren Band',
    fileName: 'song1.mp3',
  },
  {
    id: '2',
    title: 'O Jana',
    artist: 'Unknown Artist',
    fileName: 'o_jana (1).mp3',
  },
];

interface Song {
  id: string;
  title: string;
  artist: string;
  fileName: string;
  signedUrl?: string;
}

export default function App() {
  const { playSound, pauseSound } = useAudioPlayer();
  const [songData, setSongData] = useState<Song[]>(songs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSignedUrls = async () => {
      setIsLoading(true);
      try {
        const updatedSongs = await Promise.all(
          songs.map(async (song) => {
            try {
              const response = await fetch(
                `${BACKEND_URL}/stream-url?file=${encodeURIComponent(song.fileName)}`
              );
              if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
              }
              const data = await response.json();
              if (data.error) {
                console.error(`Error for ${song.fileName}:`, data.error);
                return { ...song, signedUrl: '' };
              }
              console.log(`Fetched signed URL for ${song.fileName}:`, data.url);
              return { ...song, signedUrl: data.url };
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
        console.error('Error fetching signed URLs:', error);
        Alert.alert('Error', `Failed to load songs: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignedUrls();
    const refreshInterval = setInterval(fetchSignedUrls, 50 * 60 * 1000); // Refresh every 50 minutes
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <FlatList
          data={songData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongCard
              title={item.title}
              artist={item.artist}
              url={item.signedUrl || ''}
              onPlay={() => item.signedUrl && playSound(item.signedUrl)}
              onPause={pauseSound}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}