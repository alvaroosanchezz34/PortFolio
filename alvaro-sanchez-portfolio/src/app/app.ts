import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import { NgZone } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) { }
  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';
  showToast = false;

  activeSection = '';
  contact = {
    name: '',
    email: '',
    message: '',
  };

  ngAfterViewInit() {
    // Animación del proyecto destacado (Workly)
    gsap.from('.featured-project', {
      scrollTrigger: {
        trigger: '.featured-project',
        start: 'top 80%',
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.featured-content > *', {
      scrollTrigger: {
        trigger: '.featured-project',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from('.featured-visual', {
      scrollTrigger: {
        trigger: '.featured-project',
        start: 'top 80%',
      },
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power3.out',
    });
    const counters = document.querySelectorAll<HTMLElement>('.number');

    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = Number(el.dataset['target']);
            this.animateCounter(el, target);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );


    counters.forEach(counter => counterObserver.observe(counter));
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => sectionObserver.observe(section));

    this.initScrollReveal();

    gsap.from('.dot-nav', {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    });

  }

  animateCounter(element: HTMLElement, target: number) {
    let current = 0;
    const duration = 1800; // animación lenta
    const frameRate = 30;
    const increment = target / (duration / frameRate);

    const hasPlus = element.dataset['plus'] === 'true';

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        clearInterval(timer);
        element.textContent = hasPlus ? `+${target}` : `${target}`;
      } else {
        const value = Math.floor(current);
        element.textContent = hasPlus ? `+${value}` : `${value}`;
      }
    }, frameRate);
  }

  showWorkly = false;

  openWorkly() {
    this.showWorkly = true;
    document.body.style.overflow = 'hidden';
    gsap.fromTo(
      '.workly-backdrop',
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    setTimeout(() => {
      gsap.fromTo(
        '.project-panel',
        {
          x: 80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        }
      );

      gsap.from(
        '.project-panel .panel-header > *',
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.15,
          ease: 'power3.out',
        }
      );

      gsap.from(
        '.project-panel .panel-section',
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.25,
          ease: 'power3.out',
        }
      );
    });
  }

  closeWorkly() {
    gsap.to('.project-panel', {
      x: 80,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    });

    gsap.to('.workly-backdrop', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.showWorkly = false;
        document.body.style.overflow = 'auto';
      },
    });
  }

  private initScrollReveal() {
    gsap.utils.toArray<HTMLElement>('.reveal').forEach(section => {
      const elements = section.querySelectorAll(
        'h2, h3, p, .stack-card, .project-card, .timeline-item, .stat'
      );

      gsap.from(elements, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    });
  }
  worklyImages = [
    {
      src: 'https://res.cloudinary.com/dhbjoltyy/image/upload/v1766926211/Captura_de_pantalla_2025-12-28_134955_bcszjp.png',
      alt: 'Workly - Usuarios',
    },
    {
      src: 'https://res.cloudinary.com/dhbjoltyy/image/upload/v1766926160/Captura_de_pantalla_2025-12-28_134912_hygxwl.png',
      alt: 'Workly - Clientes',
    },
    {
      src: 'https://res.cloudinary.com/dhbjoltyy/image/upload/v1766926069/Captura_de_pantalla_2025-12-28_134732_xsqouc.png',
      alt: 'Workly - Dashboard',
    },
  ];

  currentImage = 0;

  nextImage() {
    this.currentImage =
      (this.currentImage + 1) % this.worklyImages.length;
  }

  prevImage() {
    this.currentImage =
      (this.currentImage - 1 + this.worklyImages.length) %
      this.worklyImages.length;
  }


  loading = false;
  success = false;
  error = false;

  sendEmail(event?: Event) {
    event?.preventDefault();

    if (this.loading) return;

    console.log('CONTACT DATA:', this.contact);

    this.loading = true;

    const templateParams = {
      from_name: this.contact.name,
      from_email: this.contact.email,
      message: this.contact.message,
    };

    emailjs.send(
      'service_gifseke',
      'template_2i5gxma',
      templateParams,
      'Dh49e-4Q_MtPS2gjU'
    ).then(() => {

      return emailjs.send(
        'service_gifseke',
        'template_865132o',
        templateParams,
        'Dh49e-4Q_MtPS2gjU'
      );

    }).then(() => {
      this.loading = false;

      this.triggerToast(
        'Mensaje enviado correctamente. Te responderé pronto 😊',
        'success'
      );

      this.contact = { name: '', email: '', message: '' };

      this.cdr.detectChanges(); // 🔥 FUERZA REPINTADO
    })
      .catch(() => {
        this.loading = false;

        this.triggerToast(
          'Error al enviar el mensaje. Inténtalo de nuevo.',
          'error'
        );

        this.cdr.detectChanges(); // 🔥 FUERZA REPINTADO
      });
  }



  triggerToast(message: string, type: 'success' | 'error') {
    this.zone.run(() => {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 3500);
    });
  }
}
