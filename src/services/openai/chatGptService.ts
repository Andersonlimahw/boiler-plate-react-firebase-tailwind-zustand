// https://platform.openai.com/docs/api-reference/images/create-edit
const OPEN_API_KEY = "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";
const OPEN_API_ORGANIZATION_ID = "org-Y0UAkVcpXvOEbAkB85WMQ2pU";
const OPEN_API_CHAT_URL = "https://api.openai.com/v1/chat/completions ";
const OPEN_API_MODEL_VERSION = "gpt-3.5-turbo";
export const CHAT_GPT_ID = "chat-gpt-id-default";

export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: Usage;
}

interface Choice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}



export async function sendChatGptMessage(message: string) : Promise<ChatCompletion | any> {
  try {
    const body = {
      model: OPEN_API_MODEL_VERSION,
      messages: [{ role: "user", content: message }],
      temperature: 0.8,
    };

    let response;
    await fetch(OPEN_API_CHAT_URL, {
      method: "POST",
      headers: {        
        "Content-Type": "application/json",
        "OpenAI-Organization": OPEN_API_ORGANIZATION_ID,
        Authorization: `Bearer ${OPEN_API_KEY}`,
      },     
      body: JSON.stringify(body),
    }).then((data : Response) => {
      if(data.ok) {
        response = data.json().then((data) => data);
        console.log("[sendChatGptMessage]: Sucesso ao enviar mensagem para o chat GPT", response);
      } else {
        console.error("[sendChatGptMessage]: Erro  ao enviar mensagem para o chat GPT", data, data.json().then(data => data));
        throw new Error('[sendChatGptMessage]: Erro ao enviar mesangem para o GPT' + data)
      }
      
    });
    return response;
  } catch {
    throw new Error("[sendChatGptMessage]: Erro ao enviar mensagem para o chat GPT");
  }
}
