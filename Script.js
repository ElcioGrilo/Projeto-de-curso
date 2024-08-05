document.addEventListener('DOMContentLoaded', () => {
    const zoomToggleButton = document.getElementById('zoom-toggle-button');
    const zoomInButton = document.getElementById('zoom-in-button');
    const zoomOutButton = document.getElementById('zoom-out-button');
    const mainImage = document.getElementById('main-image');
    const zoomLens = document.getElementById('zoom-lens');
    const zoomResult = document.getElementById('zoom-result');
    let isZoomEnabled = false;
    let zoomFactor = 1;

    zoomToggleButton.addEventListener('click', () => {
        isZoomEnabled = !isZoomEnabled;
        zoomLens.style.display = isZoomEnabled ? 'block' : 'none';
        zoomResult.style.display = isZoomEnabled ? 'block' : 'none';
        zoomToggleButton.textContent = isZoomEnabled ? '🔍' : '🔎';
        if (isZoomEnabled) {
            updateZoom();
        }
    });

    zoomInButton.addEventListener('click', () => {
        zoomFactor = Math.min(zoomFactor + 0.5, 5); // Limite o zoom máximo a 5x
        updateZoom();
    });

    zoomOutButton.addEventListener('click', () => {
        zoomFactor = Math.max(zoomFactor - 0.5, 1); // Limite o zoom mínimo a 1x
        updateZoom();
    });

    mainImage.addEventListener('mousemove', (e) => {
        if (!isZoomEnabled) return;
        moveLens(e);
    });

    function moveLens(e) {
        const rect = mainImage.getBoundingClientRect();
        const lensWidth = zoomLens.offsetWidth / zoomFactor;
        const lensHeight = zoomLens.offsetHeight / zoomFactor;

        let x = e.clientX - rect.left - (lensWidth / 2);
        let y = e.clientY - rect.top - (lensHeight / 2);

        if (x > rect.width - lensWidth) x = rect.width - lensWidth;
        if (x < 0) x = 0;
        if (y > rect.height - lensHeight) y = rect.height - lensHeight;
        if (y < 0) y = 0;

        zoomLens.style.left = x + '%';
        zoomLens.style.top = y + '%';

        const fx = zoomResult.offsetWidth / lensWidth;
        const fy = zoomResult.offsetHeight / lensHeight;

        zoomResult.style.backgroundPosition = `-${x * fx}px -${y * fy}px`;
    }

    function updateZoom() {
        const fx = zoomResult.offsetWidth / (zoomLens.offsetWidth / zoomFactor);
        const fy = zoomResult.offsetHeight / (zoomLens.offsetHeight / zoomFactor);

        zoomResult.style.backgroundSize = `${mainImage.width * fx}px ${mainImage.height * fy}px`;
    }

    zoomResult.style.backgroundImage = `url('${mainImage.src}')`;
    updateZoom();
});
