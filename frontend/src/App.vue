<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/layouts/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  },
  data: () => ({
    //
  }),
};
</script>

