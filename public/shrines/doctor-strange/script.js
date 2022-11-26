$(function(){
  fetch("/shrines/doctor-strange/navigation.html").then((e=>e.text())).then((e=>{$("#navigation").html(e)}))
  fetch("/shrines/doctor-strange/sidebar.html").then((e=>e.text())).then((e=>{$("#right-sidebar").html(e)}))
  fetch("/shrines/doctor-strange/footer.html").then((e=>e.text())).then((e=>{$("#footer").html(e)}))
})