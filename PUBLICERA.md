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

## 2. Skapa Play-filen med PWABuilder
1. Gå till **pwabuilder.com**, skriv in `https://cajsag73.github.io/bad-line/` och tryck **Start**.
2. Rapportkortet ska visa manifest och service worker som godkända. Varningar om valfria saker (till exempel widgets eller share target) kan du strunta i.
3. Tryck **Package for stores**, välj **Android** och sedan **Generate Package**. Öppna **All Settings** och fyll i:

| Fält | Värde |
|---|---|
| Package ID | `io.github.cajsag73.badline` (går aldrig att ändra) |
| App name | `Bad Line` |
| Short name / Launcher name | `Bad Line` |
| App version | `1.0.0` |
| App version code | `1` |
| Host | `cajsag73.github.io` |
| Start URL | `/bad-line/` |
| Display mode | Standalone |
| Status bar / nav bar color | `#12161C` |
| Splash screen color | `#12161C` |
| Notification delegation | Av |
| Location delegation | Av |
| Google Play billing | Av (inga köp i appen) |
| Signing key | **Create new**. Fyll i ditt namn, "Cajsa Gustafsson" som organisation och landskod `SE`. |

4. Tryck **Download Package** och spara zip-filen.

**Spara signeringsnyckeln** (`signing.keystore`) och filen `signing-key-info.txt` med lösenorden på ett säkert ställe, till exempel i en lösenordshanterare och en molnmapp. Utan dem kan du aldrig uppdatera appen.

I zippen finns bland annat `Bad Line.aab` (den laddar du upp till Play) och `assetlinks.json` (fingeravtrycket behövs i steg 3).

## 3. Ta bort adressfältet
Android visar ett adressfält överst i appen tills det har bekräftat att webbplatsen är din. Bekräftelsen ligger i repot `cajsag73.github.io`, i filen `.well-known/assetlinks.json`.

1. Öppna `assetlinks.json` i PWABuilder-zippen och kopiera fingeravtrycket (det som ser ut som `AB:CD:12:...`).
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
