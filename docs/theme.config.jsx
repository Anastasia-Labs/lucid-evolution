import Image from "next/image";
import { useRouter } from "next/router";
import Script from 'next/script';

export default {
  project: {
    link: "https://github.com/Anastasia-Labs/lucid-evolution",
  },
  docsRepositoryBase:
    "https://github.com/Anastasia-Labs/lucid-evolution/tree/main/docs",

  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s | Lucid Evolution",
      };
    }
    return {
      title: "Welcome",
    };
  },
  
  primaryHue: 0,
  primarySaturation: 90,
  logo: () => (
    <>
      <Image
        src="https://anastasialabs.com/assets/img/logo/logo.png"
        height="200"
        width="200"
        style={{ marginRight: "1em" }}
        alt=""
      />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true,
  },

  search: {
    placeholder: "🔎 Explore the Evolution",
  },

  toc: {
    float: true,
    backToTop: true,
  },

  chat: {
    link: "https://discord.gg/s89P9gpEff",
  },

  gitTimestamp: () => null,

  navigation: {
    prev: true,
    next: true,
  },

  feedback: {
    content: "Give feedback on our docs →",
    labels: "feedback",
  },

  editLink: {
    text: "Contribute to this page →",
  },

  head: (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="any"
        href="https://avatars.githubusercontent.com/u/125997902?s=200&v=4"
      />
      <meta
        name="twitter:image"
        content="https://anastasialabs.com/assets/img/logo/logo.png"
      />
      <meta name="twitter:site:domain" content="https://anastasialabs.com/" />
      <style>{`
        :root {
          color-scheme: dark;
        }
        
        html {
          background: #111111 !important;
          color-scheme: dark;
        }

        body {
          background: #111111 !important;
          color-scheme: dark;
        }

        /* Force dark mode for mobile */
        @media (prefers-color-scheme: light) {
          html {
            background: #111111 !important;
            color-scheme: dark;
          }
          body {
            background: #111111 !important;
            color-scheme: dark;
          }
        }
      `}</style>
      <style>{`
              
        .nextra-nav-container nav a:hover {
          color: #a04040; 
        }
          
        .nextra-nav-container > nav > a:nth-child(2) > span {
          background-image: linear-gradient(90deg, #ffffff 0%, #ffffff 90%, #ff4d4d 86%, #e60000 92%, #ff4d4d 96%);
          background-repeat: repeat;
          background-clip: text;
          -webkit-background-clip: text;
          background-size: 200% auto;
          color: transparent;
          animation: textclip 5s linear infinite;
          font-weight: bold; 
        }
        html[class~="dark"] .nextra-nav-container > nav > a:nth-child(2) > span {
          background-image: linear-gradient(90deg, #ffffff 0%, #ffffff 90%, #ff4d4d 86%, #e60000 92%, #ff4d4d 96%);
        }
        .nextra-nav-container > nav > a:nth-child(2) > span:hover {
          text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.2); /* Glow on hover */
          transform: scale(1.05); /* Enlarge on hover */
          transition: transform 0.3s, text-shadow 0.3s; /* Smooth transition */
        }
    
        @keyframes textclip {
          0% { background-position: 0% center; }
          30% { background-position: 200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  ),
  i18n: [{ locale: "en-US", text: "English" }],
  footer: {
    component: (
      <>
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-section logo-section">
                <img
                  src="https://anastasialabs.com/assets/img/logo/logo.png"
                  alt="Anastasia Labs Logo"
                  className="footer-logo"
                />
              </div>
              <div className="footer-links">
                <div className="footer-section">
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <a href="https://www.npmjs.com/package/@lucid-evolution/lucid">
                        NPM Package
                      </a>
                    </li>
                    <li>
                      <a href="https://anastasialabs.com">Anastasia Labs</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Community</h3>
                  <ul>
                    <li>
                      <a href="https://discord.gg/s89P9gpEff">Discord ⤴</a>
                    </li>
                    <li>
                      <a href="https://x.com/AnastasiaLabs">X ⤴</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                MIT {new Date().getFullYear()} ©{" "}
                <a
                  href="https://anastasialabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anastasia Labs
                </a>
              </p>
            </div>
          </div>
        </footer>
        <style jsx>{`
          footer {
            background-color: #1a1515;
            color: #b0b0b0;
            padding: 2rem 0 1rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          .footer-section {
            flex: 1;
          }
          .logo-section {
            max-width: 300px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-logo {
            width: 180px;
            height: auto;
            margin-bottom: 0.75rem;
            filter: brightness(0) invert(0.7);
            opacity: 0.9;
            transition: opacity 0.3s ease;
          }
          .footer-tagline {
            font-size: 0.9rem;
            color: #888888;
            margin: 0;
            font-style: italic;
          }
          .footer-links {
            display: flex;
            gap: 3rem;
          }
          h3 {
            font-size: 1rem;
            margin-bottom: 0.75rem;
            font-weight: 600;
            color: #a04040;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li {
            margin-bottom: 0.4rem;
          }
          a {
            color: #b0b0b0;
            text-decoration: none;
            transition: color 0.2s ease;
            font-size: 0.75rem;
          }
          a:hover {
            color: #d0d0d0;
          }
          .footer-bottom {
            border-top: 1px solid #2a2020;
            padding-top: 1rem;
            text-align: center;
            font-size: 0.8rem;
            color: #888888;
          }
          .footer-bottom a {
            font-size: 0.8rem;
          }
          @media (max-width: 768px) {
            .footer-content {
              flex-direction: column;
              align-items: flex-start;
            }
            .footer-section,
            .logo-section {
              margin-bottom: 1.5rem;
              max-width: 100%;
            }
            .footer-links {
              width: 100%;
              justify-content: space-between;
            }
          }
        `}</style>
      </>
    ),
  },
  nextThemes: {
    forcedTheme: 'dark',
    defaultTheme: 'dark',
  },
};
