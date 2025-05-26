import React from 'react';
import { FlatList, SafeAreaView, StatusBar } from 'react-native';
import { SongCard } from './components/SongCard';
import { useAudioPlayer } from './hooks/useAudioPlayer';

// Replace these with backend data later
const songs = [
  {
    id: '1',
    title: 'Santhali Soul',
    artist: 'Soren Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // placeholder
  },
  {
    id: '2',
    title: 'Jungle Beats',
    artist: 'Tudu Crew',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
];

export default function App() {
  const { playSound, pauseSound } = useAudioPlayer();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongCard
            title={item.title}
            artist={item.artist}
            url={item.url}
            onPlay={() => playSound(item.url)}
            onPause={pauseSound}
          />
        )}
      />
    </SafeAreaView>
  );
}
