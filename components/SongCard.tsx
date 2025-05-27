import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Props {
  title: string;
  artist: string;
  url: string;
  onPlay: () => void;
  onPause: () => void;
}

export const SongCard: React.FC<Props> = ({ title, artist, url, onPlay, onPause }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.artist}>{artist}</Text>
    <View style={styles.buttons}>
      <Button title="Play" onPress={onPlay} disabled={!url} />
      <Button title="Pause" onPress={onPause} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { margin: 10, padding: 15, borderRadius: 10, backgroundColor: '#f4f4f4' },
  title: { fontSize: 16, fontWeight: 'bold' },
  artist: { color: '#555' },
  buttons: { flexDirection: 'row', marginTop: 10, gap: 10 },
});