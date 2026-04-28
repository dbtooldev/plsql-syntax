/**
 * Builds base grammar file based for Oracle SQL.
 * Requires `code` CLI available on PATH.
 */

import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from 'plist'

const { parse } = pkg
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const EXTENSION_ID = 'oracle.sql-developer'

// 1. Install the oracle.sql-developer extension
console.log(`Installing ${EXTENSION_ID}...`)
try {
  execSync(`code --install-extension ${EXTENSION_ID}`, { stdio: 'inherit' })
} catch {
  console.error(
    'Error: Failed to install extension. Ensure the `code` CLI is available on PATH.',
  )
  process.exit(1)
}

// 2. Find the installed extension directory
const candidateDirs = [
  join(homedir(), '.vscode-server', 'extensions'),
  join(homedir(), '.vscode', 'extensions'),
]

let extensionsDir = null
let oracleDir = null

for (const dir of candidateDirs) {
  if (!existsSync(dir)) continue
  const found = readdirSync(dir).find((d) => d.startsWith('oracle.sql-developer'))
  if (found) {
    extensionsDir = dir
    oracleDir = found
    break
  }
}

if (!oracleDir) {
  console.error('Error: oracle.sql-developer extension not found after installation.')
  process.exit(1)
}

const PLIST_PATH = join(
  extensionsDir,
  oracleDir,
  'syntaxes',
  'oracle-sql.tmLanguage.plist',
)
const BASE_OUTPUT_PATH = join(
  ROOT,
  'extension/syntaxes/oracle-sql-base.tmLanguage.json',
)

console.log(`Found plist: ${PLIST_PATH}`)

// 3. Parse the plist and convert to JSON
const plistXml = readFileSync(PLIST_PATH, 'utf8')
const base = parse(plistXml)

// Remove injection-specific fields and broken folding markers that don't belong in a standalone grammar
delete base.injectionSelector
delete base.foldingStartMarker
delete base.foldingStopMarker

// Add schema reference
base.$schema =
  'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json'

// 4. Write base grammar output
const output = JSON.stringify(base, null, 2)
writeFileSync(BASE_OUTPUT_PATH, output, 'utf8')

const lineCount = output.split('\n').length
console.log(`Built: ${BASE_OUTPUT_PATH}`)
console.log(`  Patterns: ${base.patterns.length}`)
console.log(`  Repository keys: ${Object.keys(base.repository || {}).length}`)
console.log(`  Output: ${lineCount} lines`)

// 5. Uninstall the oracle.sql-developer extension
console.log(`Uninstalling ${EXTENSION_ID}...`)
try {
  execSync(`code --uninstall-extension ${EXTENSION_ID}`, { stdio: 'inherit' })
} catch {
  console.warn(
    `Warning: Failed to uninstall ${EXTENSION_ID}. You may need to remove it manually.`,
  )
}

console.log('Done.')
