/* ====================================================
   MATEUS ALVES — PORTFOLIO 2026
   Cyberpunk Neon Edition — main JS
   ==================================================== */

/* ============================================================
   1. CLOCK (Rio time)
   ============================================================ */
(function clock() {
    const el = document.getElementById('clock');
    if (!el) return;
    function tick() {
        const now = new Date();
        const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' };
        el.textContent = now.toLocaleTimeString('pt-BR', opts);
    }
    tick();
    setInterval(tick, 1000);
})();

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
(function customCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    }
    loop();

    const growSelectors = 'a, button, .work-card, .thumb-cell, .mind-card, .niche-chip, .sc-btn, .nav-dot, [data-tilt]';
    document.querySelectorAll(growSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
    });
})();

/* ============================================================
   3. SCROLL REVEAL (intersection observer)
   ============================================================ */
(function reveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('is-visible'), i * 60);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
})();

/* ============================================================
   4. ACTIVE NAV DOT BASED ON SECTION
   ============================================================ */
(function activeNav() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const dots = document.querySelectorAll('.nav-dot');
    if (!sections.length || !dots.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#' + id));
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => io.observe(s));
})();

/* ============================================================
   5. ANIMATED COUNTER FOR HERO STATS
   ============================================================ */
(function counters() {
    const nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;

    function format(n) {
        if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
        if (n >= 1_000) return (n / 1_000).toFixed(0) + 'k+';
        return String(n);
    }

    function animate(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1800;
        const start = performance.now();
        function step(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.floor(target * eased);
            el.textContent = format(value);
            if (t < 1) requestAnimationFrame(step);
            else el.textContent = format(target);
        }
        requestAnimationFrame(step);
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animate(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
})();

/* ============================================================
   6. SKILL BAR FILL ON SCROLL
   ============================================================ */
(function skills() {
    const bars = document.querySelectorAll('.skill-bar');
    if (!bars.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const fill = e.target.querySelector('.skill-fill');
                const level = e.target.dataset.level;
                if (fill && level) {
                    setTimeout(() => { fill.style.width = level + '%'; }, 200);
                }
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    bars.forEach(b => io.observe(b));
})();

/* ============================================================
   7. CARD TILT 3D
   ============================================================ */
(function tilt() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        let raf = null;

        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
        });
    });
})();

/* ============================================================
   8. VIDEO PLAY ON HOVER + PAUSE OFF-SCREEN
   ============================================================ */
(function videoControl() {
    const cards = document.querySelectorAll('.work-card');

    cards.forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        card.addEventListener('mouseenter', () => video.play().catch(() => {}));
        card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
    });

    // Pause when off-screen
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            const v = e.target.querySelector('video');
            if (!v) return;
            if (!e.isIntersecting) v.pause();
        });
    }, { threshold: 0.05 });
    cards.forEach(c => io.observe(c));

    // Auto-play first card on mobile
    if (window.matchMedia('(hover: none)').matches) {
        const ioMobile = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                const v = e.target.querySelector('video');
                if (!v) return;
                if (e.isIntersecting) v.play().catch(() => {});
                else v.pause();
            });
        }, { threshold: 0.55 });
        cards.forEach(c => ioMobile.observe(c));
    }
})();

/* ============================================================
   9. HERO 3D — Cyberpunk Cinema Camera (Three.js)
   ============================================================ */
