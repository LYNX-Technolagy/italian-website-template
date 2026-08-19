/* ============================================================
   MOBILE MENU FUNCTIONALITY
   ============================================================ */

// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileBackdrop = document.getElementById('mobileBackdrop');

// Open mobile menu
function openMenu() {
    mobileMenu.classList.add('active');
    mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close mobile menu
function closeMenuFn() {
    mobileMenu.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Event Listeners
hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
mobileBackdrop.addEventListener('click', closeMenuFn);

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenuFn();
});

/* ============================================================
   NAVIGATION SCROLL EFFECT
   ============================================================ */

const nav = document.querySelector('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

/* ============================================================
   MENU SCROLL CONTROLS
   ============================================================ */

/**
 * Scroll a menu container horizontally
 * @param {string} id - The ID of the container element
 * @param {number} direction - Positive for right, negative for left
 */
function scrollMenu(id, direction = 300) {
    const container = document.getElementById(id);
    if (container) {
        container.scrollBy({ 
            left: direction, 
            behavior: 'smooth' 
        });
    }
}

// Convenience functions for left/right scrolling
function scrollLeft(id) {
    scrollMenu(id, -300);
}

function scrollRight(id) {
    scrollMenu(id, 300);
}

/* ============================================================
   MENU TAB FILTERING
   ============================================================ */

const tabs = document.querySelectorAll('.menu-tab');
const categories = document.querySelectorAll('.menu-category');

// Function to show a specific category
function showCategory(category) {
    categories.forEach(cat => {
        if (category === 'all' || cat.dataset.category === category) {
            cat.style.display = 'block';
            
            // Smooth entrance animation
            cat.style.opacity = '0';
            cat.style.transform = 'translateY(10px)';
            
            // Trigger the animation
            requestAnimationFrame(() => {
                cat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                cat.style.opacity = '1';
                cat.style.transform = 'translateY(0)';
            });
        } else {
            cat.style.display = 'none';
        }
    });
}

// Add click event to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter categories
        const category = tab.dataset.category;
        showCategory(category);
    });
});

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS (optional enhancement)
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            closeMenuFn();
        }
    });
});

/* ============================================================
   KEYBOARD NAVIGATION FOR MENU ITEMS (accessibility)
   ============================================================ */

document.addEventListener('keydown', (e) => {
    // Add keyboard support for menu items
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.classList.contains('add-btn') || target.classList.contains('menu-tab')) {
            e.preventDefault();
            target.click();
        }
    }
});


/* ============================================================
   EXPOSE FUNCTIONS TO GLOBAL SCOPE (for inline HTML onclick)
   ============================================================ */

window.scrollLeft = scrollLeft;
window.scrollRight = scrollRight;
window.closeMenuFn = closeMenuFn;