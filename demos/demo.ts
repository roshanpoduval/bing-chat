#!/usr/bin/env tsx

import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { BingChat } from '../src'
import { createRequire } from 'module';

dotenv.config()

async function getInput() {
  const require = createRequire(import.meta.url);
  const prsy = require('prompt-sync')();
  var prompt = prsy("Enter your Bing Chat AI Query: ");
  return prompt
}

/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const api = new BingChat({ cookie: process.env.BING_COOKIE })

  const prompt = "Hi Bing"
  console.log('argv:', process.argv.slice(2))
  console.log(process.argv.slice(2))
  console.log()
  // console.log(prompt)

  const res = await oraPromise(api.sendMessage(process.argv.slice(2)[0]), {
    text: process.argv.slice(2)[0]
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
