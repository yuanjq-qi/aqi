// ========== 网站通用工具库 ==========

// 1. 学习进度与错题本管理（localStorage）
const StorageManager = {
    PREFIX: 'aqi_',
    
    // 保存答题记录
    saveQuizResult: function(courseId, result) {
        const key = this.PREFIX + 'quiz_' + courseId;
        const history = this.getQuizHistory(courseId);
        result.timestamp = new Date().toISOString();
        history.push(result);
        localStorage.setItem(key, JSON.stringify(history));
        this.saveWrongQuestions(courseId, result.wrongQuestions);
    },
    
    // 获取答题历史
    getQuizHistory: function(courseId) {
        const key = this.PREFIX + 'quiz_' + courseId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },
    
    // 保存错题
    saveWrongQuestions: function(courseId, wrongQuestions) {
        const key = this.PREFIX + 'wrong_' + courseId;
        const existing = this.getWrongQuestions(courseId);
        const merged = [...existing];
        wrongQuestions.forEach(wq => {
            const found = merged.find(item => item.questionId === wq.questionId);
            if (!found) merged.push(wq);
        });
        localStorage.setItem(key, JSON.stringify(merged));
    },
    
    // 获取错题
    getWrongQuestions: function(courseId) {
        const key = this.PREFIX + 'wrong_' + courseId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },
    
    // 获取所有课程的错题汇总
    getAllWrongQuestions: function() {
        const all = {};
        const courseIds = ['python-basics', 'data-analysis', 'data-collection', 'supply-chain', 'database', 'exam'];
        courseIds.forEach(id => {
            const wrong = this.getWrongQuestions(id);
            if (wrong.length > 0) all[id] = wrong;
        });
        return all;
    },
    
    // 移除错题（标记已掌握）
    removeWrongQuestion: function(courseId, questionId) {
        const key = this.PREFIX + 'wrong_' + courseId;
        const wrong = this.getWrongQuestions(courseId);
        const filtered = wrong.filter(q => q.questionId !== questionId);
        localStorage.setItem(key, JSON.stringify(filtered));
    }
};

// 2. 回到顶部按钮
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) {
        const newBtn = document.createElement('button');
        newBtn.id = 'back-to-top';
        newBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
        newBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer opacity-0 invisible transition-all duration-300 hover:from-pink-500 hover:to-purple-600 z-50';
        newBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(newBtn);
    }
    
    window.addEventListener('scroll', function() {
        const btn = document.getElementById('back-to-top');
        if (btn) {
            if (window.scrollY > 300) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        }
    });
}

// 3. 优化移动端导航
function initMobileNav() {
    const menuButtons = document.querySelectorAll('button');
    menuButtons.forEach(btn => {
        if (btn.innerHTML.includes('bars') || btn.innerHTML.includes('menu')) {
            btn.addEventListener('click', function() {
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                }
            });
        }
    });
}

// 4. 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    initMobileNav();
});
