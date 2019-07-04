class Organization {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.employees = [];
        this._departmentsBudget = {
            marketing: budget * 0.4,
            finance: budget * 0.25,
            production: budget * 0.35,
        }
    }

    get departmentsBudget() {
        return this._departmentsBudget;
    }

    add(employeeName, department, salary) {
        if (this.departmentsBudget[department] < salary) {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`
        }

        this.departmentsBudget[department] -= salary;
        this.employees.push({ employeeName, department, salary });
        return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
    }

    employeeExists(employeeName) {
        const employee = this.employees.find(e => e.employeeName === employeeName);
        if (employee) {
            return `Mr./Mrs. ${employee.employeeName} is part of the ${employee.department} department.`;
        }

        return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
    }

    leaveOrganization(employeeName) {
        const employee = this.employees.find(e => e.employeeName === employeeName);
        if (employee) {
            const index = this.employees.indexOf(employee);
            this.departmentsBudget[employee.department] += employee.salary;
            this.employees.splice(index, 1);
            return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
        }

        return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
    }

    status() {
        let marketingEmployees = this.employees.filter(e => e.department === 'marketing').sort((a, b) => {
            return b.salary - a.salary;
        }).map(e => e.employeeName);
        let financeEmployees = this.employees.filter(e => e.department === 'finance').sort((a, b) => {
            return b.salary - a.salary;
        }).map(e => e.employeeName);
        let productionEmployees = this.employees.filter(e => e.department === 'production').sort((a, b) => {
            return b.salary - a.salary;
        }).map(e => e.employeeName);

        let output = '';

        output += `${this.name.toUpperCase()} DEPARTMENTS:`
        output += `\nMarketing | Employees: ${marketingEmployees.length}:`
        output += marketingEmployees.length === 0 ? '' : ` ${marketingEmployees.join(', ')}`
        output += ` | Remaining Budget: ${this.departmentsBudget['marketing']}`;

        output += `\nFinance | Employees: ${financeEmployees.length}:`
        output += financeEmployees.length === 0 ? '' : ` ${financeEmployees.join(', ')}`
        output += ` | Remaining Budget: ${this.departmentsBudget['finance']}`;

        output += `\nProduction | Employees: ${productionEmployees.length}:`
        output += productionEmployees.length === 0 ? '' : ` ${productionEmployees.join(', ')}`
        output += ` | Remaining Budget: ${this.departmentsBudget['production']}`;


        return output;
    }
}

let organization = new Organization('SoftUni', 20000);

// organization.add('Peter', 'marketing', 200);
// organization.add('George', 'marketing', 120);
// organization.add('Ivan', 'marketing', 300);
organization.add('Petdsfdsfer', 'production', 200);
organization.add('Geosdfsdfrge', 'production', 120);
organization.add('Ivdsfan', 'production', 300);
organization.add('Pedsfter', 'finance', 200);
organization.add('Georsdfge', 'finance', 120);
organization.add('Ivsdfan', 'finance', 300);
console.log(organization.status());
