import pkg from 'pg';
const { Client } = pkg;

const createTableUsers = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'target',
        password: '',
        port: 5432,
    })
    await client.connect();



    let createTableQuery = `
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            createAt INTEGER NOT NULL,
            status VARCHAR(3) NOT NULL
        );
    `;

    await client.query(createTableQuery)
    console.log("Создана таблица");
    await client.end()
}