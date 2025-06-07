import { Audio, AVPlaybackStatus } from 'expo-av';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

export const useAudioPlayer = () => {
  const [playbackStatus, setPlaybackStatus] = useState<{
    position: number;
    duration: number;
    isPlaying: boolean;
    isLoading: boolean;
  }>({ position: 0, duration: 0, isPlaying: false, isLoading: false });
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentUrlRef = useRef<string | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false); // Lock for playSound
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Throttle status updates
  const updateStatus = useCallback((status: AVPlaybackStatus) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 200) return; // Throttle to 200ms
    lastUpdateTime.current = now;

    console.log('updateStatus:', {
      isLoaded: status.isLoaded,
      isPlaying: status.isLoaded ? status.isPlaying : undefined,
      position: status.isLoaded ? status.positionMillis : undefined,
    });

    if (status.isLoaded) {
      setPlaybackStatus({
        position: status.positionMillis || 0,
        duration: status.durationMillis || 0,
        isPlaying: status.isPlaying,
        isLoading: false,
      });
      isPlayingRef.current = status.isPlaying;
    } else {
      setPlaybackStatus((prev) => ({ ...prev, isLoading: false }));
      isPlayingRef.current = false;
      if ('error' in status && status.error) {
        console.error('Playback error:', status.error);
        Alert.alert('Error', status.error);
      }
    }
  }, []);

  const playSound = async (url: string) => {
    if (playbackStatus.isLoading || isPlayingRef.current) {
      console.log('playSound blocked:', { isLoading: playbackStatus.isLoading, isPlaying: isPlayingRef.current });
      return;
    }

    console.log('playSound:', { url, currentUrl: currentUrlRef.current });

    try {
      setPlaybackStatus((prev) => ({ ...prev, isLoading: true }));
      isPlayingRef.current = true;

      // If same URL, toggle play/pause
      if (currentUrlRef.current === url && soundRef.current) {
        if (!playbackStatus.isPlaying) {
          console.log('Resuming same song');
          await soundRef.current.playAsync();
          setPlaybackStatus((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
        } else {
          console.log('Pausing same song');
          await soundRef.current.pauseAsync();
          setPlaybackStatus((prev) => ({ ...prev, isPlaying: false, isLoading: false }));
          isPlayingRef.current = false;
        }
        return;
      }

      // Unload existing sound
      if (soundRef.current) {
        console.log('Unloading existing sound');
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Load and play new sound
      console.log('Loading new sound:', url);
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
        updateStatus
      );
      soundRef.current = sound;
      currentUrlRef.current = url;
      setPlaybackStatus((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error playing sound:', error);
      setPlaybackStatus((prev) => ({ ...prev, isLoading: false }));
      isPlayingRef.current = false;
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const pauseSound = async () => {
    console.log('pauseSound:', { isPlaying: playbackStatus.isPlaying, isLoading: playbackStatus.isLoading });
    try {
      if (soundRef.current && playbackStatus.isPlaying && !playbackStatus.isLoading) {
        await soundRef.current.pauseAsync();
        setPlaybackStatus((prev) => ({ ...prev, isPlaying: false }));
        isPlayingRef.current = false;
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
      Alert.alert('Error', 'Failed to pause audio');
    }
  };

  const stopSound = async () => {
    console.log('stopSound');
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        currentUrlRef.current = null;
        setPlaybackStatus({ position: 0, duration: 0, isPlaying: false, isLoading: false });
        isPlayingRef.current = false;
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
      Alert.alert('Error', 'Failed to stop audio');
    }
  };

  // Debounce seekTo
  const seekTo = useCallback((position: number) => {
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
    }
    seekTimeoutRef.current = setTimeout(async () => {
      console.log('seekTo:', { position });
      try {
        if (soundRef.current && !playbackStatus.isLoading) {
          await soundRef.current.setPositionAsync(position);
        }
      } catch (error) {
        console.error('Error seeking:', error);
        Alert.alert('Error', 'Failed to seek');
      }
    }, 100); // Debounce 100ms
  }, [playbackStatus.isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('Cleaning up useAudioPlayer');
      if (soundRef.current) {
        soundRef.current.stopAsync().catch(console.error);
        soundRef.current.unloadAsync().catch(console.error);
        soundRef.current = null;
        currentUrlRef.current = null;
        isPlayingRef.current = false;
      }
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, []);

  return { playSound, pauseSound, stopSound, seekTo, playbackStatus };
};