document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        tarjeta.classList.toggle('girada');
    });
});

const btnContinuar = document.getElementById('btn-continuar');
const btnIrCarta = document.getElementById('btn-ir-carta');
const btnReiniciar = document.getElementById('btn-reiniciar');

const modulo1 = document.getElementById('modulo-1');
const modulo2 = document.getElementById('modulo-2');
const modulo3 = document.getElementById('modulo-3');

btnContinuar.addEventListener('click', () => {
    modulo1.classList.remove('activo');
    modulo1.classList.add('oculto');

    setTimeout(() => {
        modulo2.classList.remove('oculto');
        modulo2.classList.add('activo');
        iniciarUniversoCanvas();
    }, 400);
});

btnIrCarta.addEventListener('click', () => {
    modulo2.classList.remove('activo');
    modulo2.classList.add('oculto');

    setTimeout(() => {
        modulo3.classList.remove('oculto');
        modulo3.classList.add('activo');
    }, 400);
});

const envoltorioSobre = document.getElementById('envoltorio-sobre');
const hojaCarta = document.getElementById('hoja-carta');
const instruccionSobre = document.getElementById('instruccion-sobre');
const btnCerrarCarta = document.getElementById('btn-cerrar-carta');

envoltorioSobre.addEventListener('click', () => {
    if (!envoltorioSobre.classList.contains('abierto')) {
        envoltorioSobre.classList.add('abierto');
        instruccionSobre.style.opacity = '0';

        setTimeout(() => {
            envoltorioSobre.classList.add('ocultar-sobre');
            hojaCarta.classList.add('desplegada');
            btnReiniciar.classList.remove('oculto-boton');
            btnReiniciar.classList.add('visible');
        }, 500);
    }
});

btnCerrarCarta.addEventListener('click', (e) => {
    e.stopPropagation();
    hojaCarta.classList.remove('desplegada');
    
    setTimeout(() => {
        envoltorioSobre.classList.remove('ocultar-sobre');
    }, 300);
});

btnReiniciar.addEventListener('click', () => {
    hojaCarta.classList.remove('desplegada');
    envoltorioSobre.classList.remove('abierto', 'ocultar-sobre');
    instruccionSobre.style.opacity = '1';
    
    btnReiniciar.classList.remove('visible');
    btnReiniciar.classList.add('oculto-boton');

    modulo3.classList.remove('activo');
    modulo3.classList.add('oculto');

    setTimeout(() => {
        modulo1.classList.remove('oculto');
        modulo1.classList.add('activo');
    }, 400);
});

