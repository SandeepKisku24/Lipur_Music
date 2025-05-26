// hooks/useAudioPlayer.ts
import { Audio } from 'expo-av';
import { useState } from 'react';

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (url: string) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true }
    );
    setSound(newSound);
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  return { playSound, pauseSound };
};
