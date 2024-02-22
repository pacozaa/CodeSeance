
import axios from 'axios';
import * as path from 'path';
import { bedrock } from '../llm/bedrock';

interface SummaryRequest {
    text: string;
    relativePath: string;
}

interface SummaryResponse {
    summary: string;
}

export const summarizeFile = async (fileContent: string, filePath: string, rootPath: string): Promise<string> => {
    const relativePath = path.relative(rootPath, filePath);
    // bedrock.getNumTokens(fileContent)
    const metaData={
        filePath,
        rootPath
    }
    return `
    <MetaData>
    ${metaData}
    </MetaData>
    helloworld 
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

