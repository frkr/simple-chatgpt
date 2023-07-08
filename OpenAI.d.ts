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

type ChatRole = "system" | "user" | "assistant";

interface MessageChat {
    role: ChatRole;
    content: string;
}

interface ChatCompletionsResponse {
    messages?: MessageChat[];
    response: string;
}
