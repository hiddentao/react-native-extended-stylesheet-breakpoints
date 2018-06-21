import EStyleSheet from 'react-native-extended-stylesheet'

const _appendToKey = (obj, key, data) => {
  // eslint-disable-next-line no-param-reassign
  obj[key] = Object.assign({}, obj[key], data)
}

const _buildSetter = (id, points) => (base, ...values) => ({
  [id]: values.reduce((m, value, index) => {
    m[points[index]] = value

    return m
  }, { base })
})

export const setWidthBreakpoints = (...points) => _buildSetter('bpw', points)

export const setHeightBreakpoints = (...points) => _buildSetter('bph', points)

const _appendToCollector = (id, fieldName, fieldVal, bpKey, baseCollector, bpCollector) => {
  Object.keys(fieldVal[bpKey]).forEach(point => {
    if ('base' === point) {
      _appendToKey(baseCollector, id, {
        [fieldName]: fieldVal[bpKey][point]
      })
    } else {
      _appendToKey(bpCollector, point, {})
      _appendToKey(bpCollector[point], id, {
        [fieldName]: fieldVal[bpKey][point]
      })
    }
  })
}

export const createResponsive = defs => {
  const base = {}
  const widthBreakpoints = {}
  const heightBreakpoints = {}

  Object.entries(defs).forEach(([ id, def ]) => {
    Object.entries(def).forEach(([ fieldName, fieldVal ]) => {
      if (undefined !== fieldVal && null !== fieldVal) {
        if (fieldVal.bpw) {
          _appendToCollector(id, fieldName, fieldVal, 'bpw', base, widthBreakpoints)
        }
        else if (fieldVal.bph) {
          _appendToCollector(id, fieldName, fieldVal, 'bph', base, heightBreakpoints)
        }
        else {
          _appendToKey(base, id, {
            [fieldName]: fieldVal
          })
        }
      }
    })
  })

  const final = {
    ...base,
    ...(
      Object.keys(widthBreakpoints).reduce((m, point) => {
        m[`@media (max-width: ${point}px)`] = widthBreakpoints[point]

        return m
      }, {})
    ),
    ...(
      Object.keys(heightBreakpoints).reduce((m, point) => {
        m[`@media (max-height: ${point}px)`] = heightBreakpoints[point]

        return m
      }, {})
    )
  }

  return EStyleSheet.create(final)
}
