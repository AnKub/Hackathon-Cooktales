# Задачі для співбесіди — JavaScript / React / Next.js  
Короткі задачі з детальним поясненням рішень, поширеними підводними каменями і підказками, як демонструвати знання на інтерв'ю.

---

## Примітивні JS завдання (Junior level)

### Завдання JS-0: Перевірка паліндрому
**Опис:** Написати функцію, яка перевіряє, чи є рядок паліндромом (читається однаково зліва направо і справа наліво).

const array = [1,2,3,4,4,5]
let sum = array.reduce((acc, next)=> acc + next, 0)
console.log(sum)

```js
// Рішення 1: Через реверс
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// Рішення 2: Через двосторонній пошук (ефективніше)
function isPalindromeOptimized(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Тести
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
```

**Пояснення на співбесіді:**
- Очищення від зайвих символів важливе для реальних випадків
- Друге рішення має O(n/2) проходів замість O(n) + O(n) операцій
- Покажи розуміння edge cases: порожній рядок, один символ

---

### Завдання JS-0.5: Унікальні символи в рядку
**Опис:** Підрахувати кількість входжень кожного символу в рядку.

```js
function countChars(str) {
  const count = {};
  
  for (const char of str) {
    count[char] = (count[char] || 0) + 1;
  }
  
  return count;
}

// Альтернативне рішення через reduce
function countCharsReduce(str) {
  return str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

// Map версія (зберігає порядок вставки)
function countCharsMap(str) {
  const map = new Map();
  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  return map;
}

console.log(countChars("hello")); // { h: 1, e: 1, l: 2, o: 1 }
```

**Питання співбесіди:**
- Різниця між Object та Map для підрахунку?
- Як обробити великі рядки (стрімінг)?

---

### Завдання JS-0.7: FizzBuzz (класика)
**Опис:** Вивести числа від 1 до 100, але для кратних 3 — "Fizz", кратних 5 — "Buzz", кратних обох — "FizzBuzz".

```js
function fizzBuzz(n = 100) {
  const result = [];
  
  for (let i = 1; i <= n; i++) {
    let output = '';
    
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    
    result.push(output || i);
  }
  
  return result;
}

// Компактніша версія
function fizzBuzzCompact(n = 100) {
  return Array.from({length: n}, (_, i) => {
    const num = i + 1;
    return (num % 15 === 0 ? 'FizzBuzz' : 
           num % 3 === 0 ? 'Fizz' : 
           num % 5 === 0 ? 'Buzz' : num);
  });
}

console.log(fizzBuzz(15));
// [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

**Чому важливо показати:**
- Розуміння модульного ділення
- Можна розширити логіку (додати нові правила)
- Уникнення зайвих перевірок (num % 15 оптимізація)

---

## JS Task 1 — Обробка масиву (filter / map / reduce)
**Опис:** Маєш масив об'єктів користувачів. Потрібно:
1. Відфільтрувати активних користувачів певного департаменту.
2. Порахувати середню зарплату активних.
3. Збільшити зарплату учасників цього департаменту на 10% і повернути новий масив (не мутувати оригінал).

**Приклад input:**
```js
const users = [
  { id: 1, name: 'Alice', dept: 'IT', salary: 100000, active: true },
  { id: 2, name: 'Bob', dept: 'HR', salary: 80000, active: true },
  { id: 3, name: 'Charlie', dept: 'IT', salary: 120000, active: true },
  { id: 4, name: 'David', dept: 'IT', salary: 95000, active: false },
];
```

**Рішення з поясненням:**
```js
function processUsers(users, dept) {
  // 1. Фільтрація: активні + певний департамент
  const deptActiveUsers = users.filter(user => 
    user.dept === dept && user.active === true
  );
  
  // 2. Середня зарплата через reduce
  const avgSalary = deptActiveUsers.length === 0 
    ? 0 
    : deptActiveUsers.reduce((sum, user) => sum + user.salary, 0) / deptActiveUsers.length;
  
  // 3. Створення нового масиву з підвищеною зарплатою (іммутабельно)
  const updatedUsers = users.map(user => 
    user.dept === dept 
      ? { ...user, salary: Math.round(user.salary * 1.1 * 100) / 100 } // округлення до копійок
      : user
  );
  
  return { 
    activeInDept: deptActiveUsers, 
    averageSalary: Math.round(avgSalary * 100) / 100,
    updatedUsers 
  };
}

