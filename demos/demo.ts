import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { BingChat } from '../src'
import { createRequire } from 'module';

dotenv.config()

/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const api = new BingChat({ cookie: process.env.BING_COOKIE })
  // const api = new BingChat({ cookie: BING_COOKIE })
  var console_string = '';
  for (let i = 2; i < process.argv.length ; i++) {
    var result;
    if (i==2) {
      result = await oraPromise(api.sendMessage(process.argv.slice(i)[0]), {
        text: process.argv.slice(i)[0]
      })
    } else {
      result = await oraPromise(api.sendMessage(result.text + "\n" + process.argv.slice(i)[0]), {
        text: result.text + "\n" + process.argv.slice(i)[0]
      })
    }
    // console.log(result.text)
    console_string+= "\n" + result.text
  }
  console.log("<=============================>")
  // console.log(console_string)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
