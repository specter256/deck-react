import React from 'react';
import SplitPane from 'react-split-pane';
import { MdNote, MdImage } from "react-icons/md";

import { Note } from 'interfaces/interfaces';
import NoteList from 'components/NoteList/NoteList';

import './Navbar.scss';

type NavbarProps = {
  fetchNotes: () => Promise<void>;
  delNote: () => Promise<void>;
  loading: boolean;
  notes: Note[];
}

type NavbarState = {
}

export default class NavBar extends React.Component<NavbarProps, NavbarState> {
  fetchNotes = () => {
    this.props.fetchNotes();
  }

  fetchImages = () => {
  }

  render() {
    const { loading, notes } = this.props;

    return (
      <nav>
        <SplitPane
          split="horizontal"
          minSize={250}
          defaultSize={250}
          pane2Style={{ overflow: 'hidden' }}
          resizerStyle={{ background: 'none' }}>
          <div className="nav-links">
            <ul>
              <li><MdNote/><button onClick={() => this.fetchNotes()}>Notes</button></li>
              <li><MdImage/><button onClick={() => this.fetchImages()}>Images</button></li>
            </ul>
          </div>
          <div className="nav-notes">
            <NoteList
              notes={notes}
              fetchNotes={this.props.fetchNotes}
              delNote={this.props.delNote}/>
          </div>
        </SplitPane>
      </nav>
    );
  }
}
