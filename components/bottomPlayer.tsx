import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  artist: string;
  coverUrl?: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export const BottomPlayer: React.FC<Props> = ({
  title,
  artist,
  coverUrl,
  isPlaying,
  onPlay,
  onPause,
}) => (
  <View style={styles.container}>
    {coverUrl && <Image source={{ uri: coverUrl }} style={styles.cover} />}
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={isPlaying ? onPause : onPlay}>
      <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#000" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: { fontWeight: 'bold' },
  artist: { color: '#666' },
});
