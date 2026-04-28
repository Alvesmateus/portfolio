const stacks = document.querySelectorAll('.stack-container');

// Observer to handle play/pause when the stack enters/leaves the viewport
const stackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const stack = entry.target;
        // The active card is the one with pointerEvents set to auto
        const activeCard = Array.from(stack.querySelectorAll('.stack-card')).find(c => c.style.pointerEvents === 'auto' || c.style.zIndex == stack.querySelectorAll('.stack-card').length);
        if (activeCard) {
            const media = activeCard.querySelector('video');
            if (media) {
                if (entry.isIntersecting) {
                    media.play().catch(e => {});
                } else {
                    media.pause();
                }
            }
        }
    });
}, { threshold: 0.1 });

stacks.forEach(stack => {
    stackObserver.observe(stack);
    
    let cards = Array.from(stack.querySelectorAll('.stack-card'));
    let isAnimating = false;

    stack.addEventListener('click', (e) => {
        if (isAnimating || cards.length <= 1) return;
        isAnimating = true;

        const topCard = cards[0];
        
        // Animação de saída para a esquerda
        topCard.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), opacity 0.4s ease';
        topCard.style.transform = 'translateX(-120%) rotate(-10deg)';
        topCard.style.opacity = '0';

        setTimeout(() => {
            // Move o card para o final do array
            const shiftedCard = cards.shift();
            cards.push(shiftedCard);
            
            // Retira a transição para colocar o card invisível no lado direito, embaixo da pilha
            shiftedCard.style.transition = 'none';
            
            // Reposiciona para vir da direita e ficar no fim (escondido)
            const maxVisible = 3;
            const hiddenIndex = maxVisible - 1;
            
            shiftedCard.style.transform = `translateX(50%) translateY(${hiddenIndex * 20}px) scale(${1 - hiddenIndex * 0.05})`;
            shiftedCard.style.opacity = "0";

            // Aguarda um pequeno intervalo para o navegador aplicar a posição sem transição
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    updateStack(stack, cards);
                    isAnimating = false;
                });
            });
        }, 400); // tempo bate com o da transição
    });

    function updateStack(currentStack, currentCards) {
        const maxVisible = 3;
        
        currentCards.forEach((card, index) => {
            card.style.zIndex = currentCards.length - index;
            
            // Restaura a transição para todos para fluidez no movimento da fila
            card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), opacity 0.4s ease, background 0.3s ease';
            
            if (index < maxVisible) {
                card.style.transform = `translateX(0) translateY(${index * 20}px) scale(${1 - index * 0.05})`;
                card.style.opacity = "1";
                card.style.visibility = "visible";
            } else {
                card.style.transform = `translateX(0) translateY(${(maxVisible - 1) * 20}px) scale(${1 - (maxVisible - 1) * 0.05})`;
                card.style.opacity = "0";
                card.style.visibility = "hidden";
            }
            
            const media = card.querySelector('iframe, img, video');
            if (index === 0) {
                card.style.pointerEvents = "auto";
                if (media) {
                    media.style.pointerEvents = "none"; // Desativa pointer events da media para o card inteiro ser clicável
                    if (media.tagName === 'VIDEO') {
                        const rect = currentStack.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            media.play().catch(e => {});
                        }
                    }
                }
            } else {
                card.style.pointerEvents = "none";
                if (media) {
                    media.style.pointerEvents = "none";
                    if (media.tagName === 'VIDEO') {
                        media.pause();
                        media.currentTime = 0; // Reset video to start
                    }
                }
            }
        });
    }

    updateStack(stack, cards);
});

function toggleClient(card, event) {
    if (event.target.closest('a')) return;
    card.classList.toggle('active');
}

// Create particle effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 80;

if (particlesContainer) {
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Initial position
    resetParticle(particle);
    
    particlesContainer.appendChild(particle);
    
    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    
    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);
    
    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Animate with GSAP-like timing
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Move in a slight direction
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; // Move upwards
        
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        
        // Reset after animation completes
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    if (!particlesContainer) return;
    
    // Create particles at mouse position
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;
    
    // Create temporary particle
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Small size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position at mouse
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';
    
    particlesContainer.appendChild(particle);
    
    // Animate outward
    setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }, 10);
    
    // Subtle movement of gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    
    spheres.forEach(sphere => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});