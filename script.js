const quartzList = [
    { color: "white", value: 1, count: 0, points: 0 },
    { color: "pink", value: 2, count: 0, points: 0 },
    { color: "green", value: 3, count: 0, points: 0 },
    { color: "blue", value: 4, count: 0, points: 0 },
    { color: "red", value: 6, count: 0, points: 0 },
    { color: "orange", value: 8, count: 0, points: 0 }
];

function updateCounter(color, delta) {
    const counterObj = quartzList.find(c => c.color === color);
    if (counterObj) {
        counterObj.count += delta;
        counterObj.points = (counterObj.value * counterObj.count);
        document.getElementById(`counter-${color}`).textContent = counterObj.count;
    }
}

function incrementCounter(color) {
    updateCounter(color, 1);
}

function decrementCounter(color) {
    const counterObj = quartzList.find(c => c.color === color);
    if (counterObj && counterObj.count > 0) {
        updateCounter(color, -1);
    }
}

function calculateTotal() {
    const totalPoints = quartzList.reduce((sum, crystal) => sum + crystal.points, 0);

    const bonuses = {
        "Três Cristais Iguais": calculateBonusThreeEqualCrystals(),
        "Quatro Cristais Iguais": calculateBonusFourEqualCrystals(),
        "Cinco Cristais Diferentes": calculateBonusFiveDifferentCrystals(),
        "Seis Cristais Diferentes": calculateBonusSixDifferentCrystals()
    };

    const maxBonusType = Object.keys(bonuses).reduce((maxType, type) => 
        bonuses[type] > bonuses[maxType] ? type : maxType
    , Object.keys(bonuses)[0]);

    const maxBonusValue = bonuses[maxBonusType];

    const bonusPanel = document.getElementById('bonusPanel');
    const resultPanel = document.getElementById('resultPanel');

    if (maxBonusValue === 0)
        bonusPanel.textContent = "Nenhum";
    else
        bonusPanel.textContent = maxBonusType;

    resultPanel.textContent = totalPoints + maxBonusValue;
}

function calculateBonusThreeEqualCrystals() {
    const eligibleCrystals = quartzList.filter(quartz => quartz.count >= 3);

    if (eligibleCrystals.length === 0)
        return 0;

    const eligibleCrystalWithMinPoints = eligibleCrystals.reduce((minQuartz, currentQuartz) => 
        currentQuartz.points < minQuartz.points ? currentQuartz : minQuartz
    );

    const otherCrystals = quartzList.filter(quartz => quartz.color !== eligibleCrystalWithMinPoints.color);

    const crystalWithMaxPoints = otherCrystals.reduce((maxQuartz, currentQuartz) => 
        currentQuartz.points > maxQuartz.points ? currentQuartz : maxQuartz
    );

    return crystalWithMaxPoints.points;
}

function calculateBonusFourEqualCrystals() {
    const eligibleCrystals = quartzList.filter(quartz => quartz.count >= 4);

    if (eligibleCrystals.length === 0)
        return 0;

    const eligibleCrystalWithMinPoints = eligibleCrystals.reduce((minQuartz, currentQuartz) => 
        currentQuartz.points < minQuartz.points ? currentQuartz : minQuartz
    );

    const otherCrystals = quartzList.filter(quartz => quartz.color !== eligibleCrystalWithMinPoints.color);

    const topTwoPointsSum = otherCrystals
        .sort((a, b) => b.points - a.points)
        .slice(0, 2)
        .reduce((sum, quartz) => sum + quartz.points, 0);

    return topTwoPointsSum;
}

function calculateBonusFiveDifferentCrystals(){
    const countGreaterThanOne = quartzList.filter(counter => counter.count >= 1).length;

    return countGreaterThanOne === 5 ? 8 : 0;
}

function calculateBonusSixDifferentCrystals(){
    const countGreaterThanOne = quartzList.filter(counter => counter.count >= 1).length;

    return countGreaterThanOne === 6 ? 12 : 0;
}

function clearCounters() {
    quartzList.forEach(quartz => {
        quartz.count = 0;
        quartz.points = 0;
        document.getElementById(`counter-${quartz.color}`).textContent = 0;
    });
    document.getElementById('resultPanel').textContent = 0;
    document.getElementById('bonusPanel').textContent = '-';
}