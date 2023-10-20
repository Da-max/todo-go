import { createApp } from "vue";
import App from "./App.vue";
import auth from "./utils/auth";
import { createClient } from "villus";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCaretUp,
    faCheck,
    faChevronLeft,
    faCircleCheck,
    faClose,
    faFloppyDisk,
    faKey,
    faPencil,
    faPlus,
    faRightFromBracket,
    faTrash,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

import "./assets/style/index.css";
import router from "./router";
import { defaultPlugins } from "./utils/client";

const app = createApp(App);

const client = createClient({
    url: import.meta.env.VITE_GRAPHQL_ENDPOINT || "/query",
    use: [auth.villusPlugin, ...defaultPlugins()],
});

const pinia = createPinia();

app.use(client);
app.use(pinia);
app.use(router);

library.add(faPlus);
library.add(faClose);
library.add(faPencil);
library.add(faCaretUp);
library.add(faCheck);
library.add(faCircle);
library.add(faCircleCheck);
library.add(faChevronLeft);
library.add(faUser);
library.add(faRightFromBracket);
library.add(faFloppyDisk);
library.add(faTrash);
library.add(faKey);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
