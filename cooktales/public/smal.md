# 🎯 Frontend React Developer Interview Guide

<!-- 
Цей файл містить повний гайд для підготовки до співбесіди на позицію Junior Frontend React Developer.
Структура: HTML → CSS/SCSS/БЕМ → JavaScript → React → TypeScript → Next.js → Практичні завдання
Кожен розділ містить найпопулярніші питання з відповідями та прикладами коду.
-->

## 📚 HTML Основи

<!-- HTML - мова розмітки для структури веб-сторінок -->

### Q: Що таке семантичні теги та навіщо вони потрібні?

**A:** Семантичні теги надають значення контенту, а не просто структуру.

```html
<!-- ❌ Погано - без семантики -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- ✅ Добре - з семантикою -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
```

**Переваги:** SEO оптимізація, доступність для людей з обмеженими можливостями, читабельність коду.

### Q: Які основні типи input елементів?

```html
<!-- Основні типи inputs -->
<input type="text" placeholder="Text input">
<input type="email" required>
<input type="password">
<input type="number" min="0" max="100">
<input type="date">
<input type="checkbox" checked>
<input type="radio" name="gender" value="male">
<input type="file" accept=".jpg,.png">
<input type="submit" value="Submit">
```

### Q: Як працює валідація форм?

```html
<form>
  <label for="email">Email:</label>
  <input 
    type="email" 
    id="email" 
    required 
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    aria-describedby="email-error"
  >
  <span id="email-error" class="error"></span>
  <input type="submit" value="Submit">
</form>
```

---

## 🎨 CSS/SCSS/БЕМ

<!-- CSS - каскадні таблиці стилів для оформлення веб-сторінок -->

### Q: Різниця між CSS та SCSS?

**CSS** - базовий синтаксис стилів  
**SCSS** - препроцесор з розширеними можливостями

```css
/* CSS - багато повторів */
.button-primary {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

.button-secondary {
  background: #6c757d;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}
```

```scss
// SCSS - змінні та mixins
$primary: #007bff;
$secondary: #6c757d;

@mixin button($bg-color) {
  background: $bg-color;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  
  &:hover {
    background: darken($bg-color, 10%);
  }
}

.button-primary { @include button($primary); }
.button-secondary { @include button($secondary); }
```

### Q: Що таке БЕМ методологія?

**БЕМ** (Block Element Modifier) - методологія іменування CSS класів для уникнення конфліктів.

```scss
// Блок - незалежний компонент
.card {
  border: 1px solid #ccc;
  padding: 20px;
  
  // Елемент - частина блоку
  &__title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  &__content {
    line-height: 1.6;
  }
  
  &__button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    
    // Модифікатор - варіація блоку/елементу
    &--disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    &--large {
      padding: 15px 25px;
      font-size: 18px;
    }
  }
}
```

```html
<div class="card">
  <h2 class="card__title">Заголовок</h2>
  <p class="card__content">Контент</p>
  <button class="card__button card__button--large">Велика кнопка</button>
  <button class="card__button card__button--disabled">Неактивна</button>
</div>
```

### Q: Flexbox vs Grid - коли що використовувати?

```css
/* Flexbox - для одновимірних макетів (рядок або колонка) */
.navbar {
  display: flex;
  justify-content: space-between; /* горизонтальне вирівнювання */
  align-items: center; /* вертикальне вирівнювання */
  gap: 1rem;
}

/* Grid - для двовимірних макетів (рядки і колонки) */
.layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr;
}
```

### Q: Що таке CSS специфічність?

**Специфічність** визначає, які стилі застосуються при конфлікті правил.

**Порядок (від найвищої до найнижчої):**
1. Inline styles (style="...") - 1000
2. IDs (#header) - 100
3. Classes (.header), attributes ([type="text"]) - 10
4. Elements (div, p) - 1

```css
/* Специфічність: 1 */
p { color: black; }

/* Специфічність: 10 */
.text { color: blue; }

/* Специфічність: 100 */
#header { color: green; }

/* Специфічність: 111 */
#header .text p { color: red; }
```

---

## 🚀 JavaScript Основи

<!-- JavaScript - мова програмування для інтерактивності веб-сторінок -->

### Q: Які типи даних є в JavaScript?

```javascript
// Примітивні типи
let str = "Hello"; // string
let num = 42; // number
let bool = true; // boolean
let nothing = null; // null
let undef = undefined; // undefined
let sym = Symbol('id'); // symbol (ES6)
let bigNum = 123n; // bigint (ES2020)

// Об'єктний тип
let obj = { name: "John", age: 30 }; // object
let arr = [1, 2, 3]; // array (різновид object)
let func = function() {}; // function (різновид object)
```

### Q: Різниця між var, let та const?

```javascript
// var - function scope, hoisting
console.log(x); // undefined (не error!)
var x = 5;

function example() {
  if (true) {
    var y = 10;
  }
  console.log(y); // 10 - доступний поза блоком
}

// let - block scope
function example2() {
  if (true) {
    let z = 10;
  }
  console.log(z); // ReferenceError - недоступний поза блоком
}

// const - незмінна посилання
const arr = [1, 2, 3];
arr.push(4); // OK - змінюємо вміст
// arr = [5, 6]; // Error - не можна змінити посилання
```

### Q: Що таке hoisting?

**Hoisting** - підняття оголошень змінних та функцій на початок області видимості.

```javascript
// Так ми пишемо
console.log(sayHello()); // "Hello!"
console.log(x); // undefined

function sayHello() {
  return "Hello!";
}

var x = 5;

// Так інтерпретується код
function sayHello() {
  return "Hello!";
}

var x; // undefined
console.log(sayHello()); // "Hello!"
console.log(x); // undefined
x = 5;
```

### Q: Різниця між функціями?

```javascript
// 1. Function Declaration - hoisting працює
console.log(sayHello()); // "Hello!" - працює!

function sayHello() {
  return "Hello!";
}

// 2. Function Expression - hoisting НЕ працює
console.log(sayBye()); // Error!

const sayBye = function() {
  return "Bye!";
};

// 3. Arrow Function - немає власного this
const greet = (name) => `Hello, ${name}!`;

// Різниця з this
const user = {
  name: "John",
  
  greet: function() {
    return `Hello, ${this.name}`; // this = user
  },
  
  greetArrow: () => {
    return `Hello, ${this.name}`; // this = window (undefined)
  }
};
```

### Q: Що таке замикання (closure)?

**Замикання** - функція, яка має доступ до змінних зовнішньої області видимості.

```javascript
function createCounter() {
  let count = 0; // приватна змінна
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 - окремий лічильник

// Практичне використання - модуль з приватними методами
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      throw new Error("Insufficient funds");
    },
    
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
// balance недоступний ззовні!
```

### Q: Як працює this?

```javascript
const user = {
  name: "John",
  age: 30,
  
  greet() {
    console.log(`Hello, ${this.name}`); // this = user
  },
  
  greetLater() {
    setTimeout(function() {
      console.log(`Hello, ${this.name}`); // this = window (undefined)
    }, 1000);
  },
  
  greetLaterFixed() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // this = user (стрілкова функція)
    }, 1000);
  }
};

// Втрата контексту
const greetFunc = user.greet;
greetFunc(); // this = undefined

// Прив'язка контексту
const boundGreet = user.greet.bind(user);
boundGreet(); // this = user

// call та apply
user.greet.call({ name: "Jane" }); // Hello, Jane
user.greet.apply({ name: "Bob" }); // Hello, Bob
```

---

## 🔄 JavaScript ES6+ та Асинхронність

### Q: Що таке деструктуризація?

```javascript
// Деструктуризація масивів
const colors = ['red', 'green', 'blue'];
const [first, second, ...rest] = colors;
console.log(first); // 'red'
console.log(rest); // ['blue']

// Деструктуризація об'єктів
const user = { name: "John", age: 30, city: "Kyiv" };
const { name, age, country = "Ukraine" } = user; // значення за замовчуванням

// Перейменування
const { city: userCity } = user;

// В параметрах функції
function greetUser({ name, age = 18 }) {
  return `Hello ${name}, you are ${age}`;
}

greetUser({ name: "John", age: 25 }); // Hello John, you are 25
```

### Q: Spread та Rest оператори?

```javascript
// Spread - розпакування
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const user = { name: "John", age: 30 };
const updatedUser = { ...user, age: 31, city: "Kyiv" };
// { name: "John", age: 31, city: "Kyiv" }

// Rest - збирання
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
sum(1, 2, 3, 4); // 10

const [first, ...others] = [1, 2, 3, 4];
console.log(others); // [2, 3, 4]
```

### Q: Методи масивів ES6+?

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - трансформація кожного елементу
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - фільтрація
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// find - знайти перший елемент
const found = numbers.find(n => n > 3); // 4

// reduce - зведення до одного значення
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// some - чи є хоча б один
const hasEven = numbers.some(n => n % 2 === 0); // true

// every - чи всі відповідають умові
const allPositive = numbers.every(n => n > 0); // true

// includes - чи містить елемент
const hasThree = numbers.includes(3); // true
```

### Q: Різниця між Promise, async/await та callback?

```javascript
// 1. Callback (старий спосіб) - може призвести до "callback hell"
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id > 0) {
      callback(null, { id, name: `User ${id}` });
    } else {
      callback(new Error("Invalid ID"), null);
    }
  }, 1000);
}

