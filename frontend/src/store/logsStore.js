import { defineStore } from 'pinia';

export const useLogsStore = defineStore('logs', {
  state: () => ({
    logs: [],
  }),

  actions: {
    writeLog(type, message) {
      this.logs.unshift({ type, message });
    },
  },

})
