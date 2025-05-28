import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  artist: string;
  coverUrl?: string;
  onPress: () => void;
}

export const SongCard: React.FC<Props> = ({ title, artist, coverUrl, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {coverUrl ? (
      <Image source={{ uri: coverUrl }} style={styles.coverImage} />
    ) : (
      <View style={styles.placeholderBox} />
    )}
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 15,
  },
  placeholderBox: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 15,
    backgroundColor: '#ccc', // light gray placeholder
  },
  textContainer: {
    flex: 1,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  artist: { color: '#555' },
});
