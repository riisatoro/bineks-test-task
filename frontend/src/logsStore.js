import { reactive } from 'vue';

export const logsStore = reactive({
  logs: [],
  
  log(logType, message) {
    this.logs.unshift({ logType, message });
  },

  logAttack(personType, multiply, damage) {
    const hitType = multiply > 1 ? 'Super Hit' : 'Hit';
    const person = personType == 'user' ? 'Monster' : 'You';
    const logType = personType == 'user' ? 'bg-danger' : 'bg-warning';
    const msg = `${person} used a ${hitType} and deal ${damage} damage.`
    this.log(logType, msg);
  },

});
