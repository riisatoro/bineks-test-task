<script>
export default {
  data() {
    const personData = {maxHP: 100, currentHP: 100, name: 'Person'};

    return {
      instanceMapKeys: ['user', 'monster'],
      user: Object.assign({}, personData),
      monster: Object.assign({}, personData),
    }
  },
  methods: {
    randint(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    randomizeMonsterData(min, max) {
      this.monster.maxHP = this.randint(min, max);
      this.monster.currentHP = this.monster.maxHP;
    },

    updateUserData(hp) {
      this.user.maxHP = hp;
      this.user.currentHP = hp;
    },

    getPersonData(personType) {
      return personType === 'user' ? this.user : this.monster;
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

    startNewBattle() {
      this.randomizeMonsterData(50, 150);
      this.updateUserData(100);
    },

    checkPersonDied(personType) {
      if (this[personType].currentHP > 0) return false;
      window.alert(
        personType === 'monster'
        ? 'Congrats! You win!'
        : 'You died! Good luck next time!'
      );
      return true;
    },

    attack(personType, multiply) {
      const damage = this.randint(1, 10) * multiply;
      this[personType].currentHP -= damage;
      const isDead = this.checkPersonDied(personType);

      if (!isDead && personType == 'monster') this.attack('user', multiply);
      if (isDead) this.startNewBattle();
  
    },

    heal(e) {
      this.user.currentHP += this.randint(5, 10);
      this.user.currentHP > this.user.maxHP ? this.user.currentHP = this.user.maxHP : '';
      this.attack('user', 1);
    },

    surrend(e) {
      window.alert('You have been surrended! Good luck next time!');
      this.startNewBattle();
    }

  },

  mounted () {
    this.randomizeMonsterData(50, 150);
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
        <p class="mb-0 text-center">{{instance}}: {{ this[instance].currentHP }} HP</p>
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
