import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">
          © {currentYear} SportConnect. Todos os direitos reservados.
        </p>
        <p className="made-with">
          Feito com ❤️ para quem ama desporto
        </p>
      </div>
    </footer>
  );
}

export default Footer;