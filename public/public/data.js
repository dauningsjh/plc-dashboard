const MONTHS_15 = ['25.1','25.2','25.3','25.4','25.5','25.6','25.7','25.8','25.9','25.10','25.11','25.12','26.1','26.2','26.3'];
const MONTHS_Q1 = ['26.1','26.2','26.3'];
const MONTH_RANGE = {
  q1:  { labels: MONTHS_Q1, slice:[12,15] },
  jan: { labels:['26.1'],   slice:[12,13] },
  feb: { labels:['26.2'],   slice:[13,14] },
  mar: { labels:['26.3'],   slice:[14,15] }
};
const KPI_DATA = {
  q1:  {total:'26.5', sofa:'25.6', furn:'1.54', recl:'2.97'},
  jan: {total:'8.15', sofa:'7.59', furn:'0.07', recl:'0.52'},
  feb: {total:'8.36', sofa:'7.66', furn:'0.51', recl:'0.64'},
  mar: {total:'15.62',sofa:'14.34',furn:'1.02', recl:'1.81'}
};
const CHANNEL_MONTHLY = {
  dept:  [2.74,2.83,4.74],
  lounge:[2.20,2.72,3.56],
  online:[3.21,2.81,5.32]
};
function imgSrc(n){
  const m={
    '마렌':'마렌','벨리체':'벨리체','트루엘':'트루엘','그렘보':'그렘보','아크':'아크',
    '엘라도':'엘라도','오거스타2':'오거스타2','온다레':'온다레','아테나':'아테나',
    '메리온 하이':'메리온하이','미노르':'미노르','뉴알도':'뉴알도','뉴커민':'뉴커민',
    '리베':'리베','아셀':'아셀','루크':'루크','클로':'클로','센느':'센느',
    '플라나 베이직':'플라나베이직','피아':'피아','모션':'모션','에일로':'에일로',
    '모도':'모도','아르보':'아르보','벨로아':'벨로아','라르고':'라르고',
    '트로노':'트로노','테네브':'테네브','루나':'루나','노크':'노크',
    '노에뜨 스퀘어':'노에뜨스퀘어','노에뜨 오벌':'노에뜨오벌','마롱':'마롱',
    '오브렌':'오브렌','리비에':'리비에','Lillo_ED502':'Lillo_ED502',
    'Lillo_SL301':'Lillo_SL301','Lillo_SO302':'Lillo_SO302',
    '델로':'델로','톰버':'톰버','카렌':'카렌','베니토':'베니토','페어':'페어'
  };
  return m[n]?`images/${m[n]}.jpg`:null;
}

// 백화점 PLC
const DEPT_PLC=[
  {rank:1, name:'브리오스',   badge:'core',monthly_qty:141.5,monthly_rev:6.61,total:1394,trend:[5,43,54,34,69,98,60,94,88,129,117,135,151,145,172]},
  {rank:2, name:'빈체로',     badge:'core',monthly_qty:115.8,monthly_rev:3.92,total:1625,trend:[77,138,96,68,117,112,96,139,87,165,103,99,83,123,122]},
  {rank:3, name:'젤코바',     badge:'main',monthly_qty:72.7, monthly_rev:3.02,total:1013,trend:[66,69,62,47,70,73,59,86,45,79,80,56,70,73,78]},
  {rank:4, name:'헤네스',     badge:'main',monthly_qty:63.0, monthly_rev:2.32,total:1068,trend:[55,86,84,70,79,81,58,103,74,70,47,54,52,86,69]},
  {rank:5, name:'오거스타',   badge:'main',monthly_qty:46.3, monthly_rev:2.75,total:910, trend:[81,96,52,54,67,82,54,89,57,62,41,47,45,47,36]},
  {rank:6, name:'리버티',     badge:'main',monthly_qty:33.0, monthly_rev:1.14,total:508, trend:[28,41,31,24,42,32,35,41,36,60,26,21,28,35,28]},
  {rank:7, name:'마렌',       badge:'main',monthly_qty:32.0, monthly_rev:1.02,total:204, trend:[null,null,null,null,null,null,null,null,12,32,26,33,45,28,28]},
  {rank:8, name:'루시아',     badge:'main',monthly_qty:30.5, monthly_rev:1.64,total:673, trend:[60,69,54,48,69,45,44,54,47,43,34,21,16,30,39]},
  {rank:9, name:'볼테라',     badge:'gen', monthly_qty:27.0, monthly_rev:0.87,total:215, trend:[null,null,null,null,null,null,4,28,21,36,16,36,27,22,25]},
  {rank:10,name:'아델라',     badge:'gen', monthly_qty:23.5, monthly_rev:1.34,total:348, trend:[10,24,23,19,27,22,22,34,26,34,22,27,17,23,18]},
  {rank:11,name:'비텔로2',    badge:'gen', monthly_qty:20.2, monthly_rev:0.84,total:363, trend:[43,35,21,16,31,21,29,19,27,25,20,14,23,19,20]},
  {rank:12,name:'아반티',     badge:'gen', monthly_qty:19.5, monthly_rev:null, total:408, trend:[32,40,51,30,27,31,29,21,30,16,18,24,19,19,21]},
  {rank:13,name:'오거스타2',  badge:'gen', monthly_qty:2.0,  monthly_rev:0.12,total:null,trend:[null,null,null,null,null,null,null,null,null,null,null,null,0,0,6]},
];

