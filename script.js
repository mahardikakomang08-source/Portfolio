document.addEventListener('DOMContentLoaded', function() {
    // ===== FADE-IN SECTION SAAT SCROLL (SELANG-SELING) =====
    const sections = document.querySelectorAll('main > section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                if (targetId === 'about' || targetId === 'certificates' || targetId === 'contact') {
                    entry.target.classList.add('fade-in-right');
                } else {
                    entry.target.classList.add('fade-in-left');
                }
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== NAVIGASI HAMBURGER =====
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const links = navLinks.querySelectorAll('a');

    const toggleMobileMenu = (forceState) => {
        const willShow = forceState !== undefined ? forceState : !navLinks.classList.contains('show');
        navLinks.classList.toggle('show', willShow);
        hamburger.classList.toggle('active', willShow);
        document.body.style.overflow = willShow ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => toggleMobileMenu());

    links.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Klik di luar menu untuk menutup (mobile)
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('show')) {
            const clickedInsideMenu = navLinks.contains(e.target) || hamburger.contains(e.target);
            if (!clickedInsideMenu) toggleMobileMenu(false);
        }
    });

    // Tutup dengan tombol ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('show')) toggleMobileMenu(false);
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    const toggleHeaderScrolled = () => {
        if (window.scrollY > 8) {
            header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.7)';
        } else {
            header.style.boxShadow = 'none';
        }
    };
    toggleHeaderScrolled();
    window.addEventListener('scroll', toggleHeaderScrolled, { passive: true });

    // ===== NAV SCROLLSPY (aktifkan link sesuai section terlihat) =====
    const sectionsForSpy = document.querySelectorAll('main > section[id]');
    const setActiveLink = (id) => {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    };
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sectionsForSpy.forEach(sec => spyObserver.observe(sec));
});