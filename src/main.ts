import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast, { POSITION, PluginOptions } from "vue-toastification";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import router from "./router/router";

/* add icons to the library */
library.add(faPenToSquare, faTrash);

const options: PluginOptions = {
    position: POSITION.TOP_CENTER,
};

createApp(App)
    .use(router)
    .use(Toast, options)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
