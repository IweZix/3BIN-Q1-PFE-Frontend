<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  category: string;
  subCategories: SubCategory[];
}

export default defineComponent({
  name: 'LeftNavBarComponent',
  props: {
    categoryTable: {
      type: Array as PropType<Category[]>, 
      required: true,
    },
    selectedSubCategoryId: {
      type: Number, 
      required: true,
    },
  },
  methods: {
    selectSubCategory(id: number) {
      this.$emit('selectSubCategory', id);
    },
  },
});
</script>



<template>
  <div>
    <ul>
      <li v-for="(categoryItem, index) in categoryTable" :key="index">
        <strong>{{ categoryItem.category }}</strong>
        <ul>
          <li
            v-for="sub in categoryItem.subCategories"
            :key="sub.id"
            @click="selectSubCategory(sub.id)"
            :class="{ 'grayed-out': sub.id === selectedSubCategoryId }"
          >
            {{ sub.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.grayed-out {
  color: #bbb;
  pointer-events: none; 
}
</style>