fetchUser(1, (error, user) => {
  if (error) {
    console.error(error);
  } else {
    console.log(user);
  }
});

// 2. Promise - краща обробка асинхронності
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}` });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

fetchUserPromise(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));

// 3. Async/Await - найчитабельніший спосіб
async function getUser(id) {
  try {
    const user = await fetchUserPromise(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Паралельні запити
async function getMultipleUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      fetchUserPromise(1),
      fetchUserPromise(2),
      fetchUserPromise(3)
    ]);
    
    return [user1, user2, user3];
  } catch (error) {
    console.error("One of the requests failed:", error);
  }
}
```

### Q: Що таке чиста функція?

**Чиста функція** - функція, яка:
1. Завжди повертає той же результат для тих же аргументів
2. Не має побічних ефектів (не змінює зовнішній стан)

```javascript
// ✅ Чисті функції
function add(a, b) {
  return a + b; // завжди той же результат
}

function multiply(a, b) {
  return a * b;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Нечисті функції
let counter = 0;
function increment() {
  counter++; // змінює зовнішню змінну
  return counter;
}

function addRandom(a) {
  return a + Math.random(); // результат не передбачуваний
}

function updateUser(user) {
  user.lastUpdated = new Date(); // мутує вхідний об'єкт
  return user;
}

// ✅ Чиста версія
function updateUserPure(user) {
  return {
    ...user,
    lastUpdated: new Date()
  };
}
```

---

## ⚛️ React Основи

<!-- React - JavaScript бібліотека для створення користувацьких інтерфейсів -->

### Q: Що таке React і навіщо він потрібен?

**React** - JavaScript бібліотека для створення UI з наступними перевагами:

- **Компонентність** - UI складається з переviкористовуваних компонентів
- **Декларативність** - описуємо ЩО хочемо, а не ЯК це зробити
- **Virtual DOM** - швидкі оновлення завдяки порівнянню віртуального та реального DOM
- **Односпрямований потік даних** - дані течуть від батька до дитини

```jsx
// Декларативний підхід React
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Порівняння з імперативним підходом (vanilla JS)
const button = document.getElementById('button');
const heading = document.getElementById('heading');
let count = 0;

button.addEventListener('click', () => {
  count++;
  heading.textContent = `Count: ${count}`;
});
```

### Q: Різниця між функціональними та класовими компонентами?

```jsx
// Класовий компонент (застарілий підхід)
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    console.log("Component mounted");
  }
  
  componentDidUpdate() {
    console.log("Component updated");
  }
  
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// Функціональний компонент (сучасний підхід)
function Welcome({ name }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Component mounted or updated");
  });
  
  useEffect(() => {
    console.log("Component mounted");
  }, []); // тільки при mount
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Q: Що таке JSX та його правила?

**JSX** - синтаксичний цукор для React.createElement

```jsx
// JSX
const element = <h1>Hello, world!</h1>;

// Компілюється в
const element = React.createElement('h1', null, 'Hello, world!');

// Правила JSX:
function App() {
  const user = { name: "John", age: 30 };
  const isLoggedIn = true;
  
  return (
    // 1. Один батьківський елемент
    <div className="app"> {/* className, не class */}
      {/* 2. Вирази в фігурних дужках */}
      <h1>Welcome, {user.name}!</h1>
      
      {/* 3. Умовний рендеринг */}
      {isLoggedIn ? (
        <p>You are logged in</p>
      ) : (
        <p>Please log in</p>
      )}
      
      {/* 4. Списки з key */}
      <ul>
        {[1, 2, 3].map(num => (
          <li key={num}>Item {num}</li>
        ))}
      </ul>
      
      {/* 5. Логічний AND */}
      {user.age >= 18 && <p>Adult user</p>}
      
      {/* 6. Всі теги мають бути закриті */}
      <input type="text" />
      <br />
    </div>
  );
}

// React Fragment - для уникнення зайвих div
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

### Q: Різниця між state та props?

```jsx
// Props - дані від батьківського компонента (незмінні)
function ChildComponent({ name, age, onButtonClick }) {
  // name, age - props (читання only)
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
}

// State - внутрішні дані компонента (змінні)
function ParentComponent() {
  const [userName, setUserName] = useState("John");
  const [userAge, setUserAge] = useState(25);
  
  const handleButtonClick = () => {
    setUserAge(userAge + 1); // змінюємо state
  };
  
  return (
    <div>
      <ChildComponent 
        name={userName}        // передаємо props
        age={userAge}          // передаємо props
        onButtonClick={handleButtonClick} // передаємо функцію
      />
      
      <input 
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}
```

### Q: Життєвий цикл React компонента?

```jsx
// Фази життєвого циклу:
// 1. Mounting (створення)
// 2. Updating (оновлення)
// 3. Unmounting (видалення)

function LifecycleExample({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mounting + Updating (коли змінюється userId)
  useEffect(() => {
    console.log("Component mounted or userId changed");
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchData();
    }
  }, [userId]); // залежність - запускається при зміні userId
  
  // Mounting (тільки один раз)
  useEffect(() => {
    console.log("Component mounted");
    
    const timer = setInterval(() => {
      console.log("Timer tick");
    }, 1000);
    
    // Unmounting (cleanup)
    return () => {
      console.log("Component unmounted - cleanup");
      clearInterval(timer);
    };
  }, []); // порожній масив = тільки при mount/unmount
  
  // Updating (при кожному render)
  useEffect(() => {
    console.log("Component rendered");
  }); // без масиву залежностей
  
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
```

### Q: Що таке key prop і навіщо він потрібен?

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // ❌ Погано - використання index як key
        <li key={index}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

