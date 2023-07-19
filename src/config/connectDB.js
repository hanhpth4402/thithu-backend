import mysql from 'mysql2/promise';


console.log('pooll...');

const connect = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'thithu_data',
})

export default connect;
