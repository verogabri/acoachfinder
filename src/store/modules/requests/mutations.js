export default {
    addRequest(state, payload) {

        console.log('mutation request', payload);

        state.requests.push(payload);
    },
    setRequests(state, payload) {
        state.requests = payload;
    }
}
