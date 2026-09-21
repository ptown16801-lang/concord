export class EligibilityTransitionError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "EligibilityTransitionError";
    this.code = code;
  }
}
