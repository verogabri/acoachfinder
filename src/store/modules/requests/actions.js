export default {
    contactCoach(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            nameId: payload.nameId,
            email: payload.email,
            message: payload.message
        };

        context.commit('addRequest', newRequest);

    },
    async postRequest(context, payload) {

        const nameId = payload.nameId;
        const newRequest = {
            // nameId: nameId,
            email: payload.email,
            message: payload.message
        };


        const response = await fetch(`${import.meta.env.VITE_FIREBASE_URL}/requests/${nameId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        console.log('responseData', responseData);

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to post request');
            throw error;
        }

        const request = {
            nameId: nameId,
            ...payload
        };

        context.commit('addRequest', request);
    },
    async loadRequests(context) {
        const nameId = context.rootGetters.nameId;
        const response = await fetch(`${import.meta.env.VITE_FIREBASE_URL}/requests/${nameId}.json`);
        const responseData = await response.json();

        console.log('loadRequests responseData', nameId, responseData);

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to load requests');
            throw error;
        }

        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                nameId: nameId,
                ...responseData[key]
            };

            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
}   