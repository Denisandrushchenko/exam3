'use strict'

class Statistic{
    constructor(){
  this.table = document.querySelector('table')
  this.statData = [] 
  this.myDate = new Date
      this.Y = this.myDate.getFullYear()
      this.M = this.myDate.getMonth()
      this.D = this.myDate.getDay() 

      this.menu = document.querySelector('.menu')
      this.tabletMenu = document.querySelector('.menu-tablet')
      this.tabletMenuUl = document.querySelector('.menu-tablet-ul')
    }  


    setMenu(){
         
      if(window.innerWidth > 880 ){
          this.tabletMenu.style.display = 'none'
          this.menu.style.display = 'flex'
        
      }   

  

      if(window.innerWidth < 880){
        this.tabletMenu.style.display = 'block'
        this.menu.style.display = 'none'
      }

      
   
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

    toggleClass(){
      console.dir(this.tabletMenu)
       this.tabletMenuUl.classList.toggle('active-ul')
    }
 
   

    init(){  
      this.setMenu()
      document.querySelector('.menu-tablet-h2').addEventListener('click' , this.toggleClass.bind(this))
        this.setTable ()
        console.dir(this)
    }
}


new Statistic().init()