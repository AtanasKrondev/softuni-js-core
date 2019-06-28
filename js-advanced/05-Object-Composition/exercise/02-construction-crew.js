function constructionCrew(object) {
    if (object.dizziness) {
        object.levelOfHydrated += object.weight * object.experience * 0.1;
        object.dizziness = false;
    }

    return object;
}

constructionCrew({
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
})