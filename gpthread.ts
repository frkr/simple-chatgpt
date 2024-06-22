//region Types

import {postBearer} from "../util-js/util";

export const GPThreadImpl = {
    id: "thread_abc123",
    object: "thread",
    created_at: 1698107661,
    metadata: {} as null | any,
    tool_resources: {
        code_interpreter: {file_ids: ['']},
        file_search: {vector_store_ids: ['']}
    }
}

export type GPThread = typeof GPThreadImpl

export const GPTMessageImpl = {
    id: "msg_abc123",
    object: "thread.message" as "thread.message",
    created_at: 1698983503,
    thread_id: "thread_abc123",
    status: 'completed' as 'in_progress' | 'incomplete' | 'completed',
    incomplete_details: {
        reason: "",
    },
    role: "assistant" as 'user' | 'assistant',
    content: [
        {
            type: "text",
            text: {
                value: "Hi! How can I help you today?",
                annotations: [{
                    type: "file_path" as "file_path",
                    text: 'text',
                    file_path: {
                        start_index: 0,
                        end_index: 0,
                    }
                }]
            }
        }
    ],
    assistant_id: "asst_abc123",
    run_id: "run_abc123",
    attachments: [] as null | any,
    metadata: {} as null | any
}

export type GPTMessage = typeof GPTMessageImpl

export const GPTMessageRequestImpl = {
    role: '' as 'user' | 'assistant',
    content: '',
}

export type GPTMessageRequest = typeof GPTMessageRequestImpl

export const GPTRunRequestImpl = {
    assistant_id: 'asst_abc123',
}

export type GPTRunRequest = typeof GPTMessageRequestImpl

export const GPTRunImpl = {
    "id": "run_abc123",
    "object": "thread.run",
    "created_at": 1698107661,
    "assistant_id": "asst_abc123",
    "thread_id": "thread_abc123",
    "status": "completed",
    "started_at": 1699073476,
    "expires_at": null,
    "cancelled_at": null,
    "failed_at": null,
    "completed_at": 1699073498,
    "last_error": null,
    "model": "gpt-4-turbo",
    "instructions": null,
    "tools": [{"type": "file_search"}, {"type": "code_interpreter"}],
    "metadata": {},
    "incomplete_details": null,
    "usage": {
        "prompt_tokens": 123,
        "completion_tokens": 456,
        "total_tokens": 579
    },
    "temperature": 1.0,
    "top_p": 1.0,
    "max_prompt_tokens": 1000,
    "max_completion_tokens": 1000,
    "truncation_strategy": {
        "type": "auto",
        "last_messages": null
    },
    "response_format": "auto",
    "tool_choice": "auto",
    "parallel_tool_calls": true
}

export type GPTRun = typeof GPTRunImpl

export interface GPTMessageList {
    object: 'list',
    data: GPTMessage[],
    has_more: false,
    last_id:'id'
}

//endregion

const headersBeta = {
    'OpenAI-Beta': 'assistants=v2'
}

export async function gpthread( apikey: string, thread_id: string ):Promise<GPThread> {
    return (
        await fetch(
        `https://api.openai.com/v1/threads/${thread_id}`,
        postBearer(
            {
                headers: headersBeta,
                apikey,
            }
        )
    )
    ).json()
}

export async function gptcreateThread(apikey: string ):Promise<GPThread> {
    return (
    await fetch(
        'https://api.openai.com/v1/threads',
        postBearer(
            {
                headers: headersBeta,
                apikey,
                method: 'POST',
                data: {}
            }
        )
    )
    ).json()
}

export async function gptcreateMessageOnThread(apikey:string,thread_id:string, message: GPTMessageRequest):Promise<GPTMessage> {
    return (
        await fetch(
            `https://api.openai.com/v1/threads/${thread_id}/messages`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    data:message
                }
            )
        )
    ).json()
}

export async function gptcreateRun(apikey:string,thread_id:string,assistant_id:string) :Promise<GPTRun>{
    return (
        await fetch(
            `https://api.openai.com/v1/threads/${thread_id}/runs`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    data: {assistant_id}
                }
            )
        )
    ).json()
}

export async function gptrun(apikey:string,thread_id:string,run_id:string) :Promise<GPTRun> {
    return (
        await fetch(
            `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                }
            )
        )
    ).json()
}

export async function gptmessages(apikey:string,thread_id:string,after:string=null) :Promise<GPTMessageList> {
    return (
        await fetch(
            `https://api.openai.com/v1/threads/${thread_id}/messages?order=asc${ after ? `&after=${after}` : '' }`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                }
            )
        )
    ).json()
}
