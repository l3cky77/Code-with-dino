// ===== Code With Dino — site interactivity =====

document.addEventListener('DOMContentLoaded', () => {

//
				---- Mobile nav toggle ---- 
    const navToggle = document.getElementById('navToggle');
    const nav1 = document.getElementById('nav1');
    if (navToggle && nav1) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav1.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
        nav1.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav1.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

 //    ---- Highlight active nav link while scrolling ---- 
    const navLinks = document.querySelectorAll('#nav1 a');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setActiveLink = () => {
        let currentId = sections[0] ? sections[0].id : null;
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top <= 120) currentId = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    };
    document.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();

//     ---- Course search / filter ---- 
    const searchInput = document.getElementById('courseSearch');
    const searchCount = document.getElementById('searchCount');
    const courseCards = document.querySelectorAll('.course-card');

    const filterCourses = () => {
        const query = searchInput.value.trim().toLowerCase();
        let visible = 0;
        courseCards.forEach(card => {
            const match = card.dataset.course.includes(query);
            card.classList.toggle('is-hidden', !match);
            if (match) visible++;
        });
        searchCount.textContent = query
            ? `${visible} match${visible === 1 ? '' : 'es'}`
            : '';
    };
    if (searchInput) searchInput.addEventListener('input', filterCourses);

/*     ---- Reveal roadmap strata as they scroll into view ---- */
    const strataLayers = document.querySelectorAll('.strata');
    if ('IntersectionObserver' in window && strataLayers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        strataLayers.forEach(layer => observer.observe(layer));
    } else {
        strataLayers.forEach(layer => layer.classList.add('in-view'));
    }

  //  ---- Probl
    const form = document.getElementById('problemForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailAddr').value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name) {
                formStatus.textContent = 'Please enter your name.';
                formStatus.classList.add('error');
                return;
            }
            if (!emailPattern.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                return;
            }

            formStatus.classList.remove('error');
            formStatus.textContent = `Thanks, ${name} — we've got your message and will follow up by email.`;
            form.reset();
        });
    }
});
