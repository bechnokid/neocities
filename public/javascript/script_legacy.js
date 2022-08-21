$(function(){
  $("#left-sidebar").load("/left-sidebar.html", function(){
    $("#nav-menu input").on("change", function(){
      caret = $(this).siblings("label").children("span");
      caret.html() == "▸" ? caret.html("▾") : caret.html("▸");
    })
  });
  $("#footer").load("/footer.html");

  if ($("#age").length > 0){
    $("#age").html(Math.abs(new Date(Date.now() - new Date("02/10/1992").getTime()).getUTCFullYear() - 1970));
  }
  
  if ($("#filter-btns").length > 0){
    $(".btn").on("click", function(){
      var activeDiv = $(".active").attr("id");
      var currentDiv = $(this).attr("id");
    
      if (currentDiv != activeDiv) {
        $(".active.btn").removeClass("active");
        $(".show.art-row").removeClass("show");
    
        $("#" + currentDiv + "-art").toggleClass("show");
        $(this).toggleClass("active");
      }
    });

    $(".thumbnail").on("click", function(){
      var imgFile = $(this).attr("data-filename").split("-")
      var imgPath = "https://bechnokid.neocities.org/artwork/" + imgFile[0] + "/" + imgFile[1] + "/" + imgFile[2] + "." + imgFile[3]
      var imgText = $(this).attr("data-desc")
      $("#image-file").html('<img src=' + imgPath + '>')
      $("#image-file").css("width", imgFile.length > 4 ? String(imgFile[4]) : "100%" );
      $("#image-text").html(imgText)
      $(".full-art").addClass("flex-middle").css("margin-top", "20px")
      $("#close-button").show();
    })
    
    $("#close-button").on("click", function(){
      $("#image-file").html("")
      $("#image-text").html("")
      $(".full-art").removeClass("flex-middle").css("margin-top", "0")
      $("#close-button").hide();
    })
  }

  if ($("#lastupdate").length > 0){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var site_data = JSON.parse(this.responseText);
        var num_arr = site_data.info.views.toString().split("");
        var num_str = "";
        for (i = 0; i < num_arr.length; i++) {
          if ( (num_arr.length-1 - i) % 3 == 0 && (num_arr.length-1 - i) != 0 ) {num_str += ",";}
          var date_str = site_data.info.last_updated;
          var date_obj = new Date(site_data.info.last_updated);
          $("#lastupdate").html((date_obj.getMonth()+1) + "-" + date_obj.getDate() + "-" + date_obj.getFullYear());
        }
      }
    };
    xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=bechnokid", true);
    xhttp.send();
  }
  
  if ($(".randomize").length > 0) {
   for (var listsIndex = 0; listsIndex < $(".randomize").length; listsIndex++){
    var oldList = $(".randomize:eq(" + listsIndex + ") div").detach();
    var newList = oldList.clone();
    
    for (var i = 0; i < newList.length; i++) {
      var randomIndex = Math.floor(Math.random() * (newList.length - i));
      newList[i] = oldList.splice(randomIndex, 1);
      
      $(".randomize:eq(" + listsIndex + ")").append(newList[i]);
    }
   }
  }
  
  if ($("#random-facts").length > 0) {
    var randomList = $("#random-facts p").detach();
    var oldRandomIndex = 0
    shuffleList();
  }
  
  function shuffleList() {
    var randomIndex = randomInt(randomList.length - 1);
    while (randomIndex == oldRandomIndex) {randomIndex = randomInt(randomList.length - 1)}
    $("#random-facts div").html(randomList[randomIndex]);
    oldRandomIndex = randomIndex;
  }
  
  function randomInt(someInt) { return Math.floor(Math.random() * (someInt)); }
});