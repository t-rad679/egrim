import "./assets/main.css"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"
import { createApp, h, provide } from "vue"

import App from "@/web/App.vue"
import router from "@/web/router/router"


const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})
createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
    .use(router)
    .mount("#app")
