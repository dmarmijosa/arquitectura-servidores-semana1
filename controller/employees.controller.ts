import { Request, Response, Router } from 'express';
import { Employee } from '../models/employee.model';
import employeesData from '../bin/employees.json';

const router = Router();

let employees: Employee[] = employeesData;

// Ruta 1: Obtener todos los empleados
// @ts-ignore
router.get('/', (req: Request, res: Response) => {
  const { page, user, badges } = req.query;

  // Ruta 5: Filtrar por privilegios de usuario
  if (user === 'true') {
    const filteredEmployees = employees.filter(emp => emp.privileges === 'user');
    return res.json(filteredEmployees);
  }

  // Ruta 7: Filtrar por badges
  if (badges) {
    const badge = badges as string;
    const filteredEmployees = employees.filter(emp => emp.badges.includes(badge));
    return res.json(filteredEmployees);
  }

  // Ruta 2 y 3: Paginación
  if (page) {
    const pageNumber = parseInt(page as string);
    const startIndex = 2 * (pageNumber - 1);
    const endIndex = startIndex + 2;
    const paginatedEmployees = employees.slice(startIndex, endIndex);
    return res.json(paginatedEmployees);
  }

  // Devolver todos los empleados
  res.json(employees);
});

// Ruta 4: Obtener el empleado de mayor edad
router.get('/oldest', (req: Request, res: Response) => {
  const oldestEmployee = employees.reduce((prev, current) => {
    return current.age > prev.age ? current : prev;
  }, employees[0]);
  res.json(oldestEmployee);
});

// Ruta 8: Obtener empleado por nombre
router.get('/:name', (req: Request, res: Response) => {
  const name = req.params.name;
  const employee = employees.find(emp => emp.name === name);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ code: 'not_found' });
  }
});

// Ruta 6: Añadir un nuevo empleado
router.post('/', (req: Request, res: Response) => {
  const newEmployee = req.body as Employee;

  // Validar que el nuevo empleado tiene el mismo formato
  if (isValidEmployee(newEmployee)) {
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } else {
    res.status(400).json({ code: 'bad_request' });
  }
});

// Función para validar el formato del empleado
function isValidEmployee(employee: any): boolean {
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

export default router;
