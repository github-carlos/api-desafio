import { RemoveMachineFromUnitUseCase, RemoveMachineFromUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { MachineDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildMachineFixture, buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'
import { Machine, MachineStatusEnum, Unit } from '../../../../src/domain/entities'

describe("#RemoveMachineFromUnitUseCase", () => {

  const input: RemoveMachineFromUnitUseCaseInput = {
    unitId: 'abcd',
    machineId: '123abc'
  }

  const fixtureUnit = buildUnitFixture()

  const unitRepository = buildDefaultRepositoryMock()
  const machineRepository = buildDefaultRepositoryMock<Machine>()
  const usecase = new RemoveMachineFromUnitUseCase(machineRepository, unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when remove machine from unit with success', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureUnit)
    machineRepository.delete.mockResolvedValueOnce(true)

    const removed: boolean = await usecase.run(input)

    expect(removed).toBeTruthy()
    expect(unitRepository.getOne).toBeCalledWith(input.unitId)
    expect(machineRepository.delete).toBeCalledWith(input.machineId)
  })

  test('should return false when remove machine from unit with no success', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureUnit)
    machineRepository.delete.mockResolvedValueOnce(false)

    const removed: boolean = await usecase.run(input)

    expect(removed).toBeFalsy()
    expect(unitRepository.getOne).toBeCalledWith(input.unitId)
    expect(machineRepository.delete).toBeCalledWith(input.machineId)
  })

  test('should throw error when unit not found', async () => {
    unitRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.UnitNotFoundError())
  })
})