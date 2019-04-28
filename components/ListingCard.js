import React from 'react';
import {
  Image, StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Keys from '../constants/Keys';
import { LinearGradient } from "expo";
const axios = require('axios');

export default class ListingCard extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  fetchFromOmdb(imdbID) {
    let requestParams = {};
    requestParams[Keys.params.apiKey] = Keys.apiKey;
    requestParams[Keys.params.imdbID] = this.props.imdbID;
    requestParams[Keys.params.season] = this.props.seasonNumber;
    requestParams[Keys.params.episode] = this.props.episodeNumber;
    let self = this;
    axios.get(Keys.baseUrl, {
      params: requestParams
    })
      .then(function (response) {
        self.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    this.fetchFromOmdb(this.props.imdbID);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Image style={styles.posterImage} source={{ uri: this.state.data.Poster }} />
        <LinearGradient
          colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.9)']}
          style={styles.imageOverlay}
        />
        <Text style={styles.titleText}>
          {this.state.data.Title}
        </Text>
      </View>
    );
  }
}

ListingCard.propTypes = {
  imdbID: PropTypes.string,
  seasonNumber: PropTypes.number,
  episodeNumber: PropTypes.number,
};

const styles = StyleSheet.create({
  rootContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: "95%",
    padding: 10,
    height: 200,
    backgroundColor: 'black',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden'
  },
  posterImage: {
    position: 'absolute',
    resizeMode: 'cover',
    zIndex: -1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleText: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 27,
  },
  imageOverlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
});
