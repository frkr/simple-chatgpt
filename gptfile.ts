import {postBearer} from "../util-js/util";
import {urlFile} from "./chatgpt";

export async function gptFileList(apikey: string): Promise<OpenAIFileList> {
    return (await fetch(urlFile, postBearer({apikey}))).json()
}

export async function gptFile(file_id: string, apikey: string): Promise<OpenAIFile> {
    return (await fetch(`${urlFile}/${file_id}`, postBearer({apikey}))).json()
}

export async function gptFileDelete(file_id: string, apikey: string): Promise<OpenAIFile> {
    return (await fetch(`${urlFile}/${file_id}`, postBearer({apikey, method: "DELETE"}))).json()
}

export async function gptFileUpload({file, filename, purpose}: OpenAIFileReq, apikey: string): Promise<OpenAIFile> {

    let forma = new FormData();
    forma.append('file', file, filename);
    forma.append('purpose', purpose);
    return (await fetch(urlFile, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apikey,
        },
        body: forma,
    })).json();

}
