{
  description = "A Nix-flake-based Rust development environment";

  nixConfig = {
    bash-prompt = "\\[\\e[0;92m\\][\\[\\e[0;92m\\]nix develop:\\[\\e[0;92m\\]\\w\\[\\e[0;92m\\]]\\[\\e[0;92m\\]$ \\[\\e[0m\\]";
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    # rust-overlay.url = "github:oxalica/rust-overlay"; # A helper for Rust + Nix
  };

  outputs = { self, nixpkgs, }:
    let
      overlays = [
        # rust-overlay.overlays.default
        # (final: prev: {
        #   rustToolchain =
        #     let
        #       rust = prev.rust-bin;
        #     in
        #     if builtins.pathExists ./rust-toolchain.toml then
        #       rust.fromRustupToolchainFile ./rust-toolchain.toml
        #     else if builtins.pathExists ./rust-toolchain then
        #       rust.fromRustupToolchainFile ./rust-toolchain
        #     else
        #       rust.stable.latest.default;
        # })
      ];
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSupportedSystem = f: nixpkgs.lib.genAttrs supportedSystems (system: f {
        pkgs = import nixpkgs { inherit overlays system; };
      });
    in
    {
      devShells = forEachSupportedSystem ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            # rustToolchain
            # openssl
            # pkg-config
            # cargo-deny
            # cargo-edit
            # cargo-watch
            # rust-analyzer
            # wasm-pack
            bun
            corepack_22
            nodejs_22
          ];
        };
      });
    };
}
