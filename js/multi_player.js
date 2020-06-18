(function multi_player(){
    // PLAYER 1
    let player1 = new Object();
    player1.status = "Sua vez";
    const btn_soma_1 = document.querySelector("#soma_1");
    const btn_soma_2 = document.querySelector("#soma_2");
    const btn_soma_3 = document.querySelector("#soma_3");
    const status_player1 = document.querySelector(".status_player1");
    status_player1.innerHTML = player1.status;

    // PLAYER 2
    let player2 = new Object();
    player2.status = "Vez do oponente";
    const btn_soma_4 = document.querySelector("#soma_4");
    const btn_soma_5 = document.querySelector("#soma_5");
    const btn_soma_6 = document.querySelector("#soma_6");
    const status_player2 = document.querySelector(".status_player2");
    status_player2.innerHTML = player2.status;

    // INFOS GERAIS
    const placar = document.querySelector(".placar");
    let lastPlay;

    // SETANDO VALORES INICIAIS
    totalScore = 0;
    placar.innerHTML = totalScore;
    updateButtons();

    // JOGADOR
    function addScorePlayer1(button){
        if(totalScore < 21){
            totalScore = Number(button.innerHTML);
            placar.innerHTML = totalScore;
            lastPlay = "Jogador 1";
            updateButtons();
            updateStatus();
        }
    }

    function addScorePlayer2(button){
        if(totalScore < 21){
            totalScore = Number(button.innerHTML);
            placar.innerHTML = totalScore;
            lastPlay = "Jogador 2";
            updateButtons();
            updateStatus();
        }
    }

    // COMPUTADOR
    function addScoreComputer(){
        // // DESATIVAR BOTÕES DO USUÁRIO
        // btn_soma_1.setAttribute("disabled", true);
        // btn_soma_2.setAttribute("disabled", true);
        // btn_soma_3.setAttribute("disabled", true);

        // // ALTERANDO STATUS
        // totalScore < 21 ? status.innerHTML = "Vez do computador": ""

        // // DELAY PARA O PC JOGAR
        // setTimeout(() => {
        //     if(totalScore < 21){
        //         const scoreComputer =  getRandomInt(1, 4);
        //         totalScore += scoreComputer;
        //         placar.innerHTML = totalScore;
        //         /*
        //             SE O SCORE FOR MENOR QUE 21, QUANDO O COMPUTADOR TERMINAR A JOGADA, DEVOLVE A VEZ PARA O PLAYER
        //         */
        //         totalScore < 21 ? status.innerHTML = "Sua vez": ""
        //         lastPlay = "Computador";
        //         updateButtons();
        //     }
        // }, 2000)
    }



    // ATUALIZA OS VALORES DOS BOTÕES
    function updateButtons(){
        // PLAYER 1
        btn_soma_1.innerHTML = totalScore + 1;
        btn_soma_2.innerHTML = totalScore + 2;
        btn_soma_3.innerHTML = totalScore + 3;
        // PLAYER 2
        /*
            OS BOTÕES DO PLAYER 2 RECEBEM OS DADOS DO BOTÃO DO PLAYER 1
        */
        btn_soma_4.innerHTML = btn_soma_1.innerHTML;
        btn_soma_5.innerHTML = btn_soma_2.innerHTML;
        btn_soma_6.innerHTML = btn_soma_3.innerHTML;

        // btn_soma_1.removeAttribute("disabled");
        // btn_soma_2.removeAttribute("disabled");
        // btn_soma_3.removeAttribute("disabled");

        // btn_soma_4.removeAttribute("disabled");
        // btn_soma_5.removeAttribute("disabled");
        // btn_soma_6.removeAttribute("disabled");
    }

    function updateStatus(){
        if(player1.status == "Sua vez"){
            player1.status = "Vez do oponente";
            status_player1.innerHTML = player1.status;
            player2.status = "Sua vez";
            status_player2.innerHTML = player2.status;
        }
        else{
            player2.status = "Vez do oponente";
            status_player2.innerHTML = player2.status;
            player1.status = "Sua vez";
            status_player1.innerHTML = player1.status;
        }
    }

    // VERIFICAÇÃO
    function verifyScore(score){
        console.log("Verificou");
        if(score == 21){
            status.innerHTML = "Fim de jogo";

            Swal.fire({
                icon: "success",
                title: "Fim de jogo",
                text: `${lastPlay} Voce venceu!`
            })

            // resetInfos();
            
        }
        else if(score > 21){
            if(lastPlay == "Jogador 1"){
                Swal.fire({
                    icon: "success",
                    title: "Fim de jogo",
                    text: "Jogador 2, você venceu!"
                })
            }
            else{
                Swal.fire({
                    icon: "success",
                    title: "Fim de jogo",
                    text: "Jogador 1, você venceu!"
                })
            }

            // resetInfos();
        }
    }

    // // RESETA CAMPOS QUANDO A PARTIDA É FINALIZADA
    // function resetInfos(){
    //     setTimeout(() => {
    //         // SETANDO VALORES INICIAIS
    //         totalScore = 0;
    //         placar.innerHTML = totalScore;
    //         updateButtons();
    //         updateStatus();
    //     }, 2000)
    // }

    // GERAR NÚMEROS INTEIROS ALTEATÓRIOS
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // EVENT LISTENERS
    // PLAYER 1
    btn_soma_1.addEventListener("click", () => {
        addScorePlayer1(btn_soma_1);
        verifyScore(totalScore);
    })

    btn_soma_2.addEventListener("click", () => {
        addScorePlayer1(btn_soma_2);
        verifyScore(totalScore);
    })

    btn_soma_3.addEventListener("click", () => {
        addScorePlayer1(btn_soma_3);
        verifyScore(totalScore);
    })

    // PLAYER 2
    btn_soma_4.addEventListener("click", () => {
        addScorePlayer2(btn_soma_4);
        verifyScore(totalScore);
    })

    btn_soma_5.addEventListener("click", () => {
        addScorePlayer2(btn_soma_5);
        verifyScore(totalScore);
    })

    btn_soma_6.addEventListener("click", () => {
        addScorePlayer2(btn_soma_6);
        verifyScore(totalScore);
    })

})();