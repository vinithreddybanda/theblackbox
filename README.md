# Black Box API Decoded

This project is a reverse engineering challenge featuring a set of undocumented API endpoints on a simulated malfunctioning system. The endpoints were reverse engineered using a Node.js proxy and automated test scripts that sent a wide variety of patterns and payloads. Each endpoint's logic was deduced by analyzing the responses.

## Tech Stack
- Node.js (proxy and test automation)
- Express, Axios (for local proxy and scripting)
- Postman / curl (for manual HTTP testing)

## API Endpoints & Deduced Behaviors

| Endpoint         | Example Input                | Example Response                | Notes |
|------------------|-----------------------------|----------------------------------|-------|
| POST /data       | `{ "data": "test123" }`   | `{ "result": "dGVzdDEyMw==" }` | Returns Base64 encoding of input string |
| GET /time        | (no input)                  | `{ "result": 8102334 }`         | Returns seconds until preset future timestamp |
| POST /glitch     | `{ "data": "even" }`      | `{ "result": "nvee" }`          | Even: shuffled, Odd: reversed |
| POST /zap        | `{ "data": "Z@p-123!" }`  | `{ "result": "Z@p-!" }`         | Removes all digits |
| POST /alpha      | `{ "data": "Alpha123" }`  | `{ "result": true }`             | True if first char is a letter |
| POST /alpha      | `{ "data": "9lives" }`    | `{ "result": false }`            | False if first char is not a letter |
| POST /fizzbuzz   | `{ "data": [1,2,3,4] }`    | `{ "result": [1,2,3,4] }`        | Returns list if even length |
| POST /fizzbuzz   | `{ "data": [3,5,15] }`     | `{ "result": false }`            | Returns false if odd length or not array |
| POST /fizzbuzz   | `{ "data": "FizzBuzz" }`  | `{ "result": false }`            | Content does not matter |

### Endpoint Details

### 1) POST /data
**Behavior:**
Returns the Base64 encoding of the input string.

**Example:**
Request:
```
{ "data": "test123" }
```
Response:
```
{ "result": "dGVzdDEyMw==" }
```

### 2) GET /time
**Behavior:**
Returns the number of seconds remaining until a preset future timestamp (about 95 days from server start). The value decreases as time passes.

**Example:**
Response:
```
{ "result": 8102334}
```

### 3) POST /glitch
**Behavior:**
- If the input string has an even number of characters, the characters are shuffled in a random order.
- If the input string has an odd number of characters, the string is reversed.

**Examples:**
Request:
```
{ "data": "even" }
```
Possible Response:
```
{ "result": "nvee" }
```
Request:
```
{ "data": "oddly" }
```
Response:
```
{ "result": "ylddo" }
```

### 4) POST /zap
**Behavior:**
Removes all digits from the input string.

**Example:**
Request:
```
{ "data": "Z@p-123!" }
```
Response:
```
{ "result": "Z@p-!" }
```

### 5) POST /alpha
**Behavior:**
Returns true if the first character of the input string is a letter (A-Z or a-z), otherwise returns false.

**Examples:**
Request:
```
{ "data": "Alpha123" }
```
Response:
```
{ "result": true }
```
Request:
```
{ "data": "9lives" }
```
Response:
```
{ "result": false }
```

### 6) POST /fizzbuzz
**Behavior:**
- If the value of `data` is not a Json array, returns false/error.
- If `data` is a list with an even number of elements, returns the list itself (regardless of content).
- If `data` is a list with an odd number of elements, returns false.
- The endpoint name is misleading: the content of the list does not matter, including numbers divisible by 3, 5, or 15, or the presence of the words "Fizz" or "Buzz".
- Tried a wide variety of patterns, including classic FizzBuzz arrays, numbers, strings, and edge cases, but the endpoint always returns false.

**Examples:**
Request:
```
{ "data": [3, 5, 15, 30] }
```
Response:
```
{ "result": false }
```
Request:
```
{ "data": [3, 5, 15] }
```
Response:
```
{ "result": false }
```
Request:
```
{ "data": [15] }
```
Response:
```
{ "result": false }
```

## How to Run
Install dependencies:
```
npm install
```
Run the proxy server:
```
npm start
```
Test endpoints locally at:
```
http://localhost:3000/
```

## Testing
Automated tests (see `analyze.js`) cover all endpoints and edge cases.

### Running Tests
Run all tests:
```
node analyze.js
```

## Test Coverage
- Unit tests for each endpoint with multiple scenarios
- Edge cases: empty strings, single characters, mixed data types
- Integration tests across endpoints
- Validation of response formats and status codes

### Test Categories
- /data - Base64 encoding
- /time - Countdown timer
- /glitch - Shuffle/reverse logic
- /zap - Alphabetic character filtering
- /alpha - First character letter check
- /fizzbuzz - List length parity (no Fizz/Buzz logic, always false)
