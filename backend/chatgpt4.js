//https://platform.openai.com/docs/api-reference/chat/create




const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


(async () => {
    try {
        let res = await openai.createChatCompletion({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "This is bad"}],
            "temperature": 0.7
        })
        console.log(res.data.choices)
    } catch (error) {
        console.log(error);
    }
})();