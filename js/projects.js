/**
 * Mahabub Islam Portfolio - Projects Data & Modal Logic
 */

const projectsData = [
  {
    id: "churn-prediction",
    title: "Telco Customer Churn Prediction",
    category: "ml",
    categoryLabel: "Machine Learning",
    image: "assets/images/project_churn.jpg",
    tags: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    shortDesc: "Machine learning pipeline analyzing telecom customer data to predict churn using Random Forest, Logistic Regression, and GridSearchCV.",
    github: "https://github.com/Mahabubislam50725",
    bullets: [
      "Cleaned and preprocessed telecom customer datasets, handling missing values, encoding categorical variables, and scaling numeric features.",
      "Performed thorough Exploratory Data Analysis (EDA) to discover key churn indicators (contract type, tenure, monthly charges).",
      "Developed and systematically evaluated Logistic Regression, K-Nearest Neighbors (KNN), and Random Forest classifiers.",
      "Utilized 5-fold cross-validation and GridSearchCV for automated hyperparameter tuning and model selection.",
      "Evaluated model performance using Accuracy, Precision, Recall, F1-score, ROC-AUC curves, and confusion matrix visualizers."
    ]
  },
  {
    id: "ecommerce-system",
    title: "Multi-Vendor E-Commerce System",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    image: "assets/images/project_ecommerce.jpg",
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    shortDesc: "Comprehensive database-driven e-commerce application supporting Admin, Seller, and Customer multi-tier authorization roles.",
    github: "https://github.com/Mahabubislam50725",
    bullets: [
      "Architected a complete relational database in MySQL with optimized entity relationship schemas for vendors, products, and order logs.",
      "Engineered multi-role authentication & access control for System Admin, Independent Sellers, and Purchasing Customers.",
      "Built dynamic product catalogs, search filters, order placement, invoice tracking, and account management modules.",
      "Integrated asynchronous JavaScript (AJAX) with PHP backend logic for responsive interaction without page reload."
    ]
  },
  {
    id: "digitools-platform",
    title: "DigiTools Utility Platform",
    category: "frontend",
    categoryLabel: "React.js App",
    image: "assets/images/project_digitools.jpg",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "JSX"],
    shortDesc: "Modular utility web platform featuring reusable React components, modern developer widgets, and responsive Tailwind UI.",
    github: "https://github.com/Mahabubislam50725",
    bullets: [
      "Designed and developed a multi-tool web application streamlining daily developer and productivity tools.",
      "Implemented modular, component-based React architecture emphasizing reusability and clean code principles.",
      "Crafted hyper-responsive interfaces with Tailwind CSS, supporting seamless mobile and desktop navigation.",
      "Managed local component states and user interaction handlers for zero-latency UI reactivity."
    ]
  },
  {
    id: "friend-tracker",
    title: "Friend Tracker Application",
    category: "frontend",
    categoryLabel: "React & Context API",
    image: "assets/images/project_friend.jpg",
    tags: ["React.js", "React Router", "Context API", "Tailwind CSS"],
    shortDesc: "Interactive social management application built with React Router for client-side routing and Context API for global state.",
    github: "https://github.com/Mahabubislam50725",
    bullets: [
      "Built an interactive friend network tracker for organizing contacts, communication activity logs, and social updates.",
      "Implemented client-side SPA routing using React Router DOM for instant view switches without server round-trips.",
      "Centralized state management using React Context API and useReducer hooks to eliminate prop drilling.",
      "Designed fluid, dynamic interfaces using Tailwind CSS with glassmorphic cards and dark mode contrast."
    ]
  },
  {
    id: "book-borrowing",
    title: "Online Book Borrowing Platform",
    category: "fullstack",
    categoryLabel: "Next.js Web App",
    image: "assets/images/project_book.jpg",
    tags: ["Next.js", "JavaScript", "HTML5", "CSS3"],
    shortDesc: "Digital library and book-borrowing portal featuring structured SSR/SSG page layouts and catalog management in Next.js.",
    github: "https://github.com/Mahabubislam50725",
    bullets: [
      "Developed a modern web portal for digital book searching, reservation, and loan tracking.",
      "Utilized Next.js page structure and component patterns for fast render times and search engine friendly structure.",
      "Built interactive catalog browsing with real-time status indicators (Available vs On Loan).",
      "Applied clean CSS custom styling for an aesthetic digital library reading experience."
    ]
  },
  {
    id: "dragon-news",
    title: "Dragon News Media Portal",
    category: "frontend",
    categoryLabel: "Next.js Media",
    image: "assets/images/project_book.jpg",
    tags: ["Next.js", "JavaScript", "Responsive UI", "CSS3"],
    shortDesc: "News publication frontend featuring categorized breaking news channels, featured stories slider, and mobile layouts.",
    github: "https://github.com/Mahabubislam50725",
    bullets: [
      "Engineered a news publication portal optimized for fast content consumption across desktop, tablet, and mobile devices.",
      "Structured categorized news sections (World, Tech, Politics, Sports) using reusable Next.js components.",
      "Created structured grid layouts and responsive media embeds for high engagement and readability."
    ]
  }
];

// Function to render projects into DOM
function renderProjects(filter = "all") {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const filtered = filter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  container.innerHTML = filtered.map(project => `
    <div class="project-card" data-id="${project.id}">
      <div class="project-thumb-container">
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
        <span class="project-category-badge">${project.categoryLabel}</span>
        <div class="project-overlay">
          <button class="btn btn-primary btn-sm open-modal-btn" data-id="${project.id}">
            <i class="fa-solid fa-eye"></i> View Details
          </button>
          <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <p class="project-description">${project.shortDesc}</p>
        <div class="project-footer">
          <button class="project-link open-modal-btn" data-id="${project.id}">
            Read More <i class="fa-solid fa-arrow-right"></i>
          </button>
          <a href="${project.github}" target="_blank" rel="noopener" class="project-link">
            <i class="fa-brands fa-github"></i> Repo
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners to modal trigger buttons
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-id');
      openProjectModal(projId);
    });
  });
}

// Function to open project details modal
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="modal-project-img">
    <h3 class="modal-project-title">${project.title}</h3>
    <div class="modal-project-tags">
      ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
    </div>
    <div class="modal-project-details">
      <h4><i class="fa-solid fa-circle-info"></i> Project Overview & Key Deliverables</h4>
      <ul>
        ${project.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
    <div style="margin-top: 24px; display: flex; gap: 12px;">
      <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary">
        <i class="fa-brands fa-github"></i> View GitHub Repository
      </a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Setup project filter tabs
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderProjects(filterValue);
    });
  });
}
