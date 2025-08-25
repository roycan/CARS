/* data.js
   Centralized constants: questions (bilingual), scales, rating options, T-score tables, thresholds.
   Global namespace attachment for Grade 9 friendly usage.
*/
(function(){
  const QUESTIONS = [
    { id:1, en:"1. I complain a lot.", tl:"Sobrang akong nagrereklamo." },
    { id:2, en:"2. I feel sad and/or unhappy.", tl:"Nalulungkot ako." },
    { id:3, en:"3. I find it difficult to accept defeat.", tl:"Hirap ako tumanggap ng pagkatalo." },
    { id:4, en:"4. I am not interested in studying.", tl:"Hindi ako interesadong mag-aral." },
    { id:5, en:"5. I disobey adults.", tl:"Di ko sinusunod ang mga nakakatanda." },
    { id:6, en:"6. My mood changes easily.", tl:"Madaling magbago ang aking mood." },
    { id:7, en:"7. I blame others for my mistakes.", tl:"Sinisisi ko ang iba dahil sa aking mga pagkakamali." },
    { id:8, en:"8. I do not participate in class activities.", tl:"Ayaw kong sumali sa mga gawain sa klase." },
    { id:9, en:"9. I am noisy.", tl:"Maingay ako." },
    { id:10, en:"10. I am easily frustrated or disappointed.", tl:"Madali akong mainis o madismaya." },
    { id:11, en:"11. I do not share my things.", tl:"Hindi ako nagbibigay o nagbabahagi ng gamit sa iba." },
    { id:12, en:"12. I do not attend classes regularly.", tl:"Di ako pumapasok nang regular sa klase." },
    { id:13, en:"13. I have short attention span.", tl:"Maikli ang aking atensyon." },
    { id:14, en:"14. I lack self confidence.", tl:"Kulang ang kumpyansa ko sa aking sarili." },
    { id:15, en:"15. I find it difficult to maintain friendships.", tl:"Nahihirapan akong panatiliin ang aking mga kaibigan." },
    { id:16, en:"16. I find it hard to understand the lessons.", tl:"Nahihirapan akong intindihin ang mga aralin." },
    { id:17, en:"17. I am easily distracted.", tl:"Madali akong mawala sa focus." },
    { id:18, en:"18. I worry about a lot of things.", tl:"Nag-aalala ako sa maraming bagay." },
    { id:19, en:"19. I find it hard to make positive comments.", tl:"Nahihirapan akong magbigay ng mga positibong kumento." },
    { id:20, en:"20. I come to school unprepared for the lessons.", tl:"Pumapasok ako sa klase na hindi handa para sa mga aralin." },
    { id:21, en:"21. I have trouble concentrating.", tl:"Nahihirapan akong mag-concentrate." },
    { id:22, en:"22. I find it hard to relax/calm down.", tl:"Nahihirapan akong mag-relax at kumalma." },
    { id:23, en:"23. I refuse others requests for help.", tl:"Tumatanggi akong magbigay ng tulong sa mga taong humihingi nito." },
    { id:24, en:"24. I don't finish my class assignment on time.", tl:"Hindi ko natatapos ang aking mga seatwork sa nakatakdang oras." },
    { id:25, en:"25. In the past month, I had thoughts of hurting myself.", tl:"Sa nakaraang buwan, naisip kong saktan ang sarili ko.", special:true }
  ];

  const SCALES = [
    { key:'externalizing', label:'Externalizing', items:[1,5,9,13,17,21] },
    { key:'internalizing', label:'Internalizing', items:[2,6,10,14,18,22] },
    { key:'social', label:'Social', items:[3,7,11,15,19,23] },
    { key:'academic', label:'Academic/Learning', items:[4,8,12,16,20,24] },
    { key:'total', label:'Total', items:Array.from({length:24},(_,i)=>i+1) }
  ];

  const RATING_OPTIONS = [
    { label:"Never (0)", value:0 },
    { label:"Rarely (1)", value:1 },
    { label:"Occasionally (2)", value:2 },
    { label:"Often (3)", value:3 },
    { label:"Almost Always (4)", value:4 }
  ];

  const T_SCORE_TABLE = {
    externalizing:{0:31,1:34,2:37,3:40,4:42,5:45,6:48,7:51,8:54,9:56,10:59,11:62,12:65,13:68,14:71,15:73,16:76,17:79,18:82,19:85,20:87,21:90,22:93},
    internalizing:{0:30,1:32,2:34,3:36,4:38,5:40,6:42,7:44,8:46,9:47,10:49,11:51,12:53,13:55,14:57,15:59,16:61,17:63,18:64,19:66,20:68,21:70,22:72},
    social:{0:36,1:39,2:42,3:45,4:48,5:51,6:54,7:57,8:60,9:63,10:66,11:69,12:72,13:75,14:78,15:81,16:84,17:87,18:90,19:93,20:96,21:99,22:102},
    academic:{0:35,1:38,2:40,3:43,4:46,5:48,6:51,7:54,8:56,9:59,10:62,11:64,12:67,13:70,14:72,15:75,16:78,17:80,18:83,19:86,20:88,21:91,22:94},
    total:{0:29,1:29,2:30,3:31,4:32,5:32,6:33,7:34,8:34,9:35,10:36,11:37,12:37,13:38,14:39,15:40,16:40,17:41,18:42,19:43,20:44,21:44,22:45,23:46,24:47,25:48,26:49,27:50,28:51,29:51,30:52,31:53,32:54,33:55,34:55,35:56,36:57,37:58,38:59,39:59,40:60,41:61,42:62,43:62,44:63,45:64,46:65,47:65,48:66,49:67,50:68,51:69,52:69,53:70,54:71,55:72,56:72,57:73,58:74,59:75,60:76,61:76,62:77,63:78,64:79,65:80,66:80,67:81,68:81,69:82,70:83,71:84,72:85,73:86,74:87,75:88,76:88,77:89,78:90,79:90,80:91,81:92,82:93,83:94,84:94,85:95,86:96,87:97,88:98,89:98,90:99,91:100,92:101,93:101,94:102,95:103,96:104}
  };

  const RISK_THRESHOLDS = { normalMax:60, atRiskMax:70 };
  const SELF_HARM_ITEM_INDEX = 24; // zero-based index for question 25
  const DATA_SCHEMA_VERSION = 1;

  window.CARS = window.CARS || {};
  window.CARS.data = { QUESTIONS, SCALES, RATING_OPTIONS, T_SCORE_TABLE, RISK_THRESHOLDS, SELF_HARM_ITEM_INDEX, DATA_SCHEMA_VERSION };
})();
