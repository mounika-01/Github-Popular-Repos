import './index.css'

const STARS_ICON =
  'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'
const FORKS_ICON =
  'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const OPEN_ISSUES_ICON =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png'

const RepositoryItem = props => {
  const {repoData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoData
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="stats-container">
        <img src={STARS_ICON} alt="stars" className="stat-icons" />
        <p className="stat-text">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img src={FORKS_ICON} alt="forks" className="stat-icons" />
        <p className="stat-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img src={OPEN_ISSUES_ICON} alt="open issues" className="stat-icons" />
        <p className="stat-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem