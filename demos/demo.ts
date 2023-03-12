import { oraPromise } from 'ora'
import { BingChat } from '../src'
import { createRequire } from 'module';

// import dotenv from 'dotenv-safe'
// dotenv.config()


var console_string = '';
var result;
var prompt = '';
var int_mode = 0;
if (process.argv.slice(2)[0]=='-i') {
  int_mode = 1
}

async function clean_prompt(dirty_prompt) {
  return dirty_prompt.replace("Sydney","Bing Search").replace("sydney","bing search")
}

async function clean_result(dirty_result) {
  return dirty_result.replace("Hello, this is Bing. ","")
}

async function chat(api, new_prompt, int_mode) {
  if (int_mode==0) { console.log(new_prompt + "\n") }
  else { console.log("") }
  if (prompt=='') { prompt = new_prompt }
  else { prompt = result.text + "\n" + new_prompt }
  result = await api.sendMessage(await clean_prompt(prompt))
  let result_text = await clean_result(result.text.replace(prompt,""))
  console.log(result_text + "\n")
  console_string+= "\n" + result_text
  return result
}

/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  // const api = new BingChat({ cookie: process.env.BING_COOKIE })
  const api = new BingChat({ cookie: BING_COOKIE })

  if (process.argv.slice(2)[0]=='-i') {
    var stdin = process.openStdin();

    stdin.addListener("data", async function(d) {
        // note:  d is an object, and when converted to a string it will
        // end with a linefeed.  so we (rather crudely) account for that  
        // with toString() and then substring() 
        await chat(api, d.toString().trim(), int_mode)
        // console.log("you entered: [" + d.toString().trim() + "]");
    });
  } else {

    for (let i = 2; i < process.argv.length ; i++) {
      result = await chat(api, process.argv.slice(i)[0], int_mode)
    }
  }
  if (int_mode==0) { console.log("<=============================>") }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
