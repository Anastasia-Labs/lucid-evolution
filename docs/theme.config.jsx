import Image from "next/image";

export default {
  project: {
    link: "https://github.com/Anastasia-Labs/lucid-evolution",
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
    placeholder: "🔎 Search the Evolution library",
  },

  toc: {
    backToTop: "Back to top",
    
  },

  banner: {
    key: "latest-release",
    text: (
      <a
        href="https://github.com/Anastasia-Labs/lucid-evolution/releases"
        target="_blank"
      >
        🎉 Discover our latest updates for Lucid Evolution! Learn more →
      </a>
    ),
  },

  chat: {
    link: "https://discord.gg/gRt4ppqh",
  },

  navigation: {
    prev: true,
    next: true,
  },

  feedback: {
    content: null
  },

  editLink: {
    link: null,
  },
  
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://anastasialabs.com" target="_blank">
          Anastasia Labs
        </a>
        .
      </span>
    ),
  },
};
