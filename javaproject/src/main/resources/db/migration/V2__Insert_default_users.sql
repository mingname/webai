-- 插入默认测试用户
INSERT INTO users (username, password, nickname, avatar) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '管理员', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'),
('test', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '测试用户', 'https://api.dicebear.com/7.x/avataaars/svg?seed=test')
ON DUPLICATE KEY UPDATE username=VALUES(username);
