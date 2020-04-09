function getRandom (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


new Vue({
    el: '#app',
    data: {
        me: 100,
        monster: 100,
        battleBtnVis: false,
        restartBtnVis: true,
        logVis: false,
        log:[
        ]
    },
    computed: {

    },
    methods: {
        giveUp(){
            alert('Shame on You, looser!')
            this.battleBtnVis = !this.battleBtnVis
            this.restartBtnVis = !this.restartBtnVis
            
        },
        performTurn(minHerDmg, maxHerDmg, flag){
            let monDmg = getRandom(5, 15)
            let herDmg = getRandom(minHerDmg, maxHerDmg)
            let stringtoLog = ''
            
            switch (flag) {
                case 'atack':
                    stringtoLog = 'Heroe dealed ' + herDmg + ' damage.'
                    this.monster = this.monster - herDmg
                    break;
                case 'heal':
                    stringtoLog = 'Heroe healed ' + herDmg + ' HP.'
                    this.me = this.me + herDmg
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
            this.me = this.me - dmg
        },
        restart(){
            this.me = 100,
            this.monster = 100,
            this.battleBtnVis = !this.battleBtnVis
            this.restartBtnVis = !this.restartBtnVis
            this.logVis = true
            this.log = []
        },
        checkWhoWin(){
            if (this.me <= 0) {
                alert('Monster win!'),
                this.battleBtnVis = !this.battleBtnVis
                this.restartBtnVis = !this.restartBtnVis
            } if (this.monster <= 0) {
                alert('Player win!')
                this.battleBtnVis = !this.battleBtnVis
                this.restartBtnVis = !this.restartBtnVis
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