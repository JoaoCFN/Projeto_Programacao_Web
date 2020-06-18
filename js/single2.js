(function single_player(){
    const btn_soma_1 = document.querySelector("#soma_1");
    const btn_soma_2 = document.querySelector("#soma_2");
    const btn_soma_3 = document.querySelector("#soma_3");
    const placar = document.querySelector(".placar");
    const status = document.querySelector(".status");
    let lastPlay;

    // SETANDO VALORES INICIAIS
    totalScore = 0;
    placar.innerHTML = totalScore;
    status.innerHTML = "Sua vez";
    btn_soma_1.innerHTML = totalScore + 1;
    btn_soma_2.innerHTML = totalScore + 2;
    btn_soma_3.innerHTML = totalScore + 3;

    function attButtons(){
        btn_soma_1.innerHTML = totalScore + 1;
        btn_soma_2.innerHTML = totalScore + 2;
        btn_soma_3.innerHTML = totalScore + 3;
    }

    // JOGADOR
    function addScorePlayer(scorePlayer){
        if(totalScore < 21){
            totalScore += scorePlayer;
            placar.innerHTML = totalScore;
            lastPlay = "Jogador";
            attButtons();
            console.log(lastPlay);
        }
    }

    // COMPUTADOR
    function addScoreComputer(){
        // DESATIVAR BOTÕES DO USUÁRIO
        btn_soma_1.setAttribute("disabled", true);
        btn_soma_2.setAttribute("disabled", true);
        btn_soma_3.setAttribute("disabled", true);

        totalScore < 21 ? status.innerHTML = "Vez do computador": ""
        // DELAY PARA O PC JOGAR
        setTimeout(() => {
            if(totalScore < 21){
                const scoreComputer =  getRandomInt(1, 4);
                totalScore += scoreComputer;
                placar.innerHTML = totalScore;
                /*
                    SE O SCORE FOR MENOR QUE 21, QUANDO O COMPUTADOR TERMINAR A JOGADA, DEVOLVE A VEZ PARA O PLAYER
                */
                totalScore < 21 ? status.innerHTML = "Sua vez": ""
                // REATIVA BOTÕES DO USUÁRIO
                btn_soma_1.removeAttribute("disabled");
                btn_soma_2.removeAttribute("disabled");
                btn_soma_3.removeAttribute("disabled");
                lastPlay = "Computador";
                attButtons();
                console.log(lastPlay);
            }
        }, 2000)
    }

    // VERIFICAÇÃO
    function verifyScore(score){
        console.log("Verificou");
        if(score == 21){
            status.innerHTML = "Fim de jogo";

            if(lastPlay == "Jogador"){
                Swal.fire({
                    icon: "success",
                    title: "Fim de jogo",
                    text: `Voce venceu!!`
                })
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Fim de jogo",
                    text: `Voce perdeu`
                })
            }

            resetInfos();
        }
        
        else if(score > 21){
            if(lastPlay == "Jogador"){
                Swal.fire({
                    icon: "error",
                    title: "Fim de jogo",
                    text: `Voce perdeu`
                })
            }
            else{
                Swal.fire({
                    icon: "success",
                    title: "Fim de jogo",
                    text: `Voce venceu!!`
                })
            }

            resetInfos();
        }
    }

    function resetInfos(){
        setTimeout(() => {
            // SETANDO VALORES INICIAIS
            totalScore = 0;
            placar.innerHTML = totalScore;
            status.innerHTML = "Sua vez";
            // REATIVA BOTÕES DO USUÁRIO
            btn_soma_1.removeAttribute("disabled");
            btn_soma_2.removeAttribute("disabled");
            btn_soma_3.removeAttribute("disabled");
            attButtons();
        }, 2000)
    }

    // GERAR NÚMEROS INTEIROS ALTEATÓRIOS
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

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
        }, 2500)
    })

})();