// Тест
const result = processUsers(users, 'IT');
console.log('Активні в IT:', result.activeInDept.length); // 2
console.log('Середня зарплата:', result.averageSalary); // 110000
console.log('Оновлені користувачі:', result.updatedUsers);
```

**Питання на співбесіді:**
- **Чому `map` замість мутування?** Іммутабельність запобігає побічним ефектам
- **Що якщо порожній масив для avg?** Ділення на 0, тому перевіряємо довжину
- **Як оптимізувати для великих масивів?** Один прохід замість кількох (комбінувати filter+reduce)

**Підводні камені:**
- Забути перевірити `active: true` явно (якщо може бути undefined)
- Мутувати оригінальний масив через `user.salary *= 1.1`
- Проблеми з floating point: `100000 * 1.1 = 110000.00000000001`

---

## JS Task 2 — Асинхронні запити з таймаутом і обробкою помилок
**Опис:** Потрібно паралельно запросити дані для набору ID, повернути тільки успішні відповіді зі списком помилок для неуспішних.

**Ключова ідея:**
- Для кожного ID створити promise, обгорнути в таймаут (Promise.race)
- Використати `Promise.all` щоб чекати всіх результатів
- Не дати одній помилці зупинити всі запити

```js
// Хелпер для таймауту
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Основна функція
async function fetchMany(ids, fetchFn, timeout = 2000) {
  const promises = ids.map(id => 
    withTimeout(fetchFn(id), timeout)
      .then(data => ({ success: true, id, data }))
      .catch(error => ({ success: false, id, error: error.message }))
  );
  
  const results = await Promise.all(promises);
  
  return {
    successful: results.filter(r => r.success).map(r => ({ id: r.id, data: r.data })),
    failed: results.filter(r => !r.success).map(r => ({ id: r.id, error: r.error })),
    total: results.length
  };
}

// Приклад використання
async function fetchUser(id) {
  // Імітація API запиту
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 2) reject(new Error('User not found'));
      else if (id === 4) { /* імітація довгого запиту */ setTimeout(() => resolve({id, name: `User${id}`}), 3000); }
      else resolve({ id, name: `User${id}` });
    }, Math.random() * 1000);
  });
}

// Тест
fetchMany([1, 2, 3, 4], fetchUser, 2000).then(result => {
  console.log('Успішні:', result.successful);
  console.log('Помилки:', result.failed);
  console.log('Загалом оброблено:', result.total);
});
```

**Пояснення для співбесіди:**
- **Promise.race для таймауту:** змагання між запитом і таймером
- **Чому окремо обробляємо помилки:** щоб один збій не зупинив решту
- **Promise.all vs Promise.allSettled:** All падає на першій помилці, allSettled чекає всіх

**Підводні камені:**
- Синхронні помилки у fetchFn треба ловити
- Таймаут занадто малий/великий
- Memory leaks якщо не очищати таймери (в продакшні)

---

## JS Task 3 — Замикання та фабрика функцій
**Опис:** Реалізувати `createCounter(start)` — повертає об'єкт з методами `inc`, `dec`, `get`, `reset`. Значення має бути приватним (через замикання).

```js
function createCounter(start = 0) {
  let count = start;
  const initial = start; // запам'ятовуємо початкове значення
  
  return {
    inc(step = 1) { 
      count += step; 
      return count; 
    },
    
    dec(step = 1) { 
      count -= step; 
      return count; 
    },
    
    get() { 
      return count; 
    },
    
    reset() { 
      count = initial; 
      return count; 
    },
    
    // Бонус: можливість встановити нове значення
    set(value) {
      if (typeof value === 'number') {
        count = value;
        return count;
      }
      throw new Error('Value must be a number');
    }
  };
}

// Приклад використання
const counter = createCounter(10);
console.log(counter.inc()); // 11
console.log(counter.inc(5)); // 16
console.log(counter.dec(3)); // 13
console.log(counter.get()); // 13
console.log(counter.reset()); // 10

// count недоступний ззовні — це і є інкапсуляція
console.log(counter.count); // undefined
```

**На співбесіді питання:**
- **Чому `count` недоступний ззовні?** Він у локальній області видимості функції createCounter
- **Різниця між замиканням і класом?** Замикання простіше, але класи більш об'єктно-орієнтовані
- **Чи можуть бути кілька лічильників?** Так, кожен виклик createCounter створює новий scope

**Альтернатива через клас:**
```js
class Counter {
  #count; // приватне поле (ES2022)
  #initial;
  
