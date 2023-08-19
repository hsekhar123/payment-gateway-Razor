import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RazorpayCheckout from 'react-native-razorpay';

interface IProps {}
interface IState {
  product: {
    description: string;
    image: string;
    amount: string;
    name: string;
    category: string;
    key: string;
    currency: string;
    contact: {
      email: string;
      contact: string;
      Name: string;
    };
  };
  toggle: boolean;
  product_name: string;
  product_price: string;
}
class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      product: {
        description:
          'LED TV is a type of LCD television that uses (LEDs) to backlight the display instead of the cold cathode fluorescent lights (CCFLs).',
        image:
          'https://5.imimg.com/data5/UE/AT/BG/SELLER-74935595/pixel-80cm-32-inch-full-hd-led-tv-pxl32he--500x500.png',
        amount: '2500000',
        category: 'Elecronics',
        name: 'Pixel 80cm Full HD LED TV',
        key: 'rzp_test_5wJoStL5oqtfH3',
        currency: 'INR',
        contact: {
          email: 'himansu.panda@extwebtech.in',
          contact: '+91-9876543210',
          Name: 'Himansu Sekhar',
        },
      },
      toggle: false,
      product_name: '',
      product_price: '',
    };
  }
  handlePayment = async () => {
    const {product} = this.state;
    const options = {
      name: this.state.product_name,
      amount: `${Number(this.state.product_price)*100}`,
      key: this.state.product.key,
      currency: this.state.product.currency,
    };
    if (this.state.toggle) {
      if (this.state.product_name !== '' && this.state.product_price !== '') {
        if (isNaN(Number(this.state.product_price))) {
          Alert.alert('String are not allowed in price');
        } else {
          try {
            //@ts-ignore
            const result = await RazorpayCheckout.open(options);
            Alert.alert(`Success: ${result.razorpay_payment_id}`);
          } catch (error) {
            Alert.alert('Transaction failed');
          }
        }
      } else {
        Alert.alert('All field are required');
      }
    } else {
      try {
        //@ts-ignore
        const result = await RazorpayCheckout.open(this.state.product);
        Alert.alert(`Success: ${result.razorpay_payment_id}`);
      } catch (error) {
        Alert.alert('Transaction failed');
        console.log('falied error=>', error);
      }
    }
    this.setState({toggle: false});
  };
  toggleButton = () => {
    this.setState(prev => ({
      toggle: !prev.toggle,
    }));
  };
  render() {
    const {image, name, amount, description, category} = this.state.product;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Text style={styles.text2}>Payment App for ios</Text>
          {/* toggle button */}
          <TouchableOpacity testID="toggleBtn" onPress={this.toggleButton}>
            <Feather name="list" color={'black'} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainSect}>
          {this.state.toggle ? (
            <View
              style={{
                marginTop: 100,
                alignItems: 'center',
              }}>
              <Modal
                testID="modal"
                animationType="slide"
                transparent={true}
                visible={this.state.toggle}>
                <View style={styles.centeredView}>
                  <View style={[styles.modalView, {position: 'relative'}]}>
                    <TouchableOpacity 
                      testID='close-btn'
                      onPress={() =>
                        this.setState({toggle: !this.state.toggle})
                      }
                      style={{position: 'absolute', top: 10, right: '20%'}}>
                      <AntDesign
                        name="closecircleo"
                        color={'rgb(196, 96, 86)'}
                        size={20}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        marginVertical: 10,
                      }}>
                      <TextInput
                        testID="name"
                        onChangeText={name =>
                          this.setState({product_name: name})
                        }
                        placeholder="Enter your product name"
                        value={this.state.product_name}
                        style={{
                          width: 200,
                          borderWidth: 1,
                          padding: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginVertical: 10,
                      }}>
                      <TextInput
                        testID="amount"
                        onChangeText={amount =>
                          this.setState({product_price: amount})
                        }
                        placeholder="Enter your product price "
                        value={this.state.product_price}
                        style={{
                          width: 200,
                          borderWidth: 1,
                          padding: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                    <TouchableOpacity 
                      testID='paymentBtn'
                      onPress={this.handlePayment}
                      style={{
                        width: 200,
                        backgroundColor: 'green',
                        padding: 8,
                        alignItems: 'center',
                        borderRadius: 5,
                        marginVertical: 10,
                      }}                    
                    >
                      <Text style={{color: 'white'}}>
                        pay
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ) : (
            <View style={styles.product_contain}>
              <Image source={{uri: image}} style={styles.image} />
              <View>
                <Text>Name: {name}</Text>
                <Text>Category : {category}</Text>
                <Text>Price : {Number(amount) / 100}</Text>
                <Text>Description :{description}</Text>
              </View>
              <TouchableOpacity
                testID="pay-button"
                onPress={this.handlePayment}
                style={styles.button}>
                <Text>Pay {Number(amount) / 100}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    // backgroundColor:"rgba(230,230,230,1)"
    flex: 1,
    backgroundColor: 'rgb(223, 204, 251)',
  },
  text2: {
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: -0.48,
  },
  mainSect: {
    marginHorizontal: '5%',
    // borderWidth: 1,
    height: '90%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 130,
    resizeMode: 'contain',
  },
  product_contain: {
    width: '65%',
    flexDirection: 'column',
    borderWidth: 1,
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 8,
  },
  button: {
    marginVertical: 8,
    backgroundColor: 'rgb(228, 133, 134)',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
});
