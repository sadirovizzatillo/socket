export default function (str = "") {
  let newStr = "";
  str.split(" ").forEach((e, i) => {
    if (i < 2) {
      newStr += e[0];
    }
  });
  return newStr.toUpperCase();
}
