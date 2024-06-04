import Option from "./Option";

class Question {
    constructor() {
      this.pollQuestion = ""
      this.optionType = "Text"
      this.optionSets = [new Option(), new Option()]
    }
  }

export default Question;