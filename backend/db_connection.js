import mysql from "mysql2";

export const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "dbagung"
});

connection.connect((err) => {
   if (err) throw err;
   console.log('Connected DB Successfully');
});

export default connection