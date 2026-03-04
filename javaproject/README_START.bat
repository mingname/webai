@echo off
chcp 65001 >nul
echo ========================================
echo UI设计管理系统 - Java后端启动
echo ========================================
echo.

echo [提示] 请使用 IntelliJ IDEA 运行此项目
echo.
echo [步骤 1] 在 IDEA 中打开项目
echo   File ^> Open ^> 选择 d:\uisheji\javaproject
echo.
echo [步骤 2] 等待依赖下载完成（首次运行需要 2-5 分钟）
echo.
echo [步骤 3] 运行启动类
echo   找到 src\main\java\com\uisheji\UishejiBackendApplication.java
echo   右键点击 ^> Run 'UishejiBackendApplication'
echo.
echo ========================================
echo.
echo [可选] 如需使用命令行启动，请先安装 Maven
echo   下载地址: https://maven.apache.org/download.cgi
echo   或使用 IDEA 内置的 Maven 运行
echo.
pause
