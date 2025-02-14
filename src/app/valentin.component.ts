import { Component, OnInit, Renderer2, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'san-valentin',
  templateUrl: './valentin.component.html',
  styleUrls: ['./valentin.component.css']
})
export class ValentinComponent implements OnInit {
  @ViewChild('heartsContainer', { static: false }) heartsContainer!: ElementRef;

  neCounter = 0;
  neMessages: string[] = [
    "😡 ¿Cómo que nooooo?",
    "😠 Deja de poner no oe",
    "😤 Dios mío ya no pongas noooo",
    "😭 Esto ya no me está gustando",
    "😫 Otra vez??? Ya nooo",
    "😱 JSJSJS buenooo, desaparecerá esta opción"
  ];

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Evita errores en Server-Side Rendering
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => this.createHearts(), 500);
    }
  }

  createHearts(): void {
    if (!this.heartsContainer) return;

    for (let i = 0; i < 20; i++) {
      const heart = this.renderer.createElement('div');
      this.renderer.addClass(heart, 'heart');
      heart.innerHTML = "❤️";
      this.renderer.setStyle(heart, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(heart, 'animationDuration', `${3 + Math.random() * 2}s`);

      this.renderer.appendChild(this.heartsContainer.nativeElement, heart);

      setTimeout(() => {
        this.renderer.removeChild(this.heartsContainer.nativeElement, heart);
      }, 5000);
    }
  }

  handleNeClick(): void {
    if (this.neCounter < this.neMessages.length) {
      Swal.fire({
        title: "💔 Oh no...",
        text: this.neMessages[this.neCounter],
        icon: "warning",
        background: "#ffdde1",
        confirmButtonColor: "#ff4d6d",
        confirmButtonText: "Regresar 💘",
        customClass: {
          popup: "custom-popup"
        }
      });
      this.neCounter++;
    } else {
      const neButton = document.getElementById("neButton");
      if (neButton) {
        this.renderer.setStyle(neButton, "display", "none");
      }
    }
  }

  handleSiClick(): void {
    Swal.fire({
      title: "💖 ¡Síiii! 💖",
      text: "Rawrrrr, me alegro mucho de que hayas aceptado ser mi San Valentín, para confirmar, escribe SI en nuestro chat 🥰❤!!! Gracias  ❤!!",
      icon: "success",
      background: "#ffe4e1",
      confirmButtonColor: "#ff4d6d",
      confirmButtonText: "¡Al fin!! Gracias!!! 💞",
      customClass: {
        popup: "custom-popup"
      }
    });
  }
}
