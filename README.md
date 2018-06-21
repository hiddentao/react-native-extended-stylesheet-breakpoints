# react-native-extended-stylesheet-breakpoints

[![npm](https://img.shields.io/npm/v/react-native-extended-stylesheet-breakpoints.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-extended-stylesheet-breakpoints)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/hiddentao)

This package enables `@media` queries to be auto-generated when using [`react-native-extended-stylesheet`](https://github.com/vitalets/react-native-extended-stylesheet#media-queries).

Example, assume you have two width breakpoints - at 800px and 400px - and one
height breakpoint at 500px. You would normally write:

```js
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  button: {
    width: 500,
    height: 500
  },
  input: {
    paddingHorizontal: 50
  },
  '@media (max-height: 500px)': {
    button: {
      height: 250
    }
  },
  '@media (max-width: 800px)': {
    button: {
      width: 350
    }
  },
  '@media (max-width: 400px)': {
    button: {
      width: 200
    },
    input: {
      paddingHorizontal: 20
    }
  }
})
```

You can now instead write the above much more succinctly:

```js
import {
  setWidthBreakpoints,
  setHeightBreakpoints,
  createResponsive
} from 'react-native-extended-stylesheet-breakpoints'

const perWidth = setWidthBreakpoints(800, 400)
const perHeight = setHeightBreakpoints(500)

const styles = createResponsive({
  button: {
    width: perWidth(500, 350, 200),
    height: perHeight(500, 250)
  },
  input: {
    paddingHorizontal: perWidth(50, 50, 20)
  }
})
```

## Installation

This package depends on `react-native-extended-stylesheet`.

```shell
yarn add react-native-extended-stylesheet react-native-extended-stylesheet-breakpoints
```

## API

**setWidthBreakpoints()**

Sets up any number of width-based breakpoints and returns a function which can
be used to set per-breakpoint field values. For example:

```js
/* 3 breakpoints - 800px, 400px, 200px */
const perWidth = setWidthBreakpoints(800, 400, 200)

const styles = createResponsive({
  button: {
    /*
      Default color = red
      If width<=800px then color = green
      If width<=400px then color = blue
      If width<=200px then color = yellow
    */
    backgroundColor: perWidth('red', 'green', 'blue', 'yellow'),
    /*
      Default color = purple
      If width<=800px then color = orange
      (If width<=400px then color = orange)
      (If width<=200px then color = orange)
    */
    borderColor: perWidth('purple', 'orange'),
    /*
      Default margin = 10
      (If width<=800px then margin = 10)
      (If width<=400px then margin = 10)
      (If width<=200px then margin = 10)
    */
    margin: perWidth(10)
    /*
      Default padding = 12
      (If width<=800px then padding = 12)
      (If width<=400px then padding = 12)
      (If width<=200px then padding = 12)
    */
    padding: 12
  }
})
```

**setHeightBreakpoints()**

Sets up height-based breakpoints and works similarly to `setWidthBreakpoints()` above.

**createResponsive()**

This must be used in conjunction with the breakpoint setters to generate the final
correct stylesheet.

## Development

* Lint: `yarn lint`
* Test: `yarn test`
* Build: `yarn build`

## Contributors

All contributions welcome. Please see [CONTRIBUTING.md](https://github.com/hiddentao/react-native-extended-stylesheet-breakpoints/raw/master/CCONTRIBUTING.md)

## License

[MIT](https://github.com/hiddentao/react-native-extended-stylesheet-breakpoints/raw/master/LICENSE.md)
