import { GetAllMachineFromUnitUseCase, GetAllMachineFromUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { MachineDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildMachineFixture, buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'
import { Machine } from '../../../../src/domain/entities'

describe("#GetAllMachineFromUnitUseCase", () => {

  const input: GetAllMachineFromUnitUseCaseInput = {
    companyId: 'abc123',
    unitId: 'abcd'
  }

  const fixtureUnit = buildUnitFixture()
  const machinesFixture = [buildMachineFixture({id: '1234'}), buildMachineFixture({id: '4567'})]

  const unitRepository = buildDefaultRepositoryMock()
  const machineRepository = buildDefaultRepositoryMock<Machine>()
  const usecase = new GetAllMachineFromUnitUseCase(machineRepository, unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return machines unit with success', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureUnit)
    machineRepository.getAll.mockResolvedValueOnce(machinesFixture)

    const machines: Array<MachineDto> = await usecase.run(input)

    expect(unitRepository.getOne).toBeCalledWith(input.companyId, input.unitId)
    expect(machineRepository.getAll).toBeCalledWith(input.unitId)
    expect(machines.length).toBe(machinesFixture.length)
  })

  test('should throw error when unit not found', async () => {
    unitRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.UnitNotFoundError())
  })
})