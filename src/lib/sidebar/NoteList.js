import React from "react";
import { connect } from "react-redux";
import { loadNotes } from "../../redux/actions";
import NoteListItem from "./NoteListItem.js";
import { Menu, MenuCardList, MenuItem } from "../ui/Menu";

const BumpedDownMenu = Menu.extend`
  padding-top: ${props => props.theme.spacing.header};
`;

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadNotes());
  }

  render() {
    const noteList = [];
    for (const uuid in this.props.allNotes) {
      const note = this.props.allNotes[uuid];
      noteList.push(<NoteListItem key={note.uuid} note={note} />);
    }

    return (
      <BumpedDownMenu>
        <MenuItem active> 🔮 Untagged </MenuItem>
        <MenuCardList> {noteList} </MenuCardList>
      </BumpedDownMenu>
    );
  }
}

NoteList.propTypes = {};

const mapStateToProps = state => {
  return { allNotes: state.notes.allNotes };
};

export default connect(mapStateToProps)(NoteList);
