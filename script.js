const btn = document.getElementById("calculateBtn");
const birthDateInput = document.getElementById("birthday");
const resultContainer = document.getElementById("result-container");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const totalDaysEl = document.getElementById("total-days");

let updateInterval = null;

function calculateAge(birthDate) {
    const birthdayValue = birthDate.value;

    if (birthdayValue === "") {
        alert("Please enter your birthday. 🎂");
        return;
    }

    const birth = new Date(birthdayValue);
    const today = new Date();

    // Check if birth date is in the future
    if (birth > today) {
        alert("You can't be born in the future! 😄");
        return;
    }

    // Clear previous interval if exists
    if (updateInterval) {
        clearInterval(updateInterval);
    }

    // Show result container with animation
    resultContainer.classList.remove("hidden");

    // Calculate and display age
    updateAge(birth, today);

    // Update every second for live countdown
    updateInterval = setInterval(() => {
        updateAge(birth, new Date());
    }, 1000);

    // Add confetti effect
    createConfetti();
}

function updateAge(birth, today) {
    // Calculate years
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total days
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

    // Calculate hours, minutes, seconds
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    // Animate numbers
    animateValue(yearsEl, parseInt(yearsEl.textContent) || 0, years, 1000);
    animateValue(monthsEl, parseInt(monthsEl.textContent) || 0, months, 1000);
    animateValue(daysEl, parseInt(daysEl.textContent) || 0, days, 1000);
    animateValue(hoursEl, parseInt(hoursEl.textContent) || 0, hours, 1000);
    animateValue(minutesEl, parseInt(minutesEl.textContent) || 0, minutes, 1000);
    animateValue(secondsEl, parseInt(secondsEl.textContent) || 0, seconds, 1000);
    animateValue(totalDaysEl, parseInt(totalDaysEl.textContent) || 0, totalDays, 1000);
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = Math.floor(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '0.8';
        
        document.body.appendChild(confetti);

        const animationDuration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;

        confetti.style.transition = `all ${animationDuration}s ease-out`;
        confetti.style.transform = `translate(${horizontalMovement}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = '0';

        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
}

btn.addEventListener("click", function () {
    calculateAge(birthDateInput);
});

// Allow Enter key to calculate
birthDateInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calculateAge(birthDateInput);
    }
});
