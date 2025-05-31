// script.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Pembuatan Bintang ---
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        const numStars = 250; 
        for (let i = 0; i < numStars; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            let size = Math.random() * 2.2 + 0.3; 
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDuration = (Math.random() * 5 + 1.5) + 's'; 
            star.style.animationDelay = Math.random() * 5 + 's';
            starsContainer.appendChild(star);
        }
    }

    // --- Update Tahun di Footer ---
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Interaksi Objek Langit ---
    const celestialBodies = document.querySelectorAll('.celestial-body'); 
    const celestialInfoBox = document.getElementById('celestial-info-box'); // ID diubah di HTML
    let infoBoxTimeout; 

    celestialBodies.forEach(body => {
        body.addEventListener('click', function(event) {
            event.stopPropagation(); 

            const info = this.dataset.info || "Objek angkasa yang menakjubkan!";
            if (celestialInfoBox) {
                celestialInfoBox.textContent = info;
                celestialInfoBox.classList.add('visible');
            }
            
            // Hapus dari yang lain, tambahkan ke yang ini
            celestialBodies.forEach(cb => cb.classList.remove('clicked-effect'));
            this.classList.add('clicked-effect');
            
            // Set CSS Variable untuk durasi spin asli (jika diperlukan untuk pulse yang lebih smooth)
            // Ini contoh, mungkin perlu disesuaikan lebih lanjut jika ingin mempertahankan rotasi saat pulse
            const originalDuration = getComputedStyle(this).getPropertyValue('--original-spin-duration') || '20s';
            this.style.setProperty('--pulse-then-spin-duration', originalDuration);


            // Hapus efek 'clicked-effect' setelah animasi pulse selesai agar tidak mengganggu axial-spin utama
            // Atau biarkan CSS menangani dengan animation-fill-mode: forwards pada pulse dan reset pada axial-spin
            // Untuk kesederhanaan, biarkan CSS yang mengatur reset animasi
            // setTimeout(() => { 
            //     this.classList.remove('clicked-effect');
            // }, 500); // Durasi pulse-effect

            clearTimeout(infoBoxTimeout); 
            infoBoxTimeout = setTimeout(() => {
                if (celestialInfoBox) {
                    celestialInfoBox.classList.remove('visible');
                }
            }, 7000); 
        });
    });
    
    document.addEventListener('click', function() {
        if (celestialInfoBox && celestialInfoBox.classList.contains('visible')) {
             celestialInfoBox.classList.remove('visible');
        }
    });

    if(celestialInfoBox){
        celestialInfoBox.addEventListener('click', function(event){
            event.stopPropagation(); 
        });
    }

    // --- Penanganan Formulir Masukan ---
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackStatus = document.getElementById('feedback-status');
    const feedbackList = document.getElementById('feedback-list'); 
    const noFeedbackMessage = document.getElementById('no-feedback-message');

    function escapeHTML(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nameInput = document.getElementById('feedback-name');
            const emailInput = document.getElementById('feedback-email'); 
            const messageInput = document.getElementById('feedback-message');
            
            const name = nameInput ? nameInput.value.trim() : 'Anonim';
            const email = emailInput ? emailInput.value.trim() : ''; 
            const message = messageInput ? messageInput.value.trim() : '';

            if (name === '' || message === '') {
                if(feedbackStatus){
                    feedbackStatus.textContent = 'Nama dan Pesan tidak boleh kosong!';
                    feedbackStatus.className = 'feedback-status-message error';
                }
                setTimeout(() => {
                    if(feedbackStatus) {
                        feedbackStatus.textContent = '';
                        feedbackStatus.className = 'feedback-status-message';
                    }
                }, 3000);
                return;
            }
            
            if(feedbackStatus){
                feedbackStatus.textContent = 'Terima kasih, ' + escapeHTML(name) + '! Pesan Anda telah ditambahkan.';
                feedbackStatus.className = 'feedback-status-message success';
            }
            
            if (feedbackList) {
                const listItem = document.createElement('li');
                let emailDisplay = '';
                if (email) { 
                    emailDisplay = `<span class="feedback-email-display">(${escapeHTML(email)})</span>`;
                }
                listItem.innerHTML = `<strong>${escapeHTML(name)}</strong> ${emailDisplay}
                                      <p class="feedback-text-message">${escapeHTML(message)}</p>`;
                feedbackList.prepend(listItem); 
                if (noFeedbackMessage) {
                    noFeedbackMessage.style.display = 'none';
                }
            }
            feedbackForm.reset(); 
            setTimeout(() => {
                if(feedbackStatus){
                    feedbackStatus.textContent = '';
                    feedbackStatus.className = 'feedback-status-message'; 
                }
            }, 5000); 
        });
    }
});