import envinfo from "envinfo";
import ora from "ora";

const info = async (): Promise<void> => {
  const spinner = ora();
  spinner.start("Collecting Environment Info");

  const result = await envinfo.run(
    {
      System: ["OS", "CPU", "Memory", "Shell"],
      Binaries: ["Node", "Yarn", "npm"],
      Utilities: ["Git"],
      Browsers: [
        "Brave Browser",
        "Chrome",
        "Chrome Canary",
        "Edge",
        "Firefox",
        "Firefox Developer Edition",
        "Firefox Nightly",
        "Internet Explorer",
        "Safari",
        "Safari Technology Preview"
      ],
      npmPackages: ["deck.gl", "next", "react", "react-dom"]
    },
    {
      showNotFound: false,
      duplicates: true,
      fullTree: true
    }
  );
  spinner.stop();

  console.info(result);
};

void info();
