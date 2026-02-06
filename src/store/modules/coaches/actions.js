export default {
    addCoach(context, coachData) {
        let nameId = coachData.firstName + '_' + coachData.lastName;
        nameId = nameId.toLowerCase().replace(/\s/g, '');


        const coach = {
            id: new Date().toISOString(),
            nameId: nameId,
            ...coachData
        };

        console.log('action coachData', coach);

        context.commit('addCoach', coach);
    },

    async putCoach(context, coachData) {
        const id = context.rootGetters.userId;
        let nameId = coachData.firstName + '_' + coachData.lastName;
        nameId = nameId.toLowerCase().replace(/\s/g, '');


        const coach = {
            nameId: nameId,
            ...coachData
        };

        console.log('action coachData', coach);

        const response = await fetch(`${import.meta.env.VITE_FIREBASE_URL}/coaches/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(coach)
        });

        console.log('response', response);

        // const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to update coach');
            throw error;
        }

        context.commit('addCoach', {
            id: id,
            ...coach
        });
    },
    async loadCoaches(context, payload) {

        // se shouldUpdate è false e forceRefresh è false allora non faccio la chiamata per ricaricare i coaches del database
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            console.log('shouldUpdate è false e forceRefresh è false', payload.forceRefresh, context.getters.shouldUpdate);
            return;
        }

        console.log('loadCoaches ok fetch firebase');
        console.log('process.env.VUE_APP_FIREBASE_URL', import.meta.env.VITE_FIREBASE_URL);


        const response = await fetch(`${import.meta.env.VITE_FIREBASE_URL}/coaches.json`);

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to load coaches');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                // nameId: responseData[key].nameId,
                ...responseData[key]
            };
            coaches.push(coach);
        }

        console.log('coaches', coaches);

        context.commit('setCoaches', coaches);
        context.commit('setLastFetchTime');

    }
}