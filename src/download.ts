import ora from "ora";
import downloadRepo from "download-git-repo";

async function download(url: string, folder: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const spinner = ora("downloading...");
    spinner.start();
    downloadRepo(`direct:${url}`, folder, { clone: true }, (err: Error | null) => {
      spinner.stop();
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  }).catch((e: string) => {
    throw new Error(e);
  });
}

export default download;
