import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const cubesRef = useRef<any[]>([]);
    const cwRef = useRef(0);
    const chRef = useRef(0);
    const hueRef = useRef(180);
    const nCubesRef = useRef(0);
    const staggerAnimRef = useRef<gsap.core.Timeline | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctxRef.current = ctx;
        const img = new Image();
        const img2 = new Image();

        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEw+Pj5aWloQEBAZGRleXl6AgIDAwMBwcHCampq7u7tzc3M0sGdFAAAABXRSTlMAp/UwQ5FLsO8AAADxSURBVHgB7c9HcQRhDITRn8NgMABDWAjO6ewMYLgsWef8akelk1Pr/upTj023mkZxiK3dqSsODnpmdXBwUBlEaRCYckdtEKVBYModmKbQKDrGHZpaaPyqZxQaRc8oNPVyTaehUVRGURhFYerlmu2D5k3jqimO1+MCU4h5XFzc9sQjaXTO1vMTobMkXgmdBfFKNnTY8UroLIp3YkfxldBhB4QOAkIHAaHDDggdBIQOX0HoICB0EBA6CAgdlkPoICB0+ApCBwGhw1cQOggIBgHh5pCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQH0XuAS5hV4q0a3iHAAAAAElFTkSuQmCC';
        img2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEylpaXv7+/Gxsa+vr7m5uahoaE/Pz9/f3+Ojo5lZWWCgoKkaSxxAAAABnRSTlMA9TCcskPTdr2ZAAAA40lEQVR4Ae3POW0EQQBE0UZhBEawWBaAzz0QDIVhYgxmZ3X6pFZpIl/18xf8sep8GinFwzMmi8sFk8TlctFkockiGz80WWiyyMYPTRbZKLLxIxtFMIoVwCCSUQSTRDaeZ3POAKPIRpGNIhvPs3m8HOw0Pg+K+8fYo0FsY48GMUkyiEmSQUySDGKSZBCTJIOYZG0QkIVBQDQKydogIBqFRKOQaBSQYBAQDAKCQQSCUUg0CAhmLSAYhUSDgCwMIpFpFJnsW0lJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUnJjyJfg4PNmR1hT+AAAAAASUVORK5CYII=';

        class Cube {
            img: HTMLImageElement;
            img2: HTMLImageElement;
            scale: number;
            x: number;
            y: number;
            z: number;
            img2_opacity: number;

            constructor(index: number, _x: number, _y: number, _s: number) {
                this.img = img;
                this.img2 = img2;
                this.scale = _s;
                this.x = _x;
                this.y = _y;
                this.z = 0;
                this.img2_opacity = 0;
            }

            draw() {
                if (!ctxRef.current) return;
                const ctx = ctxRef.current;
                ctx.translate(this.x, this.y + this.z);
                ctx.drawImage(this.img, -100 / 2 * this.scale, -200 / 2 * this.scale, 100 * this.scale, 200 * this.scale);
                ctx.globalAlpha = this.img2_opacity;
                ctx.drawImage(this.img2, -100 / 2 * this.scale, -200 / 2 * this.scale, 100 * this.scale, 200 * this.scale);
                ctx.globalAlpha = 1;
                ctx.translate(-this.x, -(this.y + this.z));
            }
        }

        const setGrid = () => {
            if (!canvas || !ctx) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            cwRef.current = Math.ceil(canvas.width / 100 + 1);
            chRef.current = Math.floor(canvas.height / 25 + 10);

            cubesRef.current = [];

            for (let i = 0, _y = 0; _y < chRef.current; _y++) {
                for (let _x = 0; _x < cwRef.current; _x++) {
                    if (_y % 2 === 0) {
                        cubesRef.current.push(new Cube(i, -25 + _x * 100, -75 + _y * 25, 0.9));
                    } else {
                        cubesRef.current.push(new Cube(i, 25 + _x * 100, -75 + _y * 25, 0.9));
                    }
                    i++;
                }
            }

            nCubesRef.current = cubesRef.current.length;
        };

        const staggerFrom = (from: number) => {
            if (staggerAnimRef.current) {
                staggerAnimRef.current.kill();
            }

            return gsap.timeline()
                .to(cubesRef.current, {
                    duration: 1.5,
                    z: 125,
                    ease: 'back.in(3)',
                    stagger: {
                        yoyo: true,
                        amount: 3.5,
                        grid: [chRef.current, cwRef.current],
                        overwrite: 'auto',
                        from: from,
                        onComplete: function () {
                            gsap.to(this.targets(), {
                                duration: 1.5,
                                z: 0,
                                ease: 'back.out(3)'
                            });
                        }
                    }
                }, 0)
                .to(cubesRef.current, {
                    duration: 1,
                    img2_opacity: 1,
                    stagger: {
                        yoyo: true,
                        amount: 3.5,
                        grid: [chRef.current, cwRef.current],
                        overwrite: 'auto',
                        from: from,
                        onComplete: function () {
                            gsap.to(this.targets(), {
                                duration: 1,
                                img2_opacity: 0
                            });
                        }
                    }
                }, 0);
        };

        const handleClick = (e: MouseEvent) => {
            if (!canvas) return;

            if (staggerAnimRef.current) {
                staggerAnimRef.current.eventCallback('onComplete', null);
            }

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const gridX = Math.floor((x - (x / rect.width * 2 - 1) * 20 - x / rect.width * 75) / rect.width * cwRef.current);
            const gridY = Math.floor((y - (y / rect.height * 2 - 1) * 75 + 40) / rect.height * chRef.current);
            const i = cwRef.current * gridY + gridX;

            if (i >= 0 && i < nCubesRef.current) {
                staggerFrom(i);
            }
        };

        const anim = () => {
            staggerAnimRef.current = gsap.timeline({
                onComplete: () => {
                    gsap.delayedCall(2, anim);
                }
            })
                .add(staggerFrom(Math.floor(Math.random() * nCubesRef.current)));
        };

        img.onload = () => {
            setGrid();
            canvas.addEventListener('click', handleClick);
            gsap.delayedCall(0.2, anim);
            setIsLoaded(true);
        };

        window.addEventListener('resize', setGrid);

        const ticker = gsap.ticker.add(() => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'source-over';
            for (let i = 0; i < nCubesRef.current; i++) {
                cubesRef.current[i].draw();
            }

            hueRef.current = (hueRef.current - 0.1) % 360;
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = `hsl(${hueRef.current}, 75%, 25%)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        return () => {
            window.removeEventListener('resize', setGrid);
            canvas.removeEventListener('click', handleClick);
            gsap.ticker.remove(ticker);
            if (staggerAnimRef.current) {
                staggerAnimRef.current.kill();
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 mx-2 my-4 md:mx-4 lg:mx-8 xl:mx-12 rounded-3xl overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-auto cursor-pointer"
                style={{ background: 'transparent' }}
            />
            {!isLoaded && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
            )}
        </div>
    );
}; 