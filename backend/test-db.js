import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const conn = await mysql.createConnection({
      host: '115.190.154.26',
      user: 'root',
      password: 'Root@2026!',
      database: 'uisheji'
    });

    // Test query
    const [users] = await conn.execute('SELECT * FROM users');
    console.log('✅ Database connected successfully');
    console.log('Users found:', users.length);
    users.forEach(u => console.log(`  - ${u.username}: ${u.nickname}`));

    conn.end();
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  }
}

testConnection();
