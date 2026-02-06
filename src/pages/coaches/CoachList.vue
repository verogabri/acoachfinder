<template>
    <main>
        <base-dialog :show="!!error" @close="closeDialog">
            <template #header>
                <h2>Something went wrong</h2>
            </template>
            <template #default>
                <p>{{ error }}</p>
            </template>
        </base-dialog>

        <section>
            <coach-filter @change-filters="setFilters" />
        </section>

        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button to="/registration">Register new Coach</base-button>
                </div>

                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <CoachItems v-for="coach in coaches" 
                        :key="coach.id" 
                        v-bind="coach"
                    />
                </ul>
                <h3 v-else>No coaches found. Maybe register one?</h3>
            </base-card>
        </section>
    </main>
</template>

<script>
import CoachItems from '@/components/coaches/CoachItems.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';


export default {
    name: 'CoachList',
    components: {
        CoachItems,
        CoachFilter,
    },
    data(){
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: false,
            error: null
        }
    },
    computed: {
        coaches(){
            // return this.$store.getters['coaches/coaches'];
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if(this.filters.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(this.filters.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(this.filters.career && coach.areas.includes('career')){
                    return true;
                }
                return false;
            });

        },
        hasCoaches(){
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        }
    },
    methods: {
        setFilters(filters){
            this.filters = filters;
        },
        closeDialog(){
            this.error = null;
        },
        async loadCoaches(forceRefresh = false){    
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh });
            } catch (error) {
                console.log(error);
                this.error = error.message || 'Failed to load coaches';

            } finally {
                this.isLoading = false;
            }
        }
    },
    created() {
        this.loadCoaches();
    }  
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>