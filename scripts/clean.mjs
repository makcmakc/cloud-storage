import { promises as fs } from 'node:fs'
import { join } from 'node:path'

const rootDir = process.cwd()

/**
 * Recursively find and delete the target directory
 * @param {string} currentDir - Path to the current directory
 */
async function cleanTargetsRecursively(currentDir, targets) {
  const items = await fs.readdir(currentDir)

  for (const item of items) {
    try {
      const itemPath = join(currentDir, item)
      if (targets.includes(item)) {
        // Deletes directly when the target directory or file is matched
        await fs.rm(itemPath, { force: true, recursive: true })
        console.log(`Deleted: ${itemPath}`)
      }
      const stat = await fs.lstat(itemPath)
      if (stat.isDirectory()) {
        await cleanTargetsRecursively(itemPath, targets)
      }
    } catch {
      // console.error(
      //   `Error handling item ${item} in ${currentDir}: ${error.message}`,
      // )
    }
  }
}

(async function startCleanup() {
  // Names of directories and files to delete
  const targets = ['node_modules', 'dist']

  const deleteLockFile = process.argv.includes('--del-lock')
  const cleanupTargets = [...targets]
  if (deleteLockFile) {
    cleanupTargets.push('pnpm-lock.yaml')
  }

  console.log(`Starting cleanup of targets: ${cleanupTargets.join(', ')} from root: ${rootDir}`)

  try {
    await cleanTargetsRecursively(rootDir, cleanupTargets)
    console.log('Cleanup process completed.')
  } catch (error) {
    console.error(`Unexpected error during cleanup: ${error.message}`)
  }
})()
