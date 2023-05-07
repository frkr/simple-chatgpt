import {fetchWithTimeout} from "./util-js/util";

const url = "https://api.openai.com/v1/chat/completions"

export async function chatgpt(userId: string, prompt: string, messages: Array<MessageChat>, apikey:string): Promise<ChatCompletionsResponse> {
    let chat = JSON.parse(JSON.stringify(messages));
    let resposta = null;

    try {

        let content = {
            "model": "gpt-3.5-turbo",
            "top_p": 0.1,
            "max_tokens": 600,
            "user": userId,
            "messages": chat,
        }

        let payload = {
            headers: {
                Authorization: `Bearer ${apikey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(content),
        }

        let response = await fetchWithTimeout(fetch(url, payload));

        if (response !== null) {
            let data: ChatCompletions = await response.json();

            if (data.choices) {
                chat = chat.concat([data.choices[0].message]);
                resposta = data.choices[0].message.content;
            }
        }
        if (chat.length > 5) {
            chat = chat.slice(-5);
        }
    } catch (e) {
        console.error("chatgpt", e);
    }
    return {
        messages: chat,
        response: resposta,
    };
}
