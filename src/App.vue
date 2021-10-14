<template>
  <div id="app">
    <Table />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: { Table: () => import("@/components/Table") },
}
</script>
