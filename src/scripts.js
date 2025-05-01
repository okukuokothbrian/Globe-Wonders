document.addEventListener('DOMContentLoaded', function () {
    const page = window.location.pathname.split('/').pop();
  
    if (page === 'form.html') {
        const bookingForm = document.getElementById('bookingForm');
        const bookingsTable = document.getElementById('bookingsTable').querySelector('tbody');

        function saveToLocalStorage(data) {
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(data);
            localStorage.setItem('bookings', JSON.stringify(bookings));
        }

        function loadFromLocalStorage() {
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.forEach((booking, index) => {
                const row = bookingsTable.insertRow();

                row.insertCell(0).textContent = booking.fullname;
                row.insertCell(1).textContent = booking.email;
                row.insertCell(2).textContent = booking.phone;
                row.insertCell(3).textContent = booking.destination;
                row.insertCell(4).textContent = booking.date;

                const deleteCell = row.insertCell(5);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.backgroundColor = '#e74c3c';
                deleteButton.style.color = '#fff';
                deleteButton.style.border = 'none';
                deleteButton.style.padding = '5px 10px';
                deleteButton.style.borderRadius = '4px';
                deleteButton.style.cursor = 'pointer';

                deleteButton.addEventListener('click', function () {
                    bookings.splice(index, 1);
                    localStorage.setItem('bookings', JSON.stringify(bookings));
                    row.remove();
                });

                deleteCell.appendChild(deleteButton);
            });
        }

        if (bookingForm && bookingsTable) {
            loadFromLocalStorage();

            bookingForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const fullname = document.getElementById('fullname').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const destination = document.getElementById('destination').value.trim();
                const date = document.getElementById('date').value.trim();

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                const newBooking = { fullname, email, phone, destination, date };
                saveToLocalStorage(newBooking);
                location.reload();
            });
        }
    }
});






