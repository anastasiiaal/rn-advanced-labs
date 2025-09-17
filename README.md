# Welcome to your Expo app 👋

## TP 2 - Navigation, Persistance & Deep Linking avec Expo Router

### Le schéma d'arborescence :  
![App preview](./assets/images/readme/image.png)


### Routes (Nom, URL, paramètres)

| Nom | URL | Paramètres |
|---|---|---|
| Home | `/home` | - |
| Profile Card | `/tp1-profile-card` | - |
| Detail | `/detail/[id]` | `id` (string) |


---
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
![App preview](./assets/images/readme/image2.png)

### Routes (Nom, URL, paramètres)

| Nom          | URL                 | Paramètres    |
| ------------ | ------------------- | ------------- |
| Home         | `/home`             | -             |
| Profile Card | `/tp1-profile-card` | -             |
| Detail       | `/detail/[id]`      | `id` (string) |
| Formik Form  | `/TP3-forms/formik` | -             |
| RHF Form     | `/TP3-forms/rhf`    | -             |
