import {s as e} from "./f025431a-ev0u51n49v8v8hf2.js";
import {AAt as t, Bl as n, D9 as r, DOt as i, Drt as a, EOt as o, Fht as s, KAt as c, LAt as l, NAt as u, Oht as d, Sbt as f, VAt as p, Vb as m, Zwt as h, aAt as g, aH as _, cH as v, dit as y, i as b, jht as x, r as S} from "./1a7ebd5f-epzhpijm9hut7ej1.js";
import {i as C} from "./4813494d-jxgb59kka8meov42.js";
import {r as w} from "./97587f90-bhtnsoyno3ngwhi1.js";
import {t as T} from "./47edf3d1-fovjcz9u2bwl9nxj.js";
var E = i()
  , D = e(c())
  , O = o()
  , k = {
    IIM: !1
}
  , A = {
    IIM: !0
}
  , j = () => (m(),
{
    prefetchSearch: null
})
  , M = ({currentUrl: e, nextUrl: t}) => {
    let n = e.searchParams
      , r = t.searchParams;
    return n.get(`hints`) !== r.get(`hints`) || n.get(`q`) !== r.get(`q`)
}
  , N = p(function() {
    "use forget";
    let e = (0,
    E.c)(31);
    (0,
    D.useState)(L);
    let {conversationId: i} = l(), {prefetchSearchPromises: o, shouldPrefetchModels: c, shouldPrefetchInternalModels: p, shouldPrefetchStarterPrompts: m, shouldPrefetchHistory: h, shouldPrefetchStarredConversations: b} = t(), j = n(), M, N;
    e[0] === j ? (M = e[1],
    N = e[2]) : (M = () => {
        if (j)
            return v()
    }
    ,
    N = [j],
    e[0] = j,
    e[1] = M,
    e[2] = N),
    (0,
    D.useEffect)(M, N);
    let R = u();
    for (let e of R) {
        let t = e.loaderData;
        if (!t || typeof t != `object`)
            continue;
        let n = Reflect.get(t, `gizmoIdAlias`);
        if (!n || typeof n != `object`)
            continue;
        let r = Reflect.get(n, `alias`)
          , i = Reflect.get(n, `gizmoId`);
        if (typeof r == `string` && typeof i == `string`) {
            s(r, i);
            break
        }
    }
    let z;
    e[3] === R ? z = e[4] : (z = R.some(I),
    e[3] = R,
    e[4] = z);
    let B = z, V = f(), H, U;
    e[5] === V ? (H = e[6],
    U = e[7]) : (H = () => {
        let e = [S(V, d(k), F), S(V, a.queryKey, P)];
        return () => {
            for (let t of e)
                t()
        }
    }
    ,
    U = [V],
    e[5] = V,
    e[6] = H,
    e[7] = U),
    (0,
    D.useEffect)(H, U);
    let W;
    e[8] === B ? W = e[9] : (W = B ? (0,
    O.jsx)(g, {}) : void 0,
    e[8] = B,
    e[9] = W);
    let G;
    e[10] !== i || e[11] !== W ? (G = (0,
    O.jsx)(T, {
        urlThreadId: i,
        children: W
    }),
    e[10] = i,
    e[11] = W,
    e[12] = G) : G = e[12];
    let K;
    e[13] === c ? K = e[14] : (K = c && (0,
    O.jsx)(C, {
        queryOptions: x(k)
    }),
    e[13] = c,
    e[14] = K);
    let q;
    e[15] === p ? q = e[16] : (q = p && (0,
    O.jsx)(C, {
        queryOptions: x(A)
    }),
    e[15] = p,
    e[16] = q);
    let J;
    e[17] === m ? J = e[18] : (J = m && (0,
    O.jsx)(C, {
        queryOptions: _()
    }),
    e[17] = m,
    e[18] = J);
    let Y;
    e[19] === h ? Y = e[20] : (Y = h && (0,
    O.jsx)(C, {
        queryOptions: r()
    }),
    e[19] = h,
    e[20] = Y);
    let X;
    e[21] === b ? X = e[22] : (X = b && (0,
    O.jsx)(C, {
        queryOptions: y()
    }),
    e[21] = b,
    e[22] = X);
    let Z;
    return e[23] !== o || e[24] !== Y || e[25] !== X || e[26] !== G || e[27] !== K || e[28] !== q || e[29] !== J ? (Z = (0,
    O.jsxs)(w.Provider, {
        value: o,
        children: [G, K, q, J, Y, X]
    }),
    e[23] = o,
    e[24] = Y,
    e[25] = X,
    e[26] = G,
    e[27] = K,
    e[28] = q,
    e[29] = J,
    e[30] = Z) : Z = e[30],
    Z
});
function P() {
    h.addFirstTiming(`load.user-query`)
}
function F() {
    h.addFirstTiming(`load.models`)
}
function I(e) {
    return e.loaderData && typeof e.loaderData == `object` && `isOutletBasedRoute`in e.loaderData && e.loaderData.isOutletBasedRoute
}
function L() {
    return b(),
    !0
}
export {j as n, M as r, N as t};
//# sourceMappingURL=e263ea55-ohp9vkqpp23znwyu.js.map
