import OpenAI from "openai";

let clientGpt: OpenAI | null = null;

export function gptClient(accessToken: string, AIBaseURL: string): OpenAI {
  if (clientGpt) {
    console.log("cached");
    return clientGpt;
  }

  console.log("hit");
  clientGpt = new OpenAI({
    apiKey: accessToken,
    baseURL: AIBaseURL,
  });
  return clientGpt;
}

// import OpenAI from "openai";

// declare global {
//   // eslint-disable-next-line no-var
//   var clientGpt: OpenAI | null | undefined;
// }

// // @ts-ignore
// if (!globalThis.clientGpt) {
//   // @ts-ignore
//   globalThis.clientGpt = null;
// }

// export function gptClient(accessToken: string): OpenAI {
//   // @ts-ignore
//   if (globalThis.clientGpt) {
//     console.log("cached");
//     return globalThis.clientGpt;
//   }

//   console.log("hit");
//   const client = new OpenAI({ apiKey: accessToken });
//   // @ts-ignore
//   globalThis.clientGpt = client;
//   return client;
// }
