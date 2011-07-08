fixture("<a href=\"somewhere\">over the rainbow</a>");
assert(function($) { equal($("a").attr('href'), "somewhere"); });
assert(function($) { equal($("a").attr('huh'), undefined); });
assert(function($) { $("a").attr("href", "elsewhere"); equal($("a").attr("href"), "elsewhere"); });
assert(function($) { $("a").attr("anon", "ymous"); equal($("a").attr("anon"), "ymous"); });
assert(function($) { equal($("X").get().length, 0); });
assert(function($) { $("a").addClass("b"); equal($("a").attr("class"), "b"); });
assert(function($) { $("a").hide(); equal($("a").get()[0].style.display, "none"); });

fixture("<p class=\"x\">chicken</p>");
assert(function($) { $("p").addClass("y z"); equal($("p").attr("class"), "x y z"); });

fixture("<p style=\"display:none\">sandwich</p>");
assert(function($) { $("*").show(); equal($("*").get()[0].style.display, ""); });

fixture("<ul> <li>A</li> <li>B</li> <li class=\"y\">C</li> </ul>");
assert(function($) { equal($("ul").length, 1); });
assert(function($) { equal($("ul > li").length, 3); });
assert(function($) { equal($("ul li").length, 3); });
assert(function($) { equal($("ul").children().length, 3); });
assert(function($) { equal($("ul").children(".y").length, 1); });
assert(function($) { equal($(".y").get()[0].innerHTML, "C"); });
assert(function($) { equal($("li").filter(function() { return this.innerHTML == "A" }).length, 1); });
assert(function($) { equal($("li").eq(0).get()[0].innerHTML, "A"); });

assert(function($, document) {
  var array = $("ul").find("li").get(), lis = document.getElementsByTagName("li");
  equal(array[0], lis[0]);
  equal(array[1], lis[1]);
  equal(array[2], lis[2]);
  equal(array.length, lis.length);
});
assert(function($, document) {
  var array = [], lis = document.getElementsByTagName("li");
  $("li").each(function() { array.push(this) });
  equal(array[0], lis[0]);
  equal(array[1], lis[1]);
  equal(array[2], lis[2]);
  equal(array.length, lis.length);
});
assert(function($) {
  var texts = $("li").map(function() {
    return this.innerHTML;
  });
  equal(texts[0], "A");
  equal(texts[1], "B");
  equal(texts[2], "C");
  equal(texts.length, 3);
});

fixture("<div><span><h1>giraffe</h1></span></div>");
assert(function($) { equal($("h1").parent().get()[0].tagName, "SPAN"); });
assert(function($) {
  equal($("div").children("span").children().eq(0).get()[0].tagName, "H1");
});
