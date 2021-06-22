import { RGBAColor } from "@lib/Interface";

export const Animations = {
  fadeIn: {
    getColor: {
      duration: 600,
      enter: (value: RGBAColor): RGBAColor => [value[0], value[1], value[2], 0],
      end: (value: RGBAColor): RGBAColor => [value[0], value[1], value[2], value[3]] // fade in
    }
  },
  fadeInColor: 255,
  fadeOut: {
    getColor: {
      duration: 600,
      enter: (value: RGBAColor): RGBAColor => [value[0], value[1], value[2], 255],
      end: (value: RGBAColor): RGBAColor => [value[0], value[1], value[2], value[3]] // fade in
    }
  },
  fadeOutColor: 0
};
