import React, { useEffect, useRef } from 'react';
import easingUtils from 'easing-utils';

class AHole extends HTMLElement {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    discs: any[];
    lines: any[];
    render: { width: number; height: number; dpi: number };
    rect: DOMRect;
    startDisc: { x: number; y: number; w: number; h: number };
    endDisc: { x: number; y: number; w: number; h: number };
    clip: any;
    linesCanvas: OffscreenCanvas;
    linesCtx: CanvasRenderingContext2D;
    particles: any[];
    particleArea: { sw: number; ew: number; h: number; sx: number; ex: number };

    connectedCallback() {
        this.canvas = this.querySelector('.js-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        this.discs = [];
        this.lines = [];

        this.setSize();
        this.setDiscs();
        this.setLines();
        this.setParticles();

        this.bindEvents();

        requestAnimationFrame(this.tick.bind(this));
    }

    bindEvents() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize() {
        this.setSize();
        this.setDiscs();
        this.setLines();
        this.setParticles();
    }

    setSize() {
        this.rect = this.getBoundingClientRect();

        this.render = {
            width: this.rect.width,
            height: this.rect.height,
            dpi: window.devicePixelRatio
        };

        this.canvas.width = this.render.width * this.render.dpi;
        this.canvas.height = this.render.height * this.render.dpi;
    }

    setDiscs() {
        const { width, height } = this.rect;

        this.discs = [];

        this.startDisc = {
            x: width * 0.5,
            y: height * 0.45,
            w: width * 0.75,
            h: height * 0.7
        };

        this.endDisc = {
            x: width * 0.5,
            y: height * 0.95,
            w: 0,
            h: 0
        };

        const totalDiscs = 100;

        let prevBottom = height;
        this.clip = {};

        for (let i = 0; i < totalDiscs; i++) {
            const p = i / totalDiscs;

            const disc = this.tweenDisc({
                p
            });

            const bottom = disc.y + disc.h;

            if (bottom <= prevBottom) {
                this.clip = {
                    disc: { ...disc },
                    i
                };
            }

            prevBottom = bottom;

            this.discs.push(disc);
        }

        this.clip.path = new Path2D();
        this.clip.path.ellipse(
            this.clip.disc.x,
            this.clip.disc.y,
            this.clip.disc.w,
            this.clip.disc.h,
            0,
            0,
            Math.PI * 2
        );
        this.clip.path.rect(
            this.clip.disc.x - this.clip.disc.w,
            0,
            this.clip.disc.w * 2,
            this.clip.disc.y
        );
    }

    setLines() {
        const { width, height } = this.rect;

        this.lines = [];

        const totalLines = 100;
        const linesAngle = (Math.PI * 2) / totalLines;

        for (let i = 0; i < totalLines; i++) {
            this.lines.push([]);
        }

        this.discs.forEach((disc) => {
            for (let i = 0; i < totalLines; i++) {
                const angle = i * linesAngle;

                const p = {
                    x: disc.x + Math.cos(angle) * disc.w,
                    y: disc.y + Math.sin(angle) * disc.h
                };

                this.lines[i].push(p);
            }
        });

        this.linesCanvas = new OffscreenCanvas(width, height);
        const ctx = this.linesCanvas.getContext('2d')!;

        this.lines.forEach((line, i) => {
            ctx.save();

            let lineIsIn = false;
            line.forEach((p1: any, j: number) => {
                if (j === 0) {
                    return;
                }

                const p0 = line[j - 1];

                if (
                    !lineIsIn &&
                    (ctx.isPointInPath(this.clip.path, p1.x, p1.y) ||
                        ctx.isPointInStroke(this.clip.path, p1.x, p1.y))
                ) {
                    lineIsIn = true;
                } else if (lineIsIn) {
                    ctx.clip(this.clip.path);
                }

                ctx.beginPath();

                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);

                ctx.strokeStyle = '#444';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.closePath();
            });

            ctx.restore();
        });

        this.linesCtx = ctx;
    }

    setParticles() {
        const { width, height } = this.rect;

        this.particles = [];

        this.particleArea = {
            sw: this.clip.disc.w * 0.5,
            ew: this.clip.disc.w * 2,
            h: height * 0.85
        };
        this.particleArea.sx = (width - this.particleArea.sw) / 2;
        this.particleArea.ex = (width - this.particleArea.ew) / 2;

        const totalParticles = 100;

        for (let i = 0; i < totalParticles; i++) {
            const particle = this.initParticle(true);

            this.particles.push(particle);
        }
    }

    initParticle(start = false) {
        const sx = this.particleArea.sx + this.particleArea.sw * Math.random();
        const ex = this.particleArea.ex + this.particleArea.ew * Math.random();
        const dx = ex - sx;
        const vx = 0.1 + Math.random() * 0.5;
        const y = start ? this.particleArea.h * Math.random() : this.particleArea.h;
        const r = 0.5 + Math.random() * 4;
        const vy = 0.5 + Math.random();

        return {
            x: sx,
            sx,
            dx,
            y,
            vy,
            p: 0,
            r,
            c: `rgba(255, 255, 255, ${Math.random()})`
        };
    }

