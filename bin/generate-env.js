/**
 * Generate .env file from process.env (Azure App Settings)
 *
 * Azure App Service sets environment variables as App Settings,
 * but AdonisJS's Env service loads .env from the build/ directory.
 * PM2 can also strip certain env vars from child processes.
 *
 * This script bridges the gap: it writes a .env file inside build/
 * using the values that Azure injected into process.env.
 *
 * Usage: node bin/generate-env.js
 */

import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const buildDir = resolve(root, 'build')
const envPath = resolve(buildDir, '.env')

// Ensure build directory exists (it should already exist from `node ace build`)
mkdirSync(buildDir, { recursive: true })

// Required env vars that AdonisJS needs
const REQUIRED_VARS = [
  'TZ',
  'PORT',
  'HOST',
  'LOG_LEVEL',
  'APP_KEY',
  'NODE_ENV',
  'SESSION_DRIVER',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
  'LIMITER_STORE',
]

// Optional but nice to have
const OPTIONAL_VARS = ['VITE_APP_NAME']

console.log('[generate-env] Generating build/.env from process.env...')

// Check if any App Settings are available
const availableVars = REQUIRED_VARS.filter((v) => process.env[v])
console.log(`[generate-env] Found ${availableVars.length}/${REQUIRED_VARS.length} required vars in process.env`)

if (availableVars.length === 0) {
  // No Azure App Settings found — this is likely a local dev scenario
  // or Azure didn't inject them. Check if there's an app.config fallback.
  const appConfigPath = resolve(root, 'app.config')
  if (existsSync(appConfigPath)) {
    console.log('[generate-env] No Azure vars found, using app.config as fallback')
    const content = readFileSync(appConfigPath, 'utf-8')
    writeFileSync(envPath, content)
    console.log(`[generate-env] Written ${envPath} (from app.config)`)
  } else {
    console.warn('[generate-env] ⚠️ No Azure App Settings AND no app.config found!')
    console.warn('[generate-env] Set env vars in Azure Portal → App Settings or create app.config locally')
    // Write whatever we have in process.env
    const lines = [...REQUIRED_VARS, ...OPTIONAL_VARS]
      .filter((v) => process.env[v])
      .map((v) => `${v}=${process.env[v]}`)
    writeFileSync(envPath, lines.join('\n') + '\n')
    console.log(`[generate-env] Written ${envPath} with ${lines.length} vars`)
  }
} else {
  // Azure App Settings are available — write .env from process.env
  const lines = [...REQUIRED_VARS, ...OPTIONAL_VARS]
    .filter((v) => process.env[v])
    .map((v) => `${v}=${process.env[v]}`)
  writeFileSync(envPath, lines.join('\n') + '\n')
  console.log(`[generate-env] ✅ Written ${envPath} with ${lines.length} variables from Azure App Settings`)
}

// Always set NODE_ENV to production in Azure
if (!process.env.NODE_ENV) {
  console.log('[generate-env] Setting NODE_ENV=production (default)')
}