function TodoListCorrect({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        // ✅ Добре - унікальний ідентифікатор
        <li key={todo.id}>
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**Навіщо key потрібен:**
- React використовує key для ідентифікації елементів при оновленні
- Без key React може неправильно оновити DOM
- key повинен бути унікальним та стабільним

---

## 🎣 React Hooks

<!-- Хуки - функції, які дозволяють "підключитися" до стану та життєвого циклу React -->

### Q: Що таке useState та як він працює?

```jsx
function Counter() {
  // useState повертає [значення, функція для зміни]
  const [count, setCount] = useState(0); // початкове значення
  const [user, setUser] = useState({ name: "", email: "" });
  const [items, setItems] = useState([]);
  
  // ❌ Неправильно - пряма мутація
  const handleBadIncrement = () => {
    count++; // НЕ працює!
    setCount(count); // React не помітить зміну
  };
  
  // ✅ Правильно - створення нового значення
  const handleIncrement = () => {
    setCount(count + 1);
    // АБО краще з функцією (для уникнення stale closures)
    setCount(prev => prev + 1);
  };
  
  // Для об'єктів - ЗАВЖДИ створюємо новий об'єкт
  const updateUser = (field, value) => {
    setUser(prev => ({
      ...prev,          // копіюємо попередні властивості
      [field]: value    // оновлюємо потрібну властивість
    }));
  };
  
  // Для масивів
  const addItem = (newItem) => {
    setItems(prev => [...prev, newItem]); // додаємо в кінець
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
      
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
    </div>
  );
}
```

### Q: Коли та як використовувати useEffect?

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Ефект без залежностей - запускається після кожного render
  useEffect(() => {
    console.log('Component rendered');
  });
  
  // 2. Ефект з порожнім масивом - запускається тільки один раз (componentDidMount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Приклад: встановлення глобальних слухачів
    const handleResize = () => console.log('Window resized');
    window.addEventListener('resize', handleResize);
    
    // Cleanup функція (componentWillUnmount)
    return () => {
      console.log('Cleanup');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // порожній масив залежностей
  
  // 3. Ефект з залежностями - запускається при зміні залежностей
  useEffect(() => {
    console.log('userId changed:', userId);
    
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]); // запускається при зміні userId
  
  // 4. Ефект для зміни document.title
  useEffect(() => {
    document.title = user ? `${user.name} Profile` : 'Loading...';
  }, [user]); // залежить від user
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Q: Що таке useContext та коли його використовувати?

**useContext** розв'язує проблему "prop drilling" - передачі props через багато рівнів компонентів.

```jsx
// Проблема: prop drilling
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <div>
      <Header user={user} />           {/* передаємо props */}
      <Main user={user} />             {/* передаємо props */}
      <Footer user={user} />           {/* передаємо props */}
    </div>
  );
}

function Header({ user }) {
  return (
    <header>
      <Navigation user={user} />       {/* передаємо далі */}
    </header>
  );
}

function Navigation({ user }) {
  return (
    <nav>
      <UserMenu user={user} />         {/* передаємо далі */}
    </nav>
  );
}

// Рішення: Context
import { createContext, useContext, useState } from 'react';

// 1. Створюємо контекст
const UserContext = createContext();

// 2. Створюємо Provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = {
    user,
    login,
    logout,
    loading
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook для зручності
function useUser() {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
}

// 4. Використання в компонентах
function Header() {
  const { user, logout } = useUser(); // без prop drilling!
  
  return (
    <header>
      {user ? (
        <div>
          Welcome, {user.name}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </header>
  );
}

function LoginForm() {
  const { login, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert('Login failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// 5. Обгортаємо App в Provider
function App() {
  return (
    <UserProvider>
      <Header />
      <LoginForm />
      <Main />
    </UserProvider>
  );
}
```

### Q: Як створювати власні хуки (Custom Hooks)?

**Custom Hook** - функція, яка використовує інші хуки та дозволяє переиспользвати логіку.

```jsx
// Custom hook для API запитів
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!url) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Custom hook для localStorage
function useLocalStorage(key, initialValue) {
  // Отримуємо значення з localStorage при ініціалізації
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Функція для оновлення значення
  const setStoredValue = (value) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  return [value, setStoredValue];
}

// Custom hook для debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Використання custom hooks
function UserProfile({ userId }) {
  // Використовуємо custom hook для API
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  
  // Використовуємо localStorage hook
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div className={`profile ${theme}`}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </div>
  );
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Використовуємо debounce hook
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // API запит тільки після завершення введення
  const { data: results, loading } = useApi(
    debouncedSearchTerm ? `/api/search?q=${debouncedSearchTerm}` : null
  );
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      
      {loading && <div>Searching...</div>}
      
      {results && (
        <ul>
          {results.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 📘 TypeScript Основи

<!-- TypeScript - надмножина JavaScript з статичною типізацією -->

### Q: Навіщо потрібен TypeScript?

**TypeScript** додає статичну типізацію до JavaScript, що дозволяє виявляти помилки на етапі розробки.

```typescript
// JavaScript - помилки тільки під час виконання
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(null); // Runtime Error: Cannot read property 'toUpperCase' of null
greet(123);  // Runtime Error: name.toUpperCase is not a function

// TypeScript - помилки під час розробки
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

greet(null); // Compile Error!
greet(123);  // Compile Error!
greet("John"); // ✅ OK
```

### Q: Основні типи TypeScript?

```typescript
// Примітивні типи
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;

// Масиви
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Об'єкти
interface User {
  id: number;
  name: string;
  email?: string;        // опціональне поле
  readonly created: Date; // тільки для читання
}

const user: User = {
  id: 1,
  name: "John",
  created: new Date()
  // email не обов'язковий
};

// Union types
let id: string | number = "123"; // може бути string або number
id = 456; // ✅ OK

// Literal types
let status: "loading" | "success" | "error" = "loading";
status = "success"; // ✅ OK
// status = "pending"; // ❌ Error

// Функції
function add(a: number, b: number): number {
  return a + b;
}

// Стрілкові функції
const multiply = (a: number, b: number): number => a * b;

// Опціональні параметри
function greetUser(name: string, age?: number): string {
  if (age) {
    return `Hello ${name}, you are ${age}`;
  }
  return `Hello ${name}`;
}

// Значення за замовчуванням
function createUser(name: string, role: string = "user"): User {
  return {
    id: Date.now(),
    name,
    created: new Date()
  };
}
```

### Q: React з TypeScript?

```typescript
import React, { useState, useEffect } from 'react';

// Interface для props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

// Типізований компонент
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium'
}) => {
  return (
    <button 
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Типи для стану
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Компонент з типізованим стором
function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  // Типізовані функції
  const addTodo = (text: string): void => {
    const newTodo: TodoItem = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prev => [...prev, newTodo]);
  };
  
  const toggleTodo = (id: number): void => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  
  // Типізовані обробники подій
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // логіка submit
  };
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('Button clicked');
  };
  
  return (
    <div>
      <Button onClick={() => addTodo("New todo")}>
        Add Todo
      </Button>
      
      <input onChange={handleInputChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Generic типи для API відповідей
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Використання Generic
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success"
};

const todosResponse: ApiResponse<TodoItem[]> = {
  data: [
    { id: 1, text: "Learn TypeScript", completed: false, createdAt: new Date() }
  ],
  status: 200,
  message: "Success"
};
```

### Q: Generics в TypeScript?

```typescript
// Generic функція
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello"); // string
const numberResult = identity<number>(42);      // number
const boolResult = identity<boolean>(true);     // boolean

// Generic з обмеженнями
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // OK, бо T має length
  return arg;
}

