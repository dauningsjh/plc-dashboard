// =====================
// CHART HELPERS
// =====================
const COLORS = ['#2563EB','#0D9488','#D97706','#DC2626','#7C3AED','#0891B2','#65A30D','#DB2777'];

Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
Chart.defaults.font.size = 11;

function mkLine(id, labels, datasets) {
  const el = document.getElementById(id);
  if (!el) return null;
  return new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map((d, i) => ({
        data: d.data,
        borderColor: d.color || COLORS[i],
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: d.data && d.data.length <= 3 ? 5 : 3,
        pointHoverRadius: 6,
        spanGaps: true,
        tension: 0.3,
        ...d
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false }, tooltip: { callbacks: {
        label: ctx => ` ${ctx.dataset.label || ''}: ${ctx.parsed.y ?? ''}`
      }}},
      scales: {
        x: { ticks: { maxRotation: 45, autoSkip: false, font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true }
      }
    }
  });
}

function mkBar(id, labels, data, colors) {
  const el = document.getElementById(id);
  if (!el) return null;
  return new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors || data.map((_,i) => COLORS[i % COLORS.length]), borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true },
        y: { ticks: { font: { size: 10 } } }
      }
    }
  });
}

function mkGroupBar(id, labels, datasets) {
  const el = document.getElementById(id);
  if (!el) return null;
  return new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map((d, i) => ({
        label: d.label,
        data: d.data,
        backgroundColor: d.color || COLORS[i],
        borderRadius: 3
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { size: 10 } } },
        y: { ticks: { font: { size: 10 } }, beginAtZero: true }
      }
    }
  });
}

// =====================
// CHART INSTANCES (to update on month filter)
// =====================
let charts = {};

function sliceData(arr, range) {
  if (!arr) return [];
  const [s, e] = range.slice;
  return arr.map(row => row === null ? null : row).slice(s, e);
}

// =====================
// SECTION 1 CHARTS
// =====================
function initOverviewCharts() {
  charts.monthly = mkLine('chartMonthly', MONTHS_Q1, [
    { label:'백화점', data: CHANNEL_MONTHLY.dept,   color: '#2563EB' },
    { label:'라운지', data: CHANNEL_MONTHLY.lounge, color: '#0D9488' },
    { label:'온라인', data: CHANNEL_MONTHLY.online, color: '#D97706' }
  ]);

  charts.category = mkGroupBar('chartCategory', ['백화점','라운지','온라인'], [
    { label:'소파',     data:[9.03,6.08,10.51], color:'#2563EB' },
    { label:'식탁/체어', data:[0,1.15,0.39],     color:'#0D9488' },
    { label:'1인리클',  data:[1.28,1.25,0.44],  color:'#D97706' }
  ]);
}

