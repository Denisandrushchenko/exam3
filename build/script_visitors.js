'use strict'




class Visitors{
    constructor(){
      this.table = document.querySelector('table')
      this.usersData = null
      this.newUser = null
      this.buttonAddUser = document.querySelector('.addUser')
      this.modal = document.querySelector('.modal')
      this.buttonSaveUser = this.modal.querySelector('button')
      this.modalOptions = document.querySelector('.modal-options')
      this.newArr = []
      this.newArr2 = []
      this.inputSearchUser = document.querySelector('.search-input')
  } 
    
   goToLocalStorage(){
       
            
          console.log(localStorage.getItem('usersData'));
          if( localStorage.getItem('usersData') == null) {
              fetch('usersData.json').then(response => response.json())
                   .then( response => localStorage.setItem('usersData' , JSON.stringify(response)))
          } 
   
   }
    

    setUsersFromLocalStorage(){
      this.usersData = JSON.parse(localStorage.getItem('usersData'))
    }


    setTable(){

      this.table.innerHTML = ''
      this.setUsersFromLocalStorage()

             let str = `<tr>
              <td>ID </td>
              <td> Name</td>
             <td>Phone </td>
              <td> Delete </td>

                 </tr>
           `
  this.table.insertAdjacentHTML('afterbegin' , str)

          this.usersData.forEach(element => {
            let str2 = ` <tr class = "${element.class}" > 
            <td> ${element.id} </td>
            <td> ${element.name} </td>
            <td> ${element.Phone} </td>
            <td class = "delete-book" >  <img  src = "icons/del.png" >  </td>
            <tr>
          `
          this.table.insertAdjacentHTML('beforeend' , str2)
           });
         

    }   


    modalClose(e){
      if( e.target.matches('span')){
        e.target.closest('div').style.display = 'none'
      }

   }
        
    buttonNewUser(){
      this.modal.querySelectorAll('input').forEach(elem => elem.value = '')
      this.modal.querySelectorAll('input').forEach(elem => {
        if(elem.value == ''){
          this.buttonSaveUser.disabled = true
          
        }
    })      

        document.querySelector('.modal').style.display = 'flex'

        
      }

    addNewUser(){
   
      this.newUser  = {
        id: JSON.parse(localStorage.getItem('usersData')).length + 1,
        name: this.modalOptions.children[1].value,
        Phone: this.modalOptions.children[3].value,
            
      }   

    


      this.newArr = JSON.parse(localStorage.getItem('usersData')) 
      this.newArr.push(this.newUser)
      localStorage.setItem('usersData' , JSON.stringify(this.newArr))
      this.setTable()
      this.modal.style.display = 'none'
      
 }
      
 checkData(e){
  if(e.target.matches('input')){
    this.newArr3 =  Array.from(this.modal.querySelectorAll('input'))
   if(this.newArr3.every(elem => elem.value !== '')){
       this.buttonSaveUser.disabled = false
   }
    
  }
}  
 
delVisitor (e){
  let target = e.target
 
  if(target.matches('.delete-book') ){
    
   this.delId = parseInt( target.parentElement.children[0].innerHTML ) 
   this.newArr = JSON.parse(localStorage.getItem('usersData'))
   console.dir(this.newArr)
    this.newArr2 = this.newArr.filter( (elem) => elem.id != this.delId)
    console.dir(this.newArr2)
    this.newArr2.forEach(elem =>{
      if(elem.id > this.delId){
        --elem.id
    
      }
    }
    ) 
       
    
   
    localStorage.setItem('usersData' , JSON.stringify(this.newArr2))

    this.setTable()

     } 
}
      

searchUser (){
  
  this.usersData = JSON.parse(localStorage.getItem('usersData'))
  
   this.usersData.forEach(elem => {
    
     if( elem.name  ==  this.inputSearchUser.value ||
          elem.Phone ==  this.inputSearchUser.value  ){
            
       elem.class = 'active'
       console.dir(this.usersData)
     }
   })
  localStorage.setItem('usersData' , JSON.stringify(this.usersData))

  this.setTable()
 
}  

cancelSearchingUser(){
     this.inputSearchUser.value = ''

    this.usersData = JSON.parse(localStorage.getItem('usersData'))
    this.usersData.forEach(elem => elem.class = '')
     
    localStorage.setItem('usersData' , JSON.stringify(this.usersData))
    
    this.setTable()
  
}


  

  init(){

    
    this.goToLocalStorage()
    this.setTable()
    this.buttonAddUser.addEventListener('click' , this.buttonNewUser.bind(this))
    this.modal.addEventListener('input' , this.checkData.bind(this))
    this.modal.addEventListener('click' , this.modalClose.bind(this))
    this.buttonSaveUser.addEventListener('click' , this.addNewUser.bind(this))
    this.table.addEventListener('click' , this.delVisitor.bind(this))
    document.querySelector('.search-button-searching').addEventListener('click' , this.searchUser.bind(this))
    document.querySelector('.search-button-cancel').addEventListener('click' , this.cancelSearchingUser.bind(this))
    console.dir(this.buttonAddUser)
    
  }

}

new Visitors().init()

