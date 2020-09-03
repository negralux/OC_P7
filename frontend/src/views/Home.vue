<template>
  <div class="home">
    <div id="infoConnexionToUseApi">Vous devez être connecté.e pour utiliser l'application !</div>
      <ConnexionComponent />
  </div>

</template>

<script>
// @ is an alias to /src
import ConnexionComponent from '@/components/ConnexionComponent.vue'

export default {
  name: 'HomeView',
  components: {
    ConnexionComponent
  }
}
</script>

<style scoped lang="scss">

#infoConnexionToUseApi{
  margin-top: 4%;
  margin-bottom: 2%;
  color: red;
}


</style>

