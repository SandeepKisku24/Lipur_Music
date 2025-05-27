import { Audio } from 'expo-av';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (url: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      console.log('Loading audio from:', url);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);
      console.log('Audio loaded successfully');
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const pauseSound = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        console.log('Audio paused');
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
      Alert.alert('Error', 'Failed to pause audio');
    }
  };

  return { playSound, pauseSound };
};