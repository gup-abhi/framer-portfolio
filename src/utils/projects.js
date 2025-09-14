export const projects = [
  {
    title: "Expense Tracker",
    subtitle: {
      pt: "Um aplicativo completo de controle de despesas desenvolvido com a stack PERN (PostgreSQL, Express.js, React.js, Node.js). Inclui autenticação, dashboard interativo e relatórios detalhados.",
      en: "A comprehensive expense tracking application built with the PERN stack (PostgreSQL, Express.js, React.js, Node.js). Features user authentication, interactive dashboard, and detailed financial reports.",
    },
    technologies: ["React", "PostgreSQL", "Express.js", "Node.js", "JWT", "Chart.js"],
    path: "https://expense-tracker-server-ers4.onrender.com/",
    git: "https://github.com/gup-abhi/expense-tracker-server",
    img: "expense",
    category: "fullstack",
    featured: true,
  },
  {
    title: "Todo App",
    subtitle: {
      pt: "Aplicativo de tarefas moderno com funcionalidades avançadas como categorização, filtros, busca e sincronização em tempo real. Interface responsiva e intuitiva.",
      en: "Modern task management application with advanced features including categorization, filtering, search, and real-time synchronization. Responsive and intuitive interface.",
    },
    technologies: ["React", "PostgreSQL", "Express.js", "Node.js", "Socket.io", "Redux"],
    path: "https://todo-server-hqr6.onrender.com/",
    git: "https://github.com/gup-abhi/todo-server",
    img: "todo",
    category: "fullstack",
    featured: true,
  },
  {
    title: "AI Chat Assistant",
    subtitle: {
      pt: "Assistente de chat inteligente construído com OpenAI GPT-4, incluindo processamento de linguagem natural, geração de respostas contextuais e interface conversacional moderna.",
      en: "Intelligent chat assistant built with OpenAI GPT-4, featuring natural language processing, contextual response generation, and modern conversational interface.",
    },
    technologies: ["React", "OpenAI API", "Node.js", "Express.js", "WebSocket", "TailwindCSS"],
    path: "https://ai-chat-demo.onrender.com/",
    git: "https://github.com/gup-abhi/ai-chat-assistant",
    img: "top-250-movies", // Using existing image for now
    category: "ai",
    featured: true,
  },
  {
    title: "Django Blog",
    subtitle: {
      pt: "Sistema de blog dinâmico com funcionalidades completas de CMS. Inclui editor rico, sistema de comentários, categorias e painel administrativo avançado.",
      en: "Dynamic blog system with complete CMS functionality. Features rich text editor, comment system, categories, and advanced admin panel.",
    },
    technologies: ["Django", "Bootstrap", "PostgreSQL", "Django REST", "JavaScript", "AJAX"],
    path: "https://django-blog-oclq.onrender.com/",
    git: "https://github.com/gup-abhi/django_project",
    img: "django-blog",
    category: "fullstack",
    featured: false,
  },
  {
    title: "ML Movie Recommender",
    subtitle: {
      pt: "Sistema de recomendação de filmes baseado em machine learning usando algoritmos de filtragem colaborativa e análise de sentimento para personalizar sugestões.",
      en: "Movie recommendation system based on machine learning using collaborative filtering algorithms and sentiment analysis to personalize suggestions.",
    },
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Flask", "TensorFlow"],
    path: "https://ml-movie-recommender.onrender.com/",
    git: "https://github.com/gup-abhi/ml-movie-recommender",
    img: "expense", // Using existing image for now
    category: "ai",
    featured: false,
  },
];
