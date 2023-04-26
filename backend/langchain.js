const { OpenAI } = require("langchain/llms/openai");

const model = new OpenAI({ openAIApiKey: "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", temperature: 0.5 });

(async () => {
console.log("Calling model")
const res = await model.call(
    "What would be a good company name a company that makes colorful socks?"
  );
  console.log("Done capturing")

  console.log(res);

})();



