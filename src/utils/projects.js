export const projects = [
  {
    title: "AI Journal App",
    subtitle: {
      fr: "Um aplicativo de diário completo desenvolvido com a stack MERN (MongoDB, Express.js, React Native, Node.js), com autenticação baseada em JWT via Supabase. Inclui recursos de IA para análise de sentimentos, extração de temas e resumo das entradas do diário.",
      en: "A full-stack journaling application built with the MERN stack (MongoDB, Express.js, React Native, Node.js) featuring JWT-based authentication via Supabase. Integrated AI-powered features for sentiment analysis, key theme extraction, and summarization of journal entries.",
    },
    technologies: ["React Native", "MongoDB", "Express.js", "Node.js", "JWT", "Supabase", "Tailwind CSS", "Radix UI", "Zustand"],
    path: "https://ai-journaling.onrender.com/",
    git: "", // not provided in resume
    img: "ai-journal",
    category: "fullstack",
    featured: true,
  },
  {
    title: "Chat App",
    subtitle: {
      fr: "Plataforma de chat em tempo real construída com React (Vite), Express.js, Socket.IO e MongoDB. Suporta mensagens instantâneas, rastreamento de presença online e compartilhamento de mídia, com autenticação JWT e upload de avatares via Cloudinary.",
      en: "A real-time chat platform built with React (Vite), Express.js, Socket.IO, and MongoDB. Supports instant messaging, online presence tracking, and media sharing, with JWT-based authentication and Cloudinary integration for avatar uploads.",
    },
    technologies: ["React", "Vite", "Express.js", "Socket.IO", "MongoDB", "JWT", "Cloudinary", "Tailwind CSS", "Zustand"],
    path: "https://chat-app-7ruk.onrender.com/",
    git: "", // not provided in resume
    img: "chat-app",
    category: "fullstack",
    featured: true,
  },  
  {
    title: "Expense Tracker",
    subtitle: {
      fr: "Um aplicativo completo de controle de despesas desenvolvido com a stack PERN (PostgreSQL, Express.js, React.js, Node.js). Inclui autenticação, dashboard interativo e relatórios detalhados.",
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
    title: "Top 250 Movies",
    subtitle: {
      fr: "Aplicação web que exibe os 250 melhores filmes de acordo com o IMDB, com funcionalidades de busca, filtros e visualização detalhada. Desenvolvido com React e integração com API externa.",
      en: "Web application displaying the top 250 movies according to IMDB, featuring search functionality, filters, and detailed movie information. Built with React and external API integration.",
    },
    technologies: ["React", "JavaScript", "CSS", "API Integration"],
    path: "https://top-250-movies.onrender.com/",
    git: "",
    img: "top-movies",
    category: "fullstack",
    featured: true,
  },
];
