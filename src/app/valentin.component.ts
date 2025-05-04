import {
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import Swal from 'sweetalert2';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'san-valentin',
  templateUrl: './valentin.component.html',
  styleUrls: ['./valentin.component.css'],
})
export class ValentinComponent implements OnInit {
  enlaceConfirmacion = 'https://docs.google.com/forms/d/e/1FAIpQLSdgCZgrB69o7nfVxJqOo4XzSQAmuUOE1ZM_ezAC7FzmlF4Qxw/viewform?usp=dialog';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // algo aquí, o vacío si no necesitas usarlo
  }

  confirmarAsistencia() {
    window.open(this.enlaceConfirmacion, '_blank');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initEstrellas();
    }
  }

  initEstrellas() {
    const canvas = document.getElementById('estrellas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let estrellas: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 120; i++) {
      estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 1,
        speedY: Math.random() * 0.6 + 0.3,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const animar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      estrellas.forEach(estrella => {
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${estrella.opacity})`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 6;
        ctx.fill();

        estrella.y += estrella.speedY;
        if (estrella.y > canvas.height) {
          estrella.y = 0;
          estrella.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animar);
    };

    animar();
  }
}
