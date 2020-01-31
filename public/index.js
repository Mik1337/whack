let app = new Vue({
  el: "#app",
  methods: {
    startGame() {
      this.$data.gameState = "inPlay";
      this.$data.score = 0;
      this.$data.lastKey = null;
      stop(this.$data.tryAgain);
      this.$data.adventureSound.addEventListener(
        "ended",
        function() {
          this.currentTime = 0;
          this.play();
        },
        false
      );
      this.$data.adventureSound.play();
      this.wait();
    },
    scoreUpdate(check) {
      if (check) {
        this.$data.score += 1;
        this.$data.message = Math.random()
          .toString(36)
          .substr(2, 1);
        this.wait();
      } else if (!check) {
        this.$data.gameState = "over";
        this.withinTime();
      }
    },
    checkKeyPress(key) {
      if (
        (!isNaN(this.$data.message) && key === "space") ||
        key === this.$data.message ||
        (key === "click" && this.isMobile() && isNaN(this.$data.message))
      ) {
        this.withinTime();
        this.scoreUpdate(true);
      } else {
        this.$data.lastKey = key;
        stop(this.$data.adventureSound);
        this.$data.tryAgain.play();
        this.scoreUpdate(false);
      }
      resetTimeBar();
    },
    wait() {
      this.$data.timer = setTimeout(() => {
        if (!isNaN(this.$data.message)) {
          this.withinTime();
          this.scoreUpdate(true);
        } else {
          this.$data.gameState = "over";
          stop(this.$data.adventureSound);
          this.$data.tryAgain.play();
          this.$data.lastKey = "take forver";
        }
      }, this.$data.time);
    },
    withinTime() {
      clearInterval(this.$data.timer);
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    tweetScore() {
      document.getElementById(
        "tweet"
      ).href = `https://twitter.com/intent/tweet?text=I scored a big phat ${this.$data.score} points. Try your luck on https://whack-a-key.herokuapp.com/`;
    }
  },
  data: {
    gameState: false,
    message: Math.random()
      .toString(36)
      .substr(2, 1),
    lastKey: null,
    multipler: 1,
    startSound: new Audio("./assests/start.mp3"),
    adventureSound: new Audio("./assests/adventure.mp3"),
    jump: new Audio("./assests/jump.mp3"),
    keyPress: new Audio("./assests/keypress.mp3"),
    tryAgain: new Audio("./assests/tryagain.mp3"),
    timer: null,
    time: 3000,
    score: 0
  }
});

document.onkeydown = e => {
  e = e || window.event;
  if (
    e.which === 32 &&
    (!app.$data.gameState || app.$data.gameState === "over")
  ) {
    app.startGame();
  } else if (
    "qwertyuiopasdfghjklzxcvbnm".includes(e.key) &&
    app.$data.gameState !== "over"
  ) {
    app.$data.keyPress.play();
    app.$data.keyPress.currentTime = 0;
    app.checkKeyPress(e.key);
  } else if (e.which === 32) {
    app.$data.jump.play();
    app.$data.jump.currentTime = 0;
    app.checkKeyPress("space");
  }
};

document.ontouchstart = () => {
  if (app.$data.gameState === "inPlay" && isNaN(app.$data.message)) {
    app.$data.keyPress.play();
    app.$data.keyPress.currentTime = 0;
  }
  return null;
};

function stop(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function resetTimeBar() {
  let el = document.getElementById("myBar");
  el.style.animation = "none";
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null;
}