(function hero3D() {
    const canvas = document.getElementById('hero3d');
    if (!canvas || typeof THREE === 'undefined') return;

    const hero = canvas.parentElement;
    let width = hero.clientWidth;
    let height = hero.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050108, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 14);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    /* ----- Lights ----- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    const pPurple = new THREE.PointLight(0xb026ff, 3, 30);
    pPurple.position.set(-4, 3, 4);
    scene.add(pPurple);

    const pCyan = new THREE.PointLight(0x00f0ff, 3, 30);
    pCyan.position.set(4, -2, 4);
    scene.add(pCyan);

    const pPink = new THREE.PointLight(0xff006e, 1.5, 25);
    pPink.position.set(0, -4, 6);
    scene.add(pPink);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.4);
    keyLight.position.set(2, 5, 5);
    scene.add(keyLight);

    /* ----- Materials ----- */
    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x0a0612,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0x1a0830,
        emissiveIntensity: 0.4,
    });

    const accentMat = new THREE.MeshStandardMaterial({
        color: 0xb026ff,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0xb026ff,
        emissiveIntensity: 0.8,
    });

    const cyanMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x00f0ff,
        emissiveIntensity: 1.2,
    });

    const lensGlassMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 1,
        roughness: 0.05,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.6,
    });

    const wireMat = new THREE.LineBasicMaterial({
        color: 0xb026ff,
        transparent: true,
        opacity: 0.35,
    });

    /* ----- Cinema Camera Group ----- */
    const cameraGroup = new THREE.Group();

    // 1. Body (main box)
    const bodyGeo = new THREE.BoxGeometry(3.4, 2.2, 2);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    cameraGroup.add(body);
    cameraGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), wireMat));

    // 2. Lens housing (cylinder forward)
    const lensHousingGeo = new THREE.CylinderGeometry(0.85, 0.9, 1.8, 32);
    const lensHousing = new THREE.Mesh(lensHousingGeo, bodyMat);
    lensHousing.rotation.x = Math.PI / 2;
    lensHousing.position.z = 1.9;
    cameraGroup.add(lensHousing);

    // 3. Lens rim (purple accent ring)
    const rimGeo = new THREE.TorusGeometry(0.95, 0.08, 12, 48);
    const rim = new THREE.Mesh(rimGeo, accentMat);
    rim.position.z = 2.8;
    cameraGroup.add(rim);

    // 4. Lens glass (cyan glow inner disk)
    const glassGeo = new THREE.CircleGeometry(0.78, 48);
    const glass = new THREE.Mesh(glassGeo, lensGlassMat);
    glass.position.z = 2.82;
    cameraGroup.add(glass);

    // Lens hood (slightly bigger cylinder forward)
    const hoodGeo = new THREE.CylinderGeometry(1.05, 0.95, 0.4, 32);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.rotation.x = Math.PI / 2;
    hood.position.z = 3.0;
    cameraGroup.add(hood);

    // 5. Top viewfinder
    const vfGeo = new THREE.BoxGeometry(1.6, 0.6, 1);
    const vf = new THREE.Mesh(vfGeo, bodyMat);
    vf.position.set(0.4, 1.4, 0.2);
    cameraGroup.add(vf);
    cameraGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(vfGeo), wireMat));

    // VF eyepiece (cyan circle)
    const eyeGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.25, 24);
    const eye = new THREE.Mesh(eyeGeo, cyanMat);
    eye.rotation.x = Math.PI / 2;
    eye.position.set(0.4, 1.4, -0.4);
    cameraGroup.add(eye);

    // 6. Top handle (a curved bar)
    const handleShape = new THREE.Shape();
    handleShape.moveTo(-1, 0);
    handleShape.lineTo(-1, 0.25);
    handleShape.lineTo(1, 0.25);
    handleShape.lineTo(1, 0);
    handleShape.lineTo(0.95, 0);
    handleShape.lineTo(0.95, 0.2);
    handleShape.lineTo(-0.95, 0.2);
    handleShape.lineTo(-0.95, 0);
    handleShape.lineTo(-1, 0);

    const handleGeo = new THREE.ExtrudeGeometry(handleShape, { depth: 0.25, bevelEnabled: false });
    const handle = new THREE.Mesh(handleGeo, bodyMat);
    handle.position.set(-0.2, 1.7, -0.12);
    cameraGroup.add(handle);

    // 7. Side knob (recording button)
    const knobGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.18, 24);
    const knob = new THREE.Mesh(knobGeo, new THREE.MeshStandardMaterial({
        color: 0xff006e,
        metalness: 0.6,
        roughness: 0.3,
        emissive: 0xff006e,
        emissiveIntensity: 1.5,
    }));
    knob.rotation.z = Math.PI / 2;
    knob.position.set(1.78, 0.5, 0.6);
    cameraGroup.add(knob);

    // 8. Bottom plate
    const plateGeo = new THREE.BoxGeometry(3.6, 0.18, 2.2);
    const plate = new THREE.Mesh(plateGeo, accentMat);
    plate.position.y = -1.2;
    cameraGroup.add(plate);

    // 9. SD Slot details (thin cyan strip on side)
    const stripGeo = new THREE.BoxGeometry(0.05, 0.18, 1.2);
    const strip = new THREE.Mesh(stripGeo, cyanMat);
    strip.position.set(1.71, -0.3, 0);
    cameraGroup.add(strip);

    // 10. Front tally LED (small dot near lens)
    const tallyGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const tally = new THREE.Mesh(tallyGeo, new THREE.MeshBasicMaterial({ color: 0xff006e }));
    tally.position.set(-1.4, 0.7, 1.05);
    cameraGroup.add(tally);

    // Scale & initial transform
    cameraGroup.scale.set(0.85, 0.85, 0.85);
    cameraGroup.position.set(0, 0, 0);
    cameraGroup.rotation.y = -0.4;
    cameraGroup.rotation.x = 0.15;
    scene.add(cameraGroup);

    /* ----- Orbiting wire ring ----- */
    const ringGeo = new THREE.TorusGeometry(4.5, 0.015, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    scene.add(orbitRing);

    const ringGeo2 = new THREE.TorusGeometry(5.5, 0.01, 6, 80);
    const orbitRing2 = new THREE.Mesh(ringGeo2, new THREE.MeshBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.25 }));
    orbitRing2.rotation.x = Math.PI / 1.8;
    orbitRing2.rotation.y = 0.3;
    scene.add(orbitRing2);

    /* ----- Floating particles ----- */
    const particleCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
        const tint = Math.random();
        if (tint < 0.5) { colors[i * 3] = 0.69; colors[i * 3 + 1] = 0.15; colors[i * 3 + 2] = 1; }
        else { colors[i * 3] = 0; colors[i * 3 + 1] = 0.94; colors[i * 3 + 2] = 1; }
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ----- Mouse interaction ----- */
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0.15, targetRotY = -0.4;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        targetRotY = -0.4 + mouseX * 0.45;
        targetRotX = 0.15 + mouseY * 0.25;
    });

    /* ----- Resize ----- */
    function resize() {
        width = hero.clientWidth;
        height = hero.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }
    window.addEventListener('resize', resize);

    /* ----- Animate ----- */
    const clock = new THREE.Clock();
    function animate() {
        const t = clock.getElapsedTime();

        // smooth follow mouse
        cameraGroup.rotation.y += (targetRotY - cameraGroup.rotation.y) * 0.04;
        cameraGroup.rotation.x += (targetRotX - cameraGroup.rotation.x) * 0.04;

        // idle float
        cameraGroup.position.y = Math.sin(t * 0.6) * 0.25;
        cameraGroup.position.x = Math.cos(t * 0.4) * 0.15;

        // tally blink
        tally.material.color.setHex(Math.sin(t * 4) > 0 ? 0xff006e : 0x550022);

        // glass pulse
        lensGlassMat.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.3;

        // rim subtle hue shift
        accentMat.emissiveIntensity = 0.6 + Math.sin(t * 1.4) * 0.4;

        // rings rotate
        orbitRing.rotation.z += 0.002;
        orbitRing2.rotation.z -= 0.0015;

        // particles drift
        points.rotation.y += 0.0008;
        points.rotation.x += 0.0003;

        // lights orbit slightly
        pPurple.position.x = Math.cos(t * 0.6) * 5;
        pPurple.position.z = Math.sin(t * 0.6) * 5;
        pCyan.position.x = Math.cos(t * 0.5 + Math.PI) * 5;
        pCyan.position.z = Math.sin(t * 0.5 + Math.PI) * 5;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Initial resize after layout
    setTimeout(resize, 60);
})();

/* ============================================================
   10. PARALLAX TILT ON HERO PROFILE CARD
   ============================================================ */
(function profileParallax() {
    if (window.matchMedia('(hover: none)').matches) return;
    const card = document.querySelector('.profile-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
})();
