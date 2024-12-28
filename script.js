const counters = [
    { color: "white", value: 1, count: 0, points: 0 },
    { color: "pink", value: 2, count: 0, points: 0 },
    { color: "green", value: 3, count: 0, points: 0 },
    { color: "blue", value: 4, count: 0, points: 0 },
    { color: "red", value: 6, count: 0, points: 0 },
    { color: "orange", value: 8, count: 0, points: 0 }
];

function updateCounter(color, delta) {
    const counterObj = counters.find(c => c.color === color);
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
    const counterObj = counters.find(c => c.color === color);
    if (counterObj && counterObj.count > 0) {
        updateCounter(color, -1);
    }
}

function calculateTotal() {
    let totalPoints = counters.reduce((accumulator, counter) => {
                    return accumulator + counter.points;
                }, 0);

    let bonusThreeEqual = calculateBonusThreeEqualCrystals();
    let bonusFourEqual = calculateBonusFourEqualCrystals();
    let bonusFiveDifferent = calculateBonusFiveDifferentCrystals();
    let bonusSixDifferent = calculateBonusSixDifferentCrystals();

    if((bonusThreeEqual + bonusFourEqual + bonusFiveDifferent + bonusSixDifferent) == 0){
        document.getElementById('bonusPanel').textContent = "Nenhum";
    } else{
        let maxBonus = Math.max(bonusThreeEqual, bonusFourEqual, bonusFiveDifferent, bonusSixDifferent);

        switch (maxBonus) {
            case bonusThreeEqual:
                totalPoints += bonusThreeEqual;
                document.getElementById('bonusPanel').textContent = "Três Cristais iguais";
                break;
            case bonusFourEqual:
                totalPoints += bonusFourEqual;
                document.getElementById('bonusPanel').textContent = "Quatro Cristais iguais";
                break;
            case bonusFiveDifferent:
                totalPoints += bonusFiveDifferent;
                document.getElementById('bonusPanel').textContent = "Cinco Cristais diferentes";
                break;
            case bonusSixDifferent:
                totalPoints += bonusSixDifferent;
                document.getElementById('bonusPanel').textContent = "Seis Cristais diferentes";
                break;
        }
    }

    document.getElementById('resultPanel').textContent = totalPoints;
}

function calculateBonusThreeEqualCrystals(){
    const minPointsColor = counters
        .filter(counter => counter.count === 3)
        .reduce((minObj, counter) => {
            return (counter.points < minObj.points) ? counter : minObj;
        }, { points: Infinity });

    const color = minPointsColor.points !== Infinity ? minPointsColor.color : '';

    if (color == '') {
        return 0;
    } else {
        const maxPoints = counters
            .filter(counter => counter.color !== color)
            .reduce((maxObj, counter) => {
                return (counter.points > maxObj.points) ? counter : maxObj;
            }, { points: -Infinity });

        const points = maxPoints.points !== -Infinity ? maxPoints.points : 0;

        return points;
    }
}

function calculateBonusFourEqualCrystals(){
    const minPointsColor = counters
        .filter(counter => counter.count === 4)
        .reduce((minObj, counter) => {
            return (counter.points < minObj.points) ? counter : minObj;
        }, { points: Infinity });

    const color = minPointsColor.points !== Infinity ? minPointsColor.color : '';

    if (color == '') {
        return 0;
    } else {
        const topTwoPointsSum = counters
            .filter(counter => counter.color !== color) 
            .sort((a, b) => b.points - a.points)
            .slice(0, 2)
            .reduce((sum, counter) => sum + counter.points, 0);

        return topTwoPointsSum;
    }
}

function calculateBonusFiveDifferentCrystals(){
    const countGreaterThanOne = counters.filter(counter => counter.count >= 1).length;

    if (countGreaterThanOne == 5)
        return 8;
    else
        return 0;
}

function calculateBonusSixDifferentCrystals(){
    const countGreaterThanOne = counters.filter(counter => counter.count >= 1).length;

    if (countGreaterThanOne == 6)
        return 12;
    else
        return 0;
}

function clearCounters() {
    counters.forEach(counter => {
        counter.count = 0;
        counter.points = 0;
        document.getElementById(`counter-${counter.color}`).textContent = 0;
    });
    document.getElementById('resultPanel').textContent = 0;
    document.getElementById('bonusPanel').textContent = '-';
}