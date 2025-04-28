					
import { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp,
  FaSun,
  FaMoon,
  FaArrowRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import fotoPerfil from '../src/assets/EuUse.png';
import projeto1 from './assets/titanium.png';
import projeto2  from './assets/ecommerce.png'
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('sobre');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

// ... seus outros estados
const [currentSkills, setCurrentSkills] = useState(0);

const skillGroups = [
  {
    title: "Front-end",
    skills: "React | JavaScript | HTML5 | CSS3",
    icon: "💻"
  },
  {
    title: "Back-end", 
    skills: "Java/Spring Boot | .NET C#",
    icon: "⚙️"
  },
  {
    title: "Banco de Dados",
    skills: "PostgreSQL | SQL",
    icon: "🗃️"
  },
  {
    title: "QA & Automação",
    skills: "Cypress | Postman | Testes de ERP",
    icon: "🧪"
  },
  {
    title: "Metodologias",
    skills: "Scrum | Kanban | Gestão de Projetos",
    icon: "🛠️"
  }
];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSkills((prev) => (prev + 1) % skillGroups.length);
  }, 3000); // Muda a cada 3 segundos

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projetos = {
    titanium: [
      {
        id: 1,
        titulo: "Sistema para Controle de Corte",
        descricao: "Sistema completo para gestão de corte têxtil com React e SpringBoot.",
        tecnologias: ["React", "Java", "Postgres"],
        imagem: projeto1,
        url: "https://github.com/Josielcosta138/titanium",
        github: "https://github.com/Josielcosta138/titanium-back"
      }
      // Adicione mais projetos Titanium se necessário
    ],
    ecommerce: [
      {
        id: 2,
        titulo: "E-commerce Vendas Online",
        descricao: "Plataforma de vendas online com carrinho de compras e pagamentos.",
        tecnologias: ["React", "Node.js", "MongoDB"],
        imagem: projeto2, // Importe a imagem do ecommerce
        url: "#",
        github: "#"
      }
      // Adicione mais projetos E-commerce se necessário
    ]
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Cursor personalizado */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: cursorPosition.x - 15,
          y: cursorPosition.y - 15,
          transition: { type: 'spring', damping: 20 }
        }}
      />

      {/* Botão Dark Mode */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Header animado */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="perfil">
          <motion.img 
            src={fotoPerfil} 
            alt="Foto de perfil" 
            className="foto-perfil"
            whileHover={{ scale: 1.05 }}
          />
          <motion.h1
            animate={{ 
              color: darkMode ? '#fff' : '#333',
              transition: { duration: 0.3 }
            }}
          >
            Josiel Costa Martins
          </motion.h1>
        </div>
        
        <nav>
          {['sobre', 'projetos', 'contato'].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              onClick={() => setActiveSection(item)}
              whileHover={{ scale: 1.1 }}
              className={activeSection === item ? 'active' : ''}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.a>
          ))}
        </nav>
      </motion.header>

      {/* Seção Sobre */}
      <motion.section 
        id="sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2>Sobre Mim</h2>
        <div className="sobre-content">
          <motion.img 
            src={fotoPerfil} 
            alt="Foto de perfil" 
            className="foto-sobre"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          <motion.div
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <p>
    Desenvolvedor Full-Stack formado em Análise e Desenvolvimento de Sistemas pelo SENAC, 
    com 3 anos de experiência como QA em desenvolvimento de ERP. Apaixonado por criar 
    soluções digitais robustas que unem qualidade técnica e experiência do usuário.
  </p>
  
  <div className="skills-section">
  <h4>Minha Stack Principal:</h4>
  <AnimatePresence mode='wait'>
    <motion.div
      key={currentSkills}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="skill-group"
    >
      <div className="skill-icon">{skillGroups[currentSkills].icon}</div>
      <div>
        <h5>{skillGroups[currentSkills].title}</h5>
        <p>{skillGroups[currentSkills].skills}</p>
      </div>
    </motion.div>
  </AnimatePresence>
</div>

  <p className="current-focus">
    <strong>Atualmente:</strong> Aprimorando conhecimentos em .NET C# e Entity Framework 
    para expandir minhas capacidades no desenvolvimento de sistemas empresariais complexos.
  </p>
</motion.div>
        </div>
      </motion.section>

      {/* Seção Projetos */}
      {/* Seção Projetos */}
{/* Seção Projetos */}
<section id="projetos">
  <h2>Projetos Destacados</h2>
  
  <div className="projetos-container">
    {/* Titanium */}
    <motion.div
      className="projeto-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <div className="projeto-imagem-container">
        <img src={projeto1} alt="Titanium - Sistema para Controle de Corte" className="projeto-imagem" />
        <div className="projeto-overlay">
          <div className="tecnologias">
            <span>React.js</span>
            <span>Java</span>
            <span>Postgres</span>
          </div>
        </div>
      </div>
      <div className="projeto-info">
        <h3>Titanium - Sistema para Controle de Corte</h3>
        <p>Sistema completo para gestão de corte têxtil com React e SpringBoot.</p>
        <div className="projeto-links">
          <a href="https://github.com/Josielcosta138/titanium" target="_blank" rel="noreferrer">
            <FaArrowRight /> Ver Projeto
          </a>
          <a href="https://github.com/Josielcosta138/titanium-back" target="_blank" rel="noreferrer">
            <FaGithub /> Código Fonte
          </a>
        </div>
      </div>
    </motion.div>

    {/* E-commerce */}
    <motion.div
      className="projeto-card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      
      <div className="projeto-imagem-container">
        <img src={projeto2} alt="E-commerce Vendas Online" className="projeto-imagem" />
        <div className="projeto-overlay">
          <div className="tecnologias">
            <span>React.js</span>
            <span>Java</span>
            <span>Postgres</span>
          </div> 
        </div> 
      </div>
      
      <div className="projeto-info">
        <h3>E-commerce Vendas Online</h3>
        <p>Plataforma de vendas online com carrinho de compras e pagamentos.</p>
        <div className="projeto-links">
          <a href="https://github.com/Josielcosta138/ecommerceLux-Back-2" target="_blank" rel="noreferrer">
            <FaArrowRight /> Ver Projeto
          </a>
          <a href="https://github.com/Josielcosta138/Ecommerce-Lux-Front" target="_blank" rel="noreferrer">
            <FaGithub /> Código Fonte
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</section>

    {/* */}


      {/* Seção Contato */}
      <motion.section 
        id="contato"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Vamos Conversar</h2>
        
        <div className="contato-container">
          <form className="contato-form">
            <div className="form-group">
              <input type="text" placeholder="Seu Nome" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Seu Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Sua Mensagem" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Enviar Mensagem
            </button>
          </form>
          
          <div className="contato-info">
            <div className="contato-item">
              <FaEnvelope className="contato-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:seuemail@email.com">cjosiel2@gmail.com</a>
              </div>
            </div>
            
            <div className="contato-item">
              <FaLinkedin className="contato-icon" />
              <div>
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/josiel-costa-07b2aa140/" target="_blank" rel="noreferrer">
                linkedin.com/in/josiel-costa
                </a>
              </div>
            </div>
            
            <div className="contato-item">
              <FaWhatsapp className="contato-icon" />
              <div>
                <h4>WhatsApp</h4>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
                  (48) 99635-7530
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Josiel Costa Martins. Todos os direitos reservados.</p>
          
          <div className="social-links">
            <a href="https://github.com/Josielcosta138" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/josiel-costa-07b2aa140/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;	