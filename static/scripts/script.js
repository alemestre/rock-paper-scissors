let user = "";
let computer = "";
let playerScore = 0 ;
let computerScore = 0;
let scoreResult = document.querySelector(".score-badge")


let scorePlayerCell = document.querySelector("span.score-player")
let scoreComputerCell = document.querySelector("span.score-computer")

let computerImg = document.querySelector("img.computer-img")

let options = 
[
    {
        name: "rock",
        kill: "scissors",
        path: "./static/img/pierre.jpg"

    },
    {
        name: "scissors",
        kill: "paper",
        path: "./static/img/ciseaux.jpg"
    },
    {
        name: "paper",
        kill: "rock",
        path: "./static/img/papier.jpg"
    },
]

let btnSubmit= document.querySelector('.btn-result')

// on écoute les évenemnts de type click sur les inputs de type checkbox
let allInputs = document.querySelectorAll("input[type='checkbox']")
allInputs.forEach(input => {
    
    input.addEventListener('click', e => {
        value = e.target.value
        indexUser= options.findIndex((option) =>  option.name == value )
        user = options[indexUser]
        resetBorder(input.getAttribute("id"))
    })
    
})

function resetBorder (input ) {
    allInputs.forEach(element => {
        console.log(input)
        let divParent = element.parentNode 
        let label = divParent.firstChild
        let img = label.firstChild

        img.style= "border: 1px solid #dee2e6;"

        if (input == element.getAttribute("id"))
        {
            console.log("border change")
            img.style= "border: 10px solid #dee2e6;"
        }
    })

}

// on génère le choix de l'ordinateur
function getComputerChoice()
{
	let indexComputer = Math.floor(Math.random()*3);
	computer = options[indexComputer];
}

// on regarde qui gagne et on update les scores
function getResult()
{
    let scoreBadge 
    computerImg.setAttribute("src", computer.path)
    if (computer.kill == user.name) {
        computerScore ++
        scoreBadge= "perdu"
        scoreResult.parentNode.setAttribute("class","btn col-3 bg-danger")
    }
    if(user.kill == computer.name) {
        playerScore ++
        scoreBadge = "gagné"
        scoreResult.parentNode.setAttribute("class","btn col-3 bg-success")
    }
    if (computer.name == user.name) {
        scoreBadge = "égalité"
        scoreResult.parentNode.setAttribute("class","btn col-3 bg-warning")
    }
    if (scoreBadge != undefined && scoreBadge != ""){
        scoreResult.textContent = scoreBadge.toUpperCase()
        if (scoreBadge == "perdu" || scoreBadge == "gagné") {
            scoreResult.setAttribute("class", "text-center text-light score-badge")
        }
        else scoreResult.setAttribute("class", "text-center text-dark score-badge")
    }
   
}

// on affiche les scores
function displayResult()
{
    console.log(computerScore)
    scorePlayerCell.textContent = playerScore;
    scoreComputerCell.textContent = computerScore;
}


// on ajoute l'écoute d'un évenement sur l'élément Résultat
btnSubmit.addEventListener('click', (e)=> {
    e.preventDefault()
    e.stopPropagation()
    getComputerChoice()
    getResult()
    displayResult()
})