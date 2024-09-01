import { useState, forwardRef, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, refs) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleShow
    }
  })

  if(!show){
    return (<button onClick={toggleShow}>{props.buttonLabel}</button>)
  }

  return(
    <div>
      {props.children}
      <button onClick={toggleShow}>cancel</button>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable