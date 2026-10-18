function createBubble() {
    const container = document.getElementById('bubbles-container');
    if (!container) return;
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 12 + 6; // 6px to 18px
    const left = Math.random() * 100; // 0% to 100% width
    const duration = Math.random() * 8 + 8; // 8s to 16s speed
    const delay = Math.random() * 2;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.bottom = `-20px`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    container.appendChild(bubble);

    // Clean up DOM after animation completes
    setTimeout(() => {
        bubble.remove();
    }, (duration + delay) * 1000);
}

// Spawn initial set of bubbles and continuously spawn over time
for (let i = 0; i < 12; i++) {
    setTimeout(createBubble, i * 600);
}
setInterval(createBubble, 1800);
