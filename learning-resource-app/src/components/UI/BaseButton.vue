<template>
  <button :type="type" :class="mode">
    <!-- We could've just allowed the user to insert a text via prop -->
    <!-- But this gives the developer the option to pass an svg icon, etc.  -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
}

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

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>
