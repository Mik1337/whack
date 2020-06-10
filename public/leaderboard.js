let app = new Vue({
  el: "#app",
  methods: {
    readScore() {
      getJSONFile().then((json) => console.log(json));
    },
    writeScore() {},
  },
  data: {
    leaders: leaders,
  },
});

async function getJSONFile() {
  let res = await fetch("./assests/lb.json");
  let json = await res.json();
  return json;
}
