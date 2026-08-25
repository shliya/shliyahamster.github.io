export default class SampleDB {
  async getDefaultProfile() {
    let response = await fetch("./assets/js/sampleDB.json");
    localStorage.setItem("profile", JSON.stringify(await response.json()));
  }
  async updateJson(data) {
    localStorage.setItem("profile", JSON.stringify(data));
  }
}
