<script>
import useStore from '../store';
import {
  DAMAGE_TO,
  MIN_DAMAGE,
  MAX_DAMAGE,
  MIN_HEAL,
  MAX_HEAL,
  POWER_MIN_MULTIPLIER,
  POWER_MAX_MULTIPLIER,
} from '../constants';

export default {
    data() {
        return {
            store: useStore(),
        }
    },
    methods: {
      hit(e, person='user') {
      },

      superHit(e, person='user') {
      },

      heal(e, person='user') {
      },

      surrend() {
      },
    }
}

</script>
<template>
    <div class="container border shadow-sm d-flex justify-content-center py-2 my-3">
      <button class="btn btn-primary mx-2" @click="hit">Hit</button>
      <button class="btn btn-warning mx-2" @click="superHit">Super Hit</button>
      <button class="btn btn-success mx-2" @click="heal">Heal</button>
      <button class="btn btn-danger mx-2" @click="surrend">Surrend</button>
    </div>
</template>