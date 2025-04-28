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
import projeto1 from './assets/bug1.png';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('sobre');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projetos = [
    {
      id: 1,
      titulo: "Sistema de Gestão",
      descricao: "Sistema completo para gestão empresarial com React e Node.js",
      tecnologias: ["React", "Node.js", "MongoDB"],
      imagem: projeto1,
      url: "https://github.com/Josielcosta138/titanium", //meusistema
      github: "https://github.com/Josielcosta138/titanium-back"
    },
    // ... outros projetos
  ];

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
            Seu Nome
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
    <ul className="skills-list">
      <li><span>💻 Front-end:</span> React | JavaScript | HTML5 | CSS3</li>
      <li><span>⚙️ Back-end:</span> Java/Spring Boot | .NET C# (em estudo)</li>
      <li><span>🗃️ Banco de Dados:</span> PostgreSQL | SQL</li>
      <li><span>🧪 QA & Automação:</span> Cypress | Postman | Testes de ERP</li>
      <li><span>🛠️ Metodologias:</span> Scrum | Kanban | Gestão de Projetos</li>
    </ul>
  </div>

  <p className="current-focus">
    <strong>Atualmente:</strong> Aprimorando conhecimentos em .NET C# e Entity Framework 
    para expandir minhas capacidades no desenvolvimento de sistemas empresariais complexos.
  </p>
</motion.div>
        </div>
      </motion.section>

      {/* Seção Projetos */}
      <section id="projetos">
        <h2>Projetos Destacados</h2>
        
        <div className="projetos-grid">
          <AnimatePresence>
            {projetos.map((projeto, index) => (
              <motion.div
                key={projeto.id}
                className="projeto-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="projeto-imagem-container">
                  <img src={projeto.imagem} alt={projeto.titulo} className="projeto-imagem" />
                  <div className="projeto-overlay">
                    <div className="tecnologias">
                      {projeto.tecnologias.map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="projeto-info">
                  <h3>{projeto.titulo}</h3>
                  <p>{projeto.descricao}</p>
                  
                  <div className="projeto-links">
                    <a href={projeto.url} target="_blank" rel="noreferrer">
                      Ver Projeto <FaArrowRight />
                    </a>
                    <a href={projeto.github} target="_blank" rel="noreferrer">
                      Código no GitHub <FaArrowRight />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

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