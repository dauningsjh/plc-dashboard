/* ── 전역 설정 ── */
Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
Chart.defaults.font.size   = 11;

const PALETTE = ['#2a52c9','#0c8576','#b45a0a','#c42b2b','#6d28d9','#0369a1','#4d7c0f','#be185d'];

/* ── 차트 공통 옵션 ── */
const lineOpts = (labels) => ({
  responsive: true, maintainAspectRatio: false,
  interaction: { mode:'index', intersect:false },
  plugins: { legend:{ display:false } },
  scales: {
    x: {
      ticks: { maxRotation:45, autoSkip:false, font:{size:9} },
      grid:  { color:'rgba(0,0,0,0.04)' }
    },
    y: {
      ticks: { font:{size:9} },
      grid:  { color:'rgba(0,0,0,0.04)' },
      beginAtZero: true
    }
  }
});

/* ── 차트 생성 헬퍼 ── */
function mkLine(id, labels, dsets) {
  const el = document.getElementById(id); if (!el) return null;
  return new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: dsets.map((d,i) => ({
        label: d.label||'', data: d.data,
        borderColor: d.color||PALETTE[i],
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: labels.length <= 3 ? 5 : 3,
        pointHoverRadius: 6,
        spanGaps: true, tension: 0.3
      }))
    },
    options: lineOpts(labels)
  });
}

function mkBarH(id, labels, data, colors) {
  const el = document.getElementById(id); if (!el) return null;
  return new Chart(el, {
    type: 'bar',
    data: { labels, datasets:[{ data, backgroundColor:colors||PALETTE[0], borderRadius:4 }] },
    options: {
      indexAxis: 'y', responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ display:false } },
      scales: {
        x: { ticks:{font:{size:9}}, grid:{color:'rgba(0,0,0,0.04)'}, beginAtZero:true },
        y: { ticks:{font:{size:9}} }
      }
    }
  });
}

function mkGroupBar(id, labels, dsets) {
  const el = document.getElementById(id); if (!el) return null;
  return new Chart(el, {
    type:'bar',
    data:{ labels, datasets:dsets.map((d,i) => ({
      label:d.label, data:d.data, backgroundColor:d.color||PALETTE[i], borderRadius:3
    }))},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{
        x:{ stacked:false, ticks:{font:{size:10}} },
        y:{ ticks:{font:{size:9}}, beginAtZero:true }
      }
    }
  });
}

/* ── 벤다이어그램 ── */
function drawVenn(id, core, main, gen) {
  const canvas = document.getElementById(id); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);
  const cx = W/2, cy = H/2 + 8;
  const r3 = Math.min(W,H)*0.42;
  const r2 = r3 * 0.64;
  const r1 = r2 * 0.52;

  // gen
  ctx.beginPath(); ctx.arc(cx,cy,r3,0,Math.PI*2);
  ctx.fillStyle='rgba(243,244,246,0.95)'; ctx.fill();
  ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1; ctx.stroke();
  // main
  ctx.beginPath(); ctx.arc(cx,cy,r2,0,Math.PI*2);
  ctx.fillStyle='rgba(219,234,254,0.9)'; ctx.fill();
  ctx.strokeStyle='#93c5fd'; ctx.lineWidth=1; ctx.stroke();
  // core
  ctx.beginPath(); ctx.arc(cx,cy,r1,0,Math.PI*2);
  ctx.fillStyle='rgba(254,226,226,0.95)'; ctx.fill();
  ctx.strokeStyle='#fca5a5'; ctx.lineWidth=1; ctx.stroke();

  ctx.textAlign='center'; ctx.textBaseline='middle';

  // core 숫자 + 라벨
  ctx.font='bold 17px "Noto Sans KR"';
  ctx.fillStyle='#991b1b'; ctx.fillText(String(core), cx, cy-3);
  ctx.font='10px "Noto Sans KR"';
  ctx.fillStyle='#b91c1c'; ctx.fillText('핵심', cx, cy+12);

  // main
  const midR = (r1+r2)/2;
  ctx.font='bold 13px "Noto Sans KR"';
  ctx.fillStyle='#1d4ed8'; ctx.fillText(String(main), cx, cy - midR + 8);
  ctx.font='9px "Noto Sans KR"';
  ctx.fillStyle='#2563eb'; ctx.fillText('주력', cx, cy - midR + 20);

  // gen
  const midR2 = (r2+r3)/2;
  ctx.font='bold 13px "Noto Sans KR"';
  ctx.fillStyle='#374151'; ctx.fillText(String(gen), cx, cy + midR2 - 10);
  ctx.font='9px "Noto Sans KR"';
  ctx.fillStyle='#6b7280'; ctx.fillText('일반', cx, cy + midR2 + 2);
}

