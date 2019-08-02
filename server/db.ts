import path from 'path';
import sqlite3 from 'sqlite3';

let _db: sqlite3.Database;

export const initDb = (dbPath: string) => {
  const fullDbPath = path.join(__dirname, dbPath);
  _db = new sqlite3.Database(
    fullDbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        return console.error(err.message);
      }

      console.log('Connected to the database.');
      return createTables();
    }
  );
}

export const getDb = () => {
  return _db;
}

export const close = () => {
  _db.close((err) => {
    if (err) {
      return console.error(err.message);
    }

    return console.log('Close the database connection.');
  });
}

const createTables = () => {
  const notes = `
    CREATE TABLE IF NOT EXISTS 'notes' (
      'id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      'text'	TEXT,
      'create_date'	TEXT NOT NULL,
      'update_date'	TEXT NOT NULL
    );
  `
  _db.run(notes, [], (err) => {
    if (err) {
      console.log("Error while creating table 'notes'", err);
    }
  });
}

// this.db.allAsync = sql => new Promise((resolve, reject) => {
//   this.db.all(sql, [], (err, row) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(row);
//     }
//   });
// });

// db.serialize(function() {
//   db.run('CREATE TABLE "notes" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `title` TEXT NOT NULL )');
//   db.run('CREATE TABLE `note_items` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `pid` INTEGER NOT NULL, `text` TEXT, FOREIGN KEY (pid) REFERENCES notes(id) )');
// });
//
// db.close();
