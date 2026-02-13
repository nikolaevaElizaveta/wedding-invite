# Локальный шрифт WonderGardene

Чтобы использовать свой шрифт **Wonder Garden Script** вместо Great Vibes:

1. **Положи сюда файл шрифта**  
   Назови его **WonderGardenScript.otf** (или **WonderGardenScript.ttf**).  
   Если имя другое — потом поправь путь в `app/fonts.ts` в блоке `wonderGardene`.

2. **Включи локальный шрифт в коде**  
   В файле `app/fonts.ts`: раскомментируй блок с `wonderGardene` и `export const greatVibes = wonderGardene`, и закомментируй строку `export const greatVibes = Great_Vibes(...)`.

Поддерживаются форматы: `.ttf`, `.otf`, `.woff`, `.woff2`.
