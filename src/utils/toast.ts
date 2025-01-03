type ToastType = 'success' | 'error' | 'info';

class Toast {
  private createToast(message: string, type: ToastType) {
    // Simple console fallback for now
    // In production, you'd want to use a proper toast library
    const style = type === 'error' ? 'color: red' : 
                 type === 'success' ? 'color: green' : 
                 'color: blue';
    console.log(`%c${message}`, style);
  }

  success(message: string) {
    this.createToast(message, 'success');
  }

  error(message: string) {
    this.createToast(message, 'error');
  }

  info(message: string) {
    this.createToast(message, 'info');
  }
}

export const toast = new Toast();