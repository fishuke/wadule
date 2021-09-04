<template>
  <div class="spinner-container">
    <span class="inner">
      <span class="cube"></span>
      <span class="cube"></span>
    </span>
  </div>
</template>

<style scoped>
.inner {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  contain: paint;
}

.cube {
  background-color: #7983f5;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: spinner-cubes-first 1.8s ease-in-out infinite;
  animation: spinner-cubes-second 1.8s ease-in-out infinite;
}

.cube:last-child {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

span {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

span {
  outline: 0;
}

@-webkit-keyframes spinner-cubes-first {
  25% {
    -webkit-transform: translateX(22px) rotate(-90deg) scale(0.5);
    transform: translateX(22px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(22px) translateY(22px) rotate(-180deg);
    transform: translateX(22px) translateY(22px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0) translateY(22px) rotate(-270deg) scale(0.5);
    transform: translateX(0) translateY(22px) rotate(-270deg) scale(0.5);
  }
  to {
    -webkit-transform: rotate(-1turn);
    transform: rotate(-1turn);
  }
}

@keyframes spinner-cubes-second {
  25% {
    -webkit-transform: translateX(22px) rotate(-90deg) scale(0.5);
    transform: translateX(22px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(22px) translateY(22px) rotate(-180deg);
    transform: translateX(22px) translateY(22px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0) translateY(22px) rotate(-270deg) scale(0.5);
    transform: translateX(0) translateY(22px) rotate(-270deg) scale(0.5);
  }
  to {
    -webkit-transform: rotate(-1turn);
    transform: rotate(-1turn);
  }
}

.spinner-container {
  display: flex;
  height: calc(100%);
  justify-content: center;
  align-items: center;
}
</style>
