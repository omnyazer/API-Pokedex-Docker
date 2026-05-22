# API Pokedex - Docker

Projet Node.js + MongoDB containerise avec Docker Compose.

## Prerequis

- Docker Desktop installe et lance

## Demarrage rapide

```bash
cp .env.example .env
docker compose up --build
```

Services disponibles:
- API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`
- Mongo Express: `http://localhost:8081`

## Seed des donnees

Dans un second terminal:

```bash
docker compose exec api npm run seed:all
```

Utilisateur de test cree:
- `username`: `pikachu`
- `password`: `pikachu`

## Test de l'API

1. Login:

```bash
curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"pikachu","password":"pikachu"}'
```

2. Recuperer le `token` retourne, puis tester une route protegee:

```bash
curl -s http://localhost:3000/api/pokemons \
  -H "Authorization: Bearer TON_TOKEN"
```

## Arret

```bash
docker compose down
```

Suppression des volumes (reset base):

```bash
docker compose down -v
```

## Fichiers Docker

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `.env.example`
