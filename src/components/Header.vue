<template>
  <header>
    <h1>
      <router-link v-if="authenticated" to="/">{{ user.name }}</router-link>
      <router-link v-else to="/signin">Via Feedback</router-link>
    </h1>
    <nav>
      <router-link
        title="Clique para criar um novo Feedback para algum usário"
        to="/"
        >Criar Feedback</router-link
      >
      <router-link
        title="Clique para ver seus Feedbacks Recebidos"
        to="/received_feedbacks"
        >Feedbacks Recebidos</router-link
      >
      <router-link
        title="Clique para ver seus Feedbacks Enviados"
        to="/sent_feedbacks"
        >Feedbacks Enviados</router-link
      >
      <a
        v-if="authenticated"
        title="Clique para sair da aplicação"
        href="#"
        @click.prevent="signOut"
        >Sair</a
      >
      <router-link
        v-else
        title="Preencha os dados e clique em Entrar para acessar o aplicativo"
        to="/signin"
        >Entrar</router-link
      >
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },

  methods: {
    ...mapActions({ signOutAction: "auth/signOut" }),

    signOut() {
      if (confirm("Por favor confirme para sair.")) {
        this.signOutAction().then(() => {
          this.$router.replace({ name: "Sigin" });
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
header {
  color: #fff;
  text-shadow: 0 0 2px #333;
  background-image: linear-gradient(135deg, #19a, #19e);
  background-color: #0997dc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5%;
  position: sticky;
  top: 0;
  z-index: 100;

  h1 {
    a {
      color: #fff;
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: capitalize;
    }
  }

  nav {
    display: flex;

    a {
      font-size: 1.2rem;
      font-weight: bold;
      text-shadow: none;
      padding: 8px 12px;
      color: #003a4dab;

      &:last-child {
        padding-right: 0;
      }

      &:hover {
        text-decoration: underline;
      }

      &.router-link-exact-active {
        color: #fff;
        text-shadow: 0 0 2px #333;
      }
    }
  }
}
</style>
