// Medición de conversiones sin datos personales.
// Cada enlace de contacto lleva data-cta="whatsapp|email|presupuesto|...".
// No carga ninguna herramienta por sí mismo: si en el futuro se activa Cloudflare Zaraz,
// GA4 (gtag) o Plausible, el evento les llega automáticamente. Solo se envían el tipo de
// contacto y la ruta de la página; nunca el texto del mensaje, el teléfono ni el email.
(() => {
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-cta]');
    if (!a) return;
    const data = { method: a.dataset.cta, page: location.pathname };
    try {
      if (window.zaraz && typeof zaraz.track === 'function') zaraz.track('lead_click', data);
      if (typeof window.gtag === 'function') gtag('event', 'generate_lead', data);
      if (typeof window.plausible === 'function') plausible('Lead', { props: data });
    } catch (_) { /* la medición nunca debe romper el enlace */ }
  }, { capture: true });
})();
