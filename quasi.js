(function (window) {
  
  function querySelectorAll(selector, context) {
    return context.querySelectorAll(selector);
  }
  
  function contains(array, item) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i] === item) {
        return true;
      }
    }
    return false;
  }
  
  function each(array, fn) {
    for (i = 0; i < array.length; i += 1) {
      fn.call(array[i], i);
    }
  }
  
  function Quasi(array) {
    this.array = array;
    this.length = array.length;
  }
  
  Quasi.prototype = {
    addClass: function (classes) {
      this.each(function () {
        var existing = this.getAttribute("class");
        this.setAttribute("class", existing ? existing + " " + classes : classes);
      });
      return this;
    },
    attr: function (name, value) {
      if (typeof value !== "undefined") {
        if (this.length) {
          this.array[0].setAttribute(name, value);
        }
        return this;
      }
      return this.array[0] && this.array[0].getAttribute(name);
    },
    children: function (selector) {
      var all = [];
      this.each(function () {
        each(this.childNodes, function () {
          if (this.nodeType === 1) {
            all.push(this);
          }
        });
      });
      if (selector) {
        // hmm, slow? is there a better way to do this?
        return this.find(selector).filter(function () {
          return contains(all, this);
        });
      }
      return new Quasi(all);
    },
    each: function (fn) {
      each(this.array, fn);
      return this;
    },
    eq: function (index) {
      return new Quasi([this.array[index]]);
    },
    filter: function (fn) {
      var all = [];
      this.each(function () {
        if (fn.call(this, this)) {
          all.push(this);
        }
      });
      return new Quasi(all);
    },
    find: function (selector) {
      var all = [];
      this.each(function () {
        all = all.concat(all.slice.call(querySelectorAll(selector, this)));
      });
      return new Quasi(all);
    },
    get: function () {
      return this.array;
    },
    hide: function () {
      return this.each(function () {
        this.style.display = 'none';
      });
    },
    map: function (fn) {
      var all = [];
      this.each(function () {
        all.push(fn.call(this, this));
      });
      return all;
    },
    parent: function () {
      return new Quasi(this.map(function () {
        return this.parentNode;
      }));
    },
    show: function (display) {
      return this.each(function () {
        this.style.display = display || "";
      });
    }
  };
  
  window.quasi = function (selector, context) {
    return new Quasi(querySelectorAll(selector, context || window.document));
  };
  
}(this.exports || this));