QUnit.module('Scoring Logic', function() {

  QUnit.test('computeRawScores: calculates scores correctly', function(assert) {
    const answers = Array(24).fill(1); // All answers are '1'
    const rawScores = CARS.scoring.computeRawScores(answers);
    
    assert.equal(rawScores.externalizing, 6, 'Externalizing score should be 6');
    assert.equal(rawScores.internalizing, 6, 'Internalizing score should be 6');
    assert.equal(rawScores.social, 6, 'Social score should be 6');
    assert.equal(rawScores.academic, 6, 'Academic score should be 6');
    assert.equal(rawScores.total, 24, 'Total score should be 24');
  });

  QUnit.test('computeRawScores: handles all zeros', function(assert) {
    const answers = Array(24).fill(0); // All answers are '0'
    const rawScores = CARS.scoring.computeRawScores(answers);
    
    assert.equal(rawScores.externalizing, 0, 'Externalizing score should be 0');
    assert.equal(rawScores.internalizing, 0, 'Internalizing score should be 0');
    assert.equal(rawScores.social, 0, 'Social score should be 0');
    assert.equal(rawScores.academic, 0, 'Academic score should be 0');
    assert.equal(rawScores.total, 0, 'Total score should be 0');
  });

  QUnit.test('determineRisk: identifies Normal/No Risk', function(assert) {
    const tScores = { total: 60 };
    const riskInfo = CARS.scoring.determineRisk(tScores, false);
    assert.equal(riskInfo.riskLevel, 'Normal/No Risk', 'Should be Normal/No Risk at T-score 60');
  });

  QUnit.test('determineRisk: identifies At-risk', function(assert) {
    const tScores = { total: 65 };
    const riskInfo = CARS.scoring.determineRisk(tScores, false);
    assert.equal(riskInfo.riskLevel, 'At-risk', 'Should be At-risk at T-score 65');
  });

  QUnit.test('determineRisk: identifies High risk', function(assert) {
    const tScores = { total: 71 };
    const riskInfo = CARS.scoring.determineRisk(tScores, false);
    assert.equal(riskInfo.riskLevel, 'High risk', 'Should be High risk at T-score 71');
  });

  QUnit.test('determineRisk: self-harm override works', function(assert) {
    const tScores = { total: 40 }; // A low T-score
    const riskInfo = CARS.scoring.determineRisk(tScores, true);
    assert.equal(riskInfo.riskLevel, 'High risk', 'Should be High risk due to self-harm override');
    assert.ok(riskInfo.interpretation.includes('Immediate high-risk'), 'Interpretation should reflect the override');
  });

});
