var e, t; e = this, t = function () { function e (e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e } function t (e, t) { var n = Object.keys(e); if (Object.getOwnPropertySymbols) { var i = Object.getOwnPropertySymbols(e); t && (i = i.filter(function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable })), n.push.apply(n, i) } return n } function n (n) { for (var i = 1; i < arguments.length; i++) { var r = arguments[i] != null ? arguments[i] : {}; i % 2 ? t(Object(r), !0).forEach(function (t) { e(n, t, r[t]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r)) : t(Object(r)).forEach(function (e) { Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(r, e)) }) } return n } function i (e) { return Array.from(new Set(e)) } function r () { return navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom') } function s (e, t) { return e == t } function o (e, t) { e.tagName.toLowerCase() !== 'template' ? console.warn(`Alpine: [${t}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${t}`) : e.content.childElementCount !== 1 && console.warn(`Alpine: <template> tag with [${t}] encountered with an unexpected number of root elements. Make sure <template> has a single root element. `) } function a (e) { return e.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase()) } function l (e, t) { if (!1 === t(e)) return; let n = e.firstElementChild; for (;n;)l(n, t), n = n.nextElementSibling } function c (e, t) { var n; return function () { var i = this; var r = arguments; var s = function () { n = null, e.apply(i, r) }; clearTimeout(n), n = setTimeout(s, t) } } const u = (e, t, n) => { if (console.warn(`Alpine Error: "${n}"\n\nExpression: "${t}"\nElement:`, e), !r()) throw Object.assign(n, { el: e, expression: t }), n }; function d (e, { el: t, expression: n }) { try { const i = e(); return i instanceof Promise ? i.catch(e => u(t, n, e)) : i } catch (e) { u(t, n, e) } } function f (e, t, n, i = {}) { return d(() => typeof t === 'function' ? t.call(n) : new Function(['$data', ...Object.keys(i)], `var __alpine_result; with($data) { __alpine_result = ${t} }; return __alpine_result`)(n, ...Object.values(i)), { el: e, expression: t }) } const m = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/; function p (e) { const t = y(e.name); return m.test(t) } function h (e, t, n) { let i = Array.from(e.attributes).filter(p).map(v); const r = i.filter(e => e.type === 'spread')[0]; if (r) { const n = f(e, r.expression, t.$data); i = i.concat(Object.entries(n).map(([e, t]) => v({ name: e, value: t }))) } return n ? i.filter(e => e.type === n) : (function (e) { const t = ['bind', 'model', 'show', 'catch-all']; return e.sort((e, n) => { const i = t.indexOf(e.type) === -1 ? 'catch-all' : e.type; const r = t.indexOf(n.type) === -1 ? 'catch-all' : n.type; return t.indexOf(i) - t.indexOf(r) }) }(i)) } function v ({ name: e, value: t }) { const n = y(e); const i = n.match(m); const r = n.match(/:([a-zA-Z0-9\-:]+)/); const s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || []; return { type: i ? i[1] : null, value: r ? r[1] : null, modifiers: s.map(e => e.replace('.', '')), expression: t } } function y (e) { return e.startsWith('@') ? e.replace('@', 'x-on:') : e.startsWith(':') ? e.replace(':', 'x-bind:') : e } function b (e, t = Boolean) { return e.split(' ').filter(t) } const g = 'in'; const x = 'out'; const _ = 'cancelled'; function w (e, t, n, i, r = !1) { if (r) return t(); if (e.__x_transition && e.__x_transition.type === g) return; const s = h(e, i, 'transition'); const o = h(e, i, 'show')[0]; if (o && o.modifiers.includes('transition')) { let i = o.modifiers; if (i.includes('out') && !i.includes('in')) return t(); const r = i.includes('in') && i.includes('out'); i = r ? i.filter((e, t) => t < i.indexOf('out')) : i, (function (e, t, n, i) { const r = { duration: O(t, 'duration', 150), origin: O(t, 'origin', 'center'), first: { opacity: 0, scale: O(t, 'scale', 95) }, second: { opacity: 1, scale: 100 } }; k(e, t, n, () => {}, i, r, g) }(e, i, t, n)) } else s.some(e => ['enter', 'enter-start', 'enter-end'].includes(e.value)) ? (function (e, t, n, i, r) { const s = b(A((n.find(e => e.value === 'enter') || { expression: '' }).expression, e, t)); const o = b(A((n.find(e => e.value === 'enter-start') || { expression: '' }).expression, e, t)); const a = b(A((n.find(e => e.value === 'enter-end') || { expression: '' }).expression, e, t)); S(e, s, o, a, i, () => {}, g, r) }(e, i, s, t, n)) : t() } function E (e, t, n, i, r = !1) { if (r) return t(); if (e.__x_transition && e.__x_transition.type === x) return; const s = h(e, i, 'transition'); const o = h(e, i, 'show')[0]; if (o && o.modifiers.includes('transition')) { let i = o.modifiers; if (i.includes('in') && !i.includes('out')) return t(); const r = i.includes('in') && i.includes('out'); i = r ? i.filter((e, t) => t > i.indexOf('out')) : i, (function (e, t, n, i, r) { const s = { duration: n ? O(t, 'duration', 150) : O(t, 'duration', 150) / 2, origin: O(t, 'origin', 'center'), first: { opacity: 1, scale: 100 }, second: { opacity: 0, scale: O(t, 'scale', 95) } }; k(e, t, () => {}, i, r, s, x) }(e, i, r, t, n)) } else s.some(e => ['leave', 'leave-start', 'leave-end'].includes(e.value)) ? (function (e, t, n, i, r) { const s = b(A((n.find(e => e.value === 'leave') || { expression: '' }).expression, e, t)); const o = b(A((n.find(e => e.value === 'leave-start') || { expression: '' }).expression, e, t)); const a = b(A((n.find(e => e.value === 'leave-end') || { expression: '' }).expression, e, t)); S(e, s, o, a, () => {}, i, x, r) }(e, i, s, t, n)) : t() } function O (e, t, n) { if (e.indexOf(t) === -1) return n; const i = e[e.indexOf(t) + 1]; if (!i) return n; if (t === 'scale' && !P(i)) return n; if (t === 'duration') { const e = i.match(/([0-9]+)ms/); if (e) return e[1] } return t === 'origin' && ['top', 'right', 'left', 'center', 'bottom'].includes(e[e.indexOf(t) + 2]) ? [i, e[e.indexOf(t) + 2]].join(' ') : i } function k (e, t, n, i, r, s, o) { e.__x_transition && e.__x_transition.cancel && e.__x_transition.cancel(); const a = e.style.opacity; const l = e.style.transform; const c = e.style.transformOrigin; const u = !t.includes('opacity') && !t.includes('scale'); const d = u || t.includes('opacity'); const f = u || t.includes('scale'); const m = { start () { d && (e.style.opacity = s.first.opacity), f && (e.style.transform = `scale(${s.first.scale / 100})`) }, during () { f && (e.style.transformOrigin = s.origin), e.style.transitionProperty = [d ? 'opacity' : '', f ? 'transform' : ''].join(' ').trim(), e.style.transitionDuration = s.duration / 1e3 + 's', e.style.transitionTimingFunction = 'cubic-bezier(0.4, 0.0, 0.2, 1)' }, show () { n() }, end () { d && (e.style.opacity = s.second.opacity), f && (e.style.transform = `scale(${s.second.scale / 100})`) }, hide () { i() }, cleanup () { d && (e.style.opacity = a), f && (e.style.transform = l), f && (e.style.transformOrigin = c), e.style.transitionProperty = null, e.style.transitionDuration = null, e.style.transitionTimingFunction = null } }; $(e, m, o, r) } const A = (e, t, n) => typeof e === 'function' ? n.evaluateReturnExpression(t, e) : e; function S (e, t, n, i, r, s, o, a) { e.__x_transition && e.__x_transition.cancel && e.__x_transition.cancel(); const l = e.__x_original_classes || []; const c = { start () { e.classList.add(...n) }, during () { e.classList.add(...t) }, show () { r() }, end () { e.classList.remove(...n.filter(e => !l.includes(e))), e.classList.add(...i) }, hide () { s() }, cleanup () { e.classList.remove(...t.filter(e => !l.includes(e))), e.classList.remove(...i.filter(e => !l.includes(e))) } }; $(e, c, o, a) } function $ (e, t, n, i) { const r = C(() => { t.hide(), e.isConnected && t.cleanup(), delete e.__x_transition }); e.__x_transition = { type: n, cancel: C(() => { i(_), r() }), finish: r, nextFrame: null }, t.start(), t.during(), e.__x_transition.nextFrame = requestAnimationFrame(() => { let n = 1e3 * Number(getComputedStyle(e).transitionDuration.replace(/,.*/, '').replace('s', '')); n === 0 && (n = 1e3 * Number(getComputedStyle(e).animationDuration.replace('s', ''))), t.show(), e.__x_transition.nextFrame = requestAnimationFrame(() => { t.end(), setTimeout(e.__x_transition.finish, n) }) }) } function P (e) { return !Array.isArray(e) && !isNaN(e) } function C (e) { let t = !1; return function () { t || (t = !0, e.apply(this, arguments)) } } function j (e, t, i, r, s) { o(t, 'x-for'); const a = D(typeof i === 'function' ? e.evaluateReturnExpression(t, i) : i); const l = (function (e, t, n, i) { const r = h(t, e, 'if')[0]; if (r && !e.evaluateReturnExpression(t, r.expression)) return []; let s = e.evaluateReturnExpression(t, n.items, i); return P(s) && s >= 0 && (s = Array.from(Array(s).keys(), e => e + 1)), s }(e, t, a, s)); let c = t; l.forEach((i, o) => { const u = (function (e, t, i, r, s) { const o = s ? n({}, s) : {}; return o[e.item] = t, e.index && (o[e.index] = i), e.collection && (o[e.collection] = r), o }(a, i, o, l, s())); const d = (function (e, t, n, i) { const r = h(t, e, 'bind').filter(e => e.value === 'key')[0]; return r ? e.evaluateReturnExpression(t, r.expression, () => i) : n }(e, t, o, u)); let f = (function (e, t) { if (!e) return; if (void 0 === e.__x_for_key) return; if (e.__x_for_key === t) return e; let n = e; for (;n;) { if (n.__x_for_key === t) return n.parentElement.insertBefore(n, e); n = !(!n.nextElementSibling || void 0 === n.nextElementSibling.__x_for_key) && n.nextElementSibling } }(c.nextElementSibling, d)); f ? (delete f.__x_for_key, f.__x_for = u, e.updateElements(f, () => f.__x_for)) : (f = (function (e, t) { const n = document.importNode(e.content, !0); return t.parentElement.insertBefore(n, t.nextElementSibling), t.nextElementSibling }(t, c)), w(f, () => {}, () => {}, e, r), f.__x_for = u, e.initializeElements(f, () => f.__x_for)), c = f, c.__x_for_key = d }), (function (e, t) { for (var n = !(!e.nextElementSibling || void 0 === e.nextElementSibling.__x_for_key) && e.nextElementSibling; n;) { const e = n; const i = n.nextElementSibling; E(n, () => { e.remove() }, () => {}, t), n = !(!i || void 0 === i.__x_for_key) && i } }(c, e)) } function D (e) { const t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/; const n = String(e).match(/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/); if (!n) return; const i = {}; i.items = n[2].trim(); const r = n[1].trim().replace(/^\(|\)$/g, ''); const s = r.match(t); return s ? (i.item = r.replace(t, '').trim(), i.index = s[1].trim(), s[2] && (i.collection = s[2].trim())) : i.item = r, i } function T (e, t, n, r, o, l, c) { var u = e.evaluateReturnExpression(t, r, o); if (n === 'value') { if (ge.ignoreFocusedForValueBinding && document.activeElement.isSameNode(t)) return; if (void 0 === u && String(r).match(/\./) && (u = ''), t.type === 'radio') void 0 === t.attributes.value && l === 'bind' ? t.value = u : l !== 'bind' && (t.checked = s(t.value, u)); else if (t.type === 'checkbox') typeof u === 'boolean' || [null, void 0].includes(u) || l !== 'bind' ? l !== 'bind' && (Array.isArray(u) ? t.checked = u.some(e => s(e, t.value)) : t.checked = !!u) : t.value = String(u); else if (t.tagName === 'SELECT')!(function (e, t) { const n = [].concat(t).map(e => e + ''); Array.from(e.options).forEach(e => { e.selected = n.includes(e.value || e.text) }) }(t, u)); else { if (t.value === u) return; t.value = u } } else if (n === 'class') if (Array.isArray(u)) { const e = t.__x_original_classes || []; t.setAttribute('class', i(e.concat(u)).join(' ')) } else if (typeof u === 'object')Object.keys(u).sort((e, t) => u[e] - u[t]).forEach(e => { u[e] ? b(e).forEach(e => t.classList.add(e)) : b(e).forEach(e => t.classList.remove(e)) }); else { const e = t.__x_original_classes || []; const n = u ? b(u) : []; t.setAttribute('class', i(e.concat(n)).join(' ')) } else n = c.includes('camel') ? a(n) : n, [null, void 0, !1].includes(u) ? t.removeAttribute(n) : (function (e) { return ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'].includes(e) }(n)) ? L(t, n, n) : L(t, n, u) } function L (e, t, n) { e.getAttribute(t) != n && e.setAttribute(t, n) } function N (e, t, n, i, r, s = {}) { const o = { passive: i.includes('passive') }; let l, u; if (i.includes('camel') && (n = a(n)), i.includes('away') ? (u = document, l = a => { t.contains(a.target) || t.offsetWidth < 1 && t.offsetHeight < 1 || (z(e, r, a, s), i.includes('once') && document.removeEventListener(n, l, o)) }) : (u = i.includes('window') ? window : i.includes('document') ? document : t, l = a => { u !== window && u !== document || document.body.contains(t) ? (function (e) { return ['keydown', 'keyup'].includes(e) }(n)) && (function (e, t) { let n = t.filter(e => !['window', 'document', 'prevent', 'stop'].includes(e)); if (n.includes('debounce')) { const e = n.indexOf('debounce'); n.splice(e, P((n[e + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1) } if (n.length === 0) return !1; if (n.length === 1 && n[0] === R(e.key)) return !1; const i = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter(e => n.includes(e)); return n = n.filter(e => !i.includes(e)), !(i.length > 0 && i.filter(t => (t !== 'cmd' && t !== 'super' || (t = 'meta'), e[`${t}Key`])).length === i.length && n[0] === R(e.key)) }(a, i)) || (i.includes('prevent') && a.preventDefault(), i.includes('stop') && a.stopPropagation(), i.includes('self') && a.target !== t) || z(e, r, a, s).then(e => { !1 === e ? a.preventDefault() : i.includes('once') && u.removeEventListener(n, l, o) }) : u.removeEventListener(n, l, o) }), i.includes('debounce')) { const e = i[i.indexOf('debounce') + 1] || 'invalid-wait'; const t = P(e.split('ms')[0]) ? Number(e.split('ms')[0]) : 250; l = c(l, t) }u.addEventListener(n, l, o) } function z (e, t, i, r) { return e.evaluateCommandExpression(i.target, t, () => n(n({}, r()), {}, { $event: i })) } function R (e) { switch (e) { case '/':return 'slash'; case ' ':case 'Spacebar':return 'space'; default:return e && e.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[_\s]/, '-').toLowerCase() } } function F (e, t, n) { return e.type === 'radio' && (e.hasAttribute('name') || e.setAttribute('name', n)), (n, i) => { if (n instanceof CustomEvent && n.detail) return n.detail; if (e.type === 'checkbox') { if (Array.isArray(i)) { const e = t.includes('number') ? I(n.target.value) : n.target.value; return n.target.checked ? i.concat([e]) : i.filter(t => !s(t, e)) } return n.target.checked } if (e.tagName.toLowerCase() === 'select' && e.multiple) return t.includes('number') ? Array.from(n.target.selectedOptions).map(e => I(e.value || e.text)) : Array.from(n.target.selectedOptions).map(e => e.value || e.text); { const e = n.target.value; return t.includes('number') ? I(e) : t.includes('trim') ? e.trim() : e } } } function I (e) { const t = e ? parseFloat(e) : null; return P(t) ? t : e } const { isArray: M } = Array; const { getPrototypeOf: B, create: q, defineProperty: U, defineProperties: W, isExtensible: K, getOwnPropertyDescriptor: G, getOwnPropertyNames: H, getOwnPropertySymbols: V, preventExtensions: Z, hasOwnProperty: J } = Object; const { push: Q, concat: X, map: Y } = Array.prototype; function ee (e) { return void 0 === e } function te (e) { return typeof e === 'function' } const ne = new WeakMap(); function ie (e, t) { ne.set(e, t) } const re = e => ne.get(e) || e; function se (e, t) { return e.valueIsObservable(t) ? e.getProxy(t) : t } function oe (e, t, n) { X.call(H(n), V(n)).forEach(i => { let r = G(n, i); r.configurable || (r = ve(e, r, se)), U(t, i, r) }), Z(t) } class ae {constructor (e, t) { this.originalTarget = t, this.membrane = e }get (e, t) { const { originalTarget: n, membrane: i } = this; const r = n[t]; const { valueObserved: s } = i; return s(n, t), i.getProxy(r) }set (e, t, n) { const { originalTarget: i, membrane: { valueMutated: r } } = this; return i[t] !== n ? (i[t] = n, r(i, t)) : t === 'length' && M(i) && r(i, t), !0 }deleteProperty (e, t) { const { originalTarget: n, membrane: { valueMutated: i } } = this; return delete n[t], i(n, t), !0 }apply (e, t, n) {}construct (e, t, n) {}has (e, t) { const { originalTarget: n, membrane: { valueObserved: i } } = this; return i(n, t), t in n }ownKeys (e) { const { originalTarget: t } = this; return X.call(H(t), V(t)) }isExtensible (e) { const t = K(e); if (!t) return t; const { originalTarget: n, membrane: i } = this; const r = K(n); return r || oe(i, e, n), r }setPrototypeOf (e, t) {}getPrototypeOf (e) { const { originalTarget: t } = this; return B(t) }getOwnPropertyDescriptor (e, t) { const { originalTarget: n, membrane: i } = this; const { valueObserved: r } = this.membrane; r(n, t); let s = G(n, t); if (ee(s)) return s; const o = G(e, t); return ee(o) ? (s = ve(i, s, se), s.configurable || U(e, t, s), s) : o }preventExtensions (e) { const { originalTarget: t, membrane: n } = this; return oe(n, e, t), Z(t), !0 }defineProperty (e, t, n) { const { originalTarget: i, membrane: r } = this; const { valueMutated: s } = r; const { configurable: o } = n; if (J.call(n, 'writable') && !J.call(n, 'value')) { const e = G(i, t); n.value = e.value } return U(i, t, (function (e) { return J.call(e, 'value') && (e.value = re(e.value)), e }(n))), !1 === o && U(e, t, ve(r, n, se)), s(i, t), !0 }} function le (e, t) { return e.valueIsObservable(t) ? e.getReadOnlyProxy(t) : t } class ce {constructor (e, t) { this.originalTarget = t, this.membrane = e }get (e, t) { const { membrane: n, originalTarget: i } = this; const r = i[t]; const { valueObserved: s } = n; return s(i, t), n.getReadOnlyProxy(r) }set (e, t, n) { return !1 }deleteProperty (e, t) { return !1 }apply (e, t, n) {}construct (e, t, n) {}has (e, t) { const { originalTarget: n, membrane: { valueObserved: i } } = this; return i(n, t), t in n }ownKeys (e) { const { originalTarget: t } = this; return X.call(H(t), V(t)) }setPrototypeOf (e, t) {}getOwnPropertyDescriptor (e, t) { const { originalTarget: n, membrane: i } = this; const { valueObserved: r } = i; r(n, t); let s = G(n, t); if (ee(s)) return s; const o = G(e, t); return ee(o) ? (s = ve(i, s, le), J.call(s, 'set') && (s.set = void 0), s.configurable || U(e, t, s), s) : o }preventExtensions (e) { return !1 }defineProperty (e, t, n) { return !1 }} function ue (e) { let t; return M(e) ? t = [] : typeof e === 'object' && (t = {}), t } const de = Object.prototype; function fe (e) { if (e === null) return !1; if (typeof e !== 'object') return !1; if (M(e)) return !0; const t = B(e); return t === de || t === null || B(t) === null } const me = (e, t) => {}; const pe = (e, t) => {}; const he = e => e; function ve (e, t, n) { const { set: i, get: r } = t; return J.call(t, 'value') ? t.value = n(e, t.value) : (ee(r) || (t.get = function () { return n(e, r.call(re(this))) }), ee(i) || (t.set = function (t) { i.call(re(this), e.unwrapProxy(t)) })), t } class ye {constructor (e) { if (this.valueDistortion = he, this.valueMutated = pe, this.valueObserved = me, this.valueIsObservable = fe, this.objectGraph = new WeakMap(), !ee(e)) { const { valueDistortion: t, valueMutated: n, valueObserved: i, valueIsObservable: r } = e; this.valueDistortion = te(t) ? t : he, this.valueMutated = te(n) ? n : pe, this.valueObserved = te(i) ? i : me, this.valueIsObservable = te(r) ? r : fe } }getProxy (e) { const t = re(e); const n = this.valueDistortion(t); if (this.valueIsObservable(n)) { const i = this.getReactiveState(t, n); return i.readOnly === e ? e : i.reactive } return n }getReadOnlyProxy (e) { e = re(e); const t = this.valueDistortion(e); return this.valueIsObservable(t) ? this.getReactiveState(e, t).readOnly : t }unwrapProxy (e) { return re(e) }getReactiveState (e, t) { const { objectGraph: n } = this; let i = n.get(t); if (i) return i; const r = this; return i = { get reactive () { const n = new ae(r, t); const i = new Proxy(ue(t), n); return ie(i, e), U(this, 'reactive', { value: i }), i }, get readOnly () { const n = new ce(r, t); const i = new Proxy(ue(t), n); return ie(i, e), U(this, 'readOnly', { value: i }), i } }, n.set(t, i), i }} class be {constructor (e, t = null) { this.$el = e; const n = this.$el.getAttribute('x-data'); const i = n === '' ? '{}' : n; const r = this.$el.getAttribute('x-init'); const s = { $el: this.$el }; const o = t ? t.$el : this.$el; Object.entries(ge.magicProperties).forEach(([e, t]) => { Object.defineProperty(s, `$${e}`, { get: function () { return t(o) } }) }), this.unobservedData = t ? t.getUnobservedData() : f(e, i, s); const { membrane: a, data: l } = this.wrapDataInObservable(this.unobservedData); var c; this.$data = l, this.membrane = a, this.unobservedData.$el = this.$el, this.unobservedData.$refs = this.getRefsProxy(), this.nextTickStack = [], this.unobservedData.$nextTick = e => { this.nextTickStack.push(e) }, this.watchers = {}, this.unobservedData.$watch = (e, t) => { this.watchers[e] || (this.watchers[e] = []), this.watchers[e].push(t) }, Object.entries(ge.magicProperties).forEach(([e, t]) => { Object.defineProperty(this.unobservedData, `$${e}`, { get: function () { return t(o, this.$el) } }) }), this.showDirectiveStack = [], this.showDirectiveLastElement, t || ge.onBeforeComponentInitializeds.forEach(e => e(this)), r && !t && (this.pauseReactivity = !0, c = this.evaluateReturnExpression(this.$el, r), this.pauseReactivity = !1), this.initializeElements(this.$el, () => {}, !t), this.listenForNewElementsToInitialize(), typeof c === 'function' && c.call(this.$data), t || setTimeout(() => { ge.onComponentInitializeds.forEach(e => e(this)) }, 0) }getUnobservedData () { return (function (e, t) { const n = e.unwrapProxy(t); const i = {}; return Object.keys(n).forEach(e => { ['$el', '$refs', '$nextTick', '$watch'].includes(e) || (i[e] = n[e]) }), i }(this.membrane, this.$data)) }wrapDataInObservable (e) { var t = this; const n = c(function () { t.updateElements(t.$el) }, 0); return (function (e, t) { const n = new ye({ valueMutated (e, n) { t(e, n) } }); return { data: n.getProxy(e), membrane: n } }(e, (e, i) => { t.watchers[i] ? t.watchers[i].forEach(t => t(e[i])) : Array.isArray(e) ? Object.keys(t.watchers).forEach(n => { const r = n.split('.'); i !== 'length' && r.reduce((i, r) => (Object.is(e, i[r]) && t.watchers[n].forEach(t => t(e)), i[r]), t.unobservedData) }) : Object.keys(t.watchers).filter(e => e.includes('.')).forEach(n => { const r = n.split('.'); i === r[r.length - 1] && r.reduce((r, s) => (Object.is(e, r) && t.watchers[n].forEach(t => t(e[i])), r[s]), t.unobservedData) }), t.pauseReactivity || n() })) }walkAndSkipNestedComponents (e, t, n = () => {}) { l(e, e => e.hasAttribute('x-data') && !e.isSameNode(this.$el) ? (e.__x || n(e), !1) : t(e)) }initializeElements (e, t = () => {}, n = !0) { this.walkAndSkipNestedComponents(e, e => void 0 === e.__x_for_key && void 0 === e.__x_inserted_me && void this.initializeElement(e, t, n), e => { e.__x = new be(e) }), this.executeAndClearRemainingShowDirectiveStack(), this.executeAndClearNextTickStack(e) }initializeElement (e, t, n = !0) { e.hasAttribute('class') && h(e, this).length > 0 && (e.__x_original_classes = b(e.getAttribute('class'))), n && this.registerListeners(e, t), this.resolveBoundAttributes(e, !0, t) }updateElements (e, t = () => {}) { this.walkAndSkipNestedComponents(e, e => { if (void 0 !== e.__x_for_key && !e.isSameNode(this.$el)) return !1; this.updateElement(e, t) }, e => { e.__x = new be(e) }), this.executeAndClearRemainingShowDirectiveStack(), this.executeAndClearNextTickStack(e) }executeAndClearNextTickStack (e) { e === this.$el && this.nextTickStack.length > 0 && requestAnimationFrame(() => { for (;this.nextTickStack.length > 0;) this.nextTickStack.shift()() }) }executeAndClearRemainingShowDirectiveStack () { this.showDirectiveStack.reverse().map(e => new Promise((t, n) => { e(t, n) })).reduce((e, t) => e.then(() => t.then(e => { e() })), Promise.resolve(() => {})).catch(e => { if (e !== _) throw e }), this.showDirectiveStack = [], this.showDirectiveLastElement = void 0 }updateElement (e, t) { this.resolveBoundAttributes(e, !1, t) }registerListeners (e, t) { h(e, this).forEach(({ type: i, value: r, modifiers: s, expression: o }) => { switch (i) { case 'on':N(this, e, r, s, o, t); break; case 'model':!(function (e, t, i, r, s) { var o = t.tagName.toLowerCase() === 'select' || ['checkbox', 'radio'].includes(t.type) || i.includes('lazy') ? 'change' : 'input'; N(e, t, o, i, `${r} = rightSideOfExpression($event, ${r})`, () => n(n({}, s()), {}, { rightSideOfExpression: F(t, i, r) })) }(this, e, s, o, t)) } }) }resolveBoundAttributes (e, t = !1, n) { const i = h(e, this); i.forEach(({ type: r, value: s, modifiers: a, expression: l }) => { switch (r) { case 'model':T(this, e, 'value', l, n, r, a); break; case 'bind':if (e.tagName.toLowerCase() === 'template' && s === 'key') return; T(this, e, s, l, n, r, a); break; case 'text':var c = this.evaluateReturnExpression(e, l, n); !(function (e, t, n) { void 0 === t && String(n).match(/\./) && (t = ''), e.textContent = t }(e, c, l)); break; case 'html':!(function (e, t, n, i) { t.innerHTML = e.evaluateReturnExpression(t, n, i) }(this, e, l, n)); break; case 'show':c = this.evaluateReturnExpression(e, l, n), (function (e, t, n, i, r = !1) { const s = () => { t.style.display = 'none', t.__x_is_shown = !1 }; const o = () => { t.style.length === 1 && t.style.display === 'none' ? t.removeAttribute('style') : t.style.removeProperty('display'), t.__x_is_shown = !0 }; if (!0 === r) return void (n ? o() : s()); const a = (i, r) => { n ? ((t.style.display === 'none' || t.__x_transition) && w(t, () => { o() }, r, e), i(() => {})) : t.style.display !== 'none' ? E(t, () => { i(() => { s() }) }, r, e) : i(() => {}) }; i.includes('immediate') ? a(e => e(), () => {}) : (e.showDirectiveLastElement && !e.showDirectiveLastElement.contains(t) && e.executeAndClearRemainingShowDirectiveStack(), e.showDirectiveStack.push(a), e.showDirectiveLastElement = t) }(this, e, c, a, t)); break; case 'if':if (i.some(e => e.type === 'for')) return; c = this.evaluateReturnExpression(e, l, n), (function (e, t, n, i, r) { o(t, 'x-if'); const s = t.nextElementSibling && !0 === t.nextElementSibling.__x_inserted_me; if (!n || s && !t.__x_transition)!n && s && E(t.nextElementSibling, () => { t.nextElementSibling.remove() }, () => {}, e, i); else { const n = document.importNode(t.content, !0); t.parentElement.insertBefore(n, t.nextElementSibling), w(t.nextElementSibling, () => {}, () => {}, e, i), e.initializeElements(t.nextElementSibling, r), t.nextElementSibling.__x_inserted_me = !0 } }(this, e, c, t, n)); break; case 'for':j(this, e, l, t, n); break; case 'cloak':e.removeAttribute('x-cloak') } }) }evaluateReturnExpression (e, t, i = () => {}) { return f(e, t, this.$data, n(n({}, i()), {}, { $dispatch: this.getDispatchFunction(e) })) }evaluateCommandExpression (e, t, i = () => {}) { return (function (e, t, n, i = {}) { return d(() => { if (typeof t === 'function') return Promise.resolve(t.call(n, i.$event)); let e = Function; if (e = Object.getPrototypeOf(async function () {}).constructor, Object.keys(n).includes(t)) { const e = new Function(['dataContext', ...Object.keys(i)], `with(dataContext) { return ${t} }`)(n, ...Object.values(i)); return typeof e === 'function' ? Promise.resolve(e.call(n, i.$event)) : Promise.resolve() } return Promise.resolve(new e(['dataContext', ...Object.keys(i)], `with(dataContext) { ${t} }`)(n, ...Object.values(i))) }, { el: e, expression: t }) }(e, t, this.$data, n(n({}, i()), {}, { $dispatch: this.getDispatchFunction(e) }))) }getDispatchFunction (e) { return (t, n = {}) => { e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0 })) } }listenForNewElementsToInitialize () { const e = this.$el; new MutationObserver(e => { for (let t = 0; t < e.length; t++) { const n = e[t].target.closest('[x-data]'); if (n && n.isSameNode(this.$el)) { if (e[t].type === 'attributes' && e[t].attributeName === 'x-data') { const n = e[t].target.getAttribute('x-data') || '{}'; const i = f(this.$el, n, { $el: this.$el }); Object.keys(i).forEach(e => { this.$data[e] !== i[e] && (this.$data[e] = i[e]) }) }e[t].addedNodes.length > 0 && e[t].addedNodes.forEach(e => { e.nodeType !== 1 || e.__x_inserted_me || (!e.matches('[x-data]') || e.__x ? this.initializeElements(e) : e.__x = new be(e)) }) } } }).observe(e, { childList: !0, attributes: !0, subtree: !0 }) }getRefsProxy () { var e = this; return new Proxy({}, { get (t, n) { return n === '$isAlpineProxy' || (e.walkAndSkipNestedComponents(e.$el, e => { e.hasAttribute('x-ref') && e.getAttribute('x-ref') === n && (i = e) }), i); var i } }) }} const ge = { version: '2.8.1', pauseMutationObserver: !1, magicProperties: {}, onComponentInitializeds: [], onBeforeComponentInitializeds: [], ignoreFocusedForValueBinding: !1, start: async function () { r() || await new Promise(e => { document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', e) : e() }), this.discoverComponents(e => { this.initializeComponent(e) }), document.addEventListener('turbolinks:load', () => { this.discoverUninitializedComponents(e => { this.initializeComponent(e) }) }), this.listenForNewUninitializedComponentsAtRunTime() }, discoverComponents: function (e) { document.querySelectorAll('[x-data]').forEach(t => { e(t) }) }, discoverUninitializedComponents: function (e, t = null) { const n = (t || document).querySelectorAll('[x-data]'); Array.from(n).filter(e => void 0 === e.__x).forEach(t => { e(t) }) }, listenForNewUninitializedComponentsAtRunTime: function () { const e = document.querySelector('body'); new MutationObserver(e => { if (!this.pauseMutationObserver) for (let t = 0; t < e.length; t++)e[t].addedNodes.length > 0 && e[t].addedNodes.forEach(e => { e.nodeType === 1 && (e.parentElement && e.parentElement.closest('[x-data]') || this.discoverUninitializedComponents(e => { this.initializeComponent(e) }, e.parentElement)) }) }).observe(e, { childList: !0, attributes: !0, subtree: !0 }) }, initializeComponent: function (e) { if (!e.__x) try { e.__x = new be(e) } catch (e) { setTimeout(() => { throw e }, 0) } }, clone: function (e, t) { t.__x || (t.__x = new be(t, e)) }, addMagicProperty: function (e, t) { this.magicProperties[e] = t }, onComponentInitialized: function (e) { this.onComponentInitializeds.push(e) }, onBeforeComponentInitialized: function (e) { this.onBeforeComponentInitializeds.push(e) } }; return r() || (window.Alpine = ge, window.deferLoadingAlpine ? window.deferLoadingAlpine(function () { window.Alpine.start() }) : window.Alpine.start()), ge }, typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = t() : typeof define === 'function' && define.amd ? define(t) : (e = e || self).Alpine = t()
