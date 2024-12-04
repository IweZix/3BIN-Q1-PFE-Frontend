<script lang="ts">
import { PropType } from 'vue';

interface Category {
  category: string;
  subCategories: string[];
}


export default {
  name: 'LeftNavBarComponent',
  props: {
    categoryTable: {
    type: Array as PropType<Category[]>,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <ul>
      <li v-for="(categoryItem, index) in categoryTable" :key="index">
        <strong>{{ categoryItem.category }}</strong>
        <ul>
          <li v-for="(sub, subIndex) in categoryItem.subCategories" :key="subIndex">
            {{ sub }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>