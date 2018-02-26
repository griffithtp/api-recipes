module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "recipes.db",
    "logging" : false
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:",
    "logging" : false
  },
  "production": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME || "recipes",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql"
  }
}
