import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";

console.log("It works");

const person = observable({
  firstName: "Mobx",
  lastName: "Course",
});

console.log("our person", person);

class Person {
  @observable
  firstName: string;

  @observable
  lastName: string;

  @observable
  age: number;

  @observable
  isAlive: boolean;

  @observable
  dollars: number = 10;

  constructor(
    firstname: string,
    lastname: string,
    age: number,
    isAlive: boolean
  ) {
    makeObservable(this);
    this.firstName = firstname;
    this.lastName = lastname;
    this.age = age;
    this.isAlive = isAlive;

    when(
      () => this.age > 99,
      () => this.bury()
    );
  }

  @action
  bury() {
    this.isAlive = false;
  }

  @action
  updateFirstName(firstname: string) {
    this.firstName = firstname;
  }

  @action
  updateLastName(lastname: string) {
    this.lastName = lastname;
  }

  @action
  updateFullname(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @action
  updatePerson(
    firstName: string,
    lastName: string,
    age: number,
    isAlive: boolean
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isAlive = isAlive;
  }

  @action
  setAge(age: number) {
    this.age = age;
  }

  @computed
  get Euro() {
    console.log("calculation eurros");
    return this.dollars * 2;
  }

  @action
  withdrawn() {
    this.dollars = this.dollars - 1;
  }
}

const newPerson = new Person("Firstname", "Lastname", 15, true);

// autorun(() => {
//   console.log(
//     `Person name is: ${newPerson.firstName} ${newPerson.lastName} Age: ${newPerson.age}, is alive? ${newPerson.isAlive}`
//   );
// });

// reaction(
//   () => newPerson.isAlive === false,
//   () => console.log("RIP")
// );

// newPerson.updateFirstName("Mobx");
// newPerson.updateLastName("Course");
// newPerson.updatePerson("Mobx", "Course!", 26, true);

// newPerson.setAge(100);

autorun(() => {
  console.log(`Euros: ${newPerson.Euro}`);
});

newPerson.withdrawn();
newPerson.withdrawn();
newPerson.withdrawn();

export {};
