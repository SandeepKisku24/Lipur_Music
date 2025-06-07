import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

interface Props {
  title: string;
  artist: string;
  coverUrl?: string;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (position: number) => void;
  isBusy: boolean;
}

export const BottomPlayer: React.FC<Props> = ({
  title,
  artist,
  coverUrl,
  isPlaying,
  isLoading,
  position,
  duration,
  onPlay,
  onPause,
  onSeek,
  isBusy,
}) => (
  <View style={styles.container}>
    {coverUrl && <Image source={{ uri: coverUrl }} style={styles.cover} />}
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
      <Slider
        style={styles.seekBar}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onSlidingComplete={onSeek} // Use onSlidingComplete instead of onValueChange
        disabled={!duration || isLoading}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#000"
      />
    </View>
    <TouchableOpacity onPress={isPlaying ? onPause : onPlay} disabled={isBusy || isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#000"  />
      )}
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
  seekBar: { marginTop: 5 },
});