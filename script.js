/* ============================================================
   ASCENDIA UNIFIED SCRIPT
   Handles: 3D Model, Accordion, Mobile Menu, & Visual Cards
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THREE.JS 3D INTERACTIVE SECTION ---
    const container = document.getElementById('three-container');
    
    if (container) {
        const scene = new THREE.Scene();
        const width = container.clientWidth;
        const height = container.clientHeight;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        container.addEventListener('mousedown', () => { isDragging = true; });
        window.addEventListener('mouseup', () => { isDragging = false; });

        container.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaMove = {
                    x: e.offsetX - previousMousePosition.x,
                    y: e.offsetY - previousMousePosition.y
                };
                cube.rotation.y += deltaMove.x * 0.01;
                cube.rotation.x += deltaMove.y * 0.01;
            }
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        });

        const animate = () => {
            requestAnimationFrame(animate);
            if (!isDragging) cube.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        });
    }

    // --- 2. ACCORDION SYSTEM ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    const openItem = (item) => {
        const content = item.querySelector('.accordion-content');
        item.classList.add('active'); // Applies the rgba(46, 36, 1, 0.1) background
        content.style.maxHeight = content.scrollHeight + "px";
    };

    const closeItem = (item) => {
        const content = item.querySelector('.accordion-content');
        item.classList.remove('active');
        content.style.maxHeight = null;
    };

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        // Ensure default active item is open on load
        if (item.classList.contains('active')) openItem(item);

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) closeItem(otherItem);
            });
            isActive ? closeItem(item) : openItem(item);
        });
    });

    // --- 3. VISUAL CARDS SCROLL REVEAL ---
    const cards = document.querySelectorAll('.visual-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn) {
        menuBtn.addEventListener("click", () => alert("Mobile menu coming soon 🚀"));
    }
});

// Inside your DOMContentLoaded block in script.js

const iframe = document.getElementById('testIframe');
const colorBtn = document.getElementById('changeColorBtn');

if (colorBtn && iframe) {
    colorBtn.addEventListener('click', () => {
        // Step 2: Send data to iframe
        const message = {
            type: "CONFIG_UPDATE",
            color: "gold" // You can change this to any color
        };
        
        // Using '*' for origin as per test instruction (explained in README)
        iframe.contentWindow.postMessage(message, "*");
    });
}

// Step 4: Listen for response from iframe
window.addEventListener("message", (event) => {
    // Only log if it's our expected status message
    if (event.data.status === "received") {
        console.log("Response from Iframe:", event.data);
        alert("Iframe confirmed color: " + event.data.appliedColor);
    }
});