import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
/* eslint-disable */
Vue.use(Vuex)

const state = {
  user: {username: null, password: null, department: null},
}

const mutations = {

  SETUSER(state, user) {
    state.user = user;
  },

  DELETEUSER(state) {
    state.user = {username: null, password: null, department: null}
  },

}

const actions = {

  login({commit}) {
    axios.post('/login', {data})
      .then(function (response) {
        user = response.data.user;
        commit('SETUSER', response.data.user);
      }).catch(function (error) {
      console.log(error);
    });
  },

  logout({commit}) {
    state.user = {username: null, password: null, department: null};
  },

  getUserInfo({commit}) {
    axios.post('/getUserInfo')
      .then(function (response) {
        var user = response.data.user;
        if(!user){
          commit('SETUSER', user);
        }
      }).catch(function (error) {
      console.log(error);
    });
  }

}

const getters = {
  user: state => state.user
}


const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  state,
  mutations,
  actions,
  getters,

})
export default store;
