'use strict' 

class Card{
    constructor(){
      this.table = document.querySelector('table')
      this.cardsData = []
      this.cardsData2 = []
      this.buttonAddCard = document.querySelector('.submenu button')
      this.modal = document.querySelector('.modal')
      this.selectBook = this.modal.querySelector('.select-book')
      this.selectUser = this.modal.querySelector('.select-user')
      this.users = []
      this.books = []
      this.books2 = []
      this.newCard = null
      this.buttonSave = this.modal.querySelector('button')
      this.myDate = new Date
      this.Y = this.myDate.getFullYear()
      this.M = this.myDate.getMonth()
      this.D = this.myDate.getDay() 
      this.delId = null
      
      
  } 
    
   goToLocalStorage(){
       
            
          
          if( localStorage.getItem('cardsData') == null) {
              fetch('cards.json').then(response => response.json())
                   .then( response => localStorage.setItem('cardsData' , JSON.stringify(response)))
          } 
   
   }
    

   


    setTable(){
         
      this.cardsData = JSON.parse(localStorage.getItem('cardsData'))     
       
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
            <td class= "return"> Return  </td>
            
            
            
            <tr>
          `
          this.table.insertAdjacentHTML('beforeend' , str2)
           });
         

    }   
    
     


    addCard(){
        this.modal.style.display = 'flex'
        this.users = JSON.parse(localStorage.getItem('usersData'))
        this.books = JSON.parse(localStorage.getItem('booksData'))

        this.books2 = this.books.filter( (elem) => elem.number_of_instance_in_library > 0  )


        this.selectBook.innerHTML = null
        this.books2.forEach(element => {
          this.selectBook.insertAdjacentHTML('afterbegin' ,  `<option> ${element.name} </option> `)
        }) 


        this.selectUser.innerHTML = null

        this.users.forEach(element => {
          this.selectUser.insertAdjacentHTML('afterbegin' ,  `<option> ${element.name} </option> `)
        })  

      
        this.setTable()
        
        
    }  

    setCardsInLocStor(){
        if(this.M < 10 ){
          this.M =   '0' + this.M 
        }  

        if(this.D < 10 ){
          this.D =   '0' + this.D 
        }


       this.cardsData = JSON.parse(localStorage.getItem('cardsData'))
       console.dir(this.cardsData)
       this.newCard = {
         id: this.cardsData.length + 1,
         visitor: this.selectUser.value,
         book: this.selectBook.value,
         borrow_date: this.Y +  ' '  + this.M +  ' '  + this.D
        
         
       } 

       this.M = this.myDate.getMonth()
       this.D = this.myDate.getDay() 

       this.cardsData.push(this.newCard)
       localStorage.setItem('cardsData' , JSON.stringify(this.cardsData))
        this.modal.style.display = 'none'
        

        this.books.forEach(elem => {
          if(elem.name == this.selectBook.value){
            elem.number_of_instance_in_library --
          }
         localStorage.setItem('booksData' , JSON.stringify(this.books))
        })

        this.setTable()
    }
    


    closeModal(){
      this.modal.style.display = 'none'
      
    } 

    returnBook(e){

      
       if(e.target.matches('.return')){
       this.books = JSON.parse(localStorage.getItem('booksData'))
         
         this.books.forEach(elem => {
           if(elem.name == e.target.parentElement.children[2].innerText ){
             elem.number_of_instance_in_library ++ 
             
           }
         })
      localStorage.setItem('booksData' , JSON.stringify(this.books))
      
      this.cardsData = JSON.parse(localStorage.getItem('cardsData'))
        this.delId = parseInt (e.target.parentElement.children[0].innerHTML)
        this.cardsData2 = this.cardsData.filter( (elem) => elem.id !== this.delId)
         this.cardsData2.forEach(elem => {
           if(elem.id > this.delId){
             --elem.id
           }
         })
         
        localStorage.setItem('cardsData' , JSON.stringify(this.cardsData2))
        
      }

      this.setTable()
    }

  

  init(){
  
    this.goToLocalStorage()
    this.setTable()
    this.buttonAddCard.addEventListener('click' , this.addCard.bind(this))
    this.modal.querySelector('span').addEventListener('click' , this.closeModal.bind(this))
    this.buttonSave.addEventListener('click' , this.setCardsInLocStor.bind(this) )
    this.table.addEventListener('click' , this.returnBook.bind(this))
  }

}

new Card().init()
