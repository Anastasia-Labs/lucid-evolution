import { Kupmios } from "../src/kupmios";

const kupmios = new Kupmios("http://localhost:1442", "ws://localhost:1337");

const pp = await kupmios.getProtocolParameters();
console.log(pp);