logLength("hello");     // ✅ OK - string має length
logLength([1, 2, 3]);   // ✅ OK - array має length
// logLength(123);      // ❌ Error - number не має length

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

const stringContainer: Container<string> = {
  value: "hello",
  getValue() {
    return this.value;
  }
};

// Generic класи
class DataStorage<T> {
  private data: T[] = [];
  
  addItem(item: T): void {
    this.data.push(item);
  }
  
  getItems(): T[] {
    return [...this.data];
  }
  
  removeItem(item: T): void {
    this.data = this.data.filter(i => i !== item);
  }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("hello");
stringStorage.addItem("world");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
```

---

## 🚀 Next.js vs Node.js

### Q: Різниця між React, Next.js та Node.js?

| Технологія | Призначення | Особливості |
|------------|-------------|-------------|
| **React** | UI бібліотека | Тільки фронтенд, SPA |
| **Next.js** | React фреймворк | SSR/SSG, роутинг, API routes |
| **Node.js** | JavaScript runtime | Серверна розробка |

```jsx
// Звичайний React (SPA)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// Next.js - файловий роутинг (автоматичний)
// pages/index.js
export default function Home() {
  return <div>Home Page</div>;
}

// pages/about.js
export default function About() {
  return <div>About Page</div>;
}

// pages/users/[id].js - динамічний роутинг
import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  
  return <div>User ID: {id}</div>;
}
```

### Q: Server-Side Rendering (SSR) в Next.js?

```jsx
// getServerSideProps - запускається на кожному запиті на сервері
export async function getServerSideProps(context) {
  const { params, query, req, res } = context;
  
  // Доступ до headers, cookies
  const userAgent = req.headers['user-agent'];
  
  try {
    const response = await fetch(`https://api.example.com/users/${params.id}`);
    
    if (!response.ok) {
      return {
        notFound: true // показати 404 сторінку
      };
    }
    
    const user = await response.json();
    
    return {
      props: {
        user,
        userAgent
      }
    };
  } catch (error) {
    return {
      props: {
        user: null,
        error: 'Failed to fetch user'
      }
    };
  }
}

export default function UserPage({ user, userAgent, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <small>User agent: {userAgent}</small>
    </div>
  );
}
```

### Q: Static Site Generation (SSG) в Next.js?

```jsx
// getStaticProps - запускається під час білду
export async function getStaticProps() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();
  
  return {
    props: {
      posts
    },
    revalidate: 60 // ISR - регенерація кожну хвилину
  };
}

// getStaticPaths - для динамічних маршрутів
export async function getStaticPaths() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();
  
  // Генеруємо шляхи для всіх постів
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,
    fallback: false // або 'blocking', true
  };
}

export default function PostPage({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### Q: API Routes в Next.js?

```javascript
// pages/api/users.js - створює ендпоінт /api/users
export default function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      return getUsers(req, res);
    case 'POST':
      return createUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getUsers(req, res) {
  try {
    // Логіка отримання користувачів
    const users = await fetchUsersFromDB();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const user = await createUserInDB({ name, email });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// pages/api/users/[id].js - динамічний роут /api/users/123
export default function handler(req, res) {
  const { query: { id } } = req;
  
  if (req.method === 'GET') {
    // GET /api/users/123
    res.status(200).json({ user: { id, name: `User ${id}` } });
  } else if (req.method === 'DELETE') {
    // DELETE /api/users/123
    res.status(200).json({ message: `User ${id} deleted` });
  }
}
```

### Q: Next.js vs Node.js + Express?

```javascript
// Next.js підхід
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    res.status(201).json({ message: 'User created' });
  }
}

// Node.js + Express підхід
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

**Коли використовувати що:**
- **Next.js**: коли потрібен фулстек додаток з React, SEO, SSR/SSG
- **Node.js + Express**: коли потрібен тільки API, більше контролю, мікросервіси

---

## 💻 Практичні Завдання

### JavaScript Завдання

#### Завдання 1: Робота з масивами та об'єктами

```javascript
const users = [
  { id: 1, name: "John", age: 25, department: "IT", salary: 50000, active: true },
  { id: 2, name: "Jane", age: 30, department: "HR", salary: 45000, active: false },
  { id: 3, name: "Bob", age: 35, department: "IT", salary: 60000, active: true },
  { id: 4, name: "Alice", age: 28, department: "Marketing", salary: 48000, active: true }
];

// Завдання:
// 1. Знайти всіх активних користувачів з IT відділу
// 2. Підрахувати середню зарплату активних користувачів
// 3. Знайти найстаршого користувача
// 4. Створити об'єкт з кількістю працівників по відділах
// 5. Збільшити зарплату всім IT працівникам на 10%

// РІШЕННЯ:

// 1. Активні IT користувачі
const activeITUsers = users.filter(user => 
  user.department === 'IT' && user.active
);
console.log('Active IT users:', activeITUsers);

// 2. Середня зарплата активних користувачів
const activeUsers = users.filter(user => user.active);
const averageSalary = activeUsers.reduce((sum, user) => sum + user.salary, 0) / activeUsers.length;
console.log('Average salary:', averageSalary);

// 3. Найстарший користувач
const oldestUser = users.reduce((oldest, user) => 
  user.age > oldest.age ? user : oldest
);
console.log('Oldest user:', oldestUser);

// 4. Кількість працівників по відділах
const departmentCount = users.reduce((acc, user) => {
  acc[user.department] = (acc[user.department] || 0) + 1;
  return acc;
}, {});
console.log('Department count:', departmentCount);

// 5. Збільшення зарплати IT працівникам
const updatedUsers = users.map(user => 
  user.department === 'IT' 
    ? { ...user, salary: user.salary * 1.1 }
    : user
);
console.log('Updated users:', updatedUsers);
```

#### Завдання 2: Асинхронне програмування

```javascript
// Імітація API
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0 && userId <= 5) {
        resolve({ 
          id: userId, 
          name: `User ${userId}`, 
          email: `user${userId}@example.com` 
        });
      } else {
        reject(new Error(`Invalid user ID: ${userId}`));
      }
    }, Math.random() * 1000); // випадкова затримка
  });
}

// Завдання: Створити функцію, яка:
// 1. Завантажує дані кількох користувачів паралельно
// 2. Обробляє помилки для кожного запиту окремо
// 3. Повертає успішні результати та помилки
// 4. Має таймаут для запитів

// РІШЕННЯ:

// Функція з таймаутом
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

async function fetchMultipleUsersAdvanced(userIds, timeoutMs = 2000) {
  console.log(`Fetching users: ${userIds.join(', ')}`);
  
  // Створюємо промиси для всіх користувачів
  const promises = userIds.map(async (id) => {
    try {
      const user = await withTimeout(fetchUserData(id), timeoutMs);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, id, error: error.message };
    }
  });
  
  // Чекаємо всі промиси (навіть ті, що помилилися)
  const results = await Promise.all(promises);
  
  // Розділяємо успішні та помилкові результати
  const successful = results.filter(result => result.success).map(result => result.data);
  const errors = results.filter(result => !result.success);
  
  return {
    users: successful,
    errors: errors,
    total: results.length,
    successRate: (successful.length / results.length * 100).toFixed(1) + '%'
  };
}

