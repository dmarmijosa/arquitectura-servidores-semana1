// @ts-ignore
import request from 'supertest';
import app from '../app';

describe('Employees API', () => {
  it('GET /api/employees should return all employees', async () => {
    const response = await request(app).get('/api/employees');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /api/employees?page=1 should return first 2 employees', async () => {
    const response = await request(app).get('/api/employees?page=1');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('GET /api/employees/oldest should return the oldest employee', async () => {
    const response = await request(app).get('/api/employees/oldest');
    expect(response.status).toBe(200);
    expect(response.body.age).toBe(43);
  });

  it('GET /api/employees?user=true should return employees with privileges "user"', async () => {
    const response = await request(app).get('/api/employees?user=true');
    expect(response.status).toBe(200);
    response.body.forEach((emp: any) => {
      expect(emp.privileges).toBe('user');
    });
  });

  it('POST /api/employees should add a new employee', async () => {
    const newEmployee = {
      name: 'Test',
      age: 30,
      phone: {
        personal: '555-000-000',
        work: '555-111-111',
        ext: '1234',
      },
      privileges: 'user',
      favorites: {
        artist: 'Test Artist',
        food: 'Test Food',
      },
      finished: [1, 2],
      badges: ['test'],
      points: [
        {
          points: 50,
          bonus: 10,
        },
      ],
    };
    const response = await request(app).post('/api/employees').send(newEmployee);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test');
  });

  it('GET /api/employees?badges=black should return employees with "black" badge', async () => {
    const response = await request(app).get('/api/employees?badges=black');
    expect(response.status).toBe(200);
    response.body.forEach((emp: any) => {
      expect(emp.badges).toContain('black');
    });
  });

  it('GET /api/employees/NonExistent should return 404', async () => {
    const response = await request(app).get('/api/employees/NonExistent');
    expect(response.status).toBe(404);
    expect(response.body.code).toBe('not_found');
  });
});
