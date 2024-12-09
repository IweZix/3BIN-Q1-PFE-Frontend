<script lang="ts">
import LeftNavBarComponent from '@/components/moduleESGPage/LeftNavBarComponent.vue';
import QuestionComponent from '@/components/moduleESGPage/QuestionComponent.vue';
import AnimatedCircularProgressBar from '@/components/moduleESGPage/AnimatedCircularProgressBar.vue';

export default {
  name: 'ModuleESGPage',
  components: {
    LeftNavBarComponent,
    QuestionComponent,
    AnimatedCircularProgressBar,
  },
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    next(value: number) {
      this.value = Math.round(value);
    },
    prev(value: number) {
      this.value = Math.round(value);
    },
  },
};
</script>

<template>
  <div class="row align-items-start">
    <div class="col-3">
      <div class="col-5">
        <AnimatedCircularProgressBar
          :max="100"
          :min="0"
          :value="value"
        />
      </div>
      <div class="left-nav-bar">
        <LeftNavBarComponent />
      </div>
    </div>

    <div class="col-9">
      <QuestionComponent 
        @next="next"
        @prev="prev"
      />
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
