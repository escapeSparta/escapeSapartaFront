<template>
  <div>
    <MainStore></MainStore>
    <SearchStore></SearchStore>
  </div>
</template>

<script>
import MainStore from "@/views/MainStore.vue";
import SearchStore from "@/views/SearchStore.vue";

export default {
  name: 'HomePage',
  components: {
    MainStore,
    SearchStore
  }
};
</script>