<script lang="ts">
export default {
    name: 'FooterComponent',
};
</script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>@2024 Copyright - All rights reserved.
        </p>
      </div>
    </div>
  </footer>

</template>

<style scoped>
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #013238;
    color: #b5cdbf;
    text-align: center;
    display: flex;
    align-items: center;
    /* Centrage vertical */
    justify-content: center;
    /* Centrage horizontal */
    padding-top: 15px;
    /* Légèrement remonté */
}
</style>