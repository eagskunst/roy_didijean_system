const AdminService = require('../api/services/user/admin.service');
const sequelize = require('../api/lib/sequelize');
const { models } = sequelize;
const { UserMock, AdminMock } = require('../mock-sequelieze');
const { use } = require('passport');

// Sobrescribe los modelos en el objeto `models`
models.Admin = AdminMock
models.User = UserMock
jest.mock('../api/lib/sequelize', () => {
    const { dbMock } = require('../mock-sequelieze');
    return dbMock
});

describe('AdminService', () => {
  let adminService;

  beforeEach(() => {
    adminService = new AdminService();
  });

  test('create client with valid data', async () => {
    const data = {
      user: {
        email: 'hanjo@momazo.com',
        password: '12345678',
        name: 'Johan Mora'
      },
      username: 'adminUser',
    };

    const admin = await adminService.create(data);
    expect(admin).toHaveProperty('user_id');
    expect(admin).toHaveProperty('username', 'adminUser');
  });

  test('create client without user', async () => {
    const data = {
      username: 'adminUser',
    };

    await expect(adminService.create(data)).rejects.toThrow();
  });

  test('get client list', async () => {
    const admins = await adminService.getAll();
    expect(admins.length).toBeGreaterThan(0);
  });

  test('get empty client list', async () => {
    AdminMock.findAll = jest.fn().mockResolvedValue([]);
    const admins = await adminService.getAll();
    expect(admins.length).toBe(0);
  });

  test('update not existent client returns null', async () => {
    const data = {
      username: 'newAdminUser',
      name: 'New Name'
    };

    jest.spyOn(AdminMock, 'findOne').mockResolvedValue(null)
    const updatedAdmin = await adminService.updateAdminByUsername(data);
    expect(updatedAdmin).toBe(null)
  });

  test('delete client with valid username', async () => {
    const mockUser = UserMock.build({
        id: 1,
        email: 'hanjo@momazo.com',
        password: 'hashed_password',
        name: 'Johan Mora'
      })
    const username = 'adminUser';
    const mockAdmin = AdminMock.build({
        id: 1,
        cedula: '27271032',
        address: 'las uwuquenas',
        cellphone_number: '02763422294',
        user_id: 1,
        username: username,
        user: mockUser
      }, {
        include: [UserMock]
    });
  
    jest.spyOn(AdminMock, 'findOne').mockResolvedValue(mockAdmin)
    jest.spyOn(mockAdmin, 'destroy').mockResolvedValue(mockAdmin);
    jest.spyOn(mockAdmin.user, 'destroy').mockResolvedValue(mockUser);
    const deletedAdmin = await adminService.delete(username);
    expect(deletedAdmin).toBeTruthy();
  });

  test('delete client with non valid username', async () => {
    const username = 'nonExistentUser';
    AdminMock.findOne = jest.fn().mockResolvedValue(null);
    const deletedAdmin = await adminService.delete(username);
    expect(deletedAdmin).toBeNull();
  });
});
