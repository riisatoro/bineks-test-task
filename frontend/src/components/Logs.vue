<script>
import useStore from '../store';

export default {
    data() {
        return {
            store: useStore(),
        }
    },
}

</script>
<template>
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
</template>