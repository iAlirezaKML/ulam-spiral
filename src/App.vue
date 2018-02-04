<template>
  <div id="app">
    <input v-model="input" placeholder="Enter a number" />
    <table v-if="tableData">
      <tbody>
        <tr v-for="(row, rowkey) in tableData" :key="`row-${rowkey}`">
          <td v-for="(column, colkey) in row" :key="`col-${colkey}`">{{ column }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import code from './code'

export default {
  name: 'App',

  data () {
    return {
      input: null,
    }
  },

  computed: {
    tableData () {
      const { input } = this
      if (!input) {
        console.log('invalid');
        return null
      }
      const data = code(input)
      console.log(data);
      return data
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

td { border: 1px solid #5c6c7a; width: 36px; height: 36px; margin: 0; }
td:first-child { border-top-left-radius: 4px; }
table { margin: auto; border-collapse: collapse; }
</style>
