const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0N1L0MyZWpiUEI1cE42VzQ2YWR6ZXk5elpTRUlyS0J0TXkwOXJ5U25VWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGpESFFiajNHeE1iUkR3QjZMRGVHVWJRTmxLWXVJV2FUaGhWRXpiMzVnbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3REJ0Ty9taThXSytOMzlwdTdGRW5CY2FEdTZJY0h0Nmtjb2tNSmNTK1Y4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPaU5sSnlQMDRjc3BVckhaQU1mb0xiTDVpcXFkWGdKYjZRNkc5bUJaZVh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIN1pRZExEZTVDRTBRRDJzWEVFdGF1MElCN1VhUXZSaDIwZ05QdDhqSDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhCNURXUkNWWUppYml1S3dzdDdiUmo5MmZPS2RGdjlqelJrU0dkdG5XVXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVBlenhKUmZ0Rjc1T2NCUmJxUFlDK0JaeVc1VUMwSjMzSjdwSGx2MFpWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnFWT3VjNU5JYWJqWEZNbldSa2ZWZlB3WWxyRE9JZ3VmNGtXeHQyZm5pMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk3dFBYbG9WZXJ5dmFrVTFaT2hYWjgxd0lIMzBwcDZIbUZsK3FVcVlrcTYxaTdlemNHeXQrTEFRMVJidUs4MnBEQWlmei95Z3BWM2FQeHF2YmdCMmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJ5QVJYT0Rzd1hjMWZwOFJxclU4RjJBVEJZVU9lNE00bVNuYnVLSk1sVHk4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwQlpvdEJ4Z1I0eWlscHNweXYxQndBIiwicGhvbmVJZCI6ImNiYWU4ZGQwLTE0MmYtNDY3ZS04NDY2LTA5M2NiMDE1YjRkNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRVZ3cGRCUkRhd2FYWjFaa3FTbzQ0WjY3MDA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0pORW1NZnlWYjIyR3c3Y295aVpDSDlTc1JNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ4OVBTSkc4IiwibWUiOnsiaWQiOiI5MjM0OTIxNDcxMDI6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZmw8J2agvCdmbjwnZm1IPCdmoLwnZm38J2ZtPCdmbfwnZqJ8J2ZsPCdmbPwnZmwIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOVy9udllGRVBpZmhyb0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZRnVHY3pnRDlUWndtK0FtVHFNNDZ1OFRQNG1uOHd3UytDa3VGeUM3eFdZPSIsImFjY291bnRTaWduYXR1cmUiOiIyUTZrdFBKWGRVYVE1cjNPdmNGQmo4eGRIdW5ydWx4NVowYXY3V3dabE1LR0lkR3REQnNMamM0MkNEeXBBV1BNdGpqWWEwbWcwRjJLMXdQdjFUcTlBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidUFZUXZFNWp6bHYxalJtblhoSG8rOGRYaWYvbUxkUGZudmYreTRTNmM4SS9UWE1DWVdiNmNXNGxacDE4RWdpSTJ2bis4WXlUNGxTMEtMZ0hGbkRUZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0OTIxNDcxMDI6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXQmJobk00QS9VMmNKdmdKazZqT09ydkV6K0pwL01NRXZncExoY2d1OFZtIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyMzQ5OTU4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo1MiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "yessertech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255621995482",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Yesser Md ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/37882de26f9ffc60043ef.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