// =====================
// SECTION 2 CHARTS
// =====================
function initPLCCharts() {
  // 백화점
  const deptNames = DEPT_PLC.map(d => d.name);
  const deptVals  = DEPT_PLC.map(d => d.monthly);
  const deptColors = DEPT_PLC.map(d => d.badge === 'core' ? '#DC2626' : d.badge === 'main' ? '#2563EB' : '#9CA3AF');
  charts.deptBar = mkBar('chartDeptBar', deptNames, deptVals, deptColors);
  charts.deptTrend = mkLine('chartDeptTrend', MONTHS_15, [
    { label:'브리오스', data: DEPT_PLC[0].trend, color:'#DC2626' },
    { label:'빈체로',   data: DEPT_PLC[1].trend, color:'#D97706' },
    { label:'젤코바',   data: DEPT_PLC[2].trend, color:'#2563EB' },
    { label:'헤네스',   data: DEPT_PLC[3].trend, color:'#0D9488' }
  ]);
  renderPLCTable('plc-dept-tbody', DEPT_PLC, true);

  // 라운지
  const loungeNames  = LOUNGE_PLC.map(d => d.name);
  const loungeVals   = LOUNGE_PLC.map(d => d.monthly);
  const loungeColors = LOUNGE_PLC.map(d => d.badge === 'core' ? '#DC2626' : d.badge === 'main' ? '#2563EB' : '#9CA3AF');
  charts.loungeBar = mkBar('chartLoungeBar', loungeNames, loungeVals, loungeColors);
  charts.loungeTrend = mkLine('chartLoungeTrend', MONTHS_15, [
    { label:'일루전',    data: LOUNGE_PLC[0].trend, color:'#DC2626' },
    { label:'로시오럭스', data: LOUNGE_PLC[1].trend, color:'#D97706' },
    { label:'엘레아',    data: LOUNGE_PLC[2].trend, color:'#2563EB' },
    { label:'카벨로',    data: LOUNGE_PLC[3].trend, color:'#0D9488' }
  ]);
  renderPLCTable('plc-lounge-tbody', LOUNGE_PLC, false);

  // 온라인
  const onlineNames  = ONLINE_PLC.map(d => d.name);
  const onlineVals   = ONLINE_PLC.map(d => d.monthly);
  const onlineColors = ONLINE_PLC.map(d => d.badge === 'core' ? '#DC2626' : d.badge === 'main' ? '#2563EB' : '#9CA3AF');
  charts.onlineBar = mkBar('chartOnlineBar', onlineNames, onlineVals, onlineColors);
  charts.onlineTrend = mkLine('chartOnlineTrend', MONTHS_15, [
    { label:'플랫', data: ONLINE_PLC[0].trend, color:'#DC2626' },
    { label:'시엘', data: ONLINE_PLC[1].trend, color:'#D97706' },
    { label:'클로', data: ONLINE_PLC[2].trend, color:'#2563EB' }
  ]);
  renderPLCTable('plc-online-tbody', ONLINE_PLC, false);
}