// Використання
async function runExample() {
  try {
    const result = await fetchMultipleUsersAdvanced([1, 2, -1, 4, 999, 3]);
    
    console.log('✅ Successful users:', result.users);
    console.log('❌ Errors:', result.errors);
    console.log('📊 Success rate:', result.successRate);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

runExample();
```

### React Завдання

#### Завдання 1: Todo List з фільтрацією та localStorage

```jsx
import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState# 🎯 Frontend React Developer Interview Guide

<!-- 
Цей файл містить повний гайд для підготовки до співбесіди на позицію Junior Frontend React Developer.
Структура: HTML → CSS/SCSS/БЕМ → JavaScript → React → TypeScript → Next.js → Практичні завдання
Кожен розділ містить найпопулярніші питання з відповідями та прикладами коду.
-->

## 📚 HTML Основи

<!-- HTML - мова розмітки для структури веб-сторінок -->

### Q: Що таке семантичні теги та навіщо вони потрібні?

**A:** Семантичні теги надають значення контенту, а не просто структуру.

```html
<!-- ❌ Погано - без семантики -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- ✅ Добре - з семантикою -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
```

**Переваги:** SEO оптимізація, доступність для людей з обмеженими можливостями, читабельність коду.

### Q: Які основні типи input елементів?

```html
<!-- Основні типи inputs -->
<input type="text" placeholder="Text input">
<input type="email" required>
<input type="password">
<input type="number" min="0" max="100">
<input type="date">
<input type="checkbox" checked>
<input type="radio" name="gender" value="male">
<input type="file" accept=".jpg,.png">
<input type="submit" value="Submit">
```

### Q: Як працює валідація форм?

```html
<form>
  <label for="email">Email:</label>
  <input 
    type="email" 
    id="email" 
    required 
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    aria-describedby="email-error"
  >
  <span id="email-error" class="error"></span>
  <input type="submit" value="Submit">
</form>
```

---

## 🎨 CSS/SCSS/БЕМ

<!-- CSS - каскадні таблиці стилів для оформлення веб-сторінок -->

### Q: Різниця між CSS та SCSS?

**CSS** - базовий синтаксис стилів  
**SCSS** - препроцесор з розширеними можливостями

```css
/* CSS - багато повторів */
.button-primary {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

.button-secondary {
  background: #6c757d;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}
```

```scss
// SCSS - змінні та mixins
$primary: #007bff;
$secondary: #6c757d;

@mixin button($bg-color) {
  background: $bg-color;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  
  &:hover {
    background: darken($bg-color, 10%);
  }
}

.button-primary { @include button($primary); }
.button-secondary { @include button($secondary); }
```

### Q: Що таке БЕМ методологія?

**БЕМ** (Block Element Modifier) - методологія іменування CSS класів для уникнення конфліктів.

```scss
// Блок - незалежний компонент
.card {
  border: 1px solid #ccc;
  padding: 20px;
  
  // Елемент - частина блоку
  &__title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  &__content {
    line-height: 1.6;
  }
  
  &__button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    
    // Модифікатор - варіація блоку/елементу
    &--disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    &--large {
      padding: 15px 25px;
      font-size: 18px;
    }
  }
}
```

```html
<div class="card">
  <h2 class="card__title">Заголовок</h2>
  <p class="card__content">Контент</p>
  <button class="card__button card__button--large">Велика кнопка</button>
  <button class="card__button card__button--disabled">Неактивна</button>
</div>
```

### Q: Flexbox vs Grid - коли що використовувати?

```css
/* Flexbox - для одновимірних макетів (рядок або колонка) */
.navbar {
  display: flex;
  justify-content: space-between; /* горизонтальне вирівнювання */
  align-items: center; /* вертикальне вирівнювання */
  gap: 1rem;
}

/* Grid - для двовимірних макетів (рядки і колонки) */
.layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr;
}
```

### Q: Що таке CSS специфічність?

**Специфічність** визначає, які стилі застосуються при конфлікті правил.

**Порядок (від найвищої до найнижчої):**
1. Inline styles (style="...") - 1000
2. IDs (#header) - 100
3. Classes (.header), attributes ([type="text"]) - 10
4. Elements (div, p) - 1

```css
/* Специфічність: 1 */
p { color: black; }

/* Специфічність: 10 */
.text { color: blue; }

/* Специфічність: 100 */
#header { color: green; }

/* Специфічність: 111 */
#header .text p { color: red; }
```

---

## 🚀 JavaScript Основи

<!-- JavaScript - мова програмування для інтерактивності веб-сторінок -->

### Q: Які типи даних є в JavaScript?

```javascript
// Примітивні типи
let str = "Hello"; // string
let num = 42; // number
let bool = true; // boolean
let nothing = null; // null
let undef = undefined; // undefined
let sym = Symbol('id'); // symbol (ES6)
let bigNum = 123n; // bigint (ES2020)

// Об'єктний тип
let obj = { name: "John", age: 30 }; // object
let arr = [1, 2, 3]; // array (різновид object)
let func = function() {}; // function (різновид object)
```

### Q: Різниця між var, let та const?

```javascript
// var - function scope, hoisting
console.log(x); // undefined (не error!)
var x = 5;

function example() {
  if (true) {
    var y = 10;
  }
  console.log(y); // 10 - доступний поза блоком
}

// let - block scope
function example2() {
  if (true) {
    let z = 10;
  }
  console.log(z); // ReferenceError - недоступний поза блоком
}

// const - незмінна посилання
const arr = [1, 2, 3];
arr.push(4); // OK - змінюємо вміст
// arr = [5, 6]; // Error - не можна змінити посилання
```

### Q: Що таке hoisting?

**Hoisting** - підняття оголошень змінних та функцій на початок області видимості.

```javascript
// Так ми пишемо
console.log(sayHello()); // "Hello!"
console.log(x); // undefined

function sayHello() {
  return "Hello!";
}

var x = 5;

// Так інтерпретується код
function sayHello() {
  return "Hello!";
}

var x; // undefined
console.log(sayHello()); // "Hello!"
console.log(x); // undefined
x = 5;
```

### Q: Різниця між функціями?

```javascript
// 1. Function Declaration - hoisting працює
console.log(sayHello()); // "Hello!" - працює!

function sayHello() {
  return "Hello!";
}

// 2. Function Expression - hoisting НЕ працює
console.log(sayBye()); // Error!

const sayBye = function() {
  return "Bye!";
};

// 3. Arrow Function - немає власного this
const greet = (name) => `Hello, ${name}!`;

// Різниця з this
const user = {
  name: "John",
  
  greet: function() {
    return `Hello, ${this.name}`; // this = user
  },
  
  greetArrow: () => {
    return `Hello, ${this.name}`; // this = window (undefined)
  }
};
```

### Q: Що таке замикання (closure)?

**Замикання** - функція, яка має доступ до змінних зовнішньої області видимості.

```javascript
function createCounter() {
  let count = 0; // приватна змінна
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 - окремий лічильник

// Практичне використання - модуль з приватними методами
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      throw new Error("Insufficient funds");
    },
    
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
// balance недоступний ззовні!
```

### Q: Як працює this?

```javascript
const user = {
  name: "John",
  age: 30,
  
  greet() {
    console.log(`Hello, ${this.name}`); // this = user
  },
  
  greetLater() {
    setTimeout(function() {
      console.log(`Hello, ${this.name}`); // this = window (undefined)
    }, 1000);
  },
  
  greetLaterFixed() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // this = user (стрілкова функція)
    }, 1000);
  }
};

// Втрата контексту
const greetFunc = user.greet;
greetFunc(); // this = undefined

// Прив'язка контексту
const boundGreet = user.greet.bind(user);
boundGreet(); // this = user

// call та apply
user.greet.call({ name: "Jane" }); // Hello, Jane
user.greet.apply({ name: "Bob" }); // Hello, Bob
```

---

## 🔄 JavaScript ES6+ та Асинхронність

### Q: Що таке деструктуризація?

```javascript
// Деструктуризація масивів
const colors = ['red', 'green', 'blue'];
const [first, second, ...rest] = colors;
console.log(first); // 'red'
console.log(rest); // ['blue']

// Деструктуризація об'єктів
const user = { name: "John", age: 30, city: "Kyiv" };
const { name, age, country = "Ukraine" } = user; // значення за замовчуванням

// Перейменування
const { city: userCity } = user;

// В параметрах функції
function greetUser({ name, age = 18 }) {
  return `Hello ${name}, you are ${age}`;
}

greetUser({ name: "John", age: 25 }); // Hello John, you are 25
```

### Q: Spread та Rest оператори?

```javascript
// Spread - розпакування
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const user = { name: "John", age: 30 };
const updatedUser = { ...user, age: 31, city: "Kyiv" };
// { name: "John", age: 31, city: "Kyiv" }

// Rest - збирання
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
sum(1, 2, 3, 4); // 10

const [first, ...others] = [1, 2, 3, 4];
console.log(others); // [2, 3, 4]
```

### Q: Методи масивів ES6+?

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - трансформація кожного елементу
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - фільтрація
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// find - знайти перший елемент
const found = numbers.find(n => n > 3); // 4

// reduce - зведення до одного значення
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// some - чи є хоча б один
const hasEven = numbers.some(n => n % 2 === 0); // true

// every - чи всі відповідають умові
const allPositive = numbers.every(n => n > 0); // true

// includes - чи містить елемент
const hasThree = numbers.includes(3); // true
```

### Q: Різниця між Promise, async/await та callback?

```javascript
// 1. Callback (старий спосіб) - може призвести до "callback hell"
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id > 0) {
      callback(null, { id, name: `User ${id}` });
    } else {
      callback(new Error("Invalid ID"), null);
    }
  }, 1000);
}

