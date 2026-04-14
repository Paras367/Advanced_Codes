const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["./aa5ac567-lg3bmmkxpi9jrsxd.js", "./1a7ebd5f-epzhpijm9hut7ej1.js", "./f025431a-ev0u51n49v8v8hf2.js", "./conversation-small-mioe6hic.css"]))) => i.map(i => d[i]);
import {s as e} from "./f025431a-ev0u51n49v8v8hf2.js";
import {$D as t, $wt as n, Bot as r, Ckt as i, Cn as a, DOt as o, Dkt as s, EOt as c, Ekt as l, F3 as u, Fyt as d, Ik as f, Iot as p, Ipt as m, JB as h, J_t as g, KAt as _, KI as v, KJ as y, L9 as b, Ly as x, Mft as S, Mk as C, Nk as w, Oft as T, Pbt as E, Pk as D, QE as O, Qyt as k, S5 as A, SSt as j, Sft as M, Tat as N, UAt as P, Uot as F, Uy as I, Vxt as ee, WD as te, Wy as L, Xbt as R, Ybt as z, ZD as ne, alt as re, ebt as B, hft as ie, jR as ae, jk as oe, kDt as V, lht as H, mft as U, nft as se, o5 as ce, qut as le, qy as ue, rbt as de, uxt as fe, xSt as pe, xj as me, zk as he, zxt as ge} from "./1a7ebd5f-epzhpijm9hut7ej1.js";
import {t as W} from "./93027c7b-oh345jn3rp9ahp3e.js";
import {o as _e} from "./6b80a314-o7fw6i3oysfqmizn.js";
import {A as G, T as K, k as q, n as ve, o as J, w as ye} from "./b38665c9-gy2qsoomg6pivphl.js";
var Y = e(_())
  , X = o();
R();
var Z = c()
  , be = i({
    selectLabel: {
        id: `WnuENJ`,
        defaultMessage: `Select product`
    },
    deselectLabel: {
        id: `VgU4sb`,
        defaultMessage: `Deselect product`
    }
});
function xe({conversation: e, productId: t, isSelectionEnabled: n, onToggleSelection: r}) {
    if (!n || !e)
        return;
    let i = L(e)
      , a = I(e)
      , o = !!t && i.has(t);
    return {
        isSelected: o,
        showCheckbox: a || o,
        onToggleSelection: r
    }
}
function Se(e) {
    "use forget";
    let t = (0,
    X.c)(19), {selection: n, placement: r, className: i} = e, a = r === void 0 ? `inset` : r, o = s(), c;
    t[0] === o ? c = t[1] : (c = o.formatMessage(be.selectLabel),
    t[0] = o,
    t[1] = c);
    let l = c, u;
    t[2] === o ? u = t[3] : (u = o.formatMessage(be.deselectLabel),
    t[2] = o,
    t[3] = u);
    let d = u, f = n.isSelected, p = n.isSelected ? d : l, m;
    t[4] === n ? m = t[5] : (m = e => {
        e.preventDefault(),
        e.stopPropagation(),
        n.onToggleSelection()
    }
    ,
    t[4] = n,
    t[5] = m);
    let h = a === `flush` ? `end-0 top-0` : `end-2 top-2`, g = n.showCheckbox ? `pointer-events-auto opacity-100` : `pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100`, _;
    t[6] !== i || t[7] !== h || t[8] !== g ? (_ = z(`focus-visible:outline-token-outline-primary absolute z-10 flex size-7 items-center justify-center rounded-full focus-visible:outline-offset-[-8px]`, h, g, i),
    t[6] = i,
    t[7] = h,
    t[8] = g,
    t[9] = _) : _ = t[9];
    let y;
    t[10] === Symbol.for(`react.memo_cache_sentinel`) ? (y = (0,
    Z.jsx)(`span`, {
        className: `absolute inset-1.5 rounded-full bg-black/35 blur-md`
    }),
    t[10] = y) : y = t[10];
    let b;
    t[11] === n.isSelected ? b = t[12] : (b = n.isSelected ? (0,
    Z.jsx)(`span`, {
        className: `z-[11] flex size-5 items-center justify-center rounded-full bg-white dark:bg-white`,
        children: (0,
        Z.jsx)(v, {
            className: `entity-accent size-4 stroke-current stroke-[1.25]`
        })
    }) : (0,
    Z.jsx)(`span`, {
        className: `z-[11] flex size-5 items-center justify-center rounded-full`,
        children: (0,
        Z.jsx)(`span`, {
            className: `relative size-5 rounded-full border-2 border-current text-white`,
            children: (0,
            Z.jsx)(`span`, {
                className: `absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm`
            })
        })
    }),
    t[11] = n.isSelected,
    t[12] = b);
    let x;
    return t[13] !== n.isSelected || t[14] !== b || t[15] !== p || t[16] !== m || t[17] !== _ ? (x = (0,
    Z.jsxs)(`button`, {
        type: `button`,
        "aria-pressed": f,
        "aria-label": p,
        onClick: m,
        className: _,
        children: [y, b]
    }),
    t[13] = n.isSelected,
    t[14] = b,
    t[15] = p,
    t[16] = m,
    t[17] = _,
    t[18] = x) : x = t[18],
    x
}
R();
function Ce(e) {
    return typeof e == `object` && !!e
}
function we(e) {
    return Ce(e)
}
function Te(e, t) {
    return e == null || Number.isNaN(e) ? t : Math.min(Math.max(e, 0), 1)
}
function Ee(e, t=!1) {
    return t || !e || !Ce(e.showcase_metadata) ? null : e.showcase_metadata
}
function De(e, t, n=!1) {
    let r = Ee(e, n);
    if (!r?.slots || !Ce(r.slots))
        return null;
    let i = r.slots[t];
    return we(i) ? i : null
}
function Oe(e, t=!1) {
    let n = Ee(e, t)?.background;
    if (!(!n || !n.primary))
        return n.type === `gradient` && n.secondary && n.secondary !== n.primary ? {
            backgroundImage: `linear-gradient(180deg, ${n.primary} 0%, ${n.secondary} 100%)`
        } : {
            backgroundColor: n.primary
        }
}
function ke(e, {darkModeClassName: t}={}) {
    if (e && e.image_blend_mode !== `normal`)
        return t ? `mix-blend-darken ${t}` : `mix-blend-darken`
}
function Ae(e) {
    if (!e.placement || !Ce(e.placement))
        return null;
    let t = e.placement.left_percent
      , n = e.placement.top_percent
      , r = e.placement.width_percent
      , i = e.placement.height_percent;
    return typeof t != `number` || typeof n != `number` || typeof r != `number` || typeof i != `number` ? null : {
        position: `absolute`,
        left: `${t}%`,
        top: `${n}%`,
        width: `${r}%`,
        height: `${i}%`,
        maxWidth: `none`,
        maxHeight: `none`
    }
}
function je(e, {fitOverride: t, maxZoom: n}={}) {
    let r = e.position
      , i = Te(typeof r?.x == `number` ? r.x : void 0, .5)
      , a = Te(typeof r?.y == `number` ? r.y : void 0, .5)
      , o = typeof e.zoom == `number` && e.zoom > 0 ? e.zoom : 1
      , s = typeof n == `number` && n > 0 ? Math.min(o, n) : o
      , c = t ?? (e.fit === `cover` ? `cover` : `contain`)
      , l = `${i * 100}% ${a * 100}%`;
    return {
        position: `absolute`,
        inset: 0,
        width: `100%`,
        height: `100%`,
        objectFit: c,
        objectPosition: l,
        transform: s === 1 ? void 0 : `scale(${s})`,
        transformOrigin: l
    }
}
function Me(e) {
    "use forget";
    let t = (0,
    X.c)(32), n, r, i, a, o, s, c, l, u, d;
    t[0] === e ? (n = t[1],
    r = t[2],
    i = t[3],
    a = t[4],
    o = t[5],
    s = t[6],
    c = t[7],
    l = t[8],
    u = t[9],
    d = t[10]) : ({product: c, slotKey: l, alt: n, className: r, renderMode: u, imageUrl: a, ignoreShowcaseMetadata: d, fitOverride: i, maxZoom: s, ...o} = e,
    t[0] = e,
    t[1] = n,
    t[2] = r,
    t[3] = i,
    t[4] = a,
    t[5] = o,
    t[6] = s,
    t[7] = c,
    t[8] = l,
    t[9] = u,
    t[10] = d);
    let f = u === void 0 ? `placement` : u, p = d === void 0 ? !1 : d, m, h, g;
    if (t[11] !== i || t[12] !== p || t[13] !== a || t[14] !== s || t[15] !== c || t[16] !== f || t[17] !== l) {
        g = Symbol.for(`react.early_return_sentinel`);
        bb0: {
            let e = De(c, l, p);
            if (m = a ?? c?.image_urls?.[0],
            !e || !m) {
                g = null;
                break bb0
            }
            h = f === `placement` ? Ae(e) ?? je(e, {
                fitOverride: i,
                maxZoom: s
            }) : je(e, {
                fitOverride: i,
                maxZoom: s
            })
        }
        t[11] = i,
        t[12] = p,
        t[13] = a,
        t[14] = s,
        t[15] = c,
        t[16] = f,
        t[17] = l,
        t[18] = m,
        t[19] = h,
        t[20] = g
    } else
        m = t[18],
        h = t[19],
        g = t[20];
    if (g !== Symbol.for(`react.early_return_sentinel`))
        return g;
    let _ = h, v;
    t[21] === r ? v = t[22] : (v = z(`m-0 block select-none`, r),
    t[21] = r,
    t[22] = v);
    let y;
    t[23] !== o.style || t[24] !== _ ? (y = {
        ..._,
        ...o.style
    },
    t[23] = o.style,
    t[24] = _,
    t[25] = y) : y = t[25];
    let b;
    return t[26] !== n || t[27] !== o || t[28] !== m || t[29] !== v || t[30] !== y ? (b = (0,
    Z.jsx)(`img`, {
        ...o,
        src: m,
        alt: n,
        className: v,
        style: y
    }),
    t[26] = n,
    t[27] = o,
    t[28] = m,
    t[29] = v,
    t[30] = y,
    t[31] = b) : b = t[31],
    b
}
var Ne = le(fe.ShoppingHidePostProcessedImages, () => !1, {
    coerceStoredValue: e => e === !0
});
function Pe() {
    "use forget";
    return E(Fe)
}
function Fe() {
    return Ne()
}
function Ie(e) {
    "use forget";
    let t = (0,
    X.c)(13), {onShown: n, resetKey: r, threshold: i} = e, a = i === void 0 ? 0 : i, [o,s] = (0,
    Y.useState)(null), c = (0,
    Y.useRef)(!1), l = (0,
    Y.useRef)(n), d, f;
    t[0] === n ? (d = t[1],
    f = t[2]) : (d = () => {
        l.current = n
    }
    ,
    f = [n],
    t[0] = n,
    t[1] = d,
    t[2] = f),
    (0,
    Y.useEffect)(d, f);
    let p;
    t[3] === Symbol.for(`react.memo_cache_sentinel`) ? (p = () => {
        c.current = !1
    }
    ,
    t[3] = p) : p = t[3];
    let m;
    t[4] === r ? m = t[5] : (m = [r],
    t[4] = r,
    t[5] = m),
    (0,
    Y.useEffect)(p, m);
    let h;
    t[6] !== o || t[7] !== a ? (h = () => {
        if (!(!o || c.current)) {
            if (typeof IntersectionObserver > `u`) {
                c.current = !0,
                l.current();
                return
            }
            return u({
                target: o,
                options: {
                    threshold: a
                },
                onChange: e => {
                    !e || c.current || (c.current = !0,
                    l.current())
                }
            })
        }
    }
    ,
    t[6] = o,
    t[7] = a,
    t[8] = h) : h = t[8];
    let g;
    return t[9] !== r || t[10] !== o || t[11] !== a ? (g = [r, o, a],
    t[9] = r,
    t[10] = o,
    t[11] = a,
    t[12] = g) : g = t[12],
    (0,
    Y.useEffect)(h, g),
    s
}
var Le = p( () => new Map)
  , Re = B( (e, t) => He(Le(e), t, () => k(!1)))
  , ze = () => void 0;
