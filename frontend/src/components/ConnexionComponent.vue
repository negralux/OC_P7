<template>
  <div class="connexion">
    {{messageNavigation}}
      <h1>Connexion</h1>
      <b-form @submit.prevent="formConnexion">
        <b-form-group id="input-group-1" label-for="input-1" description="">
          <b-form-input id="input-1" v-model="email" type="email" required pattern="^[^&amp;'<>&quot;()!_$*€£`+=\/;?#]+$" placeholder="Saisissez votre adresse mail..."></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input id="input-2" v-model="password" type="password" required pattern="^[^&amp;'<>&quot;()!_$*€£`+=\/;?#]+$" placeholder="Saisissez votre mot de passe..."></b-form-input>
        </b-form-group>
        <button class="btn btn-primary" type="submit">Connexion</button>
      </b-form>
      
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'ConnexionComponent',
    data() {
          return{
            email: '',
            password: '' , 
            messageNavigation: null,
          }
    },
  methods:{
    formConnexion (){
      //const vm = this;
      if (this.email == null || this.password == null) {
          return false;
      }
      axios.post('http://localhost:3000/api/user/login', {
              email: this.email,
              password: this.password,
      })
      .then(function (response) {
          if(response){ //si l'utilisateur est bien peut etre bien inscrit
              if(response.status == 200 && response.data.token){ // si reponse 200 et presence token tout est bon
                localStorage.setItem('authUser',response.data.userId) //on logue en memoire l'Id de l'utilisateur
                localStorage.setItem('levelUser',response.data.userLevel) //on logue en memoire le niveau de l'utilisateur
                localStorage.setItem('authUserToken',response.data.token) //on logue en memoire le token de l'utilisateur
                localStorage.setItem('userPseudo',response.data.userPseudo) //on logue en mémoire le pseudo pour personnalisé
                window.location.replace("http://localhost:8080/");
                }else{
                this.messageNavigation = "Adresse mail ou mot de passe incorrect !";
              }
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
