import {
  applyParamsToScript,
  Emulator,
  fromText,
  Lucid,
} from "@lucid-evolution/lucid";
import _ from "lodash";

async function component() {
  const element = document.createElement("div");
  const lucid = Lucid(new Emulator([]), "Preprod");
  const helloWorldCBOR =
    "58b00100003232323232322322322232253330093232533300b3371e6eb8c008c034dd500280388008a5032330010013758601e60206020602060206020602060206020601a6ea8c008c034dd50019129998078008a50132533300d3371e6eb8c04400802c5288998018018009808800918070008a4c26caca66600e66e1d20003008375400226464a666018601c0042930b1bae300c001300937540022c6eb8004dd7000ab9a5573aaae7955cfaba157441";
  const applied = applyParamsToScript(helloWorldCBOR, [
    "deadbeef",
    fromText("Hello, World!"),
  ]);
  console.log(applied);

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(await component());
