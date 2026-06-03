/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("password_resets", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    email: {
      type: "TEXT",
      notNull: true,
    },
    token: {
      type: "TEXT",
      notNull: true,
    },
    expired_at: {
      type: "TIMESTAMP",
      notNull: true,
    },
    used: {
      type: "BOOLEAN",
      notNull: true,
      default: false,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("password_resets");
};
