const fs = require("fs")

function loadProxies(path) {
	if (!fs.existsSync(path)) {
		console.error("Proxies could not be loaded, file not found")
		process.exit(1)
	}

	return fs.readFileSync(path).toString().split("\n")
}

function saveProxies(path, proxies) {
	fs.writeFileSync(path, proxies.join("\n"))
	console.log(`\nWorking proxies saved at ${path}`)
}

function showResults(working, errored, total) {
	console.log()
	console.table([
		{ type: "Working Proxies", result: working },
		{ type: "Errored Proxies", result: errored },
		{ type: "Total Proxies", result: total }
	])
}

function showConfig(config) {
	console.log("Check started with the following configuration")
	console.log(
		`Input: ${config.input}\nOutput: ${config.output}\nVersion: SOCKS${config.version}\nTimeout: ${config.timeout}\nAddress: ${config.address}\nPort: ${config.port}`
	)
}

module.exports = {
	loadProxies,
	saveProxies,
	showResults,
	showConfig
}
