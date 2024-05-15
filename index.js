#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    tasks = [];
    addStudent(studentName) {
        const existingStudent = this.students.find((student) => student.name === studentName);
        if (existingStudent) {
            console.log(chalk.red("Student already exists."));
        }
        else {
            const newStudent = new Student(studentName);
            this.students.push(newStudent);
            console.log(chalk.green(`Student "${studentName}" added successfully.`));
        }
    }
    addTask(task) {
        this.tasks.push(task);
        console.log(chalk.green(`Task "${task}" added successfully.`));
    }
    viewStudents() {
        console.log(chalk.blue("Students:"));
        this.students.forEach((student, index) => console.log(chalk.blue(`${index + 1}. ${student.name}`)));
    }
    viewTasks() {
        console.log(chalk.yellow("Tasks:"));
        this.tasks.forEach((task, index) => console.log(chalk.yellow(`${index + 1}. ${task}`)));
    }
}
const persons = new Person();
const programStart = async (persons) => {
    const topLineLength = 50;
    const welcomeMessage = "Welcome to Code with Abdul Waheed";
    const topLine = "=".repeat((topLineLength - welcomeMessage.length) / 2) + welcomeMessage + "=".repeat((topLineLength - welcomeMessage.length) / 2);
    console.log(chalk.yellow(topLine));
    do {
        const answer = await inquirer.prompt({
            message: "What do you want to do?",
            type: "list",
            name: "select",
            choices: ["Add Student", "Add Task", "View Students", "View Tasks", "Exit"],
        });
        switch (answer.select) {
            case "Add Student":
                const studentAnswer = await inquirer.prompt({
                    type: "input",
                    message: "What's the student's name?",
                    name: "student",
                });
                persons.addStudent(studentAnswer.student);
                break;
            case "Add Task":
                const taskAnswer = await inquirer.prompt({
                    type: "input",
                    message: "What task do you want to add?",
                    name: "task",
                });
                persons.addTask(taskAnswer.task);
                break;
            case "View Students":
                persons.viewStudents();
                break;
            case "View Tasks":
                persons.viewTasks();
                break;
            case "Exit":
                return;
        }
    } while (true);
    const bottomLine = "=".repeat(topLineLength);
    console.log(chalk.yellow(bottomLine));
};
programStart(persons);
