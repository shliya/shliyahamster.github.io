import SampleDB from "./sampleDBscript.js";
let btn = document.querySelector("#show");
let infoModal = document.querySelector("#infoModal");
let close = document.querySelector("#close");
let colorPickers = document.querySelectorAll(".colorpicker");
let profile = JSON.parse(localStorage.getItem("profile"));
if (profile === null) {
  let defaultJson = {
    colorArray: ["#FFFF93", "#FFE153"],
    wheelImg: "",
  };
  localStorage.setItem("profile", JSON.stringify(defaultJson));
}
let colorArray = JSON.parse(localStorage.getItem("profile")).colorArray;
const sampleDB = new SampleDB();
colorPickers.forEach((colorPicker, index) => {
  colorPicker.value = colorArray[index];
  colorPicker.addEventListener("change", (e) => {
    colorArray[index] = e.target.value;
    profile.colorArray = colorArray;
    sampleDB.updateJson(profile);
  });
});
btn.addEventListener("click", function () {
  infoModal.showModal();
});
close.addEventListener("click", function () {
  infoModal.close();
});
