import PaymentHandler from "./PaymentHandler";

export default class BuyerHandler extends PaymentHandler{
    handlePayment(amount) {
      if (amount <= 1000) {
        return "Pago aprobado por el comprador.";
      } else if (this.nextHandler) {
        return this.nextHandler.handlePayment(amount);
      } else {
        return "Monto demasiado grande, requiere aprobación adicional.";
      }
    }
  }