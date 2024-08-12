function updateCountdown() {
    const now = new Date().getTime();
    const targetDate = new Date('August 20, 2024 00:00:00').getTime();
    const timeDifference = targetDate - now;

    // Time calculations
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update and flip each countdown block
    flipBlock('months', months);
    flipBlock('weeks', weeks);
    flipBlock('days', days);
    flipBlock('hours', hours);
    flipBlock('minutes', minutes);
    flipBlock('seconds', seconds);

    // Update the countdown every second
    setTimeout(updateCountdown, 1000);
}

function flipBlock(id, newValue) {
    var block = document.getElementById(id);
    var frontFace = block.querySelector('.front span');
    var backFace = block.querySelector('.back span');

    if (frontFace.textContent != newValue) {
        backFace.textContent = newValue;
        block.classList.add('flip');

        setTimeout(function() {
            frontFace.textContent = newValue;
            block.classList.remove('flip');
        }, 600); // Duration of the flip animation
    }
}

// Initialize the countdown when the page loads
document.addEventListener('DOMContentLoaded', updateCountdown);