
import axios from 'axios';
import * as path from 'path';

interface SummaryRequest {
  text: string;
  relativePath: string;
}

interface SummaryResponse {
  summary: string;
}

export const summarizeFile = async (fileContent: string, filePath: string, rootPath: string, apiUrl: string): Promise<string> => {
  const relativePath = path.relative(rootPath, filePath);

  const request: SummaryRequest = {
    text: fileContent,
    relativePath,
  };

  const response = await axios.post<SummaryResponse>(apiUrl, request);
  const summary = response.data.summary;

  return summary;
};