  constructor(start = 0) {
    this.#count = start;
    this.#initial = start;
  }
  
  inc(step = 1) { return this.#count += step; }
  dec(step = 1) { return this.#count -= step; }
  get() { return this.#count; }
  reset() { return this.#count = this.#initial; }
}
```

---

## React Task 1 — Контрольована форма + localStorage
**Завдання:** Створити компонент форми (name, email, message), контролювати введення через state, при submit зберігати дані в localStorage, показувати повідомлення успіху/помилки.

**Ключові моменти:**
- Контрольовані інпути (`value` + `onChange`)
- Валідація в реальному часі
- Стан завантаження та помилок
- Persistence через localStorage

```jsx
import { useState, useEffect } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Завантаження збережених даних при mount
  useEffect(() => {
    const saved = localStorage.getItem('contactFormDraft');
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved form data');
      }
    }
  }, []);
  
  // Автозбереження чернетки
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.name || form.email || form.message) {
        localStorage.setItem('contactFormDraft', JSON.stringify(form));
      }
    }, 1000); // збереження через 1 секунду після останньої зміни
    
    return () => clearTimeout(timer);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Очищаємо помилку при зміні поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // Імітація API запиту
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Збереження в localStorage (імітація backend)
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...form,
        id: Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      // Очищення форми та чернетки
      setForm({ name: '', email: '', message: '' });
      localStorage.removeItem('contactFormDraft');
      setSubmitted(true);
      
      // Автоматично сховати повідомлення
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      
      {submitted && (
        <div className="success-message">
          ✅ Thank you! Your message has been sent successfully.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            disabled={loading}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            disabled={loading}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
            disabled={loading}
            rows={4}
            placeholder="Tell us how we can help..."
          />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>
        
        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      <small>* Required fields</small>
    </div>
  );
}
```

**Питання на співбесіді:**
- **Контрольовані vs неконтрольовані:** Контрольовані дають повний контроль, але більше коду
- **Коли валідувати:** onBlur, onChange, чи тільки onSubmit? Залежить від UX
- **Де зберігати стан форми:** localStorage для persistence, але можна у context/redux для складних форм

**Підводні камені:**
- Серіалізація дат/файлів у localStorage
- Автозбереження може спричинити performance проблеми
- Забути disabled для інпутів під час завантаження

---

## React Task 2 — Fetch з відміною запиту (AbortController)
**Завдання:** Компонент робить fetch для списку користувачів з можливістю пошуку. Потрібно відміняти попередній запит при зміні query та обробляти race conditions.

```jsx
import { useState, useEffect, useRef } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Ref для зберігання поточного AbortController
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const searchUsers = async () => {
      // Відміна попереднього запиту
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Якщо query порожній — очищаємо результати
      if (!query.trim()) {
        setUsers([]);
        setError(null);
        setLoading(false);
        return;
      }
      
      // Створюємо новий контролер для поточного запиту
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `/api/users/search?q=${encodeURIComponent(query)}`,
          { 
            signal: abortControllerRef.current.signal,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Перевіряємо, чи запит не був відмінений
        if (!abortControllerRef.current.signal.aborted) {
          setUsers(data.users || []);
        }
        
      } catch (err) {
        // AbortError — це нормально, не показуємо користувачу
        if (err.name !== 'AbortError') {
          setError(err.message);
          setUsers([]);
        }
      } finally {
        // Встановлюємо loading в false тільки якщо запит не був відмінений
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // Debounce: чекаємо 300мс після останньої зміни
    const timeoutId = setTimeout(searchUsers, 300);
    
    return () => {
      clearTimeout(timeoutId);
      // При зміні effect або unmount — відміняємо запит
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query]);
  
  // Cleanup при unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="user-search">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search users..."
          className="search-input"
        />
        {loading && <span className="loading-spinner">🔄</span>}
      </div>
      
      {error && (
        <div className="error-message">
          ❌ Error: {error}
        </div>
      )}
      
      <div className="search-results">
        {users.length > 0 ? (
          <ul className="user-list">
            {users.map(user => (
              <li key={user.id} className="user-item">
                <img src={user.avatar} alt={user.name} />
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : query.trim() && !loading && !error ? (
          <p>No users found for "{query}"</p>
        ) : null}
      </div>
    </div>
  );
}
```

**Що пояснити на співбесіді:**
- **Race conditions:** Швидко друкуючи, старі запити можуть повернутися пізніше нових
- **Debouncing:** Не запускаємо запит на кожне натискання клавіші
- **AbortController:** Сучасний спосіб відміни fetch запитів

**Підводні камені:**
- Забути очистити AbortController при unmount
- Показувати помилку AbortError користувачу
- Не перевіряти `signal.aborted` перед установкою стану

---

## React Task 3 — Оптимізація продуктивності
**Завдання:** Маєш великий список товарів з можливістю фільтрації. Потрібно оптимізувати для уникнення зайвих перерендерів.

```jsx
import React, { useState, useMemo, useCallback, memo } from 'react';

// Мемоізований компонент товару
const ProductItem = memo(({ product, onToggleFavorite, onAddToCart }) => {
  console.log(`Rendering product: ${product.name}`); // для демонстрації рендерів
  
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="category">{product.category}</p>
      
      <div className="actions">
        <button 
          onClick={() => onToggleFavorite(product.id)}
          className={product.isFavorite ? 'favorite active' : 'favorite'}
        >
          {product.isFavorite ? '❤️' : '🤍'}
        </button>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="add-to-cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

function ProductList({ products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);

  // Мемоізовані колбеки (стабільні посилання)
  const handleToggleFavorite = useCallback((productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Мемоізовані обчислення (важкі операції)
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(p => p.category));
    return ['all', ...Array.from(categorySet)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    console.log('Recomputing filtered products'); // для демонстрації
    
    return products
      .filter(product => {
        // Пошук по назві
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        
        // Фільтр по категорії
        const matchesCategory = selectedCategory === 'all' || 
          product.category === selectedCategory;
        
        // Фільтр по ціні
        const matchesPrice = product.price >= priceRange[0] && 
          product.price <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .map(product => ({
        ...product,
        isFavorite: favorites.has(product.id)
      }));
  }, [products, searchQuery, selectedCategory, priceRange, favorites]);

  const totalCartItems = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0)
  , [cart]);

  return (
    <div className="product-list-container">
      <header className="filters">
        <div className="search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
          />
        </div>
        
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="price-filter">
          <label>
            Price: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
        </div>
        
        <div className="cart-info">
          Cart: {totalCartItems} items
        </div>
      </header>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="no-results">No products found matching your criteria.</p>
      )}
    </div>
  );
}

// Для дуже великих списків (1000+ елементів) можна використати react-window
import { FixedSizeList as List } from 'react-window';

const VirtualizedProductList = ({ products, itemHeight = 200 }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ProductItem product={products[index]} />
    </div>
  );

  return (
    <List
      height={600} // висота контейнера
      itemCount={products.length}
      itemSize={itemHeight}
    >
      {Row}
    </List>
  );
};
```

**Пояснення на співбесіді:**
- **React.memo:** Запобігає рендеру, якщо пропси не змінилися
- **useCallback:** Стабілізує посилання на функції (важливо для memo дітей)
- **useMemo:** Кешує результат обчислень, поки залежності не зміняться
- **Virtual scrolling:** Для списків 1000+ елементів рендеримо тільки видимі

**Trade-offs:**
- Занадто багато мемоізації може ускладнити код
- Мемоізація має свою вартість (порівняння пропсів)
- Для малих списків оптимізація може бути зайвою

---

## Next.js Task 1 — Server-Side Rendering з обробкою помилок
**Завдання:** Сторінка блогу `/blog/[slug]` має отримувати дані на сервері, обробляти 404 та інші помилки, показувати loading states.

```jsx
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
}

interface BlogPageProps {
  post?: BlogPost;
  error?: string;
  relatedPosts?: BlogPost[];
}

function BlogPost({ post, error, relatedPosts }: BlogPageProps) {
  const router = useRouter();
  
  // Loading стан для client-side навігації
  if (router.isFallback) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  // Обробка помилок
  if (error) {
    return (
      <div className="error-container">
        <Head>
          <title>Error - Blog</title>
        </Head>
        <h1>Oops! Something went wrong</h1>
        <p>{error}</p>
        <Link href="/blog">
          <a className="back-link">← Back to Blog</a>
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <Head>
          <title>Post Not Found - Blog</title>
        </Head>
        <h1>Post Not Found</h1>
        <p>The post you're looking for doesn't exist.</p>
        <Link href="/blog">
          <a className="back-link">← Back to Blog</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
        <meta name="author" content={post.author} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.substring(0, 160)} />
        <meta property="og:type" content="article" />
      </Head>

      <article className="blog-post">
        <header className="post-header">
          <Link href="/blog">
            <a className="back-link">← Back to Blog</a>
          </Link>
          
          <h1>{post.title}</h1>
          
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
          
          <div className="post-tags">
            {post.tags.map(tag => (
              <Link key={tag} href={`/blog/tags/${tag}`}>
                <a className="tag">#{tag}</a>
              </Link>
            ))}
          </div>
        </header>

        <div className="post-content">
          {/* В реальному проекті тут може бути MDX або dangerouslySetInnerHTML */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {relatedPosts && relatedPosts.length > 0 && (
        <aside className="related-posts">
          <h3>Related Posts</h3>
          <div className="posts-grid">
            {relatedPosts.map(relatedPost => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <a className="related-post-card">
                  <h4>{relatedPost.title}</h4>
                  <p>By {relatedPost.author}</p>
                </a>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

// Server-Side Rendering
export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const slug = params?.slug as string;
  
  try {
    // Головний запит для поста
    const postResponse = await fetch(`${process.env.API_BASE_URL}/posts/${slug}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    // Обробка різних статусів відповіді
    if (postResponse.status === 404) {
      // Next.js автоматично покаже 404 сторінку
      return { notFound: true };
    }

    if (postResponse.status === 500) {
      // Можна логувати помилку в Sentry/LogRocket
      console.error(`Server error for post ${slug}`);
      return {
        props: {
          error: 'Internal server error. Please try again later.'
        }
      };
    }

    if (!postResponse.ok) {
      throw new Error(`HTTP ${postResponse.status}: ${postResponse.statusText}`);
    }

    const post: BlogPost = await postResponse.json();

    // Паралельний запит для related posts (не критичний)
    let relatedPosts: BlogPost[] = [];
    try {
      const relatedResponse = await fetch(
        `${process.env.API_BASE_URL}/posts/${slug}/related?limit=3`
      );
      if (relatedResponse.ok) {
        relatedPosts = await relatedResponse.json();
      }
    } catch (error) {
      console.warn('Failed to fetch related posts:', error);
      // Не падаємо, просто не показуємо related posts
    }

    // Кешування на CDN рівні
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return {
      props: {
        post,
        relatedPosts
      }
    };

  } catch (error) {
    console.error('Error fetching post:', error);
    
    return {
      props: {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    };
  }
};

export default BlogPost;
```

**Пояснення для співбесіди:**
- **getServerSideProps:** Запускається на кожному запиті, дані завжди свіжі
- **notFound: true:** Next.js автоматично покаже 404 сторінку
- **Кешування:** s-maxage для CDN, stale-while-revalidate для background refresh
- **SEO:** Head з мета-тегами генерується на сервері

**Альтернативи:**
- **getStaticProps + ISR:** Для контенту, який рідко змінюється
- **SWR/React Query:** Для client-side data fetching з кешуванням

---

## Next.js Task 2 — API Route з авторизацією та валідацією
**Завдання:** Створити API endpoint `/api/posts` для CRUD операцій з постами. Додати авторизацію, валідацію та rate limiting.

```typescript
// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Типи
interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface CreatePostRequest {
  title: string;
  content: string;
  tags?: string[];
}

interface ApiError {
  error: string;
  details?: any;
}

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // максимум 100 запитів на IP
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: 500
});

// Middleware для авторизації
function authenticateToken(req: NextApiRequest): User | null {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as User;
    return user;
  } catch (error) {
    return null;
  }
}

// Валідація даних
function validatePostData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 10) {
    errors.push('Content must be at least 10 characters long');
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array');
  }

  if (data.tags && data.tags.some((tag: any) => typeof tag !== 'string')) {
    errors.push('All tags must be strings');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Головний handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ApiError>
) {
  // Застосування rate limiting
  await new Promise<void>((resolve, reject) => {
    limiter(req as any, res as any, (result: any) => {
      if (result instanceof Error) reject(result);
      else resolve();
    });
  });

  await new Promise<void>((resolve, reject) => {
    speedLimiter(req as any, res as any, (result: any) => {
      if (result instanceof Error) reject(result);
      else resolve();
    });
  });

  const { method } = req;
  const { id } = req.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res, id as string);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res, id as string);
      case 'DELETE':
        return await handleDelete(req, res, id as string);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, id: string) {
  if (!id) {
    // Отримання списку постів з пагінацією
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const offset = (page - 1) * limit;

    // Імітація DB запиту
    const posts = await fetchPostsFromDB({ offset, limit });
    const total = await getPostsCount();

    res.status(200).json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } else {
    // Отримання конкретного поста
    const post = await fetchPostFromDB(id);
    
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({ post });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Авторизація обов'язкова для створення
  const user = authenticateToken(req);
  if (!user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  // Валідація даних
  const validation = validatePostData(req.body);
  if (!validation.isValid) {
    res.status(400).json({ 
      error: 'Validation failed', 
      details: validation.errors 
    });
    return;
  }

  const postData = {
    ...req.body,
    authorId: user.id,
    createdAt: new Date().toISOString()
  };

  const newPost = await createPostInDB(postData);
  
  res.status(201).json({ 
    message: 'Post created successfully', 
    post: newPost 
  });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, id: string) {
  const user = authenticateToken(req);
  if (!user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const existingPost = await fetchPostFromDB(id);
  if (!existingPost) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  // Перевірка прав: тільки автор або admin
  if (existingPost.authorId !== user.id && user.role !== 'admin') {
    res.status(403).json({ error: 'Insufficient permissions' });
    return;
  }

  const validation = validatePostData(req.body);
  if (!validation.isValid) {
    res.status(400).json({ 
      error: 'Validation failed', 
      details: validation.errors 
    });
    return;
  }

  const updatedPost = await updatePostInDB(id, {
    ...req.body,
    updatedAt: new Date().toISOString()
  });

  res.status(200).json({ 
    message: 'Post updated successfully', 
    post: updatedPost 
  });
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, id: string) {
  const user = authenticateToken(req);
  if (!user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const existingPost = await fetchPostFromDB(id);
  if (!existingPost) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  // Перевірка прав
  if (existingPost.authorId !== user.id && user.role !== 'admin') {
    res.status(403).json({ error: 'Insufficient permissions' });
    return;
  }

  await deletePostFromDB(id);
  
  res.status(200).json({ message: 'Post deleted successfully' });
}

// Mock DB functions (в реальному проекті — Prisma, MongoDB, тощо)
async function fetchPostsFromDB({ offset, limit }: { offset: number; limit: number }) {
  // Імітація
  return [];
}

async function fetchPostFromDB(id: string) {
  // Імітація
  return null;
}

async function createPostInDB(data: any) {
  // Імітація
  return { id: 'new-id', ...data };
}

async function updatePostInDB(id: string, data: any) {
  // Імітація
  return { id, ...data };
}

async function deletePostFromDB(id: string) {
  // Імітація
  return true;
}

async function getPostsCount() {
  // Імітація
  return 0;
}
```

**Що пояснити на співбесіді:**
- **JWT Authentication:** Перевірка токена в Authorization header
- **Role-based access:** Різні права для admin/user
- **Input validation:** Завжди валідуй дані від клієнта
- **Rate limiting:** Захист від DDOS атак
- **CORS:** Для cross-origin запитів

**Security best practices:**
- Ніколи не довіряй client-provided userId
- Логування security events
- Environment variables для секретних ключів
- Sanitization для XSS захисту

---

## Як відповісти на питання під час інтерв'ю
1. **Коротко сформулюй підхід** — потім покажи код
2. **Назви крайні випадки** та як їх обробиш (порожній масив, помилка мережі, невалідні дані)
3. **Поясни вибір інструментів/патернів** (іммутабельність, чисті функції, мемоізація)
4. **Почни з простого рішення** — потім опиши оптимізації
5. **Думай про тестування** — які юніт/інтеграційні тести написав би

---

## Короткий чекліст для підготовки
- ✅ **JavaScript:** map/filter/reduce, closures, async/await, Promise.all/race
- ✅ **React:** controlled components, hooks lifecycle, memoization, context
- ✅ **Next.js:** SSR/SSG відмінності, API routes, authentication
- ✅ **TypeScript:** базові типи, інтерфейси, generics
- ✅ **Performance:** React.memo, useMemo, useCallback, code splitting
- ✅ **Security:** input validation, authentication, CORS, rate limiting
- ✅ **Testing:** Jest, React Testing Library, mock functions

**При відповіді — думай вголос, вказуй trade-offs, обробляй edge-cases!**

---

*Файл можна копіювати в репозиторій і використовувати як шпаргалку перед співбесідою.*