<script lang="ts">
import LeftNavBarComponent from '@/components/moduleESGPage/LeftNavBarComponent.vue';
import QuestionAdminComponent from '@/components/moduleESGAdminPage/QuestionAdminComponent.vue';

export default {
  name: 'AdminValidatedForm',
  components: {
    LeftNavBarComponent,
    QuestionAdminComponent
  },
  data() {
    return {
      email: this.$route.params.email as string,
      }}
      ,
      mounted() {
      }}

</script>

<template>
  <div class="row align-items-start">
    <div class="col-3">
      <div class="left-nav-bar">
        <LeftNavBarComponent />
      </div>
    </div>

    <div class="col-9">
      <QuestionAdminComponent :mail= email />
    </div>
  </div>
</template>

<style>
.leftNavbarComponent {
  position: sticky;
  width: 250px;
  height: 100%;
  z-index: 1000;
}
</style>
