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
        <header>
            <h2>Requests Received</h2>
        </header>

        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>

        <ul v-if="hasRequests">
            
            <requests-item 
                v-for="request in requestsAll" 
                :key="request.id" 
                :email="request.email" 
                :message="request.message" 
            />
            
        </ul>
        <h3 v-else>there is nothing here yet!</h3>
    </section>
    </main>
</template>

<script>
import RequestsItem from '@/components/requests/RequestsItem.vue';
export default {
    name: 'RequestsReceived',
    data(){
        return {
            isLoading: false,
            error: null
        }
    },
    components: {
        RequestsItem
    },
    computed: {
        requestsAll() {
            console.log('requestsAll : ', this.$store.getters['requests/requests']);

            return this.$store.getters['requests/requests'];
        },
        requestsOfUser() {
            return this.$store.getters['requests/requestsOfUser'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    created() {
        this.loadRequests();
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/loadRequests');
            } catch (error) {
                this.error = error.message || 'Failed to load requests';
            } finally {
                this.isLoading = false;
            }
        },
        closeDialog(){
            this.error = null;
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>