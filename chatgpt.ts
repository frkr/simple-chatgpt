import {fetchWithTimeout, postBearer} from "../util-js/util";

export const urlCompletions = "https://api.openai.com/v1/chat/completions";

export function gptslice(conversas: Array<MessageChat>) {
    let simpleCount = JSON.stringify(conversas).length;
    while (simpleCount > (16384)) {
        conversas.shift();
        simpleCount = JSON.stringify(conversas).length;
    }
}

export async function chat(userId: string, messages: Array<MessageChat>, apikey: string, max = 4096): Promise<MessageChat | null> {
    try {
        let content = {
            "model": "gpt-3.5-turbo-16k-0613",
            "top_p": 0.1,
            "max_tokens": max,
            "user": userId,
            "messages": messages,
        }

        let response = await fetchWithTimeout(fetch(urlCompletions, postBearer(content, apikey)), 300000);

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
