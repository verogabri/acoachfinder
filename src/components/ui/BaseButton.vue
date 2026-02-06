<template>
    <button v-if="!to" :class="mode" :disabled="disabled">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode" :disabled="disabled">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        mode: {
            type: String,
            required: false
        },  
        to: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        }
    }   
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

</style>
