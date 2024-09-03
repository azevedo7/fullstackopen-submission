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
    return (<button className='btn btn-primary' onClick={toggleShow}>{props.buttonLabel}</button>)
  }

  return(
    <div className="flex-row justify-center rounded-xl shadow-md p-4 m-4 max-w-xl mx-auto">
      {props.children}
      <button onClick={toggleShow} className='btn btn-error ml-auto'>cancel</button>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable