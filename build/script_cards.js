'use strict' 

class Card{
    constructor(){
      this.table = document.querySelector('table')
      this.cardsData = null
      
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
             let str = `<tr>
              <td> ID </td>
              <td> Visitor</td>
              <td> Book</td>
              <td> Borrow Date </td> 
              <td> Return Date </td> 
              <td> Returned </td>
              

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
            <td> </td>
            
            
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

new Card().init()
