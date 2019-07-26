const userModel = function () {

    const register = function (params) {
        const data = {
            username: params.username,
            password: params.password,
        };

        const url = `/user/${storage.appKey}`;
        const authString = `Basic ${btoa(`${storage.appKey}:${storage.appSecret}`)}`;

        const headers = {
            body: JSON.stringify(data),
            headers: {
                Authorization: authString,
            }
        }

        return requester.post(url, headers);
    };

    const login = function (params) {
        const url = `/user/${storage.appKey}/login`;
        const authString = `Basic ${btoa(`${params.username}:${params.password}`)}`;

        const headers = {
            headers: {
                Authorization: authString,
            },
            body: JSON.stringify({ ...params }),
        }

        return requester.post(url, headers)
    };

    const logout = function () {
        const url = `/user/${storage.appKey}/_logout`;
        const headers = {
            headers: {}
        }
        return requester.post(url, headers);
    };

    return {
        register,
        login,
        logout
    }
}();