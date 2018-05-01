import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { setQuery } from "../../redux/actions";



const TagItemDiv = styled.div`
  width: 100%;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: ${props => props.theme.colors.lightPrimary};
  }
  &:active {
    background: ${props => props.theme.colors.darkPrimary};
  }
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.lessPadding};
  user-select: none;
`;

class TagItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <TagItemDiv onClick={() => this.props.dispatch(setQuery(this.props.tag))}>
      {this.props.tag}
    </TagItemDiv>);
  }
}

TagItem.propTypes = {
  tag: PropTypes.string.isRequired
};

export default connect()(TagItem);