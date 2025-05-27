import { useCallback } from "react";
import pinSound from "@/shared/assets/sounds/1_PinHit.mp3";
import errorSound from "@/shared/assets/sounds/2_ErrorBeep.mp3";
import buttonSound from "@/shared/assets/sounds/3_ButtonHit.mp3";
import clickIviewSound from "@/shared/assets/sounds/efectoClickIview.mp3";
import { SoundEffectType } from "@/shared/types/audio.types";

const soundMap: Record<SoundEffectType, string> = {
  pin: pinSound,
  error: errorSound,
  button: buttonSound,
  clickIview: clickIviewSound,
};

export const useSoundEffect = () => {
  const playSound = useCallback((type: SoundEffectType) => {
    const audioSrc = soundMap[type];
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.volume = 1;
      audio
        .play()
        .catch((e) => console.warn(`Error al reproducir sonido: ${e}`));
    }
  }, []);

  return { playSound };
};
