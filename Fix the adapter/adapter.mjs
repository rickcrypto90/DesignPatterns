import * as fs from "node:fs";
class Logger {
  constructor(logStorage) {
    this.logStorage = logStorage;
  }

  async info(message) {
    await this.logStorage.write(`[INFO] ${message}\n`);
  }

  async error(message) {
    await this.logStorage.write(`[ERROR] ${message}\n`);
  }

  async replay() {
    console.log(await this.logStorage.read());
  }
}

class LogStorageFSAdapter {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async write(message) {
    try {
      await fs.appendFile(this.filepath, `[INFO] ${message}\n`, (err, data) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async read() {
    try {
      return await fs.readFile(
        this.filepath,
        { encoding: "utf-8" },
        (err, data) => {
          if (err) {
            console.error(err);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

const fsStorage = new LogStorageFSAdapter("Fix the adapter/output.log");

const logger = new Logger(fsStorage);

logger.info("Some information");

logger.error("A bit of an issue");

logger.error("A catastrophic error");

logger.info("The best information");

logger.replay();
