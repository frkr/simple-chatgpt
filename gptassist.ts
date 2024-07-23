import {postBearer} from "../util-js/util";
import {urlAssist} from "./chatgpt";
import {OpenAIAssist, OpenAIAssistReq} from "./OpenAI";

const headersBeta = {
    'OpenAI-Beta': 'assistants=v2'
}

export async function gptAssistCreate(assist: OpenAIAssistReq, apikey: string): Promise<OpenAIAssist> {
    return (
        await fetch(
            urlAssist,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    method: 'POST',
                    data: assist
                }
            )
        )
    ).json()
}

export async function gptAssistGet(assistant_id: string, apikey: string): Promise<OpenAIAssist> {
    return (
        await fetch(
            `${urlAssist}/${assistant_id}`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    method: 'GET',
                }
            )
        )
    ).json()
}


export async function gptAssistAddVS(assistant_id: string, assist: OpenAIAssistReq, apikey: string): Promise<OpenAIAssist> {
    return (
        await fetch(
            `${urlAssist}/${assistant_id}`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    method: 'POST',
                    data: assist
                }
            )
        )
    ).json()
}
