import { reactive } from 'vue';
import { logsStore } from './logsStore';

const personData = {maxHP: 100, currentHP: 100, name: 'Person'};

export const randint = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const battleStore = reactive({
  user: Object.assign({}, personData),
  monster: Object.assign({}, personData),
  
  setDamage(person, value) {
    this[person].currentHP -= value;
    return this[person].currentHP > 0;
  },

  setHeal(person, value) {
    this[person].currentHP += value;
  },

  refreshMonster() {
    this.monster.maxHP = randint(50, 150)
    this.monster.currentHP = this.monster.maxHP;
  },

  refreshPlayer(hp = 100) {
    this.user.maxHP = hp;
    this.user.currentHP = hp;
  },

  startNewBattle() {
    logsStore.log('bg-warning', 'A new monster appears');
    this.refreshMonster();
    this.refreshPlayer();
  },

});
