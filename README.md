# 🍃 Dossier Vert V7 Cloud Pro

Version propre et professionnelle avec Firebase Realtime Database.

## Lancer en local

```powershell
npm install
npm run dev
```

## Firebase

Le projet est configuré avec Realtime Database :

```text
https://dossiers-verts-default-rtdb.europe-west1.firebasedatabase.app
```

## Fonctionnement

- L’animateur travaille sur la page Atelier.
- La projection lit le même document actif.
- Les téléphones lisent le même document actif.
- Contributions, remarques, participants, documents proposés et parking sont synchronisés dans Firebase.

## URL téléphone

Après déploiement Vercel, le QR Code doit pointer vers :

```text
https://votre-url.vercel.app/?view=participant&atelier=ASE-2026
```

## GitHub

```powershell
git init
git add .
git commit -m "Dossier Vert V7 Cloud Pro"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/dossier-vert.git
git push -u origin main
```

## Règles Firebase temporaires de test

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

À sécuriser ensuite.
