interface Window {
  cardano?: {
    [key: string]: {
      enable: () => Promise<any>;
      isEnabled: () => Promise<boolean>;
      icon: string;
      name: string;
      apiVersion: string;
    };
  };
}

export {};