// 라운지 PLC
const LOUNGE_PLC=[
  {rank:1, name:'일루전',     badge:'core',monthly_qty:107.5,monthly_rev:4.54,total:1459,trend:[73,85,89,96,97,102,78,115,79,111,112,100,109,102,111]},
  {rank:2, name:'로시오럭스', badge:'core',monthly_qty:62.7, monthly_rev:2.24,total:559, trend:[null,null,null,3,8,50,20,63,39,60,65,79,64,53,55]},
  {rank:3, name:'카벨로',     badge:'core',monthly_qty:50.0, monthly_rev:1.57,total:489, trend:[null,null,null,4,2,58,45,51,29,68,54,49,46,27,56]},
  {rank:4, name:'엘레아',     badge:'core',monthly_qty:43.3, monthly_rev:1.37,total:791, trend:[58,76,67,57,77,60,35,71,30,87,40,45,24,35,29]},
  {rank:5, name:'마를로',     badge:'main',monthly_qty:26.2, monthly_rev:0.73,total:531, trend:[23,37,40,26,62,53,40,42,51,40,25,26,19,14,33]},
  {rank:6, name:'아테나',     badge:'main',monthly_qty:21.0, monthly_rev:0.74,total:105, trend:[null,null,null,null,null,null,null,null,null,null,8,21,21,19,36]},
  {rank:7, name:'레나테',     badge:'main',monthly_qty:21.7, monthly_rev:0.60,total:210, trend:[2,4,2,4,4,2,18,35,9,18,20,27,22,28,15]},
  {rank:8, name:'메리온',     badge:'main',monthly_qty:18.7, monthly_rev:0.65,total:312, trend:[33,25,28,22,16,26,20,19,11,35,19,13,19,13,13]},
  {rank:9, name:'리노아',     badge:'main',monthly_qty:17.2, monthly_rev:null, total:142, trend:[null,null,null,1,2,4,4,11,17,27,17,19,19,13,8]},
  {rank:10,name:'보놀라',     badge:'main',monthly_qty:14.8, monthly_rev:null, total:263, trend:[17,18,25,14,39,21,15,13,12,16,19,15,12,16,11]},
  {rank:11,name:'메리온 하이',badge:'main',monthly_qty:11.2, monthly_rev:0.38,total:67,  trend:[null,null,null,null,null,null,null,null,null,2,4,15,23,9,14]},
  {rank:12,name:'뉴알도',     badge:'gen', monthly_qty:4.5,  monthly_rev:0.17,total:27,  trend:[null,null,null,null,null,null,null,null,null,6,4,5,2,9,1]},
  {rank:13,name:'미노르',     badge:'gen', monthly_qty:5.7,  monthly_rev:0.19,total:17,  trend:[null,null,null,null,null,null,null,null,null,null,null,null,1,8,8]},
  {rank:14,name:'뉴커민',     badge:'gen', monthly_qty:4.0,  monthly_rev:0.13,total:24,  trend:[null,null,null,null,null,null,null,null,null,2,5,5,3,4,5]},
];

