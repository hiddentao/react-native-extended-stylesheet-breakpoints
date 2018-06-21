import { setWidthBreakpoints, setHeightBreakpoints, createResponsive } from './'

jest.mock('react-native-extended-stylesheet', () => ({
  create: obj => ({
    _created: obj
  })
}))

describe('width', () => {
  it('can return breakpoint setter', () => {
    const set = setWidthBreakpoints(0)
    expect(set).toBeInstanceOf(Function)
  })

  it('can generate breakpoint-based values', () => {
    const set = setWidthBreakpoints(10, 5, 2)

    expect(set('a', 'b', 'c', 'd')).toEqual({
      bpw: {
        base: 'a',
        10: 'b',
        5: 'c',
        2: 'd'
      }
    })
  })

  it('can ensure proper fallback values', () => {
    const set = setWidthBreakpoints(10, 5, 2)

    expect(set('a', 'b', 'c')).toEqual({
      bpw: {
        base: 'a',
        10: 'b',
        5: 'c'
      }
    })

    expect(set('a', 'b')).toEqual({
      bpw: {
        base: 'a',
        10: 'b'
      }
    })

    expect(set('a')).toEqual({
      bpw: {
        base: 'a'
      }
    })
  })
})

describe('height', () => {
  it('can return breakpoint setter', () => {
    const set = setHeightBreakpoints(0)
    expect(set).toBeInstanceOf(Function)
  })

  it('can generate breakpoint-based values', () => {
    const set = setHeightBreakpoints(10, 5, 2)

    expect(set('a', 'b', 'c', 'd')).toEqual({
      bph: {
        base: 'a',
        10: 'b',
        5: 'c',
        2: 'd'
      }
    })
  })

  it('can ensure proper fallback values', () => {
    const set = setHeightBreakpoints(10, 5, 2)

    expect(set('a', 'b', 'c')).toEqual({
      bph: {
        base: 'a',
        10: 'b',
        5: 'c'
      }
    })

    expect(set('a', 'b')).toEqual({
      bph: {
        base: 'a',
        10: 'b'
      }
    })

    expect(set('a')).toEqual({
      bph: {
        base: 'a'
      }
    })
  })
})

describe('createResponsive', () => {
  it('calls through to create()', () => {
    const final = createResponsive({
      button: {
        margin: 5
      },
      input: {
        color: '#fff'
      }
    })

    expect(final).toEqual({
      _created: {
        button: {
          margin: 5
        },
        input: {
          color: '#fff'
        }
      }
    })
  })

  it('handles breakpoints', () => {
    const perWidth = setWidthBreakpoints(1000, 500, 200)
    const perHeight = setHeightBreakpoints(900, 400)

    const final = createResponsive({
      button: {
        borderSize: 0,
        border: 1,
        margin: perWidth(20, 10, 5),
        padding: perHeight(13, 7, 2)
      },
      input: {
        color: perWidth('white', 'black', 'red', 'green')
      }
    })

    expect(final).toEqual({
      _created: {
        button: {
          borderSize: 0,
          border: 1,
          margin: 20,
          padding: 13
        },
        input: {
          color: 'white'
        },
        '@media (max-width: 1000px)': {
          button: {
            margin: 10
          },
          input: {
            color: 'black'
          }
        },
        '@media (max-width: 500px)': {
          button: {
            margin: 5
          },
          input: {
            color: 'red'
          }
        },
        '@media (max-width: 200px)': {
          input: {
            color: 'green'
          }
        },
        '@media (max-height: 900px)': {
          button: {
            padding: 7
          }
        },
        '@media (max-height: 400px)': {
          button: {
            padding: 2
          }
        }
      }
    })
  })
})
