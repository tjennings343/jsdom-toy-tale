let addToy = false;
const addBtn = document.querySelector("#new-toy-btn")
const newToy = document.querySelector('.add-toy-form')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.getElementById('toy-collection')



document.addEventListener('DOMContentLoaded', () => {
  
  function getToys(){
    return fetch('http://localhost:3000/toys')
    .then(res => res.json())
  }

  getToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })

  function renderToys(toy){
    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let toyImg = document.createElement('img')
    toyImg.src = toy.image
    toyImg.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', toy.id)
    button.innerText = 'like'
    button.addEventListener('click', (l) => {
      console.log(l.target.dataset)
      likes(l)
    })

    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.append(h2, toyImg, p, button)
    toyCollectionDiv.append(card)
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  function postToy(toy){
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'name': toy.name.value,
        'image': toy.image.value,
        'likes': 0
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      toyCollectionDiv.append(new_toy)
    })
  }

  function likes(l){
    l.preventDefault()
    let more = parseInt(l.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${l.target.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'likes': more
      })
    })

    .then(resp => resp.json())
    .then((like_obj => {
      l.target.previousElementSibling.innerText = `${more} likes`
    }))
  }


})



