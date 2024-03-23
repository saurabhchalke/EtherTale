export const gameSetupPrint = (text: string): void => {
    console.log(`\x1b[93m${text}\x1b[0m`);
  };
  
  export const errorPrint = (text: string): void => {
    console.log(`\x1b[91m${text}\x1b[0m`);
  };
  
  export const narratorPrint = (text: string): void => {
    process.stdout.write(`\x1b[93m\x1b[40m${text}\x1b[0m`);
  };
  
  export const playerPrint = (text: string): void => {
    console.log(`\x1b[92m${text}\x1b[0m`);
  };
  
  export const gameEndPrint = (text: string): void => {
    console.log(`\x1b[30m\x1b[103m\x1b[1m\x1b[4m${text}\x1b[0m`);
  };