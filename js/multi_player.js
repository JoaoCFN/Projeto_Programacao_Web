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
    // ÚLTIMO A JOGAR
    let lastPlay;

    // SETANDO VALORES INICIAIS
    totalScore = 0;
    placar.innerHTML = totalScore;
    const tabela_ranking = document.querySelector(".tabela_ranking");
    const trJogador1 = document.createElement("tr");
    const trJogador2 = document.createElement("tr");
    // CRIANDO LINHAS DO RANKING
    createRankingBody(
        "Jogador 1", 
        "posicao_jogador1",
        "vitorias_jogador1", 
        "derrotas_jogador1", 
        trJogador1
    );
    createRankingBody(
        "Jogador 2", 
        "posicao_jogador2",
        "vitorias_jogador2", 
        "derrotas_jogador2", 
        trJogador2
    );
    // DADOS DO RANKING
    let vitoriasJogador1 = 0;
    let derrotasJogador1 = 0;
    let vitoriasJogador2 = 0;
    let derrotasJogador2 = 0;

    updateInfos();

    // REALIZA A JOGADA DO JOGADOR 1
    function addScorePlayer1(button){
        if(totalScore < 21){
            totalScore = Number(button.innerHTML);
            placar.innerHTML = totalScore;
            lastPlay = "Jogador 1";
            updateStatus();
            updateInfos();
        }
    }

    // REALIZA A JOGADA DO JOGADOR 2
    function addScorePlayer2(button){
        if(totalScore < 21){
            totalScore = Number(button.innerHTML);
            placar.innerHTML = totalScore;
            lastPlay = "Jogador 2";
            updateStatus();
            updateInfos();
        }
    }

    // ATUALIZA OS VALORES DOS BOTÕES E LABELS
    function updateInfos(){
        // PLAYER 1
        btn_soma_1.innerHTML = totalScore + 1;
        btn_soma_2.innerHTML = totalScore + 2;
        btn_soma_3.innerHTML = totalScore + 3;
        // PLAYER 2
        btn_soma_4.innerHTML = totalScore + 1;
        btn_soma_5.innerHTML = totalScore + 2;
        btn_soma_6.innerHTML = totalScore + 3;

        if(player1.status == "Sua vez"){
            btn_soma_1.removeAttribute("disabled");
            btn_soma_2.removeAttribute("disabled");
            btn_soma_3.removeAttribute("disabled");

            btn_soma_4.setAttribute("disabled", true);
            btn_soma_5.setAttribute("disabled", true);
            btn_soma_6.setAttribute("disabled", true);

        }
        else if(player2.status == "Sua vez"){
            btn_soma_4.removeAttribute("disabled");
            btn_soma_5.removeAttribute("disabled");
            btn_soma_6.removeAttribute("disabled");

            btn_soma_1.setAttribute("disabled", true);
            btn_soma_2.setAttribute("disabled", true);
            btn_soma_3.setAttribute("disabled", true);
        }

        reorderRanking();

        // RANKING 
        const labelVitoriasJogador1 = document.querySelector(".vitorias_jogador1");
        const labelDerrotasJogador1 = document.querySelector(".derrotas_jogador1");
        const labelVitoriasJogador2 = document.querySelector(".vitorias_jogador2");
        const labelDerrotasJogador2 = document.querySelector(".derrotas_jogador2");
        // SETANDO VALORES INICIAIS DO RANKING
        labelVitoriasJogador1.innerHTML = vitoriasJogador1;
        labelDerrotasJogador1.innerHTML = derrotasJogador1;
        labelVitoriasJogador2.innerHTML = vitoriasJogador2;
        labelDerrotasJogador2.innerHTML = derrotasJogador2;
    }

    // FAZ A MUDANÇA DE RODADA
    function updateStatus(){
        if(player1.status == "Sua vez"){
            // PLAYER 1
            player1.status = "Vez do oponente";
            status_player1.innerHTML = player1.status;

            // PLAYER 2
            player2.status = "Sua vez";
            status_player2.innerHTML = player2.status;
        }
        else{
            // PLAYER 2
            player2.status = "Vez do oponente";
            status_player2.innerHTML = player2.status;

            // PLAYER 1
            player1.status = "Sua vez";
            status_player1.innerHTML = player1.status;
        }
    }

    // GERA O CORPO DO RANKING
    function createRankingBody(name, position, nameClassWins, nameClassDefeats, trElement){
        // POSIÇÃO DO JOGADOR 
        const class_position = position;
        position = document.createElement("th");
        position.setAttribute("scope", "row");
        position.setAttribute("class", class_position);

        // NOME DO JOGADOR
        const tdNome = document.createElement("td");
        tdNome.innerHTML = name;

        // NÚMERO DE VITÓRIAS
        const tdVitorias = document.createElement("td");
        tdVitorias.setAttribute("class", nameClassWins);

        // NÚMERO DE DERROTAS
        const tdDerrotas = document.createElement("td");
        tdDerrotas.setAttribute("class", nameClassDefeats);

        trElement.appendChild(position);
        trElement.appendChild(tdNome);
        trElement.appendChild(tdVitorias);
        trElement.appendChild(tdDerrotas);
    }

    // SETA E ORGANIZA O RANKING DO JOGO
    function reorderRanking(){
        if(vitoriasJogador1 >= vitoriasJogador2){
            tabela_ranking.appendChild(trJogador1);
            tabela_ranking.appendChild(trJogador2);
            const posicao_jogador1 = document.querySelector(".posicao_jogador1");
            posicao_jogador1.innerHTML = 1;
            const posicao_jogador2 = document.querySelector(".posicao_jogador2");
            posicao_jogador2.innerHTML = 2;
        }
        else{
            tabela_ranking.appendChild(trJogador2);
            tabela_ranking.appendChild(trJogador1);
            const posicao_jogador2 = document.querySelector(".posicao_jogador2");
            posicao_jogador2.innerHTML = 1;
            const posicao_jogador1 = document.querySelector(".posicao_jogador1");
            posicao_jogador1.innerHTML = 2;
        }
    }

    // ATUALIZAR DADOS DO RANKING DE ACORDO COM O VENCEDOR DA PARTIDA
    function updateRankingData(winner){
        if(winner == "Jogador 1"){
            vitoriasJogador1 += 1;
            derrotasJogador2 += 1;
        }
        else{
            vitoriasJogador2 += 1;
            derrotasJogador1 += 1;
        }
    }

    // VERIFICAÇÃO DA PONTUAÇÃO ATUAL
    function verifyScore(score){
        if(score == 21){
            status.innerHTML = "Fim de jogo";
            // ALERT DA BIBLIOTECA SWEET ALERT
            Swal.fire({
                icon: "success",
                title: "Fim de jogo",
                text: `${lastPlay} você venceu!`
            })
            updateRankingData(lastPlay);
            resetInfos();
            
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
            updateRankingData(lastPlay);
            resetInfos();
        }
    }

    // RESETA CAMPOS QUANDO A PARTIDA É FINALIZADA
    function resetInfos(){
        setTimeout(() => {
            // SETANDO VALORES INICIAIS
            totalScore = 0;
            placar.innerHTML = totalScore;
            // updateStatus();
            updateInfos();
        }, 2000)
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