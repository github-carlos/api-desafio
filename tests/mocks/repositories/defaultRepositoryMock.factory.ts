export function buildDefaultRepositoryMock<T>() {
  return {
    save: jest.fn(),
    getOne: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }
}