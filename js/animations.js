/**
 * MOD SHOES - Advanced Animations & Micro-Interactions
 * Powered by GSAP, ScrollTrigger, Lenis Smooth Scroll and custom cursor physics.
 */

class AnimationController {
    constructor() {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.lenis = null;
        this.cursor = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.init();
    }

    init() {
        this.initPreloader();
        if (!this.reducedMotion) {
            this.initSmoothScroll();
            this.initCustomCursor();
            this.initHeroParallax();
            this.initScrollReveals();
            this.initMarquee();
        }
    }

    // Page Preloader
    initPreloader() {
        const preloader = document.getElementById('pagePreloader');
        if (!preloader) return;

        const counterEl = document.getElementById('preloaderCounter');
        const barEl = document.getElementById('preloaderProgressBar');
        let count = 0;

        const updateCounter = () => {
            const increment = Math.floor(Math.random() * 15) + 5;
            count = Math.min(100, count + increment);

            if (counterEl) counterEl.textContent = `${count}%`;
            if (barEl) barEl.style.width = `${count}%`;

            if (count < 100) {
                setTimeout(updateCounter, 40);
            } else {
                setTimeout(() => {
                    if (window.gsap) {
                        gsap.to(preloader, {
                            yPercent: -100,
                            duration: 0.9,
                            ease: 'power4.inOut',
                            onComplete: () => {
                                preloader.style.display = 'none';
                                document.body.classList.remove('loading');
                                this.animateHeroEntrance();
                            }
                        });
                    } else {
                        preloader.style.opacity = '0';
                        setTimeout(() => preloader.style.display = 'none', 600);
                        document.body.classList.remove('loading');
                    }
                }, 200);
            }
        };

        updateCounter();
    }

    // Lenis Smooth Scroll
    initSmoothScroll() {
        if (typeof Lenis !== 'undefined') {
            try {
                this.lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    direction: 'vertical',
                    gestureDirection: 'vertical',
                    smooth: true,
                    smoothTouch: false,
                    touchMultiplier: 2
                });

                const raf = (time) => {
                    this.lenis.raf(time);
                    requestAnimationFrame(raf);
                };
                requestAnimationFrame(raf);

                // Connect to GSAP ScrollTrigger if present
                if (window.ScrollTrigger) {
                    this.lenis.on('scroll', ScrollTrigger.update);
                    gsap.ticker.add((time) => {
                        this.lenis.raf(time * 1000);
                    });
                    gsap.ticker.lagSmoothing(0);
                }
            } catch (err) {
                console.warn('Lenis initialization skipped:', err);
            }
        }
    }

    // Custom Interactive Cursor
    initCustomCursor() {
        // Disable on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const cursorDot = document.getElementById('customCursorDot');
        const cursorRing = document.getElementById('customCursorRing');
        if (!cursorDot || !cursorRing) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // Smooth trailing ring
        const loop = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        // Hover expansions
        const interactiveSelectors = 'a, button, input, select, textarea, .product-card, .category-card, .btn, .swatch-btn, .size-pill-btn';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelectors)) {
                cursorRing.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveSelectors)) {
                cursorRing.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            }
        });

        document.addEventListener('mousedown', () => {
            cursorRing.classList.add('cursor-active');
        });

        document.addEventListener('mouseup', () => {
            cursorRing.classList.remove('cursor-active');
        });
    }

    // Hero Entrance Animation
    animateHeroEntrance() {
        if (!window.gsap) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-badge', {
            y: 30,
            opacity: 0,
            duration: 0.8
        })
        .from('.hero-title .word', {
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.15
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-actions', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-shoe-centerpiece', {
            scale: 0.75,
            opacity: 0,
            rotation: -10,
            duration: 1.4,
            ease: 'elastic.out(1, 0.75)'
        }, '-=1.2')
        .from('.hero-floating-tag', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
        }, '-=0.8')
        .from('.hero-scroll-indicator', {
            opacity: 0,
            y: -20,
            duration: 0.6
        }, '-=0.4');
    }

    // Hero 3D Parallax on mouse move
    initHeroParallax() {
        const heroSection = document.querySelector('.hero-section');
        const shoeWrapper = document.querySelector('.hero-shoe-centerpiece');
        const backdropText = document.querySelector('.hero-giant-bg-text');

        if (!heroSection || !shoeWrapper) return;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (window.gsap) {
                gsap.to(shoeWrapper, {
                    x: x * 40,
                    y: y * 40,
                    rotationY: x * 15,
                    rotationX: -y * 15,
                    duration: 0.8,
                    ease: 'power1.out'
                });

                if (backdropText) {
                    gsap.to(backdropText, {
                        x: -x * 60,
                        y: -y * 30,
                        duration: 1,
                        ease: 'power1.out'
                    });
                }
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            if (window.gsap) {
                gsap.to(shoeWrapper, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power2.out'
                });
                if (backdropText) {
                    gsap.to(backdropText, {
                        x: 0,
                        y: 0,
                        duration: 1.2,
                        ease: 'power2.out'
                    });
                }
            }
        });
    }

    // ScrollTrigger Reveals
    initScrollReveals() {
        if (!window.gsap || !window.ScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        // Section Titles reveal
        gsap.utils.toArray('.reveal-title').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Staggered cards reveal
        gsap.utils.toArray('.reveal-stagger-parent').forEach(parent => {
            const items = parent.querySelectorAll('.reveal-stagger-child');
            gsap.from(items, {
                scrollTrigger: {
                    trigger: parent,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        });

        // Parallax Promotional Banner Image
        gsap.utils.toArray('.parallax-banner-bg').forEach(bg => {
            gsap.to(bg, {
                scrollTrigger: {
                    trigger: bg.closest('.parallax-banner-section'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                yPercent: 20,
                ease: 'none'
            });
        });

        // Split editorial section image reveal
        gsap.utils.toArray('.reveal-clip-image').forEach(img => {
            gsap.from(img, {
                scrollTrigger: {
                    trigger: img,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                clipPath: 'inset(100% 0% 0% 0%)',
                scale: 1.15,
                duration: 1.4,
                ease: 'power4.out'
            });
        });
    }

    // Marquee Infinite Scrolling
    initMarquee() {
        const marqueeTracks = document.querySelectorAll('.marquee-track');
        marqueeTracks.forEach(track => {
            // Duplicate content for seamless loop
            const content = track.innerHTML;
            track.innerHTML = content + content;
        });
    }
}

// Auto-instantiate when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modAnimations = new AnimationController();
});
