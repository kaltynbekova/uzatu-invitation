// Initialize Animations
AOS.init({
    duration: 1000,
    once: false
});

// Music Toggle Logic
const music = document.getElementById('bgMusic');
const btn = document.getElementById('musicToggle');

btn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸ Pause Music";
    } else {
        music.pause();
        btn.innerHTML = "🎵 Play Music";
    }
});


const form = document.getElementById('rsvp');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('messageDiv')
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Орындалуда...';

    const name = document.getElementById('rsvpName').value.trim();
    const selectedRadio = document.querySelector('input[name="entry.247905857"]:checked');

    if (!selectedRadio) {
        messageDiv.className = 'error';
        messageDiv.textContent = '❌ Жауапты таңдаңыз!';
        messageDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Жіберу';
        return;
    }

    const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfRZzzGqk6MWqovR4sEwH2D6_HPX5C65ofx5DFJh8kwZkYt9w/formResponse';

    const formData = new FormData();
    formData.append('entry.253765556', name);
    formData.append('entry.247905857', selectedRadio.value);

    currentLang = currentLang === 'kk' ? 'en' : 'kk';
    try {
        await fetch(formURL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        // Assume success (because we can't verify)
        messageDiv.className = 'success';
        if (currentLang === 'en') {
            messageDiv.textContent = 'Thank you for your response❤️';
        }else{
            messageDiv.textContent = 'Жауабыңызға рахмет❤️';
        }
                
        messageDiv.style.display = 'block';

        form.reset();

    } catch (error) {
        // This will ONLY trigger on network failure
        messageDiv.className = 'error';
        if (currentLang === 'en') {
            messageDiv.textContent = '❌ Қате болды, WhatsApp +7777 7287195 арқылы хабарласыңыз';
        }else{
            messageDiv.textContent = '❌ There was an error, please contact us via WhatsApp +7777 7287195';

        }
        messageDiv.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Жіберу';
    }
});

let currentLang = 'kk';

function switchLanguage() {
    const toggleBtn = document.getElementById('langToggle');
    const nameInput = document.getElementById('rsvpName');
    
    // Toggle active language state
    currentLang = currentLang === 'kk' ? 'en' : 'kk';
    
    // 1. Update text content for elements with data attributes
    const elements = document.querySelectorAll('[data-kk][data-en]');
    elements.forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentLang}`);
    });

    // 2. Handle unique attributes like placeholders
    if (currentLang === 'en') {
        nameInput.placeholder = "Your Name";
        toggleBtn.innerHTML = "🇰🇿 KK";
        document.documentElement.lang = 'en';
    } else {
        nameInput.placeholder = "Есіміңіз";
        toggleBtn.innerHTML = "🇬🇧 EN";
        document.documentElement.lang = 'kk';
    }
}