// 온라인 PLC
const ONLINE_PLC=[
  {rank:1, name:'플랫',        badge:'core',monthly_qty:100.3,monthly_rev:2.92,total:1601,trend:[119,115,120,96,113,111,101,134,90,137,87,113,61,96,108]},
  {rank:2, name:'시엘',        badge:'core',monthly_qty:88.2, monthly_rev:1.68,total:1515,trend:[124,144,127,81,98,105,102,113,92,89,111,79,48,97,105]},
  {rank:3, name:'클로',        badge:'core',monthly_qty:57.5, monthly_rev:1.29,total:348, trend:[null,null,null,null,null,null,null,null,3,98,38,58,57,44,50]},
  {rank:4, name:'센느',        badge:'main',monthly_qty:48.7, monthly_rev:0.87,total:371, trend:[null,null,null,null,null,null,null,25,54,51,41,71,47,32,50]},
  {rank:5, name:'플랫B',       badge:'main',monthly_qty:47.8, monthly_rev:1.38,total:694, trend:[40,35,37,36,47,46,43,74,49,73,75,45,17,41,36]},
  {rank:6, name:'아지오',      badge:'main',monthly_qty:20.7, monthly_rev:null, total:305, trend:[17,12,23,23,21,15,26,27,17,21,21,23,26,19,14]},
  {rank:7, name:'플라나 베이직',badge:'main',monthly_qty:15.5,monthly_rev:0.31,total:109, trend:[null,null,null,null,null,null,null,4,12,13,21,12,17,18,12]},
  {rank:8, name:'포네',        badge:'main',monthly_qty:14.8, monthly_rev:null, total:161, trend:[null,null,10,7,9,16,3,19,8,18,12,8,15,23,13]},
  {rank:9, name:'루미아',      badge:'main',monthly_qty:12.7, monthly_rev:null, total:188, trend:[10,19,8,23,10,13,11,11,7,12,12,17,9,15,11]},
  {rank:10,name:'클라임',      badge:'main',monthly_qty:12.0, monthly_rev:null, total:238, trend:[25,30,16,22,17,16,10,14,16,22,10,14,10,7,9]},
  {rank:11,name:'피아',        badge:'main',monthly_qty:10.5, monthly_rev:0.29,total:63,  trend:[null,null,null,null,null,null,null,null,null,1,1,0,0,0,61]},
  {rank:12,name:'모션',        badge:'gen', monthly_qty:8.3,  monthly_rev:0.27,total:33,  trend:[null,null,null,null,null,null,null,null,null,null,null,2,8,12,11]},
];

