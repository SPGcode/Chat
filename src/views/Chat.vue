<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3>Bienvenido: {{ user.nombre }}</h3>
        </v-card-text>
            <!--mensajes-->
            <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
                <div
                :class="item.nombre === user.nombre ? 'text-right' : 'text-left'"
                v-for="(item, index) in mensajes" :key="index">
                    <v-chip class="mr-2">
                        <v-avatar left>
                            <v-img :src="item.foto"></v-img>
                        </v-avatar>
                        {{item.nombre}} dice:  <p class="mt-4 ml-4"> {{item.mensaje}} </p>
                    </v-chip>
                    <p class="caption mr-4">{{item.fecha}}</p>
                </div>
            </v-card-text>
            <v-card-text>
                <v-form @submit.prevent="enviarMensaje" v-model="valido">
                    <v-text-field 
                    v-model="mensaje" label="Mensaje..."
                    required
                    :rules="reglas"
                    ></v-text-field>
                </v-form>
            </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import {db} from "@/firebase";
import moment from "moment"

export default {
  data() {
    return {
        mensaje: '',
        valido: false,
        reglas: [v => !!v || 'Tienes que escribir algo'],
        mensajes: []
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods:{
        enviarMensaje(){
          if(this.valido){
              db.collection('chats').add({
                  mensaje: this.mensaje,
                  nombre: this.user.nombre,
                  foto: this.user.foto,
                  fecha: Date.now()
              }).catch(error => console.log(error))
              this.mensaje = '';
          }else{
              console.log('nada escrito')
          }
         
        }
  },
  created() {
      moment.locale('es');
      let ref = db.collection('chats').orderBy('fecha', 'desc');
      ref.onSnapshot( querySnapshop =>{
          this.mensajes = [];
          querySnapshop.forEach( doc => {
              this.mensajes.unshift({
                  mensaje: doc.data().mensaje,
                  foto: doc.data().foto,
                  nombre: doc.data().nombre,
                  fecha: moment(doc.data().fecha).format('LLLL')
              })
          });
      })

  },
};
</script>
