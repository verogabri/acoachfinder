<template>
    <li>
        <div class="request-details">
            <a :href="emailLink">{{ email }}</a>
        </div>
        <p class="request-message">{{ message }}</p>
    </li>
</template>

<script>
export default {
    name: 'RequestsItem',
    props: {
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    methods: {
        emailLink(){
            return 'mailto:' + this.email;
        }
    }
}   
</script>   

<style scoped>
/*
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
*/

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 12px;
}

.request-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.request-details a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

.request-details a:hover,
.request-details a:active {
  color: #8d008d;
}

.request-message {
  margin: 0.5rem 0;
  font-style: italic;
}


</style>