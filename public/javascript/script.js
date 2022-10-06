$(function () {
  if (
    ($("#left-sidebar").load("/left-sidebar.html", function () {
      window.location.href.indexOf("home") > -1 && $("#home-link").css("display", "none");
    }),
    $("#footer").load("/footer.html"),
    $("#age").length > 0 && $("#age").html(Math.abs(new Date(Date.now() - new Date("02/10/1992").getTime()).getUTCFullYear() - 1970)),
    $("#filter-btns").length > 0 &&
      ($(".content-art-desc").html('<p>Clicking any thumbnail will show a larger version of the artwork, and clicking the larger image will open the full res in a new tab!</p>'),
        $(".btn").on("click", function () {
        var e = $(".active").attr("id"),
          t = $(this).attr("id");
        t != e && ($(".active.btn").removeClass("active"), $(".show.art-row").removeClass("show"), $("#" + t + "-art").toggleClass("show"), $(this).toggleClass("active"));
      }),
      $(".thumbnail").on("click", function () {
        var e = $(this).children("img"),
          t = e.attr("src"),
          a = e.attr("data-desc");
        $("#image-file").html("<a target='_new' href='" + t + "'><img src='" + t + "'></a>"), $("#image-text").html(a), $(".full-art").addClass("flex-middle").css("margin-top", "20px"), $("#close-button").show();
      }),
      $("#close-button").on("click", function () {
        $("#image-file").html(""), $("#image-text").html(""), $(".full-art").removeClass("flex-middle").css("margin-top", "0"), $("#close-button").hide();
      })),
    $("#lastupdate").length > 0)
  ) {
    var e = new XMLHttpRequest();
    (e.onreadystatechange = function () {
      if (4 == this.readyState && 200 == this.status) {
        var e = JSON.parse(this.responseText),
          t = e.info.views.toString().split("");
        for (o = 0; o < t.length; o++) {
          (t.length - 1 - o) % 3 == 0 && t.length - 1 - o != 0 && ",";
          var a = new Date(e.info.last_updated);
          $("#lastupdate").html(a.getMonth() + 1 + "-" + a.getDate() + "-" + a.getFullYear());
        }
      }
    }),
      e.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=bechnokid", !0),
      e.send();
  }
  if ($(".randomize").length > 0)
    for (var t = 0; t < $(".randomize").length; t++)
      for (var a = $(".randomize:eq(" + t + ") div").detach(), n = a.clone(), o = 0; o < n.length; o++) {
        var i = Math.floor(Math.random() * (n.length - o));
        (n[o] = a.splice(i, 1)), $(".randomize:eq(" + t + ")").append(n[o]);
      }
  if ($("#random-facts").length > 0) {
    var r,
      s = [
        "I have a very small video game collection because my parents only gave me a game if I got straight A's on my report card. It was a smart move on their part lol",
        "I am currently not diagnosed, although I do share similar traits as those with autism and ADHD. Am I one of these? Both? Neither? I might never know.",
        "I have a particular way of eating Lucky Charms. I eat the cereal pieces before eating the marshmallows. I can't eat the cereal any other way.",
        "I've had 2 surgeries done on my mouth. The first one was to correct my underbite, and the second one was to remove the metal plates from my jaws.",
        "Despite being a Pokemon fan since 1998, I played my first Pokemon game in 2010.",
        "When I was about 6, I punched a boy on the shoulder without him looking. He blamed his friend and I watched them get into a fight. It was great.",
        "I have 1 sibling, and 2 half-siblings. My half-siblings are at least 20 years older than me.",
        "I used to hate drawing when I was younger, only starting to like it once I played Sonic 3 & Knuckles and wanted to draw Sonic.",
      ];
    $("#show-fact").on("click", function () {
      var e;
      (e = s.length - 1), (r = Math.floor(Math.random() * e)), $("#random-facts p").html(s[r]);
    });
  }
  if ($(".code-block").length > 0) {
    const e = "Copy code";
    document.querySelectorAll("pre").forEach((t) => {
      if (navigator.clipboard) {
        let a = document.createElement("button");
        a.classList.add("copy-code-button"), a.classList.add("basic-button"), (a.innerText = e), a.addEventListener("click", l), t.appendChild(a);
      }
    });
  }
  if ($(".freezeframe").length > 0) {
    const e = new Freezeframe({ trigger: !1 });
    $("#play-gif").on("click", function () {
      e.start();
    }),
      $("#stop-gif").on("click", function () {
        e.stop();
      });
  }
  async function l(e) {
    const t = e.srcElement;
    let a = t.parentElement.querySelector("code").innerText;
    await navigator.clipboard.writeText(a),
      (t.innerText = "Copied!"),
      setTimeout(() => {
        t.innerText = copyButtonLabel;
      }, 1e3);
  }
});
