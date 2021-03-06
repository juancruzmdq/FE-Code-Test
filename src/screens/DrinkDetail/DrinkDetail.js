import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { getDrinkDetail } from '../../store/actions';
import styles from './styles';
import IngredientsList from '../../components/IngredientsList/IngredientsList';

class DrinkDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('drink', {strDrink: 'Loading Drinks...'} ).strDrink,
        };
    };

    componentWillMount() {
        const { navigation, onComponentLoad } = this.props;
        const drinkId = navigation.getParam('drinkId', '');
        onComponentLoad(drinkId);
    }

    render() {
        const { drink } = this.props;

        if (drink) {
            return (
                <ScrollView style={styles.scrollView}>
                <View style={styles.detailContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.imageContainer}>
                           <Image style={styles.image} source={{uri: drink.strDrinkThumb}} />
                        </View>
                        <IngredientsList style={styles.ingredient} drink={drink} displayMeasures />
                        <Text style={styles.instructionsTitle}>{"\u2022"} How to prepare</Text>
                        <Text style={styles.instructions}>{drink.strInstructions}</Text>
                    </View>
                </View>
                </ScrollView>
            );    
        } else {
            return (
                <ScrollView style={styles.scrollView}>
                <View style={styles.detailContainer}>
                    <View style={styles.cardContainer}>
                        <Text>Loading Drink detail...</Text>
                    </View>
                </View>
                </ScrollView>
            );    
        }
    }
}

const mapStateToProps = state => {
    return {
        drink: state.drinks.selected,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onComponentLoad: (drinkId) => dispatch(getDrinkDetail(drinkId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetailScreen);
