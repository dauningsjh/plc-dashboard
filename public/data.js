// =====================
// 전체 데이터
// =====================
const MONTHS_15 = ['25.1','25.2','25.3','25.4','25.5','25.6','25.7','25.8','25.9','25.10','25.11','25.12','26.1','26.2','26.3'];
const MONTHS_6  = ['25.10','25.11','25.12','26.1','26.2','26.3'];
const MONTHS_Q1 = ['26.1','26.2','26.3'];

// 월별 필터 범위
const MONTH_RANGE = {
  q1:  { labels: MONTHS_Q1,  slice: [12,15] },
  jan: { labels: ['26.1'],   slice: [12,13] },
  feb: { labels: ['26.2'],   slice: [13,14] },
  mar: { labels: ['26.3'],   slice: [14,15] }
};

// KPI 월별 데이터
const KPI_DATA = {
  q1:  { total: '26.5', sofa: '25.6', furn: '1.54', recl: '2.97' },
  jan: { total: '8.15', sofa: '7.59', furn: '0.07', recl: '0.52' },
  feb: { total: '8.36', sofa: '7.66', furn: '0.51', recl: '0.64' },
  mar: { total: '15.62', sofa: '14.34', furn: '1.02', recl: '1.81' }
};

// 채널별 월별 신제품 매출 (소파+가구+리클 합산)
const CHANNEL_MONTHLY = {
  dept:   [2.74, 2.83, 4.74],  // 26.1~3
  lounge: [2.20, 2.72, 3.56],
  online: [3.21, 2.81, 5.32]
};

// =====================
// 백화점 PLC 데이터
// =====================
const DEPT_PLC = [
  { rank:1, name:'브리오스', badge:'core', img:'브리오스', monthly:141.5, rev:null, total:1394, display:'10+13+13',
    trend: [5,43,54,34,69,98,60,94,88,129,117,135,151,145,172] },
  { rank:2, name:'빈체로', badge:'core', img:'빈체로', monthly:115.8, rev:null, total:1625, display:'18+15+9',
    trend: [77,138,96,68,117,112,96,139,87,165,103,99,83,123,122] },
  { rank:3, name:'젤코바', badge:'main', img:'젤코바', monthly:72.7, rev:null, total:1013, display:'14+7+4',
    trend: [66,69,62,47,70,73,59,86,45,79,80,56,70,73,78] },
  { rank:4, name:'헤네스', badge:'main', img:'헤네스', monthly:63, rev:null, total:1068, display:'16+10+6',
    trend: [55,86,84,70,79,81,58,103,74,70,47,54,52,86,69] },
  { rank:5, name:'오거스타', badge:'main', img:'오거스타', monthly:46.3, rev:null, total:910, display:'12+12+8',
    trend: [81,96,52,54,67,82,54,89,57,62,41,47,45,47,36] },
  { rank:6, name:'리버티', badge:'main', img:null, monthly:33, rev:null, total:508, display:'8+5+1',
    trend: [28,41,31,24,42,32,35,41,36,60,26,21,28,35,28] },
  { rank:7, name:'마렌', badge:'main', img:'마렌', monthly:32, rev:0.93, total:204, display:'9+4+2',
    trend: [null,null,null,null,null,null,null,null,12,32,26,33,45,28,28] },
  { rank:8, name:'루시아', badge:'main', img:null, monthly:30.5, rev:null, total:673, display:'9+8+2',
    trend: [60,69,54,48,69,45,44,54,47,43,34,21,16,30,39] },
  { rank:9, name:'볼테라', badge:'gen', img:null, monthly:27, rev:null, total:215, display:'4+2+4',
    trend: [null,null,null,null,null,null,4,28,21,36,16,36,27,22,25] },
  { rank:10, name:'아델라', badge:'gen', img:null, monthly:23.5, rev:null, total:348, display:'4+3+3',
    trend: [10,24,23,19,27,22,22,34,26,34,22,27,17,23,18] },
];

