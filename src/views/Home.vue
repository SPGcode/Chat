<template>
  <div>
    <h1>Home</h1>
    <h2> {{ user.nombre }} is On-line</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"

export default {
  name: 'Home',
  computed: {
    ...mapState(['user'])
  }
}
</script>
