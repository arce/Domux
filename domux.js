(function() {

  var D = function(s) {
    if (typeof s === "string") {
      var e = document.getElementById(s);
      return new DObject(e);
    } else {
      return new DObject(s);
    }
  };
  
  var create = function(e,ns) {
	 return toDOM(e,ns);
  };

  var toDOM = function(e,ns) {
    if (typeof e == "string")
      e = new DObject(document.createElementNS(ns,e));
    return e;
  };

  var DObject = function(e,ns) {
    this.node = e;
  };

  var PDO = DObject.prototype;
  
  PDO.node = function() {
    return this.node;
  };

  PDO.append = function(e,ns) {
	if (ns === undefined)
	  ns = this.node.namespaceURI;
    e = toDOM(e,ns);
    this.node.appendChild(e.node);
    return e;
  };

  PDO.prepend = function(e,ns) {
  	if (ns === undefined)
  	  ns = this.node.namespaceURI;
    e = toDOM(e,ns);
    if ("firstChild" in this.node)
      this.node.insertBefore(e.node, this.node.firstChild);
    else
      this.node.appendChild(e.node);
    return e;
  };

  PDO.after = function(e,ns) {
  	if (ns === undefined)
  	  ns = this.node.namespaceURI;
    e = toDOM(e,ns);
    if ("nextSibling" in this.node)
      this.node.parent.insertBefore(e.node, this.node.nextSibling);
    else
      this.node.parent.appendChild(e.node);
    return e;
  };

  PDO.before = function(e,ns) {
  	if (ns === undefined)
  	  ns = this.node.namespaceURI;
    e = toDOM(e,ns);
    this.node.parent.insertBefore(e.node, this.node);
    return e;
  };

  PDO.bind = function(e, f) {
    if (this.node.addEventListener)
      this.node.addEventListener(e, f);
    else if (x.attachEvent)
      this.node.attachEvent('on' + e, f);
    return this;
  };

  PDO.text = function(t) {
    for (var i = 0; i < this.node.childNodes.length; i++) {
      var curNode = this.node.childNodes[i];
      if (curNode.nodeName === "#text") {
        if (t === undefined)
          return (curNode.nodeValue);
        else {
          curNode.nodeValue = t;
          return this;
        }
      }
    }
    var e = document.createTextNode(t);
    this.node.appendChild(e);
    return this;
  };

  PDO.attr = function(k, v) {
    if (v === undefined) {
      return this.node.getAttribute(k);
    } else {
      this.node.setAttribute(k, v);
      return this;
    }
  };
  
  PDO.style = function(k, v) {
    if (v === undefined) {
      return this.node.style[k];
    } else {
      this.node.style[k] = v;
      return this;
    }
  };
  
  PDO.class = function(v) {
    if (v === undefined) {
      return this.node.className;
    } else {
	  this.node.className = v;
	  return this;
    }
  };

  PDO.val = function(v) {
    if (v === undefined) {
      return this.node.nodeValue;
    } else {
      this.node.nodeValue = v;
      return this;
    }
  };

  PDO.remove = function() {
    this.node.removeChild();
    return this;
  };

  PDO.removeChild = function(a) {
    this.node.removeChild(a.node);
    return this;
  };

  PDO.childCount = function() {
    return this.node.children.length;
  };

  PDO.getChild = function(i) {
    if ((i < 0) || (i >= this.node.children.length))
      return null;
    return new DObject(this.node.children[i]);
  };

  PDO.childIndex = function(e) {
	var k = -1;
    while (e) {
      if ("previousSibling" in e) {
        e = e.previousSibling;
        k = k + 1;
      } else {
        k = -1;
        break;
      }
    }
    return k;
  };

  PDO.parent = function() {
    if ("parentNode" in this.node)
      return new DObject(this.node.parentNode);
    else
      return null;
  };

  PDO.data = function(d) {
    if (d === undefined) {
      var v = this.node.getAttribute("__data__");
      if (v === undefined)
        return null;
      else
        return JSON.parse(this.node.getAttribute("__data__"));
    } else {
      this.node.setAttribute("__data__", JSON.stringify(d));
      return this;
    }
  };

  window.domux = D;

})();