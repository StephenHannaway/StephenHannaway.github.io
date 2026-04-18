"use strict";
const RAIL = '#2e4028';
const BALL = '#9bc960';
const DECO = '#c8813a';
const BG = '#1a1f18';
const NS = 'http://www.w3.org/2000/svg';
const MIN_VIEWPORT = 960;
const MIN_GUTTER = 60;
const SPEED = 90;
// ── Primitives ──────────────────────────────────────────────────────────
function svgEl(tag) {
    return document.createElementNS(NS, tag);
}
function aln(p, x1, y1, x2, y2, stroke = RAIL, w = 1.5) {
    const e = svgEl('line');
    e.setAttribute('x1', String(x1));
    e.setAttribute('y1', String(y1));
    e.setAttribute('x2', String(x2));
    e.setAttribute('y2', String(y2));
    e.setAttribute('stroke', stroke);
    e.setAttribute('stroke-width', String(w));
    p.appendChild(e);
}
function acir(p, cx, cy, r, fill, stroke, sw = 1) {
    const e = svgEl('circle');
    e.setAttribute('cx', String(cx));
    e.setAttribute('cy', String(cy));
    e.setAttribute('r', String(r));
    e.setAttribute('fill', fill);
    if (stroke) {
        e.setAttribute('stroke', stroke);
        e.setAttribute('stroke-width', String(sw));
    }
    p.appendChild(e);
}
function apth(p, d, fill, stroke, sw = 1) {
    const e = svgEl('path');
    e.setAttribute('d', d);
    e.setAttribute('fill', fill);
    if (stroke) {
        e.setAttribute('stroke', stroke);
        e.setAttribute('stroke-width', String(sw));
    }
    p.appendChild(e);
}
// ── Gear ────────────────────────────────────────────────────────────────
function gearPath(cx, cy, r, R, n) {
    const step = (Math.PI * 2) / n;
    const tooth = step * 0.28;
    let d = '';
    for (let i = 0; i < n; i++) {
        const a = i * step - Math.PI / 2;
        const pts = [
            [cx + r * Math.cos(a), cy + r * Math.sin(a)],
            [cx + r * Math.cos(a + tooth), cy + r * Math.sin(a + tooth)],
            [cx + R * Math.cos(a + tooth), cy + R * Math.sin(a + tooth)],
            [cx + R * Math.cos(a + step - tooth), cy + R * Math.sin(a + step - tooth)],
            [cx + r * Math.cos(a + step - tooth), cy + r * Math.sin(a + step - tooth)],
        ];
        d += (i === 0 ? `M ${pts[0].join(' ')}` : ` L ${pts[0].join(' ')}`);
        for (const pt of pts.slice(1))
            d += ` L ${pt.join(' ')}`;
    }
    return d + ' Z';
}
function drawGear(parent, cx, cy, r, R, teeth, dur, cw = true) {
    const g = svgEl('g');
    apth(g, gearPath(cx, cy, r, R, teeth), 'none', DECO, 1);
    acir(g, cx, cy, r * 0.42, BG, DECO, 1);
    acir(g, cx, cy, 2, DECO);
    const a = svgEl('animateTransform');
    a.setAttribute('attributeName', 'transform');
    a.setAttribute('type', 'rotate');
    a.setAttribute('from', `0 ${cx} ${cy}`);
    a.setAttribute('to', `${cw ? 360 : -360} ${cx} ${cy}`);
    a.setAttribute('dur', `${dur}s`);
    a.setAttribute('repeatCount', 'indefinite');
    g.appendChild(a);
    parent.appendChild(g);
}
function drawGearPair(parent, x, y, onLeft) {
    const offset = 13;
    drawGear(parent, x, y - offset, 7, 11, 8, 3.4, !onLeft);
    drawGear(parent, x, y + offset, 7, 11, 8, 3.4, onLeft);
    aln(parent, x - 3, y - offset, x - 3, y + offset, DECO, 1);
    aln(parent, x + 3, y - offset, x + 3, y + offset, DECO, 1);
}
// ── Pulsing dot ──────────────────────────────────────────────────────────
function drawPulsingDot(parent, x, y, arrivalT, cycleDur) {
    const t1 = +(0.35 / cycleDur).toFixed(6);
    const t2 = +(0.70 / cycleDur).toFixed(6);
    function pulseAnim(target, from, to) {
        const a = svgEl('animate');
        a.setAttribute('attributeName', 'r');
        a.setAttribute('values', `${from}; ${to}; ${from}; ${from}`);
        a.setAttribute('keyTimes', `0; ${t1}; ${t2}; 1`);
        a.setAttribute('dur', `${cycleDur}s`);
        a.setAttribute('begin', `${arrivalT}s`);
        a.setAttribute('repeatCount', 'indefinite');
        a.setAttribute('calcMode', 'spline');
        a.setAttribute('keySplines', '0.2 0 0.1 1; 0.3 0 0.7 1; 0 0 1 1');
        target.appendChild(a);
    }
    const outer = svgEl('circle');
    outer.setAttribute('cx', String(x));
    outer.setAttribute('cy', String(y));
    outer.setAttribute('r', '6');
    outer.setAttribute('fill', 'none');
    outer.setAttribute('stroke', DECO);
    outer.setAttribute('stroke-width', '1');
    pulseAnim(outer, 6, 10);
    parent.appendChild(outer);
    const inner = svgEl('circle');
    inner.setAttribute('cx', String(x));
    inner.setAttribute('cy', String(y));
    inner.setAttribute('r', '2.5');
    inner.setAttribute('fill', DECO);
    pulseAnim(inner, 2.5, 4.5);
    parent.appendChild(inner);
}
// ── Ball path and timing ─────────────────────────────────────────────────
function buildBallPath(lx, rx, crossings, H) {
    const C = 20;
    let d = `M ${lx} 0`;
    let left = true;
    for (const y of crossings) {
        const fx = left ? lx : rx, tx = left ? rx : lx, dir = left ? 1 : -1;
        d += ` L ${fx} ${y - C} Q ${fx} ${y} ${fx + dir * C} ${y} L ${tx - dir * C} ${y} Q ${tx} ${y} ${tx} ${y + C}`;
        left = !left;
    }
    d += ` L ${left ? lx : rx} ${H}`;
    return d;
}
function findArrivalTime(track, targetY) {
    let lo = 0, hi = track.getTotalLength();
    for (let i = 0; i < 60; i++) {
        const mid = (lo + hi) / 2;
        if (track.getPointAtLength(mid).y < targetY)
            lo = mid;
        else
            hi = mid;
    }
    return ((lo + hi) / 2) / SPEED;
}
// ── Main ─────────────────────────────────────────────────────────────────
function drawMachine(svg) {
    const W = document.documentElement.scrollWidth;
    const H = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    svg.style.height = `${H}px`;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';
    const container = document.querySelector('.container');
    if (!container)
        return;
    const rect = container.getBoundingClientRect();
    if (rect.left < MIN_GUTTER)
        return;
    const lx = rect.left / 2;
    const rx = rect.right + (W - rect.right) / 2;
    const defs = svgEl('defs');
    defs.innerHTML = `<filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`;
    svg.appendChild(defs);
    const sections = Array.from(document.querySelectorAll('section'));
    const crossings = sections.slice(0, -1).map(s => s.getBoundingClientRect().bottom + window.scrollY + 14);
    // Draw only the rail segments the ball actually traverses
    let onLeft = true;
    let segStart = 0;
    for (const y of crossings) {
        aln(svg, onLeft ? lx : rx, segStart, onLeft ? lx : rx, y, RAIL);
        segStart = y;
        onLeft = !onLeft;
    }
    aln(svg, onLeft ? lx : rx, segStart, onLeft ? lx : rx, H, RAIL);
    // Build track first so we can binary-search arrival times
    const track = svgEl('path');
    track.id = 'track';
    track.setAttribute('d', buildBallPath(lx, rx, crossings, H));
    track.setAttribute('fill', 'none');
    track.setAttribute('stroke', 'none');
    svg.appendChild(track);
    const cycleDur = track.getTotalLength() / SPEED;
    // Sequences with different lengths so they go out of phase — avoids all gears on one side
    const DEPART_SEQ = ['ramp', 'gears', 'gears', 'ramp', 'ramp', 'gears'];
    const ARRIVE_SEQ = ['gear', 'dot', 'gear', 'gear', 'dot', 'gear'];
    let fromLeft = true;
    crossings.forEach((y, i) => {
        const fx = fromLeft ? lx : rx;
        const tx = fromLeft ? rx : lx;
        const dir = fromLeft ? 1 : -1;
        const depT = findArrivalTime(track, y);
        const dotT = depT + (Math.abs(tx - fx) + 22) / SPEED;
        aln(svg, fx, y, tx, y, RAIL);
        const depart = DEPART_SEQ[i % DEPART_SEQ.length];
        const arrive = ARRIVE_SEQ[i % ARRIVE_SEQ.length];
        if (depart === 'ramp') {
            acir(svg, fx, y, 3.5, DECO);
            apth(svg, `M ${fx} ${y - 14} L ${fx} ${y} L ${fx + dir * 16} ${y}`, 'none', DECO, 1);
        }
        else {
            drawGearPair(svg, fx, y, fromLeft); // fromLeft tells us fx is on the left
        }
        if (arrive === 'gear') {
            drawGear(svg, tx, y, 10, 16, 10, 5.5, !fromLeft); // right side → anti-CW, left → CW
        }
        else {
            drawPulsingDot(svg, tx, y, dotT, cycleDur);
        }
        fromLeft = !fromLeft;
    });
    const ball = svgEl('circle');
    ball.setAttribute('r', '4.5');
    ball.setAttribute('fill', BALL);
    ball.setAttribute('filter', 'url(#glow)');
    const motion = svgEl('animateMotion');
    motion.setAttribute('dur', `${cycleDur.toFixed(1)}s`);
    motion.setAttribute('repeatCount', 'indefinite');
    const mpath = svgEl('mpath');
    mpath.setAttribute('href', '#track');
    motion.appendChild(mpath);
    ball.appendChild(motion);
    svg.appendChild(ball);
}
function init() {
    if (window.innerWidth < MIN_VIEWPORT)
        return;
    const svg = svgEl('svg');
    svg.id = 'machine';
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;pointer-events:none;z-index:0;';
    document.body.insertBefore(svg, document.body.firstChild);
    drawMachine(svg);
    let timer = 0;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
            if (window.innerWidth < MIN_VIEWPORT) {
                svg.style.display = 'none';
            }
            else {
                svg.style.display = '';
                drawMachine(svg);
            }
        }, 150);
    });
}
document.addEventListener('DOMContentLoaded', init);
