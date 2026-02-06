<template>
    <main>
    <base-card>
        <h2>Register as Coach</h2>
        <coach-form @saveCoach="addCoach" />  
    </base-card>
    </main>
    
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';

export default {
    name: 'CoachRegistration',
    components: {
        CoachForm
    },
    methods: {
        addCoach(coachData){
            console.log('coachData', coachData);
            // this.$store.dispatch('coaches/addCoach', coachData);
            this.$store.dispatch('coaches/putCoach', coachData);
            this.$router.replace('/coaches');   

        }
    }
}
</script>

<style scoped></style>