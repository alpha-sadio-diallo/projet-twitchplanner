# 🎮 TwitchPlanner

Application web permettant aux streamers de créer et gérer leur planning de stream.

---

## 📌 Fonctionnalités

- Authentification sécurisée (JWT)
- Création de plannings
- Ajout / modification / suppression d’événements
- Isolation des données par utilisateur
- Récupération automatique des images de jeux (API RAWG)
- Export du planning en image PNG
- Suppression en cascade des événements

---

## 🧱 Stack technique

### Backend
- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt

### Frontend
- React
- Axios
- React Router
- TailwindCSS
- html2canvas

---

## 🔐 Sécurité

- Authentification via JSON Web Token
- Middleware de protection des routes
- Vérification `user_id` sur toutes les requêtes sensibles
- Mots de passe hashés avec bcrypt
- Suppression sécurisée via `ON DELETE CASCADE`

---

## 🗄️ Structure base de données

- users
- plannings
- events

Relations :

- 1 user → N plannings
- 1 planning → N events

---

## 🚀 Installation

### Backend
