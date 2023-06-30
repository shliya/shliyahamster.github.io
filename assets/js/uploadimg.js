import SampleDB from "./sampleDBscript.js";

const fileUploader = document.querySelector("#file-uploader");
const sampleDB = new SampleDB();
fileUploader.addEventListener("change", (e) => {
  imgToBase64(e.target.files);
});
function imgToBase64(imgFiles) {
  const curFile = imgFiles[0];
  const reader = new FileReader();
  try {
    reader.onload = function (e) {
      let data = JSON.parse(localStorage.getItem("profile"));
      data.wheelImg = e.target.result;
      sampleDB.updateJson(data)
    };
    reader.readAsDataURL(curFile);
    location.reload();
  } catch (error) {
    console.error(error);
  }
}
