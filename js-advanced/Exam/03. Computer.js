class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
    }

    get ramUsage() {
        return this.taskManager.reduce((a, b) => a + b.ramUsage, 0);
    }

    get cpuUsage() {
        return this.taskManager.reduce((a, b) => a + b.cpuUsage, 0);
    }

    installAProgram(name, requiredSpace) {
        if (requiredSpace > this.hddMemory) throw new Error('There is not enough space on the hard drive');
        const program = { name, requiredSpace };
        this.installedPrograms.push(program);
        this.hddMemory -= requiredSpace;

        return program;
    }

    uninstallAProgram(name) {
        const uninstall = this.installedPrograms.find(p => p.name === name);

        if (!uninstall) throw new Error('Control panel is not responding');

        this.hddMemory += uninstall.requiredSpace;
        const index = this.installedPrograms.indexOf(uninstall);
        this.installedPrograms.splice(index, 1);
        return this.installedPrograms;
    }

    openAProgram(name) {
        const open = this.installedPrograms.find(p => p.name === name);

        if (!open) throw new Error(`The ${name} is not recognized`);
        if (this.taskManager.find(p => p.name === name)) throw new Error(`The ${name} is already open`);

        const ramUsage = (open.requiredSpace / this.ramMemory) * 1.5;
        const cpuUsage = ((open.requiredSpace / this.cpuGHz) / 500) * 1.5;

        if (this.ramUsage + ramUsage >= 100) throw new Error(`${name} caused out of memory exception`);
        if (this.cpuUsage + cpuUsage >= 100) throw new Error(`${name} caused out of cpu exception`);

        const openToTask = { name, ramUsage, cpuUsage };

        this.taskManager.push(openToTask)

        return openToTask;
    }

    taskManagerView() {
        if (this.taskManager.length === 0) {
            return 'All running smooth so far'
        }

        let output = []

        this.taskManager.forEach(p => output.push(`Name - ${p.name} | Usage - CPU: ${p.cpuUsage.toFixed(0)}%, RAM: ${p.ramUsage.toFixed(0)}%`))

        return output.join('\n');
    }
}

let computer = new Computer(4096, 7.5, 250000);

computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Word');
computer.openAProgram('Excel');
computer.openAProgram('PowerPoint');
computer.openAProgram('Solitare');

console.log(computer.taskManagerView());

