function htmlGrade(examPoints, homeworkCompleted, totalHomework) {
    const totalPoints = (examPoints / 400 * 90) + (homeworkCompleted / totalHomework * 10);
    const maxPoints = 100;
    let grade = 3 + 2 * (totalPoints - maxPoints / 5) / (maxPoints / 2);
    if (examPoints === 400 || grade > 6) {
        grade = 6;
    }
    if (grade < 3) {
        grade = 2
    }
    console.log(grade.toFixed(2));
}

htmlGrade(399, 1, 1);
htmlGrade(200, 5, 5);