'use client';

import {
  useEffect,
  useRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  FC,
} from 'react';
import Link from 'next/link';
import { Mail, DollarSign, Layout, Star } from 'lucide-react';

// Define separate prop interfaces using discriminated unions
interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: false;
}

interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asLink: true;
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button: FC<ButtonProps> = ({
  children,
  asLink,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-red-600 hover:bg-red-700 text-white';

  if (asLink) {
    const { href, ...restProps } = props as ButtonAsLinkProps;
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={`${baseClasses} ${className}`}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext('2d');
    if (!context) return;

    // Re-assign to new constants to ensure TypeScript knows they're non-null
    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 50;
    const maxDistance = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width)
          particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > canvas.height)
          particle.vy = -particle.vy;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 59, 48, 0.7)';
        ctx.fill();

        particles.forEach((otherParticle) => {
          if (particle === otherParticle) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 59, 48, ${
              0.2 * (1 - distance / maxDistance)
            })`;
            ctx.stroke();
          }
        });
      });
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
      particles.forEach((particle) => {
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">Artem Kravchenko</h1>
          <p className="text-xl text-gray-400">
            Aspiring Upwork Web Developer & Designer
          </p>
        </header>

        {/* Introduction */}
        <section className="text-center max-w-2xl">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">
            Fresh Talent, Boundless Enthusiasm
          </h2>
          <p className="text-sm leading-relaxed">
            As a new freelancer on Upwork, I&#39;m excited to bring fresh
            perspectives and innovative ideas to your web projects. I&#39;m
            committed to delivering high-quality solutions and building
            long-lasting client relationships. Let&#39;s create something
            amazing together and grow our portfolios side by side!
          </p>
        </section>

        {/* Rate Highlights */}
        <section className="flex justify-center space-x-8 w-full">
          <div className="bg-gray-800 p-4 rounded-md shadow-lg border-l-4 border-red-500">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-red-500" />
              <p className="text-lg font-bold">$10/hr</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg border-l-4 border-red-500">
            <div className="flex items-center space-x-2">
              <Layout className="h-5 w-5 text-red-500" />
              <p className="text-lg font-bold">$20/page</p>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="text-center max-w-2xl">
          <h3 className="text-xl font-semibold text-red-500 mb-3">
            Why Choose a Rising Star?
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {[
              'Eager to exceed expectations',
              'Fresh, innovative ideas',
              'Flexible and adaptive',
              'Competitive rates',
              'Dedicated to your success',
              'Building long-term relationships',
            ].map((point, index) => (
              <li key={index} className="flex items-start">
                <Star className="mr-2 h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section>
          <Button
            asLink
            href="https://www.upwork.com/freelancers/~01c06a4568eadc881d?viewMode=1&s=1044578476142100494"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="mr-2 h-5 w-5" />
            Let&#39;s Collaborate on Upwork
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-2 text-center text-xs text-gray-500 w-full">
        <p>© {new Date().getFullYear()} Artem Kravchenko. All rights reserved.</p>
      </footer>
    </div>
  );
}
