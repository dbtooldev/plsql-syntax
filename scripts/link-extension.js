/**
 * Creates a symlink in the VS Code extensions directory pointing to
 * the local extension folder for development.
 */

import { existsSync, lstatSync, symlinkSync, unlinkSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const extensionsDir = join(homedir(), '.vscode-server', 'extensions')
const linkName = 'dbtool.plsql-syntax-0.0.0'
const linkPath = join(extensionsDir, linkName)
const target = '/workspaces/plsql-formatter/extension'

if (existsSync(linkPath) || lstatSync(linkPath, { throwIfNoEntry: false })) {
  unlinkSync(linkPath)
  console.log(`Removed existing ${linkPath}`)
}

symlinkSync(target, linkPath)
console.log(`Created symlink: ${linkPath} -> ${target}`)
