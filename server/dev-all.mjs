import { spawn } from 'node:child_process'

const procs = []

function run(name, cmd, args) {
  const p = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  procs.push(p)
  p.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${name} exited with code ${code}`)
    }
  })
}

run('api', 'npm', ['run', 'dev:api'])
run('web', 'npm', ['run', 'dev'])

process.on('SIGINT', () => {
  for (const p of procs) p.kill('SIGINT')
  process.exit(0)
})

