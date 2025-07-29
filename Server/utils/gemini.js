const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getcontent=async({title})=>{
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Summarize this Title in 5-10 lines:\n\n${title}`);
    const response = await result.response;
    const summary = response.text();

    return summary;
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "Error generating summary.";
  }
}
async function getSummary(content) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Summarize this:\n\n${content}`);
    const response = await result.response;
    const summary = response.text();

    return summary;
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "Error generating summary.";
  }
}

module.exports = {getSummary, getcontent};
