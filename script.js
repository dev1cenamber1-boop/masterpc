// ========== МОБИЛЬНОЕ МЕНЮ ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ИЗМЕНЕНИЕ СТИЛЯ НАВИГАЦИИ ПРИ СКРОЛЛЕ ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 10, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.5)';
    } else {
        navbar.style.background = 'rgba(5, 5, 10, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
    }
});

// ========== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// ========== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками
document.querySelectorAll('.feature-card, .service-card, .price-card, .review-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ========== ОБРАБОТКА ФОРМЫ ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Здесь можно добавить отправку на сервер
        console.log('Форма отправлена:', data);
        
        // Показываем уведомление
        showNotification('Заявка отправлена! 🚀 Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Очищаем форму
        contactForm.reset();
    });
}

// ========== УВЕДОМЛЕНИЯ ==========
function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    const oldNotification = document.querySelector('.cyber-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Создаём новое уведомление
    const notification = document.createElement('div');
    notification.className = `cyber-notification cyber-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Стили уведомления
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    // Добавляем стили для уведомления
    const style = document.createElement('style');
    style.textContent = `
        .cyber-notification {
            background: linear-gradient(135deg, rgba(20, 20, 35, 0.95), rgba(10, 10, 15, 0.95));
            backdrop-filter: blur(10px);
            border: 1px solid ${type === 'success' ? '#00ffff' : '#ff00ff'};
            border-radius: 12px;
            padding: 15px 25px;
            min-width: 280px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            font-family: 'Orbitron', monospace;
            overflow: hidden;
            position: relative;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #fff;
        }
        .notification-content i {
            font-size: 1.5rem;
            color: ${type === 'success' ? '#00ffff' : '#ff00ff'};
        }
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00ffff, #ff00ff);
            width: 100%;
            animation: progressBar 3s linear forwards;
        }
        @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== ЭФФЕКТ ПЕЧАТИ ДЛЯ ЗАГОЛОВКА ==========
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Запускаем эффект печати для glitch текста (опционально)
const glitchElement = document.querySelector('.glitch');
if (glitchElement && window.innerWidth > 768) {
    const originalText = glitchElement.textContent;
    glitchElement.style.opacity = '0';
    setTimeout(() => {
        glitchElement.style.opacity = '1';
        typeWriter(glitchElement, originalText, 80);
    }, 500);
}

// ========== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ========== АНИМАЦИЯ ДЛЯ КНОПОК ==========
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', `${x}px`);
        btn.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Добавляем CSS для эффекта ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .btn::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    .btn:hover::after {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(rippleStyle);

// ========== СЧЁТЧИК ДЛЯ ЦЕН (АНИМАЦИЯ ПРИ СКРОЛЛЕ) ==========
const priceElements = document.querySelectorAll('.price-amount');
let animated = false;

function animatePrices() {
    if (animated) return;
    
    priceElements.forEach(el => {
        const priceText = el.textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        if (!isNaN(price)) {
            let current = 0;
            const increment = price / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= price) {
                    el.textContent = priceText;
                    clearInterval(timer);
                } else {
                    el.textContent = `от ${Math.floor(current)} ₸`;
                }
            }, 20);
        }
    });
    animated = true;
}

// Запускаем анимацию цен при скролле до секции prices
const pricesSection = document.querySelector('#prices');
if (pricesSection) {
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePrices();
                priceObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    priceObserver.observe(pricesSection);
}

// ========== КИБЕР-ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ ==========
const cards = document.querySelectorAll('.feature-card, .service-card, .price-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// ========== КОНСОЛЬНОЕ ПРИВЕТСТВИЕ ==========
console.log('%c🔧 MASTER PC | КИБЕР-СЕРВИС В ТАРАЗЕ 🔧', 'background: linear-gradient(135deg, #00ffff, #ff00ff); color: #0a0a0f; padding: 15px 25px; border-radius: 10px; font-size: 16px; font-family: monospace; font-weight: bold;');
console.log('%c💻 Профессиональная чистка и улучшение ПК | +7 707 380 64 38', 'color: #00ffff; font-size: 12px;');

// ========== ЗАЩИТА ОТ СПАМА (HONEYPOT) ==========
const form = document.querySelector('.contact-form');
if (form) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'honeypot';
    honeypot.style.display = 'none';
    honeypot.setAttribute('autocomplete', 'off');
    form.appendChild(honeypot);
}

// ========== ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ (опционально) ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========== КНОПКА "НАВЕРХ" ==========
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00ffff, #ff00ff);
        border: none;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        color: #0a0a0f;
        font-size: 1.2rem;
    `;
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollTopButton();

// ========== ДИНАМИЧЕСКИЙ ГОД В ФУТЕРЕ ==========
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', year);
}

// ========== ВАЛИДАЦИЯ ТЕЛЕФОНА ==========
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9+]/g, '');
        if (!value.startsWith('+')) {
            value = '+' + value;
        }
        e.target.value = value.slice(0, 12);
    });
});