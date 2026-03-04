@echo off
chcp 65001 >nul
echo ========================================
echo UI设计管理系统 - Java后端启动
echo ========================================
echo.

echo [1/3] 检查环境...
java -version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Java，请先安装 JDK 17+
    pause
    exit /b 1
)
echo [✓] Java 环境正常
echo.

echo [2/3] 编译项目...
javac -encoding UTF-8 -sourcepath src/main/java -classpath "target/classes;%USERPROFILE%\.m2\repository\*" src/main/java/com/uisheji/UishejiBackendApplication.java 2>nul
if errorlevel 1 (
    echo [信息] 使用 Maven Wrapper 编译...
    call mvnw.cmd clean compile
) else (
    echo [✓] 编译成功
)
echo.

echo [3/3] 启动应用...
echo [信息] 访问地址: http://localhost:8080/api
echo [信息] API文档: http://localhost:8080/api/swagger-ui/index.html
echo [信息] 按 Ctrl+C 停止服务
echo.
echo ========================================
echo.

call mvnw.cmd spring-boot:run

pause
