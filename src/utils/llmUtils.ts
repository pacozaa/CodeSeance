
import * as path from 'path';
import { bedrock } from '../llm/bedrock.js';
import { getOllamaStream } from '../llm/ollama.js';
import { openAi } from '../llm/openai.js';

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
    [MetaData]
    ${filePath}
    [/MetaData]
    [File Content]
    ${fileContent}
    [/File Content]

    ** Summary in Markdown Format**
    `
    // const res = await bedrock.invoke(prompt)
    const res = await openAi.invoke(prompt)
    // const res = await getOllamaStream(prompt)
   
    console.log({prompt,res})

    return res
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

