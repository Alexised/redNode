module.exports = {
  api : {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'alexis123',
    database: process.env.MYSQL_DB || 'redNode',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || '3001',
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  cacheService: {
    port: process.env.CACHE_PORT || 3003,
    host: process.env.CACHE_HOST || 'localhost',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
}