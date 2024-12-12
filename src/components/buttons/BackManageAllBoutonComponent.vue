<script lang="ts">
import router from '@/router/router';

export default {
  name: 'BackManageAllBoutonComponent',
  methods: {
    goBackManageAll() {
      localStorage.removeItem('groupIssueName');
      router.push({
        name: 'ManageAll'
      });
    }
  }
};
</script>

<template>
  <div class="button-back">
    <button class="btn-back" @click="goBackManageAll">
      <img src="../../assets/icons/back.png" alt="Icone retour" class="icon-back" />
      Retour
    </button>
  </div>
</template>

<style>
.btn-back {
  margin-top: 20px;
  margin-left: 16%;
  background-color: #013238;
  color : white;
  border-radius: 6px;
  position: relative;
}

.btn-back:hover {
  background-color: #b5cdbf;
}
</style>
