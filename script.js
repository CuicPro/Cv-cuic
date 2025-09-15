        // Cursor personnalisé
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
       
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
           
            cursorDot.style.left = (e.clientX - 2) + 'px';
            cursorDot.style.top = (e.clientY - 2) + 'px';
        });

        // Hover effects pour le cursor
        const hoverElements = document.querySelectorAll('a, button, .project, .skill-item, .contact-item');
       
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
            });
           
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'transparent';
            });
        });

        // Smooth scroll pour la navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation au scroll
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

        // Observer tous les éléments animables
        document.querySelectorAll('.skill-item, .project, .experience-item, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });

        // Parallax léger sur l'avatar
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const avatar = document.querySelector('.hero-avatar');
            if (avatar) {
                avatar.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

        // Animation des compteurs/niveaux de compétence
        const animateSkillLevels = () => {
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        };

        // Observer pour déclencher l'animation des compétences
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillLevels();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
           
            skillsObserver.observe(skillsSection);
        }

        // Effet de typing sur le statut
        const statusTexts = [
            'Disponible pour projets',
            'Étudiant TSTI2D',
            'Développeur passionné',
            'Entrepreneur en herbe'
        ];
       
        let currentStatusIndex = 0;
        const statusElement = document.querySelector('.avatar-status');
       
        if (statusElement) {
            setInterval(() => {
                currentStatusIndex = (currentStatusIndex + 1) % statusTexts.length;
                const newText = statusTexts[currentStatusIndex];
               
                // Animation de fade
                statusElement.style.opacity = '0';
                setTimeout(() => {
                    statusElement.innerHTML = `<span class="status-dot"></span>${newText}`;
                    statusElement.style.opacity = '1';
                }, 300);
            }, 3000);
        }

        // Navigation active
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sections = document.querySelectorAll('section[id]');
       
        const highlightNavigation = () => {
            let current = '';
           
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
               
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
           
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
       
        window.addEventListener('scroll', highlightNavigation);

        // Effet de glow sur les éléments au hover
        const glowElements = document.querySelectorAll('.btn-primary, .project-link a');
       
        glowElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 30px var(--accent-glow)';
            });
           
            el.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        });

        // Performance: Débounce du scroll
        let ticking = false;
       
        function updateOnScroll() {
            highlightNavigation();
            ticking = false;
        }
       
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });