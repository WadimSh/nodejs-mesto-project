class Forbidden extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export default Forbidden;
