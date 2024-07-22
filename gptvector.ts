import {postBearer} from "../util-js/util";
import {urlVector} from "./chatgpt";

const headersBeta = {
    'OpenAI-Beta': 'assistants=v2'
}

export async function gptCreateVector(name: string, apikey: string): Promise<OpenAIVector> {
    return (
        await fetch(
            urlVector,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    method: 'POST',
                    data: {name}
                }
            )
        )
    ).json()
}

export async function gptCreateVectorFile(vector_store_id: string, file_id: string, apikey: string): Promise<any> {
    return (
        await fetch(
            `${urlVector}/${vector_store_id}/files`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    method: 'POST',
                    data: {file_id}
                }
            )
        )
    ).json()
}

export async function gptCreateVectorFileDelete(vector_store_id: string, file_id: string, apikey: string): Promise<any> {
    return (
        await fetch(
            `${urlVector}/${vector_store_id}/files/${file_id}`,
            postBearer(
                {
                    headers: headersBeta,
                    apikey,
                    method: 'DELETE',
                }
            )
        )
    ).json()
}
