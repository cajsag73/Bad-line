# Så ger du ut Dålig täckning på Google Play

Appen är en webbapp. Den läggs ut gratis på GitHub Pages, och PWABuilder gör en Play-fil (`.aab`) som öppnar den som en vanlig app i helskärm. Du behöver ingen Android Studio.

Fördelen är att ändringar du pushar hit når alla användare automatiskt, utan att du behöver ladda upp en ny version på Google Play.

---

## 1. Gör repot publikt
GitHub Pages är bara gratis för publika repon.

1. Gå till **github.com/cajsag73/bad-line → Settings → General**.
2. Längst ner under **Danger Zone**, välj **Change visibility → Make public**.

All kod blir då synlig för alla.

## 2. Slå på GitHub Pages
1. **Settings → Pages**.
2. Under **Build and deployment**, välj **Deploy from a branch**, branch **main**, mapp **/ (root)**, och tryck **Save**.
3. Efter någon minut ligger appen på **https://cajsag73.github.io/bad-line/**. Öppna adressen i mobilen och kontrollera att allt fungerar.

## 3. Skapa ett Google Play-utvecklarkonto
1. Gå till **play.google.com/console** och skapa ett **personligt** konto.
2. Engångsavgiften är 25 USD.
3. Google verifierar din identitet, och ibland även en Android-telefon. Det kan ta några dagar.
4. Som utvecklarnamn skriver du **Cajsa Gustafsson**, samma som i appens Om-ruta.

## 4. Skapa Play-filen med PWABuilder
1. Gå till **pwabuilder.com** och skriv in `https://cajsag73.github.io/bad-line/`.
2. Välj **Package for stores → Android → Google Play**.
3. Fyll i:
   - **Package ID:** `io.github.cajsag73.badline` (går inte att ändra senare)
   - **App name:** `Dålig täckning`
   - **Launcher name:** `Dålig täckning`
   - **Version:** `1.0.0`, **Version code:** `1`
   - **Signing key:** *Create new*
4. Ladda ner zip-filen.

**Spara signeringsnyckeln** (`signing.keystore`) och lösenorden i zip-filen på ett säkert ställe, till exempel i en lösenordshanterare. Utan dem kan du aldrig uppdatera appen.

## 5. Ta bort adressfältet
Android visar ett adressfält överst i appen tills det har bekräftat att webbplatsen är din. Bekräftelsefilen måste ligga i roten av domänen, alltså `cajsag73.github.io/.well-known/assetlinks.json`. Ett projektrepo som detta kan inte lägga den där.

1. Skapa ett nytt **publikt** repo som heter exakt **`cajsag73.github.io`**.
2. Lägg en tom fil som heter `.nojekyll` i det.
3. Lägg filen `assetlinks.json` från PWABuilder-zippen i mappen `.well-known/`.
4. I Play Console, under **Test och lansering → Appintegritet → Appsignering**, kopierar du **SHA-256-fingeravtrycket för appsigneringsnyckeln**. Lägg till det i listan `sha256_cert_fingerprints` i `assetlinks.json`, så att listan har två fingeravtryck.
5. Slå på Pages för det repot på samma sätt som i steg 2.

En mall finns i `.well-known/assetlinks.json` i det här repot.

## 6. Skapa appen i Play Console
1. **Skapa app**. Namn: `Dålig täckning`. Standardspråk: svenska. Typ: app. Pris: gratis.
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

3. Under **Huvudbutiksinformation**, klistra in texterna från `butik/BUTIKSTEXTER.md` och ladda upp ikonen och funktionsgrafiken från mappen `butik/`. Ta minst två skärmbilder på din telefon.

## 7. Sluten testning: 12 testare i 14 dagar
Nya personliga konton måste testa appen med minst 12 testare under 14 dagar i följd innan den kan släppas publikt. Kontrollera de exakta kraven i Play Console, eftersom de har ändrats tidigare.

1. Gå till **Test och lansering → Testning → Sluten testning** och skapa ett spår.
2. Ladda upp `.aab`-filen från PWABuilder.
3. Lägg till minst 12 testares Google-e-postadresser.
4. Skicka länken för att gå med. Testarna måste tacka ja och ha appen installerad hela perioden.
5. Efter 14 dagar ansöker du om **produktionsåtkomst** och svarar på några frågor om testningen.

## 8. Publicera
När produktionsåtkomsten är godkänd skapar du en produktionsversion med samma `.aab` och skickar den på granskning. Granskningen brukar ta några dagar.

---

## Uppdateringar
- **Ljud, text och utseende:** ändra och pusha hit. Användarna får det nästa gång de öppnar appen två gånger, eftersom appen cachar sig själv för att fungera offline. Höj gärna `CACHE`-namnet i `sw.js` (till exempel `badline-v2`) vid större ändringar.
- **Namn, ikon eller paket-ID:** kräver en ny `.aab` från PWABuilder, signerad med **samma** nyckel och med högre version code.

## Risker vid granskningen
- **Vilseledande beteende.** Google tillåter inte appar som lovar något de inte kan göra. Därför ska butikstexten alltid säga att det är ljud i högtalaren, inte riktiga störningar.
- **Typsnitten** ligger inbäddade i appen (fri licens, se `licenser/`), så appen kontaktar ingen extern tjänst. Svaret "samlar inte in data" i datasäkerhetsformuläret stämmer därför.
