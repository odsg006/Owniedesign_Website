/* ========================================
   CAROUSEL
======================================== */

(function () {

    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('#carouselDots span');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!track || !slides.length) return;

    const slideCount = slides.length;

    let index = 0;
    let timer;


    function goTo(i) {

        index = (i + slideCount) % slideCount;

        track.style.transform =
            `translateX(-${index * (100 / slideCount)}%)`;

        dots.forEach((dot, di) => {
            dot.classList.toggle(
                'active',
                di === index
            );
        });
    }


    function next() {
        goTo(index + 1);
    }


    function prev() {
        goTo(index - 1);
    }


    function startAuto() {

        timer = setInterval(() => {
            next();
        }, 4000);

    }


    function resetAuto() {

        clearInterval(timer);

        startAuto();

    }


    const nextBtn =
        document.getElementById('nextBtn');

    const prevBtn =
        document.getElementById('prevBtn');


    if (nextBtn) {

        nextBtn.addEventListener(
            'click',
            () => {

                next();
                resetAuto();

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            'click',
            () => {

                prev();
                resetAuto();

            }
        );

    }


    dots.forEach(dot => {

        dot.addEventListener(
            'click',
            () => {

                goTo(
                    parseInt(
                        dot.dataset.i
                    )
                );

                resetAuto();

            }
        );

    });


    const reduce =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


    if (!reduce) {

        startAuto();

    }

})();



/* ========================================
   SCROLL FADE-IN
======================================== */

(function () {

    const reduce =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


    const targets =
        document.querySelectorAll('.reveal');


    if (!targets.length) {
        return;
    }


    /* Reduced motion */

    if (reduce) {

        targets.forEach(el => {
            el.classList.add('is-visible');
        });

        return;
    }


    /* ========================================
       STAGGER
    ======================================== */

    let staggerIndex = 0;

    const staggerMap =
        new WeakMap();


    targets.forEach(el => {

        if (
            el.classList.contains(
                'stage-cell'
            )
        ) {

            staggerMap.set(
                el,
                staggerIndex % 4
            );

            staggerIndex++;

        }

    });


    /* ========================================
       INTERSECTION OBSERVER
    ======================================== */

    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const delay =
                            staggerMap.has(
                                entry.target
                            )
                                ? staggerMap.get(
                                      entry.target
                                  ) * 90
                                : 0;


                        setTimeout(() => {

                            entry.target.classList.add(
                                'is-visible'
                            );

                        }, delay);


                        obs.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15,

                rootMargin:
                    '0px 0px -8% 0px'
            }
        );


    targets.forEach(el => {

        observer.observe(el);

    });

})();



/* ========================================
   TYPING TEXT
======================================== */

(function () {


    /* ========================================
       WORD LIST
    ======================================== */

    const words = [

        "VISUAL DESIGNER.",

        "MOTION GHAPHIC.",

        "INTERACTIVE.",

        "EXPERIMENTAL.",

        "EXHIBITION.",

        "ODSG",
    ];


    /* ========================================
       ELEMENT
    ======================================== */

    const textElement =
        document.getElementById(
            "typingText"
        );


    /* ถ้าไม่มี element ไม่ต้องทำงาน */

    if (!textElement) {
        return;
    }


    /* ========================================
       SETTINGS
    ======================================== */

    const typingSpeed = 90;

    const deletingSpeed = 45;

    const pauseAfterTyping = 1500;

    const pauseBeforeTyping = 400;


    /* ========================================
       VARIABLES
    ======================================== */

    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    /* ========================================
       TYPE LOOP
    ======================================== */

    function typeLoop() {

        const currentWord =
            words[wordIndex];


        /* ========================================
           TYPING
        ======================================== */

        if (!deleting) {


            textElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex + 1
                );


            characterIndex++;


            /* Finished typing */

            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;


                setTimeout(
                    typeLoop,
                    pauseAfterTyping
                );


                return;

            }


            setTimeout(
                typeLoop,
                typingSpeed
            );


        }


        /* ========================================
           DELETING
        ======================================== */

        else {


            textElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex - 1
                );


            characterIndex--;


            /* Finished deleting */

            if (
                characterIndex === 0
            ) {


                deleting = false;


                wordIndex++;


                /* Back to first word */

                if (
                    wordIndex >=
                    words.length
                ) {

                    wordIndex = 0;

                }


                setTimeout(
                    typeLoop,
                    pauseBeforeTyping
                );


                return;

            }


            setTimeout(
                typeLoop,
                deletingSpeed
            );

        }

    }


    /* ========================================
       START
    ======================================== */

    typeLoop();


})();