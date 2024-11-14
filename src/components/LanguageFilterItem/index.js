import './index.css'

const LanguageFilterItem = props => {
  const {filterData, isActive, updateActiveFilter} = props
  const {id, language} = filterData
  const buttonClassName = isActive
    ? 'filter-button active-filter'
    : 'filter-button'

  const onClickFilter = () => {
    updateActiveFilter(id)
  }

  return (
    <li className="filter-item">
      <button type="button" className={buttonClassName} onClick={onClickFilter}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem