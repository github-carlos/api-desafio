export class BusinessError extends Error {
  message: string
}

export class EntityNotFoundError extends BusinessError {}