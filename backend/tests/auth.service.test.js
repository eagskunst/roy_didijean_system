jest.mock('../api/services/user/admin.service');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const AuthService = require('../api/services/auth/index');
const AdminService = require('../api/services/user/admin.service');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const sequelize = require('../api/lib/sequelize');
const { models } = sequelize;
const { dbMock, UserMock, ClientMock } = require('../mock-sequelieze');

models.Client = ClientMock
models.User = UserMock
jest.mock('../api/lib/sequelize', () => {
    const { dbMock } = require('../mock-sequelieze');
    return dbMock
});


describe('AuthService', () => {
  let authService;
  let mockAdmin;

  beforeEach(() => {
    authService = new AuthService();
    mockAdmin = {
      user: {
        id: 1,
        password: 'hashed_password',
        dataValues: { password: 'hashed_password' }
      },
      dataValues: { user_id: 1 }
    };
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('should authenticate user with valid credentials', async () => {
    AdminService.prototype.findByUsername.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue(true);
    const jwtToken = 'token'
    jwt.sign.mockReturnValue(jwtToken);

    const result = await authService.getUser('tony.stark', 'jarvis0503');
    const { token } = authService.signToken(result);
    expect(result).toEqual({
        user: {
          id: 1,
          password: 'hashed_password',
          dataValues: {}
        },
        dataValues: {}
      });
    expect(token).toBe(jwtToken);
  });

  test('should throw an error for invalid credentials', async () => {
    AdminService.prototype.findByUsername.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.getUser('tony.stark', 'wrongpassword')).rejects.toThrow(
      boom.badRequest("User or credentials do not match")
    );
  });

  test('should throw an error for non-existent user', async () => {
    AdminService.prototype.findByUsername.mockResolvedValue(null);

    await expect(authService.getUser('nonexistent', 'password')).rejects.toThrow(
      boom.badRequest("User or credentials do not match")
    );
  });

  test('should throw an error for username at max length limit', async () => {
    const longUsername = 'a'.repeat(10001);

    await expect(authService.getUser(longUsername, 'password')).rejects.toThrow(
      boom.badRequest("User or credentials do not match")
    );
  });
});
