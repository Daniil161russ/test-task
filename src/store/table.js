import axios from "axios";

const state = () => ({
  tableList: [],
  errors: {
    isError: false,
    errorMsg: ""
  }
})

const getters = {
  getTableList: (state) => {
    return state.tableList
  }
}

const mutations = {
  setTableList: (state, payload) => {
    state.tableList = payload
  },
  setPhotos: (state, payload) => {
    state.tableList.forEach(list => {
      if(list.id === payload[0].albumId) {
        list.photos = payload
      }
    })
  },
	setError: (state, payload) => {
    state.errors.isError = true,
    state.errors.errorMsg = payload
  }
}

const actions = {
  async fetchTableList ({ commit }) {
    await axios.get("https://jsonplaceholder.typicode.com/albums")
    .then(response => { commit("setTableList", response.data) })
    .catch(error => console.log(error), commit("setError", "Упс, что-то пошло не так. Повторите попытку позже"))
  },
  async fetchPhotos ({commit}, payload) {
    await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${payload}`)
    .then((response) => { commit("setPhotos", response.data)})
    .catch(error => console.log(error)) 
  }
}

export default {
  state, getters, mutations, actions, namespaced: true
}