<template>
    <li>
        <h3>{{ fullName }} </h3>
        <h4>$ {{ hourlyRate }}/hour</h4>
        <div>
            <base-badge v-for="area in areas" :key="area" :mode="area" :text="area" />
        </div>
        <div class="actions">
            <p><base-button :to="coachDetailLink">Details</base-button></p>
            <p><base-button mode="outline" :to="coachContactLink">Contact</base-button></p>
        </div>
    </li>
</template>



<script>
export default {
    name: 'CoachItems',
    props: {
        id: {
            type: String,
            required: true
        },
        nameId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        hourlyRate: {
            type: Number,
            required: true
        },
        areas: {
            type: Array,
            required: true
        }
    },
    computed: {
        fullName(){
            return `${this.firstName} ${this.lastName}`;
        },
        coachDetailLink(){
            return `/coaches/${this.nameId}`;
        },
        coachContactLink(){
            return `/coaches/${this.nameId}/contact`;
        }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>