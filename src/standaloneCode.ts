// Standalone HTML source codes for direct export and copy-paste (Minimal Clean Theme)

export const SURVEY_HTML_SOURCE = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>แบบประเมินความพึงพอใจการอบรม</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"><\/script>
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"><\/script>
  <style>
    body { font-family: 'Prompt', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen py-6 px-3 sm:px-4 flex justify-center">

  <div class="w-full max-w-lg">
    <!-- Header -->
    <div class="bg-white border border-slate-200 rounded-2xl p-5 mb-4 shadow-sm">
      <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
        แบบประเมินความพึงพอใจ
      </span>
      <h1 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        การอบรมเชิงปฏิบัติการ: การประยุกต์ใช้ AI ในการทำงานยุคใหม่
      </h1>
      <p class="text-xs text-slate-500 mt-1">
        โปรดให้คะแนนตามความเป็นจริงเพื่อนำไปพัฒนาการจัดอบรมในครั้งต่อไป
      </p>

      <div class="mt-4 pt-3 border-t border-slate-100">
        <div class="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
          <span>ความคืบหน้าการตอบ</span>
          <span id="progressText" class="font-mono text-slate-900">0 จาก 5 ข้อ</span>
        </div>
        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div id="progressBar" class="h-full bg-slate-900 rounded-full transition-all duration-300" style="width: 0%"></div>
        </div>
      </div>
    </div>

    <div id="errorAlert" class="hidden mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
      ⚠️ กรุณาตอบแบบประเมินให้ครบทั้ง 5 ข้อก่อนกดส่งข้อมูล
    </div>

    <form id="surveyForm" class="space-y-3.5">
      <!-- Question 1 -->
      <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 question-card shadow-sm" data-qid="1">
        <div class="flex items-start gap-2.5 mb-2.5">
          <span class="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">1</span>
          <div>
            <span class="text-[11px] font-medium text-slate-400 block">ด้านวิทยากร</span>
            <h3 class="text-sm font-semibold text-slate-900">ความรู้ความเชี่ยวชาญ และความสามารถในการถ่ายทอดของวิทยากร</h3>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-1.5 rating-group" data-qid="1">
          <button type="button" data-score="1" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">❌</span><span class="text-xs font-bold font-mono">1</span><span class="text-[9px] text-slate-500">น้อยที่สุด</span></button>
          <button type="button" data-score="2" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">⚠️</span><span class="text-xs font-bold font-mono">2</span><span class="text-[9px] text-slate-500">น้อย</span></button>
          <button type="button" data-score="3" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👌</span><span class="text-xs font-bold font-mono">3</span><span class="text-[9px] text-slate-500">ปานกลาง</span></button>
          <button type="button" data-score="4" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👍</span><span class="text-xs font-bold font-mono">4</span><span class="text-[9px] text-slate-500">มาก</span></button>
          <button type="button" data-score="5" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">🌟</span><span class="text-xs font-bold font-mono">5</span><span class="text-[9px] text-slate-500">มากที่สุด</span></button>
        </div>
      </div>

      <!-- Question 2 -->
      <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 question-card shadow-sm" data-qid="2">
        <div class="flex items-start gap-2.5 mb-2.5">
          <span class="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">2</span>
          <div>
            <span class="text-[11px] font-medium text-slate-400 block">ด้านเนื้อหา</span>
            <h3 class="text-sm font-semibold text-slate-900">ความชัดเจน ความทันสมัย และประโยชน์ของเนื้อหาหลักสูตร</h3>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-1.5 rating-group" data-qid="2">
          <button type="button" data-score="1" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">❌</span><span class="text-xs font-bold font-mono">1</span><span class="text-[9px] text-slate-500">น้อยที่สุด</span></button>
          <button type="button" data-score="2" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">⚠️</span><span class="text-xs font-bold font-mono">2</span><span class="text-[9px] text-slate-500">น้อย</span></button>
          <button type="button" data-score="3" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👌</span><span class="text-xs font-bold font-mono">3</span><span class="text-[9px] text-slate-500">ปานกลาง</span></button>
          <button type="button" data-score="4" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👍</span><span class="text-xs font-bold font-mono">4</span><span class="text-[9px] text-slate-500">มาก</span></button>
          <button type="button" data-score="5" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">🌟</span><span class="text-xs font-bold font-mono">5</span><span class="text-[9px] text-slate-500">มากที่สุด</span></button>
        </div>
      </div>

      <!-- Question 3 -->
      <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 question-card shadow-sm" data-qid="3">
        <div class="flex items-start gap-2.5 mb-2.5">
          <span class="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">3</span>
          <div>
            <span class="text-[11px] font-medium text-slate-400 block">ด้านบรรยากาศ</span>
            <h3 class="text-sm font-semibold text-slate-900">บรรยากาศ การจัดกิจกรรม และการมีส่วนร่วมในห้องอบรม</h3>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-1.5 rating-group" data-qid="3">
          <button type="button" data-score="1" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">❌</span><span class="text-xs font-bold font-mono">1</span><span class="text-[9px] text-slate-500">น้อยที่สุด</span></button>
          <button type="button" data-score="2" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">⚠️</span><span class="text-xs font-bold font-mono">2</span><span class="text-[9px] text-slate-500">น้อย</span></button>
          <button type="button" data-score="3" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👌</span><span class="text-xs font-bold font-mono">3</span><span class="text-[9px] text-slate-500">ปานกลาง</span></button>
          <button type="button" data-score="4" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👍</span><span class="text-xs font-bold font-mono">4</span><span class="text-[9px] text-slate-500">มาก</span></button>
          <button type="button" data-score="5" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">🌟</span><span class="text-xs font-bold font-mono">5</span><span class="text-[9px] text-slate-500">มากที่สุด</span></button>
        </div>
      </div>

      <!-- Question 4 -->
      <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 question-card shadow-sm" data-qid="4">
        <div class="flex items-start gap-2.5 mb-2.5">
          <span class="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">4</span>
          <div>
            <span class="text-[11px] font-medium text-slate-400 block">ด้านสื่ออุปกรณ์</span>
            <h3 class="text-sm font-semibold text-slate-900">ความพร้อมของสื่อ เอกสาร และอุปกรณ์ในการจัดอบรม</h3>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-1.5 rating-group" data-qid="4">
          <button type="button" data-score="1" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">❌</span><span class="text-xs font-bold font-mono">1</span><span class="text-[9px] text-slate-500">น้อยที่สุด</span></button>
          <button type="button" data-score="2" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">⚠️</span><span class="text-xs font-bold font-mono">2</span><span class="text-[9px] text-slate-500">น้อย</span></button>
          <button type="button" data-score="3" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👌</span><span class="text-xs font-bold font-mono">3</span><span class="text-[9px] text-slate-500">ปานกลาง</span></button>
          <button type="button" data-score="4" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👍</span><span class="text-xs font-bold font-mono">4</span><span class="text-[9px] text-slate-500">มาก</span></button>
          <button type="button" data-score="5" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">🌟</span><span class="text-xs font-bold font-mono">5</span><span class="text-[9px] text-slate-500">มากที่สุด</span></button>
        </div>
      </div>

      <!-- Question 5 -->
      <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 question-card shadow-sm" data-qid="5">
        <div class="flex items-start gap-2.5 mb-2.5">
          <span class="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">5</span>
          <div>
            <span class="text-[11px] font-medium text-slate-400 block">ด้านการนำไปใช้</span>
            <h3 class="text-sm font-semibold text-slate-900">ความคุ้มค่าและความพร้อมในการนำความรู้ไปประยุกต์ใช้จริง</h3>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-1.5 rating-group" data-qid="5">
          <button type="button" data-score="1" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">❌</span><span class="text-xs font-bold font-mono">1</span><span class="text-[9px] text-slate-500">น้อยที่สุด</span></button>
          <button type="button" data-score="2" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">⚠️</span><span class="text-xs font-bold font-mono">2</span><span class="text-[9px] text-slate-500">น้อย</span></button>
          <button type="button" data-score="3" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👌</span><span class="text-xs font-bold font-mono">3</span><span class="text-[9px] text-slate-500">ปานกลาง</span></button>
          <button type="button" data-score="4" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">👍</span><span class="text-xs font-bold font-mono">4</span><span class="text-[9px] text-slate-500">มาก</span></button>
          <button type="button" data-score="5" class="rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition"><span class="text-sm">🌟</span><span class="text-xs font-bold font-mono">5</span><span class="text-[9px] text-slate-500">มากที่สุด</span></button>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <label for="feedbackInput" class="block text-sm font-semibold text-slate-900 mb-0.5">
          ข้อเสนอแนะเพิ่มเติม (ไม่บังคับ)
        </label>
        <p class="text-xs text-slate-500 mb-2">
          ความคิดเห็นของท่านจะเป็นประโยชน์อย่างยิ่งในการปรับปรุงครั้งต่อไป
        </p>
        <textarea id="feedbackInput" rows="3" placeholder="ระบุสิ่งที่ประทับใจ หรือสิ่งที่ต้องการให้เพิ่มเติม..." class="w-full bg-slate-50/60 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors resize-none"></textarea>
      </div>

      <div class="pt-2 sticky bottom-4 z-20">
        <button id="submitBtn" type="submit" class="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] transition">
          <span>ส่งแบบประเมิน</span>
        </button>
      </div>
    </form>

    <div id="successScreen" class="hidden bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
      <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100 text-2xl font-bold">
        ✓
      </div>
      <h2 class="text-xl font-bold text-slate-900 mb-1.5">ส่งแบบประเมินเรียบร้อยแล้ว</h2>
      <p class="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
        ขอขอบพระคุณสำหรับความคิดเห็น ข้อมูลของคุณถูกส่งขึ้นหน้าจอ Dashboard แบบเรียลไทม์แล้ว
      </p>
      <button id="resetTestBtn" class="py-2 px-4 bg-white hover:bg-slate-50 text-slate-600 font-medium rounded-lg text-xs transition border border-slate-200">
        ↺ ทำแบบประเมินใหม่อีกครั้ง (สำหรับการทดสอบ)
      </button>
    </div>
  </div>

  <script>
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    let db = null;
    try {
      if (firebaseConfig.databaseURL && !firebaseConfig.databaseURL.includes('YOUR_PROJECT_ID')) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
      }
    } catch (e) {
      console.warn('Firebase error:', e);
    }

    const SUBMIT_KEY = 'training_survey_submitted_state';
    const form = document.getElementById('surveyForm');
    const successScreen = document.getElementById('successScreen');
    const errorAlert = document.getElementById('errorAlert');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    function checkSubmitted() {
      if (localStorage.getItem(SUBMIT_KEY) === 'true') {
        form.classList.add('hidden');
        successScreen.classList.remove('hidden');
      }
    }
    checkSubmitted();

    document.getElementById('resetTestBtn').addEventListener('click', () => {
      localStorage.removeItem(SUBMIT_KEY);
      location.reload();
    });

    const scores = {};
    document.querySelectorAll('.rating-group').forEach(group => {
      const qid = group.getAttribute('data-qid');
      group.querySelectorAll('.rating-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const score = parseInt(btn.getAttribute('data-score'), 10);
          scores[qid] = score;

          group.querySelectorAll('.rating-btn').forEach(b => {
            b.className = 'rating-btn min-h-[52px] py-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:bg-slate-100 transition';
          });
          btn.className = 'rating-btn min-h-[52px] py-2 rounded-xl bg-slate-900 text-white font-bold border border-slate-900 text-center flex flex-col items-center shadow-xs scale-[1.02] transition';

          const count = Object.keys(scores).length;
          progressText.innerText = \`\${count} จาก 5 ข้อ\`;
          progressBar.style.width = \`\${(count / 5) * 100}%\`;
          errorAlert.classList.add('hidden');
        });
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (Object.keys(scores).length < 5) {
        errorAlert.classList.remove('hidden');
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'กำลังบันทึกข้อมูล...';

      const feedback = document.getElementById('feedbackInput').value.trim();
      const payload = {
        scores: scores,
        feedback: feedback || null,
        timestamp: Date.now(),
        clientTime: new Date().toISOString()
      };

      try {
        if (db) {
          await db.ref('evaluations').push(payload);
        } else {
          const localList = JSON.parse(localStorage.getItem('local_evaluations') || '[]');
          localList.unshift(payload);
          localStorage.setItem('local_evaluations', JSON.stringify(localList));
        }

        if (window.confetti) {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }

        localStorage.setItem(SUBMIT_KEY, 'true');
        form.classList.add('hidden');
        successScreen.classList.remove('hidden');
      } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
        submitBtn.disabled = false;
        submitBtn.innerText = 'ส่งแบบประเมิน';
      }
    });
  <\/script>
</body>
</html>`;

export const DASHBOARD_HTML_SOURCE = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard แสดงผลความพึงพอใจการอบรม (Realtime)</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"><\/script>
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js"><\/script>
  <style>
    body { font-family: 'Prompt', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen p-4 sm:p-6 lg:p-8">

  <div class="max-w-7xl mx-auto">
    <div class="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1 text-xs text-slate-500 font-medium">
          <span class="text-emerald-700 font-semibold">LIVE REALTIME</span>
          <span aria-hidden="true">·</span>
          <span id="connectionBadge">Firebase Realtime Database</span>
        </div>
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          การอบรมเชิงปฏิบัติการ: การประยุกต์ใช้ AI ในการทำงานยุคใหม่
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          ผลคะแนนเฉลี่ยความพึงพอใจและข้อเสนอแนะของผู้เข้าอบรม (อัปเดตอัตโนมัติแบบเรียลไทม์)
        </p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button id="downloadCsvBtn" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center gap-1.5">
          <span>📥 ดาวน์โหลด CSV</span>
        </button>
        <button id="fullscreenBtn" class="p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl transition shadow-xs" title="เต็มจอสำหรับโปรเจกเตอร์">
          ⛶
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">จำนวนผู้ตอบแบบประเมิน</span>
        <div class="flex items-baseline gap-2">
          <span id="totalCount" class="text-4xl sm:text-5xl font-black text-slate-900 mono tabular-nums">0</span>
          <span class="text-sm font-medium text-slate-500">คน</span>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          อัปเดตสดทันทีที่มีคนส่ง
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">คะแนนเฉลี่ยรวม</span>
        <div class="flex items-baseline gap-2">
          <span id="overallAvg" class="text-4xl sm:text-5xl font-black text-slate-900 mono tabular-nums">0.00</span>
          <span class="text-sm font-medium text-slate-500">/ 5.00 คะแนน</span>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          คิดเป็น <span id="overallPercent" class="mono font-semibold text-slate-900">0%</span>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">ระดับความพึงพอใจ</span>
        <div class="flex items-baseline gap-2">
          <span id="overallTier" class="text-2xl sm:text-3xl font-extrabold text-emerald-700">รอข้อมูล</span>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          เกณฑ์ Likert 5 ระดับ (4.51 - 5.00 = มากที่สุด)
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 class="text-base sm:text-lg font-bold text-slate-900 mb-0.5">ค่าเฉลี่ยความพึงพอใจรายข้อ (สเกล 1 - 5)</h2>
        <p class="text-xs text-slate-500 mb-5">กราฟแท่งแสดงคะแนนเฉลี่ยและการกระจายคะแนน</p>

        <div id="questionsContainer" class="space-y-3.5"></div>

        <div class="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500">
          <span class="font-semibold text-slate-700 block mb-2">เกณฑ์การแปลผลคะแนนเฉลี่ย:</span>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
            <div class="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-800">4.51 - 5.00: มากที่สุด</div>
            <div class="p-2 rounded-lg bg-sky-50/70 border border-sky-100 text-sky-800">3.51 - 4.50: มาก</div>
            <div class="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-amber-800">2.51 - 3.50: ปานกลาง</div>
            <div class="p-2 rounded-lg bg-orange-50/70 border border-orange-100 text-orange-800">1.51 - 2.50: น้อย</div>
            <div class="p-2 rounded-lg bg-rose-50/70 border border-rose-100 text-rose-800">1.00 - 1.50: น้อยที่สุด</div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-4">
        <div id="qrCard" class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            สแกนเพื่อร่วมตอบแบบสอบถาม
          </span>
          <div class="w-48 h-48 mx-auto bg-white p-2 rounded-xl border border-slate-200 my-2 flex items-center justify-center">
            <img id="qrImg" src="" alt="QR Code" class="w-full h-full object-contain">
          </div>
          <p id="surveyLinkText" class="text-xs text-slate-400 truncate font-mono mt-2"></p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 class="text-sm font-bold text-slate-900">ข้อเสนอแนะล่าสุด</h3>
            <span id="feedbackCount" class="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">0</span>
          </div>
          <div id="feedbackList" class="flex-1 overflow-y-auto space-y-2.5 pr-1">
            <p class="text-xs text-slate-400 text-center py-8">ยังไม่มีข้อเสนอแนะ</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const QUESTIONS = [
      { id: 1, title: 'ความรู้ความเชี่ยวชาญ และความสามารถในการถ่ายทอดของวิทยากร', category: 'ด้านวิทยากร' },
      { id: 2, title: 'ความชัดเจน ความทันสมัย และประโยชน์ของเนื้อหาหลักสูตร', category: 'ด้านเนื้อหา' },
      { id: 3, title: 'บรรยากาศ การจัดกิจกรรม และการมีส่วนร่วมในห้องอบรม', category: 'ด้านบรรยากาศ' },
      { id: 4, title: 'ความพร้อมของสื่อ เอกสาร และอุปกรณ์ในการจัดอบรม', category: 'ด้านสื่ออุปกรณ์' },
      { id: 5, title: 'ความคุ้มค่าและความพร้อมในการนำความรู้ไปประยุกต์ใช้จริง', category: 'ด้านการนำไปใช้' }
    ];

    function getRatingTier(score) {
      if (score >= 4.51) return { label: 'มากที่สุด', color: 'text-emerald-700', bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      if (score >= 3.51) return { label: 'มาก', color: 'text-sky-700', bgClass: 'bg-sky-50 text-sky-800 border-sky-200' };
      if (score >= 2.51) return { label: 'ปานกลาง', color: 'text-amber-700', bgClass: 'bg-amber-50 text-amber-800 border-amber-200' };
      if (score >= 1.51) return { label: 'น้อย', color: 'text-orange-700', bgClass: 'bg-orange-50 text-orange-800 border-orange-200' };
      if (score >= 1.00) return { label: 'น้อยที่สุด', color: 'text-rose-700', bgClass: 'bg-rose-50 text-rose-800 border-rose-200' };
      return { label: 'รอข้อมูล', color: 'text-slate-500', bgClass: 'bg-slate-50 text-slate-700 border-slate-200' };
    }

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    let allEvaluations = [];

    const surveyUrl = window.location.origin + window.location.pathname.replace('dashboard.html', 'survey.html');
    document.getElementById('qrImg').src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(surveyUrl);
    document.getElementById('surveyLinkText').innerText = surveyUrl;

    document.getElementById('fullscreenBtn').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    function renderDashboard(dataList) {
      allEvaluations = dataList;
      const count = dataList.length;
      document.getElementById('totalCount').innerText = count;

      if (count === 0) {
        document.getElementById('overallAvg').innerText = '0.00';
        document.getElementById('overallPercent').innerText = '0%';
        document.getElementById('overallTier').innerText = 'รอข้อมูล';
        renderQuestionBars([]);
        return;
      }

      let sumOfAverages = 0;
      const qStats = QUESTIONS.map(q => {
        let qSum = 0;
        let dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        dataList.forEach(item => {
          if (item.scores && item.scores[q.id]) {
            const sc = item.scores[q.id];
            qSum += sc;
            dist[sc] = (dist[sc] || 0) + 1;
          }
        });
        const avg = parseFloat((qSum / count).toFixed(2));
        sumOfAverages += avg;
        return { ...q, avg, dist, tier: getRatingTier(avg) };
      });

      const overall = parseFloat((sumOfAverages / QUESTIONS.length).toFixed(2));
      const overallTier = getRatingTier(overall);

      document.getElementById('overallAvg').innerText = overall.toFixed(2);
      document.getElementById('overallPercent').innerText = ((overall / 5) * 100).toFixed(1) + '%';
      const tierEl = document.getElementById('overallTier');
      tierEl.innerText = overallTier.label;
      tierEl.className = 'text-2xl sm:text-3xl font-extrabold ' + overallTier.color;

      renderQuestionBars(qStats);
      renderFeedbacks(dataList);
    }

    function renderQuestionBars(qStats) {
      const container = document.getElementById('questionsContainer');
      container.innerHTML = qStats.map(stat => {
        const percent = Math.min(100, Math.max(0, (stat.avg / 5) * 100));
        return \`
          <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div class="flex items-baseline gap-2">
                <span class="text-xs font-bold text-slate-900 mono">ข้อ \${stat.id}</span>
                <span class="text-xs text-slate-400">[\${stat.category}]</span>
                <span class="text-sm font-semibold text-slate-800">\${stat.title}</span>
              </div>
              <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <span class="text-base font-bold text-slate-900 mono">\${stat.avg.toFixed(2)}</span>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded border \${stat.tier.bgClass}">\${stat.tier.label}</span>
              </div>
            </div>
            <div class="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden mb-1.5">
              <div class="h-full rounded-full transition-all duration-500 bg-slate-900" style="width: \${percent}%"></div>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500 mono">
              <span>5★:\${stat.dist[5] || 0} · 4★:\${stat.dist[4] || 0} · 3★:\${stat.dist[3] || 0} · 2★:\${stat.dist[2] || 0} · 1★:\${stat.dist[1] || 0}</span>
              <span class="font-sans">\${percent.toFixed(0)}%</span>
            </div>
          </div>
        \`;
      }).join('');
    }

    function renderFeedbacks(dataList) {
      const listEl = document.getElementById('feedbackList');
      const feedbacks = dataList.filter(d => d.feedback && d.feedback.trim().length > 0);
      document.getElementById('feedbackCount').innerText = feedbacks.length;

      if (feedbacks.length === 0) {
        listEl.innerHTML = '<p class="text-xs text-slate-400 text-center py-8">ยังไม่มีข้อเสนอแนะ</p>';
        return;
      }

      listEl.innerHTML = feedbacks.map(item => \`
        <div class="p-3 bg-slate-50/80 border border-slate-100 rounded-xl text-xs text-slate-700">
          <p class="leading-relaxed">"\${item.feedback}"</p>
        </div>
      \`).join('');
    }

    try {
      if (firebaseConfig.databaseURL && !firebaseConfig.databaseURL.includes('YOUR_PROJECT_ID')) {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        document.getElementById('connectionBadge').innerText = 'Firebase Realtime Connected';

        db.ref('evaluations').on('value', (snapshot) => {
          const val = snapshot.val();
          if (val) {
            const list = Object.keys(val).map(key => ({ id: key, ...val[key] })).reverse();
            renderDashboard(list);
          } else {
            renderDashboard([]);
          }
        });
      } else {
        document.getElementById('connectionBadge').innerText = 'โหมดจำลอง Local Storage';
        const local = JSON.parse(localStorage.getItem('local_evaluations') || '[]');
        renderDashboard(local);
      }
    } catch (e) {
      console.warn('Realtime sync fallback:', e);
    }

    document.getElementById('downloadCsvBtn').addEventListener('click', () => {
      if (allEvaluations.length === 0) {
        alert('ยังไม่มีข้อมูลสำหรับดาวน์โหลด');
        return;
      }

      let csv = '\\uFEFF';
      csv += 'ผลการประเมินความพึงพอใจการอบรม\\n';
      csv += 'จำนวนผู้ตอบทั้งหมด,' + allEvaluations.length + ',คน\\n\\n';
      csv += 'ลำดับ,วันเวลาที่ตอบ,ข้อ 1 (วิทยากร),ข้อ 2 (เนื้อหา),ข้อ 3 (บรรยากาศ),ข้อ 4 (สื่ออุปกรณ์),ข้อ 5 (การนำไปใช้),ข้อเสนอแนะ\\n';

      allEvaluations.forEach((item, idx) => {
        const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString('th-TH') : '-';
        const s1 = item.scores ? item.scores[1] : '';
        const s2 = item.scores ? item.scores[2] : '';
        const s3 = item.scores ? item.scores[3] : '';
        const s4 = item.scores ? item.scores[4] : '';
        const s5 = item.scores ? item.scores[5] : '';
        const fb = (item.feedback || '').replace(/"/g, '""');
        csv += \`\${idx + 1},"\${dateStr}",\${s1},\${s2},\${s3},\${s4},\${s5},"\${fb}"\\n\`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = \`รายงานผลประเมิน_\${new Date().toISOString().slice(0, 10)}.csv\`;
      link.click();
    });
  <\/script>
</body>
</html>`;
