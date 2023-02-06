import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1); //creates a connection the the db we want to use.
  const tx = jateDB.transaction('contact', 'readwrite') //creates a new transaction and sets the privileges.
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1); //Creates the connection to DB and says what version we will use.
  const tx = jateDB.transaction('jate', 'readonly'); //Creates a new transaction and specifies the database and data privileges.
  const store = tx.objectStore('jate'); //opens up the desired object store.
  const request = store.getAll(); // Gets all the data from the database.
  // Confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value
};
  


initdb();
