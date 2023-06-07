export interface HttpError extends Error {
  message: string
  status: number
}