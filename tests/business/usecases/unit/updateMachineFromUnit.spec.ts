import { UpdateMachineFromUnitUseCase, UpdateMachineFromUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { MachineDto, UnitDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildMachineFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#UpdateMachineFromUnitUseCase", () => {

  const input: UpdateMachineFromUnitUseCaseInput = {
    id: '123abc',
    data: { name: 'New name' }
  }

  const fixtureMachine = buildMachineFixture()
  const fixtureNewMachineData = buildMachineFixture({...input.data, id: input.id})

  const machineRepository = buildDefaultRepositoryMock()
  const usecase = new UpdateMachineFromUnitUseCase(machineRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call repository with correct params', async () => {
    machineRepository.getOne.mockResolvedValueOnce(fixtureMachine)
    machineRepository.update.mockResolvedValueOnce(fixtureNewMachineData)
    await usecase.run(input)
    expect(machineRepository.getOne).toBeCalledWith(input.id)
    expect(machineRepository.update).toBeCalledWith(input.id, input.data)
  })

  test('should update machine with success', async () => {
    machineRepository.getOne.mockResolvedValueOnce(fixtureMachine)
    machineRepository.update.mockResolvedValueOnce(fixtureNewMachineData)

    const updatedMachine: MachineDto = await usecase.run(input)

    expect(updatedMachine.id).toBe(input.id)
    expect(updatedMachine).toStrictEqual(MachineDto.fromEntity(fixtureNewMachineData))
    expect(updatedMachine).toBeInstanceOf(MachineDto)
  })

  test('should throw not found error when Unit does not exists', async () => {
    machineRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.MachineNotFoundError())
  })
})