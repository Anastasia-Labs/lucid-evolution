import os from "os";
import { spawn } from "child_process";
import fs from "fs";

export async function startYaci() {
  const tempDir = `${os.tmpdir()}/yaci`;
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  fs.writeFileSync(
    `${tempDir}/application.properties`,
    `
        server.port=10000
        ogmios.enabled=true
        kupo.enabled=true
        yaci.store.enabled=true
        yaci.store.mode=native
        bp.create.enabled=true
        conwayHardForkAtEpoch=1
        shiftStartTimeBehind=false
    `,
  );

  // Start devkit
  return spawn(`yaci-cli`, ["create-node", "-o", "--start"], {
    env: {
      ...process.env,
    },
    cwd: tempDir,
  });
}

export async function isYaciRunning(maxTries = 20) {
  let tries = 0;
  // Check status
  while (tries <= maxTries) {
    try {
      let response = await fetch(
        "http://localhost:10000/local-cluster/api/admin/devnet/status",
      );
      const yaciStatus = await response.text();
      response = await fetch("http://localhost:1337/health");
      const ogmiosStatus = response.status;
      response = await fetch("http://localhost:1442/health");
      const kupoStatus = response.status;

      if (
        yaciStatus === "initialized" &&
        ogmiosStatus === 200 &&
        kupoStatus === 200
      ) {
        return true;
      }
    } catch {
      if (tries < maxTries) {
        await sleep(1000);
      }
      tries++;
    }
  }
  return false;
}

export async function createYaci() {
  try {
    const response = await fetch(
      "http://localhost:10000/local-cluster/api/admin/devnet/create",
      {
        method: "POST",
        body: JSON.stringify({
          conwayHardForkAtEpoch: 0,
          shiftStartTimeBehind: true,
          "ogmios.enabled": true,
          "kupo.enabled": true,
          "yaci.store.enabled": true,
        }),
      },
    );
    const status = await response.text();
    return status === "done";
  } catch {
    return false;
  }
}

export async function resetYaci() {
  try {
    const response = await fetch(
      "http://localhost:10000/local-cluster/api/admin/devnet/reset",
      {
        method: "POST",
      },
    );
    const status = await response.text();
    return status === "done";
  } catch {
    return false;
  }
}

export async function topup(address: string, adaAmount: number) {
  try {
    const response = await fetch(
      "http://localhost:10000/local-cluster/api/addresses/topup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          adaAmount,
        }),
      },
    );
    const body = await response.json();
    return body.status === true;
  } catch {
    return false;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
