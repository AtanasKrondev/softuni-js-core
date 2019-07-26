const storage = function () {
    const appKey = 'kid_HkciNywGr';
    const appSecret = '0898de5dcbe145a28a607176b0ffaabb';

    const getData = function (key) {
        return localStorage.getItem(key + appKey);
    };

    const saveData = function (key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    }

    const saveUser = function (data) {
        saveData('userInfo', data);
        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function () {
        localStorage.removeItem('userInfo' + appKey);
        localStorage.removeItem('authToken' + appKey);
    }

    return {
        appKey,
        appSecret,
        getData,
        saveData,
        saveUser,
        deleteUser,
    }
}();