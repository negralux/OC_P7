<template>
    <div id="profil">
            <h1>Mon profil</h1>
                            <ul class="list-group" v-for="membre in memberDatas" :key="membre.id">
                                <li class="list-group-item">Pseudo: {{membre.pseudo}}</li>
                                <li class="list-group-item">Email: {{membre.email}}</li>
                                <li class="list-group-item">Mot de passe: C'est secret...</li>
                                <li class="list-group-item">Fonction: {{membre.metier}}</li>
                                <li class="list-group-item">Date_inscription: {{membre.date_inscription}}</li>
                                <li class="list-group-item">
                                    <button class="btn btn-danger" v-on:click="supprimerProfil ()">Supprimer mon compte !</button> 
                                </li> 
                            </ul>    
    </div>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'ProfilComponent',
    data () {
        return{
            userId: null,
            userPosts: null,
            memberDatas: null,
            Admin: null,
        }        
    },
    methods:{
            affichageProfil (){
                axios.get('http://localhost:3000/api/user/profil/'+localStorage.authUser,{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  //
                .then(reponse => this.memberDatas = reponse.data)
                .catch(erreur => console.log(erreur));
            },
            supprimerProfil (){
                 axios.delete('http://localhost:3000/api/user/profil/'+localStorage.authUser,{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })
                 .then(function (response) {
                    if(response.status == 200){ // tout est bon dans la suppression cote bdd
                        localStorage.clear(); // on vide la memoire
                        window.location.replace("http://localhost:8080/"); //on va à la page d'accueil
                    }  
                })
                .catch(erreur => console.log(erreur));
            }
    },
    beforeMount(){ 
        this.affichageProfil()

        if(localStorage.authUser && localStorage.levelUser == 4){// si utilisateur connecter est un adminisitrateur
        this.Admin = true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#profil{
    width: 80%;
    margin: auto;
}
</style>