    tweenValue(start: number, end: number, p: number, ease = false) {
        const delta = end - start;

        const easeFn =
            easingUtils[
            ease ? 'ease' + ease.charAt(0).toUpperCase() + ease.slice(1) : 'linear'
            ];

        return start + delta * easeFn(p);
    }

    drawDiscs() {
        const { ctx } = this;

        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;

        const outerDisc = this.startDisc;

        ctx.beginPath();

        ctx.ellipse(
            outerDisc.x,
            outerDisc.y,
            outerDisc.w,
            outerDisc.h,
            0,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        ctx.closePath();

        this.discs.forEach((disc, i) => {
            if (i % 5 !== 0) {
                return;
            }

            if (disc.w < this.clip.disc.w - 5) {
                ctx.save();

                ctx.clip(this.clip.path);
            }

            ctx.beginPath();

            ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.closePath();

            if (disc.w < this.clip.disc.w - 5) {
                ctx.restore();
            }
        });
    }

    drawLines() {
        const { ctx, linesCanvas } = this;

        ctx.drawImage(linesCanvas, 0, 0);
    }

    drawParticles() {
        const { ctx } = this;

        ctx.save();

        ctx.clip(this.clip.path);

        this.particles.forEach((particle) => {
            ctx.fillStyle = particle.c;
            ctx.beginPath();
            ctx.rect(particle.x, particle.y, particle.r, particle.r);
            ctx.closePath();

            ctx.fill();
        });

        ctx.restore();
    }

    moveDiscs() {
        this.discs.forEach((disc) => {
            disc.p = (disc.p + 0.001) % 1;

            this.tweenDisc(disc);
        });
    }

    moveParticles() {
        this.particles.forEach((particle) => {
            particle.p = 1 - particle.y / this.particleArea.h;
            particle.x = particle.sx + particle.dx * particle.p;
            particle.y -= particle.vy;

            if (particle.y < 0) {
                particle.y = this.initParticle().y;
            }
        });
    }

    tweenDisc(disc: any) {
        disc.x = this.tweenValue(this.startDisc.x, this.endDisc.x, disc.p);
        disc.y = this.tweenValue(
            this.startDisc.y,
            this.endDisc.y,
            disc.p,
            'inExpo'
        );

        disc.w = this.tweenValue(this.startDisc.w, this.endDisc.w, disc.p);
        disc.h = this.tweenValue(this.startDisc.h, this.endDisc.h, disc.p);

        return disc;
    }

    tick(time: number) {
        const { ctx } = this;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        ctx.scale(this.render.dpi, this.render.dpi);

        this.moveDiscs();
        this.moveParticles();

        this.drawDiscs();
        this.drawLines();
        this.drawParticles();

        ctx.restore();

        requestAnimationFrame(this.tick.bind(this));
    }
}

if (typeof window !== 'undefined') {
    customElements.define('a-hole', AHole);
}

const AnimatedBackground: React.FC = () => {
    return (
        <div className="relative w-full h-full">
            <a-hole>
                <canvas className="js-canvas"></canvas>
                <div className="aura"></div>
                <div className="overlay"></div>
            </a-hole>
            <style jsx>{`
        a-hole {
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        a-hole:before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 2;
          display: block;
          width: 150%;
          height: 140%;
          background: radial-gradient(ellipse at 50% 55%, transparent 10%, black 50%);
          transform: translate3d(-50%, -50%, 0);
          content: "";
        }

        a-hole:after {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 5;
          display: block;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at 50% 75%,
            #a900ff 20%,
            transparent 75%
          );
          mix-blend-mode: overlay;
          transform: translate3d(-50%, -50%, 0);
          content: "";
        }

        @keyframes aura-glow {
          0% {
            background-position: 0 100%;
          }
          100% {
            background-position: 0 300%;
          }
        }

        .aura {
          position: absolute;
          top: -71.5%;
          left: 50%;
          z-index: 3;
          width: 30%;
          height: 140%;
          background: linear-gradient(
              20deg,
              #00f8f1,
              #ffbd1e20 16.5%,
              #fe848f 33%,
              #fe848f20 49.5%,
              #00f8f1 66%,
              #00f8f160 85.5%,
              #ffbd1e 100%
            )
            0 100% / 100% 200%;
          border-radius: 0 0 100% 100%;
          filter: blur(50px);
          mix-blend-mode: plus-lighter;
          opacity: 0.75;
          transform: translate3d(-50%, 0, 0);
          animation: aura-glow 5s infinite linear;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            transparent,
            transparent 1px,
            white 1px,
            white 2px
          );
          mix-blend-mode: overlay;
          opacity: 0.5;
        }

        canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
        </div>
    );
};

export default AnimatedBackground; 