import { defineStore } from 'pinia';

const eventMessageMapping = {
  'unknown': (person, result) => ({
    type: 'bg-info',
    message: `Unknown action by ${person} with value ${result}`,
  }),
  'simpleHit': (person, result) => ({
    type: person === 'user' ? 'bg-warning' : 'bg-danger',
    message: `${person} made a hit and deal ${result} damage.`
  }),
  'death': (person, result) => ({
    type: person === 'user' ? 'bg-warning' : 'bg-danger',
    message: `${person} is dead.`
  }),
  'superHit': (person, result) => ({
    type: person === 'user' ? 'bg-warning' : 'bg-danger',
    message: `${person} made a super hit and deal ${result} damage.`
  }),
  'heal': (person, result) => ({
    type: 'bg-success',
    message: `${person} made a heal and restore ${result} hp`
  }),
  'surrend': (person, result) => ({
    type: 'bg-danger',
    message: `${person} surrended!`
  }),
}

export const useLogsStore = defineStore('logs', {
  state: () => ({
    logs: [],
  }),

  actions: {
    parseEventKey(event) {
      if (typeof(event) === 'string') return event;
      return event.target.getAttribute('data-action') || 'unknown';
    },

    writeLog(event, result, person) {
      const eventKey = this.parseEventKey(event);
      const createEventMessage = eventMessageMapping[eventKey];
      if (createEventMessage) this.logs.unshift(createEventMessage(person, result));
    },
  },

})
