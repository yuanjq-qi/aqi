// 移动端导航菜单切换
const menuButton = document.querySelector('button');
if (menuButton && menuButton.parentElement.classList.contains('md:hidden')) {
    menuButton.addEventListener('click', function() {
        const navLinks = document.querySelector('nav div div:nth-child(2)');
        if (navLinks) {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('space-x-0');
            navLinks.classList.toggle('space-y-4');
            navLinks.classList.toggle('py-4');
        }
    });
}

// 平滑滚动到课程部分
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});