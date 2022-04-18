import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem/index'

import './index.css'

const initialContainerBackgroundClassNames = [
  'bg-7683cb',
  'bg-f59e0b',
  'bg-10b981',
  'bg-f97316',
  'bg-14b8a6',
  'bg-b91c1c',
  'bg-0ea5e9',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onWebsiteInputChange = event => {
    this.setState({websiteInput: event.target.value})
  }

  onUsernameInputChange = event => {
    this.setState({usernameInput: event.target.value})
  }

  onInputPasswordChange = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const colorIndex = Math.ceil(
      Math.random() * (initialContainerBackgroundClassNames.length - 1),
    )
    const bgColorClass = initialContainerBackgroundClassNames[colorIndex]
    const newPasswordItem = {
      id: uuidv4(),
      website: websiteInput,
      userName: usernameInput,
      password: passwordInput,
      initialBg: bgColorClass,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordsList: filteredList})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      showPasswords,
    } = this.state
    const searchResults = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const passwordsCount = searchResults.length
    return (
      <div className="app-container">
        <div className="page-container">
          <img
            className="app-logo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="top-section">
            <form className="form" onSubmit={this.onClickAdd}>
              <h1 className="form-header">Add New Password</h1>
              <div className="input-bar-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <hr className="line" />
                <input
                  type="text"
                  className="input-bar"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onWebsiteInputChange}
                />
              </div>
              <div className="input-bar-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <hr className="line" />
                <input
                  type="text"
                  className="input-bar"
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={this.onUsernameInputChange}
                />
              </div>
              <div className="input-bar-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
                <hr className="line" />
                <input
                  type="password"
                  className="input-bar"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onInputPasswordChange}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="top-sm-image"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="top-lg-image"
            />
          </div>
          <div className="bottom-section">
            <div className="bottom-section-header">
              <h1 className="count-para">
                Your Passwords <p className="count">{passwordsCount}</p>
              </h1>
              <div className="input-bar-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <hr className="line" />
                <input
                  type="search"
                  className="input-bar"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onSearchInputChange}
                />
              </div>
            </div>
            <hr className="seperator" />
            <div className="show-element">
              <input
                type="checkbox"
                id="show-check"
                onChange={this.onClickShowPassword}
              />
              <label htmlFor="show-check" className="label-text">
                Show Passwords
              </label>
            </div>
            {passwordsCount === 0 && (
              <div className="no-items-view">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-view-image"
                />
                <p className="no-pass-para">No Passwords</p>
              </div>
            )}
            {passwordsCount !== 0 && (
              <ul className="pass-items-container">
                {searchResults.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    details={eachItem}
                    showPasswords={showPasswords}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
