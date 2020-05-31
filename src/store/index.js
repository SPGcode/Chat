import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db} from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    newUser(state, payload){
      if (payload === null) {
        state.user = ''
      }else{
        state.user = payload
      }
    }
  },
  actions: {
    async setUser({commit}, user){

      try {
      const doc = await db.collection('users').doc(user.uid).get()
        if(doc.exists){
          commit('newUser', doc.data())
        }else{
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL,
          };
            //save in firestore
          await db
          .collection("users")
          .doc(usuario.uid)
          .set(usuario);
          console.log("usuario en db");
          commit('newUser', usuario)
        }

      } catch (error) {
        console.log(error)
      }
    },
    closeSession({commit}){
      auth.signOut()
      commit('newUser', null)
      router.push({name: 'ingreso'})
    }
  },
  modules: {
  }
})
