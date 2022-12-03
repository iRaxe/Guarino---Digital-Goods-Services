var Purchase = function(e, t, a, n) {
   "use strict";

   function l(e) {
       return e && "object" == typeof e && "default" in e ? e : {
           default: e
       }
   }
   var o = l(t),
       r = l(a),
       i = l(n);
   const s = {
           config: {},
           settings: {},
           theme: {},
           isCustomDomain: !1,
           isCartEnabled: !1,
           shopInfo: {},
           productId: null,
           productInfo: {},
           invoiceInfo: {},
           cartProducts: [],
           addons: [],
           bundles: [],
           priceVariants: [],
           onAddToCart: () => {},
           onApplyCoupon: () => {},
           onBackToShop: () => window.location.href = "/",
           onCreateInvoice: () => {},
           onCreateInvoiceTrial: () => {},
           onToastMessage: () => {},
           onOpenTermsModal: () => {},
           onChangeProductQuantity: (e, t) => {},
           onChangeStep: e => {},
           onCustomerAuthEmail: () => {},
           onCustomerAuthCode: () => {},
           onShowProductTerms: () => {},
           onShowMessage: () => {},
           onSuccess: () => {},
           onFail: () => {},
           sellixHelper: {
               getStock: e => e
           }
       },
       u = o.default.createContext(s);

   function c(e, a) {
       return t.useMemo((() => (e || []).filter((e => {
           const t = a.map((({
               uniqid: e
           }) => e));
           return !e.products_bound.filter((({
               uniqid: e
           }) => !t.includes(e))).length
       }))), [e, a])
   }

   function d(e) {
       const a = function(e) {
           return t.useMemo((() => e.reduce(((e, {
               quantity: t
           }) => e + t), 0)), [e])
       }(e);
       return t.useMemo((() => {
           let t = e.reduce(((e, t) => {
                   let a = (t.gateways || "").split(",").filter((e => "" !== e)) || [];
                   return a.length && a.includes("PAYPAL") && +t.shop_paypal_credit_card && a.push("PAYPAL_CREDIT_CARD"), a.includes("STRIPE") && (a = a.filter((e => "PAYPAL_CREDIT_CARD" !== e))), [...e, ...a]
               }), []),
               a = [];
           return t.forEach((e => {
               a.includes(e) || a.push(e)
           })), a
       }), [a, e])
   }
   var p = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto),
       m = new Uint8Array(16);

   function f() {
       if (!p) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
       return p(m)
   }
   for (var h = [], v = 0; v < 256; ++v) h[v] = (v + 256).toString(16).substr(1);

   function y(e, t) {
       var a = t || 0,
           n = h;
       return [n[e[a++]], n[e[a++]], n[e[a++]], n[e[a++]], "-", n[e[a++]], n[e[a++]], "-", n[e[a++]], n[e[a++]], "-", n[e[a++]], n[e[a++]], "-", n[e[a++]], n[e[a++]], n[e[a++]], n[e[a++]], n[e[a++]], n[e[a++]]].join("")
   }

   function b(e, t, a) {
       var n = function(e, n, l, o) {
           var r = l && o || 0;
           if ("string" == typeof e && (e = function(e) {
                   e = unescape(encodeURIComponent(e));
                   for (var t = new Array(e.length), a = 0; a < e.length; a++) t[a] = e.charCodeAt(a);
                   return t
               }(e)), "string" == typeof n && (n = function(e) {
                   var t = [];
                   return e.replace(/[a-fA-F0-9]{2}/g, (function(e) {
                       t.push(parseInt(e, 16))
                   })), t
               }(n)), !Array.isArray(e)) throw TypeError("value must be an array of bytes");
           if (!Array.isArray(n) || 16 !== n.length) throw TypeError("namespace must be uuid string or an Array of 16 byte values");
           var i = a(n.concat(e));
           if (i[6] = 15 & i[6] | t, i[8] = 63 & i[8] | 128, l)
               for (var s = 0; s < 16; ++s) l[r + s] = i[s];
           return l || y(i)
       };
       try {
           n.name = e
       } catch (e) {}
       return n.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", n.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", n
   }

   function g(e, t) {
       var a = (65535 & e) + (65535 & t);
       return (e >> 16) + (t >> 16) + (a >> 16) << 16 | 65535 & a
   }

   function E(e, t, a, n, l, o) {
       return g((r = g(g(t, e), g(n, o))) << (i = l) | r >>> 32 - i, a);
       var r, i
   }

   function C(e, t, a, n, l, o, r) {
       return E(t & a | ~t & n, e, t, l, o, r)
   }

   function w(e, t, a, n, l, o, r) {
       return E(t & n | a & ~n, e, t, l, o, r)
   }

   function S(e, t, a, n, l, o, r) {
       return E(t ^ a ^ n, e, t, l, o, r)
   }

   function N(e, t, a, n, l, o, r) {
       return E(a ^ (t | ~n), e, t, l, o, r)
   }

   function A(e, t, a) {
       var n = t && a || 0;
       "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
       var l = (e = e || {}).random || (e.rng || f)();
       if (l[6] = 15 & l[6] | 64, l[8] = 63 & l[8] | 128, t)
           for (var o = 0; o < 16; ++o) t[n + o] = l[o];
       return t || y(l)
   }

   function k(e, t, a, n) {
       switch (e) {
           case 0:
               return t & a ^ ~t & n;
           case 1:
           case 3:
               return t ^ a ^ n;
           case 2:
               return t & a ^ t & n ^ a & n
       }
   }

   function x(e, t) {
       return e << t | e >>> 32 - t
   }

   function P(e, t) {
       var a = Object.keys(e);
       if (Object.getOwnPropertySymbols) {
           var n = Object.getOwnPropertySymbols(e);
           t && (n = n.filter((function(t) {
               return Object.getOwnPropertyDescriptor(e, t).enumerable
           }))), a.push.apply(a, n)
       }
       return a
   }

   function T(e) {
       for (var t = 1; t < arguments.length; t++) {
           var a = null != arguments[t] ? arguments[t] : {};
           t % 2 ? P(Object(a), !0).forEach((function(t) {
               L(e, t, a[t])
           })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : P(Object(a)).forEach((function(t) {
               Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
           }))
       }
       return e
   }

   function _(e, t) {
       for (var a = 0; a < t.length; a++) {
           var n = t[a];
           n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
       }
   }

   function L(e, t, a) {
       return t in e ? Object.defineProperty(e, t, {
           value: a,
           enumerable: !0,
           configurable: !0,
           writable: !0
       }) : e[t] = a, e
   }

   function D() {
       return D = Object.assign ? Object.assign.bind() : function(e) {
           for (var t = 1; t < arguments.length; t++) {
               var a = arguments[t];
               for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
           }
           return e
       }, D.apply(this, arguments)
   }

   function O(e) {
       return O = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
           return e.__proto__ || Object.getPrototypeOf(e)
       }, O(e)
   }

   function I(e, t) {
       return I = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
           return e.__proto__ = t, e
       }, I(e, t)
   }

   function R(e, t) {
       if (t && ("object" == typeof t || "function" == typeof t)) return t;
       if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
       return function(e) {
           if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
           return e
       }(e)
   }

   function M(e) {
       var t = function() {
           if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
           if (Reflect.construct.sham) return !1;
           if ("function" == typeof Proxy) return !0;
           try {
               return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
           } catch (e) {
               return !1
           }
       }();
       return function() {
           var a, n = O(e);
           if (t) {
               var l = O(this).constructor;
               a = Reflect.construct(n, arguments, l)
           } else a = n.apply(this, arguments);
           return R(this, a)
       }
   }

   function F(e, t) {
       (null == t || t > e.length) && (t = e.length);
       for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
       return n
   }

   function U(e, t) {
       var a = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
       if (!a) {
           if (Array.isArray(e) || (a = function(e, t) {
                   if (e) {
                       if ("string" == typeof e) return F(e, t);
                       var a = Object.prototype.toString.call(e).slice(8, -1);
                       return "Object" === a && e.constructor && (a = e.constructor.name), "Map" === a || "Set" === a ? Array.from(e) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? F(e, t) : void 0
                   }
               }(e)) || t && e && "number" == typeof e.length) {
               a && (e = a);
               var n = 0,
                   l = function() {};
               return {
                   s: l,
                   n: function() {
                       return n >= e.length ? {
                           done: !0
                       } : {
                           done: !1,
                           value: e[n++]
                       }
                   },
                   e: function(e) {
                       throw e
                   },
                   f: l
               }
           }
           throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
       }
       var o, r = !0,
           i = !1;
       return {
           s: function() {
               a = a.call(e)
           },
           n: function() {
               var e = a.next();
               return r = e.done, e
           },
           e: function(e) {
               i = !0, o = e
           },
           f: function() {
               try {
                   r || null == a.return || a.return()
               } finally {
                   if (i) throw o
               }
           }
       }
   }
   b("v3", 48, (function(e) {
       if ("string" == typeof e) {
           var t = unescape(encodeURIComponent(e));
           e = new Array(t.length);
           for (var a = 0; a < t.length; a++) e[a] = t.charCodeAt(a)
       }
       return function(e) {
           var t, a, n, l = [],
               o = 32 * e.length,
               r = "0123456789abcdef";
           for (t = 0; t < o; t += 8) a = e[t >> 5] >>> t % 32 & 255, n = parseInt(r.charAt(a >>> 4 & 15) + r.charAt(15 & a), 16), l.push(n);
           return l
       }(function(e, t) {
           var a, n, l, o, r;
           e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
           var i = 1732584193,
               s = -271733879,
               u = -1732584194,
               c = 271733878;
           for (a = 0; a < e.length; a += 16) n = i, l = s, o = u, r = c, i = C(i, s, u, c, e[a], 7, -680876936), c = C(c, i, s, u, e[a + 1], 12, -389564586), u = C(u, c, i, s, e[a + 2], 17, 606105819), s = C(s, u, c, i, e[a + 3], 22, -1044525330), i = C(i, s, u, c, e[a + 4], 7, -176418897), c = C(c, i, s, u, e[a + 5], 12, 1200080426), u = C(u, c, i, s, e[a + 6], 17, -1473231341), s = C(s, u, c, i, e[a + 7], 22, -45705983), i = C(i, s, u, c, e[a + 8], 7, 1770035416), c = C(c, i, s, u, e[a + 9], 12, -1958414417), u = C(u, c, i, s, e[a + 10], 17, -42063), s = C(s, u, c, i, e[a + 11], 22, -1990404162), i = C(i, s, u, c, e[a + 12], 7, 1804603682), c = C(c, i, s, u, e[a + 13], 12, -40341101), u = C(u, c, i, s, e[a + 14], 17, -1502002290), i = w(i, s = C(s, u, c, i, e[a + 15], 22, 1236535329), u, c, e[a + 1], 5, -165796510), c = w(c, i, s, u, e[a + 6], 9, -1069501632), u = w(u, c, i, s, e[a + 11], 14, 643717713), s = w(s, u, c, i, e[a], 20, -373897302), i = w(i, s, u, c, e[a + 5], 5, -701558691), c = w(c, i, s, u, e[a + 10], 9, 38016083), u = w(u, c, i, s, e[a + 15], 14, -660478335), s = w(s, u, c, i, e[a + 4], 20, -405537848), i = w(i, s, u, c, e[a + 9], 5, 568446438), c = w(c, i, s, u, e[a + 14], 9, -1019803690), u = w(u, c, i, s, e[a + 3], 14, -187363961), s = w(s, u, c, i, e[a + 8], 20, 1163531501), i = w(i, s, u, c, e[a + 13], 5, -1444681467), c = w(c, i, s, u, e[a + 2], 9, -51403784), u = w(u, c, i, s, e[a + 7], 14, 1735328473), i = S(i, s = w(s, u, c, i, e[a + 12], 20, -1926607734), u, c, e[a + 5], 4, -378558), c = S(c, i, s, u, e[a + 8], 11, -2022574463), u = S(u, c, i, s, e[a + 11], 16, 1839030562), s = S(s, u, c, i, e[a + 14], 23, -35309556), i = S(i, s, u, c, e[a + 1], 4, -1530992060), c = S(c, i, s, u, e[a + 4], 11, 1272893353), u = S(u, c, i, s, e[a + 7], 16, -155497632), s = S(s, u, c, i, e[a + 10], 23, -1094730640), i = S(i, s, u, c, e[a + 13], 4, 681279174), c = S(c, i, s, u, e[a], 11, -358537222), u = S(u, c, i, s, e[a + 3], 16, -722521979), s = S(s, u, c, i, e[a + 6], 23, 76029189), i = S(i, s, u, c, e[a + 9], 4, -640364487), c = S(c, i, s, u, e[a + 12], 11, -421815835), u = S(u, c, i, s, e[a + 15], 16, 530742520), i = N(i, s = S(s, u, c, i, e[a + 2], 23, -995338651), u, c, e[a], 6, -198630844), c = N(c, i, s, u, e[a + 7], 10, 1126891415), u = N(u, c, i, s, e[a + 14], 15, -1416354905), s = N(s, u, c, i, e[a + 5], 21, -57434055), i = N(i, s, u, c, e[a + 12], 6, 1700485571), c = N(c, i, s, u, e[a + 3], 10, -1894986606), u = N(u, c, i, s, e[a + 10], 15, -1051523), s = N(s, u, c, i, e[a + 1], 21, -2054922799), i = N(i, s, u, c, e[a + 8], 6, 1873313359), c = N(c, i, s, u, e[a + 15], 10, -30611744), u = N(u, c, i, s, e[a + 6], 15, -1560198380), s = N(s, u, c, i, e[a + 13], 21, 1309151649), i = N(i, s, u, c, e[a + 4], 6, -145523070), c = N(c, i, s, u, e[a + 11], 10, -1120210379), u = N(u, c, i, s, e[a + 2], 15, 718787259), s = N(s, u, c, i, e[a + 9], 21, -343485551), i = g(i, n), s = g(s, l), u = g(u, o), c = g(c, r);
           return [i, s, u, c]
       }(function(e) {
           var t, a = [];
           for (a[(e.length >> 2) - 1] = void 0, t = 0; t < a.length; t += 1) a[t] = 0;
           var n = 8 * e.length;
           for (t = 0; t < n; t += 8) a[t >> 5] |= (255 & e[t / 8]) << t % 32;
           return a
       }(e), 8 * e.length))
   })), b("v5", 80, (function(e) {
       var t = [1518500249, 1859775393, 2400959708, 3395469782],
           a = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
       if ("string" == typeof e) {
           var n = unescape(encodeURIComponent(e));
           e = new Array(n.length);
           for (var l = 0; l < n.length; l++) e[l] = n.charCodeAt(l)
       }
       e.push(128);
       var o = e.length / 4 + 2,
           r = Math.ceil(o / 16),
           i = new Array(r);
       for (l = 0; l < r; l++) {
           i[l] = new Array(16);
           for (var s = 0; s < 16; s++) i[l][s] = e[64 * l + 4 * s] << 24 | e[64 * l + 4 * s + 1] << 16 | e[64 * l + 4 * s + 2] << 8 | e[64 * l + 4 * s + 3]
       }
       for (i[r - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32), i[r - 1][14] = Math.floor(i[r - 1][14]), i[r - 1][15] = 8 * (e.length - 1) & 4294967295, l = 0; l < r; l++) {
           for (var u = new Array(80), c = 0; c < 16; c++) u[c] = i[l][c];
           for (c = 16; c < 80; c++) u[c] = x(u[c - 3] ^ u[c - 8] ^ u[c - 14] ^ u[c - 16], 1);
           var d = a[0],
               p = a[1],
               m = a[2],
               f = a[3],
               h = a[4];
           for (c = 0; c < 80; c++) {
               var v = Math.floor(c / 20),
                   y = x(d, 5) + k(v, p, m, f) + h + t[v] + u[c] >>> 0;
               h = f, f = m, m = x(p, 30) >>> 0, p = d, d = y
           }
           a[0] = a[0] + d >>> 0, a[1] = a[1] + p >>> 0, a[2] = a[2] + m >>> 0, a[3] = a[3] + f >>> 0, a[4] = a[4] + h >>> 0
       }
       return [a[0] >> 24 & 255, a[0] >> 16 & 255, a[0] >> 8 & 255, 255 & a[0], a[1] >> 24 & 255, a[1] >> 16 & 255, a[1] >> 8 & 255, 255 & a[1], a[2] >> 24 & 255, a[2] >> 16 & 255, a[2] >> 8 & 255, 255 & a[2], a[3] >> 24 & 255, a[3] >> 16 & 255, a[3] >> 8 & 255, 255 & a[3], a[4] >> 24 & 255, a[4] >> 16 & 255, a[4] >> 8 & 255, 255 & a[4]]
   }));
   var B = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
       j = function(e) {
           return e && e.Math == Math && e
       },
       q = j("object" == typeof globalThis && globalThis) || j("object" == typeof window && window) || j("object" == typeof self && self) || j("object" == typeof B && B) || function() {
           return this
       }() || Function("return this")(),
       Y = {},
       H = function(e) {
           try {
               return !!e()
           } catch (e) {
               return !0
           }
       },
       W = !H((function() {
           return 7 != Object.defineProperty({}, 1, {
               get: function() {
                   return 7
               }
           })[1]
       })),
       G = !H((function() {
           var e = function() {}.bind();
           return "function" != typeof e || e.hasOwnProperty("prototype")
       })),
       V = G,
       $ = Function.prototype.call,
       z = V ? $.bind($) : function() {
           return $.apply($, arguments)
       },
       K = {},
       X = {}.propertyIsEnumerable,
       J = Object.getOwnPropertyDescriptor,
       Z = J && !X.call({
           1: 2
       }, 1);
   K.f = Z ? function(e) {
       var t = J(this, e);
       return !!t && t.enumerable
   } : X;
   var Q, ee, te = function(e, t) {
           return {
               enumerable: !(1 & e),
               configurable: !(2 & e),
               writable: !(4 & e),
               value: t
           }
       },
       ae = G,
       ne = Function.prototype,
       le = ne.call,
       oe = ae && ne.bind.bind(le, le),
       re = function(e) {
           return ae ? oe(e) : function() {
               return le.apply(e, arguments)
           }
       },
       ie = re,
       se = ie({}.toString),
       ue = ie("".slice),
       ce = function(e) {
           return ue(se(e), 8, -1)
       },
       de = ce,
       pe = re,
       me = function(e) {
           if ("Function" === de(e)) return pe(e)
       },
       fe = H,
       he = ce,
       ve = Object,
       ye = me("".split),
       be = fe((function() {
           return !ve("z").propertyIsEnumerable(0)
       })) ? function(e) {
           return "String" == he(e) ? ye(e, "") : ve(e)
       } : ve,
       ge = function(e) {
           return null == e
       },
       Ee = ge,
       Ce = TypeError,
       we = function(e) {
           if (Ee(e)) throw Ce("Can't call method on " + e);
           return e
       },
       Se = be,
       Ne = we,
       Ae = function(e) {
           return Se(Ne(e))
       },
       ke = "object" == typeof document && document.all,
       xe = {
           all: ke,
           IS_HTMLDDA: void 0 === ke && void 0 !== ke
       },
       Pe = xe.all,
       Te = xe.IS_HTMLDDA ? function(e) {
           return "function" == typeof e || e === Pe
       } : function(e) {
           return "function" == typeof e
       },
       _e = Te,
       Le = xe.all,
       De = xe.IS_HTMLDDA ? function(e) {
           return "object" == typeof e ? null !== e : _e(e) || e === Le
       } : function(e) {
           return "object" == typeof e ? null !== e : _e(e)
       },
       Oe = q,
       Ie = Te,
       Re = function(e) {
           return Ie(e) ? e : void 0
       },
       Me = function(e, t) {
           return arguments.length < 2 ? Re(Oe[e]) : Oe[e] && Oe[e][t]
       },
       Fe = me({}.isPrototypeOf),
       Ue = q,
       Be = Me("navigator", "userAgent") || "",
       je = Ue.process,
       qe = Ue.Deno,
       Ye = je && je.versions || qe && qe.version,
       He = Ye && Ye.v8;
   He && (ee = (Q = He.split("."))[0] > 0 && Q[0] < 4 ? 1 : +(Q[0] + Q[1])), !ee && Be && (!(Q = Be.match(/Edge\/(\d+)/)) || Q[1] >= 74) && (Q = Be.match(/Chrome\/(\d+)/)) && (ee = +Q[1]);
   var We = ee,
       Ge = H,
       Ve = !!Object.getOwnPropertySymbols && !Ge((function() {
           var e = Symbol();
           return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && We && We < 41
       })),
       $e = Ve && !Symbol.sham && "symbol" == typeof Symbol.iterator,
       ze = Me,
       Ke = Te,
       Xe = Fe,
       Je = Object,
       Ze = $e ? function(e) {
           return "symbol" == typeof e
       } : function(e) {
           var t = ze("Symbol");
           return Ke(t) && Xe(t.prototype, Je(e))
       },
       Qe = String,
       et = Te,
       tt = function(e) {
           try {
               return Qe(e)
           } catch (e) {
               return "Object"
           }
       },
       at = TypeError,
       nt = function(e) {
           if (et(e)) return e;
           throw at(tt(e) + " is not a function")
       },
       lt = nt,
       ot = ge,
       rt = z,
       it = Te,
       st = De,
       ut = TypeError,
       ct = {
           exports: {}
       },
       dt = q,
       pt = Object.defineProperty,
       mt = function(e, t) {
           try {
               pt(dt, e, {
                   value: t,
                   configurable: !0,
                   writable: !0
               })
           } catch (a) {
               dt[e] = t
           }
           return t
       },
       ft = mt,
       ht = "__core-js_shared__",
       vt = q[ht] || ft(ht, {}),
       yt = vt;
   (ct.exports = function(e, t) {
       return yt[e] || (yt[e] = void 0 !== t ? t : {})
   })("versions", []).push({
       version: "3.25.5",
       mode: "global",
       copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
       license: "https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE",
       source: "https://github.com/zloirock/core-js"
   });
   var bt = we,
       gt = Object,
       Et = function(e) {
           return gt(bt(e))
       },
       Ct = Et,
       wt = me({}.hasOwnProperty),
       St = Object.hasOwn || function(e, t) {
           return wt(Ct(e), t)
       },
       Nt = me,
       At = 0,
       kt = Math.random(),
       xt = Nt(1..toString),
       Pt = function(e) {
           return "Symbol(" + (void 0 === e ? "" : e) + ")_" + xt(++At + kt, 36)
       },
       Tt = q,
       _t = ct.exports,
       Lt = St,
       Dt = Pt,
       Ot = Ve,
       It = $e,
       Rt = _t("wks"),
       Mt = Tt.Symbol,
       Ft = Mt && Mt.for,
       Ut = It ? Mt : Mt && Mt.withoutSetter || Dt,
       Bt = function(e) {
           if (!Lt(Rt, e) || !Ot && "string" != typeof Rt[e]) {
               var t = "Symbol." + e;
               Ot && Lt(Mt, e) ? Rt[e] = Mt[e] : Rt[e] = It && Ft ? Ft(t) : Ut(t)
           }
           return Rt[e]
       },
       jt = z,
       qt = De,
       Yt = Ze,
       Ht = function(e, t) {
           var a = e[t];
           return ot(a) ? void 0 : lt(a)
       },
       Wt = function(e, t) {
           var a, n;
           if ("string" === t && it(a = e.toString) && !st(n = rt(a, e))) return n;
           if (it(a = e.valueOf) && !st(n = rt(a, e))) return n;
           if ("string" !== t && it(a = e.toString) && !st(n = rt(a, e))) return n;
           throw ut("Can't convert object to primitive value")
       },
       Gt = TypeError,
       Vt = Bt("toPrimitive"),
       $t = function(e, t) {
           if (!qt(e) || Yt(e)) return e;
           var a, n = Ht(e, Vt);
           if (n) {
               if (void 0 === t && (t = "default"), a = jt(n, e, t), !qt(a) || Yt(a)) return a;
               throw Gt("Can't convert object to primitive value")
           }
           return void 0 === t && (t = "number"), Wt(e, t)
       },
       zt = Ze,
       Kt = function(e) {
           var t = $t(e, "string");
           return zt(t) ? t : t + ""
       },
       Xt = De,
       Jt = q.document,
       Zt = Xt(Jt) && Xt(Jt.createElement),
       Qt = function(e) {
           return Zt ? Jt.createElement(e) : {}
       },
       ea = Qt,
       ta = !W && !H((function() {
           return 7 != Object.defineProperty(ea("div"), "a", {
               get: function() {
                   return 7
               }
           }).a
       })),
       aa = W,
       na = z,
       la = K,
       oa = te,
       ra = Ae,
       ia = Kt,
       sa = St,
       ua = ta,
       ca = Object.getOwnPropertyDescriptor;
   Y.f = aa ? ca : function(e, t) {
       if (e = ra(e), t = ia(t), ua) try {
           return ca(e, t)
       } catch (e) {}
       if (sa(e, t)) return oa(!na(la.f, e, t), e[t])
   };
   var da = {},
       pa = W && H((function() {
           return 42 != Object.defineProperty((function() {}), "prototype", {
               value: 42,
               writable: !1
           }).prototype
       })),
       ma = De,
       fa = String,
       ha = TypeError,
       va = function(e) {
           if (ma(e)) return e;
           throw ha(fa(e) + " is not an object")
       },
       ya = W,
       ba = ta,
       ga = pa,
       Ea = va,
       Ca = Kt,
       wa = TypeError,
       Sa = Object.defineProperty,
       Na = Object.getOwnPropertyDescriptor,
       Aa = "enumerable",
       ka = "configurable",
       xa = "writable";
   da.f = ya ? ga ? function(e, t, a) {
       if (Ea(e), t = Ca(t), Ea(a), "function" == typeof e && "prototype" === t && "value" in a && xa in a && !a.writable) {
           var n = Na(e, t);
           n && n.writable && (e[t] = a.value, a = {
               configurable: ka in a ? a.configurable : n.configurable,
               enumerable: Aa in a ? a.enumerable : n.enumerable,
               writable: !1
           })
       }
       return Sa(e, t, a)
   } : Sa : function(e, t, a) {
       if (Ea(e), t = Ca(t), Ea(a), ba) try {
           return Sa(e, t, a)
       } catch (e) {}
       if ("get" in a || "set" in a) throw wa("Accessors not supported");
       return "value" in a && (e[t] = a.value), e
   };
   var Pa = da,
       Ta = te,
       _a = W ? function(e, t, a) {
           return Pa.f(e, t, Ta(1, a))
       } : function(e, t, a) {
           return e[t] = a, e
       },
       La = {
           exports: {}
       },
       Da = W,
       Oa = St,
       Ia = Function.prototype,
       Ra = Da && Object.getOwnPropertyDescriptor,
       Ma = Oa(Ia, "name"),
       Fa = {
           EXISTS: Ma,
           PROPER: Ma && "something" === function() {}.name,
           CONFIGURABLE: Ma && (!Da || Da && Ra(Ia, "name").configurable)
       },
       Ua = Te,
       Ba = vt,
       ja = me(Function.toString);
   Ua(Ba.inspectSource) || (Ba.inspectSource = function(e) {
       return ja(e)
   });
   var qa, Ya, Ha, Wa = Ba.inspectSource,
       Ga = Te,
       Va = q.WeakMap,
       $a = Ga(Va) && /native code/.test(String(Va)),
       za = ct.exports,
       Ka = Pt,
       Xa = za("keys"),
       Ja = function(e) {
           return Xa[e] || (Xa[e] = Ka(e))
       },
       Za = {},
       Qa = $a,
       en = q,
       tn = De,
       an = _a,
       nn = St,
       ln = vt,
       on = Ja,
       rn = Za,
       sn = "Object already initialized",
       un = en.TypeError,
       cn = en.WeakMap;
   if (Qa || ln.state) {
       var dn = ln.state || (ln.state = new cn);
       dn.get = dn.get, dn.has = dn.has, dn.set = dn.set, qa = function(e, t) {
           if (dn.has(e)) throw un(sn);
           return t.facade = e, dn.set(e, t), t
       }, Ya = function(e) {
           return dn.get(e) || {}
       }, Ha = function(e) {
           return dn.has(e)
       }
   } else {
       var pn = on("state");
       rn[pn] = !0, qa = function(e, t) {
           if (nn(e, pn)) throw un(sn);
           return t.facade = e, an(e, pn, t), t
       }, Ya = function(e) {
           return nn(e, pn) ? e[pn] : {}
       }, Ha = function(e) {
           return nn(e, pn)
       }
   }
   var mn = {
           set: qa,
           get: Ya,
           has: Ha,
           enforce: function(e) {
               return Ha(e) ? Ya(e) : qa(e, {})
           },
           getterFor: function(e) {
               return function(t) {
                   var a;
                   if (!tn(t) || (a = Ya(t)).type !== e) throw un("Incompatible receiver, " + e + " required");
                   return a
               }
           }
       },
       fn = H,
       hn = Te,
       vn = St,
       yn = W,
       bn = Fa.CONFIGURABLE,
       gn = Wa,
       En = mn.enforce,
       Cn = mn.get,
       wn = Object.defineProperty,
       Sn = yn && !fn((function() {
           return 8 !== wn((function() {}), "length", {
               value: 8
           }).length
       })),
       Nn = String(String).split("String"),
       An = La.exports = function(e, t, a) {
           "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), a && a.getter && (t = "get " + t), a && a.setter && (t = "set " + t), (!vn(e, "name") || bn && e.name !== t) && (yn ? wn(e, "name", {
               value: t,
               configurable: !0
           }) : e.name = t), Sn && a && vn(a, "arity") && e.length !== a.arity && wn(e, "length", {
               value: a.arity
           });
           try {
               a && vn(a, "constructor") && a.constructor ? yn && wn(e, "prototype", {
                   writable: !1
               }) : e.prototype && (e.prototype = void 0)
           } catch (e) {}
           var n = En(e);
           return vn(n, "source") || (n.source = Nn.join("string" == typeof t ? t : "")), e
       };
   Function.prototype.toString = An((function() {
       return hn(this) && Cn(this).source || gn(this)
   }), "toString");
   var kn = Te,
       xn = da,
       Pn = La.exports,
       Tn = mt,
       _n = {},
       Ln = Math.ceil,
       Dn = Math.floor,
       On = Math.trunc || function(e) {
           var t = +e;
           return (t > 0 ? Dn : Ln)(t)
       },
       In = function(e) {
           var t = +e;
           return t != t || 0 === t ? 0 : On(t)
       },
       Rn = In,
       Mn = Math.max,
       Fn = Math.min,
       Un = In,
       Bn = Math.min,
       jn = function(e) {
           return e > 0 ? Bn(Un(e), 9007199254740991) : 0
       },
       qn = function(e) {
           return jn(e.length)
       },
       Yn = Ae,
       Hn = function(e, t) {
           var a = Rn(e);
           return a < 0 ? Mn(a + t, 0) : Fn(a, t)
       },
       Wn = qn,
       Gn = function(e) {
           return function(t, a, n) {
               var l, o = Yn(t),
                   r = Wn(o),
                   i = Hn(n, r);
               if (e && a != a) {
                   for (; r > i;)
                       if ((l = o[i++]) != l) return !0
               } else
                   for (; r > i; i++)
                       if ((e || i in o) && o[i] === a) return e || i || 0;
               return !e && -1
           }
       },
       Vn = {
           includes: Gn(!0),
           indexOf: Gn(!1)
       },
       $n = St,
       zn = Ae,
       Kn = Vn.indexOf,
       Xn = Za,
       Jn = me([].push),
       Zn = function(e, t) {
           var a, n = zn(e),
               l = 0,
               o = [];
           for (a in n) !$n(Xn, a) && $n(n, a) && Jn(o, a);
           for (; t.length > l;) $n(n, a = t[l++]) && (~Kn(o, a) || Jn(o, a));
           return o
       },
       Qn = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
       el = Zn,
       tl = Qn.concat("length", "prototype");
   _n.f = Object.getOwnPropertyNames || function(e) {
       return el(e, tl)
   };
   var al = {};
   al.f = Object.getOwnPropertySymbols;
   var nl = Me,
       ll = _n,
       ol = al,
       rl = va,
       il = me([].concat),
       sl = nl("Reflect", "ownKeys") || function(e) {
           var t = ll.f(rl(e)),
               a = ol.f;
           return a ? il(t, a(e)) : t
       },
       ul = St,
       cl = sl,
       dl = Y,
       pl = da,
       ml = H,
       fl = Te,
       hl = /#|\.prototype\./,
       vl = function(e, t) {
           var a = bl[yl(e)];
           return a == El || a != gl && (fl(t) ? ml(t) : !!t)
       },
       yl = vl.normalize = function(e) {
           return String(e).replace(hl, ".").toLowerCase()
       },
       bl = vl.data = {},
       gl = vl.NATIVE = "N",
       El = vl.POLYFILL = "P",
       Cl = vl,
       wl = q,
       Sl = Y.f,
       Nl = _a,
       Al = function(e, t, a, n) {
           n || (n = {});
           var l = n.enumerable,
               o = void 0 !== n.name ? n.name : t;
           if (kn(a) && Pn(a, o, n), n.global) l ? e[t] = a : Tn(t, a);
           else {
               try {
                   n.unsafe ? e[t] && (l = !0) : delete e[t]
               } catch (e) {}
               l ? e[t] = a : xn.f(e, t, {
                   value: a,
                   enumerable: !1,
                   configurable: !n.nonConfigurable,
                   writable: !n.nonWritable
               })
           }
           return e
       },
       kl = mt,
       xl = function(e, t, a) {
           for (var n = cl(t), l = pl.f, o = dl.f, r = 0; r < n.length; r++) {
               var i = n[r];
               ul(e, i) || a && ul(a, i) || l(e, i, o(t, i))
           }
       },
       Pl = Cl,
       Tl = nt,
       _l = G,
       Ll = me(me.bind),
       Dl = ce,
       Ol = Array.isArray || function(e) {
           return "Array" == Dl(e)
       },
       Il = {};
   Il[Bt("toStringTag")] = "z";
   var Rl = "[object z]" === String(Il),
       Ml = Te,
       Fl = ce,
       Ul = Bt("toStringTag"),
       Bl = Object,
       jl = "Arguments" == Fl(function() {
           return arguments
       }()),
       ql = me,
       Yl = H,
       Hl = Te,
       Wl = Rl ? Fl : function(e) {
           var t, a, n;
           return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(a = function(e, t) {
               try {
                   return e[t]
               } catch (e) {}
           }(t = Bl(e), Ul)) ? a : jl ? Fl(t) : "Object" == (n = Fl(t)) && Ml(t.callee) ? "Arguments" : n
       },
       Gl = Wa,
       Vl = function() {},
       $l = [],
       zl = Me("Reflect", "construct"),
       Kl = /^\s*(?:class|function)\b/,
       Xl = ql(Kl.exec),
       Jl = !Kl.exec(Vl),
       Zl = function(e) {
           if (!Hl(e)) return !1;
           try {
               return zl(Vl, $l, e), !0
           } catch (e) {
               return !1
           }
       },
       Ql = function(e) {
           if (!Hl(e)) return !1;
           switch (Wl(e)) {
               case "AsyncFunction":
               case "GeneratorFunction":
               case "AsyncGeneratorFunction":
                   return !1
           }
           try {
               return Jl || !!Xl(Kl, Gl(e))
           } catch (e) {
               return !0
           }
       };
   Ql.sham = !0;
   var eo = !zl || Yl((function() {
           var e;
           return Zl(Zl.call) || !Zl(Object) || !Zl((function() {
               e = !0
           })) || e
       })) ? Ql : Zl,
       to = Ol,
       ao = eo,
       no = De,
       lo = Bt("species"),
       oo = Array,
       ro = function(e) {
           var t;
           return to(e) && (t = e.constructor, (ao(t) && (t === oo || to(t.prototype)) || no(t) && null === (t = t[lo])) && (t = void 0)), void 0 === t ? oo : t
       },
       io = function(e, t) {
           return Tl(e), void 0 === t ? e : _l ? Ll(e, t) : function() {
               return e.apply(t, arguments)
           }
       },
       so = be,
       uo = Et,
       co = qn,
       po = function(e, t) {
           return new(ro(e))(0 === t ? 0 : t)
       },
       mo = me([].push),
       fo = function(e) {
           var t = 1 == e,
               a = 2 == e,
               n = 3 == e,
               l = 4 == e,
               o = 6 == e,
               r = 7 == e,
               i = 5 == e || o;
           return function(s, u, c, d) {
               for (var p, m, f = uo(s), h = so(f), v = io(u, c), y = co(h), b = 0, g = d || po, E = t ? g(s, y) : a || r ? g(s, 0) : void 0; y > b; b++)
                   if ((i || b in h) && (m = v(p = h[b], b, f), e))
                       if (t) E[b] = m;
                       else if (m) switch (e) {
                   case 3:
                       return !0;
                   case 5:
                       return p;
                   case 6:
                       return b;
                   case 2:
                       mo(E, p)
               } else switch (e) {
                   case 4:
                       return !1;
                   case 7:
                       mo(E, p)
               }
               return o ? -1 : n || l ? l : E
           }
       },
       ho = {
           forEach: fo(0),
           map: fo(1),
           filter: fo(2),
           some: fo(3),
           every: fo(4),
           find: fo(5),
           findIndex: fo(6),
           filterReject: fo(7)
       },
       vo = {},
       yo = Zn,
       bo = Qn,
       go = Object.keys || function(e) {
           return yo(e, bo)
       },
       Eo = W,
       Co = pa,
       wo = da,
       So = va,
       No = Ae,
       Ao = go;
   vo.f = Eo && !Co ? Object.defineProperties : function(e, t) {
       So(e);
       for (var a, n = No(t), l = Ao(t), o = l.length, r = 0; o > r;) wo.f(e, a = l[r++], n[a]);
       return e
   };
   var ko, xo = Me("document", "documentElement"),
       Po = va,
       To = vo,
       _o = Qn,
       Lo = Za,
       Do = xo,
       Oo = Qt,
       Io = Ja("IE_PROTO"),
       Ro = function() {},
       Mo = function(e) {
           return "<script>" + e + "</" + "script>"
       },
       Fo = function(e) {
           e.write(Mo("")), e.close();
           var t = e.parentWindow.Object;
           return e = null, t
       },
       Uo = function() {
           try {
               ko = new ActiveXObject("htmlfile")
           } catch (e) {}
           var e, t;
           Uo = "undefined" != typeof document ? document.domain && ko ? Fo(ko) : ((t = Oo("iframe")).style.display = "none", Do.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(Mo("document.F=Object")), e.close(), e.F) : Fo(ko);
           for (var a = _o.length; a--;) delete Uo.prototype[_o[a]];
           return Uo()
       };
   Lo[Io] = !0;
   var Bo = Bt,
       jo = Object.create || function(e, t) {
           var a;
           return null !== e ? (Ro.prototype = Po(e), a = new Ro, Ro.prototype = null, a[Io] = e) : a = Uo(), void 0 === t ? a : To.f(a, t)
       },
       qo = da.f,
       Yo = Bo("unscopables"),
       Ho = Array.prototype;
   null == Ho[Yo] && qo(Ho, Yo, {
       configurable: !0,
       value: jo(null)
   });
   var Wo = function(e, t) {
           var a, n, l, o, r, i = e.target,
               s = e.global,
               u = e.stat;
           if (a = s ? wl : u ? wl[i] || kl(i, {}) : (wl[i] || {}).prototype)
               for (n in t) {
                   if (o = t[n], l = e.dontCallGetSet ? (r = Sl(a, n)) && r.value : a[n], !Pl(s ? n : i + (u ? "." : "#") + n, e.forced) && void 0 !== l) {
                       if (typeof o == typeof l) continue;
                       xl(o, l)
                   }(e.sham || l && l.sham) && Nl(o, "sham", !0), Al(a, n, o, e)
               }
       },
       Go = ho.find,
       Vo = function(e) {
           Ho[Yo][e] = !0
       },
       $o = "find",
       zo = !0;
   $o in [] && Array(1).find((function() {
       zo = !1
   })), Wo({
       target: "Array",
       proto: !0,
       forced: zo
   }, {
       find: function(e) {
           return Go(this, e, arguments.length > 1 ? arguments[1] : void 0)
       }
   }), Vo($o);
   var Ko = {
           HIDE: "__react_tooltip_hide_event",
           REBUILD: "__react_tooltip_rebuild_event",
           SHOW: "__react_tooltip_show_event"
       },
       Xo = function(e, t) {
           var a;
           "function" == typeof window.CustomEvent ? a = new window.CustomEvent(e, {
               detail: t
           }) : (a = document.createEvent("Event")).initEvent(e, !1, !0, t), window.dispatchEvent(a)
       };
   var Jo = function(e, t) {
           var a = this.state.show,
               n = this.props.id,
               l = this.isCapture(t.currentTarget),
               o = t.currentTarget.getAttribute("currentItem");
           l || t.stopPropagation(), a && "true" === o ? e || this.hideTooltip(t) : (t.currentTarget.setAttribute("currentItem", "true"), Zo(t.currentTarget, this.getTargetArray(n)), this.showTooltip(t))
       },
       Zo = function(e, t) {
           for (var a = 0; a < t.length; a++) e !== t[a] ? t[a].setAttribute("currentItem", "false") : t[a].setAttribute("currentItem", "true")
       },
       Qo = {
           id: "9b69f92e-d3fe-498b-b1b4-c5e63a51b0cf",
           set: function(e, t, a) {
               this.id in e ? e[this.id][t] = a : Object.defineProperty(e, this.id, {
                   configurable: !0,
                   value: L({}, t, a)
               })
           },
           get: function(e, t) {
               var a = e[this.id];
               if (void 0 !== a) return a[t]
           }
       };
   var er = function(e, t, a) {
           for (var n, l, o = t.respectEffect, r = void 0 !== o && o, i = t.customEvent, s = void 0 !== i && i, u = this.props.id, c = null, d = a.target; null === c && null !== d;) l = d, c = d.getAttribute("data-tip") || null, n = d.getAttribute("data-for") || null, d = d.parentElement;
           if (d = l || a.target, !this.isCustomEvent(d) || s) {
               var p = null == u && null == n || n === u;
               if (null != c && (!r || "float" === this.getEffect(d)) && p) {
                   var m = function(e) {
                       var t = {};
                       for (var a in e) "function" == typeof e[a] ? t[a] = e[a].bind(e) : t[a] = e[a];
                       return t
                   }(a);
                   m.currentTarget = d, e(m)
               }
           }
       },
       tr = function(e, t) {
           var a = {};
           return e.forEach((function(e) {
               var n = e.getAttribute(t);
               n && n.split(" ").forEach((function(e) {
                   return a[e] = !0
               }))
           })), a
       },
       ar = function() {
           return document.getElementsByTagName("body")[0]
       };

   function nr(e, t, a, n, l, o, r) {
       var i = lr(a),
           s = i.width,
           u = i.height,
           c = lr(t),
           d = c.width,
           p = c.height,
           m = or(e, t, o),
           f = m.mouseX,
           h = m.mouseY,
           v = rr(o, d, p, s, u),
           y = ir(r),
           b = y.extraOffsetX,
           g = y.extraOffsetY,
           E = window.innerWidth,
           C = window.innerHeight,
           w = sr(a),
           S = w.parentTop,
           N = w.parentLeft,
           A = function(e) {
               var t = v[e].l;
               return f + t + b
           },
           k = function(e) {
               var t = v[e].t;
               return h + t + g
           },
           x = function(e) {
               return function(e) {
                   var t = v[e].r;
                   return f + t + b
               }(e) > E
           },
           P = function(e) {
               return function(e) {
                   var t = v[e].b;
                   return h + t + g
               }(e) > C
           },
           T = function(e) {
               return function(e) {
                   return A(e) < 0
               }(e) || x(e) || function(e) {
                   return k(e) < 0
               }(e) || P(e)
           },
           _ = function(e) {
               return !T(e)
           },
           L = {
               top: _("top"),
               bottom: _("bottom"),
               left: _("left"),
               right: _("right")
           };
       var D, O = function() {
               var e, t = U(l.split(",").concat(n, ["top", "bottom", "left", "right"]));
               try {
                   for (t.s(); !(e = t.n()).done;) {
                       var a = e.value;
                       if (L[a]) return a
                   }
               } catch (e) {
                   t.e(e)
               } finally {
                   t.f()
               }
               return n
           }(),
           I = !1;
       return O && O !== n && (I = !0, D = O), I ? {
           isNewState: !0,
           newState: {
               place: D
           }
       } : {
           isNewState: !1,
           position: {
               left: parseInt(A(n) - N, 10),
               top: parseInt(k(n) - S, 10)
           }
       }
   }
   var lr = function(e) {
           var t = e.getBoundingClientRect(),
               a = t.height,
               n = t.width;
           return {
               height: parseInt(a, 10),
               width: parseInt(n, 10)
           }
       },
       or = function(e, t, a) {
           var n = t.getBoundingClientRect(),
               l = n.top,
               o = n.left,
               r = lr(t),
               i = r.width,
               s = r.height;
           return "float" === a ? {
               mouseX: e.clientX,
               mouseY: e.clientY
           } : {
               mouseX: o + i / 2,
               mouseY: l + s / 2
           }
       },
       rr = function(e, t, a, n, l) {
           var o, r, i, s;
           return "float" === e ? (o = {
               l: -n / 2,
               r: n / 2,
               t: -(l + 3 + 2),
               b: -3
           }, i = {
               l: -n / 2,
               r: n / 2,
               t: 15,
               b: l + 3 + 2 + 12
           }, s = {
               l: -(n + 3 + 2),
               r: -3,
               t: -l / 2,
               b: l / 2
           }, r = {
               l: 3,
               r: n + 3 + 2,
               t: -l / 2,
               b: l / 2
           }) : "solid" === e && (o = {
               l: -n / 2,
               r: n / 2,
               t: -(a / 2 + l + 2),
               b: -a / 2
           }, i = {
               l: -n / 2,
               r: n / 2,
               t: a / 2,
               b: a / 2 + l + 2
           }, s = {
               l: -(n + t / 2 + 2),
               r: -t / 2,
               t: -l / 2,
               b: l / 2
           }, r = {
               l: t / 2,
               r: n + t / 2 + 2,
               t: -l / 2,
               b: l / 2
           }), {
               top: o,
               bottom: i,
               left: s,
               right: r
           }
       },
       ir = function(e) {
           var t = 0,
               a = 0;
           for (var n in "[object String]" === Object.prototype.toString.apply(e) && (e = JSON.parse(e.toString().replace(/'/g, '"'))), e) "top" === n ? a -= parseInt(e[n], 10) : "bottom" === n ? a += parseInt(e[n], 10) : "left" === n ? t -= parseInt(e[n], 10) : "right" === n && (t += parseInt(e[n], 10));
           return {
               extraOffsetX: t,
               extraOffsetY: a
           }
       },
       sr = function(e) {
           for (var t = e; t;) {
               var a = window.getComputedStyle(t);
               if ("none" !== a.getPropertyValue("transform") || "transform" === a.getPropertyValue("will-change")) break;
               t = t.parentElement
           }
           return {
               parentTop: t && t.getBoundingClientRect().top || 0,
               parentLeft: t && t.getBoundingClientRect().left || 0
           }
       };

   function ur(e, t, a, n) {
       if (t) return t;
       if (null != a) return a;
       if (null === a) return null;
       var l = /<br\s*\/?>/;
       return n && "false" !== n && l.test(e) ? e.split(l).map((function(e, t) {
           return o.default.createElement("span", {
               key: t,
               className: "multi-line"
           }, e)
       })) : e
   }

   function cr(e) {
       var t = {};
       return Object.keys(e).filter((function(e) {
           return /(^aria-\w+$|^role$)/.test(e)
       })).forEach((function(a) {
           t[a] = e[a]
       })), t
   }

   function dr(e) {
       var t = e.length;
       return e.hasOwnProperty ? Array.prototype.slice.call(e) : new Array(t).fill().map((function(t) {
           return e[t]
       }))
   }
   var pr = {
       dark: {
           text: "#fff",
           background: "#222",
           border: "transparent",
           arrow: "#222"
       },
       success: {
           text: "#fff",
           background: "#8DC572",
           border: "transparent",
           arrow: "#8DC572"
       },
       warning: {
           text: "#fff",
           background: "#F0AD4E",
           border: "transparent",
           arrow: "#F0AD4E"
       },
       error: {
           text: "#fff",
           background: "#BE6464",
           border: "transparent",
           arrow: "#BE6464"
       },
       info: {
           text: "#fff",
           background: "#337AB7",
           border: "transparent",
           arrow: "#337AB7"
       },
       light: {
           text: "#222",
           background: "#fff",
           border: "transparent",
           arrow: "#fff"
       }
   };
   var mr, fr, hr = "8px 21px",
       vr = {
           tooltip: 3,
           arrow: 0
       };

   function yr(e, t, a, n, l, o) {
       return function(e, t) {
           var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : hr,
               n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : vr,
               l = t.text,
               o = t.background,
               r = t.border,
               i = t.arrow,
               s = n.arrow,
               u = n.tooltip;
           return "\n  \t.".concat(e, " {\n\t    color: ").concat(l, ";\n\t    background: ").concat(o, ";\n\t    border: 1px solid ").concat(r, ";\n\t    border-radius: ").concat(u, "px;\n\t    padding: ").concat(a, ";\n  \t}\n\n  \t.").concat(e, ".place-top {\n        margin-top: -10px;\n    }\n    .").concat(e, '.place-top::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 18px;\n        height: 10px;\n    }\n    .').concat(e, '.place-top::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(s, "px;\n        border: 1px solid ").concat(r, ";\n        background-color: ").concat(i, ";\n        z-index: -2;\n        bottom: -6px;\n        left: 50%;\n        margin-left: -8px;\n        transform: rotate(135deg);\n    }\n\n    .").concat(e, ".place-bottom {\n        margin-top: 10px;\n    }\n    .").concat(e, '.place-bottom::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 18px;\n        height: 10px;\n    }\n    .').concat(e, '.place-bottom::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(s, "px;\n        border: 1px solid ").concat(r, ";\n        background-color: ").concat(i, ";\n        z-index: -2;\n        top: -6px;\n        left: 50%;\n        margin-left: -8px;\n        transform: rotate(45deg);\n    }\n\n    .").concat(e, ".place-left {\n        margin-left: -10px;\n    }\n    .").concat(e, '.place-left::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 10px;\n        height: 18px;\n    }\n    .').concat(e, '.place-left::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(s, "px;\n        border: 1px solid ").concat(r, ";\n        background-color: ").concat(i, ";\n        z-index: -2;\n        right: -6px;\n        top: 50%;\n        margin-top: -6px;\n        transform: rotate(45deg);\n    }\n\n    .").concat(e, ".place-right {\n        margin-left: 10px;\n    }\n    .").concat(e, '.place-right::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 10px;\n        height: 18px;\n    }\n    .').concat(e, '.place-right::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(s, "px;\n        border: 1px solid ").concat(r, ";\n        background-color: ").concat(i, ";\n        z-index: -2;\n        left: -6px;\n        top: 50%;\n        margin-top: -6px;\n        transform: rotate(-135deg);\n    }\n  ")
       }(e, function(e, t, a) {
           var n = e.text,
               l = e.background,
               o = e.border,
               r = e.arrow ? e.arrow : e.background,
               i = function(e) {
                   return pr[e] ? T({}, pr[e]) : void 0
               }(t);
           n && (i.text = n);
           l && (i.background = l);
           a && (i.border = o || ("light" === t ? "black" : "white"));
           r && (i.arrow = r);
           return i
       }(t, a, n), l, o)
   }
   var br, gr = function(e) {
       e.hide = function(e) {
           Xo(Ko.HIDE, {
               target: e
           })
       }, e.rebuild = function() {
           Xo(Ko.REBUILD)
       }, e.show = function(e) {
           Xo(Ko.SHOW, {
               target: e
           })
       }, e.prototype.globalRebuild = function() {
           this.mount && (this.unbindListener(), this.bindListener())
       }, e.prototype.globalShow = function(e) {
           if (this.mount) {
               var t = !!(e && e.detail && e.detail.target);
               this.showTooltip({
                   currentTarget: t && e.detail.target
               }, !0)
           }
       }, e.prototype.globalHide = function(e) {
           if (this.mount) {
               var t = !!(e && e.detail && e.detail.target);
               this.hideTooltip({
                   currentTarget: t && e.detail.target
               }, t)
           }
       }
   }(mr = function(e) {
       e.prototype.bindWindowEvents = function(e) {
           window.removeEventListener(Ko.HIDE, this.globalHide), window.addEventListener(Ko.HIDE, this.globalHide, !1), window.removeEventListener(Ko.REBUILD, this.globalRebuild), window.addEventListener(Ko.REBUILD, this.globalRebuild, !1), window.removeEventListener(Ko.SHOW, this.globalShow), window.addEventListener(Ko.SHOW, this.globalShow, !1), e && (window.removeEventListener("resize", this.onWindowResize), window.addEventListener("resize", this.onWindowResize, !1))
       }, e.prototype.unbindWindowEvents = function() {
           window.removeEventListener(Ko.HIDE, this.globalHide), window.removeEventListener(Ko.REBUILD, this.globalRebuild), window.removeEventListener(Ko.SHOW, this.globalShow), window.removeEventListener("resize", this.onWindowResize)
       }, e.prototype.onWindowResize = function() {
           this.mount && this.hideTooltip()
       }
   }(mr = function(e) {
       e.prototype.isCustomEvent = function(e) {
           return this.state.event || !!e.getAttribute("data-event")
       }, e.prototype.customBindListener = function(e) {
           var t = this,
               a = this.state,
               n = a.event,
               l = a.eventOff,
               o = e.getAttribute("data-event") || n,
               r = e.getAttribute("data-event-off") || l;
           o.split(" ").forEach((function(a) {
               e.removeEventListener(a, Qo.get(e, a));
               var n = Jo.bind(t, r);
               Qo.set(e, a, n), e.addEventListener(a, n, !1)
           })), r && r.split(" ").forEach((function(a) {
               e.removeEventListener(a, t.hideTooltip), e.addEventListener(a, t.hideTooltip, !1)
           }))
       }, e.prototype.customUnbindListener = function(e) {
           var t = this.state,
               a = t.event,
               n = t.eventOff,
               l = a || e.getAttribute("data-event"),
               o = n || e.getAttribute("data-event-off");
           e.removeEventListener(l, Qo.get(e, a)), o && e.removeEventListener(o, this.hideTooltip)
       }
   }(mr = function(e) {
       e.prototype.isCapture = function(e) {
           return e && "true" === e.getAttribute("data-iscapture") || this.props.isCapture || !1
       }
   }(mr = function(e) {
       e.prototype.getEffect = function(e) {
           return e.getAttribute("data-effect") || this.props.effect || "float"
       }
   }(mr = function(e) {
       e.prototype.isBodyMode = function() {
           return !!this.props.bodyMode
       }, e.prototype.bindBodyListener = function(e) {
           var t = this,
               a = this.state,
               n = a.event,
               l = a.eventOff,
               o = a.possibleCustomEvents,
               r = a.possibleCustomEventsOff,
               i = ar(),
               s = tr(e, "data-event"),
               u = tr(e, "data-event-off");
           null != n && (s[n] = !0), null != l && (u[l] = !0), o.split(" ").forEach((function(e) {
               return s[e] = !0
           })), r.split(" ").forEach((function(e) {
               return u[e] = !0
           })), this.unbindBodyListener(i);
           var c = this.bodyModeListeners = {};
           for (var d in null == n && (c.mouseover = er.bind(this, this.showTooltip, {}), c.mousemove = er.bind(this, this.updateTooltip, {
                   respectEffect: !0
               }), c.mouseout = er.bind(this, this.hideTooltip, {})), s) c[d] = er.bind(this, (function(e) {
               var a = e.currentTarget.getAttribute("data-event-off") || l;
               Jo.call(t, a, e)
           }), {
               customEvent: !0
           });
           for (var p in u) c[p] = er.bind(this, this.hideTooltip, {
               customEvent: !0
           });
           for (var m in c) i.addEventListener(m, c[m])
       }, e.prototype.unbindBodyListener = function(e) {
           e = e || ar();
           var t = this.bodyModeListeners;
           for (var a in t) e.removeEventListener(a, t[a])
       }
   }((fr = function(e) {
       ! function(e, t) {
           if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
           e.prototype = Object.create(t && t.prototype, {
               constructor: {
                   value: e,
                   writable: !0,
                   configurable: !0
               }
           }), Object.defineProperty(e, "prototype", {
               writable: !1
           }), t && I(e, t)
       }(i, e);
       var t, a, n, l = M(i);

       function i(e) {
           var t;
           return function(e, t) {
               if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
           }(this, i), (t = l.call(this, e)).state = {
               uuid: e.uuid || "t" + A(),
               place: e.place || "top",
               desiredPlace: e.place || "top",
               type: e.type || "dark",
               effect: e.effect || "float",
               show: !1,
               border: !1,
               borderClass: "border",
               customColors: {},
               customRadius: {},
               offset: {},
               padding: e.padding,
               extraClass: "",
               html: !1,
               delayHide: 0,
               delayShow: 0,
               event: e.event || null,
               eventOff: e.eventOff || null,
               currentEvent: null,
               currentTarget: null,
               ariaProps: cr(e),
               isEmptyTip: !1,
               disable: !1,
               possibleCustomEvents: e.possibleCustomEvents || "",
               possibleCustomEventsOff: e.possibleCustomEventsOff || "",
               originTooltip: null,
               isMultiline: !1
           }, t.bind(["showTooltip", "updateTooltip", "hideTooltip", "hideTooltipOnScroll", "getTooltipContent", "globalRebuild", "globalShow", "globalHide", "onWindowResize", "mouseOnToolTip"]), t.mount = !0, t.delayShowLoop = null, t.delayHideLoop = null, t.delayReshow = null, t.intervalUpdateContent = null, t
       }
       return t = i, a = [{
           key: "bind",
           value: function(e) {
               var t = this;
               e.forEach((function(e) {
                   t[e] = t[e].bind(t)
               }))
           }
       }, {
           key: "componentDidMount",
           value: function() {
               var e = this.props;
               e.insecure;
               var t = e.resizeHide,
                   a = e.disableInternalStyle;
               this.mount = !0, this.bindListener(), this.bindWindowEvents(t), a || this.injectStyles()
           }
       }, {
           key: "componentWillUnmount",
           value: function() {
               this.mount = !1, this.clearTimer(), this.unbindListener(), this.removeScrollListener(this.state.currentTarget), this.unbindWindowEvents()
           }
       }, {
           key: "injectStyles",
           value: function() {
               var e = this.tooltipRef;
               if (e) {
                   for (var t, a = e.parentNode; a.parentNode;) a = a.parentNode;
                   switch (a.constructor.name) {
                       case "Document":
                       case "HTMLDocument":
                       case void 0:
                           t = a.head;
                           break;
                       default:
                           t = a
                   }
                   if (!t.querySelector("style[data-react-tooltip]")) {
                       var n = document.createElement("style");
                       n.textContent = '.__react_component_tooltip {\n  border-radius: 3px;\n  display: inline-block;\n  font-size: 13px;\n  left: -999em;\n  opacity: 0;\n  position: fixed;\n  pointer-events: none;\n  transition: opacity 0.3s ease-out;\n  top: -999em;\n  visibility: hidden;\n  z-index: 999;\n}\n.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {\n  pointer-events: auto;\n}\n.__react_component_tooltip::before, .__react_component_tooltip::after {\n  content: "";\n  width: 0;\n  height: 0;\n  position: absolute;\n}\n.__react_component_tooltip.show {\n  opacity: 0.9;\n  margin-top: 0;\n  margin-left: 0;\n  visibility: visible;\n}\n.__react_component_tooltip.place-top::before {\n  bottom: 0;\n  left: 50%;\n  margin-left: -11px;\n}\n.__react_component_tooltip.place-bottom::before {\n  top: 0;\n  left: 50%;\n  margin-left: -11px;\n}\n.__react_component_tooltip.place-left::before {\n  right: 0;\n  top: 50%;\n  margin-top: -9px;\n}\n.__react_component_tooltip.place-right::before {\n  left: 0;\n  top: 50%;\n  margin-top: -9px;\n}\n.__react_component_tooltip .multi-line {\n  display: block;\n  padding: 2px 0;\n  text-align: center;\n}', n.setAttribute("data-react-tooltip", "true"), t.appendChild(n)
                   }
               }
           }
       }, {
           key: "mouseOnToolTip",
           value: function() {
               return !(!this.state.show || !this.tooltipRef) && (this.tooltipRef.matches || (this.tooltipRef.msMatchesSelector ? this.tooltipRef.matches = this.tooltipRef.msMatchesSelector : this.tooltipRef.matches = this.tooltipRef.mozMatchesSelector), this.tooltipRef.matches(":hover"))
           }
       }, {
           key: "getTargetArray",
           value: function(e) {
               var t, a = [];
               if (e) {
                   var n = e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
                   t = '[data-tip][data-for="'.concat(n, '"]')
               } else t = "[data-tip]:not([data-for])";
               return dr(document.getElementsByTagName("*")).filter((function(e) {
                   return e.shadowRoot
               })).forEach((function(e) {
                   a = a.concat(dr(e.shadowRoot.querySelectorAll(t)))
               })), a.concat(dr(document.querySelectorAll(t)))
           }
       }, {
           key: "bindListener",
           value: function() {
               var e = this,
                   t = this.props,
                   a = t.id,
                   n = t.globalEventOff,
                   l = t.isCapture,
                   o = this.getTargetArray(a);
               o.forEach((function(t) {
                   null === t.getAttribute("currentItem") && t.setAttribute("currentItem", "false"), e.unbindBasicListener(t), e.isCustomEvent(t) && e.customUnbindListener(t)
               })), this.isBodyMode() ? this.bindBodyListener(o) : o.forEach((function(t) {
                   var a = e.isCapture(t),
                       n = e.getEffect(t);
                   e.isCustomEvent(t) ? e.customBindListener(t) : (t.addEventListener("mouseenter", e.showTooltip, a), t.addEventListener("focus", e.showTooltip, a), "float" === n && t.addEventListener("mousemove", e.updateTooltip, a), t.addEventListener("mouseleave", e.hideTooltip, a), t.addEventListener("blur", e.hideTooltip, a))
               })), n && (window.removeEventListener(n, this.hideTooltip), window.addEventListener(n, this.hideTooltip, l)), this.bindRemovalTracker()
           }
       }, {
           key: "unbindListener",
           value: function() {
               var e = this,
                   t = this.props,
                   a = t.id,
                   n = t.globalEventOff;
               this.isBodyMode() ? this.unbindBodyListener() : this.getTargetArray(a).forEach((function(t) {
                   e.unbindBasicListener(t), e.isCustomEvent(t) && e.customUnbindListener(t)
               })), n && window.removeEventListener(n, this.hideTooltip), this.unbindRemovalTracker()
           }
       }, {
           key: "unbindBasicListener",
           value: function(e) {
               var t = this.isCapture(e);
               e.removeEventListener("mouseenter", this.showTooltip, t), e.removeEventListener("mousemove", this.updateTooltip, t), e.removeEventListener("mouseleave", this.hideTooltip, t)
           }
       }, {
           key: "getTooltipContent",
           value: function() {
               var e, t = this.props,
                   a = t.getContent,
                   n = t.children;
               return a && (e = Array.isArray(a) ? a[0] && a[0](this.state.originTooltip) : a(this.state.originTooltip)), ur(this.state.originTooltip, n, e, this.state.isMultiline)
           }
       }, {
           key: "isEmptyTip",
           value: function(e) {
               return "string" == typeof e && "" === e || null === e
           }
       }, {
           key: "showTooltip",
           value: function(e, t) {
               if (this.tooltipRef) {
                   if (t && !this.getTargetArray(this.props.id).some((function(t) {
                           return t === e.currentTarget
                       }))) return;
                   var a = this.props,
                       n = a.multiline,
                       l = a.getContent,
                       o = e.currentTarget.getAttribute("data-tip"),
                       r = e.currentTarget.getAttribute("data-multiline") || n || !1,
                       i = e instanceof window.FocusEvent || t,
                       s = !0;
                   e.currentTarget.getAttribute("data-scroll-hide") ? s = "true" === e.currentTarget.getAttribute("data-scroll-hide") : null != this.props.scrollHide && (s = this.props.scrollHide), e && e.currentTarget && e.currentTarget.setAttribute && e.currentTarget.setAttribute("aria-describedby", this.props.id || this.state.uuid);
                   var u = e.currentTarget.getAttribute("data-place") || this.props.place || "top",
                       c = i ? "solid" : this.getEffect(e.currentTarget),
                       d = e.currentTarget.getAttribute("data-offset") || this.props.offset || {},
                       p = nr(e, e.currentTarget, this.tooltipRef, u.split(",")[0], u, c, d);
                   p.position && this.props.overridePosition && (p.position = this.props.overridePosition(p.position, e, e.currentTarget, this.tooltipRef, u, u, c, d));
                   var m = p.isNewState ? p.newState.place : u.split(",")[0];
                   this.clearTimer();
                   var f = e.currentTarget,
                       h = this.state.show ? f.getAttribute("data-delay-update") || this.props.delayUpdate : 0,
                       v = this,
                       y = function() {
                           v.setState({
                               originTooltip: o,
                               isMultiline: r,
                               desiredPlace: u,
                               place: m,
                               type: f.getAttribute("data-type") || v.props.type || "dark",
                               customColors: {
                                   text: f.getAttribute("data-text-color") || v.props.textColor || null,
                                   background: f.getAttribute("data-background-color") || v.props.backgroundColor || null,
                                   border: f.getAttribute("data-border-color") || v.props.borderColor || null,
                                   arrow: f.getAttribute("data-arrow-color") || v.props.arrowColor || null
                               },
                               customRadius: {
                                   tooltip: f.getAttribute("data-tooltip-radius") || v.props.tooltipRadius || "3",
                                   arrow: f.getAttribute("data-arrow-radius") || v.props.arrowRadius || "0"
                               },
                               effect: c,
                               offset: d,
                               padding: f.getAttribute("data-padding") || v.props.padding,
                               html: (f.getAttribute("data-html") ? "true" === f.getAttribute("data-html") : v.props.html) || !1,
                               delayShow: f.getAttribute("data-delay-show") || v.props.delayShow || 0,
                               delayHide: f.getAttribute("data-delay-hide") || v.props.delayHide || 0,
                               delayUpdate: f.getAttribute("data-delay-update") || v.props.delayUpdate || 0,
                               border: (f.getAttribute("data-border") ? "true" === f.getAttribute("data-border") : v.props.border) || !1,
                               borderClass: f.getAttribute("data-border-class") || v.props.borderClass || "border",
                               extraClass: f.getAttribute("data-class") || v.props.class || v.props.className || "",
                               disable: (f.getAttribute("data-tip-disable") ? "true" === f.getAttribute("data-tip-disable") : v.props.disable) || !1,
                               currentTarget: f
                           }, (function() {
                               s && v.addScrollListener(v.state.currentTarget), v.updateTooltip(e), l && Array.isArray(l) && (v.intervalUpdateContent = setInterval((function() {
                                   if (v.mount) {
                                       var e = v.props.getContent,
                                           t = ur(o, "", e[0](), r),
                                           a = v.isEmptyTip(t);
                                       v.setState({
                                           isEmptyTip: a
                                       }), v.updatePosition()
                                   }
                               }), l[1]))
                           }))
                       };
                   h ? this.delayReshow = setTimeout(y, h) : y()
               }
           }
       }, {
           key: "updateTooltip",
           value: function(e) {
               var t = this,
                   a = this.state,
                   n = a.delayShow,
                   l = a.disable,
                   o = this.props,
                   r = o.afterShow,
                   i = o.disable,
                   s = this.getTooltipContent(),
                   u = e.currentTarget || e.target;
               if (!this.mouseOnToolTip() && !(this.isEmptyTip(s) || l || i)) {
                   var c = this.state.show ? 0 : parseInt(n, 10),
                       d = function() {
                           if (Array.isArray(s) && s.length > 0 || s) {
                               var a = !t.state.show;
                               t.setState({
                                   currentEvent: e,
                                   currentTarget: u,
                                   show: !0
                               }, (function() {
                                   t.updatePosition((function() {
                                       a && r && r(e)
                                   }))
                               }))
                           }
                       };
                   this.delayShowLoop && clearTimeout(this.delayShowLoop), c ? this.delayShowLoop = setTimeout(d, c) : (this.delayShowLoop = null, d())
               }
           }
       }, {
           key: "listenForTooltipExit",
           value: function() {
               this.state.show && this.tooltipRef && this.tooltipRef.addEventListener("mouseleave", this.hideTooltip)
           }
       }, {
           key: "removeListenerForTooltipExit",
           value: function() {
               this.state.show && this.tooltipRef && this.tooltipRef.removeEventListener("mouseleave", this.hideTooltip)
           }
       }, {
           key: "hideTooltip",
           value: function(e, t) {
               var a = this,
                   n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                       isScroll: !1
                   },
                   l = this.state.disable,
                   o = n.isScroll,
                   r = o ? 0 : this.state.delayHide,
                   i = this.props,
                   s = i.afterHide,
                   u = i.disable,
                   c = this.getTooltipContent();
               if (this.mount && !(this.isEmptyTip(c) || l || u)) {
                   if (t) {
                       var d = this.getTargetArray(this.props.id),
                           p = d.some((function(t) {
                               return t === e.currentTarget
                           }));
                       if (!p || !this.state.show) return
                   }
                   e && e.currentTarget && e.currentTarget.removeAttribute && e.currentTarget.removeAttribute("aria-describedby");
                   var m = function() {
                       var t = a.state.show;
                       a.mouseOnToolTip() ? a.listenForTooltipExit() : (a.removeListenerForTooltipExit(), a.setState({
                           show: !1
                       }, (function() {
                           a.removeScrollListener(a.state.currentTarget), t && s && s(e)
                       })))
                   };
                   this.clearTimer(), r ? this.delayHideLoop = setTimeout(m, parseInt(r, 10)) : m()
               }
           }
       }, {
           key: "hideTooltipOnScroll",
           value: function(e, t) {
               this.hideTooltip(e, t, {
                   isScroll: !0
               })
           }
       }, {
           key: "addScrollListener",
           value: function(e) {
               var t = this.isCapture(e);
               window.addEventListener("scroll", this.hideTooltipOnScroll, t)
           }
       }, {
           key: "removeScrollListener",
           value: function(e) {
               var t = this.isCapture(e);
               window.removeEventListener("scroll", this.hideTooltipOnScroll, t)
           }
       }, {
           key: "updatePosition",
           value: function(e) {
               var t = this,
                   a = this.state,
                   n = a.currentEvent,
                   l = a.currentTarget,
                   o = a.place,
                   r = a.desiredPlace,
                   i = a.effect,
                   s = a.offset,
                   u = this.tooltipRef,
                   c = nr(n, l, u, o, r, i, s);
               if (c.position && this.props.overridePosition && (c.position = this.props.overridePosition(c.position, n, l, u, o, r, i, s)), c.isNewState) return this.setState(c.newState, (function() {
                   t.updatePosition(e)
               }));
               e && "function" == typeof e && e(), u.style.left = c.position.left + "px", u.style.top = c.position.top + "px"
           }
       }, {
           key: "clearTimer",
           value: function() {
               this.delayShowLoop && (clearTimeout(this.delayShowLoop), this.delayShowLoop = null), this.delayHideLoop && (clearTimeout(this.delayHideLoop), this.delayHideLoop = null), this.delayReshow && (clearTimeout(this.delayReshow), this.delayReshow = null), this.intervalUpdateContent && (clearInterval(this.intervalUpdateContent), this.intervalUpdateContent = null)
           }
       }, {
           key: "hasCustomColors",
           value: function() {
               var e = this;
               return Boolean(Object.keys(this.state.customColors).find((function(t) {
                   return "border" !== t && e.state.customColors[t]
               })) || this.state.border && this.state.customColors.border)
           }
       }, {
           key: "render",
           value: function() {
               var e = this,
                   t = this.state,
                   a = t.extraClass,
                   n = t.html,
                   l = t.ariaProps,
                   r = t.disable,
                   s = t.uuid,
                   u = this.getTooltipContent(),
                   c = this.isEmptyTip(u),
                   d = this.props.disableInternalStyle ? "" : yr(this.state.uuid, this.state.customColors, this.state.type, this.state.border, this.state.padding, this.state.customRadius),
                   p = "__react_component_tooltip" + " ".concat(this.state.uuid) + (!this.state.show || r || c ? "" : " show") + (this.state.border ? " " + this.state.borderClass : "") + " place-".concat(this.state.place) + " type-".concat(this.hasCustomColors() ? "custom" : this.state.type) + (this.props.delayUpdate ? " allow_hover" : "") + (this.props.clickable ? " allow_click" : ""),
                   m = this.props.wrapper;
               i.supportedWrappers.indexOf(m) < 0 && (m = i.defaultProps.wrapper);
               var f = [p, a].filter(Boolean).join(" ");
               if (n) {
                   var h = "".concat(u).concat(d ? '\n<style aria-hidden="true">'.concat(d, "</style>") : "");
                   return o.default.createElement(m, D({
                       className: "".concat(f),
                       id: this.props.id || s,
                       ref: function(t) {
                           return e.tooltipRef = t
                       }
                   }, l, {
                       "data-id": "tooltip",
                       dangerouslySetInnerHTML: {
                           __html: h
                       }
                   }))
               }
               return o.default.createElement(m, D({
                   className: "".concat(f),
                   id: this.props.id || s
               }, l, {
                   ref: function(t) {
                       return e.tooltipRef = t
                   },
                   "data-id": "tooltip"
               }), d && o.default.createElement("style", {
                   dangerouslySetInnerHTML: {
                       __html: d
                   },
                   "aria-hidden": "true"
               }), u)
           }
       }], n = [{
           key: "propTypes",
           get: function() {
               return {
                   uuid: r.default.string,
                   children: r.default.any,
                   place: r.default.string,
                   type: r.default.string,
                   effect: r.default.string,
                   offset: r.default.object,
                   padding: r.default.string,
                   multiline: r.default.bool,
                   border: r.default.bool,
                   borderClass: r.default.string,
                   textColor: r.default.string,
                   backgroundColor: r.default.string,
                   borderColor: r.default.string,
                   arrowColor: r.default.string,
                   arrowRadius: r.default.string,
                   tooltipRadius: r.default.string,
                   insecure: r.default.bool,
                   class: r.default.string,
                   className: r.default.string,
                   id: r.default.string,
                   html: r.default.bool,
                   delayHide: r.default.number,
                   delayUpdate: r.default.number,
                   delayShow: r.default.number,
                   event: r.default.string,
                   eventOff: r.default.string,
                   isCapture: r.default.bool,
                   globalEventOff: r.default.string,
                   getContent: r.default.any,
                   afterShow: r.default.func,
                   afterHide: r.default.func,
                   overridePosition: r.default.func,
                   disable: r.default.bool,
                   scrollHide: r.default.bool,
                   resizeHide: r.default.bool,
                   wrapper: r.default.string,
                   bodyMode: r.default.bool,
                   possibleCustomEvents: r.default.string,
                   possibleCustomEventsOff: r.default.string,
                   clickable: r.default.bool,
                   disableInternalStyle: r.default.bool
               }
           }
       }, {
           key: "getDerivedStateFromProps",
           value: function(e, t) {
               var a = t.ariaProps,
                   n = cr(e);
               return Object.keys(n).some((function(e) {
                   return n[e] !== a[e]
               })) ? T(T({}, t), {}, {
                   ariaProps: n
               }) : null
           }
       }], a && _(t.prototype, a), n && _(t, n), Object.defineProperty(t, "prototype", {
           writable: !1
       }), i
   }(o.default.Component), L(fr, "defaultProps", {
       insecure: !0,
       resizeHide: !0,
       wrapper: "div",
       clickable: !1
   }), L(fr, "supportedWrappers", ["div", "span"]), L(fr, "displayName", "ReactTooltip"), (br = mr = fr).prototype.bindRemovalTracker = function() {
       var e = this,
           t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
       if (null != t) {
           var a = new t((function(t) {
               for (var a = 0; a < t.length; a++)
                   for (var n = t[a], l = 0; l < n.removedNodes.length; l++)
                       if (n.removedNodes[l] === e.state.currentTarget) return void e.hideTooltip()
           }));
           a.observe(window.document, {
               childList: !0,
               subtree: !0
           }), this.removalTracker = a
       }
   }, mr = void(br.prototype.unbindRemovalTracker = function() {
       this.removalTracker && (this.removalTracker.disconnect(), this.removalTracker = null)
   }) || mr)) || mr) || mr) || mr) || mr) || mr) || mr;
   const Er = ({
           isSubscription: e,
           stripeAvailable: t,
           payPalAvailable: a,
           APM: n,
           isStripe: l,
           isPayPal: r,
           setGateway: i,
           gateway: s,
           setDeep: u,
           deep: c,
           config: d
       }) => {
           let p = ["BANCONTACT", "EPS", "GIROPAY", "IDEAL", "SEPA", "SOFORT", "PRZELEWY24", "BLIK", "MERCADOPAGO", "MYBANK", "TRUSTLY"],
               m = ["BANCONTACT", "EPS", "GIROPAY", "IDEAL", "SEPA", "SOFORT", "PRZELEWY24", "AFTERPAY_CLEARPAY", "ALIPAY", "AU_BECS_DEBIT", "BOLETO", "FPX", "GRABPAY", "KLARNA", "OXXO", "WECHAT_PAY"];
           if (t = t.filter((e => m.find((t => t === e)))), a = a.filter((e => p.find((t => t === e)))).filter((e => !t.includes(e))), r || (a = []), !a.length && !t.length || !r && !l || e) return null;
           let f = !1;
           1 === [...a, ...t].length && (f = !0);
           let h = "PAYPAL" === s && a.includes(n) || "STRIPE" === s && t.includes(n);
           return o.default.createElement("div", {
               className: "" + (h ? "active" : "")
           }, o.default.createElement("div", {
               className: "d-flex " + (f ? "flex-row-reverse justify-content-between" : "flex-wrap"),
               onClick: () => {
                   f ? t.length ? i("STRIPE", t[0]) : i("PAYPAL", a[0]) : u("extra")
               }
           }, f && o.default.createElement("div", {
               className: "gateway-icons big"
           }, o.default.createElement("img", {
               src: t.length ? d.PAYMENT_ICONS.STRIPE_EXTRA[t[0]] : d.PAYMENT_ICONS.PAYPAL_EXTRA[a[0]],
               alt: ""
           })), o.default.createElement("div", null, o.default.createElement("div", {
               className: "gateway-title"
           }, "Banking, Regional methods"), o.default.createElement("div", {
               className: "gateway-subtitle"
           }, a.map((e => d.PAYMENT_FULL_NAME.PAYPAL_EXTRA[e])).join(", "), a.length ? ", " : "", t.map((e => d.PAYMENT_FULL_NAME.STRIPE_EXTRA[e])).join(", "))), f || "extra" === c && !1 === f ? null : o.default.createElement("div", {
               className: "gateway-icons"
           }, a.map(((e, t) => o.default.createElement("img", {
               key: t,
               src: d.PAYMENT_ICONS.PAYPAL_EXTRA[e],
               alt: "",
               className: "rectangle"
           }))), t.map(((e, t) => o.default.createElement("img", {
               key: t,
               src: d.PAYMENT_ICONS.STRIPE_EXTRA[e],
               alt: "",
               className: "rectangle"
           }))))), "extra" === c && !1 === f && o.default.createElement("div", {
               className: "gateway-list"
           }, a.map(((e, t) => o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + ("PAYPAL" === s && n === e ? "active" : ""),
               onClick: () => i("PAYPAL", e)
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.PAYPAL_EXTRA[e],
               alt: "",
               className: "rectangle"
           }), d.PAYMENT_FULL_NAME.PAYPAL_EXTRA[e]))), t.map(((e, t) => o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + ("STRIPE" === s && n === e ? "active" : ""),
               onClick: () => i("STRIPE", e)
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.STRIPE_EXTRA[e],
               alt: "",
               className: "rectangle"
           }), d.PAYMENT_FULL_NAME.STRIPE_EXTRA[e])))))
       },
       Cr = ({
           crypto: e,
           deep: a,
           setDeep: n,
           setGateway: l,
           gateway: r,
           isMarketplace: i,
           config: s
       }) => {
           let [u, c] = t.useState(!1), [d, p] = t.useState(!1);
           if (!e.length) return null;
           let m = !1;
           1 === e.length && (m = !0);
           let f = e.includes("USDC:ERC20"),
               h = e.includes("USDC:BEP20"),
               v = e.includes("USDT:ERC20"),
               y = e.includes("USDT:BEP20"),
               b = e.includes("USDT:TRC20"),
               g = f && h,
               E = [v, y, b].filter((e => e)).length > 1;
           return o.default.createElement("div", {
               className: (e.includes(r) ? "active" : "") + " is-crypto"
           }, o.default.createElement("div", {
               className: `d-flex ${m?"flex-row-reverse justify-content-between":"flex-wrap"} ${e.includes(r)?"active":""}`,
               onClick: () => {
                   m ? l(e[0]) : n()
               }
           }, m && o.default.createElement("div", {
               className: "gateway-icons big"
           }, o.default.createElement("img", {
               src: s.PAYMENT_ICONS[e[0]],
               alt: ""
           })), o.default.createElement("div", null, o.default.createElement("div", {
               className: "gateway-title"
           }, m && e[0].includes("USDC") ? o.default.createElement(o.default.Fragment, null, "USDC ", o.default.createElement("br", null)) : "", m && e[0].includes("USDT") ? o.default.createElement(o.default.Fragment, null, "USDT ", o.default.createElement("br", null)) : "", m && (y || h) && "Binance Smart Chain (BEP20)", m && v && f && "Ethereum Chain (ERC20)", m && b && b && "Tron Chain (TRC20)", m ? "" : o.default.createElement(o.default.Fragment, null, "Cryptocurrencies ", o.default.createElement("br", null)), !m || e[0].includes("USDC") || e[0].includes("USDT") ? "" : o.default.createElement(o.default.Fragment, null, s.PAYMENT_FULL_NAME[e[0]], o.default.createElement("br", null))), m ? o.default.createElement("div", {
               className: "gateway-subtitle"
           }, "Send a direct transaction to an address") : "crypto" === a ? null : o.default.createElement("div", {
               className: "gateway-subtitle"
           }, !m && e.map((e => g && e.includes("USDC") || E && e.includes("USDT") ? "" : o.default.createElement("span", null, s.PAYMENT_FULL_NAME[e], " "))), !m && g && o.default.createElement("span", null, "USDC "), !m && E && o.default.createElement("span", null, "USDT "))), m || "crypto" === a && !1 === m ? null : o.default.createElement("div", {
               className: "gateway-icons"
           }, e.map(((e, t) => g && e.includes("USDC") || E && e.includes("USDT") ? "" : o.default.createElement("img", {
               key: t,
               src: s.PAYMENT_ICONS[e],
               alt: ""
           }))), g && o.default.createElement("img", {
               src: s.PAYMENT_ICONS.USDC,
               alt: ""
           }), E && o.default.createElement("img", {
               src: s.PAYMENT_ICONS.USDT,
               alt: ""
           }))), "crypto" === a && !1 === m && o.default.createElement("div", {
               className: "gateway-list"
           }, e.filter((e => "USDC:ERC20" !== e)).filter((e => "USDC:BEP20" !== e)).filter((e => "USDT:ERC20" !== e)).filter((e => "USDT:TRC20" !== e)).filter((e => "USDT:BEP20" !== e)).map(((e, t) => o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + (r === e ? "active" : ""),
               onClick: () => {
                   l(e), c(!1)
               }
           }, o.default.createElement("img", {
               src: s.PAYMENT_ICONS[e],
               alt: ""
           }), "BINANCE_COIN" === e ? o.default.createElement("span", null, s.PAYMENT_FULL_NAME[e], o.default.createElement("br", null), o.default.createElement("small", null, "(BNB)")) : "BITCOIN_LN" === e ? o.default.createElement("span", null, s.PAYMENT_FULL_NAME.BITCOIN, o.default.createElement("br", null), o.default.createElement("small", {
               style: {
                   whiteSpace: "nowrap"
               }
           }, "(Lightning Network)")) : s.PAYMENT_FULL_NAME[e]))), o.default.createElement(wr, {
               USDCModal: u,
               showUSDCModal: e => {
                   c(e), p(!1)
               },
               crypto: e,
               gateway: r,
               setGateway: l,
               config: s
           }), o.default.createElement(Sr, {
               USDTModal: d,
               showUSDTModal: e => {
                   p(e), c(!1)
               },
               crypto: e,
               gateway: r,
               setGateway: l,
               config: s
           })))
       },
       wr = ({
           USDCModal: e,
           showUSDCModal: t,
           gateway: a,
           setGateway: n,
           crypto: l,
           config: r
       }) => {
           let i = l.includes("USDC:ERC20"),
               s = l.includes("USDC:BEP20"),
               u = i && s,
               c = () => {
                   u ? t(!0) : l.includes("USDC:ERC20") ? n("USDC:ERC20") : n("USDC:BEP20")
               },
               d = [{
                   type: "BEP20",
                   title: "Binance Smart Chain",
                   full: "USDC:BEP20"
               }, {
                   type: "ERC20",
                   title: "Ethereum Chain",
                   full: "USDC:ERC20"
               }];
           return l.includes("USDC:ERC20") || l.includes("USDC:BEP20") ? o.default.createElement("div", {
               className: `gateway-list-item ${"USDC:BEP20"===a||"USDC:ERC20"===a?"active":""} ${e?"w-100 d-flex flex-column align-items-start":""}`,
               onClick: c
           }, u ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDC,
               alt: ""
           }), o.default.createElement("span", null, "USDC")) : s ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDC,
               alt: ""
           }), o.default.createElement("span", null, "USDC (BEP20) ", o.default.createElement("br", null), o.default.createElement("small", {
               style: {
                   whiteSpace: "nowrap"
               }
           }, "Binance Smart Chain"))) : i ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDC,
               alt: ""
           }), o.default.createElement("span", null, "USDC (ERC20) ", o.default.createElement("br", null), o.default.createElement("small", {
               style: {
                   whiteSpace: "nowrap"
               }
           }, "Ethereum Chain"))) : null, o.default.createElement("div", {
               className: "gateway-list-item-extended"
           }, e && d.map((({
               type: e,
               title: t,
               full: l
           }) => o.default.createElement("div", {
               className: `gateway-list-item ${a===l?"active":""} `,
               onClick: () => n(l)
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDC
           }), o.default.createElement("span", null, e, " ", o.default.createElement("br", null), o.default.createElement("small", null, t))))))) : null
       },
       Sr = ({
           USDTModal: e,
           showUSDTModal: t,
           gateway: a,
           setGateway: n,
           crypto: l,
           config: r
       }) => {
           let i = l.includes("USDT:ERC20"),
               s = l.includes("USDT:BEP20"),
               u = l.includes("USDT:TRC20"),
               c = [i, s, u].filter((e => e)).length > 1,
               d = () => {
                   c ? t(!0) : l.includes("USDT:ERC20") ? n("USDT:ERC20") : l.includes("USDT:BEP20") ? n("USDT:BEP20") : n("USDT:TRC20")
               },
               p = [];
           return s && p.push({
               type: "BEP20",
               title: "Binance Smart Chain",
               full: "USDT:BEP20"
           }), i && p.push({
               type: "ERC20",
               title: "Ethereum Chain",
               full: "USDT:ERC20"
           }), u && p.push({
               type: "TRC20",
               title: "Tron Chain",
               full: "USDT:TRC20"
           }), l.includes("USDT:ERC20") || l.includes("USDT:BEP20") || l.includes("USDT:TRC20") ? o.default.createElement("div", {
               className: `gateway-list-item ${"USDT:BEP20"===a||"USDT:ERC20"===a||"USDT:TRC20"===a?"active":""} ${e?"w-100 d-flex flex-column align-items-start":""}`,
               onClick: d
           }, c ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDT,
               alt: ""
           }), o.default.createElement("span", null, "USDT")) : s ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDT,
               alt: ""
           }), o.default.createElement("span", null, "USDT (BEP20) ", o.default.createElement("br", null), o.default.createElement("small", {
               style: {
                   whiteSpace: "nowrap"
               }
           }, "Binance Smart Chain"))) : i ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDT,
               alt: ""
           }), o.default.createElement("span", null, "USDT (ERC20) ", o.default.createElement("br", null), o.default.createElement("small", {
               style: {
                   whiteSpace: "nowrap"
               }
           }, "Ethereum Chain"))) : u ? o.default.createElement("div", {
               className: "d-flex align-items-center"
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDT,
               alt: ""
           }), o.default.createElement("span", null, "USDT (TRC20) ", o.default.createElement("br", null), o.default.createElement("small", {
               style: {
                   whiteSpace: "nowrap"
               }
           }, "Tron Chain"))) : null, o.default.createElement("div", {
               className: "gateway-list-item-extended"
           }, e && p.map((({
               type: e,
               title: t,
               full: l
           }) => o.default.createElement("div", {
               className: `gateway-list-item ${a===l?"active":""} `,
               onClick: () => n(l)
           }, o.default.createElement("img", {
               src: r.PAYMENT_ICONS.USDT
           }), o.default.createElement("span", null, e, " ", o.default.createElement("br", null), o.default.createElement("small", null, t))))))) : null
       },
       Nr = ({
           isSubscription: e,
           isPayPalCreditCardAvailable: t,
           isPayPal: a,
           APM: n,
           hideCredit: l,
           setGateway: r,
           gateway: i,
           payPalAvailable: s,
           deep: u,
           setDeep: c,
           config: d
       }) => {
           if (!a) return null;
           let p = ["PAYPAL", "CARD", "PAYLATER", "CREDIT"];
           s = s.filter((e => p.find((t => t === e))));
           let m = !1;
           s.includes("CARD") && !l || (m = !0), e && t && (s.push("CARD"), s.push("PAYPAL"), m = !1);
           let f = m && "PAYPAL" === i && !n || "PAYPAL" === i && ("CREDIT" === n || "PAYLATER" === n) || "PAYPAL_CREDIT_CARD" === i;
           return o.default.createElement("div", {
               className: `${f?"active":""} ${s.includes(i)&&!n?"active":""}`
           }, o.default.createElement("div", {
               className: "d-flex " + (m ? "flex-row-reverse justify-content-between" : "flex-wrap"),
               onClick: () => {
                   m ? r("PAYPAL") : c()
               }
           }, m && o.default.createElement("div", {
               className: "gateway-icons big"
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.PAYPAL,
               alt: ""
           })), o.default.createElement("div", null, o.default.createElement("div", {
               className: "gateway-title"
           }, "PayPal"), o.default.createElement("div", {
               className: "gateway-subtitle"
           }, m ? "Use your PayPal account" : "PayPal", s.map((e => "CARD" !== e || l ? "PAYLATER" === e ? ", Pay Later" : "CREDIT" === e ? ", PayPal Credit" : "" : ", Credit Card with PayPal")))), m || "paypal" === u && !1 === m ? null : o.default.createElement("div", {
               className: "gateway-icons"
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.PAYPAL,
               alt: ""
           }), l ? null : o.default.createElement("img", {
               src: d.PAYMENT_ICONS.CARD,
               alt: ""
           }))), "paypal" === u && !1 === m && o.default.createElement("div", {
               className: "gateway-list"
           }, s.map(((e, t) => "CARD" !== e || l ? "PAYLATER" === e ? o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + ("PAYPAL" === i && n === e ? "active" : ""),
               onClick: () => r("PAYPAL", e)
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.PAYPAL,
               alt: ""
           }), "Pay Later") : "CREDIT" === e ? o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + ("PAYPAL" === i && n === e ? "active" : ""),
               onClick: () => r("PAYPAL", e)
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.PAYPAL,
               alt: ""
           }), "PayPal Credit") : "PAYPAL" === e ? o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + ("PAYPAL" !== i || n ? "" : "active"),
               onClick: () => r("PAYPAL")
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.PAYPAL,
               alt: ""
           }), "PayPal") : void 0 : o.default.createElement("div", {
               key: t,
               className: "gateway-list-item " + ("PAYPAL_CREDIT_CARD" === i ? "active" : ""),
               onClick: () => r("PAYPAL_CREDIT_CARD")
           }, o.default.createElement("img", {
               src: d.PAYMENT_ICONS.CARD,
               alt: ""
           }), "Credit Card with PayPal")))))
       },
       Ar = ({
           APM: e,
           isStripe: a,
           gateway: n,
           setGateway: l,
           setDeep: r,
           config: i
       }) => {
           const [s, u] = t.useState("");
           if (t.useEffect((() => {
                   navigator.userAgent.indexOf("Chrome") > -1 ? u("chrome") : navigator.userAgent.indexOf("Safari") > -1 && u("safari")
               }), []), !a) return null;
           let c = "STRIPE" === n && !e;
           return o.default.createElement("div", {
               className: "" + (c ? "active" : ""),
               onClick: () => {
                   l("STRIPE"), r()
               }
           }, o.default.createElement("div", {
               className: "gateway-title"
           }, "Credit/Debit Cards", "chrome" === s ? ", Google Pay" : "safari" === s ? ", Apple Pay" : ""), o.default.createElement("div", {
               className: "gateway-subtitle"
           }, "Pay with Visa, Mastercard, Amex or use ", "chrome" === s ? "Google Pay" : "safari" === s ? "Apple Pay" : "Apple Pay or Google Pay", " if they are enabled on your device."), o.default.createElement("div", {
               className: "gateway-icons"
           }, o.default.createElement("img", {
               src: i.CARDS.VISA,
               alt: "",
               className: "rectangle"
           }), o.default.createElement("img", {
               src: i.CARDS.MASTERCARD,
               alt: "",
               className: "rectangle"
           }), o.default.createElement("img", {
               src: i.CARDS.AMERICANEXPRESS,
               alt: "",
               className: "rectangle",
               style: {
                   width: "2rem",
                   marginLeft: "-0.5rem"
               }
           }), "chrome" === s ? o.default.createElement("img", {
               src: i.CARDS.GOOGLEPAY,
               alt: "",
               className: "rectangle",
               style: {
                   width: "1.5rem",
                   marginLeft: -5
               }
           }) : null, "safari" === s ? o.default.createElement("img", {
               src: i.CARDS.APPLEPAY,
               alt: "",
               className: "rectangle",
               style: {
                   width: "2rem",
                   marginLeft: -9
               }
           }) : null))
       },
       kr = ({
           isSkrill: e,
           gateway: t,
           setGateway: a,
           setDeep: n,
           config: l
       }) => e ? o.default.createElement("div", {
           className: "" + ("SKRILL" === t ? "active" : ""),
           onClick: () => {
               a("SKRILL"), n()
           }
       }, o.default.createElement("div", {
           className: "d-flex flex-row-reverse justify-content-between "
       }, o.default.createElement("div", {
           className: "gateway-icons big"
       }, o.default.createElement("img", {
           src: l.PAYMENT_ICONS.SKRILL,
           alt: ""
       })), o.default.createElement("div", null, o.default.createElement("div", {
           className: "gateway-title"
       }, "Skrill"), o.default.createElement("div", {
           className: "gateway-subtitle"
       }, "Proceed with the purchase using your Skrill wallet")))) : null,
       xr = ({
           isCashApp: e,
           gateway: t,
           setGateway: a,
           setDeep: n,
           config: l
       }) => e ? o.default.createElement("div", {
           className: "" + ("CASH_APP" === t ? "active" : ""),
           onClick: () => {
               a("CASH_APP"), n()
           }
       }, o.default.createElement("div", {
           className: "d-flex flex-row-reverse justify-content-between "
       }, o.default.createElement("div", {
           className: "gateway-icons big"
       }, o.default.createElement("img", {
           src: l.PAYMENT_ICONS.CASH_APP,
           alt: ""
       })), o.default.createElement("div", null, o.default.createElement("div", {
           className: "gateway-title"
       }, "Cash App"), o.default.createElement("div", {
           className: "gateway-subtitle"
       }, "Pay through Cash App using your mobile device for instant payments")))) : null,
       Pr = ({
           isPerfectMoney: e,
           gateway: t,
           setGateway: a,
           setDeep: n,
           config: l
       }) => e ? o.default.createElement("div", {
           className: "" + ("PERFECT_MONEY" === t ? "active" : ""),
           onClick: () => {
               a("PERFECT_MONEY"), n()
           }
       }, o.default.createElement("div", {
           className: "d-flex flex-row-reverse justify-content-between "
       }, o.default.createElement("div", {
           className: "gateway-icons big"
       }, o.default.createElement("img", {
           src: l.PAYMENT_ICONS.PERFECT_MONEY,
           alt: ""
       })), o.default.createElement("div", null, o.default.createElement("div", {
           className: "gateway-title"
       }, "Perfect Money"), o.default.createElement("div", {
           className: "gateway-subtitle"
       }, "Use your Perfect Money account to proceed with the purchase")))) : null,
       Tr = ({
           payPalAvailable: e,
           setGateway: t,
           APM: a,
           gateway: n,
           setDeep: l,
           config: r
       }) => e.includes("VENMO") ? o.default.createElement("div", {
           className: "" + ("PAYPAL" === n && "VENMO" === a ? "active" : ""),
           onClick: () => {
               t("PAYPAL", "VENMO"), l()
           }
       }, o.default.createElement("div", {
           className: "d-flex flex-row-reverse justify-content-between "
       }, o.default.createElement("div", {
           className: "gateway-icons big"
       }, o.default.createElement("img", {
           src: r.PAYMENT_ICONS.PAYPAL_EXTRA.VENMO,
           alt: ""
       })), o.default.createElement("div", null, o.default.createElement("div", {
           className: "gateway-title"
       }, "Venmo"), o.default.createElement("div", {
           className: "gateway-subtitle"
       }, "Available for some US customers and USD purchases only")))) : null,
       _r = ({
           isSubscription: e,
           isBinance: t,
           setGateway: a,
           gateway: n,
           setDeep: l,
           config: r
       }) => !t || e ? null : o.default.createElement("div", {
           className: "" + ("BINANCE" === n ? "active" : ""),
           onClick: () => {
               a("BINANCE"), l()
           }
       }, o.default.createElement("div", {
           className: "d-flex flex-row-reverse justify-content-between"
       }, o.default.createElement("div", {
           className: "gateway-icons big"
       }, o.default.createElement("img", {
           src: r.PAYMENT_ICONS.BINANCE,
           alt: ""
       })), o.default.createElement("div", null, o.default.createElement("div", {
           className: "gateway-title"
       }, "Binance Pay"), o.default.createElement("div", {
           className: "gateway-subtitle isBinancePay"
       }, "If you do not have a Binance account, ", o.default.createElement("a", {
           href: "https://accounts.binance.com/en/register?ref=395915096",
           target: "_blank"
       }, "register here"), " and send crypto transactions with 0% fees."))));

   function Lr(e, t) {
       void 0 === t && (t = {});
       var a = t.insertAt;
       if (e && "undefined" != typeof document) {
           var n = document.head || document.getElementsByTagName("head")[0],
               l = document.createElement("style");
           l.type = "text/css", "top" === a && n.firstChild ? n.insertBefore(l, n.firstChild) : n.appendChild(l), l.styleSheet ? l.styleSheet.cssText = e : l.appendChild(document.createTextNode(e))
       }
   }
   Lr("");
   const Dr = ({
           type: e,
           config: a,
           theme: n,
           cartProducts: l,
           productInfo: r,
           invoiceInfo: i,
           paymentOptions: s,
           isSubscription: u,
           gateway: c,
           APM: d,
           setGateway: p,
           appliedCoupon: m
       }) => {
           const f = window.location.pathname;
           let h;
           "product" === e ? h = r.available_stripe_apm || [] : "checkout" === e ? h = (l.find((({
               available_stripe_apm: e
           }) => e ? e.length : null)) || {}).available_stripe_apm || [] : "invoice" === e && (h = i.available_stripe_apm || []);
           const v = h.map((({
                   id: e
               }) => a.STRIPE_APM_PARSE[e])),
               [y, b] = t.useState([]),
               [g, E] = t.useState(null);
           t.useEffect((() => {
               if (window.paypal && !u) {
                   let e = [];
                   window.paypal.FUNDING && Object.keys(window.paypal.FUNDING).map((t => {
                       window.paypal.Buttons({
                           fundingSource: window.paypal.FUNDING[t]
                       }).isEligible() && e.push(t)
                   })), b([...e])
               }
           }), [window && window.paypal]);
           const C = f.includes("discover"),
               w = s.includes("BINANCE"),
               S = s.includes("PAYPAL") && (!u || !m && u),
               N = s.includes("STRIPE"),
               A = s.includes("PAYPAL_CREDIT_CARD"),
               k = s.filter((e => ["BITCOIN", "BINANCE_COIN", "LITECOIN", "TRON", "BITCOIN_LN", "CONCORDIUM", "USDC:BEP20", "USDC:ERC20", "USDT:BEP20", "USDT:ERC20", "USDT:TRC20", "ETHEREUM", "CRONOS", "BITCOIN_CASH", "MONERO", "NANO", "SOLANA", "RIPPLE"].includes(e)));
           return o.default.createElement("div", {
               className: "gateway-container unselectable"
           }, o.default.createElement(Cr, {
               crypto: k,
               isMarketplace: C,
               setGateway: p,
               gateway: c,
               deep: g,
               setDeep: () => E("crypto" === g ? null : "crypto"),
               APM: d,
               config: a,
               theme: n
           }), o.default.createElement(_r, {
               isSubscription: u,
               isBinance: w,
               setGateway: p,
               gateway: c,
               setDeep: () => E("binance" === g ? null : "binance"),
               deep: g,
               config: a,
               theme: n
           }), o.default.createElement(Ar, {
               isStripe: N,
               gateway: c,
               setGateway: p,
               setDeep: () => E("stripe" === g ? null : "stripe"),
               APM: d,
               config: a,
               theme: n
           }), o.default.createElement(Nr, {
               isPayPal: S,
               isSubscription: u,
               isPayPalCreditCardAvailable: A,
               payPalAvailable: y,
               hideCredit: N,
               setGateway: p,
               gateway: c,
               deep: g,
               setDeep: () => E("paypal" === g ? null : "paypal"),
               APM: d,
               config: a,
               theme: n
           }), o.default.createElement(Er, {
               isPayPal: S,
               isStripe: N,
               isSubscription: u,
               payPalAvailable: y,
               stripeAvailable: v,
               setGateway: p,
               gateway: c,
               setDeep: () => E("extra" === g ? null : "extra"),
               deep: g,
               APM: d,
               config: a,
               theme: n
           }), o.default.createElement(Tr, {
               isPayPal: S,
               payPalAvailable: y,
               setGateway: p,
               gateway: c,
               setDeep: () => E("venmo" === g ? null : "venmo"),
               deep: g,
               APM: d,
               config: a,
               theme: n
           }), o.default.createElement(xr, {
               isCashApp: s.includes("CASH_APP"),
               setGateway: p,
               gateway: c,
               setDeep: () => E("cashapp"),
               config: a,
               theme: n
           }), o.default.createElement(Pr, {
               isPerfectMoney: s.includes("PERFECT_MONEY"),
               setGateway: p,
               gateway: c,
               setDeep: () => E("perfect_money"),
               config: a,
               theme: n
           }), o.default.createElement(kr, {
               isSkrill: s.includes("SKRILL"),
               setGateway: p,
               gateway: c,
               setDeep: () => E("skrill"),
               config: a,
               theme: n
           }), N && ("KLARNA" === d || "AFTERPAY_CLEARPAY" === d || "SOFORT" === d) && o.default.createElement("div", {
               style: {
                   fontSize: ".7rem",
                   borderColor: "#fcab0a",
                   borderWidth: 2,
                   background: "#fcab0a29"
               }
           }, a.PAYMENT_FULL_NAME.STRIPE_EXTRA[d], " payments take 2 to 14 days for the transaction to be processed and completed, depending on your bank. Once you have sent the payment, please wait for the invoice to be marked as paid."))
       },
       Or = () => {
           const [, e] = t.useState(!1);
           return () => e((e => !e))
       };

   function Ir() {
       return Ir = Object.assign || function(e) {
           for (var t = 1; t < arguments.length; t++) {
               var a = arguments[t];
               for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
           }
           return e
       }, Ir.apply(this, arguments)
   }
   Lr("");
   const Rr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M7.5 10H12.5",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M10 7.5V12.5",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Mr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "currentColor",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M4.16675 10H15.8334",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M10.8333 15L15.8333 10",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M10.8333 5L15.8333 10",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Fr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M7.5 10L9.16667 11.6667L12.5 8.33333",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Ur = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: {
               ...n,
               transform: "scale(1.25)"
           },
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M6.75 9H11.25",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M9 6.75V11.25",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Br = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M9.81567 10.3947L16.1315 6.44737",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M3.5 6.44737L9.81579 10.3947V17.5L16.1316 13.5526V6.44737L9.81579 2.5L3.5 6.44737Z",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M3.5 6.44737V13.5526L9.81579 17.5",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       jr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "null",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M5.83333 6.66666L2.5 10L5.83333 13.3333",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M14.1667 6.66666L17.5001 10L14.1667 13.3333",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M11.6666 3.33334L8.33325 16.6667",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       qr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "currentColor",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M10 4.16667V15.8333",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M4.16675 10H15.8334",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Yr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M3.375 9.16667C3.58574 7.55895 4.37518 6.08315 5.59557 5.01552C6.81595 3.94789 8.38359 3.36163 10.0051 3.36647C11.6265 3.37132 13.1906 3.96695 14.4046 5.04186C15.6186 6.11677 16.3992 7.59726 16.6003 9.20621C16.8014 10.8152 16.4093 12.4423 15.4972 13.7829C14.5852 15.1236 13.2158 16.0859 11.6455 16.4897C10.0751 16.8935 8.41136 16.7112 6.96573 15.9768C5.5201 15.2424 4.39166 14.0064 3.79167 12.5M3.375 16.6667V12.5H7.54167",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Hr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M3.33325 14.1667V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V14.1667",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M5.83325 7.5L9.99992 3.33333L14.1666 7.5",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M10 3.33333V13.3333",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Wr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M11.6667 2.5V5.83333C11.6667 6.05435 11.7545 6.26631 11.9108 6.42259C12.0671 6.57887 12.2791 6.66667 12.5001 6.66667H15.8334",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M14.1667 17.5H5.83341C5.39139 17.5 4.96746 17.3244 4.6549 17.0118C4.34234 16.6993 4.16675 16.2754 4.16675 15.8333V4.16667C4.16675 3.72464 4.34234 3.30072 4.6549 2.98816C4.96746 2.67559 5.39139 2.5 5.83341 2.5H11.6667L15.8334 6.66667V15.8333C15.8334 16.2754 15.6578 16.6993 15.3453 17.0118C15.0327 17.3244 14.6088 17.5 14.1667 17.5Z",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M7.5 5.83333H8.33333",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M7.5 10.8333H12.5",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M10.8333 14.1667H12.4999",
           stroke: "currentColor",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Gr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M7.74375 3.23775C8.06325 1.92075 9.93675 1.92075 10.2563 3.23775C10.3042 3.4356 10.3982 3.61933 10.5305 3.774C10.6629 3.92867 10.8299 4.04989 11.018 4.12781C11.2061 4.20573 11.4099 4.23814 11.6128 4.2224C11.8158 4.20667 12.0122 4.14323 12.186 4.03725C13.3432 3.33225 14.6685 4.65675 13.9635 5.81475C13.8577 5.98849 13.7943 6.18475 13.7786 6.38758C13.7629 6.59041 13.7953 6.79408 13.8731 6.98203C13.951 7.16999 14.0721 7.33693 14.2265 7.46929C14.381 7.60164 14.5646 7.69568 14.7623 7.74375C16.0793 8.06325 16.0793 9.93675 14.7623 10.2563C14.5644 10.3042 14.3807 10.3982 14.226 10.5305C14.0713 10.6629 13.9501 10.8299 13.8722 11.018C13.7943 11.2061 13.7619 11.4099 13.7776 11.6128C13.7933 11.8158 13.8568 12.0122 13.9628 12.186C14.6678 13.3432 13.3432 14.6685 12.1852 13.9635C12.0115 13.8577 11.8152 13.7943 11.6124 13.7786C11.4096 13.7629 11.2059 13.7953 11.018 13.8731C10.83 13.951 10.6631 14.0721 10.5307 14.2265C10.3984 14.381 10.3043 14.5646 10.2563 14.7623C9.93675 16.0793 8.06325 16.0793 7.74375 14.7623C7.69581 14.5644 7.60183 14.3807 7.46947 14.226C7.3371 14.0713 7.17008 13.9501 6.98201 13.8722C6.79394 13.7943 6.59013 13.7619 6.38716 13.7776C6.1842 13.7933 5.98781 13.8568 5.814 13.9628C4.65675 14.6678 3.3315 13.3432 4.0365 12.1852C4.14233 12.0115 4.20566 11.8152 4.22136 11.6124C4.23706 11.4096 4.20468 11.2059 4.12685 11.018C4.04903 10.83 3.92795 10.6631 3.77345 10.5307C3.61896 10.3984 3.43542 10.3043 3.23775 10.2563C1.92075 9.93675 1.92075 8.06325 3.23775 7.74375C3.4356 7.69581 3.61933 7.60183 3.774 7.46947C3.92867 7.3371 4.04989 7.17008 4.12781 6.98201C4.20573 6.79394 4.23814 6.59013 4.2224 6.38716C4.20667 6.1842 4.14323 5.98781 4.03725 5.814C3.33225 4.65675 4.65675 3.3315 5.81475 4.0365C6.56475 4.4925 7.53675 4.089 7.74375 3.23775Z",
           stroke: "#555D67",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z",
           stroke: "#555D67",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       Vr = ({
           width: e = 20,
           height: t = 20,
           className: a,
           style: n
       }) => o.default.createElement("svg", {
           width: e,
           height: t,
           className: a,
           style: n,
           viewBox: "0 0 18 18",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M3 5.25H15",
           stroke: "#D24242",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M7.5 8.25V12.75",
           stroke: "#D24242",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M10.5 8.25V12.75",
           stroke: "#D24242",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M3.75 5.25L4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25L14.25 5.25",
           stroke: "#D24242",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       }), o.default.createElement("path", {
           d: "M6.75 5.25V3C6.75 2.80109 6.82902 2.61032 6.96967 2.46967C7.11032 2.32902 7.30109 2.25 7.5 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V5.25",
           stroke: "#D24242",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       $r = ({
           size: e = "medium",
           variant: a = "primary",
           type: n = "button",
           iconPosition: l = "right",
           iconName: r,
           className: i,
           children: s,
           style: u,
           skip: c,
           square: d,
           ...p
       }) => {
           const [m, f] = t.useState(null);
           t.useEffect((() => {
               let e = !1,
                   t = !1,
                   a = document.createElement("span");
               if ([...document.body.classList].includes("dark"), !m) return;
               const n = n => {
                       if (2 === n.button || !a.animate) return !1;
                       e = !0, a.classList.add("ripple-effect");
                       let l = m.getBoundingClientRect(),
                           o = n.x - l.left,
                           r = n.y - l.top,
                           i = Math.max(l.width, l.height) * Math.PI * 1.5;
                       a.style.left = `${o}px`, a.style.top = `${r}px`, a.style.backgroundColor = "white", a.style.opacity = "0.175", t || (t = !0, m.appendChild(a)), a.animate({
                           height: ["0px", `${i}px`],
                           width: ["0px", `${i}px`]
                       }, {
                           duration: 700
                       }).onfinish = () => {
                           a.style.width = `${i}px`, a.style.height = `${i}px`
                       }
                   },
                   l = () => {
                       if (!e) return;
                       a.animate({
                           opacity: [.175, 0]
                       }, {
                           duration: 700 / 3
                       }).onfinish = () => {
                           t && (t = !1, a.remove())
                       }
                   },
                   o = () => {
                       if (!e || !a.animate) return;
                       e = !1, a.animate({
                           opacity: [.175, 0]
                       }, {
                           duration: 700 / 3
                       }).onfinish = () => {
                           t && (t = !1, a.remove())
                       }
                   };
               return m.addEventListener("mousedown", n), m.addEventListener("mouseup", o), m.addEventListener("mouseover", l), () => {
                   m.removeEventListener("mousedown", n), m.removeEventListener("mouseup", o), m.removeEventListener("mouseover", l)
               }
           }), [m, c]);
           const h = ["button", e, a];
           i && h.push(i);
           const v = {};
           "right" === l ? v.marginLeft = "0.5rem" : v.marginRight = "0.5rem";
           let y = null;
           switch (r) {
               case "plus":
                   y = o.default.createElement(qr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "arrow":
                   y = o.default.createElement(Mr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "cube":
                   y = o.default.createElement(Br, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "embed":
                   y = o.default.createElement(jr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "upload":
                   y = o.default.createElement(Hr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "refresh":
                   y = o.default.createElement(Yr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "add-circular":
                   y = o.default.createElement(Rr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "check-circular":
                   y = o.default.createElement(Fr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "plus-circular":
                   y = o.default.createElement(Ur, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "invoice":
                   y = o.default.createElement(Wr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "settings":
                   y = o.default.createElement(Gr, {
                       className: "icon",
                       style: v
                   });
                   break;
               case "delete":
                   y = o.default.createElement(Vr, {
                       className: "icon",
                       style: v
                   })
           }
           return y && h.push("withIcon"), d && h.push("square"), o.default.createElement("button", Ir({
               type: n,
               style: u,
               className: h.join(" ")
           }, p, {
               ref: f
           }), "left" === l && y, s, "right" === l && y)
       };
   Lr("");
   const zr = ({
       purple: e,
       big: t
   }) => o.default.createElement("div", {
       className: `sk-circle-fade ${e?"purple":""} ${t?"big":""}`
   }, o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }), o.default.createElement("div", {
       className: "sk-circle-fade-dot"
   }));

   function Kr(e) {
       return t.useCallback((() => {
           e ? e() : window.location.href = "/"
       }), [e])
   }

   function Xr(e, a, n, l = 0) {
       return t.useCallback((() => {
           e || l ? a(2) : n({
               type: "error",
               text: "Please select payment method!"
           })
       }), [e, n, a, l])
   }

   function Jr(e, a, n) {
       const [l, o] = t.useState({
           name: "",
           surname: "",
           address_line1: "",
           address_city: "",
           address_country: "",
           address_postal_code: "",
           address_state: ""
       }), r = t.useMemo((() => (e || []).filter((({
           country_regulations: e
       }) => e)).map((({
           country_regulations: e
       }) => e))), [e]), i = t.useMemo((() => "STRIPE" === a && r.length), [r, a]), s = t.useMemo((() => n || r.includes("IN")), [r, n, a]);
       let u;
       return u = s ? l.name && l.surname && l.address_line1 && l.address_city && l.address_country && l.address_postal_code && l.address_state : l.name && l.surname, [l, o, i, u, s]
   }

   function Zr({
       config: e,
       isCustomDomain: a,
       email: n,
       gateway: l,
       APM: o,
       customFields: r,
       appliedCoupon: i,
       hasDiscount: s,
       payPalEmailDelivery: u,
       isVisibleRegulationForm: c = !1,
       isExtendedRegulationForm: d = !1,
       regulationForm: p = {},
       setSending: m,
       onCreateInvoice: f,
       onCreateInvoiceTrial: h,
       onShowMessage: v,
       onSuccess: y,
       onFail: b,
       type: g,
       products: E,
       product: C,
       addons: w,
       quantity: S = 1,
       trialPeriod: N = 0,
       discordIntegrationCode: A
   }) {
       const [k, x] = t.useState(null), P = t.useCallback((({
           token: t,
           onSuccessCreateInvoice: a,
           onFailCreateInvoice: k
       }) => {
           let P = r;
           c && (P = {
               ...r,
               name: p.name,
               surname: p.surname
           });
           let T = {
                   custom_fields: JSON.stringify({
                       custom_fields: P
                   }),
                   gateway: l || "",
                   email: n
               },
               _ = {},
               L = {};
           "checkout" === g ? (T.cart = JSON.stringify({
               products: E.map((e => ({
                   uniqid: e.uniqid,
                   unit_quantity: e.quantity
               })))
           }), _ = Object.fromEntries(E.map((e => [e.uniqid, w[e.uniqid] || []]))), L = Object.fromEntries(E.map((e => [e.uniqid, e.priceVariant ? e.priceVariant.title : null])))) : "product" === g ? (T.product_id = C.uniqid, T.quantity = S, _[C.uniqid] = w[C.uniqid], L[C.uniqid] = C.priceVariant ? C.priceVariant.title : null) : "subscription" === g && (T.product_id = C.uniqid, T.quantity = 1, _[C.uniqid] = w[C.uniqid]);
           const D = Object.keys(_).filter((e => (_[e] || []).length)),
               O = Object.keys(L).filter((e => Boolean(L[e])));
           O.length && (T.product_variants = JSON.stringify(Object.fromEntries(O.map((e => [e, L[e]]))))), D.length && (T.product_addons = JSON.stringify(Object.fromEntries(D.map((e => [e, _[e].map((({
               uniqid: e
           }) => e)).join(",")]))))), c && d && (T.name = p.name, T.surname = p.surname, T.address_line1 = p.address_line1, T.address_city = p.address_city, T.address_country = p.address_country, T.address_postal_code = p.address_postal_code, T.address_state = p.address_state);
           let I = !1;
           return "checkout" === g ? I = E.find((({
               shop_force_paypal_email_delivery: e
           }) => !!e)) : "product" !== g && "subscription" !== g || (I = !!+C.shop_force_paypal_email_delivery), !i || i.disabled_with_volume_discounts && s || (T.coupon_code = i.code), "PAYPAL" === T.gateway && (T.credit_card = !1, o && (T.paypal_apm = e.PAYPAL_APM[o]), I || (T.paypal_email_delivery = u)), "PAYPAL_CREDIT_CARD" === T.gateway && (T.credit_card = !0, T.gateway = "PAYPAL", I || (T.paypal_email_delivery = u)), "STRIPE" === T.gateway && o && (T.stripe_apm = e.STRIPE_APM[o]), m(!0), T.discord_integration_code = A || null, N ? h({
               product_id: C.uniqid,
               custom_fields: T.custom_fields
           }, t).then((({
               data: e,
               status: t,
               error: a,
               message: n
           }) => {
               200 === t ? (v({
                   type: "success",
                   text: n
               }), x("success"), y({
                   type: "invoice-trial"
               })) : (v({
                   type: "error",
                   text: a || "Server error!"
               }), b())
           })).catch((e => {
               x("error"), v({
                   type: "error",
                   text: e ? e.error || e.message : "Server error!"
               }), b()
           })).finally((() => m(!1))) : f(T, t).then((e => {
               const {
                   data: t,
                   status: n,
                   error: l,
                   message: o
               } = e;
               if (200 === n) {
                   const {
                       invoice: e
                   } = t;
                   o && v({
                       type: "success",
                       text: o
                   }), a && a(), y({
                       type: "invoice",
                       invoice: e
                   })
               } else console.log(e), v({
                   type: "error",
                   text: l || "Server error!"
               }), b()
           })).catch((e => {
               k && k(), v({
                   type: "error",
                   text: e ? e.error || e.message : "Server error!"
               }), b()
           })).finally((() => m(!1)))
       }), [r, l, n, g, w, c, d, i, s, m, N, E, C, C, S, p.name, p.surname, p.address_line1, p.address_city, p.address_country, p.address_postal_code, p.address_state, o, e.PAYPAL_APM, e.STRIPE_APM, u, h, v, y, b, f, A]);
       return [P, k]
   }

   function Qr(e) {
       const [a, n] = t.useState({});
       return t.useEffect((() => {
           const t = {};
           e.map((e => {
               let a = [];
               if (e.custom_fields && (a = JSON.parse(e.custom_fields).custom_fields), e.custom_fields = JSON.stringify({
                       custom_fields: a
                   }), a.length && a.forEach((e => {
                       "checkbox" === e.type || e.type && "checkbox" === e.type.value ? t[e.name] = e.default || !1 : t[e.name] = e.default
                   })), window && window.location && window.location.search) {
                   window.location.search.substr(1).split("&").map((e => {
                       let a = e.split("=")[0].replace(/-/g, "_"),
                           n = e.split("=")[1];
                       a && (t[a] = decodeURIComponent(n))
                   }))
               }
           })), n(t)
       }), [e]), [a, n]
   }

   function ei() {
       const e = {};
       return window.location.search.replace("?", "").split("&").forEach((t => {
           const a = t.split(/=(.*)/s)[0];
           (e => {
               e = e.toString();
               const t = Math.abs(e),
                   a = parseInt(e, 10);
               return !isNaN(t) && a === t && t.toString() === e
           })(a) ? e[a] = parseInt(t.split(/=(.*)/s)[1]): e[a] = t.split(/=(.*)/s)[1]
       })), e
   }
   Lr("");
   const ti = ({
       isCart: e,
       currency: a,
       appliedCoupon: n,
       setCoupon: l,
       openCoupon: r,
       disabledWithDiscount: i,
       state: s,
       setState: c,
       showPayPalWarning: d
   }) => {
       const {
           config: p,
           cartProducts: m,
           shopInfo: f,
           productInfo: h,
           onApplyCoupon: v,
           onShowMessage: y
       } = t.useContext(u), b = ei(), [g, E] = t.useState(!1), [C, w] = t.useState(!1), [S, N] = t.useState(!1), [A, k] = t.useState("");
       t.useEffect((() => (k(n ? n.code : ""), E(n), c({
           ...s,
           couponCode: n ? n.code : ""
       }), () => {
           k("")
       })), [n]);
       const x = t.useCallback((() => {
               if (!A) return;
               E(!1), w(!1), N(!0);
               let t = {
                   code: A
               };
               e ? t.cart = JSON.stringify({
                   shop_id: f.id,
                   products: m.map((e => ({
                       uniqid: e.uniqid,
                       unit_quantity: e.quantity
                   })))
               }) : t.product_id = h.uniqid, v(t).then((e => {
                   if (200 === e.status) l(e.data.coupon), E(!0);
                   else {
                       if (400 !== e.status) throw e;
                       l(null), w(!0)
                   }
               })).catch((e => {
                   w(!0), y({
                       type: "error",
                       text: e ? e.error || e.message : "Server error!"
                   })
               })).finally((() => {
                   N(!1)
               }))
           }), [m, A, e, v, h.id, l, f.id]),
           P = b ? b.couponCode : void 0;
       t.useEffect((() => {
           if (P) {
               k(P), c({
                   ...s,
                   couponCode: P
               });
               let t = {
                   code: P
               };
               e ? t.cart = JSON.stringify({
                   shop_id: f.id,
                   products: m.map((e => ({
                       uniqid: e.uniqid,
                       unit_quantity: e.quantity
                   })))
               }) : t.product_id = h.uniqid, v(t).then((e => {
                   if (200 === e.status) l(e.data.coupon), E(!0);
                   else {
                       if (400 !== e.status) throw e;
                       l(null), w(!0)
                   }
               })).catch((e => {
                   w(!0), y({
                       type: "error",
                       text: e ? e.error || e.message : "Server error!"
                   })
               })).finally((() => {
                   N(!1)
               }))
           }
       }), [P]);
       const T = p.CURRENCY_LIST[a];
       return r && o.default.createElement("div", {
           className: "pb-3"
       }, o.default.createElement("div", {
           className: "coupon-form"
       }, o.default.createElement("input", {
           className: "sellix-input",
           type: "text",
           id: "coupon",
           name: "coupon",
           placeholder: "Coupon code",
           onChange: e => {
               c({
                   ...s,
                   couponCode: e.target.value
               }), k(e.target.value)
           },
           value: A
       }), o.default.createElement($r, {
           className: "d-flex align-items-center m-auto",
           onClick: x
       }, S ? o.default.createElement(zr, null) : o.default.createElement("span", null, "Apply ", o.default.createElement("i", {
           className: "fa-regular fa-tags"
       })))), o.default.createElement("div", {
           className: "coupon-result"
       }, !i && g && o.default.createElement("span", {
           className: "text-green"
       }, parseInt(n.discount), "FIXED" === n.discount_type ? T : "%", " Coupon is applied!"), C ? o.default.createElement("span", {
           className: "text-red text-center"
       }, "Coupon not valid: It might be expired, invalid for the cart's products or does not exist.") : null, i ? o.default.createElement("span", {
           className: "text-red text-center"
       }, "This coupon cannot be applied when a volume discount is used") : null, d && o.default.createElement("span", {
           className: "text-red text-center",
           style: {
               paddingLeft: 2
           }
       }, "PayPal won't be an available payment method with coupons")))
   };
   class ai extends t.Component {
       constructor(e) {
           super(e);
           const {
               fields: t,
               type: a,
               isValid: n,
               disabled: l,
               filterKeyCodes: o,
               forceUppercase: r
           } = e;
           let {
               value: i
           } = e;
           r && (i = i.toUpperCase()), this.state = {
               value: i,
               fields: t,
               type: a,
               input: [],
               isValid: n,
               disabled: l,
               filterKeyCodes: o,
               defaultInputStyle: {
                   fontFamily: "monospace",
                   MozAppearance: "textfield",
                   borderRadius: "6px",
                   border: "1px solid",
                   boxShadow: "0px 0px 10px 0px rgba(0,0,0,.10)",
                   margin: "4px",
                   paddingLeft: "8px",
                   paddingRight: 0,
                   width: "36px",
                   height: "42px",
                   fontSize: "32px",
                   boxSizing: "border-box"
               }
           };
           for (let e = 0; e < Number(this.state.fields); e += 1)
               if (e < 32) {
                   const t = this.state.value[e] || "";
                   this.state.input.push(t)
               } this.textInput = [], this.uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e => {
               let t = 16 * Math.random() | 0;
               return ("x" === e ? t : 3 & t | 8).toString(16)
           }))
       }
       UNSAFE_componentWillReceiveProps(e) {
           this.setState({
               isValid: e.isValid,
               value: e.value,
               disabled: e.disabled
           })
       }
       handleBlur(e) {
           this.handleTouch(e.target.value)
       }
       handleTouch(e) {
           const {
               touch: t,
               untouch: a,
               name: n
           } = this.props;
           "function" == typeof t && "function" == typeof a && ("" === e ? t(n) : a(n))
       }
       handleChange(e) {
           const {
               filterChars: t,
               filterCharsIsWhitelist: a
           } = this.props;
           let n = String(e.target.value);
           this.props.forceUppercase && (n = n.toUpperCase()), "number" === this.state.type && (n = n.replace(/[^\d]/g, "")), n = n.split("").filter((e => a ? t.includes(e) : !t.includes(e))).join("");
           let l = n;
           if ("" !== n) {
               const t = this.state.input.slice();
               n.length > 1 ? n.split("").map(((a, n) => (Number(e.target.dataset.id) + n < this.props.fields && (t[Number(e.target.dataset.id) + n] = a), !1))) : t[Number(e.target.dataset.id)] = n, t.map(((e, t) => (this.textInput[t] && (this.textInput[t].value = e), !1)));
               const a = this.textInput[e.target.dataset.id < t.length ? Number(e.target.dataset.id) + 1 : e.target.dataset.id];
               a && (a.focus(), a.select()), l = t.join(""), this.setState({
                   value: t.join(""),
                   input: t
               })
           }
           this.props.onChange && l && this.props.onChange(l), this.handleTouch(l)
       }
       handleKeyDown(e) {
           const t = Number(e.target.dataset.id),
               a = this.textInput[t + 1],
               n = this.textInput[t - 1];
           let l, o;
           switch (this.state.filterKeyCodes.length > 0 && this.state.filterKeyCodes.map((t => {
                   if (t === e.keyCode) return e.preventDefault(), !0
               })), e.keyCode) {
               case 8:
                   e.preventDefault(), this.textInput[t].value = "", l = this.state.input.slice(), l[t] = "", o = l.join(""), this.setState({
                       value: o,
                       input: l
                   }), "" === this.textInput[t].value && n && (n.focus(), n.select()), this.props.onChange && this.props.onChange(o);
                   break;
               case 37:
                   e.preventDefault(), n && (n.focus(), n.select());
                   break;
               case 39:
                   e.preventDefault(), a && (a.focus(), a.select());
                   break;
               case 38:
               case 40:
                   e.preventDefault();
                   break;
               case 69:
                   if ("number" === e.target.type) {
                       e.preventDefault();
                       break
                   }
           }
           this.handleTouch(o)
       }
       render() {
           const {
               className: e,
               style: t = {},
               inputStyle: a = {},
               inputStyleInvalid: n = {},
               type: l,
               autoFocus: r,
               autoComplete: i,
               pattern: s,
               inputMode: u,
               placeholder: c
           } = this.props, {
               disabled: d,
               input: p,
               isValid: m,
               defaultInputStyle: f
           } = this.state, h = {
               container: {
                   display: "inline-block",
                   ...t
               },
               input: m ? a : n
           };
           return e || 0 !== Object.keys(a).length || Object.assign(a, {
               ...f,
               color: "black",
               backgroundColor: "white",
               borderColor: "lightgrey"
           }), e || 0 !== Object.keys(n).length || Object.assign(n, {
               ...f,
               color: "#b94a48",
               backgroundColor: "#f2dede",
               borderColor: "#eed3d7"
           }), d && Object.assign(h.input, {
               cursor: "not-allowed",
               color: "lightgrey",
               borderColor: "lightgrey",
               backgroundColor: "#efeff1"
           }), o.default.createElement("div", {
               className: `react-code-input ${e}`,
               style: h.container
           }, p.map(((e, t) => o.default.createElement("input", {
               ref: e => {
                   this.textInput[t] = e
               },
               id: `${this.uuid}-${t}`,
               "data-id": t,
               autoFocus: r && 0 === t ? "autoFocus" : "",
               value: e,
               key: `input_${t}`,
               type: l,
               min: 0,
               max: 9,
               maxLength: p.length === t + 1 ? 1 : p.length,
               style: h.input,
               autoComplete: i,
               onFocus: e => e.target.select(e),
               onBlur: e => this.handleBlur(e),
               onChange: e => this.handleChange(e),
               onKeyDown: e => this.handleKeyDown(e),
               disabled: d,
               "data-valid": m,
               pattern: s,
               inputMode: u,
               placeholder: c
           }))))
       }
   }
   ai.defaultProps = {
       autoComplete: "off",
       autoFocus: !0,
       isValid: !0,
       disabled: !1,
       forceUppercase: !1,
       fields: 4,
       value: "",
       type: "text",
       filterKeyCodes: [189, 190],
       filterChars: ["-", "."],
       filterCharsIsWhitelist: !1
   }, ai.propTypes = {
       type: r.default.oneOf(["text", "number", "password", "tel"]),
       fields: r.default.number,
       placeholder: r.default.string,
       value: r.default.string,
       onChange: r.default.func,
       name: r.default.string,
       touch: r.default.func,
       untouch: r.default.func,
       className: r.default.string,
       isValid: r.default.bool,
       disabled: r.default.bool,
       style: r.default.object,
       inputStyle: r.default.object,
       inputStyleInvalid: r.default.object,
       autoComplete: r.default.string,
       autoFocus: r.default.bool,
       forceUppercase: r.default.bool,
       filterKeyCodes: r.default.array,
       filterChars: r.default.array,
       filterCharsIsWhitelist: r.default.bool,
       pattern: r.default.string,
       inputMode: r.default.oneOf(["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"])
   };
   const ni = e => o.default.createElement("div", {
           className: "sellix-product-form"
       }, o.default.createElement("div", {
           className: "pb-3"
       }, o.default.createElement("label", {
           className: "sellix-label"
       }, "Authentication Code"), o.default.createElement("span", {
           className: "sellix-note pb-2"
       }, "We have sent a unique code to your email address, please insert it below."), o.default.createElement(ai, {
           type: "number",
           fields: 8,
           onChange: t => {
               e.setCode(t)
           },
           value: e.code
       })), e.skipFields ? null : o.default.createElement("div", {
           className: "sellix-product-form-field"
       }, o.default.createElement("label", {
           className: "sellix-label"
       }, "First Name"), o.default.createElement("input", {
           type: "text",
           onChange: t => e.setFirstName(t.target.value),
           value: e.firstname,
           placeholder: "First Name",
           required: !0,
           className: "sellix-input"
       })), e.skipFields ? null : o.default.createElement("div", {
           className: "sellix-product-form-field"
       }, o.default.createElement("label", {
           className: "sellix-label"
       }, "Last Name"), o.default.createElement("input", {
           type: "text",
           onChange: t => e.setLastName(t.target.value),
           value: e.lastname,
           placeholder: "Last Name",
           required: !0,
           className: "sellix-input"
       }))),
       li = [{
           name: "name",
           placeholder: "Name",
           required: "Name is required"
       }, {
           name: "surname",
           placeholder: "Surname",
           required: "Surname is required"
       }, {
           name: "address_line1",
           placeholder: "Address",
           required: "Address is required"
       }, {
           name: "address_city",
           placeholder: "City",
           required: "City is required"
       }, {
           name: "address_country",
           placeholder: "Country",
           required: "Country is required",
           isAddress: !0
       }, {
           name: "address_postal_code",
           placeholder: "Postal Code",
           required: "Postal Code is required"
       }, {
           name: "address_state",
           placeholder: "State",
           required: "State is required"
       }],
       oi = [{
           name: "name",
           placeholder: "Name",
           required: "Name is required"
       }, {
           name: "surname",
           placeholder: "Surname",
           required: "Surname is required"
       }];
   Lr("");
   const ri = () => o.default.createElement("svg", {
           style: {
               minWidth: 20
           },
           width: "20",
           height: "20",
           viewBox: "0 0 20 20",
           fill: "none",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("path", {
           d: "M5 7.5L10 12.5L15 7.5",
           stroke: "#555D67",
           strokeWidth: "1.5",
           strokeLinecap: "round",
           strokeLinejoin: "round"
       })),
       ii = [{
           label: "Afghanistan",
           phone: "+93",
           value: "AF"
       }, {
           label: "Albania",
           phone: "+355",
           value: "AL"
       }, {
           label: "Algeria",
           phone: "+213",
           value: "DZ"
       }, {
           label: "American Samoa",
           phone: "+1684",
           value: "AS"
       }, {
           label: "Andorra",
           phone: "+376",
           value: "AD"
       }, {
           label: "Angola",
           phone: "+244",
           value: "AO"
       }, {
           label: "Anguilla",
           phone: "+1264",
           value: "AI"
       }, {
           label: "Antarctica",
           phone: "+672",
           value: "AQ"
       }, {
           label: "Antigua and Barbuda",
           phone: "+1268",
           value: "AG"
       }, {
           label: "Argentina",
           phone: "+54",
           value: "AR"
       }, {
           label: "Armenia",
           phone: "+374",
           value: "AM"
       }, {
           label: "Aruba",
           phone: "+297",
           value: "AW"
       }, {
           label: "Australia",
           phone: "+61",
           value: "AU"
       }, {
           label: "Austria",
           phone: "+43",
           value: "AT"
       }, {
           label: "Azerbaijan",
           phone: "+994",
           value: "AZ"
       }, {
           label: "Bahamas",
           phone: "+1242",
           value: "BS"
       }, {
           label: "Bahrain",
           phone: "+973",
           value: "BH"
       }, {
           label: "Bangladesh",
           phone: "+880",
           value: "BD"
       }, {
           label: "Barbados",
           phone: "+1246",
           value: "BB"
       }, {
           label: "Belarus",
           phone: "+375",
           value: "BY"
       }, {
           label: "Belgium",
           phone: "+32",
           value: "BE"
       }, {
           label: "Belize",
           phone: "+501",
           value: "BZ"
       }, {
           label: "Benin",
           phone: "+229",
           value: "BJ"
       }, {
           label: "Bermuda",
           phone: "+1441",
           value: "BM"
       }, {
           label: "Bhutan",
           phone: "+975",
           value: "BT"
       }, {
           label: "Bolivia",
           phone: "+591",
           value: "BO"
       }, {
           label: "Bonaire",
           phone: "+5997",
           value: "BQ"
       }, {
           label: "Bosnia and Herzegovina",
           phone: "+387",
           value: "BA"
       }, {
           label: "Botswana",
           phone: "+267",
           value: "BW"
       }, {
           label: "Bouvet Island",
           phone: "+47",
           value: "BV"
       }, {
           label: "Brazil",
           phone: "+55",
           value: "BR"
       }, {
           label: "British Indian Ocean Territory",
           phone: "+246",
           value: "IO"
       }, {
           label: "British Virgin Islands",
           phone: "+1284",
           value: "VG"
       }, {
           label: "Brunei",
           phone: "+673",
           value: "BN"
       }, {
           label: "Bulgaria",
           phone: "+359",
           value: "BG"
       }, {
           label: "Burkina Faso",
           phone: "+226",
           value: "BF"
       }, {
           label: "Burundi",
           phone: "+257",
           value: "BI"
       }, {
           label: "Cambodia",
           phone: "+855",
           value: "KH"
       }, {
           label: "Cameroon",
           phone: "+237",
           value: "CM"
       }, {
           label: "Canada",
           phone: "+1",
           value: "CA"
       }, {
           label: "Cape Verde",
           phone: "+238",
           value: "CV"
       }, {
           label: "Cayman Islands",
           phone: "+1345",
           value: "KY"
       }, {
           label: "Central African Republic",
           phone: "+236",
           value: "CF"
       }, {
           label: "Chad",
           phone: "+235",
           value: "TD"
       }, {
           label: "Chile",
           phone: "+56",
           value: "CL"
       }, {
           label: "China",
           phone: "+86",
           value: "CN"
       }, {
           label: "Christmas Island",
           phone: "+61",
           value: "CX"
       }, {
           label: "Cocos [Keeling] Islands",
           phone: "+61",
           value: "CC"
       }, {
           label: "Colombia",
           phone: "+57",
           value: "CO"
       }, {
           label: "Comoros",
           phone: "+269",
           value: "KM"
       }, {
           label: "Cook Islands",
           phone: "+682",
           value: "CK"
       }, {
           label: "Costa Rica",
           phone: "+506",
           value: "CR"
       }, {
           label: "Croatia",
           phone: "+385",
           value: "HR"
       }, {
           label: "Cuba",
           phone: "+53",
           value: "CU"
       }, {
           label: "Curacao",
           phone: "+5999",
           value: "CW"
       }, {
           label: "Cyprus",
           phone: "+357",
           value: "CY"
       }, {
           label: "Czech Republic",
           phone: "+420",
           value: "CZ"
       }, {
           label: "Democratic Republic of the Congo",
           phone: "+243",
           value: "CD"
       }, {
           label: "Denmark",
           phone: "+45",
           value: "DK"
       }, {
           label: "Djibouti",
           phone: "+253",
           value: "DJ"
       }, {
           label: "Dominica",
           phone: "+1767",
           value: "DM"
       }, {
           label: "Dominican Republic",
           phone: "+1809,1829,1849",
           value: "DO"
       }, {
           label: "East Timor",
           phone: "+670",
           value: "TL"
       }, {
           label: "Ecuador",
           phone: "+593",
           value: "EC"
       }, {
           label: "Egypt",
           phone: "+20",
           value: "EG"
       }, {
           label: "El Salvador",
           phone: "+503",
           value: "SV"
       }, {
           label: "Equatorial Guinea",
           phone: "+240",
           value: "GQ"
       }, {
           label: "Eritrea",
           phone: "+291",
           value: "ER"
       }, {
           label: "Estonia",
           phone: "+372",
           value: "EE"
       }, {
           label: "Ethiopia",
           phone: "+251",
           value: "ET"
       }, {
           label: "Falkland Islands",
           phone: "+500",
           value: "FK"
       }, {
           label: "Faroe Islands",
           phone: "+298",
           value: "FO"
       }, {
           label: "Fiji",
           phone: "+679",
           value: "FJ"
       }, {
           label: "Finland",
           phone: "+358",
           value: "FI"
       }, {
           label: "France",
           phone: "+33",
           value: "FR"
       }, {
           label: "French Guiana",
           phone: "+594",
           value: "GF"
       }, {
           label: "French Polynesia",
           phone: "+689",
           value: "PF"
       }, {
           label: "French Southern Territories",
           phone: "+262",
           value: "TF"
       }, {
           label: "Gabon",
           phone: "+241",
           value: "GA"
       }, {
           label: "Gambia",
           phone: "+220",
           value: "GM"
       }, {
           label: "Georgia",
           phone: "+995",
           value: "GE"
       }, {
           label: "Germany",
           phone: "+49",
           value: "DE"
       }, {
           label: "Ghana",
           phone: "+233",
           value: "GH"
       }, {
           label: "Gibraltar",
           phone: "+350",
           value: "GI"
       }, {
           label: "Greece",
           phone: "+30",
           value: "GR"
       }, {
           label: "Greenland",
           phone: "+299",
           value: "GL"
       }, {
           label: "Grenada",
           phone: "+1473",
           value: "GD"
       }, {
           label: "Guadeloupe",
           phone: "+590",
           value: "GP"
       }, {
           label: "Guam",
           phone: "+1671",
           value: "GU"
       }, {
           label: "Guatemala",
           phone: "+502",
           value: "GT"
       }, {
           label: "Guernsey",
           phone: "+44",
           value: "GG"
       }, {
           label: "Guinea",
           phone: "+224",
           value: "GN"
       }, {
           label: "Guinea-Bissau",
           phone: "+245",
           value: "GW"
       }, {
           label: "Guyana",
           phone: "+592",
           value: "GY"
       }, {
           label: "Haiti",
           phone: "+509",
           value: "HT"
       }, {
           label: "Heard Island and McDonald Islands",
           phone: "+61",
           value: "HM"
       }, {
           label: "Honduras",
           phone: "+504",
           value: "HN"
       }, {
           label: "Hong Kong",
           phone: "+852",
           value: "HK"
       }, {
           label: "Hungary",
           phone: "+36",
           value: "HU"
       }, {
           label: "Iceland",
           phone: "+354",
           value: "IS"
       }, {
           label: "India",
           phone: "+91",
           value: "IN"
       }, {
           label: "Indonesia",
           phone: "+62",
           value: "ID"
       }, {
           label: "Iran",
           phone: "+98",
           value: "IR"
       }, {
           label: "Iraq",
           phone: "+964",
           value: "IQ"
       }, {
           label: "Ireland",
           phone: "+353",
           value: "IE"
       }, {
           label: "Isle of Man",
           phone: "+44",
           value: "IM"
       }, {
           label: "Israel",
           phone: "+972",
           value: "IL"
       }, {
           label: "Italy",
           phone: "+39",
           value: "IT"
       }, {
           label: "Ivory Coast",
           phone: "+225",
           value: "CI"
       }, {
           label: "Jamaica",
           phone: "+1876",
           value: "JM"
       }, {
           label: "Japan",
           phone: "+81",
           value: "JP"
       }, {
           label: "Jersey",
           phone: "+44",
           value: "JE"
       }, {
           label: "Jordan",
           phone: "+962",
           value: "JO"
       }, {
           label: "Kazakhstan",
           phone: "+76,77",
           value: "KZ"
       }, {
           label: "Kenya",
           phone: "+254",
           value: "KE"
       }, {
           label: "Kiribati",
           phone: "+686",
           value: "KI"
       }, {
           label: "Kosovo",
           phone: "+377,381,383,386",
           value: "XK"
       }, {
           label: "Kuwait",
           phone: "+965",
           value: "KW"
       }, {
           label: "Kyrgyzstan",
           phone: "+996",
           value: "KG"
       }, {
           label: "Laos",
           phone: "+856",
           value: "LA"
       }, {
           label: "Latvia",
           phone: "+371",
           value: "LV"
       }, {
           label: "Lebanon",
           phone: "+961",
           value: "LB"
       }, {
           label: "Lesotho",
           phone: "+266",
           value: "LS"
       }, {
           label: "Liberia",
           phone: "+231",
           value: "LR"
       }, {
           label: "Libya",
           phone: "+218",
           value: "LY"
       }, {
           label: "Liechtenstein",
           phone: "+423",
           value: "LI"
       }, {
           label: "Lithuania",
           phone: "+370",
           value: "LT"
       }, {
           label: "Luxembourg",
           phone: "+352",
           value: "LU"
       }, {
           label: "Macao",
           phone: "+853",
           value: "MO"
       }, {
           label: "Madagascar",
           phone: "+261",
           value: "MG"
       }, {
           label: "Malawi",
           phone: "+265",
           value: "MW"
       }, {
           label: "Malaysia",
           phone: "+60",
           value: "MY"
       }, {
           label: "Maldives",
           phone: "+960",
           value: "MV"
       }, {
           label: "Mali",
           phone: "+223",
           value: "ML"
       }, {
           label: "Malta",
           phone: "+356",
           value: "MT"
       }, {
           label: "Marshall Islands",
           phone: "+692",
           value: "MH"
       }, {
           label: "Martinique",
           phone: "+596",
           value: "MQ"
       }, {
           label: "Mauritania",
           phone: "+222",
           value: "MR"
       }, {
           label: "Mauritius",
           phone: "+230",
           value: "MU"
       }, {
           label: "Mayotte",
           phone: "+262",
           value: "YT"
       }, {
           label: "Mexico",
           phone: "+52",
           value: "MX"
       }, {
           label: "Micronesia",
           phone: "+691",
           value: "FM"
       }, {
           label: "Moldova",
           phone: "+373",
           value: "MD"
       }, {
           label: "Monaco",
           phone: "+377",
           value: "MC"
       }, {
           label: "Mongolia",
           phone: "+976",
           value: "MN"
       }, {
           label: "Montenegro",
           phone: "+382",
           value: "ME"
       }, {
           label: "Montserrat",
           phone: "+1664",
           value: "MS"
       }, {
           label: "Morocco",
           phone: "+212",
           value: "MA"
       }, {
           label: "Mozambique",
           phone: "+258",
           value: "MZ"
       }, {
           label: "Myanmar [Burma]",
           phone: "+95",
           value: "MM"
       }, {
           label: "Namibia",
           phone: "+264",
           value: "NA"
       }, {
           label: "Nauru",
           phone: "+674",
           value: "NR"
       }, {
           label: "Nepal",
           phone: "+977",
           value: "NP"
       }, {
           label: "Netherlands",
           phone: "+31",
           value: "NL"
       }, {
           label: "New Caledonia",
           phone: "+687",
           value: "NC"
       }, {
           label: "New Zealand",
           phone: "+64",
           value: "NZ"
       }, {
           label: "Nicaragua",
           phone: "+505",
           value: "NI"
       }, {
           label: "Niger",
           phone: "+227",
           value: "NE"
       }, {
           label: "Nigeria",
           phone: "+234",
           value: "NG"
       }, {
           label: "Niue",
           phone: "+683",
           value: "NU"
       }, {
           label: "Norfolk Island",
           phone: "+672",
           value: "NF"
       }, {
           label: "North Korea",
           phone: "+850",
           value: "KP"
       }, {
           label: "North Macedonia",
           phone: "+389",
           value: "MK"
       }, {
           label: "Northern Mariana Islands",
           phone: "+1670",
           value: "MP"
       }, {
           label: "Norway",
           phone: "+47",
           value: "NO"
       }, {
           label: "Oman",
           phone: "+968",
           value: "OM"
       }, {
           label: "Pakistan",
           phone: "+92",
           value: "PK"
       }, {
           label: "Palau",
           phone: "+680",
           value: "PW"
       }, {
           label: "Palestine",
           phone: "+970",
           value: "PS"
       }, {
           label: "Panama",
           phone: "+507",
           value: "PA"
       }, {
           label: "Papua New Guinea",
           phone: "+675",
           value: "PG"
       }, {
           label: "Paraguay",
           phone: "+595",
           value: "PY"
       }, {
           label: "Peru",
           phone: "+51",
           value: "PE"
       }, {
           label: "Philippines",
           phone: "+63",
           value: "PH"
       }, {
           label: "Pitcairn Islands",
           phone: "+64",
           value: "PN"
       }, {
           label: "Poland",
           phone: "+48",
           value: "PL"
       }, {
           label: "Portugal",
           phone: "+351",
           value: "PT"
       }, {
           label: "Puerto Rico",
           phone: "+1787,1939",
           value: "PR"
       }, {
           label: "Qatar",
           phone: "+974",
           value: "QA"
       }, {
           label: "Republic of the Congo",
           phone: "+242",
           value: "CG"
       }, {
           label: "Romania",
           phone: "+40",
           value: "RO"
       }, {
           label: "Russia",
           phone: "+7",
           value: "RU"
       }, {
           label: "Rwanda",
           phone: "+250",
           value: "RW"
       }, {
           label: "Réunion",
           phone: "+262",
           value: "RE"
       }, {
           label: "Saint Barthélemy",
           phone: "+590",
           value: "BL"
       }, {
           label: "Saint Helena",
           phone: "+290",
           value: "SH"
       }, {
           label: "Saint Kitts and Nevis",
           phone: "+1869",
           value: "KN"
       }, {
           label: "Saint Lucia",
           phone: "+1758",
           value: "LC"
       }, {
           label: "Saint Martin",
           phone: "+590",
           value: "MF"
       }, {
           label: "Saint Pierre and Miquelon",
           phone: "+508",
           value: "PM"
       }, {
           label: "Saint Vincent and the Grenadines",
           phone: "+1784",
           value: "VC"
       }, {
           label: "Samoa",
           phone: "+685",
           value: "WS"
       }, {
           label: "San Marino",
           phone: "+378",
           value: "SM"
       }, {
           label: "Saudi Arabia",
           phone: "+966",
           value: "SA"
       }, {
           label: "Senegal",
           phone: "+221",
           value: "SN"
       }, {
           label: "Serbia",
           phone: "+381",
           value: "RS"
       }, {
           label: "Seychelles",
           phone: "+248",
           value: "SC"
       }, {
           label: "Sierra Leone",
           phone: "+232",
           value: "SL"
       }, {
           label: "Singapore",
           phone: "+65",
           value: "SG"
       }, {
           label: "Sint Maarten",
           phone: "+1721",
           value: "SX"
       }, {
           label: "Slovakia",
           phone: "+421",
           value: "SK"
       }, {
           label: "Slovenia",
           phone: "+386",
           value: "SI"
       }, {
           label: "Solomon Islands",
           phone: "+677",
           value: "SB"
       }, {
           label: "Somalia",
           phone: "+252",
           value: "SO"
       }, {
           label: "South Africa",
           phone: "+27",
           value: "ZA"
       }, {
           label: "South Georgia and the South Sandwich Islands",
           phone: "+500",
           value: "GS"
       }, {
           label: "South Korea",
           phone: "+82",
           value: "KR"
       }, {
           label: "South Sudan",
           phone: "+211",
           value: "SS"
       }, {
           label: "Spain",
           phone: "+34",
           value: "ES"
       }, {
           label: "Sri Lanka",
           phone: "+94",
           value: "LK"
       }, {
           label: "Sudan",
           phone: "+249",
           value: "SD"
       }, {
           label: "Surilabel",
           phone: "+597",
           value: "SR"
       }, {
           label: "Svalbard and Jan Mayen",
           phone: "+4779",
           value: "SJ"
       }, {
           label: "Swaziland",
           phone: "+268",
           value: "SZ"
       }, {
           label: "Sweden",
           phone: "+46",
           value: "SE"
       }, {
           label: "Switzerland",
           phone: "+41",
           value: "CH"
       }, {
           label: "Syria",
           phone: "+963",
           value: "SY"
       }, {
           label: "São Tomé and Príncipe",
           phone: "+239",
           value: "ST"
       }, {
           label: "Taiwan",
           phone: "+886",
           value: "TW"
       }, {
           label: "Tajikistan",
           phone: "+992",
           value: "TJ"
       }, {
           label: "Tanzania",
           phone: "+255",
           value: "TZ"
       }, {
           label: "Thailand",
           phone: "+66",
           value: "TH"
       }, {
           label: "Togo",
           phone: "+228",
           value: "TG"
       }, {
           label: "Tokelau",
           phone: "+690",
           value: "TK"
       }, {
           label: "Tonga",
           phone: "+676",
           value: "TO"
       }, {
           label: "Trinidad and Tobago",
           phone: "+1868",
           value: "TT"
       }, {
           label: "Tunisia",
           phone: "+216",
           value: "TN"
       }, {
           label: "Turkey",
           phone: "+90",
           value: "TR"
       }, {
           label: "Turkmenistan",
           phone: "+993",
           value: "TM"
       }, {
           label: "Turks and Caicos Islands",
           phone: "+1649",
           value: "TC"
       }, {
           label: "Tuvalu",
           phone: "+688",
           value: "TV"
       }, {
           label: "U.S. Minor Outlying Islands",
           phone: "+1",
           value: "UM"
       }, {
           label: "U.S. Virgin Islands",
           phone: "+1340",
           value: "VI"
       }, {
           label: "Uganda",
           phone: "+256",
           value: "UG"
       }, {
           label: "Ukraine",
           phone: "+380",
           value: "UA"
       }, {
           label: "United Arab Emirates",
           phone: "+971",
           value: "AE"
       }, {
           label: "United Kingdom",
           phone: "+44",
           value: "GB"
       }, {
           label: "United States",
           phone: "+1",
           value: "US"
       }, {
           label: "Uruguay",
           phone: "+598",
           value: "UY"
       }, {
           label: "Uzbekistan",
           phone: "+998",
           value: "UZ"
       }, {
           label: "Vanuatu",
           phone: "+678",
           value: "VU"
       }, {
           label: "Vatican City",
           phone: "+379",
           value: "VA"
       }, {
           label: "Venezuela",
           phone: "+58",
           value: "VE"
       }, {
           label: "Vietnam",
           phone: "+84",
           value: "VN"
       }, {
           label: "Wallis and Futuna",
           phone: "+681",
           value: "WF"
       }, {
           label: "Western Sahara",
           phone: "+212",
           value: "EH"
       }, {
           label: "Yemen",
           phone: "+967",
           value: "YE"
       }, {
           label: "Zambia",
           phone: "+260",
           value: "ZM"
       }, {
           label: "Zimbabwe",
           phone: "+263",
           value: "ZW"
       }, {
           label: "Åland",
           phone: "+358",
           value: "AX"
       }],
       si = ({
           regulationForm: e,
           setRegulationForm: a,
           isExtendedRegulationForm: n,
           setState: l,
           state: r
       }) => {
           const i = ei();
           let s = {
               name: "",
               surname: ""
           };
           n && (s.address_line1 = "", s.address_city = "", s.address_country = "", s.address_postal_code = "", s.address_state = "");
           let [u, c] = t.useState(s), [d, p] = t.useState(s), m = n ? li : oi;
           return t.useEffect((() => {
               l && (() => {
                   if (i.stripeForm) {
                       const e = JSON.parse(decodeURIComponent(window.atob(i.stripeForm)));
                       Object.keys(u).forEach((t => {
                           e[t] && (u[t] = e[t])
                       })), l({
                           ...r,
                           stripeForm: i.stripeForm
                       })
                   }
               })()
           }), [l]), o.default.createElement("div", {
               className: "stripe-additional-form-container"
           }, o.default.createElement("div", {
               className: "sellix-label"
           }, "Details requested by Stripe"), o.default.createElement("div", {
               className: "stripe-additional-form"
           }, m.map((({
               name: t,
               placeholder: n,
               isAddress: i,
               required: s
           }, m) => i ? o.default.createElement("div", {
               className: "select-container",
               key: m
           }, o.default.createElement("select", {
               style: {
                   height: "2.5rem"
               },
               className: "select sellix-input " + (!e[t] && d[t] ? "is-invalid" : ""),
               name: t,
               value: u[t],
               placeholder: n,
               onChange: n => {
                   c({
                       ...u,
                       [t]: n.target.value
                   }), a({
                       ...e,
                       [t]: n.target.value
                   }), l && l({
                       ...r,
                       stripeForm: btoa(JSON.stringify(e))
                   })
               },
               onBlur: () => p({
                   ...d,
                   [t]: !0
               })
           }, o.default.createElement("option", {
               value: "",
               disabled: !0,
               hidden: !0
           }, "Country"), ii.map((({
               label: e,
               value: t
           }) => o.default.createElement("option", {
               value: t,
               key: t
           }, e)))), o.default.createElement(ri, null), !u[t] && d[t] && o.default.createElement("div", {
               className: "text-left invalid-feedback"
           }, s)) : o.default.createElement("div", {
               className: "" + ("address_line1" === t ? "w-100" : ""),
               key: m
           }, o.default.createElement("input", {
               type: "text",
               name: t,
               style: {
                   height: "2.5rem"
               },
               onChange: n => {
                   c({
                       ...u,
                       [t]: n.target.value
                   }), a({
                       ...e,
                       [t]: n.target.value
                   }), l && l({
                       ...r,
                       stripeForm: btoa(JSON.stringify(e))
                   })
               },
               onBlur: () => p({
                   ...d,
                   [t]: !0
               }),
               value: u[t],
               placeholder: n,
               className: "sellix-input " + (!u[t] && d[t] ? "is-invalid" : "")
           }), !u[t] && d[t] && o.default.createElement("div", {
               className: "text-left invalid-feedback"
           }, s))))))
       };
   Lr("");
   const ui = () => o.default.createElement("svg", {
           width: "24px",
           height: "24px",
           viewBox: "0 0 24 24",
           version: "1.1",
           xmlns: "http://www.w3.org/2000/svg"
       }, o.default.createElement("g", null, o.default.createElement("path", {
           d: "M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M13,17 L11,17 L11,15 L13,15 L13,17 L13,17 Z M13,13 L11,13 L11,7 L13,7 L13,13 L13,13 Z"
       }))),
       ci = ({
           skipTitle: e = !1,
           show: t = !0,
           className: a = "",
           blue: n,
           red: l,
           title: r,
           text: i,
           small: s
       }) => t ? o.default.createElement("div", {
           className: `sellix-widget alert ${s?"small":""} ${a||""} fade ${t?"show":""} ${l?"red":""} ${n?"blue":""}`
       }, e ? null : o.default.createElement("b", null, o.default.createElement(ui, null), r), o.default.createElement("span", null, i)) : null,
       di = ({
           isCart: e,
           isPayPal: a,
           isRegulations: n,
           customFieldsValues: l,
           regulationForm: r,
           isExtendedRegulationForm: i,
           onSetEmail: s,
           onSetPayPalEmailDelivery: c,
           onSetCustomFields: d,
           onSetRegulationForm: p,
           url: m,
           state: f,
           setState: h,
           setUrl: v,
           invoiceError: y,
           config: b
       }) => {
           const {
               cartProducts: g,
               productInfo: E,
               onShowProductTerms: C
           } = t.useContext(u), w = ei();
           let S = !1;
           e ? g.forEach((e => {
               e.discord_integration && (S = !0)
           })) : S = E.discord_integration;
           const [N, A] = t.useState(w && w.email ? w.email : ""), [k, x] = t.useState(""), [P, T] = t.useState(""), [_, L] = t.useState([]), [D, O] = t.useState(!!w && "true" === w.paypalDeliveryEmail), I = window.location;
           t.useEffect((() => {
               if (e) {
                   let e = [];
                   g.map((t => {
                       let a = [];
                       if (I.search) {
                           I.search.substr(1).split("&").map((e => {
                               let t = e.split("=")[0].replace(/-/g, "_"),
                                   n = e.split("=")[1];
                               t && a.push({
                                   default: decodeURIComponent(n),
                                   name: t,
                                   placeholder: "",
                                   regex: "",
                                   required: !1,
                                   type: "hidden"
                               })
                           }))
                       }
                       e = t && t.custom_fields ? [...e, ...JSON.parse(t.custom_fields).custom_fields, ...a] : [...e, ...a]
                   }));
                   let t = [];
                   for (let a = 0; a < e.length; a++) t.find((({
                       name: t
                   }) => e[a].name === t)) || t.push(e[a]);
                   L(t)
               } else {
                   let e = [];
                   if (I.search) {
                       I.search.substr(1).split("&").map((t => {
                           let a = t.split("=")[0].replace(/-/g, "_"),
                               n = t.split("=")[1];
                           a && e.push({
                               default: decodeURIComponent(n),
                               name: a,
                               placeholder: "",
                               regex: "",
                               required: !1,
                               type: "hidden"
                           })
                       }))
                   }
                   E && E.custom_fields ? L([...JSON.parse(E.custom_fields).custom_fields, ...e]) : L([...e])
               }
           }), [g, E]);
           let R = e ? g.find((({
                   shop_force_paypal_email_delivery: e
               }) => !!+e)) : !!+E.shop_force_paypal_email_delivery,
               M = (e, t) => e.replace(t, "");
           t.useEffect((() => {
               w.email && (A(w.email), s(w.email), h({
                   ...f,
                   email: w.email
               })), w.paypalDeliveryEmail && (O(w.paypalDeliveryEmail), c(w.paypalDeliveryEmail))
           }), []);
           return o.default.createElement("div", {
               className: "sellix-product-form"
           }, a && R && o.default.createElement(ci, {
               small: !0,
               title: "Please note",
               text: o.default.createElement(o.default.Fragment, null, o.default.createElement("div", null, "Sellix fulfillment emails will be delivered to your PayPal email. ", !P && o.default.createElement("span", {
                   style: {
                       color: "var(--buttonColor)",
                       textDecoration: "underline",
                       cursor: "pointer"
                   },
                   onClick: () => T(!0)
               }, "More Info")), P && o.default.createElement("div", null, "You will also not be able to view the product here on the website after the purchase. ", o.default.createElement("br", null), "This is to avoid fraud purchases with PayPal."))
           }), o.default.createElement("div", {
               className: "" + (_.length || a && !R ? "pb-3" : "")
           }, o.default.createElement("input", {
               type: "text",
               name: "email",
               style: {
                   height: "3rem"
               },
               onChange: e => {
                   h({
                       ...f,
                       email: e.target.value
                   }), A(e.target.value), s(e.target.value)
               },
               onBlur: () => x(!0),
               value: N,
               placeholder: "Email for invoice updates",
               className: "sellix-input " + (!N && k ? "is-invalid" : "")
           }), !N && k && o.default.createElement("div", {
               className: "text-left invalid-feedback"
           }, "Email is required"), !S || w.code && !y ? null : o.default.createElement("div", {
               className: "sellix-product-form-discord"
           }, o.default.createElement($r, {
               onClick: () => {
                   f.redirectUrl = window.location.href.split("?")[0], v(b.DISCORD.DISCORD_INTEGRATION_OAUTH_URL + btoa(JSON.stringify(f))), window.open(m, "_blank", "noopener,noreferrer")
               },
               style: {
                  width: "100%",
                  margin: "20px 0 0 0",
                  padding: "10px",
                  fontSize: "24pz"
                     }
           }, "Connect your ", o.default.createElement("img", {
               alt: "Discord",
               src: "https://cdn.sellix.io/static/gateways/discord.png", style: {
                  height: 48,
                  margin: "0 10px"
               }
           }), "  account"))), a && !R && o.default.createElement("div", {
               className: (_.length ? "pb-3" : "") + " mr-0 w-100"
           }, o.default.createElement("div", {
               className: "sellix-checkbox mb-0 mr-0"
           }, o.default.createElement("input", {
               type: "checkbox",
               id: "paypal_email_delivery",
               checked: D,
               onChange: e => {
                   h({
                       ...f,
                       payPalEmailDelivery: e.target.checked
                   }), O(e.target.checked), c(e.target.checked)
               }
           }), o.default.createElement("label", {
               className: "sellix-label",
               htmlFor: "paypal_email_delivery",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, "Deliver to PayPal email."))), _.map(((e, t) => {
               let a;
               return a = "string" == typeof e.type ? e.type.toLowerCase() : "string" == typeof(e.type && e.type.value) ? e.type.value.toLowerCase() : "unknown", "text" === a ? o.default.createElement("div", {
                   className: "sellix-product-form-field",
                   key: t
               }, o.default.createElement("label", {
                   className: "sellix-label"
               }, e.name, " ", o.default.createElement("small", {
                   className: "font-italic"
               }, !e.required && "(optional)")), o.default.createElement("input", {
                   type: "text",
                   onChange: t => {
                       let a = t.target.value;
                       e.regex && (a = M(a, new RegExp(e.regex, "g"))), d(e.name, a || t.target.value)
                   },
                   value: l[e.name],
                   defaultValue: e.default,
                   placeholder: e.placeholder,
                   required: e.required,
                   className: "sellix-input"
               })) : "hidden" === a ? o.default.createElement("input", {
                   key: `${t}-${t}`,
                   type: "hidden",
                   name: l[e.name],
                   value: e.default,
                   defaultValue: e.default
               }) : "number" === a ? o.default.createElement("div", {
                   className: "sellix-product-form-field",
                   key: t
               }, o.default.createElement("label", {
                   className: "sellix-label"
               }, e.name, " ", o.default.createElement("small", {
                   className: "font-italic"
               }, !e.required && " (optional)")), o.default.createElement("input", {
                   type: e.regex ? "text" : "number",
                   onChange: t => {
                       let a = t.target.value;
                       e.regex && (a = M(a, new RegExp(e.regex, "g"))), d(e.name, a || t.target.value)
                   },
                   value: l[e.name],
                   defaultValue: e.default,
                   placeholder: e.placeholder,
                   required: e.required,
                   className: "sellix-input"
               })) : "largetextbox" === a ? o.default.createElement("div", {
                   className: "sellix-product-form-field",
                   key: t
               }, o.default.createElement("label", {
                   className: "sellix-label"
               }, e.name, " ", o.default.createElement("small", {
                   className: "font-italic"
               }, !e.required && " (optional)")), o.default.createElement("textarea", {
                   className: "sellix-input textarea",
                   value: l[e.name],
                   defaultValue: e.default,
                   rows: 5,
                   placeholder: e.placeholder,
                   required: e.required,
                   onChange: t => {
                       let a = t.target.value;
                       e.regex && (a = M(a, new RegExp(e.regex, "g"))), d(e.name, a)
                   }
               })) : "checkbox" === a ? o.default.createElement("label", {
                   className: "sellix-checkbox mb-3",
                   htmlFor: `sk${e.name}`,
                   key: t
               }, o.default.createElement("input", {
                   type: "checkbox",
                   id: `sk${e.name}`,
                   name: e.name,
                   checked: l[e.name] ? "checked" : "",
                   onChange: t => {
                       d(e.name, t.target.checked)
                   }
               }), o.default.createElement("label", {
                   className: "sellix-label",
                   htmlFor: `sk${e.name}`
               }, e.name, " ", o.default.createElement("small", {
                   className: "font-italic"
               }, !e.required && " (optional)"))) : void 0
           })), n && o.default.createElement(si, {
               isExtendedRegulationForm: i,
               regulationForm: r,
               setRegulationForm: p,
               setState: h,
               state: f
           }), E && (E.shop_terms_of_service || E.terms_of_service) && o.default.createElement("div", {
               className: "terms-link",
               onClick: C
           }, "By clicking Pay you agree to ", E.name, "'s ", o.default.createElement("span", null, "Terms of Service")))
       };
   Lr("");
   const pi = e => {
           const [a, n] = t.useState(!1), {
               productInfo: l,
               currency: r,
               currencyTitle: i
           } = e, {
               product: {
                   title: s,
                   uniqid: u,
                   quantity: c
               },
               price: d,
               productDiscount: p,
               productAmount: m,
               addonsDiscount: f,
               addonsList: h,
               volumeDiscount: v,
               volumeAmount: y,
               bundleDiscount: b,
               bundleAmount: g,
               couponDiscount: E,
               couponAmount: C,
               taxDiscount: w,
               taxAmount: S
           } = l;
           let N = +[p, f, v, b, E, w].reduce(((e, t) => t(e)), c * d).toFixed(2);
           const A = N < 0;
           return o.default.createElement("div", {
               key: u,
               className: "sellix-check-item " + (a !== u ? "pb-1 mb-1" : "")
           }, o.default.createElement("div", {
               className: "sellix-check-item-head"
           }, o.default.createElement("span", {
               className: "sellix-check-item-name"
           }, s), o.default.createElement("span", {
               className: "d-flex"
           }, a === u ? o.default.createElement("span", null, c, " × ", i, d) : o.default.createElement("span", {
               style: {
                   fontSize: 12,
                   fontWeight: 400
               }
           }, A ? "Free" : `${i}${N}`), o.default.createElement("span", {
               "data-tip": !0,
               "data-for": `calc-${u}`,
               className: "cursor-pointer",
               onClick: () => n(a === u ? null : u)
           }, o.default.createElement("i", {
               className: "fa-light fa-info-circle"
           }), o.default.createElement(gr, {
               id: `calc-${u}`,
               place: "left",
               className: "sellix-check-item-tooltip"
           }, "How is the price calculated?")))), a === u && o.default.createElement(o.default.Fragment, null, h ? h.map((({
               title: e,
               price_conversions: t
           }) => o.default.createElement("div", {
               className: "sellix-check-item-row"
           }, o.default.createElement("span", null, e, ":"), o.default.createElement("span", null, i, t[r])))) : null, m ? o.default.createElement("div", {
               className: "sellix-check-item-row"
           }, o.default.createElement("span", null, "Product Discount:"), o.default.createElement("span", null, "-", m)) : null, y ? o.default.createElement("div", {
               className: "sellix-check-item-row"
           }, o.default.createElement("span", null, "Volume Discount:"), o.default.createElement("span", null, "-", y)) : null, g ? o.default.createElement("div", {
               className: "sellix-check-item-row"
           }, o.default.createElement("span", null, "Bundle Discount:"), o.default.createElement("span", null, "-", g)) : null, C ? o.default.createElement("div", {
               className: "sellix-check-item-row"
           }, o.default.createElement("span", null, "Coupon Discount:"), o.default.createElement("span", null, "-", C)) : null, S ? o.default.createElement("div", {
               className: "sellix-check-item-row"
           }, o.default.createElement("span", null, "Tax:"), o.default.createElement("span", null, "+", S)) : null, o.default.createElement("div", {
               className: "sellix-check-item-row mt-1"
           }, o.default.createElement("span", null, "Subtotal:"), o.default.createElement("b", null, o.default.createElement("span", {
               style: {
                   color: "var(--lightFontColor)",
                   fontSize: 13.4,
                   fontWeight: 400
               }
           }, A ? "Free" : `${i}${N}`), m || y || g || C ? o.default.createElement("s", {
               style: {
                   fontSize: 12,
                   fontWeight: 400,
                   color: "var(--darkFontColor)"
               },
               className: "ml-1"
           }, i, (c * d).toFixed(2)) : null))))
       },
       mi = ["Purchase", "Payment Method", "Product Delivery"],
       fi = ({
           hasDiscount: e,
           taxAmount: a,
           couponAmount: n,
           productDiscounts: l,
           bundleDiscounts: r,
           appliedCoupon: i,
           setAppliedCoupon: s,
           paymentOptions: c,
           currency: d
       }) => {
           const {
               config: p,
               theme: m,
               isCustomDomain: f,
               cartProducts: h,
               shopInfo: v,
               addons: y,
               onCreateInvoice: b,
               onBackToShop: g,
               onShowMessage: E,
               onChangeStep: C,
               onSuccess: w,
               onFail: S
           } = t.useContext(u), N = p.CURRENCY_LIST[d], A = ei(), [k, x] = t.useState(null), [P, T] = t.useState(null), [_, L] = t.useState(null), [D, O, I, R, M] = Jr(h, P, _), [F, U] = Qr(h), [B, j] = t.useState(!1), [q, Y] = t.useState(!1), [H, W] = t.useState(A.step ? parseInt(A.step) : 0), G = t.useCallback((e => {
               W(e), C(e)
           }), [C]), [V, $] = t.useState(null), [z, K] = t.useState({}), [X, J] = t.useState(""), Z = e => {
               K({
                   ...z,
                   step: e
               }), G(e)
           }, Q = Or(), ee = Xr(P, Z, E), te = Kr(g), [ae, ne] = t.useState(!1), le = t.useCallback((() => {
               ne(!0), S()
           }), []), [oe] = Zr({
               config: p,
               isCustomDomain: f,
               email: V,
               gateway: P,
               APM: _,
               customFields: F,
               appliedCoupon: i,
               hasDiscount: e,
               payPalEmailDelivery: q,
               isVisibleRegulationForm: I,
               isExtendedRegulationForm: M,
               regulationForm: D,
               setSending: j,
               onCreateInvoice: b,
               onShowMessage: E,
               onSuccess: w,
               onFail: le,
               type: "checkout",
               products: h,
               addons: y
           });
           let re = 0;
           l.map((e => {
               let {
                   price: t,
                   product: {
                       quantity: a
                   },
                   productDiscount: n,
                   taxDiscount: l,
                   couponDiscount: o,
                   volumeDiscount: r,
                   addonsDiscount: i,
                   bundleDiscount: s
               } = e, u = +[n, i, r, s, o, l].reduce(((e, t) => t(e)), a * t);
               re = +(re + (u < 0 ? 0 : u))
           })), re = (+re).toFixed(2);
           let ie = -1 === Math.sign(re),
               se = l.filter((({
                   isBundle: e
               }) => !e)),
               ue = l.filter((({
                   isBundle: e
               }) => e)).reduce(((e, t) => e[t.isBundle] ? (e[t.isBundle] = [...e[t.isBundle], t], e) : (e[t.isBundle] = [t], e)), {});
           let ce = B || !V || I && !R;
           return t.useEffect((() => {
               const e = {};
               ["gateway", "APM", "step", "email", "payPalEmailDelivery", "couponCode"].forEach((t => {
                   A[t] && (e[t] = A[t])
               })), e.gateway && T(A.gateway), e.APM && L(A.APM), e.step && Z(parseInt(A.step)), e.redirectUrl = window.location.href.split("?")[0], K({
                   ...z,
                   ...e
               }), J(p.DISCORD.DISCORD_INTEGRATION_OAUTH_URL + btoa(JSON.stringify(e)))
           }), []), o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
               className: "sellix-product-title",
               style: {
                   height: "18px"
               }
           }, mi[H]), 0 === H && o.default.createElement("div", {
               onClick: te,
               className: "sellix-product-back"
           }, o.default.createElement("i", {
               className: "fas fa-times"
           })), o.default.createElement("div", {
               className: "sellix-product-body"
           }, 0 === H ? o.default.createElement("div", {
               className: "unselectable w-100"
           }, o.default.createElement("div", {
               className: "sellix-product-body-list"
           }, se.map((e => o.default.createElement(pi, {
               productInfo: e,
               currency: d,
               currencyTitle: N
           }))), Object.keys(ue).map((e => o.default.createElement("div", {
               className: "bundle-list-wrapper"
           }, o.default.createElement("div", {
               className: "bundle-list-title"
           }, ue[e][0].bundleTitle), o.default.createElement("div", {
               className: "bundle-list-total"
           }, (e => {
               const t = e.reduce(((e, t) => {
                   const {
                       price: a,
                       product: {
                           quantity: n
                       },
                       productDiscount: l,
                       taxDiscount: o,
                       couponDiscount: r,
                       volumeDiscount: i,
                       addonsDiscount: s,
                       bundleDiscount: u
                   } = t;
                   let c = +[l, s, i, u, r, o].reduce(((e, t) => t(e)), n * a).toFixed(2);
                   return c < 0 ? e : e + c
               }), 0);
               return t < 0 ? "Free" : `${N}${+t.toFixed(2)}`
           })(ue[e])), ue[e].map((e => o.default.createElement(pi, {
               productInfo: e,
               currency: d,
               currencyTitle: N
           }))))))), r.map((({
               bundle: e,
               discountTitle: t
           }) => e ? o.default.createElement("div", {
               className: "sellix-product-total mt-0",
               style: {
                   paddingTop: ".75rem",
                   paddingBottom: ".25rem"
               }
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Bundle discount ", o.default.createElement("small", null, "(", e.title, ")")), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--darkFontColor)"
               }
           }, e && o.default.createElement("small", {
               style: {
                   fontSize: 13.5,
                   color: "var(--lightFontColor)"
               }
           }, "-", t))) : o.default.createElement("div", {
               style: {
                   height: 0,
                   overflow: "hidden"
               }
           }))), !i || i.disabled_with_volume_discounts && e ? o.default.createElement("div", {
               style: {
                   height: 0,
                   overflow: "hidden"
               }
           }) : o.default.createElement("div", {
               className: "sellix-product-total mt-0",
               style: {
                   paddingTop: ".75rem",
                   paddingBottom: ".25rem"
               }
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Coupon Discount"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--darkFontColor)"
               }
           }, i && !(i.disabled_with_volume_discounts && e) && o.default.createElement("small", {
               style: {
                   fontSize: 13.5,
                   color: "var(--lightFontColor)"
               }
           }, "-", n))), +v.vat_percentage ? o.default.createElement("div", {
               className: "sellix-product-total mt-0",
               style: {
                   paddingTop: ".75rem",
                   paddingBottom: ".25rem"
               }
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Tax"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--darkFontColor)"
               }
           }, +v.vat_percentage && o.default.createElement("small", {
               style: {
                   fontSize: 13.5,
                   color: "var(--lightFontColor)"
               }
           }, "+", a))) : null, o.default.createElement("div", {
               className: "sellix-product-total"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Total"), o.default.createElement("div", null, o.default.createElement("div", {
               className: "sellix-product-total-price unselectable"
           }, o.default.createElement("span", null, ie ? "" : N), re ? o.default.createElement("div", null, ie ? "Free" : re) : null)))) : null, 1 === H && 0 === c.length && o.default.createElement("p", {
               className: "sellix-product-no-gateway"
           }, "This product has no payment options."), 1 === H && o.default.createElement("div", {
               className: "sellix-payment-methods"
           }, o.default.createElement(Dr, {
               type: "checkout",
               config: p,
               theme: m,
               cartProducts: h,
               paymentOptions: c,
               gateway: P,
               APM: _,
               setGateway: (e, t) => {
                   K({
                       ...z,
                       gateway: e,
                       APM: t
                   }), T(e), L(t)
               }
           })), 2 === H && o.default.createElement("div", {
               className: "pt-2"
           }, o.default.createElement(di, {
               isCart: !0,
               isPayPal: "PAYPAL" === P || "PAYPAL_CREDIT_CARD" === P,
               isRegulations: I,
               regulationForm: D,
               isExtendedRegulationForm: M,
               customFieldsValues: F,
               setState: e => K(e),
               state: z,
               url: X,
               setUrl: e => J(e),
               config: p,
               invoiceError: ae,
               onSetEmail: e => $(e),
               onSetPayPalEmailDelivery: e => Y(e),
               onSetCustomFields: (e, t) => {
                   U({
                       ...F,
                       [e]: t
                   }), Q()
               },
               onSetRegulationForm: e => O(e)
           })), o.default.createElement("div", {
               className: "sellix-product-footer"
           }, 0 === H && o.default.createElement("div", null, o.default.createElement($r, {
               className: "mb-3 w-100",
               onClick: () => Z(1)
           }, "Select Gateway"), o.default.createElement(ti, {
               isCart: !0,
               currency: d,
               setCoupon: e => s(e),
               appliedCoupon: i,
               openCoupon: k,
               setState: K,
               state: z,
               disabledWithDiscount: i && i.disabled_with_volume_discounts && e
           }), o.default.createElement("div", {
               className: "d-flex justify-content-center"
           }, o.default.createElement("div", {
               className: "coupon-button",
               onClick: () => x(!k)
           }, o.default.createElement("i", {
               className: "fa-regular fa-tags"
           }), " Apply a Coupon"))), 1 === H && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               onClick: () => Z(0)
           }, "Back"), o.default.createElement($r, {
               className: "next",
               onClick: ee
           }, "Continue")), 2 === H && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               onClick: () => Z(1)
           }, "Back"), o.default.createElement($r, {
               className: "next",
               disabled: ce,
               onClick: oe
           }, B ? o.default.createElement(zr, null) : "Pay")))))
       };
   Lr("");
   const hi = ({
       product: e,
       cartProducts: a,
       onAddToCart: n,
       openAdd: l
   }) => {
       const r = {
               value: "Custom"
           },
           [i, s] = t.useState([]),
           [u, c] = t.useState(r),
           [d, p] = t.useState(!1),
           [m, f] = t.useState(""),
           h = (a.find((t => t.uniqid === e.uniqid)) || {}).quantity || 0,
           {
               quantity_max: v,
               quantity_min: y
           } = e,
           b = -1 === e.stock ? 999999999999999 : e.stock - h;
       return (-1 === b || b || i.length) && l ? o.default.createElement("div", {
           className: "pb-3"
       }, o.default.createElement("div", {
           className: `add-to-cart-button ${!u&&d?"empty":""} mb-0`
       }, o.default.createElement("div", null, u && "Custom" === u.value ? o.default.createElement("input", {
           type: "number",
           placeholder: "Type here",
           value: m,
           onChange: e => f(e.target.value),
           minLength: y,
           maxLength: -1 === v ? b : v
       }) : null), o.default.createElement($r, {
           onClick: () => {
               if (!u) return void p(!0);
               let t = -1 === v ? b : v;
               const a = u && "Custom" !== u.value ? +u.value : +m;
               n(e.uniqid, Math.min(a, t)), c(r), f("")
           }
       }, o.default.createElement("span", null, "Add "), " ", o.default.createElement("i", {
           className: "fa-regular fa-cart-shopping"
       })))) : null
   };
   Lr("");
   const vi = e => {
       const {
           productQuantity: a,
           setProductQuantity: n,
           productInfo: l,
           state: r,
           setState: i
       } = e, {
           price_variants: s,
           priceVariant: c,
           type: d,
           quantity_max: p,
           quantity_min: m
       } = l, f = ei(), [h, v] = t.useState(f.quantity ? parseInt(f.quantity) : a), y = t.useContext(u), {
           sellixHelper: b
       } = y;
       t.useEffect((() => {
           f.quantity && (e => {
               e = e.toString();
               var t = Math.abs(e),
                   a = parseInt(e, 10);
               return !isNaN(t) && a === t && t.toString() === e
           })(parseInt(f.quantity)) ? (i({
               ...r,
               quantity: parseInt(f.quantity)
           }), v(parseInt(f.quantity)), n(parseInt(f.quantity))) : (v(a), i({
               ...r,
               quantity: h
           }))
       }), []);
       const g = s && s.length,
           E = t.useMemo((() => g && "SERIALS" === d ? c.stock : l.stock), [d, g, c, l.stock]);
       t.useEffect((() => {
           if (g) {
               const e = -1 == +l.quantity_min ? 1 : l.quantity_min || 0;
               v(e), i({
                   ...r,
                   quantity: e
               }), n(e)
           }
       }), [g, c, l.quantity_min, n]);
       const C = e => !isNaN(e) && (!(e < 1) && (!(-1 !== p && e > p || -1 !== m && e < m) && !(-1 !== E && e > E)));
       let w = !C(h - 1),
           S = !C(h + 1),
           N = m === p;
       return o.default.createElement("div", {
           className: "sellix-stock-container"
       }, o.default.createElement("div", {
           className: "sellix-stock-count"
       }, !N && 1 !== E && o.default.createElement("span", {
           className: `sellix-stock-count-picker unselectable ${w&&"can-click"}`,
           onClick: () => {
               const e = Number(h > m ? h - 1 : h);
               v(e), i({
                   ...r,
                   quantity: e
               }), n(e)
           }
       }, o.default.createElement("i", {
           className: "fa-regular fa-minus"
       })), o.default.createElement("span", null, o.default.createElement("input", {
           type: "text",
           value: h,
           onChange: e => {
               if (!isNaN(e.target.value)) {
                   let t = Number(e.target.value); - 1 === E && -1 !== p && t >= p && (t = +p), -1 !== E && (-1 === p && t >= E && (t = +E), -1 !== p && t >= p && (t = +p)), v(Number(t)), i({
                       ...r,
                       quantity: Number(t)
                   }), n(Number(t))
               }
           },
           onBlur: e => {
               +e.target.value < +m && (v(Number(m)), i({
                   ...r,
                   quantity: Number(m)
               }), n(Number(m)))
           },
           disabled: N,
           style: N ? {
               width: 120
           } : {}
       })), !N && 1 !== E && o.default.createElement("span", {
           className: `sellix-stock-count-picker unselectable ${S&&"can-click"}`,
           onClick: () => {
               if (!C(parseInt(h) + 1)) return !0;
               const e = Number(h) + 1;
               v(e), i({
                   ...r,
                   quantity: e
               }), n(e)
           }
       }, o.default.createElement("i", {
           className: "fa-regular fa-plus"
       }))), 1 === E ? o.default.createElement("div", {
           className: "sellix-stock-total unselectable"
       }, "Last Product") : o.default.createElement("div", {
           className: "sellix-stock-total unselectable"
       }, "Stock", o.default.createElement("div", {
           style: {
               marginLeft: "0.5rem"
           }
       }, -1 === E ? "∞" : b.getStock(E - h))))
   };
   Lr("");
   const yi = ({
           config: e,
           product: t,
           quantity: a,
           isCart: n,
           isOutOfStock: l
       }) => {
           let {
               quantity_min: r,
               quantity_max: i,
               volume_discounts: s,
               currency: u
           } = t;
           const c = e.CURRENCY_LIST[u];
           let d = +a == +r && r !== i && r > 1,
               p = +a == +i && r !== i,
               m = r === i,
               f = [];
           s && (f = JSON.parse(s).volume_discounts);
           let h = f.find((e => !(a >= e.quantity)));
           return l ? null : o.default.createElement("div", null, d || p || m ? o.default.createElement("div", null, o.default.createElement("div", {
               className: "quantity-message"
           }, d && o.default.createElement("span", null, "Minimum required quantity: ", o.default.createElement("b", null, r)), p && o.default.createElement("span", null, " Maximum quantity purchasable: ", o.default.createElement("b", null, i)), m && o.default.createElement("span", null, "You can only purchase ", o.default.createElement("b", null, i), " items per order"))) : null, !n && h ? o.default.createElement("div", {
               className: "discount-message"
           }, o.default.createElement("div", null, o.default.createElement("div", {
               className: "quantity-message"
           }, o.default.createElement("span", {
               style: {
                   fontSize: 14
               }
           }, "Add ", o.default.createElement("b", null, h.quantity - a), " more to get a ", o.default.createElement("b", null, h.value, "FIXED" === h.type ? c : "%"), " discount")))) : null)
       },
       bi = ["Purchase", "Payment Method", "Product Delivery"],
       gi = ({
           hasDiscount: e,
           productDiscounts: a,
           appliedCoupon: n,
           setAppliedCoupon: l,
           currency: r
       }) => {
           const {
               config: i,
               theme: s,
               isCustomDomain: c,
               isCartEnabled: d,
               cartProducts: p,
               productInfo: m,
               addons: f,
               onAddToCart: h,
               onChangeProductQuantity: v,
               onChangeStep: y,
               onCreateInvoice: b,
               onBackToShop: g,
               onShowMessage: E,
               onSuccess: C,
               onFail: w
           } = t.useContext(u), S = i.CURRENCY_LIST[r], N = t.useMemo((() => [m]), [m]), A = ei(), [k, x] = t.useState(null), [P, T] = t.useState(null), [_, L] = t.useState(null), [D, O, I, R, M] = Jr(N, P, _), [F, U] = Qr(N), [B, j] = t.useState(!1), [q, Y] = t.useState(!1), [H, W] = t.useState(A.step ? parseInt(A.step) : 0), G = t.useCallback((e => {
               W(e), y(e)
           }), [y]), [V, $] = t.useState(null), [z, K] = t.useState(!1), [X, , J] = function(e, a) {
               const n = t.useMemo((() => Object.fromEntries(e.map((e => {
                       const t = (a.find((t => t.uniqid === e.uniqid)) || {}).quantity;
                       return t ? [e.uniqid, t || 0] : [e.uniqid, -1 == +e.quantity_min ? 1 : e.quantity_min || 0]
                   })))), [a, e]),
                   [l, o] = t.useState(n),
                   r = t.useCallback(((e, t) => {
                       o((a => a[e] === t ? a : {
                           ...a,
                           [e]: t
                       }))
                   }), []);
               return [l, o, r]
           }(N, p);
           let Z = X[m.uniqid];
           const Q = function({
                   quantity_min: e,
                   type: a,
                   stock: n,
                   priceVariant: l
               }) {
                   return t.useMemo((() => {
                       const t = -1 == +e ? 1 : e;
                       let o = l && "SERIALS" === a ? l.stock || 0 : n;
                       if (-1 == +o) return "";
                       if (0 == +o) return "Product is out of stock";
                       const r = o > 1,
                           i = r ? "are" : "is",
                           s = r ? "s" : "";
                       return parseInt(o) < parseInt(t) ? `There ${i} ${o} item${s} left, but minimum quantity for purchase is ${e}` : ""
                   }), [e, l, a, n])
               }(m),
               ee = t.useMemo((() => (a || []).find((e => e.product.uniqid === m.uniqid))), [a, m.uniqid]),
               {
                   stock: te,
                   price_discount: ae,
                   paymentOptions: ne = []
               } = m,
               {
                   price: le,
                   productDiscount: oe,
                   addonsDiscount: re,
                   addonsList: ie,
                   volumeDiscount: se,
                   volumeAmount: ue,
                   bundleDiscount: ce,
                   couponDiscount: de,
                   taxDiscount: pe
               } = ee;
           let me = +[oe, re, se, ce, de, pe].reduce(((e, t) => t(e)), Z * le).toFixed(2);
           const fe = 0 === Math.sign(me),
               he = t.useMemo((() => (p.find((e => e.uniqid === m.uniqid)) || {}).quantity), [p, m.uniqid]),
               [ve, ye] = t.useState({
                   quantity: Z
               }),
               [be, ge] = t.useState(""),
               Ee = e => {
                   ye({
                       ...ve,
                       step: e
                   }), G(e)
               },
               Ce = Or(),
               we = Xr(P, Ee, E),
               Se = Kr(g),
               [Ne, Ae] = t.useState(!1),
               ke = t.useCallback((() => {
                   Ae(!0), w()
               }), []),
               [xe] = Zr({
                   config: i,
                   isCustomDomain: c,
                   email: V,
                   gateway: P,
                   APM: _,
                   customFields: F,
                   appliedCoupon: n,
                   hasDiscount: e,
                   payPalEmailDelivery: q,
                   isVisibleRegulationForm: I,
                   isExtendedRegulationForm: M,
                   regulationForm: D,
                   setSending: j,
                   onCreateInvoice: b,
                   onShowMessage: E,
                   onSuccess: C,
                   onFail: ke,
                   type: "product",
                   product: m,
                   addons: f,
                   quantity: X[m.uniqid],
                   discordIntegrationCode: A.code
               }),
               Pe = t.useCallback((e => {
                   J(m.uniqid, e), v(m.uniqid, e)
               }), [v, m.uniqid, J]);
           let Te = B || !V || I && !R;
           return t.useEffect((() => {
               const e = {};
               ["quantity", "gateway", "APM", "step", "email", "payPalEmailDelivery", "couponCode"].forEach((t => {
                   A[t] && (e[t] = A[t])
               })), e.redirectUrl = window.location.href.split("?")[0], e.gateway && T(A.gateway), e.APM && L(A.APM), e.step && Ee(parseInt(A.step)), e.quantity && J(A.quantity), ye({
                   ...ve,
                   ...e
               }), ge(i.DISCORD.DISCORD_INTEGRATION_OAUTH_URL + btoa(JSON.stringify(e)))
           }), []), o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
               className: "sellix-product-title",
               style: {
                   height: "18px"
               }
           }, bi[H]), 0 === H && o.default.createElement("div", {
               onClick: Se,
               className: "sellix-product-back"
           }, o.default.createElement("i", {
               className: "fas fa-times"
           })), o.default.createElement("div", {
               className: "sellix-product-body"
           }, 0 !== H || Q ? null : o.default.createElement("div", {
               className: "unselectable w-100"
           }, o.default.createElement(vi, {
               setState: e => {
                   ye(e)
               },
               state: ve,
               productInfo: m,
               productQuantity: Z,
               setProductQuantity: Pe
           }), o.default.createElement("div", {
               className: "sellix-product-total correct-margin-top"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Subtotal"), o.default.createElement("div", null, o.default.createElement("div", {
               className: "sellix-product-total-price unselectable"
           }, o.default.createElement("span", null, -1 === Math.sign(me) || fe ? "" : S), -1 === Math.sign(me) || fe ? "Free" : (+me).toFixed(2)))), ae && !fe ? o.default.createElement("div", {
               className: "sellix-product-total mt-0 pt-2"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Product Discount"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, ae && o.default.createElement("small", {
               style: {
                   fontSize: 14.5
               }
           }, "-", ae, "%"))) : null, ue && !fe ? o.default.createElement("div", {
               className: "sellix-product-total mt-0 pt-2"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Volume Discount"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, ue && o.default.createElement("small", {
               style: {
                   fontSize: 14.5
               }
           }, "-", ue))) : null, !n || n.disabled_with_volume_discounts && e ? null : o.default.createElement("div", {
               className: "sellix-product-total mt-0 pt-2"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Coupon"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, o.default.createElement("small", {
               style: {
                   fontSize: 13.5
               }
           }, "-", "FIXED" === n.discount_type ? S : "", +n.discount, "FIXED" !== n.discount_type ? "%" : ""))), ie.length && !fe ? ie.map((({
               title: e,
               price_conversions: t
           }) => o.default.createElement("div", {
               className: "sellix-product-total mt-0 pt-2"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, e), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, o.default.createElement("small", {
               style: {
                   fontSize: 14.5
               }
           }, i.CURRENCY_LIST[m.currency], t[m.currency]))))) : null, m.vat_percentage && !fe && +m.vat_percentage ? o.default.createElement("div", {
               className: "sellix-product-total mt-0 pt-2"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Tax"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, o.default.createElement("small", {
               style: {
                   fontSize: 14.5
               }
           }, +m.vat_percentage ? m.vat_percentage : 0, "%"))) : null), 1 === H && 0 === ne.length && o.default.createElement("p", {
               className: "sellix-product-no-gateway"
           }, "This product has no payment options."), 1 === H && o.default.createElement("div", {
               className: "sellix-payment-methods"
           }, o.default.createElement(Dr, {
               type: "product",
               config: i,
               theme: s,
               productInfo: m,
               paymentOptions: ne,
               gateway: P,
               APM: _,
               setGateway: (e, t) => {
                   ye({
                       ...ve,
                       gateway: e,
                       APM: t
                   }), T(e), L(t)
               }
           })), 2 === H && o.default.createElement("div", {
               className: "pt-2"
           }, o.default.createElement(di, {
               isPayPal: "PAYPAL" === P || "PAYPAL_CREDIT_CARD" === P,
               isRegulations: I,
               regulationForm: D,
               isExtendedRegulationForm: M,
               customFieldsValues: F,
               setState: e => ye(e),
               state: ve,
               url: be,
               setUrl: e => ge(e),
               config: i,
               invoiceError: Ne,
               onSetEmail: e => $(e),
               onSetPayPalEmailDelivery: e => Y(e),
               onSetCustomFields: (e, t) => {
                   U({
                       ...F,
                       [e]: t
                   }), Ce()
               },
               onSetRegulationForm: e => O(e)
           })), Q && o.default.createElement("p", {
               className: "text-red mt-3"
           }, Q), 0 != +te && o.default.createElement("div", {
               className: "sellix-product-footer"
           }, 0 === H && o.default.createElement("div", null, o.default.createElement(yi, {
               config: i,
               product: m,
               quantity: Z,
               isOutOfStock: Q
           }), o.default.createElement($r, {
               className: "mb-3 w-100",
               onClick: () => Ee(fe ? 2 : 1),
               style: Q ? {
                   opacity: .7,
                   pointerEvents: "none"
               } : {}
           }, fe ? "Get it" : "Buy Now"), o.default.createElement("div", null, o.default.createElement(hi, {
               cartProducts: p,
               product: m,
               openAdd: z,
               onAddToCart: h
           }), o.default.createElement(ti, {
               currency: r,
               setCoupon: e => l(e),
               appliedCoupon: n,
               openCoupon: k,
               setState: ye,
               state: ve,
               disabledWithDiscount: n && n.disabled_with_volume_discounts && e
           }), o.default.createElement("div", {
               className: "d-flex justify-content-center"
           }, fe ? null : o.default.createElement("div", {
               className: "coupon-button",
               onClick: () => x(!k)
           }, o.default.createElement("i", {
               className: "fa-regular fa-tags"
           }), " Apply a Coupon"), !fe && !Q && d && m.stock - (he || 0) ? o.default.createElement("div", {
               className: "coupon-button",
               onClick: () => K(!z)
           }, o.default.createElement("i", {
               className: "fa-regular fa-cart-shopping"
           }), " Add to Cart") : null))), 1 === H && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               onClick: () => Ee(0)
           }, "Back"), o.default.createElement($r, {
               className: "next",
               onClick: we,
               style: Q ? {
                   opacity: .7,
                   pointerEvents: "none"
               } : {}
           }, "Continue")), 2 === H && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               onClick: () => Ee(fe ? 0 : 1)
           }, "Back"), o.default.createElement($r, {
               className: "next",
               disabled: Te,
               onClick: xe
           }, B ? o.default.createElement(zr, null) : null, o.default.createElement("span", {
               style: {
                   display: B ? "none" : "inline"
               }
           }, "Pay"))))))
       };
   /*!
    * cookie
    * Copyright(c) 2012-2014 Roman Shtylman
    * Copyright(c) 2015 Douglas Christopher Wilson
    * MIT Licensed
    */
   var Ei = function(e, t) {
           if ("string" != typeof e) throw new TypeError("argument str must be a string");
           for (var a = {}, n = t || {}, l = e.split(";"), o = n.decode || wi, r = 0; r < l.length; r++) {
               var i = l[r],
                   s = i.indexOf("=");
               if (!(s < 0)) {
                   var u = i.substring(0, s).trim();
                   if (null == a[u]) {
                       var c = i.substring(s + 1, i.length).trim();
                       '"' === c[0] && (c = c.slice(1, -1)), a[u] = Ai(c, o)
                   }
               }
           }
           return a
       },
       Ci = function(e, t, a) {
           var n = a || {},
               l = n.encode || Si;
           if ("function" != typeof l) throw new TypeError("option encode is invalid");
           if (!Ni.test(e)) throw new TypeError("argument name is invalid");
           var o = l(t);
           if (o && !Ni.test(o)) throw new TypeError("argument val is invalid");
           var r = e + "=" + o;
           if (null != n.maxAge) {
               var i = n.maxAge - 0;
               if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
               r += "; Max-Age=" + Math.floor(i)
           }
           if (n.domain) {
               if (!Ni.test(n.domain)) throw new TypeError("option domain is invalid");
               r += "; Domain=" + n.domain
           }
           if (n.path) {
               if (!Ni.test(n.path)) throw new TypeError("option path is invalid");
               r += "; Path=" + n.path
           }
           if (n.expires) {
               if ("function" != typeof n.expires.toUTCString) throw new TypeError("option expires is invalid");
               r += "; Expires=" + n.expires.toUTCString()
           }
           n.httpOnly && (r += "; HttpOnly");
           n.secure && (r += "; Secure");
           if (n.sameSite) {
               switch ("string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite) {
                   case !0:
                       r += "; SameSite=Strict";
                       break;
                   case "lax":
                       r += "; SameSite=Lax";
                       break;
                   case "strict":
                       r += "; SameSite=Strict";
                       break;
                   case "none":
                       r += "; SameSite=None";
                       break;
                   default:
                       throw new TypeError("option sameSite is invalid")
               }
           }
           return r
       },
       wi = decodeURIComponent,
       Si = encodeURIComponent,
       Ni = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

   function Ai(e, t) {
       try {
           return t(e)
       } catch (t) {
           return e
       }
   }

   function ki(e, t) {
       void 0 === t && (t = {});
       var a = function(e) {
           if (e && "j" === e[0] && ":" === e[1]) return e.substr(2);
           return e
       }(e);
       if (function(e, t) {
               return void 0 === t && (t = !e || "{" !== e[0] && "[" !== e[0] && '"' !== e[0]), !t
           }(a, t.doNotParse)) try {
           return JSON.parse(a)
       } catch (e) {}
       return e
   }
   var xi = function() {
           return xi = Object.assign || function(e) {
               for (var t, a = 1, n = arguments.length; a < n; a++)
                   for (var l in t = arguments[a]) Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
               return e
           }, xi.apply(this, arguments)
       },
       Pi = function() {
           function e(e, t) {
               var a = this;
               this.changeListeners = [], this.HAS_DOCUMENT_COOKIE = !1, this.cookies = function(e, t) {
                   return "string" == typeof e ? Ei(e, t) : "object" == typeof e && null !== e ? e : {}
               }(e, t), new Promise((function() {
                   a.HAS_DOCUMENT_COOKIE = "object" == typeof document && "string" == typeof document.cookie
               })).catch((function() {}))
           }
           return e.prototype._updateBrowserValues = function(e) {
               this.HAS_DOCUMENT_COOKIE && (this.cookies = Ei(document.cookie, e))
           }, e.prototype._emitChange = function(e) {
               for (var t = 0; t < this.changeListeners.length; ++t) this.changeListeners[t](e)
           }, e.prototype.get = function(e, t, a) {
               return void 0 === t && (t = {}), this._updateBrowserValues(a), ki(this.cookies[e], t)
           }, e.prototype.getAll = function(e, t) {
               void 0 === e && (e = {}), this._updateBrowserValues(t);
               var a = {};
               for (var n in this.cookies) a[n] = ki(this.cookies[n], e);
               return a
           }, e.prototype.set = function(e, t, a) {
               var n;
               "object" == typeof t && (t = JSON.stringify(t)), this.cookies = xi(xi({}, this.cookies), ((n = {})[e] = t, n)), this.HAS_DOCUMENT_COOKIE && (document.cookie = Ci(e, t, a)), this._emitChange({
                   name: e,
                   value: t,
                   options: a
               })
           }, e.prototype.remove = function(e, t) {
               var a = t = xi(xi({}, t), {
                   expires: new Date(1970, 1, 1, 0, 0, 1),
                   maxAge: 0
               });
               this.cookies = xi({}, this.cookies), delete this.cookies[e], this.HAS_DOCUMENT_COOKIE && (document.cookie = Ci(e, "", a)), this._emitChange({
                   name: e,
                   value: void 0,
                   options: t
               })
           }, e.prototype.addChangeListener = function(e) {
               this.changeListeners.push(e)
           }, e.prototype.removeChangeListener = function(e) {
               var t = this.changeListeners.indexOf(e);
               t >= 0 && this.changeListeners.splice(t, 1)
           }, e
       }();

   function Ti() {
       let e = "local-test-sellix.com";
       return window.location.hostname.includes("sellix.gg") ? e = "sellix.gg" : window.location.hostname.includes("mysellix.io") ? e = "mysellix.io" : window.location.hostname.includes("sellix.io") && (e = "sellix.io"), e
   }
   /*!
    * Adapted from jQuery UI core
    *
    * http://jqueryui.com
    *
    * Copyright 2014 jQuery Foundation and other contributors
    * Released under the MIT license.
    * http://jquery.org/license
    *
    * http://api.jqueryui.com/category/ui-core/
    */
   const _i = /input|select|textarea|button|object|iframe/;

   function Li(e) {
       const t = e.offsetWidth <= 0 && e.offsetHeight <= 0;
       if (t && !e.innerHTML) return !0;
       try {
           const a = window.getComputedStyle(e);
           return t ? "visible" !== a.getPropertyValue("overflow") || e.scrollWidth <= 0 && e.scrollHeight <= 0 : "none" == a.getPropertyValue("display")
       } catch (e) {
           return console.warn("Failed to inspect element style"), !1
       }
   }

   function Di(e, t) {
       const a = e.nodeName.toLowerCase();
       return (_i.test(a) && !e.disabled || "a" === a && e.href || t) && function(e) {
           let t = e,
               a = e.getRootNode && e.getRootNode();
           for (; t && t !== document.body;) {
               if (a && t === a && (t = a.host.parentNode), Li(t)) return !1;
               t = t.parentNode
           }
           return !0
       }(e)
   }

   function Oi(e) {
       let t = e.getAttribute("tabindex");
       null === t && (t = void 0);
       const a = isNaN(t);
       return (a || t >= 0) && Di(e, !a)
   }

   function Ii(e) {
       return [].slice.call(e.querySelectorAll("*"), 0).reduce(((e, t) => e.concat(t.shadowRoot ? Ii(t.shadowRoot) : [t])), []).filter(Oi)
   }
   let Ri = [],
       Mi = null,
       Fi = !1;

   function Ui() {
       Fi = !0
   }

   function Bi() {
       if (Fi) {
           if (Fi = !1, !Mi) return;
           setTimeout((() => {
               if (Mi.contains(document.activeElement)) return;
               (Ii(Mi)[0] || Mi).focus()
           }), 0)
       }
   }

   function ji(e = document) {
       return e.activeElement.shadowRoot ? ji(e.activeElement.shadowRoot) : e.activeElement
   }

   function qi(e, t) {
       const a = Ii(e);
       if (!a.length) return void t.preventDefault();
       let n;
       const l = t.shiftKey,
           o = a[0],
           r = a[a.length - 1],
           i = ji();
       if (e === i) {
           if (!l) return;
           n = r
       }
       if (r !== i || l || (n = o), o === i && l && (n = r), n) return t.preventDefault(), void n.focus();
       const s = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
       if (null != s && "Chrome" != s[1] && null == /\biPod\b|\biPad\b/g.exec(navigator.userAgent)) {
           var u = a.indexOf(i);
           if (u > -1 && (u += l ? -1 : 1), n = a[u], void 0 === n) return t.preventDefault(), n = l ? r : o, void n.focus();
           t.preventDefault(), n.focus()
       }
   }
   var Yi = !("undefined" == typeof window || !window.document || !window.document.createElement);
   const Hi = {
       canUseDOM: Yi,
       canUseWorkers: "undefined" != typeof Worker,
       canUseEventListeners: Yi && !(!window.addEventListener && !window.attachEvent),
       canUseViewport: Yi && !!window.screen
   }.canUseDOM;
   let Wi = null;

   function Gi(e) {
       let t = e;
       if ("string" == typeof t && Hi) {
           const e = document.querySelectorAll(t);
           ! function(e, t) {
               if (!e || !e.length) throw new Error(`react-modal: No elements were found for selector ${t}.`)
           }(e, t), t = e
       }
       return Wi = t || Wi, Wi
   }

   function Vi(e) {
       const t = e || Wi;
       if (t) return Array.isArray(t) || t instanceof HTMLCollection || t instanceof NodeList ? t : [t];
       throw Error(["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "))
   }
   let $i = {},
       zi = {};
   const Ki = (e, t) => {
           return a = e.classList, n = "html" == e.nodeName.toLowerCase() ? $i : zi, void t.split(" ").forEach((e => {
               ((e, t) => {
                   e[t] || (e[t] = 0), e[t] += 1
               })(n, e), a.add(e)
           }));
           var a, n
       },
       Xi = (e, t) => {
           return a = e.classList, n = "html" == e.nodeName.toLowerCase() ? $i : zi, void t.split(" ").forEach((e => {
               ((e, t) => {
                   e[t] && (e[t] -= 1)
               })(n, e), 0 === n[e] && a.remove(e)
           }));
           var a, n
       };
   let Ji, Zi, Qi = new class {
           constructor() {
               this.openInstances = [], this.subscribers = []
           }
           register = e => {
               -1 === this.openInstances.indexOf(e) && (this.openInstances.push(e), this.emit("register"))
           };
           deregister = e => {
               const t = this.openInstances.indexOf(e); - 1 !== t && (this.openInstances.splice(t, 1), this.emit("deregister"))
           };
           subscribe = e => {
               this.subscribers.push(e)
           };
           emit = e => {
               this.subscribers.forEach((t => t(e, this.openInstances.slice())))
           }
       },
       es = [];

   function ts() {
       0 !== es.length && es[es.length - 1].focusContent()
   }
   Qi.subscribe((function(e, t) {
       Ji || Zi || (Ji = document.createElement("div"), Ji.setAttribute("data-react-modal-body-trap", ""), Ji.style.position = "absolute", Ji.style.opacity = "0", Ji.setAttribute("tabindex", "0"), Ji.addEventListener("focus", ts), Zi = Ji.cloneNode(), Zi.addEventListener("focus", ts)), es = t, es.length > 0 ? (document.body.firstChild !== Ji && document.body.insertBefore(Ji, document.body.firstChild), document.body.lastChild !== Zi && document.body.appendChild(Zi)) : (Ji.parentElement && Ji.parentElement.removeChild(Ji), Zi.parentElement && Zi.parentElement.removeChild(Zi))
   }));
   const as = {
       overlay: "ReactModal__Overlay",
       content: "ReactModal__Content"
   };
   let ns = 0;
   class ls extends t.Component {
       static defaultProps = {
           style: {
               overlay: {},
               content: {}
           },
           defaultStyles: {}
       };
       constructor(e) {
           super(e), this.state = {
               afterOpen: !1,
               beforeClose: !1
           }, this.shouldClose = null, this.moveFromContentToOverlay = null
       }
       componentDidMount() {
           this.props.isOpen && this.open()
       }
       componentDidUpdate(e, t) {
           this.props.isOpen && !e.isOpen ? this.open() : !this.props.isOpen && e.isOpen && this.close(), this.props.shouldFocusAfterRender && this.state.isOpen && !t.isOpen && this.focusContent()
       }
       componentWillUnmount() {
           this.state.isOpen && this.afterClose(), clearTimeout(this.closeTimer), cancelAnimationFrame(this.openAnimationFrame)
       }
       setOverlayRef = e => {
           this.overlay = e, this.props.overlayRef && this.props.overlayRef(e)
       };
       setContentRef = e => {
           this.content = e, this.props.contentRef && this.props.contentRef(e)
       };
       beforeOpen() {
           const {
               appElement: e,
               ariaHideApp: t,
               htmlOpenClassName: a,
               bodyOpenClassName: n
           } = this.props;
           n && Ki(document.body, n), a && Ki(document.getElementsByTagName("html")[0], a), t && (ns += 1, function(e) {
               for (let t of Vi(e)) t.setAttribute("aria-hidden", "true")
           }(e)), Qi.register(this)
       }
       afterClose = () => {
           const {
               appElement: e,
               ariaHideApp: t,
               htmlOpenClassName: a,
               bodyOpenClassName: n
           } = this.props;
           n && Xi(document.body, n), a && Xi(document.getElementsByTagName("html")[0], a), t && ns > 0 && (ns -= 1, 0 === ns && function(e) {
               for (let t of Vi(e)) t.removeAttribute("aria-hidden")
           }(e)), this.props.shouldFocusAfterRender && (this.props.shouldReturnFocusAfterClose ? (! function(e = !1) {
               let t = null;
               try {
                   0 !== Ri.length && (t = Ri.pop(), t.focus({
                       preventScroll: e
                   }))
               } catch (e) {
                   console.warn(["You tried to return focus to", t, "but it is not in the DOM anymore"].join(" "))
               }
           }(this.props.preventScroll), Mi = null, window.addEventListener ? (window.removeEventListener("blur", Ui), document.removeEventListener("focus", Bi)) : (window.detachEvent("onBlur", Ui), document.detachEvent("onFocus", Bi))) : Ri.length > 0 && Ri.pop()), this.props.onAfterClose && this.props.onAfterClose(), Qi.deregister(this)
       };
       open = () => {
           var e;
           this.beforeOpen(), this.state.afterOpen && this.state.beforeClose ? (clearTimeout(this.closeTimer), this.setState({
               beforeClose: !1
           })) : (this.props.shouldFocusAfterRender && (e = this.node, Mi = e, window.addEventListener ? (window.addEventListener("blur", Ui, !1), document.addEventListener("focus", Bi, !0)) : (window.attachEvent("onBlur", Ui), document.attachEvent("onFocus", Bi)), Ri.push(document.activeElement)), this.setState({
               isOpen: !0
           }, (() => {
               this.openAnimationFrame = requestAnimationFrame((() => {
                   this.setState({
                       afterOpen: !0
                   }), this.props.isOpen && this.props.onAfterOpen && this.props.onAfterOpen({
                       overlayEl: this.overlay,
                       contentEl: this.content
                   })
               }))
           })))
       };
       close = () => {
           this.props.closeTimeoutMS > 0 ? this.closeWithTimeout() : this.closeWithoutTimeout()
       };
       focusContent = () => this.content && !this.contentHasFocus() && this.content.focus({
           preventScroll: !0
       });
       closeWithTimeout = () => {
           const e = Date.now() + this.props.closeTimeoutMS;
           this.setState({
               beforeClose: !0,
               closesAt: e
           }, (() => {
               this.closeTimer = setTimeout(this.closeWithoutTimeout, this.state.closesAt - Date.now())
           }))
       };
       closeWithoutTimeout = () => {
           this.setState({
               beforeClose: !1,
               isOpen: !1,
               afterOpen: !1,
               closesAt: null
           }, this.afterClose)
       };
       handleKeyDown = e => {
           9 === e.keyCode && qi(this.content, e), this.props.shouldCloseOnEsc && 27 === e.keyCode && (e.stopPropagation(), this.requestClose(e))
       };
       handleOverlayOnClick = e => {
           null === this.shouldClose && (this.shouldClose = !0), this.shouldClose && this.props.shouldCloseOnOverlayClick && (this.ownerHandlesClose() ? this.requestClose(e) : this.focusContent()), this.shouldClose = null
       };
       handleContentOnMouseUp = () => {
           this.shouldClose = !1
       };
       handleOverlayOnMouseDown = e => {
           this.props.shouldCloseOnOverlayClick || e.target != this.overlay || e.preventDefault()
       };
       handleContentOnClick = () => {
           this.shouldClose = !1
       };
       handleContentOnMouseDown = () => {
           this.shouldClose = !1
       };
       requestClose = e => this.ownerHandlesClose() && this.props.onRequestClose(e);
       ownerHandlesClose = () => this.props.onRequestClose;
       shouldBeClosed = () => !this.state.isOpen && !this.state.beforeClose;
       contentHasFocus = () => document.activeElement === this.content || this.content.contains(document.activeElement);
       buildClassName = (e, t) => {
           const a = "object" == typeof t ? t : {
               base: as[e],
               afterOpen: `${as[e]}--after-open`,
               beforeClose: `${as[e]}--before-close`
           };
           let n = a.base;
           return this.state.afterOpen && (n = `${n} ${a.afterOpen}`), this.state.beforeClose && (n = `${n} ${a.beforeClose}`), "string" == typeof t && t ? `${n} ${t}` : n
       };
       attributesFromObject = (e, t) => Object.keys(t).reduce(((a, n) => (a[`${e}-${n}`] = t[n], a)), {});
       render() {
           const {
               id: e,
               className: t,
               overlayClassName: a,
               defaultStyles: n,
               children: l
           } = this.props, o = t ? {} : n.content, r = a ? {} : n.overlay;
           if (this.shouldBeClosed()) return null;
           const i = {
                   ref: this.setOverlayRef,
                   className: this.buildClassName("overlay", a),
                   style: {
                       ...r,
                       ...this.props.style.overlay
                   },
                   onClick: this.handleOverlayOnClick,
                   onMouseDown: this.handleOverlayOnMouseDown
               },
               s = {
                   id: e,
                   ref: this.setContentRef,
                   style: {
                       ...o,
                       ...this.props.style.content
                   },
                   className: this.buildClassName("content", t),
                   tabIndex: "-1",
                   onKeyDown: this.handleKeyDown,
                   onMouseDown: this.handleContentOnMouseDown,
                   onMouseUp: this.handleContentOnMouseUp,
                   onClick: this.handleContentOnClick,
                   role: this.props.role,
                   "aria-label": this.props.contentLabel,
                   ...this.attributesFromObject("aria", {
                       modal: !0,
                       ...this.props.aria
                   }),
                   ...this.attributesFromObject("data", this.props.data || {}),
                   "data-testid": this.props.testId
               },
               u = this.props.contentElement(s, l);
           return this.props.overlayElement(i, u)
       }
   }
   const os = Hi && void 0 !== i.default.createPortal;
   let rs = e => document.createElement(e);
   const is = () => os ? i.default.createPortal : i.default.unstable_renderSubtreeIntoContainer;

   function ss(e) {
       return e()
   }
   class us extends t.Component {
       static defaultProps = {
           isOpen: !1,
           portalClassName: "ReactModalPortal",
           bodyOpenClassName: "ReactModal__Body--open",
           role: "dialog",
           ariaHideApp: !0,
           closeTimeoutMS: 0,
           shouldFocusAfterRender: !0,
           shouldCloseOnEsc: !0,
           shouldCloseOnOverlayClick: !0,
           shouldReturnFocusAfterClose: !0,
           preventScroll: !1,
           parentSelector: () => document.body,
           overlayElement: (e, t) => o.default.createElement("div", e, t),
           contentElement: (e, t) => o.default.createElement("div", e, t)
       };
       static defaultStyles = {
           overlay: {
               position: "fixed",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: "rgba(255, 255, 255, 0.75)"
           },
           content: {
               position: "absolute",
               top: "40px",
               left: "40px",
               right: "40px",
               bottom: "40px",
               border: "1px solid #ccc",
               background: "#fff",
               overflow: "auto",
               WebkitOverflowScrolling: "touch",
               borderRadius: "4px",
               outline: "none",
               padding: "20px"
           }
       };
       static setAppElement(e) {
           Gi(e)
       }
       componentDidMount() {
           if (!Hi) return;
           os || (this.node = rs("div")), this.node.className = this.props.portalClassName;
           ss(this.props.parentSelector).appendChild(this.node), !os && this.renderPortal(this.props)
       }
       getSnapshotBeforeUpdate(e) {
           return {
               prevParent: ss(e.parentSelector),
               nextParent: ss(this.props.parentSelector)
           }
       }
       componentDidUpdate(e, t, a) {
           if (!Hi) return;
           const {
               isOpen: n,
               portalClassName: l
           } = this.props;
           e.portalClassName !== l && (this.node.className = l);
           const {
               prevParent: o,
               nextParent: r
           } = a;
           r !== o && (o.removeChild(this.node), r.appendChild(this.node)), (e.isOpen || n) && !os && this.renderPortal(this.props)
       }
       componentWillUnmount() {
           if (!Hi || !this.node || !this.portal) return;
           const e = this.portal.state,
               t = Date.now(),
               a = e.isOpen && this.props.closeTimeoutMS && (e.closesAt || t + this.props.closeTimeoutMS);
           a ? (e.beforeClose || this.portal.closeWithTimeout(), setTimeout(this.removePortal, a - t)) : this.removePortal()
       }
       removePortal = () => {
           !os && i.default.unmountComponentAtNode(this.node);
           const e = ss(this.props.parentSelector);
           e && e.contains(this.node) ? e.removeChild(this.node) : console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.')
       };
       portalRef = e => {
           this.portal = e
       };
       renderPortal = e => {
           const t = is()(this, o.default.createElement(ls, Ir({
               defaultStyles: us.defaultStyles
           }, e)), this.node);
           this.portalRef(t)
       };
       render() {
           if (!Hi || !os) return null;
           !this.node && os && (this.node = rs("div"));
           return is()(o.default.createElement(ls, Ir({
               ref: this.portalRef,
               defaultStyles: us.defaultStyles
           }, this.props)), this.node)
       }
   }
   Lr(""), us.setAppElement("#modal");
   Lr("");
   Lr("");
   Lr("");
   Lr("");
   Lr("");
   Lr("");
   const cs = () => o.default.createElement("div", {
       className: "sw-container"
   }, o.default.createElement("div", {
       className: "sw",
       style: {
           width: 140,
           top: "-.75rem",
           backgroundColor: "transparent"
       }
   }, o.default.createElement("div", {
       className: "sw-icon-success"
   }, o.default.createElement("div", {
       className: "elem-1"
   }), o.default.createElement("span", {
       className: "elem-2"
   }), o.default.createElement("span", {
       className: "elem-3"
   }), o.default.createElement("div", {
       className: "elem-4"
   }), o.default.createElement("div", {
       className: "elem-5"
   }), o.default.createElement("div", {
       className: "elem-6"
   }))));
   Lr("");
   const ds = ({
           invoice: e,
           isTrial: t,
           isSubscription: a
       }) => o.default.createElement("div", {
           className: "sellix-delivery-success"
       }, o.default.createElement("div", {
           className: "sellix-delivery-success-header"
       }, o.default.createElement(cs, null), o.default.createElement("div", {
           className: "sellix-delivery-success-title"
       }, e && +e.developer_invoice ? "Payment Completed" : t ? "Trial Start" : a ? "Subscription Started" : "Order completed!")), o.default.createElement("div", {
           className: "sellix-delivery-success-info"
       }, e && +e.developer_invoice ? o.default.createElement(o.default.Fragment, null, "Your invoice has been paid.", o.default.createElement("br", null), "We will send a confirmation email to your address and you will be redirected to the seller's website") : t ? o.default.createElement(o.default.Fragment, null, "Your trial has been started. ", o.default.createElement("br", null), "You will receive the product within minutes, check your email!") : a ? o.default.createElement(o.default.Fragment, null, "Your subscription is now active. ", o.default.createElement("br", null), "You will receive an email with the confirmation of your purchase and a receipt soon.") : o.default.createElement(o.default.Fragment, null, "Your invoice has been paid. ", o.default.createElement("br", null), "You will receive the product within minutes, check your email!"))),
       ps = ({
           hasDiscount: e,
           productDiscounts: a,
           appliedCoupon: n,
           setAppliedCoupon: l,
           currency: r
       }) => {
           const {
               config: i,
               theme: s,
               isCustomDomain: c,
               productInfo: d,
               addons: p,
               onCreateInvoice: m,
               onCreateInvoiceTrial: f,
               onBackToShop: h,
               onShowMessage: v,
               onCustomerAuthEmail: y,
               onCustomerAuthCode: b,
               onChangeStep: g,
               onSuccess: E,
               onFail: C
           } = t.useContext(u), w = {};
           window.location.search.replace("?", "").split("&").forEach((e => {
               w[e.split(/=(.*)/s)[0]] = e.split(/=(.*)/s)[1]
           }));
           const {
               price_display: S,
               paymentOptions: N = []
           } = d, A = i.CURRENCY_LIST[r], k = t.useMemo((() => ["Subscription", d.trial_period ? "Available Gateways After Trial Ends" : "Payment Method", "Subscription Email", "Billing Info"]), [d.trial_period]), x = t.useMemo((() => [null, d.trial_period ? "You are not able to select these gateways now, it's just for your information to know how you will be able to pay after the trial period ends." : null, null, null])), P = t.useMemo((() => [d]), [d]), [T, _] = t.useState(null), [L, D] = t.useState(null), [O, I] = t.useState(null), [R, M, F, U, B] = Jr(P, L, O), [j, q] = Qr(P), [Y, H] = t.useState(!1), [W, G] = t.useState(!1), [V, $] = t.useState(!0), [z, K] = t.useState(!1), [X, J] = t.useState(w.step ? parseInt(w.step) : 0), Z = t.useCallback((e => {
               J(e), g(e)
           }), [g]), [Q, ee] = t.useState(null), te = t.useMemo((() => (a || []).find((e => e.product.uniqid === d.uniqid))), [a, d.uniqid]), {
               price: ae,
               productDiscount: ne,
               addonsDiscount: le,
               addonsList: oe,
               volumeDiscount: re,
               volumeAmount: ie,
               bundleDiscount: se,
               couponDiscount: ue,
               taxDiscount: ce
           } = te, [de, pe] = t.useState({}), [me, fe] = t.useState(""), he = e => {
               pe({
                   ...de,
                   step: e
               }), Z(e)
           }, [ve, ye] = t.useState(""), [be, ge] = t.useState(""), [Ee, Ce] = t.useState(""), {
               setCookies: we
           } = function() {
               const e = t.useMemo((() => new Pi), []);
               let a = t.useCallback(((t, a = "customerToken") => {
                   let n = {
                       path: "/",
                       expires: new Date((new Date).getFullYear() + 1, 1, 1, 1, 1, 1, 0),
                       sameSite: "lax",
                       secure: !window.location.hostname.includes("local-test-sellix.com")
                   };
                   [`.customer-portal.${Ti()}`, window.location.hostname].forEach((l => {
                       e.set(a, t, {
                           domain: l,
                           ...n
                       })
                   }))
               }), [e]);
               return {
                   setCookies: a,
                   removeCookies: t.useCallback(((t = "customerToken") => {
                       let a = {
                           path: "/",
                           expires: new Date(2e3, 1, 1, 1, 1, 1, 0),
                           sameSite: "lax",
                           secure: !1
                       };
                       [`.customer-portal.${Ti()}`, window.location.hostname].forEach((n => {
                           e.set(t, "", {
                               domain: n,
                               ...a
                           })
                       }))
                   }), [e])
               }
           }(), Se = Or(), Ne = Xr(L, he, v, d.trial_period), Ae = Kr(h), [ke, xe] = t.useState(!1), Pe = t.useCallback((() => {
               xe(!0), C()
           }), []), [Te, _e] = Zr({
               config: i,
               isCustomDomain: c,
               email: Q,
               gateway: L,
               APM: O,
               customFields: j,
               appliedCoupon: n,
               hasDiscount: e,
               payPalEmailDelivery: z,
               setSending: H,
               onCreateInvoice: m,
               onCreateInvoiceTrial: f,
               onShowMessage: v,
               onSuccess: E,
               isVisibleRegulationForm: F,
               isExtendedRegulationForm: B,
               onFail: Pe,
               type: "product",
               product: d,
               addons: p,
               quantity: 1,
               trialPeriod: d.trial_period,
               discordIntegrationCode: w.code
           });
           t.useEffect((() => {
               const e = {};
               ["gateway", "APM", "step", "email", "payPalEmailDelivery", "couponCode"].forEach((t => {
                   w[t] && (e[t] = w[t])
               })), e.gateway && D(w.gateway), e.APM && I(w.APM), e.step && he(parseInt(w.step)), e.redirectUrl = window.location.href.split("?")[0], pe({
                   ...de,
                   ...e
               }), fe(i.DISCORD.DISCORD_INTEGRATION_OAUTH_URL + btoa(JSON.stringify(e)))
           }), []);
           const Le = Number(ue(S) || 0).toFixed(2) || 0;
           return "success" === _e ? o.default.createElement("div", null, o.default.createElement(ds, {
               isTrial: !0
           })) : o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
               className: `sellix-product-title ${Boolean(x[X])&&"has-subtitle"}`,
               style: {
                   height: "18px"
               }
           }, k[X]), Boolean(x[X]) && o.default.createElement("div", {
               className: "sellix-product-subtitle"
           }, x[X]), 0 === X && o.default.createElement("div", {
               onClick: Ae,
               className: "sellix-product-back"
           }, o.default.createElement("i", {
               className: "fas fa-times"
           })), o.default.createElement("div", {
               className: "sellix-product-body"
           }, 0 === X ? o.default.createElement("div", {
               className: "unselectable w-100"
           }, o.default.createElement("div", {
               className: "sellix-product-total mt-0"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Billed every"), o.default.createElement("div", null, o.default.createElement("b", null, d.recurring_interval_count, " ", i.RECURRING_INTERVAL.find((({
               value: e
           }) => d.recurring_interval === e)).label.toLowerCase(), d.recurring_interval_count > 1 ? "s" : ""))), d.trial_period ? o.default.createElement("div", {
               className: "sellix-product-total correct-margin-top"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Trial period"), o.default.createElement("div", null, o.default.createElement("b", null, d.trial_period, " day", d.trial_period > 1 ? "s" : ""))) : null, d.trial_period ? null : oe.map((({
               title: e,
               uniqid: t,
               price_conversions: a
           }) => o.default.createElement("div", {
               className: "sellix-product-total mt-2",
               key: t
           }, o.default.createElement("span", {
               "data-tip": !0,
               "data-for": `addon-${t}`,
               className: "unselectable cursor-pointer"
           }, e, o.default.createElement("i", {
               className: "fa-light fa-info-circle ml-2"
           }), o.default.createElement(gr, {
               id: `addon-${t}`,
               place: "left",
               className: "sellix-check-item-tooltip"
           }, "Payment for the addon is charged only the first time")), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, o.default.createElement("small", {
               style: {
                   fontSize: 14.5
               }
           }, i.CURRENCY_LIST[d.currency], a[d.currency]))))), o.default.createElement("div", {
               className: "sellix-product-total correct-margin-top"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Payment at each renewal"), o.default.createElement("div", null, o.default.createElement("div", {
               className: "sellix-product-total-price unselectable"
           }, o.default.createElement("span", null, -1 === Math.sign(Le) ? "" : A), -1 === Math.sign(Le) ? "Free" : (+Le + +Le * +d.vat_percentage / 100).toFixed(2)))), n && o.default.createElement("div", {
               className: "sellix-product-total mt-0 pt-2"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Coupon"), o.default.createElement("div", {
               className: "d-flex flex-column align-items-end",
               style: {
                   color: "var(--lightFontColor)"
               }
           }, n && o.default.createElement("small", {
               style: {
                   fontSize: 13.5
               }
           }, "-", "FIXED" === n.discount_type ? r : "", +n.discount, "FIXED" !== n.discount_type ? "%" : ""))), +d.vat_percentage ? o.default.createElement("div", {
               className: "sellix-product-total"
           }, o.default.createElement("span", {
               className: "unselectable"
           }, "Tax"), o.default.createElement("div", null, o.default.createElement("b", null, d.vat_percentage, "%"))) : null) : null, 1 === X && 0 === N.length && o.default.createElement("p", {
               className: "sellix-product-no-gateway"
           }, "This product has no payment options."), 1 === X && o.default.createElement("div", {
               className: "sellix-payment-methods"
           }, o.default.createElement(Dr, {
               type: "product",
               config: i,
               theme: s,
               productInfo: d,
               appliedCoupon: n,
               isSubscription: !0,
               paymentOptions: N,
               gateway: d.trial_period ? null : L,
               APM: O,
               setGateway: (e, t) => {
                   pe({
                       ...de,
                       gateway: e,
                       APM: t
                   }), D(e), I(t)
               }
           })), 2 === X && o.default.createElement("div", {
               className: "pt-2"
           }, o.default.createElement(di, {
               isPayPal: "PAYPAL" === L || "PAYPAL_CREDIT_CARD" === L,
               customFieldsValues: j,
               setState: e => pe(e),
               state: de,
               url: me,
               setUrl: e => fe(e),
               invoiceError: ke,
               onSetEmail: e => ee(e),
               config: i,
               onSetPayPalEmailDelivery: e => K(e),
               onSetCustomFields: (e, t) => {
                   q({
                       ...j,
                       [e]: t
                   }), Se()
               }
           })), 3 === X && o.default.createElement("div", {
               className: "pt-2"
           }, o.default.createElement(ni, {
               setFirstName: ye,
               setLastName: ge,
               setCode: Ce,
               firstname: ve,
               lastname: be,
               code: Ee,
               skipFields: V
           })), o.default.createElement("div", {
               className: "sellix-product-footer"
           }, 0 === X && o.default.createElement("div", null, o.default.createElement($r, {
               className: "w-100",
               onClick: () => he(1)
           }, "Payment Method")), 1 === X && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               onClick: () => he(0)
           }, "Back"), o.default.createElement($r, {
               className: "next",
               onClick: Ne
           }, "Continue")), 2 === X && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               onClick: () => he(1)
           }, "Back"), o.default.createElement($r, {
               className: "next",
               disabled: W || !Q,
               onClick: () => {
                   G(!0);
                   y({
                       email: Q
                   }).then((({
                       data: e,
                       status: t,
                       error: a
                   }) => {
                       200 === t ? (he(3), e && e.fields_required && $(!1)) : v({
                           type: "error",
                           text: a || "Server error!"
                       })
                   })).catch((e => {
                       v({
                           type: "error",
                           text: e ? e.error || e.message : "Server error!"
                       })
                   })).finally((() => {
                       G(!1)
                   }))
               }
           }, W ? o.default.createElement(zr, null) : "Continue")), 3 === X && "error" !== _e && o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "button-ghost back",
               disabled: Y || !Q,
               onClick: () => {
                   he(2), Ce("")
               }
           }, "Change Email"), o.default.createElement($r, {
               className: "next",
               onClick: () => {
                   G(!0);
                   let e = {
                       email: Q,
                       code: Ee
                   };
                   V || (e.name = ve, e.surname = be), b(e).then((({
                       data: e,
                       status: t,
                       error: a,
                       message: n
                   }) => {
                       if (200 === t) return we(e.token), Te({
                           token: e.token,
                           onFailCreateInvoice: () => {
                               Ce(""), he(2)
                           }
                       });
                       v({
                           type: "error",
                           text: a || "Server error!"
                       })
                   })).catch((e => {
                       v({
                           type: "error",
                           text: e ? e.error || e.message : "Server error!"
                       })
                   })).finally((() => {
                       G(!1)
                   }))
               }
           }, Y ? o.default.createElement(zr, null) : d.trial_period ? "Start Trial" : "Start Subscription")), "error" === _e ? o.default.createElement("div", {
               className: "d-flex justify-content-between"
           }, o.default.createElement($r, {
               className: "w-100"
           }, "Go to Customer Billing Portal")) : null, 0 === X && o.default.createElement("div", {
               className: "mt-3"
           }, o.default.createElement(ti, {
               setCoupon: e => l(e),
               appliedCoupon: n,
               openCoupon: T,
               setState: pe,
               state: de,
               disabledWithDiscount: !1,
               showPayPalWarning: N.includes("PAYPAL")
           }), o.default.createElement("div", {
               className: "d-flex justify-content-center"
           }, o.default.createElement("div", {
               className: "coupon-button",
               onClick: () => _(!T)
           }, o.default.createElement("i", {
               className: "fa-regular fa-tags"
           }), " Apply a Coupon"))))))
       };
   return e.PurchaseDetails = ({
       config: e,
       isCartEnabled: a,
       isCustomDomain: n,
       shopInfo: l,
       type: r,
       productInfo: i,
       invoiceInfo: p,
       cartProducts: m,
       addons: f,
       bundles: h,
       priceVariants: v,
       theme: y,
       settings: b,
       onAddToCart: g,
       onApplyCoupon: E,
       onBackToShop: C,
       onCreateInvoice: w,
       onCreateInvoiceTrial: S,
       onShowMessage: N,
       onShowProductTerms: A,
       onChangeProductQuantity: k,
       onChangeStep: x,
       onCustomerAuthEmail: P,
       onCustomerAuthCode: T,
       onSuccess: _,
       onFail: L,
       sellixHelper: D
   }) => {
       const O = "checkout" === r ? l.currency : i.currency,
           I = t.useMemo((() => m && m.length ? m.map((e => {
               const t = v[e.uniqid];
               return {
                   ...e,
                   priceVariant: t || null
               }
           })) : m), [m, v]),
           R = t.useMemo((() => {
               if (!i) return i;
               const e = v[i.uniqid];
               return e ? {
                   ...i,
                   priceVariant: e
               } : i
           }), [i, v]),
           M = t.useMemo((() => "checkout" === r ? I : "product" === r || "subscription" === r ? [R] : void 0), [I, R, r]),
           [F, U] = t.useState(null),
           B = function(e, a, n, l, o, r, i) {
               const s = c(r, l);
               return t.useMemo((() => {
                   const t = e.CURRENCY_LIST[a];
                   let r = l.map((e => {
                       let r;
                       r = e.priceVariant && e.priceVariant.price_conversions ? e.priceVariant.price_conversions[a] : e.price_conversions ? e.price_conversions[a] : 0;
                       let u = e.price_discount ? `${e.price_discount}%` : "",
                           c = o && (o[e.uniqid] || []),
                           d = [],
                           p = "",
                           m = e => e;
                       e.volume_discounts && (d = JSON.parse(e.volume_discounts).volume_discounts, d.map(((a, n) => {
                           let l = +e.quantity,
                               o = +a.quantity,
                               r = +a.value,
                               i = a.type;
                           if (1 === d.length) l >= o && (m = e => "FIXED" === i ? e - r : e - e * r / 100, p = "FIXED" === i ? `${t}${r}` : `${r}%`);
                           else if (d[n + 1]) {
                               let e = d[n + 1].quantity;
                               l >= o && l < e && (m = e => "FIXED" === i ? e - r : e - e * r / 100, p = "FIXED" === i ? `${t}${r}` : `${r}%`)
                           } else l >= o && (-1 === e.stock || l <= e.stock) && (m = e => "FIXED" === i ? e - r : e - e * r / 100, p = "FIXED" === i ? `${t}${r}` : `${r}%`)
                       })));
                       let f = "",
                           h = e => e,
                           v = "",
                           y = "";
                       s.length && s.map((a => {
                           if (a.products.includes(e.uniqid)) {
                               v = a.uniqid, y = a.title;
                               let e = a.discount_type,
                                   n = + +a.discount_amount / ("FIXED" === e ? a.products_bound.length : 1);
                               h = t => "FIXED" === e ? t - n : t - t * n / 100, f = "FIXED" === e ? `${t}${parseFloat(n.toFixed(2))}` : `${parseFloat(n.toFixed(2))}%`
                           }
                       }));
                       let b = 0,
                           g = e => e;
                       if (i && (!i.disabled_with_volume_discounts || i.disabled_with_volume_discounts && !p)) {
                           let e = i.discount_type,
                               a = + +i.discount / ("FIXED" === e ? l.length : 1);
                           g = t => "FIXED" === e ? t - a : t - t * a / 100, b = "FIXED" === e ? `${t}${parseFloat(a.toFixed(2))}` : `${parseFloat(a.toFixed(2))}%`
                       }
                       let E = +n.vat_percentage ? +n.vat_percentage + "%" : "";
                       return {
                           price: r,
                           product: e,
                           bundleTitle: y,
                           isBundle: v,
                           productDiscount: t => e.price_discount ? t - t * e.price_discount / 100 : t,
                           productAmount: u,
                           volumeDiscount: m,
                           volumeAmount: p,
                           addonsList: c,
                           addonsDiscount: e => c.length ? c.reduce(((e, t) => e + t.price_conversions[a]), 0) + e : e,
                           bundleDiscount: h,
                           bundleAmount: f,
                           couponDiscount: g,
                           couponAmount: b,
                           taxDiscount: e => +n.vat_percentage ? e + e * n.vat_percentage / 100 : e,
                           taxAmount: E
                       }
                   }));
                   return r.sort(((e, t) => e.isBundle === t.isBundle ? 1 : -1))
               }), [e.CURRENCY_LIST, a, l, o, s, i, n.vat_percentage])
           }(e, O, l, M, f, h, F),
           j = function(e, a, n, l, o) {
               const r = c(l, o);
               return t.useMemo((() => {
                   const t = e.CURRENCY_LIST[a];
                   return r.map((e => {
                       const a = +e.discount_amount;
                       return {
                           bundle: e,
                           discountTitle: "FIXED" === e.discount_type ? `${t}${a}` : `${a}%`
                       }
                   }))
               }), [e.CURRENCY_LIST, a, r])
           }(e, O, 0, h, M);
       let q = B.filter((({
           volumeAmount: e
       }) => !!e)).length;
       const [, Y] = function(e, a, n, l) {
           return t.useMemo((() => {
               const t = e.CURRENCY_LIST[a];
               let o = "",
                   r = e => e;
               if (n && (!n.disabled_with_volume_discounts || !l)) {
                   let e = +n.discount,
                       a = n.discount_type;
                   o = "FIXED" === a ? `${t}${e}` : `${e}%`, r = t => "FIXED" === a ? t - e : t - t * e / 100
               }
               return [r, o]
           }), [n, e.CURRENCY_LIST, a, l])
       }(e, O, F, q), H = d(M);
       let W = +l.vat_percentage ? +l.vat_percentage + "%" : "";
       return o.default.createElement("div", {
           className: "sellix-product-card"
       }, o.default.createElement(u.Provider, {
           value: {
               config: e || s.config,
               isCartEnabled: a || s.isCartEnabled,
               isCustomDomain: n || s.isCustomDomain,
               shopInfo: l || s.shopInfo,
               productInfo: R,
               invoiceInfo: p || s.invoiceInfo,
               cartProducts: I,
               addons: f || s.addons,
               bundles: h || s.bundles,
               priceVariants: v || s.priceVariants,
               theme: y || s.theme,
               settings: b || s.settings,
               onAddToCart: g || s.onAddToCart,
               onApplyCoupon: E || s.onApplyCoupon,
               onBackToShop: C || s.onBackToShop,
               onCreateInvoice: w || s.onCreateInvoice,
               onCreateInvoiceTrial: S || s.onCreateInvoiceTrial,
               onShowMessage: N || s.onShowMessage,
               onShowProductTerms: A || s.onShowProductTerms,
               onChangeProductQuantity: k || s.onChangeProductQuantity,
               onChangeStep: x || s.onChangeStep,
               onCustomerAuthEmail: P || s.onCustomerAuthEmail,
               onCustomerAuthCode: T || s.onCustomerAuthCode,
               onSuccess: _ || s.onSuccess,
               onFail: L || s.onFail,
               sellixHelper: D || s.sellixHelper
           }
       }, "checkout" === r && o.default.createElement(fi, {
           appliedCoupon: F,
           setAppliedCoupon: U,
           currency: O,
           productDiscounts: B,
           bundleDiscounts: j,
           paymentOptions: H,
           hasDiscount: q,
           taxAmount: W,
           couponAmount: Y
       }), "product" === r && o.default.createElement(gi, {
           appliedCoupon: F,
           setAppliedCoupon: U,
           currency: O,
           productDiscounts: B,
           hasDiscount: q
       }), "subscription" === r && o.default.createElement(ps, {
           appliedCoupon: F,
           setAppliedCoupon: U,
           currency: O,
           productDiscounts: B,
           hasDiscount: q
       })))
   }, Object.defineProperty(e, "__esModule", {
       value: !0
   }), e
}({}, React, PropTypes, ReactDOM);