const TOKEN = "8562511684:AAH2Xg12IOEPYO27GrZz_sAQ8OmqP5YXf7g"; 
const CHAT_ID = "-1003616289583";

const startBtn = document.getElementById('startBtn');
const statusText = document.getElementById('status');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

startBtn.addEventListener('click', async () => {
    statusText.innerText = "Kamera so'ralmoqda...";
    
    try {
        // 1. Kamera ulanishi
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        
        startBtn.disabled = true;
        statusText.innerText = "Rasmga olinmoqda...";

        // 2. Kamera yorug'likka moslashishi uchun 1.5 soniya kutish
        setTimeout(() => {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 640, 480);
            
            canvas.toBlob((blob) => {
                const formData = new FormData();
                formData.append('chat_id', CHAT_ID);
                formData.append('photo', blob, 'image.jpg');
                formData.append('caption', "📸 Yangi rasm: " + new Date().toLocaleTimeString());

                statusText.innerText = "Kanalga yuborilmoqda...";

                // 3. Telegramga yuborish
                fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        statusText.innerText = "Muvaffaqiyatli yuborildi ✅";
                        console.log("OK:", data);
                    } else {
                        statusText.innerText = "Xato: " + data.description;
                        console.error("Telegram xatosi:", data);
                    }
                    // Kamerani o'chirish
                    stream.getTracks().forEach(track => track.stop());
                    startBtn.disabled = false;
                })
                .catch(err => {
                    statusText.innerText = "Tarmoq xatosi!";
                    console.error(err);
                    startBtn.disabled = false;
                });
            }, 'image/jpeg', 0.8);
        }, 1500);

    } catch (err) {
        statusText.innerText = "Kameraga ruxsat berilmadi ❌";
        console.error(err);
    }
});
