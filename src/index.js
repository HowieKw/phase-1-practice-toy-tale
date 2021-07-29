let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleForm();
  getToys();
  addNewToy();
});

const toggleForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
}

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toyData => {
    toyData.forEach(toy => renderToy(toy));
  })
}


const renderToy = (toy) => {
  //grab the toy collection div
  const toyCollection = document.querySelector('#toy-collection')

  //create div '.card' appended to it 
  const toyCard = document.createElement('div')
  toyCard.classList = 'card'

    //h2 tag with toy's name
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

    //img tag with src of toy's image and class name 'toy-avatar'
  const toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.classList = 'toy-avatar'

    //p tag with how many likes that toy has
  // const toyLike = document.createElement('p')
  // toyLike.innerText = 'Likes:'
  const toyNumLikes = document.createElement('p')
  toyNumLikes.innerText = `Likes: ${toy.likes}` 

    //button tag w/ class 'like-btn' and id set to toy's ID
      //ability to increase like
  const likeBtn = document.createElement('button')
  likeBtn.classList = 'like-btn'
  likeBtn.id = toy.id
  likeBtn.innerText = '❤️'

  likeBtn.addEventListener('click', increasesLikes)

  //append everything
  toyCard.append(toyName,toyImage,toyNumLikes,likeBtn);
  toyCollection.appendChild(toyCard);
}

const increasesLikes = (e) => {
  const currentLikesText = e.target.previousSibling.innerText 
  //Use of split string to seclude interger, add, then put back into string
  const actualLikes = currentLikesText.split(' ')[1] //for interpolation of original variable

  e.target.previousSibling.innerText = `Likes: ${parseInt(actualLikes) + 1}`
}


//adding a new toy to form
const addNewToy = () => {
  //get form
  const addToyForm = document.querySelector('.add-toy-form');

  //add event listener for submit
  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newToyName = e.target.name.value;
    const newToyImage = e.target.image.value;

    const newToyObj = {
      name: newToyName,
      image: newToyImage,
      likes: 0
    }
    addToyForm.reset();
    //render the newToyObj into our renderToy function
    renderToy(newToyObj);
    //callback to POST function
    commitToys(newToyObj);
  })
}


//POST: everything has been created to call back to POST
function commitToys(newToyObj) {
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': "application/json"
},
body: JSON.stringify(newToyObj)
})
.then(resp => resp.json())
.then(toyData => console.log(toyData))
}

//PATCH: patching the number of likes
function updateToyLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(toyData => console.log(toyData))
} 
//WHAT AND WHERE PUT???
// updateToyLikes(parameter??)


//Other ways to increment by changing to full string:
    // Method 1
  // toyButton.addEventListener("click", function () {
  //   let counter = el.likes++
  //   toyPara.innerHTML = counter.toString();
  //   return counter;
  // })
    //Method 2
  //   ` 
  //   toyBttn.addEventListener('click', () =>{
  //     let counter = el.likes++
  //  `  elLikes.innerHTML = `${counter} likes`
  //     return counter
  //   } )




//WORKING WITH ONE OBJECT
// const getToys = () => {
//   fetch('http://localhost:3000/toys/1')
//   .then(resp => resp.json())
//   .then(toy => renderToy(toy))
// }

// //CLEAN UP THE 'WHITE-BOARD'
// const commentList = document.querySelector('ul')
// commentList.innerHTML= ''

// toy.comments.forEach(comment => {
//   const commentLi = document.createElement('li')
//   commentLi.innerText = comment

//   commentList.append(commentLi)
// })