<template>
  <section class="received-feedbacks view">
    <div
      class="overlay"
      title="Clique para fechar"
      :class="{ 'overlay-active': !!feedbackID }"
      @click="closeFormOverlay($event)"
    >
      <form @click="closeFormBtn($event)">
        <p>
          Feedback enviado por: <span>{{ feedback.sender_name }}</span>
        </p>
        <p>
          Pontos a melhorar: <br /><span>{{ feedback.points_improve }}</span>
        </p>
        <p>
          Pontos a manter: <br /><span>{{ feedback.points_keep }}</span>
        </p>
        <p>
          Sugestões: <br /><span>{{ feedback.suggestion }}</span>
        </p>
        <p>
          Feedback final: <br /><span>{{ feedback.final_feedback }}</span>
        </p>
      </form>
    </div>
    <h2 v-if="feedbacks.length">Aqui estão os Feedbacks que você recebeu</h2>
    <h2 v-else>Você ainda não recebeu nenhum Feedback</h2>
    <section>
      <article
        title="Clique para visualizar este feedback"
        v-for="feedback in feedbacks"
        @click="selectFeedback($event, feedback)"
        :key="feedback.id"
        :style="{
          backgroundColor: feedback.color,
          borderColor: feedback.color
        }"
      >
        <span v-if="!feedback.viewed" class="not-viewed">&#10026;</span>
        <span
          title="Clique para excluir este feedback"
          class="btn-close"
          @click="removeFeedback(feedback.id)"
        ></span>
        <p>
          Pontos a melhorar: <span>{{ feedback.points_improve }}</span>
        </p>
        <p>
          De: <span>{{ feedback.feedback_sender.name }}</span>
        </p>
      </article>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import { randomColor } from "../utils";

export default {
  name: "ReceivedFeedbacks",

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
        sender_name: "",
        viewed: false
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
      this.feedback.sender_name = feedback.feedback_sender.name;
      this.feedback.viewed = feedback.viewed;

      if (!feedback.viewed) this.viewedFeedback(feedback.id);
    },

    closeFormOverlay(event) {
      event.target.tagName === "DIV" && (this.feedbackID = 0);
    },

    closeFormBtn(event) {
      const posX = event.target.scrollTopMax > 0 ? 616 : 630;
      event.layerX > posX && event.layerY < 48 && (this.feedbackID = 0);
    },

    async getReceivedFeedbacks() {
      const {
        data: { feedbacks }
      } = await axios.get("feedbacks/received");

      this.feedbacks = feedbacks.map(feedback => {
        feedback.color = randomColor();
        return feedback;
      });
    },

    async viewedFeedback(id) {
      await axios.put(`feedbacks/${id}/viewed`);

      this.getReceivedFeedbacks();
    },

    async removeFeedback(id) {
      if (confirm("Por favor confirme para deletar o feedback")) {
        await axios.delete(`feedbacks/${id}`);
        this.feedbacks = this.feedbacks.filter(feedback => feedback.id !== id);
      }
    }
  },

  async mounted() {
    this.getReceivedFeedbacks();
  }
};
</script>

<style scoped lang="scss">
.view {
  section {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 40px;

    article {
      border-radius: 0 0 8px 8px;
      border: 1px solid;

      &::before {
        content: "";
        background-color: inherit;
        position: absolute;
        width: 100.5%;
        left: -1px;
        height: 24px;
        top: -12px;
        border-radius: 25% 8px 0 0;
        box-shadow: -4px -2px 4px #ddd;
        transform: rotate(-2deg);
      }

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -25px;
        left: 20px;
        border: 20px solid;
        border-color: transparent;
        border-top-color: inherit;
        border-right-color: inherit;
      }

      &:hover,
      &:hover::before {
        box-shadow: -1px 2px 2px #cecece inset;
        cursor: pointer;
      }

      .not-viewed {
        position: absolute;
        top: -12px;
        color: #fff;
        text-shadow: 0 0 1px #fff, 0 0 4px #eee;
      }

      .btn-close {
        position: absolute;
        padding: 4px;
        right: -12px;
        top: -26px;
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
