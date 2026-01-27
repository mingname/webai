// 截图功能 - 使用 html2canvas 库
// 在 index.html 中添加：<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

class ScreenshotTool {
    constructor() {
        this.screenshotButton = null;
        this.init();
    }

    init() {
        // 创建截图按钮
        this.createScreenshotButton();
    }

    createScreenshotButton() {
        const button = document.createElement('button');
        button.className = 'screenshot-button';
        button.innerHTML = `
            <i class="fas fa-camera"></i>
            <span>截图</span>
        `;
        button.onclick = () => this.takeScreenshot();
        
        // 将按钮添加到设备指示器中
        const deviceIndicator = document.querySelector('.device-indicator');
        if (deviceIndicator) {
            deviceIndicator.appendChild(button);
        }
    }

    async takeScreenshot() {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;

        try {
            // 显示加载提示
            this.showLoading();

            // 等待一下，让UI稳定
            await new Promise(resolve => setTimeout(resolve, 100));

            // 生成截图
            const canvas = await html2canvas(activePage, {
                scale: 2, // 高清截图
                useCORS: true,
                backgroundColor: this.getBackgroundColor(),
                logging: false
            });

            // 创建下载链接
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
            const pageName = activePage.id.replace('-page', '');
            const deviceMode = document.body.classList.contains('mobile-mode') ? 'mobile' : 'web';
            
            link.download = `ui_screenshot_${pageName}_${deviceMode}_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            // 下载成功提示
            this.showToast('截图已保存！');

        } catch (error) {
            console.error('截图失败:', error);
            this.showToast('截图失败，请重试');
        } finally {
            this.hideLoading();
        }
    }

    getBackgroundColor() {
        const activePage = document.querySelector('.page.active');
        if (activePage.id === 'login-page') {
            return '#667eea';
        }
        return '#f5f7fa';
    }

    showLoading() {
        if (!this.loadingOverlay) {
            this.loadingOverlay = document.createElement('div');
            this.loadingOverlay.className = 'screenshot-loading';
            this.loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>正在生成截图...</span>';
            document.body.appendChild(this.loadingOverlay);
        }
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.style.display = 'none';
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'screenshot-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// 初始化截图工具
let screenshotTool;
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，等待页面完全加载
    setTimeout(() => {
        screenshotTool = new ScreenshotTool();
    }, 500);
});
