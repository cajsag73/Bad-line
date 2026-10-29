# Så ger du ut Bad Line på Google Play

Appen är en webbapp. Den läggs ut gratis på GitHub Pages, och PWABuilder gör en Play-fil (`.aab`) som öppnar den som en vanlig app i helskärm. Du behöver ingen Android Studio.

Fördelen är att ändringar du pushar hit når alla användare automatiskt, utan att du behöver ladda upp en ny version på Google Play.

---

## Klart redan
- Repot `bad-line` är publikt och GitHub Pages är på (main, root). Appen ligger på **https://cajsag73.github.io/bad-line/**.
- Integritetspolicyn ligger på **https://cajsag73.github.io/integritet.html**.
- Repot `cajsag73.github.io` finns med `.nojekyll` och en mall för `.well-known/assetlinks.json`.
- Manifestet har ikoner (även maskable), skärmbilder, färger och stående läge. Appen fungerar offline.

## 1. Skapa ett Google Play-utvecklarkonto
1. Gå till **play.google.com/console** och skapa ett **personligt** konto.
2. Engångsavgiften är 25 USD.
3. Google verifierar din identitet, och ibland även en Android-telefon. Det kan ta några dagar.
4. Som utvecklarnamn skriver du **Cajsa Gustafsson**, samma som i appens Om-ruta.

## 2. Skapa Play-filen (bygget på GitHub)
Repot har ett eget bygge som gör Play-filen med Bubblewrap, samma verktyg som PWABuilder använder. Paket-ID är `io.github.cajsag73.badline` och appen riktar sig mot Android 16 (API 36), som Google Play kräver.

**En gång:** skapa ett långt lösenord (minst 20 tecken) i din lösenordshanterare. Gå sedan till **github.com/cajsag73/bad-line → Settings → Secrets and variables → Actions → New repository secret**:
- **Name:** `ANDROID_KEY_PASSWORD`
- **Secret:** lösenordet

**Varje gång du vill ha en ny Play-fil:**
1. Gå till **github.com/cajsag73/bad-line/actions**, välj **Android package** och tryck **Run workflow**.
2. Fyll i version (till exempel `1.0.0`) och version code (`1` första gången, sedan ett högre heltal för varje uppladdning) och tryck **Run workflow**.
3. Efter några minuter: öppna körningen och ladda ner **Bad-Line-…** under *Artifacts*. Zippen innehåller `Bad Line.aab` (till Play), `Bad Line.apk` (för att testa direkt på telefonen) och `assetlinks.json`.

Första gången skapas uppladdningsnyckeln och sparas i `android/upload-key.p12`, skyddad av lösenordet. Fingeravtrycket hamnar i `android/upload-key-fingerprint.txt`. Tappa inte bort lösenordet. Utan det kan du inte bygga nya versioner, och då måste du be Google om en ny uppladdningsnyckel.

PWABuilder fungerar också (pwabuilder.com → Android, Package ID `io.github.cajsag73.badline`), men det paketet får en annan nyckel. Välj ett av sätten och håll dig till det.

## 3. Ta bort adressfältet
Android visar ett adressfält överst i appen tills det har bekräftat att webbplatsen är din. Bekräftelsen ligger i repot `cajsag73.github.io`, i filen `.well-known/assetlinks.json`.

1. Fingeravtrycket för uppladdningsnyckeln står i `android/upload-key-fingerprint.txt` (och i `assetlinks.json` i zippen).
2. När du har laddat upp `.aab`-filen i Play Console (steg 5), gå till **Test och lansering → Appintegritet → Appsignering** och kopiera **SHA-256-certifikatfingeravtrycket** för appsigneringsnyckeln.
3. Skicka båda till Claude, eller ersätt platshållarna i `cajsag73.github.io/.well-known/assetlinks.json` själv.
4. Kontrollera att https://cajsag73.github.io/.well-known/assetlinks.json visar filen.

Se även `domanrot/README.md`.

## 4. Skapa appen i Play Console
1. **Skapa app**. Namn: `Bad Line`. Standardspråk: engelska (en-US). Typ: app. Pris: gratis.
2. Gå igenom **Appinnehåll**:

| Fråga | Svar |
|---|---|
| Integritetspolicy | `https://cajsag73.github.io/integritet.html` |
| Annonser | Nej |
| Åtkomst till appen | All funktionalitet är tillgänglig utan särskild åtkomst |
| Innehållsklassificering | Fyll i formuläret. Inget våld, inget sexuellt innehåll, ingen interaktion mellan användare, inga köp. |
| Målgrupp | 13 år och äldre. Den är inte riktad till barn. |
| Datasäkerhet | Samlar inte in data och delar inte data |
| Myndighetsapp, ekonomi, hälsa, nyheter | Nej |

3. Under **Huvudbutiksinformation**, klistra in texterna från `butik/BUTIKSTEXTER.md` och ladda upp ikonen och funktionsgrafiken från mappen `butik/`, och skärmbilderna från `butik/skarmbilder/en/` (engelska) och `butik/skarmbilder/sv/` (svenska).

## 5. Sluten testning: 12 testare i 14 dagar
Nya personliga konton måste testa appen med minst 12 testare under 14 dagar i följd innan den kan släppas publikt. Kontrollera de exakta kraven i Play Console, eftersom de har ändrats tidigare.

1. Gå till **Test och lansering → Testning → Sluten testning** och skapa ett spår.
2. Ladda upp `.aab`-filen från PWABuilder.
3. Lägg till minst 12 testares Google-e-postadresser.
4. Skicka länken för att gå med. Testarna måste tacka ja och ha appen installerad hela perioden.
5. Efter 14 dagar ansöker du om **produktionsåtkomst** och svarar på några frågor om testningen.

## 6. Publicera
När produktionsåtkomsten är godkänd skapar du en produktionsversion med samma `.aab` och skickar den på granskning. Granskningen brukar ta några dagar.

---

## Uppdateringar
- **Ljud, text och utseende:** ändra och pusha hit. Användarna får det nästa gång de öppnar appen två gånger, eftersom appen cachar sig själv för att fungera offline. Höj gärna `CACHE`-namnet i `sw.js` (till exempel `badline-v2`) vid större ändringar.
- **Namn, ikon eller paket-ID:** kräver en ny `.aab` från PWABuilder, signerad med **samma** nyckel och med högre version code.

## Risker vid granskningen
- **Vilseledande beteende.** Google tillåter inte appar som lovar något de inte kan göra. Därför ska butikstexten alltid säga att det är ljud i högtalaren, inte riktiga störningar.
- **Typsnitten** ligger inbäddade i appen (fri licens, se `licenser/`), så appen kontaktar ingen extern tjänst. Svaret "samlar inte in data" i datasäkerhetsformuläret stämmer därför.
