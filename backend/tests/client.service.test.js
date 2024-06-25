const ClientService = require('../api/services/user/client.service');
const sequelize = require('../api/lib/sequelize');
const { models } = sequelize;
const { dbMock, UserMock, ClientMock } = require('../mock-sequelieze');

models.Client = ClientMock
models.User = UserMock
jest.mock('../api/lib/sequelize', () => {
    const { dbMock } = require('../mock-sequelieze');
    return dbMock
  });

describe('ClientService', () => {
  let clientService;

  beforeEach(() => {
    clientService = new ClientService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create client with valid data', async () => {
    const data = {
      address: 'las uwuquenas',
      cellphone_number: '02763422294',
      cedula: '27271032',
      user: {
        email: 'hanjo@momazo.com',
        password: '12345678',
        name: 'Johan Mora'
      }
    };

    // Mock UserService create method
    const expectedResult = {
        address: 'las uwuquenas',
        cellphone_number: '02763422294',
        cedula: '27271032',
        user_id: 1,
        id: 1
      }
    jest.spyOn(clientService, 'create').mockResolvedValue(expectedResult);

    const result = await clientService.create(data);
    expect(result).toMatchObject(expectedResult);
  });


  test('should update client with valid data', async () => {
    const data = {
      address: 'las uwuquenas',
      cellphone_number: '02763422295',
      cedula: '27271033',
      name: 'johan duque'
    };

    jest.spyOn(clientService, 'findByCedula').mockResolvedValue({
      update: jest.fn(),
      user: { update: jest.fn() }
    });

    const result = await clientService.updateClientByCedula(data);
    expect(result).toBeDefined();
  });

  test('should return null for non-existent client by cedula', async () => {
    const data = {
      address: 'las uwuquenas',
      cellphone_number: '02763422295',
      cedula: '3000',
      name: 'johan duque'
    };
    jest.spyOn(models.Client, 'findOne').mockResolvedValue(null)
    const updatedClient = await clientService.updateClientByCedula(data)
    expect(updatedClient).toBeNull()
  });

  test('should delete client by valid cedula', async () => {
    const mockUser = UserMock.build({
        id: 1,
        email: 'hanjo@momazo.com',
        password: 'hashed_password',
        name: 'Johan Mora'
      })
    const mockClient = ClientMock.build({
        id: 1,
        cedula: '27271032',
        address: 'las uwuquenas',
        cellphone_number: '02763422294',
        user_id: 1,
        user: mockUser
      }, {
        include: [UserMock]
      });
  
      jest.spyOn(clientService, 'findByCedula').mockResolvedValue(mockClient);
      jest.spyOn(mockClient, 'destroy').mockResolvedValue(mockClient);
      jest.spyOn(mockClient.user, 'destroy').mockResolvedValue(mockUser);
  
      const result = await clientService.deleteClientByCedula('27271032');
  
      expect(result).toEqual(mockClient);
      expect(clientService.findByCedula).toHaveBeenCalledWith('27271032');
      expect(mockClient.destroy).toHaveBeenCalled();
      expect(mockClient.user.destroy).toHaveBeenCalled();
  });

  test('should return error for deleting client by non-existent cedula', async () => {
    jest.spyOn(clientService, 'findByCedula').mockResolvedValue(null);

    const result = await clientService.deleteClientByCedula('0987654321');
    expect(result).toBe(null);
  });

  test('should return all clients when there are clients', async () => {
    const clients = [{
      address: 'las uwuquenas',
      cellphone_number: '02763422294',
      cedula: '27271032',
      user: {
        email: 'hanjo@momazo.com',
        name: 'Johan Mora'
      }
    }];

    jest.spyOn(models.Client, 'findAll').mockResolvedValue(clients);

    const result = await clientService.getAll();
    expect(result).toEqual(clients);
  });

  test('should return empty list when no clients', async () => {
    jest.spyOn(models.Client, 'findAll').mockResolvedValue([]);

    const result = await clientService.getAll();
    expect(result).toEqual([]);
  });

  test('should return error when there is a problem getting clients', async () => {
    jest.spyOn(models.Client, 'findAll').mockRejectedValue(new Error('Database error'));

    await expect(clientService.getAll()).rejects.toThrow('Database error');
  });
});
