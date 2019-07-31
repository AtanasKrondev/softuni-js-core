const eventModel = function () {
    const createEvent = function (params) {
        let data = {
            ...params,
            peopleInterestedIn: 0,
            organizer: JSON.parse(storage.getData('userInfo')).username
        }

        let url = `/appdata/${storage.appKey}/events`;

        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers)
    }

    const getAllEvents = function () {
        let url = `/appdata/${storage.appKey}/events`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    const getEvent = function(id){
        let url = `/appdata/${storage.appKey}/events/${id}`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    return {
        createEvent,
        getAllEvents,
        getEvent
    }
}();
