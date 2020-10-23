<template>
  <section class="sent-feedbacks view">
    <div
      class="overlay"
      title="Clique para fechar"
      :class="{ 'overlay-active': !!feedbackID }"
      @click="closeFormOverlay($event)"
    >
      <form @click="closeFormBtn($event)" @submit.prevent="updateFeedback">
        <p>
          Edite os campos abaixo e clique em Salvar feedback para
          <span>{{ feedback.receiver_name }}</span>
        </p>
        <p class="error" v-if="error">
          É necessário preencher todos os campos para salvar o feedback
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
          value="Salvar feedback"
        />
      </form>
    </div>
    <h2 v-if="feedbacks.length">Aqui estão os Feedbacks que você enviou</h2>
    <h2 v-else>
      Você ainda não enviou nenhum Feedback,
      <router-link to="/">Clique aqui para criar um feedback</router-link>
    </h2>
    <section>
      <article
        title="Clique para editar este feedback"
        v-for="feedback in feedbacks"
        :key="feedback.id"
        @click="selectFeedback($event, feedback)"
        :style="{
          backgroundColor: feedback.color,
          borderColor: feedback.color
        }"
      >
        <span
          title="Clique para excluir este feedback"
          class="btn-close"
          @click="removeFeedback(feedback.id)"
        ></span>
        <p>
          Pontos a melhorar: <span>{{ feedback.points_improve }}</span>
        </p>
        <p>
          Para: <span>{{ feedback.feedback_receiver.name }}</span>
        </p>
      </article>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import { randomColor } from "../utils";

export default {
  name: "SentFeedbacks",

  data() {
    return {
      feedbacks: [],
      feedbackID: 0,
      error: false,
      feedback: {
        points_improve: "",
        points_keep: "",
        suggestion: "",
        final_feedback: "",
        receiver_name: ""
      }
    };
  },

  methods: {
    selectFeedback(event, feedback) {
      if (event.target.tagName === "SPAN") {
        return;
      }

      this.feedbackID = feedback.id;

      this.feedback.points_improve = feedback.points_improve;
      this.feedback.points_keep = feedback.points_keep;
      this.feedback.suggestion = feedback.suggestion;
      this.feedback.final_feedback = feedback.final_feedback;
      this.feedback.receiver_name = feedback.feedback_receiver.name;
    },

    closeFormOverlay(event) {
      event.target.tagName === "DIV" && (this.feedbackID = 0);
    },

    closeFormBtn(event) {
      const posX = event.target.scrollTopMax > 0 ? 616 : 630;
      event.layerX > posX && event.layerY < 48 && (this.feedbackID = 0);
    },

    clearFields() {
      this.feedback.points_improve = "";
      this.feedback.points_keep = "";
      this.feedback.suggestion = "";
      this.feedback.final_feedback = "";
      this.feedback.receiver_name = "";
      this.feedbackID = 0;
      this.error = false;
    },

    async removeFeedback(id) {
      if (confirm("Por favor confirme para deletar o feedback")) {
        await axios.delete(`feedbacks/${id}`);
        this.feedbacks = this.feedbacks.filter(feedback => feedback.id !== id);
      }
    },

    async getSentFeedbacks() {
      const { data: { feedbacks } } = await axios.get("feedbacks/sent"); // eslint-disable-line

      this.feedbacks = feedbacks.map(feedback => {
        feedback.color = randomColor();
        return feedback;
      });
    },

    async updateFeedback() {
      if (!Object.entries(this.feedback).every(([, value]) => value)) {
        this.error = true;
        return;
      }

      await axios.put(`feedbacks/${this.feedbackID}`, {
        feedback: this.feedback
      });

      this.getSentFeedbacks();
      this.clearFields();
    }
  },

  mounted() {
    this.getSentFeedbacks();
  }
};
</script>

<style scoped lang="scss">
.view {
  section {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 40px;

    article {
      border-radius: 8px 8px 0 0;
      border: 1px solid;

      &::before {
        content: "";
        background-color: inherit;
        position: absolute;
        width: 100.5%;
        left: -1px;
        height: 24px;
        top: -12px;
        border-radius: 8px 25% 0 0;
        box-shadow: -2px -4px 8px #ddd;
        transform: rotate(2deg);
      }

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -25px;
        right: 20px;
        border: 20px solid;
        border-color: transparent;
        border-top-color: inherit;
        border-left-color: inherit;
      }

      &:hover,
      &:hover::before {
        box-shadow: 1px 2px 2px #cecece inset;
        cursor: pointer;
      }

      .btn-close {
        position: absolute;
        padding: 4px;
        right: -14px;
        top: -16px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.6s;

        &::after {
          content: "\274c";
        }
      }

      &:hover .btn-close {
        opacity: 1;
        visibility: visible;
      }

      p {
        word-wrap: anywhere;

        span {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