fetchUser(1, (error, user) => {
  if (error) {
    console.error(error);
  } else {
    console.log(user);
  }
});

// 2. Promise - краща обробка асинхронності
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}` });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

fetchUserPromise(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));

// 3. Async/Await - найчитабельніший спосіб
async function getUser(id) {
  try {
    const user = await fetchUserPromise(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Паралельні запити
async function getMultipleUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      fetchUserPromise(1),
      fetchUserPromise(2),
      fetchUserPromise(3)
    ]);
    
    return [user1, user2, user3];
  } catch (error) {
    console.error("One of the requests failed:", error);
  }
}
```

### Q: Що таке чиста функція?

**Чиста функція** - функція, яка:
1. Завжди повертає той же результат для тих же аргументів
2. Не має побічних ефектів (не змінює зовнішній стан)

```javascript
// ✅ Чисті функції
function add(a, b) {
  return a + b; // завжди той же результат
}

function multiply(a, b) {
  return a * b;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Нечисті функції
let counter = 0;
function increment() {
  counter++; // змінює зовнішню змінну
  return counter;
}

function addRandom(a) {
  return a + Math.random(); // результат не передбачуваний
}

function updateUser(user) {
  user.lastUpdated = new Date(); // мутує вхідний об'єкт
  return user;
}

// ✅ Чиста версія
function updateUserPure(user) {
  return {
    ...user,
    lastUpdated: new Date()
  };
}
```

---

## ⚛️ React Основи

<!-- React - JavaScript бібліотека для створення користувацьких інтерфейсів -->

### Q: Що таке React і навіщо він потрібен?

**React** - JavaScript бібліотека для створення UI з наступними перевагами:

- **Компонентність** - UI складається з переviкористовуваних компонентів
- **Декларативність** - описуємо ЩО хочемо, а не ЯК це зробити
- **Virtual DOM** - швидкі оновлення завдяки порівнянню віртуального та реального DOM
- **Односпрямований потік даних** - дані течуть від батька до дитини

```jsx
// Декларативний підхід React
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Порівняння з імперативним підходом (vanilla JS)
const button = document.getElementById('button');
const heading = document.getElementById('heading');
let count = 0;

button.addEventListener('click', () => {
  count++;
  heading.textContent = `Count: ${count}`;
});
```

### Q: Різниця між функціональними та класовими компонентами?

```jsx
// Класовий компонент (застарілий підхід)
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    console.log("Component mounted");
  }
  
  componentDidUpdate() {
    console.log("Component updated");
  }
  
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// Функціональний компонент (сучасний підхід)
function Welcome({ name }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Component mounted or updated");
  });
  
  useEffect(() => {
    console.log("Component mounted");
  }, []); // тільки при mount
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Q: Що таке JSX та його правила?

**JSX** - синтаксичний цукор для React.createElement

```jsx
// JSX
const element = <h1>Hello, world!</h1>;

// Компілюється в
const element = React.createElement('h1', null, 'Hello, world!');

// Правила JSX:
function App() {
  const user = { name: "John", age: 30 };
  const isLoggedIn = true;
  
  return (
    // 1. Один батьківський елемент
    <div className="app"> {/* className, не class */}
      {/* 2. Вирази в фігурних дужках */}
      <h1>Welcome, {user.name}!</h1>
      
      {/* 3. Умовний рендеринг */}
      {isLoggedIn ? (
        <p>You are logged in</p>
      ) : (
        <p>Please log in</p>
      )}
      
      {/* 4. Списки з key */}
      <ul>
        {[1, 2, 3].map(num => (
          <li key={num}>Item {num}</li>
        ))}
      </ul>
      
      {/* 5. Логічний AND */}
      {user.age >= 18 && <p>Adult user</p>}
      
      {/* 6. Всі теги мають бути закриті */}
      <input type="text" />
      <br />
    </div>
  );
}

// React Fragment - для уникнення зайвих div
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

### Q: Різниця між state та props?

```jsx
// Props - дані від батьківського компонента (незмінні)
function ChildComponent({ name, age, onButtonClick }) {
  // name, age - props (читання only)
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
}

// State - внутрішні дані компонента (змінні)
function ParentComponent() {
  const [userName, setUserName] = useState("John");
  const [userAge, setUserAge] = useState(25);
  
  const handleButtonClick = () => {
    setUserAge(userAge + 1); // змінюємо state
  };
  
  return (
    <div>
      <ChildComponent 
        name={userName}        // передаємо props
        age={userAge}          // передаємо props
        onButtonClick={handleButtonClick} // передаємо функцію
      />
      
      <input 
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}
```

### Q: Життєвий цикл React компонента?

```jsx
// Фази життєвого циклу:
// 1. Mounting (створення)
// 2. Updating (оновлення)
// 3. Unmounting (видалення)

function LifecycleExample({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mounting + Updating (коли змінюється userId)
  useEffect(() => {
    console.log("Component mounted or userId changed");
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchData();
    }
  }, [userId]); // залежність - запускається при зміні userId
  
  // Mounting (тільки один раз)
  useEffect(() => {
    console.log("Component mounted");
    
    const timer = setInterval(() => {
      console.log("Timer tick");
    }, 1000);
    
    // Unmounting (cleanup)
    return () => {
      console.log("Component unmounted - cleanup");
      clearInterval(timer);
    };
  }, []); // порожній масив = тільки при mount/unmount
  
  // Updating (при кожному render)
  useEffect(() => {
    console.log("Component rendered");
  }); // без масиву залежностей
  
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
```

### Q: Що таке key prop і навіщо він потрібен?

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // ❌ Погано - використання index як key
        <li key={index}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