// 소파 신제품
const SOFA_DEPT=[
  {name:'마렌',    badge:'main',monthly_qty:32.0,monthly_rev:0.93,qty:[null,null,null,null,null,null,null,null,12,32,26,33,45,28,28],rev:[null,null,null,null,null,null,null,null,0.36,1.06,0.90,1.09,1.38,0.86,0.84]},
  {name:'벨리체',  badge:'gen', monthly_qty:17.8,monthly_rev:0.76,qty:[null,null,null,null,null,null,null,null,null,29,21,7,15,13,22],rev:[null,null,null,null,null,null,null,null,null,1.21,0.90,0.32,0.66,0.57,0.91]},
  {name:'트루엘',  badge:'gen', monthly_qty:9.7, monthly_rev:0.43,qty:[null,null,null,null,null,null,null,null,null,null,null,null,0,5,24],rev:[null,null,null,null,null,null,null,null,null,null,null,null,0,0.22,1.06]},
  {name:'그렘보',  badge:'gen', monthly_qty:3.2, monthly_rev:0.15,qty:[null,null,null,null,null,null,null,null,2,4,0,2,5,4,4],rev:[null,null,null,null,null,null,null,null,0.10,0.23,0,0.14,0.24,0.16,0.17]},
  {name:'아크',    badge:'gen', monthly_qty:3.2, monthly_rev:0.15,qty:[null,null,null,null,null,null,null,null,null,2,0,3,5,6,3],rev:[null,null,null,null,null,null,null,null,null,0.09,0,0.16,0.23,0.27,0.13]},
  {name:'엘라도',  badge:'gen', monthly_qty:4.3, monthly_rev:0.19,qty:[null,null,null,null,null,null,null,null,null,null,null,null,5,3,5],rev:[null,null,null,null,null,null,null,null,null,null,null,null,0.23,0.14,0.20]},
  {name:'오거스타2',badge:'gen',monthly_qty:2.0, monthly_rev:0.12,qty:[null,null,null,null,null,null,null,null,null,null,null,null,0,0,6],rev:[]},
  {name:'온다레',  badge:'gen', monthly_qty:0.3, monthly_rev:0.13,qty:[null,null,null,null,null,null,null,null,null,null,null,null,0,1,0],rev:[]},
];
const SOFA_LOUNGE=[
  {name:'아테나',     badge:'main',monthly_qty:21.0,monthly_rev:0.74,qty:[null,null,null,null,null,null,null,null,null,null,8,21,21,19,36],rev:[null,null,null,null,null,null,null,null,null,null,0.24,0.72,0.76,0.68,1.28]},
  {name:'메리온 하이',badge:'main',monthly_qty:11.2,monthly_rev:0.38,qty:[null,null,null,null,null,null,null,null,null,2,4,15,23,9,14],rev:[null,null,null,null,null,null,null,null,null,0.05,0.14,0.52,0.74,0.32,0.50]},
  {name:'미노르',     badge:'gen', monthly_qty:5.7, monthly_rev:0.19,qty:[null,null,null,null,null,null,null,null,null,null,null,null,1,8,8],rev:[null,null,null,null,null,null,null,null,null,null,null,null,0.03,0.26,0.28]},
  {name:'뉴알도',     badge:'gen', monthly_qty:4.5, monthly_rev:0.17,qty:[null,null,null,null,null,null,null,null,null,6,4,5,2,9,1],rev:[null,null,null,null,null,null,null,null,null,0.21,0.15,0.19,0.06,0.34,0.04]},
  {name:'뉴커민',     badge:'gen', monthly_qty:4.0, monthly_rev:0.13,qty:[null,null,null,null,null,null,null,null,null,2,5,5,3,4,5],rev:[]},
  {name:'리베',       badge:'gen', monthly_qty:1.7, monthly_rev:0.05,qty:[null,null,null,null,null,null,null,null,null,1,2,2,1,4,0],rev:[]},
  {name:'아셀',       badge:'gen', monthly_qty:2.0, monthly_rev:0.06,qty:[null,null,null,null,null,null,null,null,null,null,null,null,1,2,3],rev:[]},
  {name:'루크',       badge:'gen', monthly_qty:0.3, monthly_rev:0.01,qty:[null,null,null,null,null,null,null,null,null,null,null,null,0,0,1],rev:[]},
];
const SOFA_ONLINE=[
  {name:'클로',          badge:'core',monthly_qty:57.5,monthly_rev:1.29,qty:[null,null,null,null,null,null,null,null,3,98,38,58,57,44,50],rev:[null,null,null,null,null,null,null,null,0.06,2.00,0.90,1.28,1.40,0.98,1.16]},
  {name:'센느',          badge:'main',monthly_qty:48.7,monthly_rev:0.87,qty:[null,null,null,null,null,null,null,25,54,51,41,71,47,32,50],rev:[null,null,null,null,null,null,null,0.40,0.98,0.89,0.73,1.29,0.84,0.60,0.87]},
  {name:'플라나 베이직', badge:'main',monthly_qty:15.5,monthly_rev:0.31,qty:[null,null,null,null,null,null,null,4,12,13,21,12,17,18,12],rev:[null,null,null,null,null,null,null,0.08,0.25,0.26,0.41,0.25,0.33,0.37,0.26]},
  {name:'피아',          badge:'main',monthly_qty:10.5,monthly_rev:0.29,qty:[null,null,null,null,null,null,null,null,null,1,1,0,0,0,61],rev:[null,null,null,null,null,null,null,null,null,0.03,0.03,0,0,0,1.67]},
  {name:'모션',          badge:'gen', monthly_qty:8.3, monthly_rev:0.27,qty:[null,null,null,null,null,null,null,null,null,null,null,2,8,12,11],rev:[null,null,null,null,null,null,null,null,null,null,null,0.06,0.26,0.40,0.36]},
  {name:'에일로',        badge:'gen', monthly_qty:4.0, monthly_rev:0.11,qty:[9,2,4,4,5,3,3,5,null,null,null,null,3,3,5],rev:[]},
  {name:'모도',          badge:'gen', monthly_qty:4.0, monthly_rev:0.10,qty:[2,5,4,4,1,6,null,null,null,null,null,null,6,4,5],rev:[]},
  {name:'아르보',        badge:'gen', monthly_qty:3.5, monthly_rev:0.09,qty:[null,null,null,null,null,null,null,null,null,5,5,3,0,4,4],rev:[]},
  {name:'벨로아',        badge:'gen', monthly_qty:1.7, monthly_rev:0.03,qty:[null,null,null,null,null,null,null,null,null,null,null,null,2,2,1],rev:[]},
];

