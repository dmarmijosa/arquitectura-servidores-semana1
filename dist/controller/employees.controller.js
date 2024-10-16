"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_json_1 = __importDefault(require("../bin/employees.json"));
const router = (0, express_1.Router)();
let employees = employees_json_1.default;
// Ruta 1: Obtener todos los empleados
// @ts-ignore
router.get('/', (req, res) => {
    const { page, user, badges } = req.query;
    // Ruta 5: Filtrar por privilegios de usuario
    if (user === 'true') {
        const filteredEmployees = employees.filter(emp => emp.privileges === 'user');
        return res.json(filteredEmployees);
    }
    // Ruta 7: Filtrar por badges
    if (badges) {
        const badge = badges;
        const filteredEmployees = employees.filter(emp => emp.badges.includes(badge));
        return res.json(filteredEmployees);
    }
    // Ruta 2 y 3: Paginación
    if (page) {
        const pageNumber = parseInt(page);
        const startIndex = 2 * (pageNumber - 1);
        const endIndex = startIndex + 2;
        const paginatedEmployees = employees.slice(startIndex, endIndex);
        return res.json(paginatedEmployees);
    }
    // Devolver todos los empleados
    res.json(employees);
});
// Ruta 4: Obtener el empleado de mayor edad
router.get('/oldest', (req, res) => {
    const oldestEmployee = employees.reduce((prev, current) => {
        return current.age > prev.age ? current : prev;
    }, employees[0]);
    res.json(oldestEmployee);
});
// Ruta 8: Obtener empleado por nombre
router.get('/:name', (req, res) => {
    const name = req.params.name;
    const employee = employees.find(emp => emp.name === name);
    if (employee) {
        res.json(employee);
    }
    else {
        res.status(404).json({ code: 'not_found' });
    }
});
// Ruta 6: Añadir un nuevo empleado
router.post('/', (req, res) => {
    const newEmployee = req.body;
    // Validar que el nuevo empleado tiene el mismo formato
    if (isValidEmployee(newEmployee)) {
        employees.push(newEmployee);
        res.status(201).json(newEmployee);
    }
    else {
        res.status(400).json({ code: 'bad_request' });
    }
});
// Función para validar el formato del empleado
function isValidEmployee(employee) {
    // Implementar validaciones más robustas si es necesario
    const requiredFields = [
        'name',
        'age',
        'phone',
        'privileges',
        'favorites',
        'finished',
        'badges',
        'points',
    ];
    const hasRequiredFields = requiredFields.every(field => field in employee);
    // Validar tipos de datos si es necesario
    return hasRequiredFields;
}
exports.default = router;
