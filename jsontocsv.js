const fs = require('fs');
const mysql = require('mysql2/promise');

// MySQL connection configuration
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'shazmeen',
    database: 'library', // Replace with your database name
};

// Connect to MySQL and fetch data from the book table
async function fetchBookData() {
    try {
        // Create a connection pool
        const pool = mysql.createPool(mysqlConfig);

        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Execute SELECT query to fetch data from the book table
        const [rows] = await connection.query('SELECT * FROM book');

        // Release the connection
        connection.release();

        // Close the connection pool
        await pool.end();

        // Write fetched data to a JSON file
        const jsonFilePath = 'book_data.json'; // Change to your desired JSON file path
        fs.writeFileSync(jsonFilePath, JSON.stringify(rows, null, 2));
        console.log('Data from book table has been written to book_data.json.');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the function to fetch and save data
fetchBookData();