function Be(e) {
    "use forget";
    let t = (0,
    X.c)(22), {clientThreadId: n, messageId: i, contentReferenceStartIndex: a, shellProduct: o} = e, s = F(), c;
    t[0] !== n || t[1] !== s ? (c = s ?? (n ? r(n) : void 0),
    t[0] = n,
    t[1] = s,
    t[2] = c) : c = t[2];
    let l = c, d = (0,
    Y.useRef)(null), f = ze()?.persist_conversation_to_user === !0, p;
    t[3] === Symbol.for(`react.memo_cache_sentinel`) ? (p = G({
        disableExposureLog: !0
    }),
    t[3] = p) : p = t[3];
    let m = p, h;
    t[4] === Symbol.for(`react.memo_cache_sentinel`) ? (h = q({
        disableExposureLog: !0
    }),
    t[4] = h) : h = t[4];
    let g = h, _;
    t[5] !== a || t[6] !== i || t[7] !== o ? (_ = Ve({
        messageId: i,
        contentReferenceStartIndex: a,
        shellProduct: o
    }),
    t[5] = a,
    t[6] = i,
    t[7] = o,
    t[8] = _) : _ = t[8];
    let v = _, y;
    t[9] === Symbol.for(`react.memo_cache_sentinel`) ? (y = e => {
        d.current = e
    }
    ,
    t[9] = y) : y = t[9];
    let b = y, x, S;
    t[10] !== l || t[11] !== v ? (x = () => de( () => {
        if (!(!l || !m && !g) && !Re(l, v)) {
            if (typeof IntersectionObserver > `u`) {
                Re.set(l, v, !0);
                return
            }
            return u({
                target: d.current,
                options: {
                    threshold: 0,
                    rootMargin: `0px 0px 300px 0px`
                },
                onChange: e => {
                    e && Re.set(l, v, !0)
                }
            })
        }
    }
    ),
    S = [v, l, g, m],
    t[10] = l,
    t[11] = v,
    t[12] = x,
    t[13] = S) : (x = t[12],
    S = t[13]),
    (0,
    Y.useEffect)(x, S);
    let C, w;
    return t[14] !== n || t[15] !== l || t[16] !== i || t[17] !== f || t[18] !== v || t[19] !== o ? (C = () => de( () => {
        if (!l || !m && !g || !Re(l, v))
            return;
        let e = (n ? M(n) : void 0) ?? l.serverId$() ?? l.id
          , t = !1;
        return requestAnimationFrame( () => {
            t || (g && ye({
                conversation: l,
                shellProduct: o,
                conversationId: e,
                messageId: i
            }),
            m && K({
                conversation: l,
                shellProduct: o,
                conversationId: e,
                messageId: i,
                persistConversationToUser: f
            }))
        }
        ),
        () => {
            t = !0
        }
    }
    ),
    w = [n, l, v, m, g, o, i, f],
    t[14] = n,
    t[15] = l,
    t[16] = i,
    t[17] = f,
    t[18] = v,
    t[19] = o,
    t[20] = C,
    t[21] = w) : (C = t[20],
    w = t[21]),
    (0,
    Y.useEffect)(C, w),
    b
}
function Ve({messageId: e, contentReferenceStartIndex: t, shellProduct: n}) {
    return `${e}:${t}:${J(n)}`
}
function He(e, t, n) {
    let r = e.get(t);
    return r === void 0 && (r = n(),
    e.set(t, r)),
    r
}
var Q = {
    TTFP: `products.ttfp`,
    TTLT: `products.ttlt`,
    TTF_VISIBLE_CONTENT_TOKEN: `products.ttf_visible_content_token`
}
  , Ue = {
    [Q.TTFP]: new Set,
    [Q.TTLT]: new Set,
    [Q.TTF_VISIBLE_CONTENT_TOKEN]: new Set
};
function We({profiler: e, messageId: t, metric: n, overrideDurationMs: r}) {
    Ue[n].add(t);
    let i = y();
    e.logTimingOnce(n, {
        context: {
            eval_preset: i.eval_preset
        },
        overrideDurationMs: r
    })
}
function Ge({messageId: e, metric: t}) {
    return Ue[t].has(e)
}
function Ke(e) {
    "use forget";
    let n = (0,
    X.c)(25), {conversation: r, messageId: i, products: a} = e, o;
    n[0] === i ? o = n[1] : (o = e => [U.getRequestId(e), U.isMessageTurnEnded(e, i)],
    n[0] = i,
    n[1] = o);
    let[s,c] = S(r?.id, o), l;
    n[2] === r ? l = n[3] : (l = {
        namespace: t.ProductsCompletionRequest,
        conversation: r
    },
    n[2] = r,
    n[3] = l);
    let {profiler: u, isRequestActive: d} = ne(l), f = d && !c, p = W(f), m, h;
    n[4] !== f || n[5] !== i || n[6] !== a.length || n[7] !== u ? (m = () => {
        Ge({
            messageId: i,
            metric: Q.TTFP
        }) || u && f && a.length > 0 && We({
            profiler: u,
            messageId: i,
            metric: Q.TTFP
        })
    }
    ,
    h = [f, i, a.length, u],
    n[4] = f,
    n[5] = i,
    n[6] = a.length,
    n[7] = u,
    n[8] = m,
    n[9] = h) : (m = n[8],
    h = n[9]),
    (0,
    Y.useEffect)(m, h);
    let g, _;
    n[10] !== f || n[11] !== i || n[12] !== p || n[13] !== u ? (g = () => {
        Ge({
            messageId: i,
            metric: Q.TTLT
        }) || u && p.current && !f && We({
            profiler: u,
            messageId: i,
            metric: Q.TTLT
        })
    }
    ,
    _ = [i, p, f, u],
    n[10] = f,
    n[11] = i,
    n[12] = p,
    n[13] = u,
    n[14] = g,
    n[15] = _) : (g = n[14],
    _ = n[15]),
    (0,
    Y.useEffect)(g, _);
    let v;
    n[16] !== i || n[17] !== u || n[18] !== s ? (v = () => {
        if (Ge({
            messageId: i,
            metric: Q.TTF_VISIBLE_CONTENT_TOKEN
        }))
            return;
        let e = s ? N(s) : null;
        if (u && e) {
            let t = Q.TTF_VISIBLE_CONTENT_TOKEN;
            Ue[t].add(i),
            We({
                profiler: u,
                messageId: i,
                metric: t,
                overrideDurationMs: e.completionRequest.turnTracker.first_visible_content_token_lat
            })
        }
    }
    ,
    n[16] = i,
    n[17] = u,
    n[18] = s,
    n[19] = v) : v = n[19];
    let y;
    n[20] !== i || n[21] !== a.length || n[22] !== u || n[23] !== s ? (y = [i, u, s, a.length],
    n[20] = i,
    n[21] = a.length,
    n[22] = u,
    n[23] = s,
    n[24] = y) : y = n[24],
    (0,
    Y.useEffect)(v, y)
}
R();
function qe({items: e, targetItemCount: t, onCardRender: n, onCardShown: r, onCardClicked: i, onReplyClicked: o, allowFullWidth: s=!1, cardClassName: c, showGradient: u=!0, arrowClassName: f}) {
    let p = (0,
    Y.useRef)(null)
      , m = E( () => d())
      , h = V(`2128165686`).get(`product_carousel_cards_per_view`, 3)
      , [g,_] = (0,
    Y.useState)(null)
      , v = (0,
    Y.useRef)(null)
      , y = () => {
        v.current = setTimeout( () => {
            _(null),
            v.current = null
        }
        , 200)
    }
      , b = () => {
        v.current &&= (clearTimeout(v.current),
        null)
    }
      , x = (0,
    Y.useRef)(null)
      , [S,C] = (0,
    Y.useState)({
        left: 0,
        top: 0
    });
    (0,
    Y.useEffect)( () => {
        let e = p.current
          , t = x.current;
        if (!o || !g || !e || !t)
            return;
        let n = () => {
            let n = g.card.getBoundingClientRect()
              , r = e.getBoundingClientRect()
              , i = t.getBoundingClientRect()
              , a = n.bottom - r.top + 8;
            var o = n.left - r.left;
            o = Math.max(0, o),
            o = Math.min(o, r.width - i.width),
            C({
                left: o,
                top: a
            })
        }
        ;
        return n(),
        e.addEventListener(`scroll`, n),
        () => e.removeEventListener(`scroll`, n)
    }
    , [g, e, o]);
    let w = re()
      , T = w ? 2 : Math.floor(h) + 1;
    if (t === void 0)
        t = e.length;
    else if (!t && e.length < T)
        return null;
    let D = (t ?? e.length) >= T
      , O = D && w
      , k = m || w ? `xs:basis-[calc((100%-2rem)/3)] shrink-0 basis-[calc((100%-2rem)/2)]` : Ye(h)
      , A = !w && h === 3.5 ? `w-28 bg-linear-to-l from-(--bg-primary) to-transparent` : !w && h === 4.5 ? `w-24 bg-linear-to-l from-(--bg-primary) to-transparent` : void 0;
    return (0,
    Z.jsxs)(`div`, {
        className: `relative`,
        children: [(0,
        Z.jsx)(`div`, {
            ref: p,
            className: z(`flex flex-row gap-4 py-2`, O && `mx-[-1rem] px-[1rem]`, D && `no-scrollbar snap-x snap-mandatory overflow-x-scroll scroll-smooth`),
            children: e.map( (e, a) => (0,
            Z.jsx)(`div`, {
                className: z(D || !s ? k : `min-w-0 flex-1`),
                children: (0,
                Z.jsx)($, {
                    cardClassName: z(c, m && `bg-transparent`),
                    onShown: () => r(e, a),
                    onClick: () => i(e, a),
                    onHover: t => {
                        b(),
                        t ? _({
                            card: t,
                            item: e,
                            index: a
                        }) : y()
                    }
                    ,
                    children: n(e, !w && t === 1 && s)
                })
            }, a))
        }), D && !O && (0,
        Z.jsx)(Je, {
            scrollableRef: p,
            units: e.length,
            showGradient: u,
            arrowClassName: f,
            rightOverlayClassName: A
        }), o && (0,
        Z.jsx)(`div`, {
            ref: x,
            className: z(`absolute z-10`, g ? `pointer-events-auto opacity-100` : `pointer-events-none opacity-0`, `transition-[transform,opacity] duration-200`),
            style: {
                willChange: `opacity, transform`,
                left: S.left,
                top: S.top,
                transform: g ? `translateY(0)` : `translateY(-8px)`
            },
            onMouseEnter: b,
            onMouseLeave: y,
            children: (0,
            Z.jsx)(H, {
                className: z(g ? `pointer-events-auto` : `pointer-events-none`, `border-light bg-clip-padding px-4 py-2 shadow-md`),
                size: `small`,
                color: `secondary`,
                onClick: () => g && o(g.item, g.index),
                children: (0,
                Z.jsxs)(`div`, {
                    className: `flex flex-row items-center gap-1`,
                    children: [(0,
                    Z.jsx)(a, {
                        className: `icon-sm text-token-text-secondary`
                    }), (0,
                    Z.jsx)(l, {
                        id: `9TG7OR`,
                        defaultMessage: `Ask about this`
                    })]
                })
            })
        })]
    })
}
function $({onShown: e, onClick: t, onHover: n, children: r, cardClassName: i}) {
    let a = (0,
    Y.useRef)(null)
      , o = (0,
    Y.useRef)(e);
    return (0,
    Y.useEffect)( () => {
        o.current = e
    }
    , [e]),
    (0,
    Y.useEffect)( () => {
        if (!a.current)
            return;
        let e = new IntersectionObserver( ([e]) => e.isIntersecting && o.current(),{
            threshold: .5
        });
        return e.observe(a.current),
        () => e.disconnect()
    }
    , []),
    (0,
    Z.jsx)(`div`, {
        ref: a,
        className: z(`h-full w-full`, `bg-token-bg-primary cursor-pointer`, i),
        onClick: t,
        onMouseEnter: () => a.current && n(a.current),
        onMouseLeave: () => n(null),
        children: r
    })
}
function Je({scrollableRef: e, units: t, showGradient: n, arrowClassName: r, rightOverlayClassName: i}) {
    let[a,o] = (0,
    Y.useState)({
        left: !1,
        right: !1
    })
      , [s,c] = (0,
    Y.useState)(!1);
    (0,
    Y.useEffect)( () => {
        let t = e.current;
        if (!t)
            return;
        let n = () => {
            let {scrollLeft: e, scrollWidth: n, clientWidth: r} = t
              , i = e / (n - r);
            o({
                left: i > 0,
                right: i < .99
            }),
            !s && e > 0 && c(!0)
        }
        ;
        return n(),
        t.addEventListener(`scroll`, n),
        () => t.removeEventListener(`scroll`, n)
    }
    , [e, t, s]);
    let l = t => {
        let n = e.current;
        if (!n)
            return;
        c(!0);
        let {clientWidth: r, scrollWidth: i, scrollLeft: a} = n
          , o = Math.max(0, i - r)
          , s = Math.max(0, Math.min(o, a + t * r));
        n.scrollTo({
            left: s,
            behavior: `smooth`
        })
    }
    ;
    return (0,
    Z.jsxs)(`div`, {
        className: `pointer-events-none absolute start-0 top-0 flex h-full w-full flex-row`,
        children: [i && a.right && (0,
        Z.jsx)(`div`, {
            className: z(`absolute end-0 top-0 h-full`, i)
        }), (0,
        Z.jsx)(`div`, {
            className: z(`flex h-full w-9 items-center justify-start`, s && n && `bg-linear-to-r from-(--bg-primary) to-transparent`, a.left ? `opacity-100` : `opacity-0`, `transition-opacity duration-100`),
            children: (0,
            Z.jsx)(H, {
                color: `secondary`,
                size: `small`,
                className: z(`border-token-border-default active:bg-token-bg-tertiary hover:bg-token-bg-primary h-8 w-8 translate-x-[-50%] rounded-full bg-clip-padding hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] active:opacity-100!`, r),
                onClick: () => l(-1),
                children: (0,
                Z.jsx)(b, {
                    className: `icon`
                })
            })
        }), (0,
        Z.jsx)(`div`, {
            className: z(`ms-auto flex h-full w-9 items-center justify-end`, s && n && `bg-linear-to-l from-(--bg-primary) to-transparent`, a.right ? `opacity-100` : `opacity-0`, `transition-opacity duration-200`),
            children: (0,
            Z.jsx)(H, {
                color: `secondary`,
                size: `small`,
                className: z(`border-token-border-default active:bg-token-bg-tertiary hover:bg-token-bg-primary h-8 w-8 translate-x-[50%] rounded-full bg-clip-padding hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] active:opacity-100!`, r),
                onClick: () => l(1),
                children: (0,
                Z.jsx)(O, {
                    className: `icon`
                })
            })
        })]
    })
}
function Ye(e) {
    switch (e) {
    case 3:
        return `shrink-0 snap-start basis-[calc((100%-2rem)/3)]`;
    case 3.5:
        return `shrink-0 snap-start basis-[calc((100%-3rem)/3.5)]`;
    case 4:
        return `shrink-0 snap-start basis-[calc((100%-3rem)/4)]`;
    case 4.5:
        return `shrink-0 snap-start basis-[calc((100%-4rem)/4.5)]`;
    case 5:
        return `shrink-0 snap-start basis-[calc((100%-4rem)/5)]`;
    default:
        return `shrink-0 snap-start basis-[calc((100%-2rem)/3)]`
    }
}
function Xe({items: e, targetItemCount: t, onCardRender: n, onCardShown: r, onCardClicked: i, onReplyClicked: a, allowFullWidth: o=!1, cardClassName: s, showGradient: c=!0, arrowClassName: l}) {
    let u = !re() && t === 1;
    return (0,
    Z.jsx)(`div`, {
        className: `grid grid-cols-3 gap-3`,
        children: e.map( (e, t) => (0,
        Z.jsx)($, {
            cardClassName: s,
            onShown: () => r(e, t),
            onClick: () => i(e, t),
            onHover: () => {}
            ,
            children: n(e, u)
        }, t))
    })
}
R();
var Ze = 6
  , Qe = 1
  , $e = 3;
