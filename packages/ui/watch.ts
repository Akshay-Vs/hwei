import { spawn } from "child_process";

const runProcess = (command: string, args: string[]) => {
  const proc = spawn(command, args, { stdio: "inherit" });

  proc.on("error", (err) => {
    console.error(`${command} error:`, err);
  });

  proc.on("exit", (code) => {
    if (code !== 0) {
      console.error(`${command} exited with code ${code}`);
    }
  });

  return proc;
};

// Start tsup and Tailwind in watch mode
const processes = [
  runProcess("tsup", ["--watch"]),
  runProcess("tailwindcss", ["-i", "./src/styles.css", "-o", "./dist/index.css", "--watch"]),
];

// Keep the main process alive while the subprocesses are running
process.on("SIGINT", () => {
  console.log("Stopping processes...");
  processes.forEach((proc) => proc.kill());
  process.exit();
});