/* ── 이미지 + 배지 헬퍼 ── */
function imgCell(name) {
  const src = imgSrc(name);
  return src
    ? `<img src="${src}" class="pimg" alt="${name}" onerror="this.outerHTML='<div class=pimg-ph>없음</div>'">`
    : `<div class="pimg-ph">이미지<br>없음</div>`;
}

function bdg(b) {
  const map = { core:['bc','핵심'], main:['bm','주력'], gen:['bg','일반'] };
  const [c,l] = map[b] || ['bg','일반'];
  return `<span class="badge ${c}">${l}</span>`;
}

/* ── PLC 테이블 렌더 ── */
function renderPLC(tbId, data) {
  const tb = document.getElementById(tbId); if (!tb) return;
  const maxQ = Math.max(...data.map(d=>d.monthly_qty||0));
  tb.innerHTML = data.map(d => {
    const w = Math.round((d.monthly_qty/maxQ)*100);
    const rev = d.monthly_rev != null
      ? `<span class="rev-v">${d.monthly_rev}억</span>`
      : `<span style="color:var(--ink3)">-</span>`;
    return `<tr>
      <td class="rank-num">${d.rank}</td>
      <td>${imgCell(d.name)}</td>
      <td class="nm" title="${d.name}">${d.name}</td>
      <td>${bdg(d.badge)}</td>
      <td>
        <div class="bar-wrap">
          <div class="bar" style="width:${w}px"></div>
          <span class="bar-v">${d.monthly_qty}조</span>
        </div>
      </td>
      <td>${rev}</td>
      <td style="font-family:'DM Mono',monospace;font-size:11px;color:var(--ink2)">${d.total ? d.total+'조' : '-'}</td>
    </tr>`;
  }).join('');
}

/* ── 제품 카드 렌더 ── */
function renderCards(cId, items) {
  const el = document.getElementById(cId); if (!el) return;
  el.innerHTML = items.map(d => {
    const src = imgSrc(d.name||d.label||'');
    const imgTag = src
      ? `<img src="${src}" class="pcard-img" alt="${d.name}" onerror="this.outerHTML='<div class=pcard-ph>준비중</div>'">`
      : `<div class="pcard-ph">이미지 준비중</div>`;
    const revHtml = d.monthly_rev
      ? `<div style="margin-top:4px"><span class="pcard-rev">${d.monthly_rev}억/월</span></div>`
      : '';
    const dispName = d.label || d.name;
    return `<div class="pcard">
      ${imgTag}
      <div class="pcard-body">
        <div class="pcard-name" title="${dispName}">${dispName}</div>
        <div class="pcard-row">
          ${bdg(d.badge)}
          <span class="pcard-stat">${d.monthly_qty}조/월</span>
        </div>
        ${revHtml}
      </div>
    </div>`;
  }).join('');
}

/* ── 채널 비교 가로 바 ── */
function renderChBar() {
  const chData = [
    { label:'백화점', val: CHANNEL_MONTHLY.dept.reduce((a,b)=>a+b,0),  color:'#2a52c9' },
    { label:'라운지', val: CHANNEL_MONTHLY.lounge.reduce((a,b)=>a+b,0), color:'#0c8576' },
    { label:'온라인', val: CHANNEL_MONTHLY.online.reduce((a,b)=>a+b,0), color:'#b45a0a' },
  ];
  const maxVal = Math.max(...chData.map(d=>d.val));
  const el = document.getElementById('chBarList'); if (!el) return;
  el.innerHTML = chData.map(d => `
    <div class="ch-bar-item">
      <span class="ch-bar-label">${d.label}</span>
      <div class="ch-bar-track">
        <div class="ch-bar-fill" style="width:${Math.round(d.val/maxVal*100)}%;background:${d.color}"></div>
      </div>
      <span class="ch-bar-num">${d.val.toFixed(2)}억</span>
    </div>`).join('');
}

/* ── 슬라이스 ── */
function sl(arr, range) {
  if (!arr || !arr.length) return [];
  return arr.slice(range.slice[0], range.slice[1]);
}

/* ── 차트 인스턴스 레지스트리 ── */
const CH = {};

