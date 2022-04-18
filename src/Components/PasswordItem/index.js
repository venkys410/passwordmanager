import './index.css'

const PasswordItem = props => {
  const {details, showPasswords, onDeletePassword} = props
  const {id, website, userName, password, initialBg} = details
  const initial = userName ? userName[0].toUpperCase() : ''

  const initialBgColor = `initial-container ${initialBg}`

  const onDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="item-card-container">
      <div className="card">
        <div className="initial-details-container">
          <div className={initialBgColor}>
            <p className="initial">{initial}</p>
          </div>
          <div className="details-container">
            <p className="website">{website}</p>
            <p className="username">{userName}</p>
            {!showPasswords && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars"
              />
            )}
            {showPasswords && <p className="username">{password}</p>}
          </div>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={onDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
