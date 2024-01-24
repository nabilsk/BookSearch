import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {TextInput, Text, ActivityIndicator, Appbar} from 'react-native-paper';
import {bookList} from '../api/index';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {setSearchListData} from '../redux/reducer/searchList';
import {COLORS} from '../constants/constant';

const width = Dimensions.get('window').width - 32;
const height = Dimensions.get('window').height;

const SearchScreen = () => {
  const {searchListData} = useSelector(state => state.searchList);
  const dispatch = useDispatch();

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const timeout = useRef(null);

  useEffect(() => {
    async function fetchMyApi() {
      await getListHandler();
    }
    fetchMyApi();
  }, []);

  // set data in redux
  const getListHandler = async () => {
    let response = await bookList();
    dispatch(setSearchListData(response.data.docs));
    setLoading(false);
  };

  // ontext change handler and event handler
  const textChangeHandler = val => {
    clearTimeout(timeout.current);
    setData(val);
    timeout.current = setTimeout(() => {
      searchHandler(val);
    }, 2000);
  };

  // for saerch handling
  const searchHandler = text => {
    if (text.trim() == '') {
      getListHandler();
    } else {
      dispatch(
        setSearchListData(
          searchListData.filter(item =>
            item.title.trim().toLowerCase().includes(text.trim().toLowerCase()),
          ),
        ),
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        //Loading...
        <View style={styles.loadingStyle}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle="light-content"
          />

          <Appbar.Header style={styles.headerStyle}>
            <Appbar.Content title="Search" color="white" />
          </Appbar.Header>

          {/**search component */}
          <View style={styles.searchView}>
            <TextInput
              mode="outlined"
              dense
              autoCorrect={false}
              autoCapitalize="none"
              label={'Search book'}
              outlineColor={'white'}
              theme={{colors: {primary: COLORS.primary}}}
              style={styles.txtInput}
              value={data}
              right={<TextInput.Icon name="magnify" color={COLORS.primary} />}
              onChangeText={val => {
                textChangeHandler(val);
              }}
            />
          </View>

          {/**flatlist render component */}
          <View style={styles.mainView}>
            {searchListData.length > 0 ? (
              <View style={styles.subView}>
                <FlatList
                  data={searchListData}
                  showsVerticalScrollIndicator={false}
                  maxToRenderPerBatch={10}
                  numColumns={2}
                  style={{}}
                  contentContainerStyle={{
                    paddingVertical: 20,
                  }}
                  ItemSeparatorComponent={() => {
                    return <View style={{height: 16}} />;
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        style={[
                          styles.touchableView,
                          {
                            marginRight: index % 2 == 0 ? 16 : 0,
                          },
                        ]}>
                        {/**image container */}
                        <View style={styles.imgContainer}>
                          <Image
                            style={styles.img}
                            resizeMode="contain"
                            source={{
                              uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
                            }}
                          />
                        </View>

                        {/* bottom part */}
                        <View style={styles.txtContainer}>
                          <Text style={styles.txtTitle}>
                            Title:{' '}
                            <Text numberOfLines={2} style={styles.txt}>
                              {item.title}
                            </Text>
                          </Text>

                          <Text style={styles.txtTitle}>
                            Author:{' '}
                            <Text
                              numberOfLines={2}
                              style={{
                                ...styles.txt,
                                flexShrink: 1,
                              }}>
                              {item.author_name}
                            </Text>
                          </Text>

                          <Text style={styles.txtTitle}>
                            Year:{' '}
                            <Text style={styles.txt}>
                              {item.first_publish_year}
                            </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>Nothing Found !!!</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
    // backgroundColor: '#F6F6F6',
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  searchView: {
    // backgroundColor: COLORS.secondry,
    // padding: 16,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  mainView: {
    // padding: 16,
    paddingHorizontal: 16,
    flex: 1,
    // backgroundColor: COLORS.secondry,
  },
  subView: {
    flex: 1,
    width: width,
  },
  txtInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  touchableView: {
    width: width / 2 - 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  imgContainer: {
    height: width / 2 - 28,
    width: '100%',
    backgroundColor: '#eee',
    flex: 2,
    padding: 6,
  },
  img: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  txtContainer: {
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  txtTitle: {color: COLORS.primary},
  txt: {
    textAlign: 'left',
    fontSize: 13,
    color: '#1A1A1A',
    fontFamily: 'Mulish-Bold',
    marginBottom: 8,
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  errorText: {
    fontSize: 20,
    color: 'black',
  },
});

export default SearchScreen;
