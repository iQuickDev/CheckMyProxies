const { checkProxy } = require("./network.js")
const { saveProxies, loadProxies, showResults, showConfig } = require("./io.js")
const args = require("minimist")(process.argv.slice(2))
const cliProgress = require("cli-progress")
const progress = new cliProgress.SingleBar(
	{
		format: "Progress: {bar} | {percentage}% | {value}/{total} Checked"
	},
	cliProgress.Presets.shades_classic
)

const config = {
	input: args.i ?? args.input ?? "proxies.txt",
	output: args.o ?? args.output ?? "working-proxies.txt",
	version: args.v ?? args.version ?? 5,
	timeout: args.t ?? args.timeout ?? 10000,
	address: args.a ?? args.address ?? "www.google.com",
	port: args.p ?? args.port ?? 80,
	help: args.h ?? args.help ?? false,
	verbose: args.verbose ?? false
}

if (config.help) {
	console.log("Command-line arguments:")
	console.log("-i, --input: Path to the input file (default: 'proxies.txt')")
	console.log("-o, --output: Path to the output file (default: 'working-proxies.txt')")
	console.log("-v, --version: SOCKS version (default: 5)")
	console.log("-t, --timeout: Connection timeout in milliseconds (default: 5000)")
	console.log("-a, --address: Destination address (default: 'www.google.com')")
	console.log("-p, --port: Destination port (default: 80)")
	console.log("--verbose: Verbose output")
	console.log("-h, --help: Show help message")

	return
}

const proxies = loadProxies(config.input)

if (!config.verbose) {
	showConfig(config)
	progress.start(proxies.length, 0)
}

const workingProxies = []

;(async () => {
	const scan = proxies.map(
		async (proxy) =>
			new Promise(async (resolve) => {
				const now = new Date()
				const result = await checkProxy(
					proxy.split(":")[0],
					proxy.split(":")[1],
					config.version,
					config.timeout,
					config.address,
					config.port
				)
				const elapsed = new Date() - now

				switch (result) {
					case "working":
						workingProxies.push(proxy)
						if (config.verbose)
							console.log(`${proxy} is Working (${new Date(elapsed).getMilliseconds()}ms)`)
						break
					case "timeout":
						if (config.verbose) console.log(`${proxy} Timed out`)
						break
					case "invalid":
						if (config.verbose) console.log(`${proxy} is Invalid`)
						break
					case "error":
						if (config.verbose) console.log(`${proxy} Errored`)
						break
				}

				if (!config.verbose) progress.increment()

				resolve()
			})
	)
	await Promise.all(scan)
	if (!config.verbose) progress.render()
	saveProxies(config.output, workingProxies)
	showResults(workingProxies.length, proxies.length - workingProxies.length, proxies.length)
	process.exit(0)
})()
