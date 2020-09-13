
export class APIError extends Error {
  constructor(message, request, response) {
    super(message);
    this.request = request;
    this.response = response;
    this.status = response.status;
  }

}
