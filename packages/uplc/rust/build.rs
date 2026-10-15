//! Records which uplc crate this build uses, for `uplc_build_info`.

fn main() {
    println!("cargo:rerun-if-changed=Cargo.lock");

    let lock = std::fs::read_to_string("Cargo.lock").unwrap_or_default();
    let uplc = lock
        .split("[[package]]")
        .find(|package| package.contains("\nname = \"uplc\"\n"))
        .unwrap_or_default();
    let field = |name: &str| {
        uplc.lines()
            .find_map(|line| line.strip_prefix(name)?.strip_prefix(" = "))
            .map(|value| value.trim_matches('"').to_string())
    };

    println!(
        "cargo:rustc-env=UPLC_VERSION={}",
        field("version").unwrap_or_else(|| "unknown".to_string())
    );
    // A git dependency's source ends with the commit it was built from; a path
    // dependency has none.
    println!(
        "cargo:rustc-env=UPLC_SOURCE={}",
        field("source").unwrap_or_else(|| "local".to_string())
    );
}
