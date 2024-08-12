document.addEventListener("DOMContentLoaded", function() {
    const blendColors = ['#005288', '#0077CC', '#808080', '#FFFFFF', '#808080', '#0077CC']; // Dark blue, light blue, grey, white, grey, light blue
    const titleElement = document.querySelector('h1.welcome-message');

    function animateColor(index) {
        const currentColor = blendColors[index % blendColors.length];
        const nextIndex = (index + 1) % blendColors.length;
        const nextColor = blendColors[nextIndex];

        new TWEEN.Tween({ color: currentColor })
            .to({ color: nextColor }, 2000)
            .onUpdate(function() {
                titleElement.style.color = this.color;
            })
            .easing(TWEEN.Easing.Linear.None)
            .start()
            .onComplete(() => animateColor(nextIndex)); // Recursively call the function for continuous animation
    }

    function startColorAnimation() {
        animateColor(0); // Start the animation
    }

    startColorAnimation(); // Call the function to start the color animation
});
