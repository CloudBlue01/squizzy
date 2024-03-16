function rejouer(){
    window.location.href = window.location.href
}

function autre_quiz(){
    window.location.href = window.location.protocol + "//" + window.location.host
}

$(document).ready(function(){
    let nb_reponse_valide = 0
    let score = 0
    let index_reponse = []   

    $("#list-reponse").hide()
    
    const reussite_quizz = function(nb_questions,score_ideal){
        let result = Math.round(( nb_reponse_valide /  nb_questions ) * 100)
        return result >= score_ideal
    }

    const melanger_donnees = function(tab) {
        for (let i = tab.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tab[i], tab[j]] = [tab[j], tab[i]];
        }
        return tab;
    }

        

    $.ajax({
        url: window.location.href+"data/", 
        method: 'GET',
        success: function(data) {
            const plateau_quiz = document.getElementById('plateau-quiz')
            let seconds = data.temps * 60
            let timer_interval = setInterval(function(){
                seconds --
                if(seconds < 10){$('#timer-zone').toggleClass("blink")}   
                if(seconds === 0){
                    apres_quiz()
                    stop_quiz()}
 
                let min = Math.floor(seconds / 60)
                let sec = Math.floor(seconds % 60)
                $('#timer-zone').text((min<10?"0"+min:min) + ":"+(sec<10?"0"+sec:sec))
            },1000)            

            const stop_quiz = function(){
                clearInterval(timer_interval)
                $('#plateau-quiz').html("")
            }

            //affichage mauvaise réponse
            const list_reponse = function(){
                if(index_reponse.length != 0){
                    const list_rep = document.getElementById('list-reponse')
                    let ul = document.createElement('ul')
                    let h3 = document.createElement('h3')
                    h3.innerText = " Les réponses exactes !"
                    ul.appendChild(h3)

                    for(let i = 0; i < index_reponse.length;i++){
                        let qs = data.questions[index_reponse[i]]
                        for(q in qs){
                            let rep = ""
                            qs[q].forEach(function(reps){
                                if(reps.estCorrect){
                                    rep = reps.texte
                                    return 0
                                }
                            })
                            let li = document.createElement('li')
                            li.classList.add('fancy_line')
                            li.classList.add('col_dir')
                            let p1 = document.createElement('p')                            
                            let h5 = document.createElement('h5')
                            p1.innerText = q
                            h5.innerText = rep
                            li.appendChild(p1)
                            li.appendChild(h5)
                            ul.appendChild(li)
                        }
                    }
                    list_rep.appendChild(ul)
                    list_rep.classList.add('free_model')
                    $('#list-reponse').show()
                }
            }

            const apres_quiz = function(){
                let min = Math.floor(seconds / 60)
                let sec = Math.floor(seconds % 60)
                if(reussite_quizz(data.score_ideal,data.questions.length)){
                    let message = (score==100?"Ouah, un sans faute!":"Félicitation")
                    $('#res-card').show('fast')
                    $('#res-card').addClass('win_bg')
                    $('#res-card #message').text(message)
                    $('#res-card #flaterie').text('Vous êtes GG!')
                    
                }else{
                    $('#res-card').show('fast')
                    $('#res-card').addClass('loose_bg')
                    $('#res-card #message').text('Ohhh...')
                    $('#res-card #flaterie').text('Faites mieux la prochaine fois!')
                    
                }
                $('#new-score').text((score > 1?" "+score+" points":(score==1?" 1 point":" 0 ")))
                $('#new-reussite').text((nb_reponse_valide>1?nb_reponse_valide+" bonnes réponses":(nb_reponse_valide==1?"Une bonne réponse":"Aucune bonne réponse")))
                $('#new-timer-zone').text("Record de "+(min<10?"0"+min:min) + " min et "+(sec<10?"0"+sec:sec)+ " sec")
                list_reponse()
            }

            $('#reussite').text(" : "+ (nb_reponse_valide<10?"0"+nb_reponse_valide:nb_reponse_valide) + "/" + data.questions.length)
            $('#res-card').hide()

            data.questions = melanger_donnees(data.questions)
            data.questions.forEach(function(questions,index){
                let card_div = document.createElement('div')
                let card_body = document.createElement('div')
                let card_text = document.createElement('p')
                let card_question = document.createElement('h1')
                let card_list = document.createElement('ul')

                card_div.classList.add('card')
                card_div.classList.add('fancy_content')
                //card_div.classList.add('green_fancy_content')
                card_div.setAttribute('id','card'+index)
                card_div.setAttribute('style','width: 30rem;margin:10px;')

                card_body.classList.add('card-body')
                card_text.classList.add('card-text')
                card_question.classList.add('fancy_font')
                
                for (var key in questions) {
                    card_text.innerText = 'Question ' + (index+1)
                    card_question.innerText = key
                    questions[key] = melanger_donnees(questions[key])
                    questions[key].forEach(function(reponse){
                        let list_element = document.createElement('li')
                        list_element.classList.add('fancy_line_rounded')
                        list_element.innerText = reponse.texte

                        list_element.addEventListener('click',function(event){
                            let css = ''
                            if(reponse.estCorrect){
                                nb_reponse_valide++
                                score = 10 *  nb_reponse_valide
                                $('#score').text(score)
                                css = 'background-color:green;color:white;'
                            }else{
                                index_reponse.push(index)
                                css = 'background-color:red;color:white;'
                            }
                            $('#reussite').text(" : "+ (nb_reponse_valide<10?"0"+nb_reponse_valide:nb_reponse_valide) + "/" + data.questions.length)
                            list_element.setAttribute('style',css)
                            $('#card'+index).hide('slow',function(){
                                if(index+1 == data.questions.length){
                                    stop_quiz()
                                    apres_quiz()
                                }
                                $('#card'+(index+1)).show('fast')
                            })
                            
                        })
                        card_list.appendChild(list_element)
                    })
                }

                card_body.appendChild(card_text)
                card_body.appendChild(card_question)
                card_div.appendChild(card_body)
                card_div.appendChild(card_list)
                plateau_quiz.appendChild(card_div)                

            });

            $('.card').hide() 
            $('#card0').show() 

            $('#resultat').html(data.temps) 
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText); 
        }
    });
})