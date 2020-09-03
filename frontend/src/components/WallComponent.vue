<template>
    <div class="wall">
        <h1>Groupomania's Wall</h1>
        <div class="wallButton"> 
            <button type="button" class="btn btn-info" v-on:click="newPost ()" v-if="formWallActif">Créer un post</button>
            <button type="button" class="btn btn-danger" v-on:click="cancelPost ()" v-if="!formWallActif">Annuler le post</button>
        </div>

        <div class="wallPartieForm" v-if="!formWallActif">
            <form @submit.prevent="formPostToWall">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Titre:</span>
                    </div>
                    <input type="text" class="form-control" pattern="^[^&amp;'<>@&quot;()!_$*€£`+=\/;?#]+$" v-model="title">
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Texte:</span>
                    </div>
                    <textarea class="form-control" pattern="^[^&amp;'<>@&quot;()!_$*€£`+=\/;?#]+$" v-model="content" ></textarea>
                </div>

                <div v-if="!image">
                    <h4>Vous pouvez ajouter une image à votre post:</h4>
                    <input type="file" @change="onFileChange">
                </div>
                <div v-else>
                    <img :src="image" /><br /><br />
                    <button @click="removeImage">Effacer l'image...</button>
                    </div>
                <br /><br />
                <button class="btn btn-success" type="submit">Poster et voir sur le WALL !</button>

            </form>   


        </div>

        <div class="wallPartiePosts" v-if="formWallActif">
                <article class="articlePost" v-for="wallpost in wallPosts" :key="wallpost.id"> 
                    <div class="post-element" v-html="decodeURI(wallpost.title)"></div>
                    <div class="post-element">Ecrit par: {{ wallpost.userPseudo }} le {{ wallpost.date_publication }} </div>
                    <div class="post-element" v-html="decodeURI(wallpost.content)"></div>
                    <div class="post-element" v-if="wallpost.urlImage"><img :src="wallpost.urlImage"></div>
                </article>                                    
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'WallComponent',
    data () {
        return{
            error: null,
            title: null,
            content: null,
            userId: null,
            wallPosts: null,
            formWallActif: true,
            Admin: false,
            image: ''
        }        
    },
    mounted() {
        if(localStorage.authUser) {
            this.userId = localStorage.authUser;
        }
    },
    methods:{
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var reader = new FileReader();
                var vm = this;
                vm.image = new Image();

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function () {
                this.image = '';
            },
            affichageWall (){
                axios.get('http://localhost:3000/api/wall/',{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  //-> getAllTheWall -> faudrait en fonction de l'utilisateur
                .then(reponse => this.wallPosts = reponse.data)
                .catch(erreur => console.log(erreur));
            },
            newPost (){
                this.formWallActif =  false
            },
            cancelPost (){
                this.formWallActif = true 
            },
            formPostToWall (){
                if (this.title == null || this.content == null) { //si input titre et content nul pas de validation
                    return false;
                }
                axios.post('http://localhost:3000/api/wall/',{
                        title: this.title,
                        content: this.content,
                        imageUrl: this.image,
                        userId: this.userId
                    },{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                }) //identifiant en localstorage
                .then(function (response) {
                    console.log(response)
                    if(response.status == 200){ //= post bien inscrit dans la base sql
                        window.location.reload(); 
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans le traitement sur le serveur !");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            },
  
    },
    beforeMount(){ 
        this.affichageWall() 

        if(localStorage.authUser && localStorage.levelUser == 4){// si utilisateur connecter est un adminisitrateur
        this.Admin = true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wall{
    width: 98%;
    margin: auto;
        h1{
            margin-top: 2%;
        }
}
.wallButton{
    margin-top: 2%;
}
.wallPartiePosts, .wallPartieForm{
    margin-top: 1%;
}

.articlePost{
    border: 2px solid black;
    margin-bottom: 2%;
    display: flex;
    flex-direction: column;
}
.post-element{
    flex-basis: 100%;
}
.post-element:nth-child(1){ //div titre
    font-size: 1.1em;
    text-align: left; 
    padding-left: 1%;
    color: white;
    background-color: black;
}
.post-element:nth-child(2){ //div auteur + date
    font-size: 0.8em;
    text-align: right;
    padding-right: 1%;
    border-top: 1px solid black;
    font-weight: bolder;
}
.post-element:nth-child(3){ //div texte
    font-size: 1.2em;
    text-align: center;
    padding: 5%;
    border-top: 1px solid black;
    background-color: grey;
    color: white;
}
.post-element:nth-child(4){ //div texte
    border-top: 1px solid black;
    padding: 3%;
}
.post-element:nth-child(5){ //div texte
    border-top: 1px solid black;
    padding: 1%;
    text-align: right;
}
.input-group{ //formulaire
    margin-bottom: 2%;
}
</style>