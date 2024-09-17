'use client';

import {
  useEffect,
  useRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  FC,
  useState,
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
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-[#623ea8] hover:bg-[#5a34a0] text-white';

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

// Define the translations
const translations = {
  en: {
    name: 'Ael',
    subtitle: 'Aspiring Upwork Web Developer & Designer',
    introTitle: 'Fresh Talent, Boundless Enthusiasm',
    introText:
      "As a new freelancer on Upwork, I'm excited to bring fresh perspectives and innovative ideas to your web projects. I'm committed to delivering high-quality solutions and building long-lasting client relationships. Let's create something amazing together and grow our portfolios side by side!",
    rateHighlights: [
      { icon: <DollarSign className="h-5 w-5 text-[#623ea8]" />, text: '$10/hr' },
      { icon: <Layout className="h-5 w-5 text-[#623ea8]" />, text: '$20/page' },
    ],
    keyPointsTitle: 'Why Choose a Rising Star?',
    keyPoints: [
      'Eager to exceed expectations',
      'Fresh, innovative ideas',
      'Flexible and adaptive',
      'Competitive rates',
      'Dedicated to your success',
      'Building long-term relationships',
    ],
    collaborateButton: 'Let\'s Collaborate on Upwork',
    portfolioButton: 'View Portfolio',
    contactButton: 'Contact Me',
    footer: '© ',
  },
  ru: {
    name: 'Ael',
    subtitle: 'Начинающий веб-разработчик и дизайнер на Upwork',
    introTitle: 'Свежий талант, безграничный энтузиазм',
    introText:
      "Как новый фрилансер на Upwork, я рад привнести свежие взгляды и инновационные идеи в ваши веб-проекты. Я стремлюсь предоставлять высококачественные решения и строить долгосрочные отношения с клиентами. Давайте создадим что-то удивительное вместе и будем расти нашими портфолио бок о бок!",
    rateHighlights: [
      { icon: <DollarSign className="h-5 w-5 text-[#623ea8]" />, text: '$10/час' },
      { icon: <Layout className="h-5 w-5 text-[#623ea8]" />, text: '$20/страница' },
    ],
    keyPointsTitle: 'Почему выбрать восходящую звезду?',
    keyPoints: [
      'Стремление превзойти ожидания',
      'Свежие, инновационные идеи',
      'Гибкость и адаптивность',
      'Конкурентоспособные цены',
      'Преданность вашему успеху',
      'Строим долгосрочные отношения',
    ],
    collaborateButton: 'Давайте сотрудничать на Upwork',
    portfolioButton: 'Просмотреть портфолио',
    contactButton: 'Связаться со мной',
    footer: '© ',
  },
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');

  const t = translations[language];

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
        ctx.fillStyle = 'rgba(98, 62, 168, 0.7)';
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
            ctx.strokeStyle = `rgba(98, 62, 168, ${
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
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex space-x-2 z-20">
        <button onClick={() => setLanguage('en')} aria-label="English">
          🇺🇸
        </button>
        <button onClick={() => setLanguage('ru')} aria-label="Russian">
          🇷🇺
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">{t.name}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </header>

        {/* Introduction */}
        <section className="text-center max-w-2xl">
          <h2 className="text-2xl font-semibold text-[#623ea8] mb-2">
            {t.introTitle}
          </h2>
          <p className="text-sm leading-relaxed">
            {t.introText}
          </p>
        </section>

        {/* Rate Highlights */}
        <section className="flex justify-center space-x-8 w-full">
          {t.rateHighlights.map((rate, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-md shadow-lg border-l-4 border-[#623ea8]"
            >
              <div className="flex items-center space-x-2">
                {rate.icon}
                <p className="text-lg font-bold">{rate.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Key Points */}
        <section className="text-center max-w-2xl">
          <h3 className="text-xl font-semibold text-[#623ea8] mb-3">
            {t.keyPointsTitle}
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {t.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <Star className="mr-2 h-4 w-4 text-[#623ea8] flex-shrink-0 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section className="flex space-x-4">
          <Button
            asLink
            href="https://ael.gitbook.io/ael-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="mr-2 h-5 w-5" />
            {t.portfolioButton}
          </Button>
          <Button
            asLink
            href="mailto:ael.dev@proton.me"
          >
            <Mail className="mr-2 h-5 w-5" />
            {t.contactButton}
          </Button>
        </section>

        {/* Additional Call to Action */}
        <section className="flex space-x-4 mt-4">
          <Button
            asLink
            href="https://www.upwork.com/freelancers/~01c06a4568eadc881d?viewMode=1&s=1044578476142100494"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="mr-2 h-5 w-5" />
            {t.collaborateButton}
          </Button>
          <Button
            asLink
            href="https://ael.gitbook.io/ael-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="mr-2 h-5 w-5" />
            {t.portfolioButton}
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-2 text-center text-xs text-gray-500 w-full flex flex-col items-center space-y-1">
        <p>
          {t.footer}{new Date().getFullYear()} {t.name}. All rights reserved.
        </p>
        {/* Hidden Solana Address */}
        <p className="text-transparent hover:text-gray-400 transition-colors cursor-pointer">
          ✨ Solana Address: 8bwEs6utJ8XuK9QYQTQUc1byRJ7YDKAG7VqB7xys6g66 ✨
        </p>
      </footer>
    </div>
  );
}
