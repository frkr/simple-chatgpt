import {fetchWithTimeout, postBearer} from "../util-js/util";

export const urlCompletions = "https://api.openai.com/v1/chat/completions";
export const urlEdit = "https://api.openai.com/v1/images/edits";

export function gptslice(conversas: Array<MessageChat>) {
    let simpleCount = JSON.stringify(conversas).length;
    // TODO O real limite é de 16kb menos o max_tokens de 4kb.
    while (simpleCount > (15360)) { // 15kb
        conversas.shift();
        simpleCount = JSON.stringify(conversas).length;
    }
}

export async function gptchat(userId: string, messages: Array<MessageChat>, apikey: string): Promise<MessageChat | null> {
    try {
        let content = {
            "model": "gpt-3.5-turbo-16k-0613",
            "top_p": 0.1,
            "max_tokens": 4096, // 4kb
            "user": userId,
            "messages": messages,
        }

        let response = await fetchWithTimeout(fetch(urlCompletions, postBearer(content, apikey)), 300000);

        console.log('response', JSON.stringify(response, null, 2));

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
