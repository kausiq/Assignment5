1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll

•	getElementById finds a single element by its unique id.

•	getElementsByClassName returns a live collection of all elements that share a class name.

•	querySelector returns the first element that matches a CSS selector.

•	querySelectorAll returns all elements that match a CSS selector, as a static list.

3. How to create and insert a new element into the DOM?

Basically make a new element, give it whatever text or attributes you need, and then attach it to the page. In other words: create it, fill it, and place it somewhere inside the existing HTML.

5. What is Event Bubbling and how does it work?

When you click or trigger something on a page, the event doesn’t just stop there. It first runs on the element you clicked, then it “bubbles up” to its parent, then to the parent’s parent, and so on until it reaches the very top of the page.

7. What is Event Delegation in JavaScript? Why is it useful?
   
Event delegation is when you don’t put separate event listeners on every single child element, but instead put just one on their parent and let it handle clicks or actions using bubbling. It’s useful because it saves memory, makes your code cleaner, and still works even if new elements are added later.

9. Difference between preventDefault() and stopPropagation()
•	preventDefault() stops the browser’s default action, like following a link or submitting a form.
•	stopPropagation() stops the event from moving up through the parent elements in the bubbling process.
