export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    choices: {
      index: number;
      message: {
        role: 'assistant' | 'user' | 'system';
        content: string;
      };
      finish_reason: string;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }
  