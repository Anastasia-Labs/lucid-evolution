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
        src="/al-logo.png"
        height="200"
        width="200"
        style={{ marginRight: "1em" }}
      />
    </>
  ),
  banner: {
    key: '1.0-release',
    text: (
      <a href="https://nextra.site" target="_blank">
        🎉 Lucid Evolution 1.0 is released. Read more →
      </a>
    )
  }
  // ... other theme options
}