// script.js
document.addEventListener('DOMContentLoaded', function () {
    const bookButtons = document.querySelectorAll('.book-btn');
    const roomInput = document.getElementById('roomType');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const form = document.getElementById('bookingForm');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // When any "Book Now" button is clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedRoom = this.getAttribute('data-room');
            roomInput.value = selectedRoom;

            // Smooth scroll to booking form
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Highlight the room field
            roomInput.style.backgroundColor = '#fff3e0';
            setTimeout(() => {
                roomInput.style.backgroundColor = '#f0f0f0';
            }, 2000);
        });
    });

    // Date logic: Set min dates
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    checkInInput.addEventListener('change', function () {
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(checkInDate.getDate() + 1);
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // If check-out is before new check-in, reset it
        if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
            checkOutInput.value = '';
        }
    });

    // Form validation before submit
    form.addEventListener('submit', function (e) {
        errorMessage.style.display = 'none';
        let valid = true;

        // Check dates
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);
        if (checkInDate >= checkOutDate) {
            valid = false;
            errorMessage.textContent = 'Check-out date must be after check-in date.';
        } else if (checkInDate < new Date(today)) {
            valid = false;
            errorMessage.textContent = 'Check-in date cannot be in the past.';
        }

        if (!valid) {
            e.preventDefault();
            errorMessage.style.display = 'block';
            return;
        }

        // Show success message (Formspree will handle redirect if needed)
        setTimeout(() => {
            successMessage.style.display = 'block';
        }, 500);
    });
});