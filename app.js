// TRANSICIÓN DE CORTINA DE PÁGINA CON REDIRECCIÓN REAL
function triggerCurtain(event, targetUrl) {
  event.preventDefault(); // Evita el salto inmediato
  const curtain = document.getElementById('page-curtain');
  
  gsap.to(curtain, {
    y: '0%',
    duration: 0.55,
    ease: 'power4.inOut',
    onComplete: () => {
      // Redirige al nuevo apartado justo cuando la pantalla está cubierta por la cortina
      window.location.href = targetUrl;
    }
  });
}
