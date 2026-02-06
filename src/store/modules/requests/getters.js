export default {
    requests(state) {
        console.log('requests getter : ', state.requests);
        return state.requests;
    },
    requestsOfUser(state, getters, rootState, rootGetters) {
        const nameId = rootGetters.nameId;
        return state.requests.filter(request => request.nameId === nameId);
    },
    hasRequests(state, getters) {
        return getters.requestsOfUser && getters.requestsOfUser.length > 0;
    }
}   