function iniciarUniversoCanvas() {
    const canvas = document.getElementById('canvas-universo');
    const ctx = canvas.getContext('2d');

    function redimensionar() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
    }
    redimensionar();
    window.addEventListener('resize', redimensionar);

    const estrellas = [];
    for (let i = 0; i < 220; i++) {
        estrellas.push({
            x: Math.random(),
            y: Math.random(),
            size: Math.random() * 1.6 + 0.4,
            alpha: Math.random() * 0.75 + 0.2,
            parpadeo: (Math.random() * 0.02) + 0.005
        });
    }

    const frases = [
        "Tu sonrisa ilumina mi mundo", "Gracias por existir", "Brillas con luz propia",
        "Eres mi pensamiento favorito", "Mi bendición más grande", "Pura poesía en movimiento",
        "Única e inigualable", "Tu paz me calma", "Mi lugar seguro", "Dulce ternura",
        "Simplemente hermosa", "Amor de mi vida", "Mi pedacito de cielo", "Tu risa es mi canción",
        "Magia pura", "Mi estrella guiadora", "Eterna para mí", "Mi refugio bonito",
        "Luz de mis ojos", "Mi inspiración diaria", "Haces mi mundo mejor", "La melodía más dulce",
        "Mi razón de sonreír", "Tesoro inestimable", "Contigo todo es mejor", "Mi destino favorito",
        "Un sueño hecho realidad", "Mi hogar en ti", "Eternamente fascinante", "Mi calma en el caos",
        "Brillaste desde el primer día", "Mi complemento perfecto", "Eres mi universo", "Llenas todo de luz",
        "El arte de coincidir", "Simplemente tú", "Mi rincón preferido", "Infinito cariño"
    ];

    const elementos3D = [];
    const distribucionAnillos = [
        { multRadio: 0.20, cantidad: 8,  velFactor: 1.2,  opacidadBase: 0.95 },
        { multRadio: 0.30, cantidad: 10, velFactor: 1.0,  opacidadBase: 0.90 },
        { multRadio: 0.40, cantidad: 12, velFactor: 0.85, opacidadBase: 0.85 },
        { multRadio: 0.50, cantidad: 14, velFactor: 0.70, opacidadBase: 0.80 },
        { multRadio: 0.60, cantidad: 16, velFactor: 0.58, opacidadBase: 0.75 },
        { multRadio: 0.70, cantidad: 18, velFactor: 0.45, opacidadBase: 0.68 }
    ];

    let indiceFrase = 0;
    distribucionAnillos.forEach((anillo, idxAnillo) => {
        const offsetAngulo = (idxAnillo * 0.45);
        for (let i = 0; i < anillo.cantidad; i++) {
            const angulo = ((i / anillo.cantidad) * Math.PI * 2) + offsetAngulo;
            elementos3D.push({
                texto: frases[indiceFrase % frases.length],
                anguloInicial: angulo,
                multRadio: anillo.multRadio,
                inclinacion: 0.38,
                velFactor: anillo.velFactor,
                opacidadBase: anillo.opacidadBase
            });
            indiceFrase++;
        }
    });

    let rotacionY = 0;
    let rotacionX = 0.28;
    let velY = 0.002;
    let isDragging = false;
    let lastMouseX = 0, lastMouseY = 0;

    const empezarDrag = (e) => {
        isDragging = true;
        const p = e.touches ? e.touches[0] : e;
        lastMouseX = p.clientX;
        lastMouseY = p.clientY;
    };

    const moverDrag = (e) => {
        if (!isDragging) return;
        const p = e.touches ? e.touches[0] : e;
        const deltaX = p.clientX - lastMouseX;
        const deltaY = p.clientY - lastMouseY;

        rotacionY += deltaX * 0.0035;
        rotacionX += deltaY * 0.0035;
        rotacionX = Math.max(-0.55, Math.min(0.55, rotacionX));

        lastMouseX = p.clientX;
        lastMouseY = p.clientY;
    };

    const terminarDrag = () => { isDragging = false; };

    canvas.addEventListener('mousedown', empezarDrag);
    window.addEventListener('mousemove', moverDrag);
    window.addEventListener('mouseup', terminarDrag);

    canvas.addEventListener('touchstart', empezarDrag, { passive: true });
    window.addEventListener('touchmove', moverDrag, { passive: true });
    window.addEventListener('touchend', terminarDrag);

    function render() {
        const w = canvas.width;
        const h = canvas.height;
        const dpr = window.devicePixelRatio || 1;
        const centroX = w / 2;
        const centroY = h / 2;

        const dimensionBase = Math.min(w, h);
        const radioPlaneta = dimensionBase * 0.11;

        ctx.clearRect(0, 0, w, h);

        estrellas.forEach(st => {
            st.alpha += st.parpadeo;
            if (st.alpha > 0.95 || st.alpha < 0.15) st.parpadeo *= -1;
            ctx.fillStyle = `rgba(255, 245, 210, ${st.alpha})`;
            ctx.beginPath();
            ctx.arc(st.x * w, st.y * h, st.size * dpr, 0, Math.PI * 2);
            ctx.fill();
        });

        if (!isDragging) {
            rotacionY += velY;
        }

        const renderList = [{ tipo: 'planeta', z: 0 }];
        const focalLength = dimensionBase * 0.85;

        elementos3D.forEach(el => {
            const a = el.anguloInicial + (rotacionY * el.velFactor);
            const radioActual = dimensionBase * el.multRadio;

            let x0 = Math.cos(a) * radioActual;
            let y0 = Math.sin(a) * radioActual * el.inclinacion;
            let z0 = Math.sin(a) * radioActual;

            let y1 = y0 * Math.cos(rotacionX) - z0 * Math.sin(rotacionX);
            let z1 = y0 * Math.sin(rotacionX) + z0 * Math.cos(rotacionX);

            const scale = focalLength / (focalLength + z1 + dimensionBase * 0.3);
            const xProj = centroX + x0 * scale;
            const yProj = centroY + y1 * scale;
            const alphaProfundidad = Math.max(0.15, Math.min(1, (z1 + dimensionBase * 0.45) / (dimensionBase * 0.65)));

            renderList.push({
                tipo: 'texto',
                texto: el.texto,
                x: xProj,
                y: yProj,
                z: z1,
                scale: scale,
                alpha: alphaProfundidad * el.opacidadBase,
                multRadio: el.multRadio
            });
        });

        renderList.sort((a, b) => a.z - b.z);

        renderList.forEach(item => {
            if (item.tipo === 'planeta') {
                dibujarPlaneta(ctx, centroX, centroY, radioPlaneta, dimensionBase);
            } else if (item.tipo === 'texto') {
                dibujarTexto(ctx, item, dimensionBase);
            }
        });

        requestAnimationFrame(render);
    }

    function dibujarPlaneta(ctx, cx, cy, r, base) {
        ctx.save();
        const aura = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 2.6);
        aura.addColorStop(0, 'rgba(255, 215, 0, 0.40)');
        aura.addColorStop(0.4, 'rgba(212, 90, 15, 0.15)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 2.6, 0, Math.PI * 2);
        ctx.fill();

        const grad = ctx.createRadialGradient(
            cx - r * 0.35, cy - r * 0.35, r * 0.08,
            cx, cy, r
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, '#fff2a3');
        grad.addColorStop(0.5, '#ffd700');
        grad.addColorStop(0.78, '#b86105');
        grad.addColorStop(0.95, '#3d1202');
        grad.addColorStop(1, '#080100');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        [0.30, 0.50, 0.70].forEach(mult => {
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cx, cy, base * mult, base * mult * 0.38, rotacionX, 0, Math.PI * 2);
            ctx.stroke();
        });

        ctx.restore();
    }

    function dibujarTexto(ctx, item, base) {
        ctx.save();
        ctx.globalAlpha = item.alpha;
        const factorTamano = Math.max(0.016, 0.024 - (item.multRadio * 0.008));
        const fontSize = Math.max(11, base * factorTamano * item.scale);

        ctx.font = `italic 600 ${fontSize}px 'Cormorant Garamond', serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(255, 215, 0, 0.85)';
        ctx.shadowBlur = 8 * item.scale;
        ctx.fillStyle = '#fff6d6';
        ctx.fillText(item.texto, item.x, item.y);
        ctx.restore();
    }

    render();
}