import { Metadata } from "next";
import Image from "next/image";
import { FC } from "react";
import Hero from "../components/Hero";
import { Bleed, Cards, Steps } from "nextra/components";
import ResponsiveContainer from "../components/ResponsiveContainer";
import AnimatedCode from "../components/AnimatedCode";
import { FaqBox } from "../components/FaqBox";
import { Link } from "nextra-theme-docs";

export const metadata: Metadata = {
  description:
    "Evolution-SDK is a transaction building framework for Cardano which provides flexible off-chain development patterns. It provides developers with type-safe interfaces and utilities to interact with the Cardano blockchain, create transactions, and manage wallets without dealing with low-level complexities.",
};

const IndexPage: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col justify-center h-dvh -mt-16">
        <Image
          src="/evolution-sdk/evolution-sdk-no-witness-labs.png"
          alt="Evolution-SDK Logo"
          width={450}
          height={120}
        />

        <div className="fade-in">
          <Hero
            title="Evolution"
            subtitle="A highly scalable transaction building framework for Cardano"
            ctaText="Start here"
            ctaLink="install"
            ctaText2="Learn more"
            ctaLink2="documentation/about"
          />
        </div>
      </header>

      <div className="flex flex-col items-center w-full gap-24 mb-12">
        <div className="min-w-max max-w-full">
          <Bleed full={false}>
            <ResponsiveContainer>
              <AnimatedCode
                style={{
                  maxWidth: "100%",
                  overflowX: "auto",
                  border: "1px solid #DD7722",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  marginBottom: "2rem",
                }}
                code={`import { Lucid, Koios, generateSeedPhrase } from "@evolution-sdk/lucid";

const lucid = await Lucid(
  new Koios("https://preview.koios.rest/api/v1"),
  "Preview"
);

const seedPhrase = generateSeedPhrase();
lucid.selectWallet.fromSeed(seedPhrase);

const tx = await lucid
  .newTx()
  .pay.ToAddress("addr_test1...", { lovelace: 10_000_000n })
  .pay.ToAddress("addr_test2...", { lovelace: 20_000_000n })
  .complete();

const signedTx = await tx.sign.withWallet().complete();
const txHash = await signedTx.submit();

console.log("Transaction Submitted:", txHash);`}
              />

              <div className="w-[calc(100dvw-32px)] md:w-[22dvw]">
                <h2 className="font-bold text-[1.8rem] mb-4">
                  Why <span className="text-[#DD7722]">Evolution-SDK</span>?
                </h2>

                <FaqBox title="Improved APIs" open>
                  <p>
                    Our interfaces are enhanced for better developer experience
                    and function calls streamlined for common operations. With
                    Evolution-SDK, you take advantage of built-in support for
                    popular features, reducing the need for external
                    dependencies.
                  </p>
                </FaqBox>

                <FaqBox title="Enhanced Error Handling">
                  <p>
                    Error management just got better and a lot smoother with our
                    integration of the Effect library. Debug quicker with
                    detailed, context-rich error messages. Handle exceptions
                    easily with our structured error types.
                  </p>
                </FaqBox>

                <FaqBox title="Refined Structure">
                  <p>
                    We use a modular architecture, separating functionality into
                    distinct packages. We will be able to add new features as
                    independent modules within the existing architecture
                  </p>
                </FaqBox>

                <FaqBox title="Latest CML">
                  <p>
                    We are keeping up with the latest version of the{" "}
                    <Link href="https://dcspark.github.io/cardano-multiplatform-lib">
                      Cardano Multi-platform Library (CML)
                    </Link>
                    .
                  </p>
                </FaqBox>

                <FaqBox title="Developer Centric">
                  <div className="space-y-2">
                    <p>
                      Our goal is to enrich the developer experience via code
                      examples for various use cases. We publish regular updates
                      to add features and improve the library.
                    </p>
                    <p>
                      You can get support for your questions through our
                      dedicated{" "}
                      <Link href="https://discord.gg/eqZDvHvW6k">Discord</Link>{" "}
                      channel.
                    </p>
                  </div>
                </FaqBox>
              </div>
            </ResponsiveContainer>
          </Bleed>
        </div>

        <div className="flex flex-col items-center w-full">
          <h2 className="font-bold text-4xl text-[#DD7722] tracking-tight">
            Quickstart
          </h2>

          {/* <hr className="my-8 border-neutral-200/70 contrast-more:border-neutral-400 dark:border-primary-100/10 contrast-more:dark:border-neutral-400" /> */}

          <div>
            <Steps>
              <h3>Set up your project</h3>
              <p>
                Initialize a new{" "}
                <code
                  className="border-[rgba(0,0,0,0.04)] bg-[rgba(0,0,0,0.03)] break-words rounded-md py-0.5 px-[0.25em] text-[0.9em] dark:border-white/10 dark:bg-white/10"
                  dir="ltr"
                >
                  TypeScript
                </code>{" "}
                project
              </p>

              <h3>Install the packages you need</h3>
              <Cards>
                <Cards.Card title="Intallation Guide" href="/install" />
              </Cards>

              <h3>Build and Submit a Transaction</h3>
              <Cards>
                <Cards.Card
                  title="Quickstart Guide"
                  href="/documentation/about#quickstart"
                />
              </Cards>
            </Steps>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-3">
          <h2 className="font-bold text-4xl text-[#DD7722] tracking-tight">
            F.A.Q.
          </h2>

          <div className="w-[calc(100dvw-32px)] md:min-w-2/5 md:max-w-2/5">
            <FaqBox title="What is Evolution-SDK?">
              <p>
                Evolution-SDK is an off-chain framework library for Cardano,
                designed to facilitate developers needs and the development of
                decentralized applications. It includes various packages such as
                utilities for signing data, Plutus integration, and wallet
                management, all built using TypeScript to ensure type safety and
                a better developer experience
              </p>
            </FaqBox>

            <FaqBox title="How does Evolution-SDK ensure compatibility with Cardano's evolving scene?">
              <p>
                The library is actively maintained to ensure compatibility in
                all areas, just like with Chang Hardfork. We have been involved
                in updating our fee models, and functionalities to support
                upcoming changes.
              </p>
            </FaqBox>

            <FaqBox title="Can I contribute to the development?">
              <p>
                Yes, of course! Contributions to Evolution-SDK are welcome. You
                have an idea? You can submit issues, feature requests, or pull
                requests on our GitHub repository to help improve the library
                and its documentation
              </p>
            </FaqBox>

            <FaqBox title="How can I get help?">
              <div className="space-y-2">
                <p>
                  You can join the No-Witness-Labs{" "}
                  <Link href="https://discord.gg/eqZDvHvW6k">
                    Discord channel
                  </Link>
                  to get help from the community and our team.
                </p>
                <p>
                  We also have a dedicated channel for Evolution-SDK where you
                  can ask questions, share your ideas, and get help with your
                  projects
                </p>
              </div>
            </FaqBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
