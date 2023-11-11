interface ChatCompletions {
	id: string;
	object: string;
	created: number;
	model: string;
	usage: Usage;
	choices?: (ChoicesEntity)[];
}

interface Usage {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

interface ChoicesEntity {
	message: MessageChat;
	finish_reason: string;
	index: number;
}

type ChatRole = 'system' | 'user' | 'assistant';

interface AudioMsg {
	model: 'tts-1' | 'tts-1-hd';
	input: string;
	voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
	response_format?: 'mp3' | 'opus' | 'aac' | 'flac';
}

interface Transcription {
	text: string;
}

interface MessageChat {
	role: ChatRole;
	content: string;
}

interface ChatCompletionsResponse {
	messages?: MessageChat[];
	response: string;
}

type OpenAIModels = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-3.5-turbo-16k' | 'gpt-4-32k'

interface ChatCompletionsRequest {
	model?: OpenAIModels | string;
	prompt?: string | string[];
	suffix?: string;
	max_tokens?: long;
	temperature?: number;
	top_p?: number;
	n?: number;
	presence_penalty?: number;
	frequency_penalty?: number;

	user?: string;
	messages?: MessageChat[];
}
