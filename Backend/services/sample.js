const obj = {
  "matchScore" : 90,
  "technicalQuestions" : [
    {
      "question": "Can you walk me through the architecture of your Full Stack E-Commerce Application? Specifically, how did you handle authentication and authorization?",
      "intention": "To assess understanding of full-stack architecture, practical application of learned technologies (React, Node.js, Express.js, MongoDB), and security principles. Gauges their project ownership and decision-making.",
      "answer": "Discuss the separation of concerns between the React frontend and Node.js/Express.js backend. For authentication, explain using JWT (JSON Web Tokens): a user logs in, credentials are sent to the server, validated, and a signed token is returned. This token is stored on the client (e.g., localStorage) and sent with subsequent requests in the Authorization header. For authorization, describe how middleware in Express.js intercepts requests, verifies the JWT's validity and expiration, and then checks user roles or permissions (e.g., admin vs. regular user) before allowing access to specific routes or resources. Mention password hashing (e.g., bcrypt) for secure storage."
    },
    {
      "question": "Given your experience with both Java and JavaScript, when would you choose Java over JavaScript for a backend service, and vice-versa?",
      "intention": "To evaluate their understanding of language strengths/weaknesses, appropriate use cases, and ability to make informed technology choices. Tests practical knowledge beyond just syntax.",
      "answer": "Java is often preferred for large-scale enterprise applications requiring high performance, strong type safety, robust concurrency (due to JVM and multi-threading capabilities), and a mature ecosystem with extensive libraries and tools. It's suitable for complex systems, microservices architectures, and environments prioritizing stability and long-term maintainability. JavaScript (Node.js) excels in I/O-bound operations, real-time applications (like their chat app), rapid prototyping, and scenarios where a single language across frontend and backend simplifies development and team overhead. It's ideal for applications needing high scalability through horizontal scaling and non-blocking I/O, often found in web APIs and streaming services."
    },
    {
      "question": "You mentioned solving 500+ DSA problems. Describe a particularly challenging problem you encountered and how you approached solving it. What was the time and space complexity of your final solution?",
      "intention": "To gauge problem-solving methodology, ability to handle complexity, debugging skills, and understanding of time/space complexity analysis. Tests their practical DSA application.",
      "answer": "Choose a specific problem, ideally one that required more than a straightforward approach (e.g., a complex Dynamic Programming problem, a graph traversal challenge like shortest path in a weighted graph, or a tricky tree problem). Describe the initial brute-force approach and its inefficiencies. Then, detail the thought process to optimize it: identifying overlapping subproblems, greedy choices, or graph properties. Explain the specific data structures (e.g., hash maps for memoization, priority queues for Dijkstra's) and algorithms used. Clearly state the time and space complexity (Big O notation) of both the naive and optimized solutions, justifying the improvements made."
    },
    {
      "question": "Explain the concept of 'middleware' in Express.js. How did you utilize it in your e-commerce application beyond authentication?",
      "intention": "To assess practical knowledge of Node.js/Express.js framework specifics, understanding of the request-response cycle, and ability to apply framework features in real projects.",
      "answer": "Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can execute any code, make changes to the request and the response objects, end the request-response cycle, or call the next middleware function to pass control. Beyond authentication/authorization, in the e-commerce app, I would have used middleware for: 1. Request logging (e.g., to record incoming requests), 2. Body parsing (e.g., `express.json()` to parse JSON payloads), 3. Error handling (a dedicated middleware to catch and centralize error responses), 4. Input validation (to ensure data conforms to expected formats before processing), and 5. CORS headers setup."
    },
    {
      "question": "You listed MongoDB and Oracle SQL. Discuss the key differences between SQL (relational) and NoSQL (document-based) databases, and provide scenarios where you would choose one over the other.",
      "intention": "To evaluate understanding of fundamental database concepts, different database paradigms, and the ability to make informed data storage architectural decisions. Tests knowledge of both database types listed.",
      "answer": "SQL databases (like Oracle SQL) are relational, use a structured schema with tables, rows, and columns, and strictly enforce ACID properties (Atomicity, Consistency, Isolation, Durability). They are excellent for complex queries involving multiple joins, transactions, and applications requiring strong data consistency and integrity. NoSQL databases (like MongoDB, a document-based NoSQL DB) are non-relational, offer flexible schema, and are designed for high scalability, availability, and performance for large volumes of unstructured or semi-structured data. They often sacrifice some ACID properties for eventual consistency. You would choose SQL for financial systems, inventory management, or applications with complex, interconnected data and high transactional integrity needs. You would choose NoSQL for real-time analytics, content management systems, IoT data, user profiles, or applications requiring rapid iteration, flexible data models, and massive horizontal scaling, where strict schema isn't necessary."
    }
  ],
  "behaviouralQuestions" : [
    {
      "question": "Tell me about a time you faced a significant technical challenge in one of your projects (e.g., a complex bug, a difficult integration). How did you approach it, and what was the outcome?",
      "intention": "To evaluate problem-solving skills, resilience, and learning from difficult situations. Assesses their 'persistence' and 'analytical thinking' strengths mentioned in the self-description.",
      "answer": "Use the STAR method (Situation, Task, Action, Result). Describe a specific technical hurdle, such as a subtle bug in an API integration, a performance bottleneck in your e-commerce application, or a complex data structure implementation. Detail the steps you took to diagnose and resolve it: researching documentation, debugging systematically, consulting online resources, or seeking advice from peers. Explain the solution implemented and the positive outcome (e.g., improved system stability, successful feature deployment), and what you learned from the experience about debugging or problem-solving methodologies."
    },
    {
      "question": "The job description emphasizes collaboration with frontend and backend teams. Describe a situation where you had to work effectively as part of a team on a project. What was your specific role, and what did you learn about collaboration?",
      "intention": "To assess teamwork, communication, and collaboration skills. Checks if their 'teamwork' strength is demonstrated with practical examples.",
      "answer": "Describe a project, such as your Full Stack E-Commerce Application if it was a team effort, or any other academic/group project. Clearly define your specific role and responsibilities within the team. Explain how you communicated with other team members (e.g., daily stand-ups, version control, code reviews), resolved disagreements, and contributed to the overall project success. Highlight any challenges in collaboration and how they were overcome, emphasizing what you learned about effective team dynamics, communication strategies, and leveraging individual strengths."
    },
    {
      "question": "You mentioned enjoying learning new technologies. Can you give an example of a technology you recently learned independently, why you chose it, and how you applied it?",
      "intention": "To gauge proactivity, self-learning ability, curiosity, and genuine interest in software development. Validates their self-description and commitment to continuous growth.",
      "answer": "Mention a specific technology not explicitly listed on your resume but relevant to software development (e.g., a specific React testing library like Jest/React Testing Library, a new Node.js framework feature, a basic understanding of Docker, or an introductory concept of a cloud service like AWS S3 for static hosting). Explain your motivation for learning it (e.g., to solve a specific problem, improve code quality, explore new paradigms). Describe the learning process (tutorials, documentation, online courses) and how you applied this newly acquired knowledge to a personal project, an existing academic project, or a coding challenge."
    },
    {
      "question": "Why are you interested in a Software Development Engineer Intern position at ABC Technologies, and what do you hope to gain from this internship experience?",
      "intention": "To assess motivation, cultural fit, career aspirations, and if they have researched the company and understand the role's scope.",
      "answer": "Express genuine enthusiasm for ABC Technologies (mention specific aspects like the company's reputation, innovative projects, or values if known). Relate your passion for software development, problem-solving, and building scalable applications to the company's mission and the SDE Intern responsibilities. Articulate specific skills you wish to develop (e.g., working on large-scale production systems, collaborating with experienced engineers, gaining exposure to industry best practices in areas like cloud or system design) and how you believe ABC Technologies provides an ideal environment for that growth."
    },
    {
      "question": "Describe a time when you received constructive criticism or negative feedback, either in an academic setting or during a project. How did you respond to it, and what did you learn?",
      "intention": "To assess openness to feedback, self-awareness, and the ability to grow and adapt. This is a crucial trait for junior roles where continuous learning and improvement are expected.",
      "answer": "Choose an example where you received feedback, perhaps on your code quality during a project, your approach to a problem, or a presentation. Explain the context, the specific feedback you received, and your initial reaction. Crucially, detail the concrete actions you took to address the feedback and the positive results that followed (e.g., improved code readability, a more efficient solution, better presentation skills). Emphasize your commitment to continuous improvement and how you proactively seek out and apply feedback to enhance your skills and work."
    }
  ],
  "skillGap" : [
    {
      "skill": "Cloud Platforms (e.g., AWS, Azure, GCP)",
      "severity": "medium"
    },
    {
      "skill": "System Design Principles",
      "severity": "medium"
    },
    {
      "skill": "Software Testing (Unit, Integration, E2E Testing Frameworks)",
      "severity": "low"
    }
  ],
  "preparationPlan" : [
    {
      "day": 1,
      "focus": "Data Structures & Algorithms - Fundamentals",
      "tasks": [
        "Review basic data structures: Arrays, Linked Lists, Stacks, Queues, Hash Maps.",
        "Practice problems on sorting algorithms (e.g., Merge Sort, Quick Sort) and searching (Binary Search).",
        "Solve 2-3 medium-difficulty LeetCode problems covering these topics to solidify understanding and speed."
      ]
    },
    {
      "day": 2,
      "focus": "Data Structures & Algorithms - Advanced",
      "tasks": [
        "Review Trees (BST, balanced trees), Graphs (DFS, BFS), Dynamic Programming, and Greedy Algorithms.",
        "Practice problems involving graph traversals and common DP patterns.",
        "Solve 2-3 medium-to-hard difficulty LeetCode problems focused on DP or Graphs."
      ]
    },
    {
      "day": 3,
      "focus": "Core Language Proficiency (Java & JavaScript)",
      "tasks": [
        "Review Object-Oriented Programming (OOP) concepts in Java: Inheritance, Polymorphism, Abstraction, Encapsulation with examples.",
        "Practice common Java APIs, especially Collections Framework (List, Set, Map differences).",
        "Review JavaScript ES6+ features: async/await, Promises, arrow functions, destructuring, and scope/closures.",
        "Understand 'this' keyword and the event loop in JavaScript for asynchronous operations."
      ]
    },
    {
      "day": 4,
      "focus": "Web Development - Frontend & Backend Frameworks",
      "tasks": [
        "Review React.js core concepts: Components, Props, State, controlled vs. uncontrolled components, and key Hooks (useState, useEffect, useContext, useRef).",
        "Understand component lifecycle and basic state management strategies.",
        "Review Node.js and Express.js: Middleware, routing, handling requests/responses, error handling patterns.",
        "Deep dive into asynchronous operations in Node.js and how Express.js manages them."
      ]
    },
    {
      "day": 5,
      "focus": "Databases & API Design",
      "tasks": [
        "Review SQL basics: SELECT, INSERT, UPDATE, DELETE, JOINs, subqueries, and indexing principles for performance.",
        "Understand MongoDB: Document structure, basic CRUD operations, aggregation pipeline basics, and common query operators.",
        "Review REST API principles: HTTP methods, status codes, statelessness, and resource-based design.",
        "Practice designing a simple REST API and consuming it with tools like Postman."
      ]
    },
    {
      "day": 6,
      "focus": "Project Deep Dive & System Design Introduction",
      "tasks": [
        "Thoroughly review both of your projects (E-Commerce, Chat App). Be ready to explain architecture, technical decisions, challenges faced, and solutions implemented.",
        "Think about potential scalability bottlenecks for your E-Commerce app and how you might address them (e.g., caching, load balancing, database sharding).",
        "Read introductory articles or watch videos on fundamental System Design concepts (e.g., CAP theorem, distributed systems basics, common design patterns like load balancers, proxies, message queues). Focus on understanding the 'why' behind these concepts."
      ]
    },
    {
      "day": 7,
      "focus": "Core CS Concepts & Resume Review",
      "tasks": [
        "Briefly review key concepts from Operating Systems: processes vs. threads, memory management (virtual memory, paging), CPU scheduling.",
        "Briefly review key concepts from Computer Networks: TCP/IP model, HTTP/HTTPS, DNS, Load Balancing basics.",
        "Review your resume meticulously for clarity, impact, and keywords. Be prepared to discuss every single point on your resume confidently and in detail.",
        "Practice explaining your projects concisely and effectively, focusing on outcomes and your contributions."
      ]
    },
    {
      "day": 8,
      "focus": "Behavioral Preparation & Mock Interview",
      "tasks": [
        "Prepare detailed answers for common behavioral questions using the STAR method (Situation, Task, Action, Result). Focus on examples that highlight teamwork, problem-solving, learning, and adaptability.",
        "Formulate intelligent questions to ask the interviewer at the end of the interview, showing your interest in the role and company.",
        "Conduct a mock interview with a friend or mentor, covering both technical and behavioral aspects. Get feedback on clarity, confidence, and completeness of answers.",
        "Ensure your physical and mental preparation (rest, healthy food) for the interview day."
      ]
    }
  ]
}