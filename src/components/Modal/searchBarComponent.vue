<script lang="ts">
export default {
  name: 'SearchBarComponent',
  data() {
    return {
      query: '' 
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.query); 
    }
  }
};
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      @input="onSearch"
      placeholder="Rechercher dans le glossaire"
      class="form-control"
    />
  </div>
</template>

<style scoped>
.search-bar {
  position: sticky; 
  top: 0;
  z-index: 10;
  margin: 20px 0;
  background-color: white;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  background: none;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-bottom: 2px solid #3f907a;
}
</style>
