@echo off
chcp 65001 >nul
title UI设计管理系统 - Java后端
echo ========================================
echo UI设计管理系统 - Java后端启动
echo ========================================
echo.

echo [1/3] 检查 Java 环境...
java -version 2>&1 | findstr /i "24" >nul
if errorlevel 1 (
    echo [✗] Java 版本不符合要求，需要 JDK 17+
    java -version
    pause
    exit /b 1
)
echo [✓] Java 环境正常
echo.

echo [2/3] 检查编译文件...
if not exist "target\classes\com\uisheji\UishejiBackendApplication.class" (
    echo [✗] 未找到编译文件，请使用 IDEA 运行项目
    echo.
    echo [建议] 使用 IntelliJ IDEA 打开项目并运行
    echo   File ^> Open ^> 选择 d:\uisheji\javaproject
    pause
    exit /b 1
)
echo [✓] 编译文件存在
echo.

echo [3/3] 启动应用...
echo.
echo ========================================
echo [信息] 服务地址: http://localhost:8080/api
echo [信息] API文档: http://localhost:8080/api/swagger-ui/index.html
echo [信息] 测试账号: admin / 123456
echo [信息] 按 Ctrl+C 停止服务
echo ========================================
echo.

cd /d "%~dp0"
set CLASSPATH=target\classes;target\classes\com\uisheji
for /r target\classes %%f in (*.class) do set CLASSPATH=%%~dpf;!CLASSPATH!

REM 获取所有依赖的 jar 文件
set MAVEN_REPO=%USERPROFILE%\.m2\repository
set CLASSPATH=%CLASSPATH%
for /f "delims=" %%f in ('dir /s /b "%MAVEN_REPO%\org\springframework\boot\spring-boot\3.2.0\spring-boot-3.2.0.jar" 2^>nul') do set BOOT_JAR=%%f
for /f "delims=" %%f in ('dir /s /b "%MAVEN_REPO%\org\springframework\boot\spring-boot-loader\3.2.0\spring-boot-loader-3.2.0.jar" 2^>nul') do set LOADER_JAR=%%f

if not exist "%BOOT_JAR%" (
    echo [警告] 未找到 Spring Boot 依赖，请使用 IDEA 运行
    echo.
    echo [提示] 首次运行需要下载依赖，请使用 IntelliJ IDEA:
    echo   1. File ^> Open ^> d:\uisheji\javaproject
    echo   2. 等待依赖下载完成
    echo   3. 右键 UishejiBackendApplication.java ^> Run
    echo.
    start "" "https://www.jetbrains.com/idea/download/"
    pause
    exit /b 1
)

echo [信息] 正在启动...
java -cp "%BOOT_JAR%;%LOADER_JAR%;target\classes" org.springframework.boot.loader.JarLauncher --spring.config.location=classpath:/application.yml 2>&1

if errorlevel 1 (
    echo.
    echo [✗] 启动失败，请使用 IDEA 运行
    echo.
    pause
)
