import {
  Playfair_Display,
  Cormorant_Garamond,
  Cormorant_Infant,
  Great_Vibes,
  Yeseva_One,
  Comfortaa,
} from "next/font/google";
import localFont from "next/font/local";

export const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
});

export const yesevaOne = Yeseva_One({
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

export const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

// Шрифт для «и» и «Ждём Вас на нашей свадьбе».
// Сейчас используется Great Vibes. Чтобы включить свой WonderGardene:
// 1) Положи файл в app/fonts/ и назови WonderGardenScript.otf (или .ttf и поменяй расширение в src ниже).
// 2) Раскомментируй блок wonderGardene и закомментируй строку с Great_Vibes ниже.

const wonderGardene = localFont({
  src: "./fonts/WonderGardenScript.ttf",
  display: "swap",
});
export const greatVibes = wonderGardene;

const calmeExtra = localFont({
  src: "./fonts/CalmeExtra.woff",
  display: "swap",
});

export { calmeExtra };
