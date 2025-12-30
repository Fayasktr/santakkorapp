// Snow Effect Logic
function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const size = Math.random() * 5 + 2 + 'px';
    snowflake.style.width = size;
    snowflake.style.height = size;
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();

    snowContainer.appendChild(snowflake);

    // Initial fall
    let pos = -10;
    const fallInterval = setInterval(() => {
        pos += 2;
        snowflake.style.top = pos + 'px';
        if (pos > window.innerHeight) {
            clearInterval(fallInterval);
            snowflake.remove();
        }
    }, 20);
}

setInterval(createSnowflake, 100);

// Global Socket initialization
const socket = io();
