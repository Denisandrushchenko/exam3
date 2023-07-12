'use strict'

class Books{
    constructor(){
      this.table = document.querySelector('table')
      this.buttonAddBook = document.querySelector('.submenu button')
      this.booksData = null
      this.modal = document.querySelector('.modal')
      this.modalOptions = document.querySelector('.modal-options')
      this.buttonSaveBook = document.querySelector('.save-book')
      this.newBook = null
      this.newArr = null
      this.deleteBook = document.querySelector('.delete-book')
      this.delId = null
      this.newArr2 = []
      this.newArr3 = []
      this.inputSearchBook = document.querySelector('.search-input')
  }  


  
   goToLocalStorage(){
       
            
         
          if( localStorage.getItem('booksData') == null) {
              fetch('booksData.json').then(response => response.json())
                   .then( response => localStorage.setItem('booksData' , JSON.stringify(response)))
          } 
   
   }
    

    setUsersFromLocalStorage(){
      this.booksData = JSON.parse(localStorage.getItem('booksData'))
    }


    setTable(){
      this.table.innerHTML = ''
      this.setUsersFromLocalStorage()
       
             let str = `<tr class = "header-tr" >
              <td>ID </td>
              <td> Name</td>
              <td> Year</td>
              <td> Autor Name </td> 
              <td> Publisher  Name </td> 
              <td> Number of page  </td> 
              <td> Number of instanse in library  </td> 
              
              <td>  Delete </td>
                 </tr>
           `
  this.table.insertAdjacentHTML('afterbegin' , str)

          this.booksData.forEach(element => {
            let str2 = ` <tr class = "${element.class}"> 
            <td> ${element.id} </td>
            <td> ${element.name} </td>
            <td> ${element.autor_name} </td>
            <td>  ${element.year} </td>
            <td> ${element.publisher_name} </td>
            <td> ${element.number_of_page} </td>
            <td> ${element.number_of_instance_in_library} </td>
            
            <td class = "delete-book"> <img  src = "icons/del.png" >  </td>
            
            <tr>
          `
          this.table.insertAdjacentHTML('beforeend' , str2)
           });
         

    }

     buttonNewBook(){
      this.modal.querySelectorAll('input').forEach(elem => {
        if(elem.value == ''){
          this.buttonSaveBook.disabled = true
          
        }
    })
        document.querySelector('.modal').style.display = 'flex'
      }

      checkData(e){
          if(e.target.matches('input')){
            this.newArr3 =  Array.from(this.modal.querySelectorAll('input'))
           if(this.newArr3.every(elem => elem.value !== '')){
               this.buttonSaveBook.disabled = false
           }
            
          }
        }

     addNewBook(){

         
       
          this.newBook = {
            id: JSON.parse(localStorage.getItem('booksData')).length + 1,
            name: this.modalOptions.children[1].value,
            autor_name: this.modalOptions.children[3].value,
            year: this.modalOptions.children[5].value,
            publisher_name: this.modalOptions.children[7].value,
            number_of_page: this.modalOptions.children[9].value,
            number_of_instance_in_library: this.modalOptions.children[11].value,     
          }   

        


          this.newArr = JSON.parse(localStorage.getItem('booksData')) 
          this.newArr.push(this.newBook)
          localStorage.setItem('booksData' , JSON.stringify(this.newArr))
          this.setTable()
          this.modal.style.display = 'none'

          this.modalOptions.querySelectorAll('input').forEach(elem => elem.value = '')
     }
        


     modalClose(e){
        if( e.target.matches('span')){
          e.target.closest('div').style.display = 'none'
        }

     }

   

   delBook(e){
        let target = e.target
       
        if(target.matches('.delete-book') ){
          
         this.delId = parseInt( target.parentElement.children[0].innerHTML ) 
         this.newArr = JSON.parse(localStorage.getItem('booksData'))
          this.newArr2 = this.newArr.filter( (elem) => elem.id != this.delId)
          this.newArr2.forEach(elem =>{
            if(elem.id > this.delId){
              --elem.id
          
            }
          }
          ) 
             
          
         
          localStorage.setItem('booksData' , JSON.stringify(this.newArr2))

          this.setTable()

           } 
      }

      

   searchBook (){
     
     this.booksData = JSON.parse(localStorage.getItem('booksData'))
     
      this.booksData.forEach(elem => {
       
        if( elem.name  ==  this.inputSearchBook.value ||
             elem.autor_name ==  this.inputSearchBook.value ||
             elem.year ==  this.inputSearchBook.value     ||
             elem.publisher_name ==   this.inputSearchBook.value ){
          elem.class = 'active'
         
        }
      })
     localStorage.setItem('booksData' , JSON.stringify(this.booksData))

     this.setTable()
    
   }  

   cancelSearchingBook(){
        this.inputSearchBook.value = ''

       this.booksData = JSON.parse(localStorage.getItem('booksData'))
       this.booksData.forEach(elem => elem.class = '')
        
       localStorage.setItem('booksData' , JSON.stringify(this.booksData))
       
       this.setTable()
     
   }

  

  init(){
     
    this.goToLocalStorage()
    this.setTable()
    this.modal.addEventListener('input' , this.checkData.bind(this))
    
    this.buttonAddBook.addEventListener('click' , this.buttonNewBook.bind(this) )
    this.modal.addEventListener('click', this.modalClose.bind(this) )
    this.buttonSaveBook.addEventListener('click', this.addNewBook.bind(this))
    this.table.addEventListener('click' , this.delBook.bind(this))
    document.querySelector('.search-button-searching').addEventListener('click' , this.searchBook.bind(this))
    document.querySelector('.search-button-cancel').addEventListener('click' , this.cancelSearchingBook.bind(this))
    
    
  }

}

new Books().init()




