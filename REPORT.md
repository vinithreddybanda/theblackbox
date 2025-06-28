# Black Box Challenge API - Endpoint Behaviors

## /data (POST)
- Input: `{ value: 'abcdefghijklmnopqrstuvwxyz' }`
- Output: `{ result: 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=' }`
- Behavior: Returns the base64 encoding of the input string.

## /time (GET)
- Output: `{ result: 8169767 }`
- Behavior: Returns a number that decreases every second (countdown).

## /fizzbuzz (POST)
- Input: Any value
- Output: `{ result: false }`
- Behavior: Always returns false, regardless of input.

## /zap (POST)
- Input: `{ value: 'hello' }`
- Output: `{ result: 'hello' }`
- Behavior: Returns the input unchanged.

## /alpha (POST)
- Input: `{ value: 'helo;' }`
- Output: `{ result: true }`
- Behavior: Returns true if the input is a string, contains at least one letter, and contains no digits; otherwise, false.

## /glitch (POST)
- Input: `{ value: 'helo;' }`
- Output: `{ result: ';oleh' }`
- Behavior: Returns the reversed input string.

---

Use this as a reference for testing and further reverse engineering.
