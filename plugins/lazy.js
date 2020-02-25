import Vue from "vue";
import vueLazy from "vue-lazyload";
export default ({ store, app: { $axios } }) => {
  Vue.use(vueLazy, {
    observer: true,
    preLoad: 1.3,
    error: "/instagram.png",
    loading: "/instagram.png",
    attempt: 1
  });
};
