
import React, { useState }  from 'react';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useAuth } from '../../providers/auth'
import Form, { TYPES } from 'react-native-basic-form';

export default function GeneratePDF() {  
  const { state, handleLogout } = useAuth()
  
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ settAdress, isSetAdress ] = useState(false)
  const [ settOwner, isSetOwner ] = useState(false)
  const [ settLodger, isSetLodger ] = useState(false)
  const [ settPiece, isSetPiece ] = useState(false)

  // Mise en forme HTML
  let header = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous"></head><body><h1>Etat des lieux</h1>`;
  let footer = `</body></html>`;

  // Options pour l\état des pages
  const options = [
    {label:"Mauvais", value: "Mauvais état"},
    {label:"Correct", value: "Etat correct"},
    {label:"Bon état", value: "Bon état"},
    {label:"Neuf", value: "Neuf"},
  ];

  // Champ du formulaire d'adresse
  const AdressFields = [
    {name: 'adress', label: 'Adresse: ', required: true, autoCapitalize: "none", autoCorrect: false },
    {name: 'adress_complement', label: 'Complément d\'adresse: ', required: true, autoCapitalize: "none", autoCorrect: false},
    {name: 'property_type', label: 'Type de bien: ', required: true, autoCapitalize: "none", autoCorrect: false},
    [
      {name: 'start_date', label: 'START DATE', required: true, type: TYPES.Date},
      {name: 'end_date', label: 'END DATE', required: true, type: TYPES.Date}
    ]
  ];
  
  // Champ du formulaire sur le propriétaire
  const OwnerFields = [
    {name: 'ownerName', label: 'Nom: ', required: true, autoCapitalize: "none", autoCorrect: false },
    {name: 'ownerTel', label: 'Téléphone: ', required: true,type:TYPES.Number},
    {name: 'ownerEmail', label: 'Email: ', required: true, type: TYPES.Email,},
  ];

  // Champ du formulaire sur le locataire
  const LodgerFields = [
    {name: 'lodgerName', label: 'Nom: ', required: true, autoCapitalize: "none", autoCorrect: false },
    {name: 'lodgerTel', label: 'Téléphone: ', required: true,type:TYPES.Number},
    {name: 'lodgerEmail', label: 'Email: ', required: true, type: TYPES.Email,},
  ];

  // Champ du formulaire sur les informations d'une piece
  const PieceFields = [
    {name: 'namePiece', label: 'Nom de la pièce: ', required: true, autoCapitalize: "none", autoCorrect: false },
    {name: 'ground_condition', label: 'Etat du sol', required: true, type: TYPES.Dropdown, options: options},
    {name: 'wall_condition', label: 'Etat des murs', required: true, type: TYPES.Dropdown, options: options},
    {name: 'ceiling_condition', label: 'Etat du plafond', required: true, type: TYPES.Dropdown, options: options},
    {name: 'plinth_condition', label: 'Etat des plinthes', required: true, type: TYPES.Dropdown, options: options},
    {name: 'notePiece', label: 'Note pour cette pièce: ', required: true, autoCapitalize: "none", autoCorrect: false },
  ];

  async function onSubmitAll(data) {
    setLoading(true)
    try {
      if( settAdress && settOwner && settLodger && settPiece ){
        let htmlContent = header + settAdress + settOwner + settLodger + settPiece + footer;
        console.log(htmlContent)
        createAndSavePDF(htmlContent)
      } else {
        alert("Certains champs n'ont pas été validés.")
      }  
      setLoading(false)
    } catch(error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  async function onSubmitAdress(data) {
    try {
      isSetAdress(`<div style="border: 1px solid black;"><p>`+ data.adress +`</p><p>`+ data.adress_complement +`</p><p>`+ data.property_type +`</p></div>`)
    } catch(error) {
      setError(error.message)
    }
  }

  async function onSubmitOwner(data) {
    try {
      isSetOwner(`<div style="border: 1px solid black;"><p>`+ data.ownerName +`</p><p>`+ data.ownerTel +`</p><p>`+ data.ownerEmail +`</p></div>`)
    } catch(error) {
      setError(error.message)
    }
  }

  async function onSubmitLodger(data) {
    try {
      isSetLodger(`<div style="border: 1px solid black;"><p>`+ data.lodgerName +`</p><p>`+ data.lodgerTel +`</p><p>`+ data.lodgerEmail +`</p></div>`)
    } catch(error) {
      setError(error.message)
    }
  }

  async function onSubmitPiece(data) {
    try {
      isSetPiece(`<div style="border: 1px solid black;"><p>`+ data.ground_condition +`</p><p>`+ data.wall_condition +`</p><p>`+ data.ceiling_condition +`</p><p>`+ data.plinth_condition+ `</p><p>`+ data.notePiece+ `</p></div>`)
    } catch(error) {
      setError(error.message)
    }
  }

  const createAndSavePDF = async (html) => {
    Print.printToFileAsync({
      html: html,
    }).then((filepath) => {
      Sharing.shareAsync(filepath.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Et voilà votre PDF",
        UTI: "com.adobe.pdf",
      });
    });
  };
  return(
    <ScrollView>    
      <View style={styles.container}>
      <Text style={styles.title}>Etat des lieux</Text>
        <View style={ settAdress ? [styles.subContainerValidate] : [styles.subContainer]}>  
        <Text style={styles.subTitle}>Informations sur la propriété</Text>    
          <Form
            fields={AdressFields}
            title={'Valider'}
            loading={loading}
            error={error}
            onSubmit={onSubmitAdress}
            />
        </View>
        <View style={ settOwner ? [styles.subContainerValidate] : [styles.subContainer]}>  
          <Text style={styles.subTitle}>Partie propriétaire</Text>
            <Form
              fields={OwnerFields}
              title={'Valider'}
              loading={loading}
              initialData={state.user}
              error={error}
              onSubmit={onSubmitOwner}
              />      
        </View>
        <View style={ settLodger ? [styles.subContainerValidate] : [styles.subContainer]}>  
          <Text style={styles.subTitle}>Partie locataire</Text>
            <Form
              fields={LodgerFields}
              title={'Valider'}
              loading={loading}
              initialData={state.user}
              error={error}
              onSubmit={onSubmitLodger}
              />      
        </View>
        <View style={ settPiece ? [styles.subContainerValidate] : [styles.subContainer]}>  
          <Text style={styles.subTitle}>Piece N° 1</Text>
            <Form
              fields={PieceFields}
              title={'Valider'}
              loading={loading}
              initialData={state.user}
              error={error}
              onSubmit={onSubmitPiece}
              />      
        </View>
        <Button
        title="Générer l'état des lieux"
        onPress={onSubmitAll}
        color="#704EA6"
        style={styles.generate}
        />
      </View>  
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingTop: 50,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: '#704EA6',
      marginBottom: 10,
    },
    subContainer: {
      borderWidth: 1, 
      borderColor: 'red',
      width: 350,
      padding: 20,
      marginBottom: 10,
    },
    subContainerValidate: {
      borderWidth: 1, 
      borderColor: 'green',
      width: 350,
      padding: 20,
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 18,
      color: '#704EA6',
    },
    error: {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24, 
    },
    generate: {
      width: 350,
      color: 'red',
    },
  });