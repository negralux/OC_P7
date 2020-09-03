<template>
  <div class="admin">
      <h3>Tableau de bord [ADMIN]</h3>
        <b-card no-body>
            <b-tabs pills card>
                <b-tab title="Inscription(s)"  @click="affichageDerniersInscrits()" active>
                    <b-card-text >
                        <b-card no-body >                           
                            <b-tabs pills card vertical>
                                <b-tab title="New" active v-for="(membre, index) in memberDatas" :key="membre.id">
                                    <b-card-text>
                                            <ul class="list-group">
                                            <li class="list-group-item">Pseudo:<br /> {{membre.pseudo}}</li>
                                            <li class="list-group-item">Email:<br /> {{membre.email}}</li>
                                            <li class="list-group-item">Mot de passe:<br /> C'est secret...</li>
                                            <li class="list-group-item">Fonction:<br /> {{membre.metier}}</li>
                                            <li class="list-group-item">Inscription:<br /> {{membre.date_inscription}}</li>
                                            <li class="list-group-item">
                                            <b-button size="sm" variant="success" v-on:click="validerProfil(index,membre.id)">Valider le membre !</b-button> 
                                            </li>
                                            <li class="list-group-item">
                                            <b-button size="sm" variant="danger" v-on:click="supprimerProfil(index,membre.id)">Supprimer le membre !</b-button> 
                                            </li> 
                                        </ul>  
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-card-text>
                </b-tab>
                <b-tab title="Les derniers post" @click="affichageDerniersPosts()">
                  <b-card-text>
                        <b-card no-body>
                            <b-tabs pills card vertical>
                                <b-tab title="A lire" active v-for="(post, index) in postDatas" :key="post.id">
                                    <b-card-text>
                                            <ul class="list-group">
                                            <li class="list-group-item">Titre:<br /> <p v-html="decodeURI(post.title)"></p></li>
                                            <li class="list-group-item">Message:<br /> <p v-html="decodeURI(post.content)"></p></li>
                                            <li class="list-group-item" v-if="post.urlImage">Image:<br /><img :src="post.urlImage"></li>
                                            <li class="list-group-item">Ecrit par:<br /> {{post.userPseudo}}</li>
                                            <li class="list-group-item" v-if="!moderationEnCours">
                                                <b-button size="sm" variant="warning" v-on:click="modererPost()">Modérer le post !</b-button>
                                            </li>
                                            <li class="list-group-item" v-if="!moderationEnCours">
                                                <b-button size="sm" variant="success" v-on:click="validerPost(index,post.id)">Marquez le post comme lu !</b-button>
                                            </li>
                                            <li class="list-group-item" v-if="!moderationEnCours">
                                                <b-button size="sm" variant="danger" v-on:click="deletePost(index,post.id)">Supprimer le post !</b-button>
                                            </li>
                                            <li class="list-group-item" v-if="moderationEnCours">
                                                <b-button size="sm" variant="danger" v-on:click="cancelModererPost()">Annuler modération !</b-button>
                                            </li>
                                            <li class="list-group-item" v-if="moderationEnCours">
                                                <b-form @submit.prevent="formModeration(post.id)">
                                                    <b-form-group id="input-group-1" label-for="input-1" description="">
                                                    <b-form-input id="input-1" v-model="moderation" type="textarea" required pattern="^[^&amp;'<>&quot;()!_$*€£`+=\/;?#]+$" placeholder="Texte de modération..."></b-form-input>
                                                    </b-form-group>
                                                    <button class="btn btn-primary" variant="success" type="submit">Valider texte de modération</button>
                                                </b-form>
                                            </li>
                                        </ul>  
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'AdminComponent',
    data() {
          return{
              memberDatas: null,
              postDatas: null,
              id: null,
              moderationEnCours: null,
              moderation: null
          }
    },
  methods:{
        formModeration(id){
                const vm = this;
                if (this.moderation == null) {
                    return false;
                }
                axios.post('http://localhost:3000/api/admin/moderation/'+id, {
                        moderation: this.moderation,
                        },{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })
                .then(function (response) {
                    if(response.status == 200){ //post bien enregistrer
                        vm.cancelModererPost()
                        vm.affichageDerniersPosts()
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la saisie côté serveur !");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            },
        modererPost(){
            this.moderationEnCours = true
        },
        cancelModererPost(){
            this.moderationEnCours = false
            this.moderation = null
        },
        affichageDerniersInscrits(){
            axios.get('http://localhost:3000/api/admin/lastSignup/',{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // afficher tous les derniers inscrit non valider
            .then(reponse => this.memberDatas = reponse.data)
            .catch(erreur => console.log(erreur));
        },
        affichageDerniersPosts(){
            axios.get('http://localhost:3000/api/admin/lastPosts/',{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // afficher tous les derniers inscrit non valider
            .then(reponse => this.postDatas = reponse.data)
            .catch(erreur => console.log(erreur));
        },
        validerProfil(index,id){
            const vm = this;
            axios.put('http://localhost:3000/api/admin/setupSignup/'+id,{hello: 'world'},{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // mettre a jour par validation admin
            .then(function (response) {
                    if(response.status == 200){  //-> NE MARCHE PAS
                        vm.memberDatas.splice(index,1)
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la validation !");
                    }
            })
            .catch(erreur => console.log(erreur));    
        },
        supprimerProfil(index,id){
            const vm = this;
            axios.delete('http://localhost:3000/api/user/profil/'+id,{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // mettre a jour par validation admin
            .then(function (response) {
                    if(response.status == 200){ 
                         vm.memberDatas.splice(index,1)
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la validation !");
                    }
            })
            .catch(erreur => console.log(erreur));    
        },
        validerPost(index,id){
            const vm = this;
            axios.put('http://localhost:3000/api/admin/setupPost/'+id,{hello: 'world'},{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // mettre a jour par validation admin
            .then(function (response) {
                    if(response.status == 200){  //-> NE MARCHE PAS
                        vm.postDatas.splice(index,1)
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la validation !");
                    }
            })
            .catch(erreur => console.log(erreur));    
        },
        deletePost(index,id){
            const vm = this;
            axios.delete('http://localhost:3000/api/admin/deletePost/'+id,{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // mettre a jour par validation admin
            .then(function (response) {
                    if(response.status == 200){  //-> NE MARCHE PAS
                        vm.postDatas.splice(index,1)
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la validation !");
                    }
            })
            .catch(erreur => console.log(erreur));    
        },
    },
    mounted(){
        this.affichageDerniersInscrits()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3{
    margin-top: 2%;
    margin-bottom: 4%;
}
</style>
