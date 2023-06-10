const { SocksClient } = require("socks")

const result = {
	working: "working",
	invalid: "invalid",
	timeout: "timeout",
	error: "error"
}

async function checkProxy(address, port, protocol, timeout, destinationAddress, destinationPort) {
	if (!validateAddress(address) || !validatePort(port)) {
		return result.invalid
	}

	try {
		await SocksClient.createConnection({
			proxy: {
				host: address,
				port: Number(port),
				type: typeof protocol === "string" ? protocol.match(/\d/) : protocol
			},
			timeout: timeout,
			command: "connect",

			destination: {
				host: destinationAddress,
				port: Number(destinationPort)
			}
		})
		return result.working
	} catch (err) {
		return err.message.includes("timed out") ? result.timeout : result.error
	}
}

function validateAddress(ip) {
	return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
		ip
	)
}

function validatePort(port) {
	return port >= 1 && port <= 65535
}

module.exports = { checkProxy }
