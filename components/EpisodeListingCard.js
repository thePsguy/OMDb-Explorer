import React from 'react';
import {
  Image, StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

export default class EpisodeListingCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      episode: props.episode
    }
  }

    render()
    {
      return (
        <View style={styles.rootContainer}>
          <Image style={styles.posterImage} source={{uri: this.state.episode.Poster}}/>
          <LinearGradient
            colors={['rgba(0,0,0,0.33)', '#0a0a0a']}
            style={styles.imageOverlay}
          />
          <Text style={styles.titleText}>
            {this.state.episode.Episode}. {this.state.episode.Title}
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>
              {this.state.episode.Plot}
            </Text>
            <View>
              <Text style={styles.smallText}>Directed By: {this.state.episode.Director}</Text>
              <Text style={styles.smallText}>Written By: {this.state.episode.Writer}</Text>
            </View>
          </View>
        </View>
      );
    }
  }

EpisodeListingCard.propTypes = {
  episode: PropTypes.object
};

const styles = StyleSheet.create({
  rootContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: "95%",
    padding: 10,
    height: 215,
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
  detailContainer: {
    marginBottom: 0,
    marginTop: 'auto'
  },
  detailText: {
    color: '#fff',
    marginBottom: 10
  },
  smallText: {
    color: '#fff',
    fontSize: 8,
  },
  flexRow: {
    flexDirection: 'row',
  }
});
