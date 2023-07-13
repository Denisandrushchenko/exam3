'use strict'

class Statistic{
    constructor(){
  this.table = document.querySelector('table')
  this.statData = [] 
  this.myDate = new Date
      this.Y = this.myDate.getFullYear()
      this.M = this.myDate.getMonth()
      this.D = this.myDate.getDay() 
    }  


    setTable(){
        this.table.innerHTML = ''
     this.statData = JSON.parse(localStorage.getItem('statData'))
              let str = `<tr>
               <td> ID </td>
               <td> Visitor</td>
               <td> Book</td>
               <td> Borrow Date </td> 
               <td> Returned Date </td> 
              
               
 
                  </tr>
            `  

   this.table.insertAdjacentHTML('afterbegin' , str)   

   if(this.M < 10 ){
    this.M =   '0' + this.M 
  }  

  if(this.D < 10 ){
    this.D =   '0' + this.D 
  }
       
   this.statData.forEach(element => {
    let str2 = ` <tr> 
    <td> ${element.id} </td>
    <td> ${element.visitor} </td>
    <td> ${element.book} </td>
    <td>  ${element.borrow_date} </td>
    <td >  ${element.returned_data } </td>
    
    
    
    <tr>
  `
        this.table.insertAdjacentHTML('beforeend' , str2)
            

   })  
    }

    init(){ 
        this.setTable ()
        console.dir(this)
    }
}


new Statistic().init()