<template>
    <form @submit.prevent="submitForm">

        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model.trim="firstName.value" @blur="clearValidation('firstName')" />
            <p v-if="!firstName.isValid"> Please enter a first name.</p>
        </div>
        
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model.trim="lastName.value" @blur="clearValidation('lastName')"   />
            <p v-if="!lastName.isValid"> Please enter a last name.</p>
        </div>
        
        <div class="form-control"    :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.value" @blur="clearValidation('description')"></textarea>
            <p v-if="!description.isValid"> Please enter a description.</p>
        </div>
        
        <div class="form-control" :class="{invalid: !hourlyRate.isValid}">
            <label for="hourlyrate">Hourly Rate</label>
            <input type="number" id="hourlyrate" v-model.number="hourlyRate.value" @blur="clearValidation('hourlyRate')" />
            <p v-if="!hourlyRate.isValid"> Please enter a hourly rate.</p>
        </div>
        
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model.trim="areas.value" @blur="clearValidation('areas')" />
                <label for="frontend">Frontend</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model.trim="areas.value" @blur="clearValidation('areas')" />
                <label for="backend">Backend</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model.trim="areas.value" @blur="clearValidation('areas')" />
                <label for="career">Career</label>
            </div>
            <p v-if="!areas.isValid"> Please select at least one area.</p>
        </div>

        <p v-if="!isValidForm">Please fix the errors in the form.</p>   
        
        <base-button type="submit" :disabled="!isValidForm" >Add Coach</base-button>
    </form>
</template>

<script>
export default {
    name: 'CoachForm',
    emits: ['saveCoach'],   
    data(){
        return {
            isValidForm: true,
            firstName: {
                value: '',
                isValid: true
            },
            lastName: {
                value: '',
                isValid: true
            },
            description: {
                value: '',
                isValid: true
            },
            hourlyRate: {
                value: '',
                isValid: true
            },
            areas: {
                value: [],
                isValid: true
            }
        }
    },
    methods: {
        clearValidation(input){
            this[input].isValid = true;
            this.isValidForm = true;
        },

        validateForm(){
            this.isValidForm = true;

            if(this.firstName.value.trim() === ''){
                this.firstName.isValid = false;
                this.isValidForm = false;
            }
            if(this.lastName.value.trim() === ''){
                this.lastName.isValid = false;
                this.isValidForm = false;
            }
            if(this.description.value.trim() === ''){
                this.description.isValid = false;
                this.isValidForm = false;
            }
            if(this.hourlyRate.value === '' || this.hourlyRate.value < 0){
                this.hourlyRate.isValid = false;
                this.isValidForm = false;
            }
            if(this.areas.value.length === 0){
                this.areas.isValid = false;
                this.isValidForm = false;
            }


        },  
        submitForm(){
            this.validateForm();

            if(!this.isValidForm){
                return;
            }

            alert('Form is valid');

            const formData = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                description: this.description.value,
                hourlyRate: this.hourlyRate.value,
                areas: this.areas.value
            };
            console.log(formData);

            this.$emit('saveCoach', formData);  
        }
    }
}
</script>

<style scoped >
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.invalid p {
    color: red;
    font-size: 80%;
    margin: 0;
}
</style>