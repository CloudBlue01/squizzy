$(document).ready(function(){
    const modal_decs = [...document.getElementsByClassName('modal_dec')]
    const  lesgo_btn = document.getElementById("start_btn")
    modal_decs.forEach(function(modal_dec){
        modal_dec.addEventListener('click',function(event){
            const pk = modal_dec.getAttribute('data-pk')
            const nom = modal_dec.getAttribute('data-nom')
            const sujet = modal_dec.getAttribute('data-sujet')
            const nb_questions = modal_dec.getAttribute('data-nb-questions')
            const difficulte = modal_dec.getAttribute('data-difficulte')
            const temps = modal_dec.getAttribute('data-temps')
            const score_min = modal_dec.getAttribute('data-score-min')

            $('#nom-quiz').html(nom)
            $('#sujet-quiz').html(sujet)
            $('#duree-quiz').html(temps + (temps>1?"minutes":"minute"))
            $('#difficulte-quiz').html(difficulte)

            lesgo_btn.addEventListener('click',function(){window.location.href += pk})        

        })
    
    })
})