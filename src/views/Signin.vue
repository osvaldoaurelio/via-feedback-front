<template>
  <section id="signin" class="signin-feedback view">
    <div class="signin-overlay">
      <form
        @submit.prevent="submit"
        class="signin-form"
        :class="{ saculeje: !!responseError }"
      >
        <h2>Digite seu Email e Senha para entrar</h2>
        <p class="error" v-if="error">É necessário Email e Senha para entrar</p>
        <p class="error" v-if="responseError">{{ responseError }}</p>
        <input
          placeholder="nome@email.com"
          required
          type="email"
          name="email"
          id="email"
          v-model="session.email"
        />
        <input
          placeholder="******"
          required
          type="password"
          name="password"
          id="password"
          v-model="session.password"
        />
        <div class="action">
          <router-link
            class="btn-signup"
            title="Clique para criar uma conta"
            to="/signup"
            >Criar uma conta</router-link
          >
          <button
            :disabled="btnDisabled"
            title="Clique para entrar"
            class="btn-padrao"
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SiginIn",
  data() {
    return {
      error: false,
      responseError: "",
      btnDisabled: false,
      session: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions({ signIn: "auth/signIn" }),

    async submit() {
      this.btnDisabled = true;
      if (!Object.entries(this.session).every(([, value]) => value)) {
        this.error = true;
        return;
      }

      try {
        await this.signIn({ session: this.session });

        this.btnDisabled = false;
        this.$router.replace({ name: "CreateFeedback" });
      } catch ({ response: { data } }) {
        this.responseError = data.message;
        setTimeout(() => {
          this.btnDisabled = false;
          this.responseError = "";
        }, 1750);
      }
    }
  }
};
</script>

<style scoped lang="scss">
section#signin.signin-feedback.view {
  background-image: url("../assets/sign-bg.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .signin-overlay {
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

      h2 {
        font-size: 1.2rem;
        margin-bottom: 12%;
      }

      &.signin-form {
        animation: signin-form-appear 1.2s forwards;
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
        margin-top: 12%;

        .btn-signup {
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
