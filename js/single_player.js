(function single_player(){
    const btn_soma_1 = document.querySelector("#soma_1");
    const btn_soma_2 = document.querySelector("#soma_2");
    const btn_soma_3 = document.querySelector("#soma_3");
    const placar = document.querySelector(".placar");
    const status = document.querySelector(".status");
    // ÚLTIMO A JOGAR
    let lastPlay;
    // SETANDO VALORES INICIAIS
    totalScore = 0;
    placar.innerHTML = totalScore;
    status.innerHTML = "Sua vez";
    // RANKING 
    const tabela_ranking = document.querySelector(".tabela_ranking");
    const trJogador = document.createElement("tr");
    const trComputador = document.createElement("tr");
    // CRIANDO LINHAS DO RANKING
    createRankingBody(
        "Jogador", 
        "posicao_jogador",
        "vitorias_jogador", 
        "derrotas_jogador", 
        trJogador
    );
    createRankingBody(
        "Computador", 
        "posicao_computador",
        "vitorias_computador", 
        "derrotas_computador", 
        trComputador
    );
    // DADOS DO RANKING
    let vitoriasJogador = 0;
    let derrotasJogador = 0;
    let vitoriasComputador = 0;
    let derrotasComputador = 0;

    attOptions();

    // ADICIONA PONTUAÇÃO AO JOGADOR
    function addScorePlayer(button){
        if(totalScore < 21){
            totalScore = Number(button.innerHTML);
            placar.innerHTML = totalScore;
            lastPlay = "Jogador";
            attOptions();
        }
    }

    // ADICIONA PONTUAÇÃO AO COMPUTADOR
    function addScoreComputer(){
        // DESATIVAR BOTÕES DO USUÁRIO
        btn_soma_1.setAttribute("disabled", true);
        btn_soma_2.setAttribute("disabled", true);
        btn_soma_3.setAttribute("disabled", true);

        // ALTERANDO STATUS
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
                lastPlay = "Computador";
                attOptions();
            }
        }, 2000)
    }

    // VERIFICA A PONTUAÇÃO ATUAL
    function verifyScore(score){
        if(score == 21){
            status.innerHTML = "Fim de jogo";
            switch(lastPlay){
                case "Jogador":
                    // ALERT DA BIBLIOTECA SWEET ALERT
                    Swal.fire({
                        icon: "success",
                        title: "Fim de jogo",
                        text: `Voce venceu!!`
                    })
                    vitoriasJogador += 1;
                    derrotasComputador += 1;
                break;

                case "Computador":
                    Swal.fire({
                        icon: "error",
                        title: "Fim de jogo",
                        text: `Voce perdeu`
                    })
                    vitoriasComputador += 1;
                    derrotasJogador += 1;
                break;
            }

            resetInfos();
        }

        else if(score > 21){
            status.innerHTML = "Fim de jogo";
            switch(lastPlay){
                case "Jogador":
                    Swal.fire({
                        icon: "error",
                        title: "Fim de jogo",
                        text: `Voce perdeu`
                    })
                    vitoriasComputador += 1;
                    derrotasJogador += 1;
                break;

                case "Computador":
                    Swal.fire({
                        icon: "success",
                        title: "Fim de jogo",
                        text: `Voce venceu!!`
                    })
                    vitoriasJogador += 1;
                    derrotasComputador += 1;
                break;
            }

            resetInfos();
        }
    }

    // RESETA CAMPOS QUANDO A PARTIDA É FINALIZADA
    function resetInfos(){
        setTimeout(() => {
            // SETANDO VALORES INICIAIS
            totalScore = 0;
            placar.innerHTML = totalScore;
            status.innerHTML = "Sua vez";
            attOptions();
        }, 2000)
    }

    // ATUALIZA OS VALORES DOS BOTÕES E DO RANKING
    function attOptions(){
        btn_soma_1.innerHTML = totalScore + 1;
        btn_soma_2.innerHTML = totalScore + 2;
        btn_soma_3.innerHTML = totalScore + 3;
        // REATIVA BOTÕES DO USUÁRIO
        btn_soma_1.removeAttribute("disabled");
        btn_soma_2.removeAttribute("disabled");
        btn_soma_3.removeAttribute("disabled");

        updateRanking();

        // PEGANDO VALORES DO RANKING
        const labelVitoriasJogador = document.querySelector(".vitorias_jogador");
        const labelDerrotasJogador = document.querySelector(".derrotas_jogador");
        const labelVitoriasComputador = document.querySelector(".vitorias_computador");
        const labelDerrotasComputador = document.querySelector(".derrotas_computador");
        // SETANDO VALORES INICIAIS DO RANKING
        labelVitoriasJogador.innerHTML = vitoriasJogador;
        labelDerrotasJogador.innerHTML = derrotasJogador;
        labelVitoriasComputador.innerHTML = vitoriasComputador;
        labelDerrotasComputador.innerHTML = derrotasComputador;
    }

    // GERAR NÚMEROS INTEIROS ALTEATÓRIOS
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
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

    function updateRanking(){
        if(vitoriasJogador >= vitoriasComputador){
            tabela_ranking.appendChild(trJogador);
            tabela_ranking.appendChild(trComputador);
            const posicao_jogador = document.querySelector(".posicao_jogador");
            posicao_jogador.innerHTML = 1;
            const posicao_computador = document.querySelector(".posicao_computador");
            posicao_computador.innerHTML = 2;
        }
        else{
            tabela_ranking.appendChild(trComputador);
            tabela_ranking.appendChild(trJogador);
            const posicao_computador = document.querySelector(".posicao_computador");
            posicao_computador.innerHTML = 1;
            const posicao_jogador = document.querySelector(".posicao_jogador");
            posicao_jogador.innerHTML = 2;
        }
    }

    // EVENT LISTENERS DOS BOTÕES
    btn_soma_1.addEventListener("click", () => {
        addScorePlayer(btn_soma_1);
        addScoreComputer();
        setTimeout(() => {
            verifyScore(totalScore);
        }, 2500)
    })

    btn_soma_2.addEventListener("click", () => {
        addScorePlayer(btn_soma_2);
        addScoreComputer();
        setTimeout(() => {
            verifyScore(totalScore);
        }, 2500)
    })

    btn_soma_3.addEventListener("click", () => {
        addScorePlayer(btn_soma_3);
        addScoreComputer();
        setTimeout(() => {
            verifyScore(totalScore);
        }, 2500)
    })

})();