function et(e) {
    "use forget";
    let t = (0,
    X.c)(43), {products: n, targetProductCount: r, analyticsMetadata: i, contentReferenceStartIndex: a, contentReferenceEndIndex: o, onCardRender: c, onCardShown: u, onCardClicked: d} = e, p, m;
    if (t[0] === Symbol.for(`react.memo_cache_sentinel`)) {
        let e = V(`2128165686`);
        p = e.get(`variable_image_height_enabled`, !1),
        m = e.get(`inline_grid_preview_row_count`, Qe),
        t[0] = p,
        t[1] = m
    } else
        p = t[0],
        m = t[1];
    let h = m, g = n.length === Ze ? Math.min(h, Qe) : h, _ = s(), v = g <= 0, [y,b] = (0,
    Y.useState)(v), x = f(i), S = v ? n.length : $e * (g + 1), C;
    t[2] !== S || t[3] !== n || t[4] !== y ? (C = y ? n : n.slice(0, S),
    t[2] = S,
    t[3] = n,
    t[4] = y,
    t[5] = C) : C = t[5];
    let w = C, T = !y && g > 0 && n.length > $e * g, E = r === 1, D = g > 1 ? `max-h-[572px] overflow-hidden xs:max-h-[708px] sm:max-h-[758px] md:max-h-[748px] lg:max-h-[848px]` : `max-h-[295px] overflow-hidden xs:max-h-[358px] sm:max-h-[408px] md:max-h-[398px] lg:max-h-[458px]`, O;
    t[6] === r ? O = t[7] : (O = r == null ? {} : {
        target_product_count: r
    },
    t[6] = r,
    t[7] = O);
    let k;
    t[8] !== o || t[9] !== a || t[10] !== n.length || t[11] !== O ? (k = {
        content_reference_start_index: a,
        content_reference_end_index: o,
        product_count: n.length,
        ...O
    },
    t[8] = o,
    t[9] = a,
    t[10] = n.length,
    t[11] = O,
    t[12] = k) : k = t[12];
    let A = k, j, M;
    t[13] !== A || t[14] !== T || t[15] !== x ? (j = () => {
        T && x(`Search Content Reference Show More Shown`, null, `products`, A)
    }
    ,
    M = [A, T, x],
    t[13] = A,
    t[14] = T,
    t[15] = x,
    t[16] = j,
    t[17] = M) : (j = t[16],
    M = t[17]),
    (0,
    Y.useEffect)(j, M);
    let N = T && D, P;
    t[18] === N ? P = t[19] : (P = z(`relative`, N),
    t[18] = N,
    t[19] = P);
    let F;
    t[20] !== d || t[21] !== c || t[22] !== u || t[23] !== r || t[24] !== w || t[25] !== E ? (F = p ? (0,
    Z.jsx)(rt, {
        items: w,
        getKey: nt,
        renderItem: (e, t) => (0,
        Z.jsx)($, {
            cardClassName: `h-auto`,
            onShown: () => u(e, t),
            onClick: () => d(e, t),
            onHover: tt,
            children: c(e, E, {
                useVariableImageHeight: p && t >= $e
            })
        })
    }) : (0,
    Z.jsx)(Xe, {
        items: w,
        targetItemCount: r,
        onCardRender: c,
        onCardShown: u,
        onCardClicked: d
    }),
    t[20] = d,
    t[21] = c,
    t[22] = u,
    t[23] = r,
    t[24] = w,
    t[25] = E,
    t[26] = F) : F = t[26];
    let I;
    t[27] !== A || t[28] !== T || t[29] !== x ? (I = T && (0,
    Z.jsxs)(Z.Fragment, {
        children: [(0,
        Z.jsx)(`div`, {
            className: `to-token-bg-primary pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[68px] bg-gradient-to-b from-transparent`
        }), (0,
        Z.jsx)(`div`, {
            className: `absolute inset-x-0 bottom-2 z-10 flex justify-center`,
            children: (0,
            Z.jsx)(H, {
                as: `button`,
                type: `button`,
                color: `secondary`,
                className: `h-[36px] w-full sm:w-[106px]`,
                onClick: () => {
                    x(`Search Content Reference Show More Clicked`, `search_content_reference_show_more_clicked`, `products`, A),
                    b(!0)
                }
                ,
                children: (0,
                Z.jsx)(l, {
                    id: `SeIeu5`,
                    defaultMessage: `Show more`
                })
            })
        })]
    }),
    t[27] = A,
    t[28] = T,
    t[29] = x,
    t[30] = I) : I = t[30];
    let ee;
    t[31] !== I || t[32] !== P || t[33] !== F ? (ee = (0,
    Z.jsxs)(`div`, {
        className: P,
        children: [F, I]
    }),
    t[31] = I,
    t[32] = P,
    t[33] = F,
    t[34] = ee) : ee = t[34];
    let L;
    t[35] !== A || t[36] !== _ || t[37] !== y || t[38] !== x ? (L = y && (0,
    Z.jsx)(`div`, {
        className: `mt-2 flex justify-center`,
        children: (0,
        Z.jsx)(H, {
            as: `button`,
            type: `button`,
            size: `small`,
            color: `secondary`,
            icon: te,
            iconClassName: `h-5 w-5`,
            className: `border-token-border-light h-9 w-9 p-2`,
            label: _.formatMessage({
                id: `VTbAA5`,
                defaultMessage: `Show less`
            }),
            onClick: () => {
                x(`Search Content Reference Show Less Clicked`, `search_content_reference_show_less_clicked`, `products`, A),
                b(!1)
            }
        })
    }),
    t[35] = A,
    t[36] = _,
    t[37] = y,
    t[38] = x,
    t[39] = L) : L = t[39];
    let R;
    return t[40] !== ee || t[41] !== L ? (R = (0,
    Z.jsxs)(`div`, {
        className: `py-2`,
        role: `list`,
        children: [ee, L]
    }),
    t[40] = ee,
    t[41] = L,
    t[42] = R) : R = t[42],
    R
}
function tt() {}
function nt(e, t) {
    return e.id ?? t
}
function rt(e) {
    "use forget";
    let t = (0,
    X.c)(7), {items: n, renderItem: r, getKey: i, columnCount: a} = e, o = a === void 0 ? $e : a, s;
    t[0] !== o || t[1] !== n ? (s = Array.from({
        length: o
    }, it),
    n.forEach( (e, t) => {
        s[t % o].push({
            item: e,
            index: t
        })
    }
    ),
    t[0] = o,
    t[1] = n,
    t[2] = s) : s = t[2];
    let c = s, l;
    return t[3] !== c || t[4] !== i || t[5] !== r ? (l = (0,
    Z.jsx)(`div`, {
        className: `flex gap-3`,
        children: c.map( (e, t) => (0,
        Z.jsx)(`div`, {
            className: `flex min-w-0 flex-1 flex-col gap-3`,
            children: e.map(e => {
                let {item: t, index: n} = e;
                return (0,
                Z.jsx)(`div`, {
                    children: r(t, n)
                }, i(t, n))
            }
            )
        }, t))
    }),
    t[3] = c,
    t[4] = i,
    t[5] = r,
    t[6] = l) : l = t[6],
    l
}
function it() {
    return []
}
function at(e) {
    let t = e.trim();
    return t.length > 0 ? t : null
}
function ot(e) {
    let t = e.title.trim();
    return t.length > 0 ? t : null
}
function st(e) {
    let t = {};
    e.rating != null && (t.rating = e.rating),
    e.num_reviews != null && (t.num_reviews = e.num_reviews);
    let n = (e.featured_tag ?? ``).trim();
    return n && (t.featured_tag = n),
    Object.keys(t).length > 0 ? t : null
}
function ct(e) {
    let t = at(e.id);
    if (!t)
        return null;
    let n = ot(e);
    return n ? {
        id: t,
        title: n,
        merchants: e.merchants,
        price: e.price,
        url: e.url,
        description: e.description,
        specs: st(e)
    } : null
}
function lt(e) {
    "use forget";
    let t = (0,
    X.c)(7)
      , {description: n, isLoading: r, reserveSpace: i} = e
      , a = i === void 0 ? !1 : i
      , o = !!n?.trim();
    if (!a && !r && !o)
        return null;
    let s = null;
    if (o) {
        let e;
        t[0] === n ? e = t[1] : (e = n?.trim(),
        t[0] = n,
        t[1] = e);
        let r;
        t[2] === e ? r = t[3] : (r = (0,
        Z.jsx)(`div`, {
            className: `text-token-text-secondary line-clamp-2 text-sm leading-5`,
            children: e
        }),
        t[2] = e,
        t[3] = r),
        s = r
    } else if (r) {
        let e;
        t[4] === Symbol.for(`react.memo_cache_sentinel`) ? (e = (0,
        Z.jsxs)(`div`, {
            className: `mt-0.5 flex flex-col gap-1`,
            "data-testid": `shopping-product-description-skeleton`,
            "aria-hidden": !0,
            children: [(0,
            Z.jsx)(`div`, {
                className: `loading-results-shimmer bg-token-bg-secondary h-3 w-[88%] rounded-md`
            }), (0,
            Z.jsx)(`div`, {
                className: `loading-results-shimmer bg-token-bg-secondary h-3 w-[62%] rounded-md`
            })]
        }),
        t[4] = e) : e = t[4],
        s = e
    }
    if (!a)
        return s;
    let c;
    return t[5] === s ? c = t[6] : (c = (0,
    Z.jsx)(`div`, {
        className: `mt-0.5 h-10`,
        "data-testid": `shopping-product-description-slot`,
        children: s
    }),
    t[5] = s,
    t[6] = c),
    c
}
var ut = {}
  , dt = {
    hasStoredDescriptionsOnMessageMetadata: !1,
    storedDescriptions: ut
}
  , ft = new Map
  , pt = new Map;
