"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Employees API', () => {
    it('GET /api/employees should return all employees', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/employees');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }));
    it('GET /api/employees?page=1 should return first 2 employees', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/employees?page=1');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    }));
    it('GET /api/employees/oldest should return the oldest employee', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/employees/oldest');
        expect(response.status).toBe(200);
        expect(response.body.age).toBe(43);
    }));
    it('GET /api/employees?user=true should return employees with privileges "user"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/employees?user=true');
        expect(response.status).toBe(200);
        response.body.forEach((emp) => {
            expect(emp.privileges).toBe('user');
        });
    }));
    it('POST /api/employees should add a new employee', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/employees').send(newEmployee);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test');
    }));
    it('GET /api/employees?badges=black should return employees with "black" badge', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/employees?badges=black');
        expect(response.status).toBe(200);
        response.body.forEach((emp) => {
            expect(emp.badges).toContain('black');
        });
    }));
    it('GET /api/employees/NonExistent should return 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/employees/NonExistent');
        expect(response.status).toBe(404);
        expect(response.body.code).toBe('not_found');
    }));
});
