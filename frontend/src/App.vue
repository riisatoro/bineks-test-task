<script>
export default {
  data() {
    const personData = {maxHP: 100, currentHP: 100, name: 'Person'};

    return {
      user: Object.assign({}, personData),
      monster: Object.assign({}, personData),
    }
  },
  methods: {
    randomizeMonsterData(min, max) {
      this.monster.maxHP = Math.floor(Math.random() * (max - min) + min);
      this.monster.currentHP = this.monster.maxHP;
    },

    getPersonData(personType) {
      return personType === 'user' ? this.user : this.monster;
    },

    getProgressPercent(personType) {
      const data = this.getPersonData(personType);
      return Math.floor(data.currentHP / (data.maxHP / 100));
    },

    progressStatus(personType) {
      const progress = this.getProgressPercent(personType);
      switch (progress) {
        case progress < 30:
          return 'bg-danger';
        case progress < 60:
          return 'bg-warning';
        default:
          return 'bg-success';
      }
    },

    progressWidth(personType) {
      return `width: ${this.getProgressPercent(personType)}%`
    },

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
      <div class="progress w-100 mx-2">
        <div 
          class="progress-bar"
          role="progressbar"
          :style="progressWidth('player')"
          :class="progressStatus('player')"
        >
        <p class="mb-0">Player: {{ this.user.currentHP }} HP</p>
        </div>
      </div>
      <div class="progress w-100 mx-2">
        <div 
          class="progress-bar"
          role="progressbar"
          :style="progressWidth('monster')"
          :class="progressStatus('monster')"
        >
          <p class="mb-0">Monster: {{ this.user.currentHP }} HP</p>
        </div>
      </div>
    </div>
  
  </div>
</template>