function TodoListCorrect({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        // ✅ Добре - унікальний ідентифікатор
        <li key={todo.id}>
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**Навіщо key потрібен:**
- React використовує key для ідентифікації елементів при оновленні
- Без key React може неправильно оновити DOM
- key повинен бути унікальним та стабільним

---

## 🎣 React Hooks

<!-- Хуки - функції, які дозволяють "підключитися" до стану та життєвого циклу React -->

### Q: Що таке useState та як він працює?

```jsx
function Counter() {
  // useState повертає [значення, функція для зміни]
  const [count, setCount] = useState(0); // початкове значення
  const [user, setUser] = useState({ name: "", email: "" });
  const [items, setItems] = useState([]);
  
  // ❌ Неправильно - пряма мутація
  const handleBadIncrement = () => {
    count++; // НЕ працює!
    setCount(count); // React не помітить зміну
  };
  
  // ✅ Правильно - створення нового значення
  const handleIncrement = () => {
    setCount(count + 1);
    // АБО краще з функцією (для уникнення stale closures)
    setCount(prev => prev + 1);
  };
  
  // Для об'єктів - ЗАВЖДИ створюємо новий об'єкт
  const updateUser = (field, value) => {
    setUser(prev => ({
      ...prev,          // копіюємо попередні властивості
      [field]: value    // оновлюємо потрібну властивість
    }));
  };
  
  // Для масивів
  const addItem = (newItem) => {
    setItems(prev => [...prev, newItem]); // додаємо в кінець
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
      
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
    </div>
  );
}
```

### Q: Коли та як використовувати useEffect?

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Ефект без залежностей - запускається після кожного render
  useEffect(() => {
    console.log('Component rendered');
  });
  
  // 2. Ефект з порожнім масивом - запускається тільки один раз (componentDidMount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Приклад: встановлення глобальних слухачів
    const handleResize = () => console.log('Window resized');
    window.addEventListener('resize', handleResize);
    
    // Cleanup функція (componentWillUnmount)
    return () => {
      console.log('Cleanup');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // порожній масив залежностей
  
  // 3. Ефект з залежностями - запускається при зміні залежностей
  useEffect(() => {
    console.log('userId changed:', userId);
    
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]); // запускається при зміні userId
  
  // 4. Ефект для зміни document.title
  useEffect(() => {
    document.title = user ? `${user.name} Profile` : 'Loading...';
  }, [user]); // залежить від user
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Q: Що таке useContext та коли його використовувати?

**useContext** розв'язує проблему "prop drilling" - передачі props через багато рівнів компонентів.

```jsx
// Проблема: prop drilling
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <div>
      <Header user={user} />           {/* передаємо props */}
      <Main user={user} />             {/* передаємо props */}
      <Footer user={user} />           {/* передаємо props */}
    </div>
  );
}

function Header({ user }) {
  return (
    <header>
      <Navigation user={user} />       {/* передаємо далі */}
    </header>
  );
}

function Navigation({ user }) {
  return (
    <nav>
      <UserMenu user={user} />         {/* передаємо далі */}
    </nav>
  );
}

// Рішення: Context
import { createContext, useContext, useState } from 'react';

// 1. Створюємо контекст
const UserContext = createContext();

// 2. Створюємо Provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = {
    user,
    login,
    logout,
    loading
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook для зручності
function useUser() {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
}

// 4. Використання в компонентах
function Header() {
  const { user, logout } = useUser(); // без prop drilling!
  
  return (
    <header>
      {user ? (
        <div>
          Welcome, {user.name}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </header>
  );
}

function LoginForm() {
  const { login, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert('Login failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// 5. Обгортаємо App в Provider
function App() {
  return (
    <UserProvider>
      <Header />
      <LoginForm />
      <Main />
    </UserProvider>
  );
}
```

### Q: Як створювати власні хуки (Custom Hooks)?

**Custom Hook** - функція, яка використовує інші хуки та дозволяє переиспользвати логіку.

```jsx
// Custom hook для API запитів
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!url) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Custom hook для localStorage
function useLocalStorage(key, initialValue) {
  // Отримуємо значення з localStorage при ініціалізації
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Функція для оновлення значення
  const setStoredValue = (value) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  return [value, setStoredValue];
}

// Custom hook для debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Використання custom hooks
function UserProfile({ userId }) {
  // Використовуємо custom hook для API
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  
  // Використовуємо localStorage hook
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div className={`profile ${theme}`}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </div>
  );
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Використовуємо debounce hook
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // API запит тільки після завершення введення
  const { data: results, loading } = useApi(
    debouncedSearchTerm ? `/api/search?q=${debouncedSearchTerm}` : null
  );
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      
      {loading && <div>Searching...</div>}
      
      {results && (
        <ul>
          {results.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 📘 TypeScript Основи

<!-- TypeScript - надмножина JavaScript з статичною типізацією -->

### Q: Навіщо потрібен TypeScript?

**TypeScript** додає статичну типізацію до JavaScript, що дозволяє виявляти помилки на етапі розробки.

```typescript
// JavaScript - помилки тільки під час виконання
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(null); // Runtime Error: Cannot read property 'toUpperCase' of null
greet(123);  // Runtime Error: name.toUpperCase is not a function

// TypeScript - помилки під час розробки
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

greet(null); // Compile Error!
greet(123);  // Compile Error!
greet("John"); // ✅ OK
```

### Q: Основні типи TypeScript?

```typescript
// Примітивні типи
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;

// Масиви
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Об'єкти
interface User {
  id: number;
  name: string;
  email?: string;        // опціональне поле
  readonly created: Date; // тільки для читання
}

const user: User = {
  id: 1,
  name: "John",
  created: new Date()
  // email не обов'язковий
};

// Union types
let id: string | number = "123"; // може бути string або number
id = 456; // ✅ OK

// Literal types
let status: "loading" | "success" | "error" = "loading";
status = "success"; // ✅ OK
// status = "pending"; // ❌ Error

// Функції
function add(a: number, b: number): number {
  return a + b;
}

// Стрілкові функції
const multiply = (a: number, b: number): number => a * b;

// Опціональні параметри
function greetUser(name: string, age?: number): string {
  if (age) {
    return `Hello ${name}, you are ${age}`;
  }
  return `Hello ${name}`;
}

// Значення за замовчуванням
function createUser(name: string, role: string = "user"): User {
  return {
    id: Date.now(),
    name,
    created: new Date()
  };
}
```

### Q: React з TypeScript?

```typescript
import React, { useState, useEffect } from 'react';

// Interface для props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

// Типізований компонент
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium'
}) => {
  return (
    <button 
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Типи для стану
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Компонент з типізованим стором
function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  // Типізовані функції
  const addTodo = (text: string): void => {
    const newTodo: TodoItem = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prev => [...prev, newTodo]);
  };
  
  const toggleTodo = (id: number): void => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  
  // Типізовані обробники подій
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // логіка submit
  };
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('Button clicked');
  };
  
  return (
    <div>
      <Button onClick={() => addTodo("New todo")}>
        Add Todo
      </Button>
      
      <input onChange={handleInputChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Generic типи для API відповідей
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Використання Generic
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success"
};

const todosResponse: ApiResponse<TodoItem[]> = {
  data: [
    { id: 1, text: "Learn TypeScript", completed: false, createdAt: new Date() }
  ],
  status: 200,
  message: "Success"
};
```

### Q: Generics в TypeScript?

```typescript
// Generic функція
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello"); // string
const numberResult = identity<number>(42);      // number
const boolResult = identity<boolean>(true);     // boolean

// Generic з обмеженнями
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // OK, бо T має length
  return arg;
}

