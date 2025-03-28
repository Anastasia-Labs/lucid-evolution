export type Relay = {
  type: "SingleHostIp" | "SingleHostDomainName" | "MultiHost";
  ipV4?: string;
  ipV6?: string;
  port?: number;
  domainName?: string;
};
