import React from 'react';
import axios from 'axios';

import './Navbar.scss';
import NoteList from '../NoteList/NoteList';
import SplitPane from 'react-split-pane';
import { MdNote, MdImage } from "react-icons/md";

interface NavbarProps {
}

interface NavbarState {
  notes: any;
}

export default class NavBar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: any) {
    super(props);

    this.state = {
      notes: []
    }

    this.fetchNotes();
  }

  fetchNotes = () => {
    var that = this;

    axios.get('api/notes')
      .then(response => {
        that.setState({
          notes: response.data
        });
      })
      .catch(error => {
        console.log('error:', error);
      });
  }

  fetchImages = () => {}

  render() {
    return (
      <nav>
        <SplitPane split="horizontal" minSize={250} defaultSize={250}>
          <div className="links">
            <ul>
              <li><MdNote/><button onClick={() => this.fetchNotes()}>Notes</button></li>
              <li><MdImage/><button onClick={() => this.fetchImages()}>Images</button></li>
            </ul>
          </div>
          <div>
            <NoteList notes={this.state.notes}/>
          </div>
        </SplitPane>
      </nav>
    );
  }
}