function renderPLCTable(tbodyId, data, showDisplay) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const maxMonthly = Math.max(...data.map(d => d.monthly));

  data.forEach(d => {
    const tr = document.createElement('tr');
    const badgeClass = d.badge === 'core' ? 'badge-core' : d.badge === 'main' ? 'badge-main' : 'badge-gen';
    const badgeLabel = d.badge === 'core' ? '핵심' : d.badge === 'main' ? '주력' : '일반';
    const imgSrc = d.img ? `images/${d.img}.jpg` : null;
    const imgHtml = imgSrc
      ? `<img src="${imgSrc}" class="prod-img" alt="${d.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        + `<div class="prod-img-placeholder" style="display:none">이미지<br>없음</div>`
      : `<div class="prod-img-placeholder">이미지<br>없음</div>`;
    const barWidth = Math.round((d.monthly / maxMonthly) * 120);
    const revStr = d.rev ? `${d.rev}억` : '-';
    const dispStr = showDisplay && d.display ? `<span style="font-size:10px;color:var(--text3)">${d.display}</span>` : '';

    tr.innerHTML = `
      <td class="rank-num">${d.rank}</td>
      <td><div style="display:flex;gap:4px">${imgHtml}</div></td>
      <td style="font-weight:500;white-space:nowrap">${d.name}</td>
      <td><span class="badge ${badgeClass}">${badgeLabel}</span></td>
      <td>
        <div class="plc-bar-wrap">
          <div class="plc-bar" style="width:${barWidth}px"></div>
          <span class="plc-bar-val">${d.monthly}조</span>
        </div>
      </td>
      <td style="font-family:'DM Mono',monospace;font-size:11px">${revStr}</td>
      <td style="font-family:'DM Mono',monospace;font-size:11px">${d.total ? d.total+'조' : '-'}</td>
      ${showDisplay ? `<td>${dispStr}</td>` : ''}
    `;
    tbody.appendChild(tr);
  });
}

// =====================
// SECTION 3 CHARTS
// =====================
function initNewProdCharts() {
  // 소파 백화점
  charts.deptSofaQty = mkLine('chartDeptSofaQty', MONTHS_15, [
    { label:'마렌',   data: SOFA_DEPT[0].qty,  color:'#2563EB' },
    { label:'벨리체', data: SOFA_DEPT[1].qty,  color:'#0D9488' },
    { label:'트루엘', data: SOFA_DEPT[2].qty,  color:'#D97706' },
    { label:'그렘보', data: SOFA_DEPT[3].qty,  color:'#DC2626' },
    { label:'아크',   data: SOFA_DEPT[4].qty,  color:'#7C3AED' }
  ]);
  charts.deptSofaRev = mkLine('chartDeptSofaRev', MONTHS_15, [
    { label:'마렌',   data: SOFA_DEPT[0].revs, color:'#2563EB' },
    { label:'벨리체', data: SOFA_DEPT[1].revs, color:'#0D9488' },
    { label:'트루엘', data: SOFA_DEPT[2].revs, color:'#D97706' }
  ]);

  // 소파 라운지
  charts.loungeSofaQty = mkLine('chartLoungeSofaQty', MONTHS_15, [
    { label:'아테나',   data: SOFA_LOUNGE[0].qty, color:'#2563EB' },
    { label:'메리온하이', data: SOFA_LOUNGE[1].qty, color:'#0D9488' },
    { label:'미노르',   data: SOFA_LOUNGE[2].qty, color:'#D97706' },
    { label:'뉴알도',   data: SOFA_LOUNGE[3].qty, color:'#DC2626' }
  ]);
  charts.loungeSofaRev = mkLine('chartLoungeSofaRev', MONTHS_15, [
    { label:'아테나',   data: SOFA_LOUNGE[0].revs, color:'#2563EB' },
    { label:'메리온하이', data: SOFA_LOUNGE[1].revs, color:'#0D9488' },
    { label:'미노르',   data: SOFA_LOUNGE[2].revs, color:'#D97706' }
  ]);

  // 소파 온라인
  charts.onlineSofaQty = mkLine('chartOnlineSofaQty', MONTHS_15, [
    { label:'클로',      data: SOFA_ONLINE[0].qty, color:'#2563EB' },
    { label:'센느',      data: SOFA_ONLINE[1].qty, color:'#0D9488' },
    { label:'플라나베이직', data: SOFA_ONLINE[2].qty, color:'#D97706' },
    { label:'모션',      data: SOFA_ONLINE[3].qty, color:'#DC2626' }
  ]);
  charts.onlineSofaRev = mkLine('chartOnlineSofaRev', MONTHS_15, [
    { label:'클로',      data: SOFA_ONLINE[0].revs, color:'#2563EB' },
    { label:'센느',      data: SOFA_ONLINE[1].revs, color:'#0D9488' },
    { label:'플라나베이직', data: SOFA_ONLINE[2].revs, color:'#D97706' }
  ]);

  // 가구 라운지
  charts.loungeFurnQty = mkLine('chartLoungeFurnQty', ['26.2','26.3'], [
    { label:'루나 식탁', data:[30,37],   color:'#2563EB' },
    { label:'루나 체어', data:[128,162], color:'#0D9488' },
    { label:'노크 식탁', data:[10,11],   color:'#D97706' },
    { label:'노크 체어', data:[38,70],   color:'#DC2626' }
  ]);
  charts.loungeFurnRev = mkLine('chartLoungeFurnRev', ['26.2','26.3'], [
    { label:'루나', data:[0.38,0.55], color:'#2563EB' },
    { label:'노크', data:[0.08,0.12], color:'#0D9488' }
  ]);

  // 가구 온라인
  charts.onlineFurnQty = mkLine('chartOnlineFurnQty', MONTHS_Q1, [
    { label:'노에뜨스퀘어 식탁', data:[3,4,26],     color:'#2563EB' },
    { label:'노에뜨스퀘어 체어', data:[18,24,115],  color:'#0D9488' },
    { label:'노에뜨오벌',       data:[0,2,4],      color:'#D97706' }
  ]);
  charts.onlineFurnRev = mkLine('chartOnlineFurnRev', MONTHS_Q1, [
    { label:'노에뜨스퀘어', data:[0.04,0.05,0.26], color:'#2563EB' },
    { label:'노에뜨오벌',   data:[0,0.01,0.02],    color:'#0D9488' }
  ]);

  // 리클 백화점
  charts.reclDeptQty = mkLine('chartReclDeptQty', MONTHS_Q1,
    [{ label:'Lillo ED502', data:[0,5,24], color:'#2563EB' }]);
  charts.reclDeptRev = mkLine('chartReclDeptRev', MONTHS_Q1,
    [{ label:'Lillo ED502', data:[0,0.22,1.06], color:'#2563EB' }]);

  // 리클 라운지
  charts.reclLoungeQty = mkLine('chartReclLoungeQty', MONTHS_Q1, [
    { label:'EL501', data:[5,8,7],   color:'#2563EB' },
    { label:'SL301', data:[30,19,31], color:'#0D9488' }
  ]);
  charts.reclLoungeRev = mkLine('chartReclLoungeRev', MONTHS_Q1, [
    { label:'EL501', data:[0.07,0.11,0.09], color:'#2563EB' },
    { label:'SL301', data:[0.36,0.24,0.38], color:'#0D9488' }
  ]);

  // 리클 온라인
  charts.reclOnlineQty = mkLine('chartReclOnlineQty', MONTHS_Q1,
    [{ label:'SO302', data:[1,7,30], color:'#2563EB' }]);
  charts.reclOnlineRev = mkLine('chartReclOnlineRev', MONTHS_Q1,
    [{ label:'SO302', data:[0.09,0.07,0.28], color:'#2563EB' }]);

  // 제품 카드 렌더
  renderProdCards('sofa-dept-cards', SOFA_DEPT);
  renderProdCards('sofa-lounge-cards', SOFA_LOUNGE);
  renderProdCards('sofa-online-cards', SOFA_ONLINE);
}

function renderProdCards(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(d => {
    const badgeClass = d.badge === 'core' ? 'badge-core' : d.badge === 'main' ? 'badge-main' : 'badge-gen';
    const badgeLabel = d.badge === 'core' ? '핵심' : d.badge === 'main' ? '주력' : '일반';
    const imgTag = d.img
      ? `<img src="images/${d.img}.jpg" class="prod-card-img" alt="${d.name}" onerror="this.outerHTML='<div class=\\'prod-card-img-ph\\'>준비중</div>'">`
      : `<div class="prod-card-img-ph">준비중</div>`;
    return `<div class="prod-card">
      ${imgTag}
      <div class="prod-card-body">
        <div class="prod-card-name">${d.name}</div>
        <div class="prod-card-meta">
          <span class="badge ${badgeClass}">${badgeLabel}</span>
          <span class="prod-card-val">${d.monthly}조/월</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

// =====================
// TAB SWITCHERS
// =====================
function switchCh(group, ch, btn) {
  const prefix = `${group}-`;
  document.querySelectorAll(`[id^="${prefix}"]`).forEach(el => el.classList.remove('active'));
  const pane = document.getElementById(`${prefix}${ch}`);
  if (pane) pane.classList.add('active');
  if (btn) {
    btn.closest('.ch-tabs').querySelectorAll('.ch-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  // Resize charts inside the newly visible pane
  setTimeout(() => {
    Object.values(charts).forEach(c => { if (c) c.resize(); });
  }, 50);
}

function switchCat(cat, btn) {
  ['sofa','furn','recl'].forEach(c => {
    const el = document.getElementById(`cat-${c}`);
    if (el) el.classList.remove('active');
  });
  const target = document.getElementById(`cat-${cat}`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  setTimeout(() => {
    Object.values(charts).forEach(c => { if (c) c.resize(); });
  }, 50);
}

// =====================
// MONTH FILTER
// =====================
let currentMonth = 'q1';

function setMonth(month, btn) {
  currentMonth = month;
  document.querySelectorAll('.month-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateKPIs();
  updateMonthlyCharts();
}

function updateKPIs() {
  const d = KPI_DATA[currentMonth];
  document.getElementById('kpi-total').textContent = d.total;
  document.getElementById('kpi-sofa').textContent  = d.sofa;
  document.getElementById('kpi-furn').textContent  = d.furn;
  document.getElementById('kpi-recl').textContent  = d.recl;
}

function updateMonthlyCharts() {
  const range = MONTH_RANGE[currentMonth];
  const [s, e] = range.slice;

  function sliceArr(arr) {
    if (!arr || !arr.length) return [];
    const result = arr.slice(s, e);
    return result;
  }

  // Section 1 monthly chart
  if (charts.monthly) {
    charts.monthly.data.labels = range.labels;
    charts.monthly.data.datasets[0].data = sliceArr(CHANNEL_MONTHLY.dept);
    charts.monthly.data.datasets[1].data = sliceArr(CHANNEL_MONTHLY.lounge);
    charts.monthly.data.datasets[2].data = sliceArr(CHANNEL_MONTHLY.online);
    charts.monthly.update();
  }

  // Section 3 신제품 추이 charts - slice from MONTHS_15 index
  function updateLineChart(chartObj, datasets) {
    if (!chartObj) return;
    chartObj.data.labels = range.labels;
    datasets.forEach((d, i) => {
      if (chartObj.data.datasets[i]) {
        chartObj.data.datasets[i].data = sliceArr(d);
      }
    });
    chartObj.update();
  }

  updateLineChart(charts.deptSofaQty,  SOFA_DEPT.slice(0,5).map(d => d.qty));
  updateLineChart(charts.deptSofaRev,  SOFA_DEPT.slice(0,3).map(d => d.revs));
  updateLineChart(charts.loungeSofaQty, SOFA_LOUNGE.slice(0,4).map(d => d.qty));
  updateLineChart(charts.loungeSofaRev, SOFA_LOUNGE.slice(0,3).map(d => d.revs));
  updateLineChart(charts.onlineSofaQty, SOFA_ONLINE.slice(0,4).map(d => d.qty));
  updateLineChart(charts.onlineSofaRev, SOFA_ONLINE.slice(0,3).map(d => d.revs));

  // Recliner charts (always Q1 data, just filter)
  const reclSlice = [[0,5,24],[0,0.22,1.06],[5,8,7],[30,19,31],[0.07,0.11,0.09],[0.36,0.24,0.38],[1,7,30],[0.09,0.07,0.28]];
  const reclCharts = ['reclDeptQty','reclDeptRev','reclLoungeQty','reclLoungeRev','reclLoungeRev2','reclLoungeRev3','reclOnlineQty','reclOnlineRev'];
  [charts.reclDeptQty, charts.reclDeptRev].forEach((c, ci) => {
    if (!c) return;
    c.data.labels = range.labels;
    c.data.datasets[0].data = sliceArr(reclSlice[ci]);
    c.update();
  });
  [[charts.reclLoungeQty, [[5,8,7],[30,19,31]]], [charts.reclLoungeRev, [[0.07,0.11,0.09],[0.36,0.24,0.38]]]].forEach(([c, arrs]) => {
    if (!c) return;
    c.data.labels = range.labels;
    arrs.forEach((a, i) => { if (c.data.datasets[i]) c.data.datasets[i].data = sliceArr(a); });
    c.update();
  });
  if (charts.reclOnlineQty) {
    charts.reclOnlineQty.data.labels = range.labels;
    charts.reclOnlineQty.data.datasets[0].data = sliceArr([1,7,30]);
    charts.reclOnlineQty.update();
  }
  if (charts.reclOnlineRev) {
    charts.reclOnlineRev.data.labels = range.labels;
    charts.reclOnlineRev.data.datasets[0].data = sliceArr([0.09,0.07,0.28]);
    charts.reclOnlineRev.update();
  }
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  initOverviewCharts();
  initPLCCharts();
  initNewProdCharts();
});
