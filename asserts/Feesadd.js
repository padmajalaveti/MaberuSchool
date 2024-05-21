import React, { useState, useEffect } from 'react';
 import { View, Text, StyleSheet, FlatList, Dimensions,Image, SafeAreaView, ScrollView } from 'react-native';
import { Card, useTheme, Button, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export default function Feesadd({navigation}) {
    const{colors}=useTheme();
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={{flex:1,backgroundColor:colors.primary,height:Dimensions.get('window').height}}>

      <View style={{ flexDirection: 'row', marginTop: 23, width: "96%", alignSelf: 'center', justifyContent: 'center', columnGap: 8, marginStart: 3 }}>
                        <Card style={{ width: "40%", height: 140 ,backgroundColor:colors.background}}onPress={()=>navigation.navigate('Createfee')}>

                        <Icon name='finance' color={colors.bg} size={40} style={{ marginTop: 10, justifyContent: 'center', alignSelf: 'center', height: 44 }}></Icon>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 13, color: colors.primary }}>Create</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 5, color: colors.primary }}>Fees type</Text>

                        </Card>

                        <Card style={{ width: "40%", height: 140, marginStart: 13,backgroundColor:colors.background }}onPress={()=>navigation.navigate('Feesview')}>
                        <Icon name='cash-multiple' color={colors.bg} size={40} style={{ marginTop: 10, justifyContent: 'center', alignSelf: 'center', height: 44 }}></Icon>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 13, color: colors.primary }}>Fees</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 5, color: colors.primary }}>payment</Text>


                        </Card>

                       

                    </View>


      </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}