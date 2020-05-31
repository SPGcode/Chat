<template>
  <nav>
    <v-app-bar app color="accent" dark>
        <v-btn class="ma-2" outlined fab color="secondary" @click="example = !example">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
      <router-link :to="{ name: 'Home' }">
        <h1>Chat</h1>
      </router-link>

      <v-spacer></v-spacer>

      <span class="mr-2" @click="closeSession">Close session</span>
      <v-icon>fas fa-address-book</v-icon>
    </v-app-bar>

    <v-navigation-drawer color="deep-purple accent-4" v-model="example" app>
        <v-layout column align-center mt-5>
            <v-flex>
                <v-avatar>
                    <img
                    :src="user.foto"
                    :alt="user.nombre"
                    >
                </v-avatar>
            </v-flex>
            <v-flex>
                <p class="mt-3 white--text">{{user.nombre}}</p>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
            <v-list>
                <v-list-item-group>
                    <v-list-item  
                    v-for="(item, i) in items" :key="i"
                    :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon class="ml-4 white--text">{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">
                                {{item.text}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

    </v-navigation-drawer>

  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
    name: "Navbar",
    data() {
        return {
            example: true,
            items: [
                { text: 'Profile', icon: 'fas fa-address-card', to: {name: 'Home'} },
                { text: 'Account', icon: 'fas fa-volume-up', to: {name: 'Home'} },
                { text: 'Admin', icon: 'fas fa-sms', to: {name: 'admin'} },
                { text: 'Chat', icon: 'far fa-comments', to: {name: 'chat'} }
            ]
        }
    },
    methods: {
         ...mapActions(['closeSession'])
    },
    computed: {
         ...mapState(['user'])
    },
}
</script>
