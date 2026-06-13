import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
import fotoPerfil from '../src/assets/euPeerfil.jpg';
//Ecomerce
import ecommerce1 from './assets/ecomerce/ecommerce.png';
import ecommerce2 from './assets/ecomerce/detalhes-produto-ecom.png';
import ecommerce3 from './assets/ecomerce/painel-detalhes-carrinho.png';
import ecommerce4 from './assets/ecomerce/finalizando-pedido-ecom.png';
import ecommerce5 from './assets/ecomerce/categorias-ecom.png';
//Titanium
import titanium1 from './assets/titanium/titanium.png';
import titanium2 from './assets/titanium/cadastro-ordem-corte.png';
import titanium3 from './assets/titanium/lista-ordem-servico.png';
import titanium4 from './assets/titanium/pre-corte.png';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('sobre');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentSkills, setCurrentSkills] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [website, setWebsite] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    // Mostrar após 1 segundo
    const showTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 1000);

    // Esconder após 3 segundos (1000ms para mostrar + 2000ms visível)
    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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
    }, 3000);
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
        imagens: [titanium1, titanium2, titanium3, titanium4],
        url: "https://github.com/Josielcosta138/titanium",
        github: "https://github.com/Josielcosta138/titanium-back"
      }
    ],
    ecommerce: [
      {
        id: 2,
        titulo: "E-commerce Vendas Online",
        descricao: "Plataforma de vendas online com carrinho de compras e pagamentos.",
        tecnologias: ["React", "Node.js", "MongoDB"],
        imagens: [ecommerce1, ecommerce2, ecommerce3, ecommerce4, ecommerce5],
        url: "https://youtu.be/AtWlm-nv80w",
        github: "https://github.com/Josielcosta138/Ecommerce-Lux-Front"
      }
    ]
  };

  useEffect(() => {
  document.body.classList.add('dark');
}, []);
const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  document.body.classList.toggle('dark');
};

  // Configurações do carrossel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };


  // Função TELEGRAM
const enviarTelegram = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch( API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        nome,
        empresa,
        whatsapp,
        email,
        motivo,
        observacoes,
        website
      })
      }
    );

    const data = await response.json();

    if (data.sucesso) {
      alert('Mensagem enviada com sucesso!');

      setNome('');
      setEmail('');
      setEmpresa('');
      setWhatsapp('(00) 00000-0000');
      setObservacoes('');
    } else {
      alert('Erro ao enviar mensagem.');
    }

  } catch (erro) {
    console.error(erro);
    alert('Erro ao conectar com servidor.');
  }
};

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>

 {/* Modal de boas-vindas */}
 <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="welcome-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="welcome-content">
              <h3>Fico muito feliz em você visitar o meu perfil! 😀</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


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
              Profissional de Tecnologia com experiência em Automação de Testes, Qualidade de Software e sistemas ERP. Atuo com Cypress, testes E2E, APIs e integração contínua, garantindo a confiabilidade das aplicações. Formado em Análise e Desenvolvimento de Sistemas e em constante evolução técnica, com foco no aprimoramento em desenvolvimento Back-End e arquitetura de software.
            </p>

            <div className="skills-section">
              <h4>💼 Experiência Atual</h4>

              <div className="empresa-card">
                <h5>QA • Analise de Qualidade | Pleno</h5>
                <span>Useall Software</span>

                <p>
                  Responsável pela garantia da qualidade de sistemas ERP,
                  realizando testes manuais e automatizados, validação de APIs,
                  homologação de funcionalidades e apoio na evolução contínua
                  dos produtos.
                </p>
              </div>
              </div>
            
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
              <strong>👨‍🎓 - Atualmente:</strong> Aprimorando meus conhecimentos em .NET C#, Entity Framework e PL/SQL
              para expandir minhas capacidades no desenvolvimento de sistemas empresariais complexos.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Seção Projetos */}
      <section id="projetos">
        <h2>Projetos Destacados</h2>
        
        <div className="projetos-container">


          {/* Titanium */}
          {projetos.titanium.map((projeto) => (
            <motion.div
              key={projeto.id}
              className="projeto-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="projeto-imagem-container">
                <Slider {...carouselSettings}>
                  {projeto.imagens.map((imagem, index) => (
                    <div key={index}>
                      <img 
                        src={imagem} 
                        alt={`${projeto.titulo} - Imagem ${index + 1}`} 
                        className="projeto-imagem"
                      />
                      <div className="projeto-overlay">
                        <div className="tecnologias">
                          {projeto.tecnologias.map((tech, i) => (
                            <span key={i}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="projeto-info">
                <h3>{projeto.titulo}</h3>
                <p>{projeto.descricao}</p>
                <div className="projeto-links">
                  <a href={projeto.url} target="_blank" rel="noreferrer">
                    <FaArrowRight /> Ver Projeto
                  </a>
                  <a href={projeto.github} target="_blank" rel="noreferrer">
                    <FaGithub /> Código Fonte
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* E-commerce */}
          {projetos.ecommerce.map((projeto) => (
            <motion.div
              key={projeto.id}
              className="projeto-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="projeto-imagem-container">
                <Slider {...carouselSettings}>
                  {projeto.imagens.map((imagem, index) => (
                    <div key={index}>
                      <img 
                        src={imagem} 
                        alt={`${projeto.titulo} - Imagem ${index + 1}`} 
                        className="projeto-imagem"
                      />
                      <div className="projeto-overlay">
                        <div className="tecnologias">
                          {projeto.tecnologias.map((tech, i) => (
                            <span key={i}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="projeto-info">
                <h3>{projeto.titulo}</h3>
                <p>{projeto.descricao}</p>
                <div className="projeto-links">
                  <a href={projeto.url} target="_blank" rel="noreferrer">
                    <FaArrowRight /> Ver Projeto
                  </a>
                  <a href={projeto.github} target="_blank" rel="noreferrer">
                    <FaGithub /> Código Fonte
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
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
          <form
          className="contato-form"
          onSubmit={enviarTelegram}
          >
          <span className="tooltip-icon">
              <span className="tooltip-text">
                💬 Utilize o formulário abaixo para oportunidades profissionais, projetos freelance ou parcerias. Sua mensagem será enviada diretamente para mim.
              </span>
            </span>
            <div className="form-group">
            <label>💬 Motivo do contato</label>

         <select
            className="custom-select"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="Vaga de Emprego">💼 Vaga de Emprego</option>
            <option value="Freelancer">💻 Freelancer</option>
            <option value="Parceria">🤝 Parceria</option>
            <option value="Outro">📌 Outro</option>
          </select>
          </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Empresa (Opcional)"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="📱 WhatsApp"
                  value={whatsapp}
                  onChange={(e) => {
                    let valor = e.target.value.replace(/\D/g, '');

                    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
                    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

                    setWhatsapp(valor);
                  }}
                  maxLength={15}
                  required
                />
              </div>

              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ display: 'none' }}
              />

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Seu E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
        </div>
        <div className="form-group">
  <textarea
    placeholder="📝 Observações (Opcional)"
    value={observacoes}
    onChange={(e) => setObservacoes(e.target.value)}
    rows="4"
  />
</div>

<button
  type="submit"
  className="submit-btn"
>
  🚀 Enviar Mensagem
</button>
          </form>
          
          <div className="contato-info">
            <div className="contato-item">
              <FaEnvelope className="contato-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:cjosiel2@gmail.com">cjosiel2@gmail.com</a>
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
                <a href="https://wa.me/5548996357530" target="_blank" rel="noreferrer">
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