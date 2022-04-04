<script>
import useStore from './store';
import {
  DAMAGE_TO,
  MIN_DAMAGE,
  MAX_DAMAGE,
  MIN_HEAL,
  MAX_HEAL,
  POWER_MIN_MULTIPLIER,
  POWER_MAX_MULTIPLIER,
} from './constants';

export default {
  data() {
    return { 
      instanceMapKeys: ['user', 'monster'],
      store: useStore(),
    }
  },

  methods: {
    progressStatus(personType) {
      const hpPercent = this.store.getHpPercent(personType);
      if (hpPercent > 60) {
        return 'bg-success';
      } else if (hpPercent > 30) {
        return 'bg-warning';
      }
      return 'bg-danger';
    },

    progressWidth(personType) {
      return `width: ${this.store.getHpPercent(personType)}%`
    },

    hit(e, person='user') {
    },

    superHit(e, person='user') {
    },

    heal(e, person='user') {
    },

    surrend() {

    },
    
  },
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
        <p class="mb-0 text-center">{{ instance }}: {{ this.store[instance].currentHP }} HP</p>
        </div>
      </div>
    </div>

    <div class="container border shadow-sm d-flex justify-content-center py-2 my-3">
      <button class="btn btn-primary mx-2" @click="hit">Hit</button>
      <button class="btn btn-warning mx-2" @click="superHit">Super Hit</button>
      <button class="btn btn-success mx-2" @click="heal">Heal</button>
      <button class="btn btn-danger mx-2" @click="surrend">Surrend</button>
    </div>

    <div v-if="this.store.logs.logs.length > 0" class="container border shadow-sm text-center py-2 my-5 scrollable">
      <div
       v-for="(instance, index) in this.store.logs.logs" 
       :key="index" 
       :class="instance.type"
       class="my-1"
      >
        <b><span class="text-white">{{ instance.message }}</span></b>
      </div>
    </div>
  </div>
</template>

<style>
  .scrollable {
    height: 50vh;
    overflow-y: scroll;
  }
</style>
