// 页面元素
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberPasswordCheckbox = document.getElementById('remember-password');
const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout-button');
const sideNavLogout = document.getElementById('side-nav-logout');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');
const deviceBtns = document.querySelectorAll('.device-btn');
const menuButton = document.getElementById('menu-button');
const sideNav = document.getElementById('side-nav');
const sideNavClose = document.getElementById('side-nav-close');
const togglePassword = document.getElementById('toggle-password');
const usernameDisplay = document.getElementById('username-display');
const sideNavUsername = document.getElementById('side-nav-username');

// 创建侧边栏遮罩
const sideNavOverlay = document.createElement('div');
sideNavOverlay.className = 'side-nav-overlay';
document.body.appendChild(sideNavOverlay);

// 页面加载时检查是否有记住的密码
document.addEventListener('DOMContentLoaded', () => {
    loadRememberedCredentials();
    checkLoginStatus();
    initDeviceSwitcher();
});

// 加载记住的用户名和密码
function loadRememberedCredentials() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
        usernameInput.value = savedUsername;
        passwordInput.value = savedPassword;
        rememberPasswordCheckbox.checked = true;
    }
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const username = sessionStorage.getItem('username') || '用户';
        showHomePage(username);
    }
}

// 显示登录页面
function showLoginPage() {
    loginPage.classList.add('active');
    homePage.classList.remove('active');
}

// 显示首页
function showHomePage(username = '用户') {
    loginPage.classList.remove('active');
    homePage.classList.add('active');
    usernameDisplay.textContent = username;
    sideNavUsername.textContent = username;
}

// 处理登录表单提交
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // 验证输入
    if (!username || !password) {
        showError('请输入用户名和密码');
        return;
    }

    // 模拟登录验证
    if (username.length < 3) {
        showError('用户名至少需要3个字符');
        return;
    }

    if (password.length < 6) {
        showError('密码至少需要6个字符');
        return;
    }

    // 处理记住密码
    if (rememberPasswordCheckbox.checked) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    // 保存登录状态
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);

    // 清除错误信息
    errorMessage.textContent = '';

    // 跳转到首页
    showHomePage(username);
});

// 显示错误信息
function showError(message) {
    errorMessage.textContent = message;
    
    // 3秒后自动清除错误信息
    setTimeout(() => {
        errorMessage.textContent = '';
    }, 3000);
}

// 退出登录
logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    showLoginPage();
    closeSideNav();
});

sideNavLogout.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    showLoginPage();
    closeSideNav();
});

// Tab切换功能
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // 移除所有tab按钮的active状态
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // 移除所有tab内容的active状态
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // 激活当前点击的tab
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// 添加键盘支持Tab切换
document.addEventListener('keydown', (e) => {
    // 只有在首页时才响应
    if (!homePage.classList.contains('active')) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeButton = document.querySelector('.tab-button.active');
        const currentIndex = Array.from(tabButtons).indexOf(activeButton);

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex === 0 ? tabButtons.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === tabButtons.length - 1 ? 0 : currentIndex + 1;
        }

        tabButtons[newIndex].click();
    }
});

// 设备切换功能
function initDeviceSwitcher() {
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const device = btn.getAttribute('data-device');
            
            // 更新按钮状态
            deviceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 切换设备模式
            if (device === 'mobile') {
                document.body.classList.add('mobile-mode');
            } else {
                document.body.classList.remove('mobile-mode');
            }
        });
    });
}

// 侧边栏功能
menuButton.addEventListener('click', openSideNav);
sideNavClose.addEventListener('click', closeSideNav);
sideNavOverlay.addEventListener('click', closeSideNav);

function openSideNav() {
    sideNav.classList.add('active');
    sideNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSideNav() {
    sideNav.classList.remove('active');
    sideNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 密码显示/隐藏切换
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePassword.querySelector('i');
    icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// 添加触摸反馈
tabButtons.forEach(button => {
    button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('touchend', () => {
        button.style.transform = '';
    });
});

// 输入框焦点动画
const inputs = document.querySelectorAll('.form-group input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});
