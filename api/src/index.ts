import { config, IEnvSchema } from "./lib/config";
import { App } from "./app";
import { gptClient } from "./lib/plugin/chatgptClient";
import OpenAI from "openai";
import { GlobalError } from "./lib/plugin/GlobalErrorHandler";

export interface options {
  config: IEnvSchema;
  clientGtp: OpenAI;
}

(async function Main() {
  const options: options = {
    config,
    clientGtp: gptClient(config.CHATGPT_SECRET, config.OPENAI_BASEURL),
  };

  App(options)
    .then((app) =>
      app.listen(options.config.PORT, () =>
        console.log(`running on PORT:${options.config.PORT}`)
      )
    )
    .catch((error) => {
      throw new GlobalError(error.name, error.message, 500, false);
    });
})();
