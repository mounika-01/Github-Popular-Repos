import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    reposList: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.fetchReposData()
  }

  updateActiveFilter = activeFilterId => {
    this.setState({activeFilterId}, this.fetchReposData)
  }

  fetchReposData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeFilterId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    try {
      const response = await fetch(apiUrl)
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = data.popular_repos.map(each => ({
          name: each.name,
          id: each.id,
          issuesCount: each.issues_count,
          forksCount: each.forks_count,
          starsCount: each.stars_count,
          avatarUrl: each.avatar_url,
        }))
        this.setState({
          reposList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFiltersList = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="language-filters-list">
        {languageFiltersData.map(eachFilter => (
          <LanguageFilterItem
            key={eachFilter.id}
            filterData={eachFilter}
            isActive={activeFilterId === eachFilter.id}
            updateActiveFilter={this.updateActiveFilter}
          />
        ))}
      </ul>
    )
  }

  renderRepositoriesList = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-heading">Popular</h1>
        {this.renderFiltersList()}
        {this.renderContent()}
      </div>
    )
  }
}

export default GithubPopularRepos