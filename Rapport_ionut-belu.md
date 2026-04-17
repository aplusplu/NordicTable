# Nordic Table – Fagprøve

**Hold:** WebH125-1
**Skrevet af:** Ionut Catalin Belu
**Github:** https://github.com/aplusplu/NordicTable
**Afleveringsdato:** 17/04/2026

---

## Erklæring

Jeg bekræfter hermed, at jeg selvstændigt og uden uretmæssig hjælp har udviklet det afleverede eksamensprojekt i overensstemmelse med gældende regler for prøven.

---

## Indholdsfortegnelse

1. Vurdering af egen indsats
2. Tidsplan og proces
3. Tech stack
4. Faglige valg og dokumentation
5. Tilvalgsopgaver
6. Anvendelse af tredjepart og AI
7. Testoplysninger
8. Særlige punkter til bedømmelse

---

## 1. Vurdering af egen indsats

Jeg har i dette projekt arbejdet mere struktureret end i tidligere opgaver. En vigtig beslutning var at starte med at forstå backend og API-strukturen, før jeg begyndte på frontend. Tidligere har jeg haft en tendens til at gå i gang med kodning hurtigere, ifor at analysere hele opgaven i alle detaljer, hvilket har givet problemer senere. Denne gang har det hjulpet mig meget at forstå dataflowet fra start.

Det fungerede godt, at jeg opdelte applikationen i små, genanvendelige komponenter. Jeg har holdt en klar separation mellem layout, UI-komponenter og API-logik. Det gør koden mere overskuelig og lettere at forklare.

En af de største udfordringer var, at jeg løbende opdagede små designforskelle i Figma, som krævede, at jeg gik tilbage og ændrede allerede skrevet kode. Et konkret eksempel var navbaren, hvor jeg først implementerede en dark-variant, men senere fandt ud af, at backoffice i designet faktisk bruger en billedbaggrund, ligesom forsiden. Derfor fjernede jeg dark-varianten; mere fokus på det indledende design før implementering..

En anden udfordring var at sikre konsistens mellem desktop og mobil. Det tog mere tid end forventet, da designet havde flere variationer.

Hvis jeg skulle lave projektet igen, ville jeg:
1. Bruge mere tid fra starten på at definere et klart layout-system (spacing, container, grid)
2. Planlægge alle komponenter og design-varianter mere detaljeret inden implementering

Fagligt har jeg især udviklet mig i:
- strukturering af React-applikationer
- forståelse af frontend-backend kommunikation
- brug af service layer til API
- implementering af autentifikation og route protection
- forbedre arbejde med Tailwind CSS
- forbedre backoffice implementering med alle functionaliteter

---

## 2. Tidsplan og proces

### Dag 1 – 12/04/2026

**Plan:**
- Gennemlæse kravspecifikation
- Opsætte backend og database
- Teste API i Postman
- Forstå struktur (models, handlers, routes)

**Resultat:**
Backend blev sat op lokalt med MongoDB. Jeg testede endpoints med Postman og analyserede dataflowet. Dette gav mig en solid forståelse før frontend.

---

### Dag 2 – 14/04/2026

**Plan:**
- Opsætte frontend projekt
- Strukturere mapper og komponenter
- Implementere layout og navigation
- Implementere SiteHeader, SiteFooter, PageHero, Menu

**Resultat:**
Jeg opbyggede en komponentbaseret struktur og implementerede centrale layout-komponenter som SiteHeader, SiteFooter og PageHero. Navigation blev lavet til både desktop og mobil.

---

### Dag 3 – 15/04/2026

**Plan:**
- Implementere booking
- Implementere login og JWT flow
- Beskytte admin routes
- Test booking formular og login flow

**Resultat:**
Booking-formular blev integreret med backend via POST. Login flow med JWT blev implementeret og gemt i localStorage. ProtectedRoute sikrer, at kun admin har adgang til backoffice. Jeg har også verificeret, at logout fjerner både token og bruger korrekt, da jeg tidligere har oplevet problemer med dette. Tester gik fint.

---

### Dag 4 – 16/04/2026

