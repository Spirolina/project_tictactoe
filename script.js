const gameboard = (() => {

    let _table = new Array(9)

    const getSign = (num) => _table[num]
    const clear = () => _table = new Array(9)
    const setSign = (num, sign) => {
        _table[num] = sign
    }

    return {
        getSign,
        setSign,
        clear
    }

})()

const Player = (sign) => {
    let _sign = sign
    const getPlayerSign = () => _sign
    const setPlayerSign = (newSign) => _sign = newSign

    return {
        getPlayerSign,
        setPlayerSign
    }
}


const gameController = (() => {
    let _turn = 'X'
    let _winner = ''

    const getTurn = () => _turn

    const turn = () => {
        if (_turn == 'X') _turn = 'O'
        else if (_turn == 'O') _turn = 'X'
    }

    const checkWin = (sign) => {
        if (
            (gameboard.getSign(0) == sign && gameboard.getSign(1) == sign && gameboard.getSign(2) == sign) ||
            (gameboard.getSign(3) == sign && gameboard.getSign(4) == sign && gameboard.getSign(5) == sign) ||
            (gameboard.getSign(6) == sign && gameboard.getSign(7) == sign && gameboard.getSign(8) == sign) ||
            (gameboard.getSign(0) == sign && gameboard.getSign(3) == sign && gameboard.getSign(6) == sign) ||
            (gameboard.getSign(1) == sign && gameboard.getSign(4) == sign && gameboard.getSign(7) == sign) ||
            (gameboard.getSign(2) == sign && gameboard.getSign(5) == sign && gameboard.getSign(8) == sign) ||
            (gameboard.getSign(0) == sign && gameboard.getSign(4) == sign && gameboard.getSign(8) == sign) ||
            (gameboard.getSign(2) == sign && gameboard.getSign(4) == sign && gameboard.getSign(6) == sign)
        ) {
            _isFinish = true
            return sign
        }
        else {
            return false
        }
    }

    const checkDraw = () => {
        if (checkWin('X') || checkWin('O')) {
            return false
        } else {
            let isDraw = true
            for (let i = 0; i <= 8; i++) {
                    if (gameboard.getSign(i) == undefined) {

                    isDraw = false
                }
                
            }
            if (isDraw) {
                _isFinish = true
                return true
            }
        }
    }

  

    const restart = () => {
        gameboard.clear()
        if (_turn == 'X') _turn = 'X'
        else if (_turn == 'O') _turn = 'X'

    }

    return {
        turn,
        checkWin,
        checkDraw,
        restart,
        getTurn

    }
})()

const displayController = (() => {

        let _td = document.getElementsByTagName('td')
        
        const pickSign = (e) =>{
           
            
            for(let i=0; i<=8; i++) if(_td[i] == e.target && gameboard.getSign(i) == undefined){
                e.target.textContent = gameController.getTurn()
                gameboard.setSign(i,gameController.getTurn())
            } 


           
            if(gameController.checkWin('X')){
                console.log('X win')
                let sign = document.getElementById('sign')
                let finish = document.getElementById('finish')
                let table  = document.getElementById('table')
                
                sign.textContent = 'X Win'
                
                table.classList.add('blur')
                setTimeout(() => {
                    finish.classList.add('block')
                },600)
                
                console.log(finish)
               


            } 
            if(gameController.checkWin('O')){
                console.log('O win')
                let sign = document.getElementById('sign')
                let finish = document.getElementById('finish')
                let table  = document.getElementById('table')
                
                sign.textContent = 'O Win'
                
                table.classList.add('blur')
                setTimeout(() => {
                    finish.classList.add('block')
                },600)
                
                console.log(finish)

            }




            if(gameController.checkDraw()){
               
                let sign = document.getElementById('sign')
                let finish = document.getElementById('finish')
                let table  = document.getElementById('table')
                
                sign.textContent = `It's Draw`
                
                table.classList.add('blur')
                setTimeout(() => {
                    finish.classList.add('block')
                },600)
            }

            gameController.turn()
        }

        


        const restartFunc = () => {
            gameController.restart()
            console.log(gameboard.getSign(0));
            let finish = document.getElementById('finish')
            let table  = document.getElementById('table')

            for(td of _td){
                console.log(td)
                td.textContent=undefined
            }

            finish.classList.remove('block')
            table.classList.remove('blur')

        }

        const restart = document.getElementById('restart')
        restart.addEventListener('click',restartFunc)
        
        for(td of _td){
            console.log(td)
            td.addEventListener('click',pickSign)
        }
       

       

    

 

})()

