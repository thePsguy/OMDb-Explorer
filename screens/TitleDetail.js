import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'expo';
import ListingCard from '../components/ListingCard';
import EpisodeListingCard from '../components/EpisodeListingCard';
import Keys from '../constants/Keys';
import PropTypes from 'prop-types';
const axios = require('axios');
import { LinearGradient } from 'expo';

export default class TitleDetail extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      imdbID: this.props.navigation.getParam("imdbID"),
      season: this.props.navigation.getParam("season"),
      titleData: {},
      seasonData: {},
      episodes: []
    };
    this.episodes = []
  }

  fetchFromOmdb(imdbID, season, episode, callback) {
    let requestParams = {};
    requestParams[Keys.params.apiKey] = Keys.apiKey;
    requestParams[Keys.params.imdbID] = imdbID;
    season && (requestParams[Keys.params.season] = season);
    episode && (requestParams[Keys.params.episode] = episode);
    let self = this;
    axios.get(Keys.baseUrl, {
      params: requestParams
    })
      .then(function (response) {
        callback(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    this.fetchFromOmdb(this.state.imdbID, null, null, (titleData) => {
      this.setState({titleData});
    });
    this.fetchFromOmdb(this.state.imdbID, this.state.season, null, (seasonData) => {
      this.setState({seasonData});
      seasonData.Episodes.map((item, index) => {
        this.fetchFromOmdb(this.state.imdbID, this.state.season, item.Episode, (data) => {
          this.episodes.push(data);
          this.episodes.sort((a, b) => a.Episode > b.Episode);
          this.setState({episodes: this.episodes});
        })
      })
    });
  }

  render() {
    const titleData = this.state.titleData;
    console.log(this.state.seasonData);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
          <Icon.Ionicons
            name={"md-arrow-back"}
            size={32}
            color={'#fff'}
          />
        </TouchableOpacity>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.topBannerContainer}>
            <Image source={{uri: titleData.Poster}} style={styles.topBannerImage} />
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', '#0a0a0a']}
              style={styles.imageOverlay}
            />
            <View style={styles.headerContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{titleData.Title}</Text>
                <Text style={styles.yearText}>{titleData.Year}</Text>
                <Text style={styles.plotText}>{titleData.Plot}</Text>
              </View>
              <View style={styles.detailContainer}>
              <Text style={styles.genreText}>{titleData.Genre}</Text>
              <Text style={styles.detailText}>{titleData.Runtime}</Text>
                <View style={styles.flexRow}>
                  <Icon.Ionicons
                    name={"md-star"}
                    size={10}
                    color={'#fcfc4b'}
                  />
                  <Text style={styles.detailText}>{titleData.imdbRating}</Text>
                </View>
              </View>
            </View>
          </View>
          {this.state.episodes.map((e, i) => {
            return <EpisodeListingCard episode={e} key={i}/>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0a',
  },
  contentContainer: {
    // paddingTop: 30,
    opacity: 1,
  },
  backButton: {
    left: 20,
    top: 30,
    width: 32,
    position: 'absolute',
    zIndex: 2,
  },
  topBannerContainer: {
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    zIndex: 2,
    backgroundColor: '#000',
    marginBottom: 30,
  },
  topBannerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    // backgroundColor: '#0a0a0a',
    // opacity: 0.85,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  headerContent: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute'
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
  },
  titleContainer: {
    top: '50%'
  },
  titleText: {
    color: '#fff',
    fontSize: 27,
  },
  yearText: {
    color: '#9a9a9a',
  },
  detailContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    top: 'auto',
    // alignContent: 'space-around'
  },
  plotText: {
    color: '#fff',
  },
  genreText: {
    color: '#fff',
    flex: 5,
  },
  detailText: {
    color: '#fff',
    flex: 1,
  }
});

TitleDetail.propTypes = {
  imdbID: PropTypes.string,
  season: PropTypes.number
};
