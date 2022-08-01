export default function (msg, id) {
  if (msg) {
    setTimeout(() => {
      const elem = this.$refs[id][0] ? this.$refs[id][0] : this.$refs[id];
      elem.innerHTML = "";
      msg.split("\n").forEach((str) => {
        const span = document.createElement("span");
        span.innerHTML = str;
        elem.insertAdjacentElement("beforeend", span);
      });
    }, 0);
  }
}
