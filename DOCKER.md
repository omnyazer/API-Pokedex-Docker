# Docker setup - Pokedex API

## 1) Prepare env file

```bash
cp .env.example .env
```

You can change values in `.env` if needed.

## 2) Start all services

```bash
docker compose up --build
```

Services started:
- API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`
- Mongo Express: `http://localhost:8081`

## 3) Seed data (optional but useful)

In another terminal:

```bash
docker compose exec api npm run seed:all
```

## 4) Test API

1. Login:
   - `POST /api/login`
   - body:
```json
{
  "username": "pikachu",
  "password": "pikachu"
}
```
2. Use returned token in `Authorization: Bearer <token>`
3. Test routes:
   - `GET /api/pokemons`
   - `GET /api/pokemons/:id`
   - `POST /api/pokemons`
   - `PUT /api/pokemons/:id`
   - `DELETE /api/pokemons/:id`

## 5) Stop and cleanup

```bash
docker compose down
```

With DB volume removal:

```bash
docker compose down -v
```
