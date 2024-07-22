import {fetchWithTimeout, postBearer} from '../util-js/util';

export const urlCompletions = 'https://api.openai.com/v1/chat/completions';
export const urlTranscr = 'https://api.openai.com/v1/audio/transcriptions';
export const urlAudio = 'https://api.openai.com/v1/audio/speech';
export const urlFile = 'https://api.openai.com/v1/files';
export const urlVector = 'https://api.openai.com/v1/vector_stores';

export function gptslice(conversas: Array<MessageChat>, limit = 16384) {
    let simpleCount = JSON.stringify(conversas).length;
    while (simpleCount > (limit)) {
        conversas.shift();
        simpleCount = JSON.stringify(conversas).length;
    }
}

export async function chat(userId: string, messages: Array<MessageChat>, apikey: string, model: OpenAIModels = 'gpt-4o-mini'): Promise<MessageChat | null> {
    let content = {
        'model': model,
        'top_p': 0.1,
        'user': userId,
        'messages': messages,
    } as ChatCompletionsRequest;

    return call(content, apikey);
}

export async function speech(msg: AudioMsg, apikey: string): Promise<Blob> {

    let response = await fetch(urlAudio, postBearer({data: msg, apikey}));

    return await response.blob();

}

export async function call(content: ChatCompletionsRequest, apikey: string, timeout = 300000): Promise<MessageChat | null> {
    try {

        let response = await fetchWithTimeout(fetch(urlCompletions, postBearer({data: content, apikey})), timeout);

        if (response !== null) {
            let data: ChatCompletions = await response.json();

            if (data.choices) {
                return data.choices[0].message;
            }
        }
    } catch (e) {
        console.error('chatgpt', e);
    }
    return null;
}

export async function transcribe(file: any, apikey: string): Promise<Transcription> {

    let forma = new FormData();
    forma.append('file', file, 'audio.webm');
    forma.append('model', 'whisper-1');
    return (await fetch(urlTranscr, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apikey,
        },
        body: forma,
    })).json();

}
