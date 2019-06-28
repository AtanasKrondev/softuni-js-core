function extensibleObj(obj, template) {
    let result = Object.create(obj);
    console.log(Object.getPrototypeOf(result));


}

extensibleObj({ a: 1 }, 0);