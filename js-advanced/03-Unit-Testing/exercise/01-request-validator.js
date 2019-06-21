function requestValidator(object) {
    const regEx = {
        method: /(^GET$|^POST$|^DELETE$|^CONNECT$)/,
        uri: /(^[a-z0-9\.]+$|^\*$)/,
        version: /(^HTTP\/0.9$|^HTTP\/1.0$|^HTTP\/1.1$|^HTTP\/2.0$)/,
        message: /[\<\>\\\&\'\"]+/
    }

    if (object.method === undefined || !regEx.method.test(object.method)) {
        throw new Error('Invalid request header: Invalid Method');
    }

    if (object.uri === undefined || !regEx.uri.test(object.uri)) {
        throw new Error('Invalid request header: Invalid URI');
    }

    if (object.version === undefined || !regEx.version.test(object.version)) {
        throw new Error('Invalid request header: Invalid Version');
    }

    if (object.message === undefined || regEx.message.test(object.message)) {
        throw new Error('Invalid request header: Invalid Message');
    }

    return object;
}

console.log(requestValidator({
    method: 'POST',
    version: 'HTTP/2.0',
    message: 'rm -rf /*'
}));
