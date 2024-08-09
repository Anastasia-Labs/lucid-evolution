import Image from 'next/image'

export default {
  project: {
    link: 'https://github.com/Anastasia-Labs/lucid-evolution'
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
        alt=''
      />
    </>
  ),
  banner: {
    key: '1.0-release',
    text: (
      <a href="https://github.com/Anastasia-Labs/lucid-evolution/releases" target="_blank">
        🎉 Discover our latest updates for Lucid Evolution! Learn more →
      </a>
    )
  },

  feedback: {
    content: null // This removes the feedback link
  },
  editLink: {
    component: null // This removes the "Edit this page" link
  },
  // ... other theme options
}
