import { RemoveMachineFromUnitUseCase, RemoveMachineFromUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { MachineDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildMachineFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'
import { Machine, MachineStatusEnum, Unit } from '../../../../src/domain/entities'

describe("#RemoveMachineFromUnitUseCase", () => {

  const input: RemoveMachineFromUnitUseCaseInput = {
    unitId: 'abc',
    machineId: '123abc'
  }

  const fixtureMachine = buildMachineFixture()

  const machineRepository = buildDefaultRepositoryMock<Machine>()
  const usecase = new RemoveMachineFromUnitUseCase(machineRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when remove machine from unit with success', async () => {
    machineRepository.getOne.mockResolvedValueOnce(fixtureMachine)
    machineRepository.delete.mockResolvedValueOnce(true)

    const removed: boolean = await usecase.run(input)

    expect(removed).toBeTruthy()
    expect(machineRepository.getOne).toBeCalledWith(input.unitId, input.machineId)
    expect(machineRepository.delete).toBeCalledWith(input.machineId)
  })

  test('should return false when remove machine from unit with no success', async () => {
    machineRepository.getOne.mockResolvedValueOnce(fixtureMachine)
    machineRepository.delete.mockResolvedValueOnce(false)

    const removed: boolean = await usecase.run(input)

    expect(removed).toBeFalsy()
    expect(machineRepository.getOne).toBeCalledWith(input.unitId, input.machineId)
    expect(machineRepository.delete).toBeCalledWith(input.machineId)
  })

  test('should throw error when machine not found', async () => {
    machineRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.MachineNotFoundError())
  })
})