'use strict' 

class Card{
    constructor(){
      this.table = document.querySelector('table')
      this.cardsData = null
      this.buttonAddCard = document.querySelector('.submenu button')
      this.modal = document.querySelector('.modal')
      this.selectBook = this.modal.querySelector('.select-book')
      this.selectUser = this.modal.querySelector('.select-user')
      this.users = []
      this.books = []
      this.newCard = null
      this.buttonSave = this.modal.querySelector('button')
      this.myDate = new Date
  } 
    
   goToLocalStorage(){
       
            
          console.log(localStorage.getItem('cardsData'));
          if( localStorage.getItem('cardsData') == null) {
              fetch('cards.json').then(response => response.json())
                   .then( response => localStorage.setItem('cardsData' , JSON.stringify(response)))
          } 
   
   }
    

    setUsersFromLocalStorage(){
      this.cardsData = JSON.parse(localStorage.getItem('cardsData'))
    }


    setTable(){

       this.table.innerHTML = ''

             let str = `<tr>
              <td> ID </td>
              <td> Visitor</td>
              <td> Book</td>
              <td> Borrow Date </td> 
              <td> Return Date </td> 
             
              

                 </tr>
           `
  this.table.insertAdjacentHTML('afterbegin' , str)

          this.cardsData.forEach(element => {
            let str2 = ` <tr> 
            <td> ${element.id} </td>
            <td> ${element.visitor} </td>
            <td> ${element.book} </td>
            <td>  ${element.borrow_date} </td>
            <td> ${element.return_date} </td>
            
            
            
            <tr>
          `
          this.table.insertAdjacentHTML('beforeend' , str2)
           });
         

    }   
    
     


    addCard(){
        this.modal.style.display = 'flex'
        this.users = JSON.parse(localStorage.getItem('usersData'))
        this.books = JSON.parse(localStorage.getItem('booksData'))

        


        this.selectBook.innerHTML = null
        this.books.forEach(element => {
          this.selectBook.insertAdjacentHTML('afterbegin' ,  `<option> ${element.name} </option> `)
        }) 


        this.selectUser.innerHTML = null

        this.users.forEach(element => {
          this.selectUser.insertAdjacentHTML('afterbegin' ,  `<option> ${element.name} </option> `)
        })  

      
        
        
        
    }  

    setCardsInLocStor(){
       this.cardsData = JSON.parse(localStorage.getItem('cardsData'))
       console.dir(this.cardsData)
       this.newCard = {
         id: this.cardsData.length + 1,
         visitor: this.selectUser.value,
         book: this.selectBook.value,
         borrow_date: this.myDate.getFullYear() + ' ' + this.myDate.getMonth() + ' ' + this.myDate.getDay() ,
         return_date: this.myDate.getFullYear()+1  + ' ' + this.myDate.getMonth() + ' ' + this.myDate.getDay()
         
       }

       this.cardsData.push(this.newCard)
       localStorage.setItem('cardsData' , JSON.stringify(this.cardsData))
        this.modal.style.display = 'none'
        this.setTable()

        this.books.forEach(elem => {
          if(elem.name == this.selectBook.value){
            elem.number_of_instance_in_library --
          }
         localStorage.setItem('booksData' , JSON.stringify(this.books))
        })
    }
    


    closeModal(){
      this.modal.style.display = 'none'
      
    }

  

  init(){
    console.dir(this.myDate)
    this.goToLocalStorage()
    this.setUsersFromLocalStorage()
    this.setTable()
    this.buttonAddCard.addEventListener('click' , this.addCard.bind(this))
    this.modal.querySelector('span').addEventListener('click' , this.closeModal.bind(this))
    this.buttonSave.addEventListener('click' , this.setCardsInLocStor.bind(this) )
    
  }

}

new Card().init()
