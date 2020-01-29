import React from 'react';
import { authios } from '../utils/authios';
import AddFriends from './AddFriends';
import Loader from 'react-loader-spinner'

class Friend extends React.Component {
    constructor(){
        super();
        this.state = {
            friends: []
        }
    }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    authios()
      .get('/api/friends')
      .then(res => {
        // res.data.data
        this.setState({
          friends: res.data
        });
      })
      .catch(err => console.log(err));
  };


  render() {
    console.log(this.state.friends);
    return (
      <div className="friends">
        {this.props.fetchingData && (
          <div className="load ing">
            <p>Loading Data</p>
            <Loader type="Hearts" color="#ff0000" height={80} width={80} />
          </div>
        )}
        {this.state.friends.length > 0 && (
            <div className="friends-container">
                {this.state.friends.map((elm) =>{
                    return(
                    <div className="friends-card">
                        <div>
                        {elm.name}
                        </div>
                        <div>
                            {elm.age}
                        </div>
                        <div>
                            {elm.email}
                        </div>

                    </div>

                    )
                })}
            </div>
        )}
        <div>
            <AddFriends getData={this.getData}/>
        </div>
      </div>
    );
  }
}

export default Friend;
