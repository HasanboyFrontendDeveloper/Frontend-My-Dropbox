import './Alert.css'

const Alert = ({children}) => {
  return (
    <div className='alert'>
        <h3>{children}</h3>
    </div>
  )
}

export default Alert