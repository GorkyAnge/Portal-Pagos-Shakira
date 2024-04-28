import PaymentHandler from "./PaymentHandler";

export default class DirectorHandler extends PaymentHandler {
    handlePayment(amount) {
      if (amount <= 5000) {
        return "Pago aprobado por el director.";
      } else if (this.nextHandler) {
        return this.nextHandler.handlePayment(amount);
      } else {
        return "Monto demasiado grande, requiere aprobación adicional.";
      }
    }
  }