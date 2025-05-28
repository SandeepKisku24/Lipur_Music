import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface PlaybackStatus {
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
}

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>({
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 0,
  });

  const playSound = async (url: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      console.log('Loading audio from:', url);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setPlaybackStatus({
              isPlaying: status.isPlaying,
              positionMillis: status.positionMillis,
              durationMillis: status.durationMillis || 0,
            });
          }
        }
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

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setPlaybackStatus({ isPlaying: false, positionMillis: 0, durationMillis: 0 });
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return { playSound, pauseSound, playbackStatus };
};
