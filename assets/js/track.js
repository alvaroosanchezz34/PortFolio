// Medición de conversiones sin datos personales.
// Cada enlace de contacto lleva data-cta="whatsapp|email|presupuesto|...", y el formulario
// llama a window.sdTrack() solo cuando el envío es válido. No carga ninguna herramienta:
// si en el futuro se activa Cloudflare Zaraz, GA4 (gtag) o Plausible, el evento les llega.
// Solo se envían el tipo de contacto y la ruta; nunca el mensaje, el teléfono ni el email.
(() => {
  const send = method => {
    const data = { method, page: location.pathname };
    try {
      if (window.zaraz && typeof zaraz.track === 'function') zaraz.track('lead_click', data);
      if (typeof window.gtag === 'function') gtag('event', 'generate_lead', data);
      if (typeof window.plausible === 'function') plausible('Lead', { props: data });
    } catch (_) { /* la medición nunca debe romper la navegación */ }
  };
  window.sdTrack = send;
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-cta]');
    if (a) send(a.dataset.cta);
  }, { capture: true });
})();
