import { config } from "./plugin/config";
import { App } from "./app";

(async function Main() {
  App(config)
    .then((app) =>
      app.listen(config.PORT, () =>
        console.log(`running on PORT:${config.PORT}`)
      )
    )
    .catch((error) => console.log("error", error));
})();
