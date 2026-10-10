# 🧱 Dev Stack - Ideal Development Stack Builder

A modern, responsive, and interactive web application designed to help developers explore, compare, and compose their ideal software development technology stack.

---

## 📖 Project Description

**Dev Stack** is an interactive stack-building platform that enables software engineers to discover popular frontend, backend, database, language, styling, and DevOps tools. Developers can inspect ratings, difficulty levels, and curated badges, seamlessly add technologies to their custom stack sidebar, prevent duplicate selections, and manage their architectural choices in real time.

---

## 🛠️ Technologies Used

- **React.js (v19)**: Component-based UI library for high performance and declarative views.
- **TypeScript**: Static typing for rock-solid code maintainability and robust error prevention.
- **Vite**: Ultra-fast build tool and lightning-quick local development environment.
- **Tailwind CSS & DaisyUI**: Utility-first responsive styling and UI components.
- **React-Toastify**: Smooth toast alert notification system for user interaction feedback.
- **JSON**: Structured external data store for technologies.

---

## ✨ 3 Core Features

1. **Dynamic Technology Grid with Live Loading State**:
   - 12 curated technologies loaded asynchronously from an external JSON file using `useEffect`.
   - Features responsive 3-column layout on desktop, 2-column on tablet, and 1-column on mobile.
   - Clean meta details per card including category chips, difficulty ratings, and community rating stars.

2. **Interactive Stack Builder with Duplicate Prevention**:
   - Instant "Add to Stack" functionality that places selected tools into a sticky sidebar.
   - Intelligent duplication prevention with warning alerts if an item is already selected.
   - State-aware button switching to `✓ Added to Stack` with disabled state when in stack.

3. **Full Stack Management & React-Toastify Alerts**:
   - Remove individual items using the dedicated `✕` button or clear the entire stack with "Remove All".
   - Integrated `React-Toastify` alerts that trigger color-coded feedback for adding, removing, and duplicate attempts.
   - Dynamic conditional rendering showing an empty placeholder when no tools are selected.

---

## ❓ React Questions & Answers

### 1. What is JSX, and why is it used in React?
**Answer:**
JSX stands for JavaScript XML. It is a syntax extension that allows developers to write HTML-like markup directly inside JavaScript files. It is used in React because it makes designing and understanding component UI structures intuitive, expressive, and visual, while granting the full power of JavaScript expressions inside curly braces `{}`.

### 2. What is the difference between props and state?
**Answer:**
- **Props (Properties)**: Passed from a parent component down to a child component. They are read-only (immutable) from the child's perspective and represent external configuration.
- **State**: Managed internally within a component. It is mutable through updater functions and represents dynamic data that changes over time, causing the component to re-render when updated.

### 3. What does the useState hook do, and where did you use it in this project?
**Answer:**
The `useState` hook allows functional components to store, maintain, and update local component state. In this project, `useState` was used in `App.tsx` for:
- `technologies`: Holding the array of tools loaded from the JSON file.
- `stack`: Storing the user's selected technology items in the sidebar.
- `isLoading`: Managing the loading spinner state during data fetch.
- `isMobileMenuOpen`: Toggling the responsive mobile navbar drawer.

### 4. What does the useEffect hook do, and why did you need it to load the JSON data?
**Answer:**
`useEffect` is a React Hook designed to handle side effects in functional components, such as data fetching, timer subscriptions, or manual DOM operations. In this project, it was used with an empty dependency array `[]` to trigger an asynchronous `fetch('/technologies.json')` request once when the component initially mounts, ensuring data is loaded from the external JSON file rather than hardcoded in the component.

### 5. Why does every item in a `.map()` list need a unique `key` prop?
**Answer:**
React relies on unique `key` props during its Virtual DOM reconciliation process to identify which specific items have changed, been added, or been removed in a list. Without unique keys, React would have to re-render the entire list instead of updating only the modified elements, which degrades performance and can lead to unexpected UI state bugs.

### 6. What is conditional rendering? Show one place you used it (example: the empty stack message).
**Answer:**
Conditional rendering is the practice of rendering different UI elements or components based on whether certain conditions are truthy or falsy. In this project, it was used in the **Your Stack** sidebar:
```tsx
{stack.length === 0 ? (
  <div className="border border-dashed border-slate-200 rounded-xl py-10 px-4 text-center">
    <p className="text-slate-400 text-sm font-medium">Your stack is empty.</p>
  </div>
) : (
  <div className="space-y-3">
    {/* List of selected technologies and Remove All button */}
  </div>
)}
```
When `stack.length === 0`, it displays the dashed empty message; otherwise, it renders the list of selected cards and the "Remove All" button.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
**Answer:**
- **Parent to Child:** The parent passes data downwards through attributes called **props** (e.g., `<TechCard item={tech} />`).
- **Child to Parent:** The parent passes a callback function down via props (e.g., `<TechCard onAdd={handleAddToStack} />`). When an event occurs in the child (like a button click), the child invokes that callback function, passing data back as an argument to the parent component.

---

## 🚀 Live Demo & Setup Instructions

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/a5-dev-stack.git

# Navigate into project directory
cd a5-dev-stack

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
