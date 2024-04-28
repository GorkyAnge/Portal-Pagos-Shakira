import React from "react";

import BuyerHandler from "../classes/BuyerHandler";
import DirectorHandler from "../classes/DirectorHandler";
import ManagerHandler from "../classes/ManagerHandler";
import Swal from "sweetalert2";

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);

    // Configuración de la cadena de responsabilidad
    const buyerHandler = new BuyerHandler();
    const directorHandler = new DirectorHandler();
    const managerHandler = new ManagerHandler();

    buyerHandler.setNextHandler(directorHandler);
    directorHandler.setNextHandler(managerHandler);

    this.paymentHandler = buyerHandler;
    this.state = {
      amount: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePayment = () => {
    const { amount, firstName, lastName, email } = this.state; 
    if (!isNaN(parseInt(amount))) {
      
      const result = this.paymentHandler.handlePayment(parseInt(amount)); 
      Swal.fire({
        title: "Detalle de la Factura",
        html: `
          <div>
            <p><strong>Nombre:</strong> ${firstName}</p>
            <p><strong>Apellido:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Monto a Pagar:</strong> $${amount}</p>
            <p><strong>Resultado:</strong> ${result}</p>
          </div>
        `,
        icon: "info",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Ingrese un monto válido",
        icon: "error",
      });
    }
  };

  // render() {
  //   return (
  //     <div>
  //       <input type="number" value={this.state.amount} onChange={this.handleInputChange} />
  //       <button onClick={this.handlePayment}>Procesar Pago</button>
  //     </div>
  //   );
  // }

  render() {
    return (
      <>
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt=""
                src="https://m.media-amazon.com/images/I/81Lmy1CYP5L._UF1000,1000_QL80_.jpg"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />

              <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white">
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    svg
                  />
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Bienvendi@ a la plataforma de pagos Shakira
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                  Aquí podrás realizar pagos de hasta 10,000$ con la aprobación
                  de un comprador, director o gerente.
                </p>
              </div>
            </section>

            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <div className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="FirstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>

                    <input
                      name="firstName"
                      type="text"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apellido
                    </label>

                    <input
                      name="lastName"
                      type="text"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Email{" "}
                    </label>

                    <input
                      name="email"
                      type="email"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Monto a Pagar
                    </label>

                    <input
                      name="amount"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      type="number"
                      value={this.state.amount}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                      <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />

                      <span className="text-sm text-gray-700">
                        Este checkbox no hace nada pero se ve bonito
                      </span>
                    </label>
                  </div>

                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      Si tu pago es menor o igual a 1000$ será aprobado por el
                      comprador, si es mayor a 1000$ y menor o igual a 5000$
                      será aprobado por el director, si es mayor a 5000$ y menor
                      o igual a 10000$ será aprobado por el gerente.
                    </p>
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-6">
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      onClick={this.handlePayment}
                    >
                      Procesar Pago
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </section>
      </>
    );
  }
}

export default PaymentComponent;
