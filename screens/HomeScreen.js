import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';


export default class HomeScreen extends React.Component {
    constructor(){
    super();
    this.state={
        text:'',
        displayText:'',
        isSearchPressed:false,
        word:'',
        lexicalCategory:'',
        examples:[],
        defination:""
    }
    }
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
        return fetch(url)
        .then((data)=>{
            if(data.status===200){
                return data.json
            }
            else{
                return null
            }
        })
        .then((response)=>{
            var responseObject=response
        if(responseObject){
          var wordData=responseObject.definitions[0]
          var definition=wordData.description
          var lexicalCategory=wordData.wordtype
          this.setState({
              "word":this.state.text,
              "definition":definition,
              "lexicalCategory":lexicalCategory
          })
        }
        else{
            this.setState({
                "word":this.state.text,
                "definition":"Not found",
            })
        }
        })
    }
  render(){
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox} onChangeText={(text)=>{
          this.setState({
            text:text,
            displayText:'',
            isSearchPressed:false,
            word:'',
            lexicalCategory:'',
            examples:[],
            defination:""
          })
      }}
      value={this.state.text}/>
    <TouchableOpacity style={styles.searchButton} onPress={()=>{
        this.setState({isSearchPressed:true});
        this.getWord(this.state.text)
    }}>Search</TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
});
