import { Text, StyleSheet, View, TextInput, FlatList } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import Icon from '../../utils/icons'
import { CHARCOAL_COLOR, GRAY_COLOR, PLACEHOLDER_COLOR } from '../../utils/colors'
import { Font_Heebo_SemiBold, Font_Poppins_Bold } from '../../utils/typograpy'
import ProductHorizontalCard from '../../components/products/ProductHorizontalCard'
import { TouchableRipple } from 'react-native-paper'
import SearchEmpty from '../../components/EmptyStates/SearchEmpty'
import Filter from '../../components/filter/Filter'
import { connect } from 'react-redux'
import { postRequest, postWithBody } from '../../utils/helper/apiHelper'
import Loader from '../../components/loader/Loader'
const TABS = ["DANO", "Nestle", "Arong", "Fresh", "Frozen", "DANO", "Nestle", "Arong", "Fresh", "Frozen",]
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchEmpty: false,
      isFilterModal: false,
      key:'',
      products:[],
      tempProducts: [],
      loading:false
    }
  }
  handleSortModal = () => {
    this.setState({ isFilterModal: !this.state.isFilterModal })
  }
  headerComponent = () => {
    return (
      <FlatList
        data={this.props.searchData}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 14.89, }}
        style={{ marginBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <TouchableRipple style={{ paddingHorizontal: 20, backgroundColor: GRAY_COLOR, paddingVertical: 10, borderRadius: 9 }}
        onPress={()=>this.searchProduct(item)}>
          <Text style={{ fontSize: 12, fontFamily: Font_Heebo_SemiBold, color: "#000" }}>{item}</Text>
        </TouchableRipple>}

      />)
  }
  searchProduct(key){
    this.setState({loading:true})
    let body=JSON.stringify({
      name:key,
      storeId:this.props.storeData._id
    })
    console.log(body);
    postWithBody("product/search",body)
    .then(res=>{
      if(!res.err){
        this.setState({products:res.products,tempProducts: res.products, loading:false})
      }else{
        this.setState({products:[],loading:false})
      }
    }).catch(error=>{
      console.log(error,'search product')
      this.setState({products:[],loading:false})
    })
  }
  onSearch(key) {
    this.searchProduct(key)
    let keyWord = [];
    if (!key) {
      return;
    }
    keyWord = this.props.searchKeys.reverse();
    for (let index = 0; index < keyWord.length; index++) {
      if (keyWord[index] == key) {
        return;
      }
    }
    if (keyWord.length > 5) {
      keyWord=keyWord.reverse()
      keyWord.pop();
      keyWord=keyWord.reverse()
    }
    keyWord.push(key);

    keyWord=keyWord.reverse()
    this.props.addSearchTerms(keyWord)
  }

  filterProducts = (products) => {
    this.setState({ products })
  
  }
  render() {
    const { isSearchEmpty, isFilterModal,loading, products, tempProducts } = this.state
    return (
      <Container>
        <View style={styles.searchHeader}>
          <View>
            <Icon name='search' color={CHARCOAL_COLOR} size={25} />
          </View>
          <TextInput placeholder='Ex: Frozen' style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR} 
          onChangeText={(val)=>this.setState({key:val})}
          onEndEditing={()=>this.onSearch(this.state.key)}
          value={this.state.key}
          />
          <View>
            <Icon name='close' color={CHARCOAL_COLOR} size={25} onPress={()=>[this.setState({key:''}),this.props.navigation.goBack()]}/>
          </View>
        </View>
        {isSearchEmpty ? <SearchEmpty /> :
          <React.Fragment>
            <View style={{ flexDirection: 'row', paddingHorizontal: 14.89, alignItems: 'center', justifyContent: 'space-between', marginBottom: 23 }}>
              <Text style={{ fontSize: 20, fontFamily: Font_Poppins_Bold, lineHeight: 26, color: "#000" }}>Search Result</Text>
              <Icon name='filter' size={20} color={CHARCOAL_COLOR} onPress={this.handleSortModal} />
            </View>
            <FlatList
              ListHeaderComponent={this.headerComponent}
              ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
              contentContainerStyle={{}}
              data={this.state.products}
              renderItem={({item,index }) => <ProductHorizontalCard product={item} style={{ paddingHorizontal: 14 }} />}
              keyExtractor={item=>item._id}
            />
          </React.Fragment>
        }
        <Filter isVisible={isFilterModal} onClose={this.handleSortModal} products={tempProducts} filterProducts={(product) => this.filterProducts(product)}/>
        {loading?<Loader/>:null}
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    searchKeys: state.AuthReducer.searchKeys,
    searchData: state.AuthReducer.searchData,
    storeData: state.AuthReducer.storeData,
    state:state.AuthReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addSearchTerms: (data) =>dispatch({type:'SEARCH_DATA',payload:data},dispatch({type:'SEARCH_KEYS',payload:data})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search)
const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 14,
    backgroundColor: GRAY_COLOR,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 30

  },
  textInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    fontFamily: Font_Heebo_SemiBold,
    paddingVertical: 0
  },
})