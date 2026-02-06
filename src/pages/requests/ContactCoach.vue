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
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        
        <form v-else @submit.prevent="submitForm" >
            <div class="form-control" :class="{invalid: !emailIsValid}" >
                <label for="email">Your Email</label>
                <input type="email" id="email" v-model.trim="email" @blur="clearValidation('email')" />
                <p v-if="!emailIsValid"> Please enter a valid email.</p>
            </div>
            <div class="form-control" :class="{invalid: !messageIsValid}" >
                <label for="message">Message</label>
                <textarea id="message" rows="5" v-model.trim="message" @blur="clearValidation('message')"   ></textarea>
                <p v-if="!messageIsValid"> Please enter a message.</p>
            </div>

            <p class="errors" v-if="!formIsValid">Please fix the errors in the form.</p>
            
            <div class="actions">
                <base-button type="submit">Send Message</base-button>
            </div>
        </form>

    </section>
    </main>
</template>

<script>
export default {
    name: 'ContactCoach',
    data(){
        return {
            email: '',
            message: '',
            formIsValid: true,
            emailIsValid: true,
            messageIsValid: true,
            isLoading: false,
            error: null
        }
    },
    methods: {
        clearValidation(input){
            if(input==='email'){
                this.emailIsValid = true;
            }
            if(input==='message'){
                this.messageIsValid = true;
            }
        },
        validateForm(){
            this.formIsValid = true;

            if(this.email.trim() === '' || !this.email.includes('@')){
                this.formIsValid = false;
                this.emailIsValid = false;
            }
            if(this.message.trim() === ''){
                this.formIsValid = false;
                this.messageIsValid = false;    
            }
        },

        async submitForm(){

            this.isLoading = true;  

            this.validateForm();

            if(!this.formIsValid){
                return;
            }

            const payload = {
                email: this.email,
                message: this.message,
                nameId: this.$route.params.nameId                
            };
            
            console.log('contact coach : payload = ', payload);
            console.log('contact coach : nameId = ', this.$route.params);

            try{
                await this.$store.dispatch('requests/postRequest', payload);
                this.$router.replace('/coaches');

            }catch(error){
                this.error = error.message || 'Request failed. Please try again.';
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
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
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