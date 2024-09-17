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
import { Mail, Layout, Star } from 'lucide-react';

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
    subtitle: 'Web Developer & Designer',
    introTitle: 'Professional Web Development Services',
    introText:
      'Offering comprehensive web development and design solutions. Specializing in blockchain API integration, automation using Python and Rust, and creating responsive, user-friendly websites tailored to your needs.',
    services: 'Services Offered:',
    serviceList: [
      'Web Development & Design',
      'Blockchain API Integration',
      'Automation with Python',
      'Automation with Rust',
      'Responsive & User-Friendly Websites',
      'Custom Solutions Tailored to Your Needs',
    ],
    keyPointsTitle: 'Why Choose My Services?',
    keyPoints: [
      'Reliable and efficient',
      'Expertise in modern technologies',
      'Tailored solutions',
      'Timely delivery',
      'Excellent communication',
      'Commitment to quality',
      'Free prototype upon request',
    ],
    portfolioButton: 'View Portfolio',
    contactButton: 'Contact Me',
    footer: '© ',
    solanaTip: '✨ Tips via Solana: 8bwEs6utJ8XuK9QYQTQUc1byRJ7YDKAG7VqB7xys6g66 ✨',
    emailCode: 'ael.dev@proton.me',
  },
  ru: {
    name: 'Ael',
    subtitle: 'Веб-разработчик и дизайнер',
    introTitle: 'Профессиональные услуги веб-разработки',
    introText:
      'Предлагаю комплексные решения в области веб-разработки и дизайна. Специализируюсь на интеграции блокчейн API, автоматизации с использованием Python и Rust, а также создании отзывчивых и удобных веб-сайтов, адаптированных под ваши потребности.',
    services: 'Предлагаемые услуги:',
    serviceList: [
      'Веб-разработка и дизайн',
      'Интеграция блокчейн API',
      'Автоматизация с Python',
      'Автоматизация с Rust',
      'Отзывчивые и удобные веб-сайты',
      'Индивидуальные решения под ваши нужды',
    ],
    keyPointsTitle: 'Почему выбирают мои услуги?',
    keyPoints: [
      'Надежность и эффективность',
      'Экспертиза в современных технологиях',
      'Индивидуальные решения',
      'Своевременная доставка',
      'Отличная коммуникация',
      'Стремление к качеству',
      'Бесплатный прототип по запросу',
    ],
    portfolioButton: 'Просмотреть портфолио',
    contactButton: 'Связаться со мной',
    footer: '© ',
    solanaTip: '✨ Пожертвования через Solana: 8bwEs6utJ8XuK9QYQTQUc1byRJ7YDKAG7VqB7xys6g66 ✨',
    emailCode: 'ael.dev@proton.me',
  },
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [showSuggestion, setShowSuggestion] = useState(true);

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

        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;

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
            ctx.strokeStyle = `rgba(98, 62, 168, ${0.2 * (1 - distance / maxDistance)})`;
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

  // Function to copy email to clipboard
  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email).then(
      () => {
        alert('Email copied to clipboard!');
      },
      () => {
        alert('Failed to copy email.');
      }
    );
  };

  // Handle language change and hide suggestion
  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
    setShowSuggestion(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
        {language === 'en' ? (
          <>
            <button
              onClick={handleLanguageChange}
              aria-label="Russian"
              className="focus:outline-none"
            >
              <img
                src="https://flagcdn.com/w20/ru.png"
                alt="Russian Flag"
                className="w-5 h-auto"
              />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLanguageChange}
              aria-label="English"
              className="focus:outline-none"
            >
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="US Flag"
                className="w-5 h-auto"
              />
            </button>
          </>
        )}
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
          <p className="text-sm leading-relaxed">{t.introText}</p>
        </section>

        {/* Services Offered */}
        <section className="text-center max-w-2xl">
          <h3 className="text-xl font-semibold text-[#623ea8] mb-3">
            {t.services}
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {t.serviceList.map((service, index) => (
              <li key={index} className="flex items-start">
                <Star className="mr-2 h-4 w-4 text-[#623ea8] flex-shrink-0 mt-1" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
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
        <section className="flex flex-col space-y-4 items-center">
          <div className="flex space-x-4">
            <Button
              asLink
              href="https://ael.gitbook.io/ael-portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Layout className="mr-2 h-5 w-5" />
              {t.portfolioButton}
            </Button>
            <Button asLink href="mailto:ael.dev@proton.me">
              <Mail className="mr-2 h-5 w-5" />
              {t.contactButton}
            </Button>
          </div>
          {/* Single Email Copy Button */}
          <button
            className="bg-gray-800 p-2 rounded-md shadow-inner w-48 text-center cursor-pointer flex flex-col items-center"
            onClick={() => copyToClipboard(t.emailCode)}
          >
            <code className="text-xs text-[#00ff00]">{t.emailCode}</code>
            <p className="text-[10px] text-gray-400 mt-1">Click to copy</p>
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-xs text-gray-500 w-full flex flex-col items-center space-y-1">
        <p>
          {t.footer}
          {new Date().getFullYear()} {t.name}. All rights reserved.
        </p>
        {/* Visible Solana Address */}
        <p className="mt-2 text-[#623ea8]">
          ✨ Tips via Solana: 8bwEs6utJ8XuK9QYQTQUc1byRJ7YDKAG7VqB7xys6g66 ✨
        </p>
      </footer>
    </div>
  );
}
