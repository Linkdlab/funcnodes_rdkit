//
// ChemDoodle Web Components 10.0.0
//
// https://web.chemdoodle.com
//
// Copyright 2009-2024 iChemLabs, LLC.  All rights reserved.
//
// The ChemDoodle Web Components library is licensed under version 3
// of the GNU GENERAL PUBLIC LICENSE.
//
// You may redistribute it and/or modify it under the terms of the
// GNU General Public License as published by the Free Software Foundation,
// either version 3 of the License, or (at your option) any later version.
//
// As an exception to the GPL, you may distribute this packed form of
// the code without the copy of the GPL license normally required,
// provided you include this license notice and a URL through which
// recipients can access the corresponding unpacked source code.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ChemDoodle Web Components employs 3rd party libraries under the MIT
// license. For a full list with links to the original source, go to:
// https://web.chemdoodle.com/installation/download/#libraries
//
// Please contact iChemLabs <https://www.ichemlabs.com/contact-us> for
// alternate licensing options.
//
"use strict";
let ChemDoodle = (function () {
  let e = {
    iChemLabs: {},
    informatics: {},
    io: {},
    lib: {},
    notations: {},
    structures: { PID: 0 },
  };
  e.structures.d2 = {};
  e.structures.d3 = {};
  e.getVersion = function () {
    return "10.0.0";
  };
  return e;
})();
(function (e, m) {
  "object" === typeof exports
    ? (module.exports = m(global))
    : "function" === typeof define && define.amd
    ? define([], function () {
        return m(e);
      })
    : m(e);
})(ChemDoodle.lib, function (e) {
  function m(b) {
    return (d = b);
  }
  function k() {
    return (d = "undefined" !== typeof Float32Array ? Float32Array : Array);
  }
  var p = {};
  (function () {
    if ("undefined" != typeof Float32Array) {
      var b = new Float32Array(1),
        a = new Int32Array(b.buffer);
      p.invsqrt = function (t) {
        b[0] = t;
        a[0] = 1597463007 - (a[0] >> 1);
        var c = b[0];
        return c * (1.5 - 0.5 * t * c * c);
      };
    } else
      p.invsqrt = function (b) {
        return 1 / Math.sqrt(b);
      };
  })();
  var d = null;
  k();
  var g = {
      create: function (b) {
        var t = new d(3);
        b
          ? ((t[0] = b[0]), (t[1] = b[1]), (t[2] = b[2]))
          : (t[0] = t[1] = t[2] = 0);
        return t;
      },
      createFrom: function (b, a, c) {
        var t = new d(3);
        t[0] = b;
        t[1] = a;
        t[2] = c;
        return t;
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) &&
            1e-6 > Math.abs(b[1] - a[1]) &&
            1e-6 > Math.abs(b[2] - a[2]))
        );
      },
      add: function (b, a, c) {
        if (!c || b === c)
          return (b[0] += a[0]), (b[1] += a[1]), (b[2] += a[2]), b;
        c[0] = b[0] + a[0];
        c[1] = b[1] + a[1];
        c[2] = b[2] + a[2];
        return c;
      },
      subtract: function (b, a, c) {
        if (!c || b === c)
          return (b[0] -= a[0]), (b[1] -= a[1]), (b[2] -= a[2]), b;
        c[0] = b[0] - a[0];
        c[1] = b[1] - a[1];
        c[2] = b[2] - a[2];
        return c;
      },
      multiply: function (b, a, c) {
        if (!c || b === c)
          return (b[0] *= a[0]), (b[1] *= a[1]), (b[2] *= a[2]), b;
        c[0] = b[0] * a[0];
        c[1] = b[1] * a[1];
        c[2] = b[2] * a[2];
        return c;
      },
      negate: function (b, a) {
        a || (a = b);
        a[0] = -b[0];
        a[1] = -b[1];
        a[2] = -b[2];
        return a;
      },
      scale: function (b, a, c) {
        if (!c || b === c) return (b[0] *= a), (b[1] *= a), (b[2] *= a), b;
        c[0] = b[0] * a;
        c[1] = b[1] * a;
        c[2] = b[2] * a;
        return c;
      },
      normalize: function (b, a) {
        a || (a = b);
        var t = b[0],
          c = b[1];
        b = b[2];
        var f = Math.sqrt(t * t + c * c + b * b);
        if (!f) return (a[0] = 0), (a[1] = 0), (a[2] = 0), a;
        if (1 === f) return (a[0] = t), (a[1] = c), (a[2] = b), a;
        f = 1 / f;
        a[0] = t * f;
        a[1] = c * f;
        a[2] = b * f;
        return a;
      },
      cross: function (b, a, c) {
        c || (c = b);
        var t = b[0],
          f = b[1];
        b = b[2];
        var l = a[0],
          z = a[1];
        a = a[2];
        c[0] = f * a - b * z;
        c[1] = b * l - t * a;
        c[2] = t * z - f * l;
        return c;
      },
      length: function (b) {
        var t = b[0],
          a = b[1];
        b = b[2];
        return Math.sqrt(t * t + a * a + b * b);
      },
      squaredLength: function (b) {
        var t = b[0],
          a = b[1];
        b = b[2];
        return t * t + a * a + b * b;
      },
      dot: function (b, a) {
        return b[0] * a[0] + b[1] * a[1] + b[2] * a[2];
      },
      direction: function (b, a, c) {
        c || (c = b);
        var t = b[0] - a[0],
          f = b[1] - a[1];
        b = b[2] - a[2];
        a = Math.sqrt(t * t + f * f + b * b);
        if (!a) return (c[0] = 0), (c[1] = 0), (c[2] = 0), c;
        a = 1 / a;
        c[0] = t * a;
        c[1] = f * a;
        c[2] = b * a;
        return c;
      },
      lerp: function (b, a, c, f) {
        f || (f = b);
        f[0] = b[0] + c * (a[0] - b[0]);
        f[1] = b[1] + c * (a[1] - b[1]);
        f[2] = b[2] + c * (a[2] - b[2]);
        return f;
      },
      dist: function (b, a) {
        var t = a[0] - b[0],
          c = a[1] - b[1];
        b = a[2] - b[2];
        return Math.sqrt(t * t + c * c + b * b);
      },
    },
    a = null,
    f = new d(4);
  g.unproject = function (b, c, l, h, d) {
    d || (d = b);
    a || (a = v.create());
    var t = a;
    f[0] = (2 * (b[0] - h[0])) / h[2] - 1;
    f[1] = (2 * (b[1] - h[1])) / h[3] - 1;
    f[2] = 2 * b[2] - 1;
    f[3] = 1;
    v.multiply(l, c, t);
    if (!v.inverse(t)) return null;
    v.multiplyVec4(t, f);
    if (0 === f[3]) return null;
    d[0] = f[0] / f[3];
    d[1] = f[1] / f[3];
    d[2] = f[2] / f[3];
    return d;
  };
  var c = g.createFrom(1, 0, 0),
    b = g.createFrom(0, 1, 0),
    l = g.createFrom(0, 0, 1),
    h = g.create();
  g.rotationTo = function (t, a, f) {
    f || (f = n.create());
    var z = g.dot(t, a);
    if (1 <= z) n.set(u, f);
    else if (-0.999999 > z)
      g.cross(c, t, h),
        1e-6 > g.length(h) && g.cross(b, t, h),
        1e-6 > g.length(h) && g.cross(l, t, h),
        g.normalize(h),
        n.fromAngleAxis(Math.PI, h, f);
    else {
      z = Math.sqrt(2 * (1 + z));
      var d = 1 / z;
      g.cross(t, a, h);
      f[0] = h[0] * d;
      f[1] = h[1] * d;
      f[2] = h[2] * d;
      f[3] = 0.5 * z;
      n.normalize(f);
    }
    1 < f[3] ? (f[3] = 1) : -1 > f[3] && (f[3] = -1);
    return f;
  };
  g.str = function (b) {
    return "[" + b[0] + ", " + b[1] + ", " + b[2] + "]";
  };
  var r = {
      create: function (b) {
        var t = new d(9);
        b
          ? ((t[0] = b[0]),
            (t[1] = b[1]),
            (t[2] = b[2]),
            (t[3] = b[3]),
            (t[4] = b[4]),
            (t[5] = b[5]),
            (t[6] = b[6]),
            (t[7] = b[7]),
            (t[8] = b[8]))
          : (t[0] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = 0);
        return t;
      },
      createFrom: function (b, a, c, f, l, h, v, r, n) {
        var t = new d(9);
        t[0] = b;
        t[1] = a;
        t[2] = c;
        t[3] = f;
        t[4] = l;
        t[5] = h;
        t[6] = v;
        t[7] = r;
        t[8] = n;
        return t;
      },
      determinant: function (b) {
        var t = b[3],
          a = b[4],
          c = b[5],
          f = b[6],
          l = b[7],
          h = b[8];
        return (
          b[0] * (h * a - c * l) +
          b[1] * (-h * t + c * f) +
          b[2] * (l * t - a * f)
        );
      },
      inverse: function (b, a) {
        var t = b[0],
          c = b[1],
          f = b[2],
          l = b[3],
          h = b[4],
          d = b[5],
          z = b[6],
          v = b[7];
        b = b[8];
        var n = b * h - d * v,
          g = -b * l + d * z,
          e = v * l - h * z,
          u = t * n + c * g + f * e;
        if (!u) return null;
        u = 1 / u;
        a || (a = r.create());
        a[0] = n * u;
        a[1] = (-b * c + f * v) * u;
        a[2] = (d * c - f * h) * u;
        a[3] = g * u;
        a[4] = (b * t - f * z) * u;
        a[5] = (-d * t + f * l) * u;
        a[6] = e * u;
        a[7] = (-v * t + c * z) * u;
        a[8] = (h * t - c * l) * u;
        return a;
      },
      multiply: function (b, a, c) {
        c || (c = b);
        var t = b[0],
          f = b[1],
          l = b[2],
          h = b[3],
          d = b[4],
          z = b[5],
          v = b[6],
          r = b[7];
        b = b[8];
        var n = a[0],
          g = a[1],
          e = a[2],
          u = a[3],
          A = a[4],
          p = a[5],
          w = a[6],
          k = a[7];
        a = a[8];
        c[0] = n * t + g * h + e * v;
        c[1] = n * f + g * d + e * r;
        c[2] = n * l + g * z + e * b;
        c[3] = u * t + A * h + p * v;
        c[4] = u * f + A * d + p * r;
        c[5] = u * l + A * z + p * b;
        c[6] = w * t + k * h + a * v;
        c[7] = w * f + k * d + a * r;
        c[8] = w * l + k * z + a * b;
        return c;
      },
      multiplyVec2: function (b, a, c) {
        c || (c = a);
        var t = a[0];
        a = a[1];
        c[0] = t * b[0] + a * b[3] + b[6];
        c[1] = t * b[1] + a * b[4] + b[7];
        return c;
      },
      multiplyVec3: function (b, a, c) {
        c || (c = a);
        var t = a[0],
          f = a[1];
        a = a[2];
        c[0] = t * b[0] + f * b[3] + a * b[6];
        c[1] = t * b[1] + f * b[4] + a * b[7];
        c[2] = t * b[2] + f * b[5] + a * b[8];
        return c;
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) &&
            1e-6 > Math.abs(b[1] - a[1]) &&
            1e-6 > Math.abs(b[2] - a[2]) &&
            1e-6 > Math.abs(b[3] - a[3]) &&
            1e-6 > Math.abs(b[4] - a[4]) &&
            1e-6 > Math.abs(b[5] - a[5]) &&
            1e-6 > Math.abs(b[6] - a[6]) &&
            1e-6 > Math.abs(b[7] - a[7]) &&
            1e-6 > Math.abs(b[8] - a[8]))
        );
      },
      identity: function (b) {
        b || (b = r.create());
        b[0] = 1;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        b[4] = 1;
        b[5] = 0;
        b[6] = 0;
        b[7] = 0;
        b[8] = 1;
        return b;
      },
      transpose: function (b, a) {
        if (!a || b === a) {
          a = b[1];
          var t = b[2],
            c = b[5];
          b[1] = b[3];
          b[2] = b[6];
          b[3] = a;
          b[5] = b[7];
          b[6] = t;
          b[7] = c;
          return b;
        }
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return a;
      },
      toMat4: function (b, a) {
        a || (a = v.create());
        a[15] = 1;
        a[14] = 0;
        a[13] = 0;
        a[12] = 0;
        a[11] = 0;
        a[10] = b[8];
        a[9] = b[7];
        a[8] = b[6];
        a[7] = 0;
        a[6] = b[5];
        a[5] = b[4];
        a[4] = b[3];
        a[3] = 0;
        a[2] = b[2];
        a[1] = b[1];
        a[0] = b[0];
        return a;
      },
      str: function (b) {
        return (
          "[" +
          b[0] +
          ", " +
          b[1] +
          ", " +
          b[2] +
          ", " +
          b[3] +
          ", " +
          b[4] +
          ", " +
          b[5] +
          ", " +
          b[6] +
          ", " +
          b[7] +
          ", " +
          b[8] +
          "]"
        );
      },
    },
    v = {
      create: function (b) {
        var a = new d(16);
        b &&
          ((a[0] = b[0]),
          (a[1] = b[1]),
          (a[2] = b[2]),
          (a[3] = b[3]),
          (a[4] = b[4]),
          (a[5] = b[5]),
          (a[6] = b[6]),
          (a[7] = b[7]),
          (a[8] = b[8]),
          (a[9] = b[9]),
          (a[10] = b[10]),
          (a[11] = b[11]),
          (a[12] = b[12]),
          (a[13] = b[13]),
          (a[14] = b[14]),
          (a[15] = b[15]));
        return a;
      },
      createFrom: function (b, a, c, f, l, h, v, r, n, g, e, u, p, w, k, y) {
        var t = new d(16);
        t[0] = b;
        t[1] = a;
        t[2] = c;
        t[3] = f;
        t[4] = l;
        t[5] = h;
        t[6] = v;
        t[7] = r;
        t[8] = n;
        t[9] = g;
        t[10] = e;
        t[11] = u;
        t[12] = p;
        t[13] = w;
        t[14] = k;
        t[15] = y;
        return t;
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) &&
            1e-6 > Math.abs(b[1] - a[1]) &&
            1e-6 > Math.abs(b[2] - a[2]) &&
            1e-6 > Math.abs(b[3] - a[3]) &&
            1e-6 > Math.abs(b[4] - a[4]) &&
            1e-6 > Math.abs(b[5] - a[5]) &&
            1e-6 > Math.abs(b[6] - a[6]) &&
            1e-6 > Math.abs(b[7] - a[7]) &&
            1e-6 > Math.abs(b[8] - a[8]) &&
            1e-6 > Math.abs(b[9] - a[9]) &&
            1e-6 > Math.abs(b[10] - a[10]) &&
            1e-6 > Math.abs(b[11] - a[11]) &&
            1e-6 > Math.abs(b[12] - a[12]) &&
            1e-6 > Math.abs(b[13] - a[13]) &&
            1e-6 > Math.abs(b[14] - a[14]) &&
            1e-6 > Math.abs(b[15] - a[15]))
        );
      },
      identity: function (b) {
        b || (b = v.create());
        b[0] = 1;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        b[4] = 0;
        b[5] = 1;
        b[6] = 0;
        b[7] = 0;
        b[8] = 0;
        b[9] = 0;
        b[10] = 1;
        b[11] = 0;
        b[12] = 0;
        b[13] = 0;
        b[14] = 0;
        b[15] = 1;
        return b;
      },
      transpose: function (b, a) {
        if (!a || b === a) {
          a = b[1];
          var c = b[2],
            t = b[3],
            f = b[6],
            l = b[7],
            h = b[11];
          b[1] = b[4];
          b[2] = b[8];
          b[3] = b[12];
          b[4] = a;
          b[6] = b[9];
          b[7] = b[13];
          b[8] = c;
          b[9] = f;
          b[11] = b[14];
          b[12] = t;
          b[13] = l;
          b[14] = h;
          return b;
        }
        a[0] = b[0];
        a[1] = b[4];
        a[2] = b[8];
        a[3] = b[12];
        a[4] = b[1];
        a[5] = b[5];
        a[6] = b[9];
        a[7] = b[13];
        a[8] = b[2];
        a[9] = b[6];
        a[10] = b[10];
        a[11] = b[14];
        a[12] = b[3];
        a[13] = b[7];
        a[14] = b[11];
        a[15] = b[15];
        return a;
      },
      determinant: function (b) {
        var a = b[0],
          c = b[1],
          f = b[2],
          t = b[3],
          l = b[4],
          h = b[5],
          d = b[6],
          v = b[7],
          r = b[8],
          n = b[9],
          g = b[10],
          e = b[11],
          u = b[12],
          p = b[13],
          w = b[14];
        b = b[15];
        return (
          u * n * d * t -
          r * p * d * t -
          u * h * g * t +
          l * p * g * t +
          r * h * w * t -
          l * n * w * t -
          u * n * f * v +
          r * p * f * v +
          u * c * g * v -
          a * p * g * v -
          r * c * w * v +
          a * n * w * v +
          u * h * f * e -
          l * p * f * e -
          u * c * d * e +
          a * p * d * e +
          l * c * w * e -
          a * h * w * e -
          r * h * f * b +
          l * n * f * b +
          r * c * d * b -
          a * n * d * b -
          l * c * g * b +
          a * h * g * b
        );
      },
      inverse: function (b, a) {
        a || (a = b);
        var c = b[0],
          f = b[1],
          t = b[2],
          l = b[3],
          h = b[4],
          d = b[5],
          v = b[6],
          r = b[7],
          n = b[8],
          g = b[9],
          z = b[10],
          e = b[11],
          u = b[12],
          p = b[13],
          w = b[14];
        b = b[15];
        var k = c * d - f * h,
          y = c * v - t * h,
          x = c * r - l * h,
          m = f * v - t * d,
          T = f * r - l * d,
          R = t * r - l * v,
          U = n * p - g * u,
          V = n * w - z * u,
          W = n * b - e * u,
          X = g * w - z * p,
          aa = g * b - e * p,
          ba = z * b - e * w,
          O = k * ba - y * aa + x * X + m * W - T * V + R * U;
        if (!O) return null;
        O = 1 / O;
        a[0] = (d * ba - v * aa + r * X) * O;
        a[1] = (-f * ba + t * aa - l * X) * O;
        a[2] = (p * R - w * T + b * m) * O;
        a[3] = (-g * R + z * T - e * m) * O;
        a[4] = (-h * ba + v * W - r * V) * O;
        a[5] = (c * ba - t * W + l * V) * O;
        a[6] = (-u * R + w * x - b * y) * O;
        a[7] = (n * R - z * x + e * y) * O;
        a[8] = (h * aa - d * W + r * U) * O;
        a[9] = (-c * aa + f * W - l * U) * O;
        a[10] = (u * T - p * x + b * k) * O;
        a[11] = (-n * T + g * x - e * k) * O;
        a[12] = (-h * X + d * V - v * U) * O;
        a[13] = (c * X - f * V + t * U) * O;
        a[14] = (-u * m + p * y - w * k) * O;
        a[15] = (n * m - g * y + z * k) * O;
        return a;
      },
      toRotationMat: function (b, a) {
        a || (a = v.create());
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1;
        return a;
      },
      toMat3: function (b, a) {
        a || (a = r.create());
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[4];
        a[4] = b[5];
        a[5] = b[6];
        a[6] = b[8];
        a[7] = b[9];
        a[8] = b[10];
        return a;
      },
      toInverseMat3: function (b, a) {
        var c = b[0],
          f = b[1],
          t = b[2],
          l = b[4],
          h = b[5],
          d = b[6],
          v = b[8],
          n = b[9];
        b = b[10];
        var g = b * h - d * n,
          e = -b * l + d * v,
          z = n * l - h * v,
          u = c * g + f * e + t * z;
        if (!u) return null;
        u = 1 / u;
        a || (a = r.create());
        a[0] = g * u;
        a[1] = (-b * f + t * n) * u;
        a[2] = (d * f - t * h) * u;
        a[3] = e * u;
        a[4] = (b * c - t * v) * u;
        a[5] = (-d * c + t * l) * u;
        a[6] = z * u;
        a[7] = (-n * c + f * v) * u;
        a[8] = (h * c - f * l) * u;
        return a;
      },
      multiply: function (b, a, c) {
        c || (c = b);
        var f = b[0],
          l = b[1],
          t = b[2],
          h = b[3],
          d = b[4],
          v = b[5],
          r = b[6],
          n = b[7],
          g = b[8],
          e = b[9],
          z = b[10],
          u = b[11],
          p = b[12],
          w = b[13],
          A = b[14];
        b = b[15];
        var k = a[0],
          y = a[1],
          x = a[2],
          m = a[3];
        c[0] = k * f + y * d + x * g + m * p;
        c[1] = k * l + y * v + x * e + m * w;
        c[2] = k * t + y * r + x * z + m * A;
        c[3] = k * h + y * n + x * u + m * b;
        k = a[4];
        y = a[5];
        x = a[6];
        m = a[7];
        c[4] = k * f + y * d + x * g + m * p;
        c[5] = k * l + y * v + x * e + m * w;
        c[6] = k * t + y * r + x * z + m * A;
        c[7] = k * h + y * n + x * u + m * b;
        k = a[8];
        y = a[9];
        x = a[10];
        m = a[11];
        c[8] = k * f + y * d + x * g + m * p;
        c[9] = k * l + y * v + x * e + m * w;
        c[10] = k * t + y * r + x * z + m * A;
        c[11] = k * h + y * n + x * u + m * b;
        k = a[12];
        y = a[13];
        x = a[14];
        m = a[15];
        c[12] = k * f + y * d + x * g + m * p;
        c[13] = k * l + y * v + x * e + m * w;
        c[14] = k * t + y * r + x * z + m * A;
        c[15] = k * h + y * n + x * u + m * b;
        return c;
      },
      multiplyVec3: function (b, a, c) {
        c || (c = a);
        var f = a[0],
          l = a[1];
        a = a[2];
        c[0] = b[0] * f + b[4] * l + b[8] * a + b[12];
        c[1] = b[1] * f + b[5] * l + b[9] * a + b[13];
        c[2] = b[2] * f + b[6] * l + b[10] * a + b[14];
        return c;
      },
      multiplyVec4: function (b, a, c) {
        c || (c = a);
        var f = a[0],
          l = a[1],
          t = a[2];
        a = a[3];
        c[0] = b[0] * f + b[4] * l + b[8] * t + b[12] * a;
        c[1] = b[1] * f + b[5] * l + b[9] * t + b[13] * a;
        c[2] = b[2] * f + b[6] * l + b[10] * t + b[14] * a;
        c[3] = b[3] * f + b[7] * l + b[11] * t + b[15] * a;
        return c;
      },
      translate: function (b, a, c) {
        var f = a[0],
          l = a[1];
        a = a[2];
        if (!c || b === c)
          return (
            (b[12] = b[0] * f + b[4] * l + b[8] * a + b[12]),
            (b[13] = b[1] * f + b[5] * l + b[9] * a + b[13]),
            (b[14] = b[2] * f + b[6] * l + b[10] * a + b[14]),
            (b[15] = b[3] * f + b[7] * l + b[11] * a + b[15]),
            b
          );
        var t = b[0];
        var h = b[1];
        var d = b[2];
        var v = b[3];
        var r = b[4];
        var n = b[5];
        var g = b[6];
        var e = b[7];
        var z = b[8];
        var u = b[9];
        var p = b[10];
        var w = b[11];
        c[0] = t;
        c[1] = h;
        c[2] = d;
        c[3] = v;
        c[4] = r;
        c[5] = n;
        c[6] = g;
        c[7] = e;
        c[8] = z;
        c[9] = u;
        c[10] = p;
        c[11] = w;
        c[12] = t * f + r * l + z * a + b[12];
        c[13] = h * f + n * l + u * a + b[13];
        c[14] = d * f + g * l + p * a + b[14];
        c[15] = v * f + e * l + w * a + b[15];
        return c;
      },
      scale: function (b, a, c) {
        var f = a[0],
          l = a[1];
        a = a[2];
        if (!c || b === c)
          return (
            (b[0] *= f),
            (b[1] *= f),
            (b[2] *= f),
            (b[3] *= f),
            (b[4] *= l),
            (b[5] *= l),
            (b[6] *= l),
            (b[7] *= l),
            (b[8] *= a),
            (b[9] *= a),
            (b[10] *= a),
            (b[11] *= a),
            b
          );
        c[0] = b[0] * f;
        c[1] = b[1] * f;
        c[2] = b[2] * f;
        c[3] = b[3] * f;
        c[4] = b[4] * l;
        c[5] = b[5] * l;
        c[6] = b[6] * l;
        c[7] = b[7] * l;
        c[8] = b[8] * a;
        c[9] = b[9] * a;
        c[10] = b[10] * a;
        c[11] = b[11] * a;
        c[12] = b[12];
        c[13] = b[13];
        c[14] = b[14];
        c[15] = b[15];
        return c;
      },
      rotate: function (b, a, c, f) {
        var l = c[0],
          h = c[1];
        c = c[2];
        var t = Math.sqrt(l * l + h * h + c * c);
        if (!t) return null;
        1 !== t && ((t = 1 / t), (l *= t), (h *= t), (c *= t));
        var d = Math.sin(a);
        var v = Math.cos(a);
        var r = 1 - v;
        a = b[0];
        t = b[1];
        var n = b[2];
        var g = b[3];
        var e = b[4];
        var u = b[5];
        var z = b[6];
        var p = b[7];
        var w = b[8];
        var k = b[9];
        var A = b[10];
        var y = b[11];
        var x = l * l * r + v;
        var m = h * l * r + c * d;
        var B = c * l * r - h * d;
        var U = l * h * r - c * d;
        var V = h * h * r + v;
        var W = c * h * r + l * d;
        var X = l * c * r + h * d;
        l = h * c * r - l * d;
        h = c * c * r + v;
        f
          ? b !== f &&
            ((f[12] = b[12]), (f[13] = b[13]), (f[14] = b[14]), (f[15] = b[15]))
          : (f = b);
        f[0] = a * x + e * m + w * B;
        f[1] = t * x + u * m + k * B;
        f[2] = n * x + z * m + A * B;
        f[3] = g * x + p * m + y * B;
        f[4] = a * U + e * V + w * W;
        f[5] = t * U + u * V + k * W;
        f[6] = n * U + z * V + A * W;
        f[7] = g * U + p * V + y * W;
        f[8] = a * X + e * l + w * h;
        f[9] = t * X + u * l + k * h;
        f[10] = n * X + z * l + A * h;
        f[11] = g * X + p * l + y * h;
        return f;
      },
      rotateX: function (b, a, c) {
        var f = Math.sin(a);
        a = Math.cos(a);
        var l = b[4],
          h = b[5],
          d = b[6],
          t = b[7],
          v = b[8],
          r = b[9],
          n = b[10],
          g = b[11];
        c
          ? b !== c &&
            ((c[0] = b[0]),
            (c[1] = b[1]),
            (c[2] = b[2]),
            (c[3] = b[3]),
            (c[12] = b[12]),
            (c[13] = b[13]),
            (c[14] = b[14]),
            (c[15] = b[15]))
          : (c = b);
        c[4] = l * a + v * f;
        c[5] = h * a + r * f;
        c[6] = d * a + n * f;
        c[7] = t * a + g * f;
        c[8] = l * -f + v * a;
        c[9] = h * -f + r * a;
        c[10] = d * -f + n * a;
        c[11] = t * -f + g * a;
        return c;
      },
      rotateY: function (b, a, c) {
        var f = Math.sin(a);
        a = Math.cos(a);
        var l = b[0],
          h = b[1],
          d = b[2],
          t = b[3],
          v = b[8],
          r = b[9],
          n = b[10],
          g = b[11];
        c
          ? b !== c &&
            ((c[4] = b[4]),
            (c[5] = b[5]),
            (c[6] = b[6]),
            (c[7] = b[7]),
            (c[12] = b[12]),
            (c[13] = b[13]),
            (c[14] = b[14]),
            (c[15] = b[15]))
          : (c = b);
        c[0] = l * a + v * -f;
        c[1] = h * a + r * -f;
        c[2] = d * a + n * -f;
        c[3] = t * a + g * -f;
        c[8] = l * f + v * a;
        c[9] = h * f + r * a;
        c[10] = d * f + n * a;
        c[11] = t * f + g * a;
        return c;
      },
      rotateZ: function (b, a, c) {
        var f = Math.sin(a);
        a = Math.cos(a);
        var l = b[0],
          h = b[1],
          d = b[2],
          t = b[3],
          v = b[4],
          r = b[5],
          n = b[6],
          g = b[7];
        c
          ? b !== c &&
            ((c[8] = b[8]),
            (c[9] = b[9]),
            (c[10] = b[10]),
            (c[11] = b[11]),
            (c[12] = b[12]),
            (c[13] = b[13]),
            (c[14] = b[14]),
            (c[15] = b[15]))
          : (c = b);
        c[0] = l * a + v * f;
        c[1] = h * a + r * f;
        c[2] = d * a + n * f;
        c[3] = t * a + g * f;
        c[4] = l * -f + v * a;
        c[5] = h * -f + r * a;
        c[6] = d * -f + n * a;
        c[7] = t * -f + g * a;
        return c;
      },
      frustum: function (b, a, c, f, l, h, d) {
        d || (d = v.create());
        var t = a - b,
          r = f - c,
          n = h - l;
        d[0] = (2 * l) / t;
        d[1] = 0;
        d[2] = 0;
        d[3] = 0;
        d[4] = 0;
        d[5] = (2 * l) / r;
        d[6] = 0;
        d[7] = 0;
        d[8] = (a + b) / t;
        d[9] = (f + c) / r;
        d[10] = -(h + l) / n;
        d[11] = -1;
        d[12] = 0;
        d[13] = 0;
        d[14] = -(h * l * 2) / n;
        d[15] = 0;
        return d;
      },
      perspective: function (b, a, c, f, l) {
        b = c * Math.tan((b * Math.PI) / 360);
        a *= b;
        return v.frustum(-a, a, -b, b, c, f, l);
      },
      ortho: function (b, a, c, f, l, h, d) {
        d || (d = v.create());
        var t = a - b,
          r = f - c,
          n = h - l;
        d[0] = 2 / t;
        d[1] = 0;
        d[2] = 0;
        d[3] = 0;
        d[4] = 0;
        d[5] = 2 / r;
        d[6] = 0;
        d[7] = 0;
        d[8] = 0;
        d[9] = 0;
        d[10] = -2 / n;
        d[11] = 0;
        d[12] = -(b + a) / t;
        d[13] = -(f + c) / r;
        d[14] = -(h + l) / n;
        d[15] = 1;
        return d;
      },
      lookAt: function (b, a, c, f) {
        f || (f = v.create());
        var l = b[0],
          h = b[1];
        b = b[2];
        var d = c[0];
        var t = c[1];
        var r = c[2];
        var n = a[0];
        c = a[1];
        var g = a[2];
        if (l === n && h === c && b === g) return v.identity(f);
        a = l - n;
        c = h - c;
        n = b - g;
        var e = 1 / Math.sqrt(a * a + c * c + n * n);
        a *= e;
        c *= e;
        n *= e;
        g = t * n - r * c;
        r = r * a - d * n;
        d = d * c - t * a;
        (e = Math.sqrt(g * g + r * r + d * d))
          ? ((e = 1 / e), (g *= e), (r *= e), (d *= e))
          : (d = r = g = 0);
        t = c * d - n * r;
        var u = n * g - a * d;
        var z = a * r - c * g;
        (e = Math.sqrt(t * t + u * u + z * z))
          ? ((e = 1 / e), (t *= e), (u *= e), (z *= e))
          : (z = u = t = 0);
        f[0] = g;
        f[1] = t;
        f[2] = a;
        f[3] = 0;
        f[4] = r;
        f[5] = u;
        f[6] = c;
        f[7] = 0;
        f[8] = d;
        f[9] = z;
        f[10] = n;
        f[11] = 0;
        f[12] = -(g * l + r * h + d * b);
        f[13] = -(t * l + u * h + z * b);
        f[14] = -(a * l + c * h + n * b);
        f[15] = 1;
        return f;
      },
      fromRotationTranslation: function (b, a, c) {
        c || (c = v.create());
        var f = b[0],
          l = b[1],
          h = b[2],
          d = b[3],
          t = f + f,
          r = l + l,
          n = h + h;
        b = f * t;
        var g = f * r;
        f *= n;
        var e = l * r;
        l *= n;
        h *= n;
        t *= d;
        r *= d;
        d *= n;
        c[0] = 1 - (e + h);
        c[1] = g + d;
        c[2] = f - r;
        c[3] = 0;
        c[4] = g - d;
        c[5] = 1 - (b + h);
        c[6] = l + t;
        c[7] = 0;
        c[8] = f + r;
        c[9] = l - t;
        c[10] = 1 - (b + e);
        c[11] = 0;
        c[12] = a[0];
        c[13] = a[1];
        c[14] = a[2];
        c[15] = 1;
        return c;
      },
      str: function (b) {
        return (
          "[" +
          b[0] +
          ", " +
          b[1] +
          ", " +
          b[2] +
          ", " +
          b[3] +
          ", " +
          b[4] +
          ", " +
          b[5] +
          ", " +
          b[6] +
          ", " +
          b[7] +
          ", " +
          b[8] +
          ", " +
          b[9] +
          ", " +
          b[10] +
          ", " +
          b[11] +
          ", " +
          b[12] +
          ", " +
          b[13] +
          ", " +
          b[14] +
          ", " +
          b[15] +
          "]"
        );
      },
    },
    n = {
      create: function (b) {
        var a = new d(4);
        b
          ? ((a[0] = b[0]), (a[1] = b[1]), (a[2] = b[2]), (a[3] = b[3]))
          : (a[0] = a[1] = a[2] = a[3] = 0);
        return a;
      },
      createFrom: function (b, a, c, f) {
        var l = new d(4);
        l[0] = b;
        l[1] = a;
        l[2] = c;
        l[3] = f;
        return l;
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) &&
            1e-6 > Math.abs(b[1] - a[1]) &&
            1e-6 > Math.abs(b[2] - a[2]) &&
            1e-6 > Math.abs(b[3] - a[3]))
        );
      },
      identity: function (b) {
        b || (b = n.create());
        b[0] = 0;
        b[1] = 0;
        b[2] = 0;
        b[3] = 1;
        return b;
      },
    },
    u = n.identity();
  n.calculateW = function (b, a) {
    var c = b[0],
      f = b[1],
      l = b[2];
    if (!a || b === a)
      return (b[3] = -Math.sqrt(Math.abs(1 - c * c - f * f - l * l))), b;
    a[0] = c;
    a[1] = f;
    a[2] = l;
    a[3] = -Math.sqrt(Math.abs(1 - c * c - f * f - l * l));
    return a;
  };
  n.dot = function (b, a) {
    return b[0] * a[0] + b[1] * a[1] + b[2] * a[2] + b[3] * a[3];
  };
  n.inverse = function (b, a) {
    var c = b[0],
      f = b[1],
      l = b[2],
      h = b[3];
    c = (c = c * c + f * f + l * l + h * h) ? 1 / c : 0;
    if (!a || b === a)
      return (b[0] *= -c), (b[1] *= -c), (b[2] *= -c), (b[3] *= c), b;
    a[0] = -b[0] * c;
    a[1] = -b[1] * c;
    a[2] = -b[2] * c;
    a[3] = b[3] * c;
    return a;
  };
  n.conjugate = function (b, a) {
    if (!a || b === a) return (b[0] *= -1), (b[1] *= -1), (b[2] *= -1), b;
    a[0] = -b[0];
    a[1] = -b[1];
    a[2] = -b[2];
    a[3] = b[3];
    return a;
  };
  n.length = function (b) {
    var a = b[0],
      c = b[1],
      f = b[2];
    b = b[3];
    return Math.sqrt(a * a + c * c + f * f + b * b);
  };
  n.normalize = function (b, a) {
    a || (a = b);
    var c = b[0],
      f = b[1],
      l = b[2];
    b = b[3];
    var h = Math.sqrt(c * c + f * f + l * l + b * b);
    if (0 === h) return (a[0] = 0), (a[1] = 0), (a[2] = 0), (a[3] = 0), a;
    h = 1 / h;
    a[0] = c * h;
    a[1] = f * h;
    a[2] = l * h;
    a[3] = b * h;
    return a;
  };
  n.add = function (b, a, c) {
    if (!c || b === c)
      return (b[0] += a[0]), (b[1] += a[1]), (b[2] += a[2]), (b[3] += a[3]), b;
    c[0] = b[0] + a[0];
    c[1] = b[1] + a[1];
    c[2] = b[2] + a[2];
    c[3] = b[3] + a[3];
    return c;
  };
  n.multiply = function (b, a, c) {
    c || (c = b);
    var f = b[0],
      l = b[1],
      h = b[2];
    b = b[3];
    var d = a[0],
      v = a[1],
      r = a[2];
    a = a[3];
    c[0] = f * a + b * d + l * r - h * v;
    c[1] = l * a + b * v + h * d - f * r;
    c[2] = h * a + b * r + f * v - l * d;
    c[3] = b * a - f * d - l * v - h * r;
    return c;
  };
  n.multiplyVec3 = function (b, a, c) {
    c || (c = a);
    var f = a[0],
      l = a[1],
      h = a[2];
    a = b[0];
    var d = b[1],
      v = b[2];
    b = b[3];
    var r = b * f + d * h - v * l,
      n = b * l + v * f - a * h,
      g = b * h + a * l - d * f;
    f = -a * f - d * l - v * h;
    c[0] = r * b + f * -a + n * -v - g * -d;
    c[1] = n * b + f * -d + g * -a - r * -v;
    c[2] = g * b + f * -v + r * -d - n * -a;
    return c;
  };
  n.scale = function (b, a, c) {
    if (!c || b === c)
      return (b[0] *= a), (b[1] *= a), (b[2] *= a), (b[3] *= a), b;
    c[0] = b[0] * a;
    c[1] = b[1] * a;
    c[2] = b[2] * a;
    c[3] = b[3] * a;
    return c;
  };
  n.toMat3 = function (b, a) {
    a || (a = r.create());
    var c = b[0],
      f = b[1],
      l = b[2],
      h = b[3],
      d = c + c,
      v = f + f,
      n = l + l;
    b = c * d;
    var g = c * v;
    c *= n;
    var t = f * v;
    f *= n;
    l *= n;
    d *= h;
    v *= h;
    h *= n;
    a[0] = 1 - (t + l);
    a[1] = g + h;
    a[2] = c - v;
    a[3] = g - h;
    a[4] = 1 - (b + l);
    a[5] = f + d;
    a[6] = c + v;
    a[7] = f - d;
    a[8] = 1 - (b + t);
    return a;
  };
  n.toMat4 = function (b, a) {
    a || (a = v.create());
    var c = b[0],
      f = b[1],
      l = b[2],
      h = b[3],
      d = c + c,
      r = f + f,
      n = l + l;
    b = c * d;
    var g = c * r;
    c *= n;
    var t = f * r;
    f *= n;
    l *= n;
    d *= h;
    r *= h;
    h *= n;
    a[0] = 1 - (t + l);
    a[1] = g + h;
    a[2] = c - r;
    a[3] = 0;
    a[4] = g - h;
    a[5] = 1 - (b + l);
    a[6] = f + d;
    a[7] = 0;
    a[8] = c + r;
    a[9] = f - d;
    a[10] = 1 - (b + t);
    a[11] = 0;
    a[12] = 0;
    a[13] = 0;
    a[14] = 0;
    a[15] = 1;
    return a;
  };
  n.slerp = function (b, a, c, f) {
    f || (f = b);
    var l = b[0] * a[0] + b[1] * a[1] + b[2] * a[2] + b[3] * a[3];
    if (1 <= Math.abs(l))
      return (
        f !== b && ((f[0] = b[0]), (f[1] = b[1]), (f[2] = b[2]), (f[3] = b[3])),
        f
      );
    var h = Math.acos(l);
    var d = Math.sqrt(1 - l * l);
    if (0.001 > Math.abs(d))
      return (
        (f[0] = 0.5 * b[0] + 0.5 * a[0]),
        (f[1] = 0.5 * b[1] + 0.5 * a[1]),
        (f[2] = 0.5 * b[2] + 0.5 * a[2]),
        (f[3] = 0.5 * b[3] + 0.5 * a[3]),
        f
      );
    l = Math.sin((1 - c) * h) / d;
    c = Math.sin(c * h) / d;
    f[0] = b[0] * l + a[0] * c;
    f[1] = b[1] * l + a[1] * c;
    f[2] = b[2] * l + a[2] * c;
    f[3] = b[3] * l + a[3] * c;
    return f;
  };
  n.fromRotationMatrix = function (b, a) {
    a || (a = n.create());
    var c = b[0] + b[4] + b[8];
    if (0 < c) {
      var f = Math.sqrt(c + 1);
      a[3] = 0.5 * f;
      f = 0.5 / f;
      a[0] = (b[7] - b[5]) * f;
      a[1] = (b[2] - b[6]) * f;
      a[2] = (b[3] - b[1]) * f;
    } else {
      f = n.fromRotationMatrix.s_iNext = n.fromRotationMatrix.s_iNext || [
        1, 2, 0,
      ];
      c = 0;
      b[4] > b[0] && (c = 1);
      b[8] > b[3 * c + c] && (c = 2);
      var l = f[c],
        h = f[l];
      f = Math.sqrt(b[3 * c + c] - b[3 * l + l] - b[3 * h + h] + 1);
      a[c] = 0.5 * f;
      f = 0.5 / f;
      a[3] = (b[3 * h + l] - b[3 * l + h]) * f;
      a[l] = (b[3 * l + c] + b[3 * c + l]) * f;
      a[h] = (b[3 * h + c] + b[3 * c + h]) * f;
    }
    return a;
  };
  r.toQuat4 = n.fromRotationMatrix;
  (function () {
    var b = r.create();
    n.fromAxes = function (a, c, f, l) {
      b[0] = c[0];
      b[3] = c[1];
      b[6] = c[2];
      b[1] = f[0];
      b[4] = f[1];
      b[7] = f[2];
      b[2] = a[0];
      b[5] = a[1];
      b[8] = a[2];
      return n.fromRotationMatrix(b, l);
    };
  })();
  n.identity = function (b) {
    b || (b = n.create());
    b[0] = 0;
    b[1] = 0;
    b[2] = 0;
    b[3] = 1;
    return b;
  };
  n.fromAngleAxis = function (b, a, c) {
    c || (c = n.create());
    b *= 0.5;
    var f = Math.sin(b);
    c[3] = Math.cos(b);
    c[0] = f * a[0];
    c[1] = f * a[1];
    c[2] = f * a[2];
    return c;
  };
  n.toAngleAxis = function (b, a) {
    a || (a = b);
    var c = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
    0 < c
      ? ((a[3] = 2 * Math.acos(b[3])),
        (c = p.invsqrt(c)),
        (a[0] = b[0] * c),
        (a[1] = b[1] * c),
        (a[2] = b[2] * c))
      : ((a[3] = 0), (a[0] = 1), (a[1] = 0), (a[2] = 0));
    return a;
  };
  n.str = function (b) {
    return "[" + b[0] + ", " + b[1] + ", " + b[2] + ", " + b[3] + "]";
  };
  var w = {
      create: function (b) {
        var a = new d(2);
        b ? ((a[0] = b[0]), (a[1] = b[1])) : ((a[0] = 0), (a[1] = 0));
        return a;
      },
      createFrom: function (b, a) {
        var c = new d(2);
        c[0] = b;
        c[1] = a;
        return c;
      },
      add: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] + a[0];
        c[1] = b[1] + a[1];
        return c;
      },
      subtract: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] - a[0];
        c[1] = b[1] - a[1];
        return c;
      },
      multiply: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] * a[0];
        c[1] = b[1] * a[1];
        return c;
      },
      divide: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] / a[0];
        c[1] = b[1] / a[1];
        return c;
      },
      scale: function (b, a, c) {
        c || (c = b);
        c[0] = b[0] * a;
        c[1] = b[1] * a;
        return c;
      },
      dist: function (b, a) {
        var c = a[0] - b[0];
        b = a[1] - b[1];
        return Math.sqrt(c * c + b * b);
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) && 1e-6 > Math.abs(b[1] - a[1]))
        );
      },
      negate: function (b, a) {
        a || (a = b);
        a[0] = -b[0];
        a[1] = -b[1];
        return a;
      },
      normalize: function (b, a) {
        a || (a = b);
        var c = b[0] * b[0] + b[1] * b[1];
        0 < c
          ? ((c = Math.sqrt(c)), (a[0] = b[0] / c), (a[1] = b[1] / c))
          : (a[0] = a[1] = 0);
        return a;
      },
      cross: function (b, a, c) {
        b = b[0] * a[1] - b[1] * a[0];
        if (!c) return b;
        c[0] = c[1] = 0;
        c[2] = b;
        return c;
      },
      length: function (b) {
        var a = b[0];
        b = b[1];
        return Math.sqrt(a * a + b * b);
      },
      squaredLength: function (b) {
        var a = b[0];
        b = b[1];
        return a * a + b * b;
      },
      dot: function (b, a) {
        return b[0] * a[0] + b[1] * a[1];
      },
      direction: function (b, a, c) {
        c || (c = b);
        var f = b[0] - a[0];
        b = b[1] - a[1];
        a = f * f + b * b;
        if (!a) return (c[0] = 0), (c[1] = 0), (c[2] = 0), c;
        a = 1 / Math.sqrt(a);
        c[0] = f * a;
        c[1] = b * a;
        return c;
      },
      lerp: function (b, a, c, f) {
        f || (f = b);
        f[0] = b[0] + c * (a[0] - b[0]);
        f[1] = b[1] + c * (a[1] - b[1]);
        return f;
      },
      str: function (b) {
        return "[" + b[0] + ", " + b[1] + "]";
      },
    },
    y = {
      create: function (b) {
        var a = new d(4);
        b
          ? ((a[0] = b[0]), (a[1] = b[1]), (a[2] = b[2]), (a[3] = b[3]))
          : (a[0] = a[1] = a[2] = a[3] = 0);
        return a;
      },
      createFrom: function (b, a, c, f) {
        var l = new d(4);
        l[0] = b;
        l[1] = a;
        l[2] = c;
        l[3] = f;
        return l;
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) &&
            1e-6 > Math.abs(b[1] - a[1]) &&
            1e-6 > Math.abs(b[2] - a[2]) &&
            1e-6 > Math.abs(b[3] - a[3]))
        );
      },
      identity: function (b) {
        b || (b = y.create());
        b[0] = 1;
        b[1] = 0;
        b[2] = 0;
        b[3] = 1;
        return b;
      },
      transpose: function (b, a) {
        if (!a || b === a) return (a = b[1]), (b[1] = b[2]), (b[2] = a), b;
        a[0] = b[0];
        a[1] = b[2];
        a[2] = b[1];
        a[3] = b[3];
        return a;
      },
      determinant: function (b) {
        return b[0] * b[3] - b[2] * b[1];
      },
      inverse: function (b, a) {
        a || (a = b);
        var c = b[0],
          f = b[1],
          l = b[2];
        b = b[3];
        var h = c * b - l * f;
        if (!h) return null;
        h = 1 / h;
        a[0] = b * h;
        a[1] = -f * h;
        a[2] = -l * h;
        a[3] = c * h;
        return a;
      },
      multiply: function (b, a, c) {
        c || (c = b);
        var f = b[0],
          l = b[1],
          h = b[2];
        b = b[3];
        c[0] = f * a[0] + l * a[2];
        c[1] = f * a[1] + l * a[3];
        c[2] = h * a[0] + b * a[2];
        c[3] = h * a[1] + b * a[3];
        return c;
      },
      rotate: function (b, a, c) {
        c || (c = b);
        var f = b[0],
          l = b[1],
          h = b[2];
        b = b[3];
        var d = Math.sin(a);
        a = Math.cos(a);
        c[0] = f * a + l * d;
        c[1] = f * -d + l * a;
        c[2] = h * a + b * d;
        c[3] = h * -d + b * a;
        return c;
      },
      multiplyVec2: function (b, a, c) {
        c || (c = a);
        var f = a[0];
        a = a[1];
        c[0] = f * b[0] + a * b[1];
        c[1] = f * b[2] + a * b[3];
        return c;
      },
      scale: function (b, a, c) {
        c || (c = b);
        var f = b[1],
          l = b[2],
          h = b[3],
          d = a[0];
        a = a[1];
        c[0] = b[0] * d;
        c[1] = f * a;
        c[2] = l * d;
        c[3] = h * a;
        return c;
      },
      str: function (b) {
        return "[" + b[0] + ", " + b[1] + ", " + b[2] + ", " + b[3] + "]";
      },
    },
    x = {
      create: function (b) {
        var a = new d(4);
        b
          ? ((a[0] = b[0]), (a[1] = b[1]), (a[2] = b[2]), (a[3] = b[3]))
          : ((a[0] = 0), (a[1] = 0), (a[2] = 0), (a[3] = 0));
        return a;
      },
      createFrom: function (b, a, c, f) {
        var l = new d(4);
        l[0] = b;
        l[1] = a;
        l[2] = c;
        l[3] = f;
        return l;
      },
      add: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] + a[0];
        c[1] = b[1] + a[1];
        c[2] = b[2] + a[2];
        c[3] = b[3] + a[3];
        return c;
      },
      subtract: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] - a[0];
        c[1] = b[1] - a[1];
        c[2] = b[2] - a[2];
        c[3] = b[3] - a[3];
        return c;
      },
      multiply: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] * a[0];
        c[1] = b[1] * a[1];
        c[2] = b[2] * a[2];
        c[3] = b[3] * a[3];
        return c;
      },
      divide: function (b, a, c) {
        c || (c = a);
        c[0] = b[0] / a[0];
        c[1] = b[1] / a[1];
        c[2] = b[2] / a[2];
        c[3] = b[3] / a[3];
        return c;
      },
      scale: function (b, a, c) {
        c || (c = b);
        c[0] = b[0] * a;
        c[1] = b[1] * a;
        c[2] = b[2] * a;
        c[3] = b[3] * a;
        return c;
      },
      set: function (b, a) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return a;
      },
      equal: function (b, a) {
        return (
          b === a ||
          (1e-6 > Math.abs(b[0] - a[0]) &&
            1e-6 > Math.abs(b[1] - a[1]) &&
            1e-6 > Math.abs(b[2] - a[2]) &&
            1e-6 > Math.abs(b[3] - a[3]))
        );
      },
      negate: function (b, a) {
        a || (a = b);
        a[0] = -b[0];
        a[1] = -b[1];
        a[2] = -b[2];
        a[3] = -b[3];
        return a;
      },
      length: function (b) {
        var a = b[0],
          c = b[1],
          f = b[2];
        b = b[3];
        return Math.sqrt(a * a + c * c + f * f + b * b);
      },
      squaredLength: function (b) {
        var a = b[0],
          c = b[1],
          f = b[2];
        b = b[3];
        return a * a + c * c + f * f + b * b;
      },
      lerp: function (b, a, c, f) {
        f || (f = b);
        f[0] = b[0] + c * (a[0] - b[0]);
        f[1] = b[1] + c * (a[1] - b[1]);
        f[2] = b[2] + c * (a[2] - b[2]);
        f[3] = b[3] + c * (a[3] - b[3]);
        return f;
      },
      str: function (b) {
        return "[" + b[0] + ", " + b[1] + ", " + b[2] + ", " + b[3] + "]";
      },
    };
  e &&
    ((e.glMatrixArrayType = d),
    (e.MatrixArray = d),
    (e.setMatrixArrayType = m),
    (e.determineMatrixArrayType = k),
    (e.glMath = p),
    (e.vec2 = w),
    (e.vec3 = g),
    (e.vec4 = x),
    (e.mat2 = y),
    (e.mat3 = r),
    (e.mat4 = v),
    (e.quat4 = n));
  return {
    glMatrixArrayType: d,
    MatrixArray: d,
    setMatrixArrayType: m,
    determineMatrixArrayType: k,
    glMath: p,
    vec2: w,
    vec3: g,
    vec4: x,
    mat2: y,
    mat3: r,
    mat4: v,
    quat4: n,
  };
});
(function (e) {
  function m(b) {
    return 0 == b ? 0 : 0 < b ? 1 : -1;
  }
  var k = {
      subtract: function (b, a) {
        return { x: b.x - a.x, y: b.y - a.y };
      },
      dotProduct: function (b, a) {
        return b.x * a.x + b.y * a.y;
      },
      square: function (b) {
        return Math.sqrt(b.x * b.x + b.y * b.y);
      },
      scale: function (b, a) {
        return { x: b.x * a, y: b.y * a };
      },
    },
    p = Math.pow(2, -65),
    d = function (b, c) {
      for (
        var f = [],
          l = c.length - 1,
          h = 2 * l - 1,
          d = [],
          r = [],
          v = [],
          n = [],
          e = [
            [1, 0.6, 0.3, 0.1],
            [0.4, 0.6, 0.6, 0.4],
            [0.1, 0.3, 0.6, 1],
          ],
          p = 0;
        p <= l;
        p++
      )
        d[p] = k.subtract(c[p], b);
      for (p = 0; p <= l - 1; p++)
        (r[p] = k.subtract(c[p + 1], c[p])), (r[p] = k.scale(r[p], 3));
      for (p = 0; p <= l - 1; p++)
        for (var m = 0; m <= l; m++)
          v[p] || (v[p] = []), (v[p][m] = k.dotProduct(r[p], d[m]));
      for (p = 0; p <= h; p++)
        n[p] || (n[p] = []), (n[p].y = 0), (n[p].x = parseFloat(p) / h);
      h = l - 1;
      for (d = 0; d <= l + h; d++)
        for (r = Math.min(d, l), p = Math.max(0, d - h); p <= r; p++)
          (m = d - p), (n[p + m].y += v[m][p] * e[m][p]);
      l = c.length - 1;
      n = g(n, 2 * l - 1, f, 0);
      h = k.subtract(b, c[0]);
      v = k.square(h);
      for (p = e = 0; p < n; p++)
        (h = k.subtract(b, a(c, l, f[p], null, null))),
          (h = k.square(h)),
          h < v && ((v = h), (e = f[p]));
      h = k.subtract(b, c[l]);
      h = k.square(h);
      h < v && ((v = h), (e = 1));
      return { location: e, distance: v };
    },
    g = function (b, c, f, l) {
      var h = [],
        d = [],
        r = [],
        v = [],
        n = 0;
      var e = m(b[0].y);
      for (var u = 1; u <= c; u++) {
        var w = m(b[u].y);
        w != e && n++;
        e = w;
      }
      switch (n) {
        case 0:
          return 0;
        case 1:
          if (64 <= l) return (f[0] = (b[0].x + b[c].x) / 2), 1;
          var k, G;
          n = b[0].y - b[c].y;
          w = b[c].x - b[0].x;
          e = b[0].x * b[c].y - b[c].x * b[0].y;
          u = k = 0;
          for (G = 1; G < c; G++) {
            var F = n * b[G].x + w * b[G].y + e;
            F > k ? (k = F) : F < u && (u = F);
          }
          G = w;
          k = (1 / (0 * G - 1 * n)) * (e - k - 0 * G);
          G = w;
          n = (1 / (0 * G - 1 * n)) * (e - u - 0 * G);
          if (Math.max(k, n) - Math.min(k, n) < p)
            return (
              (r = b[c].x - b[0].x),
              (v = b[c].y - b[0].y),
              (f[0] =
                (1 / (0 * r - 1 * v)) * (r * (b[0].y - 0) - v * (b[0].x - 0))),
              1
            );
      }
      a(b, c, 0.5, h, d);
      b = g(h, c, r, l + 1);
      c = g(d, c, v, l + 1);
      for (l = 0; l < b; l++) f[l] = r[l];
      for (l = 0; l < c; l++) f[l + b] = v[l];
      return b + c;
    },
    a = function (b, a, c, f, l) {
      for (var h = [[]], d = 0; d <= a; d++) h[0][d] = b[d];
      for (b = 1; b <= a; b++)
        for (d = 0; d <= a - b; d++)
          h[b] || (h[b] = []),
            h[b][d] || (h[b][d] = {}),
            (h[b][d].x = (1 - c) * h[b - 1][d].x + c * h[b - 1][d + 1].x),
            (h[b][d].y = (1 - c) * h[b - 1][d].y + c * h[b - 1][d + 1].y);
      if (null != f) for (d = 0; d <= a; d++) f[d] = h[d][0];
      if (null != l) for (d = 0; d <= a; d++) l[d] = h[a - d][d];
      return h[a][0];
    },
    f = {},
    c = function (b) {
      var a = f[b];
      if (!a) {
        a = [];
        var c = function (b) {
            return function (a) {
              return b;
            };
          },
          l = function () {
            return function (b) {
              return b;
            };
          },
          h = function () {
            return function (b) {
              return 1 - b;
            };
          },
          d = function (b) {
            return function (a) {
              for (var c = 1, f = 0; f < b.length; f++) c *= b[f](a);
              return c;
            };
          };
        a.push(
          new (function () {
            return function (a) {
              return Math.pow(a, b);
            };
          })()
        );
        for (var r = 1; r < b; r++) {
          for (var v = [new c(b)], g = 0; g < b - r; g++) v.push(new l());
          for (g = 0; g < r; g++) v.push(new h());
          a.push(new d(v));
        }
        a.push(
          new (function () {
            return function (a) {
              return Math.pow(1 - a, b);
            };
          })()
        );
        f[b] = a;
      }
      return a;
    },
    b = function (b, a) {
      for (var f = c(b.length - 1), l = 0, h = 0, d = 0; d < b.length; d++)
        (l += b[d].x * f[d](a)), (h += b[d].y * f[d](a));
      return { x: l, y: h };
    },
    l = function (b, a) {
      return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    },
    h = function (a, c, f) {
      for (
        var h = b(a, c), d = 0, r = 0 < f ? 1 : -1, g = null;
        d < Math.abs(f);

      )
        (c += 0.005 * r), (g = b(a, c)), (d += l(g, h)), (h = g);
      return { point: g, location: c };
    },
    r = function (a, c) {
      var f = b(a, c);
      c = b(a.slice(0, a.length - 1), c);
      a = c.y - f.y;
      f = c.x - f.x;
      return 0 == a ? Infinity : Math.atan(a / f);
    };
  ChemDoodle.lib.jsBezier = {
    distanceFromCurve: d,
    gradientAtPoint: r,
    gradientAtPointAlongCurveFrom: function (b, a, c) {
      a = h(b, a, c);
      1 < a.location && (a.location = 1);
      0 > a.location && (a.location = 0);
      return r(b, a.location);
    },
    nearestPointOnCurve: function (b, c) {
      b = d(b, c);
      return {
        point: a(c, c.length - 1, b.location, null, null),
        location: b.location,
      };
    },
    pointOnCurve: b,
    pointAlongCurveFrom: function (b, a, c) {
      return h(b, a, c).point;
    },
    perpendicularToCurveAt: function (b, a, c, f) {
      a = h(b, a, null == f ? 0 : f);
      b = r(b, a.location);
      f = Math.atan(-1 / b);
      b = (c / 2) * Math.sin(f);
      c = (c / 2) * Math.cos(f);
      return [
        { x: a.point.x + c, y: a.point.y + b },
        { x: a.point.x - c, y: a.point.y - b },
      ];
    },
    locationAlongCurveFrom: function (b, a, c) {
      return h(b, a, c).location;
    },
    getLength: function (a) {
      for (var c = b(a, 0), f = 0, h = 0, d; 1 > h; )
        (h += 0.005), (d = b(a, h)), (f += l(d, c)), (c = d);
      return f;
    },
  };
})(ChemDoodle.lib);
ChemDoodle.lib.MarchingCubes = (function () {
  var e = new Uint32Array([
      0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082,
      3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197,
      2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077,
      1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170,
      1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232,
      1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154,
      2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317,
      4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107, 1370, 598, 863, 85,
      348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475,
      1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240,
      2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226,
      1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85,
      863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095,
      3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403,
      2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120,
      3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958,
      170, 419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340,
      1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975,
      2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331,
      3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0,
    ]),
    m = [
      [],
      [0, 8, 3],
      [0, 1, 9],
      [1, 8, 3, 9, 8, 1],
      [1, 2, 10],
      [0, 8, 3, 1, 2, 10],
      [9, 2, 10, 0, 2, 9],
      [2, 8, 3, 2, 10, 8, 10, 9, 8],
      [3, 11, 2],
      [0, 11, 2, 8, 11, 0],
      [1, 9, 0, 2, 3, 11],
      [1, 11, 2, 1, 9, 11, 9, 8, 11],
      [3, 10, 1, 11, 10, 3],
      [0, 10, 1, 0, 8, 10, 8, 11, 10],
      [3, 9, 0, 3, 11, 9, 11, 10, 9],
      [9, 8, 10, 10, 8, 11],
      [4, 7, 8],
      [4, 3, 0, 7, 3, 4],
      [0, 1, 9, 8, 4, 7],
      [4, 1, 9, 4, 7, 1, 7, 3, 1],
      [1, 2, 10, 8, 4, 7],
      [3, 4, 7, 3, 0, 4, 1, 2, 10],
      [9, 2, 10, 9, 0, 2, 8, 4, 7],
      [2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4],
      [8, 4, 7, 3, 11, 2],
      [11, 4, 7, 11, 2, 4, 2, 0, 4],
      [9, 0, 1, 8, 4, 7, 2, 3, 11],
      [4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1],
      [3, 10, 1, 3, 11, 10, 7, 8, 4],
      [1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4],
      [4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3],
      [4, 7, 11, 4, 11, 9, 9, 11, 10],
      [9, 5, 4],
      [9, 5, 4, 0, 8, 3],
      [0, 5, 4, 1, 5, 0],
      [8, 5, 4, 8, 3, 5, 3, 1, 5],
      [1, 2, 10, 9, 5, 4],
      [3, 0, 8, 1, 2, 10, 4, 9, 5],
      [5, 2, 10, 5, 4, 2, 4, 0, 2],
      [2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8],
      [9, 5, 4, 2, 3, 11],
      [0, 11, 2, 0, 8, 11, 4, 9, 5],
      [0, 5, 4, 0, 1, 5, 2, 3, 11],
      [2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5],
      [10, 3, 11, 10, 1, 3, 9, 5, 4],
      [4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10],
      [5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3],
      [5, 4, 8, 5, 8, 10, 10, 8, 11],
      [9, 7, 8, 5, 7, 9],
      [9, 3, 0, 9, 5, 3, 5, 7, 3],
      [0, 7, 8, 0, 1, 7, 1, 5, 7],
      [1, 5, 3, 3, 5, 7],
      [9, 7, 8, 9, 5, 7, 10, 1, 2],
      [10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3],
      [8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2],
      [2, 10, 5, 2, 5, 3, 3, 5, 7],
      [7, 9, 5, 7, 8, 9, 3, 11, 2],
      [9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11],
      [2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7],
      [11, 2, 1, 11, 1, 7, 7, 1, 5],
      [9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11],
      [5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0],
      [11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0],
      [11, 10, 5, 7, 11, 5],
      [10, 6, 5],
      [0, 8, 3, 5, 10, 6],
      [9, 0, 1, 5, 10, 6],
      [1, 8, 3, 1, 9, 8, 5, 10, 6],
      [1, 6, 5, 2, 6, 1],
      [1, 6, 5, 1, 2, 6, 3, 0, 8],
      [9, 6, 5, 9, 0, 6, 0, 2, 6],
      [5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8],
      [2, 3, 11, 10, 6, 5],
      [11, 0, 8, 11, 2, 0, 10, 6, 5],
      [0, 1, 9, 2, 3, 11, 5, 10, 6],
      [5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11],
      [6, 3, 11, 6, 5, 3, 5, 1, 3],
      [0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6],
      [3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9],
      [6, 5, 9, 6, 9, 11, 11, 9, 8],
      [5, 10, 6, 4, 7, 8],
      [4, 3, 0, 4, 7, 3, 6, 5, 10],
      [1, 9, 0, 5, 10, 6, 8, 4, 7],
      [10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4],
      [6, 1, 2, 6, 5, 1, 4, 7, 8],
      [1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7],
      [8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6],
      [7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9],
      [3, 11, 2, 7, 8, 4, 10, 6, 5],
      [5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11],
      [0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6],
      [9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6],
      [8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6],
      [5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11],
      [0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7],
      [6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9],
      [10, 4, 9, 6, 4, 10],
      [4, 10, 6, 4, 9, 10, 0, 8, 3],
      [10, 0, 1, 10, 6, 0, 6, 4, 0],
      [8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10],
      [1, 4, 9, 1, 2, 4, 2, 6, 4],
      [3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4],
      [0, 2, 4, 4, 2, 6],
      [8, 3, 2, 8, 2, 4, 4, 2, 6],
      [10, 4, 9, 10, 6, 4, 11, 2, 3],
      [0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6],
      [3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10],
      [6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1],
      [9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3],
      [8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1],
      [3, 11, 6, 3, 6, 0, 0, 6, 4],
      [6, 4, 8, 11, 6, 8],
      [7, 10, 6, 7, 8, 10, 8, 9, 10],
      [0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10],
      [10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0],
      [10, 6, 7, 10, 7, 1, 1, 7, 3],
      [1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7],
      [2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9],
      [7, 8, 0, 7, 0, 6, 6, 0, 2],
      [7, 3, 2, 6, 7, 2],
      [2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7],
      [2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7],
      [1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11],
      [11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1],
      [8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6],
      [0, 9, 1, 11, 6, 7],
      [7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0],
      [7, 11, 6],
      [7, 6, 11],
      [3, 0, 8, 11, 7, 6],
      [0, 1, 9, 11, 7, 6],
      [8, 1, 9, 8, 3, 1, 11, 7, 6],
      [10, 1, 2, 6, 11, 7],
      [1, 2, 10, 3, 0, 8, 6, 11, 7],
      [2, 9, 0, 2, 10, 9, 6, 11, 7],
      [6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8],
      [7, 2, 3, 6, 2, 7],
      [7, 0, 8, 7, 6, 0, 6, 2, 0],
      [2, 7, 6, 2, 3, 7, 0, 1, 9],
      [1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6],
      [10, 7, 6, 10, 1, 7, 1, 3, 7],
      [10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8],
      [0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7],
      [7, 6, 10, 7, 10, 8, 8, 10, 9],
      [6, 8, 4, 11, 8, 6],
      [3, 6, 11, 3, 0, 6, 0, 4, 6],
      [8, 6, 11, 8, 4, 6, 9, 0, 1],
      [9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6],
      [6, 8, 4, 6, 11, 8, 2, 10, 1],
      [1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6],
      [4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9],
      [10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3],
      [8, 2, 3, 8, 4, 2, 4, 6, 2],
      [0, 4, 2, 4, 6, 2],
      [1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8],
      [1, 9, 4, 1, 4, 2, 2, 4, 6],
      [8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1],
      [10, 1, 0, 10, 0, 6, 6, 0, 4],
      [4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3],
      [10, 9, 4, 6, 10, 4],
      [4, 9, 5, 7, 6, 11],
      [0, 8, 3, 4, 9, 5, 11, 7, 6],
      [5, 0, 1, 5, 4, 0, 7, 6, 11],
      [11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5],
      [9, 5, 4, 10, 1, 2, 7, 6, 11],
      [6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5],
      [7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2],
      [3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6],
      [7, 2, 3, 7, 6, 2, 5, 4, 9],
      [9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7],
      [3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0],
      [6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8],
      [9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7],
      [1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4],
      [4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10],
      [7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10],
      [6, 9, 5, 6, 11, 9, 11, 8, 9],
      [3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5],
      [0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11],
      [6, 11, 3, 6, 3, 5, 5, 3, 1],
      [1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6],
      [0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10],
      [11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5],
      [6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3],
      [5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2],
      [9, 5, 6, 9, 6, 0, 0, 6, 2],
      [1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8],
      [1, 5, 6, 2, 1, 6],
      [1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6],
      [10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0],
      [0, 3, 8, 5, 6, 10],
      [10, 5, 6],
      [11, 5, 10, 7, 5, 11],
      [11, 5, 10, 11, 7, 5, 8, 3, 0],
      [5, 11, 7, 5, 10, 11, 1, 9, 0],
      [10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1],
      [11, 1, 2, 11, 7, 1, 7, 5, 1],
      [0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11],
      [9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7],
      [7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2],
      [2, 5, 10, 2, 3, 5, 3, 7, 5],
      [8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5],
      [9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2],
      [9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2],
      [1, 3, 5, 3, 7, 5],
      [0, 8, 7, 0, 7, 1, 1, 7, 5],
      [9, 0, 3, 9, 3, 5, 5, 3, 7],
      [9, 8, 7, 5, 9, 7],
      [5, 8, 4, 5, 10, 8, 10, 11, 8],
      [5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0],
      [0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5],
      [10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4],
      [2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8],
      [0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11],
      [0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5],
      [9, 4, 5, 2, 11, 3],
      [2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4],
      [5, 10, 2, 5, 2, 4, 4, 2, 0],
      [3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9],
      [5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2],
      [8, 4, 5, 8, 5, 3, 3, 5, 1],
      [0, 4, 5, 1, 0, 5],
      [8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5],
      [9, 4, 5],
      [4, 11, 7, 4, 9, 11, 9, 10, 11],
      [0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11],
      [1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11],
      [3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4],
      [4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2],
      [9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3],
      [11, 7, 4, 11, 4, 2, 2, 4, 0],
      [11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4],
      [2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9],
      [9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7],
      [3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10],
      [1, 10, 2, 8, 7, 4],
      [4, 9, 1, 4, 1, 7, 7, 1, 3],
      [4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1],
      [4, 0, 3, 7, 4, 3],
      [4, 8, 7],
      [9, 10, 8, 10, 11, 8],
      [3, 0, 9, 3, 9, 11, 11, 9, 10],
      [0, 1, 10, 0, 10, 8, 8, 10, 11],
      [3, 1, 10, 11, 3, 10],
      [1, 2, 11, 1, 11, 9, 9, 11, 8],
      [3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9],
      [0, 2, 11, 8, 0, 11],
      [3, 2, 11],
      [2, 3, 8, 2, 8, 10, 10, 8, 9],
      [9, 10, 2, 0, 9, 2],
      [2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8],
      [1, 10, 2],
      [1, 3, 8, 9, 1, 8],
      [0, 9, 1],
      [0, 3, 8],
      [],
    ],
    k = [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ],
    p = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
  return function (d, g) {
    var a = [],
      f = [],
      c = 0,
      b = new Float32Array(8),
      l = new Int32Array(12),
      h = new Int32Array(3);
    for (h[2] = 0; h[2] < g[2] - 1; ++h[2], c += g[0])
      for (h[1] = 0; h[1] < g[1] - 1; ++h[1], ++c)
        for (h[0] = 0; h[0] < g[0] - 1; ++h[0], ++c) {
          for (var r = 0, v = 0; 8 > v; ++v) {
            var n = k[v];
            n = d[c + n[0] + g[0] * (n[1] + g[1] * n[2])];
            b[v] = n;
            r |= 0 < n ? 1 << v : 0;
          }
          n = e[r];
          if (0 !== n) {
            for (v = 0; 12 > v; ++v)
              if (0 !== (n & (1 << v))) {
                l[v] = a.length;
                var u = [0, 0, 0],
                  w = p[v],
                  y = k[w[0]],
                  x = k[w[1]],
                  t = b[w[0]],
                  z = t - b[w[1]];
                w = 0;
                1e-6 < Math.abs(z) && (w = t / z);
                for (t = 0; 3 > t; ++t) u[t] = h[t] + y[t] + w * (x[t] - y[t]);
                a.push(u);
              }
            r = m[r];
            for (v = 0; v < r.length; v += 3)
              f.push([l[r[v]], l[r[v + 1]], l[r[v + 2]]]);
          }
        }
    return { vertices: a, faces: f };
  };
})();
ChemDoodle.animations = (function (e, m) {
  m = {};
  e.requestAnimFrame = (function () {
    return (
      e.requestAnimationFrame ||
      e.webkitRequestAnimationFrame ||
      e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame ||
      e.msRequestAnimationFrame ||
      function (k, p) {
        e.setTimeout(k, 1e3 / 60);
      }
    );
  })();
  m.requestInterval = function (k, p) {
    function d() {
      new Date().getTime() - g >= p && (k.call(), (g = new Date().getTime()));
      a.value = e.requestAnimFrame(d);
    }
    if (
      !(
        e.requestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        (e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame) ||
        e.oRequestAnimationFrame ||
        e.msRequestAnimationFrame
      )
    )
      return e.setInterval(k, p);
    let g = new Date().getTime(),
      a = {};
    a.value = e.requestAnimFrame(d);
    return a;
  };
  m.clearRequestInterval = function (k) {
    e.cancelAnimationFrame
      ? e.cancelAnimationFrame(k.value)
      : e.webkitCancelAnimationFrame
      ? e.webkitCancelAnimationFrame(k.value)
      : e.webkitCancelRequestAnimationFrame
      ? e.webkitCancelRequestAnimationFrame(k.value)
      : e.mozCancelRequestAnimationFrame
      ? e.mozCancelRequestAnimationFrame(k.value)
      : e.oCancelRequestAnimationFrame
      ? e.oCancelRequestAnimationFrame(k.value)
      : e.msCancelRequestAnimationFrame
      ? e.msCancelRequestAnimationFrame(k.value)
      : clearInterval(k);
  };
  m.requestTimeout = function (k, p) {
    function d() {
      new Date().getTime() - g >= p
        ? k.call()
        : (a.value = e.requestAnimFrame(d));
    }
    if (
      !(
        e.requestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        (e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame) ||
        e.oRequestAnimationFrame ||
        e.msRequestAnimationFrame
      )
    )
      return e.setTimeout(k, p);
    let g = new Date().getTime(),
      a = {};
    a.value = e.requestAnimFrame(d);
    return a;
  };
  m.clearRequestTimeout = function (k) {
    e.cancelAnimationFrame
      ? e.cancelAnimationFrame(k.value)
      : e.webkitCancelAnimationFrame
      ? e.webkitCancelAnimationFrame(k.value)
      : e.webkitCancelRequestAnimationFrame
      ? e.webkitCancelRequestAnimationFrame(k.value)
      : e.mozCancelRequestAnimationFrame
      ? e.mozCancelRequestAnimationFrame(k.value)
      : e.oCancelRequestAnimationFrame
      ? e.oCancelRequestAnimationFrame(k.value)
      : e.msCancelRequestAnimationFrame
      ? e.msCancelRequestAnimationFrame(k.value)
      : clearTimeout(k);
  };
  return m;
})(window);
ChemDoodle.extensions = (function (e, m, k, p) {
  return {
    vec3AngleFrom: function (d, g) {
      let a = m.length(d),
        f = m.length(g);
      d = m.dot(d, g);
      return k.acos(d / a / f);
    },
    contextRoundRect: function (d, g, a, f, c, b) {
      d.beginPath();
      d.moveTo(g + b, a);
      d.lineTo(g + f - b, a);
      d.quadraticCurveTo(g + f, a, g + f, a + b);
      d.lineTo(g + f, a + c - b);
      d.quadraticCurveTo(g + f, a + c, g + f - b, a + c);
      d.lineTo(g + b, a + c);
      d.quadraticCurveTo(g, a + c, g, a + c - b);
      d.lineTo(g, a + b);
      d.quadraticCurveTo(g, a, g + b, a);
      d.closePath();
    },
    contextEllipse: function (d, g, a, f, c) {
      let b = (f / 2) * 0.5522848,
        l = (c / 2) * 0.5522848,
        h = g + f,
        r = a + c;
      f = g + f / 2;
      c = a + c / 2;
      d.beginPath();
      d.moveTo(g, c);
      d.bezierCurveTo(g, c - l, f - b, a, f, a);
      d.bezierCurveTo(f + b, a, h, c - l, h, c);
      d.bezierCurveTo(h, c + l, f + b, r, f, r);
      d.bezierCurveTo(f - b, r, g, c + l, g, c);
      d.closePath();
    },
    getFontString: function (d, g, a, f) {
      let c = [];
      a && c.push("bold ");
      f && c.push("italic ");
      c.push(d + "px ");
      for (let b = 0, a = g.length; b < a; b++)
        (d = g[b]),
          -1 !== d.indexOf(" ") && (d = '"' + d + '"'),
          c.push((0 !== b ? "," : "") + d);
      return c.join("");
    },
  };
})(ChemDoodle.structures, ChemDoodle.lib.vec3, Math);
(function (e, m, k) {
  m.sign ||
    (m.sign = function (e) {
      return (0 < e) - (0 > e) || +e;
    });
  "function" != typeof e.assign &&
    (e.assign = function (p, d) {
      if (null == p)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var g = e(p), a = 1; a < arguments.length; a++) {
        var f = arguments[a];
        if (null != f)
          for (var c in f)
            e.prototype.hasOwnProperty.call(f, c) && (g[c] = f[c]);
      }
      return g;
    });
  String.prototype.startsWith ||
    (String.prototype.startsWith = function (e, d) {
      return this.substr(d || 0, e.length) === e;
    });
})(Object, Math);
ChemDoodle.math = (function (e, m, k, p, d) {
  let g = {},
    a = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      "indianred ": "#cd5c5c",
      "indigo ": "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgrey: "#d3d3d3",
      lightgreen: "#90ee90",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370d8",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#d87093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32",
    };
  g.angleBetweenLargest = function (a) {
    if (0 === a.length) return { angle: 0, largest: 2 * k.PI };
    if (1 === a.length) return { angle: a[0] + k.PI, largest: 2 * k.PI };
    let c = 0,
      b = 0;
    for (let l = 0, d = a.length - 1; l < d; l++) {
      var f = a[l + 1] - a[l];
      f > c && ((c = f), (b = (a[l + 1] + a[l]) / 2));
    }
    f = a[0] + 2 * k.PI - a[a.length - 1];
    f > c && ((b = a[0] - f / 2), (c = f), 0 > b && (b += 2 * k.PI));
    return { angle: b, largest: c };
  };
  g.isBetween = function (a, c, b) {
    if (c > b) {
      let a = c;
      c = b;
      b = a;
    }
    return a >= c && a <= b;
  };
  p.addEventListener("DOMContentLoaded", function (a) {
    e &&
      e.iChemLabs &&
      e.iChemLabs.checkForUpdates &&
      e.iChemLabs.checkForUpdates({});
  });
  g.getRGB = function (f, c) {
    let b = [0, 0, 0];
    a[f.toLowerCase()] && (f = a[f.toLowerCase()]);
    return "#" === f.charAt(0)
      ? (4 === f.length &&
          (f =
            "#" +
            f.charAt(1) +
            f.charAt(1) +
            f.charAt(2) +
            f.charAt(2) +
            f.charAt(3) +
            f.charAt(3)),
        [
          (parseInt(f.substring(1, 3), 16) / 255) * c,
          (parseInt(f.substring(3, 5), 16) / 255) * c,
          (parseInt(f.substring(5, 7), 16) / 255) * c,
        ])
      : f.startsWith("rgba")
      ? ((f = f.replace(/rgba\(|\)/g, "").split(",")),
        4 !== f.length
          ? b
          : [
              (parseInt(f[0]) / 255) * c,
              (parseInt(f[1]) / 255) * c,
              (parseInt(f[2]) / 255) * c,
              (parseInt(f[3]) / 255) * c,
            ])
      : f.startsWith("rgb")
      ? ((f = f.replace(/rgb\(|\)/g, "").split(",")),
        3 !== f.length
          ? b
          : [
              (parseInt(f[0]) / 255) * c,
              (parseInt(f[1]) / 255) * c,
              (parseInt(f[2]) / 255) * c,
            ])
      : b;
  };
  g.hsl2rgb = function (a, c, b) {
    let f = function (b, a, c) {
      0 > c ? (c += 1) : 1 < c && --c;
      return c < 1 / 6
        ? b + 6 * (a - b) * c
        : 0.5 > c
        ? a
        : c < 2 / 3
        ? b + (a - b) * (2 / 3 - c) * 6
        : b;
    };
    if (0 === c) b = c = a = b;
    else {
      let l = 0.5 > b ? b * (1 + c) : b + c - b * c,
        d = 2 * b - l;
      b = f(d, l, a + 1 / 3);
      c = f(d, l, a);
      a = f(d, l, a - 1 / 3);
    }
    return [255 * b, 255 * c, 255 * a];
  };
  g.idx2color = function (a) {
    a = a.toString(16);
    for (let c = 0, b = 6 - a.length; c < b; c++) a = "0" + a;
    return "#" + a;
  };
  g.distanceFromPointToLineInclusive = function (a, c, b, l) {
    let f = c.distance(b);
    b = c.angle(b);
    b = k.PI / 2 - b;
    b = c.angle(a) + b;
    a = c.distance(a);
    a = new m.Point(a * k.cos(b), -a * k.sin(b));
    l = l ? l : 0;
    return g.isBetween(-a.y, l, f - l) ? k.abs(a.x) : -1;
  };
  g.calculateDistanceInterior = function (a, c, b) {
    if (
      this.isBetween(c.x, b.x, b.x + b.w) &&
      this.isBetween(c.y, b.y, b.y + b.h)
    )
      return a.distance(c);
    var f = [];
    f.push({ x1: b.x, y1: b.y, x2: b.x + b.w, y2: b.y });
    f.push({ x1: b.x, y1: b.y + b.h, x2: b.x + b.w, y2: b.y + b.h });
    f.push({ x1: b.x, y1: b.y, x2: b.x, y2: b.y + b.h });
    f.push({ x1: b.x + b.w, y1: b.y, x2: b.x + b.w, y2: b.y + b.h });
    b = [];
    for (var d = 0; 4 > d; d++) {
      var r = f[d];
      (r = this.intersectLines(c.x, c.y, a.x, a.y, r.x1, r.y1, r.x2, r.y2)) &&
        b.push(r);
    }
    if (0 === b.length) return 0;
    c = 0;
    for (let l = 0, h = b.length; l < h; l++)
      (d = b[l]),
        (f = a.x - d.x),
        (d = a.y - d.y),
        (c = k.max(c, k.sqrt(f * f + d * d)));
    return c;
  };
  g.intersectLines = function (a, c, b, l, d, r, g, n) {
    b -= a;
    l -= c;
    g -= d;
    n -= r;
    let f = l * g - b * n;
    if (0 === f) return !1;
    g = (n * (a - d) - g * (c - r)) / f;
    d = (l * (a - d) - b * (c - r)) / f;
    return 0 <= d && 1 >= d && 0 <= g && 1 >= g
      ? { x: a + g * b, y: c + g * l }
      : !1;
  };
  g.clamp = function (a, c, b) {
    return a < c ? c : a > b ? b : a;
  };
  g.rainbowAt = function (a, c, b) {
    1 > b.length
      ? b.push("#000000", "#FFFFFF")
      : 2 > b.length && b.push("#FFFFFF");
    var f = c / (b.length - 1);
    c = k.floor(a / f);
    a = (a - c * f) / f;
    f = g.getRGB(b[c], 1);
    b = g.getRGB(b[c + 1], 1);
    return (
      "rgb(" +
      [
        255 * (f[0] + (b[0] - f[0]) * a),
        255 * (f[1] + (b[1] - f[1]) * a),
        255 * (f[2] + (b[2] - f[2]) * a),
      ].join() +
      ")"
    );
  };
  g.angleBounds = function (a, c, b) {
    let f = 2 * k.PI;
    for (; 0 > a; ) a += f;
    for (; a > f; ) a -= f;
    b && a > k.PI && (a = 2 * k.PI - a);
    c && (a = (180 * a) / k.PI);
    return a;
  };
  g.isPointInPoly = function (a, c) {
    for (var b = !1, f = -1, d = a.length, r = d - 1; ++f < d; r = f)
      ((a[f].y <= c.y && c.y < a[r].y) || (a[r].y <= c.y && c.y < a[f].y)) &&
        c.x <
          ((a[r].x - a[f].x) * (c.y - a[f].y)) / (a[r].y - a[f].y) + a[f].x &&
        (b = !b);
    return b;
  };
  return g;
})(ChemDoodle, ChemDoodle.structures, Math, document);
(function (e, m, k) {
  e.Bounds = function () {};
  let p = e.Bounds.prototype;
  p.minX = p.minY = p.minZ = Infinity;
  p.maxX = p.maxY = p.maxZ = -Infinity;
  p.expand = function (d, g, a, f) {
    d instanceof e.Bounds
      ? ((this.minX = m.min(this.minX, d.minX)),
        (this.minY = m.min(this.minY, d.minY)),
        (this.maxX = m.max(this.maxX, d.maxX)),
        (this.maxY = m.max(this.maxY, d.maxY)),
        Infinity !== d.maxZ &&
          ((this.minZ = m.min(this.minZ, d.minZ)),
          (this.maxZ = m.max(this.maxZ, d.maxZ))))
      : ((this.minX = m.min(this.minX, d)),
        (this.maxX = m.max(this.maxX, d)),
        (this.minY = m.min(this.minY, g)),
        (this.maxY = m.max(this.maxY, g)),
        a !== k &&
          f !== k &&
          ((this.minX = m.min(this.minX, a)),
          (this.maxX = m.max(this.maxX, a)),
          (this.minY = m.min(this.minY, f)),
          (this.maxY = m.max(this.maxY, f))));
  };
  p.expand3D = function (d, g, a, f, c, b) {
    this.minX = m.min(this.minX, d);
    this.maxX = m.max(this.maxX, d);
    this.minY = m.min(this.minY, g);
    this.maxY = m.max(this.maxY, g);
    this.minZ = m.min(this.minZ, a);
    this.maxZ = m.max(this.maxZ, a);
    f !== k &&
      c !== k &&
      b !== k &&
      ((this.minX = m.min(this.minX, f)),
      (this.maxX = m.max(this.maxX, f)),
      (this.minY = m.min(this.minY, c)),
      (this.maxY = m.max(this.maxY, c)),
      (this.minZ = m.min(this.minZ, b)),
      (this.maxZ = m.max(this.maxZ, b)));
  };
})(ChemDoodle.math, Math);
ChemDoodle.featureDetection = (function (e, m, k, p) {
  let d = {
    supports_canvas: function () {
      return !!m.createElement("canvas").getContext;
    },
    supports_canvas_text: function () {
      return d.supports_canvas()
        ? "function" ===
            typeof m.createElement("canvas").getContext("2d").fillText
        : !1;
    },
    supports_webgl: function () {
      let d = m.createElement("canvas");
      try {
        if (d.getContext("webgl") || d.getContext("experimental-webgl"))
          return !0;
      } catch (a) {}
      return !1;
    },
    supports_xhr2: function () {
      return "withCredentials" in new XMLHttpRequest();
    },
    supports_touch: function () {
      let d =
        (/iPhone|iPad|iPod|Android|BlackBerry|BB10/i.test(
          navigator.userAgent
        ) ||
          ("MacIntel" === navigator.platform &&
            1 < navigator.maxTouchPoints)) &&
        !k.MSStream;
      return "ontouchstart" in k && d;
    },
    supports_gesture: function () {
      return "ongesturestart" in k;
    },
  };
  return d;
})(ChemDoodle.iChemLabs, document, window);
ChemDoodle.SYMBOLS =
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(
    " "
  );
ChemDoodle.ELEMENT = (function (e, m) {
  function k(e, d, g, a, f, c, b, l, h) {
    this.symbol = e;
    this.name = d;
    this.atomicNumber = g;
    this.addH = a;
    this.jmolColor = this.pymolColor = f;
    this.covalentRadius = c;
    this.vdWRadius = b;
    this.valency = l;
    this.mass = h;
  }
  e = [];
  e.H = new k("H", "Hydrogen", 1, !1, "#FFFFFF", 0.31, 1.1, 1, 1);
  e.He = new k("He", "Helium", 2, !1, "#D9FFFF", 0.28, 1.4, 0, 4);
  e.Li = new k("Li", "Lithium", 3, !1, "#CC80FF", 1.28, 1.82, 1, 7);
  e.Be = new k("Be", "Beryllium", 4, !1, "#C2FF00", 0.96, 1.53, 2, 9);
  e.B = new k("B", "Boron", 5, !0, "#FFB5B5", 0.84, 1.92, 3, 11);
  e.C = new k("C", "Carbon", 6, !0, "#909090", 0.76, 1.7, 4, 12);
  e.N = new k("N", "Nitrogen", 7, !0, "#3050F8", 0.71, 1.55, 3, 14);
  e.O = new k("O", "Oxygen", 8, !0, "#FF0D0D", 0.66, 1.52, 2, 16);
  e.F = new k("F", "Fluorine", 9, !0, "#90E050", 0.57, 1.47, 1, 19);
  e.Ne = new k("Ne", "Neon", 10, !1, "#B3E3F5", 0.58, 1.54, 0, 20);
  e.Na = new k("Na", "Sodium", 11, !1, "#AB5CF2", 1.66, 2.27, 1, 23);
  e.Mg = new k("Mg", "Magnesium", 12, !1, "#8AFF00", 1.41, 1.73, 0, 24);
  e.Al = new k("Al", "Aluminum", 13, !1, "#BFA6A6", 1.21, 1.84, 0, 27);
  e.Si = new k("Si", "Silicon", 14, !0, "#F0C8A0", 1.11, 2.1, 4, 28);
  e.P = new k("P", "Phosphorus", 15, !0, "#FF8000", 1.07, 1.8, 3, 31);
  e.S = new k("S", "Sulfur", 16, !0, "#FFFF30", 1.05, 1.8, 2, 32);
  e.Cl = new k("Cl", "Chlorine", 17, !0, "#1FF01F", 1.02, 1.75, 1, 35);
  e.Ar = new k("Ar", "Argon", 18, !1, "#80D1E3", 1.06, 1.88, 0, 40);
  e.K = new k("K", "Potassium", 19, !1, "#8F40D4", 2.03, 2.75, 0, 39);
  e.Ca = new k("Ca", "Calcium", 20, !1, "#3DFF00", 1.76, 2.31, 0, 40);
  e.Sc = new k("Sc", "Scandium", 21, !1, "#E6E6E6", 1.7, 0, 0, 45);
  e.Ti = new k("Ti", "Titanium", 22, !1, "#BFC2C7", 1.6, 0, 1, 48);
  e.V = new k("V", "Vanadium", 23, !1, "#A6A6AB", 1.53, 0, 1, 51);
  e.Cr = new k("Cr", "Chromium", 24, !1, "#8A99C7", 1.39, 0, 2, 52);
  e.Mn = new k("Mn", "Manganese", 25, !1, "#9C7AC7", 1.39, 0, 3, 55);
  e.Fe = new k("Fe", "Iron", 26, !1, "#E06633", 1.32, 0, 2, 56);
  e.Co = new k("Co", "Cobalt", 27, !1, "#F090A0", 1.26, 0, 1, 59);
  e.Ni = new k("Ni", "Nickel", 28, !1, "#50D050", 1.24, 1.63, 1, 58);
  e.Cu = new k("Cu", "Copper", 29, !1, "#C88033", 1.32, 1.4, 0, 63);
  e.Zn = new k("Zn", "Zinc", 30, !1, "#7D80B0", 1.22, 1.39, 0, 64);
  e.Ga = new k("Ga", "Gallium", 31, !1, "#C28F8F", 1.22, 1.87, 0, 69);
  e.Ge = new k("Ge", "Germanium", 32, !1, "#668F8F", 1.2, 2.11, 4, 74);
  e.As = new k("As", "Arsenic", 33, !0, "#BD80E3", 1.19, 1.85, 3, 75);
  e.Se = new k("Se", "Selenium", 34, !0, "#FFA100", 1.2, 1.9, 2, 80);
  e.Br = new k("Br", "Bromine", 35, !0, "#A62929", 1.2, 1.85, 1, 79);
  e.Kr = new k("Kr", "Krypton", 36, !1, "#5CB8D1", 1.16, 2.02, 0, 84);
  e.Rb = new k("Rb", "Rubidium", 37, !1, "#702EB0", 2.2, 3.03, 0, 85);
  e.Sr = new k("Sr", "Strontium", 38, !1, "#00FF00", 1.95, 2.49, 0, 88);
  e.Y = new k("Y", "Yttrium", 39, !1, "#94FFFF", 1.9, 0, 0, 89);
  e.Zr = new k("Zr", "Zirconium", 40, !1, "#94E0E0", 1.75, 0, 0, 90);
  e.Nb = new k("Nb", "Niobium", 41, !1, "#73C2C9", 1.64, 0, 1, 93);
  e.Mo = new k("Mo", "Molybdenum", 42, !1, "#54B5B5", 1.54, 0, 2, 98);
  e.Tc = new k("Tc", "Technetium", 43, !1, "#3B9E9E", 1.47, 0, 3, 0);
  e.Ru = new k("Ru", "Ruthenium", 44, !1, "#248F8F", 1.46, 0, 2, 102);
  e.Rh = new k("Rh", "Rhodium", 45, !1, "#0A7D8C", 1.42, 0, 1, 103);
  e.Pd = new k("Pd", "Palladium", 46, !1, "#006985", 1.39, 1.63, 0, 106);
  e.Ag = new k("Ag", "Silver", 47, !1, "#C0C0C0", 1.45, 1.72, 0, 107);
  e.Cd = new k("Cd", "Cadmium", 48, !1, "#FFD98F", 1.44, 1.58, 0, 114);
  e.In = new k("In", "Indium", 49, !1, "#A67573", 1.42, 1.93, 0, 115);
  e.Sn = new k("Sn", "Tin", 50, !1, "#668080", 1.39, 2.17, 4, 120);
  e.Sb = new k("Sb", "Antimony", 51, !1, "#9E63B5", 1.39, 2.06, 3, 121);
  e.Te = new k("Te", "Tellurium", 52, !0, "#D47A00", 1.38, 2.06, 2, 130);
  e.I = new k("I", "Iodine", 53, !0, "#940094", 1.39, 1.98, 1, 127);
  e.Xe = new k("Xe", "Xenon", 54, !1, "#429EB0", 1.4, 2.16, 0, 132);
  e.Cs = new k("Cs", "Cesium", 55, !1, "#57178F", 2.44, 3.43, 0, 133);
  e.Ba = new k("Ba", "Barium", 56, !1, "#00C900", 2.15, 2.68, 0, 138);
  e.La = new k("La", "Lanthanum", 57, !1, "#70D4FF", 2.07, 0, 0, 139);
  e.Ce = new k("Ce", "Cerium", 58, !1, "#FFFFC7", 2.04, 0, 0, 140);
  e.Pr = new k("Pr", "Praseodymium", 59, !1, "#D9FFC7", 2.03, 0, 0, 141);
  e.Nd = new k("Nd", "Neodymium", 60, !1, "#C7FFC7", 2.01, 0, 0, 142);
  e.Pm = new k("Pm", "Promethium", 61, !1, "#A3FFC7", 1.99, 0, 0, 0);
  e.Sm = new k("Sm", "Samarium", 62, !1, "#8FFFC7", 1.98, 0, 0, 152);
  e.Eu = new k("Eu", "Europium", 63, !1, "#61FFC7", 1.98, 0, 0, 153);
  e.Gd = new k("Gd", "Gadolinium", 64, !1, "#45FFC7", 1.96, 0, 0, 158);
  e.Tb = new k("Tb", "Terbium", 65, !1, "#30FFC7", 1.94, 0, 0, 159);
  e.Dy = new k("Dy", "Dysprosium", 66, !1, "#1FFFC7", 1.92, 0, 0, 164);
  e.Ho = new k("Ho", "Holmium", 67, !1, "#00FF9C", 1.92, 0, 0, 165);
  e.Er = new k("Er", "Erbium", 68, !1, "#00E675", 1.89, 0, 0, 166);
  e.Tm = new k("Tm", "Thulium", 69, !1, "#00D452", 1.9, 0, 0, 169);
  e.Yb = new k("Yb", "Ytterbium", 70, !1, "#00BF38", 1.87, 0, 0, 174);
  e.Lu = new k("Lu", "Lutetium", 71, !1, "#00AB24", 1.87, 0, 0, 175);
  e.Hf = new k("Hf", "Hafnium", 72, !1, "#4DC2FF", 1.75, 0, 0, 180);
  e.Ta = new k("Ta", "Tantalum", 73, !1, "#4DA6FF", 1.7, 0, 1, 181);
  e.W = new k("W", "Tungsten", 74, !1, "#2194D6", 1.62, 0, 2, 184);
  e.Re = new k("Re", "Rhenium", 75, !1, "#267DAB", 1.51, 0, 3, 187);
  e.Os = new k("Os", "Osmium", 76, !1, "#266696", 1.44, 0, 2, 192);
  e.Ir = new k("Ir", "Iridium", 77, !1, "#175487", 1.41, 0, 3, 193);
  e.Pt = new k("Pt", "Platinum", 78, !1, "#D0D0E0", 1.36, 1.75, 0, 195);
  e.Au = new k("Au", "Gold", 79, !1, "#FFD123", 1.36, 1.66, 1, 197);
  e.Hg = new k("Hg", "Mercury", 80, !1, "#B8B8D0", 1.32, 1.55, 0, 202);
  e.Tl = new k("Tl", "Thallium", 81, !1, "#A6544D", 1.45, 1.96, 0, 205);
  e.Pb = new k("Pb", "Lead", 82, !1, "#575961", 1.46, 2.02, 4, 208);
  e.Bi = new k("Bi", "Bismuth", 83, !1, "#9E4FB5", 1.48, 2.07, 3, 209);
  e.Po = new k("Po", "Polonium", 84, !1, "#AB5C00", 1.4, 1.97, 2, 0);
  e.At = new k("At", "Astatine", 85, !0, "#754F45", 1.5, 2.02, 1, 0);
  e.Rn = new k("Rn", "Radon", 86, !1, "#428296", 1.5, 2.2, 0, 0);
  e.Fr = new k("Fr", "Francium", 87, !1, "#420066", 2.6, 3.48, 0, 0);
  e.Ra = new k("Ra", "Radium", 88, !1, "#007D00", 2.21, 2.83, 0, 0);
  e.Ac = new k("Ac", "Actinium", 89, !1, "#70ABFA", 2.15, 0, 0, 0);
  e.Th = new k("Th", "Thorium", 90, !1, "#00BAFF", 2.06, 0, 0, 232);
  e.Pa = new k("Pa", "Protactinium", 91, !1, "#00A1FF", 2, 0, 0, 231);
  e.U = new k("U", "Uranium", 92, !1, "#008FFF", 1.96, 1.86, 0, 238);
  e.Np = new k("Np", "Neptunium", 93, !1, "#0080FF", 1.9, 0, 0, 0);
  e.Pu = new k("Pu", "Plutonium", 94, !1, "#006BFF", 1.87, 0, 0, 0);
  e.Am = new k("Am", "Americium", 95, !1, "#545CF2", 1.8, 0, 0, 0);
  e.Cm = new k("Cm", "Curium", 96, !1, "#785CE3", 1.69, 0, 0, 0);
  e.Bk = new k("Bk", "Berkelium", 97, !1, "#8A4FE3", 0, 0, 0, 0);
  e.Cf = new k("Cf", "Californium", 98, !1, "#A136D4", 0, 0, 0, 0);
  e.Es = new k("Es", "Einsteinium", 99, !1, "#B31FD4", 0, 0, 0, 0);
  e.Fm = new k("Fm", "Fermium", 100, !1, "#B31FBA", 0, 0, 0, 0);
  e.Md = new k("Md", "Mendelevium", 101, !1, "#B30DA6", 0, 0, 0, 0);
  e.No = new k("No", "Nobelium", 102, !1, "#BD0D87", 0, 0, 0, 0);
  e.Lr = new k("Lr", "Lawrencium", 103, !1, "#C70066", 0, 0, 0, 0);
  e.Rf = new k("Rf", "Rutherfordium", 104, !1, "#CC0059", 0, 0, 0, 0);
  e.Db = new k("Db", "Dubnium", 105, !1, "#D1004F", 0, 0, 0, 0);
  e.Sg = new k("Sg", "Seaborgium", 106, !1, "#D90045", 0, 0, 0, 0);
  e.Bh = new k("Bh", "Bohrium", 107, !1, "#E00038", 0, 0, 0, 0);
  e.Hs = new k("Hs", "Hassium", 108, !1, "#E6002E", 0, 0, 0, 0);
  e.Mt = new k("Mt", "Meitnerium", 109, !1, "#EB0026", 0, 0, 0, 0);
  e.Ds = new k("Ds", "Darmstadtium", 110, !1, "#000000", 0, 0, 0, 0);
  e.Rg = new k("Rg", "Roentgenium", 111, !1, "#000000", 0, 0, 0, 0);
  e.Cn = new k("Cn", "Copernicium", 112, !1, "#000000", 0, 0, 0, 0);
  e.Nh = new k("Nh", "Nihonium", 113, !1, "#000000", 0, 0, 0, 0);
  e.Fl = new k("Fl", "Flerovium", 114, !1, "#000000", 0, 0, 0, 0);
  e.Mc = new k("Mc", "Moscovium", 115, !1, "#000000", 0, 0, 0, 0);
  e.Lv = new k("Lv", "Livermorium", 116, !1, "#000000", 0, 0, 0, 0);
  e.Ts = new k("Ts", "Tennessine", 117, !1, "#000000", 0, 0, 0, 0);
  e.Og = new k("Og", "Oganesson", 118, !1, "#000000", 0, 0, 0, 0);
  e.H.pymolColor = "#E6E6E6";
  e.C.pymolColor = "#33FF33";
  e.N.pymolColor = "#3333FF";
  e.O.pymolColor = "#FF4D4D";
  e.F.pymolColor = "#B3FFFF";
  e.S.pymolColor = "#E6C640";
  return e;
})(ChemDoodle.SYMBOLS);
ChemDoodle.RESIDUE = (function (e) {
  function m(e, p, d, g, a, f) {
    this.symbol = e;
    this.name = p;
    this.polar = d;
    this.aminoColor = g;
    this.shapelyColor = a;
    this.acidity = f;
  }
  e = [];
  e.Ala = new m("Ala", "Alanine", !1, "#C8C8C8", "#8CFF8C", 0);
  e.Arg = new m("Arg", "Arginine", !0, "#145AFF", "#00007C", 1);
  e.Asn = new m("Asn", "Asparagine", !0, "#00DCDC", "#FF7C70", 0);
  e.Asp = new m("Asp", "Aspartic Acid", !0, "#E60A0A", "#A00042", -1);
  e.Cys = new m("Cys", "Cysteine", !0, "#E6E600", "#FFFF70", 0);
  e.Gln = new m("Gln", "Glutamine", !0, "#00DCDC", "#FF4C4C", 0);
  e.Glu = new m("Glu", "Glutamic Acid", !0, "#E60A0A", "#660000", -1);
  e.Gly = new m("Gly", "Glycine", !1, "#EBEBEB", "#FFFFFF", 0);
  e.His = new m("His", "Histidine", !0, "#8282D2", "#7070FF", 1);
  e.Ile = new m("Ile", "Isoleucine", !1, "#0F820F", "#004C00", 0);
  e.Leu = new m("Leu", "Leucine", !1, "#0F820F", "#455E45", 0);
  e.Lys = new m("Lys", "Lysine", !0, "#145AFF", "#4747B8", 1);
  e.Met = new m("Met", "Methionine", !1, "#E6E600", "#B8A042", 0);
  e.Phe = new m("Phe", "Phenylalanine", !1, "#3232AA", "#534C52", 0);
  e.Pro = new m("Pro", "Proline", !1, "#DC9682", "#525252", 0);
  e.Ser = new m("Ser", "Serine", !0, "#FA9600", "#FF7042", 0);
  e.Thr = new m("Thr", "Threonine", !0, "#FA9600", "#B84C00", 0);
  e.Trp = new m("Trp", "Tryptophan", !0, "#B45AB4", "#4F4600", 0);
  e.Tyr = new m("Tyr", "Tyrosine", !0, "#3232AA", "#8C704C", 0);
  e.Val = new m("Val", "Valine", !1, "#0F820F", "#FF8CFF", 0);
  e.Asx = new m("Asx", "Asparagine/Aspartic Acid", !0, "#FF69B4", "#FF00FF", 0);
  e.Glx = new m("Glx", "Glutamine/Glutamic Acid", !0, "#FF69B4", "#FF00FF", 0);
  e["*"] = new m("*", "Other", !1, "#BEA06E", "#FF00FF", 0);
  e.A = new m("A", "Adenine", !1, "#BEA06E", "#A0A0FF", 0);
  e.G = new m("G", "Guanine", !1, "#BEA06E", "#FF7070", 0);
  e.I = new m("I", "", !1, "#BEA06E", "#80FFFF", 0);
  e.C = new m("C", "Cytosine", !1, "#BEA06E", "#FF8C4B", 0);
  e.T = new m("T", "Thymine", !1, "#BEA06E", "#A0FFA0", 0);
  e.U = new m("U", "Uracil", !1, "#BEA06E", "#FF8080", 0);
  return e;
})();
(function (e, m) {
  e.Queue = function () {
    this.queue = [];
  };
  e = e.Queue.prototype;
  e.queueSpace = 0;
  e.getSize = function () {
    return this.queue.length - this.queueSpace;
  };
  e.isEmpty = function () {
    return 0 === this.queue.length;
  };
  e.enqueue = function (e) {
    this.queue.push(e);
  };
  e.dequeue = function () {
    let e;
    this.queue.length &&
      ((e = this.queue[this.queueSpace]),
      2 * ++this.queueSpace >= this.queue.length &&
        ((this.queue = this.queue.slice(this.queueSpace)),
        (this.queueSpace = 0)));
    return e;
  };
  e.getOldestElement = function () {
    let e;
    this.queue.length && (e = this.queue[this.queueSpace]);
    return e;
  };
})(ChemDoodle.structures);
(function (e, m, k) {
  e.Point = function (e, d) {
    this.x = e ? e : 0;
    this.y = d ? d : 0;
  };
  e = e.Point.prototype;
  e.sub = function (e) {
    this.x -= e.x;
    this.y -= e.y;
  };
  e.add = function (e) {
    this.x += e.x;
    this.y += e.y;
  };
  e.distance = function (e) {
    let d = e.x - this.x;
    e = e.y - this.y;
    return m.sqrt(d * d + e * e);
  };
  e.angleForStupidCanvasArcs = function (e) {
    var d = e.x - this.x;
    e = e.y - this.y;
    for (
      d =
        0 === d
          ? 0 === e
            ? 0
            : 0 < e
            ? m.PI / 2
            : (3 * m.PI) / 2
          : 0 === e
          ? 0 < d
            ? 0
            : m.PI
          : 0 > d
          ? m.atan(e / d) + m.PI
          : 0 > e
          ? m.atan(e / d) + 2 * m.PI
          : m.atan(e / d);
      0 > d;

    )
      d += 2 * m.PI;
    return (d %= 2 * m.PI);
  };
  e.angle = function (e) {
    var d = e.x - this.x;
    e = this.y - e.y;
    for (
      d =
        0 === d
          ? 0 === e
            ? 0
            : 0 < e
            ? m.PI / 2
            : (3 * m.PI) / 2
          : 0 === e
          ? 0 < d
            ? 0
            : m.PI
          : 0 > d
          ? m.atan(e / d) + m.PI
          : 0 > e
          ? m.atan(e / d) + 2 * m.PI
          : m.atan(e / d);
      0 > d;

    )
      d += 2 * m.PI;
    return (d %= 2 * m.PI);
  };
})(ChemDoodle.structures, Math);
(function (e, m, k, p) {
  let d = /[ ,]+/,
    g = /\-+/,
    a = ["Helvetica", "Arial", "Dialog"];
  m.Query = function (a) {
    this.type = a;
    this.elements = { v: [], not: !1 };
    this.saturation =
      this.hydrogens =
      this.connectivityNoH =
      this.connectivity =
      this.chirality =
      this.charge =
        p;
    this.orders = { v: [], not: !1 };
    this.cache = this.ringCount = this.aromatic = this.stereo = p;
  };
  m.Query.TYPE_ATOM = 0;
  m.Query.TYPE_BOND = 1;
  k = m.Query.prototype;
  k.parseRange = function (a) {
    let c = [];
    a = a.split(d);
    for (let l = 0, d = a.length; l < d; l++) {
      var b = a[l],
        f = !1,
        h = !1;
      "-" === b.charAt(0) && ((f = !0), (b = b.substring(1)));
      -1 != b.indexOf("--") && (h = !0);
      -1 != b.indexOf("-")
        ? ((b = b.split(g)),
          (f = {
            x: parseInt(b[0]) * (f ? -1 : 1),
            y: parseInt(b[1]) * (h ? -1 : 1),
          }),
          f.y < f.x && ((h = f.y), (f.y = f.x), (f.x = h)),
          c.push(f))
        : c.push({ x: parseInt(b) * (f ? -1 : 1) });
    }
    return c;
  };
  k.draw = function (f, c, b) {
    this.cache || (this.cache = this.toString());
    let l = this.cache,
      d = p;
    var r = l.indexOf("(");
    -1 != r &&
      ((l = this.cache.substring(0, r)),
      (d = this.cache.substring(r, this.cache.length)));
    f.textAlign = "center";
    f.textBaseline = "middle";
    f.font = e.getFontString(12, a, !0, !1);
    r = f.measureText(l).width;
    f.fillStyle = c.backgroundColor;
    f.fillRect(b.x - r / 2, b.y - 6, r, 12);
    f.fillStyle = "black";
    f.fillText(l, b.x, b.y);
    d &&
      ((f.font = e.getFontString(10, a, !1, !0)),
      (r = f.measureText(d).width),
      (f.fillStyle = c.backgroundColor),
      f.fillRect(b.x - r / 2, b.y + 6, r, 11),
      (f.fillStyle = "black"),
      f.fillText(d, b.x, b.y + 11));
  };
  k.outputRange = function (a) {
    let c = !1,
      b = [];
    for (let f = 0, d = a.length; f < d; f++) {
      c && b.push(",");
      c = !0;
      let l = a[f];
      l.y ? (b.push(l.x), b.push("-"), b.push(l.y)) : b.push(l.x);
    }
    return b.join("");
  };
  k.toString = function () {
    let a = [],
      c = [];
    this.type === m.Query.TYPE_ATOM
      ? (this.elements && 0 !== this.elements.v.length
          ? (this.elements.not && a.push("!"),
            a.push("["),
            a.push(this.elements.v.join(",")),
            a.push("]"))
          : a.push("[a]"),
        this.chirality &&
          c.push((this.chirality.not ? "!" : "") + "@\x3d" + this.chirality.v),
        this.aromatic && c.push((this.aromatic.not ? "!" : "") + "A"),
        this.charge &&
          c.push(
            (this.charge.not ? "!" : "") +
              "C\x3d" +
              this.outputRange(this.charge.v)
          ),
        this.hydrogens &&
          c.push(
            (this.hydrogens.not ? "!" : "") +
              "H\x3d" +
              this.outputRange(this.hydrogens.v)
          ),
        this.ringCount &&
          c.push(
            (this.ringCount.not ? "!" : "") +
              "R\x3d" +
              this.outputRange(this.ringCount.v)
          ),
        this.saturation && c.push((this.saturation.not ? "!" : "") + "S"),
        this.connectivity &&
          c.push(
            (this.connectivity.not ? "!" : "") +
              "X\x3d" +
              this.outputRange(this.connectivity.v)
          ),
        this.connectivityNoH &&
          c.push(
            (this.connectivityNoH.not ? "!" : "") +
              "x\x3d" +
              this.outputRange(this.connectivityNoH.v)
          ))
      : this.type === m.Query.TYPE_BOND &&
        (this.orders && 0 !== this.orders.v.length
          ? (this.orders.not && a.push("!"),
            a.push("["),
            a.push(this.orders.v.join(",")),
            a.push("]"))
          : a.push("[a]"),
        this.stereo &&
          c.push((this.stereo.not ? "!" : "") + "@\x3d" + this.stereo.v),
        this.aromatic && c.push((this.aromatic.not ? "!" : "") + "A"),
        this.ringCount &&
          c.push(
            (this.ringCount.not ? "!" : "") +
              "R\x3d" +
              this.outputRange(this.ringCount.v)
          ));
    0 < c.length && (a.push("("), a.push(c.join(",")), a.push(")"));
    return a.join("");
  };
})(ChemDoodle.extensions, ChemDoodle.structures, Math);
(function (e, m, k, p, d, g, a) {
  let f = /\s+/g;
  p.Atom = function (b, a, c, f) {
    this.label = b ? b.trim() : "C";
    this.x = a ? a : 0;
    this.y = c ? c : 0;
    this.z = f ? f : 0;
    this.enhancedStereo = { type: p.Atom.ESTEREO_ABSOLUTE, group: 1 };
    this.pid = p.PID++;
  };
  p.Atom.ESTEREO_ABSOLUTE = "abs";
  p.Atom.ESTEREO_OR = "or";
  p.Atom.ESTEREO_AND = "\x26";
  let c = (p.Atom.prototype = new p.Point(0, 0));
  c.charge = 0;
  c.numLonePair = 0;
  c.numRadical = 0;
  c.mass = -1;
  c.implicitH = -1;
  c.coordinationNumber = 0;
  c.bondNumber = 0;
  c.angleOfLeastInterference = 0;
  c.isHidden = !1;
  c.altLabel = a;
  c.isLone = !1;
  c.isHover = !1;
  c.isSelected = !1;
  c.add3D = function (b) {
    this.x += b.x;
    this.y += b.y;
    this.z += b.z;
  };
  c.sub3D = function (b) {
    this.x -= b.x;
    this.y -= b.y;
    this.z -= b.z;
  };
  c.distance3D = function (b) {
    let a = b.x - this.x,
      c = b.y - this.y;
    b = b.z - this.z;
    return d.sqrt(a * a + c * c + b * b);
  };
  c.draw = function (b, c) {
    if (!this.dontDraw) {
      if (this.isLassoed) {
        var l = b.createRadialGradient(
          this.x - 1,
          this.y - 1,
          0,
          this.x,
          this.y,
          7
        );
        l.addColorStop(0, "rgba(212, 99, 0, 0)");
        l.addColorStop(0.7, "rgba(212, 99, 0, 0.8)");
        b.fillStyle = l;
        b.beginPath();
        b.arc(this.x, this.y, 5, 0, 2 * d.PI, !1);
        b.fill();
      }
      if (!this.query) {
        this.textBounds = [];
        this.styles && (c = this.styles);
        var r = m.getFontString(
          c.atoms_font_size_2D,
          c.atoms_font_families_2D,
          c.atoms_font_bold_2D,
          c.atoms_font_italic_2D
        );
        b.font = r;
        b.fillStyle = this.getElementColor(
          c.atoms_useJMOLColors,
          c.atoms_usePYMOLColors,
          c.atoms_color,
          2
        );
        "H" === this.label && c.atoms_HBlack_2D && (b.fillStyle = "black");
        this.error && (b.fillStyle = c.colorError);
        l = this.isLabelVisible(c);
        if ((this.isLone && !l) || c.atoms_circles_2D)
          this.isLone && (b.fillStyle = "#909090"),
            b.beginPath(),
            b.arc(
              this.x,
              this.y,
              c.atoms_circleDiameter_2D / 2,
              0,
              2 * d.PI,
              !1
            ),
            b.fill(),
            0 < c.atoms_circleBorderWidth_2D &&
              ((b.lineWidth = c.atoms_circleBorderWidth_2D),
              (b.strokeStyle = "black"),
              b.stroke());
        else if (l)
          if (
            ((b.textAlign = "center"),
            (b.textBaseline = "middle"),
            this.altLabel !== a)
          ) {
            b.fillText(this.altLabel, this.x, this.y);
            var g = b.measureText(this.altLabel).width;
            this.textBounds.push({
              x: this.x - g / 2,
              y: this.y - c.atoms_font_size_2D / 2 + 1,
              w: g,
              h: c.atoms_font_size_2D - 2,
            });
          } else if (e[this.label]) {
            b.fillText(this.label, this.x, this.y);
            var n = b.measureText(this.label).width;
            this.textBounds.push({
              x: this.x - n / 2,
              y: this.y - c.atoms_font_size_2D / 2 + 1,
              w: n,
              h: c.atoms_font_size_2D - 2,
            });
            var u = 0;
            -1 !== this.mass &&
              ((g = b.font),
              (b.font = m.getFontString(
                0.7 * c.atoms_font_size_2D,
                c.atoms_font_families_2D,
                c.atoms_font_bold_2D,
                c.atoms_font_italic_2D
              )),
              (u = b.measureText(this.mass).width),
              (b.textAlign = "right"),
              b.fillText(
                this.mass,
                this.x - n / 2 - 1,
                this.y - c.atoms_font_size_2D / 2 + 1
              ),
              this.textBounds.push({
                x: this.x - n / 2 - u - 0.5,
                y: this.y - (1.7 * c.atoms_font_size_2D) / 2 + 1,
                w: u,
                h: c.atoms_font_size_2D / 2 - 1,
              }),
              (b.font = g),
              (b.textAlign = "center"));
            g = n / 2;
            var w = this.getImplicitHydrogenCount();
            if (c.atoms_implicitHydrogens_2D && 0 < w) {
              var y = 0;
              var x = b.measureText("H").width;
              let a = !0;
              if (1 < w) {
                let f = n / 2 + x / 2,
                  l = 0,
                  h = m.getFontString(
                    0.8 * c.atoms_font_size_2D,
                    c.atoms_font_families_2D,
                    c.atoms_font_bold_2D,
                    c.atoms_font_italic_2D
                  );
                b.font = h;
                let g = b.measureText(w).width;
                1 === this.bondNumber
                  ? this.angleOfLeastInterference > d.PI / 2 &&
                    this.angleOfLeastInterference < (3 * d.PI) / 2 &&
                    ((f = -n / 2 - g - x / 2 - u / 2), (a = !1), (y = d.PI))
                  : this.angleOfLeastInterference <= d.PI / 4 ||
                    (this.angleOfLeastInterference < (3 * d.PI) / 4
                      ? ((f = 0),
                        (l = 0.9 * -c.atoms_font_size_2D),
                        0 !== this.charge && (l -= 0.3 * c.atoms_font_size_2D),
                        (a = !1),
                        (y = d.PI / 2))
                      : this.angleOfLeastInterference <= (5 * d.PI) / 4
                      ? ((f = -n / 2 - g - x / 2 - u / 2), (a = !1), (y = d.PI))
                      : this.angleOfLeastInterference < (7 * d.PI) / 4 &&
                        ((f = 0),
                        (l = 0.9 * c.atoms_font_size_2D),
                        (a = !1),
                        (y = (3 * d.PI) / 2)));
                b.font = r;
                b.fillText("H", this.x + f, this.y + l);
                b.font = h;
                b.fillText(
                  w,
                  this.x + f + x / 2 + g / 2,
                  this.y + l + 0.3 * c.atoms_font_size_2D
                );
                this.textBounds.push({
                  x: this.x + f - x / 2,
                  y: this.y + l - c.atoms_font_size_2D / 2 + 1,
                  w: x,
                  h: c.atoms_font_size_2D - 2,
                });
                this.textBounds.push({
                  x: this.x + f + x / 2,
                  y:
                    this.y +
                    l +
                    0.3 * c.atoms_font_size_2D -
                    c.atoms_font_size_2D / 2 +
                    1,
                  w: g,
                  h: 0.8 * c.atoms_font_size_2D - 2,
                });
              } else
                (r = n / 2 + x / 2),
                  (w = 0),
                  1 === this.bondNumber
                    ? this.angleOfLeastInterference > d.PI / 2 &&
                      this.angleOfLeastInterference < (3 * d.PI) / 2 &&
                      ((r = -n / 2 - x / 2 - u / 2), (a = !1), (y = d.PI))
                    : this.angleOfLeastInterference <= d.PI / 4 ||
                      (this.angleOfLeastInterference < (3 * d.PI) / 4
                        ? ((r = 0),
                          (w = 0.9 * -c.atoms_font_size_2D),
                          (a = !1),
                          (y = d.PI / 2))
                        : this.angleOfLeastInterference <= (5 * d.PI) / 4
                        ? ((r = -n / 2 - x / 2 - u / 2), (a = !1), (y = d.PI))
                        : this.angleOfLeastInterference < (7 * d.PI) / 4 &&
                          ((r = 0),
                          (w = 0.9 * c.atoms_font_size_2D),
                          (a = !1),
                          (y = (3 * d.PI) / 2))),
                  b.fillText("H", this.x + r, this.y + w),
                  this.textBounds.push({
                    x: this.x + r - x / 2,
                    y: this.y + w - c.atoms_font_size_2D / 2 + 1,
                    w: x,
                    h: c.atoms_font_size_2D - 2,
                  });
              a && (g += x);
            }
            0 !== this.charge &&
              ((n = this.charge.toFixed(0)),
              (n =
                "1" === n
                  ? "+"
                  : "-1" === n
                  ? "\u2013"
                  : n.startsWith("-")
                  ? n.substring(1) + "\u2013"
                  : n + "+"),
              (u = b.measureText(n).width),
              (g += u / 2),
              (b.textAlign = "center"),
              (b.textBaseline = "middle"),
              (b.font = m.getFontString(
                d.floor(0.8 * c.atoms_font_size_2D),
                c.atoms_font_families_2D,
                c.atoms_font_bold_2D,
                c.atoms_font_italic_2D
              )),
              b.fillText(
                n,
                this.x + g - 1,
                this.y - c.atoms_font_size_2D / 2 + 1
              ),
              this.textBounds.push({
                x: this.x + g - u / 2 - 1,
                y: this.y - (1.8 * c.atoms_font_size_2D) / 2 + 5,
                w: u,
                h: c.atoms_font_size_2D / 2 - 1,
              }));
          } else
            p.CondensedLabel
              ? this.label.match(f)
                ? ((b.textAlign = "left"),
                  this.error && (b.fillStyle = c.colorError),
                  b.fillText(this.label, this.x, this.y),
                  (g = b.measureText(this.label).width),
                  this.textBounds.push({
                    x: this.x + 1,
                    y: this.y - c.atoms_font_size_2D / 2 + 1,
                    w: g,
                    h: c.atoms_font_size_2D - 2,
                  }))
                : ((this.condensed && this.condensed.text === this.label) ||
                    (this.condensed = new p.CondensedLabel(this, this.label)),
                  this.condensed.draw(b, c))
              : (b.fillText(this.label, this.x, this.y),
                (g = b.measureText(this.label).width),
                this.textBounds.push({
                  x: this.x - g / 2,
                  y: this.y - c.atoms_font_size_2D / 2 + 1,
                  w: g,
                  h: c.atoms_font_size_2D - 2,
                }));
        g = [];
        for (n = 0; n < this.numLonePair; n++) g.push({ t: 2 });
        for (n = 0; n < this.numRadical; n++) g.push({ t: 1 });
        this.enhancedStereo.type !== p.Atom.ESTEREO_ABSOLUTE &&
          g.push(this.enhancedStereo);
        if (0 < g.length)
          if (
            ((b.fillStyle = "black"),
            (b.font = m.getFontString(
              0.8 * c.atoms_font_size_2D,
              c.atoms_font_families_2D,
              c.atoms_font_bold_2D,
              c.atoms_font_italic_2D
            )),
            (b.textAlign = "center"),
            (b.textBaseline = "middle"),
            (u = this.angles.slice(0)),
            (n = this.angleOfLeastInterference),
            (x = this.largestAngle),
            y !== a &&
              (u.push(y),
              u.sort(function (b, a) {
                return b - a;
              }),
              (x = k.angleBetweenLargest(u)),
              (n = x.angle % (2 * d.PI)),
              (x = x.largest)),
            y === a && d.abs(x - (2 * d.PI) / u.length) < d.PI / 60)
          ) {
            u = d.ceil(g.length / u.length);
            for (let a = 0, f = g.length; a < f; a += u, n += x)
              this.drawAttribute(
                b,
                c,
                g.slice(a, d.min(g.length, a + u)),
                n,
                x,
                y,
                l
              );
          } else this.drawAttribute(b, c, g, n, x, y, l);
      }
    }
  };
  c.drawAttribute = function (b, c, f, r, g, e, u) {
    e = g / (f.length + (0 === this.bonds.length && e === a ? 0 : 1));
    r = r - g / 2 + e;
    for (g = 0; g < f.length; g++) {
      var l = f[g],
        h = r + g * e,
        n = c.atoms_lonePairDistance_2D;
      u && l.type !== a && (n += 4);
      let v = this.x + Math.cos(h) * n;
      n = this.y - Math.sin(h) * n;
      l.type !== a
        ? b.fillText(l.type + l.group, v, n)
        : 2 === l.t
        ? ((h += Math.PI / 2),
          (l = (Math.cos(h) * c.atoms_lonePairSpread_2D) / 2),
          (h = (-Math.sin(h) * c.atoms_lonePairSpread_2D) / 2),
          b.beginPath(),
          b.arc(v + l, n + h, c.atoms_lonePairDiameter_2D, 0, 2 * d.PI, !1),
          b.fill(),
          b.beginPath(),
          b.arc(v - l, n - h, c.atoms_lonePairDiameter_2D, 0, 2 * d.PI, !1),
          b.fill())
        : 1 === l.t &&
          (b.beginPath(),
          b.arc(v, n, c.atoms_lonePairDiameter_2D, 0, 2 * d.PI, !1),
          b.fill());
    }
  };
  c.drawDecorations = function (b, a) {
    if (this.isHover || this.isSelected)
      (b.strokeStyle = this.isHover ? a.colorHover : a.colorSelect),
        (b.lineWidth = 1.2),
        b.beginPath(),
        b.arc(this.x, this.y, this.isHover ? 7 : 15, 0, 2 * d.PI, !1),
        b.stroke();
    this.isOverlap &&
      ((b.strokeStyle = a.colorError),
      (b.lineWidth = 1.2),
      b.beginPath(),
      b.arc(this.x, this.y, 7, 0, 2 * d.PI, !1),
      b.stroke());
  };
  c.render = function (b, a, c) {
    this.styles && (a = this.styles);
    let f = g.translate(g.identity(), [this.x, this.y, this.z]),
      l = a.atoms_useVDWDiameters_3D
        ? e[this.label].vdWRadius * a.atoms_vdwMultiplier_3D
        : a.atoms_sphereDiameter_3D / 2;
    0 === l && (l = 1);
    g.scale(f, [l, l, l]);
    c ||
      ((c = a.atoms_color),
      a.atoms_useJMOLColors
        ? (c = e[this.label].jmolColor)
        : a.atoms_usePYMOLColors && (c = e[this.label].pymolColor),
      b.material.setDiffuseColor(b, c));
    b.shader.setMatrixUniforms(b, f);
    b.drawElements(
      b.TRIANGLES,
      (this.renderAsStar ? b.starBuffer : b.sphereBuffer).vertexIndexBuffer
        .numItems,
      b.UNSIGNED_SHORT,
      0
    );
  };
  c.renderHighlight = function (b, a) {
    if (this.isSelected || this.isHover) {
      this.styles && (a = this.styles);
      let c = g.translate(g.identity(), [this.x, this.y, this.z]),
        f = a.atoms_useVDWDiameters_3D
          ? e[this.label].vdWRadius * a.atoms_vdwMultiplier_3D
          : a.atoms_sphereDiameter_3D / 2;
      0 === f && (f = 1);
      f *= 1.3;
      g.scale(c, [f, f, f]);
      b.shader.setMatrixUniforms(b, c);
      b.material.setDiffuseColor(
        b,
        this.isHover ? a.colorHover : a.colorSelect
      );
      b.drawElements(
        b.TRIANGLES,
        (this.renderAsStar ? b.starBuffer : b.sphereBuffer).vertexIndexBuffer
          .numItems,
        b.UNSIGNED_SHORT,
        0
      );
    }
  };
  c.isLabelVisible = function (b) {
    return b.atoms_displayAllCarbonLabels_2D ||
      "C" !== this.label ||
      this.altLabel ||
      !e[this.label] ||
      -1 !== this.mass ||
      -1 !== this.implicitH ||
      0 !== this.charge ||
      (b.atoms_showAttributedCarbons_2D &&
        (0 !== this.numRadical || 0 !== this.numLonePair)) ||
      (this.isHidden && b.atoms_showHiddenCarbons_2D) ||
      (b.atoms_displayTerminalCarbonLabels_2D && 1 === this.bondNumber)
      ? !0
      : !1;
  };
  c.getImplicitHydrogenCount = function () {
    if (!e[this.label]) return 0;
    if (-1 !== this.implicitH) return this.implicitH;
    if (!e[this.label].addH || "H" === this.label) return 0;
    var b = e[this.label].valency;
    let a = b - this.coordinationNumber;
    0 < this.numRadical && (a = d.max(0, a - this.numRadical));
    0 < this.charge
      ? ((b = 4 - b),
        (a =
          this.charge <= b
            ? a + this.charge
            : 4 - this.coordinationNumber - this.charge + b))
      : (a += this.charge);
    return 0 > a ? 0 : d.floor(a);
  };
  c.getBounds = function () {
    let b = new k.Bounds();
    b.expand(this.x, this.y);
    if (this.textBounds)
      for (let a = 0, c = this.textBounds.length; a < c; a++) {
        let c = this.textBounds[a];
        b.expand(c.x, c.y, c.x + c.w, c.y + c.h);
      }
    return b;
  };
  c.getBounds3D = function () {
    let b = new k.Bounds();
    b.expand3D(this.x, this.y, this.z);
    return b;
  };
  c.getElementColor = function (b, a, c) {
    if (!e[this.label]) return "#000";
    b ? (c = e[this.label].jmolColor) : a && (c = e[this.label].pymolColor);
    return c;
  };
})(
  ChemDoodle.ELEMENT,
  ChemDoodle.extensions,
  ChemDoodle.math,
  ChemDoodle.structures,
  Math,
  ChemDoodle.lib.mat4
);
(function (e, m, k, p, d, g, a, f) {
  k.Bond = function (a, b, l) {
    this.a1 = a;
    this.a2 = b;
    this.bondOrder = l !== f ? l : 1;
    this.pid = k.PID++;
  };
  k.Bond.STEREO_NONE = "none";
  k.Bond.STEREO_PROTRUDING = "protruding";
  k.Bond.STEREO_RECESSED = "recessed";
  k.Bond.STEREO_AMBIGUOUS = "ambiguous";
  e = k.Bond.prototype;
  e.stereo = k.Bond.STEREO_NONE;
  e.isHover = !1;
  e.ring = f;
  e.getCenter = function () {
    return new k.Point(
      (this.a1.x + this.a2.x) / 2,
      (this.a1.y + this.a2.y) / 2
    );
  };
  e.getLength = function () {
    return this.a1.distance(this.a2);
  };
  e.getLength3D = function () {
    return this.a1.distance3D(this.a2);
  };
  e.contains = function (a) {
    return a === this.a1 || a === this.a2;
  };
  e.getNeighbor = function (a) {
    return a === this.a1 ? this.a2 : a === this.a2 ? this.a1 : f;
  };
  e.draw = function (a, b) {
    if (this.a1.x !== this.a2.x || this.a1.y !== this.a2.y) {
      this.styles && (b = this.styles);
      var c = this.a1.x,
        f = this.a2.x,
        g = this.a1.y,
        e = this.a2.y,
        n = this.a1.distance(this.a2),
        u = f - c,
        w = e - g;
      if (this.a1.isLassoed && this.a2.isLassoed) {
        let b = a.createLinearGradient(c, g, f, e);
        b.addColorStop(0, "rgba(212, 99, 0, 0)");
        b.addColorStop(0.5, "rgba(212, 99, 0, 0.8)");
        b.addColorStop(1, "rgba(212, 99, 0, 0)");
        let l = this.a1.angle(this.a2) + d.PI / 2,
          h = d.cos(l),
          r = d.sin(l),
          n = c - 2.5 * h,
          v = g + 2.5 * r,
          u = c + 2.5 * h,
          p = g - 2.5 * r,
          k = f + 2.5 * h,
          w = e - 2.5 * r,
          m = f - 2.5 * h,
          H = e + 2.5 * r;
        a.fillStyle = b;
        a.beginPath();
        a.moveTo(n, v);
        a.lineTo(u, p);
        a.lineTo(k, w);
        a.lineTo(m, H);
        a.closePath();
        a.fill();
      }
      if (
        b.atoms_display &&
        !b.atoms_circles_2D &&
        this.a1.isLabelVisible(b) &&
        this.a1.textBounds
      ) {
        let a = 0;
        for (let b = 0, c = this.a1.textBounds.length; b < c; b++)
          a = Math.max(
            a,
            p.calculateDistanceInterior(this.a1, this.a2, this.a1.textBounds[b])
          );
        a += b.bonds_atomLabelBuffer_2D;
        let f = a / n;
        c += u * f;
        g += w * f;
      }
      if (
        b.atoms_display &&
        !b.atoms_circles_2D &&
        this.a2.isLabelVisible(b) &&
        this.a2.textBounds
      ) {
        let a = 0;
        for (let b = 0, c = this.a2.textBounds.length; b < c; b++)
          a = Math.max(
            a,
            p.calculateDistanceInterior(this.a2, this.a1, this.a2.textBounds[b])
          );
        a += b.bonds_atomLabelBuffer_2D;
        let c = a / n;
        f -= u * c;
        e -= w * c;
      }
      if (b.bonds_clearOverlaps_2D) {
        let d = c + 0.15 * u,
          l = g + 0.15 * w,
          h = f - 0.15 * u,
          r = e - 0.15 * w;
        a.strokeStyle = b.backgroundColor;
        a.lineWidth = b.bonds_width_2D + 2 * b.bonds_overlapClearWidth_2D;
        a.lineCap = "round";
        a.beginPath();
        a.moveTo(d, l);
        a.lineTo(h, r);
        a.stroke();
      }
      a.strokeStyle = this.error ? b.colorError : b.bonds_color;
      a.fillStyle = this.error ? b.colorError : b.bonds_color;
      a.lineWidth = b.bonds_width_2D;
      a.lineCap = b.bonds_ends_2D;
      if (b.bonds_splitColor) {
        let d = a.createLinearGradient(c, g, f, e),
          l = this.a1.styles ? this.a1.styles : b,
          h = this.a2.styles ? this.a2.styles : b,
          r = this.a1.getElementColor(
            l.atoms_useJMOLColors,
            l.atoms_usePYMOLColors,
            l.atoms_color,
            2
          ),
          n = this.a2.getElementColor(
            h.atoms_useJMOLColors,
            h.atoms_usePYMOLColors,
            h.atoms_color,
            2
          );
        d.addColorStop(0, r);
        b.bonds_colorGradient ||
          (d.addColorStop(0.5, r), d.addColorStop(0.51, n));
        d.addColorStop(1, n);
        a.strokeStyle = d;
        a.fillStyle = d;
      }
      if (b.bonds_lewisStyle_2D && 0 === this.bondOrder % 1)
        this.drawLewisStyle(a, b, c, g, f, e);
      else
        switch (this.query ? 1 : this.bondOrder) {
          case 0:
            if (this.stereo === k.Bond.STEREO_PROTRUDING) {
              let l = b.bonds_wedgeThickness_2D / 2,
                h = this.a1.angle(this.a2),
                r = h + d.PI / 2,
                n = (2 * b.shapes_arrowLength_2D) / d.sqrt(3),
                v = d.cos(h),
                u = d.sin(h),
                p = d.cos(r),
                k = d.sin(r),
                w = f - v * n * 0.8,
                m = e + u * n * 0.8,
                F = w + p * l,
                H = m - k * l,
                L = w - p * l,
                N = m + k * l;
              a.beginPath();
              a.moveTo(f, e);
              a.lineTo(F, H);
              a.lineTo(L, N);
              a.closePath();
              a.fill();
              a.stroke();
              a.beginPath();
              a.moveTo(c, g);
              a.lineTo(w, m);
              a.stroke();
            } else {
              let l = f - c,
                h = e - g,
                r = d.sqrt(l * l + h * h),
                n = d.floor(r / b.bonds_dotSize_2D),
                v = (r - (n - 1) * b.bonds_dotSize_2D) / 2;
              1 === n % 2
                ? (v += b.bonds_dotSize_2D / 4)
                : ((v -= b.bonds_dotSize_2D / 4), (n += 2));
              n /= 2;
              let u = this.a1.angle(this.a2),
                p = c + v * Math.cos(u),
                k = g - v * Math.sin(u);
              a.beginPath();
              for (let c = 0; c < n; c++)
                a.arc(p, k, b.bonds_dotSize_2D / 2, 0, 2 * d.PI, !1),
                  (p += 2 * b.bonds_dotSize_2D * Math.cos(u)),
                  (k -= 2 * b.bonds_dotSize_2D * Math.sin(u));
              a.fill();
              break;
            }
          case 0.5:
            a.beginPath();
            a.moveTo(c, g);
            a.lineTo(f, e);
            a.setLineDash([b.bonds_hashSpacing_2D, b.bonds_hashSpacing_2D]);
            a.stroke();
            a.setLineDash([]);
            break;
          case 1:
            if (
              this.query ||
              (this.stereo !== k.Bond.STEREO_PROTRUDING &&
                this.stereo !== k.Bond.STEREO_RECESSED)
            )
              if (this.query || this.stereo !== k.Bond.STEREO_AMBIGUOUS)
                a.beginPath(),
                  a.moveTo(c, g),
                  a.lineTo(f, e),
                  a.stroke(),
                  this.query && this.query.draw(a, b, this.getCenter());
              else {
                let l = f - c,
                  h = e - g;
                a.beginPath();
                a.moveTo(c, g);
                let r = d.floor(d.sqrt(l * l + h * h) / b.bonds_wavyLength_2D),
                  n = c,
                  v = g,
                  u = this.a1.angle(this.a2) + d.PI / 2,
                  p = d.cos(u),
                  k = d.sin(u),
                  w = l / r,
                  m = h / r,
                  F,
                  H;
                for (let c = 0; c < r; c++) {
                  n += w;
                  v += m;
                  let f = 0 === c % 2 ? 1 : -1;
                  F = b.bonds_wavyLength_2D * p * f + n - 0.5 * w;
                  H = b.bonds_wavyLength_2D * -k * f + v - 0.5 * m;
                  a.quadraticCurveTo(F, H, n, v);
                }
                a.stroke();
              }
            else {
              let l = b.bonds_width_2D / 2,
                h = b.bonds_wedgeThickness_2D / 2,
                r = this.a1.angle(this.a2) + d.PI / 2,
                n = d.cos(r),
                v = d.sin(r),
                u = c - n * l,
                p = g + v * l,
                w = c + n * l,
                m = g - v * l,
                G = f + n * h,
                F = e - v * h,
                H = f - n * h,
                L = e + v * h;
              a.save();
              a.beginPath();
              a.moveTo(u, p);
              a.lineTo(w, m);
              a.lineTo(G, F);
              a.lineTo(H, L);
              a.closePath();
              this.stereo === k.Bond.STEREO_PROTRUDING
                ? a.fill()
                : (a.clip(),
                  (a.lineWidth = 2 * h),
                  (a.lineCap = "butt"),
                  a.beginPath(),
                  a.moveTo(c, g),
                  a.lineTo(f + 5 * (f - c), e + 5 * (e - g)),
                  a.setLineDash([b.bonds_hashWidth_2D, b.bonds_hashSpacing_2D]),
                  a.stroke());
              a.restore();
            }
            break;
          case 1.5:
          case 2: {
            let l = this.a1.angle(this.a2),
              h = l + d.PI / 2,
              r = d.cos(h),
              n = d.sin(h),
              v = this.a1.distance(this.a2),
              u = b.bonds_useAbsoluteSaturationWidths_2D
                ? b.bonds_saturationWidthAbs_2D / 2
                : (v * b.bonds_saturationWidth_2D) / 2;
            if (this.stereo === k.Bond.STEREO_AMBIGUOUS) {
              let b = c - r * u,
                l = g + n * u,
                d = c + r * u,
                h = g - n * u,
                v = f + r * u,
                p = e - n * u,
                k = f - r * u,
                w = e + n * u;
              a.beginPath();
              a.moveTo(b, l);
              a.lineTo(v, p);
              a.moveTo(d, h);
              a.lineTo(k, w);
              a.stroke();
            } else if (
              !b.bonds_symmetrical_2D &&
              (this.ring || ("C" === this.a1.label && "C" === this.a2.label))
            ) {
              a.beginPath();
              a.moveTo(c, g);
              a.lineTo(f, e);
              a.stroke();
              let h = 0;
              u *= 2;
              let p = b.bonds_saturationAngle_2D;
              p < d.PI / 2 && (h = -(u / d.tan(p)));
              if (d.abs(h) < v / 2) {
                let v = c - d.cos(l) * h,
                  p = f + d.cos(l) * h,
                  k = g + d.sin(l) * h,
                  w = e - d.sin(l) * h,
                  t = v - r * u,
                  y = k + n * u,
                  m = v + r * u,
                  x = k - n * u,
                  z = p - r * u,
                  C = w + n * u,
                  A = p + r * u,
                  D = w - n * u,
                  B =
                    !this.ring ||
                    (this.ring.center.angle(this.a1) >
                      this.ring.center.angle(this.a2) &&
                      !(
                        this.ring.center.angle(this.a1) -
                          this.ring.center.angle(this.a2) >
                        d.PI
                      )) ||
                    this.ring.center.angle(this.a1) -
                      this.ring.center.angle(this.a2) <
                      -d.PI;
                a.beginPath();
                B
                  ? (a.moveTo(t, y), a.lineTo(z, C))
                  : (a.moveTo(m, x), a.lineTo(A, D));
                2 !== this.bondOrder &&
                  a.setLineDash([
                    b.bonds_hashSpacing_2D,
                    b.bonds_hashSpacing_2D,
                  ]);
                a.stroke();
                a.setLineDash([]);
              }
            } else {
              let l = c - r * u,
                d = g + n * u,
                h = c + r * u,
                v = g - n * u,
                p = f + r * u,
                k = e - n * u,
                w = f - r * u,
                t = e + n * u;
              a.beginPath();
              a.moveTo(l, d);
              a.lineTo(w, t);
              a.stroke();
              a.beginPath();
              a.moveTo(h, v);
              a.lineTo(p, k);
              2 !== this.bondOrder &&
                a.setLineDash([b.bonds_hashWidth_2D, b.bonds_hashSpacing_2D]);
              a.stroke();
              a.setLineDash([]);
            }
            break;
          }
          case 3: {
            let l = b.bonds_useAbsoluteSaturationWidths_2D
                ? b.bonds_saturationWidthAbs_2D
                : this.a1.distance(this.a2) * b.bonds_saturationWidth_2D,
              h = this.a1.angle(this.a2) + d.PI / 2,
              r = d.cos(h),
              n = d.sin(h),
              v = c - r * l,
              u = g + n * l,
              p = c + r * l,
              k = g - n * l,
              w = f + r * l,
              m = e - n * l,
              F = f - r * l,
              H = e + n * l;
            a.beginPath();
            a.moveTo(v, u);
            a.lineTo(F, H);
            a.moveTo(p, k);
            a.lineTo(w, m);
            a.moveTo(c, g);
            a.lineTo(f, e);
            a.stroke();
          }
        }
    }
  };
  e.drawDecorations = function (a, b) {
    if (this.isHover || this.isSelected) {
      let c = 2 * d.PI,
        f = (this.a1.angleForStupidCanvasArcs(this.a2) + d.PI / 2) % c;
      a.strokeStyle = this.isHover ? b.colorHover : b.colorSelect;
      a.lineWidth = 1.2;
      a.beginPath();
      b = (f + d.PI) % c;
      b %= 2 * d.PI;
      a.arc(this.a1.x, this.a1.y, 7, f, b, !1);
      a.stroke();
      a.beginPath();
      f += d.PI;
      b = (f + d.PI) % c;
      a.arc(this.a2.x, this.a2.y, 7, f, b, !1);
      a.stroke();
    }
  };
  e.drawLewisStyle = function (a, b, f, h, g, e) {
    var c = this.a1.angle(this.a2);
    let l = c + d.PI / 2;
    g -= f;
    e -= h;
    g = d.sqrt(g * g + e * e) / (this.bondOrder + 1);
    e = g * d.cos(c);
    c = -g * d.sin(c);
    f += e;
    h += c;
    for (g = 0; g < this.bondOrder; g++) {
      var r = b.atoms_lonePairSpread_2D / 2;
      let g = f - d.cos(l) * r,
        n = h + d.sin(l) * r,
        v = f + d.cos(l) * r;
      r = h - d.sin(l) * r;
      a.beginPath();
      a.arc(
        g - b.atoms_lonePairDiameter_2D / 2,
        n - b.atoms_lonePairDiameter_2D / 2,
        b.atoms_lonePairDiameter_2D,
        0,
        2 * d.PI,
        !1
      );
      a.fill();
      a.beginPath();
      a.arc(
        v - b.atoms_lonePairDiameter_2D / 2,
        r - b.atoms_lonePairDiameter_2D / 2,
        b.atoms_lonePairDiameter_2D,
        0,
        2 * d.PI,
        !1
      );
      a.fill();
      f += e;
      h += c;
    }
  };
  e.render = function (c, b, f) {
    this.styles && (b = this.styles);
    var l = this.a1.distance3D(this.a2);
    if (0 !== l) {
      var r = b.bonds_cylinderDiameter_3D / 2,
        e = b.bonds_color,
        n = g.translate(g.identity(), [this.a1.x, this.a1.y, this.a1.z]),
        u,
        p = [
          this.a2.x - this.a1.x,
          this.a2.y - this.a1.y,
          this.a2.z - this.a1.z,
        ],
        k = [0, 1, 0],
        x = 0;
      this.a1.x === this.a2.x && this.a1.z === this.a2.z
        ? ((k = [0, 0, 1]), this.a2.y < this.a1.y && (x = d.PI))
        : ((x = m.vec3AngleFrom(k, p)), (k = a.cross(k, p, [])));
      if (b.bonds_splitColor) {
        e = this.a1.styles ? this.a1.styles : b;
        var t = this.a2.styles ? this.a2.styles : b;
        e = this.a1.getElementColor(
          e.atoms_useJMOLColors,
          e.atoms_usePYMOLColors,
          e.atoms_color
        );
        t = this.a2.getElementColor(
          t.atoms_useJMOLColors,
          t.atoms_usePYMOLColors,
          t.atoms_color
        );
        e != t &&
          (u = g.translate(g.identity(), [this.a2.x, this.a2.y, this.a2.z]));
      }
      var z = [0];
      if (f) {
        if (b.bonds_showBondOrders_3D && 1 < this.bondOrder) {
          z = [b.bonds_cylinderDiameter_3D];
          var A = [0, 0, 1];
          r = g.inverse(c.rotationMatrix, []);
          g.multiplyVec3(r, A);
          A = a.cross(p, A, []);
          a.normalize(A);
        }
        p = 1;
        var B = b.bonds_pillSpacing_3D;
        r = b.bonds_pillHeight_3D;
        0 == this.bondOrder &&
          (b.bonds_renderAsLines_3D
            ? (r = B)
            : ((r = b.bonds_pillDiameter_3D),
              r < b.bonds_cylinderDiameter_3D && (r /= 2),
              (p = r / 2),
              (l /= p),
              (B /= p / 2)));
        f = r + B;
        let h = d.floor(l / f);
        l = (B + b.bonds_pillDiameter_3D + (l - f * h)) / 2;
        B = h;
        u && (B = d.floor(h / 2));
        for (let v = 0, w = z.length; v < w; v++) {
          let w = g.set(n, []);
          0 !== z[v] && g.translate(w, a.scale(A, z[v], []));
          0 !== x && g.rotate(w, x, k);
          1 != p && g.scale(w, [p, p, p]);
          e && c.material.setDiffuseColor(c, e);
          g.translate(w, [0, l, 0]);
          for (var C = 0; C < B; C++)
            b.bonds_renderAsLines_3D
              ? 0 == this.bondOrder
                ? (c.shader.setMatrixUniforms(c, w),
                  c.drawArrays(c.POINTS, 0, 1))
                : (g.scale(w, [1, r, 1]),
                  c.shader.setMatrixUniforms(c, w),
                  c.drawArrays(
                    c.LINES,
                    0,
                    c.lineBuffer.vertexPositionBuffer.numItems
                  ),
                  g.scale(w, [1, 1 / r, 1]))
              : (c.shader.setMatrixUniforms(c, w),
                0 == this.bondOrder
                  ? c.drawElements(
                      c.TRIANGLES,
                      c.sphereBuffer.vertexIndexBuffer.numItems,
                      c.UNSIGNED_SHORT,
                      0
                    )
                  : c.drawElements(
                      c.TRIANGLES,
                      c.pillBuffer.vertexIndexBuffer.numItems,
                      c.UNSIGNED_SHORT,
                      0
                    )),
              g.translate(w, [0, f, 0]);
          if (u) {
            let e;
            b.bonds_renderAsLines_3D
              ? ((C = r), (C /= 2), (e = 0))
              : ((C = 2 / 3), (e = (1 - C) / 2));
            0 != h % 2 &&
              (g.scale(w, [1, C, 1]),
              c.shader.setMatrixUniforms(c, w),
              b.bonds_renderAsLines_3D
                ? 0 == this.bondOrder
                  ? c.drawArrays(c.POINTS, 0, 1)
                  : c.drawArrays(
                      c.LINES,
                      0,
                      c.lineBuffer.vertexPositionBuffer.numItems
                    )
                : 0 == this.bondOrder
                ? c.drawElements(
                    c.TRIANGLES,
                    c.sphereBuffer.vertexIndexBuffer.numItems,
                    c.UNSIGNED_SHORT,
                    0
                  )
                : c.drawElements(
                    c.TRIANGLES,
                    c.pillBuffer.vertexIndexBuffer.numItems,
                    c.UNSIGNED_SHORT,
                    0
                  ),
              g.translate(w, [0, f * (1 + e), 0]),
              g.scale(w, [1, 1 / C, 1]));
            g.set(u, w);
            0 !== z[v] && g.translate(w, a.scale(A, z[v], []));
            g.rotate(w, x + d.PI, k);
            1 != p && g.scale(w, [p, p, p]);
            t && c.material.setDiffuseColor(c, t);
            g.translate(w, [0, l, 0]);
            for (let a = 0; a < B; a++)
              b.bonds_renderAsLines_3D
                ? 0 == this.bondOrder
                  ? (c.shader.setMatrixUniforms(c, w),
                    c.drawArrays(c.POINTS, 0, 1))
                  : (g.scale(w, [1, r, 1]),
                    c.shader.setMatrixUniforms(c, w),
                    c.drawArrays(
                      c.LINES,
                      0,
                      c.lineBuffer.vertexPositionBuffer.numItems
                    ),
                    g.scale(w, [1, 1 / r, 1]))
                : (c.shader.setMatrixUniforms(c, w),
                  0 == this.bondOrder
                    ? c.drawElements(
                        c.TRIANGLES,
                        c.sphereBuffer.vertexIndexBuffer.numItems,
                        c.UNSIGNED_SHORT,
                        0
                      )
                    : c.drawElements(
                        c.TRIANGLES,
                        c.pillBuffer.vertexIndexBuffer.numItems,
                        c.UNSIGNED_SHORT,
                        0
                      )),
                g.translate(w, [0, f, 0]);
            0 != h % 2 &&
              (g.scale(w, [1, C, 1]),
              c.shader.setMatrixUniforms(c, w),
              b.bonds_renderAsLines_3D
                ? 0 == this.bondOrder
                  ? c.drawArrays(c.POINTS, 0, 1)
                  : c.drawArrays(
                      c.LINES,
                      0,
                      c.lineBuffer.vertexPositionBuffer.numItems
                    )
                : 0 == this.bondOrder
                ? c.drawElements(
                    c.TRIANGLES,
                    c.sphereBuffer.vertexIndexBuffer.numItems,
                    c.UNSIGNED_SHORT,
                    0
                  )
                : c.drawElements(
                    c.TRIANGLES,
                    c.pillBuffer.vertexIndexBuffer.numItems,
                    c.UNSIGNED_SHORT,
                    0
                  ),
              g.translate(w, [0, f * (1 + e), 0]),
              g.scale(w, [1, 1 / C, 1]));
          }
        }
      } else {
        if (b.bonds_showBondOrders_3D) {
          switch (this.bondOrder) {
            case 1.5:
              z = [-b.bonds_cylinderDiameter_3D];
              break;
            case 2:
              z = [-b.bonds_cylinderDiameter_3D, b.bonds_cylinderDiameter_3D];
              break;
            case 3:
              z = [
                -1.2 * b.bonds_cylinderDiameter_3D,
                0,
                1.2 * b.bonds_cylinderDiameter_3D,
              ];
          }
          1 < this.bondOrder &&
            ((A = [0, 0, 1]),
            (f = g.inverse(c.rotationMatrix, [])),
            g.multiplyVec3(f, A),
            (A = a.cross(p, A, [])),
            a.normalize(A));
        } else
          switch (this.bondOrder) {
            case 0:
              r *= 0.25;
              break;
            case 0.5:
            case 1.5:
              r *= 0.5;
          }
        u && (l /= 2);
        l = [r, l, r];
        for (let f = 0, h = z.length; f < h; f++)
          (p = g.set(n, [])),
            0 !== z[f] && g.translate(p, a.scale(A, z[f], [])),
            0 !== x && g.rotate(p, x, k),
            g.scale(p, l),
            e && c.material.setDiffuseColor(c, e),
            c.shader.setMatrixUniforms(c, p),
            b.bonds_renderAsLines_3D
              ? c.drawArrays(
                  c.LINES,
                  0,
                  c.lineBuffer.vertexPositionBuffer.numItems
                )
              : c.drawArrays(
                  c.TRIANGLE_STRIP,
                  0,
                  c.cylinderBuffer.vertexPositionBuffer.numItems
                ),
            u &&
              (g.set(u, p),
              0 !== z[f] && g.translate(p, a.scale(A, z[f], [])),
              g.rotate(p, x + d.PI, k),
              g.scale(p, l),
              t && c.material.setDiffuseColor(c, t),
              c.shader.setMatrixUniforms(c, p),
              b.bonds_renderAsLines_3D
                ? c.drawArrays(
                    c.LINES,
                    0,
                    c.lineBuffer.vertexPositionBuffer.numItems
                  )
                : c.drawArrays(
                    c.TRIANGLE_STRIP,
                    0,
                    c.cylinderBuffer.vertexPositionBuffer.numItems
                  ));
      }
    }
  };
  e.renderHighlight = function (c, b) {
    if (this.isSelected || this.isHover) {
      this.styles && (b = this.styles);
      this.styles && (b = this.styles);
      let l = this.a1.distance3D(this.a2);
      if (0 !== l) {
        var f = b.bonds_cylinderDiameter_3D / 1.2,
          h = g.translate(g.identity(), [this.a1.x, this.a1.y, this.a1.z]),
          r = [
            this.a2.x - this.a1.x,
            this.a2.y - this.a1.y,
            this.a2.z - this.a1.z,
          ],
          e = [0, 1, 0],
          n = 0;
        this.a1.x === this.a2.x && this.a1.z === this.a2.z
          ? ((r = [0, 0, 1]), this.a2.y < this.a1.y && (n = d.PI))
          : ((n = m.vec3AngleFrom(e, r)), (r = a.cross(e, r, [])));
        f = [f, l, f];
        0 !== n && g.rotate(h, n, r);
        g.scale(h, f);
        c.shader.setMatrixUniforms(c, h);
        c.material.setDiffuseColor(
          c,
          this.isHover ? b.colorHover : b.colorSelect
        );
        c.drawArrays(
          c.TRIANGLE_STRIP,
          0,
          c.cylinderBuffer.vertexPositionBuffer.numItems
        );
      }
    }
  };
  e.renderPicker = function (c, b) {
    this.styles && (b = this.styles);
    var f = this.a1.distance3D(this.a2);
    if (0 !== f) {
      var h = b.bonds_cylinderDiameter_3D / 2,
        r = g.translate(g.identity(), [this.a1.x, this.a1.y, this.a1.z]),
        e = [
          this.a2.x - this.a1.x,
          this.a2.y - this.a1.y,
          this.a2.z - this.a1.z,
        ],
        n = [0, 1, 0],
        u = 0;
      this.a1.x === this.a2.x && this.a1.z === this.a2.z
        ? ((n = [0, 0, 1]), this.a2.y < this.a1.y && (u = d.PI))
        : ((u = m.vec3AngleFrom(n, e)), (n = a.cross(n, e, [])));
      var p = [0];
      if (b.bonds_showBondOrders_3D)
        if (b.bonds_renderAsLines_3D) {
          switch (this.bondOrder) {
            case 1.5:
            case 2:
              p = [-b.bonds_cylinderDiameter_3D, b.bonds_cylinderDiameter_3D];
              break;
            case 3:
              p = [
                -1.2 * b.bonds_cylinderDiameter_3D,
                0,
                1.2 * b.bonds_cylinderDiameter_3D,
              ];
          }
          if (1 < this.bondOrder) {
            var k = [0, 0, 1];
            let b = g.inverse(c.rotationMatrix, []);
            g.multiplyVec3(b, k);
            k = a.cross(e, k, []);
            a.normalize(k);
          }
        } else
          switch (this.bondOrder) {
            case 1.5:
            case 2:
              h *= 3;
              break;
            case 3:
              h *= 3.4;
          }
      else
        switch (this.bondOrder) {
          case 0:
            h *= 0.25;
            break;
          case 0.5:
          case 1.5:
            h *= 0.5;
        }
      f = [h, f, h];
      for (let l = 0, d = p.length; l < d; l++)
        (h = g.set(r, [])),
          0 !== p[l] && g.translate(h, a.scale(k, p[l], [])),
          0 !== u && g.rotate(h, u, n),
          g.scale(h, f),
          c.shader.setMatrixUniforms(c, h),
          b.bonds_renderAsLines_3D
            ? c.drawArrays(
                c.LINES,
                0,
                c.lineBuffer.vertexPositionBuffer.numItems
              )
            : c.drawArrays(
                c.TRIANGLE_STRIP,
                0,
                c.cylinderBuffer.vertexPositionBuffer.numItems
              );
    }
  };
})(
  ChemDoodle.ELEMENT,
  ChemDoodle.extensions,
  ChemDoodle.structures,
  ChemDoodle.math,
  Math,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3
);
(function (e, m, k) {
  e.Ring = function () {
    this.atoms = [];
    this.bonds = [];
  };
  let p = e.Ring.prototype;
  p.center = k;
  p.setupBonds = function () {
    for (let d = 0, g = this.bonds.length; d < g; d++)
      this.bonds[d].ring = this;
    this.center = this.getCenter();
  };
  p.getCenter = function () {
    let d = Infinity,
      g = Infinity,
      a = -Infinity,
      f = -Infinity;
    for (let c = 0, b = this.atoms.length; c < b; c++)
      (d = m.min(this.atoms[c].x, d)),
        (g = m.min(this.atoms[c].y, g)),
        (a = m.max(this.atoms[c].x, a)),
        (f = m.max(this.atoms[c].y, f));
    return new e.Point((a + d) / 2, (f + g) / 2);
  };
})(ChemDoodle.structures, Math);
(function (e, m, k, p, d, g) {
  k.Molecule = function () {
    this.atoms = [];
    this.bonds = [];
    this.rings = [];
  };
  let a = k.Molecule.prototype;
  a.findRings = !0;
  a.draw = function (a, c) {
    this.styles && (c = this.styles);
    if (c.atoms_display && !c.atoms_circles_2D)
      for (let b = 0, f = this.atoms.length; b < f; b++)
        this.atoms[b].draw(a, c);
    if (c.bonds_display)
      for (let b = 0, f = this.bonds.length; b < f; b++)
        this.bonds[b].draw(a, c);
    if (c.atoms_display)
      for (let b = 0, f = this.atoms.length; b < f; b++) {
        let f = this.atoms[b];
        c.atoms_circles_2D && f.draw(a, c);
        f.query && f.query.draw(a, c, f);
      }
  };
  a.render = function (a, c) {
    this.styles && (c = this.styles);
    var b = 0 < this.atoms.length && this.atoms[0].hetatm !== g;
    if (b) {
      if (c.macro_displayBonds) {
        0 < this.bonds.length &&
          ((c.bonds_renderAsLines_3D && !this.residueSpecs) ||
          (this.residueSpecs && this.residueSpecs.bonds_renderAsLines_3D)
            ? (a.lineWidth(
                this.residueSpecs
                  ? this.residueSpecs.bonds_width_2D
                  : c.bonds_width_2D
              ),
              a.lineBuffer.bindBuffers(a))
            : a.cylinderBuffer.bindBuffers(a),
          a.material.setTempColors(
            a,
            c.bonds_materialAmbientColor_3D,
            g,
            c.bonds_materialSpecularColor_3D,
            c.bonds_materialShininess_3D
          ));
        for (let b = 0, d = this.bonds.length; b < d; b++) {
          var f = this.bonds[b];
          !f.a1.hetatm &&
            (-1 === c.macro_atomToLigandDistance ||
              (f.a1.closestDistance !== g &&
                c.macro_atomToLigandDistance >= f.a1.closestDistance &&
                c.macro_atomToLigandDistance >= f.a2.closestDistance)) &&
            f.render(a, this.residueSpecs ? this.residueSpecs : c);
        }
      }
      if (c.macro_displayAtoms) {
        0 < this.atoms.length &&
          (a.sphereBuffer.bindBuffers(a),
          a.material.setTempColors(
            a,
            c.atoms_materialAmbientColor_3D,
            g,
            c.atoms_materialSpecularColor_3D,
            c.atoms_materialShininess_3D
          ));
        for (let b = 0, d = this.atoms.length; b < d; b++)
          (f = this.atoms[b]),
            !f.hetatm &&
              (-1 === c.macro_atomToLigandDistance ||
                (f.closestDistance !== g &&
                  c.macro_atomToLigandDistance >= f.closestDistance)) &&
              f.render(a, this.residueSpecs ? this.residueSpecs : c);
      }
    }
    if (c.bonds_display) {
      f = [];
      var d = [];
      0 < this.bonds.length &&
        (c.bonds_renderAsLines_3D
          ? (a.lineWidth(c.bonds_width_2D), a.lineBuffer.bindBuffers(a))
          : a.cylinderBuffer.bindBuffers(a),
        a.material.setTempColors(
          a,
          c.bonds_materialAmbientColor_3D,
          g,
          c.bonds_materialSpecularColor_3D,
          c.bonds_materialShininess_3D
        ));
      for (let l = 0, h = this.bonds.length; l < h; l++) {
        let h = this.bonds[l];
        if (!b || h.a1.hetatm)
          c.bonds_showBondOrders_3D
            ? 0 == h.bondOrder
              ? d.push(h)
              : 0.5 == h.bondOrder
              ? f.push(h)
              : (1.5 == h.bondOrder && f.push(h), h.render(a, c))
            : h.render(a, c);
      }
      if (0 < f.length) {
        c.bonds_renderAsLines_3D || a.pillBuffer.bindBuffers(a);
        for (let b = 0, d = f.length; b < d; b++) f[b].render(a, c, !0);
      }
      if (0 < d.length) {
        c.bonds_renderAsLines_3D || a.sphereBuffer.bindBuffers(a);
        for (let b = 0, f = d.length; b < f; b++) d[b].render(a, c, !0);
      }
    }
    if (c.atoms_display) {
      for (let b = 0, a = this.atoms.length; b < a; b++)
        (f = this.atoms[b]), (f.bondNumber = 0), (f.renderAsStar = !1);
      for (let b = 0, a = this.bonds.length; b < a; b++)
        (f = this.bonds[b]), f.a1.bondNumber++, f.a2.bondNumber++;
      0 < this.atoms.length &&
        (a.sphereBuffer.bindBuffers(a),
        a.material.setTempColors(
          a,
          c.atoms_materialAmbientColor_3D,
          g,
          c.atoms_materialSpecularColor_3D,
          c.atoms_materialShininess_3D
        ));
      f = [];
      for (let l = 0, h = this.atoms.length; l < h; l++)
        if (
          ((d = this.atoms[l]),
          !b || (d.hetatm && (c.macro_showWater || !d.isWater)))
        )
          c.atoms_nonBondedAsStars_3D && 0 === d.bondNumber
            ? ((d.renderAsStar = !0), f.push(d))
            : d.render(a, c);
      if (0 < f.length) {
        a.starBuffer.bindBuffers(a);
        for (let b = 0, d = f.length; b < d; b++) f[b].render(a, c);
      }
    }
    if (this.chains) {
      a.shader.setMatrixUniforms(a);
      if (c.proteins_displayRibbon) {
        a.material.setTempColors(
          a,
          c.proteins_materialAmbientColor_3D,
          g,
          c.proteins_materialSpecularColor_3D,
          c.proteins_materialShininess_3D
        );
        b = c.proteins_ribbonCartoonize ? this.cartoons : this.ribbons;
        for (let l = 0, h = b.length; l < h; l++)
          if (((f = b[l]), "none" !== c.proteins_residueColor)) {
            f.front.bindBuffers(a);
            d = "rainbow" === c.proteins_residueColor;
            for (let b = 0, l = f.front.segments.length; b < l; b++)
              d &&
                a.material.setDiffuseColor(
                  a,
                  m.rainbowAt(b, l, c.macro_rainbowColors)
                ),
                f.front.segments[b].render(a, c);
            f.back.bindBuffers(a);
            for (let b = 0, l = f.back.segments.length; b < l; b++)
              d &&
                a.material.setDiffuseColor(
                  a,
                  m.rainbowAt(b, l, c.macro_rainbowColors)
                ),
                f.back.segments[b].render(a, c);
          } else f.front.render(a, c), f.back.render(a, c);
      }
      if (c.proteins_displayPipePlank)
        for (let b = 0, f = this.pipePlanks.length; b < f; b++)
          this.pipePlanks[b].render(a, c);
      if (c.proteins_displayBackbone) {
        if (!this.alphaCarbonTrace) {
          this.alphaCarbonTrace = { nodes: [], edges: [] };
          for (let a = 0, c = this.chains.length; a < c; a++)
            if (
              ((b = this.chains[a]),
              !(
                2 < b.length &&
                p[b[2].name] &&
                "#BEA06E" === p[b[2].name].aminoColor
              ) && 0 < b.length)
            )
              for (let a = 0, c = b.length - 2; a < c; a++)
                (f = b[a].cp1),
                  (f.chainColor = b.chainColor),
                  this.alphaCarbonTrace.nodes.push(f),
                  (f = new k.Bond(b[a].cp1, b[a + 1].cp1)),
                  (f.residueName = b[a].name),
                  (f.chainColor = b.chainColor),
                  this.alphaCarbonTrace.edges.push(f),
                  a === b.length - 3 &&
                    ((f = b[a + 1].cp1),
                    (f.chainColor = b.chainColor),
                    this.alphaCarbonTrace.nodes.push(f));
        }
        if (0 < this.alphaCarbonTrace.nodes.length) {
          b = new k.Styles();
          b.atoms_display = !0;
          b.bonds_display = !0;
          b.atoms_sphereDiameter_3D = c.proteins_backboneThickness;
          b.bonds_cylinderDiameter_3D = c.proteins_backboneThickness;
          b.bonds_splitColor = !1;
          b.atoms_color = c.proteins_backboneColor;
          b.bonds_color = c.proteins_backboneColor;
          b.atoms_useVDWDiameters_3D = !1;
          a.material.setTempColors(
            a,
            c.proteins_materialAmbientColor_3D,
            g,
            c.proteins_materialSpecularColor_3D,
            c.proteins_materialShininess_3D
          );
          a.material.setDiffuseColor(a, c.proteins_backboneColor);
          for (let d = 0, l = this.alphaCarbonTrace.nodes.length; d < l; d++)
            (f = this.alphaCarbonTrace.nodes[d]),
              c.macro_colorByChain && (b.atoms_color = f.chainColor),
              a.sphereBuffer.bindBuffers(a),
              f.render(a, b);
          for (let l = 0, h = this.alphaCarbonTrace.edges.length; l < h; l++) {
            f = this.alphaCarbonTrace.edges[l];
            var e;
            d = p[f.residueName] ? p[f.residueName] : p["*"];
            c.macro_colorByChain
              ? (e = f.chainColor)
              : "shapely" === c.proteins_residueColor
              ? (e = d.shapelyColor)
              : "amino" === c.proteins_residueColor
              ? (e = d.aminoColor)
              : "polarity" === c.proteins_residueColor
              ? (e = d.polar ? "#C10000" : "#FFFFFF")
              : "acidity" === c.proteins_residueColor
              ? (e =
                  1 === d.acidity
                    ? "#0000FF"
                    : -1 === d.acidity
                    ? "#FF0000"
                    : d.polar
                    ? "#FFFFFF"
                    : "#773300")
              : "rainbow" === c.proteins_residueColor &&
                (e = m.rainbowAt(l, h, c.macro_rainbowColors));
            e && (b.bonds_color = e);
            a.cylinderBuffer.bindBuffers(a);
            f.render(a, b);
          }
        }
      }
      if (c.nucleics_display) {
        a.material.setTempColors(
          a,
          c.nucleics_materialAmbientColor_3D,
          g,
          c.nucleics_materialSpecularColor_3D,
          c.nucleics_materialShininess_3D
        );
        for (let b = 0, f = this.tubes.length; b < f; b++)
          a.shader.setMatrixUniforms(a), this.tubes[b].render(a, c);
      }
    }
    if (c.atoms_display) {
      e = !1;
      for (let a = 0, c = this.atoms.length; a < c; a++)
        if (((b = this.atoms[a]), b.isHover || b.isSelected)) {
          e = !0;
          break;
        }
      if (!e)
        for (let a = 0, c = this.bonds.length; a < c; a++)
          if (((b = this.bonds[a]), b.isHover || b.isSelected)) {
            e = !0;
            break;
          }
      if (e) {
        a.sphereBuffer.bindBuffers(a);
        a.blendFunc(a.SRC_ALPHA, a.ONE);
        a.material.setTempColors(
          a,
          c.atoms_materialAmbientColor_3D,
          g,
          "#000000",
          0
        );
        a.enable(a.BLEND);
        a.depthMask(!1);
        a.material.setAlpha(a, 0.4);
        a.sphereBuffer.bindBuffers(a);
        for (let b = 0, f = this.atoms.length; b < f; b++)
          (e = this.atoms[b]),
            (e.isHover || e.isSelected) && e.renderHighlight(a, c);
        a.cylinderBuffer.bindBuffers(a);
        for (let b = 0, f = this.bonds.length; b < f; b++)
          (e = this.bonds[b]),
            (e.isHover || e.isSelected) && e.renderHighlight(a, c);
        a.depthMask(!0);
        a.disable(a.BLEND);
        a.blendFuncSeparate(
          a.SRC_ALPHA,
          a.ONE_MINUS_SRC_ALPHA,
          a.ONE,
          a.ONE_MINUS_SRC_ALPHA
        );
      }
    }
  };
  a.renderPickFrame = function (a, c, b, d, h) {
    this.styles && (c = this.styles);
    var f = 0 < this.atoms.length && this.atoms[0].hetatm !== g;
    if (h && c.bonds_display) {
      0 < this.bonds.length &&
        (c.bonds_renderAsLines_3D
          ? (a.lineWidth(c.bonds_width_2D), a.lineBuffer.bindBuffers(a))
          : a.cylinderBuffer.bindBuffers(a));
      for (let d = 0, l = this.bonds.length; d < l; d++)
        if (((h = this.bonds[d]), !f || h.a1.hetatm))
          a.material.setDiffuseColor(a, m.idx2color(b.length)),
            h.renderPicker(a, c),
            b.push(h);
    }
    if (d && c.atoms_display) {
      for (let b = 0, a = this.atoms.length; b < a; b++)
        (d = this.atoms[b]), (d.bondNumber = 0), (d.renderAsStar = !1);
      for (let b = 0, a = this.bonds.length; b < a; b++)
        (d = this.bonds[b]), d.a1.bondNumber++, d.a2.bondNumber++;
      0 < this.atoms.length && a.sphereBuffer.bindBuffers(a);
      d = [];
      for (let l = 0, g = this.atoms.length; l < g; l++)
        if (
          ((h = this.atoms[l]),
          !f || (h.hetatm && (c.macro_showWater || !h.isWater)))
        )
          c.atoms_nonBondedAsStars_3D && 0 === h.bondNumber
            ? ((h.renderAsStar = !0), d.push(h))
            : (a.material.setDiffuseColor(a, m.idx2color(b.length)),
              h.render(a, c, !0),
              b.push(h));
      if (0 < d.length) {
        a.starBuffer.bindBuffers(a);
        for (let l = 0, h = d.length; l < h; l++)
          (f = d[l]),
            a.material.setDiffuseColor(a, m.idx2color(b.length)),
            f.render(a, c, !0),
            b.push(f);
      }
    }
  };
  a.getCenter3D = function () {
    if (1 === this.atoms.length)
      return new k.Atom("C", this.atoms[0].x, this.atoms[0].y, this.atoms[0].z);
    let a = Infinity,
      c = Infinity,
      b = Infinity,
      l = -Infinity,
      h = -Infinity,
      g = -Infinity;
    if (this.chains)
      for (let f = 0, e = this.chains.length; f < e; f++) {
        let e = this.chains[f];
        for (let f = 0, r = e.length; f < r; f++) {
          let r = e[f];
          a = d.min(r.cp1.x, r.cp2.x, a);
          c = d.min(r.cp1.y, r.cp2.y, c);
          b = d.min(r.cp1.z, r.cp2.z, b);
          l = d.max(r.cp1.x, r.cp2.x, l);
          h = d.max(r.cp1.y, r.cp2.y, h);
          g = d.max(r.cp1.z, r.cp2.z, g);
        }
      }
    for (let f = 0, e = this.atoms.length; f < e; f++)
      (a = d.min(this.atoms[f].x, a)),
        (c = d.min(this.atoms[f].y, c)),
        (b = d.min(this.atoms[f].z, b)),
        (l = d.max(this.atoms[f].x, l)),
        (h = d.max(this.atoms[f].y, h)),
        (g = d.max(this.atoms[f].z, g));
    return new k.Atom("C", (l + a) / 2, (h + c) / 2, (g + b) / 2);
  };
  a.getCenter = function () {
    if (1 === this.atoms.length)
      return new k.Point(this.atoms[0].x, this.atoms[0].y);
    let a = Infinity,
      c = Infinity,
      b = -Infinity,
      l = -Infinity;
    for (let f = 0, g = this.atoms.length; f < g; f++)
      (a = d.min(this.atoms[f].x, a)),
        (c = d.min(this.atoms[f].y, c)),
        (b = d.max(this.atoms[f].x, b)),
        (l = d.max(this.atoms[f].y, l));
    return new k.Point((b + a) / 2, (l + c) / 2);
  };
  a.getDimension = function () {
    if (1 === this.atoms.length) return new k.Point(0, 0);
    let a = Infinity,
      c = Infinity,
      b = -Infinity,
      l = -Infinity;
    if (this.chains) {
      for (let f = 0, g = this.chains.length; f < g; f++) {
        let h = this.chains[f];
        for (let f = 0, g = h.length; f < g; f++) {
          let g = h[f];
          a = d.min(g.cp1.x, g.cp2.x, a);
          c = d.min(g.cp1.y, g.cp2.y, c);
          b = d.max(g.cp1.x, g.cp2.x, b);
          l = d.max(g.cp1.y, g.cp2.y, l);
        }
      }
      a -= 30;
      c -= 30;
      b += 30;
      l += 30;
    }
    for (let f = 0, g = this.atoms.length; f < g; f++)
      (a = d.min(this.atoms[f].x, a)),
        (c = d.min(this.atoms[f].y, c)),
        (b = d.max(this.atoms[f].x, b)),
        (l = d.max(this.atoms[f].y, l));
    return new k.Point(b - a, l - c);
  };
  a.check = function (a) {
    if (a && this.doChecks) {
      if (this.findRings)
        if (this.bonds.length - this.atoms.length !== this.fjNumCache) {
          this.rings = new e.informatics.SSSRFinder(this).rings;
          for (let b = 0, a = this.bonds.length; b < a; b++)
            this.bonds[b].ring = g;
          for (let b = 0, a = this.rings.length; b < a; b++)
            this.rings[b].setupBonds();
        } else
          for (let b = 0, a = this.rings.length; b < a; b++) {
            var c = this.rings[b];
            c.center = c.getCenter();
          }
      for (let b = 0, a = this.atoms.length; b < a; b++)
        if (((this.atoms[b].isLone = !1), "C" === this.atoms[b].label)) {
          c = 0;
          for (let a = 0, f = this.bonds.length; a < f; a++)
            (this.bonds[a].a1 !== this.atoms[b] &&
              this.bonds[a].a2 !== this.atoms[b]) ||
              c++;
          0 === c && (this.atoms[b].isLone = !0);
        }
      c = !1;
      for (let b = 0, a = this.atoms.length; b < a; b++)
        0 !== this.atoms[b].z && (c = !0);
      c && (this.sortAtomsByZ(), this.sortBondsByZ());
      this.setupMetaData();
      this.atomNumCache = this.atoms.length;
      this.bondNumCache = this.bonds.length;
      this.fjNumCache = this.bonds.length - this.atoms.length;
    }
    this.doChecks = !a;
  };
  a.getAngles = function (a) {
    let c = [];
    for (let b = 0, f = this.bonds.length; b < f; b++)
      this.bonds[b].contains(a) &&
        c.push(a.angle(this.bonds[b].getNeighbor(a)));
    c.sort(function (b, a) {
      return b - a;
    });
    return c;
  };
  a.getCoordinationNumber = function (a) {
    let c = 0;
    for (let b = 0, f = a.length; b < f; b++) c += a[b].bondOrder;
    return c;
  };
  a.getBonds = function (a) {
    let c = [];
    for (let b = 0, f = this.bonds.length; b < f; b++)
      this.bonds[b].contains(a) && c.push(this.bonds[b]);
    return c;
  };
  a.sortAtomsByZ = function () {
    for (let a = 1, c = this.atoms.length; a < c; a++) {
      let b = a;
      for (; 0 < b && this.atoms[b].z < this.atoms[b - 1].z; ) {
        let a = this.atoms[b];
        this.atoms[b] = this.atoms[b - 1];
        this.atoms[b - 1] = a;
        b--;
      }
    }
  };
  a.sortBondsByZ = function () {
    for (let a = 1, c = this.bonds.length; a < c; a++) {
      let b = a;
      for (
        ;
        0 < b &&
        this.bonds[b].a1.z + this.bonds[b].a2.z <
          this.bonds[b - 1].a1.z + this.bonds[b - 1].a2.z;

      ) {
        let a = this.bonds[b];
        this.bonds[b] = this.bonds[b - 1];
        this.bonds[b - 1] = a;
        b--;
      }
    }
  };
  a.setupMetaData = function () {
    let a = this.getCenter();
    for (let c = 0, b = this.atoms.length; c < b; c++) {
      let b = this.atoms[c];
      b.bonds = this.getBonds(b);
      b.angles = this.getAngles(b);
      b.isHidden =
        2 === b.bonds.length &&
        d.abs(d.abs(b.angles[1] - b.angles[0]) - d.PI) < d.PI / 30 &&
        b.bonds[0].bondOrder === b.bonds[1].bondOrder;
      let f = m.angleBetweenLargest(b.angles);
      b.angleOfLeastInterference = f.angle % (2 * d.PI);
      b.largestAngle = f.largest;
      b.coordinationNumber = this.getCoordinationNumber(b.bonds);
      b.bondNumber = b.bonds.length;
      b.molCenter = a;
    }
    for (let c = 0, b = this.bonds.length; c < b; c++)
      this.bonds[c].molCenter = a;
  };
  a.scaleToAverageBondLength = function (a) {
    let c = this.getAverageBondLength();
    if (0 !== c) {
      a /= c;
      for (let b = 0, c = this.atoms.length; b < c; b++)
        (this.atoms[b].x *= a), (this.atoms[b].y *= a);
    }
  };
  a.getAverageBondLength = function () {
    if (0 === this.bonds.length) return 0;
    let a = 0;
    for (let c = 0, b = this.bonds.length; c < b; c++)
      a += this.bonds[c].getLength();
    return (a /= this.bonds.length);
  };
  a.getBounds = function () {
    let a = new m.Bounds();
    for (let c = 0, b = this.atoms.length; c < b; c++)
      a.expand(this.atoms[c].getBounds());
    if (this.chains) {
      for (let c = 0, b = this.chains.length; c < b; c++) {
        let b = this.chains[c];
        for (let c = 0, f = b.length; c < f; c++) {
          let f = b[c];
          a.expand(f.cp1.x, f.cp1.y);
          a.expand(f.cp2.x, f.cp2.y);
        }
      }
      a.minX -= 30;
      a.minY -= 30;
      a.maxX += 30;
      a.maxY += 30;
    }
    return a;
  };
  a.getBounds3D = function () {
    let a = new m.Bounds();
    for (let c = 0, b = this.atoms.length; c < b; c++)
      a.expand(this.atoms[c].getBounds3D());
    if (this.chains)
      for (let c = 0, b = this.chains.length; c < b; c++) {
        let b = this.chains[c];
        for (let c = 0, f = b.length; c < f; c++) {
          let f = b[c];
          a.expand3D(f.cp1.x, f.cp1.y, f.cp1.z);
          a.expand3D(f.cp2.x, f.cp2.y, f.cp2.z);
        }
      }
    return a;
  };
  a.getAtomGroup = function (a) {
    let c = !1;
    for (let b = 0, a = this.atoms.length; b < a; b++)
      this.atoms[b].visited = !1;
    for (let f = 0, d = this.bonds.length; f < d; f++) {
      var b = this.bonds[f];
      !c && b.contains(a) && b.ring !== g && (c = !0);
    }
    if (!c) return g;
    b = [a];
    a.visited = !0;
    let f = new k.Queue();
    for (f.enqueue(a); !f.isEmpty(); ) {
      a = f.dequeue();
      for (let l = 0, h = this.bonds.length; l < h; l++) {
        var d = this.bonds[l];
        d.contains(a) &&
          c === (d.ring !== g) &&
          ((d = d.getNeighbor(a)),
          d.visited || ((d.visited = !0), b.push(d), f.enqueue(d)));
      }
    }
    return b;
  };
  a.getBondGroup = function (a) {
    let c = a.ring !== g;
    var b = !1;
    for (let c = 0, d = this.bonds.length; c < d; c++) {
      var f = this.bonds[c];
      f === a && (b = !0);
      f.visited = !1;
    }
    if (!b) return g;
    b = [a];
    a.visited = !0;
    f = new k.Queue();
    for (f.enqueue(a); !f.isEmpty(); ) {
      a = f.dequeue();
      for (let d = 0, l = this.bonds.length; d < l; d++) {
        let l = this.bonds[d];
        l.visited ||
          (l.a1 !== a.a1 && l.a2 !== a.a1 && l.a1 !== a.a2 && l.a2 !== a.a2) ||
          (l.ring !== g) !== c ||
          ((l.visited = !0), b.push(l), f.enqueue(l));
      }
    }
    return b;
  };
})(
  ChemDoodle,
  ChemDoodle.math,
  ChemDoodle.structures,
  ChemDoodle.RESIDUE,
  Math
);
(function (e, m) {
  e.Reaction = function () {};
  e.Reaction.prototype.resolve = function (e, p) {
    if (e && p) {
      var d = { reactants: [], products: [] };
      e = e.getPoints();
      if (!e) return d.reactants.push(...p), d;
      for (let g = 0, a = p.length; g < a; g++) {
        let a = p[g];
        a.getCenter().x < e[1].x ? d.reactants.push(a) : d.products.push(a);
      }
      return d;
    }
  };
})(ChemDoodle.structures);
(function (e, m, k, p, d) {
  let g,
    a = -1;
  e.Residue = function (a) {
    this.resSeq = a;
  };
  d = e.Residue.prototype;
  d.setup = function (a, c) {
    this.horizontalResolution = c;
    let b = [a.x - this.cp1.x, a.y - this.cp1.y, a.z - this.cp1.z];
    var f = p.cross(
      b,
      [
        this.cp2.x - this.cp1.x,
        this.cp2.y - this.cp1.y,
        this.cp2.z - this.cp1.z,
      ],
      []
    );
    this.D = p.cross(f, b, []);
    p.normalize(f);
    p.normalize(this.D);
    this.guidePointsSmall = [];
    this.guidePointsLarge = [];
    a = [
      (a.x + this.cp1.x) / 2,
      (a.y + this.cp1.y) / 2,
      (a.z + this.cp1.z) / 2,
    ];
    this.helix && (p.scale(f, 1.5), p.add(a, f));
    this.guidePointsSmall[0] = new e.Atom(
      "",
      a[0] - this.D[0] / 2,
      a[1] - this.D[1] / 2,
      a[2] - this.D[2] / 2
    );
    for (f = 1; f < c; f++)
      this.guidePointsSmall[f] = new e.Atom(
        "",
        this.guidePointsSmall[0].x + (this.D[0] * f) / c,
        this.guidePointsSmall[0].y + (this.D[1] * f) / c,
        this.guidePointsSmall[0].z + (this.D[2] * f) / c
      );
    p.scale(this.D, 4);
    this.guidePointsLarge[0] = new e.Atom(
      "",
      a[0] - this.D[0] / 2,
      a[1] - this.D[1] / 2,
      a[2] - this.D[2] / 2
    );
    for (f = 1; f < c; f++)
      this.guidePointsLarge[f] = new e.Atom(
        "",
        this.guidePointsLarge[0].x + (this.D[0] * f) / c,
        this.guidePointsLarge[0].y + (this.D[1] * f) / c,
        this.guidePointsLarge[0].z + (this.D[2] * f) / c
      );
  };
  d.getGuidePointSet = function (a) {
    if (0 === a)
      return this.helix || this.sheet
        ? this.guidePointsLarge
        : this.guidePointsSmall;
    if (1 === a) return this.guidePointsSmall;
    if (2 === a) return this.guidePointsLarge;
  };
  d.computeLineSegments = function (a, c, b, d, h) {
    this.setVerticalResolution(h);
    this.split = b.helix !== this.helix || b.sheet !== this.sheet;
    this.lineSegments = this.innerCompute(0, a, c, b, !1, h);
    d &&
      (this.lineSegmentsCartoon = this.innerCompute(
        this.helix || this.sheet ? 2 : 1,
        a,
        c,
        b,
        !0,
        h
      ));
  };
  d.innerCompute = function (a, c, b, d, h, r) {
    let f = [];
    var l = this.getGuidePointSet(a);
    c = c.getGuidePointSet(a);
    b = b.getGuidePointSet(a);
    a = d.getGuidePointSet(a);
    for (let h = 0, n = l.length; h < n; h++) {
      d = k.multiply(
        [
          c[h].x,
          c[h].y,
          c[h].z,
          1,
          b[h].x,
          b[h].y,
          b[h].z,
          1,
          l[h].x,
          l[h].y,
          l[h].z,
          1,
          a[h].x,
          a[h].y,
          a[h].z,
          1,
        ],
        g,
        []
      );
      let n = [];
      for (let b = 0; b < r; b++) {
        for (let b = 3; 0 < b; b--)
          for (let a = 0; 4 > a; a++) d[4 * b + a] += d[4 * (b - 1) + a];
        n[b] = new e.Atom("", d[12] / d[15], d[13] / d[15], d[14] / d[15]);
      }
      f[h] = n;
    }
    if (h && this.arrow)
      for (let g = 0, e = r; g < e; g++) {
        h = 1.5 - (1.3 * g) / r;
        l = m.floor(this.horizontalResolution / 2);
        c = f[l];
        for (let e = 0, r = f.length; e < r; e++)
          e !== l &&
            ((b = c[g]),
            (a = f[e][g]),
            (d = [a.x - b.x, a.y - b.y, a.z - b.z]),
            p.scale(d, h),
            (a.x = b.x + d[0]),
            (a.y = b.y + d[1]),
            (a.z = b.z + d[2]));
      }
    return f;
  };
  d.setVerticalResolution = function (f) {
    if (f !== a) {
      {
        let c = f * f,
          b = f * f * f;
        g = k.multiply(
          [
            -1 / 6,
            0.5,
            -0.5,
            1 / 6,
            0.5,
            -1,
            0.5,
            0,
            -0.5,
            0,
            0.5,
            0,
            1 / 6,
            2 / 3,
            1 / 6,
            0,
          ],
          [
            6 / b,
            0,
            0,
            0,
            6 / b,
            2 / c,
            0,
            0,
            1 / b,
            1 / c,
            1 / f,
            0,
            0,
            0,
            0,
            1,
          ],
          []
        );
        a = f;
      }
    }
  };
})(ChemDoodle.structures, Math, ChemDoodle.lib.mat4, ChemDoodle.lib.vec3);
(function (e, m, k, p, d) {
  m.Spectrum = function () {
    this.data = [];
    this.metadata = [];
    this.dataDisplay = [];
    this.memory = {
      offsetTop: 0,
      offsetLeft: 0,
      offsetBottom: 0,
      flipXAxis: !1,
      scale: 1,
      width: 0,
      height: 0,
    };
  };
  let g = m.Spectrum.prototype;
  g.title = d;
  g.xUnit = d;
  g.yUnit = d;
  g.continuous = !0;
  g.integrationSensitivity = 0.01;
  g.draw = function (a, f, c, b) {
    this.styles && (f = this.styles);
    let d = 5,
      h = 0,
      g = 0;
    a.fillStyle = f.text_color;
    a.textAlign = "center";
    a.textBaseline = "alphabetic";
    a.font = e.getFontString(f.text_font_size, f.text_font_families);
    this.xUnit &&
      ((g += f.text_font_size), a.fillText(this.xUnit, c / 2, b - 2));
    this.yUnit &&
      f.plots_showYAxis &&
      ((h += f.text_font_size),
      a.save(),
      a.translate(f.text_font_size, b / 2),
      a.rotate(-p.PI / 2),
      a.fillText(this.yUnit, 0, 0),
      a.restore());
    this.title &&
      ((d += f.text_font_size),
      a.fillText(this.title, c / 2, f.text_font_size));
    a.lineCap = "square";
    g += 5 + f.text_font_size;
    f.plots_showYAxis && (h += 5 + a.measureText("1000").width);
    f.plots_showGrid &&
      ((a.strokeStyle = f.plots_gridColor),
      (a.lineWidth = f.plots_gridLineWidth),
      a.strokeRect(h, d, c - h, b - g - d));
    a.textAlign = "center";
    a.textBaseline = "top";
    for (
      var v = this.maxX - this.minX, n = v / 100, u = 0.001;
      u < n || 25 < v / u;

    )
      u *= 10;
    v = 0;
    n = f.plots_flipXAxis ? c : 0;
    for (var k = p.round(this.minX / u) * u; k <= this.maxX; k += u / 2) {
      var m = this.getTransformedX(k, f, c, h);
      if (m > h)
        if (((a.strokeStyle = "black"), (a.lineWidth = 1), 0 === v % 2)) {
          a.beginPath();
          a.moveTo(m, b - g);
          a.lineTo(m, b - g + 2);
          a.stroke();
          let c = k.toFixed(5);
          for (; "0" === c.charAt(c.length - 1); )
            c = c.substring(0, c.length - 1);
          "." === c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));
          let l = a.measureText(c).width;
          f.plots_flipXAxis && (l *= -1);
          let h = m - l / 2;
          if (f.plots_flipXAxis ? h < n : h > n)
            a.fillText(c, m, b - g + 2), (n = m + l / 2);
          f.plots_showGrid &&
            ((a.strokeStyle = f.plots_gridColor),
            (a.lineWidth = f.plots_gridLineWidth),
            a.beginPath(),
            a.moveTo(m, b - g),
            a.lineTo(m, d),
            a.stroke());
        } else
          a.beginPath(), a.moveTo(m, b - g), a.lineTo(m, b - g + 2), a.stroke();
      v++;
    }
    if (f.plots_showYAxis || f.plots_showGrid)
      for (
        u = 1 / f.scale,
          a.textAlign = "right",
          a.textBaseline = "middle",
          v = 0;
        10 >= v;
        v++
      )
        if (
          ((k = (u / 10) * v),
          (n = d + (b - g - d) * (1 - k * f.scale)),
          f.plots_showGrid &&
            ((a.strokeStyle = f.plots_gridColor),
            (a.lineWidth = f.plots_gridLineWidth),
            a.beginPath(),
            a.moveTo(h, n),
            a.lineTo(c, n),
            a.stroke()),
          f.plots_showYAxis)
        ) {
          a.strokeStyle = "black";
          a.lineWidth = 1;
          a.beginPath();
          a.moveTo(h, n);
          a.lineTo(h - 3, n);
          a.stroke();
          m = 100 * k;
          k = p.max(0, 3 - p.floor(m).toString().length);
          m = m.toFixed(k);
          if (0 < k)
            for (; "0" === m.charAt(m.length - 1); )
              m = m.substring(0, m.length - 1);
          "." === m.charAt(m.length - 1) && (m = m.substring(0, m.length - 1));
          a.fillText(m, h - 3, n);
        }
    a.strokeStyle = "black";
    a.lineWidth = 1;
    a.beginPath();
    a.moveTo(c, b - g);
    a.lineTo(h, b - g);
    f.plots_showYAxis && a.lineTo(h, d);
    a.stroke();
    if (0 < this.dataDisplay.length) {
      a.textAlign = "left";
      a.textBaseline = "top";
      u = 0;
      for (let b = 0, c = this.dataDisplay.length; b < c; b++)
        if (this.dataDisplay[b].value)
          a.fillText(
            [this.dataDisplay[b].display, ": ", this.dataDisplay[b].value].join(
              ""
            ),
            h + 10,
            d + 10 + u * (f.text_font_size + 5)
          ),
            u++;
        else if (this.dataDisplay[b].tag)
          for (let c = 0, l = this.metadata.length; c < l; c++)
            if (this.metadata[c].startsWith(this.dataDisplay[b].tag)) {
              v = this.metadata[c];
              this.dataDisplay[b].display &&
                ((v = this.metadata[c].indexOf("\x3d")),
                (v = [
                  this.dataDisplay[b].display,
                  ": ",
                  -1 < v ? this.metadata[c].substring(v + 2) : this.metadata[c],
                ].join("")));
              a.fillText(v, h + 10, d + 10 + u * (f.text_font_size + 5));
              u++;
              break;
            }
    }
    this.drawPlot(a, f, c, b, d, h, g);
    this.memory.offsetTop = d;
    this.memory.offsetLeft = h;
    this.memory.offsetBottom = g;
    this.memory.flipXAxis = f.plots_flipXAxis;
    this.memory.scale = f.scale;
    this.memory.width = c;
    this.memory.height = b;
  };
  g.drawPlot = function (a, f, c, b, l, h, g) {
    this.styles && (f = this.styles);
    a.strokeStyle = f.plots_color;
    a.lineWidth = f.plots_width;
    let e = [];
    a.save();
    a.rect(h, l, c - h, b - g - l);
    a.clip();
    a.beginPath();
    if (this.continuous) {
      var r = !1,
        u = 0,
        k = !1;
      for (let n = 0, v = this.data.length; n < v; n++) {
        let w = this.getTransformedX(this.data[n].x, f, c, h),
          y;
        n < v &&
          !r &&
          this.data[n + 1] &&
          (y = this.getTransformedX(this.data[n + 1].x, f, c, h));
        if ((w >= h && w < c) || (y !== d && y >= h && y < c)) {
          let c = this.getTransformedY(this.data[n].y, f, b, g, l);
          f.plots_showIntegration &&
            p.abs(this.data[n].y) > this.integrationSensitivity &&
            e.push(new m.Point(this.data[n].x, this.data[n].y));
          r || (a.moveTo(w, c), (r = !0));
          a.lineTo(w, c);
          u++;
          0 === u % 1e3 && (a.stroke(), a.beginPath(), a.moveTo(w, c));
          if (k) break;
        } else r && (k = !0);
      }
    } else
      for (let d = 0, e = this.data.length; d < e; d++)
        (r = this.getTransformedX(this.data[d].x, f, c, h)),
          r >= h &&
            r < c &&
            (a.moveTo(r, b - g),
            a.lineTo(r, this.getTransformedY(this.data[d].y, f, b, g, l)));
    a.stroke();
    if (f.plots_showIntegration && 1 < e.length) {
      a.strokeStyle = f.plots_integrationColor;
      a.lineWidth = f.plots_integrationLineWidth;
      a.beginPath();
      r = e[1].x > e[0].x;
      if ((this.flipXAxis && !r) || (!this.flipXAxis && r)) {
        for (r = e.length - 2; 0 <= r; r--) e[r].y += e[r + 1].y;
        r = e[0].y;
      } else {
        for (let b = 1, a = e.length; b < a; b++) e[b].y += e[b - 1].y;
        r = e[e.length - 1].y;
      }
      for (let d = 0, n = e.length; d < n; d++)
        (u = this.getTransformedX(e[d].x, f, c, h)),
          (k = this.getTransformedY(e[d].y / f.scale / r, f, b, g, l)),
          0 === d ? a.moveTo(u, k) : a.lineTo(u, k);
      a.stroke();
    }
    a.restore();
  };
  g.getTransformedY = function (a, f, c, b, d) {
    return d + (c - b - d) * (1 - a * f.scale);
  };
  g.getInverseTransformedY = function (a) {
    return (
      ((1 -
        (a - this.memory.offsetTop) /
          (this.memory.height -
            this.memory.offsetBottom -
            this.memory.offsetTop)) /
        this.memory.scale) *
      100
    );
  };
  g.getTransformedX = function (a, f, c, b) {
    a = b + ((a - this.minX) / (this.maxX - this.minX)) * (c - b);
    f.plots_flipXAxis && (a = c + b - a);
    return a;
  };
  g.getInverseTransformedX = function (a) {
    this.memory.flipXAxis &&
      (a = this.memory.width + this.memory.offsetLeft - a);
    return (
      ((a - this.memory.offsetLeft) * (this.maxX - this.minX)) /
        (this.memory.width - this.memory.offsetLeft) +
      this.minX
    );
  };
  g.setup = function () {
    let a = Number.MAX_VALUE,
      f = Number.MIN_VALUE,
      c = Number.MIN_VALUE;
    for (let b = 0, d = this.data.length; b < d; b++)
      (a = p.min(a, this.data[b].x)),
        (f = p.max(f, this.data[b].x)),
        (c = p.max(c, this.data[b].y));
    this.continuous
      ? ((this.minX = a), (this.maxX = f))
      : ((this.minX = a - 1), (this.maxX = f + 1));
    for (let b = 0, a = this.data.length; b < a; b++) this.data[b].y /= c;
  };
  g.zoom = function (a, f, c, b) {
    a = this.getInverseTransformedX(a);
    f = this.getInverseTransformedX(f);
    this.minX = p.min(a, f);
    this.maxX = p.max(a, f);
    if (b) {
      b = Number.MIN_VALUE;
      for (let a = 0, c = this.data.length; a < c; a++)
        k.isBetween(this.data[a].x, this.minX, this.maxX) &&
          (b = p.max(b, this.data[a].y));
      return 1 / b;
    }
  };
  g.translate = function (a, f) {
    a =
      (a / (f - this.memory.offsetLeft)) *
      (this.maxX - this.minX) *
      (this.memory.flipXAxis ? 1 : -1);
    this.minX += a;
    this.maxX += a;
  };
  g.alertMetadata = function () {
    alert(this.metadata.join("\n"));
  };
  g.getInternalCoordinates = function (a, f) {
    return new ChemDoodle.structures.Point(
      this.getInverseTransformedX(a),
      this.getInverseTransformedY(f)
    );
  };
  g.getClosestPlotInternalCoordinates = function (a) {
    var f = this.getInverseTransformedX(a - 1);
    a = this.getInverseTransformedX(a + 1);
    if (f > a) {
      var c = f;
      f = a;
      a = c;
    }
    c = -1;
    let b = -Infinity,
      l = !1;
    for (let d = 0, g = this.data.length; d < g; d++) {
      let h = this.data[d];
      if (k.isBetween(h.x, f, a)) h.y > b && ((l = !0), (b = h.y), (c = d));
      else if (l) break;
    }
    if (-1 === c) return d;
    f = this.data[c];
    return new ChemDoodle.structures.Point(f.x, 100 * f.y);
  };
  g.getClosestPeakInternalCoordinates = function (a) {
    var f = this.getInverseTransformedX(a);
    a = 0;
    var c = Infinity;
    for (let d = 0, l = this.data.length; d < l; d++) {
      var b = p.abs(this.data[d].x - f);
      if (b <= c) (c = b), (a = d);
      else break;
    }
    c = f = a;
    b = this.data[a].y;
    var d = this.data[a].y;
    for (let b = a + 1, f = this.data.length; b < f; b++)
      if (this.data[b].y + 0.05 > d) (d = this.data[b].y), (c = b);
      else break;
    for (d = a - 1; 0 <= d; d--)
      if (this.data[d].y + 0.05 > b) (b = this.data[d].y), (f = d);
      else break;
    a = this.data[f - a > c - a ? c : f];
    return new ChemDoodle.structures.Point(a.x, 100 * a.y);
  };
})(ChemDoodle.extensions, ChemDoodle.structures, ChemDoodle.math, Math);
(function (e, m, k, p) {
  m._Shape = function () {};
  m = m._Shape.prototype;
  m.drawDecorations = function (d, g) {
    if (this.isHover) {
      let a = this.getPoints();
      for (let f = 0, c = a.length; f < c; f++) {
        let b = a[f];
        this.drawAnchor(d, g, b, b === this.hoverPoint);
      }
    }
  };
  m.getBounds = function () {
    let d = new e.Bounds(),
      g = this.getPoints();
    for (let a = 0, f = g.length; a < f; a++) {
      let c = g[a];
      d.expand(c.x, c.y);
    }
    return d;
  };
  m.drawAnchor = function (d, g, a, f) {
    d.save();
    d.translate(a.x, a.y);
    d.rotate(k.PI / 4);
    d.scale(1 / g.scale, 1 / g.scale);
    d.beginPath();
    d.moveTo(-4, -4);
    d.lineTo(4, -4);
    d.lineTo(4, 4);
    d.lineTo(-4, 4);
    d.closePath();
    d.fillStyle = f ? g.colorHover : "white";
    d.fill();
    d.beginPath();
    d.moveTo(-4, -2);
    d.lineTo(-4, -4);
    d.lineTo(-2, -4);
    d.moveTo(2, -4);
    d.lineTo(4, -4);
    d.lineTo(4, -2);
    d.moveTo(4, 2);
    d.lineTo(4, 4);
    d.lineTo(2, 4);
    d.moveTo(-2, 4);
    d.lineTo(-4, 4);
    d.lineTo(-4, 2);
    d.moveTo(-4, -2);
    d.strokeStyle = "rgba(0,0,0,.2)";
    d.lineWidth = 5;
    d.stroke();
    d.strokeStyle = "blue";
    d.lineWidth = 1;
    d.stroke();
    d.restore();
  };
})(ChemDoodle.math, ChemDoodle.structures.d2, Math);
(function (e, m, k, p, d, g) {
  p.AtomMapping = function (a, f) {
    this.o1 = a;
    this.o2 = f;
    this.label = "0";
    this.error = !1;
  };
  m = p.AtomMapping.prototype = new p._Shape();
  m.drawDecorations = function (a, f) {
    if (this.isHover || this.isSelected)
      (a.strokeStyle = this.isHover ? f.colorHover : f.colorSelect),
        (a.lineWidth = 1),
        a.beginPath(),
        a.moveTo(this.o1.x, this.o1.y),
        a.lineTo(this.o2.x, this.o2.y),
        a.setLineDash([2]),
        a.stroke(),
        a.setLineDash([]);
  };
  m.draw = function (a, f) {
    if (this.o1 && this.o2) {
      this.x1 = this.o1.x + 14 * d.cos(this.o1.angleOfLeastInterference);
      this.y1 = this.o1.y - 14 * d.sin(this.o1.angleOfLeastInterference);
      this.x2 = this.o2.x + 14 * d.cos(this.o2.angleOfLeastInterference);
      this.y2 = this.o2.y - 14 * d.sin(this.o2.angleOfLeastInterference);
      a.font = e.getFontString(
        f.text_font_size,
        f.text_font_families,
        f.text_font_bold,
        f.text_font_italic
      );
      let c = this.label,
        b = a.measureText(c).width;
      this.isLassoed &&
        ((a.fillStyle = f.colorHover),
        a.fillRect(
          this.x1 - b / 2 - 3,
          this.y1 - f.text_font_size / 2 - 3,
          b + 6,
          f.text_font_size + 6
        ),
        a.fillRect(
          this.x2 - b / 2 - 3,
          this.y2 - f.text_font_size / 2 - 3,
          b + 6,
          f.text_font_size + 6
        ));
      let l = this.error ? f.colorError : f.shapes_color;
      if (this.isHover || this.isSelected)
        l = this.isHover ? f.colorHover : f.colorSelect;
      a.fillStyle = l;
      a.fillRect(
        this.x1 - b / 2 - 1,
        this.y1 - f.text_font_size / 2 - 1,
        b + 2,
        f.text_font_size + 2
      );
      a.fillRect(
        this.x2 - b / 2 - 1,
        this.y2 - f.text_font_size / 2 - 1,
        b + 2,
        f.text_font_size + 2
      );
      a.textAlign = "center";
      a.textBaseline = "middle";
      a.fillStyle = f.backgroundColor;
      a.fillText(c, this.x1, this.y1);
      a.fillText(c, this.x2, this.y2);
    }
  };
  m.getPoints = function () {
    return [new k.Point(this.x1, this.y1), new k.Point(this.x2, this.y2)];
  };
  m.isOver = function (a, f) {
    return this.x1
      ? a.distance({ x: this.x1, y: this.y1 }) < f ||
          a.distance({ x: this.x2, y: this.y2 }) < f
      : !1;
  };
})(
  ChemDoodle.extensions,
  ChemDoodle.math,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  Math
);
(function (e, m, k, p, d, g) {
  p.Bracket = function (a, f) {
    this.p1 = a ? a : new k.Point();
    this.p2 = f ? f : new k.Point();
  };
  p = p.Bracket.prototype = new p._Shape();
  p.charge = 0;
  p.mult = 0;
  p.repeat = 0;
  p.draw = function (a, f) {
    let c = d.min(this.p1.x, this.p2.x),
      b = d.max(this.p1.x, this.p2.x),
      l = d.min(this.p1.y, this.p2.y),
      h = d.max(this.p1.y, this.p2.y),
      g = h - l;
    var p = g / 10;
    a.beginPath();
    a.moveTo(c + p, l);
    a.lineTo(c, l);
    a.lineTo(c, h);
    a.lineTo(c + p, h);
    a.moveTo(b - p, h);
    a.lineTo(b, h);
    a.lineTo(b, l);
    a.lineTo(b - p, l);
    this.isLassoed &&
      ((p = a.createLinearGradient(this.p1.x, this.p1.y, this.p2.x, this.p2.y)),
      p.addColorStop(0, "rgba(212, 99, 0, 0)"),
      p.addColorStop(0.5, "rgba(212, 99, 0, 0.8)"),
      p.addColorStop(1, "rgba(212, 99, 0, 0)"),
      (a.lineWidth = f.shapes_lineWidth + 5),
      (a.strokeStyle = p),
      (a.lineJoin = "miter"),
      (a.lineCap = "square"),
      a.stroke());
    a.strokeStyle = f.shapes_color;
    a.lineWidth = f.shapes_lineWidth;
    a.lineJoin = "miter";
    a.lineCap = "butt";
    a.stroke();
    0 !== this.charge &&
      ((a.fillStyle = f.text_color),
      (a.textAlign = "left"),
      (a.textBaseline = "alphabetic"),
      (a.font = e.getFontString(f.text_font_size, f.text_font_families)),
      (p = this.charge.toFixed(0)),
      (p =
        "1" === p
          ? "+"
          : "-1" === p
          ? "\u2013"
          : p.startsWith("-")
          ? p.substring(1) + "\u2013"
          : p + "+"),
      a.fillText(p, b + 5, l + 5));
    0 !== this.mult &&
      ((a.fillStyle = f.text_color),
      (a.textAlign = "right"),
      (a.textBaseline = "middle"),
      (a.font = e.getFontString(f.text_font_size, f.text_font_families)),
      a.fillText(this.mult.toFixed(0), c - 5, l + g / 2));
    0 !== this.repeat &&
      ((a.fillStyle = f.text_color),
      (a.textAlign = "left"),
      (a.textBaseline = "top"),
      (a.font = e.getFontString(f.text_font_size, f.text_font_families)),
      (f = this.repeat.toFixed(0)),
      a.fillText(f, b + 5, h - 5));
  };
  p.getPoints = function () {
    return [this.p1, this.p2];
  };
  p.isOver = function (a, f) {
    return (
      m.isBetween(a.x, this.p1.x, this.p2.x) &&
      m.isBetween(a.y, this.p1.y, this.p2.y)
    );
  };
})(
  ChemDoodle.extensions,
  ChemDoodle.math,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  Math
);
(function (e, m, k, p, d, g, a) {
  d.RepeatUnit = function (a, b) {
    this.b1 = a;
    this.b2 = b;
    this.n1 = 1;
    this.n2 = 4;
    this.contents = [];
    this.ps = [];
  };
  m = d.RepeatUnit.prototype = new d._Shape();
  m.drawDecorations = function (a, b) {
    if (this.isHover)
      for (let c = 0, f = this.contents.length; c < f; c++) {
        b = this.contents[c];
        let f = a.createRadialGradient(b.x - 1, b.y - 1, 0, b.x, b.y, 7);
        f.addColorStop(0, "rgba(212, 99, 0, 0)");
        f.addColorStop(0.7, "rgba(212, 99, 0, 0.8)");
        a.fillStyle = f;
        a.beginPath();
        a.arc(b.x, b.y, 5, 0, 2 * g.PI, !1);
        a.fill();
      }
  };
  let f = function (a, b, f, d, e) {
    b = [];
    var c =
      0 < e.length
        ? -1 === e.indexOf(f.a1)
          ? f.a2
          : f.a1
        : f.a1.distance(d.getCenter()) < f.a2.distance(d.getCenter())
        ? f.a1
        : f.a2;
    d = c.angle(f.getNeighbor(c));
    var l = d + g.PI / 2;
    f = f.getLength() / (1 < e.length ? 4 : 2);
    e = c.x + f * g.cos(d);
    c = c.y - f * g.sin(d);
    var h = 10 * g.cos(l),
      r = 10 * g.sin(l);
    l = e + h;
    f = c - r;
    e -= h;
    c += r;
    r = -4 * g.cos(d);
    var k = -4 * g.sin(d);
    d = l + r;
    h = f - k;
    r = e + r;
    k = c - k;
    a.beginPath();
    a.moveTo(d, h);
    a.lineTo(l, f);
    a.lineTo(e, c);
    a.lineTo(r, k);
    a.stroke();
    b.push(new p.Point(l, f));
    b.push(new p.Point(e, c));
    return b;
  };
  m.draw = function (a, b) {
    if (this.b1 && this.b2) {
      var c = this.error ? b.colorError : b.shapes_color;
      if (this.isHover || this.isSelected)
        c = this.isHover ? b.colorHover : b.colorSelect;
      a.strokeStyle = c;
      a.fillStyle = a.strokeStyle;
      a.lineWidth = b.shapes_lineWidth;
      a.lineJoin = "miter";
      a.lineCap = "butt";
      c = f(a, b, this.b1, this.b2, this.contents);
      let d = f(a, b, this.b2, this.b1, this.contents);
      this.ps = c.concat(d);
      this.b1.getCenter().x > this.b2.getCenter().x
        ? (this.textPos =
            this.ps[0].x > this.ps[1].x + 5 ? this.ps[0] : this.ps[1])
        : (this.textPos =
            this.ps[2].x > this.ps[3].x + 5 ? this.ps[2] : this.ps[3]);
      !this.error &&
        0 < this.contents.length &&
        ((a.font = e.getFontString(
          b.text_font_size,
          b.text_font_families,
          b.text_font_bold,
          b.text_font_italic
        )),
        (a.fillStyle = this.isHover ? b.colorHover : b.text_color),
        (a.textAlign = "left"),
        (a.textBaseline = "bottom"),
        a.fillText(
          this.n1 + "-" + this.n2,
          this.textPos.x + 2,
          this.textPos.y + 2
        ));
    }
  };
  m.getPoints = function () {
    return this.ps;
  };
  m.isOver = function (a, b) {
    return !1;
  };
  m.setContents = function (c) {
    this.contents = [];
    let b = c.getMoleculeByAtom(this.b1.a1);
    c = c.getMoleculeByAtom(this.b2.a1);
    if (b && b === c) {
      var f = (c = 0);
      for (let a = 0, l = b.rings.length; a < l; a++) {
        var d = b.rings[a];
        for (let b = 0, a = d.bonds.length; b < a; b++) {
          var g = d.bonds[b];
          g === this.b1 ? c++ : g === this.b2 && f++;
        }
      }
      c = 1 === c && 1 === f && this.b1.ring === this.b2.ring;
      this.contents.flippable = c;
      if ((this.b1.ring === a && this.b2.ring === a) || c)
        for (let a = 0, l = b.atoms.length; a < l; a++) {
          g = d = f = !1;
          for (let a = 0, c = b.bonds.length; a < c; a++)
            b.bonds[a].visited = !1;
          let l = new p.Queue(),
            h = b.atoms[a];
          for (l.enqueue(h); !(l.isEmpty() || (f && d)); ) {
            let a = l.dequeue();
            c &&
              ((!this.flip && a === this.b1.a1) ||
                (this.flip && a === this.b1.a2)) &&
              (g = !0);
            for (let c = 0, h = b.bonds.length; c < h; c++) {
              let h = b.bonds[c];
              if (h.a1 === a || h.a2 === a)
                h === this.b1
                  ? (f = !0)
                  : h === this.b2
                  ? (d = !0)
                  : h.visited ||
                    ((h.visited = !0), l.enqueue(h.getNeighbor(a)));
            }
          }
          f && d && (!c || g) && this.contents.push(h);
        }
    }
  };
})(
  ChemDoodle.extensions,
  ChemDoodle.math,
  ChemDoodle.lib.jsBezier,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  Math
);
(function (e, m, k, p, d, g) {
  p.Line = function (a, c) {
    this.p1 = a ? a : new k.Point();
    this.p2 = c ? c : new k.Point();
    this.reactants = [];
    this.products = [];
  };
  p.Line.ARROW_SYNTHETIC = "synthetic";
  p.Line.ARROW_RETROSYNTHETIC = "retrosynthetic";
  p.Line.ARROW_RESONANCE = "resonance";
  p.Line.ARROW_EQUILIBRIUM = "equilibrium";
  let a = (p.Line.prototype = new p._Shape());
  a.arrowType = g;
  a.topText = g;
  a.bottomText = g;
  a.draw = function (a, c) {
    if (this.isLassoed) {
      var b = a.createLinearGradient(
        this.p1.x,
        this.p1.y,
        this.p2.x,
        this.p2.y
      );
      b.addColorStop(0, "rgba(212, 99, 0, 0)");
      b.addColorStop(0.5, "rgba(212, 99, 0, 0.8)");
      b.addColorStop(1, "rgba(212, 99, 0, 0)");
      var f = this.p1.angle(this.p2) + d.PI / 2,
        h = d.cos(f),
        g = d.sin(f);
      f = this.p1.x - 2.5 * h;
      var v = this.p1.y + 2.5 * g,
        n = this.p1.x + 2.5 * h,
        u = this.p1.y - 2.5 * g,
        k = this.p2.x + 2.5 * h,
        m = this.p2.y - 2.5 * g;
      h = this.p2.x - 2.5 * h;
      g = this.p2.y + 2.5 * g;
      a.fillStyle = b;
      a.beginPath();
      a.moveTo(f, v);
      a.lineTo(n, u);
      a.lineTo(k, m);
      a.lineTo(h, g);
      a.closePath();
      a.fill();
    }
    a.strokeStyle = c.shapes_color;
    a.fillStyle = c.shapes_color;
    a.lineWidth = c.shapes_lineWidth;
    a.lineJoin = "miter";
    a.lineCap = "butt";
    if (this.p1.x !== this.p2.x || this.p1.y !== this.p2.y) {
      if (this.arrowType === p.Line.ARROW_RETROSYNTHETIC) {
        f = 2 * d.sqrt(2);
        b = c.shapes_arrowLength_2D / f;
        n = this.p1.angle(this.p2);
        u = n + d.PI / 2;
        f = c.shapes_arrowLength_2D / f;
        v = d.cos(n);
        n = d.sin(n);
        let l = d.cos(u),
          e = d.sin(u);
        u = this.p1.x - l * b;
        k = this.p1.y + e * b;
        m = this.p1.x + l * b;
        h = this.p1.y - e * b;
        g = this.p2.x + l * b - v * f;
        var x = this.p2.y - e * b + n * f,
          t = this.p2.x - l * b - v * f,
          z = this.p2.y + e * b + n * f,
          A = this.p2.x + l * b * 2 - v * f * 2;
        let r = this.p2.y - e * b * 2 + n * f * 2;
        v = this.p2.x - l * b * 2 - v * f * 2;
        b = this.p2.y + e * b * 2 + n * f * 2;
        a.beginPath();
        a.moveTo(m, h);
        a.lineTo(g, x);
        a.moveTo(A, r);
        a.lineTo(this.p2.x, this.p2.y);
        a.lineTo(v, b);
        a.moveTo(t, z);
        a.lineTo(u, k);
      } else
        this.arrowType === p.Line.ARROW_EQUILIBRIUM
          ? ((b = 2 * d.sqrt(2)),
            (x = c.shapes_arrowLength_2D / b / 2),
            (v = this.p1.angle(this.p2)),
            (u = v + d.PI / 2),
            (b = (2 * c.shapes_arrowLength_2D) / d.sqrt(3)),
            (f = d.cos(v)),
            (v = d.sin(v)),
            (n = d.cos(u)),
            (u = d.sin(u)),
            (k = this.p1.x - n * x),
            (m = this.p1.y + u * x),
            (t = this.p1.x + n * x),
            (z = this.p1.y - u * x),
            (h = this.p2.x + n * x),
            (g = this.p2.y - u * x),
            (A = this.p2.x - n * x),
            (x = this.p2.y + u * x),
            a.beginPath(),
            a.moveTo(t, z),
            a.lineTo(h, g),
            a.moveTo(A, x),
            a.lineTo(k, m),
            a.stroke(),
            (x = h - f * b * 0.8),
            (t = g + v * b * 0.8),
            (z = h + (n * c.shapes_arrowLength_2D) / 3 - f * b),
            (A = g - (u * c.shapes_arrowLength_2D) / 3 + v * b),
            a.beginPath(),
            a.moveTo(h, g),
            a.lineTo(z, A),
            a.lineTo(x, t),
            a.closePath(),
            a.fill(),
            a.stroke(),
            (x = k + f * b * 0.8),
            (t = m - v * b * 0.8),
            (z = k - (n * c.shapes_arrowLength_2D) / 3 + f * b),
            (A = m + (u * c.shapes_arrowLength_2D) / 3 - v * b),
            a.beginPath(),
            a.moveTo(k, m),
            a.lineTo(z, A),
            a.lineTo(x, t),
            a.closePath(),
            a.fill())
          : this.arrowType === p.Line.ARROW_SYNTHETIC
          ? ((v = this.p1.angle(this.p2)),
            (n = v + d.PI / 2),
            (b = (2 * c.shapes_arrowLength_2D) / d.sqrt(3)),
            (f = d.cos(v)),
            (v = d.sin(v)),
            (h = d.cos(n)),
            (g = d.sin(n)),
            a.beginPath(),
            a.moveTo(this.p1.x, this.p1.y),
            a.lineTo(this.p2.x - (f * b) / 2, this.p2.y + (v * b) / 2),
            a.stroke(),
            (n = this.p2.x - f * b * 0.8),
            (u = this.p2.y + v * b * 0.8),
            (k = this.p2.x + (h * c.shapes_arrowLength_2D) / 3 - f * b),
            (m = this.p2.y - (g * c.shapes_arrowLength_2D) / 3 + v * b),
            (f = this.p2.x - (h * c.shapes_arrowLength_2D) / 3 - f * b),
            (b = this.p2.y + (g * c.shapes_arrowLength_2D) / 3 + v * b),
            a.beginPath(),
            a.moveTo(this.p2.x, this.p2.y),
            a.lineTo(f, b),
            a.lineTo(n, u),
            a.lineTo(k, m),
            a.closePath(),
            a.fill())
          : this.arrowType === p.Line.ARROW_RESONANCE
          ? ((v = this.p1.angle(this.p2)),
            (u = v + d.PI / 2),
            (b = (2 * c.shapes_arrowLength_2D) / d.sqrt(3)),
            (f = d.cos(v)),
            (v = d.sin(v)),
            (n = d.cos(u)),
            (u = d.sin(u)),
            a.beginPath(),
            a.moveTo(this.p1.x + (f * b) / 2, this.p1.y - (v * b) / 2),
            a.lineTo(this.p2.x - (f * b) / 2, this.p2.y + (v * b) / 2),
            a.stroke(),
            (k = this.p2.x - f * b * 0.8),
            (m = this.p2.y + v * b * 0.8),
            (h = this.p2.x + (n * c.shapes_arrowLength_2D) / 3 - f * b),
            (g = this.p2.y - (u * c.shapes_arrowLength_2D) / 3 + v * b),
            (x = this.p2.x - (n * c.shapes_arrowLength_2D) / 3 - f * b),
            (t = this.p2.y + (u * c.shapes_arrowLength_2D) / 3 + v * b),
            a.beginPath(),
            a.moveTo(this.p2.x, this.p2.y),
            a.lineTo(x, t),
            a.lineTo(k, m),
            a.lineTo(h, g),
            a.closePath(),
            a.fill(),
            a.stroke(),
            (k = this.p1.x + f * b * 0.8),
            (m = this.p1.y - v * b * 0.8),
            (h = this.p1.x - (n * c.shapes_arrowLength_2D) / 3 + f * b),
            (g = this.p1.y + (u * c.shapes_arrowLength_2D) / 3 - v * b),
            (x = this.p1.x + (n * c.shapes_arrowLength_2D) / 3 + f * b),
            (t = this.p1.y - (u * c.shapes_arrowLength_2D) / 3 - v * b),
            a.beginPath(),
            a.moveTo(this.p1.x, this.p1.y),
            a.lineTo(x, t),
            a.lineTo(k, m),
            a.lineTo(h, g),
            a.closePath(),
            a.fill())
          : (a.beginPath(),
            a.moveTo(this.p1.x, this.p1.y),
            a.lineTo(this.p2.x, this.p2.y));
      a.stroke();
      if (this.topText || this.bottomText)
        (a.font = e.getFontString(
          c.text_font_size,
          c.text_font_families,
          c.text_font_bold,
          c.text_font_italic
        )),
          (a.fillStyle = c.text_color);
      this.topText &&
        ((a.textAlign = "center"),
        (a.textBaseline = "bottom"),
        a.fillText(this.topText, (this.p1.x + this.p2.x) / 2, this.p1.y - 5));
      this.bottomText &&
        ((a.textAlign = "center"),
        (a.textBaseline = "top"),
        a.fillText(
          this.bottomText,
          (this.p1.x + this.p2.x) / 2,
          this.p1.y + 5
        ));
    }
  };
  a.getPoints = function () {
    return [this.p1, this.p2];
  };
  a.isOver = function (a, c) {
    a = m.distanceFromPointToLineInclusive(a, this.p1, this.p2);
    return -1 !== a && a < c;
  };
})(
  ChemDoodle.extensions,
  ChemDoodle.math,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  Math
);
(function (e, m, k, p, d, g) {
  let a = function (b) {
      let a = [];
      if (b instanceof k.Atom)
        if (0 === b.bondNumber) a.push(d.PI);
        else {
          if (b.angles) {
            if (1 === b.angles.length) a.push(b.angles[0] + d.PI);
            else {
              for (let c = 1, f = b.angles.length; c < f; c++)
                a.push(b.angles[c - 1] + (b.angles[c] - b.angles[c - 1]) / 2);
              var c = b.angles[b.angles.length - 1];
              a.push(c + (b.angles[0] + 2 * d.PI - c) / 2);
            }
            b.largestAngle > d.PI && (a = [b.angleOfLeastInterference]);
            if (b.bonds)
              for (let f = 0, d = b.bonds.length; f < d; f++)
                if (
                  ((c = b.bonds[f]),
                  2 === c.bondOrder &&
                    ((c = c.getNeighbor(b)), "O" === c.label))
                ) {
                  a = [c.angle(b)];
                  break;
                }
          }
        }
      else
        (b = b.a1.angle(b.a2)),
          a.push(b + d.PI / 2),
          a.push(b + (3 * d.PI) / 2);
      for (let b = 0, c = a.length; b < c; b++) {
        for (; a[b] > 2 * d.PI; ) a[b] -= 2 * d.PI;
        for (; 0 > a[b]; ) a[b] += 2 * d.PI;
      }
      return a;
    },
    f = function (b, a) {
      let c = 3;
      if (b instanceof k.Atom) {
        if (
          (b.isLabelVisible(a) && (c = 8),
          0 !== b.charge || 0 !== b.numRadical || 0 !== b.numLonePair)
        )
          c = 13;
      } else b instanceof k.Point ? (c = 0) : 1 < b.bondOrder && (c = 5);
      return c;
    },
    c = function (b, a, c, g, e, n, p, w, m, x) {
      var h = n.angle(e),
        l = p.angle(w),
        r = d.cos(h);
      h = d.sin(h);
      var u = f(c, a);
      e.x -= r * u;
      e.y += h * u;
      u = l + d.PI / 2;
      c = (2 * a.shapes_arrowLength_2D) / d.sqrt(3);
      r = d.cos(l);
      h = d.sin(l);
      let v = d.cos(u),
        y = d.sin(u);
      w.x -= 5 * r;
      w.y += 5 * h;
      l = new k.Point(w.x, w.y);
      u = f(g, a) / 3;
      l.x -= r * u;
      l.y += h * u;
      w.x -= r * (0.8 * c + u);
      w.y += h * (0.8 * c + u);
      g = l.x - r * c * 0.8;
      u = l.y + h * c * 0.8;
      let J = new k.Point(
        l.x + (v * a.shapes_arrowLength_2D) / 3 - r * c,
        l.y - (y * a.shapes_arrowLength_2D) / 3 + h * c
      );
      a = new k.Point(
        l.x - (v * a.shapes_arrowLength_2D) / 3 - r * c,
        l.y + (y * a.shapes_arrowLength_2D) / 3 + h * c
      );
      h = r = !0;
      1 === m && (J.distance(n) > a.distance(n) ? (h = !1) : (r = !1));
      b.beginPath();
      b.moveTo(l.x, l.y);
      h && b.lineTo(a.x, a.y);
      b.lineTo(g, u);
      r && b.lineTo(J.x, J.y);
      b.closePath();
      b.fill();
      b.stroke();
      b.beginPath();
      b.moveTo(e.x, e.y);
      b.bezierCurveTo(n.x, n.y, p.x, p.y, w.x, w.y);
      b.stroke();
      x.push([e, n, p, w]);
    };
  p.Pusher = function (b, a, c) {
    this.o1 = b;
    this.o2 = a;
    this.numElectron = c ? c : 1;
  };
  p = p.Pusher.prototype = new p._Shape();
  p.drawDecorations = function (b, a) {
    if (this.isHover) {
      var c =
          this.o1 instanceof k.Atom
            ? new k.Point(this.o1.x, this.o1.y)
            : this.o1.getCenter(),
        f =
          this.o2 instanceof k.Atom
            ? new k.Point(this.o2.x, this.o2.y)
            : this.o2.getCenter();
      c = [c, f];
      for (let d = 0, h = c.length; d < h; d++)
        (f = c[d]), this.drawAnchor(b, a, f, f === this.hoverPoint);
    }
  };
  p.draw = function (b, f) {
    if (this.o1 && this.o2) {
      b.strokeStyle = f.shapes_color;
      b.fillStyle = f.shapes_color;
      b.lineWidth = f.shapes_lineWidth;
      b.lineJoin = "miter";
      b.lineCap = "butt";
      let r =
          this.o1 instanceof k.Atom
            ? new k.Point(this.o1.x, this.o1.y)
            : this.o1.getCenter(),
        u =
          this.o2 instanceof k.Atom
            ? new k.Point(this.o2.x, this.o2.y)
            : this.o2.getCenter();
      var h = a(this.o1),
        g = a(this.o2);
      let v, m;
      var l = Infinity;
      for (let b = 0, a = h.length; b < a; b++)
        for (let a = 0, c = g.length; a < c; a++) {
          var n = new k.Point(r.x + 35 * d.cos(h[b]), r.y - 35 * d.sin(h[b])),
            p = new k.Point(u.x + 35 * d.cos(g[a]), u.y - 35 * d.sin(g[a])),
            w = n.distance(p);
          w < l && ((l = w), (v = n), (m = p));
        }
      this.caches = [];
      -1 === this.numElectron
        ? ((n = r.distance(u) / 2),
          (g = r.angle(u)),
          (h = g + d.PI / 2),
          (p = d.cos(g)),
          (w = d.sin(g)),
          (g = new k.Point(r.x + (n - 1) * p, r.y - (n - 1) * w)),
          (l = new k.Point(
            g.x + 35 * d.cos(h + d.PI / 6),
            g.y - 35 * d.sin(h + d.PI / 6)
          )),
          (n = new k.Point(r.x + (n + 1) * p, r.y - (n + 1) * w)),
          (h = new k.Point(
            n.x + 35 * d.cos(h - d.PI / 6),
            n.y - 35 * d.sin(h - d.PI / 6)
          )),
          c(b, f, this.o1, g, r, v, l, g, 1, this.caches),
          c(b, f, this.o2, n, u, m, h, n, 1, this.caches))
        : (e.intersectLines(r.x, r.y, v.x, v.y, u.x, u.y, m.x, m.y) &&
            ((h = v), (v = m), (m = h)),
          (h = v.angle(r)),
          (g = m.angle(u)),
          (l = d.max(h, g) - d.min(h, g)),
          0.001 > d.abs(l - d.PI) &&
            this.o1.molCenter === this.o2.molCenter &&
            ((h += d.PI / 2),
            (g -= d.PI / 2),
            (v.x = r.x + 35 * d.cos(h + d.PI)),
            (v.y = r.y - 35 * d.sin(h + d.PI)),
            (m.x = u.x + 35 * d.cos(g + d.PI)),
            (m.y = u.y - 35 * d.sin(g + d.PI))),
          c(b, f, this.o1, this.o2, r, v, m, u, this.numElectron, this.caches));
    }
  };
  p.getPoints = function () {
    return [];
  };
  p.isOver = function (b, a) {
    for (let c = 0, f = this.caches.length; c < f; c++)
      if (m.distanceFromCurve(b, this.caches[c]).distance < a) return !0;
    return !1;
  };
})(
  ChemDoodle.math,
  ChemDoodle.lib.jsBezier,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  Math
);
(function (e, m, k, p, d) {
  let g = new m.Bond();
  k.VAP = function (a, f) {
    this.asterisk = new m.Atom("O", a, f);
    this.substituent;
    this.bondType = 1;
    this.attachments = [];
  };
  e = k.VAP.prototype = new k._Shape();
  e.drawDecorations = function (a, f) {
    if (this.isHover || this.isSelected) {
      a.strokeStyle = this.isHover ? f.colorHover : f.colorSelect;
      a.lineWidth = 1.2;
      if (this.hoverBond) {
        let c = 2 * p.PI,
          b =
            (this.asterisk.angleForStupidCanvasArcs(this.hoverBond) +
              p.PI / 2) %
            c;
        a.strokeStyle = this.isHover ? f.colorHover : f.colorSelect;
        a.beginPath();
        f = (b + p.PI) % c;
        f %= 2 * p.PI;
        a.arc(this.asterisk.x, this.asterisk.y, 7, b, f, !1);
        a.stroke();
        a.beginPath();
        b += p.PI;
        f = (b + p.PI) % c;
        a.arc(this.hoverBond.x, this.hoverBond.y, 7, b, f, !1);
      } else
        a.beginPath(),
          a.arc(this.asterisk.x, this.asterisk.y, 7, 0, 2 * p.PI, !1);
      a.stroke();
    }
  };
  e.draw = function (a, f) {
    a.strokeStyle = this.error ? f.colorError : f.shapes_color;
    a.lineWidth = 1;
    var c = p.sqrt(3) / 2;
    a.beginPath();
    a.moveTo(this.asterisk.x, this.asterisk.y - 4);
    a.lineTo(this.asterisk.x, this.asterisk.y + 4);
    a.moveTo(this.asterisk.x - 4 * c, this.asterisk.y - 2);
    a.lineTo(this.asterisk.x + 4 * c, this.asterisk.y + 2);
    a.moveTo(this.asterisk.x - 4 * c, this.asterisk.y + 2);
    a.lineTo(this.asterisk.x + 4 * c, this.asterisk.y - 2);
    a.stroke();
    this.asterisk.textBounds = [];
    this.asterisk.textBounds.push({
      x: this.asterisk.x - 4,
      y: this.asterisk.y - 4,
      w: 8,
      h: 8,
    });
    c = f.bonds_color;
    this.error && (f.bonds_color = f.colorError);
    g.a1 = this.asterisk;
    this.substituent &&
      ((g.a2 = this.substituent), (g.bondOrder = this.bondType), g.draw(a, f));
    g.bondOrder = 0;
    this.error || (f.bonds_color = f.shapes_color);
    for (let b = 0, c = this.attachments.length; b < c; b++)
      (g.a2 = this.attachments[b]), g.draw(a, f);
    f.bonds_color = c;
  };
  e.getPoints = function () {
    return [this.asterisk];
  };
  e.isOver = function (a, f) {
    return !1;
  };
})(ChemDoodle.math, ChemDoodle.structures, ChemDoodle.structures.d2, Math);
(function (e, m, k) {
  e._Mesh = function () {};
  e = e._Mesh.prototype;
  e.storeData = function (e, d, g) {
    this.positionData = e;
    this.normalData = d;
    this.indexData = g;
  };
  e.setupBuffers = function (e) {
    this.vertexPositionBuffer = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexPositionBuffer);
    e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array(this.positionData),
      e.STATIC_DRAW
    );
    this.vertexPositionBuffer.itemSize = 3;
    this.vertexPositionBuffer.numItems = this.positionData.length / 3;
    this.vertexNormalBuffer = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexNormalBuffer);
    e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array(this.normalData),
      e.STATIC_DRAW
    );
    this.vertexNormalBuffer.itemSize = 3;
    this.vertexNormalBuffer.numItems = this.normalData.length / 3;
    this.indexData &&
      ((this.vertexIndexBuffer = e.createBuffer()),
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer),
      e.bufferData(
        e.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(this.indexData),
        e.STATIC_DRAW
      ),
      (this.vertexIndexBuffer.itemSize = 1),
      (this.vertexIndexBuffer.numItems = this.indexData.length));
    if (this.partitions)
      for (let d = 0, g = this.partitions.length; d < g; d++) {
        let a = this.partitions[d],
          f = this.generateBuffers(
            e,
            a.positionData,
            a.normalData,
            a.indexData
          );
        a.vertexPositionBuffer = f[0];
        a.vertexNormalBuffer = f[1];
        a.vertexIndexBuffer = f[2];
      }
  };
  e.generateBuffers = function (e, d, g, a) {
    let f = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, f);
    e.bufferData(e.ARRAY_BUFFER, new Float32Array(d), e.STATIC_DRAW);
    f.itemSize = 3;
    f.numItems = d.length / 3;
    d = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, d);
    e.bufferData(e.ARRAY_BUFFER, new Float32Array(g), e.STATIC_DRAW);
    d.itemSize = 3;
    d.numItems = g.length / 3;
    let c;
    a &&
      ((c = e.createBuffer()),
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, c),
      e.bufferData(e.ELEMENT_ARRAY_BUFFER, new Uint16Array(a), e.STATIC_DRAW),
      (c.itemSize = 1),
      (c.numItems = a.length));
    return [f, d, c];
  };
  e.bindBuffers = function (e) {
    this.vertexPositionBuffer || this.setupBuffers(e);
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexPositionBuffer);
    e.vertexAttribPointer(
      e.shader.vertexPositionAttribute,
      this.vertexPositionBuffer.itemSize,
      e.FLOAT,
      !1,
      0,
      0
    );
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexNormalBuffer);
    e.vertexAttribPointer(
      e.shader.vertexNormalAttribute,
      this.vertexNormalBuffer.itemSize,
      e.FLOAT,
      !1,
      0,
      0
    );
    this.vertexIndexBuffer &&
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
  };
})(ChemDoodle.structures.d3, Math);
(function (e, m) {
  e._Measurement = function () {};
  e = e._Measurement.prototype = new e._Mesh();
  e.render = function (e, p) {
    e.shader.setMatrixUniforms(e);
    p.measurement_update_3D && (this.text = this.vertexPositionBuffer = m);
    this.vertexPositionBuffer || this.calculateData(p);
    this.bindBuffers(e);
    e.material.setDiffuseColor(e, p.shapes_color);
    e.lineWidth(p.shapes_lineWidth);
    e.drawElements(
      e.LINES,
      this.vertexIndexBuffer.numItems,
      e.UNSIGNED_SHORT,
      0
    );
  };
  e.renderText = function (e, p) {
    e.shader.setMatrixUniforms(e);
    this.text || (this.text = this.getText(p));
    p = { position: [], texCoord: [], translation: [] };
    e.textImage.pushVertexData(this.text.value, this.text.pos, 1, p);
    e.textMesh.storeData(e, p.position, p.texCoord, p.translation);
    e.textImage.useTexture(e);
    e.textMesh.render(e);
  };
})(ChemDoodle.structures.d3);
(function (e, m, k, p, d, g, a, f) {
  k.Angle = function (a, b, f) {
    this.a1 = a;
    this.a2 = b;
    this.a3 = f;
  };
  e = k.Angle.prototype = new k._Measurement();
  e.calculateData = function (c) {
    let b = [],
      f = [],
      e = [];
    var g = this.a2.distance3D(this.a1),
      p = this.a2.distance3D(this.a3);
    this.distUse = d.min(g, p) / 2;
    this.vec1 = a.normalize([
      this.a1.x - this.a2.x,
      this.a1.y - this.a2.y,
      this.a1.z - this.a2.z,
    ]);
    this.vec2 = a.normalize([
      this.a3.x - this.a2.x,
      this.a3.y - this.a2.y,
      this.a3.z - this.a2.z,
    ]);
    this.angle = m.vec3AngleFrom(this.vec1, this.vec2);
    g = a.normalize(a.cross(this.vec1, this.vec2, []));
    g = a.normalize(a.cross(g, this.vec1, []));
    c = c.measurement_angleBands_3D;
    for (p = 0; p <= c; ++p) {
      var n = (this.angle * p) / c,
        u = a.scale(this.vec1, d.cos(n), []);
      n = a.scale(g, d.sin(n), []);
      u = a.scale(a.normalize(a.add(u, n, [])), this.distUse);
      b.push(this.a2.x + u[0], this.a2.y + u[1], this.a2.z + u[2]);
      f.push(0, 0, 0);
      p < c && e.push(p, p + 1);
    }
    this.storeData(b, f, e);
  };
  e.getText = function (c) {
    c = a.scale(
      a.normalize(a.add(this.vec1, this.vec2, [])),
      this.distUse + 0.3
    );
    return {
      pos: [this.a2.x + c[0], this.a2.y + c[1], this.a2.z + c[2]],
      value: [p.angleBounds(this.angle, !0).toFixed(2), " \u00b0"].join(""),
    };
  };
})(
  ChemDoodle.ELEMENT,
  ChemDoodle.extensions,
  ChemDoodle.structures.d3,
  ChemDoodle.math,
  Math,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3
);
(function (e, m, k) {
  e.Arrow = function (e, d) {
    let g = [],
      a = [];
    for (var f = 0; f <= d; f++) {
      var c = (2 * f * m.PI) / d,
        b = m.sin(c);
      c = m.cos(c);
      a.push(
        0,
        0,
        -1,
        0,
        0,
        -1,
        c,
        b,
        0,
        c,
        b,
        0,
        0,
        0,
        -1,
        0,
        0,
        -1,
        c,
        b,
        1,
        c,
        b,
        1
      );
      g.push(
        0,
        0,
        0,
        e * c,
        e * b,
        0,
        e * c,
        e * b,
        0,
        e * c,
        e * b,
        2,
        e * c,
        e * b,
        2,
        e * c * 2,
        e * b * 2,
        2,
        e * c * 2,
        e * b * 2,
        2,
        0,
        0,
        3
      );
    }
    e = [];
    for (f = 0; f < d; f++) {
      b = 8 * f;
      for (let a = 0, f = 7; a < f; a++) {
        c = a + b;
        let d = c + f + 2;
        e.push(c, d, c + 1, d, c, d - 1);
      }
    }
    this.storeData(g, a, e);
  };
  e.Arrow.prototype = new e._Mesh();
})(ChemDoodle.structures.d3, Math);
(function (e, m, k) {
  e.Box = function (e, d, g) {
    e /= 2;
    g /= 2;
    let a = [],
      f = [];
    a.push(e, d, -g);
    a.push(e, d, -g);
    a.push(-e, d, -g);
    a.push(e, d, g);
    a.push(-e, d, g);
    a.push(-e, d, g);
    for (var c = 6; c--; f.push(0, 1, 0));
    a.push(-e, d, g);
    a.push(-e, d, g);
    a.push(-e, 0, g);
    a.push(e, d, g);
    a.push(e, 0, g);
    a.push(e, 0, g);
    for (c = 6; c--; f.push(0, 0, 1));
    a.push(e, d, g);
    a.push(e, d, g);
    a.push(e, 0, g);
    a.push(e, d, -g);
    a.push(e, 0, -g);
    a.push(e, 0, -g);
    for (c = 6; c--; f.push(1, 0, 0));
    a.push(e, d, -g);
    a.push(e, d, -g);
    a.push(e, 0, -g);
    a.push(-e, d, -g);
    a.push(-e, 0, -g);
    a.push(-e, 0, -g);
    for (c = 6; c--; f.push(0, 0, -1));
    a.push(-e, d, -g);
    a.push(-e, d, -g);
    a.push(-e, 0, -g);
    a.push(-e, d, g);
    a.push(-e, 0, g);
    a.push(-e, 0, g);
    for (d = 6; d--; f.push(-1, 0, 0));
    a.push(-e, 0, g);
    a.push(-e, 0, g);
    a.push(-e, 0, -g);
    a.push(e, 0, g);
    a.push(e, 0, -g);
    a.push(e, 0, -g);
    for (e = 6; e--; f.push(0, -1, 0));
    this.storeData(a, f);
  };
  e.Box.prototype = new e._Mesh();
})(ChemDoodle.structures.d3, Math);
(function (e, m, k, p, d, g) {
  m.Camera = function () {
    this.fieldOfView = 45;
    this.aspect = 1;
    this.near = 0.1;
    this.far = 1e4;
    this.zoom = 1;
    this.viewMatrix = p.identity([]);
    this.projectionMatrix = p.identity([]);
  };
  e = m.Camera.prototype;
  e.perspectiveProjectionMatrix = function () {
    let a = d.tan((this.fieldOfView / 360) * d.PI) * this.near * this.zoom,
      f = this.aspect * a;
    return p.frustum(-f, f, -a, a, this.near, this.far, this.projectionMatrix);
  };
  e.orthogonalProjectionMatrix = function () {
    let a =
        d.tan((this.fieldOfView / 360) * d.PI) *
        ((this.far - this.near) / 2 + this.near) *
        this.zoom,
      f = this.aspect * a;
    return p.ortho(-f, f, -a, a, this.near, this.far, this.projectionMatrix);
  };
  e.updateProjectionMatrix = function (a) {
    return a
      ? this.perspectiveProjectionMatrix()
      : this.orthogonalProjectionMatrix();
  };
  e.focalLength = function () {
    return (this.far - this.near) / 2 + this.near;
  };
  e.zoomOut = function () {
    this.zoom = d.min(1.25 * this.zoom, 200);
  };
  e.zoomIn = function () {
    this.zoom = d.max(this.zoom / 1.25, 0.0025);
  };
})(
  ChemDoodle.math,
  ChemDoodle.structures.d3,
  ChemDoodle.lib.vec3,
  ChemDoodle.lib.mat4,
  Math
);
(function (e, m, k, p) {
  e.LineArrow = function () {
    this.storeData(
      [
        0, 0, -3, 0.1, 0, -2.8, 0, 0, -3, -0.1, 0, -2.8, 0, 0, -3, 0, 0, 3, 0,
        0, 3, 0.1, 0, 2.8, 0, 0, 3, -0.1, 0, 2.8,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ]
    );
  };
  e.LineArrow.prototype = new e._Mesh();
  e.Compass = function (d, a) {
    this.textImage = new e.TextImage();
    this.textImage.init(d);
    this.textImage.updateFont(
      d,
      a.text_font_size,
      a.text_font_families,
      a.text_font_bold,
      a.text_font_italic,
      a.text_font_stroke_3D
    );
    this.textMesh = new e.TextMesh();
    this.textMesh.init(d);
    var f = 3 / (a.compass_size_3D / d.canvas.clientHeight),
      c = m.tan((a.projectionPerspectiveVerticalFieldOfView_3D / 360) * m.PI);
    let b = f / c,
      g = m.max(b - f, 0.1);
    var h = d.canvas.clientWidth / d.canvas.clientHeight;
    let r;
    if (a.projectionPerspective_3D) {
      var p = g;
      r = k.frustum;
    } else (p = b), (r = k.ortho);
    let n = (p / d.canvas.clientHeight) * 2 * c;
    c *= p;
    p = -c;
    let u = h * p;
    h *= c;
    if (0 === a.compass_type_3D) {
      let b =
        (-(d.canvas.clientWidth - a.compass_size_3D) / 2 +
          this.textImage.charHeight) *
        n;
      a =
        (-(d.canvas.clientHeight - a.compass_size_3D) / 2 +
          this.textImage.charHeight) *
        n;
      u -= b;
      h -= b;
      p -= a;
      c -= a;
    }
    this.projectionMatrix = r(u, h, p, c, g, b + f);
    this.translationMatrix = k.translate(k.identity([]), [0, 0, -b]);
    f = { position: [], texCoord: [], translation: [] };
    this.textImage.pushVertexData("X", [3.5, 0, 0], 0, f);
    this.textImage.pushVertexData("Y", [0, 3.5, 0], 0, f);
    this.textImage.pushVertexData("Z", [0, 0, 3.5], 0, f);
    this.textMesh.storeData(d, f.position, f.texCoord, f.translation);
  };
  let d = e.Compass.prototype;
  d.renderArrow = function (d, a, f, c) {
    d.material.setDiffuseColor(d, f);
    d.shader.setModelViewMatrix(d, c);
    1 === a
      ? d.drawArrays(
          d.LINES,
          0,
          d.lineArrowBuffer.vertexPositionBuffer.numItems
        )
      : d.drawElements(
          d.TRIANGLES,
          d.arrowBuffer.vertexIndexBuffer.numItems,
          d.UNSIGNED_SHORT,
          0
        );
  };
  d.render = function (d, a) {
    d.shader.setProjectionMatrix(d, this.projectionMatrix);
    1 === a.compass_type_3D
      ? d.lineArrowBuffer.bindBuffers(d)
      : d.arrowBuffer.bindBuffers(d);
    d.material.setTempColors(
      d,
      a.bonds_materialAmbientColor_3D,
      p,
      a.bonds_materialSpecularColor_3D,
      a.bonds_materialShininess_3D
    );
    let f = k.multiply(this.translationMatrix, d.rotationMatrix, []),
      c = m.PI / 2;
    this.renderArrow(
      d,
      a.compass_type_3D,
      a.compass_axisXColor_3D,
      k.rotateY(f, c, [])
    );
    this.renderArrow(
      d,
      a.compass_type_3D,
      a.compass_axisYColor_3D,
      k.rotateX(f, -c, [])
    );
    this.renderArrow(d, a.compass_type_3D, a.compass_axisZColor_3D, f);
  };
  d.renderAxis = function (d) {
    d.shader.setProjectionMatrix(d, this.projectionMatrix);
    let a = k.multiply(this.translationMatrix, d.rotationMatrix, []);
    d.shader.setModelViewMatrix(d, a);
    this.textImage.useTexture(d);
    this.textMesh.render(d);
  };
})(ChemDoodle.structures.d3, Math, ChemDoodle.lib.mat4);
(function (e, m, k) {
  e.Cylinder = function (e, d, g, a) {
    let f = [],
      c = [];
    if (a) {
      for (a = 0; a <= g; a++) {
        var b = ((a % g) * 2 * m.PI) / g,
          l = m.cos(b);
        b = m.sin(b);
        c.push(0, -1, 0);
        f.push(0, 0, 0);
        c.push(0, -1, 0);
        f.push(e * l, 0, e * b);
      }
      for (a = 0; a <= g; a++)
        (b = ((a % g) * 2 * m.PI) / g),
          (l = m.cos(b)),
          (b = m.sin(b)),
          c.push(l, 0, b),
          f.push(e * l, 0, e * b),
          c.push(l, 0, b),
          f.push(e * l, d, e * b);
      for (a = 0; a <= g; a++)
        (b = ((a % g) * 2 * m.PI) / g),
          (l = m.cos(b)),
          (b = m.sin(b)),
          c.push(0, 1, 0),
          f.push(e * l, d, e * b),
          c.push(0, 1, 0),
          f.push(0, d, 0);
    } else {
      for (a = 0; a < g; a++)
        (b = (2 * a * m.PI) / g),
          (l = m.cos(b)),
          (b = m.sin(b)),
          c.push(l, 0, b),
          f.push(e * l, 0, e * b),
          c.push(l, 0, b),
          f.push(e * l, d, e * b);
      c.push(1, 0, 0);
      f.push(e, 0, 0);
      c.push(1, 0, 0);
      f.push(e, d, 0);
    }
    this.storeData(f, c);
  };
  e.Cylinder.prototype = new e._Mesh();
})(ChemDoodle.structures.d3, Math);
(function (e, m, k, p, d) {
  m.Distance = function (d, a, f, c) {
    this.a1 = d;
    this.a2 = a;
    this.node = f;
    this.offset = c ? c : 0;
  };
  m = m.Distance.prototype = new m._Measurement();
  m.calculateData = function (d) {
    let a = [this.a1.x, this.a1.y, this.a1.z, this.a2.x, this.a2.y, this.a2.z];
    this.node &&
      ((this.move =
        this.offset +
        k.max(
          d.atoms_useVDWDiameters_3D
            ? e[this.a1.label].vdWRadius * d.atoms_vdwMultiplier_3D
            : d.atoms_sphereDiameter_3D / 2,
          d.atoms_useVDWDiameters_3D
            ? e[this.a2.label].vdWRadius * d.atoms_vdwMultiplier_3D
            : d.atoms_sphereDiameter_3D / 2
        )),
      (this.displacement = [
        (this.a1.x + this.a2.x) / 2 - this.node.x,
        (this.a1.y + this.a2.y) / 2 - this.node.y,
        (this.a1.z + this.a2.z) / 2 - this.node.z,
      ]),
      p.normalize(this.displacement),
      (d = p.scale(this.displacement, this.move, [])),
      (a[0] += d[0]),
      (a[1] += d[1]),
      (a[2] += d[2]),
      (a[3] += d[0]),
      (a[4] += d[1]),
      (a[5] += d[2]));
    this.storeData(a, [0, 0, 0, 0, 0, 0], [0, 1]);
  };
  m.getText = function (d) {
    d = this.a1.distance3D(this.a2);
    let a = [
      (this.a1.x + this.a2.x) / 2,
      (this.a1.y + this.a2.y) / 2,
      (this.a1.z + this.a2.z) / 2,
    ];
    if (this.node) {
      let f = p.scale(this.displacement, this.move + 0.1, []);
      a[0] += f[0];
      a[1] += f[1];
      a[2] += f[2];
    }
    return { pos: a, value: [d.toFixed(2), " \u212b"].join("") };
  };
})(ChemDoodle.ELEMENT, ChemDoodle.structures.d3, Math, ChemDoodle.lib.vec3);
(function (e, m, k, p) {
  m.Fog = function (d, e, a, f) {
    this.fogScene(d, e, a, f);
  };
  m.Fog.prototype.fogScene = function (d, g, a, f) {
    this.colorRGB = e.getRGB(d, 1);
    this.fogStart = g;
    this.fogEnd = a;
    this.density = f;
  };
})(ChemDoodle.math, ChemDoodle.structures.d3, ChemDoodle.lib.vec3);
(function (e, m, k) {
  m.Label = function (e) {};
  m = m.Label.prototype;
  m.updateVerticesBuffer = function (p, d, g) {
    for (let h = 0, r = d.length; h < r; h++) {
      var a = d[h];
      let r = a.labelMesh;
      var f = a.atoms;
      let n = { position: [], texCoord: [], translation: [] };
      var c = 0 < f.length && f[0].hetatm != k;
      for (let a = 0, d = f.length; a < d; a++) {
        var b = f[a],
          l = b.label;
        let d = 0.05;
        g.atoms_useVDWDiameters_3D
          ? ((l = e[l].vdWRadius * g.atoms_vdwMultiplier_3D),
            0 === l && (l = 1),
            (d += l))
          : g.atoms_sphereDiameter_3D &&
            (d += (g.atoms_sphereDiameter_3D / 2) * 1.5);
        if (c)
          if (!b.hetatm) {
            if (!g.macro_displayAtoms) continue;
          } else if (b.isWater && !g.macro_showWaters) continue;
        p.textImage.pushVertexData(
          b.altLabel ? b.altLabel : b.label,
          [b.x, b.y, b.z],
          d,
          n
        );
      }
      if (
        (a = a.chains) &&
        (g.proteins_displayRibbon || g.proteins_displayBackbone)
      )
        for (let d = 0, e = a.length; d < e; d++) {
          f = a[d];
          for (let a = 0, d = f.length; a < d; a++)
            (c = f[a]),
              c.name &&
                ((b = c.cp1),
                p.textImage.pushVertexData(c.name, [b.x, b.y, b.z], 2, n));
        }
      r.storeData(p, n.position, n.texCoord, n.translation, n.zDepth);
    }
  };
  m.render = function (e, d, g) {
    e.shader.setMatrixUniforms(e);
    e.textImage.useTexture(e);
    for (let a = 0, f = g.length; a < f; a++)
      g[a].labelMesh && g[a].labelMesh.render(e);
  };
})(ChemDoodle.ELEMENT, ChemDoodle.structures.d3);
(function (e, m, k) {
  e.Sphere = function (e, d, g) {
    let a = [],
      f = [];
    for (var c = 0; c <= d; c++) {
      var b = (c * m.PI) / d,
        l = m.sin(b);
      b = m.cos(b);
      for (var h = 0; h <= g; h++) {
        var r = (2 * h * m.PI) / g,
          k = m.sin(r);
        r = m.cos(r) * l;
        let c = b;
        k *= l;
        f.push(r, c, k);
        a.push(e * r, e * c, e * k);
      }
    }
    e = [];
    g += 1;
    for (c = 0; c < d; c++)
      for (l = 0; l < g; l++)
        (b = c * g + (l % g)),
          (h = b + g),
          e.push(b, b + 1, h),
          l < g - 1 && e.push(h, b + 1, h + 1);
    this.storeData(a, f, e);
  };
  e.Sphere.prototype = new e._Mesh();
})(ChemDoodle.structures.d3, Math);
(function (e, m, k, p, d) {
  function g(a, c, b, d) {
    this.entire = a;
    this.name = c;
    this.indexes = b;
    this.pi = d;
  }
  let a = g.prototype;
  a.getColor = function (a) {
    return a.macro_colorByChain
      ? this.entire.chainColor
      : this.name
      ? this.getResidueColor(e[this.name] ? this.name : "*", a)
      : this.helix
      ? this.entire.front
        ? a.proteins_ribbonCartoonHelixPrimaryColor
        : a.proteins_ribbonCartoonHelixSecondaryColor
      : this.sheet
      ? a.proteins_ribbonCartoonSheetColor
      : this.entire.front
      ? a.proteins_primaryColor
      : a.proteins_secondaryColor;
  };
  a.getResidueColor = function (a, c) {
    a = e[a];
    if ("shapely" === c.proteins_residueColor) return a.shapelyColor;
    if ("amino" === c.proteins_residueColor) return a.aminoColor;
    if ("polarity" === c.proteins_residueColor) {
      if (a.polar) return "#C10000";
    } else if ("acidity" === c.proteins_residueColor) {
      if (1 === a.acidity) return "#0000FF";
      if (-1 === a.acidity) return "#FF0000";
      if (!a.polar) return "#773300";
    }
    return "#FFFFFF";
  };
  a.render = function (a, c, b) {
    if (
      this.entire.partitions &&
      this.pi !== this.entire.partitions.lastRender
    ) {
      var d = this.entire.partitions[this.pi];
      a.bindBuffer(a.ARRAY_BUFFER, d.vertexPositionBuffer);
      a.vertexAttribPointer(
        a.shader.vertexPositionAttribute,
        d.vertexPositionBuffer.itemSize,
        a.FLOAT,
        !1,
        0,
        0
      );
      a.bindBuffer(a.ARRAY_BUFFER, d.vertexNormalBuffer);
      a.vertexAttribPointer(
        a.shader.vertexNormalAttribute,
        d.vertexNormalBuffer.itemSize,
        a.FLOAT,
        !1,
        0,
        0
      );
      a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d.vertexIndexBuffer);
      this.entire.partitions.lastRender = this.pi;
    }
    this.vertexIndexBuffer ||
      ((this.vertexIndexBuffer = a.createBuffer()),
      a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer),
      a.bufferData(
        a.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(this.indexes),
        a.STATIC_DRAW
      ),
      (this.vertexIndexBuffer.itemSize = 1),
      (this.vertexIndexBuffer.numItems = this.indexes.length));
    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    b ||
      "rainbow" === c.proteins_residueColor ||
      a.material.setDiffuseColor(a, this.getColor(c));
    a.drawElements(
      a.TRIANGLES,
      this.vertexIndexBuffer.numItems,
      a.UNSIGNED_SHORT,
      0
    );
  };
  m.Ribbon = function (a, c, b) {
    let f = a[0].lineSegments.length,
      e = a[0].lineSegments[0].length;
    this.partitions = [];
    this.partitions.lastRender = 0;
    this.front = 0 < c;
    for (let d = 0, h = a.length; d < h; d++) {
      if (!r || 65e3 < r.positionData.length) {
        0 < this.partitions.length && d--;
        var r = { count: 0, positionData: [], normalData: [] };
        this.partitions.push(r);
      }
      var v = a[d];
      r.count++;
      for (var n = 0; n < f; n++) {
        var u = b ? v.lineSegmentsCartoon[n] : v.lineSegments[n],
          w = 0 === n,
          m = !1;
        for (var x = 0; x < e; x++) {
          var t = u[x],
            z = d,
            A = x + 1;
          d === a.length - 1 && x === e - 1
            ? A--
            : x === e - 1 && (z++, (A = 0));
          A = b ? a[z].lineSegmentsCartoon[n][A] : a[z].lineSegments[n][A];
          z = !1;
          var B = n + 1;
          n === f - 1 && ((B -= 2), (z = !0));
          B = b ? v.lineSegmentsCartoon[B][x] : v.lineSegments[B][x];
          A = [A.x - t.x, A.y - t.y, A.z - t.z];
          B = [B.x - t.x, B.y - t.y, B.z - t.z];
          let h = p.cross(A, B, []);
          0 === x &&
            (p.normalize(A),
            p.scale(A, -1),
            r.normalData.push(A[0], A[1], A[2]),
            r.positionData.push(t.x, t.y, t.z));
          w || m
            ? (p.normalize(B),
              p.scale(B, -1),
              r.normalData.push(B[0], B[1], B[2]),
              r.positionData.push(t.x, t.y, t.z),
              w && x === e - 1 && ((w = !1), (x = -1)))
            : (p.normalize(h),
              ((z && !this.front) || (!z && this.front)) && p.scale(h, -1),
              r.normalData.push(h[0], h[1], h[2]),
              p.scale(h, k.abs(c)),
              r.positionData.push(t.x + h[0], t.y + h[1], t.z + h[2]),
              n === f - 1 && x === e - 1 && ((m = !0), (x = -1)));
          if (-1 === x || x === e - 1)
            p.normalize(A),
              r.normalData.push(A[0], A[1], A[2]),
              r.positionData.push(t.x, t.y, t.z);
        }
      }
    }
    f += 2;
    e += 2;
    this.segments = [];
    this.partitionSegments = [];
    for (let h = 0, l = this.partitions.length; h < l; h++) {
      c = this.partitions[h];
      r = [];
      v = d;
      for (let l = 0, k = c.count - 1; l < k; l++) {
        v = l;
        for (n = 0; n < h; n++) v += this.partitions[n].count - 1;
        v = a[v];
        u = l * f * e;
        n = [];
        for (let a = 0, b = f - 1; a < b; a++)
          for (w = u + a * e, m = 0; m < e - 1; m++)
            (x = 1),
              l === k && (x = 0),
              (x = [
                w + m,
                w + e + m,
                w + e + m + x,
                w + m,
                w + m + x,
                w + e + m + x,
              ]),
              m !== e - 1 &&
                (this.front
                  ? n.push(x[0], x[1], x[2], x[3], x[5], x[4])
                  : n.push(x[0], x[2], x[1], x[3], x[4], x[5])),
              m !== e - 2 ||
                (l === c.count - 2 && h === this.partitions.length - 1) ||
                ((t = f * e - m), (x[2] += t), (x[4] += t), (x[5] += t)),
              this.front
                ? r.push(x[0], x[1], x[2], x[3], x[5], x[4])
                : r.push(x[0], x[2], x[1], x[3], x[4], x[5]);
        b &&
          v.split &&
          ((r = new g(this, d, r, h)),
          (r.helix = v.helix),
          (r.sheet = v.sheet),
          this.partitionSegments.push(r),
          (r = []));
        this.segments.push(new g(this, v.name, n, h));
      }
      c = new g(this, d, r, h);
      c.helix = v.helix;
      c.sheet = v.sheet;
      this.partitionSegments.push(c);
    }
    this.storeData(
      this.partitions[0].positionData,
      this.partitions[0].normalData
    );
    1 === this.partitions.length && (this.partitions = d);
  };
  (m.Ribbon.prototype = new m._Mesh()).render = function (a, c) {
    this.bindBuffers(a);
    let b = c.macro_colorByChain ? this.chainColor : d;
    b || (b = this.front ? c.proteins_primaryColor : c.proteins_secondaryColor);
    a.material.setDiffuseColor(a, b);
    for (let b = 0, d = this.partitionSegments.length; b < d; b++)
      this.partitionSegments[b].render(a, c, !c.proteins_ribbonCartoonize);
  };
})(ChemDoodle.RESIDUE, ChemDoodle.structures.d3, Math, ChemDoodle.lib.vec3);
(function (e, m, k, p, d) {
  m.Light = function (d, a, f) {
    this.camera = new m.Camera();
    this.lightScene(d, a, f);
  };
  d = m.Light.prototype;
  d.lightScene = function (d, a, f) {
    this.diffuseRGB = e.getRGB(d, 1);
    this.specularRGB = e.getRGB(a, 1);
    this.direction = f;
    this.updateView();
  };
  d.updateView = function () {
    var d = k.normalize(this.direction, []);
    let a = k.scale(
      d,
      (this.camera.near - this.camera.far) / 2 - this.camera.near,
      []
    );
    d = k.equal(d, [0, 1, 0]) ? [0, 0, 1] : [0, 1, 0];
    p.lookAt(a, [0, 0, 0], d, this.camera.viewMatrix);
    this.camera.orthogonalProjectionMatrix();
  };
})(
  ChemDoodle.math,
  ChemDoodle.structures.d3,
  ChemDoodle.lib.vec3,
  ChemDoodle.lib.mat4
);
(function (e, m) {
  e.Line = function () {
    this.storeData([0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]);
  };
  e.Line.prototype = new e._Mesh();
})(ChemDoodle.structures.d3);
(function (e, m, k) {
  m.Material = function () {};
  m = m.Material.prototype;
  m.setTempColors = function (k, d, g, a, f) {
    d && k.shader.setMaterialAmbientColor(k, e.getRGB(d, 1));
    g && k.shader.setMaterialDiffuseColor(k, e.getRGB(g, 1));
    a && k.shader.setMaterialSpecularColor(k, e.getRGB(a, 1));
    k.shader.setMaterialShininess(k, f);
    k.shader.setMaterialAlpha(k, 1);
  };
  m.setDiffuseColor = function (k, d) {
    k.shader.setMaterialDiffuseColor(k, e.getRGB(d, 1));
  };
  m.setAlpha = function (e, d) {
    e.shader.setMaterialAlpha(e, d);
  };
})(ChemDoodle.math, ChemDoodle.structures.d3);
(function (e, m, k, p) {
  e.Picker = function () {};
  e = e.Picker.prototype;
  e.init = function (d) {
    this.framebuffer = d.createFramebuffer();
    let e = d.createTexture(),
      a = d.createRenderbuffer();
    d.bindTexture(d.TEXTURE_2D, e);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE);
    d.bindRenderbuffer(d.RENDERBUFFER, a);
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    d.framebufferTexture2D(
      d.FRAMEBUFFER,
      d.COLOR_ATTACHMENT0,
      d.TEXTURE_2D,
      e,
      0
    );
    d.framebufferRenderbuffer(
      d.FRAMEBUFFER,
      d.DEPTH_ATTACHMENT,
      d.RENDERBUFFER,
      a
    );
    d.bindTexture(d.TEXTURE_2D, null);
    d.bindRenderbuffer(d.RENDERBUFFER, null);
    d.bindFramebuffer(d.FRAMEBUFFER, null);
  };
  e.setDimension = function (d, e, a) {
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    var f = d.getFramebufferAttachmentParameter(
      d.FRAMEBUFFER,
      d.DEPTH_ATTACHMENT,
      d.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME
    );
    d.isRenderbuffer(f) &&
      (d.bindRenderbuffer(d.RENDERBUFFER, f),
      d.renderbufferStorage(d.RENDERBUFFER, d.DEPTH_COMPONENT16, e, a),
      d.bindRenderbuffer(d.RENDERBUFFER, null));
    f = d.getFramebufferAttachmentParameter(
      d.FRAMEBUFFER,
      d.COLOR_ATTACHMENT0,
      d.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME
    );
    d.isTexture(f) &&
      (d.bindTexture(d.TEXTURE_2D, f),
      d.texImage2D(
        d.TEXTURE_2D,
        0,
        d.RGBA,
        e,
        a,
        0,
        d.RGBA,
        d.UNSIGNED_BYTE,
        null
      ),
      d.bindTexture(d.TEXTURE_2D, null));
    d.bindFramebuffer(d.FRAMEBUFFER, null);
  };
})(ChemDoodle.structures.d3, ChemDoodle.math, document);
(function (e, m, k) {
  e.Pill = function (e, d, g, a) {
    var f = 1,
      c = 2 * e;
    d -= c;
    0 > d ? ((f = 0), (d += c)) : d < c && ((f = d / c), (d = c));
    c = [];
    let b = [];
    for (var l = 0; l <= g; l++) {
      var h = (l * m.PI) / g,
        r = m.sin(h);
      h = m.cos(h) * f;
      for (let f = 0; f <= a; f++) {
        var k = (2 * f * m.PI) / a,
          n = m.sin(k);
        k = m.cos(k) * r;
        let u = h;
        n *= r;
        b.push(k, u, n);
        c.push(e * k, e * u + (l < g / 2 ? d : 0), e * n);
      }
    }
    e = [];
    a += 1;
    for (d = 0; d < g; d++)
      for (f = 0; f < a; f++)
        (l = d * a + (f % a)),
          (r = l + a),
          e.push(l, l + 1, r),
          f < a - 1 && e.push(r, l + 1, r + 1);
    this.storeData(c, b, e);
  };
  e.Pill.prototype = new e._Mesh();
})(ChemDoodle.structures.d3, Math);
(function (e, m, k, p, d, g, a, f, c) {
  function b(a, b, c) {
    let d = new k.Residue(-1);
    d.cp1 = d.cp2 = new k.Atom("", a, b, c);
    return d;
  }
  function l(a, b) {
    this.a1 = a;
    this.a2 = b;
  }
  function h(a, b, c) {
    this.a1 = a;
    this.a2 = b;
    this.vx = c;
  }
  l.prototype.render = function (b, c) {
    var f = this.a1;
    let h = this.a2;
    var l = 1.001 * f.distance3D(h);
    c = c.proteins_cylinderHelixDiameter / 2;
    l = [c, l, c];
    c = g.translate(g.identity(), [f.x, f.y, f.z]);
    var r = [0, 1, 0];
    let k = 0;
    f.x === h.x && f.z === h.z
      ? ((r = [0, 0, 1]), h.y < f.y && (k = d.PI))
      : ((f = [h.x - f.x, h.y - f.y, h.z - f.z]),
        (k = e.vec3AngleFrom(r, f)),
        (r = a.cross(r, f, [])));
    0 !== k && g.rotate(c, k, r);
    g.scale(c, l);
    b.shader.setMatrixUniforms(b, c);
    b.drawArrays(
      b.TRIANGLE_STRIP,
      0,
      b.cylinderClosedBuffer.vertexPositionBuffer.numItems
    );
  };
  h.prototype.render = function (b, c) {
    this.styles && (c = this.styles);
    let d = 1.001 * this.a1.distance3D(this.a2);
    var f = [
      this.a2.x - this.a1.x,
      this.a2.y - this.a1.y,
      this.a2.z - this.a1.z,
    ];
    let e = a.cross(f, this.vx, []),
      h = a.cross(e, f, []);
    a.normalize(h);
    a.normalize(f);
    a.normalize(e);
    f = [
      h[0],
      h[1],
      h[2],
      0,
      f[0],
      f[1],
      f[2],
      0,
      e[0],
      e[1],
      e[2],
      0,
      this.a1.x,
      this.a1.y,
      this.a1.z,
      1,
    ];
    g.scale(f, [c.proteins_plankSheetWidth, d, c.proteins_tubeThickness]);
    b.shader.setMatrixUniforms(b, f);
    b.drawArrays(
      b.TRIANGLE_STRIP,
      0,
      b.boxBuffer.vertexPositionBuffer.numItems
    );
  };
  p.PipePlank = function (c, f) {
    this.tubes = [];
    this.helixCylinders = [];
    this.sheetPlanks = [];
    this.chainColor = c.chainColor;
    var e = [],
      g = [],
      r = [],
      v = [];
    if (1 < c.length) {
      var m = c[0],
        t = c[1];
      t.helix ? r.push(m) : t.sheet ? v.push(m) : g.push(m);
    }
    for (let f = 1, n = c.length - 1; f <= n; f++)
      if (((m = c[f]), m.helix)) {
        if ((r.push(m), m.arrow)) {
          var z = a.create();
          t = a.create();
          if (1 === r.length)
            (z = [
              m.guidePointsSmall[0].x,
              m.guidePointsSmall[0].y,
              m.guidePointsSmall[0].z,
            ]),
              (t = m.guidePointsSmall[m.guidePointsSmall.length - 1]),
              (t = [t.x, t.y, t.z]);
          else if (2 === r.length)
            (z = [r[0].cp1.x, r[0].cp1.y, r[0].cp1.z]),
              (t = [r[1].cp1.x, r[1].cp1.y, r[1].cp1.z]);
          else {
            3 === r.length && r.unshift(c[d.max(f - 3, 0)]);
            var A = [],
              B = [];
            for (let b = 1, c = r.length - 1; b < c; b++) {
              var C = [r[b].cp1.x, r[b].cp1.y, r[b].cp1.z],
                D = [r[b - 1].cp1.x, r[b - 1].cp1.y, r[b - 1].cp1.z],
                J = [r[b + 1].cp1.x, r[b + 1].cp1.y, r[b + 1].cp1.z];
              a.subtract(D, C);
              a.subtract(J, C);
              var G = a.scale(D, a.length(J), []);
              D = a.scale(J, a.length(D), []);
              G = a.normalize(a.add(G, D, []));
              A.push(C);
              B.push(G);
            }
            r = [];
            for (let b = 0, c = A.length - 1; b < c; b++) {
              D = A[b];
              J = B[b];
              C = A[b + 1];
              G = B[b + 1];
              var F = a.normalize(a.cross(J, G, [])),
                H = a.subtract(C, D, []);
              let c = a.dot(H, F);
              F = a.scale(F, c, []);
              F = a.length(F);
              H = a.length(H);
              H = -(F * F - H * H) / (2 * a.dot(a.subtract(D, C, []), G));
              D = a.add(D, a.scale(J, H, []), []);
              C = a.add(C, a.scale(G, H, []), []);
              r.push([D, C]);
            }
            A = r[0][0];
            B = r[0][1];
            B = a.subtract(A, B, []);
            a.add(A, B, z);
            A = r[r.length - 1][1];
            B = r[r.length - 1][0];
            B = a.subtract(A, B, []);
            a.add(A, B, t);
          }
          r = new k.Atom("", z[0], z[1], z[2]);
          A = new k.Atom("", t[0], t[1], t[2]);
          this.helixCylinders.push(new l(r, A));
          r = [];
          A = a.subtract(z, t, []);
          a.normalize(A);
          a.scale(A, 0.5);
          0 < g.length &&
            ((B = a.add(z, A, [])),
            (C = g[g.length - 1].cp1),
            (C = a.subtract([C.x, C.y, C.z], B, [])),
            a.normalize(C),
            a.scale(C, 0.5),
            a.add(B, C),
            (C = new k.Residue(-1)),
            (C.cp1 = C.cp2 = new k.Atom("", B[0], B[1], B[2])),
            g.push(C),
            (C = b(z[0], z[1], z[2])),
            g.push(C),
            e.push(g));
          g = [];
          f < n &&
            ((z = b(t[0], t[1], t[2])),
            g.push(z),
            (z = c[f + 1]),
            z.sheet
              ? (g.push(m), g.push(m), e.push(g), (g = []), v.push(m))
              : (a.scale(A, -1),
                (m = a.add(t, A, [])),
                (t = z.cp1),
                (t = a.subtract([t.x, t.y, t.z], m, [])),
                a.normalize(t),
                a.scale(t, 0.5),
                a.add(m, t),
                (m = b(m[0], m[1], m[2])),
                g.push(m)));
        }
      } else if (m.sheet) {
        if ((v.push(m), m.arrow)) {
          z = [0, 0, 0];
          A = [0, 0, 0];
          t = v.length;
          for (B = 0; B < t; B++)
            (G = v[B].guidePointsLarge),
              (C = G[0]),
              (G = G[G.length - 1]),
              a.add(z, [C.x, C.y, C.z]),
              a.add(A, [G.x, G.y, G.z]);
          a.scale(z, 1 / t);
          a.scale(A, 1 / t);
          z = a.subtract(z, A);
          t = v[t - 1].guidePointsSmall[0];
          this.sheetPlanks.push(new h(v[0].guidePointsSmall[0], t, z));
          v = [];
          f < n &&
            (c[f + 1].sheet ? v.push(m) : ((m = b(t.x, t.y, t.z)), g.push(m)));
        }
      } else
        g.push(m),
          f < n &&
            c[f + 1].sheet &&
            ((t = m.guidePointsSmall[0]),
            (t = b(t.x, t.y, t.z)),
            g.push(t),
            e.push(g),
            (g = []),
            v.push(m));
    1 < g.length && (2 == g.length && g.push(g[g.length - 1]), e.push(g));
    g = [];
    for (let b = 0, a = e.length; b < a; b++) {
      v = e[b];
      m = [];
      for (let b = 0, a = v.length - 1; b <= a; b++) m.push(v[b].cp1);
      g.push(m);
    }
    for (let b = 0, a = g.length; b < a; b++)
      (e = new p.CatmullTube(
        g[b],
        f.proteins_tubeThickness,
        f.proteins_tubeResolution_3D,
        f.proteins_horizontalResolution
      )),
        (e.chainColor = c.chainColor),
        this.tubes.push(e);
  };
  (p.PipePlank.prototype = new p._Mesh()).render = function (b, a) {
    b.material.setTempColors(
      b,
      a.proteins_materialAmbientColor_3D,
      c,
      a.proteins_materialSpecularColor_3D,
      a.proteins_materialShininess_3D
    );
    b.material.setDiffuseColor(
      b,
      a.macro_colorByChain ? this.chainColor : a.proteins_tubeColor
    );
    for (let c = 0, f = this.tubes.length; c < f; c++)
      b.shader.setMatrixUniforms(b), this.tubes[c].render(b, a);
    a.macro_colorByChain ||
      b.material.setDiffuseColor(
        b,
        a.proteins_ribbonCartoonHelixSecondaryColor
      );
    b.cylinderClosedBuffer.bindBuffers(b);
    for (let c = 0, f = this.helixCylinders.length; c < f; c++)
      this.helixCylinders[c].render(b, a);
    a.macro_colorByChain ||
      b.material.setDiffuseColor(b, a.proteins_ribbonCartoonSheetColor);
    b.boxBuffer.bindBuffers(b);
    for (let c = 0, f = this.sheetPlanks.length; c < f; c++)
      this.sheetPlanks[c].render(b, a);
  };
})(
  ChemDoodle.extensions,
  ChemDoodle.RESIDUE,
  ChemDoodle.structures,
  ChemDoodle.structures.d3,
  Math,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3,
  ChemDoodle.math
);
(function (e, m) {
  e.Quad = function () {
    this.storeData(
      [-1, 1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
  };
  e.Quad.prototype = new e._Mesh();
})(ChemDoodle.structures.d3);
(function (e, m, k, p) {
  m.Shape = function (d, g) {
    var a = d.length;
    let f = [],
      c = [],
      b = new e.Point();
    for (let e = 0, p = a; e < p; e++) {
      var l = e + 1;
      e === p - 1 && (l = 0);
      let a = d[e];
      var h = d[l];
      l = k.cross([0, 0, 1], [h.x - a.x, h.y - a.y, 0]);
      for (let b = 0; 2 > b; b++)
        f.push(a.x, a.y, g / 2),
          f.push(a.x, a.y, -g / 2),
          f.push(h.x, h.y, g / 2),
          f.push(h.x, h.y, -g / 2);
      for (h = 0; 4 > h; h++) c.push(l[0], l[1], l[2]);
      c.push(0, 0, 1);
      c.push(0, 0, -1);
      c.push(0, 0, 1);
      c.push(0, 0, -1);
      b.add(a);
    }
    b.x /= a;
    b.y /= a;
    c.push(0, 0, 1);
    f.push(b.x, b.y, g / 2);
    c.push(0, 0, -1);
    f.push(b.x, b.y, -g / 2);
    d = [];
    g = 8 * a;
    for (let b = 0, c = a; b < c; b++)
      (a = 8 * b),
        d.push(a),
        d.push(a + 3),
        d.push(a + 1),
        d.push(a),
        d.push(a + 2),
        d.push(a + 3),
        d.push(a + 4),
        d.push(g),
        d.push(a + 6),
        d.push(a + 5),
        d.push(a + 7),
        d.push(g + 1);
    this.storeData(f, c, d);
  };
  m.Shape.prototype = new m._Mesh();
})(ChemDoodle.structures, ChemDoodle.structures.d3, ChemDoodle.lib.vec3);
(function (e, m, k, p) {
  e.Star = function () {
    let d = [
        0.8944, 0.4472, 0, 0.2764, 0.4472, 0.8506, 0.2764, 0.4472, -0.8506,
        -0.7236, 0.4472, 0.5257, -0.7236, 0.4472, -0.5257, -0.3416, 0.4472, 0,
        -0.1056, 0.4472, 0.3249, -0.1056, 0.4472, -0.3249, 0.2764, 0.4472,
        0.2008, 0.2764, 0.4472, -0.2008, -0.8944, -0.4472, 0, -0.2764, -0.4472,
        0.8506, -0.2764, -0.4472, -0.8506, 0.7236, -0.4472, 0.5257, 0.7236,
        -0.4472, -0.5257, 0.3416, -0.4472, 0, 0.1056, -0.4472, 0.3249, 0.1056,
        -0.4472, -0.3249, -0.2764, -0.4472, 0.2008, -0.2764, -0.4472, -0.2008,
        -0.5527, 0.1058, 0, -0.1708, 0.1058, 0.5527, -0.1708, 0.1058, -0.5527,
        0.4471, 0.1058, 0.3249, 0.4471, 0.1058, -0.3249, 0.5527, -0.1058, 0,
        0.1708, -0.1058, 0.5527, 0.1708, -0.1058, -0.5527, -0.4471, -0.1058,
        0.3249, -0.4471, -0.1058, -0.3249, 0, 1, 0, 0, -1, 0,
      ],
      e = [
        0, 9, 8, 2, 7, 9, 4, 5, 7, 3, 6, 5, 1, 8, 6, 0, 8, 23, 30, 6, 8, 3, 21,
        6, 11, 26, 21, 13, 23, 26, 2, 9, 24, 30, 8, 9, 1, 23, 8, 13, 25, 23, 14,
        24, 25, 4, 7, 22, 30, 9, 7, 0, 24, 9, 14, 27, 24, 12, 22, 27, 3, 5, 20,
        30, 7, 5, 2, 22, 7, 12, 29, 22, 10, 20, 29, 1, 6, 21, 30, 5, 6, 4, 20,
        5, 10, 28, 20, 11, 21, 28, 10, 19, 18, 12, 17, 19, 14, 15, 17, 13, 16,
        15, 11, 18, 16, 31, 19, 17, 14, 17, 27, 2, 27, 22, 4, 22, 29, 10, 29,
        19, 31, 18, 19, 12, 19, 29, 4, 29, 20, 3, 20, 28, 11, 28, 18, 31, 16,
        18, 10, 18, 28, 3, 28, 21, 1, 21, 26, 13, 26, 16, 31, 15, 16, 11, 16,
        26, 1, 26, 23, 0, 23, 25, 14, 25, 15, 31, 17, 15, 13, 15, 25, 0, 25, 24,
        2, 24, 27, 12, 27, 17,
      ],
      a = [],
      f = [],
      c = [];
    for (let g = 0, p = e.length; g < p; g += 3) {
      var b = 3 * e[g],
        l = 3 * e[g + 1],
        h = 3 * e[g + 2];
      b = [d[b], d[b + 1], d[b + 2]];
      l = [d[l], d[l + 1], d[l + 2]];
      h = [d[h], d[h + 1], d[h + 2]];
      let r = k.cross(
        [h[0] - l[0], h[1] - l[1], h[2] - l[2]],
        [b[0] - l[0], b[1] - l[1], b[2] - l[2]],
        []
      );
      k.normalize(r);
      a.push(b[0], b[1], b[2], l[0], l[1], l[2], h[0], h[1], h[2]);
      f.push(r[0], r[1], r[2], r[0], r[1], r[2], r[0], r[1], r[2]);
      c.push(g, g + 1, g + 2);
    }
    this.storeData(a, f, c);
  };
  e.Star.prototype = new e._Mesh();
})(ChemDoodle.structures.d3, Math, ChemDoodle.lib.vec3);
(function (e, m, k, p, d) {
  let g = 1;
  p.devicePixelRatio && (g = p.devicePixelRatio);
  e.TextImage = function () {
    this.ctx = k.createElement("canvas").getContext("2d");
    this.data = [];
    this.text = "";
    this.charHeight = 0;
  };
  e = e.TextImage.prototype;
  e.init = function (a) {
    this.textureImage = a.createTexture();
    a.bindTexture(a.TEXTURE_2D, this.textureImage);
    a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
    a.bindTexture(a.TEXTURE_2D, null);
    this.updateFont(a, 12, ["Sans-serif"], !1, !1, !1);
  };
  e.charData = function (a) {
    a = this.text.indexOf(a);
    return 0 <= a ? this.data[a] : null;
  };
  e.updateFont = function (a, f, c, b, d, e) {
    let h = this.ctx,
      l = this.ctx.canvas,
      n = [],
      k = "";
    f *= g;
    c = m.getFontString(f, c, b, d);
    h.font = c;
    h.save();
    b = 0;
    f *= 1.5;
    for (let a = 32, c = 127; a < c; a++) {
      d = String.fromCharCode(a);
      var p = h.measureText(d).width;
      n.push({ text: d, width: p, height: f });
      b += 2 * p;
    }
    d = ["\u00b0", "\u212b", "\u00ae"];
    for (let a = 0, c = d.length; a < c; a++) {
      p = d[a];
      var y = h.measureText(p).width;
      n.push({ text: p, width: y, height: f });
      b += 2 * y;
    }
    d = Math.ceil(Math.sqrt(b * f) / f);
    b = Math.ceil(b / (d - 1));
    l.width = b;
    l.height = d * f;
    h.font = c;
    h.textAlign = "left";
    h.textBaseline = "middle";
    h.strokeStyle = "#000";
    h.lineWidth = 1.4;
    h.fillStyle = "#fff";
    d = c = 0;
    for (let a = 0, f = n.length; a < f; a++) {
      p = n[a];
      y = 2 * p.width;
      let f = p.height,
        g = p.text;
      d + y > b && (c++, (d = 0));
      let l = c * f;
      e && h.strokeText(g, d, l + f / 2);
      h.fillText(g, d, l + f / 2);
      p.x = d;
      p.y = l;
      k += g;
      d += y;
    }
    this.text = k;
    this.data = n;
    this.charHeight = f;
    a.bindTexture(a.TEXTURE_2D, this.textureImage);
    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, l);
    a.bindTexture(a.TEXTURE_2D, null);
  };
  e.pushVertexData = function (a, d, c, b) {
    let f = a.toString().split(""),
      e = this.getHeight(),
      r = this.getWidth();
    a = -this.textWidth(a) / 2 / g;
    let k = -this.charHeight / 2 / g;
    for (let h = 0, l = f.length; h < l; h++) {
      var n = this.charData(f[h]);
      let l = n.width,
        u = n.x / r,
        p = u + (1.8 * n.width) / r,
        v = n.y / e;
      n = v + n.height / e;
      let m = a + (1.8 * l) / g,
        w = this.charHeight / 2 / g;
      b.position.push(
        d[0],
        d[1],
        d[2],
        d[0],
        d[1],
        d[2],
        d[0],
        d[1],
        d[2],
        d[0],
        d[1],
        d[2],
        d[0],
        d[1],
        d[2],
        d[0],
        d[1],
        d[2]
      );
      b.texCoord.push(u, v, p, n, p, v, u, v, u, n, p, n);
      b.translation.push(a, w, c, m, k, c, m, w, c, a, w, c, a, k, c, m, k, c);
      a = m + (l - 1.8 * l) / g;
    }
  };
  e.getCanvas = function () {
    return this.ctx.canvas;
  };
  e.getHeight = function () {
    return this.getCanvas().height;
  };
  e.getWidth = function () {
    return this.getCanvas().width;
  };
  e.textWidth = function (a) {
    return this.ctx.measureText(a).width;
  };
  e.test = function () {
    k.body.appendChild(this.getCanvas());
  };
  e.useTexture = function (a) {
    a.bindTexture(a.TEXTURE_2D, this.textureImage);
  };
})(ChemDoodle.structures.d3, ChemDoodle.extensions, document, window);
(function (e, m, k) {
  e.TextMesh = function () {};
  e = e.TextMesh.prototype;
  e.init = function (e) {
    this.vertexPositionBuffer = e.createBuffer();
    this.vertexTexCoordBuffer = e.createBuffer();
    this.vertexTranslationBuffer = e.createBuffer();
  };
  e.setVertexData = function (e, d, g, a) {
    e.bindBuffer(e.ARRAY_BUFFER, d);
    e.bufferData(e.ARRAY_BUFFER, new Float32Array(g), e.STATIC_DRAW);
    d.itemSize = a;
    d.numItems = g.length / a;
  };
  e.storeData = function (e, d, g, a) {
    this.setVertexData(e, this.vertexPositionBuffer, d, 3);
    this.setVertexData(e, this.vertexTexCoordBuffer, g, 2);
    this.setVertexData(e, this.vertexTranslationBuffer, a, 3);
  };
  e.bindBuffers = function (e) {
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexPositionBuffer);
    e.vertexAttribPointer(
      e.shader.vertexPositionAttribute,
      this.vertexPositionBuffer.itemSize,
      e.FLOAT,
      !1,
      0,
      0
    );
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexTexCoordBuffer);
    e.vertexAttribPointer(
      e.shader.vertexTexCoordAttribute,
      this.vertexTexCoordBuffer.itemSize,
      e.FLOAT,
      !1,
      0,
      0
    );
    e.bindBuffer(e.ARRAY_BUFFER, this.vertexTranslationBuffer);
    e.vertexAttribPointer(
      e.shader.vertexNormalAttribute,
      this.vertexTranslationBuffer.itemSize,
      e.FLOAT,
      !1,
      0,
      0
    );
  };
  e.render = function (e) {
    let d = this.vertexPositionBuffer.numItems;
    d && (this.bindBuffers(e), e.drawArrays(e.TRIANGLES, 0, d));
  };
})(ChemDoodle.structures.d3, Math);
(function (e, m, k, p, d, g, a) {
  k.Torsion = function (a, c, b, d) {
    this.a1 = a;
    this.a2 = c;
    this.a3 = b;
    this.a4 = d;
  };
  e = k.Torsion.prototype = new k._Measurement();
  e.calculateData = function (d) {
    let c = [],
      b = [],
      f = [];
    var e = this.a2.distance3D(this.a1),
      r = this.a2.distance3D(this.a3);
    this.distUse = p.min(e, r) / 2;
    r = [this.a2.x - this.a1.x, this.a2.y - this.a1.y, this.a2.z - this.a1.z];
    e = [this.a3.x - this.a2.x, this.a3.y - this.a2.y, this.a3.z - this.a2.z];
    var k = [
        this.a4.x - this.a3.x,
        this.a4.y - this.a3.y,
        this.a4.z - this.a3.z,
      ],
      n = g.cross(r, e, []);
    k = g.cross(e, k, []);
    g.scale(r, g.length(e));
    this.torsion = p.atan2(g.dot(r, k), g.dot(n, k));
    n = g.normalize(g.cross(n, e, []));
    r = g.normalize(g.cross(e, n, []));
    this.pos = g.add(
      [this.a2.x, this.a2.y, this.a2.z],
      g.scale(g.normalize(e, []), this.distUse)
    );
    k = [];
    let u = d.measurement_angleBands_3D;
    var m = a;
    for (d = 0; d <= u; ++d) {
      var y = (this.torsion * d) / u;
      m = g.scale(n, p.cos(y), []);
      y = g.scale(r, p.sin(y), []);
      m = g.scale(g.normalize(g.add(m, y, [])), this.distUse);
      0 == d && (k = m);
      c.push(this.pos[0] + m[0], this.pos[1] + m[1], this.pos[2] + m[2]);
      b.push(0, 0, 0);
      d < u && f.push(d, d + 1);
    }
    this.vecText = g.normalize(g.add(k, m, []));
    e = g.normalize(e, []);
    g.scale(e, 0.0625);
    k = this.torsion - (2 * p.asin(0.125) * this.torsion) / p.abs(this.torsion);
    n = g.scale(n, p.cos(k), []);
    r = g.scale(r, p.sin(k), []);
    m = g.scale(g.normalize(g.add(n, r, [])), this.distUse);
    c.push(
      this.pos[0] + e[0] + m[0],
      this.pos[1] + e[1] + m[1],
      this.pos[2] + e[2] + m[2]
    );
    b.push(0, 0, 0);
    c.push(
      this.pos[0] - e[0] + m[0],
      this.pos[1] - e[1] + m[1],
      this.pos[2] - e[2] + m[2]
    );
    b.push(0, 0, 0);
    f.push(--d, d + 1, d, d + 2);
    this.storeData(c, b, f);
  };
  e.getText = function (a) {
    g.add(this.pos, g.scale(this.vecText, this.distUse + 0.3, []));
    return {
      pos: this.pos,
      value: [m.angleBounds(this.torsion, !0, !0).toFixed(2), " \u00b0"].join(
        ""
      ),
    };
  };
})(
  ChemDoodle.ELEMENT,
  ChemDoodle.math,
  ChemDoodle.structures.d3,
  Math,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3
);
(function (e, m, k, p, d, g, a, f, c) {
  let b = function (b, a) {
      b.bindBuffer(b.ARRAY_BUFFER, a.vertexPositionBuffer);
      b.vertexAttribPointer(
        b.shader.vertexPositionAttribute,
        a.vertexPositionBuffer.itemSize,
        b.FLOAT,
        !1,
        0,
        0
      );
      b.bindBuffer(b.ARRAY_BUFFER, a.vertexNormalBuffer);
      b.vertexAttribPointer(
        b.shader.vertexNormalAttribute,
        a.vertexNormalBuffer.itemSize,
        b.FLOAT,
        !1,
        0,
        0
      );
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.vertexIndexBuffer);
    },
    l = function (b, a, c) {
      let f = d.sqrt(a[1] * a[1] + a[2] * a[2]),
        e = [
          1,
          0,
          0,
          0,
          0,
          a[2] / f,
          -a[1] / f,
          0,
          0,
          a[1] / f,
          a[2] / f,
          0,
          0,
          0,
          0,
          1,
        ],
        h = [
          1,
          0,
          0,
          0,
          0,
          a[2] / f,
          a[1] / f,
          0,
          0,
          -a[1] / f,
          a[2] / f,
          0,
          0,
          0,
          0,
          1,
        ],
        l = [f, 0, -a[0], 0, 0, 1, 0, 0, a[0], 0, f, 0, 0, 0, 0, 1];
      a = [f, 0, a[0], 0, 0, 1, 0, 0, -a[0], 0, f, 0, 0, 0, 0, 1];
      c = [
        d.cos(c),
        -d.sin(c),
        0,
        0,
        d.sin(c),
        d.cos(c),
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
      ];
      let r = g.multiply(e, g.multiply(l, g.multiply(c, g.multiply(a, h, []))));
      this.rotate = function () {
        return g.multiplyVec3(r, b);
      };
    };
  p.Tube = function (c, r, p) {
    var h = c[0].lineSegments[0].length;
    this.partitions = [];
    this.ends = [];
    this.ends.push(c[0].lineSegments[0][0]);
    this.ends.push(c[c.length - 1].lineSegments[0][0]);
    var u = [1, 0, 0];
    for (let b = 0, f = c.length; b < f; b++) {
      if (!v || 65e3 < v.positionData.length) {
        0 < this.partitions.length && b--;
        var v = { count: 0, positionData: [], normalData: [], indexData: [] };
        this.partitions.push(v);
      }
      var y = c[b];
      v.count++;
      var x = Infinity,
        t = new k.Atom("", c[b].cp1.x, c[b].cp1.y, c[b].cp1.z);
      for (let f = 0; f < h; f++) {
        let e = y.lineSegments[0][f];
        var z =
          f === h - 1
            ? b === c.length - 1
              ? y.lineSegments[0][f - 1]
              : c[b + 1].lineSegments[0][0]
            : y.lineSegments[0][f + 1];
        z = [z.x - e.x, z.y - e.y, z.z - e.z];
        a.normalize(z);
        b === c.length - 1 && f === h - 1 && a.scale(z, -1);
        var A = a.cross(z, u, []);
        a.normalize(A);
        a.scale(A, r / 2);
        z = new l(A, z, (2 * Math.PI) / p);
        for (let b = 0, a = p; b < a; b++)
          (A = z.rotate()),
            b === d.floor(p / 4) && (u = [A[0], A[1], A[2]]),
            v.normalData.push(A[0], A[1], A[2]),
            v.positionData.push(e.x + A[0], e.y + A[1], e.z + A[2]);
        t && ((z = e.distance3D(t)), z < x && ((x = z), (c[b].pPoint = e)));
      }
    }
    for (let b = 0, a = this.partitions.length; b < a; b++) {
      v = this.partitions[b];
      for (let b = 0, a = v.count - 1; b < a; b++) {
        u = b * h * p;
        for (let b = 0, a = h; b < a; b++)
          for (y = u + b * p, x = 0; x < p; x++)
            (t = y + x),
              v.indexData.push(t),
              v.indexData.push(t + p),
              v.indexData.push(t + p + 1),
              v.indexData.push(t),
              v.indexData.push(t + p + 1),
              v.indexData.push(t + 1);
      }
    }
    this.storeData(
      this.partitions[0].positionData,
      this.partitions[0].normalData,
      this.partitions[0].indexData
    );
    p = [new k.Point(2, 0)];
    for (h = 0; 60 > h; h++)
      (v = (h / 60) * d.PI), p.push(new k.Point(2 * d.cos(v), -2 * d.sin(v)));
    p.push(new k.Point(-2, 0), new k.Point(-2, 4), new k.Point(2, 4));
    let B = new k.d3.Shape(p, 1);
    this.render = function (h, l) {
      this.bindBuffers(h);
      h.material.setDiffuseColor(
        h,
        l.macro_colorByChain ? this.chainColor : l.nucleics_tubeColor
      );
      h.drawElements(
        h.TRIANGLES,
        this.vertexIndexBuffer.numItems,
        h.UNSIGNED_SHORT,
        0
      );
      if (this.partitions)
        for (let a = 1, c = this.partitions.length; a < c; a++) {
          var n = this.partitions[a];
          b(h, n);
          h.drawElements(
            h.TRIANGLES,
            n.vertexIndexBuffer.numItems,
            h.UNSIGNED_SHORT,
            0
          );
        }
      h.sphereBuffer.bindBuffers(h);
      for (n = 0; 2 > n; n++) {
        var u = this.ends[n];
        u = g.translate(g.identity(), [u.x, u.y, u.z]);
        var p = r / 2;
        g.scale(u, [p, p, p]);
        h.shader.setMatrixUniforms(h, u);
        h.drawElements(
          h.TRIANGLES,
          h.sphereBuffer.vertexIndexBuffer.numItems,
          h.UNSIGNED_SHORT,
          0
        );
      }
      h.cylinderBuffer.bindBuffers(h);
      for (let b = 0, f = c.length - 1; b < f; b++) {
        u = c[b];
        n = u.pPoint;
        u = new k.Atom("", u.cp2.x, u.cp2.y, u.cp2.z);
        p = 1.001 * n.distance3D(u);
        p = [r / 4, p, r / 4];
        var v = g.translate(g.identity(), [n.x, n.y, n.z]),
          w = [0, 1, 0],
          t = 0,
          y = [u.x - n.x, u.y - n.y, u.z - n.z];
        n.x === u.x && n.z === u.z
          ? ((u = [0, 0, 1]), n.y < n.y && (t = d.PI))
          : ((t = e.vec3AngleFrom(w, y)), (u = a.cross(w, y, [])));
        0 !== t && g.rotate(v, t, u);
        g.scale(v, p);
        h.shader.setMatrixUniforms(h, v);
        h.drawArrays(
          h.TRIANGLE_STRIP,
          0,
          h.cylinderBuffer.vertexPositionBuffer.numItems
        );
      }
      B.bindBuffers(h);
      "none" !== l.nucleics_residueColor ||
        l.macro_colorByChain ||
        h.material.setDiffuseColor(h, l.nucleics_baseColor);
      for (let b = 0, r = c.length - 1; b < r; b++)
        if (
          ((n = c[b]),
          (v = n.cp2),
          (u = g.translate(g.identity(), [v.x, v.y, v.z])),
          (w = [0, 1, 0]),
          (t = 0),
          (y = n.cp3))
        ) {
          p = [y.x - v.x, y.y - v.y, y.z - v.z];
          v.x === y.x && v.z === y.z
            ? ((w = [0, 0, 1]), v.y < v.y && (t = d.PI))
            : ((t = e.vec3AngleFrom(w, p)), (w = a.cross(w, p, [])));
          0 !== t && g.rotate(u, t, w);
          v = [1, 0, 0];
          t = g.rotate(g.identity([]), t, w);
          g.multiplyVec3(t, v);
          t = n.cp4;
          w = n.cp5;
          if (t.y !== w.y || t.z !== w.z)
            (t = [w.x - t.x, w.y - t.y, w.z - t.z]),
              (w = e.vec3AngleFrom(v, t)),
              0 > a.dot(p, a.cross(v, t)) && (w *= -1),
              g.rotateY(u, w);
          l.macro_colorByChain ||
            ("shapely" === l.nucleics_residueColor
              ? m[n.name]
                ? h.material.setDiffuseColor(h, m[n.name].shapelyColor)
                : h.material.setDiffuseColor(h, m["*"].shapelyColor)
              : "rainbow" === l.nucleics_residueColor &&
                h.material.setDiffuseColor(
                  h,
                  f.rainbowAt(b, r, l.macro_rainbowColors)
                ));
          h.shader.setMatrixUniforms(h, u);
          h.drawElements(
            h.TRIANGLES,
            B.vertexIndexBuffer.numItems,
            h.UNSIGNED_SHORT,
            0
          );
        }
    };
  };
  p.Tube.prototype = new p._Mesh();
  p.CatmullTube = function (b, c, f, e) {
    var h = [];
    b.push(b[b.length - 1]);
    for (let a = 0, c = b.length - 2; a <= c; a++) {
      var g = b[0 == a ? 0 : a - 1],
        r = b[a + 0],
        n = b[a + 1],
        p = b[a == c ? a + 1 : a + 2],
        v = [];
      for (let b = 0; b < e; b++) {
        var m = b / e;
        a == c && (m = b / (e - 1));
        m = new k.Atom(
          "C",
          0.5 *
            (2 * r.x +
              (n.x - g.x) * m +
              (2 * g.x - 5 * r.x + 4 * n.x - p.x) * m * m +
              (3 * r.x - g.x - 3 * n.x + p.x) * m * m * m),
          0.5 *
            (2 * r.y +
              (n.y - g.y) * m +
              (2 * g.y - 5 * r.y + 4 * n.y - p.y) * m * m +
              (3 * r.y - g.y - 3 * n.y + p.y) * m * m * m),
          0.5 *
            (2 * r.z +
              (n.z - g.z) * m +
              (2 * g.z - 5 * r.z + 4 * n.z - p.z) * m * m +
              (3 * r.z - g.z - 3 * n.z + p.z) * m * m * m)
        );
        v.push(m);
      }
      h.push(v);
    }
    b = h[0].length;
    this.partitions = [];
    this.ends = [];
    this.ends.push(h[0][0]);
    this.ends.push(h[h.length - 1][0]);
    e = [1, 0, 0];
    for (let k = 0, u = h.length; k < u; k++) {
      if (!B || 65e3 < B.positionData.length) {
        0 < this.partitions.length && k--;
        var B = { count: 0, positionData: [], normalData: [], indexData: [] };
        this.partitions.push(B);
      }
      g = h[k];
      B.count++;
      for (r = 0; r < b; r++) {
        n = g[r];
        p =
          r === b - 1
            ? k === h.length - 1
              ? g[r - 1]
              : h[k + 1][0]
            : g[r + 1];
        p = [p.x - n.x, p.y - n.y, p.z - n.z];
        a.normalize(p);
        k === h.length - 1 && r === b - 1 && a.scale(p, -1);
        v = a.cross(p, e, []);
        a.normalize(v);
        a.scale(v, c / 2);
        p = new l(v, p, (2 * Math.PI) / f);
        for (let b = 0, a = f; b < a; b++)
          (v = p.rotate()),
            b === d.floor(f / 4) && (e = [v[0], v[1], v[2]]),
            B.normalData.push(v[0], v[1], v[2]),
            B.positionData.push(n.x + v[0], n.y + v[1], n.z + v[2]);
      }
    }
    for (let a = 0, d = this.partitions.length; a < d; a++) {
      c = this.partitions[a];
      for (let a = 0, d = c.count - 1; a < d; a++) {
        h = a * b * f;
        for (let a = 0, d = b; a < d; a++)
          for (B = h + a * f, e = 0; e <= f; e++)
            (g = B + (e % f)), c.indexData.push(g, g + f);
      }
    }
    this.storeData(
      this.partitions[0].positionData,
      this.partitions[0].normalData,
      this.partitions[0].indexData
    );
  };
  (p.CatmullTube.prototype = new p._Mesh()).render = function (a, c) {
    this.bindBuffers(a);
    for (let c = 0, f = this.partitions.length; c < f; c++) {
      var d = this.partitions[c];
      b(a, d);
      a.drawElements(
        a.TRIANGLE_STRIP,
        d.vertexIndexBuffer.numItems,
        a.UNSIGNED_SHORT,
        0
      );
    }
    a.sphereBuffer.bindBuffers(a);
    for (d = 0; 2 > d; d++) {
      var f = this.ends[d];
      f = g.translate(g.identity(), [f.x, f.y, f.z]);
      let b = c.proteins_tubeThickness / 2;
      g.scale(f, [b, b, b]);
      a.shader.setMatrixUniforms(a, f);
      a.drawElements(
        a.TRIANGLES,
        a.sphereBuffer.vertexIndexBuffer.numItems,
        a.UNSIGNED_SHORT,
        0
      );
    }
  };
})(
  ChemDoodle.extensions,
  ChemDoodle.RESIDUE,
  ChemDoodle.structures,
  ChemDoodle.structures.d3,
  Math,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3,
  ChemDoodle.math
);
(function (e, m, k, p, d) {
  e.UnitCell = function (d, a, f) {
    this.lengths = d;
    this.angles = a;
    this.offset = f;
    d = m.CIFInterpreter.generateABC2XYZ(d[0], d[1], d[2], a[0], a[1], a[2]);
    f || (this.offset = [0, 0, 0]);
    this.unitCellVectors = {
      o: k.multiplyVec3(d, this.offset, []),
      x: k.multiplyVec3(d, [
        this.offset[0] + 1,
        this.offset[1],
        this.offset[2],
      ]),
      y: k.multiplyVec3(d, [
        this.offset[0],
        this.offset[1] + 1,
        this.offset[2],
      ]),
      z: k.multiplyVec3(d, [
        this.offset[0],
        this.offset[1],
        this.offset[2] + 1,
      ]),
      xy: k.multiplyVec3(d, [
        this.offset[0] + 1,
        this.offset[1] + 1,
        this.offset[2],
      ]),
      xz: k.multiplyVec3(d, [
        this.offset[0] + 1,
        this.offset[1],
        this.offset[2] + 1,
      ]),
      yz: k.multiplyVec3(d, [
        this.offset[0],
        this.offset[1] + 1,
        this.offset[2] + 1,
      ]),
      xyz: k.multiplyVec3(d, [
        this.offset[0] + 1,
        this.offset[1] + 1,
        this.offset[2] + 1,
      ]),
    };
    let c = [],
      b = [];
    f = function (a, d, f, e) {
      c.push(a[0], a[1], a[2]);
      c.push(d[0], d[1], d[2]);
      c.push(f[0], f[1], f[2]);
      c.push(e[0], e[1], e[2]);
      for (a = 0; 4 > a; a++) b.push(0, 0, 0);
    };
    f(
      this.unitCellVectors.o,
      this.unitCellVectors.x,
      this.unitCellVectors.xy,
      this.unitCellVectors.y
    );
    f(
      this.unitCellVectors.o,
      this.unitCellVectors.y,
      this.unitCellVectors.yz,
      this.unitCellVectors.z
    );
    f(
      this.unitCellVectors.o,
      this.unitCellVectors.z,
      this.unitCellVectors.xz,
      this.unitCellVectors.x
    );
    f(
      this.unitCellVectors.yz,
      this.unitCellVectors.y,
      this.unitCellVectors.xy,
      this.unitCellVectors.xyz
    );
    f(
      this.unitCellVectors.xyz,
      this.unitCellVectors.xz,
      this.unitCellVectors.z,
      this.unitCellVectors.yz
    );
    f(
      this.unitCellVectors.xy,
      this.unitCellVectors.x,
      this.unitCellVectors.xz,
      this.unitCellVectors.xyz
    );
    f = [];
    for (d = 0; 6 > d; d++)
      (a = 4 * d), f.push(a, a + 1, a + 1, a + 2, a + 2, a + 3, a + 3, a);
    this.storeData(c, b, f);
  };
  (e.UnitCell.prototype = new e._Mesh()).render = function (d, a) {
    d.shader.setMatrixUniforms(d);
    this.bindBuffers(d);
    d.material.setDiffuseColor(d, a.shapes_color);
    d.lineWidth(a.shapes_lineWidth);
    d.drawElements(
      d.LINES,
      this.vertexIndexBuffer.numItems,
      d.UNSIGNED_SHORT,
      0
    );
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.io,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3
);
(function (e, m, k, p) {
  e.Framebuffer = function () {};
  e = e.Framebuffer.prototype;
  e.init = function (d) {
    this.framebuffer = d.createFramebuffer();
  };
  e.setColorTexture = function (d, e, a) {
    a = a === p ? 0 : a;
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    d.bindTexture(d.TEXTURE_2D, e);
    d.framebufferTexture2D(
      d.FRAMEBUFFER,
      d.COLOR_ATTACHMENT0 + a,
      d.TEXTURE_2D,
      e,
      0
    );
    d.bindTexture(d.TEXTURE_2D, null);
    d.bindFramebuffer(d.FRAMEBUFFER, null);
  };
  e.setColorRenderbuffer = function (d, e, a) {
    a = a === p ? 0 : a;
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    d.bindRenderbuffer(d.RENDERBUFFER, e);
    d.framebufferRenderbuffer(
      d.FRAMEBUFFER,
      d.COLOR_ATTACHMENT0 + a,
      d.RENDERBUFFER,
      e
    );
    d.bindRenderbuffer(d.RENDERBUFFER, null);
    d.bindFramebuffer(d.FRAMEBUFFER, null);
  };
  e.setDepthTexture = function (d, e) {
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    d.bindTexture(d.TEXTURE_2D, e);
    d.framebufferTexture2D(
      d.FRAMEBUFFER,
      d.DEPTH_ATTACHMENT,
      d.TEXTURE_2D,
      e,
      0
    );
    d.bindTexture(d.TEXTURE_2D, null);
    d.bindFramebuffer(d.FRAMEBUFFER, null);
  };
  e.setDepthRenderbuffer = function (d, e) {
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    d.bindRenderbuffer(d.RENDERBUFFER, e);
    d.framebufferRenderbuffer(
      d.FRAMEBUFFER,
      d.DEPTH_ATTACHMENT,
      d.RENDERBUFFER,
      e
    );
    d.bindRenderbuffer(d.RENDERBUFFER, null);
    d.bindFramebuffer(d.FRAMEBUFFER, null);
  };
  e.bind = function (d, e, a) {
    d.bindFramebuffer(d.FRAMEBUFFER, this.framebuffer);
    d.viewport(0, 0, e, a);
  };
})(ChemDoodle.structures.d3, ChemDoodle.math, document);
(function (e, m, k, p) {
  e.Renderbuffer = function () {};
  e = e.Renderbuffer.prototype;
  e.init = function (d, e) {
    this.renderbuffer = d.createRenderbuffer();
    this.format = e;
  };
  e.setParameter = function (d, e, a) {
    this.width = e;
    this.height = a;
    d.bindRenderbuffer(d.RENDERBUFFER, this.renderbuffer);
    d.renderbufferStorage(d.RENDERBUFFER, this.format, this.width, this.height);
    d.bindRenderbuffer(d.RENDERBUFFER, null);
  };
})(ChemDoodle.structures.d3, ChemDoodle.math, document);
(function (e, m, k, p) {
  m.SSAO = function () {};
  e = m.SSAO.prototype;
  e.initSampleKernel = function (d) {
    let e = [];
    for (let f = 0; f < d; f++) {
      let c = 2 * k.random() - 1,
        b = 2 * k.random() - 1,
        l = 2 * k.random() - 1;
      var a = f / d;
      a = 0.1 + a * a * 0.9;
      c *= a;
      b *= a;
      l *= a;
      e.push(c, b, l);
    }
    this.sampleKernel = new Float32Array(e);
  };
  e.initNoiseTexture = function (d) {
    let e = [];
    for (let a = 0; 16 > a; a++)
      e.push(2 * k.random() - 1), e.push(2 * k.random() - 1), e.push(0);
    this.noiseTexture = d.createTexture();
    d.bindTexture(d.TEXTURE_2D, this.noiseTexture);
    d.texImage2D(
      d.TEXTURE_2D,
      0,
      d.RGB,
      4,
      4,
      0,
      d.RGB,
      d.FLOAT,
      new Float32Array(e)
    );
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.REPEAT);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.REPEAT);
    d.bindTexture(d.TEXTURE_2D, null);
  };
})(ChemDoodle.math, ChemDoodle.structures.d3, Math);
(function (e, m, k, p) {
  e.Texture = function () {};
  e = e.Texture.prototype;
  e.init = function (d, e, a, f) {
    this.texture = d.createTexture();
    this.type = e;
    this.internalFormat = a;
    this.format = f !== p ? f : a;
    d.bindTexture(d.TEXTURE_2D, this.texture);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE);
    d.bindTexture(d.TEXTURE_2D, null);
  };
  e.setParameter = function (d, e, a) {
    this.width = e;
    this.height = a;
    d.bindTexture(d.TEXTURE_2D, this.texture);
    d.texImage2D(
      d.TEXTURE_2D,
      0,
      this.internalFormat,
      this.width,
      this.height,
      0,
      this.format,
      this.type,
      null
    );
    d.bindTexture(d.TEXTURE_2D, null);
  };
})(ChemDoodle.structures.d3, ChemDoodle.math, document);
(function (e, m, k, p, d) {
  e._Shader = function () {};
  e = e._Shader.prototype;
  e.useShaderProgram = function (d) {
    d.useProgram(this.gProgram);
    d.shader = this;
  };
  e.init = function (d) {
    let a = this.getShader(d, "vertex-shader");
    a || (a = this.loadDefaultVertexShader(d));
    let f = this.getShader(d, "fragment-shader");
    f || (f = this.loadDefaultFragmentShader(d));
    this.gProgram = d.createProgram();
    d.attachShader(this.gProgram, a);
    d.attachShader(this.gProgram, f);
    this.onShaderAttached(d);
    d.linkProgram(this.gProgram);
    d.getProgramParameter(this.gProgram, d.LINK_STATUS) ||
      alert(
        "Could not initialize shaders: " + d.getProgramInfoLog(this.gProgram)
      );
    d.useProgram(this.gProgram);
    this.initUniformLocations(d);
    d.useProgram(null);
  };
  e.onShaderAttached = function (d) {
    this.vertexPositionAttribute = 0;
    this.vertexNormalAttribute = 1;
    d.bindAttribLocation(
      this.gProgram,
      this.vertexPositionAttribute,
      "a_vertex_position"
    );
    d.bindAttribLocation(
      this.gProgram,
      this.vertexNormalAttribute,
      "a_vertex_normal"
    );
  };
  e.getShaderFromStr = function (e, a, f) {
    a = e.createShader(a);
    e.shaderSource(a, f);
    e.compileShader(a);
    return e.getShaderParameter(a, e.COMPILE_STATUS)
      ? a
      : (alert(shaderScript.type + " " + e.getShaderInfoLog(a)),
        e.deleteShader(a),
        d);
  };
  e.enableAttribsArray = function (d) {
    d.enableVertexAttribArray(this.vertexPositionAttribute);
  };
  e.disableAttribsArray = function (d) {
    d.disableVertexAttribArray(this.vertexPositionAttribute);
  };
  e.getShader = function (e, a) {
    a = p.getElementById(a);
    if (!a) return d;
    var f = [];
    let c = a.firstChild;
    for (; c; ) 3 === c.nodeType && f.push(c.textContent), (c = c.nextSibling);
    f = f.join("");
    if ("x-shader/x-fragment" === a.type)
      e = this.getShaderFromStr(e, e.FRAGMENT_SHADER, f);
    else if ("x-shader/x-vertex" === a.type)
      e = this.getShaderFromStr(e, e.VERTEX_SHADER, f);
    else return d;
    return e;
  };
  e.initUniformLocations = function (d) {
    this.modelViewMatrixUniform = d.getUniformLocation(
      this.gProgram,
      "u_model_view_matrix"
    );
    this.projectionMatrixUniform = d.getUniformLocation(
      this.gProgram,
      "u_projection_matrix"
    );
  };
  e.loadDefaultVertexShader = function (d) {};
  e.loadDefaultFragmentShader = function (d) {};
  e.setMatrixUniforms = function (e, a) {
    a === d
      ? this.setModelViewMatrix(e, e.modelViewMatrix)
      : this.setModelViewMatrix(e, k.multiply(e.modelViewMatrix, a, []));
  };
  e.setProjectionMatrix = function (d, a) {
    d.uniformMatrix4fv(this.projectionMatrixUniform, !1, a);
  };
  e.setModelViewMatrix = function (d, a) {
    d.uniformMatrix4fv(this.modelViewMatrixUniform, !1, a);
  };
  e.setMaterialAmbientColor = function (d, a) {};
  e.setMaterialDiffuseColor = function (d, a) {};
  e.setMaterialSpecularColor = function (d, a) {};
  e.setMaterialShininess = function (d, a) {};
  e.setMaterialAlpha = function (d, a) {};
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.FXAAShader = function () {};
  let g = e._Shader.prototype;
  e = e.FXAAShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.buffersizeUniform = a.getUniformLocation(
      this.gProgram,
      "u_buffersize"
    );
    this.antialiasUniform = a.getUniformLocation(this.gProgram, "u_antialias");
    this.edgeThresholdUniform = a.getUniformLocation(
      this.gProgram,
      "u_edge_threshold"
    );
    this.edgeThresholdMinUniform = a.getUniformLocation(
      this.gProgram,
      "u_edge_threshold_min"
    );
    this.searchStepsUniform = a.getUniformLocation(
      this.gProgram,
      "u_search_steps"
    );
    this.searchThresholdUniform = a.getUniformLocation(
      this.gProgram,
      "u_search_threshold"
    );
    this.subpixCapUniform = a.getUniformLocation(this.gProgram, "u_subpix_cap");
    this.subpixTrimUniform = a.getUniformLocation(
      this.gProgram,
      "u_subpix_trim"
    );
  };
  e.setBuffersize = function (a, d, c) {
    a.uniform2f(this.buffersizeUniform, d, c);
  };
  e.setAntialias = function (a, d) {
    a.uniform1f(this.antialiasUniform, d);
  };
  e.setEdgeThreshold = function (a, d) {
    a.uniform1f(this.edgeThresholdUniform, d);
  };
  e.setEdgeThresholdMin = function (a, d) {
    a.uniform1f(this.edgeThresholdMinUniform, d);
  };
  e.setSearchSteps = function (a, d) {
    a.uniform1i(this.searchStepsUniform, d);
  };
  e.setSearchThreshold = function (a, d) {
    a.uniform1f(this.searchThresholdUniform, d);
  };
  e.setSubpixCap = function (a, d) {
    a.uniform1f(this.subpixCapUniform, d);
  };
  e.setSubpixTrim = function (a, d) {
    a.uniform1f(this.subpixTrimUniform, d);
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;varying vec2 v_texcoord;void main() {gl_Position \x3d vec4(a_vertex_position, 1.);v_texcoord \x3d a_vertex_position.xy * .5 + .5;}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.FRAGMENT_SHADER,
      "precision mediump float;\nconst int fxaaMaxSearchSteps \x3d 128;\nuniform float u_edge_threshold;\nuniform float u_edge_threshold_min;\nuniform int u_search_steps;\nuniform float u_search_threshold;\nuniform float u_subpix_cap;\nuniform float u_subpix_trim;\nuniform sampler2D u_sampler0;\nuniform vec2 u_buffersize;\nuniform bool u_antialias;\nvarying vec2 v_texcoord;\nfloat FxaaLuma(vec3 rgb) {\nreturn rgb.y * (0.587/0.299) + rgb.x;\n}\nvec3 FxaaLerp3(vec3 a, vec3 b, float amountOfA) {\nreturn (vec3(-amountOfA) * b) + ((a * vec3(amountOfA)) + b);\n}\nvec4 FxaaTexOff(sampler2D tex, vec2 pos, vec2 off, vec2 rcpFrame) {\nreturn texture2D(tex, pos + off * rcpFrame);\n}\nvec3 FxaaPixelShader(vec2 pos, sampler2D tex, vec2 rcpFrame) {\nfloat subpix_trim_scale \x3d (1.0/(1.0 - u_subpix_trim));\nvec3 rgbN \x3d FxaaTexOff(tex, pos.xy, vec2( 0.,-1.), rcpFrame).xyz;\nvec3 rgbW \x3d FxaaTexOff(tex, pos.xy, vec2(-1., 0.), rcpFrame).xyz;\nvec3 rgbM \x3d FxaaTexOff(tex, pos.xy, vec2( 0., 0.), rcpFrame).xyz;\nvec3 rgbE \x3d FxaaTexOff(tex, pos.xy, vec2( 1., 0.), rcpFrame).xyz;\nvec3 rgbS \x3d FxaaTexOff(tex, pos.xy, vec2( 0., 1.), rcpFrame).xyz;\nfloat lumaN \x3d FxaaLuma(rgbN);\nfloat lumaW \x3d FxaaLuma(rgbW);\nfloat lumaM \x3d FxaaLuma(rgbM);\nfloat lumaE \x3d FxaaLuma(rgbE);\nfloat lumaS \x3d FxaaLuma(rgbS);\nfloat rangeMin \x3d min(lumaM, min(min(lumaN, lumaW), min(lumaS, lumaE)));\nfloat rangeMax \x3d max(lumaM, max(max(lumaN, lumaW), max(lumaS, lumaE)));\nfloat range \x3d rangeMax - rangeMin;\nif(range \x3c max(u_edge_threshold_min, rangeMax * u_edge_threshold)) {\nreturn rgbM;\n}\nvec3 rgbL \x3d rgbN + rgbW + rgbM + rgbE + rgbS;\nfloat lumaL \x3d (lumaN + lumaW + lumaE + lumaS) * 0.25;\nfloat rangeL \x3d abs(lumaL - lumaM);\nfloat blendL \x3d max(0.0, (rangeL / range) - u_subpix_trim) * subpix_trim_scale;\nblendL \x3d min(u_subpix_cap, blendL);\nvec3 rgbNW \x3d FxaaTexOff(tex, pos.xy, vec2(-1.,-1.), rcpFrame).xyz;\nvec3 rgbNE \x3d FxaaTexOff(tex, pos.xy, vec2( 1.,-1.), rcpFrame).xyz;\nvec3 rgbSW \x3d FxaaTexOff(tex, pos.xy, vec2(-1., 1.), rcpFrame).xyz;\nvec3 rgbSE \x3d FxaaTexOff(tex, pos.xy, vec2( 1., 1.), rcpFrame).xyz;\nrgbL +\x3d (rgbNW + rgbNE + rgbSW + rgbSE);\nrgbL *\x3d vec3(1.0/9.0);\nfloat lumaNW \x3d FxaaLuma(rgbNW);\nfloat lumaNE \x3d FxaaLuma(rgbNE);\nfloat lumaSW \x3d FxaaLuma(rgbSW);\nfloat lumaSE \x3d FxaaLuma(rgbSE);\nfloat edgeVert \x3d\nabs((0.25 * lumaNW) + (-0.5 * lumaN) + (0.25 * lumaNE)) +\nabs((0.50 * lumaW ) + (-1.0 * lumaM) + (0.50 * lumaE )) +\nabs((0.25 * lumaSW) + (-0.5 * lumaS) + (0.25 * lumaSE));\nfloat edgeHorz \x3d\nabs((0.25 * lumaNW) + (-0.5 * lumaW) + (0.25 * lumaSW)) +\nabs((0.50 * lumaN ) + (-1.0 * lumaM) + (0.50 * lumaS )) +\nabs((0.25 * lumaNE) + (-0.5 * lumaE) + (0.25 * lumaSE));\nbool horzSpan \x3d edgeHorz \x3e\x3d edgeVert;\nfloat lengthSign \x3d horzSpan ? -rcpFrame.y : -rcpFrame.x;\nif(!horzSpan) {\nlumaN \x3d lumaW;\nlumaS \x3d lumaE;\n}\nfloat gradientN \x3d abs(lumaN - lumaM);\nfloat gradientS \x3d abs(lumaS - lumaM);\nlumaN \x3d (lumaN + lumaM) * 0.5;\nlumaS \x3d (lumaS + lumaM) * 0.5;\nif (gradientN \x3c gradientS) {\nlumaN \x3d lumaS;\nlumaN \x3d lumaS;\ngradientN \x3d gradientS;\nlengthSign *\x3d -1.0;\n}\nvec2 posN;\nposN.x \x3d pos.x + (horzSpan ? 0.0 : lengthSign * 0.5);\nposN.y \x3d pos.y + (horzSpan ? lengthSign * 0.5 : 0.0);\ngradientN *\x3d u_search_threshold;\nvec2 posP \x3d posN;\nvec2 offNP \x3d horzSpan ? vec2(rcpFrame.x, 0.0) : vec2(0.0, rcpFrame.y);\nfloat lumaEndN \x3d lumaN;\nfloat lumaEndP \x3d lumaN;\nbool doneN \x3d false;\nbool doneP \x3d false;\nposN +\x3d offNP * vec2(-1.0, -1.0);\nposP +\x3d offNP * vec2( 1.0,  1.0);\nfor(int i \x3d 0; i \x3c fxaaMaxSearchSteps; i++) {\nif(i \x3e\x3d u_search_steps) break;\nif(!doneN) {\nlumaEndN \x3d FxaaLuma(texture2D(tex, posN.xy).xyz);\n}\nif(!doneP) {\nlumaEndP \x3d FxaaLuma(texture2D(tex, posP.xy).xyz);\n}\ndoneN \x3d doneN || (abs(lumaEndN - lumaN) \x3e\x3d gradientN);\ndoneP \x3d doneP || (abs(lumaEndP - lumaN) \x3e\x3d gradientN);\nif(doneN \x26\x26 doneP) {\nbreak;\n}\nif(!doneN) {\nposN -\x3d offNP;\n}\nif(!doneP) {\nposP +\x3d offNP;\n}\n}\nfloat dstN \x3d horzSpan ? pos.x - posN.x : pos.y - posN.y;\nfloat dstP \x3d horzSpan ? posP.x - pos.x : posP.y - pos.y;\nbool directionN \x3d dstN \x3c dstP;\nlumaEndN \x3d directionN ? lumaEndN : lumaEndP;\nif(((lumaM - lumaN) \x3c 0.0) \x3d\x3d ((lumaEndN - lumaN) \x3c 0.0)) {\nlengthSign \x3d 0.0;\n}\nfloat spanLength \x3d (dstP + dstN);\ndstN \x3d directionN ? dstN : dstP;\nfloat subPixelOffset \x3d (0.5 + (dstN * (-1.0/spanLength))) * lengthSign;\nvec3 rgbF \x3d texture2D(tex, vec2(\npos.x + (horzSpan ? 0.0 : subPixelOffset),\npos.y + (horzSpan ? subPixelOffset : 0.0))).xyz;\nreturn FxaaLerp3(rgbL, rgbF, blendL);\n}\nvoid main() {\ngl_FragColor \x3d texture2D(u_sampler0, v_texcoord);\nif(u_antialias) {\ngl_FragColor.xyz \x3d FxaaPixelShader(v_texcoord, u_sampler0, 1. / u_buffersize).xyz;\n}\n}"
    );
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.LabelShader = function () {};
  let g = e._Shader.prototype;
  e = e.LabelShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.dimensionUniform = a.getUniformLocation(this.gProgram, "u_dimension");
  };
  e.onShaderAttached = function (a) {
    g.onShaderAttached.call(this, a);
    this.vertexTexCoordAttribute = 2;
    a.bindAttribLocation(
      this.gProgram,
      this.vertexTexCoordAttribute,
      "a_vertex_texcoord"
    );
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;attribute vec3 a_vertex_normal;attribute vec2 a_vertex_texcoord;uniform mat4 u_model_view_matrix;uniform mat4 u_projection_matrix;uniform vec2 u_dimension;varying vec2 v_texcoord;void main() {gl_Position \x3d u_model_view_matrix * vec4(a_vertex_position, 1.);vec4 depth_pos \x3d vec4(gl_Position);depth_pos.z +\x3d a_vertex_normal.z;gl_Position \x3d u_projection_matrix * gl_Position;depth_pos \x3d u_projection_matrix * depth_pos;gl_Position /\x3d gl_Position.w;gl_Position.xy +\x3d a_vertex_normal.xy / u_dimension * 2.;gl_Position.z \x3d depth_pos.z / depth_pos.w;v_texcoord \x3d a_vertex_texcoord;}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    let d = [
      a.depthTextureExt ? "#define CWC_DEPTH_TEX\n" : "",
      "precision mediump float;uniform sampler2D u_image;varying vec2 v_texcoord;void main(void) {gl_FragColor \x3d texture2D(u_image, v_texcoord);}",
    ].join("");
    return this.getShaderFromStr(a, a.FRAGMENT_SHADER, d);
  };
  e.enableAttribsArray = function (a) {
    g.enableAttribsArray.call(this, a);
    a.enableVertexAttribArray(this.vertexNormalAttribute);
    a.enableVertexAttribArray(this.vertexTexCoordAttribute);
  };
  e.disableAttribsArray = function (a) {
    g.disableAttribsArray.call(this, a);
    a.disableVertexAttribArray(this.vertexNormalAttribute);
    a.disableVertexAttribArray(this.vertexTexCoordAttribute);
  };
  e.setDimension = function (a, d, c) {
    a.uniform2f(this.dimensionUniform, d, c);
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.LightingShader = function () {};
  let g = e._Shader.prototype;
  e = e.LightingShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.positionSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_position_sample"
    );
    this.colorSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_color_sample"
    );
    this.ssaoSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_ssao_sample"
    );
    this.outlineSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_outline_sample"
    );
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;varying vec2 v_texcoord;void main() {gl_Position \x3d vec4(a_vertex_position, 1.);v_texcoord \x3d a_vertex_position.xy * .5 + .5;}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.FRAGMENT_SHADER,
      "precision mediump float;uniform sampler2D u_position_sample;uniform sampler2D u_color_sample;uniform sampler2D u_ssao_sample;uniform sampler2D u_outline_sample;varying vec2 v_texcoord;void main() {vec4 position \x3d texture2D(u_position_sample, v_texcoord);vec4 color \x3d texture2D(u_color_sample, v_texcoord);vec4 ao \x3d texture2D(u_ssao_sample, v_texcoord);float outline \x3d texture2D(u_outline_sample, v_texcoord).r;if(position.w \x3d\x3d 0. \x26\x26 outline \x3d\x3d 1.) {return;}gl_FragColor \x3d vec4(color.rgb * ao.r * outline, 1.);}"
    );
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.NormalShader = function () {};
  let g = e._Shader.prototype;
  e = e.NormalShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.normalMatrixUniform = a.getUniformLocation(
      this.gProgram,
      "u_normal_matrix"
    );
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;attribute vec3 a_vertex_normal;uniform mat4 u_model_view_matrix;uniform mat4 u_projection_matrix;uniform mat3 u_normal_matrix;varying vec3 v_normal;void main() {v_normal \x3d length(a_vertex_normal)\x3d\x3d0. ? a_vertex_normal : u_normal_matrix * a_vertex_normal;gl_Position \x3d u_projection_matrix * u_model_view_matrix * vec4(a_vertex_position, 1.);}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.FRAGMENT_SHADER,
      "precision mediump float;varying vec3 v_normal;void main(void) {vec3 normal \x3d length(v_normal)\x3d\x3d0. ? vec3(0., 0., 1.) : normalize(v_normal);gl_FragColor \x3d vec4(normal, 0.);}"
    );
  };
  e.enableAttribsArray = function (a) {
    g.enableAttribsArray.call(this, a);
    a.enableVertexAttribArray(this.vertexNormalAttribute);
  };
  e.disableAttribsArray = function (a) {
    g.disableAttribsArray.call(this, a);
    a.disableVertexAttribArray(this.vertexNormalAttribute);
  };
  e.setModelViewMatrix = function (a, d) {
    g.setModelViewMatrix.call(this, a, d);
    d = m.transpose(k.toInverseMat3(d, []));
    a.uniformMatrix3fv(this.normalMatrixUniform, !1, d);
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.OutlineShader = function () {};
  let g = e._Shader.prototype;
  e = e.OutlineShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.normalSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_normal_sample"
    );
    this.depthSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_depth_sample"
    );
    this.gbufferTextureSizeUniform = a.getUniformLocation(
      this.gProgram,
      "u_gbuffer_texture_size"
    );
    this.normalThresholdUniform = a.getUniformLocation(
      this.gProgram,
      "u_normal_threshold"
    );
    this.depthThresholdUniform = a.getUniformLocation(
      this.gProgram,
      "u_depth_threshold"
    );
    this.thicknessUniform = a.getUniformLocation(this.gProgram, "u_thickness");
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;varying vec2 v_texcoord;void main() {gl_Position \x3d vec4(a_vertex_position, 1.);v_texcoord \x3d a_vertex_position.xy * .5 + .5;}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.FRAGMENT_SHADER,
      "precision mediump float;uniform sampler2D u_normal_sample;uniform sampler2D u_depth_sample;uniform float u_normal_threshold;uniform float u_depth_threshold;uniform float u_thickness;uniform vec2 u_gbuffer_texture_size;varying vec2 v_texcoord;void main() {vec3 normal \x3d texture2D(u_normal_sample, v_texcoord).xyz;float depth \x3d texture2D(u_depth_sample, v_texcoord).r;vec2 texelSize \x3d u_thickness/u_gbuffer_texture_size * .5;vec2 offsets[8];offsets[0] \x3d vec2(-texelSize.x, -texelSize.y);offsets[1] \x3d vec2(-texelSize.x, 0);offsets[2] \x3d vec2(-texelSize.x, texelSize.y);offsets[3] \x3d vec2(0, -texelSize.y);offsets[4] \x3d vec2(0,  texelSize.y);offsets[5] \x3d vec2(texelSize.x, -texelSize.y);offsets[6] \x3d vec2(texelSize.x, 0);offsets[7] \x3d vec2(texelSize.x, texelSize.y);float edge \x3d 0.;for (int i \x3d 0; i \x3c 8; i++) {vec3 sampleNorm \x3d texture2D(u_normal_sample, v_texcoord + offsets[i]).xyz;if(normal \x3d\x3d vec3(.0, .0, .0)) {if(sampleNorm !\x3d vec3(.0, .0, .0)) {edge \x3d 1.0;break;}continue;}if (dot(sampleNorm, normal) \x3c u_normal_threshold) {edge \x3d 1.0;break;}float sampleDepth \x3d texture2D(u_depth_sample, v_texcoord + offsets[i]).r;if (abs(sampleDepth - depth) \x3e u_depth_threshold) {edge \x3d 1.0;break;}}edge \x3d 1. - edge;gl_FragColor \x3d vec4(edge, edge, edge, 1.);}"
    );
  };
  e.setGbufferTextureSize = function (a, d, c) {
    a.uniform2f(this.gbufferTextureSizeUniform, d, c);
  };
  e.setNormalThreshold = function (a, d) {
    a.uniform1f(this.normalThresholdUniform, d);
  };
  e.setDepthThreshold = function (a, d) {
    a.uniform1f(this.depthThresholdUniform, d);
  };
  e.setThickness = function (a, d) {
    a.uniform1f(this.thicknessUniform, d);
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.PhongShader = function () {};
  let g = e._Shader.prototype;
  e = e.PhongShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.shadowUniform = a.getUniformLocation(this.gProgram, "u_shadow");
    this.flatColorUniform = a.getUniformLocation(this.gProgram, "u_flat_color");
    this.normalMatrixUniform = a.getUniformLocation(
      this.gProgram,
      "u_normal_matrix"
    );
    this.lightModelViewMatrixUniform = a.getUniformLocation(
      this.gProgram,
      "u_light_model_view_matrix"
    );
    this.lightProjectionMatrixUniform = a.getUniformLocation(
      this.gProgram,
      "u_light_projection_matrix"
    );
    this.lightDiffuseColorUniform = a.getUniformLocation(
      this.gProgram,
      "u_light_diffuse_color"
    );
    this.lightSpecularColorUniform = a.getUniformLocation(
      this.gProgram,
      "u_light_specular_color"
    );
    this.lightDirectionUniform = a.getUniformLocation(
      this.gProgram,
      "u_light_direction"
    );
    this.materialAmbientColorUniform = a.getUniformLocation(
      this.gProgram,
      "u_material_ambient_color"
    );
    this.materialDiffuseColorUniform = a.getUniformLocation(
      this.gProgram,
      "u_material_diffuse_color"
    );
    this.materialSpecularColorUniform = a.getUniformLocation(
      this.gProgram,
      "u_material_specular_color"
    );
    this.materialShininessUniform = a.getUniformLocation(
      this.gProgram,
      "u_material_shininess"
    );
    this.materialAlphaUniform = a.getUniformLocation(
      this.gProgram,
      "u_material_alpha"
    );
    this.fogModeUniform = a.getUniformLocation(this.gProgram, "u_fog_mode");
    this.fogColorUniform = a.getUniformLocation(this.gProgram, "u_fog_color");
    this.fogStartUniform = a.getUniformLocation(this.gProgram, "u_fog_start");
    this.fogEndUniform = a.getUniformLocation(this.gProgram, "u_fog_end");
    this.fogDensityUniform = a.getUniformLocation(
      this.gProgram,
      "u_fog_density"
    );
    this.shadowDepthSampleUniform = a.getUniformLocation(
      this.gProgram,
      "u_shadow_depth_sample"
    );
    this.shadowTextureSizeUniform = a.getUniformLocation(
      this.gProgram,
      "u_shadow_texture_size"
    );
    this.shadowIntensityUniform = a.getUniformLocation(
      this.gProgram,
      "u_shadow_intensity"
    );
    this.gammaCorrectionUniform = a.getUniformLocation(
      this.gProgram,
      "u_gamma_inverted"
    );
    this.pointSizeUniform = a.getUniformLocation(this.gProgram, "u_point_size");
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;attribute vec3 a_vertex_normal;uniform vec3 u_light_diffuse_color;uniform vec3 u_material_ambient_color;uniform vec3 u_material_diffuse_color;uniform mat4 u_model_view_matrix;uniform mat4 u_projection_matrix;uniform mat3 u_normal_matrix;uniform mat4 u_light_model_view_matrix;uniform mat4 u_light_projection_matrix;uniform bool u_shadow;varying vec3 v_viewpos;varying vec4 v_shadcoord;varying vec3 v_diffuse;varying vec3 v_ambient;varying vec3 v_normal;uniform float u_point_size;void main() {v_normal \x3d length(a_vertex_normal)\x3d\x3d0. ? a_vertex_normal : u_normal_matrix * a_vertex_normal;v_ambient \x3d u_material_ambient_color;v_diffuse \x3d u_material_diffuse_color * u_light_diffuse_color;if(u_shadow) {v_shadcoord \x3d u_light_projection_matrix * u_light_model_view_matrix * vec4(a_vertex_position, 1.);v_shadcoord /\x3d v_shadcoord.w;}vec4 viewPos \x3d u_model_view_matrix * vec4(a_vertex_position, 1.);v_viewpos \x3d viewPos.xyz / viewPos.w;gl_Position \x3d u_projection_matrix * viewPos;gl_Position /\x3d gl_Position.w;gl_PointSize \x3d u_point_size;}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    let d = [
      a.depthTextureExt ? "#define CWC_DEPTH_TEX\n" : "",
      "precision mediump float;uniform vec3 u_light_specular_color;uniform vec3 u_light_direction;uniform vec3 u_material_specular_color;uniform float u_material_shininess;uniform float u_material_alpha;uniform int u_fog_mode;uniform vec3 u_fog_color;uniform float u_fog_density;uniform float u_fog_start;uniform float u_fog_end;uniform bool u_shadow;uniform float u_shadow_intensity;uniform bool u_flat_color;uniform float u_gamma_inverted;uniform sampler2D u_shadow_depth_sample;uniform vec2 u_shadow_texture_size;varying vec3 v_viewpos;varying vec4 v_shadcoord;varying vec3 v_diffuse;varying vec3 v_ambient;varying vec3 v_normal;\n#ifndef CWC_DEPTH_TEX\nfloat unpack (vec4 colour) {const vec4 bitShifts \x3d vec4(1.,1. / 255.,1. / (255. * 255.),1. / (255. * 255. * 255.));return dot(colour, bitShifts);}\n#endif\nfloat shadowMapDepth(vec4 shadowMapColor) {float zShadowMap;\n#ifdef CWC_DEPTH_TEX\nzShadowMap \x3d shadowMapColor.r;\n#else\nzShadowMap \x3d unpack(shadowMapColor);\n#endif\nreturn zShadowMap;}void main(void) {vec3 color \x3d v_diffuse;if(length(v_normal)!\x3d0.){vec3 normal \x3d normalize(v_normal);vec3 lightDir \x3d normalize(-u_light_direction);float nDotL \x3d dot(normal, lightDir);float shadow \x3d 0.0;if(u_shadow) {vec3 depthCoord \x3d .5 + v_shadcoord.xyz / v_shadcoord.w * .5;if(depthCoord.z \x3c\x3d 1. \x26\x26 depthCoord.z \x3e\x3d 0.) {float bias \x3d max(.05 * (1. - nDotL), .005);vec2 texelSize \x3d 1. / u_shadow_texture_size;for(int x \x3d -1; x \x3c\x3d 1; ++x) {for(int y \x3d -1; y \x3c\x3d 1; ++y)  {vec4 shadowMapColor \x3d texture2D(u_shadow_depth_sample, depthCoord.xy + vec2(x, y) * texelSize);float zShadowMap \x3d shadowMapDepth(shadowMapColor);shadow +\x3d zShadowMap + bias \x3c depthCoord.z ? 1. : 0.;}}shadow /\x3d 9.;shadow *\x3d u_shadow_intensity;}}if(!u_flat_color) {vec3 viewDir \x3d normalize(-v_viewpos);vec3 halfDir \x3d normalize(lightDir + viewDir);float nDotHV \x3d max(dot(halfDir, normal), 0.);vec3 specular \x3d u_material_specular_color * u_light_specular_color;color*\x3dmax(nDotL, 0.);color+\x3dspecular * pow(nDotHV, u_material_shininess);}color \x3d (1.-shadow)*color+v_ambient;}gl_FragColor \x3d vec4(pow(color, vec3(u_gamma_inverted)), u_material_alpha);if(u_fog_mode !\x3d 0){float fogCoord \x3d 1.-clamp((u_fog_end - gl_FragCoord.z/gl_FragCoord.w) / (u_fog_end - u_fog_start), 0., 1.);float fogFactor \x3d 1.;if(u_fog_mode \x3d\x3d 1){fogFactor \x3d 1.-fogCoord;}else if(u_fog_mode \x3d\x3d 2) {fogFactor \x3d clamp(exp(-u_fog_density*fogCoord), 0., 1.);}else if(u_fog_mode \x3d\x3d 3) {fogFactor \x3d clamp(exp(-pow(u_fog_density*fogCoord, 2.)), 0., 1.);}gl_FragColor \x3d mix(vec4(u_fog_color, 1.), gl_FragColor, fogFactor);}}",
    ].join("");
    return this.getShaderFromStr(a, a.FRAGMENT_SHADER, d);
  };
  e.enableAttribsArray = function (a) {
    g.enableAttribsArray.call(this, a);
    a.enableVertexAttribArray(this.vertexNormalAttribute);
  };
  e.disableAttribsArray = function (a) {
    g.disableAttribsArray.call(this, a);
    a.disableVertexAttribArray(this.vertexNormalAttribute);
  };
  e.setMatrixUniforms = function (a, f) {
    if (f === d)
      this.setModelViewMatrix(a, a.modelViewMatrix),
        this.setLightModelViewMatrix(a, a.lightViewMatrix);
    else {
      let c = k.multiply(a.modelViewMatrix, f, []);
      f = k.multiply(a.lightViewMatrix, f, []);
      this.setModelViewMatrix(a, c);
      this.setLightModelViewMatrix(a, f);
    }
  };
  e.setModelViewMatrix = function (a, d) {
    g.setModelViewMatrix.call(this, a, d);
    d = m.transpose(k.toInverseMat3(d, []));
    a.uniformMatrix3fv(this.normalMatrixUniform, !1, d);
  };
  e.setFlatColor = function (a, d) {
    a.uniform1i(this.flatColorUniform, d);
  };
  e.setShadow = function (a, d) {
    a.uniform1i(this.shadowUniform, d);
  };
  e.setFogMode = function (a, d) {
    a.uniform1i(this.fogModeUniform, d);
  };
  e.setFogColor = function (a, d) {
    a.uniform3fv(this.fogColorUniform, d);
  };
  e.setFogStart = function (a, d) {
    a.uniform1f(this.fogStartUniform, d);
  };
  e.setFogEnd = function (a, d) {
    a.uniform1f(this.fogEndUniform, d);
  };
  e.setFogDensity = function (a, d) {
    a.uniform1f(this.fogDensityUniform, d);
  };
  e.setMaterialAmbientColor = function (a, d) {
    a.uniform3fv(this.materialAmbientColorUniform, d);
  };
  e.setMaterialDiffuseColor = function (a, d) {
    a.uniform3fv(this.materialDiffuseColorUniform, d);
  };
  e.setMaterialSpecularColor = function (a, d) {
    a.uniform3fv(this.materialSpecularColorUniform, d);
  };
  e.setMaterialShininess = function (a, d) {
    a.uniform1f(this.materialShininessUniform, d);
  };
  e.setMaterialAlpha = function (a, d) {
    a.uniform1f(this.materialAlphaUniform, d);
  };
  e.setLightDiffuseColor = function (a, d) {
    a.uniform3fv(this.lightDiffuseColorUniform, d);
  };
  e.setLightSpecularColor = function (a, d) {
    a.uniform3fv(this.lightSpecularColorUniform, d);
  };
  e.setLightDirection = function (a, d) {
    a.uniform3fv(this.lightDirectionUniform, d);
  };
  e.setLightModelViewMatrix = function (a, d) {
    a.uniformMatrix4fv(this.lightModelViewMatrixUniform, !1, d);
  };
  e.setLightProjectionMatrix = function (a, d) {
    a.uniformMatrix4fv(this.lightProjectionMatrixUniform, !1, d);
  };
  e.setShadowTextureSize = function (a, d, c) {
    a.uniform2f(this.shadowTextureSizeUniform, d, c);
  };
  e.setShadowIntensity = function (a, d) {
    a.uniform1f(this.shadowIntensityUniform, d);
  };
  e.setGammaCorrection = function (a, d) {
    a.uniform1f(this.gammaCorrectionUniform, 1 / d);
  };
  e.setPointSize = function (a, d) {
    a.uniform1f(this.pointSizeUniform, d);
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.PickShader = function () {};
  let g = e._Shader.prototype;
  e = e.PickShader.prototype = new e._Shader();
  e.initUniformLocations = function (a) {
    g.initUniformLocations.call(this, a);
    this.materialDiffuseColorUniform = a.getUniformLocation(
      this.gProgram,
      "u_material_diffuse_color"
    );
  };
  e.loadDefaultVertexShader = function (a) {
    return this.getShaderFromStr(
      a,
      a.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;uniform mat4 u_model_view_matrix;uniform mat4 u_projection_matrix;void main() {gl_Position \x3d u_projection_matrix * u_model_view_matrix * vec4(a_vertex_position, 1.);gl_Position /\x3d gl_Position.w;}"
    );
  };
  e.loadDefaultFragmentShader = function (a) {
    let d = [
      a.depthTextureExt ? "#define CWC_DEPTH_TEX\n" : "",
      "precision mediump float;uniform vec3 u_material_diffuse_color;void main(void) {gl_FragColor \x3d vec4(u_material_diffuse_color, 1.);}",
    ].join("");
    return this.getShaderFromStr(a, a.FRAGMENT_SHADER, d);
  };
  e.setMaterialDiffuseColor = function (a, d) {
    a.uniform3fv(this.materialDiffuseColorUniform, d);
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.PositionShader = function () {};
  e = e.PositionShader.prototype = new e._Shader();
  e.loadDefaultVertexShader = function (d) {
    return this.getShaderFromStr(
      d,
      d.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;uniform mat4 u_model_view_matrix;uniform mat4 u_projection_matrix;varying vec4 v_position;void main() {vec4 viewPos \x3d u_model_view_matrix * vec4(a_vertex_position, 1.);gl_Position \x3d u_projection_matrix * viewPos;v_position \x3d viewPos / viewPos.w;}"
    );
  };
  e.loadDefaultFragmentShader = function (d) {
    return this.getShaderFromStr(
      d,
      d.FRAGMENT_SHADER,
      "precision mediump float;varying vec4 v_position;void main(void) {gl_FragColor \x3d v_position;}"
    );
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d) {
  e.QuadShader = function () {};
  e = e.QuadShader.prototype = new e._Shader();
  e.loadDefaultVertexShader = function (d) {
    return this.getShaderFromStr(
      d,
      d.VERTEX_SHADER,
      "precision mediump float;attribute vec3 a_vertex_position;varying vec2 v_texcoord;void main() {gl_Position \x3d vec4(a_vertex_position, 1.);v_texcoord \x3d a_vertex_position.xy * .5 + .5;}"
    );
  };
  e.loadDefaultFragmentShader = function (d) {
    return this.getShaderFromStr(
      d,
      d.FRAGMENT_SHADER,
      "precision mediump float;uniform sampler2D u_image;varying vec2 v_texcoord;void main() {gl_FragColor \x3d texture2D(u_image, v_texcoord);}"
    );
  };
})(
  ChemDoodle.structures.d3,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.mat4,
  document
);
(function (e, m, k, p, d, g, a) {
  function f(b, a, c, d, f, n) {
    c = b[0] * n + c - n;
    d = b[1] * n + d - n;
    b = b[2] * n + f - n;
    f = -1;
    for (let e = 0, h = a.length; e < h; e++)
      if (
        ((n = a[e]),
        0.001 > g.abs(n.x - c) &&
          0.001 > g.abs(n.y - d) &&
          0.001 > g.abs(n.z - b))
      ) {
        f = e;
        break;
      }
    -1 == f && ((f = a.length), a.push(new e.Atom("C", c, d, b)));
    return f;
  }
  let c = function (a, c, d) {
    this.i1 = a;
    this.i2 = c;
    this.i3 = d;
  };
  m._Surface = function () {};
  m = m._Surface.prototype = new m._Mesh();
  m.generate = function (a, c, d, f, e, g, k, p) {
    a = [];
    c = e[4] - f;
    for (d = 0; d < p; d++) {
      let b = e[2] - f;
      for (let d = 0; d < k; d++) {
        let d = e[0] - f;
        for (let e = 0; e < g; e++) a.push(this.calculate(d, b, c)), (d += f);
        b += f;
      }
      c += f;
    }
    return a;
  };
  m.build = function (a, l, h) {
    let b = [],
      k = [],
      n = [];
    var u = [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity];
    l += 2;
    for (let b = 0, c = a.length; b < c; b++) {
      var m = a[b];
      u[0] = g.min(u[0], m.x - l);
      u[1] = g.max(u[1], m.x + l);
      u[2] = g.min(u[2], m.y - l);
      u[3] = g.max(u[3], m.y + l);
      u[4] = g.min(u[4], m.z - l);
      u[5] = g.max(u[5], m.z + l);
    }
    a = u;
    l = a[1] - a[0];
    m = a[3] - a[2];
    var y = a[5] - a[4];
    u = g.min(l, g.min(m, y)) / h;
    h = 2 + g.ceil(l / u);
    var x = 2 + g.ceil(m / u),
      t = 2 + g.ceil(y / u);
    l = this.generate(l, m, y, u, a, h, x, t);
    l = p(l, [h, x, t]);
    h = [];
    m = [];
    for (let b = 0, c = l.vertices.length; b < c; b++)
      m.push(f(l.vertices[b], h, a[0], a[2], a[4], u));
    a = [];
    for (let b = 0, d = l.faces.length; b < d; b++)
      (x = l.faces[b]),
        (u = m[x[0]]),
        (y = m[x[1]]),
        (x = m[x[2]]),
        a.push(new c(u, y, x)),
        n.push(u, y, x);
    u = [];
    for (let b = 0, c = h.length; b < c; b++) {
      l = [];
      for (let c = 0, d = a.length; c < d; c++)
        if (((m = a[c]), m.i1 === b || m.i2 === b || m.i3 === b))
          m.i1 != b && -1 === l.indexOf(m.i1) && l.push(m.i1),
            m.i2 != b && -1 === l.indexOf(m.i2) && l.push(m.i2),
            m.i3 != b && -1 === l.indexOf(m.i3) && l.push(m.i3);
      u.push(l);
    }
    l = [];
    for (let a = 0, b = h.length; a < b; a++) {
      y = h[a];
      x = u[a];
      m = new e.Atom();
      if (3 > x.length) (m.x = y.x), (m.y = y.y), (m.z = y.z);
      else {
        t = 1;
        5 > x.length && (t = 0.5);
        for (let a = 0, b = x.length; a < b; a++) {
          let b = h[x[a]];
          m.x += b.x;
          m.y += b.y;
          m.z += b.z;
        }
        m.x += y.x * t;
        m.y += y.y * t;
        m.z += y.z * t;
        y = 1 / (t + x.length);
        m.x *= y;
        m.y *= y;
        m.z *= y;
      }
      l.push(m);
    }
    h = l;
    for (let a = 0, c = h.length; a < c; a++) (u = h[a]), b.push(u.x, u.y, u.z);
    for (let b = 0, c = a.length; b < c; b++)
      (u = a[b]),
        (l = h[u.i1]),
        (y = h[u.i2]),
        (m = h[u.i3]),
        (y = [y.x - l.x, y.y - l.y, y.z - l.z]),
        d.cross(y, [m.x - l.x, m.y - l.y, m.z - l.z]),
        isNaN(y[0]) && (y = [0, 0, 0]),
        (u.normal = y);
    for (let b = 0, c = h.length; b < c; b++) {
      h = [0, 0, 0];
      for (let c = 0, d = a.length; c < d; c++)
        if (((u = a[c]), u.i1 === b || u.i2 === b || u.i3 === b))
          (h[0] += u.normal[0]), (h[1] += u.normal[1]), (h[2] += u.normal[2]);
      d.normalize(h);
      k.push(h[0], h[1], h[2]);
    }
    this.storeData(b, k, n);
  };
  m.render = function (a, c) {
    this.styles && (c = this.styles);
    c.surfaces_display &&
      (a.shader.setMatrixUniforms(a),
      this.bindBuffers(a),
      a.material.setTempColors(
        a,
        c.surfaces_materialAmbientColor_3D,
        c.surfaces_color,
        c.surfaces_materialSpecularColor_3D,
        c.surfaces_materialShininess_3D
      ),
      a.material.setAlpha(a, c.surfaces_alpha),
      "Dots" === c.surfaces_style
        ? (a.shader.setPointSize(a, c.shapes_pointSize),
          a.drawElements(
            a.POINTS,
            this.vertexIndexBuffer.numItems,
            a.UNSIGNED_SHORT,
            0
          ))
        : "Mesh" === c.surfaces_style
        ? (a.lineWidth(c.shapes_lineWidth),
          a.drawElements(
            a.LINES,
            this.vertexIndexBuffer.numItems,
            a.UNSIGNED_SHORT,
            0
          ))
        : a.drawElements(
            a.TRIANGLES,
            this.vertexIndexBuffer.numItems,
            a.UNSIGNED_SHORT,
            0
          ));
  };
})(
  ChemDoodle.structures,
  ChemDoodle.structures.d3,
  ChemDoodle.ELEMENT,
  ChemDoodle.lib.MarchingCubes,
  ChemDoodle.lib.vec3,
  Math
);
(function (e, m, k, p, d) {
  m.SASSurface = function (d, a, f) {
    this.atoms = d;
    this.probeRadius = a;
    this.resolution = f;
    this.build(d, a, f);
  };
  (m.SASSurface.prototype = new m._Surface()).calculate = function (d, a, f) {
    let c = Infinity;
    d = new e.Atom("C", d, a, f);
    for (let b = 0, e = this.atoms.length; b < e; b++)
      (a = this.atoms[b]),
        (f =
          k[a.label] && 0 !== k[a.label].vdWRadius ? k[a.label].vdWRadius : 2),
        (a = a.distance3D(d) - this.probeRadius - f),
        (c = p.min(c, a));
    return c;
  };
})(ChemDoodle.structures, ChemDoodle.structures.d3, ChemDoodle.ELEMENT, Math);
(function (e, m, k, p, d) {
  m.VDWSurface = function (d, a) {
    this.atoms = d;
    this.probeRadius = 0;
    this.resolution = a;
    this.build(d, 0, a);
  };
  (m.VDWSurface.prototype = new m._Surface()).calculate = function (d, a, f) {
    let c = Infinity;
    d = new e.Atom("C", d, a, f);
    for (let b = 0, e = this.atoms.length; b < e; b++)
      (a = this.atoms[b]),
        (f =
          k[a.label] && 0 !== k[a.label].vdWRadius ? k[a.label].vdWRadius : 2),
        (a = a.distance3D(d) - f),
        (c = p.min(c, a));
    return c;
  };
})(ChemDoodle.structures, ChemDoodle.structures.d3, ChemDoodle.ELEMENT, Math);
(function (e, m, k, p) {
  e.Plate = function (d) {
    this.lanes = Array(d);
    i = 0;
    for (ii = d; i < ii; i++) this.lanes[i] = [];
  };
  p = e.Plate.prototype;
  p.sort = function () {
    i = 0;
    for (ii = this.lanes.length; i < ii; i++)
      this.lanes[i].sort(function (d, e) {
        return d - e;
      });
  };
  p.draw = function (d, e) {
    e = d.canvas.width;
    var a = d.canvas.height;
    this.origin = (9 * a) / 10;
    this.front = a / 10;
    this.laneLength = this.origin - this.front;
    d.strokeStyle = "#000000";
    d.beginPath();
    d.moveTo(0, this.front);
    d.lineTo(e, this.front);
    d.setLineDash([3]);
    d.stroke();
    d.setLineDash([]);
    d.beginPath();
    d.moveTo(0, this.origin);
    d.lineTo(e, this.origin);
    d.closePath();
    d.stroke();
    i = 0;
    for (ii = this.lanes.length; i < ii; i++)
      for (
        a = ((i + 1) * e) / (ii + 1),
          d.beginPath(),
          d.moveTo(a, this.origin),
          d.lineTo(a, this.origin + 3),
          d.closePath(),
          d.stroke(),
          s = 0,
          ss = this.lanes[i].length;
        s < ss;
        s++
      ) {
        let f = this.origin - this.laneLength * this.lanes[i][s].rf;
        switch (this.lanes[i][s].type) {
          case "compact":
            d.beginPath();
            d.arc(a, f, 3, 0, 2 * k.PI, !1);
            d.closePath();
            break;
          case "expanded":
            d.beginPath();
            d.arc(a, f, 7, 0, 2 * k.PI, !1);
            d.closePath();
            break;
          case "widened":
            m.contextEllipse(d, a - 18, f - 10, 36, 10);
            break;
          case "cresent":
            d.beginPath(), d.arc(a, f, 9, 0, k.PI, !0), d.closePath();
        }
        switch (this.lanes[i][s].style) {
          case "solid":
            d.fillStyle = "#000000";
            d.fill();
            break;
          case "transparent":
            d.stroke();
        }
      }
  };
  e.Plate.Spot = function (d, e, a) {
    this.type = d;
    this.rf = e;
    this.style = a ? a : "solid";
  };
})(ChemDoodle.structures, ChemDoodle.extensions, Math);
(function (e, m, k, p, d, g) {
  e.DEFAULT_STYLES = {
    backgroundColor: "#FFFFFF",
    scale: 1,
    rotateAngle: 0,
    bondLength_2D: 20,
    angstromsPerBondLength: 1.25,
    lightDirection_3D: [-0.1, -0.1, -1],
    lightDiffuseColor_3D: "#FFFFFF",
    lightSpecularColor_3D: "#FFFFFF",
    projectionPerspective_3D: !0,
    projectionPerspectiveVerticalFieldOfView_3D: 45,
    projectionOrthoWidth_3D: 40,
    projectionWidthHeightRatio_3D: g,
    projectionFrontCulling_3D: 0.1,
    projectionBackCulling_3D: 1e4,
    cullBackFace_3D: !0,
    fog_mode_3D: 0,
    fog_color_3D: "#000000",
    fog_start_3D: 0,
    fog_end_3D: 1,
    fog_density_3D: 1,
    shadow_3D: !1,
    shadow_intensity_3D: 0.85,
    flat_color_3D: !1,
    antialias_3D: !0,
    gammaCorrection_3D: 2.2,
    colorHover: "#885110",
    colorSelect: "#0060B2",
    colorError: "#c10000",
    colorPreview: "#00FF00",
    ssao_3D: !1,
    ssao_kernel_radius: 17,
    ssao_kernel_samples: 32,
    ssao_power: 1,
    outline_3D: !1,
    outline_thickness: 1,
    outline_normal_threshold: 0.85,
    outline_depth_threshold: 0.1,
    fxaa_edgeThreshold: 0.0625,
    fxaa_edgeThresholdMin: 1 / 12,
    fxaa_searchSteps: 64,
    fxaa_searchThreshold: 0.25,
    fxaa_subpixCap: 1,
    fxaa_subpixTrim: 0,
    atoms_display: !0,
    atoms_color: "#000000",
    atoms_font_size_2D: 12,
    atoms_font_families_2D: ["Helvetica", "Arial", "Dialog"],
    atoms_font_bold_2D: !1,
    atoms_font_italic_2D: !1,
    atoms_circles_2D: !1,
    atoms_circleDiameter_2D: 10,
    atoms_circleBorderWidth_2D: 1,
    atoms_lonePairDistance_2D: 8,
    atoms_lonePairSpread_2D: 4,
    atoms_lonePairDiameter_2D: 1,
    atoms_useJMOLColors: !1,
    atoms_usePYMOLColors: !1,
    atoms_HBlack_2D: !0,
    atoms_implicitHydrogens_2D: !0,
    atoms_displayTerminalCarbonLabels_2D: !1,
    atoms_showHiddenCarbons_2D: !0,
    atoms_showAttributedCarbons_2D: !0,
    atoms_displayAllCarbonLabels_2D: !1,
    atoms_resolution_3D: 30,
    atoms_sphereDiameter_3D: 0.8,
    atoms_useVDWDiameters_3D: !1,
    atoms_vdwMultiplier_3D: 1,
    atoms_materialAmbientColor_3D: "#000000",
    atoms_materialSpecularColor_3D: "#555555",
    atoms_materialShininess_3D: 32,
    atoms_nonBondedAsStars_3D: !1,
    atoms_displayLabels_3D: !1,
    bonds_display: !0,
    bonds_color: "#000000",
    bonds_width_2D: 1,
    bonds_useAbsoluteSaturationWidths_2D: !0,
    bonds_saturationWidth_2D: 0.2,
    bonds_saturationWidthAbs_2D: 5,
    bonds_ends_2D: "round",
    bonds_splitColor: !1,
    bonds_colorGradient: !1,
    bonds_saturationAngle_2D: k.PI / 3,
    bonds_symmetrical_2D: !1,
    bonds_clearOverlaps_2D: !1,
    bonds_overlapClearWidth_2D: 0.5,
    bonds_atomLabelBuffer_2D: 1,
    bonds_wedgeThickness_2D: 6,
    bonds_wavyLength_2D: 4,
    bonds_hashWidth_2D: 1,
    bonds_hashSpacing_2D: 2.5,
    bonds_dotSize_2D: 2,
    bonds_lewisStyle_2D: !1,
    bonds_showBondOrders_3D: !1,
    bonds_resolution_3D: 30,
    bonds_renderAsLines_3D: !1,
    bonds_cylinderDiameter_3D: 0.3,
    bonds_pillLatitudeResolution_3D: 10,
    bonds_pillLongitudeResolution_3D: 20,
    bonds_pillHeight_3D: 0.3,
    bonds_pillSpacing_3D: 0.1,
    bonds_pillDiameter_3D: 0.3,
    bonds_materialAmbientColor_3D: "#000000",
    bonds_materialSpecularColor_3D: "#555555",
    bonds_materialShininess_3D: 32,
    proteins_displayRibbon: !0,
    proteins_displayBackbone: !1,
    proteins_backboneThickness: 1.5,
    proteins_backboneColor: "#CCCCCC",
    proteins_ribbonCartoonize: !1,
    proteins_displayPipePlank: !1,
    proteins_residueColor: "none",
    proteins_primaryColor: "#FF0D0D",
    proteins_secondaryColor: "#FFFF30",
    proteins_ribbonCartoonHelixPrimaryColor: "#00E740",
    proteins_ribbonCartoonHelixSecondaryColor: "#9905FF",
    proteins_ribbonCartoonSheetColor: "#E8BB99",
    proteins_tubeColor: "#FF0D0D",
    proteins_tubeResolution_3D: 15,
    proteins_ribbonThickness: 0.2,
    proteins_tubeThickness: 0.5,
    proteins_plankSheetWidth: 3.5,
    proteins_cylinderHelixDiameter: 4,
    proteins_verticalResolution: 8,
    proteins_horizontalResolution: 8,
    proteins_materialAmbientColor_3D: "#000000",
    proteins_materialSpecularColor_3D: "#555555",
    proteins_materialShininess_3D: 32,
    nucleics_display: !0,
    nucleics_tubeColor: "#CCCCCC",
    nucleics_baseColor: "#C10000",
    nucleics_residueColor: "none",
    nucleics_tubeThickness: 1.5,
    nucleics_tubeResolution_3D: 15,
    nucleics_verticalResolution: 8,
    nucleics_materialAmbientColor_3D: "#000000",
    nucleics_materialSpecularColor_3D: "#555555",
    nucleics_materialShininess_3D: 32,
    macro_displayAtoms: !1,
    macro_displayBonds: !1,
    macro_atomToLigandDistance: -1,
    macro_showWater: !1,
    macro_colorByChain: !1,
    macro_rainbowColors: [
      "#0000FF",
      "#00FFFF",
      "#00FF00",
      "#FFFF00",
      "#FF0000",
    ],
    surfaces_display: !0,
    surfaces_alpha: 0.5,
    surfaces_style: "Solid",
    surfaces_color: "white",
    surfaces_materialAmbientColor_3D: "#000000",
    surfaces_materialSpecularColor_3D: "#000000",
    surfaces_materialShininess_3D: 32,
    plots_color: "#000000",
    plots_width: 1,
    plots_showIntegration: !1,
    plots_integrationColor: "#c10000",
    plots_integrationLineWidth: 1,
    plots_showGrid: !1,
    plots_gridColor: "gray",
    plots_gridLineWidth: 0.5,
    plots_showYAxis: !0,
    plots_flipXAxis: !1,
    text_font_size: 12,
    text_font_families: ["Helvetica", "Arial", "Dialog"],
    text_font_bold: !0,
    text_font_italic: !1,
    text_font_stroke_3D: !0,
    text_color: "#000000",
    shapes_color: "#000000",
    shapes_lineWidth: 1,
    shapes_pointSize: 2,
    shapes_arrowLength_2D: 8,
    compass_display: !1,
    compass_axisXColor_3D: "#FF0000",
    compass_axisYColor_3D: "#00FF00",
    compass_axisZColor_3D: "#0000FF",
    compass_size_3D: 50,
    compass_resolution_3D: 10,
    compass_displayText_3D: !0,
    compass_type_3D: 0,
    measurement_update_3D: !1,
    measurement_angleBands_3D: 10,
    measurement_displayText_3D: !0,
  };
  m.Styles = function (a) {
    d.assign(this, p.parse(p.stringify(a === g ? e.DEFAULT_STYLES : a)));
  };
  k = m.Styles.prototype;
  k.set3DRepresentation = function (a) {
    this.bonds_display = this.atoms_display = !0;
    this.bonds_color = "#777777";
    this.bonds_showBondOrders_3D =
      this.bonds_splitColor =
      this.atoms_useJMOLColors =
      this.atoms_useVDWDiameters_3D =
        !0;
    this.bonds_renderAsLines_3D = !1;
    "Ball and Stick" === a
      ? ((this.atoms_vdwMultiplier_3D = 0.3),
        (this.bonds_splitColor = !1),
        (this.bonds_cylinderDiameter_3D = 0.3),
        (this.bonds_materialAmbientColor_3D =
          ChemDoodle.DEFAULT_STYLES.atoms_materialAmbientColor_3D),
        (this.bonds_pillDiameter_3D = 0.15))
      : "van der Waals Spheres" === a
      ? ((this.bonds_display = !1), (this.atoms_vdwMultiplier_3D = 1))
      : "Stick" === a
      ? ((this.bonds_showBondOrders_3D = this.atoms_useVDWDiameters_3D = !1),
        (this.bonds_cylinderDiameter_3D = this.atoms_sphereDiameter_3D = 0.8),
        (this.bonds_materialAmbientColor_3D =
          this.atoms_materialAmbientColor_3D))
      : "Wireframe" === a
      ? ((this.atoms_useVDWDiameters_3D = !1),
        (this.bonds_cylinderDiameter_3D = this.bonds_pillDiameter_3D = 0.05),
        (this.atoms_sphereDiameter_3D = 0.15),
        (this.bonds_materialAmbientColor_3D =
          ChemDoodle.DEFAULT_STYLES.atoms_materialAmbientColor_3D))
      : "Line" === a
      ? ((this.atoms_display = !1),
        (this.bonds_renderAsLines_3D = !0),
        (this.bonds_width_2D = 1),
        (this.bonds_cylinderDiameter_3D = 0.05))
      : alert(
          '"' +
            a +
            '" is not recognized. Use one of the following strings:\n\n1. Ball and Stick\n2. van der Waals Spheres\n3. Stick\n4. Wireframe\n5. Line\n'
        );
  };
  k.copy = function () {
    return new m.Styles(this);
  };
})(ChemDoodle, ChemDoodle.structures, Math, JSON, Object);
(function (e, m, k, p, d) {
  k.getPointsPerAngstrom = function () {
    return (
      e.DEFAULT_STYLES.bondLength_2D / e.DEFAULT_STYLES.angstromsPerBondLength
    );
  };
  k.BondDeducer = function () {};
  d = k.BondDeducer.prototype;
  d.margin = 1.1;
  d.deduceCovalentBonds = function (d, a) {
    let f = k.getPointsPerAngstrom();
    a && (f = a);
    for (let c = 0, b = d.atoms.length; c < b; c++)
      for (a = c + 1; a < b; a++) {
        let b = d.atoms[c],
          e = d.atoms[a];
        b.distance3D(e) <
          (m[b.label].covalentRadius + m[e.label].covalentRadius) *
            f *
            this.margin && d.bonds.push(new p.Bond(b, e, 1));
      }
  };
})(
  ChemDoodle,
  ChemDoodle.ELEMENT,
  ChemDoodle.informatics,
  ChemDoodle.structures
);
(function (e, m, k) {
  e.HydrogenDeducer = function () {};
  e.HydrogenDeducer.prototype.removeHydrogens = function (e, d) {
    let g = [],
      a = [];
    for (let f = 0, c = e.bonds.length; f < c; f++) {
      let b = e.bonds[f],
        c = "H" !== b.a1.label && "H" !== b.a2.label;
      c || d || b.stereo === m.Bond.STEREO_NONE || (c = !0);
      c
        ? ((b.a1.tag = !0), a.push(b))
        : ("H" === b.a1.label && (b.a1.remove = !0),
          "H" === b.a2.label && (b.a2.remove = !0));
    }
    for (let a = 0, c = e.atoms.length; a < c; a++)
      (d = e.atoms[a]), d.remove ? (d.remove = k) : g.push(d);
    e.atoms = g;
    e.bonds = a;
  };
})(ChemDoodle.informatics, ChemDoodle.structures);
(function (e, m, k) {
  e.Splitter = function () {};
  e.Splitter.prototype.split = function (e) {
    let d = [];
    for (let a = 0, c = e.atoms.length; a < c; a++) e.atoms[a].visited = !1;
    for (let a = 0, c = e.bonds.length; a < c; a++) e.bonds[a].visited = !1;
    for (let f = 0, c = e.atoms.length; f < c; f++) {
      var g = e.atoms[f];
      if (!g.visited) {
        let b = new m.Molecule();
        b.atoms.push(g);
        g.visited = !0;
        let c = new m.Queue();
        for (c.enqueue(g); !c.isEmpty(); ) {
          g = c.dequeue();
          for (let d = 0, f = e.bonds.length; d < f; d++) {
            var a = e.bonds[d];
            a.contains(g) &&
              !a.visited &&
              ((a.visited = !0),
              b.bonds.push(a),
              (a = a.getNeighbor(g)),
              a.visited || ((a.visited = !0), b.atoms.push(a), c.enqueue(a)));
          }
        }
        d.push(b);
      }
    }
    return d;
  };
})(ChemDoodle.informatics, ChemDoodle.structures);
(function (e, m, k, p) {
  e.StructureBuilder = function () {};
  e.StructureBuilder.prototype.copy = function (d) {
    let e = new m.JSONInterpreter();
    return e.molFrom(e.molTo(d));
  };
})(ChemDoodle.informatics, ChemDoodle.io, ChemDoodle.structures);
(function (e, m) {
  e._Counter = function () {};
  e = e._Counter.prototype;
  e.value = 0;
  e.molecule = m;
  e.setMolecule = function (e) {
    this.value = 0;
    this.molecule = e;
    this.innerCalculate && this.innerCalculate();
  };
})(ChemDoodle.informatics);
(function (e, m) {
  e.FrerejacqueNumberCounter = function (e) {
    this.setMolecule(e);
  };
  (e.FrerejacqueNumberCounter.prototype = new e._Counter()).innerCalculate =
    function () {
      this.value =
        this.molecule.bonds.length -
        this.molecule.atoms.length +
        new e.NumberOfMoleculesCounter(this.molecule).value;
    };
})(ChemDoodle.informatics);
(function (e, m, k) {
  m.NumberOfMoleculesCounter = function (e) {
    this.setMolecule(e);
  };
  (m.NumberOfMoleculesCounter.prototype = new m._Counter()).innerCalculate =
    function () {
      for (let d = 0, e = this.molecule.atoms.length; d < e; d++)
        this.molecule.atoms[d].visited = !1;
      for (let d = 0, g = this.molecule.atoms.length; d < g; d++)
        if (!this.molecule.atoms[d].visited) {
          this.value++;
          let a = new e.Queue();
          this.molecule.atoms[d].visited = !0;
          for (a.enqueue(this.molecule.atoms[d]); !a.isEmpty(); ) {
            let d = a.dequeue();
            for (let c = 0, b = this.molecule.bonds.length; c < b; c++) {
              var k = this.molecule.bonds[c];
              k.contains(d) &&
                ((k = k.getNeighbor(d)),
                k.visited || ((k.visited = !0), a.enqueue(k)));
            }
          }
        }
    };
})(ChemDoodle.structures, ChemDoodle.informatics);
(function (e, m) {
  e._RingFinder = function () {};
  e = e._RingFinder.prototype;
  e.atoms = m;
  e.bonds = m;
  e.rings = m;
  e.reduce = function (e) {
    for (let d = 0, g = e.atoms.length; d < g; d++) e.atoms[d].visited = !1;
    for (let d = 0, g = e.bonds.length; d < g; d++) e.bonds[d].visited = !1;
    let k = !0;
    for (; k; ) {
      k = !1;
      for (let d = 0, g = e.atoms.length; d < g; d++) {
        let a = 0,
          f;
        for (let c = 0, b = e.bonds.length; c < b; c++)
          if (e.bonds[c].contains(e.atoms[d]) && !e.bonds[c].visited) {
            a++;
            if (2 === a) break;
            f = e.bonds[c];
          }
        1 === a && ((k = !0), (f.visited = !0), (e.atoms[d].visited = !0));
      }
    }
    for (let d = 0, g = e.atoms.length; d < g; d++)
      e.atoms[d].visited || this.atoms.push(e.atoms[d]);
    for (let d = 0, g = e.bonds.length; d < g; d++)
      e.bonds[d].visited || this.bonds.push(e.bonds[d]);
    0 === this.bonds.length && 0 !== this.atoms.length && (this.atoms = []);
  };
  e.setMolecule = function (e) {
    this.atoms = [];
    this.bonds = [];
    this.rings = [];
    this.reduce(e);
    2 < this.atoms.length && this.innerGetRings && this.innerGetRings();
  };
  e.fuse = function () {
    for (let e = 0, m = this.rings.length; e < m; e++)
      for (let d = 0, g = this.bonds.length; d < g; d++)
        -1 !== this.rings[e].atoms.indexOf(this.bonds[d].a1) &&
          -1 !== this.rings[e].atoms.indexOf(this.bonds[d].a2) &&
          this.rings[e].bonds.push(this.bonds[d]);
  };
})(ChemDoodle.informatics);
(function (e, m, k) {
  function p(d, a) {
    this.atoms = [];
    if (a)
      for (let d = 0, c = a.atoms.length; d < c; d++)
        this.atoms[d] = a.atoms[d];
    this.atoms.push(d);
  }
  let d = p.prototype;
  d.grow = function (d, a) {
    let e = this.atoms[this.atoms.length - 1],
      c = [];
    for (let b = 0, f = d.length; b < f; b++)
      if (d[b].contains(e)) {
        let f = d[b].getNeighbor(e);
        -1 === a.indexOf(f) && c.push(f);
      }
    d = [];
    for (let a = 0, e = c.length; a < e; a++) d.push(new p(c[a], this));
    return d;
  };
  d.check = function (d, a, e) {
    for (let b = 0, c = a.atoms.length - 1; b < c; b++)
      if (-1 !== this.atoms.indexOf(a.atoms[b])) return k;
    let c;
    if (a.atoms[a.atoms.length - 1] === this.atoms[this.atoms.length - 1]) {
      c = new m.Ring();
      c.atoms[0] = e;
      for (let a = 0, d = this.atoms.length; a < d; a++)
        c.atoms.push(this.atoms[a]);
      for (d = a.atoms.length - 2; 0 <= d; d--) c.atoms.push(a.atoms[d]);
    } else {
      let b = [];
      for (let c = 0, e = d.length; c < e; c++)
        d[c].contains(a.atoms[a.atoms.length - 1]) && b.push(d[c]);
      for (let f = 0, h = b.length; f < h; f++)
        if (
          (1 === a.atoms.length ||
            !b[f].contains(a.atoms[a.atoms.length - 2])) &&
          b[f].contains(this.atoms[this.atoms.length - 1])
        ) {
          c = new m.Ring();
          c.atoms[0] = e;
          for (let a = 0, b = this.atoms.length; a < b; a++)
            c.atoms.push(this.atoms[a]);
          for (d = a.atoms.length - 1; 0 <= d; d--) c.atoms.push(a.atoms[d]);
          break;
        }
    }
    return c;
  };
  e.EulerFacetRingFinder = function (d) {
    this.setMolecule(d);
  };
  e = e.EulerFacetRingFinder.prototype = new e._RingFinder();
  e.fingerBreak = 5;
  e.innerGetRings = function () {
    for (let f = 0, h = this.atoms.length; f < h; f++) {
      let h = [];
      for (let a = 0, b = this.bonds.length; a < b; a++)
        this.bonds[a].contains(this.atoms[f]) &&
          h.push(this.bonds[a].getNeighbor(this.atoms[f]));
      for (let l = 0, g = h.length; l < g; l++)
        for (let g = l + 1; g < h.length; g++) {
          var d = [];
          d[0] = new p(h[l]);
          d[1] = new p(h[g]);
          var a = [];
          a[0] = this.atoms[f];
          for (let b = 0, c = h.length; b < c; b++)
            b !== l && b !== g && a.push(h[b]);
          var e = [],
            c = d[0].check(this.bonds, d[1], this.atoms[f]);
          for (
            c && (e[0] = c);
            0 === e.length &&
            0 < d.length &&
            d[0].atoms.length < this.fingerBreak;

          ) {
            c = [];
            for (let e = 0, f = d.length; e < f; e++) {
              var b = d[e].grow(this.bonds, a);
              for (let a = 0, d = b.length; a < d; a++) c.push(b[a]);
            }
            d = c;
            for (let a = 0, h = d.length; a < h; a++)
              for (c = a + 1; c < h; c++)
                (b = d[a].check(this.bonds, d[c], this.atoms[f])) && e.push(b);
            if (0 === e.length) {
              c = [];
              for (let d = 0, e = a.length; d < e; d++)
                for (let e = 0, f = this.bonds.length; e < f; e++)
                  this.bonds[e].contains(a[d]) &&
                    ((b = this.bonds[e].getNeighbor(a[d])),
                    -1 === a.indexOf(b) && -1 === c.indexOf(b) && c.push(b));
              for (let b = 0, d = c.length; b < d; b++) a.push(c[b]);
            }
          }
          if (0 < e.length) {
            d = k;
            for (let a = 0, b = e.length; a < b; a++)
              if (!d || d.atoms.length > e[a].atoms.length) d = e[a];
            e = !1;
            for (let b = 0, c = this.rings.length; b < c; b++) {
              a = !0;
              for (let c = 0, e = d.atoms.length; c < e; c++)
                if (-1 === this.rings[b].atoms.indexOf(d.atoms[c])) {
                  a = !1;
                  break;
                }
              if (a) {
                e = !0;
                break;
              }
            }
            e || this.rings.push(d);
          }
        }
    }
    this.fuse();
  };
})(ChemDoodle.informatics, ChemDoodle.structures);
(function (e, m) {
  e.SSSRFinder = function (k) {
    this.rings = [];
    if (0 < k.atoms.length) {
      let m = new e.FrerejacqueNumberCounter(k).value,
        d = new e.EulerFacetRingFinder(k).rings;
      d.sort(function (d, a) {
        return d.atoms.length - a.atoms.length;
      });
      for (let d = 0, a = k.bonds.length; d < a; d++) k.bonds[d].visited = !1;
      for (let e = 0, a = d.length; e < a; e++) {
        k = !1;
        for (let a = 0, c = d[e].bonds.length; a < c; a++)
          if (!d[e].bonds[a].visited) {
            k = !0;
            break;
          }
        if (k) {
          for (let a = 0, c = d[e].bonds.length; a < c; a++)
            d[e].bonds[a].visited = !0;
          this.rings.push(d[e]);
        }
        if (this.rings.length === m) break;
      }
    }
  };
})(ChemDoodle.informatics);
(function (e, m) {
  e._Interpreter = function () {};
  e._Interpreter.prototype.fit = function (e, m, d) {
    let g = e.length,
      a = [];
    for (let d = 0; d < m - g; d++) a.push(" ");
    return d ? e + a.join("") : a.join("") + e;
  };
})(ChemDoodle.io);
(function (e, m, k, p, d, g, a, f) {
  let c = /\s+/g,
    b = /\(|\)|\s+/g,
    l = /'|\s+/g,
    h = /,|'|\s+/g,
    r = /^\s+/,
    v = /[0-9]/g,
    n = /[0-9]|\+|\-/g,
    u = function (a) {
      return 0 !== a.length;
    },
    w = {
      P: [],
      A: [[0, 0.5, 0.5]],
      B: [[0.5, 0, 0.5]],
      C: [[0.5, 0.5, 0]],
      I: [[0.5, 0.5, 0.5]],
      R: [
        [2 / 3, 1 / 3, 1 / 3],
        [1 / 3, 2 / 3, 2 / 3],
      ],
      S: [
        [1 / 3, 1 / 3, 2 / 3],
        [2 / 3, 2 / 3, 1 / 3],
      ],
      T: [
        [1 / 3, 2 / 3, 1 / 3],
        [2 / 3, 1 / 3, 2 / 3],
      ],
      F: [
        [0, 0.5, 0.5],
        [0.5, 0, 0.5],
        [0.5, 0.5, 0],
      ],
    },
    y = function (a) {
      let b = 0,
        c = 0,
        d = 0,
        e = 0;
      var f = a.indexOf("x"),
        h = a.indexOf("y");
      let l = a.indexOf("z");
      -1 !== f && (c++, 0 < f && "+" !== a.charAt(f - 1) && (c *= -1));
      -1 !== h && (d++, 0 < h && "+" !== a.charAt(h - 1) && (d *= -1));
      -1 !== l && (e++, 0 < l && "+" !== a.charAt(l - 1) && (e *= -1));
      if (2 < a.length) {
        f = "+";
        for (let c = 0, d = a.length; c < d; c++)
          (h = a.charAt(c)),
            ("-" !== h && "/" !== h) ||
              (c !== a.length - 1 && !a.charAt(c + 1).match(v)) ||
              (f = h),
            h.match(v) &&
              ("+" === f
                ? (b += parseInt(h))
                : "-" === f
                ? (b -= parseInt(h))
                : "/" === f && (b /= parseInt(h)));
      }
      return [b, c, d, e];
    };
  m.CIFInterpreter = function () {};
  m.CIFInterpreter.generateABC2XYZ = function (a, b, c, e, f, h) {
    e = (d.cos(e) - d.cos(h) * d.cos(f)) / d.sin(h);
    return [
      a,
      0,
      0,
      0,
      b * d.cos(h),
      b * d.sin(h),
      0,
      0,
      c * d.cos(f),
      c * e,
      c * d.sqrt(1 - d.pow(d.cos(f), 2) - e * e),
      0,
      0,
      0,
      0,
      1,
    ];
  };
  (m.CIFInterpreter.prototype = new m._Interpreter()).read = function (
    a,
    v,
    x,
    B
  ) {
    v = v ? v : 1;
    x = x ? x : 1;
    B = B ? B : 1;
    let t = new k.Molecule();
    if (!a) return t;
    var z = a.split("\n");
    let A = (a = 0),
      G = 0,
      F = 0,
      H = 0,
      L = 0;
    var N = "P",
      S,
      I;
    let Y;
    for (var E, M = !0; 0 < z.length; )
      if ((M ? (E = z.shift()) : (M = !0), 0 < E.length))
        if (E.startsWith("_cell_length_a")) a = parseFloat(E.split(b)[1]);
        else if (E.startsWith("_cell_length_b")) A = parseFloat(E.split(b)[1]);
        else if (E.startsWith("_cell_length_c")) G = parseFloat(E.split(b)[1]);
        else if (E.startsWith("_cell_angle_alpha"))
          F = (d.PI * parseFloat(E.split(b)[1])) / 180;
        else if (E.startsWith("_cell_angle_beta"))
          H = (d.PI * parseFloat(E.split(b)[1])) / 180;
        else if (E.startsWith("_cell_angle_gamma"))
          L = (d.PI * parseFloat(E.split(b)[1])) / 180;
        else if (E.startsWith("_symmetry_space_group_name_H-M"))
          N = E.split(l)[1];
        else if (E.startsWith("loop_")) {
          for (
            var K = { fields: [], lines: [] }, P = !1;
            (E = z.shift()) !== f &&
            !(E = E.replace(r, "")).startsWith("loop_") &&
            0 < E.length;

          )
            if (E.startsWith("_")) {
              if (P) break;
              K.fields = K.fields.concat(E.split(c).filter(u));
            } else (P = !0), K.lines.push(E);
          0 !== z.length &&
            (E.startsWith("loop_") || E.startsWith("_")) &&
            (M = !1);
          -1 !== K.fields.indexOf("_symmetry_equiv_pos_as_xyz") ||
          -1 !== K.fields.indexOf("_space_group_symop_operation_xyz")
            ? (S = K)
            : -1 !== K.fields.indexOf("_atom_site_label")
            ? (I = K)
            : -1 !== K.fields.indexOf("_geom_bond_atom_site_label_1") &&
              (Y = K);
        }
    z = m.CIFInterpreter.generateABC2XYZ(a, A, G, F, H, L);
    if (I) {
      var Q = (P = K = M = -1),
        Z = -1;
      for (let a = 0, b = I.fields.length; a < b; a++)
        (E = I.fields[a]),
          "_atom_site_type_symbol" === E
            ? (M = a)
            : "_atom_site_label" === E
            ? (K = a)
            : "_atom_site_fract_x" === E
            ? (P = a)
            : "_atom_site_fract_y" === E
            ? (Q = a)
            : "_atom_site_fract_z" === E && (Z = a);
      for (let a = 0, b = I.lines.length; a < b; a++) {
        E = I.lines[a];
        E = E.split(c).filter(u);
        var T = new k.Atom(
          E[-1 === M ? K : M].split(n)[0],
          parseFloat(E[P]),
          parseFloat(E[Q]),
          parseFloat(E[Z])
        );
        t.atoms.push(T);
        -1 !== K && ((T.cifId = E[K]), (T.cifPart = 0));
      }
    }
    if (S && !Y) {
      I = 0;
      for (let a = 0, b = S.fields.length; a < b; a++)
        if (
          ((E = S.fields[a]),
          "_symmetry_equiv_pos_as_xyz" === E ||
            "_space_group_symop_operation_xyz" === E)
        )
          I = a;
      E = w[N];
      N = [];
      for (let a = 0, b = S.lines.length; a < b; a++) {
        P = S.lines[a].split(h).filter(u);
        M = y(P[I]);
        K = y(P[I + 1]);
        P = y(P[I + 2]);
        for (let b = 0, c = t.atoms.length; b < c; b++) {
          Q = t.atoms[b];
          Z = Q.x * M[1] + Q.y * M[2] + Q.z * M[3] + M[0];
          T = Q.x * K[1] + Q.y * K[2] + Q.z * K[3] + K[0];
          let c = Q.x * P[1] + Q.y * P[2] + Q.z * P[3] + P[0];
          var R = new k.Atom(Q.label, Z, T, c);
          N.push(R);
          Q.cifId !== f && ((R.cifId = Q.cifId), (R.cifPart = a + 1));
          if (E)
            for (let b = 0, d = E.length; b < d; b++)
              (R = E[b]),
                (R = new k.Atom(Q.label, Z + R[0], T + R[1], c + R[2])),
                N.push(R),
                Q.cifId !== f && ((R.cifId = Q.cifId), (R.cifPart = a + 1));
        }
      }
      for (let a = 0, b = N.length; a < b; a++) {
        for (I = N[a]; 1 <= I.x; ) I.x--;
        for (; 0 > I.x; ) I.x++;
        for (; 1 <= I.y; ) I.y--;
        for (; 0 > I.y; ) I.y++;
        for (; 1 <= I.z; ) I.z--;
        for (; 0 > I.z; ) I.z++;
      }
      I = [];
      for (let a = 0, b = N.length; a < b; a++) {
        E = !1;
        M = N[a];
        for (let a = 0, b = t.atoms.length; a < b; a++)
          if (1e-4 > t.atoms[a].distance3D(M)) {
            E = !0;
            break;
          }
        if (!E) {
          for (let a = 0, b = I.length; a < b; a++)
            if (1e-4 > I[a].distance3D(M)) {
              E = !0;
              break;
            }
          E || I.push(M);
        }
      }
      t.atoms = t.atoms.concat(I);
    }
    N = [];
    for (I = 0; I < v; I++)
      for (E = 0; E < x; E++)
        for (M = 0; M < B; M++)
          if (0 !== I || 0 !== E || 0 !== M)
            for (let a = 0, b = t.atoms.length; a < b; a++)
              (K = t.atoms[a]),
                (P = new k.Atom(K.label, K.x + I, K.y + E, K.z + M)),
                N.push(P),
                K.cifId !== f &&
                  ((P.cifId = K.cifId),
                  (P.cifPart =
                    K.cifPart +
                    (S ? S.lines.length : 0) +
                    I +
                    10 * E +
                    100 * M));
    t.atoms = t.atoms.concat(N);
    for (let a = 0, b = t.atoms.length; a < b; a++)
      (v = t.atoms[a]),
        (x = g.multiplyVec3(z, [v.x, v.y, v.z])),
        (v.x = x[0]),
        (v.y = x[1]),
        (v.z = x[2]);
    if (Y) {
      x = v = -1;
      for (let a = 0, b = Y.fields.length; a < b; a++)
        (B = Y.fields[a]),
          "_geom_bond_atom_site_label_1" === B
            ? (v = a)
            : "_geom_bond_atom_site_label_2" === B && (x = a);
      for (let a = 0, b = Y.lines.length; a < b; a++) {
        S = Y.lines[a].split(c).filter(u);
        B = S[v];
        S = S[x];
        for (let a = 0, b = t.atoms.length; a < b; a++)
          for (z = a + 1; z < b; z++) {
            N = t.atoms[a];
            I = t.atoms[z];
            if (N.cifPart !== I.cifPart) break;
            ((N.cifId === B && I.cifId === S) ||
              (N.cifId === S && I.cifId === B)) &&
              t.bonds.push(new k.Bond(N, I));
          }
      }
    } else new e.informatics.BondDeducer().deduceCovalentBonds(t, 1);
    return {
      molecule: t,
      unitCell: new p.UnitCell([a, A, G], [F, H, L], [0, 0, 0]),
    };
  };
  let x = new m.CIFInterpreter();
  e.readCIF = function (a, b, c, d) {
    return x.read(a, b, c, d);
  };
})(
  ChemDoodle,
  ChemDoodle.io,
  ChemDoodle.structures,
  ChemDoodle.structures.d3,
  Math,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.vec3
);
(function (e, m, k, p) {
  m.CMLInterpreter = function () {};
  p = m.CMLInterpreter.prototype = new m._Interpreter();
  p.read = function (d) {
    let a = [];
    d = new DOMParser()
      .parseFromString(d, "text/xml")
      .getElementsByTagName("cml");
    for (let f = 0, g = d.length; f < g; f++) {
      let g = d[f].getElementsByTagName("molecule");
      for (let d = 0, f = g.length; d < f; d++) {
        let f = (a[d] = new k.Molecule()),
          n = [];
        var e = g[d].getElementsByTagName("atom");
        for (let f = 0, g = e.length; f < g; f++) {
          var c = e[f],
            b = c.getAttribute("elementType"),
            l = c.getAttribute("x2"),
            h = c.getAttribute("y2");
          let g = 0;
          if (null === l || "" === l)
            (l = c.getAttribute("x3")),
              (h = c.getAttribute("y3")),
              (g = c.getAttribute("z3"));
          b = a[d].atoms[f] = new k.Atom(b, l, h, g);
          n[f] = c.getAttribute("id");
          null !== c.getAttribute("formalCharge") &&
            (b.charge = c.getAttribute("formalCharge"));
        }
        e = g[d].getElementsByTagName("bond");
        for (let g = 0, r = e.length; g < r; g++) {
          c = e[g];
          l = c.getAttribute("atomRefs2").split(" ");
          b = f.atoms[n.indexOf(l[0])];
          l = f.atoms[n.indexOf(l[1])];
          switch (c.getAttribute("order")) {
            case "2":
            case "D":
              h = 2;
              break;
            case "3":
            case "T":
              h = 3;
              break;
            case "A":
              h = 1.5;
              break;
            default:
              h = 1;
          }
          b = a[d].bonds[g] = new k.Bond(b, l, h);
          if ((c = c.querySelector("bondStereo")))
            switch (c.textContent) {
              case "W":
                b.stereo = k.Bond.STEREO_PROTRUDING;
                break;
              case "H":
                b.stereo = k.Bond.STEREO_RECESSED;
            }
        }
      }
    }
    return a;
  };
  p.write = function (d) {
    let a = [];
    a.push('\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\n');
    a.push(
      '\x3ccml convention\x3d"conventions:molecular" xmlns\x3d"http://www.xml-cml.org/schema" xmlns:conventions\x3d"http://www.xml-cml.org/convention/" xmlns:dc\x3d"http://purl.org/dc/elements/1.1/"\x3e\n'
    );
    for (let c = 0, b = d.length; c < b; c++) {
      a.push('\x3cmolecule id\x3d"m');
      a.push(c);
      a.push('"\x3e');
      a.push("\x3catomArray\x3e");
      for (let b = 0, f = d[c].atoms.length; b < f; b++) {
        var e = d[c].atoms[b];
        a.push('\x3catom elementType\x3d"');
        a.push(e.label);
        a.push('" id\x3d"a');
        a.push(b);
        a.push('" ');
        a.push('x3\x3d"');
        a.push(e.x);
        a.push('" y3\x3d"');
        a.push(e.y);
        a.push('" z3\x3d"');
        a.push(e.z);
        a.push('" ');
        0 != e.charge &&
          (a.push('formalCharge\x3d"'), a.push(e.charge), a.push('" '));
        a.push("/\x3e");
      }
      a.push("\x3c/atomArray\x3e");
      a.push("\x3cbondArray\x3e");
      for (let b = 0, f = d[c].bonds.length; b < f; b++) {
        e = d[c].bonds[b];
        a.push('\x3cbond atomRefs2\x3d"a');
        a.push(d[c].atoms.indexOf(e.a1));
        a.push(" a");
        a.push(d[c].atoms.indexOf(e.a2));
        a.push('" order\x3d"');
        switch (e.bondOrder) {
          case 1.5:
            a.push("A");
            break;
          case 1:
          case 2:
          case 3:
            a.push(e.bondOrder);
            break;
          default:
            a.push("S");
        }
        a.push('"/\x3e');
      }
      a.push("\x3c/bondArray\x3e");
      a.push("\x3c/molecule\x3e");
    }
    a.push("\x3c/cml\x3e");
    return a.join("");
  };
  let d = new m.CMLInterpreter();
  e.readCML = function (e) {
    return d.read(e);
  };
  e.writeCML = function (e) {
    return d.write(e);
  };
})(ChemDoodle, ChemDoodle.io, ChemDoodle.structures);
(function (e, m, k, p, d) {
  k.MOLInterpreter = function () {};
  let g = (k.MOLInterpreter.prototype = new k._Interpreter());
  g.version = 2;
  g.read = function (a, b) {
    b || (b = e.DEFAULT_STYLES.bondLength_2D);
    let c = new p.Molecule();
    if (!a) return c;
    a = a.split("\n");
    var f = a[3],
      g = parseInt(f.substring(0, 3)),
      k = parseInt(f.substring(3, 6));
    f = "V3000" === f.substring(34, 39).trim().toUpperCase() ? 3 : 2;
    if (2 === f) {
      for (var n = 0; n < g; n++) {
        f = a[4 + n];
        var u = new p.Atom(
            f.substring(31, 34),
            parseFloat(f.substring(0, 10)) * b,
            (1 === b ? 1 : -1) * parseFloat(f.substring(10, 20)) * b,
            parseFloat(f.substring(20, 30)) * b
          ),
          w = parseInt(f.substring(34, 36));
        0 !== w && m[u.label] && (u.mass = m[u.label].mass + w);
        switch (parseInt(f.substring(36, 39))) {
          case 1:
            u.charge = 3;
            break;
          case 2:
            u.charge = 2;
            break;
          case 3:
            u.charge = 1;
            break;
          case 5:
            u.charge = -1;
            break;
          case 6:
            u.charge = -2;
            break;
          case 7:
            u.charge = -3;
        }
        c.atoms[n] = u;
      }
      for (b = 0; b < k; b++) {
        f = a[4 + g + b];
        u = parseInt(f.substring(6, 9));
        n = parseInt(f.substring(9, 12));
        if (3 < u)
          switch (u) {
            case 4:
              u = 1.5;
              break;
            default:
              u = 1;
          }
        f = new p.Bond(
          c.atoms[parseInt(f.substring(0, 3)) - 1],
          c.atoms[parseInt(f.substring(3, 6)) - 1],
          u
        );
        switch (n) {
          case 3:
            f.stereo = p.Bond.STEREO_AMBIGUOUS;
            break;
          case 1:
            f.stereo = p.Bond.STEREO_PROTRUDING;
            break;
          case 6:
            f.stereo = p.Bond.STEREO_RECESSED;
        }
        c.bonds[b] = f;
      }
    } else if (3 === f)
      for (let e = 4, h = a.length; e < h; e++)
        if (((k = a[e].trim()), k.startsWith("M  V30 ")))
          if (((k = k.substring(7)), k.startsWith("BEGIN ")))
            n = k.substring(6);
          else if (k.startsWith("END ")) n = d;
          else if (
            ((g = k.split(/(\s+)/).filter((a) => 0 < a.trim().length)),
            "ATOM" === n)
          ) {
            k = new p.Atom(
              g[1],
              parseFloat(g[2]) * b,
              (1 === b ? 1 : -1) * parseFloat(g[3]) * b,
              parseFloat(g[4]) * b
            );
            for (let a = 6, b = g.length; a < b; a++)
              (u = g[a]),
                (w = u.indexOf("\x3d")),
                -1 !== w &&
                  ((f = u.substring(0, w)),
                  (u = u.substring(w + 1)),
                  "CHG" === f
                    ? (k.charge = parseInt(u))
                    : "RAD" === f
                    ? (k.numRadical = parseInt(u))
                    : "MASS" === f && (k.mass = parseInt(u)));
            c.atoms.push(k);
          } else if ("BOND" === n) {
            k = parseInt(g[1]);
            if (3 < k)
              switch (k) {
                case 4:
                  k = 1.5;
                  break;
                default:
                  k = 1;
              }
            k = new p.Bond(
              c.atoms[parseInt(g[2]) - 1],
              c.atoms[parseInt(g[3]) - 1],
              k
            );
            for (let a = 4, b = g.length; a < b; a++)
              if (
                ((u = g[a]),
                (w = u.indexOf("\x3d")),
                -1 !== w &&
                  ((f = u.substring(0, w)),
                  (u = u.substring(w + 1)),
                  "CFG" === f))
              )
                switch (parseInt(u)) {
                  case 2:
                    k.stereo = p.Bond.STEREO_AMBIGUOUS;
                    break;
                  case 1:
                    k.stereo = p.Bond.STEREO_PROTRUDING;
                    break;
                  case 3:
                    k.stereo = p.Bond.STEREO_RECESSED;
                }
            c.bonds.push(k);
          } else if ("COLLECTION" === n)
            if (k.startsWith("MDLV30/STEREL")) {
              k = k.substring(13);
              f = k.indexOf(" ");
              g = parseInt(k.substring(0, f));
              k = k.substring(f + 1);
              k = k.substring(7, k.length - 1);
              k = k.split(/(\s+)/).filter((a) => 0 < a.trim().length);
              for (let a = 1, b = k.length; a < b; a++)
                c.atoms[parseInt(k[a]) - 1].enhancedStereo = {
                  type: p.Atom.ESTEREO_OR,
                  group: g,
                };
            } else if (k.startsWith("MDLV30/STERAC")) {
              k = k.substring(13);
              f = k.indexOf(" ");
              g = parseInt(k.substring(0, f));
              k = k.substring(f + 1);
              k = k.substring(7, k.length - 1);
              k = k.split(/(\s+)/).filter((a) => 0 < a.trim().length);
              for (let a = 1, b = k.length; a < b; a++)
                c.atoms[parseInt(k[a]) - 1].enhancedStereo = {
                  type: p.Atom.ESTEREO_AND,
                  group: g,
                };
            }
    return c;
  };
  g.write = function (a) {
    let b = [];
    b.push(
      "Molecule from ChemDoodle Web Components\n\nhttp://www.ichemlabs.com\n"
    );
    b.push(this.fit(a.atoms.length.toString(), 3));
    b.push(this.fit(a.bonds.length.toString(), 3));
    b.push("  0  0  0  0            999 V" + this.version + "000\n");
    var c = a.getCenter();
    if (2 === this.version) {
      for (let h = 0, l = a.atoms.length; h < l; h++) {
        var d = a.atoms[h],
          f = " 0";
        if (-1 !== d.mass && m[d.label]) {
          var g = d.mass - m[d.label].mass;
          5 > g && -4 < g && (f = (-1 < g ? " " : "") + g);
        }
        g = "  0";
        if (0 !== d.charge)
          switch (d.charge) {
            case 3:
              g = "  1";
              break;
            case 2:
              g = "  2";
              break;
            case 1:
              g = "  3";
              break;
            case -1:
              g = "  5";
              break;
            case -2:
              g = "  6";
              break;
            case -3:
              g = "  7";
          }
        b.push(
          this.fit(
            ((d.x - c.x) / e.DEFAULT_STYLES.bondLength_2D).toFixed(4),
            10
          )
        );
        b.push(
          this.fit(
            (-(d.y - c.y) / e.DEFAULT_STYLES.bondLength_2D).toFixed(4),
            10
          )
        );
        b.push(this.fit((d.z / e.DEFAULT_STYLES.bondLength_2D).toFixed(4), 10));
        b.push(" ");
        b.push(this.fit(d.label, 3, !0));
        b.push(f);
        b.push(g);
        b.push("  0  0  0  0\n");
      }
      for (let c = 0, e = a.bonds.length; c < e; c++) {
        f = a.bonds[c];
        d = 0;
        f.stereo === p.Bond.STEREO_AMBIGUOUS
          ? (d = 3)
          : f.stereo === p.Bond.STEREO_PROTRUDING
          ? (d = 1)
          : f.stereo === p.Bond.STEREO_RECESSED && (d = 6);
        b.push(this.fit((a.atoms.indexOf(f.a1) + 1).toString(), 3));
        b.push(this.fit((a.atoms.indexOf(f.a2) + 1).toString(), 3));
        f = f.bondOrder;
        if (1.5 == f) f = 4;
        else if (3 < f || 0 != f % 1) f = 1;
        b.push(this.fit(f.toString(), 3));
        b.push("  ");
        b.push(d);
        b.push("  0  0  0\n");
      }
    } else if (3 === this.version) {
      b.push("M  V30 BEGIN CTAB\n");
      b.push("M  V30 COUNTS ");
      b.push(a.atoms.length);
      b.push(" ");
      b.push(a.bonds.length);
      b.push(" 0 0 0\n");
      b.push("M  V30 BEGIN ATOM\n");
      for (let d = 0, f = a.atoms.length; d < f; d++) {
        var n = a.atoms[d];
        b.push("M  V30 ");
        b.push(d + 1);
        b.push(" ");
        b.push(n.label);
        b.push(" ");
        b.push(((n.x - c.x) / e.DEFAULT_STYLES.bondLength_2D).toFixed(6));
        b.push(" ");
        b.push((-(n.y - c.y) / e.DEFAULT_STYLES.bondLength_2D).toFixed(6));
        b.push(" ");
        b.push((n.z / e.DEFAULT_STYLES.bondLength_2D).toFixed(6));
        b.push(" 0");
        0 !== n.charge && (b.push(" CHG\x3d"), b.push(n.charge));
        0 !== n.numRadical && (b.push(" RAD\x3d"), b.push(n.numRadical));
        -1 !== n.mass && (b.push(" MASS\x3d"), b.push(n.mass));
        b.push("\n");
      }
      b.push("M  V30 END ATOM\n");
      b.push("M  V30 BEGIN BOND\n");
      for (let d = 0, e = a.bonds.length; d < e; d++) {
        c = a.bonds[d];
        n = c.bondOrder;
        if (1.5 == n) n = 4;
        else if (3 < n || 0 != n % 1) n = 1;
        b.push("M  V30 ");
        b.push(d + 1);
        b.push(" ");
        b.push(n);
        b.push(" ");
        b.push(a.atoms.indexOf(c.a1) + 1);
        b.push(" ");
        b.push(a.atoms.indexOf(c.a2) + 1);
        c.stereo !== p.Bond.STEREO_NONE &&
          ((n = 0),
          c.stereo === p.Bond.STEREO_AMBIGUOUS
            ? (n = 2)
            : c.stereo === p.Bond.STEREO_PROTRUDING
            ? (n = 1)
            : c.stereo === p.Bond.STEREO_RECESSED && (n = 3),
          b.push(" CFG\x3d"),
          b.push(n));
        b.push("\n");
      }
      b.push("M  V30 END BOND\n");
      for (let b = 0, e = a.atoms.length; b < e; b++)
        if (
          ((c = a.atoms[b]), c.enhancedStereo.type !== p.Atom.ESTEREO_ABSOLUTE)
        ) {
          f || ((f = []), (d = []));
          c.enhancedStereo.type === p.Atom.ESTEREO_AND
            ? (g = f)
            : c.enhancedStereo.type === p.Atom.ESTEREO_OR && (g = d);
          let a;
          for (let b = 0, d = g.length; b < d; b++)
            if (((n = g[b]), n.group == c.enhancedStereo.group)) {
              a = n;
              break;
            }
          a || ((a = { group: c.enhancedStereo.group, list: [] }), g.push(a));
          a.list.push(c);
        }
      if (f && (0 < f.length || 0 < d.length)) {
        b.push("M  V30 BEGIN COLLECTION\n");
        if (0 < f.length)
          for (let c = 0, d = f.length; c < d; c++) {
            g = f[c];
            b.push("M  V30 MDLV30/STERAC");
            b.push(g.group);
            b.push(" ATOMS\x3d(");
            b.push(g.list.length);
            for (let c = 0, d = g.list.length; c < d; c++)
              b.push(" "), b.push(a.atoms.indexOf(g.list[c]) + 1);
            b.push(")\n");
          }
        if (0 < d.length)
          for (let c = 0, e = d.length; c < e; c++) {
            f = d[c];
            b.push("M  V30 MDLV30/STEREL");
            b.push(f.group);
            b.push(" ATOMS\x3d(");
            b.push(f.list.length);
            for (let c = 0, d = f.list.length; c < d; c++)
              b.push(" "), b.push(a.atoms.indexOf(f.list[c]) + 1);
            b.push(")\n");
          }
        b.push("M  V30 END COLLECTION\n");
      }
      b.push("M  V30 END CTAB\n");
    }
    b.push("M  END");
    return b.join("");
  };
  let a = new k.MOLInterpreter();
  e.readMOL = function (c, b) {
    return a.read(c, b);
  };
  e.writeMOL = function (c) {
    return a.write(c);
  };
  let f = new k.MOLInterpreter();
  f.version = 3;
  e.writeMOLV3 = function (a) {
    return f.write(a);
  };
})(ChemDoodle, ChemDoodle.ELEMENT, ChemDoodle.io, ChemDoodle.structures);
(function (e, m, k, p, d, g) {
  function a(a, b, d, e, f) {
    for (let c = 0, h = b.length; c < h; c++) {
      let h = b[c];
      if (h.id === d && e >= h.start && e <= h.end) {
        f ? (a.helix = !0) : (a.sheet = !0);
        e === h.end && (a.arrow = !0);
        break;
      }
    }
  }
  m.PDBInterpreter = function () {};
  g = m.PDBInterpreter.prototype = new m._Interpreter();
  g.calculateRibbonDistances = !1;
  g.deduceResidueBonds = !1;
  g.read = function (c, b) {
    let f = new k.Molecule();
    f.chains = [];
    if (!c) return f;
    var h = c.split("\n");
    b || (b = 1);
    var g = [];
    let m = [];
    let n = [];
    c = [];
    let u = [];
    for (let d = 0, e = h.length; d < e; d++) {
      var w = h[d];
      if (w.startsWith("HELIX"))
        g.push({
          id: w.substring(19, 20),
          start: parseInt(w.substring(21, 25)),
          end: parseInt(w.substring(33, 37)),
        });
      else if (w.startsWith("SHEET"))
        m.push({
          id: w.substring(21, 22),
          start: parseInt(w.substring(22, 26)),
          end: parseInt(w.substring(33, 37)),
        });
      else if (w.startsWith("ATOM")) {
        var y = w.substring(16, 17);
        if (" " === y || "A" === y) {
          y = w.substring(76, 78).trim();
          if (0 === y.length) {
            var x = w.substring(12, 14).trim();
            "HD" === x
              ? (y = "H")
              : 0 < x.length &&
                (y =
                  1 < x.length
                    ? x.charAt(0) + x.substring(1).toLowerCase()
                    : x);
          }
          y = new k.Atom(
            y,
            parseFloat(w.substring(30, 38)) * b,
            parseFloat(w.substring(38, 46)) * b,
            parseFloat(w.substring(46, 54)) * b
          );
          y.hetatm = !1;
          c.push(y);
          x = parseInt(w.substring(22, 26));
          if (0 === n.length)
            for (var t = 0; 3 > t; t++) {
              var z = new k.Residue(-1);
              z.cp1 = y;
              z.cp2 = y;
              n.push(z);
            }
          n[n.length - 1].resSeq !== x &&
            ((t = new k.Residue(x)),
            (t.name = w.substring(17, 20).trim()),
            3 === t.name.length
              ? (t.name =
                  t.name.substring(0, 1) + t.name.substring(1).toLowerCase())
              : 2 === t.name.length &&
                "D" === t.name.charAt(0) &&
                (t.name = t.name.substring(1)),
            n.push(t),
            (z = w.substring(21, 22)),
            a(t, g, z, x, !0),
            a(t, m, z, x, !1));
          w = w.substring(12, 16).trim();
          x = n[n.length - 1];
          if ("CA" === w || "P" === w || "O5'" === w) x.cp1 || (x.cp1 = y);
          else if (
            ("N3" === w &&
              ("C" === x.name || "U" === x.name || "T" === x.name)) ||
            ("N1" === w && ("A" === x.name || "G" === x.name))
          )
            x.cp3 = y;
          else if ("C2" === w) x.cp4 = y;
          else if (
            ("C4" === w &&
              ("C" === x.name || "U" === x.name || "T" === x.name)) ||
            ("C6" === w && ("A" === x.name || "G" === x.name))
          )
            x.cp5 = y;
          else if (
            "O" === w ||
            ("C6" === w &&
              ("C" === x.name || "U" === x.name || "T" === x.name)) ||
            "N9" === w
          ) {
            if (!n[n.length - 1].cp2) {
              if ("C6" === w || "N9" === w) var A = y;
              x.cp2 = y;
            }
          } else "C" === w && (A = y);
        }
      } else if (w.startsWith("HETATM"))
        (y = w.substring(76, 78).trim()),
          0 === y.length && (y = w.substring(12, 16).trim()),
          1 < y.length &&
            (y = y.substring(0, 1) + y.substring(1).toLowerCase()),
          (y = new k.Atom(
            y,
            parseFloat(w.substring(30, 38)) * b,
            parseFloat(w.substring(38, 46)) * b,
            parseFloat(w.substring(46, 54)) * b
          )),
          (y.hetatm = !0),
          "HOH" === w.substring(17, 20).trim() && (y.isWater = !0),
          f.atoms.push(y),
          (u[parseInt(w.substring(6, 11).trim())] = y);
      else if (w.startsWith("CONECT")) {
        if (((y = parseInt(w.substring(6, 11).trim())), u[y]))
          for (y = u[y], x = 0; 4 > x; x++)
            if (
              ((t = w.substring(11 + 5 * x, 16 + 5 * x).trim()),
              0 !== t.length && ((t = parseInt(t)), u[t]))
            ) {
              t = u[t];
              z = !1;
              for (let a = 0, b = f.bonds.length; a < b; a++) {
                let b = f.bonds[a];
                if ((b.a1 === y && b.a2 === t) || (b.a1 === t && b.a2 === y)) {
                  z = !0;
                  break;
                }
              }
              z || f.bonds.push(new k.Bond(y, t));
            }
      } else if (w.startsWith("TER")) this.endChain(f, n, A, c), (n = []);
      else if (w.startsWith("ENDMDL")) break;
    }
    this.endChain(f, n, A, c);
    0 === f.bonds.length &&
      new e.informatics.BondDeducer().deduceCovalentBonds(f, b);
    if (this.deduceResidueBonds)
      for (let a = 0, e = c.length; a < e; a++)
        for (b = d.min(e, a + 20), A = a + 1; A < b; A++)
          (h = c[a]),
            (g = c[A]),
            h.distance3D(g) <
              1.1 * (p[h.label].covalentRadius + p[g.label].covalentRadius) &&
              f.bonds.push(new k.Bond(h, g, 1));
    f.atoms = f.atoms.concat(c);
    this.calculateRibbonDistances && this.calculateDistances(f, c);
    return f;
  };
  g.endChain = function (a, b, d, e) {
    if (0 < b.length) {
      var c = b[b.length - 1];
      c.cp1 || (c.cp1 = e[e.length - 2]);
      c.cp2 || (c.cp2 = e[e.length - 1]);
      for (e = 0; 4 > e; e++)
        (c = new k.Residue(-1)),
          (c.cp1 = d),
          (c.cp2 = b[b.length - 1].cp2),
          b.push(c);
      a.chains.push(b);
    }
  };
  g.calculateDistances = function (a, b) {
    let c = [];
    for (let b = 0, d = a.atoms.length; b < d; b++) {
      let d = a.atoms[b];
      d.hetatm && (d.isWater || c.push(d));
    }
    for (let d = 0, e = b.length; d < e; d++)
      if (
        ((a = b[d]),
        (a.closestDistance = Number.POSITIVE_INFINITY),
        0 === c.length)
      )
        a.closestDistance = 0;
      else
        for (let b = 0, d = c.length; b < d; b++)
          a.closestDistance = Math.min(a.closestDistance, a.distance3D(c[b]));
  };
  let f = new m.PDBInterpreter();
  e.readPDB = function (a, b) {
    return f.read(a, b);
  };
})(ChemDoodle, ChemDoodle.io, ChemDoodle.structures, ChemDoodle.ELEMENT, Math);
(function (e, m, k, p) {
  let d = {
      "@": 0,
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      a: -1,
      b: -2,
      c: -3,
      d: -4,
      e: -5,
      f: -6,
      g: -7,
      h: -8,
      i: -9,
    },
    g = {
      "%": 0,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      O: 6,
      P: 7,
      Q: 8,
      R: 9,
      j: -1,
      k: -2,
      l: -3,
      m: -4,
      n: -5,
      o: -6,
      p: -7,
      q: -8,
      r: -9,
    },
    a = { S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8, s: 9 };
  m.JCAMPInterpreter = function () {};
  let f = (m.JCAMPInterpreter.prototype = new m._Interpreter());
  f.convertHZ2PPM = !1;
  f.read = function (b) {
    this.isBreak = function (b) {
      return (
        d[b] !== p ||
        g[b] !== p ||
        a[b] !== p ||
        " " === b ||
        "-" === b ||
        "+" === b
      );
    };
    this.getValue = function (a, b) {
      let c = a.charAt(0);
      a = a.substring(1);
      return d[c] !== p
        ? parseFloat(d[c] + a)
        : g[c] !== p
        ? parseFloat(g[c] + a) + b
        : parseFloat(a);
    };
    let c = new k.Spectrum();
    if (b === p || 0 === b.length) return c;
    b = b.split("\n");
    let e = [],
      f,
      m,
      n,
      u,
      w = 1,
      y = 1,
      x = 1,
      t = -1;
    var z = -1;
    let A = !0,
      B = !1;
    for (let h = 0, l = b.length; h < l; h++) {
      var C = b[h].trim(),
        D = C.indexOf("$$");
      -1 !== D && (C = C.substring(0, D));
      if (0 !== e.length && b[h].startsWith("##"))
        if (
          ((D = e.join("")),
          A && 100 > D.length && c.metadata.push(D),
          (e = [C]),
          D.startsWith("##TITLE\x3d"))
        )
          c.title = D.substring(8).trim();
        else if (D.startsWith("##XUNITS\x3d"))
          (c.xUnit = D.substring(9).trim()),
            this.convertHZ2PPM &&
              "HZ" === c.xUnit.toUpperCase() &&
              ((c.xUnit = "PPM"), (B = !0));
        else if (D.startsWith("##YUNITS\x3d")) c.yUnit = D.substring(9).trim();
        else {
          if (!D.startsWith("##XYPAIRS\x3d"))
            if (D.startsWith("##FIRSTX\x3d"))
              m = parseFloat(D.substring(9).trim());
            else if (D.startsWith("##LASTX\x3d"))
              f = parseFloat(D.substring(8).trim());
            else if (D.startsWith("##FIRSTY\x3d"))
              n = parseFloat(D.substring(9).trim());
            else if (D.startsWith("##NPOINTS\x3d"))
              u = parseFloat(D.substring(10).trim());
            else if (D.startsWith("##XFACTOR\x3d"))
              w = parseFloat(D.substring(10).trim());
            else if (D.startsWith("##YFACTOR\x3d"))
              y = parseFloat(D.substring(10).trim());
            else if (D.startsWith("##DELTAX\x3d"))
              parseFloat(D.substring(9).trim());
            else if (D.startsWith("##.OBSERVE FREQUENCY\x3d"))
              this.convertHZ2PPM && (x = parseFloat(D.substring(21).trim()));
            else if (D.startsWith("##.SHIFT REFERENCE\x3d"))
              this.convertHZ2PPM &&
                ((z = D.substring(19).split(",")),
                (t = parseInt(z[2].trim())),
                (z = parseFloat(z[3].trim())));
            else if (D.startsWith("##XYDATA\x3d")) {
              B || (x = 1);
              C = A = !1;
              D = D.split("\n");
              var J = (f - m) / (u - 1),
                G = m - J,
                F = n,
                H = 0;
              let b;
              for (let e = 1, f = D.length; e < f; e++) {
                var L = [];
                G = D[e].trim();
                F = [];
                for (let a = 0, b = G.length; a < b; a++)
                  this.isBreak(G.charAt(a))
                    ? (0 < F.length &&
                        (1 !== F.length || " " !== F[0]) &&
                        L.push(F.join("")),
                      (F = [G.charAt(a)]))
                    : F.push(G.charAt(a));
                L.push(F.join(""));
                G = parseFloat(L[0]) * w - J;
                for (let e = 1, f = L.length; e < f; e++)
                  if (((F = L[e]), a[F.charAt(0)] !== p)) {
                    let d = parseInt(a[F.charAt(0)] + F.substring(1)) - 1;
                    for (let a = 0; a < d; a++)
                      (G += J),
                        (H = this.getValue(b, H)),
                        (F = H * y),
                        (c.data[c.data.length - 1] = new k.Point(G / x, F));
                  } else
                    d[F.charAt(0)] !== p && C
                      ? (F = this.getValue(F, H) * y)
                      : ((C = g[F.charAt(0)] !== p),
                        (b = F),
                        (G += J),
                        (H = this.getValue(F, H)),
                        (F = H * y),
                        c.data.push(new k.Point(G / x, F)));
              }
              if (-1 !== t) {
                C = z - c.data[t - 1].x;
                for (let a = 0, b = c.data.length; a < b; a++) c.data[a].x += C;
              }
            } else if (D.startsWith("##PEAK TABLE\x3d")) {
              A = !1;
              c.continuous = !1;
              C = D.split("\n");
              D = /[\s,]+/;
              for (let a = 1, b = C.length; a < b; a++) {
                J = C[a].split(D);
                for (let a = 0, b = J.length; a + 1 < b; a += 2)
                  c.data.push(
                    new k.Point(
                      parseFloat(J[a].trim()),
                      parseFloat(J[a + 1].trim())
                    )
                  );
              }
            } else if (D.startsWith("##ATOMLIST\x3d")) {
              c.molecule = new k.Molecule();
              C = D.split("\n");
              D = /[\s]+/;
              for (let a = 1, b = C.length; a < b; a++)
                (J = C[a].split(D)), c.molecule.atoms.push(new k.Atom(J[1]));
            } else if (D.startsWith("##BONDLIST\x3d")) {
              C = D.split("\n");
              D = /[\s]+/;
              for (let a = 1, b = C.length; a < b; a++)
                (J = C[a].split(D)),
                  (H = 1),
                  "D" === J[2] ? (H = 2) : "T" === J[2] && (H = 3),
                  c.molecule.bonds.push(
                    new k.Bond(
                      c.molecule.atoms[parseInt(J[0]) - 1],
                      c.molecule.atoms[parseInt(J[1]) - 1],
                      H
                    )
                  );
            } else if (c.molecule && D.startsWith("##XY_RASTER\x3d")) {
              C = D.split("\n");
              D = /[\s]+/;
              for (let a = 1, b = C.length; a < b; a++)
                (J = C[a].split(D)),
                  (H = c.molecule.atoms[parseInt(J[0]) - 1]),
                  (H.x = parseInt(J[1])),
                  (H.y = parseInt(J[2])),
                  4 == J.length && (H.z = parseInt(J[3]));
              c.molecule.scaleToAverageBondLength(20);
            } else if (D.startsWith("##PEAK ASSIGNMENTS\x3d")) {
              C = D.split("\n");
              D = /[\s,()<>]+/;
              c.assignments = [];
              for (let a = 1, b = C.length; a < b; a++) {
                L = C[a].split(D);
                J = parseFloat(L[1]);
                H = parseFloat(L[2]);
                L = c.molecule.atoms[parseInt(L[3]) - 1];
                G = !1;
                for (let a = 0, b = c.assignments.length; a < b; a++)
                  if (((F = c.assignments[a]), F.x === J)) {
                    F.as.push(L);
                    L.assigned = F;
                    G = !0;
                    break;
                  }
                G ||
                  ((J = { x: J, y: H, as: [L] }),
                  (L.assigned = J),
                  c.assignments.push(J));
              }
            }
        }
      else
        (C = C.trim()),
          0 !== e.length && 0 !== C.length && e.push("\n"),
          e.push(C);
    }
    c.setup();
    return c;
  };
  f.makeStructureSpectrumSet = function (a, c) {
    this.convertHZ2PPM = !0;
    let b = this.read(c),
      d = new e.ViewerCanvas(a + "_molecule", 200, 200);
    d.styles.atoms_displayTerminalCarbonLabels_2D = !0;
    d.styles.atoms_displayImplicitHydrogens_2D = !0;
    d.mouseout = function (a) {
      if (0 !== this.molecules.length) {
        for (let a = 0, b = this.molecules[0].atoms.length; a < b; a++)
          this.molecules[0].atoms[a].isHover = !1;
        b.hovered = p;
        this.repaint();
        f.repaint();
      }
    };
    d.touchend = d.mouseout;
    d.mousemove = function (a) {
      if (0 !== this.molecules.length) {
        let c = p;
        for (let b = 0, d = this.molecules[0].atoms.length; b < d; b++) {
          let d = this.molecules[0].atoms[b];
          d.isHover = !1;
          d.assigned &&
            (c === p || a.p.distance(d) < a.p.distance(c)) &&
            (c = d);
        }
        b.hovered = p;
        if (20 > a.p.distance(c)) {
          for (let a = 0, b = c.assigned.as.length; a < b; a++)
            c.assigned.as[a].isHover = !0;
          f.spectrum.hovered = c.assigned;
        }
        this.repaint();
        f.repaint();
      }
    };
    d.touchmove = d.mousemove;
    d.drawChildExtras = function (a, b) {
      if (0 !== this.molecules.length)
        for (let c = 0, d = this.molecules[0].atoms.length; c < d; c++)
          this.molecules[0].atoms[c].drawDecorations(a, b);
    };
    let f = new e.ObserverCanvas(a + "_spectrum", 400, 200);
    f.styles.plots_showYAxis = !1;
    f.styles.plots_flipXAxis = !0;
    f.mouseout = function (a) {
      if (this.spectrum && this.spectrum.assignments) {
        for (let a = 0, b = d.molecules[0].atoms.length; a < b; a++)
          d.molecules[0].atoms[a].isHover = !1;
        this.spectrum.hovered = p;
        d.repaint();
        this.repaint();
      }
    };
    f.touchend = f.mouseout;
    f.mousemove = function (a) {
      if (this.spectrum && this.spectrum.assignments) {
        let b = p;
        for (let a = 0, b = d.molecules[0].atoms.length; a < b; a++)
          d.molecules[0].atoms[a].isHover = !1;
        this.spectrum.hovered = p;
        for (let c = 0, d = this.spectrum.assignments.length; c < d; c++) {
          let d = this.spectrum.assignments[c];
          if (
            b === p ||
            Math.abs(
              this.spectrum.getTransformedX(
                d.x,
                this.styles,
                this.spectrum.memory.width,
                this.spectrum.memory.offsetLeft
              ) - a.p.x
            ) <
              Math.abs(
                this.spectrum.getTransformedX(
                  b.x,
                  this.styles,
                  this.spectrum.memory.width,
                  this.spectrum.memory.offsetLeft
                ) - a.p.x
              )
          )
            b = d;
        }
        if (
          20 >
          Math.abs(
            this.spectrum.getTransformedX(
              b.x,
              this.styles,
              this.spectrum.memory.width,
              this.spectrum.memory.offsetLeft
            ) - a.p.x
          )
        ) {
          for (let a = 0, c = b.as.length; a < c; a++) b.as[a].isHover = !0;
          this.spectrum.hovered = b;
        }
        d.repaint();
        this.repaint();
      }
    };
    f.touchmove = f.mousemove;
    f.drawChildExtras = function (a) {
      if (this.spectrum && this.spectrum.hovered) {
        let b = this.spectrum.getTransformedX(
          this.spectrum.hovered.x,
          f.styles,
          this.spectrum.memory.width,
          this.spectrum.memory.offsetLeft
        );
        b >= this.spectrum.memory.offsetLeft &&
          b < this.spectrum.memory.width &&
          (a.save(),
          (a.strokeStyle = "#885110"),
          (a.lineWidth = 3),
          a.beginPath(),
          a.moveTo(
            b,
            this.spectrum.memory.height - this.spectrum.memory.offsetBottom
          ),
          a.lineTo(
            b,
            this.spectrum.getTransformedY(
              this.spectrum.hovered.y,
              f.styles,
              this.spectrum.memory.height,
              this.spectrum.memory.offsetBottom,
              this.spectrum.memory.offsetTop
            )
          ),
          a.stroke(),
          a.restore());
      }
    };
    b && (f.loadSpectrum(b), b.molecule && d.loadMolecule(b.molecule));
    return [d, f];
  };
  let c = new m.JCAMPInterpreter();
  c.convertHZ2PPM = !0;
  e.readJCAMP = function (a) {
    return c.read(a);
  };
})(ChemDoodle, ChemDoodle.io, ChemDoodle.structures);
(function (e, m, k, p, d, g, a) {
  m.JSONInterpreter = function () {};
  let f = m.JSONInterpreter.prototype;
  f.contentTo = function (b, c) {
    b || (b = []);
    c || (c = []);
    var d = !0;
    for (let c = 0, f = b.length; c < f; c++) {
      var e = b[c];
      for (let b = 0, c = e.atoms.length; b < c; b++)
        if (e.atoms[b].pid === a) {
          d = !1;
          break;
        }
      if (d)
        for (let b = 0, c = e.bonds.length; b < c; b++)
          if (e.bonds[b].pid === a) {
            d = !1;
            break;
          }
    }
    let f = (e = 0),
      g = 0;
    for (let c = 0, h = b.length; c < h; c++) {
      let h = b[c],
        n = a;
      for (let b = 0, c = h.atoms.length; b < c; b++) {
        var l = h.atoms[b];
        if (d) {
          if (((l.tmpid = "a" + l.pid), n === a || n > l.pid)) n = l.pid;
        } else l.tmpid = "a" + e++;
      }
      for (let a = 0, b = h.bonds.length; a < b; a++)
        (l = h.bonds[a]), (l.tmpid = d ? "b" + l.pid : "b" + f++);
      h.tmpid = "m" + (n === a ? g++ : n);
    }
    e = 0;
    for (let a = 0, b = c.length; a < b; a++) c[a].tmpid = "s" + e++;
    d = {};
    if (b && 0 < b.length) {
      d.m = [];
      for (let a = 0, c = b.length; a < c; a++) d.m.push(this.molTo(b[a]));
    }
    if (c && 0 < c.length) {
      d.s = [];
      for (let a = 0, b = c.length; a < b; a++) d.s.push(this.shapeTo(c[a]));
    }
    for (let c = 0, d = b.length; c < d; c++) {
      e = b[c];
      for (let b = 0, c = e.atoms.length; b < c; b++) e.atoms[b].tmpid = a;
      for (let b = 0, c = e.bonds.length; b < c; b++) e.bonds[b].tmpid = a;
      e.tmpid = a;
    }
    for (let b = 0, d = c.length; b < d; b++) c[b].tmpid = a;
    return d;
  };
  f.contentFrom = function (b) {
    let c = { molecules: [], shapes: [] };
    if (b.m)
      for (let a = 0, d = b.m.length; a < d; a++)
        c.molecules.push(this.molFrom(b.m[a]));
    if (b.s)
      for (let a = 0, d = b.s.length; a < d; a++)
        c.shapes.push(this.shapeFrom(b.s[a], c.molecules));
    for (let d = 0, e = c.molecules.length; d < e; d++) {
      b = c.molecules[d];
      for (let c = 0, d = b.atoms.length; c < d; c++) b.atoms[c].tmpid = a;
      for (let c = 0, d = b.bonds.length; c < d; c++) b.bonds[c].tmpid = a;
    }
    for (let b = 0, d = c.shapes.length; b < d; b++) c.shapes[b].tmpid = a;
    return c;
  };
  f.queryTo = function (a) {
    let b = {},
      c = function (b, c, d, e) {
        c && (b[d] = { v: e ? a.outputRange(c.v) : c.v, n: c.not });
      };
    a.type === k.Query.TYPE_ATOM
      ? (c(b, a.elements, "as"),
        c(b, a.chirality, "@"),
        c(b, a.aromatic, "A"),
        c(b, a.charge, "C", !0),
        c(b, a.hydrogens, "H", !0),
        c(b, a.ringCount, "R", !0),
        c(b, a.saturation, "S"),
        c(b, a.connectivity, "X", !0),
        c(b, a.connectivityNoH, "x", !0))
      : (c(b, a.orders, "bs"),
        c(b, a.stereo, "@"),
        c(b, a.aromatic, "A"),
        c(b, a.ringCount, "R", !0));
    return b;
  };
  f.molTo = function (a) {
    let b = { a: [] };
    a.tmpid && (b.i = a.tmpid);
    for (let e = 0, f = a.atoms.length; e < f; e++) {
      var c = a.atoms[e],
        d = { x: c.x, y: c.y };
      c.tmpid && (d.i = c.tmpid);
      "C" !== c.label && (d.l = c.label);
      0 !== c.z && (d.z = c.z);
      0 !== c.charge && (d.c = c.charge);
      -1 !== c.mass && (d.m = c.mass);
      -1 !== c.implicitH && (d.h = c.implicitH);
      0 !== c.numRadical && (d.r = c.numRadical);
      0 !== c.numLonePair && (d.p = c.numLonePair);
      c.enhancedStereo &&
        c.enhancedStereo.type !== k.Atom.ESTEREO_ABSOLUTE &&
        ((d.s2 = { t: c.enhancedStereo.type }),
        1 < c.enhancedStereo.group && (d.s2.g = c.enhancedStereo.group));
      c.query && (d.q = this.queryTo(c.query));
      b.a.push(d);
    }
    if (0 < a.bonds.length) {
      b.b = [];
      for (let e = 0, f = a.bonds.length; e < f; e++)
        (c = a.bonds[e]),
          (d = { b: a.atoms.indexOf(c.a1), e: a.atoms.indexOf(c.a2) }),
          c.tmpid && (d.i = c.tmpid),
          1 !== c.bondOrder && (d.o = c.bondOrder),
          c.stereo !== k.Bond.STEREO_NONE && (d.s = c.stereo),
          c.query && (d.q = this.queryTo(c.query)),
          b.b.push(d);
    }
    return b;
  };
  f.queryFrom = function (a) {
    let b = new k.Query(a.as ? k.Query.TYPE_ATOM : k.Query.TYPE_BOND),
      c = function (a, b, c, d) {
        b &&
          ((a[c] = {}),
          (a[c].v = d ? a.parseRange(b.v) : b.v),
          b.n && (a[c].not = !0));
      };
    b.type === k.Query.TYPE_ATOM
      ? (c(b, a.as, "elements"),
        c(b, a["@"], "chirality"),
        c(b, a.A, "aromatic"),
        c(b, a.C, "charge", !0),
        c(b, a.H, "hydrogens", !0),
        c(b, a.R, "ringCount", !0),
        c(b, a.S, "saturation"),
        c(b, a.X, "connectivity", !0),
        c(b, a.x, "connectivityNoH", !0))
      : (c(b, a.bs, "orders"),
        c(b, a["@"], "stereo"),
        c(b, a.A, "aromatic"),
        c(b, a.R, "ringCount", !0));
    return b;
  };
  f.molFrom = function (b) {
    let c = new k.Molecule();
    for (let f = 0, g = b.a.length; f < g; f++) {
      var d = b.a[f],
        e = new k.Atom(d.l ? d.l : "C", d.x, d.y);
      d.i && (e.tmpid = d.i);
      d.z && (e.z = d.z);
      d.c && (e.charge = d.c);
      d.m && (e.mass = d.m);
      d.h && (e.implicitH = d.h);
      d.r && (e.numRadical = d.r);
      d.p && (e.numLonePair = d.p);
      d.s2 &&
        (e.enhancedStereo = { type: d.s2.t, group: d.s2.g === a ? 1 : d.s2.g });
      d.q && (e.query = this.queryFrom(d.q));
      d.p_h !== a && (e.hetatm = d.p_h);
      d.p_w !== a && (e.isWater = d.p_w);
      d.p_d !== a && (e.closestDistance = d.p_d);
      c.atoms.push(e);
    }
    if (b.b)
      for (let f = 0, g = b.b.length; f < g; f++)
        (d = b.b[f]),
          (e = new k.Bond(c.atoms[d.b], c.atoms[d.e], d.o === a ? 1 : d.o)),
          d.i && (e.tmpid = d.i),
          d.s && (e.stereo = d.s),
          d.q && (e.query = this.queryFrom(d.q)),
          c.bonds.push(e);
    return c;
  };
  f.shapeTo = function (b) {
    let c = {};
    b.tmpid && (c.i = b.tmpid);
    if (b instanceof p.Line) {
      c.t = "Line";
      c.x1 = b.p1.x;
      c.y1 = b.p1.y;
      c.x2 = b.p2.x;
      c.y2 = b.p2.y;
      c.a = b.arrowType;
      if (b.reactants !== a && 0 < b.reactants.length) {
        c.rs = [];
        for (let a = 0, d = b.reactants.length; a < d; a++)
          c.rs[a] = b.reactants[a].tmpid;
      }
      if (b.products !== a && 0 < b.products.length) {
        c.ps = [];
        for (let a = 0, d = b.products.length; a < d; a++)
          c.ps[a] = b.products[a].tmpid;
      }
    } else if (b instanceof p.Pusher)
      (c.t = "Pusher"),
        (c.o1 = b.o1.tmpid),
        (c.o2 = b.o2.tmpid),
        1 !== b.numElectron && (c.e = b.numElectron);
    else if (b instanceof p.AtomMapping)
      (c.t = "AtomMapping"),
        (c.a1 = b.o1.tmpid),
        (c.a2 = b.o2.tmpid),
        (c.n = b.label);
    else if (b instanceof p.Bracket)
      (c.t = "Bracket"),
        (c.x1 = b.p1.x),
        (c.y1 = b.p1.y),
        (c.x2 = b.p2.x),
        (c.y2 = b.p2.y),
        0 !== b.charge && (c.c = b.charge),
        0 !== b.mult && (c.m = b.mult),
        0 !== b.repeat && (c.r = b.repeat);
    else if (b instanceof p.RepeatUnit)
      (c.t = "RepeatUnit"),
        (c.b1 = b.b1.tmpid),
        (c.b2 = b.b2.tmpid),
        (c.n1 = b.n1),
        (c.n2 = b.n2),
        !0 === b.flip && (c.f = !0);
    else if (b instanceof p.VAP) {
      c.t = "VAP";
      c.x = b.asterisk.x;
      c.y = b.asterisk.y;
      1 !== b.bondType && (c.o = b.bondType);
      b.substituent && (c.s = b.substituent.tmpid);
      c.a = [];
      for (let a = 0, d = b.attachments.length; a < d; a++)
        c.a.push(b.attachments[a].tmpid);
    } else if (b instanceof d.Distance)
      (c.t = "Distance"),
        (c.a1 = b.a1.tmpid),
        (c.a2 = b.a2.tmpid),
        b.node && ((c.n = b.node), (c.o = b.offset));
    else if (b instanceof d.Angle)
      (c.t = "Angle"),
        (c.a1 = b.a1.tmpid),
        (c.a2 = b.a2.tmpid),
        (c.a3 = b.a3.tmpid);
    else if (b instanceof d.Torsion)
      (c.t = "Torsion"),
        (c.a1 = b.a1.tmpid),
        (c.a2 = b.a2.tmpid),
        (c.a3 = b.a3.tmpid),
        (c.a4 = b.a4.tmpid);
    else if (b instanceof d._Surface) {
      c.t = "Surface";
      c.a = [];
      for (let a = 0, d = b.atoms.length; a < d; a++)
        c.a.push(b.atoms[a].tmpid);
      b instanceof d.VDWSurface || (c.p = b.probeRadius);
      c.r = b.resolution;
      let a = "vdw";
      b instanceof d.SASSurface
        ? (a = "sas")
        : d.SESSurface && b instanceof d.SESSurface && (a = "ses");
      c.f = a;
    } else
      b instanceof d.UnitCell &&
        ((c.t = "UnitCell"),
        (c.ls = b.lengths),
        (c.as = b.angles),
        (c.os = b.offset));
    return c;
  };
  f.shapeFrom = function (b, c) {
    if ("Line" === b.t) {
      var e = new p.Line(new k.Point(b.x1, b.y1), new k.Point(b.x2, b.y2));
      e.arrowType = b.a;
      if (b.rs !== a) {
        e.reactants = [];
        for (let a = 0, d = b.rs.length; a < d; a++) {
          var f = b.rs[a];
          a: for (let a = 0, b = c.length; a < b; a++) {
            var g = c[a];
            for (let a = 0, b = g.atoms.length; a < b; a++) {
              var l = g.atoms[a];
              if (l.tmpid === f) {
                e.reactants.push(l);
                break a;
              }
            }
          }
        }
      }
      if (b.ps !== a) {
        e.products = [];
        for (let a = 0, d = b.ps.length; a < d; a++) {
          f = b.ps[a];
          a: for (let a = 0, b = c.length; a < b; a++) {
            g = c[a];
            for (let a = 0, b = g.atoms.length; a < b; a++)
              if (((l = g.atoms[a]), l.tmpid === f)) {
                e.products.push(l);
                break a;
              }
          }
        }
      }
    } else if ("Pusher" === b.t) {
      for (let a = 0, d = c.length; a < d; a++) {
        e = c[a];
        for (let a = 0, c = e.atoms.length; a < c; a++)
          (l = e.atoms[a]),
            l.tmpid === b.o1 ? (f = l) : l.tmpid === b.o2 && (g = l);
        for (let a = 0, c = e.bonds.length; a < c; a++)
          (l = e.bonds[a]),
            l.tmpid === b.o1 ? (f = l) : l.tmpid === b.o2 && (g = l);
      }
      e = new p.Pusher(f, g);
      b.e && (e.numElectron = b.e);
    } else if ("AtomMapping" === b.t) {
      let d;
      for (let a = 0, g = c.length; a < g; a++) {
        e = c[a];
        for (let a = 0, c = e.atoms.length; a < c; a++)
          (f = e.atoms[a]),
            f.tmpid === b.a1 ? (l = f) : f.tmpid === b.a2 && (d = f);
      }
      e = new p.AtomMapping(l, d);
      b.n !== a && (e.label = b.n);
    } else if ("Bracket" === b.t)
      (e = new p.Bracket(new k.Point(b.x1, b.y1), new k.Point(b.x2, b.y2))),
        b.c !== a && (e.charge = b.c),
        b.m !== a && (e.mult = b.m),
        b.r !== a && (e.repeat = b.r);
    else if ("RepeatUnit" === b.t || "DynamicBracket" === b.t) {
      let a, d;
      for (let g = 0, h = c.length; g < h; g++) {
        e = c[g];
        for (let c = 0, g = e.bonds.length; c < g; c++)
          (f = e.bonds[c]),
            f.tmpid === b.b1 ? (a = f) : f.tmpid === b.b2 && (d = f);
      }
      e = new p.RepeatUnit(a, d);
      e.n1 = b.n1;
      e.n2 = b.n2;
      b.f && (e.flip = !0);
    } else if ("VAP" === b.t) {
      e = new p.VAP(b.x, b.y);
      b.o && (e.bondType = b.o);
      for (let a = 0, d = c.length; a < d; a++) {
        f = c[a];
        for (let a = 0, c = f.atoms.length; a < c; a++)
          if (((g = f.atoms[a]), g.tmpid === b.s)) e.substituent = g;
          else
            for (let a = 0, c = b.a.length; a < c; a++)
              g.tmpid === b.a[a] && e.attachments.push(g);
      }
    } else if ("Distance" === b.t) {
      let a, g;
      for (let d = 0, h = c.length; d < h; d++) {
        e = c[d];
        for (let c = 0, d = e.atoms.length; c < d; c++)
          (f = e.atoms[c]),
            f.tmpid === b.a1 ? (a = f) : f.tmpid === b.a2 && (g = f);
      }
      e = new d.Distance(a, g, b.n, b.o);
    } else if ("Angle" === b.t) {
      let a, g, h;
      for (let d = 0, l = c.length; d < l; d++) {
        e = c[d];
        for (let c = 0, d = e.atoms.length; c < d; c++)
          (f = e.atoms[c]),
            f.tmpid === b.a1
              ? (a = f)
              : f.tmpid === b.a2
              ? (g = f)
              : f.tmpid === b.a3 && (h = f);
      }
      e = new d.Angle(a, g, h);
    } else if ("Torsion" === b.t) {
      let a, g, h, l;
      for (let d = 0, n = c.length; d < n; d++) {
        e = c[d];
        for (let c = 0, d = e.atoms.length; c < d; c++)
          (f = e.atoms[c]),
            f.tmpid === b.a1
              ? (a = f)
              : f.tmpid === b.a2
              ? (g = f)
              : f.tmpid === b.a3
              ? (h = f)
              : f.tmpid === b.a4 && (l = f);
      }
      e = new d.Torsion(a, g, h, l);
    } else if ("Surface" === b.t) {
      f = [];
      for (let a = 0, d = c.length; a < d; a++) {
        g = c[a];
        for (let a = 0, c = g.atoms.length; a < c; a++) {
          l = g.atoms[a];
          for (let a = 0, c = b.a.length; a < c; a++)
            l.tmpid === b.a[a] && f.push(l);
        }
      }
      c = b.p ? b.p : 1.4;
      g = b.r ? b.r : 30;
      "vdw" === b.f
        ? (e = new d.VDWSurface(f, g))
        : "sas" === b.f
        ? (e = new d.SASSurface(f, c, g))
        : "ses" === b.f && (e = new d.SESSurface(f, c, g));
    } else "UnitCell" === b.t && (e = new d.UnitCell(b.ls, b.as, b.os));
    return e;
  };
  f.pdbFrom = function (a) {
    let b = this.molFrom(a.mol);
    b.findRings = !1;
    b.fromJSON = !0;
    b.chains = this.chainsFrom(a.ribbons);
    return b;
  };
  f.chainsFrom = function (a) {
    let b = [];
    for (let c = 0, d = a.cs.length; c < d; c++) {
      let d = a.cs[c],
        e = [];
      for (let a = 0, b = d.length; a < b; a++) {
        let b = d[a],
          c = new k.Residue();
        c.name = b.n;
        c.cp1 = new k.Atom("", b.x1, b.y1, b.z1);
        c.cp2 = new k.Atom("", b.x2, b.y2, b.z2);
        b.x3 &&
          ((c.cp3 = new k.Atom("", b.x3, b.y3, b.z3)),
          (c.cp4 = new k.Atom("", b.x4, b.y4, b.z4)),
          (c.cp5 = new k.Atom("", b.x5, b.y5, b.z5)));
        c.helix = b.h;
        c.sheet = b.s;
        c.arrow = 0 < a && d[a - 1].a;
        e.push(c);
      }
      b.push(e);
    }
    return b;
  };
  let c = new m.JSONInterpreter();
  e.readJSON = function (b) {
    let d;
    try {
      d = g.parse(b);
    } catch (h) {
      return a;
    }
    return d
      ? d.m || d.s
        ? c.contentFrom(d)
        : d.a
        ? { molecules: [c.molFrom(d)], shapes: [] }
        : { molecules: [], shapes: [] }
      : a;
  };
  e.writeJSON = function (a, d) {
    return g.stringify(c.contentTo(a, d));
  };
})(
  ChemDoodle,
  ChemDoodle.io,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  ChemDoodle.structures.d3,
  JSON
);
(function (e, m, k, p) {
  m.RXNInterpreter = function () {};
  let d = (m.RXNInterpreter.prototype = new m._Interpreter());
  d.read = function (a, d) {
    d || (d = e.DEFAULT_STYLES.bondLength_2D);
    let c = [];
    if (a) {
      var b = a.split("$MOL\n");
      a = b[0].split("\n")[4];
      var f = parseInt(a.substring(0, 3)),
        g = parseInt(a.substring(3, 6)),
        m = 1;
      a = 0;
      for (let h = 0, l = f + g; h < l; h++) {
        c[h] = e.readMOL(b[m], d);
        let f = c[h].getBounds();
        a -= f.maxX - f.minX + 40;
        m++;
      }
      for (let e = 0, g = f; e < g; e++) {
        d = c[e].getBounds();
        d = d.maxX - d.minX;
        b = c[e].getCenter();
        for (let f = 0, g = c[e].atoms.length; f < g; f++)
          (m = c[e].atoms[f]), (m.x += a + d / 2 - b.x), (m.y -= b.y);
        a += d + 40;
      }
      d = new k.d2.Line(new k.Point(a, 0), new k.Point(a + 40, 0));
      a += 80;
      for (let d = f, e = f + g; d < e; d++) {
        f = c[d].getBounds();
        f = f.maxX - f.minX;
        g = c[d].getCenter();
        for (b = 0; b < c[d].atoms.length; b++)
          (m = c[d].atoms[b]), (m.x += a + f / 2 - g.x), (m.y -= g.y);
        a += f + 40;
      }
    } else
      c.push(new k.Molecule()),
        (d = new k.d2.Line(new k.Point(-20, 0), new k.Point(20, 0)));
    d.arrowType = k.d2.Line.ARROW_SYNTHETIC;
    return { molecules: c, shapes: [d] };
  };
  d.write = function (a, d) {
    let c = p;
    if (a && d) {
      for (let a = 0, e = d.length; a < e; a++)
        if (d[a] instanceof k.d2.Line) {
          c = d[a];
          break;
        }
      if (!c) return "";
      a = new k.Reaction().resolve(c, a);
      d = [];
      d.push(
        "$RXN\nReaction from ChemDoodle Web Components\n\nhttp://www.ichemlabs.com\n"
      );
      d.push(this.fit(a.reactants.length.toString(), 3));
      d.push(this.fit(a.products.length.toString(), 3));
      d.push("\n");
      for (let b = 0, c = a.reactants.length; b < c; b++)
        d.push("$MOL\n"), d.push(e.writeMOL(a.reactants[b])), d.push("\n");
      for (let b = 0, c = a.products.length; b < c; b++)
        d.push("$MOL\n"), d.push(e.writeMOL(a.products[b])), d.push("\n");
      return d.join("");
    }
  };
  let g = new m.RXNInterpreter();
  e.readRXN = function (a, d) {
    return g.read(a, d);
  };
  e.writeRXN = function (a, d) {
    return g.write(a, d);
  };
})(ChemDoodle, ChemDoodle.io, ChemDoodle.structures);
(function (e, m, k, p, d, g) {
  p.XYZInterpreter = function () {};
  m = p.XYZInterpreter.prototype = new p._Interpreter();
  m.deduceCovalentBonds = !0;
  m.read = function (a) {
    let c = new d.Molecule();
    if (!a) return c;
    a = a.split("\n");
    let b = parseInt(a[0].trim());
    for (let e = 0; e < b; e++) {
      let b = a[e + 2].split(/\s+/g);
      c.atoms[e] = new d.Atom(
        isNaN(b[0]) ? b[0] : k[parseInt(b[0]) - 1],
        parseFloat(b[1]),
        parseFloat(b[2]),
        parseFloat(b[3])
      );
    }
    this.deduceCovalentBonds &&
      new e.informatics.BondDeducer().deduceCovalentBonds(c, 1);
    return c;
  };
  let a = new p.XYZInterpreter();
  e.readXYZ = function (d) {
    return a.read(d);
  };
})(
  ChemDoodle,
  ChemDoodle.ELEMENT,
  ChemDoodle.SYMBOLS,
  ChemDoodle.io,
  ChemDoodle.structures
);
ChemDoodle.monitor = (function (e, m, k) {
  let p = {};
  p.CANVAS_DRAGGING = k;
  p.CANVAS_OVER = k;
  p.ALT = !1;
  p.SHIFT = !1;
  p.META = !1;
  e.supports_touch() ||
    m.addEventListener("DOMContentLoaded", function () {
      m.addEventListener("mousemove", function (d) {
        p.CANVAS_DRAGGING &&
          p.CANVAS_DRAGGING.drag &&
          (p.CANVAS_DRAGGING.prehandleEvent(d), p.CANVAS_DRAGGING.drag(d));
      });
      m.addEventListener("mouseup", function (d) {
        p.CANVAS_DRAGGING &&
          p.CANVAS_DRAGGING !== p.CANVAS_OVER &&
          p.CANVAS_DRAGGING.mouseup &&
          (p.CANVAS_DRAGGING.prehandleEvent(d), p.CANVAS_DRAGGING.mouseup(d));
        p.CANVAS_DRAGGING = k;
      });
      m.addEventListener("keydown", function (d) {
        p.SHIFT = d.shiftKey;
        p.ALT = d.altKey;
        p.META = d.metaKey || d.ctrlKey;
        let e = p.CANVAS_OVER;
        p.CANVAS_DRAGGING && (e = p.CANVAS_DRAGGING);
        e && e.keydown && (e.prehandleEvent(d), e.keydown(d));
      });
      m.addEventListener("keypress", function (d) {
        let e = p.CANVAS_OVER;
        p.CANVAS_DRAGGING && (e = p.CANVAS_DRAGGING);
        e && e.keypress && (e.prehandleEvent(d), e.keypress(d));
      });
      m.addEventListener("keyup", function (d) {
        p.SHIFT = d.shiftKey;
        p.ALT = d.altKey;
        p.META = d.metaKey || d.ctrlKey;
        let e = p.CANVAS_OVER;
        p.CANVAS_DRAGGING && (e = p.CANVAS_DRAGGING);
        e && e.keyup && (e.prehandleEvent(d), e.keyup(d));
      });
    });
  return p;
})(ChemDoodle.featureDetection, document);
(function (e, m, k, p, d, g, a, f, c, b) {
  e._Canvas = function () {};
  let l = e._Canvas.prototype;
  l.molecules = b;
  l.shapes = b;
  l.emptyMessage = b;
  l.image = b;
  l.repaint = function () {
    if (!this.test) {
      var b = a.getElementById(this.id);
      if (b.getContext) {
        let a = b.getContext("2d");
        1 !== this.pixelRatio &&
          b.width === this.width &&
          ((b.width = this.width * this.pixelRatio),
          (b.height = this.height * this.pixelRatio),
          a.scale(this.pixelRatio, this.pixelRatio));
        if (this.image) a.drawImage(this.image, 0, 0);
        else {
          let c = this.styles.backgroundColor
            ? this.styles.backgroundColor
            : "transparent";
          a.clearRect(0, 0, this.width, this.height);
          this.bgCache !== c &&
            ((b.style.backgroundColor = c),
            (this.bgCache = b.style.backgroundColor));
          "transparent" !== c &&
            ((a.fillStyle = c), a.fillRect(0, 0, this.width, this.height));
        }
        if (this.innerRepaint) this.innerRepaint(a);
        else if (0 !== this.molecules.length || 0 !== this.shapes.length) {
          a.save();
          a.translate(this.width / 2, this.height / 2);
          a.rotate(this.styles.rotateAngle);
          a.scale(this.styles.scale, this.styles.scale);
          a.translate(-this.width / 2, -this.height / 2);
          for (let b = 0, c = this.molecules.length; b < c; b++)
            this.molecules[b].check(!0), this.molecules[b].draw(a, this.styles);
          this.checksOnAction && this.checksOnAction(!0);
          for (let b = 0, c = this.shapes.length; b < c; b++)
            this.shapes[b].draw(a, this.styles);
          a.restore();
        } else
          this.emptyMessage &&
            ((a.fillStyle = "#737683"),
            (a.textAlign = "center"),
            (a.textBaseline = "middle"),
            (a.font = "18px Helvetica, Verdana, Arial, Sans-serif"),
            a.fillText(this.emptyMessage, this.width / 2, this.height / 2));
        this.drawChildExtras && this.drawChildExtras(a, this.styles);
      }
    }
  };
  l.resize = function (a, b) {
    let c = q("#" + this.id);
    c.attr({ width: a, height: b });
    c.css("width", a);
    c.css("height", b);
    this.width = a;
    this.height = b;
    if (e._Canvas3D && this instanceof e._Canvas3D)
      1 !== this.pixelRatio &&
        ((a *= this.pixelRatio),
        (b *= this.pixelRatio),
        (this.gl.canvas.width = a),
        (this.gl.canvas.height = b)),
        this.gl.viewport(0, 0, a, b),
        this.afterLoadContent();
    else if (0 < this.molecules.length) {
      this.center();
      for (let a = 0, b = this.molecules.length; a < b; a++)
        this.molecules[a].check();
    }
    this.repaint();
  };
  l.setBackgroundImage = function (a) {
    this.image = new Image();
    let b = this;
    this.image.onload = function () {
      b.repaint();
    };
    this.image.src = a;
  };
  l.loadMolecule = function (a) {
    this.clear();
    this.molecules.push(a);
    for (let b = 0; 2 > b; b++)
      this.center(),
        (e._Canvas3D && this instanceof e._Canvas3D) || a.check(),
        this.afterLoadContent && this.afterLoadContent(),
        this.repaint();
  };
  l.loadContent = function (a, b) {
    this.molecules = a ? a : [];
    this.shapes = b ? b : [];
    for (a = 0; 2 > a; a++) {
      this.center();
      if (!(e._Canvas3D && this instanceof e._Canvas3D))
        for (let a = 0, b = this.molecules.length; a < b; a++)
          this.molecules[a].check();
      this.afterLoadContent && this.afterLoadContent();
      this.repaint();
    }
  };
  l.addMolecule = function (a) {
    this.molecules.push(a);
    (e._Canvas3D && this instanceof e._Canvas3D) || a.check();
    this.repaint();
  };
  l.removeMolecule = function (a) {
    this.molecules = this.molecules.filter(function (b) {
      return b !== a;
    });
    this.repaint();
  };
  l.getMolecule = function () {
    return 0 < this.molecules.length ? this.molecules[0] : b;
  };
  l.getMolecules = function () {
    return this.molecules;
  };
  l.addShape = function (a) {
    this.shapes.push(a);
    this.repaint();
  };
  l.removeShape = function (a) {
    this.shapes = this.shapes.filter(function (b) {
      return b !== a;
    });
    this.repaint();
  };
  l.getShapes = function () {
    return this.shapes;
  };
  l.clear = function () {
    this.molecules = [];
    this.shapes = [];
    this.styles.scale = 1;
    this.repaint();
  };
  l.center = function () {
    var a = this.getContentBounds(),
      b = new d.Point(
        (this.width - a.minX - a.maxX) / 2,
        (this.height - a.minY - a.maxY) / 2
      );
    for (let a = 0, d = this.molecules.length; a < d; a++) {
      var c = this.molecules[a];
      for (let a = 0, d = c.atoms.length; a < d; a++) c.atoms[a].add(b);
    }
    for (let a = 0, d = this.shapes.length; a < d; a++) {
      c = this.shapes[a].getPoints();
      for (let a = 0, d = c.length; a < d; a++) c[a].add(b);
    }
    this.styles.scale = 1;
    b = a.maxX - a.minX;
    a = a.maxY - a.minY;
    if (b > this.width - 20 || a > this.height - 20)
      this.styles.scale = 0.85 * g.min(this.width / b, this.height / a);
  };
  l.bondExists = function (a, b) {
    for (let c = 0, d = this.molecules.length; c < d; c++) {
      let d = this.molecules[c];
      for (let c = 0, e = d.bonds.length; c < e; c++) {
        let e = d.bonds[c];
        if (e.contains(a) && e.contains(b)) return !0;
      }
    }
    return !1;
  };
  l.getBond = function (a, c) {
    for (let b = 0, d = this.molecules.length; b < d; b++) {
      let d = this.molecules[b];
      for (let b = 0, e = d.bonds.length; b < e; b++) {
        let e = d.bonds[b];
        if (e.contains(a) && e.contains(c)) return e;
      }
    }
    return b;
  };
  l.getMoleculeByAtom = function (a) {
    for (let b = 0, c = this.molecules.length; b < c; b++) {
      let c = this.molecules[b];
      if (-1 !== c.atoms.indexOf(a)) return c;
    }
    return f.undefined;
  };
  l.getAllAtoms = function () {
    let a = [];
    for (let b = 0, c = this.molecules.length; b < c; b++)
      a = a.concat(this.molecules[b].atoms);
    return a;
  };
  l.getAllBonds = function () {
    let a = [];
    for (let b = 0, c = this.molecules.length; b < c; b++)
      a = a.concat(this.molecules[b].bonds);
    return a;
  };
  l.getAllPoints = function () {
    let a = [];
    for (let b = 0, c = this.molecules.length; b < c; b++)
      a = a.concat(this.molecules[b].atoms);
    for (let b = 0, c = this.shapes.length; b < c; b++)
      a = a.concat(this.shapes[b].getPoints());
    return a;
  };
  l.getContentBounds = function () {
    let a = new k.Bounds();
    for (let b = 0, c = this.molecules.length; b < c; b++)
      a.expand(this.molecules[b].getBounds());
    for (let b = 0, c = this.shapes.length; b < c; b++)
      a.expand(this.shapes[b].getBounds());
    return a;
  };
  l.create = function (h, l, k) {
    this.id = h;
    this.width = l;
    this.height = k;
    this.molecules = [];
    this.shapes = [];
    if (a.getElementById(h)) {
      let b = a.getElementById(h);
      l
        ? b.setAttribute("width", l)
        : (this.width = parseInt(b.getAttribute("width")));
      k
        ? b.setAttribute("height", k)
        : (this.height = parseInt(b.getAttribute("height")));
      b.setAttribute("class", "ChemDoodleWebComponent");
    } else if (
      e.featureDetection.supports_canvas_text() ||
      -1 == c.indexOf("MSIE")
    )
      a.writeln(
        '\x3ccanvas class\x3d"ChemDoodleWebComponent" id\x3d"' +
          h +
          '" width\x3d"' +
          l +
          '" height\x3d"' +
          k +
          '" alt\x3d"ChemDoodle Web Component"\x3eThis browser does not support HTML5/Canvas.\x3c/canvas\x3e'
      );
    else {
      a.writeln(
        '\x3cdiv style\x3d"border: 1px solid black;" width\x3d"' +
          l +
          '" height\x3d"' +
          k +
          '"\x3ePlease install \x3ca href\x3d"http://code.google.com/chrome/chromeframe/"\x3eGoogle Chrome Frame\x3c/a\x3e, then restart Internet Explorer.\x3c/div\x3e'
      );
      return;
    }
    h = a.getElementById(h);
    h.style.width = this.width + "px";
    h.style.height = this.height + "px";
    this.pixelRatio = f.devicePixelRatio ? f.devicePixelRatio : 1;
    this.styles = new d.Styles();
    let n = this;
    m.supports_touch()
      ? (h.addEventListener("touchstart", function (a) {
          let b = new Date().getTime();
          if (!m.supports_gesture() && 2 === a.touches.length) {
            var c = a.touches;
            let b = new d.Point(c[0].pageX, c[0].pageY);
            c = new d.Point(c[1].pageX, c[1].pageY);
            n.implementedGestureDist = b.distance(c);
            n.implementedGestureAngle = b.angle(c);
            n.gesturestart && (n.prehandleEvent(a), n.gesturestart(a));
          }
          n.lastTouch && 1 === a.touches.length && 500 > b - n.lastTouch
            ? n.dbltap
              ? (n.prehandleEvent(a), n.dbltap(a))
              : n.dblclick
              ? (n.prehandleEvent(a), n.dblclick(a))
              : n.touchstart
              ? (n.prehandleEvent(a), n.touchstart(a))
              : n.mousedown && (n.prehandleEvent(a), n.mousedown(a))
            : n.touchstart
            ? (n.prehandleEvent(a),
              n.touchstart(a),
              n.hold && clearTimeout(n.hold),
              n.touchhold &&
                (n.hold = setTimeout(function () {
                  n.touchhold(a);
                }, 1e3)))
            : n.mousedown && (n.prehandleEvent(a), n.mousedown(a));
          n.lastTouch = b;
        }),
        h.addEventListener("touchmove", function (a) {
          n.hold && (clearTimeout(n.hold), (n.hold = b));
          if (
            !m.supports_gesture() &&
            2 === a.touches.length &&
            n.gesturechange
          ) {
            var c = a.touches,
              e = new d.Point(c[0].pageX, c[0].pageY),
              f = new d.Point(c[1].pageX, c[1].pageY);
            c = e.distance(f);
            e = e.angle(f);
            a.scale = c / n.implementedGestureDist;
            a.rotation = (180 * (n.implementedGestureAngle - e)) / g.PI;
            n.prehandleEvent(a);
            n.gesturechange(a);
          }
          if (1 < a.touches.length && n.multitouchmove) {
            e = a.touches.length;
            n.prehandleEvent(a);
            c = new d.Point(-a.offset.left * e, -a.offset.top * e);
            for (f = 0; f < e; f++)
              (c.x += a.touches[f].pageX), (c.y += a.touches[f].pageY);
            c.x /= e;
            c.y /= e;
            a.p = c;
            n.multitouchmove(a, e);
          } else n.touchmove ? (n.prehandleEvent(a), n.touchmove(a)) : n.drag && (n.prehandleEvent(a), n.drag(a));
        }),
        h.addEventListener("touchend", function (a) {
          n.hold && (clearTimeout(n.hold), (n.hold = b));
          !m.supports_gesture() &&
            n.implementedGestureDist &&
            ((n.implementedGestureDist = b),
            (n.implementedGestureAngle = b),
            n.gestureend && (n.prehandleEvent(a), n.gestureend(a)));
          n.touchend
            ? (n.prehandleEvent(a), n.touchend(a))
            : n.mouseup && (n.prehandleEvent(a), n.mouseup(a));
          250 > new Date().getTime() - n.lastTouch &&
            (n.tap
              ? (n.prehandleEvent(a), n.tap(a))
              : n.click && (n.prehandleEvent(a), n.click(a)));
        }),
        h.addEventListener("gesturestart", function (a) {
          n.gesturestart && (n.prehandleEvent(a), n.gesturestart(a));
        }),
        h.addEventListener("gesturechange", function (a) {
          n.gesturechange && (n.prehandleEvent(a), n.gesturechange(a));
        }),
        h.addEventListener("gestureend", function (a) {
          n.gestureend && (n.prehandleEvent(a), n.gestureend(a));
        }))
      : (h.addEventListener("click", function (a) {
          switch (a.button) {
            case 0:
              n.click && (n.prehandleEvent(a), n.click(a));
              break;
            case 1:
              n.middleclick && (n.prehandleEvent(a), n.middleclick(a));
              break;
            case 2:
              n.rightclick && (n.prehandleEvent(a), n.rightclick(a));
          }
        }),
        h.addEventListener("dblclick", function (a) {
          n.dblclick && (n.prehandleEvent(a), n.dblclick(a));
        }),
        h.addEventListener("mousedown", function (a) {
          switch (a.button) {
            case 0:
              p.CANVAS_DRAGGING = n;
              n.mousedown && (n.prehandleEvent(a), n.mousedown(a));
              break;
            case 1:
              n.middlemousedown && (n.prehandleEvent(a), n.middlemousedown(a));
              break;
            case 2:
              n.rightmousedown && (n.prehandleEvent(a), n.rightmousedown(a));
          }
        }),
        h.addEventListener("mousemove", function (a) {
          !p.CANVAS_DRAGGING &&
            n.mousemove &&
            (n.prehandleEvent(a), n.mousemove(a));
        }),
        h.addEventListener("mouseout", function (a) {
          p.CANVAS_OVER = b;
          n.mouseout && (n.prehandleEvent(a), n.mouseout(a));
        }),
        h.addEventListener("mouseover", function (a) {
          p.CANVAS_OVER = n;
          n.mouseover && (n.prehandleEvent(a), n.mouseover(a));
        }),
        h.addEventListener("mouseup", function (a) {
          switch (a.button) {
            case 0:
              n.mouseup && (n.prehandleEvent(a), n.mouseup(a));
              break;
            case 1:
              n.middlemouseup && (n.prehandleEvent(a), n.middlemouseup(a));
              break;
            case 2:
              n.rightmouseup && (n.prehandleEvent(a), n.rightmouseup(a));
          }
        }),
        h.addEventListener("contextmenu", function (a) {
          n.contextmenu && (n.prehandleEvent(a), n.contextmenu(a));
        }),
        h.addEventListener("wheel", function (a) {
          n.mousewheel && (n.prehandleEvent(a), n.mousewheel(a, -a.deltaY));
        }));
    this.subCreate && this.subCreate();
  };
  l.prehandleEvent = function (c) {
    c.pageX === b &&
      c.changedTouches &&
      ((c.pageX = c.changedTouches[0].pageX),
      (c.pageY = c.changedTouches[0].pageY));
    let e = a.getElementById(this.id).getBoundingClientRect();
    c.offset = { left: e.x + f.scrollX, top: e.y + f.scrollY };
    c.p = new d.Point(c.pageX - c.offset.left, c.pageY - c.offset.top);
    this.doEventDefault || (c.preventDefault(), (c.returnValue = !1));
  };
})(
  ChemDoodle,
  ChemDoodle.featureDetection,
  ChemDoodle.math,
  ChemDoodle.monitor,
  ChemDoodle.structures,
  Math,
  document,
  window,
  navigator.userAgent
);
(function (e, m, k) {
  e._AnimatorCanvas = function (e, d, g) {
    e && this.create(e, d, g);
  };
  e = e._AnimatorCanvas.prototype = new e._Canvas();
  e.timeout = 33;
  e.startAnimation = function () {
    this.stopAnimation();
    this.lastTime = new Date().getTime();
    let e = this;
    this.nextFrame &&
      (this.handle = m.requestInterval(function () {
        let d = new Date().getTime();
        e.nextFrame(d - e.lastTime);
        e.repaint();
        e.lastTime = d;
      }, this.timeout));
  };
  e.stopAnimation = function () {
    this.handle && (m.clearRequestInterval(this.handle), (this.handle = k));
  };
  e.isRunning = function () {
    return this.handle !== k;
  };
})(ChemDoodle, ChemDoodle.animations);
(function (e, m, k) {
  e.FileCanvas = function (e, d, g, a) {
    e && this.create(e, d, g);
    m.writeln(
      '\x3cbr\x3e\x3cform name\x3d"FileForm" enctype\x3d"multipart/form-data" method\x3d"POST" action\x3d"' +
        a +
        '" target\x3d"HiddenFileFrame"\x3e\x3cinput type\x3d"file" name\x3d"f" /\x3e\x3cinput type\x3d"submit" name\x3d"submitbutton" value\x3d"Show File" /\x3e\x3c/form\x3e\x3ciframe id\x3d"HFF-' +
        e +
        '" name\x3d"HiddenFileFrame" height\x3d"0" width\x3d"0" style\x3d"display:none;" onLoad\x3d"GetMolFromFrame(\'HFF-' +
        e +
        "', " +
        e +
        ')"\x3e\x3c/iframe\x3e'
    );
    this.emptyMessage = "Click below to load file";
    this.repaint();
  };
  e.FileCanvas.prototype = new e._Canvas();
})(ChemDoodle, document);
(function (e, m) {
  e.HyperlinkCanvas = function (e, m, d, g, a, f) {
    e && this.create(e, m, d);
    this.urlOrFunction = g;
    this.color = a ? a : "blue";
    this.size = f ? f : 2;
  };
  e = e.HyperlinkCanvas.prototype = new e._Canvas();
  e.openInNewWindow = !0;
  e.hoverImage = m;
  e.drawChildExtras = function (e) {
    this.e &&
      (this.hoverImage
        ? e.drawImage(this.hoverImage, 0, 0)
        : ((e.strokeStyle = this.color),
          (e.lineWidth = 2 * this.size),
          e.strokeRect(0, 0, this.width, this.height)));
  };
  e.setHoverImage = function (e) {
    this.hoverImage = new Image();
    this.hoverImage.src = e;
  };
  e.click = function (e) {
    this.e = m;
    this.repaint();
    this.urlOrFunction instanceof Function
      ? this.urlOrFunction()
      : this.openInNewWindow
      ? window.open(this.urlOrFunction)
      : (location.href = this.urlOrFunction);
  };
  e.mouseout = function (e) {
    this.e = m;
    this.repaint();
  };
  e.mouseover = function (e) {
    this.e = e;
    this.repaint();
  };
})(ChemDoodle);
(function (e, m, k, p) {
  e.MolGrabberCanvas = function (d, e, a) {
    d && this.create(d, e, a);
    e = [];
    e.push('\x3cbr\x3e\x3cinput type\x3d"text" id\x3d"');
    e.push(d);
    e.push('_query" size\x3d"32" value\x3d"" /\x3e');
    e.push(this.getInputFields());
    k.getElementById(d).insertAdjacentHTML("afterend", e.join(""));
    let f = this;
    k.getElementById(d + "_submit").addEventListener("click", function () {
      f.search();
    });
    k.getElementById(d + "_query").addEventListener("keypress", function (a) {
      ("Enter" !== a.key && 13 !== a.keyCode) || f.search();
    });
    this.emptyMessage = "Enter search term below";
    this.repaint();
  };
  e = e.MolGrabberCanvas.prototype = new e._Canvas();
  e.setSearchTerm = function (d) {
    k.getElementById(this.id + "_query").value = d;
    this.search();
  };
  e.getInputFields = function () {
    let d = [];
    d.push("\x3cbr\x3e\x3cnobr\x3e");
    d.push('\x3cselect id\x3d"');
    d.push(this.id);
    d.push('_select"\x3e');
    d.push('\x3coption value\x3d"chemexper"\x3eChemExper');
    d.push('\x3coption value\x3d"chemspider"\x3eChemSpider');
    d.push('\x3coption value\x3d"pubchem" selected\x3ePubChem');
    d.push("\x3c/select\x3e");
    d.push('\x3cbutton type\x3d"button" id\x3d"');
    d.push(this.id);
    d.push('_submit"\x3eShow Molecule\x3c/button\x3e');
    d.push("\x3c/nobr\x3e");
    return d.join("");
  };
  e.search = function () {
    this.emptyMessage = "Searching...";
    this.clear();
    let d = this;
    m.getMoleculeFromDatabase(
      k.getElementById(this.id + "_query").value,
      { database: k.getElementById(this.id + "_select").value },
      function (e) {
        d.loadMolecule(e);
      }
    );
  };
})(ChemDoodle, ChemDoodle.iChemLabs, document);
(function (e, m, k, p) {
  let d = [],
    g = [1, 0, 0],
    a = [0, 1, 0],
    f = [0, 0, 1];
  e.RotatorCanvas = function (a, b, d, e) {
    a && this.create(a, b, d);
    this.rotate3D = e;
  };
  e = e.RotatorCanvas.prototype = new e._AnimatorCanvas();
  m = m.PI / 15;
  e.xIncrement = m;
  e.yIncrement = m;
  e.zIncrement = m;
  e.nextFrame = function (c) {
    if (0 === this.molecules.length && 0 === this.shapes.length)
      this.stopAnimation();
    else if (((c /= 1e3), this.rotate3D)) {
      k.identity(d);
      k.rotate(d, this.xIncrement * c, g);
      k.rotate(d, this.yIncrement * c, a);
      k.rotate(d, this.zIncrement * c, f);
      for (let a = 0, f = this.molecules.length; a < f; a++) {
        c = this.molecules[a];
        for (let a = 0, f = c.atoms.length; a < f; a++) {
          var b = c.atoms[a],
            e = [b.x - this.width / 2, b.y - this.height / 2, b.z];
          k.multiplyVec3(d, e);
          b.x = e[0] + this.width / 2;
          b.y = e[1] + this.height / 2;
          b.z = e[2];
        }
        for (let a = 0, b = c.rings.length; a < b; a++)
          c.rings[a].center = c.rings[a].getCenter();
        this.styles.atoms_display &&
          this.styles.atoms_circles_2D &&
          c.sortAtomsByZ();
        this.styles.bonds_display &&
          this.styles.bonds_clearOverlaps_2D &&
          c.sortBondsByZ();
      }
      for (let a = 0, f = this.shapes.length; a < f; a++) {
        c = this.shapes[a].getPoints();
        for (let a = 0, f = c.length; a < f; a++)
          (b = c[a]),
            (e = [b.x - this.width / 2, b.y - this.height / 2, 0]),
            k.multiplyVec3(d, e),
            (b.x = e[0] + this.width / 2),
            (b.y = e[1] + this.height / 2);
      }
    } else this.styles.rotateAngle += this.zIncrement * c;
  };
  e.dblclick = function (a) {
    this.isRunning() ? this.stopAnimation() : this.startAnimation();
  };
})(ChemDoodle, Math, ChemDoodle.lib.mat4);
(function (e, m, k, p) {
  e.SlideshowCanvas = function (d, e, a) {
    d && this.create(d, e, a);
  };
  e = e.SlideshowCanvas.prototype = new e._AnimatorCanvas();
  e.frames = [];
  e.curIndex = 0;
  e.timeout = 5e3;
  e.alpha = 0;
  e.innerHandle = p;
  e.phase = 0;
  e.drawChildExtras = function (d) {
    let e = k.getRGB(this.styles.backgroundColor, 255);
    d.fillStyle =
      "rgba(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + this.alpha + ")";
    d.fillRect(0, 0, this.width, this.height);
  };
  e.nextFrame = function (d) {
    if (0 === this.frames.length) this.stopAnimation();
    else {
      this.phase = 0;
      var e = this,
        a = 1;
      this.innerHandle = setInterval(function () {
        e.alpha = a / 15;
        e.repaint();
        15 === a && e.breakInnerHandle();
        a++;
      }, 33);
    }
  };
  e.breakInnerHandle = function () {
    this.innerHandle &&
      (clearInterval(this.innerHandle), (this.innerHandle = p));
    if (0 === this.phase) {
      this.curIndex++;
      this.curIndex > this.frames.length - 1 && (this.curIndex = 0);
      this.alpha = 1;
      let d = this.frames[this.curIndex];
      this.loadContent(d.mols, d.shapes);
      this.phase = 1;
      let e = this,
        a = 1;
      this.innerHandle = setInterval(function () {
        e.alpha = (15 - a) / 15;
        e.repaint();
        15 === a && e.breakInnerHandle();
        a++;
      }, 33);
    } else 1 === this.phase && ((this.alpha = 0), this.repaint());
  };
  e.addFrame = function (d, e) {
    0 === this.frames.length && this.loadContent(d, e);
    this.frames.push({ mols: d, shapes: e });
  };
})(ChemDoodle, ChemDoodle.animations, ChemDoodle.math);
(function (e, m, k, p, d, g) {
  e.TransformCanvas = function (a, d, c, b) {
    a && this.create(a, d, c);
    this.rotate3D = b;
  };
  e = e.TransformCanvas.prototype = new e._Canvas();
  e.lastPoint = g;
  e.rotationMultMod = 1.3;
  e.lastPinchScale = 1;
  e.lastGestureRotate = 0;
  e.mousedown = function (a) {
    this.lastPoint = a.p;
  };
  e.dblclick = function (a) {
    this.center();
    this.repaint();
  };
  e.drag = function (a) {
    if (!this.lastPoint.multi) {
      if (m.ALT) {
        var e = new k.Point(a.p.x, a.p.y);
        e.sub(this.lastPoint);
        for (let a = 0, b = this.molecules.length; a < b; a++) {
          var c = this.molecules[a];
          for (let a = 0, b = c.atoms.length; a < b; a++) c.atoms[a].add(e);
          c.check();
        }
        for (let a = 0, b = this.shapes.length; a < b; a++) {
          c = this.shapes[a].getPoints();
          for (let a = 0, b = c.length; a < b; a++) c[a].add(e);
        }
        this.lastPoint = a.p;
      } else if (!0 === this.rotate3D) {
        e = p.max(this.width / 4, this.height / 4);
        c = ((a.p.x - this.lastPoint.x) / e) * this.rotationMultMod;
        var b = (-(a.p.y - this.lastPoint.y) / e) * this.rotationMultMod;
        e = [];
        d.identity(e);
        d.rotate(e, b, [1, 0, 0]);
        d.rotate(e, c, [0, 1, 0]);
        for (let f = 0, g = this.molecules.length; f < g; f++) {
          c = this.molecules[f];
          for (let a = 0, f = c.atoms.length; a < f; a++) {
            b = c.atoms[a];
            let f = [b.x - this.width / 2, b.y - this.height / 2, b.z];
            d.multiplyVec3(e, f);
            b.x = f[0] + this.width / 2;
            b.y = f[1] + this.height / 2;
            b.z = f[2];
          }
          for (let a = 0, b = c.rings.length; a < b; a++)
            c.rings[a].center = c.rings[a].getCenter();
          this.lastPoint = a.p;
          this.styles.atoms_display &&
            this.styles.atoms_circles_2D &&
            c.sortAtomsByZ();
          this.styles.bonds_display &&
            this.styles.bonds_clearOverlaps_2D &&
            c.sortBondsByZ();
        }
      } else
        (c = new k.Point(this.width / 2, this.height / 2)),
          (e = c.angle(this.lastPoint)),
          (c = c.angle(a.p)),
          (this.styles.rotateAngle -= c - e),
          (this.lastPoint = a.p);
      this.repaint();
    }
  };
  e.mousewheel = function (a, d) {
    this.styles.scale += d / 50;
    0.01 > this.styles.scale && (this.styles.scale = 0.01);
    this.repaint();
  };
  e.multitouchmove = function (a, d) {
    if (2 === d)
      if (this.lastPoint.multi) {
        d = new k.Point(a.p.x, a.p.y);
        d.sub(this.lastPoint);
        for (let a = 0, e = this.molecules.length; a < e; a++) {
          var c = this.molecules[a];
          for (let a = 0, b = c.atoms.length; a < b; a++) c.atoms[a].add(d);
          c.check();
        }
        for (let a = 0, e = this.shapes.length; a < e; a++) {
          c = this.shapes[a].getPoints();
          for (let a = 0, b = c.length; a < b; a++) c[a].add(d);
        }
        this.lastPoint = a.p;
        this.lastPoint.multi = !0;
        this.repaint();
      } else (this.lastPoint = a.p), (this.lastPoint.multi = !0);
  };
  e.gesturechange = function (a) {
    0 !== a.scale - this.lastPinchScale &&
      ((this.styles.scale *= a.scale / this.lastPinchScale),
      0.01 > this.styles.scale && (this.styles.scale = 0.01),
      (this.lastPinchScale = a.scale));
    if (0 !== this.lastGestureRotate - a.rotation) {
      let d = ((this.lastGestureRotate - a.rotation) / 180) * p.PI,
        c = new k.Point(this.width / 2, this.height / 2);
      for (let a = 0, e = this.molecules.length; a < e; a++) {
        let b = this.molecules[a];
        for (let a = 0, e = b.atoms.length; a < e; a++) {
          let e = b.atoms[a],
            f = c.distance(e),
            g = c.angle(e) + d;
          e.x = c.x + f * p.cos(g);
          e.y = c.y - f * p.sin(g);
        }
        b.check();
      }
      this.lastGestureRotate = a.rotation;
    }
    this.repaint();
  };
  e.gestureend = function (a) {
    this.lastPinchScale = 1;
    this.lastGestureRotate = 0;
  };
})(
  ChemDoodle,
  ChemDoodle.monitor,
  ChemDoodle.structures,
  Math,
  ChemDoodle.lib.mat4
);
(function (e, m) {
  e.ViewerCanvas = function (e, m, d) {
    e && this.create(e, m, d);
  };
  e.ViewerCanvas.prototype = new e._Canvas();
})(ChemDoodle);
(function (e, m, k) {
  e._SpectrumCanvas = function (e, d, g) {
    e && this.create(e, d, g);
  };
  e = e._SpectrumCanvas.prototype = new e._Canvas();
  e.spectrum = k;
  e.emptyMessage = "No Spectrum Loaded or Recognized";
  e.loadMolecule = k;
  e.getMolecule = k;
  e.innerRepaint = function (e) {
    this.spectrum && 0 < this.spectrum.data.length
      ? this.spectrum.draw(e, this.styles, this.width, this.height)
      : this.emptyMessage &&
        ((e.fillStyle = "#737683"),
        (e.textAlign = "center"),
        (e.textBaseline = "middle"),
        (e.font = "18px Helvetica, Verdana, Arial, Sans-serif"),
        e.fillText(this.emptyMessage, this.width / 2, this.height / 2));
  };
  e.loadSpectrum = function (e) {
    this.spectrum = e;
    this.repaint();
  };
  e.getSpectrum = function () {
    return this.spectrum;
  };
  e.getSpectrumCoordinates = function (e, d) {
    return spectrum.getInternalCoordinates(e, d, this.width, this.height);
  };
})(ChemDoodle, document);
(function (e, m) {
  e.ObserverCanvas = function (e, m, d) {
    e && this.create(e, m, d);
  };
  e.ObserverCanvas.prototype = new e._SpectrumCanvas();
})(ChemDoodle);
(function (e, m) {
  e.OverlayCanvas = function (e, m, d) {
    e && this.create(e, m, d);
  };
  e = e.OverlayCanvas.prototype = new e._SpectrumCanvas();
  e.overlaySpectra = [];
  e.superRepaint = e.innerRepaint;
  e.innerRepaint = function (e) {
    this.superRepaint(e);
    if (this.spectrum && 0 < this.spectrum.data.length)
      for (let k = 0, d = this.overlaySpectra.length; k < d; k++) {
        let d = this.overlaySpectra[k];
        d &&
          0 < d.data.length &&
          ((d.minX = this.spectrum.minX),
          (d.maxX = this.spectrum.maxX),
          d.drawPlot(
            e,
            this.styles,
            this.width,
            this.height,
            this.spectrum.memory.offsetTop,
            this.spectrum.memory.offsetLeft,
            this.spectrum.memory.offsetBottom
          ));
      }
  };
  e.addSpectrum = function (e) {
    this.spectrum ? this.overlaySpectra.push(e) : (this.spectrum = e);
  };
})(ChemDoodle);
(function (e, m, k, p) {
  e.PerspectiveCanvas = function (d, a, e) {
    d && this.create(d, a, e);
  };
  let d = (e.PerspectiveCanvas.prototype = new e._SpectrumCanvas());
  d.dragRange = p;
  d.rescaleYAxisOnZoom = !0;
  d.lastPinchScale = 1;
  d.mousedown = function (d) {
    this.dragRange = new e.structures.Point(d.p.x, d.p.x);
  };
  d.mouseup = function (d) {
    this.dragRange &&
      this.dragRange.x !== this.dragRange.y &&
      (this.dragRange.multi ||
        ((d = this.spectrum.zoom(
          this.dragRange.x,
          d.p.x,
          this.width,
          this.rescaleYAxisOnZoom
        )),
        this.rescaleYAxisOnZoom && (this.styles.scale = d)),
      (this.dragRange = p),
      this.repaint());
  };
  d.drag = function (d) {
    this.dragRange &&
      (this.dragRange.multi
        ? (this.dragRange = p)
        : (m.SHIFT &&
            (this.spectrum.translate(d.p.x - this.dragRange.x, this.width),
            (this.dragRange.x = d.p.x)),
          (this.dragRange.y = d.p.x)),
      this.repaint());
  };
  d.drawChildExtras = function (d) {
    if (this.dragRange) {
      var a = k.min(this.dragRange.x, this.dragRange.y);
      let e = k.max(this.dragRange.x, this.dragRange.y);
      d.strokeStyle = "gray";
      d.lineStyle = 1;
      d.beginPath();
      for (d.moveTo(a, this.height / 2); a <= e; a++)
        5 > a % 10
          ? d.lineTo(a, k.round(this.height / 2))
          : d.moveTo(a, k.round(this.height / 2));
      d.stroke();
    }
  };
  d.mousewheel = function (d, a) {
    this.styles.scale -= a / 10;
    0.01 > this.styles.scale && (this.styles.scale = 0.01);
    this.repaint();
  };
  d.dblclick = function (d) {
    this.spectrum.setup();
    this.styles.scale = 1;
    this.repaint();
  };
  d.multitouchmove = function (d, a) {
    2 === a &&
      (this.dragRange && this.dragRange.multi
        ? (this.spectrum.translate(d.p.x - this.dragRange.x, this.width),
          (this.dragRange.x = d.p.x),
          (this.dragRange.y = d.p.x),
          this.repaint())
        : ((this.dragRange = new e.structures.Point(d.p.x, d.p.x)),
          (this.dragRange.multi = !0)));
  };
  d.gesturechange = function (d) {
    this.styles.scale *= d.scale / this.lastPinchScale;
    0.01 > this.styles.scale && (this.styles.scale = 0.01);
    this.lastPinchScale = d.scale;
    this.repaint();
  };
  d.gestureend = function (d) {
    this.lastPinchScale = 1;
  };
})(ChemDoodle, ChemDoodle.monitor, Math);
(function (e, m, k, p) {
  e.SeekerCanvas = function (d, a, e, c) {
    d && this.create(d, a, e);
    this.seekType = c;
  };
  let d = (e.SeekerCanvas.prototype = new e._SpectrumCanvas());
  d.superRepaint = d.innerRepaint;
  d.innerRepaint = function (d) {
    this.superRepaint(d);
    if (this.spectrum && 0 < this.spectrum.data.length && this.p) {
      if (this.seekType === e.SeekerCanvas.SEEK_POINTER) {
        var a = this.p;
        var f = this.spectrum.getInternalCoordinates(a.x, a.y);
      } else if (
        this.seekType === e.SeekerCanvas.SEEK_PLOT ||
        this.seekType === e.SeekerCanvas.SEEK_PEAK
      ) {
        f =
          this.seekType === e.SeekerCanvas.SEEK_PLOT
            ? this.spectrum.getClosestPlotInternalCoordinates(this.p.x)
            : this.spectrum.getClosestPeakInternalCoordinates(this.p.x);
        if (!f) return;
        a = {
          x: this.spectrum.getTransformedX(
            f.x,
            this.styles,
            this.width,
            this.spectrum.memory.offsetLeft
          ),
          y: this.spectrum.getTransformedY(
            f.y / 100,
            this.styles,
            this.height,
            this.spectrum.memory.offsetBottom,
            this.spectrum.memory.offsetTop
          ),
        };
      }
      d.fillStyle = "white";
      d.strokeStyle = this.styles.plots_color;
      d.lineWidth = this.styles.plots_width;
      d.beginPath();
      d.arc(a.x, a.y, 3, 0, 2 * k.PI, !1);
      d.fill();
      d.stroke();
      d.font = m.getFontString(
        this.styles.text_font_size,
        this.styles.text_font_families
      );
      d.textAlign = "left";
      d.textBaseline = "bottom";
      f = "x:" + f.x.toFixed(3) + ", y:" + f.y.toFixed(3);
      let c = a.x + 3,
        b = d.measureText(f).width;
      c + b > this.width - 2 && (c -= 6 + b);
      a = a.y;
      0 > a - this.styles.text_font_size - 2 &&
        (a += this.styles.text_font_size);
      d.fillRect(
        c,
        a - this.styles.text_font_size,
        b,
        this.styles.text_font_size
      );
      d.fillStyle = "black";
      d.fillText(f, c, a);
    }
  };
  d.mouseout = function (d) {
    this.p = p;
    this.repaint();
  };
  d.mousemove = function (d) {
    this.p = { x: d.p.x - 2, y: d.p.y - 3 };
    this.repaint();
  };
  d.touchstart = function (d) {
    this.mousemove(d);
  };
  d.touchmove = function (d) {
    this.mousemove(d);
  };
  d.touchend = function (d) {
    this.mouseout(d);
  };
  e.SeekerCanvas.SEEK_POINTER = "pointer";
  e.SeekerCanvas.SEEK_PLOT = "plot";
  e.SeekerCanvas.SEEK_PEAK = "peak";
})(ChemDoodle, ChemDoodle.extensions, Math);
(function (e, m, k, p, d, g, a, f, c, b, l, h, r) {
  e._Canvas3D = function (a, b, c) {
    a && this.create(a, b, c);
  };
  e._Canvas3D.PRESERVE_DRAWING_BUFFER = !1;
  b = e._Canvas3D.prototype = new e._Canvas();
  let v = e._Canvas.prototype;
  b.rotationMatrix = r;
  b.contentCenter = r;
  b.lastPoint = r;
  b.emptyMessage = "WebGL is Unavailable!";
  b.lastPinchScale = 1;
  b.lastGestureRotate = 0;
  b.afterLoadContent = function () {
    var b = new k.Bounds();
    for (let a = 0, c = this.molecules.length; a < c; a++)
      b.expand(this.molecules[a].getBounds3D());
    var d =
      l.dist([b.maxX, b.maxY, b.maxZ], [b.minX, b.minY, b.minZ]) / 2 + 1.5;
    Infinity === d && (d = 10);
    this.maxDimension = a.max(b.maxX - b.minX, b.maxY - b.minY);
    b = a.min(
      179.9,
      a.max(this.styles.projectionPerspectiveVerticalFieldOfView_3D, 0.1)
    );
    var e = (b / 360) * a.PI,
      f = a.tan(e) / 0.8;
    f = d / f;
    let g = this.width / this.height;
    this.camera.fieldOfView = b;
    this.camera.near = f - d;
    this.camera.far = f + d;
    this.camera.aspect = g;
    c.translate(c.identity(this.camera.viewMatrix), [0, 0, -f]);
    e = d / a.tan(e);
    this.lighting.camera.fieldOfView = b;
    this.lighting.camera.near = e - d;
    this.lighting.camera.far = e + d;
    this.lighting.updateView();
    this.setupScene();
  };
  b.renderDepthMap = function () {
    if (this.styles.shadow_3D && d.DepthShader) {
      let a = this.gl.isEnabled(this.gl.CULL_FACE);
      a || this.gl.enable(this.gl.CULL_FACE);
      this.depthShader.useShaderProgram(this.gl);
      let b = this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
      this.gl.clearColor(1, 1, 1, 0);
      this.lightDepthMapFramebuffer.bind(
        this.gl,
        this.shadowTextureSize,
        this.shadowTextureSize
      );
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.depthShader.setProjectionMatrix(
        this.gl,
        this.lighting.camera.projectionMatrix
      );
      this.depthShader.enableAttribsArray(this.gl);
      for (let a = 0, b = this.molecules.length; a < b; a++)
        this.molecules[a].render(this.gl, this.styles);
      this.gl.flush();
      this.depthShader.disableAttribsArray(this.gl);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.clearColor(b[0], b[1], b[2], b[3]);
      a || this.gl.disable(this.gl.CULL_FACE);
    }
  };
  b.renderExtras = function () {
    this.phongShader.useShaderProgram(this.gl);
    this.phongShader.enableAttribsArray(this.gl);
    var a = [];
    for (let b = 0, c = this.shapes.length; b < c; b++) {
      let c = this.shapes[b];
      c instanceof d._Surface &&
      ((!c.styles && 1 !== this.styles.surfaces_alpha) ||
        (c.styles && 1 !== c.styles.surfaces_alpha))
        ? a.push(c)
        : c.render(this.gl, this.styles);
    }
    if (0 !== a.length) {
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(this.gl.BLEND);
      this.gl.depthMask(!1);
      for (let b = 0, c = a.length; b < c; b++)
        a[b].render(this.gl, this.styles);
      this.gl.depthMask(!0);
      this.gl.disable(this.gl.BLEND);
      this.gl.blendFuncSeparate(
        this.gl.SRC_ALPHA,
        this.gl.ONE_MINUS_SRC_ALPHA,
        this.gl.ONE,
        this.gl.ONE_MINUS_SRC_ALPHA
      );
    }
    this.phongShader.setShadow(this.gl, !1);
    this.phongShader.setFogMode(this.gl, 0);
    this.phongShader.setFlatColor(this.gl, !1);
    this.styles.compass_display &&
      (this.phongShader.setLightDirection(this.gl, [0, 0, -1]),
      this.compass.render(this.gl, this.styles));
    this.phongShader.disableAttribsArray(this.gl);
    this.gl.flush();
    this.gl.enable(this.gl.BLEND);
    this.gl.depthMask(!1);
    this.labelShader.useShaderProgram(this.gl);
    this.labelShader.setMatrixUniforms(this.gl, this.gl.modelViewMatrix);
    this.labelShader.setProjectionMatrix(this.gl, this.camera.projectionMatrix);
    this.labelShader.setDimension(
      this.gl,
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight
    );
    this.labelShader.enableAttribsArray(this.gl);
    this.styles.atoms_displayLabels_3D &&
      this.label3D.render(this.gl, this.styles, this.getMolecules());
    if (this.styles.measurement_displayText_3D)
      for (let b = 0, c = this.shapes.length; b < c; b++)
        (a = this.shapes[b]),
          a.renderText && a.renderText(this.gl, this.styles);
    this.styles.compass_display &&
      this.styles.compass_displayText_3D &&
      this.compass.renderAxis(this.gl);
    this.labelShader.disableAttribsArray(this.gl);
    this.gl.disable(this.gl.BLEND);
    this.gl.depthMask(!0);
    this.gl.flush();
    this.drawChildExtras && this.drawChildExtras(this.gl);
    this.gl.flush();
  };
  b.renderColor = function () {
    this.phongShader.useShaderProgram(this.gl);
    this.gl.uniform1i(this.phongShader.shadowDepthSampleUniform, 0);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.lightDepthMapTexture.texture);
    this.phongShader.setProjectionMatrix(this.gl, this.camera.projectionMatrix);
    this.phongShader.setShadow(this.gl, this.styles.shadow_3D);
    this.phongShader.setFlatColor(this.gl, this.styles.flat_color_3D);
    this.phongShader.setGammaCorrection(
      this.gl,
      this.styles.gammaCorrection_3D
    );
    this.phongShader.setShadowTextureSize(
      this.gl,
      this.shadowTextureSize,
      this.shadowTextureSize
    );
    this.phongShader.setShadowIntensity(
      this.gl,
      this.styles.shadow_intensity_3D
    );
    this.phongShader.setFogMode(this.gl, this.styles.fog_mode_3D);
    this.phongShader.setFogColor(this.gl, this.fogging.colorRGB);
    this.phongShader.setFogStart(this.gl, this.fogging.fogStart);
    this.phongShader.setFogEnd(this.gl, this.fogging.fogEnd);
    this.phongShader.setFogDensity(this.gl, this.fogging.density);
    this.phongShader.setLightProjectionMatrix(
      this.gl,
      this.lighting.camera.projectionMatrix
    );
    this.phongShader.setLightDiffuseColor(this.gl, this.lighting.diffuseRGB);
    this.phongShader.setLightSpecularColor(this.gl, this.lighting.specularRGB);
    this.phongShader.setLightDirection(this.gl, this.lighting.direction);
    this.phongShader.enableAttribsArray(this.gl);
    for (let a = 0, b = this.molecules.length; a < b; a++)
      this.molecules[a].render(this.gl, this.styles);
    this.phongShader.disableAttribsArray(this.gl);
    this.gl.flush();
  };
  b.renderPosition = function () {
    this.positionShader.useShaderProgram(this.gl);
    this.positionShader.setProjectionMatrix(
      this.gl,
      this.camera.projectionMatrix
    );
    this.positionShader.enableAttribsArray(this.gl);
    for (let a = 0, b = this.molecules.length; a < b; a++)
      this.molecules[a].render(this.gl, this.styles);
    this.positionShader.disableAttribsArray(this.gl);
    this.gl.flush();
  };
  b.renderNormal = function () {
    this.normalShader.useShaderProgram(this.gl);
    this.normalShader.setProjectionMatrix(
      this.gl,
      this.camera.projectionMatrix
    );
    this.normalShader.enableAttribsArray(this.gl);
    for (let a = 0, b = this.molecules.length; a < b; a++)
      this.molecules[a].render(this.gl, this.styles);
    this.normalShader.disableAttribsArray(this.gl);
    this.gl.flush();
  };
  b.renderSSAO = function () {
    this.ssaoShader.useShaderProgram(this.gl);
    this.ssaoShader.setProjectionMatrix(this.gl, this.camera.projectionMatrix);
    this.ssaoShader.setSampleKernel(this.gl, this.ssao.sampleKernel);
    this.ssaoShader.setKernelRadius(this.gl, this.styles.ssao_kernel_radius);
    this.ssaoShader.setPower(this.gl, this.styles.ssao_power);
    this.ssaoShader.setGbufferTextureSize(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.uniform1i(this.ssaoShader.positionSampleUniform, 0);
    this.gl.uniform1i(this.ssaoShader.normalSampleUniform, 1);
    this.gl.uniform1i(this.ssaoShader.noiseSampleUniform, 2);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.positionTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.normalTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE2);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.ssao.noiseTexture);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.ssaoShader.enableAttribsArray(this.gl);
    this.gl.quadBuffer.bindBuffers(this.gl);
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      this.gl.quadBuffer.vertexPositionBuffer.numItems
    );
    this.ssaoShader.disableAttribsArray(this.gl);
    this.gl.flush();
    this.ssaoFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.ssaoBlurShader.useShaderProgram(this.gl);
    this.ssaoBlurShader.setGbufferTextureSize(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.uniform1i(this.ssaoBlurShader.aoSampleUniform, 0);
    this.gl.uniform1i(this.ssaoBlurShader.depthSampleUniform, 1);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.imageTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.depthTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.ssaoBlurShader.enableAttribsArray(this.gl);
    this.gl.quadBuffer.bindBuffers(this.gl);
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      this.gl.quadBuffer.vertexPositionBuffer.numItems
    );
    this.ssaoBlurShader.disableAttribsArray(this.gl);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.flush();
  };
  b.renderOutline = function () {
    this.outlineShader.useShaderProgram(this.gl);
    this.outlineShader.setGbufferTextureSize(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.outlineShader.setNormalThreshold(
      this.gl,
      this.styles.outline_normal_threshold
    );
    this.outlineShader.setDepthThreshold(
      this.gl,
      this.styles.outline_depth_threshold
    );
    this.outlineShader.setThickness(this.gl, this.styles.outline_thickness);
    this.gl.uniform1i(this.outlineShader.normalSampleUniform, 0);
    this.gl.uniform1i(this.outlineShader.depthSampleUniform, 1);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.normalTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.depthTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.outlineShader.enableAttribsArray(this.gl);
    this.gl.quadBuffer.bindBuffers(this.gl);
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      this.gl.quadBuffer.vertexPositionBuffer.numItems
    );
    this.outlineShader.disableAttribsArray(this.gl);
    this.gl.flush();
  };
  b.deferredRender = function () {
    let a = this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
    this.gl.clearColor(0, 0, 0, 0);
    this.colorFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.renderColor();
    this.positionFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.renderPosition();
    this.normalFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.renderNormal();
    this.styles.ssao_3D && d.SSAOShader
      ? (this.quadFramebuffer.bind(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.gl.clear(this.gl.COLOR_BUFFER_BIT),
        this.renderSSAO())
      : (this.ssaoFramebuffer.bind(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.gl.clearColor(1, 1, 1, 1),
        this.gl.clear(this.gl.COLOR_BUFFER_BIT));
    this.outlineFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clearColor(1, 1, 1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.styles.outline_3D && this.renderOutline();
    this.gl.clearColor(a[0], a[1], a[2], a[3]);
    this.quadFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.lightingShader.useShaderProgram(this.gl);
    this.gl.uniform1i(this.lightingShader.positionSampleUniform, 0);
    this.gl.uniform1i(this.lightingShader.colorSampleUniform, 1);
    this.gl.uniform1i(this.lightingShader.ssaoSampleUniform, 2);
    this.gl.uniform1i(this.lightingShader.outlineSampleUniform, 3);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.positionTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.colorTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE2);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.ssaoTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE3);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.outlineTexture.texture);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.lightingShader.enableAttribsArray(this.gl);
    this.gl.quadBuffer.bindBuffers(this.gl);
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      this.gl.quadBuffer.vertexPositionBuffer.numItems
    );
    this.lightingShader.disableAttribsArray(this.gl);
    this.gl.flush();
    this.fxaaFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.imageTexture.texture);
    this.fxaaShader.useShaderProgram(this.gl);
    this.fxaaShader.setBuffersize(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.fxaaShader.setAntialias(this.gl, this.styles.antialias_3D);
    this.fxaaShader.setEdgeThreshold(this.gl, this.styles.fxaa_edgeThreshold);
    this.fxaaShader.setEdgeThresholdMin(
      this.gl,
      this.styles.fxaa_edgeThresholdMin
    );
    this.fxaaShader.setSearchSteps(this.gl, this.styles.fxaa_searchSteps);
    this.fxaaShader.setSearchThreshold(
      this.gl,
      this.styles.fxaa_searchThreshold
    );
    this.fxaaShader.setSubpixCap(this.gl, this.styles.fxaa_subpixCap);
    this.fxaaShader.setSubpixTrim(this.gl, this.styles.fxaa_subpixTrim);
    this.fxaaShader.enableAttribsArray(this.gl);
    this.gl.quadBuffer.bindBuffers(this.gl);
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      this.gl.quadBuffer.vertexPositionBuffer.numItems
    );
    this.fxaaShader.disableAttribsArray(this.gl);
    this.gl.flush();
    this.finalFramebuffer.bind(
      this.gl,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.renderExtras();
    this.gl.clearColor(a[0], a[1], a[2], a[3]);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.fxaaTexture.texture);
    this.quadShader.useShaderProgram(this.gl);
    this.quadShader.enableAttribsArray(this.gl);
    this.gl.quadBuffer.bindBuffers(this.gl);
    this.gl.drawArrays(
      this.gl.TRIANGLE_STRIP,
      0,
      this.gl.quadBuffer.vertexPositionBuffer.numItems
    );
    this.quadShader.disableAttribsArray(this.gl);
    this.gl.flush();
  };
  b.forwardRender = function () {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
    this.renderColor();
    this.renderExtras();
  };
  b.repaint = function () {
    this.gl &&
      ((this.gl.lightViewMatrix = c.multiply(
        this.lighting.camera.viewMatrix,
        this.rotationMatrix,
        []
      )),
      (this.gl.rotationMatrix = this.rotationMatrix),
      (this.gl.modelViewMatrix = this.gl.lightViewMatrix),
      this.renderDepthMap(),
      (this.gl.modelViewMatrix = c.multiply(
        this.camera.viewMatrix,
        this.rotationMatrix,
        []
      )),
      c.translate(this.gl.modelViewMatrix, this.contentCenter),
      this.isSupportDeferred() &&
      (this.styles.ssao_3D || this.styles.outline_3D)
        ? this.deferredRender()
        : this.forwardRender());
  };
  b.pick = function (a, b, d, e) {
    if (this.gl) {
      let f = this.height - b;
      1 !== this.pixelRatio && ((a *= this.pixelRatio), (f *= this.pixelRatio));
      c.multiply(
        this.camera.viewMatrix,
        this.rotationMatrix,
        this.gl.modelViewMatrix
      );
      c.translate(this.gl.modelViewMatrix, this.contentCenter);
      this.gl.rotationMatrix = this.rotationMatrix;
      this.pickShader.useShaderProgram(this.gl);
      b = this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
      this.gl.clearColor(1, 1, 1, 0);
      this.pickerFramebuffer.bind(
        this.gl,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.pickShader.setProjectionMatrix(
        this.gl,
        this.camera.projectionMatrix
      );
      this.pickShader.enableAttribsArray(this.gl);
      let g = [];
      for (let a = 0, b = this.molecules.length; a < b; a++)
        this.molecules[a].renderPickFrame(this.gl, this.styles, g, d, e);
      this.pickShader.disableAttribsArray(this.gl);
      this.gl.flush();
      d = new Uint8Array(4);
      this.gl.readPixels(
        a - 2,
        f + 2,
        1,
        1,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        d
      );
      e = r;
      0 < d[3] && (e = g[d[2] | (d[1] << 8) | (d[0] << 16)]);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.clearColor(b[0], b[1], b[2], b[3]);
      return e;
    }
    return r;
  };
  b.center = function () {
    let a = new p.Atom(),
      b = this.molecules.length;
    for (let c = 0, d = b; c < d; c++) a.add3D(this.molecules[c].getCenter3D());
    a.x /= b;
    a.y /= b;
    a.z /= b;
    this.contentCenter = [-a.x, -a.y, -a.z];
  };
  b.isSupportDeferred = function () {
    return this.gl.textureFloatExt && this.gl.depthTextureExt;
  };
  b.create = function (a, b, g) {
    v.create.call(this, a, b, g);
    try {
      let a = f.getElementById(this.id);
      this.gl = a.getContext("webgl", {
        preserveDrawingBuffer: e._Canvas3D.PRESERVE_DRAWING_BUFFER,
      });
      this.gl || (this.gl = a.getContext("experimental-webgl"));
    } catch (y) {}
    this.gl
      ? (1 !== this.pixelRatio &&
          this.gl.canvas.width === this.width &&
          ((this.gl.canvas.style.width = this.width + "px"),
          (this.gl.canvas.style.height = this.height + "px"),
          (this.gl.canvas.width = this.width * this.pixelRatio),
          (this.gl.canvas.height = this.height * this.pixelRatio)),
        this.gl.enable(this.gl.DEPTH_TEST),
        this.gl.depthFunc(this.gl.LEQUAL),
        this.gl.blendFuncSeparate(
          this.gl.SRC_ALPHA,
          this.gl.ONE_MINUS_SRC_ALPHA,
          this.gl.ONE,
          this.gl.ONE_MINUS_SRC_ALPHA
        ),
        this.gl.clearDepth(1),
        (this.shadowTextureSize = 1024),
        (this.rotationMatrix = c.identity([])),
        (this.contentCenter = [0, 0, 0]),
        (this.camera = new d.Camera()),
        (this.label3D = new d.Label()),
        (this.lighting = new d.Light(
          this.styles.lightDiffuseColor_3D,
          this.styles.lightSpecularColor_3D,
          this.styles.lightDirection_3D
        )),
        (this.fogging = new d.Fog(
          this.styles.fog_color_3D || this.styles.backgroundColor,
          this.styles.fog_start_3D,
          this.styles.fog_end_3D,
          this.styles.fog_density_3D
        )),
        (this.gl.depthTextureExt =
          this.gl.getExtension("WEBGL_depth_texture") ||
          this.gl.getExtension("WEBKIT_WEBGL_depth_texture") ||
          this.gl.getExtension("MOZ_WEBGL_depth_texture")),
        (this.gl.textureFloatExt =
          this.gl.getExtension("OES_texture_float") ||
          this.gl.getExtension("WEBKIT_OES_texture_float") ||
          this.gl.getExtension("MOZ_OES_texture_float")),
        (this.ssao = new d.SSAO()),
        (this.pickerColorTexture = new d.Texture()),
        this.pickerColorTexture.init(
          this.gl,
          this.gl.UNSIGNED_BYTE,
          this.gl.RGBA,
          this.gl.RGBA
        ),
        (this.pickerDepthRenderbuffer = new d.Renderbuffer()),
        this.pickerDepthRenderbuffer.init(this.gl, this.gl.DEPTH_COMPONENT16),
        (this.pickerFramebuffer = new d.Framebuffer()),
        this.pickerFramebuffer.init(this.gl),
        this.pickerFramebuffer.setColorTexture(
          this.gl,
          this.pickerColorTexture.texture
        ),
        this.pickerFramebuffer.setDepthRenderbuffer(
          this.gl,
          this.pickerDepthRenderbuffer.renderbuffer
        ),
        (this.lightDepthMapTexture = new d.Texture()),
        (this.lightDepthMapRenderbuffer = new d.Renderbuffer()),
        (this.lightDepthMapFramebuffer = new d.Framebuffer()),
        this.lightDepthMapFramebuffer.init(this.gl),
        this.gl.depthTextureExt
          ? (this.lightDepthMapTexture.init(
              this.gl,
              this.gl.UNSIGNED_SHORT,
              this.gl.DEPTH_COMPONENT
            ),
            this.lightDepthMapRenderbuffer.init(this.gl, this.gl.RGBA4),
            this.lightDepthMapFramebuffer.setColorRenderbuffer(
              this.gl,
              this.lightDepthMapRenderbuffer.renderbuffer
            ),
            this.lightDepthMapFramebuffer.setDepthTexture(
              this.gl,
              this.lightDepthMapTexture.texture
            ))
          : (this.lightDepthMapTexture.init(
              this.gl,
              this.gl.UNSIGNED_BYTE,
              this.gl.RGBA,
              this.gl.RGBA
            ),
            this.lightDepthMapRenderbuffer.init(
              this.gl,
              this.gl.DEPTH_COMPONENT16
            ),
            this.lightDepthMapFramebuffer.setColorTexture(
              this.gl,
              this.lightDepthMapTexture.texture
            ),
            this.lightDepthMapFramebuffer.setDepthRenderbuffer(
              this.gl,
              this.lightDepthMapRenderbuffer.renderbuffer
            )),
        this.isSupportDeferred() &&
          ((this.depthTexture = new d.Texture()),
          this.depthTexture.init(
            this.gl,
            this.gl.UNSIGNED_SHORT,
            this.gl.DEPTH_COMPONENT
          ),
          (this.colorTexture = new d.Texture()),
          this.colorTexture.init(this.gl, this.gl.UNSIGNED_BYTE, this.gl.RGBA),
          (this.positionTexture = new d.Texture()),
          this.positionTexture.init(this.gl, this.gl.FLOAT, this.gl.RGBA),
          (this.normalTexture = new d.Texture()),
          this.normalTexture.init(this.gl, this.gl.FLOAT, this.gl.RGBA),
          (this.ssaoTexture = new d.Texture()),
          this.ssaoTexture.init(this.gl, this.gl.FLOAT, this.gl.RGBA),
          (this.outlineTexture = new d.Texture()),
          this.outlineTexture.init(
            this.gl,
            this.gl.UNSIGNED_BYTE,
            this.gl.RGBA
          ),
          (this.fxaaTexture = new d.Texture()),
          this.fxaaTexture.init(this.gl, this.gl.FLOAT, this.gl.RGBA),
          (this.imageTexture = new d.Texture()),
          this.imageTexture.init(this.gl, this.gl.FLOAT, this.gl.RGBA),
          (this.colorFramebuffer = new d.Framebuffer()),
          this.colorFramebuffer.init(this.gl),
          this.colorFramebuffer.setColorTexture(
            this.gl,
            this.colorTexture.texture
          ),
          this.colorFramebuffer.setDepthTexture(
            this.gl,
            this.depthTexture.texture
          ),
          (this.normalFramebuffer = new d.Framebuffer()),
          this.normalFramebuffer.init(this.gl),
          this.normalFramebuffer.setColorTexture(
            this.gl,
            this.normalTexture.texture
          ),
          this.normalFramebuffer.setDepthTexture(
            this.gl,
            this.depthTexture.texture
          ),
          (this.positionFramebuffer = new d.Framebuffer()),
          this.positionFramebuffer.init(this.gl),
          this.positionFramebuffer.setColorTexture(
            this.gl,
            this.positionTexture.texture
          ),
          this.positionFramebuffer.setDepthTexture(
            this.gl,
            this.depthTexture.texture
          ),
          (this.ssaoFramebuffer = new d.Framebuffer()),
          this.ssaoFramebuffer.init(this.gl),
          this.ssaoFramebuffer.setColorTexture(
            this.gl,
            this.ssaoTexture.texture
          ),
          (this.outlineFramebuffer = new d.Framebuffer()),
          this.outlineFramebuffer.init(this.gl),
          this.outlineFramebuffer.setColorTexture(
            this.gl,
            this.outlineTexture.texture
          ),
          (this.fxaaFramebuffer = new d.Framebuffer()),
          this.fxaaFramebuffer.init(this.gl),
          this.fxaaFramebuffer.setColorTexture(
            this.gl,
            this.fxaaTexture.texture
          ),
          (this.quadFramebuffer = new d.Framebuffer()),
          this.quadFramebuffer.init(this.gl),
          this.quadFramebuffer.setColorTexture(
            this.gl,
            this.imageTexture.texture
          ),
          (this.finalFramebuffer = new d.Framebuffer()),
          this.finalFramebuffer.init(this.gl),
          this.finalFramebuffer.setColorTexture(
            this.gl,
            this.fxaaTexture.texture
          ),
          this.finalFramebuffer.setDepthTexture(
            this.gl,
            this.depthTexture.texture
          ),
          (this.normalShader = new d.NormalShader()),
          this.normalShader.init(this.gl),
          (this.positionShader = new d.PositionShader()),
          this.positionShader.init(this.gl),
          d.SSAOShader &&
            ((this.ssaoShader = new d.SSAOShader()),
            this.ssaoShader.init(this.gl),
            (this.ssaoBlurShader = new d.SSAOBlurShader()),
            this.ssaoBlurShader.init(this.gl)),
          (this.outlineShader = new d.OutlineShader()),
          this.outlineShader.init(this.gl),
          (this.lightingShader = new d.LightingShader()),
          this.lightingShader.init(this.gl),
          (this.fxaaShader = new d.FXAAShader()),
          this.fxaaShader.init(this.gl),
          (this.quadShader = new d.QuadShader()),
          this.quadShader.init(this.gl)),
        (this.labelShader = new d.LabelShader()),
        this.labelShader.init(this.gl),
        (this.pickShader = new d.PickShader()),
        this.pickShader.init(this.gl),
        (this.phongShader = new d.PhongShader()),
        this.phongShader.init(this.gl),
        d.DepthShader &&
          ((this.depthShader = new d.DepthShader()),
          this.depthShader.init(this.gl)),
        (this.textTextImage = new d.TextImage()),
        this.textTextImage.init(this.gl),
        (this.gl.textImage = new d.TextImage()),
        this.gl.textImage.init(this.gl),
        (this.gl.textMesh = new d.TextMesh()),
        this.gl.textMesh.init(this.gl),
        (this.gl.material = new d.Material()),
        this.setupScene())
      : this.displayMessage();
  };
  b.displayMessage = function () {
    var a = f.getElementById(this.id);
    a.getContext &&
      ((a = a.getContext("2d")),
      this.styles.backgroundColor &&
        ((a.fillStyle = this.styles.backgroundColor),
        a.fillRect(0, 0, this.width, this.height)),
      this.emptyMessage &&
        ((a.fillStyle = "#737683"),
        (a.textAlign = "center"),
        (a.textBaseline = "middle"),
        (a.font = "18px Helvetica, Verdana, Arial, Sans-serif"),
        a.fillText(this.emptyMessage, this.width / 2, this.height / 2)));
  };
  b.renderText = function (a, b) {
    let c = { position: [], texCoord: [], translation: [] };
    this.textTextImage.pushVertexData(a, b, 0, c);
    this.gl.textMesh.storeData(this.gl, c.position, c.texCoord, c.translation);
    this.textTextImage.useTexture(this.gl);
    this.gl.textMesh.render(this.gl);
  };
  b.setupScene = function () {
    if (this.gl) {
      var b = this.styles.backgroundColor
        ? this.styles.backgroundColor
        : "transparent";
      f.getElementById(this.id).style.backgroundColor = b;
      b = "transparent" === b ? [0, 0, 0, 0] : k.getRGB(b, 1);
      this.gl.clearColor(b[0], b[1], b[2], 4 == b.length ? b[3] : 1);
      this.styles.cullBackFace_3D
        ? this.gl.enable(this.gl.CULL_FACE)
        : this.gl.disable(this.gl.CULL_FACE);
      this.gl.sphereBuffer = new d.Sphere(
        1,
        this.styles.atoms_resolution_3D,
        this.styles.atoms_resolution_3D
      );
      this.gl.starBuffer = new d.Star();
      this.gl.cylinderBuffer = new d.Cylinder(
        1,
        1,
        this.styles.bonds_resolution_3D
      );
      this.gl.cylinderClosedBuffer = new d.Cylinder(
        1,
        1,
        this.styles.bonds_resolution_3D,
        !0
      );
      this.gl.boxBuffer = new d.Box(1, 1, 1);
      this.gl.pillBuffer = new d.Pill(
        this.styles.bonds_pillDiameter_3D / 2,
        this.styles.bonds_pillHeight_3D,
        this.styles.bonds_pillLatitudeResolution_3D,
        this.styles.bonds_pillLongitudeResolution_3D
      );
      this.gl.lineBuffer = new d.Line();
      this.gl.lineArrowBuffer = new d.LineArrow();
      this.gl.arrowBuffer = new d.Arrow(0.3, this.styles.compass_resolution_3D);
      this.gl.quadBuffer = new d.Quad();
      this.gl.textImage.updateFont(
        this.gl,
        this.styles.text_font_size,
        this.styles.text_font_families,
        this.styles.text_font_bold,
        this.styles.text_font_italic,
        this.styles.text_font_stroke_3D
      );
      this.lighting.lightScene(
        this.styles.lightDiffuseColor_3D,
        this.styles.lightSpecularColor_3D,
        this.styles.lightDirection_3D
      );
      this.fogging.fogScene(
        this.styles.fog_color_3D || this.styles.backgroundColor,
        this.styles.fog_start_3D,
        this.styles.fog_end_3D,
        this.styles.fog_density_3D
      );
      this.compass = new d.Compass(this.gl, this.styles);
      this.lightDepthMapTexture.setParameter(
        this.gl,
        this.shadowTextureSize,
        this.shadowTextureSize
      );
      this.lightDepthMapRenderbuffer.setParameter(
        this.gl,
        this.shadowTextureSize,
        this.shadowTextureSize
      );
      this.pickerColorTexture.setParameter(
        this.gl,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.pickerDepthRenderbuffer.setParameter(
        this.gl,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.isSupportDeferred() &&
        (this.depthTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.colorTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.imageTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.positionTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.normalTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.ssaoTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.outlineTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.fxaaTexture.setParameter(
          this.gl,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        ),
        this.ssao.initSampleKernel(this.styles.ssao_kernel_samples),
        this.ssao.initNoiseTexture(this.gl));
      this.camera.updateProjectionMatrix(this.styles.projectionPerspective_3D);
      for (let e = 0, f = this.molecules.length; e < f; e++)
        if (
          ((b = this.molecules[e]),
          b.labelMesh instanceof d.TextMesh ||
            ((b.labelMesh = new d.TextMesh()), b.labelMesh.init(this.gl)),
          b.chains)
        ) {
          b.ribbons = [];
          b.cartoons = [];
          b.tubes = [];
          b.pipePlanks = [];
          for (let e = 0, f = b.chains.length; e < f; e++) {
            var c = b.chains[e];
            for (let a = 0, b = c.length - 1; a < b; a++) c[a].Test = a;
            var h =
              3 < c.length &&
              g[c[3].name] &&
              "#BEA06E" === g[c[3].name].aminoColor;
            if (0 < c.length && !c[0].lineSegments) {
              for (let a = 0, b = c.length - 1; a < b; a++)
                c[a].setup(
                  c[a + 1].cp1,
                  h ? 1 : this.styles.proteins_horizontalResolution
                );
              if (!h)
                for (let b = 1, d = c.length - 1; b < d; b++)
                  m.vec3AngleFrom(c[b - 1].D, c[b].D) > a.PI / 2 &&
                    (c[b].guidePointsSmall.reverse(),
                    c[b].guidePointsLarge.reverse(),
                    l.scale(c[b].D, -1));
              for (let a = 2, b = c.length - 3; a < b; a++)
                c[a].computeLineSegments(
                  c[a - 2],
                  c[a - 1],
                  c[a + 1],
                  !h,
                  h
                    ? this.styles.nucleics_verticalResolution
                    : this.styles.proteins_verticalResolution
                );
              c.pop();
              c.pop();
              c.pop();
              c.shift();
              c.shift();
            }
            var r = k.hsl2rgb(1 === f ? 0.5 : e / f, 1, 0.5);
            r = "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")";
            c.chainColor = r;
            if (h)
              (c = new d.Tube(
                c,
                this.styles.nucleics_tubeThickness,
                this.styles.nucleics_tubeResolution_3D
              )),
                (c.chainColor = r),
                b.tubes.push(c);
            else {
              h = new d.PipePlank(c, this.styles);
              b.pipePlanks.push(h);
              h = c.shift();
              var v = {
                front: new d.Ribbon(
                  c,
                  this.styles.proteins_ribbonThickness,
                  !1
                ),
                back: new d.Ribbon(
                  c,
                  -this.styles.proteins_ribbonThickness,
                  !1
                ),
              };
              v.front.chainColor = r;
              v.back.chainColor = r;
              b.ribbons.push(v);
              v = {
                front: new d.Ribbon(
                  c,
                  this.styles.proteins_ribbonThickness,
                  !0
                ),
                back: new d.Ribbon(
                  c,
                  -this.styles.proteins_ribbonThickness,
                  !0
                ),
              };
              v.front.chainColor = r;
              v.back.chainColor = r;
              b.cartoons.push(v);
              c.unshift(h);
            }
          }
        }
      this.label3D.updateVerticesBuffer(
        this.gl,
        this.getMolecules(),
        this.styles
      );
      if (this instanceof e.MovieCanvas3D && this.frames)
        for (let a = 0, d = this.frames.length; a < d; a++) {
          b = this.frames[a];
          for (let a = 0, d = b.mols.length; a < d; a++)
            (c = b.mols[a]),
              c.labelMesh instanceof p.d3.TextMesh ||
                ((c.labelMesh = new p.d3.TextMesh()),
                c.labelMesh.init(this.gl));
          this.label3D.updateVerticesBuffer(this.gl, b.mols, this.styles);
        }
    }
  };
  b.updateScene = function () {
    this.camera.updateProjectionMatrix(this.styles.projectionPerspective_3D);
    this.lighting.lightScene(
      this.styles.lightDiffuseColor_3D,
      this.styles.lightSpecularColor_3D,
      this.styles.lightDirection_3D
    );
    this.fogging.fogScene(
      this.styles.fog_color_3D || this.styles.backgroundColor,
      this.styles.fog_start_3D,
      this.styles.fog_end_3D,
      this.styles.fog_density_3D
    );
    this.repaint();
  };
  b.mousedown = function (a) {
    this.lastPoint = a.p;
  };
  b.mouseup = function (a) {
    this.lastPoint = r;
  };
  b.rightmousedown = function (a) {
    this.lastPoint = a.p;
  };
  b.drag = function (b) {
    if (this.lastPoint) {
      if (e.monitor.ALT) {
        var d = new p.Point(b.p.x, b.p.y);
        d.sub(this.lastPoint);
        var f = a.tan((this.camera.fieldOfView / 360) * a.PI);
        f = this.height / 2 / this.camera.zoom / f;
        f = this.camera.focalLength() / f;
        c.translate(this.camera.viewMatrix, [d.x * f, -d.y * f, 0]);
      } else
        (f = b.p.x - this.lastPoint.x),
          (d = b.p.y - this.lastPoint.y),
          (f = c.rotate(c.identity([]), (f * a.PI) / 180, [0, 1, 0])),
          c.rotate(f, (d * a.PI) / 180, [1, 0, 0]),
          (this.rotationMatrix = c.multiply(f, this.rotationMatrix));
      this.lastPoint = b.p;
      this.repaint();
    }
  };
  b.mousewheel = function (a, b) {
    0 < b ? this.camera.zoomIn() : this.camera.zoomOut();
    this.updateScene();
  };
  b.multitouchmove = function (b, d) {
    if (2 === d)
      if (this.lastPoint && this.lastPoint.multi) {
        d = new p.Point(b.p.x, b.p.y);
        d.sub(this.lastPoint);
        var e = a.tan((this.camera.fieldOfView / 360) * a.PI);
        e = this.height / 2 / this.camera.zoom / e;
        e = this.camera.focalLength() / e;
        c.translate(this.camera.viewMatrix, [d.x * e, -d.y * e, 0]);
        this.lastPoint = b.p;
        this.repaint();
      } else (this.lastPoint = b.p), (this.lastPoint.multi = !0);
  };
  b.gesturechange = function (a) {
    if (0 !== a.scale - this.lastPinchScale) {
      let b = 30 * -(a.scale / this.lastPinchScale - 1);
      if (isNaN(b)) return;
      0 < b ? this.camera.zoomOut() : this.camera.zoomIn();
      this.updateScene();
      this.lastPinchScale = a.scale;
    }
    this.repaint();
  };
  b.gestureend = function (a) {
    this.lastPinchScale = 1;
    this.lastGestureRotate = 0;
  };
})(
  ChemDoodle,
  ChemDoodle.extensions,
  ChemDoodle.math,
  ChemDoodle.structures,
  ChemDoodle.structures.d3,
  ChemDoodle.RESIDUE,
  Math,
  document,
  ChemDoodle.lib.mat4,
  ChemDoodle.lib.mat3,
  ChemDoodle.lib.vec3,
  window
);
(function (e, m, k, p) {
  e.MolGrabberCanvas3D = function (d, e, a) {
    d && this.create(d, e, a);
    e = [];
    e.push('\x3cbr\x3e\x3cinput type\x3d"text" id\x3d"');
    e.push(d);
    e.push('_query" size\x3d"32" value\x3d"" /\x3e');
    e.push("\x3cbr\x3e\x3cnobr\x3e");
    e.push('\x3cselect id\x3d"');
    e.push(d);
    e.push('_select"\x3e');
    e.push('\x3coption value\x3d"pubchem" selected\x3ePubChem');
    e.push("\x3c/select\x3e");
    e.push('\x3cbutton type\x3d"button" id\x3d"');
    e.push(d);
    e.push('_submit"\x3eShow Molecule\x3c/button\x3e');
    e.push("\x3c/nobr\x3e");
    k.getElementById(d).insertAdjacentHTML("afterend", e.join(""));
    let f = this;
    k.getElementById(d + "_submit").addEventListener("click", function () {
      f.search();
    });
    k.getElementById(d + "_query").addEventListener("keypress", function (a) {
      ("Enter" !== a.key && 13 !== a.keyCode) || f.search();
    });
  };
  e = e.MolGrabberCanvas3D.prototype = new e._Canvas3D();
  e.setSearchTerm = function (d) {
    k.getElementById(this.id + "_query").value = d;
    this.search();
  };
  e.search = function () {
    let d = this;
    m.getMoleculeFromDatabase(
      k.getElementById(this.id + "_query").value,
      { database: k.getElementById(this.id + "_select").value, dimension: 3 },
      function (e) {
        d.loadMolecule(e);
      }
    );
  };
})(ChemDoodle, ChemDoodle.iChemLabs, document);
(function (e, m, k) {
  e.MovieCanvas3D = function (e, d, g) {
    e && this.create(e, d, g);
    this.frames = [];
  };
  e.MovieCanvas3D.PLAY_ONCE = 0;
  e.MovieCanvas3D.PLAY_LOOP = 1;
  e.MovieCanvas3D.PLAY_SPRING = 2;
  k = e.MovieCanvas3D.prototype = new e._Canvas3D();
  k.timeout = 50;
  k.frameNumber = 0;
  k.playMode = 2;
  k.reverse = !1;
  k.startAnimation = e._AnimatorCanvas.prototype.startAnimation;
  k.stopAnimation = e._AnimatorCanvas.prototype.stopAnimation;
  k.isRunning = e._AnimatorCanvas.prototype.isRunning;
  k.dblclick = e.RotatorCanvas.prototype.dblclick;
  k.nextFrame = function (e) {
    e = this.frames[this.frameNumber];
    this.molecules = e.mols;
    this.shapes = e.shapes;
    2 === this.playMode && this.reverse
      ? (this.frameNumber--,
        0 > this.frameNumber && ((this.frameNumber = 1), (this.reverse = !1)))
      : (this.frameNumber++,
        this.frameNumber >= this.frames.length &&
          (2 === this.playMode
            ? ((this.frameNumber -= 2), (this.reverse = !0))
            : ((this.frameNumber = 0),
              0 === this.playMode && this.stopAnimation())));
  };
  k.center = function () {
    var e = new m.Atom(),
      d = this.frames[0];
    for (let g = 0, a = d.mols.length; g < a; g++)
      e.add3D(d.mols[g].getCenter3D());
    e.x /= d.mols.length;
    e.y /= d.mols.length;
    d = new m.Atom();
    d.sub3D(e);
    for (let g = 0, a = this.frames.length; g < a; g++) {
      e = this.frames[g];
      for (let a = 0, c = e.mols.length; a < c; a++) {
        let b = e.mols[a];
        for (let a = 0, c = b.atoms.length; a < c; a++) b.atoms[a].add3D(d);
      }
    }
  };
  k.addFrame = function (e, d) {
    this.frames.push({ mols: e, shapes: d });
  };
})(ChemDoodle, ChemDoodle.structures);
(function (e, m, k, p) {
  let d = [],
    g = [1, 0, 0],
    a = [0, 1, 0],
    f = [0, 0, 1];
  e.RotatorCanvas3D = function (a, c, d) {
    a && this.create(a, c, d);
  };
  let c = (e.RotatorCanvas3D.prototype = new e._Canvas3D());
  c.timeout = 33;
  m = m.PI / 15;
  c.xIncrement = m;
  c.yIncrement = m;
  c.zIncrement = m;
  c.startAnimation = e._AnimatorCanvas.prototype.startAnimation;
  c.stopAnimation = e._AnimatorCanvas.prototype.stopAnimation;
  c.isRunning = e._AnimatorCanvas.prototype.isRunning;
  c.dblclick = e.RotatorCanvas.prototype.dblclick;
  c.mousedown = p;
  c.rightmousedown = p;
  c.drag = p;
  c.mousewheel = p;
  c.nextFrame = function (b) {
    0 === this.molecules.length && 0 === this.shapes.length
      ? this.stopAnimation()
      : (k.identity(d),
        (b /= 1e3),
        k.rotate(d, this.xIncrement * b, g),
        k.rotate(d, this.yIncrement * b, a),
        k.rotate(d, this.zIncrement * b, f),
        k.multiply(this.rotationMatrix, d));
  };
})(ChemDoodle, Math, ChemDoodle.lib.mat4);
(function (e, m) {
  e.TransformCanvas3D = function (e, m, d) {
    e && this.create(e, m, d);
  };
  e.TransformCanvas3D.prototype = new e._Canvas3D();
})(ChemDoodle);
(function (e, m) {
  e.ViewerCanvas3D = function (e, m, d) {
    e && this.create(e, m, d);
  };
  e = e.ViewerCanvas3D.prototype = new e._Canvas3D();
  e.mousedown = m;
  e.rightmousedown = m;
  e.drag = m;
  e.mousewheel = m;
})(ChemDoodle);
(function (e, m, k, p, d) {
  function g(a, d, c, b) {
    this.element = a;
    this.x = d;
    this.y = c;
    this.dimension = b;
    this.allowMultipleSelections = !1;
  }
  e.PeriodicTableCanvas = function (a, d) {
    this.padding = 5;
    a && this.create(a, 18 * d + 2 * this.padding, 10 * d + 2 * this.padding);
    this.cellDimension = d ? d : 20;
    this.setupTable();
    this.repaint();
  };
  p = e.PeriodicTableCanvas.prototype = new e._Canvas();
  p.loadMolecule = d;
  p.getMolecule = d;
  p.getHoveredElement = function () {
    return this.hovered ? this.hovered.element : d;
  };
  p.innerRepaint = function (a) {
    for (let d = 0, c = this.cells.length; d < c; d++)
      this.drawCell(a, this.styles, this.cells[d]);
    this.hovered && this.drawCell(a, this.styles, this.hovered);
    this.selected && this.drawCell(a, this.styles, this.selected);
  };
  p.setupTable = function () {
    this.cells = [];
    let a = this.padding,
      d = this.padding;
    var c = 0;
    for (let f = 0, h = e.SYMBOLS.length; f < h; f++) {
      18 === c && ((c = 0), (d += this.cellDimension), (a = this.padding));
      var b = e.ELEMENT[e.SYMBOLS[f]];
      if (2 === b.atomicNumber) (a += 16 * this.cellDimension), (c += 16);
      else if (5 === b.atomicNumber || 13 === b.atomicNumber)
        (a += 10 * this.cellDimension), (c += 10);
      (58 > b.atomicNumber ||
        (71 < b.atomicNumber && 90 > b.atomicNumber) ||
        103 < b.atomicNumber) &&
        118 >= b.atomicNumber &&
        (this.cells.push(new g(b, a, d, this.cellDimension)),
        (a += this.cellDimension),
        c++);
    }
    d += 2 * this.cellDimension;
    a = 3 * this.cellDimension + this.padding;
    for (c = 57; 104 > c; c++)
      if (
        ((b = e.ELEMENT[e.SYMBOLS[c]]),
        90 === b.atomicNumber &&
          ((d += this.cellDimension),
          (a = 3 * this.cellDimension + this.padding)),
        (58 <= b.atomicNumber && 71 >= b.atomicNumber) ||
          (90 <= b.atomicNumber && 103 >= b.atomicNumber))
      )
        this.cells.push(new g(b, a, d, this.cellDimension)),
          (a += this.cellDimension);
  };
  p.drawCell = function (a, d, c) {
    let b = a.createRadialGradient(
      c.x + c.dimension / 3,
      c.y + c.dimension / 3,
      1.5 * c.dimension,
      c.x + c.dimension / 3,
      c.y + c.dimension / 3,
      c.dimension / 10
    );
    b.addColorStop(0, "#000000");
    b.addColorStop(0.7, c.element.jmolColor);
    b.addColorStop(1, "#FFFFFF");
    a.fillStyle = b;
    m.contextRoundRect(a, c.x, c.y, c.dimension, c.dimension, c.dimension / 8);
    if (c === this.hovered || c === this.selected || c.selected)
      (a.lineWidth = 2),
        (a.strokeStyle = "#c10000"),
        a.stroke(),
        (a.fillStyle = "white");
    a.fill();
    a.font = m.getFontString(d.text_font_size, d.text_font_families);
    a.fillStyle = d.text_color;
    a.textAlign = "center";
    a.textBaseline = "middle";
    a.fillText(c.element.symbol, c.x + c.dimension / 2, c.y + c.dimension / 2);
  };
  p.click = function (a) {
    this.hovered &&
      (this.allowMultipleSelections
        ? (this.hovered.selected = !this.hovered.selected)
        : (this.selected = this.hovered),
      this.repaint());
  };
  p.touchstart = function (a) {
    this.mousemove(a);
  };
  p.mousemove = function (a) {
    let e = a.p.x;
    a = a.p.y;
    this.hovered = d;
    for (let c = 0, b = this.cells.length; c < b; c++) {
      let b = this.cells[c];
      if (
        k.isBetween(e, b.x, b.x + b.dimension) &&
        k.isBetween(a, b.y, b.y + b.dimension)
      ) {
        this.hovered = b;
        break;
      }
    }
    this.repaint();
  };
  p.mouseout = function (a) {
    this.hovered = d;
    this.repaint();
  };
})(ChemDoodle, ChemDoodle.extensions, ChemDoodle.math, document);
(function (e, m, k, p, d) {
  m.png = {};
  m.png.string = function (d) {
    if (
      d instanceof e._Canvas3D &&
      !d.gl.getContextAttributes().preserveDrawingBuffer
    )
      throw Error(
        "PNG data cannot be created from a Canvas3D component unless the ChemDoodle._Canvas3D.PRESERVE_DRAWING_BUFFER boolean is set to true before the Canvas3D component is initialized."
      );
    return k.getElementById(d.id).toDataURL("image/png");
  };
  m.png.download = function (e, a) {
    a === d && (a = "unnamed");
    let f = k.createElement("a");
    f.href = this.string(e);
    f.download = a;
    f.click();
  };
  m.png.open = function (d) {
    let a = p.open();
    a.document.open();
    a.document.write(
      '\x3ciframe src\x3d"' +
        this.string(d) +
        '" frameborder\x3d"0" style\x3d"border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen\x3e\x3c/iframe\x3e'
    );
    a.document.close();
  };
})(ChemDoodle, ChemDoodle.io, document, window);
(function (e, m) {
  e.file = {};
  e.file.content = function (e, m) {
    fetch(e)
      .then((d) => {
        if (!d.ok) throw Error("Network response was not ok");
        return d.text();
      })
      .then((d) => {
        m(d);
      });
  };
})(ChemDoodle.io);
(function (e, m, k, p, d, g) {
  m.SERVER_URL = "https://ichemlabs.cloud.chemdoodle.com/icl_cdc_v090000/WebHQ";
  m.inRelay = !1;
  m.INFO = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    v_cwc: e.getVersion(),
    v_jQuery: "N/A",
    v_jQuery_ui: "N/A",
  };
  let a = new k.JSONInterpreter(),
    f = new p.Queue();
  m._contactServer = function (a, b, d, e, g) {
    if (this.inRelay)
      f.enqueue({ call: a, content: b, options: d, callback: e, errorback: g });
    else {
      m.inRelay = !0;
      let c = b instanceof FormData;
      d = a = JSON.stringify({
        call: a,
        content: c ? {} : b,
        options: d,
        info: ChemDoodle.iChemLabs.INFO,
      });
      c && (b.append("jsonData", JSON.stringify(a)), (d = b));
      b = {
        method: "POST",
        headers: {
          "Content-Type": c ? "multipart/form-data" : "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: d,
        credentials: "include",
      };
      c && delete b.headers["Content-Type"];
      fetch(this.SERVER_URL, b)
        .then((a) => {
          if (!a.ok) throw Error("Network response was not ok");
          return a.json();
        })
        .then((a) => {
          a.message && alert(a.message);
          m.inRelay = !1;
          e && a.content && !a.stop && e(a.content);
          a.stop && g && g();
          f.isEmpty() ||
            ((a = f.dequeue()),
            m._contactServer(
              a.call,
              a.content,
              a.options,
              a.callback,
              a.errorback
            ));
        })
        .catch((a) => {
          m.inRelay = !1;
          g && g();
          f.isEmpty() ||
            ((a = f.dequeue()),
            m._contactServer(
              a.call,
              a.content,
              a.options,
              a.callback,
              a.errorback
            ));
        });
    }
  };
  m.authenticate = function (a, b, d, e) {
    this._contactServer(
      "authenticate",
      { credential: a },
      b,
      function (a) {
        d(a);
      },
      e
    );
  };
  m.balanceReaction = function (c, b, d, e) {
    let f = {};
    "string" === typeof c || c instanceof String
      ? (f.equation = c)
      : (f.reaction = a.contentTo(c.molecules, c.shapes));
    this._contactServer(
      "balanceReaction",
      f,
      b,
      function (a) {
        d(a.result, a.message);
      },
      e
    );
  };
  m.calculate = function (c, b, d, e) {
    this._contactServer(
      "calculate",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(a);
      },
      e
    );
  };
  m.createLewisDotStructure = function (c, b, d, e) {
    this._contactServer(
      "createLewisDot",
      { mol: a.molTo(c) },
      b,
      function (b) {
        d(a.molFrom(b.mol));
      },
      e
    );
  };
  m.cir = function (c, b, d, e) {
    this._contactServer(
      "cir",
      c,
      b,
      function (b) {
        d(a.contentFrom(b.data), b.preview);
      },
      e
    );
  };
  m.elementalAnalysis = function (a, b, d, e) {
    this._contactServer(
      "elementalAnalysis",
      { mol: new ChemDoodle.io.JSONInterpreter().molTo(a) },
      b,
      function (a) {
        d(a);
      },
      e
    );
  };
  m.fileToImage = function (a, b, d, e) {
    this._contactServer(
      "fileToImage",
      a,
      b,
      function (a) {
        d(a.imgsrc, a.width, a.height);
      },
      e
    );
  };
  m.generateImage = function (c, b, d, e) {
    this._contactServer(
      "generateImage",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(a.link);
      },
      e
    );
  };
  m.generateIUPACName = function (c, b, d, e) {
    this._contactServer(
      "generateIUPACName",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(a.iupac, a.attemptedPIN);
      },
      e
    );
  };
  m.getMoleculeFromContent = function (c, b, d, e) {
    this._contactServer(
      "getMoleculeFromContent",
      { content: c },
      b,
      function (b) {
        let c = !1;
        for (let a = 0, d = b.mol.a.length; a < d; a++)
          if (0 !== b.mol.a[a].z) {
            c = !0;
            break;
          }
        if (c)
          for (let a = 0, c = b.mol.a.length; a < c; a++)
            (b.mol.a[a].x /= 20), (b.mol.a[a].y /= 20), (b.mol.a[a].z /= 20);
        d(a.molFrom(b.mol));
      },
      e
    );
  };
  m.getMoleculeFromDatabase = function (c, b, d, e) {
    this._contactServer(
      "getMoleculeFromDatabase",
      { query: c },
      b,
      function (c) {
        if (3 === b.dimension)
          for (let a = 0, b = c.mol.a.length; a < b; a++)
            (c.mol.a[a].x /= 20), (c.mol.a[a].y /= -20), (c.mol.a[a].z /= 20);
        d(a.molFrom(c.mol));
      },
      e
    );
  };
  m.getOptimizedPDBStructure = function (c, b, d, e) {
    this._contactServer(
      "getOptimizedPDBStructure",
      { id: c },
      b,
      function (b) {
        let c;
        c = b.mol ? a.molFrom(b.mol) : new p.Molecule();
        c.chains = a.chainsFrom(b.ribbons);
        for (let a = 0, d = c.chains.length; a < d; a++) {
          b = c.chains[a];
          for (let a = 0, c = b.length - 1; a < c; a++)
            b[a + 1].arrow && ((b[a + 1].arrow = !1), (b[a].arrow = !0));
        }
        c.fromJSON = !0;
        d(c);
      },
      e
    );
  };
  m.getZeoliteFromIZA = function (a, b, d, e) {
    this._contactServer(
      "getZeoliteFromIZA",
      { query: a },
      b,
      function (a) {
        d(ChemDoodle.readCIF(a.cif, b.xSuper, b.ySuper, b.zSuper));
      },
      e
    );
  };
  m.isGraphIsomorphism = function (c, b, d, e, f) {
    this._contactServer(
      "isGraphIsomorphism",
      { arrow: a.molTo(c), target: a.molTo(b) },
      d,
      function (a) {
        e(a.value);
      },
      f
    );
  };
  m.isSubgraphIsomorphism = function (c, b, d, e, f) {
    this._contactServer(
      "isSubgraphIsomorphism",
      { arrow: a.molTo(c), target: a.molTo(b) },
      d,
      function (a) {
        e(a.value);
      },
      f
    );
  };
  m.isSupergraphIsomorphism = function (c, b, d, e, f) {
    this._contactServer(
      "isSupergraphIsomorphism",
      { arrow: a.molTo(c), target: a.molTo(b) },
      d,
      function (a) {
        e(a.value);
      },
      f
    );
  };
  m.getSimilarityMeasure = function (c, b, d, e, f) {
    this._contactServer(
      "getSimilarityMeasure",
      { first: a.molTo(c), second: a.molTo(b) },
      d,
      function (a) {
        e(a.value);
      },
      f
    );
  };
  m.kekulize = function (c, b, d, e) {
    this._contactServer(
      "kekulize",
      { mol: a.molTo(c) },
      b,
      function (b) {
        d(a.molFrom(b.mol));
      },
      e
    );
  };
  m.maximumCommonSubstructure = function (c, b, d, e, f) {
    this._contactServer(
      "maximumCommonSubstructure",
      { m1: a.molTo(c), m2: a.molTo(b) },
      d,
      function (a) {
        e(a.map);
      },
      f
    );
  };
  m.mechanismMatch = function (a, b, d, e, f) {
    this._contactServer(
      "matchMechanism",
      { arrow: a, targets: b },
      d,
      function (a) {
        e(a);
      },
      f
    );
  };
  m.optimize = function (c, b, d, e) {
    this._contactServer(
      "optimize",
      { mol: a.molTo(c) },
      b,
      function (e) {
        e = a.molFrom(e.mol);
        if (2 === b.dimension) {
          for (let a = 0, b = e.atoms.length; a < b; a++)
            (c.atoms[a].x = e.atoms[a].x), (c.atoms[a].y = e.atoms[a].y);
          d();
        } else if (3 === b.dimension) {
          for (let a = 0, b = e.atoms.length; a < b; a++)
            (e.atoms[a].x /= 20), (e.atoms[a].y /= -20), (e.atoms[a].z /= 20);
          d(e);
        }
      },
      e
    );
  };
  m.readIUPACName = function (c, b, d, e) {
    this._contactServer(
      "readIUPACName",
      { iupac: c },
      b,
      function (b) {
        let c = [];
        for (let d = 0, e = b.mols.length; d < e; d++)
          c.push(a.molFrom(b.mols[d]));
        d(c, b.warning);
      },
      e
    );
  };
  m.readSMILES = function (c, b, d, e) {
    this._contactServer(
      "readSMILES",
      { smiles: c },
      b,
      function (b) {
        d(a.contentFrom(b.content));
      },
      e
    );
  };
  m.readWLN = function (c, b, d, e) {
    this._contactServer(
      "readWLN",
      { wln: c },
      b,
      function (b) {
        d(a.contentFrom(b.content));
      },
      e
    );
  };
  m.resolveCIP = function (c, b, d, e) {
    this._contactServer(
      "resolveCIP",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(a.atoms, a.bonds);
      },
      e
    );
  };
  m.saveFile = function (c, b, d, e) {
    this._contactServer(
      "saveFile",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(a.link);
      },
      e
    );
  };
  m.simulate13CNMR = function (c, b, d, f) {
    b.nucleus = "C";
    b.isotope = 13;
    this._contactServer(
      "simulateNMR",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(e.readJCAMP(a.jcamp));
      },
      f
    );
  };
  m.simulate1HNMR = function (c, b, d, f) {
    b.nucleus = "H";
    b.isotope = 1;
    this._contactServer(
      "simulateNMR",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(e.readJCAMP(a.jcamp));
      },
      f
    );
  };
  m.simulateMassParentPeak = function (c, b, d, f) {
    this._contactServer(
      "simulateMassParentPeak",
      { mol: a.molTo(c) },
      b,
      function (a) {
        d(e.readJCAMP(a.jcamp));
      },
      f
    );
  };
  m.stoichiometry = function (c, b, d, e) {
    let f = {};
    "string" === typeof c || c instanceof String
      ? (f.equation = c)
      : c.molecules !== g
      ? (f.reaction = a.contentTo(c.molecules, c.shapes))
      : c.table !== g && (f.table = c.table);
    this._contactServer(
      "stoichiometry",
      f,
      b,
      function (a) {
        d(a.table, a.message);
      },
      e
    );
  };
  m.writeSMILES = function (c, b, d, e, f) {
    this._contactServer(
      "writeSMILES",
      { content: a.contentTo(c, b) },
      d,
      function (a) {
        e(a.smiles);
      },
      f
    );
  };
  m.version = function (a, b, d) {
    this._contactServer(
      "version",
      {},
      a,
      function (a) {
        b(a.value);
      },
      d
    );
  };
  m.checkForUpdates = function (a) {
    this._contactServer(
      "checkForUpdates",
      { value: d.href },
      a,
      function (a) {},
      function () {}
    );
  };
})(
  ChemDoodle,
  ChemDoodle.iChemLabs,
  ChemDoodle.io,
  ChemDoodle.structures,
  location
);
