export class ExternalServiceError extends Error {
  constructor() {
    super('Error sending message by the external service.')
  }
}