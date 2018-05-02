import React from "react";
import { connect } from "react-redux";
import TagItem from "./TagItem.js";
import { noteDictToArray } from "../note/util";
import { allNotes } from "../../redux/selectors";
import styled from "styled-components";


const Container = styled.div`
  overflow-y: auto;
  flex: 2;
`;

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const noteObjectList = noteDictToArray(this.props.allNotes);
    const  set = new Set();
    for (const note of noteObjectList) {
      for(const tag of note.getTags()){
        set.add(tag);
      }
    }
    const tagList = Array.from(set).sort((tag1, tag2) => {return tag1.value.toLowerCase() >= tag2.value.toLowerCase()});
    const tagListReact = [] 
    for(const tag of tagList){
      tagListReact.push(<TagItem key={tag.uuid} tag={tag.value}/>);
    }


    return (
      <Container>
         {tagListReact}
      </Container>
    );
  }
}

TagList.propTypes = {};

const mapStateToProps = state => {
  return {
    allNotes: allNotes(state)
  };
};

export default connect(mapStateToProps)(TagList);
