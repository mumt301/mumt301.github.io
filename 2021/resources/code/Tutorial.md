# Tutorial, Part 1: Values

Time to fire up your JavaScript interpreter.

You can (luckily) access one [from your favorite web browser](https://webmasters.stackexchange.com/questions/8525/how-do-i-open-the-javascript-console-in-different-browsers).


Most languages have a set of supported `datatypes`. JavaScript supports the following ones:
- `Number`
- `String`
- `Boolean`
- `Object`
  - `Function`
  - `Array`
  - `Date`
  - `RegExp`
- `null`
- `undefined`

Let's do some basic operations. Remember, in the end, computers are simply blazing fast calculators.


## Number values

Let's start with numbers.

```javascript
2 + 2;
```

Some languages distinguish between `integer` and real numbers (real numbers are often called `floats`, due to the *floating point* technique used to represent them). For JavaScript, everything is a `real` number (or simply `Number`), even when it looks like an integer.

It has some implications for precision. Try to work with integers as much as you can, especially when you make decisions (`if` something, `while` something, etc.)

```javascript
0.1 + 0.2;
```

## String values

Strings are simply, an entry of text. However, `string` is a well-established term in Computer Science that appears in almost every programming language nowadays. So we will be using the term `string` a lot.

We have three ways for describing strings in JavaScript

```javascript
`Using backticks`;
"Using doublequotes";
'Or using singlequotes';
```

All of them describe a `string` value. They have slight differences but nothing to worry about for now. Use the one you prefer.

### Escaping characters

Some characters are difficult to write in a string, for one reason or another. These characters are often *escaped* with a backslash `\`. A *tab* is encoded as `\t`. A newline is encoded as `\n`. In some instances (e.g., in the terminal), a space is escaped as `\ ` (backslash followed by a space). You will almost never need to escape a space in JavaScript, but you will need to escape *tabs* and *newlines*.

## Boolean values

1 or 0. Yes or no. Used a lot in conditions:

```javascript
3 > 2;

if (301 > 201) 
{
    console.log("MUMT 201 is a requirement for MUMT 301");
}
else 
{
    console.log("MUMT 301 is a requirement for MUMT 201");
}
```

# Tutorial, Part 2: Variables (Bindings)

We store values in variables.

```javascript
let mouse = "mickey";

console.log(mouse);
```

We can reassign the variable to a different value

```javascript
mouse = 1;

console.log(mouse);
```

Notice that
```javascript
console.log(mouse);
```

is very different than
```javascript
console.log("mouse");
```
