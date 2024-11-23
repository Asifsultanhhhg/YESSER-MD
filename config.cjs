// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0N1L0MyZWpiUEI1cE42VzQ2YWR6ZXk5elpTRUlyS0J0TXkwOXJ5U25VWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGpESFFiajNHeE1iUkR3QjZMRGVHVWJRTmxLWXVJV2FUaGhWRXpiMzVnbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3REJ0Ty9taThXSytOMzlwdTdGRW5CY2FEdTZJY0h0Nmtjb2tNSmNTK1Y4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPaU5sSnlQMDRjc3BVckhaQU1mb0xiTDVpcXFkWGdKYjZRNkc5bUJaZVh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIN1pRZExEZTVDRTBRRDJzWEVFdGF1MElCN1VhUXZSaDIwZ05QdDhqSDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhCNURXUkNWWUppYml1S3dzdDdiUmo5MmZPS2RGdjlqelJrU0dkdG5XVXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVBlenhKUmZ0Rjc1T2NCUmJxUFlDK0JaeVc1VUMwSjMzSjdwSGx2MFpWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnFWT3VjNU5JYWJqWEZNbldSa2ZWZlB3WWxyRE9JZ3VmNGtXeHQyZm5pMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk3dFBYbG9WZXJ5dmFrVTFaT2hYWjgxd0lIMzBwcDZIbUZsK3FVcVlrcTYxaTdlemNHeXQrTEFRMVJidUs4MnBEQWlmei95Z3BWM2FQeHF2YmdCMmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJ5QVJYT0Rzd1hjMWZwOFJxclU4RjJBVEJZVU9lNE00bVNuYnVLSk1sVHk4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwQlpvdEJ4Z1I0eWlscHNweXYxQndBIiwicGhvbmVJZCI6ImNiYWU4ZGQwLTE0MmYtNDY3ZS04NDY2LTA5M2NiMDE1YjRkNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRVZ3cGRCUkRhd2FYWjFaa3FTbzQ0WjY3MDA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0pORW1NZnlWYjIyR3c3Y295aVpDSDlTc1JNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ4OVBTSkc4IiwibWUiOnsiaWQiOiI5MjM0OTIxNDcxMDI6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZmw8J2agvCdmbjwnZm1IPCdmoLwnZm38J2ZtPCdmbfwnZqJ8J2ZsPCdmbPwnZmwIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOVy9udllGRVBpZmhyb0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZRnVHY3pnRDlUWndtK0FtVHFNNDZ1OFRQNG1uOHd3UytDa3VGeUM3eFdZPSIsImFjY291bnRTaWduYXR1cmUiOiIyUTZrdFBKWGRVYVE1cjNPdmNGQmo4eGRIdW5ydWx4NVowYXY3V3dabE1LR0lkR3REQnNMamM0MkNEeXBBV1BNdGpqWWEwbWcwRjJLMXdQdjFUcTlBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidUFZUXZFNWp6bHYxalJtblhoSG8rOGRYaWYvbUxkUGZudmYreTRTNmM4SS9UWE1DWVdiNmNXNGxacDE4RWdpSTJ2bis4WXlUNGxTMEtMZ0hGbkRUZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0OTIxNDcxMDI6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXQmJobk00QS9VMmNKdmdKazZqT09ydkV6K0pwL01NRXZncExoY2d1OFZtIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyMzQ5OTU4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo1MiJ9",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©yessertech",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255621995482",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
