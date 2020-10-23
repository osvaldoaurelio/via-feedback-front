<template>
  <main id="app">
    <Header />
    <router-view />
  </main>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;

  main#app {
    color: #003a4d;
    min-height: 100vh;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    .view {
      min-height: calc(100vh - 81px);
      background-image: linear-gradient(135deg, #bbb, #fff);
      background-color: #eee;
      padding: 4%;
      position: relative;

      p.error {
        color: #f20;
      }

      .overlay {
        z-index: 10;
        position: absolute;
        background-color: #000a;
        top: 0;
        padding-top: 4px;
        left: 0;
        width: 100%;
        height: 0;
        visibility: hidden;
        opacity: 0;
        transition: all 0.6s;

        form {
          height: 0;
          overflow-y: auto;
          max-height: 100%;
        }

        &.overlay-active {
          opacity: 1;
          height: 100%;
          bottom: 0;
          visibility: visible;

          form {
            background-color: #fff;
            padding: 4% 3% 3%;
            border-radius: 8px;
            box-shadow: 2px 4px 8px #000;
            max-width: 678px;
            margin: 0 auto;
            height: auto;
            z-index: 100;
            position: relative;

            &::after {
              content: "\274c";
              cursor: pointer;
              font-weight: bold;
              font-size: 1.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              width: 48px;
              height: 48px;
              right: 0;
              top: 0;
            }

            p {
              margin-bottom: 24px;

              span {
                font-weight: bold;
              }
            }

            input,
            textarea {
              display: block;
              margin: 8px 0;
              width: 100%;
              padding: 12px 8px;
            }

            textarea {
              resize: vertical;
              height: 128px;
              margin-bottom: 24px;
            }
          }
        }
      }

      h2 {
        text-align: center;
        margin-bottom: 4%;
      }

      section {
        display: grid;

        article {
          background-color: #fff;
          padding: 24px;
          box-shadow: 2px 4px 8px #eee;
          display: grid;
          position: relative;

          &:hover {
            box-shadow: 0 0 2px #cecece inset;
          }
        }
      }

      .btn-padrao {
        color: #fff;
        padding: 6px;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        border-radius: 8px;
        transition: all 0.2s;
        text-shadow: 0 0 2px #333;
        border: 1px solid #0997dc;
        background-color: #0997dc;
        box-shadow: 1px 2px 2px #666;
        background-image: linear-gradient(45deg, #19b, #19f);

        &:active {
          text-shadow: none;
          font-size: 0.95rem;
          box-shadow: 1px 2px 2px #666 inset;
        }

        &:hover {
          cursor: pointer;
          color: #0997dc;
          text-shadow: none;
          background-image: none;
          background-color: #fff;
        }
      }
    }
  }

  @keyframes signin-form-appear {
    from {
      opacity: 0;
      top: 8%;
    }
    to {
      opacity: 1;
      top: 4%;
    }
  }

  @keyframes signup-form-appear {
    from {
      opacity: 0;
      top: 0;
    }
    to {
      opacity: 1;
      top: 4%;
    }
  }

  @keyframes saculejada {
    0%,
    50%,
    100% {
      left: calc(50% - 10px);
    }
    25%,
    75% {
      left: calc(50% + 10px);
    }
  }

  @media (max-width: 768px) {
    body {
      &::after {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 4%;
        color: #fff;
        z-index: 1000;
        font-size: 10vw;
        position: absolute;
        text-align: center;
        background-color: #0997dc;
        background-image: linear-gradient(45deg, #19b, #19f);
        content: "Sinto muito a aplicação ainda não é responsiva, por favor use um dispositivo com uma tela de resolução maior que 768px";
      }
    }
  }
}
</style>
