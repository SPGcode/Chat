<template>
  <v-layout justify-center mt-5>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text
          class="display-1 text-uppercase primary white--text text-center"
          :class="registro ? 'success' : 'accent'"
        >
          <span v-if="!registro">Ingreso</span>
          <span v-if="registro">Registro</span>
        </v-card-text>
        <v-card-text>
          <v-btn block color="error" @click="google()">
            <v-icon left dark>fab fa-google</v-icon>
            Google
          </v-btn>
          <v-btn block color="info" @click="facebook()">
            <v-icon left dark>fab fa-facebook</v-icon>
            Facebook
          </v-btn>
        </v-card-text>
        <v-card-text>
          <v-btn block @click="registro = true" v-if="!registro"
            >¿No tienes cuenta? Registrate aqui</v-btn
          >
          <v-btn block @click="registro = false" v-if="registro"
            >¿Ya tienes cuenta? Ingresa aqui</v-btn
          >
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebase } from "../firebase";
import { mapMutations, mapActions } from "vuex";
import router from '@/router'
import "firebase/auth";

export default {
  data() {
    return {
      registro: false,
    };
  },
  methods: {
    ...mapMutations(['newUser']),
    ...mapActions(['setUser']),
    facebook(){
      const provider = new firebase.auth.FacebookAuthProvider();

       this.ingreso(provider);
    },
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();

      this.ingreso(provider);
    },
    async ingreso(provider){
            firebase.auth().languageCode = "es";
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user);
        this.setUser(user)
        router.push({name: 'Home'})
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
