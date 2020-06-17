(function single_player(){
    const btn_soma_1 = document.querySelector("#soma_1");
    const btn_soma_2 = document.querySelector("#soma_2");
    const btn_soma_3 = document.querySelector("#soma_3");
    const placar = document.querySelector(".placar");
    const status = document.querySelector(".status");

    // SETANDO VALORES INICIAIS
    totalScore = 0;
    placar.innerHTML = totalScore;
    status.innerHTML = "Sua vez";

    btn_soma_1.addEventListener("click", () => {
        addScorePlayer(1);
        addScoreComputer();
        setTimeout(() => {
            verifyScore(totalScore);
        }, 3000)
    })

    btn_soma_2.addEventListener("click", () => {
        addScorePlayer(2);
        addScoreComputer();
        setTimeout(() => {
            verifyScore(totalScore);
        }, 3000)
    })

    btn_soma_3.addEventListener("click", () => {
        addScorePlayer(3);
        addScoreComputer();
        setTimeout(() => {
            verifyScore(totalScore);
        }, 3000)
    })

    // JOGADOR
    function addScorePlayer(scorePlayer){
        if(totalScore < 21){
            totalScore += scorePlayer;
            placar.innerHTML = totalScore;
            console.log("Player jogou");
        }
    }

    // COMPUTADOR
    function addScoreComputer(){
        status.innerHTML = "Vez de computador";
        // DELAY PARA O PC JOGAR
        setTimeout(() => {
            if(totalScore < 21){
                const scoreComputer =  getRandomInt(1, 4);
                totalScore += scoreComputer;
                placar.innerHTML = totalScore;
                /*
                    QUANDO O COMPUTADOR TERMINAR A JOGADA, DEVOLVE A VEZ PARA O PLAYER
                */
                status.innerHTML = "Sua vez";
                console.log("Computador jogou");
            }
        }, 2000)
    }

    // VERIFICAÇÃO
    function verifyScore(score){
        console.log("Verificou");
        if(score >= 21){
            alert("Fim de jogo");

            setTimeout(() => {
                // SETANDO VALORES INICIAIS
                totalScore = 0;
                placar.innerHTML = totalScore;
                status.innerHTML = "Sua vez";
            }, 3000)
        }
    }

    // GERAR NÚMEROS INTEIROS ALTEATÓRIOS
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();