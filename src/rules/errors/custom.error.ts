export class CustomError extends Error {
  private constructor(
    public readonly code: number,
    public readonly message: string
  ) {
    super(message);
  }
  get getError() {
    return { code: this.code, error: this.message };
  }

  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  static unAuthorized(message: string) {
    return new CustomError(401, message);
  }
  static forbiden(message: string) {
    return new CustomError(403, message);
  }
  static notFound(message: string) {
    return new CustomError(404, message);
  }
  static internalServer(message: string) {
    return new CustomError(500, message);
  }
}
