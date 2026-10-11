# Dev Stack - Technology Stack Builder

A responsive web application where developers can browse popular web technologies, compare them, and build their own custom tech stack.

---

## Project Description

Dev Stack is an interactive tool created to help developers choose the right technologies for their projects. Users can explore a curated list of frontend, backend, database, and devops tools, check their difficulty level and community ratings, and add them into a personal "Your Stack" sidebar. The app handles duplicate prevention, item removal, and provides clear alert feedback using toast notifications.

---

## Technologies Used

- **React (v19)** - For building the user interface with reusable components.
- **TypeScript** - For type safety and cleaner code.
- **Vite** - Build tool and development server.
- **Tailwind CSS & DaisyUI** - For styling and responsive layout.
- **React-Toastify** - For popup toast notifications.
- **JSON** - For storing technology card data.

---

## 3 Core Features

1. **Dynamic Technology Grid with Loading Indicator:**
   Loads 12 technology cards from an external JSON file using React's `useEffect`. While the data is loading, a clean spinner is shown. Cards display badges, category, rating with stars, difficulty level, and are arranged in a responsive 3-column grid (2 columns on tablet, 1 column on mobile).

2. **Sidebar Stack Builder with Duplicate Prevention:**
   Clicking "Add to Stack" adds that technology to the "Your Stack" sidebar. If a user tries to add an item that is already in their stack, a warning toast alert shows up and the item is not duplicated. Once added, the card button is disabled and changes to "✓ Added to Stack".

3. **Stack Management & Interactive Toast Notifications:**
   Users can remove any single technology from their stack by clicking the ✕ button, or clear the entire stack at once using the "Remove All" button. All actions (adding, duplicate attempt, removing, and clearing) trigger colored toast alerts via React-Toastify.

---

## Questions & Answers

### 1. What is JSX, and why is it used in React?
JSX stands for JavaScript XML. It is a syntax extension that lets us write HTML-like markup inside JavaScript files. React uses JSX because it makes writing and visualizing UI layouts much easier and more intuitive than using `React.createElement()`. It also lets us embed dynamic JavaScript variables and expressions directly inside curly braces `{}`.

### 2. What is the difference between props and state?
- **Props:** Data passed from a parent component to a child component. Props are read-only (immutable) for the child component and cannot be changed by it.
- **State:** Data that is managed internally inside a component. State can be updated over time using setter functions, and whenever state changes, the component automatically re-renders to reflect the new data.

### 3. What does the useState hook do, and where did you use it in this project?
The `useState` hook allows functional components to create and update local state variables. In this project, I used `useState` in `App.tsx` for:
- `technologies`: To store the list of technologies fetched from the JSON file.
- `stack`: To track which technologies the user has added to their stack sidebar.
- `isLoading`: To control the loading spinner while the JSON data is being fetched.
- `isMobileMenuOpen`: To toggle the mobile navigation drawer on small screens.

### 4. What does the useEffect hook do, and why did you need it to load the JSON data?
`useEffect` lets us perform side effects in functional components, such as data fetching, setting up timers, or directly touching the DOM. In this project, I used it with an empty dependency array `[]` so that it runs once right after the component mounts on the screen. This fetches the `technologies.json` file and saves the data into state without causing an infinite re-rendering loop.

### 5. Why does every item in a .map() list need a unique key prop?
React uses the `key` prop to keep track of individual list items in the Virtual DOM. When list items change, get added, or get removed, the unique key helps React figure out exactly which DOM elements need to be updated. Without unique keys, React might re-render the whole list or mix up component states, which hurts performance and can introduce UI bugs.

### 6. What is conditional rendering? Show one place you used it (example: the empty stack message).
Conditional rendering means displaying different UI elements based on whether a condition is true or false. In this project, I used it inside the "Your Stack" sidebar:
```jsx
{stack.length === 0 ? (
  <div className="border border-dashed border-slate-200 rounded-xl py-10 px-4 text-center">
    <p className="text-slate-400 text-sm font-medium">Your stack is empty.</p>
  </div>
) : (
  <div className="space-y-3">
    {/* List of selected items and the Remove All button */}
  </div>
)}
```
When `stack.length === 0`, it shows the dashed "Your stack is empty." box. Once items are added, it shows the list of selected cards and the "Remove All" button instead.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
- **Parent to Child:** The parent passes data downward using props, just like HTML attributes (for example: `<TechCard tech={item} />`).
- **Child to Parent:** The parent passes a callback function down to the child as a prop (for example: `<TechCard onAdd={handleAddToStack} />`). When an event happens in the child (like a button click), the child calls that function and passes the necessary data back as an argument to the parent.

---

## How to Run the Project Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/the-Asif/DevStack.git
   ```
2. Open the project folder:
   ```bash
   cd DevStack
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`.
