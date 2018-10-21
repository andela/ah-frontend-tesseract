import React from "react";
import PropTypes from "prop-types";

class Paginate extends React.Component {
  onClick = async pageNumber => {
    await this.props.getArticles(pageNumber);
  };

  render() {
    return (
      <ul className="pagination center">
        <FirstLastButton
          currentPage={this.props.paginationData.currentPage}
          page={1} onClick={this.onClick}
          name={"first"}/>

        {this.props.paginationData.hasPreviousPage && (
          <li id={'chevron_left'} className={ 'waves-effect waves-light' }
            onClick={ () => {
              this.onClick(this.props.paginationData.currentPage - 1);} } >
              <i className={"material-icons "}>chevron_left</i> </li> ) }

        <PaginationList {...this.props} onClick={this.onClick}/>

        { this.props.paginationData.hasNextPage &&
          <li id={ 'chevron_right' } className={ 'waves-effect waves-light' }
            onClick={() => {
              this.onClick(this.props.paginationData.currentPage + 1); } } >
            <i className="material-icons">chevron_right</i> </li> }

        <FirstLastButton
          currentPage={this.props.paginationData.currentPage}
          page={this.props.paginationData.totalPages}
          onClick={this.onClick}
          name={"last"}
        />
      </ul>
    );
  }
}

const FirstLastButton = props => {
  return (
    props.currentPage !== props.page && (
      <li className={ 'waves-effect waves-light' }>
        <a
          onClick={() => {
            props.onClick(props.page);
          }}
          style={ { backgroundColor: "#e2ebfb" } }
        >
          {props.name}
        </a>
      </li>
    )
  );
};

const PaginationList = props => {
  return (
      props.paginationData.range.map((page, index) => {
          return (
            <li
              id={`page${index}`}
              className={ 'waves-effect waves-light' }
              key={index}
              onClick={() => {
                props.onClick(page);
              }}>
              <a
                style={
                  props.paginationData.currentPage === page
                    ? PaginationStyle : null
                }>
                {page}
              </a>
            </li>
          );
        })
  );
};


Paginate.propTypes = {
  paginationData: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired
};

const PaginationStyle = {
  backgroundColor: "#039be5",
  color: "#FFFFFF"
};
export default Paginate;
