var currentFixture = "";
var stats = { PASS: 0, FAIL: 0 };
var summary = document.createElement("div");
summary.setAttribute("class", "summary");
document.body.appendChild(summary);

function html(string) {                                       
  return string.
          replace(/&/g,'&amp;').
          replace(/>/g,'&gt;').
          replace(/</g,'&lt;').
          replace(/"/g,'&quot;');
}

function fixture(body) {
  document.write("<div class=\"fixture\">" + html(body) + "</div>");
  currentFixture = body;
}

function outcome(spec, status, details) {
  stats[status]++;
  summary.innerHTML = "Passed: " + stats["PASS"] + " Failed: " + stats["FAIL"];
  details = details ? "<br />" + details : "";
  specBody = spec.substring(spec.indexOf("{") + 1, spec.lastIndexOf("}"));
  document.write("<div class=\"" + status.toLowerCase() + "\">" + specBody + details + "</div>");
}

function relevantStackTrace(e) {
  return printStackTrace(e).slice(5).join("<br />");
}

function assert(fn) {
  var iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(currentFixture);
  iframe.contentWindow.document.close();
  var body = fn.toString();
  function quasi(selector) {
    return window.quasi(selector, iframe.contentWindow.document);
  }
  try {
    fn(quasi, iframe.contentWindow.document);
    outcome(body, "PASS");
  } catch (e) {
    outcome(body, "FAIL", e.toString() + "<br />" + relevantStackTrace(e));
  }
  document.body.removeChild(iframe);
}

function inspect(object) {
  if (typeof object == "undefined") {
    return "undefined";
  } else {
    return JSON.stringify(object);
  }
}

function equal(a, b) {
  if (a != b) {
    throw new Error(inspect(a) + " is not equal to " + inspect(b))
  }
}