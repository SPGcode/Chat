<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-card class="text-center">
        <v-card-text>
            <v-avatar>
                <img
                :src="user.foto"
                :alt="user.nombre"
                >
            </v-avatar>
        </v-card-text>
        <v-card-text>
            <h3> {{user.nombre}} </h3>
        </v-card-text>
        <v-card-text>
            <input type="file" ref="button" class="d-none" @change="getImg($event)">
            <v-btn color="accent" @click="$refs.button.click()">Buscar imagen</v-btn>
            <v-btn color="success" class="ml-3" :disabled="file === null" @click="updateImg">Subir imagen</v-btn>
        </v-card-text>
        <v-card-text v-if="updateSucces === null">
            <v-img :src="tempUrl">
            </v-img>
        </v-card-text>
        <v-card-text v-if="updateSucces != null">
            <p> {{updateSucces}} </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex"
import {db, storage} from "../firebase"

export default {
    data() {
        return {
            file: null,
            tempUrl: '',
            updateSucces: null
        }
    },
    methods: {
        getImg(event){
            this.file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e)=> {
                this.tempUrl = e.target.result
            }
        },
        async updateImg(){
            try {
                const refImg = storage.ref().child(this.user.email).child('foto perfil')
                const res = await refImg.put(this.file)
                if (res){
                    this.updateSucces = 'Foto actualizada correctamente'
                }
                const url = await refImg.getDownloadURL()
                this.user.foto = url
                await db.collection('users').doc(this.user.uid).update({
                    foto: this.user.foto
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapState(['user'])
    },
}
</script>
