<script>
import useStore from './store';
import ActionComponent from './components/Actions.vue';
import LogsComponent from './components/Logs.vue';

export default {
  data() {
    return { 
      instanceMapKeys: ['user', 'monster'],
      store: useStore(),
    }
  },

  components: {
    ActionComponent, LogsComponent
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

    <action-component></action-component>
    <logs-component></logs-component>

  </div>
</template>

<style>
  .scrollable {
    height: 50vh;
    overflow-y: scroll;
  }
</style>
