import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

//import happyHouse from "@/js/http-happy-house";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentGugun: "",
    currentDong: "",

    apts: [],
    aptsLength: 0,
    houses: [],
    housesLength: 0,
    shop: [],
    shopAvg: [],

    sido: [],
    gugun: [],
    dong: [],
    interest: [],

    qnas: [],
    qna: [],

    articles: [],
    article: [],

    member: [],
    loginId: "",
    loginState: false,
  },

  getters: {
    qnaData(state) {
      return state.qnas;
    },

    qna(state) {
      return state.qna;
    },

    articleData(state) {
      return state.articles;
    },

    article(state) {
      return state.article;
    },

    memberData(state) {
      return state.members;
    },

    member(state) {
      return state.member;
    },

    loginId(state) {
      return state.loginId;
    },

    loginState(state) {
      return state.loginState;
    },

    currentGugun(state) {
      return state.currentGugun;
    },

    currentDong(state) {
      return state.currentDong;
    },
  },

  mutations: {
    GET_APT_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
      state.aptsLength = apts.length;
    },

    GET_HOUSE_LIST(state, houses) {
      // console.log(state, apts);
      state.houses = houses;
      state.housesLength = houses.length;
    },

    GET_SHOP_DATA(state, data) {
      if (data.length > 0) {
        state.currentDong = data[0].dong;
        state.shop = data;
      } else {
        state.currentDong = "";
        state.shop = [];
      }
    },

    GET_SHOP_AVG_DATA(state, data) {
      if (data.length > 0) {
        state.currentGugun = data[0].gugun;
        state.shopAvg = data;
      } else {
        state.currentGugun = "";
        state.shopAvg = [];
      }
    },

    INSERT_INTEREST(state, interest) {
      state.interest = interest;
    },

    DELETE_INTEREST(state, interest) {
      state.interest = interest;
    },

    SEARCH_INTEREST(state, interest) {
      state.interest = interest;
    },

    GET_SIDO_LIST(state, sido) {
      state.sido = sido;
    },

    GET_GUGUN_LIST(state, gugun) {
      state.gugun = gugun;
    },

    GET_DONG_LIST(state, dong) {
      state.dong = dong;
    },

    GET_QNA_LIST(state, qnas) {
      state.qnas = qnas;
    },

    GET_QNA(state, qna) {
      state.qna = qna;
    },

    SEARCH_QNA_LIST(state, qnas) {
      // console.log(qnas);
      state.qnas = qnas;
    },

    GET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },

    GET_ARTICLE(state, article) {
      state.article = article;
    },

    GET_MEMBER(state, member) {
      state.member = member;
    },

    LOGIN_MEMBER(state, member) {
      state.loginId = member.id;
      state.loginState = true;
      state.member = member;
      state.interest = [];
    },

    LOGOUT_MEMBER(state) {
      state.loginId = "";
      state.loginState = false;
      state.member = [];
      state.interest = [];
    },
  },

  actions: {
    getAptList({ commit }, data) {
      const SERVICE_URL =
        "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade";
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        LAWD_CD: data.gugun,
        DEAL_YMD: data.date,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      // console.log(params);

      axios
        .get(SERVICE_URL, {
          params,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.response.body.items === "") {
            commit("GET_APT_LIST", []);
          } else {
            if (data.dong != "0") {
              let items = response.data.response.body.items.item;
              // console.log(items);
              let list = [];
              
              for (let index in items) {
                if (String(items[index].법정동).indexOf(data.dong) !== -1) {
                  list.push(items[index]);
                }
              }
              commit("GET_APT_LIST", list);

            } else {
              commit("GET_APT_LIST", response.data.response.body.items.item);
            }
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getHouseList({ commit }, data) {
      const SERVICE_URL =
        "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade";
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        LAWD_CD: data.gugun,
        DEAL_YMD: data.date,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      // console.log(params);

      axios
        .get(SERVICE_URL, {
          params,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.response.body.items === "") {
            commit("GET_HOUSE_LIST", []);
          } else {
            if (data.dong != "0") {
              let items = response.data.response.body.items.item;
              // console.log(items);
              let list = [];
              
              for (let index in items) {
                if (String(items[index].법정동).indexOf(data.dong) !== -1) {
                  list.push(items[index]);
                }
              }
              commit("GET_HOUSE_LIST", list);

            } else {
              commit("GET_HOUSE_LIST", response.data.response.body.items.item);
            }
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getShopData({ commit }, data) {
      const addr = "http://localhost/shop/data";

      axios
        .get(addr, {
          params: data,
        })
        .then((response) => {
          // console.log(response.data);
          commit("GET_SHOP_DATA", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getShopAvgData({ commit }, data) {
      const addr = "http://localhost/shop/avg";

      axios
        .get(addr, {
          params: data,
        })
        .then((response) => {
          // console.log(response.data);
          commit("GET_SHOP_AVG_DATA", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    insertInterest({ commit }, data) {
      commit("INSERT_INTEREST", data);
    },

    deleteInterest({ commit }, data) {
      commit("DELETE_INTEREST", data);
    },

    searchInterest({ commit }, data) {
      commit("SEARCH_INTEREST", data);
    },

    getSidoList({ commit }, data) {
      commit("GET_SIDO_LIST", data);
    },

    getGugunList({ commit }, code) {
      const addr = "http://localhost/map/gugun/";

      axios
        .get(addr + code)
        .then((response) => {
          // console.log(response.data);
          commit("GET_GUGUN_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getDongList({ commit }, code) {
      const addr = "http://localhost/map/dong/";

      axios
        .get(addr + code)
        .then((response) => {
          // console.log(response.data);
          commit("GET_DONG_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getQnaList({ commit }) {
      const addr = "http://localhost/qna/list";

      axios
        .get(addr)
        .then((response) => {
          // console.log(response.data);
          commit("GET_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getQna({ commit }, payload) {
      axios
        .get(payload)
        .then((response) => {
          // console.log(response.data);
          commit("GET_QNA", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    searchQnaList({ commit }, option) {
      // console.log(option.key + "|" + option.word);
      const addr = "http://localhost/qna/search";

      axios
        .get(addr, {
          params: {
            key: option.key,
            word: option.word,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit("SEARCH_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    registerQna({ commit }, data) {
      // console.log(data);
      const addr = "http://localhost/qna/register";

      axios
        .post(addr, data)
        .then((response) => {
          console.log(response);
          commit("GET_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    modifyQna({ commit }, data) {
      // console.log(data);
      const addr = "http://localhost/qna/";

      axios
        .put(addr + data.qnano, data)
        .then((response) => {
          console.log(response);
          commit("GET_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    deleteQna({ commit }, no) {
      // console.log(no);
      const addr = "http://localhost/qna/";

      axios
        .delete(addr + no)
        .then((response) => {
          console.log(response);
          commit("GET_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getArticleList({ commit }) {
      const addr = "http://localhost/article/list";

      axios
        .get(addr)
        .then((response) => {
          console.log(response.data);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getArticle({ commit }, payload) {
      axios
        .get(payload)
        .then((response) => {
          console.log(response.data);
          commit("GET_ARTICLE", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    searchArticleList({ commit }, option) {
      // console.log(option.key + "|" + option.word);
      const addr = "http://localhost/article/search";

      axios
        .get(addr, {
          params: {
            key: option.key,
            word: option.word,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    registerArticle({ commit }, data) {
      // console.log(data);
      const addr = "http://localhost/article/register";

      axios
        .post(addr, data)
        .then((response) => {
          console.log(response);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    modifyArticle({ commit }, data) {
      // console.log(data);
      const addr = "http://localhost/article/";

      axios
        .put(addr + data.articleno, data)
        .then((response) => {
          console.log(response);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    deleteArticle({ commit }, no) {
      // console.log(no);
      const addr = "http://localhost/article/";

      axios
        .delete(addr + no)
        .then((response) => {
          console.log(response);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    loginMember({ commit }, member) {
      commit("LOGIN_MEMBER", member);
    },

    insertMember({ commit }, member) {
      commit("GET_MEMBER", member);
    },

    modifyMember({ commit }, member) {
      // console.log(member);
      const addr = "http://localhost/mem/update";

      axios
        .put(addr, member)
        .then((response) => {
          commit("GET_MEMBER", member);
          // console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    logoutMember({ commit }) {
      commit("LOGOUT_MEMBER");
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