// 가구 신제품
const FURN_LOUNGE=[
  {name:'루나',    badge:'main',monthly_qty:33.5,monthly_rev:0.47,
   qty_table:[null,null,null,null,null,null,null,null,null,null,null,null,null,30,37],
   qty_chair:[null,null,null,null,null,null,null,null,null,null,null,null,null,128,162],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,null,0.38,0.55]},
  {name:'노크',    badge:'gen', monthly_qty:10.5,monthly_rev:0.10,
   qty_table:[null,null,null,null,null,null,null,null,null,null,null,null,null,10,11],
   qty_chair:[null,null,null,null,null,null,null,null,null,null,null,null,null,38,70],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,null,0.08,0.12]},
];
const FURN_ONLINE=[
  {name:'노에뜨 스퀘어',badge:'main',monthly_qty:11.0,monthly_rev:0.12,
   qty_table:[null,null,null,null,null,null,null,null,null,null,null,null,3,4,26],
   qty_chair:[null,null,null,null,null,null,null,null,null,null,null,null,18,24,115],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,0.04,0.05,0.26]},
  {name:'노에뜨 오벌',  badge:'main',monthly_qty:2.0, monthly_rev:0.02,
   qty_table:[null,null,null,null,null,null,null,null,null,null,null,null,0,2,4],
   qty_chair:[],rev:[null,null,null,null,null,null,null,null,null,null,null,null,0,0.01,0.02]},
  {name:'마롱',          badge:'gen', monthly_qty:1.0, monthly_rev:0.003,
   qty_table:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,1],
   qty_chair:[],rev:[]},
];

// 리클라이너
const RECL_DEPT=[
  {name:'Lillo_ED502',label:'ED502 (전동)',badge:'main',monthly_qty:9.7,monthly_rev:0.43,
   qty:[null,null,null,null,null,null,null,null,null,null,null,null,0,5,24],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,0,0.22,1.06]},
];
const RECL_LOUNGE=[
  {name:'Lillo_EL501',label:'EL501 (전동)',badge:'gen', monthly_qty:6.7, monthly_rev:0.09,
   qty:[null,null,null,null,null,null,null,null,null,null,null,null,5,8,7],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,0.07,0.11,0.09]},
  {name:'Lillo_SL301',label:'SL301 (수동)',badge:'main',monthly_qty:26.7,monthly_rev:0.33,
   qty:[null,null,null,null,null,null,null,null,null,null,null,null,30,19,31],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,0.36,0.24,0.38]},
];
const RECL_ONLINE=[
  {name:'Lillo_SO302',label:'SO302 (전동)',badge:'main',monthly_qty:12.7,monthly_rev:0.15,
   qty:[null,null,null,null,null,null,null,null,null,null,null,null,1,7,30],
   rev:[null,null,null,null,null,null,null,null,null,null,null,null,0.09,0.07,0.28]},
];
