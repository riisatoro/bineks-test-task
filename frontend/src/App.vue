<script>
import { battleStore, randint } from './store';

export default {
  data() {
    return { 
      instanceMapKeys: ['user', 'monster'],
      game: battleStore,
    }
  },

  methods: {
    getPersonData(personType) {
      return personType === 'user' ? this.game.user : this.game.monster;
    },

    getProgressPercent(personType) {
      const data = this.getPersonData(personType);
      return Math.floor(data.currentHP / (data.maxHP / 100));
    },

    progressStatus(personType) {
      const progressPercent = this.getProgressPercent(personType);
      if (progressPercent > 60) {
        return 'bg-success';
      } else if (progressPercent > 30) {
        return 'bg-warning';
      }
      return 'bg-danger';

    },

    progressWidth(personType) {
      return `width: ${this.getProgressPercent(personType)}%`
    },

    personDied(personType) {
      window.alert(
        personType === 'monster'
        ? 'Congrats! You win!'
        : 'You died! Good luck next time!'
      );
    },

    attack(personType, multiply) {
      const damage = randint(1, 10) * multiply;
      const isAlive = this.game.setDamage(personType, damage);

      if (!isAlive) { this.personDied(personType); this.game.startNewBattle(); }
      if (isAlive && personType == 'monster') this.attack('user', multiply);
    },

    heal(e) {
      const hp = randint(5, 15);
      this.game.setHeal('user', hp);
      this.attack('user', 1);
    },

    surrend(e) {
      window.alert('You have been surrended! Good luck next time!');
      this.game.startNewBattle();
    }
  },

  mounted () {
    this.game.refreshMonster();
  }
}
</script>

<template>
  <div class="container">
    <h1 class="text-center my-3 mb-5">Monster fight app</h1>
    
    <div class="container border shadow-sm d-flex justify-content-around py-5">
      <div 
        class="progress w-100 mx-2"
        v-for="(instance, index) in instanceMapKeys"
        :key="index"
      >
        <div 
          class="progress-bar"
          role="progressbar"
          :style="progressWidth(instance)"
          :class="progressStatus(instance)"
        >
        <p class="mb-0 text-center">{{instance}}: {{ this.game[instance].currentHP }} HP</p>
        </div>
      </div>
    </div>
  
    <div class="container border shadow-sm d-flex justify-content-center py-2 my-3">
      <button class="btn btn-primary mx-2" @click="() => attack('monster', 1)">Hit</button>
      <button class="btn btn-warning mx-2" @click="() => attack('monster', 2)">Super Hit</button>
      <button class="btn btn-success mx-2" @click="heal">Heal</button>
      <button class="btn btn-danger mx-2" @click="surrend">Surrend</button>
    </div>
  </div>
</template>
