'use strict'




class Visitors{
    constructor(){
      this.table = document.querySelector('table')
      this.usersData = null
      
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
             let str = `<tr>
              <td>ID </td>
              <td> Name</td>
             <td>Phone </td>
              <td> Edit </td>

                 </tr>
           `
  this.table.insertAdjacentHTML('afterbegin' , str)

          this.usersData.forEach(element => {
            let str2 = ` <tr> 
            <td> ${element.id} </td>
            <td> ${element.name} </td>
            <td> ${element.Phone} </td>
            <td>  Edit </td>
            <tr>
          `
          this.table.insertAdjacentHTML('beforeend' , str2)
           });
         

    }


  

  init(){
    this.goToLocalStorage()
    this.setUsersFromLocalStorage()
    this.setTable()
    

    console.dir(this)
    
  }

}

new Visitors().init()

