import { useState, forwardRef, useImperativeHandle} from 'react'

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
        return (<button onClick={toggleShow}>{props.text}</button>)
    }

    return(
        <div>
            {props.children}
            <button onClick={toggleShow}>cancel</button>
        </div>
    )
})

export default Toggleable