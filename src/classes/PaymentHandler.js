export default class PaymentHandler {
    setNextHandler(handler) {
      this.nextHandler = handler;
    }
  
    handlePayment(amount) {
      throw new Error('handlePayment method must be implemented');
    }
  }