import {fetchWithTimeout, postBearer} from "../util-js/util";

const url = "https://api.openai.com/v1/chat/completions";

export function gptslice(conversas: Array<MessageChat>) {
    let simpleCount = JSON.stringify(conversas, null, '').length;
    while (simpleCount > (4096 - 700)) { // Max tokens 600 - Max 4096
        conversas.shift();
        simpleCount = JSON.stringify(conversas, null, '').length;
    }
}

export async function gptchat(userId: string, messages: Array<MessageChat>, apikey: string): Promise<MessageChat | null> {
    try {
        let content = {
            "model": "gpt-3.5-turbo",
            "top_p": 0.1,
            "max_tokens": 600,
            "user": userId,
            "messages": messages,
        }

        let response = await fetchWithTimeout(fetch(url, postBearer(content, apikey)));

        if (response !== null) {
            let data: ChatCompletions = await response.json();

            if (data.choices) {
                return data.choices[0].message;
            }
        }
    } catch (e) {
        console.error("chatgpt", e);
    }
    return null;
}
