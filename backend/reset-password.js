import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

async function resetPasswords() {
  try {
    const conn = await mysql.createConnection({
      host: '115.190.154.26',
      user: 'root',
      password: 'Root@2026!',
      database: 'uisheji'
    });

    // 密码 123456 的加密版本
    const hashedPassword = await bcrypt.hash('123456', 10);
    console.log('生成的密码哈希:', hashedPassword);

    // 更新 admin 用户密码
    await conn.query(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    );
    console.log('✅ admin 密码已更新');

    // 更新 test 用户密码
    await conn.query(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, 'test']
    );
    console.log('✅ test 密码已更新');

    // 查询用户验证
    const [users] = await conn.query('SELECT id, username, nickname FROM users');
    console.log('\n✅ 当前用户：');
    users.forEach(u => console.log(`  - ${u.username} (${u.nickname})`));
    console.log('\n密码均为: 123456');

    conn.end();
  } catch (error) {
    console.error('❌ 错误：', error.message);
    process.exit(1);
  }
}

resetPasswords();
