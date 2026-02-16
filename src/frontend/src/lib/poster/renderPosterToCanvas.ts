export function renderPosterToCanvas(canvas: HTMLCanvasElement, draft: any) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 1080;
  canvas.height = 1080;

  const theme = draft.theme || 'modern';
  let gradient;

  switch (theme) {
    case 'modern':
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(1, '#9333ea');
      break;
    case 'professional':
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#1e3a8a');
      break;
    case 'vibrant':
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f97316');
      gradient.addColorStop(1, '#db2777');
      break;
    case 'minimal':
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#334155');
      break;
    default:
      gradient = '#2563eb';
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText(draft.companyName || 'Company Name', canvas.width / 2, 300);

  ctx.font = '48px sans-serif';
  ctx.fillText(draft.category || 'Category', canvas.width / 2, 400);

  if (draft.specialOffer) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(100, 500, canvas.width - 200, 120);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('🎉 ' + draft.specialOffer, canvas.width / 2, 570);
  }

  ctx.font = '32px sans-serif';
  ctx.fillStyle = '#ffffff';
  if (draft.productService) {
    ctx.fillText(draft.productService, canvas.width / 2, 720);
  }

  if (draft.contact) {
    ctx.font = '28px sans-serif';
    ctx.fillText(draft.contact, canvas.width / 2, 900);
  }
}
