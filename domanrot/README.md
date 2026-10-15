# Filer till repot cajsag73.github.io

Android visar ett adressfält överst i appen tills det har bekräftat att webbplatsen tillhör appen. Bekräftelsen måste ligga i domänens rot: `https://cajsag73.github.io/.well-known/assetlinks.json`.

Innehållet i den här mappen ska därför ligga i ett eget publikt repo som heter exakt `cajsag73.github.io`:

```
.nojekyll
.well-known/assetlinks.json
```

`.nojekyll` behövs, annars publicerar GitHub Pages inte mappar som börjar med punkt.

## Fingeravtrycken
Ersätt de två platshållarna i `assetlinks.json`:

1. **FINGERAVTRYCK_FRÅN_PWABUILDER** finns i filen `assetlinks.json` i zip-filen som PWABuilder ger dig.
2. **FINGERAVTRYCK_FRÅN_PLAY_CONSOLE** finns under **Test och lansering → Appintegritet → Appsignering → Certifikat för appsigneringsnyckel → SHA-256-certifikatfingeravtryck**. Det visas först efter att du har laddat upp den första `.aab`-filen.

Båda ser ut ungefär så här: `AB:CD:12:34:...` (32 par tecken).

## Kontrollera
När Pages är påslaget för repot ska den här adressen visa filen:
https://cajsag73.github.io/.well-known/assetlinks.json

Google har också ett testverktyg:
https://developers.google.com/digital-asset-links/tools/generator
