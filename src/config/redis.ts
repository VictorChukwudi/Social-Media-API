import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// export const client = createClient({url: process.env.REDIS_URL})
//     .on("error", (err) => console.log("Redis Client Error", err))
//     .connect();




export let client: any;

(async () => {
  client = createClient({url: process.env.REDIS_URL});

  client.on("error", (error: any) => console.error(`Error : ${error}`));

  await client.connect();
})();