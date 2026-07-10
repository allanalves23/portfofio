/*!
 * Lightweight i18n for the portfolio.
 *
 * Supported languages: English (default) and Brazilian Portuguese.
 * The language is auto-detected from the browser (navigator.language);
 * anything starting with "pt" gets pt-BR, everything else falls back to
 * English. A manual choice made through the navbar toggle is persisted
 * in localStorage and wins over auto-detection.
 *
 * The HTML ships in English, so applying "en" is a no-op re-render and
 * there is no flash of untranslated content for the default language.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'portfolio-lang';
    var DEFAULT_LANG = 'en';
    var SUPPORTED_LANGS = ['en', 'pt-BR'];
    // Matches Bootstrap's navbar-expand-lg breakpoint: below this width the
    // navbar collapses into its own dropdown, so the language switcher drops
    // its nested dropdown menu in favor of a direct tap-to-toggle.
    var MOBILE_MEDIA_QUERY = '(max-width: 991.98px)';

    var activeLang = DEFAULT_LANG;

    var translations = {
        'en': {
            'page.title': 'Allan Wanderley - Portfolio',
            'page.description': 'My personal Portfolio',
            'nav.menu': 'Menu',
            'nav.portfolio': 'Portfolio',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            'masthead.subheading': 'Solutions/Corporate Architect - Software Developer',
            'portfolio.heading': 'Portfolio',
            'about.heading': 'About',
            'about.p1': "I'm a software architect from Brazil. Passionate about software development, currently working at B3, delivering software solutions across the organization. With skills in software architecture, gitflow, continuous delivery, observability and code quality assurance.",
            'about.p2': 'Husband, Father, lover of coffee and beer, seeking my best performance to deliver assertive solutions to all users of software that I produce.',
            'about.cv': 'Curriculum Download',
            'contact.heading': 'Contact Me',
            'contact.email': 'Email address',
            'contact.message': 'Message',
            'contact.messagePlaceholder': 'Enter your message here...',
            'contact.success': 'Form submission successful!',
            'contact.activate': 'To activate this form, sign up at',
            'contact.error': 'Error sending message!',
            'contact.send': 'Send',
            'footer.location': 'Location',
            'footer.country': 'Brazil',
            'footer.city': 'Rio de Janeiro',
            'footer.web': 'Around the Web',
            'modal.close': 'Close Window',
            'modal1.desc': "Working at the company since the previous allocation experience, now as Solutions and Corporate Architect. Principal architect responsible for the adequacy and evolution of the exchange's main post-trade (clearing) platform, ensuring performance and resilience in a mission-critical, large-scale environment.",
            'modal1.item1': "Solution design for the market index calculation mechanisms, including the exchange's main stock index",
            'modal1.item2': 'Technical reference in architecture, leading specifications, design reviews and solution standardization across the clearing, risk, issuers and indexes domains',
            'modal1.item3': 'Modernization of critical legacy systems',
            'modal1.item4': 'Design of high-availability and high-throughput cloud architectures (Azure), focused on resilience, observability and regulatory compliance',
            'modal1.item5': 'Corporate architecture work, connecting technical decisions to business constraints, operational risk and governance',
            'modal2.desc': 'Corporate Architect and Solutions/Software Architect. Three years of technical leadership ensuring deliveries in customer projects, allocated to clients in the financial and web hosting markets — B3 and Locaweb.',
            'modal2.item1': "Work with B3's Corporate Architecture team, focusing on the company's OTC portfolio",
            'modal2.item2': 'End-to-end architectural definitions and technology-business alignment, materializing decisions in Architecture Decision Records (ADRs), architectural agreements and complementary technical documentation',
            'modal2.item3': 'Technical liaison between the Network, Security, Observability, Engineering, Integrations and Business areas, designing and validating solutions in their different aspects',
            'modal2.item4': "Mapping of the portfolio's technology obsolescence and direction of update and evolution plans, balancing risk, compliance and operational continuity",
            'modal2.item5': 'Architecture and Engineering lead of the BRQ team allocated at Locaweb, with a hands-on technical leadership profile',
            'modal2.item6': 'Definition of coding standards, automated testing and software quality practices, with code review and technical mentoring for the team',
            'modal2.item7': "Architectural revitalization and evolution of the customer's hosting, e-mail and sales platforms: solution redesign, troubleshooting and modernization of existing applications, including containerization and workload orchestration",
            'modal3.desc': 'Software Architect (Senior Developer / Tech Lead), starting as a Full Stack Developer. Responsible for proposing, designing and implementing end-to-end technology solutions in internal projects and for customers in the retail segment.',
            'modal3.item1': 'Definitions of solution architecture, infrastructure and observability in outsourcing and internal projects',
            'modal3.item2': 'Responsible for implementing the development process using good security and automation practices in application integration and deployment',
            'modal3.item3': 'Implementation of application components (nuget and npm), allowing the company to deliver software more quickly',
            'modal3.item4': 'Implementation of observability solutions with elastic observability (APM, Logging, HeartBeat and MetricBeat) and implementation of good practices for the use of GIT in the company',
            'modal3.item5': 'Implementation of good development practices, including a culture of automated testing, creating quality gates in CI/CD tools and automated code coverage validation, along with education for the development team to develop better tests and ensure quality in their deliveries',
            'modal3.item6': 'Development of domain-driven (DDD) systems orchestrated in the cloud, on hexagonal architecture with CQRS and microservices',
            'modal4.desc': 'Starting a career in software development as a Full Stack Developer Intern, building APIs, web apps and PL/SQL routines.',
            'modal4.item1': 'Web application development using frameworks like Laravel and Vue.js',
            'modal4.item2': 'Creation and maintenance of PL/SQL procedures and triggers for Oracle databases, delivering value to the financial, sales and customer support areas',
            'modal4.item3': 'Implementation of the Sankhya ERP Inventory Turnover module for the internal team'
        },
        'pt-BR': {
            'page.title': 'Allan Wanderley - Portfólio',
            'page.description': 'Meu portfólio pessoal',
            'nav.menu': 'Menu',
            'nav.portfolio': 'Portfólio',
            'nav.about': 'Sobre',
            'nav.contact': 'Contato',
            'masthead.subheading': 'Arquiteto de Soluções/Corporativo - Desenvolvedor de Software',
            'portfolio.heading': 'Portfólio',
            'about.heading': 'Sobre',
            'about.p1': 'Sou um arquiteto de software brasileiro. Apaixonado por desenvolvimento de software, atualmente trabalhando na B3, entregando soluções de software para toda a organização. Com habilidades em arquitetura de software, gitflow, entrega contínua, observabilidade e garantia de qualidade de código.',
            'about.p2': 'Marido, pai, amante de café e cerveja, buscando minha melhor performance para entregar soluções assertivas a todos os usuários dos softwares que produzo.',
            'about.cv': 'Baixar Currículo',
            'contact.heading': 'Fale Comigo',
            'contact.email': 'Endereço de e-mail',
            'contact.message': 'Mensagem',
            'contact.messagePlaceholder': 'Digite sua mensagem aqui...',
            'contact.success': 'Formulário enviado com sucesso!',
            'contact.activate': 'Para ativar este formulário, cadastre-se em',
            'contact.error': 'Erro ao enviar a mensagem!',
            'contact.send': 'Enviar',
            'footer.location': 'Localização',
            'footer.country': 'Brasil',
            'footer.city': 'Rio de Janeiro',
            'footer.web': 'Na Web',
            'modal.close': 'Fechar Janela',
            'modal1.desc': 'Trabalhando na empresa desde a experiência anterior, agora como Arquiteto de Soluções e Corporativo. Arquiteto principal responsável pela adequação e evolução da principal plataforma de pós-negociação (clearing) da bolsa, garantindo performance e resiliência em regime de missão crítica e larga escala.',
            'modal1.item1': 'Desenho de soluções para os mecanismos de apuração de índices de mercado, incluindo o principal índice de ações da bolsa',
            'modal1.item2': 'Referência técnica em arquitetura, conduzindo especificações, revisões de projeto e padronização de soluções nos domínios de clearing, risco, emissores e índices',
            'modal1.item3': 'Modernização de sistemas legados críticos',
            'modal1.item4': 'Desenho de arquiteturas de alta disponibilidade e alto throughput em nuvem (Azure), com foco em resiliência, observabilidade e conformidade regulatória',
            'modal1.item5': 'Atuação em arquitetura corporativa, conectando decisões técnicas a restrições de negócio, risco operacional e governança',
            'modal2.desc': 'Arquiteto Corporativo e Arquiteto de Soluções/Software. Três anos de liderança técnica garantindo entregas em projetos de clientes, alocado em clientes dos mercados financeiro e de hospedagem de sites — B3 e Locaweb.',
            'modal2.item1': 'Atuação junto ao time de Arquitetura Corporativa da B3, com foco no Portfólio de Balcão da companhia',
            'modal2.item2': 'Definições arquiteturais de ponta a ponta e alinhamento entre tecnologia e negócio, materializando decisões em Registros de Decisões Arquiteturais (ADRs), Acordos/Contratos Arquiteturais e documentação técnica complementar',
            'modal2.item3': 'Ponto de articulação técnica entre as áreas de Redes, Segurança, Observabilidade, Engenharia, Integrações e Negócio, desenhando e validando soluções em seus diferentes aspectos',
            'modal2.item4': 'Mapeamento da obsolescência tecnológica do portfólio e direcionamento dos planos de atualização e evolução, equilibrando risco, conformidade e continuidade operacional',
            'modal2.item5': 'Liderança de Arquitetura e Engenharia do time BRQ alocado na Locaweb, com perfil de liderança técnica hands-on',
            'modal2.item6': 'Definição de padrões de codificação, escrita e execução de testes automatizados e práticas de qualidade de software, com code review e mentoria técnica do time',
            'modal2.item7': 'Revitalização e evolução arquitetural das plataformas de hospedagem, e-mail e vendas do cliente: condução do redesenho das soluções, detecção e resolução de problemas e modernização das aplicações existentes, incluindo containerização e orquestração de cargas',
            'modal3.desc': 'Arquiteto de Software (Desenvolvedor Sênior / Tech Lead), tendo iniciado como Desenvolvedor Full Stack. Responsável por propor, desenhar e implementar soluções tecnológicas de ponta a ponta em projetos internos e para clientes do segmento de varejo.',
            'modal3.item1': 'Definições de arquitetura de solução, infraestrutura e observabilidade em projetos de outsourcing e internos',
            'modal3.item2': 'Responsável pela implantação do processo de desenvolvimento utilizando boas práticas de segurança e automação na integração e implantação de aplicações',
            'modal3.item3': 'Implementação de componentes de aplicação (nuget e npm), permitindo que a empresa entregasse software com mais rapidez',
            'modal3.item4': 'Implantação de soluções de observabilidade com Elastic Observability (APM, Logging, HeartBeat e MetricBeat) e implantação de boas práticas de uso do GIT na empresa',
            'modal3.item5': 'Implantação de boas práticas de desenvolvimento, incluindo cultura de testes automatizados, criação de quality gates em ferramentas de CI/CD e validação automatizada de cobertura de código, junto à capacitação do time de desenvolvimento para criar testes melhores e garantir qualidade em suas entregas',
            'modal3.item6': 'Desenvolvimento de sistemas orientados a domínio (DDD), orquestrados em nuvem, sobre arquitetura hexagonal com aplicação de CQRS e microsserviços',
            'modal4.desc': 'Início de carreira no desenvolvimento de software como Estagiário Desenvolvedor Full Stack, construindo APIs, aplicações web e rotinas PL/SQL.',
            'modal4.item1': 'Desenvolvimento de aplicações web utilizando frameworks como Laravel e Vue.js',
            'modal4.item2': 'Criação e manutenção de procedures e triggers PL/SQL para bancos de dados Oracle, entregando valor às áreas financeira, de vendas e de suporte ao cliente',
            'modal4.item3': 'Implantação do módulo de Giro de Estoque do ERP Sankhya para o time interno'
        }
    };

    /*
     * Inline SVG flags — emoji flags render as plain letters on
     * Windows browsers, so small SVGs are used instead.
     */
    var flags = {
        'pt-BR': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14"><rect width="20" height="14" fill="#009B3A"/><path d="M10 2 18 7 10 12 2 7z" fill="#FEDF00"/><circle cx="10" cy="7" r="3" fill="#002776"/></svg>',
        'en': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14"><rect width="20" height="14" fill="#B22234"/><g fill="#fff"><rect y="2.15" width="20" height="1.08"/><rect y="4.31" width="20" height="1.08"/><rect y="6.46" width="20" height="1.08"/><rect y="8.62" width="20" height="1.08"/><rect y="10.77" width="20" height="1.08"/><rect y="12.92" width="20" height="1.08"/></g><rect width="8" height="7.54" fill="#3C3B6E"/></svg>'
    };

    function isSupported(lang) {
        return SUPPORTED_LANGS.indexOf(lang) !== -1;
    }

    function detectLanguage() {
        var stored = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            // localStorage unavailable (private mode / blocked) — fall back to auto-detection
        }
        if (stored && isSupported(stored)) {
            return stored;
        }
        var browserLang = (navigator.language || '').toLowerCase();
        return browserLang.indexOf('pt') === 0 ? 'pt-BR' : DEFAULT_LANG;
    }

    function applyLanguage(lang) {
        if (!isSupported(lang)) {
            lang = DEFAULT_LANG;
        }
        activeLang = lang;
        var dict = translations[lang];

        document.documentElement.lang = lang;
        document.title = dict['page.title'];

        var metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', dict['page.description']);
        }

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (Object.prototype.hasOwnProperty.call(dict, key)) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (Object.prototype.hasOwnProperty.call(dict, key)) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        // The dropdown button always shows the currently active language
        var currentText = document.getElementById('langCurrentText');
        if (currentText) {
            currentText.textContent = lang === 'pt-BR' ? 'PT-BR' : 'EN';
        }
        var currentFlag = document.getElementById('langCurrentFlag');
        if (currentFlag) {
            currentFlag.innerHTML = flags[lang];
        }

        document.querySelectorAll('.lang-option').forEach(function (option) {
            var isActive = option.getAttribute('data-lang') === lang;
            option.classList.toggle('active', isActive);
            option.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    function setLanguage(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            // Persistence is best-effort; the language still applies for this page view
        }
        applyLanguage(lang);
    }

    window.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-lang-flag]').forEach(function (el) {
            el.innerHTML = flags[el.getAttribute('data-lang-flag')];
        });

        applyLanguage(detectLanguage());

        document.querySelectorAll('.lang-option').forEach(function (option) {
            option.addEventListener('click', function () {
                setLanguage(option.getAttribute('data-lang'));
            });
        });

        // On mobile the navbar is already a collapsed dropdown, so a nested
        // dropdown for the language switcher is skipped: a tap cycles the
        // language directly instead of opening Bootstrap's dropdown menu.
        var langButton = document.getElementById('langDropdown');
        if (langButton) {
            langButton.addEventListener('click', function (event) {
                if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
                    event.preventDefault();
                    event.stopPropagation();
                    setLanguage(activeLang === 'en' ? 'pt-BR' : 'en');
                }
            });
        }
    });
})();
