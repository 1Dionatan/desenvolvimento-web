import "../styles/utility.css"
import "../styles/header.css"
import "../styles/home.css"
import "../styles/hero.css"
import "../styles/solution.css"
import "../styles/testimonials.css"
import "../styles/pricing.css"
import "../styles/contact.css"
import "../styles/footer.css"
import { useState } from "react"
import ProfileImageOne from "../assets/images/caraloiro.png";
import ProfileImageTwo from "../assets/images/caradorobo.png";
import StarOuter from '../assets/images/staryes.png'
import Logo from '../assets/logocyber.png'
import Menu from '../assets/menu.svg'
import Close from '../assets/close.svg'
import Data from "../assets/data.svg"
import Button from "../components/Button"
import HeroRectangleOne from "../assets/images/rectangleOne.png"
import HeroRectangleTwo from "../assets/images/rectangleTwo.png"

export default function Home() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState<string | null>(null)
    const [profile, setProfile] = useState<any>(null)
    const [authError, setAuthError] = useState<string | null>(null)
    const [showAuth, setShowAuth] = useState<"login" | "signup" | null>(null)

    const testimonials = [
        {
            photo: ProfileImageOne,
            text: "As impressoras contratadas são rápidas e econômicas. Nunca tivemos tanta confiabilidade no parque de impressão da empresa.",
            name: "Marcos S.",
            role: "Administração",
        },
        {
            photo: ProfileImageTwo,
            text: "O relógio ponto com biometria facial é excelente. Reduziu filas e acabou com inconsistências no controle de jornada.",
            name: "Ana P.",
            role: "Recursos Humanos",
        },
        {
            photo: ProfileImageOne,
            text: "Atendimento muito bom e ágil. Resolveram nosso problema de rede e suporte sem enrolação. Recomendo!",
            name: "Luciana R.",
            role: "Operações",
        },
    ]

    function getCustomUsers(): Array<{username: string; password: string}> {
        try {
            const raw = localStorage.getItem("customUsers")
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    }

    function saveCustomUser(u: {username: string; password: string}) {
        const list = getCustomUsers()
        list.push(u)
        localStorage.setItem("customUsers", JSON.stringify(list))
    }

    async function handleLogin() {
        setAuthError(null)
        setProfile(null)
        try {
            if (username === "admin" && password === "admin") {
                setToken("admin-token")
                return
            }
            const local = getCustomUsers().find(u => u.username === username && u.password === password)
            if (local) {
                setToken("local-token")
                return
            }
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            if (!res.ok) {
                throw new Error(`Erro: ${res.status}`)
            }
            const data = await res.json()
            setToken(data.token)
        } catch (e: any) {
            setAuthError(e?.message || "Erro ao logar")
        }
    }

    async function fetchProfile() {
        if (!token) {
            setAuthError("Faça login primeiro")
            return
        }
        setAuthError(null)
        try {
            const res = await fetch("https://dummyjson.com/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (!res.ok) {
                throw new Error(`Erro: ${res.status}`)
            }
            const data = await res.json()
            setProfile(data)
        } catch (e: any) {
            setAuthError(e?.message || "Erro ao buscar perfil")
        }
    }

    function handleSignup() {
        setAuthError(null)
        if (!username.trim() || !password.trim()) {
            setAuthError("Preencha usuário e senha")
            return
        }
        const exists = getCustomUsers().some(u => u.username === username)
        if (exists) {
            setAuthError("Usuário já existe")
            return
        }
        saveCustomUser({ username: username.trim(), password: password.trim() })
        setShowAuth("login")
    }

    return (
        <>
            <header className="container py-sm">
                <nav className="flex items-center justify-between">
                    <img src={Logo} alt="logo cyber" style={{ width: '180px', height: 'auto', objectFit: 'contain' }} />
                    <div className="desktop-only">
                        <ul className="flex gap-1">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#solution">Soluções</a>
                            </li>
                            <li>
                                <a href="#testimonials">Depoimentos</a>
                            </li>
                            <li>
                                <a href="#pricing">Preços</a>
                            </li>
                            <li>
                                <a href="#contact">Contato</a>
                            </li>
                        </ul>
                    </div>
                    <div className="desktop-only">
                        <div className="flex items-center">
                            <a className="reverse-color ml-lg" href="#" onClick={(e) => { e.preventDefault(); setShowAuth("login") }}>Login</a>
                            <span onClick={() => setShowAuth("signup")}><Button text="Cadastre-se" /></span>
                        </div>
                    </div>
                    <div className="mobile-menu">
                        {showMobileMenu ?
                            <div className="mobile-menu-content">
                                <div className="container flex">
                                    <ul>
                                        <li>
                                            <a href="#">Home</a>
                                        </li>
                                        <li>
                                            <a href="#solution">Soluções</a>
                                        </li>
                                        <li>
                                            <a href="#testimonials">Depoimentos</a>
                                        </li>
                                        <li>
                                            <a href="#pricing">Preços</a>
                                        </li>
                                        <li>
                                            <a href="#contact">Contato</a>
                                        </li>
                                    </ul>
                                    <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                        <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                                    </span>
                                </div>
                            </div>
                            :
                            <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper" >
                                <img src={Menu} alt="ícone menu" width={24} height={24} />
                            </span>
                        }
                    </div>
                </nav>
            </header>
            <section id="hero">
                <span className="desktop-only">
                    <img src={HeroRectangleTwo} alt="Retangulo um tela inicial" />
                </span>
                <img src={HeroRectangleOne} alt="Retangulo dois tela inicial" />
                <div className="container content">
                    <p className="desktop-only">
                        🚀 Tecnologia que impulsiona resultados
                    </p>
                    <h1>Soluções em TI que transformam seu negócio</h1>
                    <p>Oferecemos serviços completos de tecnologia da informação: PABX Virtual, Redes, Relógio Ponto com Biometria Facial e muito mais. Conecte-se de forma inteligente e eficiente!
                    </p>
                    <div className="flex gap-1">
                        <span><Button text="Cadastre-se" /></span>
                        <span className="desktop-only">
                            <Button text="Veja mais" secondary />
                        </span>
                    </div>
                </div>

            </section>
            <section id="solution" className="container">
                <header>
                    <span>
                        <h2>Soluções</h2>
                        <span className="desktop-only">
                            <h2>Sob medida para você</h2>
                        </span>
                    </span>
                    <p>
                        Inovação é com a gente! A <strong>CyberNett IT </strong>
                        já conquistou diversos clientes, seja você mais um deles,
                        veja tudo que pode ganhar com nossos serviços de tecnologia.
                    </p>
                </header>

                <div className="even-columns">
                    <div className="card">
                        <span>
                            <img src={Data} alt="ícone PABX" width={64} height={64} />
                        </span>
                        <div>
                            <h3>PABX Virtual</h3>
                            <p>
                                Conecte-se de forma inteligente e eficiente! Sistema de telefonia virtual que permite gerenciar chamadas, gravações e muito mais através da nuvem.
                            </p>
                            <hr />
                        </div>
                    </div>

                    <div className="card">
                        <span>
                            <img src={Data} alt="ícone Redes" width={64} height={64} />
                        </span>
                        <div>
                            <h3>Redes e Assistência Técnica</h3>
                            <p>
                                Serviços de infraestrutura e administração de redes e tecnologia da informação. Suporte completo para sua empresa.
                            </p>
                            <hr />
                        </div>
                    </div>

                    <div className="card">
                        <span>
                            <img src={Data} alt="ícone Relógio Ponto" width={64} height={64} />
                        </span>
                        <div>
                            <h3>Relógio Ponto Biometria Facial</h3>
                            <p>
                                Transforma um Tablet Android em um relógio de ponto. Operação contínua, anti-fraude, sem falhas. Inovação em controle de ponto.
                            </p>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials">
                <header>
                    <span>
                        <p className="desktop-only">Conselho de quem conhece</p>
                        <h2>Cada cliente importa!</h2>
                    </span>
                    <p>
                        Quem já contratou sabe da qualidade dos nossos serviços de TI. Estamos transformando a forma como empresas
                        gerenciam tecnologia, acompanhe abaixo os testemunhos de quem já contratou e aprovou.
                    </p>
                </header>

                <section className="carousel">
                    <div className="carousel-content">
                        {([...testimonials, ...testimonials, ...testimonials]).map((t, idx) => (
                            <div className="carousel-card" key={`t-${idx}`}>
                                <img src={t.photo} alt="Imagem perfil cliente" />
                                <span className="testimony">
                                    <p>{t.text}</p>
                                </span>
                                <span className="rating">
                                    <img src={StarOuter} alt="ícone estrela" width={20} height={20} />
                                    <img src={StarOuter} alt="ícone estrela" width={20} height={20} />
                                    <img src={StarOuter} alt="ícone estrela" width={20} height={20} />
                                    <img src={StarOuter} alt="ícone estrela" width={20} height={20} />
                                    <img src={StarOuter} alt="ícone estrela" width={20} height={20} />
                                </span>
                                <span className="names">
                                    <p>{t.name}</p>
                                    <p>{t.role}</p>
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

            <section id="pricing" className="container">
                <header>
                    <p className="desktop-only">Planos e preços</p>
                    <h2>Nossos planos</h2>
                </header>

                <section className="even-columns gap-1_5">
                    <div className="pricing-card">
                        <span className="plan">
                            <h3>Suporte Básico</h3>
                            <p>Ideal para pequenas empresas que precisam de suporte técnico pontual.</p>
                        </span>
                        <span className="price">
                            <h2>R$ 299,90</h2>
                            <p>/mês</p>
                        </span>
                        <Button text="Contratar" secondary key="basic" />
                        <span className="hr" />
                        <ul className="features">
                            <li className="feature-item"><p>Suporte remoto 8h/dia</p></li>
                            <li className="feature-item"><p>Atendimento por e-mail</p></li>
                            <li className="feature-item"><p>Até 5 usuários</p></li>
                        </ul>
                    </div>

                    <div className="pricing-card premium">
                        <span className="bonus">
                            <p>PLANO COMPLETO</p>
                        </span>
                        <span className="plan">
                            <h3>Suporte Premium</h3>
                            <p>Para empresas que precisam de suporte completo e gerenciamento de TI.</p>
                        </span>
                        <span className="price">
                            <h2>R$ 899,90</h2>
                            <p>/mês</p>
                        </span>
                        <Button text="Contratar" key="premium" />
                        <span className="hr" />
                        <ul className="features">
                            <li className="feature-item"><p>Suporte 24/7</p></li>
                            <li className="feature-item"><p>Gerenciamento de redes</p></li>
                            <li className="feature-item"><p>Atendimento prioritário</p></li>
                            <li className="feature-item"><p>Usuários ilimitados</p></li>
                        </ul>
                    </div>
                </section>
            </section>

            {showAuth && (
                <div className="auth-modal-backdrop" onClick={() => setShowAuth(null)}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="auth-tabs">
                            <span className="auth-tab" onClick={() => setShowAuth("login")}><Button text="Login" secondary={showAuth!=="login"} /></span>
                            <span className="auth-tab" onClick={() => setShowAuth("signup")}><Button text="Cadastro" secondary={showAuth!=="signup"} /></span>
                        </div>
                        {showAuth === "login" ? (
                            <div className="auth-grid">
                                <div className="auth-form">
                                    <div className="even-columns gap-1">
                                        <input className="input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                        <Button text="Login" key="login2" onClick={handleLogin as any} />
                                        <Button text="Buscar Perfil" secondary key="me2" onClick={fetchProfile as any} />
                                    </div>
                                    {authError && <p className="error mt-1">{authError}</p>}
                                    {token && <p className="success mt-1">Token recebido</p>}
                                </div>
                                <div className="auth-result">
                                    <pre>{profile ? JSON.stringify(profile, null, 2) : "Sem dados"}</pre>
                                </div>
                            </div>
                        ) : (
                            <div className="auth-form">
                                <div className="even-columns gap-1">
                                    <input className="input" type="text" placeholder="Novo username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <input className="input" type="password" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex gap-1 mt-1">
                                    <Button text="Criar conta" key="signup" onClick={handleSignup as any} />
                                </div>
                                {authError && <p className="error mt-1">{authError}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <section id="contact">
                <div className="container contact-card">
                    <p className="contact-subtitle">Envie sua dúvida</p>
                    <h2>Entre em contato</h2>
                    <p className="contact-description">
                        Entre em contato, estamos dispostos a tirar qualquer dúvida, seja um orçamento, uma dúvida técnica de algum de nossos produtos.
                        Estamos à disposição para responder.😎
                    </p>
                    <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                        <input type="email" placeholder="Seu melhor Email" required />
                        <textarea placeholder="Motivo do contato. Ex: Gostei muito do produto X, poderia me enviar um orçamento?" rows={4} required />
                        <span className="contact-button">
                            <Button text="Enviar" />
                        </span>
                    </form>
                </div>
            </section>

            <footer className="site-footer">
                <div className="container footer-content">
                    <div className="footer-brand">
                        <span className="footer-logo">
                            <img src={Logo} alt="Logo Cyber" />
                        </span>
                        <div className="footer-social">
                            <a href="#" aria-label="Instagram">IG</a>
                            <a href="#" aria-label="Facebook">FB</a>
                            <a href="#" aria-label="YouTube">YT</a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <div>
                            <p>Empresa</p>
                            <a href="#">Sobre nós</a>
                            <a href="#">Faça parte do time</a>
                            <a href="#">Blog</a>
                        </div>
                        <div>
                            <p>Funcionalidades</p>
                            <a href="#">Marketing</a>
                            <a href="#">Análise de dados</a>
                            <a href="#">Boot discord</a>
                        </div>
                        <div>
                            <p>Recursos</p>
                            <a href="#">IOS & Android</a>
                            <a href="#">Teste a Demo</a>
                            <a href="#">Clientes</a>
                            <a href="#">API</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Feito para a Aula de Programação Web ©2024 Dionatan Dariz - Todos os direitos reservados.</p>
                </div>
            </footer>

        </>
    )
}  