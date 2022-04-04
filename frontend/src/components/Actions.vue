<script>
import useStore from '../store';
import {
  MIN_DAMAGE,
  MAX_DAMAGE,
  MIN_HEAL,
  MAX_HEAL,
  POWER_MIN_MULTIPLIER,
  POWER_MAX_MULTIPLIER,
  DAMAGE_FROM,
} from '../constants';

export default {
    data() {
        return {
            store: useStore(),
        }
    },
    methods: {
      startNewBattle(person) {
        const message = person === 'monster' 
          ? 'You defeated the monster! Congrats!'
          : 'You died! Good luck next time!'
        this.store.logs.writeLog(
          person === 'monster'
          ? 'bg-success'
          : 'bg-danger',
          message,
        )
        window.alert(message);
        this.store.startNewBattle();
      },

      processDamage(person, damage, hitType) {
        this.store.setDamage(person, damage);

        this.store.logs.writeLog(
          person === 'monster' ? 'bg-warning' : 'bg-danger',
          `${DAMAGE_FROM[person]} made a ${hitType || 'hit'} and deal ${damage} damage;`
        )

        if (!this.store.isPersonAlive(person)) {
          this.startNewBattle(person);
          return false;
        }
        return true;
      },

      deliverDamage(person, damage, hitType) {
        const stillAlive = this.processDamage(person, damage, hitType);
        if (stillAlive && person === 'monster') this.superHit({}, DAMAGE_FROM[person]);
      },

      hit(e, person='monster') {
        const damage = this.store.randint(MIN_DAMAGE, MAX_DAMAGE);
        this.deliverDamage(person, damage, 'hit')
      },

      superHit(e, person='monster') {
        const multiplier = this.store.randint(POWER_MIN_MULTIPLIER, POWER_MAX_MULTIPLIER);
        const damage = this.store.randint(MIN_DAMAGE, MAX_DAMAGE) * multiplier;
        this.deliverDamage(person, damage, 'super hit');
      },

      heal(e, person='user') {
        const health = this.store.randint(MIN_HEAL, MAX_HEAL);
        this.store.setHeal(person, health);
        this.store.logs.writeLog('bg-success', `${person} uses a heal potion and restore ${health} HP.`)
      },

      surrend() {
        const message = 'You have been surrended! Good luck next time!';
        window.alert(message);
        this.store.logs.writeLog('bg-danger', message);
        this.store.startNewBattle();
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