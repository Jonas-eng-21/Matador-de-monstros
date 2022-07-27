new Vue ({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    log: []
  },

  computed:{
    hasResult(){
      return this.playerLife == 0 || this.monsterLife == 0
    }
  },

  methods:{
    starGame(){
        this.running = true
        this.playerLife = 100
        this.monsterLife = 100
        this.log = []
    },

    attack(especial){
      this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
      if (this.monsterLife > 0){
        this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
      }
    },

    hurt( prop, min, max, especial, source, target, cls){
      const plus = especial ? 5:0
      const hurt = this.getRadom(min + plus, max + plus)
      this[prop] = Math.max (this[prop] - hurt, 0)
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
    },

    healAndHurt(){
      this.heal(10, 15)
      this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
    },

    heal(min, max){
      const heal = this.getRadom(min, max)
      this.playerLife = Math.min(this.playerLife + heal, 100)
      this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
    },

    registerLog(text, cls){
      this.log.unshift({text, cls})
    },

    getRadom(min, max){
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    }
  },

  watch: {
    hasResult(value){
      if (value) this.running = false
    }
  },
})
