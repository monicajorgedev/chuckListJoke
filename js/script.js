//obtener chistes de la API al hacer click /DONE
// guardar en el localStorage
//BONUS> hacer boton para eliminar chistes

const fetchJoke = document.getElementById("fetchJoke") 
const jokeList = document.getElementById("jokeList")
let jokes = []
const btnDelete = document.querySelector('btnDelete')


//funcion añadir template por chiste con indice para id del boton que se crea, el cual contiene evento 

const addJoke = () => {
    jokeList.innerHTML = ""
   jokes.forEach((joke, index) => {
       const template = `<li><p>${joke}</p><button class="btnDelete" id="removeJoke-${index}">Eliminar</button></li>`
       jokeList.insertAdjacentHTML("beforeend", template);
       const buttonRemove = document.getElementById(`removeJoke-${index}`)
        buttonRemove.addEventListener("click", ()=> {
        removeJoke(index)
        })
   })  
}

 // función eliminar chiste individual
 const removeJoke = (index) => {
    jokes.splice(index, 1);
    addJoke();
    localStorage.setItem("jokes", JSON.stringify(jokes))   
}


//funcion obtener chiste
const getJoke =  () => {fetch("https://api.chucknorris.io/jokes/random")
    .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      }
    ).then(joke => {
        jokes.push(joke.value)
        localStorage.setItem("jokes", JSON.stringify(jokes))
        addJoke()
    }   
    ).catch((error) => {
        jokeList.innerText = 'Error: No se pudo obtener el chiste';
      })}
    


//evento obtener chiste 
    fetchJoke.addEventListener('click', () => { 
        getJoke()  
    })


//evento recargar pantalla
    window.addEventListener('load', ()=> {
        if (localStorage.getItem("jokes") !== null){
        jokes = JSON.parse(localStorage.getItem("jokes"))
        if(jokes){
        addJoke()
        }
    }
    }
    )


//borrar pantalla
    const deleteAll = document.getElementById("deleteAll")
    deleteAll.addEventListener('click', () => { 
        jokeList.innerHTML = ""
        jokes = []
        localStorage.removeItem("joke")
        localStorage.setItem("jokes", JSON.stringify(jokes))
    })
