<script lang="ts">
import LeftPanel from '@/components/loginPage/LeftPanelComponent.vue';
import RightPanel from '@/components/loginPage/RightPanelComponent.vue';

export default {
  name: 'LoginPage',
  components: {
    LeftPanel,
    RightPanel
  }
};
</script>

<template>
  <div class="container">
    <div class="content">
      <LeftPanel />
      <RightPanel />
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.content {
  display: flex;
  gap: 0;
  /* Supprime l'espace entre les sections */
  justify-content: center;
  /* Centre horizontalement les éléments */
  align-items: center;
  margin-top: 1rem;
}
</style>
