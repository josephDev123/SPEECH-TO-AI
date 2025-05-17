import { config } from "./lib/config";
import { App } from "./app";
import { gptClient } from "./lib/plugin/chatgptClient";

(function Main() {
  const options = {
    config,
    clientGtp: gptClient(config.CHATGPT_SECRET, config.OPENAI_BASEURL),
  };

  App(options)
    .then((app) =>
      app.listen(options.config.PORT, () =>
        console.log(`running on PORT:${options.config.PORT}`)
      )
    )
    .catch((error) => console.log("error", error));
})();
