import PaymentHandler from "./PaymentHandler";

export default class ManagerHandler extends PaymentHandler {
    handlePayment(amount) {
      if (amount <= 10000) {
        return "Pago aprobado por el gerente.";
      } else {
        return "Monto demasiado grande, requiere aprobación adicional.";
      }
    }
}