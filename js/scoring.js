/* scoring.js
   Pure scoring & classification functions attached to CARS namespace.
*/
(function(){
  const { SCALES, T_SCORE_TABLE, RISK_THRESHOLDS, SELF_HARM_ITEM_INDEX } = window.CARS.data;

  function collectAnswers(formEl){
    const answers = [];
    for(const q of window.CARS.data.QUESTIONS){
      const input = formEl.querySelector(`input[name="q${q.id-1}"]:checked`);
      answers.push(input ? parseInt(input.value,10) : 0);
    }
    return answers;
  }

  function computeRawScores(answers, scales=SCALES){
    const raw = {};
    for(const scale of scales){
      raw[scale.key] = scale.items.reduce((sum,itemId)=> sum + answers[itemId-1], 0);
    }
    return raw;
  }

  function convertRawToTScore(scaleKey, raw){
    const table = T_SCORE_TABLE[scaleKey];
    if(!table) return null;
    if(table[raw] !== undefined) return table[raw];
    const keys = Object.keys(table).map(Number).sort((a,b)=>a-b);
    if(raw <= keys[0]) return table[keys[0]];
    if(raw >= keys[keys.length-1]) return table[keys[keys.length-1]];
    let lower = keys[0];
    for(const k of keys){ if(k > raw) return table[lower]; lower = k; }
    return table[lower];
  }

  function convertAllToTScores(rawScores){
    const tScores = {};
    for(const key in rawScores){ tScores[key] = convertRawToTScore(key, rawScores[key]); }
    return tScores;
  }

  function determineRisk(tScores, hasSelfHarm){
    const total = tScores.total;
    let riskLevel, interpretation;
    if (total <= RISK_THRESHOLDS.normalMax){
      riskLevel = "Normal/No Risk"; interpretation = "Learners continue to receive Tier I support.";
    } else if (total <= RISK_THRESHOLDS.atRiskMax){
      riskLevel = "At-risk"; interpretation = "In addition to Tier I support, learner is recommended for Tier II support.";
    } else {
      riskLevel = "High risk"; interpretation = "In addition to Tier I support, learner is recommended for Tier III support.";
    }
    if(hasSelfHarm){
      riskLevel = "High risk";
      interpretation = "Immediate high-risk classification due to thoughts of self-harm. In addition to Tier I support, learner is recommended for Tier III support. Please consider speaking with a trusted adult, counselor, or mental health professional.";
    }
    return { riskLevel, interpretation };
  }

  function buildResult(answers, rawScores, tScores, riskInfo, hasSelfHarm){
    return {
      date: new Date().toISOString(),
      answers,
      rawScores,
      tScores,
      riskLevel: riskInfo.riskLevel,
      interpretation: riskInfo.interpretation,
      selfHarmOverride: hasSelfHarm
    };
  }

  function calculateResultPipeline(formEl){
    const answers = collectAnswers(formEl);
    const rawScores = computeRawScores(answers);
    const tScores = convertAllToTScores(rawScores);
    const hasSelfHarm = answers[SELF_HARM_ITEM_INDEX] === 1;
    const riskInfo = determineRisk(tScores, hasSelfHarm);
    return buildResult(answers, rawScores, tScores, riskInfo, hasSelfHarm);
  }

  window.CARS.scoring = { collectAnswers, computeRawScores, convertRawToTScore, convertAllToTScores, determineRisk, buildResult, calculateResultPipeline };
})();
