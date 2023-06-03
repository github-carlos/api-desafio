export function buildCompanyRepositoryMock() {
  return {
    save: jest.fn(),
    getOne: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn()
  }
}