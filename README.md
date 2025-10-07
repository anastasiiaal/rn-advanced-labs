# RN Advanced Labs

- **Launch the project** : `npx expo start`
- **Launch & clear the cache** : `npx expo start -c`
- **Restart working project** : `r`

---
## TP 1

<img src="./assets/images/readme/1.jpg" width="25%" />

---

## TP 2 - Navigation, Persistance & Deep Linking avec Expo Router

### Le schéma d'arborescence :  
<img src="./assets/images/readme/image.png" width="30%" />


### Routes (Nom, URL, paramètres)

| Nom | URL | Paramètres |
|---|---|---|
| Home | `/home` | - |
| Profile Card | `/tp1-profile-card` | - |
| Detail | `/detail/[id]` | `id` (string) |


---

## TP3 — Formulaires avancés : Formik+Yup ET RHF+Zod

### Comparatif: Formik vs React Hook Form (RHF)

| Critère | Formik | React Hook Form |
|---|---|---|
| Expérience dev (DX) | API familière (Formik + Yup), mental model "form state global"; facile à appréhender | API basée sur hooks, approche "uncontrolled"; nécessite un petit temps d’adaptation |
| Perf perçue | Peut sembler moins fluide sur de gros forms (state global + re-rendus) | Très fluide grâce aux refs non contrôlées et subscription fine |
| Re-rendus | Les updates (p.ex. `setFieldValue`) déclenchent souvent des re-rendus du form et des champs | Les champs non observés ne re-rendent pas; re-rendus ciblés via subscriptions |
| Aide du typage TS | Typage correct via generics, validation surtout déléguée à Yup | Bonne intégration TS, surtout avec Zod |
| Verbosité | Plutôt verbeux (boilerplate: `initialValues`, `onSubmit`, `validationSchema`, handlers) | Moins verbeux (registre via `register`, `handleSubmit`, schemas Zod typés) |


### Le schéma d'arborescence :  
<img src="./assets/images/readme/image2.png" width="30%" />

### Routes (Nom, URL, paramètres)

| Nom          | URL                 | Paramètres    |
| ------------ | ------------------- | ------------- |
| Home         | `/home`             | -             |
| Profile Card | `/tp1-profile-card` | -             |
| Detail       | `/detail/[id]`      | `id` (string) |
| Formik Form  | `/TP3-forms/formik` | -             |
| RHF Form     | `/TP3-forms/rhf`    | -             |

<p float="left">
  <img src="./assets/images/readme/3.1.jpg" width="25%" />
  <img src="./assets/images/readme/3.2.jpg" width="25%" />
</p>

---

## TP 4 (a) - Robots

### Choix de Formik + Yup

Pour ce projet, j’ai choisi Formik (gestion de formulaires) associé à Yup (validation de schémas) plutôt que d’autres solutions comme React Hook Form + Zod.
La raison principale est la simplicité : le formulaire est relativement basique et ne nécessite pas les optimisations avancées offertes par RHF (performances sur des centaines de champs, intégration très fine avec le cycle de rendu).
Formik + Yup offrent une syntaxe très lisible, facile à maintenir dans un contexte pédagogique ou de démonstration, et couvrent largement les besoins d’un CRUD simple comme celui-ci.

### Arborescence

<img src="./assets/images/readme/image3.png" width="30%" />

## Routes Robots

| Nom        | URL                       | Paramètres          |
|------------|---------------------------|---------------------|
| Liste      | `/tp4-robots`             | -                   |
| Création   | `/tp4-robots/create`      | -                   |
| Édition    | `/tp4-robots/edit/[id]`   | `id` (string, uuid) |
| Suppression| `/tp4-robots` *(depuis la liste)* | `id` (string, uuid) |


### Règles de validation

Les règles métiers sont centralisées dans `robotSchema.ts` avec **Yup** :

- `name` : chaîne, **min 2 caractères**, obligatoire, **unique** dans la collection  
- `label` : chaîne, **min 3 caractères**, obligatoire  
- `year` : entier, compris entre **1950** et **année courante**, obligatoire  
- `type` : enum, une valeur parmi :  
  - `industrial` → Industriel  
  - `service` → Service  
  - `medical` → Médical  
  - `educational` → Éducatif  
  - `other` → Autre  

La contrainte d’unicité du `name` est vérifiée dans le **store Zustand** (`createRobot` et `updateRobot`).  

### Persistance avec Zustand

Le store Zustand (`robotsStore.ts`) utilise le middleware `persist` avec **AsyncStorage** pour garantir la persistance locale :

- Tous les robots sont sauvegardés automatiquement sur l’appareil (clé `robots-storage`)  
- À chaque redémarrage de l’app, la collection est restaurée depuis le cache  
- CRUD implémenté :  
  - `createRobot(data)` → ajout d’un robot (avec `uuidv4()` auto)  
  - `updateRobot(id, data)` → modification avec règles de validation  
  - `deleteRobot(id)` → suppression par identifiant  
  - `getRobotById(id)` → recherche d’un robot  

### Plan de tests manuels

Les tests suivants ont été effectués pour valider le fonctionnement du CRUD :

