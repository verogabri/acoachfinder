
export default {
    coaches(state) {
        return state.coaches;
    },
    coachByNameId: (state) => (nameId) => {
        return state.coaches.find(coach => coach.nameId === nameId);
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },
    shouldUpdate(state) {

        const lastFetchTime = state.lastFetchTime;

        if (!lastFetchTime) {
            return true;
        }

        const currentTime = new Date().getTime();
        // true se la differenza è maggiore di 60 secondi
        return (currentTime - lastFetchTime) / 1000 > 60;
    }


}