const developmentEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./src/models/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  ssl: false,
};

const testEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL_TEST,
  entities: ["./src/models/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  synchronize: true,
  logging: false,
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  ssl: false,
};

const productionEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/models/*.js"],
  migrations: ["./dist/database/migrations/*.js"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

module.exports =
  process.env.NODE_ENV === "production"
    ? productionEnv
    : process.env.NODE_ENV !== "test"
    ? developmentEnv
    : testEnv;