// =====================
// 라운지 PLC 데이터
// =====================
const LOUNGE_PLC = [
  { rank:1, name:'일루전', badge:'core', img:null, monthly:107.5, rev:null, total:1459, display:'9+6',
    trend: [73,85,89,96,97,102,78,115,79,111,112,100,109,102,111] },
  { rank:2, name:'로시오럭스', badge:'core', img:null, monthly:62.7, rev:null, total:559, display:'8+7',
    trend: [null,null,null,3,8,50,20,63,39,60,65,79,64,53,55] },
  { rank:3, name:'엘레아', badge:'core', img:null, monthly:43.3, rev:null, total:791, display:'8+7',
    trend: [58,76,67,57,77,60,35,71,30,87,40,45,24,35,29] },
  { rank:4, name:'카벨로', badge:'core', img:null, monthly:50, rev:null, total:489, display:'6+8',
    trend: [null,null,null,4,2,58,45,51,29,68,54,49,46,27,56] },
  { rank:5, name:'마를로', badge:'main', img:null, monthly:26.2, rev:null, total:531, display:'8+7',
    trend: [23,37,40,26,62,53,40,42,51,40,25,26,19,14,33] },
  { rank:6, name:'레나테', badge:'main', img:null, monthly:21.7, rev:null, total:210, display:'6+5',
    trend: [2,4,2,4,4,2,18,35,9,18,20,27,22,28,15] },
  { rank:7, name:'메리온', badge:'main', img:null, monthly:18.7, rev:null, total:312, display:'9+8',
    trend: [33,25,28,22,16,26,20,19,11,35,19,13,19,13,13] },
  { rank:8, name:'아테나', badge:'main', img:'아테나', monthly:21, rev:0.74, total:105, display:'7+7',
    trend: [null,null,null,null,null,null,null,null,null,null,8,21,21,19,36] },
  { rank:9, name:'리노아', badge:'main', img:null, monthly:17.2, rev:null, total:142, display:'7+7',
    trend: [null,null,null,1,2,4,4,11,17,27,17,19,19,13,8] },
  { rank:10, name:'보놀라', badge:'main', img:null, monthly:14.8, rev:null, total:263, display:'7+7',
    trend: [17,18,25,14,39,21,15,13,12,16,19,15,12,16,11] },
];

// =====================
// 온라인 PLC 데이터
// =====================
const ONLINE_PLC = [
  { rank:1, name:'플랫', badge:'core', img:null, monthly:100.3, rev:null, total:1601,
    trend: [119,115,120,96,113,111,101,134,90,137,87,113,61,96,108] },
  { rank:2, name:'시엘', badge:'core', img:null, monthly:88.2, rev:null, total:1515,
    trend: [124,144,127,81,98,105,102,113,92,89,111,79,48,97,105] },
  { rank:3, name:'클로', badge:'core', img:'클로', monthly:57.5, rev:1.29, total:348,
    trend: [null,null,null,null,null,null,null,null,3,98,38,58,57,44,50] },
  { rank:4, name:'센느', badge:'main', img:'센느', monthly:48.7, rev:0.87, total:371,
    trend: [null,null,null,null,null,null,null,25,54,51,41,71,47,32,50] },
  { rank:5, name:'플라나스윙', badge:'main', img:null, monthly:11.7, rev:null, total:179,
    trend: [15,12,14,7,13,8,8,19,13,5,15,15,10,10,15] },
  { rank:6, name:'아지오', badge:'main', img:null, monthly:20.7, rev:null, total:305,
    trend: [17,12,23,23,21,15,26,27,17,21,21,23,26,19,14] },
  { rank:7, name:'포네', badge:'main', img:null, monthly:14.8, rev:null, total:161,
    trend: [null,null,10,7,9,16,3,19,8,18,12,8,15,23,13] },
  { rank:8, name:'클라임', badge:'main', img:null, monthly:12, rev:null, total:238,
    trend: [25,30,16,22,17,16,10,14,16,22,10,14,10,7,9] },
  { rank:9, name:'루미아', badge:'main', img:null, monthly:12.7, rev:null, total:188,
    trend: [10,19,8,23,10,13,11,11,7,12,12,17,9,15,11] },
  { rank:10, name:'피아', badge:'main', img:'피아', monthly:10.5, rev:0.29, total:63,
    trend: [null,null,null,null,null,null,null,null,null,1,1,0,0,0,61] },
];

// =====================
// 신제품 소파 데이터
// =====================
const SOFA_DEPT = [
  { name:'마렌', badge:'main', img:'마렌', monthly:32, rev:0.93,
    qty:  [null,null,null,null,null,null,null,null,12,32,26,33,45,28,28],
    revs: [null,null,null,null,null,null,null,null,0.36,1.06,0.90,1.09,1.38,0.86,0.84] },
  { name:'벨리체', badge:'gen', img:'벨리체', monthly:17.8, rev:0.76,
    qty:  [null,null,null,null,null,null,null,null,null,29,21,7,15,13,22],
    revs: [null,null,null,null,null,null,null,null,null,1.21,0.90,0.32,0.66,0.57,0.91] },
  { name:'트루엘', badge:'gen', img:'트루엘', monthly:9.7, rev:0.43,
    qty:  [null,null,null,null,null,null,null,null,null,null,null,null,0,5,24],
    revs: [null,null,null,null,null,null,null,null,null,null,null,null,0,0.22,1.06] },
  { name:'그렘보', badge:'gen', img:'그렘보', monthly:3.2, rev:0.15,
    qty:  [null,null,null,null,null,null,null,null,2,4,0,2,5,4,4],
    revs: [null,null,null,null,null,null,null,null,0.10,0.23,0,0.14,0.24,0.16,0.17] },
  { name:'아크', badge:'gen', img:'아크', monthly:3.2, rev:0.15,
    qty:  [null,null,null,null,null,null,null,null,null,2,0,3,5,6,3],
    revs: [null,null,null,null,null,null,null,null,null,0.09,0,0.16,0.23,0.27,0.13] },
  { name:'엘라도', badge:'gen', img:'엘라도', monthly:4.3, rev:0.19,
    qty:  [null,null,null,null,null,null,null,null,null,null,null,null,5,3,5],
    revs: [] },
  { name:'오거스타2', badge:'gen', img:'오거스타2', monthly:2, rev:0.12,
    qty:  [null,null,null,null,null,null,null,null,null,null,null,null,0,0,6],
    revs: [] },
];