**Plan:**
- Implementere backoffice (CRUD retter)
- Teste alle funktioner
- Forbedre UI og struktur

**Resultat:**
Backoffice blev implementeret med fuld CRUD (opret, rediger, slet, toggle signatur). Alt er koblet til backend API. Jeg refaktorerede header-strukturen og fjernede den ubrugte dark-variant efter gennemgang af Figma-design.

---

### Dag 5 – 17/04/2026

**Plan:**
- Implementere filtrering og søgning på menu
- Forbedre struktur og UI
- Arbejde på rapport

**Resultat:**
Jeg implementerede filtrering (kategori), søgning (titel) og sortering (pris) ved hjælp af useMemo. UI-delen blev flyttet til en separat komponent (MenuFilters) for bedre struktur.

Jeg nåede ikke at implementere mere avancerede funktioner (fx booking management i backoffice), da jeg fra kl. 13:30 havde lægeaftaler. Derfor prioriterede jeg test, design og dokumentation.

---

## 3. Tech stack

- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Toastify
- React Icons
- Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose

Tailwind CSS er relativt nyt for mig, men jeg har valgt det, fordi det er meget brugt i branchen, og jeg ønsker at blive bedre til det.

---

## 4. Faglige valg og dokumentation

Projektet er opdelt i:
- pages (sider)
- components/ui (UI-komponenter)
- components/layout (layout)
- services (API-kald)

State management er håndteret med:
- useState
- useEffect
- useMemo

API-logik er centraliseret i service-filer (fx dishService.js).

Navbar-strukturen er opdelt i:
- en version til frontend
- en separat header til backoffice (pga. forskellige menupunkter og route protection)
- mobil menu (burger menu)
- variant til homepage
- variant til øvrige sider

Jeg har ikke ændret backend, bortset fra at aktivere `jwt=true`.

---

## 5. Tilvalgsopgaver

Implementeret:
- login med JWT
- route protection
- CRUD på retter
- filtrering, søgning og sortering
- brugerfeedback (toast)

Ikke implementeret:
- brugeradministration
- booking administration i backoffice

Motiv: høj designkompleksitet og behov for konsistens mellem desktop og mobil. Desuden begrænset tid sidste dag.

---

## 6. Anvendelse af tredjepart og AI

Tredjepart:
- axios
- react-router-dom
- react-toastify
- react-icons
- framer-motion
- tailwindcss

Jeg har anvendt AI som et hjælpeværktøj, men på en kontrolleret måde og med manuel tilpasning. Konkret har jeg:

skrevet personlige noter i et mere ustruktureret format og derefter brugt AI til at omformulere dem til klarere beskrivelser
brugt AI til at formulere commit- og GitHub-beskrivelser på en mere klar og professionel måde
efter selv at have tænkt strukturen for mapper og filer igennem, bedt AI om at generere terminalkommandoer samlet i én blok, så jeg hurtigt kunne oprette strukturen eller lave et push i ét trin
brugt AI til at sammenfatte og forklare forskellige dele af serveren, før jeg begyndte at kode, for at få et bedre overblik
brugt AI til at konvertere dele af CSS til Tailwind, da Tailwind stadig er relativt nyt for mig og mere abstrakt end klassisk styling


---

## 7. Testoplysninger

**Github:**
https://github.com/aplusplu/NordicTable

**Login:**
Admin: admin@mediacollege.dk / admin
Guest: guest@mediacollege.dk / guest

Testet:
- API kald (GET, POST, PUT, DELETE)
- login/logout
- route protection
- CRUD funktioner
- filtrering og søgning
- korrekt håndtering af token

---

## 8. Særlige punkter til bedømmelse

Til den mundtlige eksamen vil jeg gerne vise:

- komponentstruktur og opdeling
- filtreringsmekanismen på menu-siden
- CRUD funktionalitet i backoffice
- navbar-arkitektur (frontend vs backoffice vs mobil)

Jeg vil også demonstrere:
- booking-formular
- loading states
- toast-notifikationer
- dataflow til MongoDB
- opdateringer fra admin panel i realtid
