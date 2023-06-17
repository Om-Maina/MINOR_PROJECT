console.log('client side Javascript directory loaded !')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const fclocation = document.querySelector('#forecastMsg')
const fcdetails = document.querySelector('#errormsg')

fclocation.textContent = ''
fcdetails.textContent = ''

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
  
    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                fclocation.textContent = data.error;
            }else{
                fclocation.textContent = data.location
                fcdetails.textContent = data.forecast
            }
        })
    })
})
