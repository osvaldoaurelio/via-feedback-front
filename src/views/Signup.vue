<template>
  <section id="signup" class="signup-feedback view">
    <div class="signup-overlay">
      <form
        @submit.prevent="submit"
        class="signup-form"
        :class="{ saculeje: !!responseError }"
      >
        <h2>
          Digite suas informações abaixo e clique em cadastrar para ter acesso
          ao aplicativo
        </h2>
        <p class="error" v-if="error">
          É necessário Nome, Email e Senha para criar uma conta
        </p>
        <p class="error" v-if="responseError">{{ responseError }}</p>
        <input
          placeholder="nome e sobrenome"
          required
          title="Digite seu nome"
          type="text"
          name="name"
          v-model="user.name"
        />
        <input
          placeholder="nome@email.com"
          required
          type="email"
          name="email"
          v-model="user.email"
        />
        <input
          placeholder="******"
          required
          type="password"
          name="password"
          v-model="user.password"
        />
        <div class="action">
          <router-link
            class="btn-signin"
            title="Clique para fazer login com uma conta existente"
            to="/signin"
            >Possuo uma conta</router-link
          >
          <button
            :disabled="btnDisabled"
            title="Clique para criar a conta"
            class="btn-padrao"
            type="submit"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "SiginUp",
  data() {
    return {
      error: false,
      responseError: "",
      btnDisabled: false,
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions({ signIn: "auth/signIn" }),

    async submit() {
      this.btnDisabled = true;
      if (!Object.entries(this.user).every(([, value]) => value)) {
        this.error = true;
        return;
      }

      try {
        const { data: { user } } = await axios.post("users", { user: this.user }); // eslint-disable-line
        const session = { email: user.email, password: this.user.password };
        await this.signIn({ session });

        this.$router.replace({ name: "CreateFeedback" });
      } catch ({ response: { data } }) {
        this.responseError = data.message;
        setTimeout(() => {
          this.responseError = "";
          this.btnDisabled = false;
        }, 1750);
      }
    }
  }
};
</script>

<style scoped lang="scss">
section#signup.signup-feedback.view {
  background-image: url("../assets/sign-bg.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .signup-overlay {
    position: absolute;
    background-color: #000a;
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
    padding-top: 4%;

    form {
      background: #eee;
      max-width: 678px;
      margin: 0 auto;
      text-align: center;
      padding: 4% 3% 3%;
      border-radius: 8px;
      box-shadow: 2px 4px 8px #000;
      transition: all 1s 1s;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      max-width: 478px;

      h2 {
        font-size: 1.2rem;
        margin-bottom: 8%;
      }

      &.signup-form {
        animation: signup-form-appear 1.2s forwards;
      }

      &.saculeje {
        animation: saculejada 0.3s;
      }

      input {
        display: block;
        margin: 24px 0;
        width: 100%;
        padding: 16px;
      }

      .action {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 8%;

        .btn-signin {
          width: 100%;
          padding: 6px;
          border: 1px solid #0997dc;
          border-radius: 8px;
          color: #0997dc;
          box-shadow: 1px 2px 2px #666;
          transition: all 0.2s;
          font-weight: bold;

          &:active {
            font-size: 0.95rem;
            box-shadow: 1px 2px 2px #666 inset;
          }

          &:hover {
            background-color: #fff;
          }
        }

        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
