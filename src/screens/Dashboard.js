import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Animated, TouchableOpacity, Image, FlatList } from 'react-native';
import LanguageModel from '../models/languageModel';
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import estimateData from '../assets/apiData/serviceEstimateList.json'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../styles/ThemeProviderContext';
import ThemeModel from '../models/themeModel';

// theme & setTheme are the useState props, getting from Theme provider
function Dashboard({ navigation, theme ,setTheme}) {

    const {t, i18n} = useTranslation();
     // Initial value for opacity: 0
    const fadeScreen = useRef(new Animated.Value(0)).current
    // Handle Language Modal Open and Close 
    const [isLangModelOpen, setLangModel] = useState(false)
    // Handle Theme Modal Open and Close 
    const [isThemeModelOpen, setThemeModel] = useState(false)
    // Store Selected Theme and Pass it to useContext hook
    const [getSelectedLang, setSelectedLang] = useState('')
    // Here we will storing selected category by status then display list accordingly. 
    const [getSelectedStatus, setSelectedStatus] = React.useState('Closed')
    // Base on selected above value, we are filtering data and storing into it for display
    const [getSelectedStatusList, setSelectedStatusList] = React.useState([])
     // Data formate only for pie chart display purpose 
     const [pieData, setPieData] = useState([
        { x: "Closed", y: 55 },
        { x: "Open", y: 30 },
        { x: "Overdue", y: 18 }
    ])
  
     // Execute Hook 1, Execute at the initialy then execute again if value changed
    useEffect(() => {
        navigation.setOptions({
            title: t('Dashboard_Title') || 'Title Not Found',
            headerRight: (props) => <LanguageSelect nav={navigation} {...props} />,
            headerLeft: (props) => <ThemeIcon {...props} />,
        });

        prepareSelectedData();
    }, [getSelectedStatus, getSelectedLang])

    // Execute Hook 2,  whenever fadeScreen changes it's value, used for animation effect 
    useEffect(() => {
        Animated.timing(
          fadeScreen,
          {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
          }
        ).start();
      }, [fadeScreen])

    // First prepare card data for default selected chart category 
    const prepareSelectedData = () => {
        let selectedData = estimateData.estimateList.filter( item => item.status == getSelectedStatus);
        setSelectedStatusList(selectedData)
    } 

    // This will return Language icon and handle Language feature.
    const LanguageSelect = () => {
        return (
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => openLanguageModel()}>
                <Image style={{ width: 26, height: 26 }} source={require('../assets/images/lang_icon.png')} />
                <Text style={{color:'#fff', fontSize: 11}}>{t('Language')}</Text>
            </TouchableOpacity>
        );
    }

    // This will return Theme icon and handle Theme feature.
    const ThemeIcon = () => {
        return (
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => openThemeModel()}>
                <Image style={{ width: 26, height: 26 }} source={require('../assets/images/theme_logo.png')} />
                <Text style={{color:'#fff', fontSize: 11}}>{t('Theme')}</Text>
            </TouchableOpacity>
        )
    }

    // Theme Start
     const openThemeModel = () => {
        setThemeModel(true)
    }  
    const onCancelThemePressed = () => {
        setThemeModel(false);
    }
    const onThemeSelect = (item) => {
        console.log('Selected Theme:',item);
        setTheme(item)
        onCancelThemePressed();
    }
    // Theme Ends

     // Language Start
    const openLanguageModel = () => {
        setLangModel(true)
    }  
    const onCancelPressed = () => {
        setLangModel(false);
    }
    const onLangSelect = (item) => {
        console.log('Selected:',item.code);
        i18n.changeLanguage(item.code)
        setSelectedLang(item.label);
        onCancelPressed();
    }
     // Language End's

    // Set the selection from pie chart, Then display it's card list 
    const setSelectCategoryByStatus = (status) => {
        setSelectedStatus(status)
    }

    // Render Selected list card
    const renderItem = ({ item, index }) => {
        return (
        <View style={{
            height: '50%',
            width: 300,
            marginRight: SIZES.padding,
            marginLeft: index == 0 ? SIZES.padding : 0,
            borderRadius: SIZES.radius,
            backgroundColor: theme.CARD_COLOR,
            ...styles.shadow
        }}>
            {/* Title */}
            <View style={{ flexDirection: 'row', padding: SIZES.padding }}>
                <View style={{ justifyContent: 'flex-start', marginRight: SIZES.base, flex: 0.5 }}>
                    <Text style={{color: theme.TEXT_COLOR}}>{item.chassisNumber}</Text>
                </View>
                <View style={{justifyContent: 'flex-end', flex: 0.5}}>
                    <Text style={{ ...FONTS.h3, textAlign: 'right', color: theme.TEXT_COLOR }}>₹{item.price}</Text>
                </View>    
            </View>

            {/* OS Description */}
            <View style={{ paddingHorizontal: SIZES.padding }}>
                {/* Title and description */}
                <Text style={{ ...FONTS.h3, fontWeight: '700', color: theme.TEXT_COLOR }}>{item.name}</Text>
                <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                    {item.regNumber}
                </Text>

            </View>

            {/* Status */}
            <View style={{  padding: SIZES.padding }}>
                    {
                        // Open
                        item.status == 'Open' && (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{color: COLORS.green}}>'🕓'</Text>
                                    <Text style={{ marginBottom: SIZES.base, color: theme.TEXT_COLOR, marginLeft: 5, ...FONTS.body4 }}>{item.estimateStatus}</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: SIZES.padding }} >
                                    <TouchableOpacity style={{ backgroundColor: COLORS.green, borderRadius: 10}}>
                                        <Text style={{ color: COLORS.white,paddingRight: 7, paddingLeft: 7, ...FONTS.body3}}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    {
                        // Close
                        item.status == 'Closed' && (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>✅</Text>
                                    <Text style={{ marginBottom: SIZES.base, color: theme.TEXT_COLOR, marginLeft: 5, ...FONTS.body4 }}>{item.estimateStatus}</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: SIZES.padding }} >
                                    <TouchableOpacity style={{ backgroundColor: COLORS.green, borderRadius: 10}}>
                                        <Text style={{ color: COLORS.white,paddingRight: 7, paddingLeft: 7, ...FONTS.body3}}>Create Invoice</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    {
                        // Overdue
                        item.status == 'Overdue' && (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{color: COLORS.green}}>🐊</Text>
                                    <Text style={{ marginBottom: SIZES.base, color: COLORS.peach, marginLeft: 5, ...FONTS.body4 }}>{item.estimateStatus}</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: SIZES.padding }} >
                                    <TouchableOpacity style={{ backgroundColor: COLORS.green, borderRadius: 10}}>
                                        <Text style={{ color: COLORS.white, paddingRight: 7, paddingLeft: 7,...FONTS.body3}}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                        )
                    }
                </View>

        </View>
        
    )}
    
    // Rendering pie chart and its label only broah
    const PieChart = () => {
        return (
            <Animated.View style={{ opacity:fadeScreen, flexDirection: 'row', height: '30%', padding: 5 }}>
              <View  style={{ alignItems: 'center', justifyContent: 'center', width: '50%' }}>
                    <Svg width={SIZES.width} height={SIZES.width}>
                        <VictoryPie
                                standalone={false} // Android workaround
                                data={pieData}
                                radius={({ datum }) => (getSelectedStatus== datum.x) ? 48:52}
                                innerRadius={({ datum }) => (getSelectedStatus == datum.x) ? 85:80}
                                style={{
                                    labels: { display: 'none'},
                                }}
                                colorScale={['green','#FFD573','#FF0000']}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onPress: () => {
                                            return [{
                                                target: "labels",
                                                mutation: (props) => {
                                                    setSelectCategoryByStatus( pieData[props.index].x)
                                                }
                                            }]
                                        }
                                    }
                                }]}
                        />
                    </Svg>
                    <View style={{ position: 'absolute' }}>
                        <Text style={{ textAlign: 'center', color: theme.TEXT_COLOR }}>{t('Total')}</Text>
                        <Text style={{ textAlign: 'center', color: theme.TEXT_COLOR }}> 69 NOS </Text>
                    </View>
              </View>
              <View style={{ padding: 5, width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                 <View style={{flexDirection: 'row'}}>
                    <View style={[styles.circle, {backgroundColor: 'green'}]}></View>
                    <Text style={{color: theme.TEXT_COLOR}}>{t('Status_Close')}: 5 nos</Text>
                 </View>
                 <View style={{flexDirection: 'row'}}>
                    <View style={[styles.circle, {backgroundColor: '#FFD573',}]}></View>
                    <Text style={{color: theme.TEXT_COLOR}}>{t('Status_Open')}: 5 nos</Text>
                 </View>
                 <View style={{flexDirection: 'row'}}>
                    <View style={[styles.circle, {backgroundColor: '#FF0000',}]}></View>
                    <Text style={{color: theme.TEXT_COLOR}}>{t('Status_Overdue')}: 5 nos</Text>
                 </View>
              </View>
            </Animated.View>
        )
    }
    // Main render function
    return (
        <ScrollView style={{backgroundColor: theme.BACKGROUND_COLOR}} contentInsetAdjustmentBehavior="automatic" >
            {/* Render Pie Chart */}
            <PieChart />

            {/* Render selected title */}
            <View style={{marginBottom: 10}}>
                <Text style={{marginLeft: SIZES.padding, ...FONTS.h4, fontWeight: '700', color: theme.TEXT_COLOR}}>{getSelectedStatus == 'Closed'? t('Close_Estimate_Title'): getSelectedStatus == 'Open'? t('Open_Estimate_Title'): t('Overdue_Estimate_Title') }</Text>
            </View>

            {/* Render Pie chart selected list of card broah*/}
            {
                getSelectedStatusList.length > 0 && (
                    <FlatList
                    data={getSelectedStatusList}
                    renderItem={renderItem}
                    //keyExtractor={(index) => index + 1}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                   />
                )
            }
            
            {
                isThemeModelOpen && (
                    <ThemeModel 
                        showModel= {isThemeModelOpen}
                        onCancelPressed= { () => onCancelThemePressed()} 
                        onThemeSelect= { (item) => onThemeSelect(item)} />
                )
            }
                   
            {
                isLangModelOpen && (
                    <LanguageModel 
                        showModel= {isLangModelOpen}
                        onCancelPressed= { () => onCancelPressed()} 
                        onLangSelect= { (item) => onLangSelect(item)} />
                )
            }
           
        </ScrollView>
    )
}

export default useTheme(Dashboard);

const styles = StyleSheet.create({
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 6
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 3,
    }
})
