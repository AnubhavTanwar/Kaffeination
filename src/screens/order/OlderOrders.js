import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Component } from 'react';
import Container from '../../components/layout/Container'
import Header from '../../components/header/Header'
import OrderCard from './OrderCard';
import OrderEmpty from '../../components/EmptyStates/OrdersEmpty';
import { connect } from 'react-redux';
import { getRequest } from '../../utils/helper/apiHelper';
import Loader from '../../components/loader/Loader';
class OlderOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOrderEmpty: false,
            orders:[],
            loader:true,
        }
    }
    componentDidMount(){
        this.getAllOrders()
    }
    getAllOrders(){
        this.setState({loader:true})
        getRequest('order/getAllByUserId/'+this.props.data._id)
        .then(res=>{
            if(!res.err){
                this.setState({orders:res.order})
                console.log(res,"all orders details");
                this.setState({loader:false})
            }
        }).catch(e=>{
            console.log(e,'order orders');
            this.setState({loader:false})
        })
    }
    render() {
        const { orders,loader } = this.state
        return (
            <Container>
                <Header headerTitle='My Orders' />
                {loader?<Loader/>:<FlatList
                    data={orders}
                    ListEmptyComponent={<OrderEmpty />}
                    renderItem={({ item, index }) => <OrderCard order={item} />}
                    keyExtractor={(item) =>item._id}
                    showsVerticalScrollIndicator={false}
                />}
                {/* {isOrderEmpty ? <OrderEmpty /> :
                    <ScrollView>
                        <OrderCard orderStatus={"delivered"} />
                        <OrderCard orderStatus={"pending"} />
                        <OrderCard orderStatus={"canceled"} />
                    </ScrollView>} */}


            </Container>
        )
    }
}

const mapStateToProps = state => {
  return {
    data: state.AuthReducer.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // clearCart: () => dispatch({ type: 'UPDATE_CART', payload: '' }),
    // updateCart: (body) => dispatch(updateCart(body))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OlderOrders)
const styles = StyleSheet.create({
})