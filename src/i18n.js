import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEs from "./locales/es.json";
import translationEn from "./locales/en.json";

// Configurar i18next
i18n.use(initReactI18next).init({
  resources: {
    es: {
      what_are_we: "What are we?",
      welcome_message:
        'Welcome to <strong id="violetSmall">Book Nook</strong>, a platform designed by literature enthusiasts to foster a deeper connection between readers and stories. Our mission is to build a vibrant community where creativity and imagination find their place. Created with dedication and a collaborative spirit, Book Nook simplifies the way people discover, share, and get inspired by books.',
      meet_our_developers: "Meet our developers!",
      role: "Role",
      role_front_end: "Front-End Developer",
      role_ux_ui: "UX/UI Designer",
      role_back_end: "Back-End Developer",
      role_documentation_manager: "Documentation Manager",
      santino_name: "Santino",
      eze_name: "Eze",
      juan_name: "Juan",
      mateo_name: "Mateo",
      santino_description:
        "Specialized in React, Santino leads the implementation of user interfaces, ensuring an intuitive and smooth experience. He also integrates key services such as the Google Books API and Mercado Pago, optimizing the app's functionality and addressing much of its overall logic.",
      eze_description:
        "Eze transforms concepts into visual realities. He works on structuring and designing the page using HTML and CSS, creating practical prototypes that are then implemented into our main framework.",
      juan_description:
        "A specialist in databases with MySQL and Node.js, Juan designed and implemented the API that supports the back-end functionality of Book Nook. His work ensures solid, secure, and scalable performance.",
      mateo_description:
        "Mateo organizes and documents each stage of development, from conceptual diagrams to functional specifications. Thanks to his meticulous work, the team maintains clarity in objectives and smooth project execution.",
    },
    en: {
      what_are_we: "¿Qué somos?",
      welcome_message:
        'Bienvenido a <strong id="violetSmall">Book Nook</strong>, una plataforma diseñada por apasionados de la literatura para fomentar una conexión más profunda entre los lectores y las historias. Nuestra misión es construir una comunidad vibrante en la que la creatividad y la imaginación encuentren su lugar. Creado con dedicación y espíritu colaborativo, Book Nook simplifica la manera en la que las personas descubren, comparten y se inspiran en los libros.',
      meet_our_developers: "¡Conoce a nuestros desarrolladores!",
      role: "Rol",
      role_front_end: "Desarrollador Front-End",
      role_ux_ui: "Diseñador UX/UI",
      role_back_end: "Desarrollador Back-End",
      role_documentation_manager: "Responsable de Documentación",
      santino_name: "Santino",
      eze_name: "Eze",
      juan_name: "Juan",
      mateo_name: "Mateo",
      santino_description:
        "Especializado en React, Santino lidera la implementación de las interfaces de usuario, asegurando una experiencia intuitiva y fluida. Además, integra servicios clave como la API de Google Books y Mercado Pago, optimizando la funcionalidad de la aplicación y abordando gran parte de su lógica general.",
      eze_description:
        "Eze convierte conceptos en realidades visuales. Trabaja en la estructuración y diseño de la página utilizando HTML y CSS, generando prototipos prácticos que luego se implementan en nuestro framework principal.",
      juan_description:
        "Especialista en bases de datos con MySQL y Node.js, Juan diseñó e implementó la API que sustenta el funcionamiento del back-end de Book Nook. Su trabajo garantiza un rendimiento sólido, seguro y escalable.",
      mateo_description:
        "Mateo organiza y documenta cada etapa del desarrollo, desde diagramas conceptuales hasta especificaciones funcionales. Gracias a su meticuloso trabajo, el equipo mantiene claridad en los objetivos y fluidez en la ejecución del proyecto.",
    },
  },
  lng: "es",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
