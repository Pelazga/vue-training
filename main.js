function getRandom (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


new Vue({
    el: '#app',
    data: {
        me: 100,
        monster: 100,
        gameIsRuning: false,
        logVis: false,
        log:[
        ]
    },
    computed: {

    },
    methods: {
        giveUp(){
            alert('Shame on You, looser!')
            this.gameIsRuning = !this.gameIsRuning           
        },
        performTurn(minHerDmg, maxHerDmg, flag){
            let monDmg = getRandom(5, 15)
            let herDmg = getRandom(minHerDmg, maxHerDmg)
            let stringtoLog = ''
            
            switch (flag) {
                case 'atack':
                    stringtoLog = 'Heroe dealed ' + herDmg + ' damage.'
                    this.monster -= herDmg
                    break;
                case 'heal':
                    stringtoLog = 'Heroe healed ' + herDmg + ' HP.'
                    this.me += herDmg
                    if (this.me > 100){
                        this.me = 100;
                    }
                    break;
                default:
                    stringtoLog = 'Wrong flag'
                    break;
            }
            
            this.addToLog(stringtoLog, monDmg)
            
            this.monsterAtack(monDmg)
            
            this.checkWhoWin()
        },
        monsterAtack(dmg){
            this.me -= dmg
        },
        restart(){
            this.me = 100,
            this.monster = 100,
            this.gameIsRuning = !this.gameIsRuning
            this.logVis = true
            this.log = []
        },
        checkWhoWin(){
            if (this.me <= 0) {
                alert('Monster win!'),
                this.gameIsRuning = !this.gameIsRuning
            } if (this.monster <= 0) {
                alert('Player win!')
                this.gameIsRuning = !this.gameIsRuning
            }
        },
        addToLog(herDmg, monDmg){
            let tempObj = {
                'player-turn': '',
                'monster-turn': '',
            };

            tempObj['player-turn'] =  herDmg
            tempObj['monster-turn'] =  'Monster dealed ' + monDmg + ' damage.'

            this.log.push(tempObj)
        }
    }
})