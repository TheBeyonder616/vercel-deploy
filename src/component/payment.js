import { v4 as uuidv4 } from "uuid";
import Config from "./Config";

export default class Payment {
  /**
   * ?Removes an HTML element from the DOM.
   * @param {HTMLElement} element - The element to be removed.
   * @return {void}
   */
  static removeElement(element) {
    if (element) element.parentNode.removeChild(element);
  }

  /**
   * ?Cleans up by removing the script, style, and element associated with the payment configuration.
   * @param {string} script - The selector for the script element to remove.
   * @param {string} style - The selector for the style element to remove.
   * @param {string} element - The selector for the HTML element to remove.
   * @return {void}
   */
  static cleanUp(
    script = Config.PAYMENT_ELEMENT.script,
    style = Config.PAYMENT_ELEMENT.style,
    element = Config.PAYMENT_ELEMENT.element
  ) {
    const monyScript = document.querySelector(script);
    const monyStyle = document.querySelector(style);
    const monyElement = document.querySelector(element);

    if (monyScript) Payment.removeElement(monyScript);
    if (monyStyle) Payment.removeElement(monyStyle);
    if (monyElement) Payment.removeElement(monyElement);
  }

  /**
   * ?Initializes the script required for payment processing.
   * @param {string} [URL=Config.PAYMENT.script] - The URL of the script to load.
   * @return {function} A cleanup function to remove the script and associated elements.
   */
  static initializeScript(URL = Config.PAYMENT.script) {
    const script = document.createElement("script");
    script.src = URL;
    script.async = true;
    script.dataset.identifier = "mony-script";
    document.head.appendChild(script);

    // script.onload = () => console.log("Script loaded Successfully");
    // script.onerror = () => console.error("Failed to load the script.");
    return () => Payment.cleanUp();
  }

  /**
   * ?Generates metadata for the payment.
   * @param {string} [name=""] - The name associated with the metadata.
   * @param {string} [id=uuidv4()] - The unique ID for the metadata.
   * @return {Object} The metadata object containing name and id.
   */
  static metaData(name = "", id = uuidv4()) {
    return { name, id };
  }

  /**
   * ?Generates a unique reference string for the payment.
   * @return {string} A unique reference string for the payment.
   */
  static generateReference() {
    const timestamp = Date.now();
    const id = uuidv4();
    return `PAY-${timestamp}-${id}`;
  }

  /**
   * ?Constructs the payment details.
   * @param {Object} paymentConfig - Configuration for the payment.
   * @param {number} paymentConfig.amount - The amount to be paid.
   * @param {string} paymentConfig.customerFullName - The full name of the customer.
   * @param {string} paymentConfig.customerEmail - The email address of the customer.
   * @param {string} paymentConfig.paymentDescription - The description of the payment.
   * @return {Object} The payment details object.
   */
  static paymentDetails({
    amount = 0,
    customerFullName = "",
    customerEmail = "",
    paymentDescription = "",
  }) {
    return {
      amount,
      currency: "NGN",
      reference: Payment.generateReference(),
      customerFullName,
      customerEmail,
      apiKey: Config.PAYMENT.apiKey,
      contractCode: Config.PAYMENT.contractCode,
      paymentDescription,
      metadata: Payment.metaData(customerFullName),
      onLoadStart: () => console.log("Payment loading started"),
      onLoadComplete: () => console.log("Payment SDK loaded"),
      onComplete: (response) => console.log("Payment completed", response),
      onClose: (error) => console.log("Payment process closed", error),
    };
  }

  /**
   * ?Initializes the Monnify SDK with the provided payment configuration.
   * @param {Function} MonnifySDK - The Monnify SDK initialization function.
   * @param {Object} paymentConfig - The configuration for initializing the payment SDK.
   * @return {void} This function does not return anything.
   */
  static initializePayment(MonnifySDK = () => {}, paymentConfig = {}) {
    if (typeof MonnifySDK === "undefined") {
      console.error("Monnify SDK is not loaded.");
      return;
    }
    MonnifySDK.initialize(paymentConfig);
  }
}
