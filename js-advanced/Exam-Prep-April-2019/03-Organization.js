class Organization {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.employees = [];
        this.departmentsBudget = {
            marketing: budget * 0.4,
            finance: budget * 0.25,
            marketing: budget * 0.35,
        }
    }

    get departmentsBudget() {
        return this._departmentBudget;
    }

    set departmentsBudget(employee) {
        this._departmentBudget[employee.department] -= employess.salary;
    }
}

let organization = new Organization('SoftUni', 20000);
console.log(organization.departmentsBudget.marketing);

// console.log(organization.add('Peter', 'marketing', 1200));
// console.log(organization.add('Robert', 'production', 2000));
// console.log(organization.leaveOrganization('Peter'));

// let organization = new Organization('SBTech', 1000);
// console.log(organization.add('Peter', 'marketing', 800));
// console.log(organization.add('Robert', 'production', 2000));
// console.log(organization.add('Peter', 'production', 2000));
