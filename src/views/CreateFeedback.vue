<template>
  <section class="create-feedback view">
    <div
      class="overlay"
      title="Clique para fechar"
      :class="{ 'overlay-active': !!userFormName }"
      @click="closeFormOverlay($event)"
    >
      <form @click="closeFormBtn($event)" @submit.prevent="createFeedback">
        <p>
          Preencha os campos abaixo para enviar um feedback para
          <span>{{ userFormName }}</span>
        </p>
        <p class="error" v-if="error">
          É necessário preencher todos os campos para enviar o feedback
        </p>
        <input
          required
          v-model="feedback.points_improve"
          placeholder="Pontos a melhorar"
        />
        <input
          required
          v-model="feedback.points_keep"
          placeholder="Pontos a manter"
        />
        <input required v-model="feedback.suggestion" placeholder="Sugestões" />
        <textarea
          required
          v-model="feedback.final_feedback"
          placeholder="Feedback final"
        >
        </textarea>
        <input
          class="btn-padrao"
          id=" value"
          type="submit"
          value="Enviar feedback"
        />
      </form>
    </div>
    <h2>Selecione um usuário para criar um feedback</h2>
    <section>
      <article v-for="user in users" :key="user.id">
        <div class="user">
          <img src="../assets/profile.png" alt="Perfil" />
          <div class="info">
            <p>{{ user.name }}</p>
            <span>{{ user.email }}</span>
          </div>
        </div>
        <a
          class="btn-padrao"
          @click.prevent="setFeedbackUser(user)"
          :title="`Clique para criar um feedback para ${user.name}`"
          href="#"
          >Criar feedback para {{ user.name }}</a
        >
      </article>
    </section>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateFeedback",

  data() {
    return {
      users: [],
      userID: 0,
      userFormName: "",
      error: false,
      feedback: {
        points_improve: "",
        points_keep: "",
        suggestion: "",
        final_feedback: "",
        feedback_receiver_id: 0
      }
    };
  },

  methods: {
    setFeedbackUser({ id, name }) {
      this.feedback.feedback_receiver_id = id;
      this.userFormName = name;
    },

    closeFormOverlay(event) {
      event.target.tagName === "DIV" && (this.userFormName = "");
    },

    closeFormBtn(event) {
      const posX = event.target.scrollTopMax > 0 ? 616 : 630;
      event.layerX > posX && event.layerY < 48 && (this.userFormName = "");
    },

    clearFields() {
      this.feedback.points_improve = "";
      this.feedback.points_keep = "";
      this.feedback.suggestion = "";
      this.feedback.final_feedback = "";
      this.feedback.feedback_receiver_id = 0;
      this.userFormName = "";
      this.error = false;
    },

    async createFeedback() {
      if (!Object.entries(this.feedback).every(([, value]) => value)) {
        this.error = true;
        return;
      }

      await axios.post("feedbacks", { feedback: this.feedback });

      this.clearFields();
      this.$router.replace({ name: "SentFeedbacks" });
    }
  },

  async mounted() {
    const { data: { user } } = await axios.get("users/me"); // eslint-disable-line
    this.userID = user.id;

    const { data: { users } } = await axios.get("users"); // eslint-disable-line
    this.users = users.filter(user => user.id !== this.userID);
  }
};
</script>

<style scoped lang="scss">
.view {
  section {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 16px;

    article {
      border-radius: 8px;
      border: 1px solid #ddd;

      &:hover {
        box-shadow: 1px 2px 2px #cecece inset;
      }

      .user {
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        img {
          width: 64px;
          height: 64px;
          margin-right: 16px;
        }

        p {
          font-size: 1.75rem;
          font-weight: bold;
          color: #666;
        }

        span {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
