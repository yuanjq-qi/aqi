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
        this.updateStudyStreak(); // 记录学习天数
    },
    
    // 更新连续学习天数
    updateStudyStreak: function() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem(this.PREFIX + 'last_study_date');
        let streak = parseInt(localStorage.getItem(this.PREFIX + 'study_streak') || '0');
        
        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate === yesterday.toDateString()) {
                streak++;
            } else {
                streak = 1;
            }
            localStorage.setItem(this.PREFIX + 'study_streak', streak.toString());
            localStorage.setItem(this.PREFIX + 'last_study_date', today);
        }
    },
    
    // 获取连续学习天数
    getStudyStreak: function() {
        return parseInt(localStorage.getItem(this.PREFIX + 'study_streak') || '0');
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
    },
    
    // 保存笔记
    saveNote: function(courseId, questionId, note) {
        const key = this.PREFIX + 'notes_' + courseId;
        const notes = this.getNotes(courseId);
        notes[questionId] = { content: note, timestamp: new Date().toISOString() };
        localStorage.setItem(key, JSON.stringify(notes));
    },
    
    // 获取笔记
    getNotes: function(courseId) {
        const key = this.PREFIX + 'notes_' + courseId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {};
    },
    
    // 获取单题笔记
    getNote: function(courseId, questionId) {
        const notes = this.getNotes(courseId);
        return notes[questionId] || null;
    },
    
    // 获取总体学习统计
    getOverallStats: function() {
        const courseIds = ['python-basics', 'data-analysis', 'data-collection', 'supply-chain', 'database', 'exam'];
        let totalQuizzes = 0;
        let totalCorrect = 0;
        let totalWrong = 0;
        let historyByDate = {};
        
        courseIds.forEach(courseId => {
            const history = this.getQuizHistory(courseId);
            history.forEach(result => {
                totalQuizzes++;
                totalCorrect += result.correct || 0;
                totalWrong += result.wrong || 0;
                
                const date = new Date(result.timestamp).toDateString();
                if (!historyByDate[date]) {
                    historyByDate[date] = { correct: 0, wrong: 0, quizzes: 0 };
                }
                historyByDate[date].correct += result.correct || 0;
                historyByDate[date].wrong += result.wrong || 0;
                historyByDate[date].quizzes++;
            });
        });
        
        return {
            totalQuizzes,
            totalCorrect,
            totalWrong,
            historyByDate,
            streak: this.getStudyStreak()
        };
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
