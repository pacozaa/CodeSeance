
import * as path from 'path';
import { bedrock } from '../llm/bedrock.js';
import { getOllamaStream } from '../llm/ollama.js';

interface SummaryRequest {
    text: string;
    relativePath: string;
}

interface SummaryResponse {
    summary: string;
}

export const summarizeFile = async (fileContent: string, filePath: string, rootPath: string): Promise<string> => {
    const relativePath = path.relative(rootPath, filePath);
    const prompt = `
    [Instruction] Summarized this file content [/Instruction] 

    [File Content]
    ${fileContent}
    [/File Content]

    ** Summary **
    `
    // const res = await bedrock.invoke(prompt)
    const res = await getOllamaStream(prompt)
   
    console.log({prompt,res})

    return `
    <MetaData>
    ${filePath}
    </MetaData>
    ${res}
    `
};

export const tableFile = async (fileContent: string, filePath: string, rootPath: string): Promise<string> => {
    const relativePath = path.relative(rootPath, filePath);
    return "helloworld"
};

export const improvementPointFile = async (fileContent: string, filePath: string, rootPath: string): Promise<string> => {
    const relativePath = path.relative(rootPath, filePath);

    return "helloworld"
};

export const convertFile = async (fileContent: string, filePath: string, rootPath: string): Promise<string> => {
    const relativePath = path.relative(rootPath, filePath);

    return "helloworld"
};