const SOFA_LOUNGE = [
  { name:'아테나', badge:'main', img:'아테나', monthly:21, rev:0.74,
    qty:  [null,null,null,null,null,null,null,null,null,null,8,21,21,19,36],
    revs: [null,null,null,null,null,null,null,null,null,null,0.24,0.72,0.76,0.68,1.28] },
  { name:'메리온하이', badge:'main', img:'메리온하이', monthly:11.2, rev:0.38,
    qty:  [null,null,null,null,null,null,null,null,null,2,4,15,23,9,14],
    revs: [null,null,null,null,null,null,null,null,null,0.05,0.14,0.52,0.74,0.32,0.50] },
  { name:'미노르', badge:'gen', img:'미노르', monthly:5.7, rev:0.19,
    qty:  [null,null,null,null,null,null,null,null,null,null,null,null,1,8,8],
    revs: [null,null,null,null,null,null,null,null,null,null,null,null,0.03,0.26,0.28] },
  { name:'뉴알도', badge:'gen', img:'뉴알도', monthly:4.5, rev:0.17,
    qty:  [null,null,null,null,null,null,null,null,null,6,4,5,2,9,1],
    revs: [null,null,null,null,null,null,null,null,null,0.21,0.15,0.19,0.06,0.34,0.04] },
  { name:'뉴커민', badge:'gen', img:'뉴커민', monthly:4, rev:0.13,
    qty:  [null,null,null,null,null,null,null,null,null,2,5,5,3,4,5],
    revs: [] },
  { name:'리베', badge:'gen', img:'리베', monthly:1.7, rev:0.05,
    qty:  [null,null,null,null,null,null,null,null,null,1,2,2,1,4,0],
    revs: [] },
  { name:'루크', badge:'gen', img:'루크', monthly:0.3, rev:0.01,
    qty:  [null,null,null,null,null,null,null,null,null,null,null,null,0,0,1],
    revs: [] },
];

const SOFA_ONLINE = [
  { name:'클로', badge:'core', img:'클로', monthly:57.5, rev:1.29,
    qty:  [null,null,null,null,null,null,null,null,3,98,38,58,57,44,50],
    revs: [null,null,null,null,null,null,null,null,0.06,2.00,0.90,1.28,1.40,0.98,1.16] },
  { name:'센느', badge:'main', img:'센느', monthly:48.7, rev:0.87,
    qty:  [null,null,null,null,null,null,null,25,54,51,41,71,47,32,50],
    revs: [null,null,null,null,null,null,null,0.40,0.98,0.89,0.73,1.29,0.84,0.60,0.87] },
  { name:'플라나베이직', badge:'main', img:'플라나베이직', monthly:15.5, rev:0.31,
    qty:  [null,null,null,null,null,null,null,4,12,13,21,12,17,18,12],
    revs: [null,null,null,null,null,null,null,0.08,0.25,0.26,0.41,0.25,0.33,0.37,0.26] },
  { name:'모션', badge:'gen', img:'모션', monthly:8.25, rev:0.27,
    qty:  [null,null,null,null,null,null,null,null,null,null,null,2,8,12,11],
    revs: [null,null,null,null,null,null,null,null,null,null,null,0.06,0.26,0.40,0.36] },
  { name:'에일로', badge:'gen', img:'에일로', monthly:4, rev:0.11,
    qty:  [9,2,4,4,5,3,3,5,null,null,null,null,3,3,5],
    revs: [] },
  { name:'아르보', badge:'gen', img:'아르보', monthly:3.5, rev:0.09,
    qty:  [null,null,null,null,null,null,null,null,null,5,5,3,0,4,4],
    revs: [] },
  { name:'피아', badge:'main', img:'피아', monthly:10.5, rev:0.29,
    qty:  [null,null,null,null,null,null,null,null,null,1,1,0,0,0,61],
    revs: [null,null,null,null,null,null,null,null,null,0.03,0.03,0,0,0,1.67] },
];
