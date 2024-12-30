export function generateStarField(count: number): string {
  let gradient = '';
  
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    
    gradient += `${gradient ? ',' : ''} radial-gradient(1px 1px at ${x}px ${y}px, rgba(255, 255, 255, 0.3), transparent 100%)`;
  }
  
  return gradient;
}