import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Reparation } from '../../types/Reparation';
import Logo from './TNILogo.jpg';
type RepairReportType = {
  reparation: Reparation;
};

const RepairReport = ({ reparation }: RepairReportType) => {
 

  const styles = StyleSheet.create({
    page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },
    spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },
    titleContainer: {flexDirection: 'row',marginTop: 24},
    logo: { width: 90 },
    reportTitle: {  fontSize: 16,  textAlign: 'center' },
    addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
    report : {fontWeight: 'bold',fontSize: 20},
    reportNumber : {fontSize: 11,fontWeight: 'bold' ,marginTop:8 }, 
    theader : {fontSize : 10,fontStyle: 'bold',flex:1,height:20,paddingTop: 2 ,paddingLeft: 7  ,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},
    theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},
    tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},
    total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},
    tbody2:{ flex:2, borderRightWidth:1, }
  });

  const getFormattedDate = () => {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const company = {
    name: 'TNI Informatique',
    address: '21 avenue Léopold Senghor, 4000 Sousse',
    phone: '73 211 520',
  };
  const ReportTitle = () => (
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <Image style={styles.logo} src={Logo} />
          <Text style={styles.reportTitle}>{company.name}</Text>
        </View>
      </View>
  )
  const CompanyDetails = () => (
    <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
        <View>
            <Text style={styles.report}>Rapport de Reparation </Text>
            <Text style={styles.reportNumber}>Rapport N° : {reparation.callNumber} </Text>
        </View>
        <View>
            <Text style={styles.addressTitle}>{company.address}</Text>
            <Text style={styles.addressTitle}>{company.phone}</Text>
        </View>
    </View>
   </View>
  )

  const ClientDetails = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.addressTitle}>Client : M. {reparation.machine.client.name}</Text>
          <Text style={styles.addressTitle}>Machine : {reparation.machine.designation} - {reparation.machine.reference}</Text>
        </View>
        <View>
           <Text style={styles.addressTitle}>{getFormattedDate()}</Text>
        </View>
        
       
      </View>
    </View>
 )

  const Work = () => (
    <>
     <TableHead/>
     <TableBody/>
    </>
   
  )
  const TableHead = () => (
    <View style={{ width:'100%', flexDirection :'row', marginTop:20}}>
        <View style={styles.theader}>
            <Text >Travaux demandés par le client</Text>   
        </View>
        <View style={styles.theader}>
            <Text >Travaux réalisés</Text>   
        </View>
    </View>
);
// const TableHead = () => (
//   <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
//     <Text>Travaux demandés par le client</Text>
//     <Text>Travaux réalisés</Text>
//   </View>
// );

const TableBody = () => (
  
       <View style={{ width:'100%', flexDirection :'row'}}>
           <View style={styles.tbody}>
               <Text >{reparation.description}</Text>   
           </View>
           <View style={styles.tbody}>
               <Text>{reparation.descriptionTravail}</Text>   
           </View>
       </View>
);
   
  return (
    
      <Document>
        <Page size="A4" style={styles.page}>
            <ReportTitle/>
            <CompanyDetails/>
            <ClientDetails/>
            <Work/>
        </Page>
      </Document>
   
  );
};

export default RepairReport;
