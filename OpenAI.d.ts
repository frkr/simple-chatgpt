interface ChatCompletions {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: Usage;
    choices?: (ChoicesEntity)[] | null;
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

interface MessageChat {
    role: "system" | "user" | "assistant";
    content: string;
}

interface ChatCompletionsResponse {
    messages?: MessageChat[];
    response: string;
}