function mt(e) {
    return `${e.start_idx}:${e.end_idx}`
}
function ht(e, t) {
    return e?.shopping?.product_carousel_descriptions?.[t] ?? ut
}
function gt(e, t) {
    return e?.shopping?.product_carousel_descriptions?.[t] != null
}
function _t(e, t, n, r) {
    Object.keys(r).length !== 0 && T(e.id, e => {
        ie.updateTree(e, e => {
            let i = e.getNodeIfExists(t)?.message.metadata
              , a = i?.shopping ?? {}
              , o = a.product_carousel_descriptions ?? {}
              , s = ht(i, n);
            e.updateNodeMessageMetadata(t, {
                shopping: {
                    ...a,
                    product_carousel_descriptions: {
                        ...o,
                        [n]: {
                            ...s,
                            ...r
                        }
                    }
                }
            })
        }
        )
    }
    )
}
function vt(e) {
    return [e.serverThreadId, e.messageId, e.carouselKey, e.productIds.join(`,`)].join(`:`)
}
function yt(e) {
    let t = mt(e.contentReference)
      , n = e.contentReference.products.map(ct).filter(e => e != null)
      , r = n.map(e => e.id);
    return {
        carouselKey: t,
        productIds: r,
        productsToRequest: n,
        requestKey: e.serverThreadId && r.length > 0 ? vt({
            serverThreadId: e.serverThreadId,
            messageId: e.messageId,
            carouselKey: t,
            productIds: r
        }) : null
    }
}
function bt(e, t) {
    return e.every(e => t[e])
}
function xt({conversation: e, messageId: t, contentReference: r, enabled: i=!0}) {
    "use no forget";
    let[a,o] = (0,
    Y.useState)({
        requestKey: null,
        descriptions: ut
    })
      , [s,c] = (0,
    Y.useState)(null)
      , l = h()
      , u = e ? M(e.id) ?? e.id : void 0
      , {carouselKey: d, productIds: f, productsToRequest: p, requestKey: m} = yt({
        contentReference: r,
        serverThreadId: u,
        messageId: t
    })
      , {storedDescriptions: _, hasStoredDescriptionsOnMessageMetadata: v} = S(e?.id, e => {
        if (!i || !e || !t)
            return dt;
        let n = U.getTree(e).getNodeIfExists(t)?.message.metadata;
        return {
            hasStoredDescriptionsOnMessageMetadata: gt(n, d),
            storedDescriptions: ht(n, d)
        }
    }
    , {
        disablePerfDetector: !0
    })
      , y = a.requestKey === m ? a.descriptions : m ? pt.get(m) ?? ut : ut
      , b = Object.keys(_).length > 0 ? _ : y
      , x = bt(f, b)
      , C = s === m
      , w = i && !l && !v;
    return (0,
    Y.useEffect)( () => {
        if (!w || !e || !u || !t || f.length === 0 || !m || x || C)
            return;
        let r = !1
          , i = ft.get(m) ?? g.safePost(`/search/product_carousel_descriptions`, {
            requestBody: {
                conversation_id: u,
                message_id: t,
                carousel_key: d,
                products: p
            },
            authOption: n.SendIfAvailable
        }).then(e => (pt.set(m, e.descriptions),
        ft.delete(m),
        e.descriptions));
        return ft.set(m, i),
        i.then(n => {
            o({
                requestKey: m,
                descriptions: n
            }),
            c(e => e === m ? null : e),
            _t(e, t, d, n)
        }
        ).catch( () => {
            ft.delete(m),
            !r && c(m)
        }
        ),
        () => {
            r = !0
        }
    }
    , [d, e, x, C, v, l, t, p, f, b, m, u, w]),
    {
        productDescriptions: b,
        isLoading: w && !x && !C
    }
}
R(),
m( () => P( () => import(`./aa5ac567-lg3bmmkxpi9jrsxd.js`).then(e => e.BrowseProductsModal), __vite__mapDeps([0, 1, 2, 3])));
var St = 13 / 16
  , Ct = 3 / 4
  , wt = 4 / 3
  , Tt = 8e3;
