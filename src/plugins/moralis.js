import Moralis from 'moralis/dist/moralis.min.js'

export default {
    install: async (app) => {
        await Moralis.start({
            serverUrl: import.meta.env.VITE_SERVER_URL,
            appId: import.meta.env.VITE_APP_ID
        })
        app.provide('moralis', Moralis)
    }
  }