/* ── 초기화 ── */
function init() {
  // 벤다이어그램
  drawVenn('venn-dept',  2,  6, 22);
  drawVenn('venn-lounge',4, 12, 23);
  drawVenn('venn-online',3, 11, 44);

  // 채널 가로 바
  renderChBar();

  // ── 01 개요 차트 ──
  CH.monthly = mkLine('cMonthly', MONTHS_Q1, [
    {label:'백화점',data:[...CHANNEL_MONTHLY.dept],  color:'#2a52c9'},
    {label:'라운지',data:[...CHANNEL_MONTHLY.lounge],color:'#0c8576'},
    {label:'온라인',data:[...CHANNEL_MONTHLY.online],color:'#b45a0a'},
  ]);
  CH.catBar = mkGroupBar('cCatBar', ['백화점','라운지','온라인'], [
    {label:'소파',     data:[9.03,6.08,10.51], color:'#2a52c9'},
    {label:'식탁/체어',data:[0,1.15,0.39],     color:'#0c8576'},
    {label:'1인리클',  data:[1.28,1.25,0.44],  color:'#b45a0a'},
  ]);

  // ── 02 PLC 차트 ──
  const dTop = DEPT_PLC.slice(0,10);
  CH.dBar = mkBarH('cDeptBar',
    dTop.map(d=>d.name), dTop.map(d=>d.monthly_qty),
    dTop.map(d=>d.badge==='core'?'#c42b2b':d.badge==='main'?'#2a52c9':'#9ca3af'));
  CH.dTrend = mkLine('cDeptTrend', MONTHS_15, [
    {label:'브리오스',data:DEPT_PLC[0].trend,color:'#c42b2b'},
    {label:'빈체로',  data:DEPT_PLC[1].trend,color:'#b45a0a'},
    {label:'젤코바',  data:DEPT_PLC[2].trend,color:'#2a52c9'},
    {label:'헤네스',  data:DEPT_PLC[3].trend,color:'#0c8576'},
  ]);
  renderPLC('tb-dept', DEPT_PLC);

  const lTop = LOUNGE_PLC.slice(0,10);
  CH.lBar = mkBarH('cLoungeBar',
    lTop.map(d=>d.name), lTop.map(d=>d.monthly_qty),
    lTop.map(d=>d.badge==='core'?'#c42b2b':d.badge==='main'?'#2a52c9':'#9ca3af'));
  CH.lTrend = mkLine('cLoungeTrend', MONTHS_15, [
    {label:'일루전',   data:LOUNGE_PLC[0].trend,color:'#c42b2b'},
    {label:'로시오럭스',data:LOUNGE_PLC[1].trend,color:'#b45a0a'},
    {label:'카벨로',   data:LOUNGE_PLC[2].trend,color:'#2a52c9'},
    {label:'엘레아',   data:LOUNGE_PLC[3].trend,color:'#0c8576'},
  ]);
  renderPLC('tb-lounge', LOUNGE_PLC);

  const oTop = ONLINE_PLC.slice(0,10);
  CH.oBar = mkBarH('cOnlineBar',
    oTop.map(d=>d.name), oTop.map(d=>d.monthly_qty),
    oTop.map(d=>d.badge==='core'?'#c42b2b':d.badge==='main'?'#2a52c9':'#9ca3af'));
  CH.oTrend = mkLine('cOnlineTrend', MONTHS_15, [
    {label:'플랫',data:ONLINE_PLC[0].trend,color:'#c42b2b'},
    {label:'시엘',data:ONLINE_PLC[1].trend,color:'#b45a0a'},
    {label:'클로',data:ONLINE_PLC[2].trend,color:'#2a52c9'},
  ]);
  renderPLC('tb-online', ONLINE_PLC);

  // ── 03 신제품 소파 차트 ──
  CH.dsq = mkLine('cDSQ', MONTHS_15, [
    {label:'마렌',  data:SOFA_DEPT[0].qty,color:'#2a52c9'},
    {label:'벨리체',data:SOFA_DEPT[1].qty,color:'#0c8576'},
    {label:'트루엘',data:SOFA_DEPT[2].qty,color:'#b45a0a'},
    {label:'그렘보',data:SOFA_DEPT[3].qty,color:'#c42b2b'},
  ]);
  CH.dsr = mkLine('cDSR', MONTHS_15, [
    {label:'마렌',  data:SOFA_DEPT[0].rev,color:'#2a52c9'},
    {label:'벨리체',data:SOFA_DEPT[1].rev,color:'#0c8576'},
    {label:'트루엘',data:SOFA_DEPT[2].rev,color:'#b45a0a'},
  ]);
  renderCards('pc-sofa-dept', SOFA_DEPT);

  CH.lsq = mkLine('cLSQ', MONTHS_15, [
    {label:'아테나',    data:SOFA_LOUNGE[0].qty,color:'#2a52c9'},
    {label:'메리온하이',data:SOFA_LOUNGE[1].qty,color:'#0c8576'},
    {label:'미노르',    data:SOFA_LOUNGE[2].qty,color:'#b45a0a'},
    {label:'뉴알도',    data:SOFA_LOUNGE[3].qty,color:'#c42b2b'},
  ]);
  CH.lsr = mkLine('cLSR', MONTHS_15, [
    {label:'아테나',    data:SOFA_LOUNGE[0].rev,color:'#2a52c9'},
    {label:'메리온하이',data:SOFA_LOUNGE[1].rev,color:'#0c8576'},
  ]);
  renderCards('pc-sofa-lounge', SOFA_LOUNGE);

  CH.osq = mkLine('cOSQ', MONTHS_15, [
    {label:'클로',      data:SOFA_ONLINE[0].qty,color:'#2a52c9'},
    {label:'센느',      data:SOFA_ONLINE[1].qty,color:'#0c8576'},
    {label:'플라나베이직',data:SOFA_ONLINE[2].qty,color:'#b45a0a'},
    {label:'모션',      data:SOFA_ONLINE[3].qty,color:'#c42b2b'},
  ]);
  CH.osr = mkLine('cOSR', MONTHS_15, [
    {label:'클로',      data:SOFA_ONLINE[0].rev,color:'#2a52c9'},
    {label:'센느',      data:SOFA_ONLINE[1].rev,color:'#0c8576'},
    {label:'플라나베이직',data:SOFA_ONLINE[2].rev,color:'#b45a0a'},
  ]);
  renderCards('pc-sofa-online', SOFA_ONLINE);

  // 가구 차트
  const fLbl = ['26.2','26.3'];
  CH.lfq = mkLine('cLFQ', fLbl, [
    {label:'루나 식탁',data:[30,37],   color:'#2a52c9'},
    {label:'루나 체어',data:[128,162], color:'#0c8576'},
    {label:'노크 식탁',data:[10,11],   color:'#b45a0a'},
    {label:'노크 체어',data:[38,70],   color:'#c42b2b'},
  ]);
  CH.lfr = mkLine('cLFR', fLbl, [
    {label:'루나',data:[0.38,0.55],color:'#2a52c9'},
    {label:'노크',data:[0.08,0.12],color:'#0c8576'},
  ]);
  renderCards('pc-furn-lounge',[
    {name:'루나',badge:'main',monthly_qty:33.5,monthly_rev:0.47},
    {name:'노크',badge:'gen', monthly_qty:10.5,monthly_rev:0.10},
  ]);

  CH.ofq = mkLine('cOFQ', MONTHS_Q1, [
    {label:'스퀘어 식탁',data:[3,4,26],    color:'#2a52c9'},
    {label:'스퀘어 체어',data:[18,24,115], color:'#0c8576'},
    {label:'오벌',       data:[0,2,4],     color:'#b45a0a'},
  ]);
  CH.ofr = mkLine('cOFR', MONTHS_Q1, [
    {label:'스퀘어',data:[0.04,0.05,0.26],color:'#2a52c9'},
    {label:'오벌',  data:[0,0.01,0.02],   color:'#0c8576'},
  ]);
  renderCards('pc-furn-online',[
    {name:'노에뜨 스퀘어',badge:'main',monthly_qty:11.0,monthly_rev:0.12},
    {name:'노에뜨 오벌',  badge:'main',monthly_qty:2.0, monthly_rev:0.02},
    {name:'마롱',         badge:'gen', monthly_qty:1.0, monthly_rev:0.003},
  ]);

  // 리클라이너 차트
  CH.rdq = mkLine('cRDQ', MONTHS_Q1, [{label:'ED502',data:[0,5,24],   color:'#2a52c9'}]);
  CH.rdr = mkLine('cRDR', MONTHS_Q1, [{label:'ED502',data:[0,0.22,1.06],color:'#2a52c9'}]);
  renderCards('pc-recl-dept',[{name:'Lillo_ED502',badge:'main',monthly_qty:9.7,monthly_rev:0.43}]);

  CH.rlq = mkLine('cRLQ', MONTHS_Q1, [
    {label:'EL501',data:[5,8,7],   color:'#2a52c9'},
    {label:'SL301',data:[30,19,31],color:'#0c8576'},
  ]);
  CH.rlr = mkLine('cRLR', MONTHS_Q1, [
    {label:'EL501',data:[0.07,0.11,0.09],color:'#2a52c9'},
    {label:'SL301',data:[0.36,0.24,0.38],color:'#0c8576'},
  ]);
  renderCards('pc-recl-lounge',[
    {name:'Lillo_EL501',label:'EL501 (전동)',badge:'gen', monthly_qty:6.7, monthly_rev:0.09},
    {name:'Lillo_SL301',label:'SL301 (수동)',badge:'main',monthly_qty:26.7,monthly_rev:0.33},
  ]);

  CH.roq = mkLine('cROQ', MONTHS_Q1, [{label:'SO302',data:[1,7,30],   color:'#2a52c9'}]);
  CH.ror = mkLine('cROR', MONTHS_Q1, [{label:'SO302',data:[0.09,0.07,0.28],color:'#2a52c9'}]);
  renderCards('pc-recl-online',[{name:'Lillo_SO302',label:'SO302 (전동)',badge:'main',monthly_qty:12.7,monthly_rev:0.15}]);
}

