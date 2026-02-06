import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
    state() {
        return {
            userId: 'd2',
            nameId: 'super_pippo'
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        nameId(state) {
            return state.nameId;
        }
    }
});

export default store;