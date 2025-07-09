let prevbutton =  document.getelementbyid('prev')
let nextbutton  =  document.getelementbyid('next')
let container =  document.queryselector('.container')
let items =  container.querySelectorAll('.list .item')
let indicator =  document.queryselector('.indicators')
let dots = indicator.queryselectorAll('ul li')

nextButton.onclick = () => {
    console.log("botão next") 
}

prevbutton.onclick = () => {
    console.log("botão prev")
}