/* ── 페이지 전환 ── */
function goPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('on'));
  const pg = document.getElementById('pg-'+id);
  if (pg) pg.classList.add('on');
  if (btn) btn.classList.add('on');
  window.scrollTo({top:0, behavior:'smooth'});
  setTimeout(() => Object.values(CH).forEach(c => c && c.resize && c.resize()), 80);
}

/* ── 채널/카테고리 탭 전환 ── */
function swCh(group, ch, btn) {
  const pre = group + '-';
  document.querySelectorAll(`[id^="${pre}"]`).forEach(el => el.classList.remove('on'));
  const t = document.getElementById(pre + ch);
  if (t) t.classList.add('on');
  btn.closest('.ctab-wrap').querySelectorAll('.ctab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  setTimeout(() => Object.values(CH).forEach(c => c && c.resize && c.resize()), 60);
}

function swCat(cat, btn) {
  ['sofa','furn','recl'].forEach(c => {
    const el = document.getElementById('cat-'+c);
    if (el) el.classList.remove('on');
  });
  const t = document.getElementById('cat-'+cat);
  if (t) t.classList.add('on');
  document.querySelectorAll('.cattab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  setTimeout(() => Object.values(CH).forEach(c => c && c.resize && c.resize()), 60);
}

/* ── 월 필터 ── */
function setMonth(m, btn) {
  document.querySelectorAll('.mtab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');

  const d = KPI_DATA[m];
  document.getElementById('kpi-total').textContent = d.total;
  document.getElementById('kpi-sofa').textContent  = d.sofa;
  document.getElementById('kpi-furn').textContent  = d.furn;
  document.getElementById('kpi-recl').textContent  = d.recl;

  const r = MONTH_RANGE[m];

  function upLine(c, arrs) {
    if (!c) return;
    c.data.labels = r.labels;
    arrs.forEach((a, i) => {
      if (c.data.datasets[i]) c.data.datasets[i].data = sl(a, r);
    });
    c.update();
  }

  upLine(CH.monthly, [CHANNEL_MONTHLY.dept, CHANNEL_MONTHLY.lounge, CHANNEL_MONTHLY.online]);
  upLine(CH.dsq, SOFA_DEPT.slice(0,4).map(d=>d.qty));
  upLine(CH.dsr, SOFA_DEPT.slice(0,3).map(d=>d.rev));
  upLine(CH.lsq, SOFA_LOUNGE.slice(0,4).map(d=>d.qty));
  upLine(CH.lsr, SOFA_LOUNGE.slice(0,2).map(d=>d.rev));
  upLine(CH.osq, SOFA_ONLINE.slice(0,4).map(d=>d.qty));
  upLine(CH.osr, SOFA_ONLINE.slice(0,3).map(d=>d.rev));
  upLine(CH.rdq, [[0,5,24]]);
  upLine(CH.rdr, [[0,0.22,1.06]]);
  upLine(CH.rlq, [[5,8,7],[30,19,31]]);
  upLine(CH.rlr, [[0.07,0.11,0.09],[0.36,0.24,0.38]]);
  upLine(CH.roq, [[1,7,30]]);
  upLine(CH.ror, [[0.09,0.07,0.28]]);
}

document.addEventListener('DOMContentLoaded', init);
