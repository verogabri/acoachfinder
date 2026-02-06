<template>

    <main>
        <section>
            <base-card>
                <h2>{{ fullName }} </h2>
                <h3>$ {{ hourlyRate }}/hour</h3>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>send a message</h2>
                    <base-button mode="outline" :to="contactLink">Send a message</base-button>
                    <router-view />
                </header>    
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in areas" :key="area" :mode="area" :text="area" />
                <p>{{ description }}</p>            
            </base-card>
        </section>
    </main>
    
    
</template>

<script>


export default {
    name: 'CoachDetail',
    props: {
        nameId: {
            type: String,
            required: true
        }
    },  
    data(){
        return {
            selectedCoach: null
        }
    },
    computed: {
        fullName(){
            if(this.selectedCoach){
                return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
            }
            return '';
        },
        hourlyRate(){
            if(this.selectedCoach){
                return this.selectedCoach.hourlyRate;
            }
            return 0;
        },  
        areas(){
            if(this.selectedCoach){
                return this.selectedCoach.areas;
            }
            return [];
        },  
        description(){
            if(this.selectedCoach){
                return this.selectedCoach.description;
            }
            return '';
        },  
        contactLink(){
            return `/coaches/${this.nameId}/contact`;
        }
    },
    created(){
        
        // const coaches = this.$store.getters['coaches/coaches'];
        // this.selectedCoach = coaches.find(
        //     coach => coach.nameId === this.nameId
        // );

        // restituisce il coach tramite il nameId
        this.selectedCoach = this.$store.getters['coaches/coachByNameId'](this.nameId);
    }
}
</script>

<style scoped></style>