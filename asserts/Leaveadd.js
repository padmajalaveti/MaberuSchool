import { StyleSheet, View, Text, Image, Dimensions, ScrollView,Alert } from 'react-native';
import { useTheme, Card, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Leaveadd({navigation}) {

    const { colors } = useTheme();
    const home=()=>{
        navigation.navigate("Teacherpendingleave")
    }
    const [leavevalue, setleaveValue] = useState(null);

    const [leavedate, setleavedate] = useState(new Date())
    const [openn, setOpenn] = useState(false)
    const [leavedata, setleavedata] = useState("")

    const [date, setdate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [data, setdata] = useState("")


    const dataa = [
        { label: 'Casual leave', value: '1' },
        { label: 'Medical leave', value: '2' },
        { label: 'general leave', value: '3' },
    ];

    const [day, setday] = useState("")
    const daydetails = (name) => {
        setday(name)
        console.log(name);
    }
    const [reason, setreason] = useState("")
    const reasondetails = (name) => {
        setreason(name)
        console.log(name);
    }
    const [id, setid] = useState("")
    const iddetails = (name) => {
        setid(name)
        console.log(name);
    }
    const [accesstoken, setaccessToken] = useState("")
    const [refreshtoken, setrefreshToken] = useState("")
    
    const getuserdata = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshtoken = await AsyncStorage.getItem("refreshtoken");
        setaccessToken(accessToken);
        setrefreshToken(refreshtoken);
    }

    const handleGetStarted2 = async () => {
                try {
                    const response = await fetch('http://10.0.2.2:3000/user/create_User', {
                        method: 'POST',
                        body: JSON.stringify({
                            first_name: name,
                            gender: gender,
                            mobile_number:mobilenumber,
                            joining_date:joindate,
                            emergencycontact:relationmobilenumber,
                            role:rolename,
                            Address:address
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log("done2", response)
                    if (!response.ok) {
                        throw new Error('Failed to details. Status: ' + response.status);
                    }
                    const data = await response.json();
                    console.log("Non-Teaching details created ===> ", data)
                    if (data.success) {
                        // Show alert box
                        Alert.alert("Non-Teaching Details Created Successfully");
                        // Navigate to Sectiondetails screen
                        navigation.navigate('home');
                    } else {
                        Alert.alert("Error in creating the student details");
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

    return (

        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: colors.primary, }}>

                    

                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginTop: 17, marginStart: 14, left: 6 }}>Apply Leave Type</Text>

                    <View >
                        <Dropdown
                                                style={[styles.dropdown,{borderBottomColor: colors.text,borderColor: colors.text  }]}
                                                placeholderStyle={[styles.placeholderStyle,{color: colors.text}]}
                                                selectedTextStyle={[styles.selectedTextStyle,{color:  colors.text}]}
                            
                            inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={dataa}
                            search
                            maxHeight={400}
                            labelField="label"
                            valueField="value"
                            placeholder="Apply Leave Type"
                            searchPlaceholder="Search..."
                            value={leavevalue}
                            onChange={item => {
                                setleaveValue(item.value);
                            }}
                        // renderLeftIcon={() => (
                        //     <Icon style={styles.icon} color="black" name="safety-goggles" size={20} />
                        // )}
                        />
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginTop: 18, marginStart: 14, left: 6 }}>ID</Text>
                    <TextInput textColor={colors.text} placeholderTextColor={colors.text} onChangeText={iddetails} value={id} style={{ width: '87%', borderColor: colors.background, borderWidth: 1, backgroundColor: colors.primary, marginTop: 11, alignSelf: 'center', }}></TextInput>

                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.text, marginTop: 17, marginStart: 14, left: 6 }}> Leave Date</Text>

                    <Text style={{ fontSize: 15, color: colors.text, marginTop: 17, marginStart: 14, left: 6 }}> From</Text>

                    <View style={{ justifyContent: 'center', alignSelf: 'center', width: '87%', flexDirection: 'row', borderColor: colors.text, borderWidth: 1, marginTop: 5 }}>
                        <Icon name='calendar-month-outline' color={colors.bg} size={25} style={{ borderRadius: 18, alignSelf: 'center' }} onPress={() => { setOpenn(true) }} />
                        <TextInput disabled textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeUnderlineColor={'transparent'} underlineColor={'transparent'} placeholder='start date' style={{ fontSize: 18, width: '80%', backgroundColor: 'transparent', alignSelf: 'center', }}>{leavedata ? leavedate.toLocaleDateString() : ""}</TextInput>

                        <DatePicker
                            modal
                            open={openn}
                            mode='date'
                            date={leavedate}
                            onConfirm={(date) => {
                                setOpenn(false)
                                setleavedate(date)
                                setleavedata(date)
                                console.log("==========>" + date)
                            }}
                            onCancel={() => {
                                setOpenn(false)
                            }}>
                        </DatePicker>

                    </View>


                    <Text style={{ fontSize: 15, color: colors.text, marginTop: 17, marginStart: 14, left: 6 }}> To</Text>


                    <View style={{ justifyContent: 'center', alignSelf: 'center', width: '87%', flexDirection: 'row', borderColor: colors.text, borderWidth: 1, marginTop: 5 }}>
                        <Icon name='calendar-month-outline' color={colors.bg} size={25} style={{ borderRadius: 18, alignSelf: 'center' }} onPress={() => { setOpen(true) }} />
                        <TextInput disabled textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeUnderlineColor={'transparent'} underlineColor={'transparent'} placeholder='End date' style={{ fontSize: 18, width: '80%', backgroundColor: 'transparent', alignSelf: 'center', }}>{data ? date.toLocaleDateString() : ""}</TextInput>

                        <DatePicker
                            modal
                            open={open}
                            mode='date'
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setdate(date)
                                setdata(date)
                                console.log("==========>" + date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}>
                        </DatePicker>

                    </View>

                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginTop: 18, marginStart: 14, left: 6 }}>Number Of Days</Text>
                    <TextInput textColor={colors.text} placeholderTextColor={colors.text} onChangeText={daydetails} value={day} style={{ width: '87%', borderColor: colors.background, borderWidth: 1, backgroundColor: colors.primary, marginTop: 11, alignSelf: 'center', }}></TextInput>

                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginTop: 17, marginStart: 14, left: 6 }}>Enter Reason</Text>

                    <View style={{ marginTop: 5, marginStart: 5 }}>
                        <TextInput textColor={colors.text} placeholderTextColor={colors.text} multiline={true} onChangeText={reasondetails} value={reason} style={{ marginTop: 8, width: '87%', minHeight: 100, borderColor: colors.background, borderWidth: 1, backgroundColor: colors.primary, alignSelf: 'center', }}></TextInput>
                    </View>

                 
 <Button textColor={colors.text} buttonColor={colors.bg} labelStyle={{ fontSize: 17, color: colors.text, fontWeight: 'bold' }} style={{ width: '52%', height: 55, borderColor: colors.primary, justifyContent: "center", alignSelf: 'center', borderRadius: 10, margin:9}} onPress={handleGetStarted2}>
                        APPLY
                    </Button >
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown: {

        width: '89%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.7,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 57,
        marginTop: 20,
    },
    icon: {
        margin: 10,


    },
    placeholderStyle: {
        fontSize: 16,
        height: 20,
        color: 'black',
        alignSelf: 'center',
        justifyContent: 'center', marginStart: 5,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
        marginStart: 6, fontWeight: '500'
    },
    // iconStyle: {
    //     width: 20,
    //     height: 20,
    // },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});


