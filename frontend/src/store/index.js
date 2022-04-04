import { defineStore } from "pinia";
import { useLogsStore } from "./logsStore";
import { MONSTER_MIN_HP, MONSTER_MAX_HP } from "../constants";

const personData = {maxHP: 100, currentHP: 100, name: 'Person'};

const useStore = defineStore('store', {
    state: () => ({
        user: Object.assign({}, personData),
        monster: Object.assign({}, personData),
        logs: useLogsStore(),
    }),

    actions: {
        randint(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },

        isPersonAlive(person) {
            return this[person].currentHP > 0;
        },

        getHpPercent(personType) {
            const data = this[personType];
            return Math.floor(data.currentHP / (data.maxHP / 100));
        },

        setDamage(person, value) {
            this[person].currentHP -= value;
            return this[person].currentHP > 0;
        },

        setHeal(person, value) {
            this[person].currentHP += value;
        },

        refreshMonster() {
            this.monster.maxHP = this.randint(MONSTER_MIN_HP, MONSTER_MAX_HP);
            this.monster.currentHP = this.monster.maxHP;
        },

        refreshPlayer(hp = 100) {
            this.user.maxHP = hp;
            this.user.currentHP = hp;
        },

        startNewBattle() {
            this.refreshMonster();
            this.refreshPlayer();
        },
    },

    persist: {
        enabled: true
    },
})

export default useStore;
