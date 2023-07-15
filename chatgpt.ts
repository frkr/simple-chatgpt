import { fetchWithTimeout, postBearer } from '../util-js/util';

export const urlCompletions = 'https://api.openai.com/v1/chat/completions';

export function gptslice(conversas: Array<MessageChat>, limit = 16384) {
	let simpleCount = JSON.stringify(conversas).length;
	while (simpleCount > (limit)) {
		conversas.shift();
		simpleCount = JSON.stringify(conversas).length;
	}
}

export async function chat(userId: string, messages: Array<MessageChat>, apikey: string, model = 'gpt-3.5-turbo-16k'): Promise<MessageChat | null> {
	let content = {
		'model': model,
		'top_p': 0.1,
		'user': userId,
		'messages': messages,
	} as ChatCompletionsRequest;

	return call(content, apikey);
}

export async function call(content: ChatCompletionsRequest, apikey: string): Promise<MessageChat | null> {
	try {

		let response = await fetchWithTimeout(fetch(urlCompletions, postBearer(content, apikey)), 300000);

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
