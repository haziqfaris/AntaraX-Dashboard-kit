/*
  Draws a design-canvas mock (.dc.html) in a plain browser page, without the canvas.
  Used by tools/render-mocks.mjs; nothing else needs it.

  Covers the part of the format the kit's mocks use: <x-dc> with <helmet>, {{dotted.path}} holes in
  text and attributes, <sc-if value>, <sc-for list as>, <dc-import name> with props, and a
  `class Component extends DCLogic` whose renderVals() returns the template's inputs. It draws the
  first frame only: event handlers are left off, and componentDidMount is not called.

  window.renderDC({ sources: { 'AppBar.dc.html': text, ... }, entry, props, blobs: { id: url } })
*/
(function () {
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(s) { Object.assign(this.state, typeof s === 'function' ? s(this.state, this.props) : s); }
    forceUpdate() {}
  }

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  // The HTML parser moves unknown elements out of tables; <template> may sit anywhere, so the
  // control-flow tags are read as templates.
  function prepare(text) {
    return text
      .replace(/<sc-for\b/g, '<template data-dc="for"').replace(/<\/sc-for>/g, '</template>')
      .replace(/<sc-if\b/g, '<template data-dc="if"').replace(/<\/sc-if>/g, '</template>')
      .replace(/<dc-import\b/g, '<template data-dc="import"').replace(/<\/dc-import>/g, '</template>');
  }

  function lookup(path, scope) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^'.*'$|^".*"$/.test(path)) return path.slice(1, -1);
    var parts = path.split('.');
    var v = scope;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function text(value, scope) {
    return value.replace(HOLE, function (_, p) { var v = lookup(p, scope); return v == null ? '' : String(v); });
  }

  function raw(value, scope) {
    var m = WHOLE.exec(value);
    return m ? lookup(m[1], scope) : text(value, scope);
  }

  function camel(name) { return name.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }

  function make(opts) {
    var parser = new DOMParser();
    var cache = {};
    var styled = {};

    function load(name) {
      if (cache[name]) return cache[name];
      var src = opts.sources[name];
      if (src == null) throw new Error('No mock called ' + name);
      var doc = parser.parseFromString(prepare(src), 'text/html');
      var root = doc.querySelector('x-dc');
      var helmet = root.querySelector('helmet');
      var script = doc.querySelector('script[data-dc-script]');
      var spec = JSON.parse(script.getAttribute('data-props') || '{}');
      var Cls = new Function('DCLogic', script.textContent + '\nreturn Component;')(DCLogic);
      var nodes = Array.prototype.filter.call(root.childNodes, function (n) { return n !== helmet; });
      cache[name] = { helmet: helmet, nodes: nodes, Cls: Cls, spec: spec };
      return cache[name];
    }

    function component(name, props) {
      var c = load(name);
      if (!styled[name] && c.helmet) {
        styled[name] = true;
        Array.prototype.forEach.call(c.helmet.childNodes, function (n) { document.head.appendChild(document.importNode(n, true)); });
      }
      var p = {};
      Object.keys(c.spec).forEach(function (k) { if (k[0] !== '$' && c.spec[k] && 'default' in c.spec[k]) p[k] = c.spec[k].default; });
      Object.assign(p, props || {});
      var inst = new c.Cls(p);
      var vals = inst.renderVals();
      var frag = document.createDocumentFragment();
      c.nodes.forEach(function (n) { draw(n, vals, frag); });
      return frag;
    }

    function children(node, scope, into) {
      var list = node.content ? node.content.childNodes : node.childNodes;
      Array.prototype.forEach.call(list, function (n) { draw(n, scope, into); });
    }

    function draw(node, scope, into) {
      if (node.nodeType === 3) { into.appendChild(document.createTextNode(text(node.nodeValue, scope))); return; }
      if (node.nodeType !== 1) return;
      var kind = node.tagName === 'TEMPLATE' && node.getAttribute('data-dc');
      if (kind === 'if') {
        if (raw(node.getAttribute('value') || '', scope)) children(node, scope, into);
        return;
      }
      if (kind === 'for') {
        var list = raw(node.getAttribute('list') || '', scope) || [];
        var as = node.getAttribute('as') || 'item';
        list.forEach(function (item, i) {
          var s = Object.create(scope);
          s[as] = item; s.$index = i;
          children(node, s, into);
        });
        return;
      }
      if (kind === 'import') {
        var props = {};
        Array.prototype.forEach.call(node.attributes, function (a) {
          if (a.name === 'name' || a.name === 'data-dc' || a.name.indexOf('hint-') === 0) return;
          props[camel(a.name)] = raw(a.value, scope);
        });
        into.appendChild(component(node.getAttribute('name') + '.dc.html', props));
        return;
      }
      var el = document.createElementNS(node.namespaceURI, node.tagName.toLowerCase());
      Array.prototype.forEach.call(node.attributes, function (a) {
        if (/^on/.test(a.name)) return;
        var v = raw(a.value, scope);
        if (v == null || v === false || typeof v === 'function') return;
        v = String(v);
        if ((a.name === 'src' || a.name === 'href') && v.indexOf('/_blob/') === 0) v = opts.blobs[v.slice(7)] || v;
        el.setAttribute(a.name, v);
      });
      children(node, scope, el.tagName === 'TEMPLATE' ? el.content : el);
      into.appendChild(el);
    }

    return component;
  }

  window.renderDC = function (opts) {
    var component = make(opts);
    var mount = document.getElementById('dc-root');
    mount.appendChild(component(opts.entry, opts.props));
    // The page around the mock takes the mock's own ground, so a short mock with an open menu reads as one screen.
    var first = mount.firstElementChild;
    if (first) document.body.style.background = getComputedStyle(first).backgroundColor;
  };
})();
