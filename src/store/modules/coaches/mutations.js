export default {
    addCoach(state, coach) {
        console.log('mutation coachData', coach);
        state.coaches.push(coach);

        console.log(state.coaches);
    },
    setCoaches(state, coaches) {
        state.coaches = coaches;
    },
    setLastFetchTime(state) {
        state.lastFetchTime = new Date().getTime();
    }
}