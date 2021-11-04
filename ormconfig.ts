module.exports = {
  type: 'mysql',
  url: process.env.TRUE_TRIP,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [getEntityDirectory()],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/common/infrastructure/TravelPackage/persistence/typeorm/migrations',
  },
};

function getEntityDirectory() {
  let path = 'dist/src/**/infrastructure/TravelPackage/persistence/typeorm/entities/*.js';
  if (process.env.NODE_ENV === 'migration') {
    path = 'src/**/infrastructure/TravelPackage/persistence/typeorm/entities/TravelPackage/*.ts';
  }
  return path;
}

function getMigrationDirectory() {
  let path = 'dist/src/common/infrastructure/TravelPackage/persistence/typeorm/migrations/*.js';
  if (process.env.NODE_ENV === 'migration') {
    path = 'src/common/infrastructure/TravelPackage/persistence/typeorm/migrations/*.ts';
  }
  return path;
}