logLength("hello");     // ✅ OK - string має length
logLength([1, 2, 3]);   // ✅ OK - array має length
// logLength(123);      // ❌ Error - number не має length

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

const stringContainer: Container<string> = {
  value: "hello",
  getValue() {
    return this.value;
  }
};

// Generic класи
class DataStorage<T> {
  private data: T[] = [];
  
  addItem(item: T): void {
    this.data.push(item);
  }
  
  getItems(): T[] {
    return [...this.data];
  }
  
  removeItem(item: T): void {
    this.data = this.data.filter(i => i !== item);
  }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("hello");
stringStorage.addItem("world");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
```

---

## 🚀 Next.js vs Node.js

### Q: Різниця між React, Next.js та Node.js?

| Технологія | Призначення | Особливості |
|------------|-------------|-------------|
| **React** | UI бібліотека | Тільки фронтенд, SPA |
| **Next.js** | React фреймворк | SSR/SSG, роутинг, API routes |
| **Node.js** | JavaScript runtime | Серверна розробка |

```jsx
// Звичайний React (SPA)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// Next.js - файловий роутинг (автоматичний)
// pages/index.js
export default function Home() {
  return <div>Home Page</div>;
}

// pages/about.js
export default function About() {
  return <div>About Page</div>;
}

// pages/users/[id].js - динамічний роутинг
import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  
  return <div>User ID: {id}</div>;
}
```

### Q: Server-Side Rendering (SSR) в Next.js?

```jsx
// getServerSideProps - запускається на кожному запиті на сервері
export async function getServerSideProps(context) {
  const { params, query, req, res } = context;
  
  // Доступ до headers, cookies
  const userAgent = req.headers['user-agent'];
  
  try {
    const response = await fetch(`https://api.example.com/users/${params.id}`);
    
    if (!response.ok) {
      return {
        notFound: true // показати 404 сторінку
      };
    }
    
    const user = await response.json();
    
    return {
      props: {
        user,
        userAgent
      }
    };
  } catch (error) {
    return {
      props: {
        user: null,
        error: 'Failed to fetch user'
      }
    };
  }
}

export default function UserPage({ user, userAgent, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <small>User agent: {userAgent}</small>
    </div>
  );
}
```

### Q: Static Site Generation (SSG) в Next.js?

```jsx
// getStaticProps - запускається під час білду
export async function getStaticProps() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();
  
  return {
    props: {
      posts
    },
    revalidate: 60 // ISR - регенерація кожну хвилину
  };
}

// getStaticPaths - для динамічних маршрутів
export async function getStaticPaths() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();
  
  // Генеруємо шляхи для всіх постів
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,
    fallback: false // або 'blocking', true
  };
}

export default function PostPage({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### Q: API Routes в Next.js?

```javascript
// pages/api/users.js - створює ендпоінт /api/users
export default function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      return getUsers(req, res);
    case 'POST':
      return createUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getUsers(req, res) {
  try {
    // Логіка отримання користувачів
    const users = await fetchUsersFromDB();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const user = await createUserInDB({ name, email });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// pages/api/users/[id].js - динамічний роут /api/users/123
export default function handler(req, res) {
  const { query: { id } } = req;
  
  if (req.method === 'GET') {
    // GET /api/users/123
    res.status(200).json({ user: { id, name: `User ${id}` } });
  } else if (req.method === 'DELETE') {
    // DELETE /api/users/123
    res.status(200).json({ message: `User ${id} deleted` });
  }
}
```

### Q: Next.js vs Node.js + Express?

```javascript
// Next.js підхід
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    res.status(201).json({ message: 'User created' });
  }
}

// Node.js + Express підхід
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

**Коли використовувати що:**
- **Next.js**: коли потрібен фулстек додаток з React, SEO, SSR/SSG
- **Node.js + Express**: коли потрібен тільки API, більше контролю, мікросервіси

---

## 💻 Практичні Завдання

### JavaScript Завдання

#### Завдання 1: Робота з масивами та об'єктами

```javascript
const users = [
  { id: 1, name: "John", age: 25, department: "IT", salary: 50000, active: true },
  { id: 2, name: "Jane", age: 30, department: "HR", salary: 45000, active: false },
  { id: 3, name: "Bob", age: 35, department: "IT", salary: 60000, active: true },
  { id: 4, name: "Alice", age: 28, department: "Marketing", salary: 48000, active: true }
];

// Завдання:
// 1. Знайти всіх активних користувачів з IT відділу
// 2. Підрахувати середню зарплату активних користувачів
// 3. Знайти найстаршого користувача
// 4. Створити об'єкт з кількістю працівників по відділах
// 5. Збільшити зарплату всім IT працівникам на 10%

// РІШЕННЯ:

// 1. Активні IT користувачі
const activeITUsers = users.filter(user => 
  user.department === 'IT' && user.active
);
console.log('Active IT users:', activeITUsers);

// 2. Середня зарплата активних користувачів
const activeUsers = users.filter(user => user.active);
const averageSalary = activeUsers.reduce((sum, user) => sum + user.salary, 0) / activeUsers.length;
console.log('Average salary:', averageSalary);

// 3. Найстарший користувач
const oldestUser = users.reduce((oldest, user) => 
  user.age > oldest.age ? user : oldest
);
console.log('Oldest user:', oldestUser);

// 4. Кількість працівників по відділах
const departmentCount = users.reduce((acc, user) => {
  acc[user.department] = (acc[user.department] || 0) + 1;
  return acc;
}, {});
console.log('Department count:', departmentCount);

// 5. Збільшення зарплати IT працівникам
const updatedUsers = users.map(user => 
  user.department === 'IT' 
    ? { ...user, salary: user.salary * 1.1 }
    : user
);
console.log('Updated users:', updatedUsers);
```

#### Завдання 2: Асинхронне програмування

```javascript
// Імітація API
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0 && userId <= 5) {
        resolve({ 
          id: userId, 
          name: `User ${userId}`, 
          email: `user${userId}@example.com` 
        });
      } else {
        reject(new Error(`Invalid user ID: ${userId}`));
      }
    }, Math.random() * 1000); // випадкова затримка
  });
}

// Завдання: Створити функцію, яка:
// 1. Завантажує дані кількох користувачів паралельно
// 2. Обробляє помилки для кожного запиту окремо
// 3. Повертає успішні результати та помилки
// 4. Має таймаут для запитів

// РІШЕННЯ:

// Функція з таймаутом
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

async function fetchMultipleUsersAdvanced(userIds, timeoutMs = 2000) {
  console.log(`Fetching users: ${userIds.join(', ')}`);
  
  // Створюємо промиси для всіх користувачів
  const promises = userIds.map(async (id) => {
    try {
      const user = await withTimeout(fetchUserData(id), timeoutMs);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, id, error: error.message };
    }
  });
  
  // Чекаємо всі промиси (навіть ті, що помилилися)
  const results = await Promise.all(promises);
  
  // Розділяємо успішні та помилкові результати
  const successful = results.filter(result => result.success).map(result => result.data);
  const errors = results.filter(result => !result.success);
  
  return {
    users: successful,
    errors: errors,
    total: results.length,
    successRate: (successful.length / results.length * 100).toFixed(1) + '%'
  };
}

// Використання
async function runExample() {
  try {
    const result = await fetchMultipleUsersAdvanced([1, 2, -1, 4, 999, 3]);
    
    console.log('✅ Successful users:', result.users);
    console.log('❌ Errors:', result.errors);
    console.log('📊 Success rate:', result.successRate);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

runExample();
```
