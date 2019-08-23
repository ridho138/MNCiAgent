import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ClaimInfoService } from "../services/ClaimInfoService";
import Loader from "../components/Loader";
import EStyleSheet from "react-native-extended-stylesheet";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { toDate } from "../utils/Utils";
import Input from "../components/Input";

// create a component
class NewsAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [
        {
          id: "1",
          title: "MNC Insurance Sediakan Asuransi Kendaraan Bermotor bagi Nasabah JTO Finance",
          date: "12-Agustus-2019",
          content:
            "JAKARTA, iNews.id - PT MNC Asuransi Indonesia (MNC Insurance) dan PT JTrust Olympindo Multi Finance menjalin kerja sama penyediaan asuransi kendaraan bermotor. Nasabah JTO Finance nantinya mendapatkan perlindungan asuransi dari MNC Insurance. Perjanjian kerja sama ini tentu saja sejalan dengan rencana kerja MNC Insurance, di mana bidang multifinance menjadi salah satu fokus utama kami dalam mengembangkan perusahaan, ujar President Director MNC Insurance Sylvy Setiawan di MNC Financial Center, Jakarta, Rabu (15/5/2019). JTO Finance merupakan perusahaan pembiayaan kendaraan bermotor baik baru maupun bekas sedangkan MNC Insurance perusahaan penyedia jasa asuransi termasuk kendaraan bermotor. Kerja sama ini dinilai akan menguntungkan kedua perusahaan di samping konsumen. Debitur JTO Finance kini dapat kami layani dengan fitur-fitur layanan kami mulai dari pelayanan call center 24 jam, pengajuan claim melalui aplikasi, perbaikan di bengkel-bengkel unggulan kami dan pelayanan cepat yang selama ini telah diberikan oleh bagian claim kami, kata Sales and Marketing Director MNC Insurance Rinawati. Seremoni penandatanganan perjanjian kerja sama ini dilakukan oleh Sylvy Setiawan selaku President Director MNC Insurance dan Kazuyuki Matsuoka selaku President Director JTO Finance dengan disaksikan oleh Board of Directors MNC Financial Services. MNC Insurance sebagai bagian dari MNC Financial Services mencatat kinerja positif pada tahun lalu dengan pertumbuhan premi bruto 24 persen. Hal ini juga sejalan dengan meningkatnya laba perusahaan sebesar 47 persen. Pertumbuhan kami di tahun 2018 tentu saja akan terus kami jaga dengan memberikan pelayanan yang terbaik dan meningkatkan kualitas risiko yang kami terima. Hal ini untuk memastikan kelangsungan perusahaan yang stabil dan kemampuan kami untuk memberikan perlindungan atas risiko-risiko konsumen kami, kata Sylvy. Asuransi kendaraan bermotor MNC Insurance juga dapat dinikmati oleh konsumen ritel melalui pembelian langsung maupun secara online. Selain itu, MNC Insurance juga memberikan perlindungan melalui produk- produk asuransi lainnya seperti MNC Travel Express (asuransi perjalanan), MNC Personal Accident (Asuransi Kecelakaan Diri) maupun MNC Family Care (asuransi kecelakaan diri keluarga).",
          image: ""
        },
        {
          id: "2",
          title: "Title Sample 002",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "3",
          title: "Title Sample 003",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "4",
          title: "Title Sample 004",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "5",
          title: "Title Sample 005",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "6",
          title: "Title Sample 006",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "7",
          title: "Title Sample 007",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        }
      ]
    };
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={this.onNewsPress}>
      <View style={{ padding: 5 }}>
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.newsTitle}>{item.title}</Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  onLinkPress = () => {
    this.props.Navigation.navigate("Berita & Informasi");
  };

  onNewsPress = () => {
    this.props.Navigation.navigate("Berita Detail");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowTitle}>
          <View style={styles.textTitle}>
            <Text style={styles.textStyle}>News & Announcement</Text>
          </View>
          <TouchableOpacity style={styles.linkTitle} onPress={this.onLinkPress}>
            <Text style={styles.textStyle}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  rowTitle: {
    flex: 1,
    flexDirection: "row"
  },
  textTitle: {
    flex: 3
  },
  linkTitle: {
    flex: 1,
    alignItems: "flex-end"
  },
  content: {
    flex: 4
  },
  scroll: {
    flexDirection: "row"
  },
  card: {
    width: (Dimensions.get("window").width * 2) / 3,
    marginRight: 10,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5
    // paddingBottom: 10
  },
  textStyle: {
    color: "white",
    fontSize: 14
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  newsDate: {
    fontSize: 12,
    color: "grey"
  }
});

//make this component available to the app
export default NewsAnnouncement;
