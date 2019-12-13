let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('CarPriceLogs', {
    id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true,
    },
    carName: { type: 'string', notNull: true },
    carBrand: { type: 'string', notNull: true },
    carPrice: { type: 'int', notNull: true },
    url: 'string',
    createdAt: { type: 'timestamp', notNull: true },
  });
};

exports.down = function (db) {
  return db.dropTable('CarPriceLogs');
};
