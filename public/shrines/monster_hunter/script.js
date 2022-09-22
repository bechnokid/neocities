$(function(){
  $("#left-container").load("left-sidebar.html", function(){
    const favMons = ["Shara Ishvalda", "Bazelgeuse", "Pukei-Pukei", "Chameleos", "Tobi-Kadachi", "Viper Tobi-Kadachi", "Goss Harag", "Rathalos", "Rathian", "Magnamalo", "Khezu"]

    const randomMon = favMons[Math.floor(Math.random() * favMons.length)]

    $(".favMonster").html(randomMon)
  })
})