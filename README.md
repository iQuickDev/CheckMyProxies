# SOCKS Proxy Checker

This is a command-line tool for checking the status of SOCKS proxies. The tool takes a list of SOCKS proxies and checks each one to see if it is working or not. The working proxies are saved to a file, and the results are displayed on the console.

## Features

-   Supports SOCKS version 4 and 5.
-   Checks the status of SOCKS proxies by connecting to a destination address and port.
-   Saves the working proxies to a file.
-   Displays the results on the console.

## Installation

To install this tool, you need to have Node.js installed on your system. You can download Node.js from the official website: https://nodejs.org

After installing Node.js, you can install the tool using npm:

```
npm install -g checkmyproxies
```

## Usage

To use the tool, open a command prompt or terminal and run the following command:

```
checkmyproxies [options]
```

Replace `[options]` with any of the following command-line options:

-   `-i, --input`: Path to the input file (default: 'proxies.txt').
-   `-o, --output`: Path to the output file (default: 'working-proxies.txt').
-   `-v, --version`: SOCKS version (default: 5).
-   `-t, --timeout`: Connection timeout in milliseconds (default: 5000).
-   `-a, --address`: Destination address (default: 'www.google.com').
-   `-p, --port`: Destination port (default: 80).
-   `--verbose`: Verbose output.
-   `-h, --help`: Show help message.

## Examples

To check a list of SOCKS proxies from a file named `proxies.txt` and save the working proxies to a file named `working-proxies.txt`, run the following command:

```
checkmyproxies
```

To specify a different input file and output file, run the following command:

```
checkmyproxies -i input.txt -o output.txt
```

To check SOCKS version 4 proxies, run the following command:

```
checkmyproxies -v 4
```

To set a connection timeout of 10 seconds, run the following command:

```
checkmyproxies -t 10000
```

To check the status of the proxies and display the progress on the console, run the following command:

```
checkmyproxies --verbose
```

## License

This tool is licensed under the GPL3 License. See the LICENSE file for more information.