function Et(e, t) {
    return {
        ...e.analytics_meta ?? {},
        product_index: t,
        product_id: e.id,
        product_event_uuid: e.product_event_uuid,
        product_title: e.title,
        product_url: e.url
    }
}
function Dt(e) {
    "use forget";
    let t = (0,
    X.c)(102), {contentReference: n, clientThreadId: i, messageId: a, turnIndex: o, isStreaming: s, analyticsMetadata: c} = e, l = n.products, u = n.target_product_count, d;
    t[0] === i ? d = t[1] : (d = i && r(i),
    t[0] = i,
    t[1] = d);
    let p = d, m;
    t[2] !== p || t[3] !== a || t[4] !== l ? (m = {
        conversation: p,
        messageId: a,
        products: l
    },
    t[2] = p,
    t[3] = a,
    t[4] = l,
    t[5] = m) : m = t[5],
    Ke(m);
    let {showDebugConversationTurns: h} = se(), g;
    t[6] === Symbol.for(`react.memo_cache_sentinel`) ? (g = x(),
    t[6] = g) : g = t[6];
    let _ = g && !!p, v = f(c), y;
    t[7] === Symbol.for(`react.memo_cache_sentinel`) ? (y = new Set,
    t[7] = y) : y = t[7];
    let b = (0,
    Y.useRef)(y), S;
    t[8] === Symbol.for(`react.memo_cache_sentinel`) ? (S = ve(),
    t[8] = S) : S = t[8];
    let T = S, E, O, k;
    if (t[9] !== l || t[10] !== u) {
        let e = V(`2128165686`);
        E = !T && l.length > 5 && e.get(`inline_grid_view_enabled`, !1),
        O = u ?? l.length,
        k = e.get(`carousel_descriptions_enabled`, !1),
        t[9] = l,
        t[10] = u,
        t[11] = E,
        t[12] = O,
        t[13] = k
    } else
        E = t[11],
        O = t[12],
        k = t[13];
    let M = k && !E && !(n.inline_carousel && l.length === 1), N = u != null && l.length >= u, P = M && (N || !s), F = M ? `translate-y-[-135%]` : `translate-y-[-85%]`, I;
    t[14] !== n || t[15] !== p || t[16] !== a || t[17] !== P ? (I = {
        conversation: p,
        messageId: a,
        contentReference: n,
        enabled: P
    },
    t[14] = n,
    t[15] = p,
    t[16] = a,
    t[17] = P,
    t[18] = I) : I = t[18];
    let {productDescriptions: te, isLoading: L} = xt(I), R = w.Products, z;
    t[19] !== n.start_idx || t[20] !== p || t[21] !== a || t[22] !== l || t[23] !== o ? (z = e => {
        if (!p)
            return;
        let t = l.indexOf(e);
        t < 0 || ue(p, e, {
            messageId: a,
            turnIndex: o,
            contentReferenceStartIndex: n.start_idx,
            productIndex: t,
            contentReferenceType: w.Products
        }, ee.CHATGPT_PRODUCT_FOLLOW_UP_INTERACTION_SURFACE_CHECKBOX)
    }
    ,
    t[19] = n.start_idx,
    t[20] = p,
    t[21] = a,
    t[22] = l,
    t[23] = o,
    t[24] = z) : z = t[24];
    let ne = z, re;
    t[25] !== i || t[26] !== n.start_idx || t[27] !== a || t[28] !== v ? (re = (e, t) => {
        v(`Search Content Reference Shown`, `search_content_reference_shown`, `products`, {
            content_reference_start_index: n.start_idx,
            ...Et(e, t)
        }),
        D({
            productInteractionEventType: ge.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN,
            clientThreadId: i,
            product: e,
            productIndex: t,
            contentReferenceType: R,
            messageId: a,
            contentReferenceStartIndex: n.start_idx
        })
    }
    ,
    t[25] = i,
    t[26] = n.start_idx,
    t[27] = a,
    t[28] = v,
    t[29] = re) : re = t[29];
    let B = re, ie;
    t[30] !== n.start_idx || t[31] !== v ? (ie = (e, t) => {
        v(`Search Content Reference Shown`, `search_content_reference_shown`, `products`, {
            content_reference_start_index: n.start_idx,
            ...Et(e, t)
        })
    }
    ,
    t[30] = n.start_idx,
    t[31] = v,
    t[32] = ie) : ie = t[32];
    let H = ie, U;
    t[33] !== i || t[34] !== n.start_idx || t[35] !== a ? (U = (e, t) => {
        D({
            productInteractionEventType: ge.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN,
            clientThreadId: i,
            product: e,
            productIndex: t,
            contentReferenceType: R,
            messageId: a,
            contentReferenceStartIndex: n.start_idx
        })
    }
    ,
    t[33] = i,
    t[34] = n.start_idx,
    t[35] = a,
    t[36] = U) : U = t[36];
    let le = U, de;
    t[37] !== i || t[38] !== n.start_idx || t[39] !== a || t[40] !== v || t[41] !== o ? (de = (e, t) => {
        v(`Search Content Reference Clicked`, `search_content_reference_clicked`, `products`, {
            content_reference_start_index: n.start_idx,
            ...Et(e, t)
        }),
        D({
            productInteractionEventType: ge.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_CLICKED,
            clientThreadId: i,
            product: e,
            productIndex: t,
            contentReferenceType: R,
            messageId: a,
            contentReferenceStartIndex: n.start_idx
        }),
        oe({
            clientThreadId: i,
            messageId: a,
            turnIndex: o,
            contentReferenceStartIndex: n.start_idx,
            surfaceLocation: pe.CHATGPT_ENGAGEMENT_SURFACE_LOCATION_RESPONSE,
            entityAffordance: j.CHATGPT_ENTITY_AFFORDANCE_PRODUCT_CARD,
            entityId: e.id,
            entityCategory: `product`,
            contentReferenceType: C(R)
        })
    }
    ,
    t[37] = i,
    t[38] = n.start_idx,
    t[39] = a,
    t[40] = v,
    t[41] = o,
    t[42] = de) : de = t[42];
    let fe = de, me;
    t[43] !== n.start_idx || t[44] !== l || t[45] !== v ? (me = (e, t) => {
        let r = `${e.id}:${t}`;
        if (b.current.has(r))
            return;
        b.current.add(r);
        let i = l.indexOf(e);
        v(`Shopping Content Reference Shown`, `chatgpt_shopping_content_reference_shown`, `product_carousel_description`, {
            content_reference_start_index: n.start_idx,
            ...e.analytics_meta ?? {},
            ...i >= 0 ? {
                product_index: i
            } : {},
            product_id: e.id,
            product_event_uuid: e.product_event_uuid,
            product_url: e.url,
            render_as: `carousel`,
            price: e.price,
            product_name: e.title,
            merchant_name: e.merchants,
            description_surface: `product_card`,
            description_length: t.length
        })
    }
    ,
    t[43] = n.start_idx,
    t[44] = l,
    t[45] = v,
    t[46] = me) : me = t[46];
    let he = me, W;
    t[47] === Symbol.for(`react.memo_cache_sentinel`) ? (W = ce(),
    t[47] = W) : W = t[47];
    let _e = W, G;
    t[48] !== i || t[49] !== n.start_idx || t[50] !== p || t[51] !== a || t[52] !== fe || t[53] !== o ? (G = (e, t) => {
        if (i)
            if (fe(e, t),
            e.offers) {
                let r = A()
                  , i = r ? _e.rooms$().get(r) : null
                  , s = {
                    type: `product`,
                    messageId: a,
                    turnIndex: o,
                    contentReferenceStartIndex: n.start_idx,
                    productIndex: t,
                    productId: e.id,
                    productUrl: e.url,
                    interactionSource: `carousel`
                };
                if (i != null)
                    _e.hasAccess && _e.openThreadSidebar$(i, s);
                else {
                    if (!p)
                        return;
                    ae(p, s)
                }
            } else
                window.open(e.url, `_blank`)
    }
    ,
    t[48] = i,
    t[49] = n.start_idx,
    t[50] = p,
    t[51] = a,
    t[52] = fe,
    t[53] = o,
    t[54] = G) : G = t[54];
    let K = G;
    if (n.inline_carousel && l.length === 1) {
        let e = l[0], r;
        t[55] !== e || t[56] !== le ? (r = () => le(e, 0),
        t[55] = e,
        t[56] = le,
        t[57] = r) : r = t[57];
        let o;
        t[58] !== e || t[59] !== H ? (o = () => H(e, 0),
        t[58] = e,
        t[59] = H,
        t[60] = o) : o = t[60];
        let s;
        t[61] !== K || t[62] !== e ? (s = () => K(e, 0),
        t[61] = K,
        t[62] = e,
        t[63] = s) : s = t[63];
        let c;
        return t[64] !== i || t[65] !== n.start_idx || t[66] !== a || t[67] !== e || t[68] !== h || t[69] !== r || t[70] !== o || t[71] !== s ? (c = (0,
        Z.jsx)(`div`, {
            className: `flex flex-col`,
            "data-testid": `shopping-widget`,
            children: (0,
            Z.jsx)(Nt, {
                product: e,
                clientThreadId: i,
                messageId: a,
                contentReferenceStartIndex: n.start_idx,
                showDebug: h,
                onShown: r,
                onVisible: o,
                onClicked: s
            })
        }),
        t[64] = i,
        t[65] = n.start_idx,
        t[66] = a,
        t[67] = e,
        t[68] = h,
        t[69] = r,
        t[70] = o,
        t[71] = s,
        t[72] = c) : c = t[72],
        c
    }
    let q;
    t[73] !== c || t[74] !== F || t[75] !== i || t[76] !== n.end_idx || t[77] !== n.start_idx || t[78] !== p || t[79] !== K || t[80] !== N || t[81] !== E || t[82] !== L || t[83] !== _ || t[84] !== a || t[85] !== te || t[86] !== l || t[87] !== O || t[88] !== M || t[89] !== h || t[90] !== u || t[91] !== ne || t[92] !== B || t[93] !== he ? (q = E ? (0,
    Z.jsx)(et, {
        products: l,
        targetProductCount: u,
        analyticsMetadata: c,
        contentReferenceStartIndex: n.start_idx,
        contentReferenceEndIndex: n.end_idx,
        onCardRender: (e, t, r) => (0,
        Z.jsx)(Ot, {
            product: e,
            clientThreadId: i,
            messageId: a,
            contentReferenceStartIndex: n.start_idx,
            wide: t,
            showDebug: h,
            isSelectionEnabled: _,
            conversation: p,
            onToggleSelection: () => ne(e),
            useVariableImageHeight: r?.useVariableImageHeight
        }),
        onCardShown: B,
        onCardClicked: K
    }) : (0,
    Z.jsx)(qe, {
        items: l,
        targetItemCount: u,
        onCardRender: (e, t) => {
            let r = at(e.id)
              , o = r ? te[r] : void 0;
            return (0,
            Z.jsx)(Ot, {
                product: e,
                clientThreadId: i,
                messageId: a,
                contentReferenceStartIndex: n.start_idx,
                wide: t,
                showDebug: h,
                isSelectionEnabled: _,
                conversation: p,
                onToggleSelection: () => ne(e),
                description: M ? o : void 0,
                isDescriptionLoading: M && (!N || L) && r != null && !o,
                isDescriptionCardLayoutEnabled: M,
                onDescriptionShown: t => he(e, t)
            })
        }
        ,
        onCardShown: B,
        onCardClicked: K,
        arrowClassName: F,
        allowFullWidth: O > 2,
        showGradient: !1,
        cardClassName: `group`
    }),
    t[73] = c,
    t[74] = F,
    t[75] = i,
    t[76] = n.end_idx,
    t[77] = n.start_idx,
    t[78] = p,
    t[79] = K,
    t[80] = N,
    t[81] = E,
    t[82] = L,
    t[83] = _,
    t[84] = a,
    t[85] = te,
    t[86] = l,
    t[87] = O,
    t[88] = M,
    t[89] = h,
    t[90] = u,
    t[91] = ne,
    t[92] = B,
    t[93] = he,
    t[94] = q) : q = t[94];
    let J;
    t[95] !== i || t[96] !== a || t[97] !== h ? (J = !1,
    t[95] = i,
    t[96] = a,
    t[97] = h,
    t[98] = J) : J = t[98];
    let ye;
    return t[99] !== q || t[100] !== J ? (ye = (0,
    Z.jsxs)(`div`, {
        className: `flex flex-col`,
        "data-testid": `products-widget`,
        children: [q, J]
    }),
    t[99] = q,
    t[100] = J,
    t[101] = ye) : ye = t[101],
    ye
}
function Ot(e) {
    "use forget";
    let t = (0,
    X.c)(23), {product: n, clientThreadId: r, messageId: i, contentReferenceStartIndex: a, wide: o, showDebug: s, isSelectionEnabled: c, conversation: l, onToggleSelection: u, useVariableImageHeight: d, description: f, isDescriptionLoading: p, isDescriptionCardLayoutEnabled: m, onDescriptionShown: h} = e, g = d === void 0 ? !1 : d, _ = p === void 0 ? !1 : p, v = m === void 0 ? !1 : m, y;
    t[0] !== r || t[1] !== a || t[2] !== i || t[3] !== n ? (y = {
        clientThreadId: r,
        messageId: i,
        contentReferenceStartIndex: a,
        shellProduct: n
    },
    t[0] = r,
    t[1] = a,
    t[2] = i,
    t[3] = n,
    t[4] = y) : y = t[4];
    let b = Be(y), x;
    t[5] !== l || t[6] !== c || t[7] !== u || t[8] !== n.id ? (x = () => xe({
        conversation: l,
        productId: n.id,
        isSelectionEnabled: c,
        onToggleSelection: u
    }),
    t[5] = l,
    t[6] = c,
    t[7] = u,
    t[8] = n.id,
    t[9] = x) : x = t[9];
    let S = E(x), C;
    t[10] !== f || t[11] !== v || t[12] !== _ || t[13] !== h || t[14] !== n || t[15] !== S || t[16] !== s || t[17] !== g || t[18] !== o ? (C = (0,
    Z.jsx)(kt, {
        product: n,
        wide: o,
        showDebug: s,
        useVariableImageHeight: g,
        selection: S,
        description: f,
        isDescriptionLoading: _,
        isDescriptionCardLayoutEnabled: v,
        onDescriptionShown: h
    }),
    t[10] = f,
    t[11] = v,
    t[12] = _,
    t[13] = h,
    t[14] = n,
    t[15] = S,
    t[16] = s,
    t[17] = g,
    t[18] = o,
    t[19] = C) : C = t[19];
    let w;
    return t[20] !== b || t[21] !== C ? (w = (0,
    Z.jsx)(`div`, {
        ref: b,
        className: `group h-full`,
        children: C
    }),
    t[20] = b,
    t[21] = C,
    t[22] = w) : w = t[22],
    w
}
function kt(e) {
    "use forget";
    let t = (0,
    X.c)(14), {product: n, wide: r, showDebug: i, useVariableImageHeight: a, selection: o, showPrice: s, showMerchants: c, underlineTitle: l, description: u, isDescriptionLoading: d, isDescriptionCardLayoutEnabled: f, animateDescriptionLayout: p, onDescriptionShown: m} = e, h = i === void 0 ? !1 : i, g = a === void 0 ? !1 : a, _ = s === void 0 ? !0 : s, v = c === void 0 ? !0 : c, y = l === void 0 ? !1 : l, b = d === void 0 ? !1 : d, x = f === void 0 ? !1 : f, S = p === void 0 ? !1 : p, C;
    return t[0] !== S || t[1] !== u || t[2] !== x || t[3] !== b || t[4] !== m || t[5] !== n || t[6] !== o || t[7] !== h || t[8] !== v || t[9] !== _ || t[10] !== y || t[11] !== g || t[12] !== r ? (C = (0,
    Z.jsx)(At, {
        product: n,
        wide: r,
        showDebug: h,
        useVariableImageHeight: g,
        selection: o,
        showPrice: _,
        showMerchants: v,
        underlineTitle: y,
        description: u,
        isDescriptionLoading: b,
        isDescriptionCardLayoutEnabled: x,
        animateDescriptionLayout: S,
        onDescriptionShown: m
    }),
    t[0] = S,
    t[1] = u,
    t[2] = x,
    t[3] = b,
    t[4] = m,
    t[5] = n,
    t[6] = o,
    t[7] = h,
    t[8] = v,
    t[9] = _,
    t[10] = y,
    t[11] = g,
    t[12] = r,
    t[13] = C) : C = t[13],
    C
}
function At(e) {
    "use forget";
    let t = (0,
    X.c)(84), {product: n, wide: r, showDebug: i, useVariableImageHeight: a, selection: o, showPrice: s, showMerchants: c, underlineTitle: l, description: u, isDescriptionLoading: d, isDescriptionCardLayoutEnabled: f, animateDescriptionLayout: p, useContainedImageHover: m, forceImageDarkenBlend: h, initialVariableImageHeight: g, onImageLoadStateChange: _, onDescriptionShown: v} = e, y = i === void 0 ? !1 : i, b = a === void 0 ? !1 : a, x = s === void 0 ? !0 : s, S = c === void 0 ? !0 : c, C = l === void 0 ? !1 : l, w = d === void 0 ? !1 : d, T = f === void 0 ? !1 : f, E = p === void 0 ? !1 : p, D = m === void 0 ? !1 : m, O = h === void 0 ? !1 : h, k = n.image_urls ? n.image_urls[0] : void 0, A = x && !!n.price, j = S && !T && !!n.merchants, M = A && T && !j, N;
    t[0] === u ? N = t[1] : (N = u?.trim(),
    t[0] = u,
    t[1] = N);
    let P = N, F = !!P, I = T && E, [ee,te] = (0,
    Y.useState)(`contain`), [L,R] = (0,
    Y.useState)(`top`), [ne,re] = (0,
    Y.useState)(St), [B,ie] = (0,
    Y.useState)(k ? `pending` : `loaded`), ae = Pe(), oe = (0,
    Y.useRef)(k), V = (0,
    Y.useRef)(null), H = !r && b, U = r ? `product_square` : `product_portrait_card`, se = H ? null : De(n, U, ae), ce;
    t[2] !== ae || t[3] !== n ? (ce = Oe(n, ae),
    t[2] = ae,
    t[3] = n,
    t[4] = ce) : ce = t[4];
    let le = ce, ue = O ? `mix-blend-darken` : se ? ke(se) : `mix-blend-darken`, de = (0,
    Y.useRef)(null), fe, pe;
    t[5] === k ? (fe = t[6],
    pe = t[7]) : (fe = () => {
        oe.current !== k && (oe.current = k,
        re(St),
        te(`contain`),
        R(`top`),
        ie(k ? `pending` : `loaded`))
    }
    ,
    pe = [k],
    t[5] = k,
    t[6] = fe,
    t[7] = pe),
    (0,
    Y.useEffect)(fe, pe);
    let ge, W;
    t[8] !== B || t[9] !== _ ? (ge = () => {
        _?.(B !== `pending`)
    }
    ,
    W = [B, _],
    t[8] = B,
    t[9] = _,
    t[10] = ge,
    t[11] = W) : (ge = t[10],
    W = t[11]),
    (0,
    Y.useEffect)(ge, W);
    let G, K;
    t[12] !== B || t[13] !== k ? (G = () => {
        if (!k || B !== `pending`) {
            V.current != null && (clearTimeout(V.current),
            V.current = null);
            return
        }
        return V.current != null && clearTimeout(V.current),
        V.current = setTimeout( () => {
            V.current = null,
            ie(jt)
        }
        , Tt),
        () => {
            V.current != null && (clearTimeout(V.current),
            V.current = null)
        }
    }
    ,
    K = [B, k],
    t[12] = B,
    t[13] = k,
    t[14] = G,
    t[15] = K) : (G = t[14],
    K = t[15]),
    (0,
    Y.useEffect)(G, K);
    let q, ve;
    t[16] !== T || t[17] !== P || t[18] !== v || t[19] !== n.id ? (q = () => {
        if (!T || !P)
            return;
        let e = `${n.id}:${P}`;
        de.current !== e && (de.current = e,
        v?.(P))
    }
    ,
    ve = [T, P, v, n.id],
    t[16] = T,
    t[17] = P,
    t[18] = v,
    t[19] = n.id,
    t[20] = q,
    t[21] = ve) : (q = t[20],
    ve = t[21]),
    (0,
    Y.useEffect)(q, ve);
    let J;
    t[22] !== A || t[23] !== w || t[24] !== P || t[25] !== n.price || t[26] !== M || t[27] !== F ? (J = F ? (0,
    Z.jsxs)(`div`, {
        className: `line-clamp-4 leading-5 md:line-clamp-3`,
        children: [A ? (0,
        Z.jsx)(`span`, {
            children: n.price
        }) : null, M ? (0,
        Z.jsx)(`span`, {
            className: `mx-0.5`,
            children: `•`
        }) : null, (0,
        Z.jsx)(`span`, {
            children: P
        })]
    }) : w ? (0,
    Z.jsxs)(`div`, {
        className: `flex flex-col gap-1`,
        "data-testid": `shopping-product-description-skeleton`,
        "aria-hidden": !0,
        children: [(0,
        Z.jsxs)(`div`, {
            className: `flex flex-row items-start gap-0.25`,
            children: [A && (0,
            Z.jsx)(`div`, {
                className: `shrink-0`,
                children: n.price
            }), M ? (0,
            Z.jsx)(`div`, {
                className: `mx-0.5 shrink-0`,
                children: `•`
            }) : null, (0,
            Z.jsx)(`div`, {
                className: `flex min-w-0 flex-1 pt-1`,
                children: (0,
                Z.jsx)(`div`, {
                    className: `loading-results-shimmer bg-token-bg-secondary h-3 w-full rounded-md`
                })
            })]
        }), (0,
        Z.jsx)(`div`, {
            className: `loading-results-shimmer bg-token-bg-secondary h-3 w-full rounded-md`
        })]
    }) : (0,
    Z.jsx)(`div`, {
        className: `leading-5`,
        children: A ? (0,
        Z.jsx)(`span`, {
            children: n.price
        }) : null
    }),
    t[22] = A,
    t[23] = w,
    t[24] = P,
    t[25] = n.price,
    t[26] = M,
    t[27] = F,
    t[28] = J) : J = t[28];
    let ye = J, be = Math.min(Math.max(ne, Ct), wt), xe;
    t[29] === H ? xe = t[30] : (xe = e => {
        let {naturalWidth: t, naturalHeight: n} = e;
        if (t <= 0 || n <= 0)
            return;
        let r = t / n;
        if (ie(`loaded`),
        H) {
            re(r);
            return
        }
        te(Math.abs(r - 1) < .4 ? `cover` : `contain`),
        R(n > t ? `top` : `center`)
    }
    ,
    t[29] = H,
    t[30] = xe);
    let Ce = xe, we;
    t[31] === Symbol.for(`react.memo_cache_sentinel`) ? (we = () => {
        ie(`failed`)
    }
    ,
    t[31] = we) : we = t[31];
    let Te = we, Ee = H ? k && B === `pending` && g != null ? {
        height: `${g}px`
    } : {
        aspectRatio: `${be}`
    } : se ? le : void 0, Ae = k && B !== `failed` ? se ? (0,
    Z.jsx)(Me, {
        product: n,
        slotKey: U,
        alt: n.title,
        imageUrl: k,
        ignoreShowcaseMetadata: ae,
        className: z(ue, D && `transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none`),
        onLoad: e => Ce(e.currentTarget),
        onError: Te
    }) : (0,
    Z.jsx)(`img`, {
        className: z(H ? `m-0 block h-full w-full object-contain` : `absolute inset-0 m-0 h-full w-full object-${ee} object-${L}`, ue, D && `transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none`),
        src: k,
        alt: n.title,
        onLoad: e => Ce(e.currentTarget),
        onError: Te
    }) : (0,
    Z.jsx)(`div`, {
        className: `flex aspect-square items-center justify-center`,
        children: (0,
        Z.jsx)(me, {
            className: `text-token-text-tertiary h-12 w-12`
        })
    }), je = D ? (0,
    Z.jsx)(`div`, {
        className: `h-full w-full overflow-hidden`,
        children: Ae
    }) : (0,
    Z.jsx)(he, {
        className: z(`h-full w-full`, ue),
        children: Ae
    }), Ne = r ? `flex-row gap-3` : `flex-col gap-2`, Fe;
    t[32] === Ne ? Fe = t[33] : (Fe = z(`flex pb-2`, Ne),
    t[32] = Ne,
    t[33] = Fe);
    let Ie = H ? `shopping-product-variable-image-frame-${n.id}` : void 0, Le = r ? `aspect-square w-1/4` : H ? `w-full` : `aspect-[13/16] w-full`, Re = H && !k && `aspect-[16/9]`, ze;
    t[34] !== Le || t[35] !== Re ? (ze = z(`relative`, Le, Re, `overflow-clip rounded-xl bg-[#F3F3F3] dark:bg-[#F3F3F3]`),
    t[34] = Le,
    t[35] = Re,
    t[36] = ze) : ze = t[36];
    let Be;
    t[37] !== je || t[38] !== H ? (Be = H ? (0,
    Z.jsx)(`div`, {
        className: `absolute inset-0`,
        children: je
    }) : je,
    t[37] = je,
    t[38] = H,
    t[39] = Be) : Be = t[39];
    let Ve;
    t[40] === o ? Ve = t[41] : (Ve = o && (0,
    Z.jsx)(Se, {
        selection: o
    }),
    t[40] = o,
    t[41] = Ve);
    let He;
    t[42] !== Ee || t[43] !== Ie || t[44] !== ze || t[45] !== Be || t[46] !== Ve ? (He = (0,
    Z.jsxs)(`div`, {
        "data-testid": Ie,
        className: ze,
        style: Ee,
        children: [Be, Ve]
    }),
    t[42] = Ee,
    t[43] = Ie,
    t[44] = ze,
    t[45] = Be,
    t[46] = Ve,
    t[47] = He) : He = t[47];
    let Q = `shopping-product-metadata-${n.id}`, Ue = r ? `text-base` : `text-sm`, We;
    t[48] === Ue ? We = t[49] : (We = z(`line-clamp-2 font-medium text-ellipsis`, Ue),
    t[48] = Ue,
    t[49] = We);
    let Ge = C && `entity-underline hover:entity-accent`, Ke;
    t[50] === Ge ? Ke = t[51] : (Ke = z(Ge),
    t[50] = Ge,
    t[51] = Ke);
    let qe;
    t[52] !== n.title || t[53] !== Ke ? (qe = (0,
    Z.jsx)(`span`, {
        className: Ke,
        children: n.title
    }),
    t[52] = n.title,
    t[53] = Ke,
    t[54] = qe) : qe = t[54];
    let $;
    t[55] !== We || t[56] !== qe ? ($ = (0,
    Z.jsx)(`div`, {
        className: We,
        children: qe
    }),
    t[55] = We,
    t[56] = qe,
    t[57] = $) : $ = t[57];
    let Je;
    t[58] !== u || t[59] !== ye || t[60] !== j || t[61] !== A || t[62] !== T || t[63] !== w || t[64] !== n.merchants || t[65] !== n.price || t[66] !== I || t[67] !== F ? (Je = T ? (0,
    Z.jsx)(`div`, {
        className: z(`text-token-text-secondary flex flex-col text-sm`, I && `min-h-[3.75rem]`),
        children: (0,
        Z.jsx)(`div`, {
            className: z(I && `overflow-hidden transition-[max-height] duration-200 ease-out motion-reduce:transition-none`, I && (F || w ? `max-h-[5rem]` : `max-h-5`)),
            children: (0,
            Z.jsx)(`div`, {
                className: z(I && `transition-opacity duration-200 ease-out motion-reduce:transition-none`, I && w && `opacity-80`),
                children: ye
            })
        })
    }) : (0,
    Z.jsxs)(Z.Fragment, {
        children: [(A || j) && (0,
        Z.jsxs)(`div`, {
            className: `text-token-text-secondary flex flex-row gap-0.25 text-sm`,
            children: [A && (0,
            Z.jsx)(`div`, {
                children: n.price
            }), A && j && (0,
            Z.jsx)(`div`, {
                className: `mx-0.5`,
                children: `•`
            }), j && (0,
            Z.jsx)(`div`, {
                className: `w-0 flex-1 truncate`,
                children: n.merchants
            })]
        }), (0,
        Z.jsx)(lt, {
            description: u,
            isLoading: w
        })]
    }),
    t[58] = u,
    t[59] = ye,
    t[60] = j,
    t[61] = A,
    t[62] = T,
    t[63] = w,
    t[64] = n.merchants,
    t[65] = n.price,
    t[66] = I,
    t[67] = F,
    t[68] = Je) : Je = t[68];
    let Ye;
    t[69] === n ? Ye = t[70] : (Ye = (0,
    Z.jsx)(_e, {
        product: n,
        wrapperClass: `text-token-text-secondary text-sm flex flex-row items-center gap-0.5`,
        includeMidDelimiter: !0,
        iconSize: `small`
    }),
    t[69] = n,
    t[70] = Ye);
    let Xe;
    t[71] !== n || t[72] !== y ? (Xe = !1,
    t[71] = n,
    t[72] = y,
    t[73] = Xe) : Xe = t[73];
    let Ze;
    t[74] !== Q || t[75] !== $ || t[76] !== Je || t[77] !== Ye || t[78] !== Xe ? (Ze = (0,
    Z.jsxs)(`div`, {
        className: `flex flex-col gap-1 px-1`,
        "data-shopping-browse-product-metadata": !0,
        "data-testid": Q,
        children: [$, Je, Ye, Xe]
    }),
    t[74] = Q,
    t[75] = $,
    t[76] = Je,
    t[77] = Ye,
    t[78] = Xe,
    t[79] = Ze) : Ze = t[79];
    let Qe;
    return t[80] !== Fe || t[81] !== He || t[82] !== Ze ? (Qe = (0,
    Z.jsxs)(`div`, {
        className: Fe,
        children: [He, Ze]
    }),
    t[80] = Fe,
    t[81] = He,
    t[82] = Ze,
    t[83] = Qe) : Qe = t[83],
    Qe
}
function jt(e) {
    return e === `pending` ? `failed` : e
}
function Mt(e) {
    "use forget";
    let t = (0,
    X.c)(13), {className: n, product: r, imageUrl: i, productTitle: a, onClicked: o} = e, [s,c] = (0,
    Y.useState)(`contain`), l = Pe(), u = (0,
    Y.useRef)(null), d;
    if (t[0] !== n || t[1] !== s || t[2] !== l || t[3] !== i || t[4] !== o || t[5] !== r || t[6] !== a) {
        let e = i === r.image_urls?.[0] ? De(r, `product_square`, l) : null, f;
        t[8] !== l || t[9] !== r ? (f = Oe(r, l),
        t[8] = l,
        t[9] = r,
        t[10] = f) : f = t[10];
        let p = f, m = ke(e), h;
        t[11] === n ? h = t[12] : (h = z(n, `hover:scale-[1.005]`, `dark:bg-token-text-inverted bg-token-bg-primary`, `cursor-pointer overflow-hidden rounded-xl shadow-inner transition-all duration-200`, `relative aspect-square max-h-60`),
        t[11] = n,
        t[12] = h),
        d = (0,
        Z.jsx)(`div`, {
            className: h,
            onClick: o,
            style: e ? p : void 0,
            children: i ? e ? (0,
            Z.jsx)(Me, {
                product: r,
                slotKey: `product_square`,
                alt: a,
                imageUrl: i,
                ignoreShowcaseMetadata: l,
                className: z(`h-full w-full overflow-hidden`, m)
            }) : (0,
            Z.jsx)(`img`, {
                ref: u,
                className: `m-0 h-full w-full overflow-hidden object-${s} mix-blend-darken`,
                src: i,
                alt: a,
                onLoad: () => {
                    if (!u.current)
                        return;
                    let {naturalWidth: e, naturalHeight: t} = u.current
                      , n = e / t;
                    c(Math.abs(n - 1) < .5 ? `cover` : `contain`)
                }
            }) : (0,
            Z.jsx)(`div`, {
                className: `flex aspect-square items-center justify-center`,
                children: (0,
                Z.jsx)(me, {
                    className: `text-token-text-tertiary h-12 w-12`
                })
            })
        }),
        t[0] = n,
        t[1] = s,
        t[2] = l,
        t[3] = i,
        t[4] = o,
        t[5] = r,
        t[6] = a,
        t[7] = d
    } else
        d = t[7];
    return d
}
function Nt(e) {
    "use forget";
    let t = (0,
    X.c)(26), {product: n, clientThreadId: r, messageId: i, contentReferenceStartIndex: a, showDebug: o, onShown: s, onVisible: c, onClicked: l} = e, u = o === void 0 ? !1 : o, d;
    t[0] !== r || t[1] !== a || t[2] !== i || t[3] !== n ? (d = {
        clientThreadId: r,
        messageId: i,
        contentReferenceStartIndex: a,
        shellProduct: n
    },
    t[0] = r,
    t[1] = a,
    t[2] = i,
    t[3] = n,
    t[4] = d) : d = t[4];
    let f = Be(d), p = `${i}:${a}:${n.id}`, m;
    t[5] !== c || t[6] !== p ? (m = {
        onShown: c,
        resetKey: p
    },
    t[5] = c,
    t[6] = p,
    t[7] = m) : m = t[7];
    let h = Ie(m), g, _;
    t[8] === s ? (g = t[9],
    _ = t[10]) : (g = () => {
        s()
    }
    ,
    _ = [s],
    t[8] = s,
    t[9] = g,
    t[10] = _),
    (0,
    Y.useEffect)(g, _);
    let v;
    t[11] !== f || t[12] !== h ? (v = e => {
        f(e),
        h(e)
    }
    ,
    t[11] = f,
    t[12] = h,
    t[13] = v) : v = t[13];
    let y = v, b;
    t[14] !== l || t[15] !== n ? (b = n.image_urls && n.image_urls.length > 0 && n.image_urls.slice(0, 3).map(e => (0,
    Z.jsx)(Mt, {
        product: n,
        imageUrl: e,
        productTitle: n.title,
        onClicked: l
    }, e)),
    t[14] = l,
    t[15] = n,
    t[16] = b) : b = t[16];
    let x;
    t[17] === b ? x = t[18] : (x = (0,
    Z.jsx)(`div`, {
        className: `flex flex-row gap-2 py-2`,
        children: b
    }),
    t[17] = b,
    t[18] = x);
    let S;
    t[19] !== n || t[20] !== u ? (S = !1,
    t[19] = n,
    t[20] = u,
    t[21] = S) : S = t[21];
    let C;
    return t[22] !== y || t[23] !== S || t[24] !== x ? (C = (0,
    Z.jsxs)(`div`, {
        ref: y,
        children: [x, S]
    }),
    t[22] = y,
    t[23] = S,
    t[24] = x,
    t[25] = C) : C = t[25],
    C
}
export {qe as a, Ie as c, Oe as d, ke as f, xe as h, ot as i, Pe as l, Se as m, Dt as n, Ke as o, De as p, ct as r, Be as s, At as t, Me as u};
//# sourceMappingURL=0a3e27b8-i59ebqnekv4u1rbq.js.map
