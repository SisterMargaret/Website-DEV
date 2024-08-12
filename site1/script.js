document.addEventListener("DOMContentLoaded", function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('animation-wrapper').appendChild(renderer.domElement);

    const colors = [0x005288, 0x0077CC, 0x009BDF, 0x00BFF3]; // Different shades of blue
    const cubes = [];
    const positions = [
        {x: -50, y: 50, z: 0}, // Upper left
        {x: 50, y: 50, z: 0},  // Upper right
        {x: -50, y: -50, z: 0}, // Lower left
        {x: 50, y: -50, z: 0}   // Lower right
    ];

    positions.forEach((pos, idx) => {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: colors[idx % colors.length], transparent: true, opacity: 1 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(pos.x, pos.y, pos.z);
        scene.add(cube);
        cubes.push(cube);

        // Animate cubes moving to the center, scaling up, and rotating
        const moveTween = new TWEEN.Tween(cube.position)
            .to({ x: 0, y: 0, z: 0 }, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut);

        const scaleTween = new TWEEN.Tween(cube.scale)
            .to({ x: 5, y: 5, z: 5 }, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut);

        const rotateTween = new TWEEN.Tween(cube.rotation)
            .to({ x: Math.PI * 2, y: Math.PI * 2, z: Math.PI * 2 }, 2000) // Rotate 360 degrees
            .easing(TWEEN.Easing.Quadratic.InOut);

        moveTween.start();
        scaleTween.start();
        rotateTween.start();

        moveTween.chain(scaleTween, rotateTween);
    });

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
        createText(font);
    });

    function createText(font) {
        const text = "REINV8";
        const spacing = 2; // Additional spacing between letters
        let totalWidth = 0;
        const letterDetails = [];

        // Calculate total width of the text including spacing
        for (let i = 0; i < text.length; i++) {
            const letter = text[i];
            const textGeometry = new THREE.TextGeometry(letter, {
                font: font,
                size: 8,
                height: 2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.5,
                bevelSize: 0.25,
                bevelOffset: 0,
                bevelSegments: 5
            });
            textGeometry.computeBoundingBox();
            const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            letterDetails.push({ geometry: textGeometry, width: textWidth });
            totalWidth += textWidth + (i < text.length - 1 ? spacing : 0); // Add spacing between letters, but not after the last one
        }

        let currentX = -totalWidth / 2; // Start position for centered text
        letterDetails.forEach((detail, idx) => {
            const textMaterial = new THREE.MeshBasicMaterial({ color: colors[idx % colors.length] });
            const textMesh = new THREE.Mesh(detail.geometry, textMaterial);
            textMesh.position.set(currentX, 0, 0);
            scene.add(textMesh);
            textMesh.scale.set(0.1, 0.1, 0.1); // Start small

            currentX += detail.width + spacing; // Move to the position for the next letter

            // Animate each letter to appear sequentially
            new TWEEN.Tween(textMesh.scale)
                .to({ x: 1, y: 1, z: 1 }, 500)
                .delay(2000 + idx * 300) // Wait until cubes have formed
                .easing(TWEEN.Easing.Elastic.Out)
                .start();

            // Animate color blending for each letter
            new TWEEN.Tween(textMesh.material.color)
                .to({ r: 1, g: 1, b: 1 }, 2000) // Blend to white
                .delay(4000 + idx * 300) // Delay after cube fade out
                .start();
        });

        // Fade out cubes after forming the text base
        cubes.forEach(cube => {
            new TWEEN.Tween(cube.material)
                .to({ opacity: 0 }, 2000)
                .delay(2000) // Delay after text start appearing
                .onComplete(() => cube.visible = false) // Hide completely when done
                .start();
        });

        // Move the "REINV8" title up the screen
        setTimeout(() => {
            new TWEEN.Tween(scene.position)
                .to({ y: 100 }, 3000)
                .start();
        }, 7000);
    }

    // Add the title "REINV8" below the navigation menu
    setTimeout(() => {
        const titleElement = document.createElement('div');
        titleElement.textContent = 'REINV8';
        titleElement.style.position = 'fixed';
        titleElement.style.top = '50px'; // Adjust as needed
        titleElement.style.left = '50%';
        titleElement.style.transform = 'translateX(-50%)';
        titleElement.style.fontSize = '48px'; // Adjust font size as needed
        titleElement.style.fontWeight = 'bold'; // Make the text bold
        titleElement.style.letterSpacing = '2px'; // Add spacing between letters
        document.body.appendChild(titleElement);

        // Define the colors to blend
        const blendColors = ['#005288', '#0077CC', '#808080', '#FFFFFF', '#808080', '#0077CC']; // Dark blue, light blue, grey, white, grey, light blue
        const letters = titleElement.textContent.split('');

        // Function to animate color blending for each letter
        function animateColor(index) {
            const currentLetter = letters[index];
            const currentColor = blendColors[index % blendColors.length];
            const nextIndex = (index + 1) % letters.length;
            const nextLetter = letters[nextIndex];
            const nextColor = blendColors[nextIndex % blendColors.length];

            new TWEEN.Tween({ color: { r: parseInt(currentColor.slice(1, 3), 16) / 255, g: parseInt(currentColor.slice(3, 5), 16) / 255, b: parseInt(currentColor.slice(5), 16) / 255 } })
                .to({ color: { r: parseInt(nextColor.slice(1, 3), 16) / 255, g: parseInt(nextColor.slice(3, 5), 16) / 255, b: parseInt(nextColor.slice(5), 16) / 255 } }, 2000)
                .onUpdate(function() {
                    titleElement.style.color = `rgb(${Math.round(this.color.r * 255)}, ${Math.round(this.color.g * 255)}, ${Math.round(this.color.b * 255)})`;
                })
                .easing(TWEEN.Easing.Linear.None)
                .start();
        }

        // Start the color animation for the first letter
        animateColor(0);
    }, 7800); // Adjust delay as needed

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update(); // Update animations
        renderer.render(scene, camera);
    }
    animate();
});
