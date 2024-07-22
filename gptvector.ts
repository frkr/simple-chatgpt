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