1. **Création d’un robot valide** ✅  
   - Saisie d’un `name`, `label`, `year`, `type`  
   - Résultat : robot ajouté à la liste, persistant après reload  

2. **Validation des contraintes** ✅  
   - `name` < 2 caractères → message d’erreur affiché  
   - `label` < 3 caractères → message d’erreur affiché  
   - `year` < 1950 ou > année courante → rejet avec message d’erreur  
   - `name` déjà utilisé → rejet avec message d’erreur  

3. **Édition d’un robot existant** ✅  
   - Changement du `label` et `year`  
   - Résultat : mise à jour visible dans la liste, persistance OK  

4. **Suppression d’un robot** ✅  
   - Clic sur l’icône 🗑  
   - Résultat : robot supprimé de la liste, modal “Robot supprimé avec succès” affiché, persistance confirmée  

5. **Persistance au redémarrage** ✅  
   - Ajout de plusieurs robots  
   - Fermeture et relance de l’app  
   - Résultat : les robots sont toujours présents  


### Captures d'écran

<p float="left">
  <img src="./assets/images/readme/4.1.jpg" width="25%" />
  <img src="./assets/images/readme/4.2.jpg" width="25%" />
  <img src="./assets/images/readme/4.3.jpg" width="25%" />
  <img src="./assets/images/readme/4.4.jpg" width="25%" />
  <img src="./assets/images/readme/4.5.jpg" width="25%" />
</p>

---

## TP 4 (b) - Robots avec Redux

### Dépendances et rôles

| Dépendance | Rôle | Remarques |
|-------------|------|-----------|
| **@reduxjs/toolkit** | Cœur de Redux moderne : création du store, des *slices* et des reducers avec une syntaxe simplifiée. | Permet d’éviter le boilerplate classique de Redux. |
| **react-redux** | Fournit le `<Provider>` et les hooks `useSelector` / `useDispatch`. | C’est le lien entre React et Redux. |
| **redux-persist** | Persiste le store Redux dans le stockage local. | Utilisé ici avec **AsyncStorage** pour garder les robots entre les sessions. |
| **@react-native-async-storage/async-storage** | Stockage local clé-valeur pour React Native. | Nécessaire à `redux-persist` pour la persistance sur mobile. |
| **yup** | Validation de schéma (structure et contraintes de données). | Empêche la création de robots invalides. |
| **formik** | Gestionnaire de formulaires pour React. | Simplifie la création/édition d’un robot. |
| **expo-router** | Système de navigation basé sur la structure des dossiers (`/app`). | Facilite la navigation entre la liste et le formulaire. |


### Arborescence
```
app/
└─ (main)/
   └─ tp4-robots-rtk/
      ├─ _layout.tsx
      ├─ index.tsx(FlatList + edit + delete + FAB)
      ├─ create.tsx
      └─ edit/
         └─ [id].tsx

tp4-store-rtk/
├─ store.ts
├─ rootReducer.ts
└─ hooks.ts

features/
└─ robots/
   └─ tp4-robots-rtk/
      ├─ robotsSlice.ts
      └─ selectors.ts

components/
└─ tp4-robots-rtk/
   ├─ RobotForm.tsx
   └─ RobotListItem.tsx

validation/
└─ tp4-robots-rtk/
   └─ robotSchema.ts

```
### Règles de validation
| Champ | Type | Contraintes | Message(s) d’erreur |
|-------|------|--------------|----------------------|
| **id** | `uuid` | Généré automatiquement à la création | - |
| **name** | `string` | Requis, min 2 caractères, unique (non sensible à la casse) | - Le nom est obligatoire<br>- Le nom doit contenir au moins 2 caractères<br>- Un robot avec ce nom existe déjà |
| **label** | `string` | Requis, min 3 caractères | - Le label est obligatoire<br>- Le label doit contenir au moins 3 caractères |
| **year** | `number` | Entier, min 1950, max année courante | - L’année doit être un nombre entier<br>- Année minimale : 1950<br>- Année maximale : {année courante} |
| **type** | `enum` | Doit appartenir à : `industrial`, `service`, `medical`, `educational`, `other` | - Type invalide<br>- Le type est obligatoire |

### Validation double

1. **Côté formulaire (Formik + Yup)**  
   → feedback immédiat à l’utilisateur avant toute action Redux.  
2. **Côté slice Redux**  
   → validation finale avant mutation du store (aucune donnée invalide n’entre dans l’état global).


---

## TP 5 - Stockage local avec SQLite : Robots Offline

| Librairie                                                                   | Description                                                          | Utilisation                                                                               |
| ----- | ---- | ----|
| **expo-sqlite**          | Fournit un moteur SQLite local et persistant sur le device.          | Stockage local des robots (CRUD, migrations, persistance offline).                        |
| **expo-file-system** | Permet la lecture/écriture/copie de fichiers dans le stockage local. | Lecture des fichiers `.sql` pour les migrations + export/import des données (DB et JSON). |
| **uuid**                            | Génère des identifiants uniques (UUID v4).                           | Attribution d’un `id` unique pour chaque robot créé localement.                           |
| **@tanstack/react-query** | Cache réactif + synchronisation automatique | Gère le cache et la mise à jour automatique des données locales (SQLite). |

