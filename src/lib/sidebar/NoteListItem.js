import React from "react";
import PropTypes from "prop-types";
import { selectAndLoadNote } from "../../redux/actions";
import { connect } from "react-redux";
import { MenuCard } from "../ui/Menu";
import { selectedNote, unsavedChanges } from "../../redux/selectors";
import styled from "styled-components";

import { TagView } from "../noteView";

import moment from "moment";

const HorizontalDiv = styled.div`
  display: inline-block;
`;

const TagStyleContainer = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  width: 100%;
  padding: ${props => props.theme.spacing.padding};
`;

const InsetText = styled.div`
  color: ${props => props.theme.colors.insetText};
`;

class NoteListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.dispatch(selectAndLoadNote(this.props.note));
  };

  render() {
    const isActive =
      this.props.selectedNote &&
      this.props.selectedNote.uuid === this.props.note.uuid;

    const formattedDate = moment(this.props.note.updated_at).format("M/D/YY");

    let matchingTags = null;
    if (this.props.matchingTags) {
      const tagViews = this.props.matchingTags.map(tag => (
        <TagView key={tag} text={tag} />
      ));
      matchingTags = <TagStyleContainer> {tagViews} </TagStyleContainer>;
    }

    const preview = this.props.note.renderPreview();
    return (
      <MenuCard
        role="button"
        onClick={this.onClick}
        key={`${this.props.note.uuid}-note`}
        active={isActive}>
        <HorizontalDiv>{preview}</HorizontalDiv>
        <InsetText>{formattedDate}</InsetText>
        {matchingTags}
      </MenuCard>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    selectedNote: selectedNote(state),
    unsavedChanges: unsavedChanges(state)
  };
};

export default connect(mapStateToProps)(NoteListItem);
