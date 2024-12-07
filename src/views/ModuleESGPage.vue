<script lang="ts">
import LeftNavBarComponent from '@/components/moduleESGPage/LeftNavBarComponent.vue';
import QuestionComponent from '@/components/moduleESGPage/QuestionComponent.vue';


export default {
  name: 'ModuleESGPage',
  components: {
    LeftNavBarComponent,
    QuestionComponent,
  }

};

</script>
 
<template>
  <div class="row align-items-start">
    <div class="col-3">
      <div class="left-nav-bar">
        <LeftNavBarComponent/>
      </div>
    </div>
    
    <div class="col-9">
      <QuestionComponent  />      
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