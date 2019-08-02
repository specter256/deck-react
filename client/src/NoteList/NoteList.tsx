import React from 'react';

import NoteItem from '../NoteItem/NoteItem';
import './NoteList.scss';

interface NoteListProps {
  notes: any;
}

interface NoteListState {
}

export default class NoteList extends React.Component<NoteListProps, NoteListState> {
  render() {
    return (
      this.props.notes.map((note: any, index: number) => {
        return <NoteItem data={note} key={index}/>
      })
    );
  }
}
