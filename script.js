// Preloader
window.addEventListener('load', function() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 500);
    }, 500);
});

// Navigation
const header = document.querySelector('header');
const toggleBtn = document.querySelector('.toggle-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

// Toggle navigation menu
toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking nav links
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Add background to header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active menu item on scroll
const sections = document.querySelectorAll('section');

function checkActiveSection() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', checkActiveSection);

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing animation
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Full Stack Developer', 'Problem Solver', 'CSE Student', 'Tech Enthusiast'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}

if (textArray.length) {
    setTimeout(type, newTextDelay + 250);
}

// Skills animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.setAttribute('data-before-hover', item.textContent);
        setTimeout(() => {
            item.textContent = item.getAttribute('data-skill');
        }, 150);
    });
    
    item.addEventListener('mouseout', () => {
        item.textContent = item.getAttribute('data-before-hover');
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For GitHub Pages, you can use a service like Formspree or EmailJS
        
        // For now, let's just show an alert
        alert(`Thank you ${name} for your message! As this is hosted on GitHub Pages, this form doesn't actually send emails. Please contact me directly at cs23i1053@iiitdm.ac.in`);
        
        // Clear the form
        contactForm.reset();
    });
}

// Add scroll reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.skills-category, .project-card, .about-details, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animateElements.forEach(element => {
        element.classList.add('animate__animated');
        observer.observe(element);
    });
});

// Animate sections on scroll
function animateSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {threshold: 0.1});

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add 3D tilt effect to hero profile photo
function init3DTiltEffect() {
    const heroPhoto = document.querySelector('.hero-profile-photo');
    if (!heroPhoto) return;
    
    const maxTilt = 10;
    
    heroPhoto.addEventListener('mousemove', (e) => {
        const rect = heroPhoto.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        const xRotation = (xPercent - 0.5) * maxTilt * -1;
        const yRotation = (yPercent - 0.5) * maxTilt;
        
        const img = heroPhoto.querySelector('img');
        if (img) {
            img.style.transform = `perspective(1000px) rotateX(${yRotation}deg) rotateY(${xRotation}deg) scale3d(1.05, 1.05, 1.05)`;
        }
    });
    
    heroPhoto.addEventListener('mouseleave', () => {
        const img = heroPhoto.querySelector('img');
        if (img) {
            img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    });
}

// Simple parallax scrolling effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Hero section parallax
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroImg = heroSection.querySelector('.hero-profile-photo img');
            if (heroImg) {
                heroImg.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
            
            const heroContent = heroSection.querySelector('.text-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        }
        
        // About section parallax
        const aboutSection = document.querySelector('.about');
        if (aboutSection && scrollY > aboutSection.offsetTop - 500) {
            const aboutImg = aboutSection.querySelector('.about-image');
            if (aboutImg) {
                aboutImg.style.transform = `translateY(${(scrollY - aboutSection.offsetTop + 500) * 0.05}px)`;
            }
        }
    });
}

// Initialize animations once the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    animateSections();
    init3DTiltEffect();
    initParallaxEffect();
});
