//============= 1. Функції вищого порядку та замикання==========//

function addParamsToRequest(params) {
  let count = 0;

  return function (data) {
    count += 1;
    return {
      ...params,
      data: data,
      count: count,
    };
  };
}

const sendData = addParamsToRequest({ "access-token": "qwerty" });

const result = sendData({ name: "Joe", age: 17 });
console.log(result);
const result1 = sendData({ name: "Bill", surname: "Jackson" });
console.log(result1);

// ====================================================================//

//====================2. Контексти і this:============================//

const obj = {
  name: "Ron",
  age: 20,

  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};
obj.getData();

function callObj(name, age) {
  const person = { name, age };
  obj.getData.call(person);
}

callObj("Mark", 39);

const bindObj = obj.getData.bind(obj);
bindObj();

// ====================================================================//

//====================== 3. Рекурсія ============================//

const root = {
  name: "name",

  type: "folder",

  children: [
    {
      name: "folder 1",

      type: "folder",

      children: [
        {
          name: "folder 2",

          type: "folder",

          children: [
            {
              name: "file 3",

              type: "file",

              size: 30,
            },
          ],
        },
      ],
    },

    {
      name: "file 1",

      type: "file",

      size: 10,
    },

    {
      name: "file 2",

      type: "file",

      size: 20,
    },
  ],
};

let files = [];

function findFilesRecursively(obj) {
  if (obj.type === "file") {
    files.push(obj.name);
  } else {
    obj.children.forEach((child) => findFilesRecursively(child));
  }
  return files;
}

const fileNames = findFilesRecursively(root);
console.log(fileNames);

// ====================================================================//

//====================== 4. Класи ============================//

// ********** ES6 Class *************

//*********** об'єкт Людина

class Person {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  introduce() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
  }
}

// ///////////////////////////////////////////////////////////////////////
//*********** об'єкт Студент

class Student extends Person {
  constructor(name, phone, course) {
    super(name, phone);
    this.course = course;
  }
  study() {
    console.log(`Я навчаюся на ${this.course} курсі.`);
  }
}

const student = new Student("Martin", "33-444-555", 2);
student.introduce();
student.study();

// ///////////////////////////////////////////////////////////////////////
//*********** об'єкт Викладач
class Teacher extends Person {
  constructor(name, phone, subject) {
    super(name, phone);
    this.subject = subject;
  }
  teach() {
    console.log(`Я викладаю ${this.subject}.`);
  }
}

const teacher = new Teacher("Bob", "11-222-333", "JavaScript");
teacher.introduce();
teacher.teach();

// ///////////////////////////////////////////////////////////////////////

// ********** ES5 prototype *************

//*********** об'єкт Людина

function PersonOld(name, phone) {
  this.name = name;
  this.phone = phone;
}

PersonOld.prototype.introduce = function () {
  console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
};

// ///////////////////////////////////////////////////////////////////////
//*********** об'єкт Студент

function StudentOld(name, phone, course) {
  PersonOld.call(this, name, phone);
  this.course = course;
}

StudentOld.prototype = Object.create(PersonOld.prototype);
StudentOld.prototype.constructor = StudentOld;

StudentOld.prototype.study = function () {
  console.log(`Я навчаюся на ${this.course} курсі.`);
};

const studentOld = new StudentOld("Ron", "88-666-888", 4);
studentOld.introduce();
studentOld.study();

// ///////////////////////////////////////////////////////////////////////
//*********** об'єкт Викладач
function TeacherOld(name, phone, subject) {
  PersonOld.call(this, name, phone);
  this.subject = subject;
}

TeacherOld.prototype = Object.create(PersonOld.prototype);
TeacherOld.prototype.constructor = TeacherOld;

TeacherOld.prototype.teach = function () {
  console.log(`Я викладаю ${this.subject}.`);
};

const teacherOld = new TeacherOld("Lui", "22-222-222", "React");
teacherOld.introduce();
teacherOld.teach();
// /////////////////////////////////////////////////////////////////// ///
