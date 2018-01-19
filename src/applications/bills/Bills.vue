<template>
  <div>
    <h1 v-if="closed">This bill has been closed.</h1>
    <h1 v-else>This bill is still ongoing!</h1>
    <h4>{{ $t('bills:testKey') }}</h4>
    <table class="table">
      <thead>
        <tr>
          <td>Date</td>
          <td>Recipient</td>
          <td>Total</td>
          <td>Kenny</td>
          <td>David</td>
          <!-- <td>Debt</td> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in bills" :key="`${item.name.replace(/\s/, '').toLowerCase()}-${item.cost * 100}`">
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
          <td>€ {{ item.cost }}</td>
          <td :class="{ 'payer': item.paidBy === 'kenny'}">€ {{ item.kenny }}</td>
          <td :class="{ 'payer': item.paidBy === 'david'}">€ {{ item.david }}</td>
          <!-- <td>{{  }}</td> -->
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>€ {{ total.toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import data from './data-example.json'

function calculateCosts ({ cost, participants, paidBy, partials = [] }) {
  // Assign the cost to each participant.
  let costs = {}
  for (const name of participants) { costs[name] = cost / participants.length }

  // For each partial, subtract the cost from other participants, and add it to the one the partial is for.
  for (const partial of partials) {
    const fraction = partial.cost / participants.length
    for (const name of participants) { costs[name] -= fraction }
    costs[partial.for] += (fraction * 2)
  }

  return costs
}

// for 'key' in 'firebase'
//   proxies[key] = {}
//   watch key to set ref
//   register listener that sets proxy unless value is the same

export default {
  name: 'Bills',
  data () {
    return {
      data
    }
  },

  created () {
    const bundle = {
      en: {
        bills: {
          'testKey': 'This is a test translation.'
        }
      }
    }

    this.$emit('loading', true)
    this.$i18n.load('en', 'bills', bundle)
      .then(() => {
        this.$emit('loading', false)
        this.$forceUpdate()
      })
  },

  computed: {
    closed () {
      return this.data.bills['2018']['1'].closed
    },

    bills () {
      return this.data.bills['2018']['1'].items
        .map(item => Object.assign({}, item, calculateCosts(item)))
    },

    total () {
      return this.bills.reduce((total, { cost }) => total + cost, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table td {
    padding: 4px 16px;
  }

  .table td.payer {
    font-weight: bold;
  }
</style>
