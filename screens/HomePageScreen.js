import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';


export default function HomePage(){

  const [properties, allPropertyDatas] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    getAllProperties();
  }, []);

  const getAllProperties = () =>{
    axios.get("http://www.share-your-universe.com/public/api/v1/properties")
      .then((response) => {
        const propertyDatas = response.data.property;
        allPropertyDatas(propertyDatas);
    })
    .catch (error => console.log('Error'));
  }

  return (
  <ScrollView>
      <View>
        {Object.keys(properties).map((items) => {
          return (
            <Card key={items.toString()}>
             <Card.Title>{ properties[items]["parameters"][1].valueParameter == 'Appartement' ? 'Superbe ' : 'Magnifique '}
                        {properties[items]["parameters"][1].valueParameter.toLowerCase()} de {properties[items]["parameters"][3].valueParameter} pièces !</Card.Title>
            <Card.Divider/>
              <Card.Image source={{ uri: properties[items]["parameters"][8].valueParameter.toString() }}></Card.Image>
            <Card.Divider/>
              <Text style={{fontWeight: 'bold', color: 'red', textAlign: 'right'}}>{properties[items]["parameters"][0].valueParameter}€</Text>
              <Text><Text style={{fontWeight: 'bold'}}>Ville: </Text>{properties[items]["parameters"][5].valueParameter} {properties[items]["parameters"][4].valueParameter}</Text>   
              <Text><Text style={{fontWeight: 'bold'}}>Superficie: </Text>{properties[items]["parameters"][2].valueParameter}</Text>   
              <Text style={{textAlign: 'right', marginBottom: 10}}>{properties[items]["parameters"][7].valueParameter}</Text>
              <Button 
                onPress={() => navigation.navigate('PropertyDetails' , 
                  { idProperty: properties[items].idProperty,
                    prix: properties[items]["parameters"][0].valueParameter,
                    logementType: properties[items]["parameters"][1].valueParameter,
                    surface: properties[items]["parameters"][2].valueParameter,
                    nombrepiece: properties[items]["parameters"][3].valueParameter,
                    ville: properties[items]["parameters"][4].valueParameter,
                    codePostal: properties[items]["parameters"][5].valueParameter,
                    orientation: properties[items]["parameters"][6].valueParameter,
                    specificite: properties[items]["parameters"][7].valueParameter,
                    image: properties[items]["parameters"][8].valueParameter,
                  })}
                title="+ d'infos"
                color="#704EA6" />
              </Card>
              )
            }  
          )
        }   
    </View>
  </ScrollView>
  )
}