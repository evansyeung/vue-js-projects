function getRandomAttackValue(max, min) {
  // Formula for calculating a random number between a min and max
  return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    }
  },
  computed: {
    monsterHealthBarStyle() {
      // Negative values cannot be displayed so manually set to 0
      if (this.monsterHealth <= 0) {
        return { width: '0%' }
      }
      return {
        width: `${this.monsterHealth}%`
      }
    },
    playerHealthBarStyle() {
      // Negative values cannot be displayed so manually set to 0
      if (this.playerHealth <= 0) {
        return { width: '0%' }
      }
      return {
        width: `${this.playerHealth}%`
      }
    },
    toggleSpecialAttackBtn() {
      return this.currentRound % 3 !== 0
    }
  },
  // Use watchers to keep track of a data property and reacting to its changes
  watch: {
    playerHealth(value) {
      // Draw
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw'
      }
      // Player lost
      else if (value <= 0) {
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      // Draw
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw'
      }
      // Monster lost
      else if (value <= 0) {
        this.winner = 'player'
      }
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++
      const attackValue = getRandomAttackValue(12, 5)
      this.monsterHealth -= attackValue
      this.addLogMessage('player', 'attack', attackValue)
      this.attackPlayer()
    },
    attackPlayer() {
      const attackValue = getRandomAttackValue(15, 8)
      this.playerHealth -= attackValue
      this.addLogMessage('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      this.currentRound++
      this.monsterHealth -= getRandomAttackValue(25, 10)
      this.attackPlayer()
    },
    healPlayer() {
      this.currentRound++
      const healValue = getRandomAttackValue(20, 8)
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healValue
      }
      this.addLogMessage('player', 'heal', healValue)
      this.attackPlayer()
    },
    playerSurrender() {
      this.winner = 'monster'
    },
    resetGame() {
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.currentRound = 0,
      this.winner = null,
      this.logMessages = []
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    }
  }
})

app.mount('#game')
