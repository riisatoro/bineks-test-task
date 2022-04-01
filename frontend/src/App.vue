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
    randomizeMonsterData(min, max) {
      this.monster.maxHP = Math.floor(Math.random() * (max - min) + min);
      this.monster.currentHP = this.monster.maxHP;
      console.log(this.monster.currentHP)
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
        <p class="mb-0">{{instance}}: {{ this[instance].currentHP }} HP</p>
        </div>
      </div>
    </div>
  
  </div>
</template>
