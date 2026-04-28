# PL/SQL Syntax Highlighting

Fast, lightweight, and comprehensive PL/SQL and SQL syntax highlighting for **VS Code**, **Cursor**, and other **VS Code-compatible editors**.

## Features

- **Accurate Highlighting** — Precisely highlights PL/SQL reserved words, data types, built-in functions, and thousands of Oracle-specific keywords.
- **Semantic Awareness** — Recognizes function/procedure declarations, `DBMS_*`/`UTL_*` package calls, trigger variables, labels, pragmas, and more.
- **Practical Snippets** — Ready-to-use snippets for common structures like packages, procedures, functions, loops, exception handlers, and PL/Doc blocks.
- **Broad File Support** — Works out of the box with all common Oracle file extensions (`.sql`, `.pck`, `.pkb`, `.pks`, `.trg`, `.vw`, and many more).
- **Lightweight** — No language server, no database connection needed. Just fast syntax highlighting and snippets.

## Install

1. **Install the extension** from your editor's marketplace or Extensions view.

2. **Enjoy automatic highlighting!** The extension automatically activates for all common PL/SQL file types.

3. To use **custom file extensions**, add a manual association in your `settings.json`:

    ```json
    "files.associations": {
        "*.myext": "oracle-sql"
    }
    ```

## Supported File Extensions

`.sql` `.ddl` `.dml` `.pkh` `.pks` `.pkb` `.pck` `.pls` `.plb` `.bdy` `.fnc` `.idx` `.mv` `.prc` `.prg` `.sch` `.seq` `.spc` `.syn` `.tab` `.tbl` `.tbp` `.tps` `.trg` `.typ` `.vw`

## Feedback / Contributing

Got questions or ideas? Feel free to [open an issue](https://github.com/dbtooldev/plsql-syntax/issues).

Contributions are welcome via pull request. To set up the project for development:

1. Open the repository in the provided devcontainer.
2. Run `pnpm run link` to symlink the extension into VS Code for testing.
3. Make your changes, verify them, then submit a pull request.
