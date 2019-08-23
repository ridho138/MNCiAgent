import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";

const BeritaDetail = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            style={{ flex: 1, height: undefined, width: undefined }}
            resizeMode="cover"
            source={require("../assets/images/image-3.jpg")}
          />
        </View>
        <View style={styles.contentView}>
          <View style={{ padding: 5 }}>
            <Text style={styles.newsDate}>12 Agustus 2019</Text>
          </View>
          <View style={{ padding: 5 }}>
            <Text style={styles.newsTitle}>MNC Insurance Sediakan Asuransi Kendaraan Bermotor bagi Nasabah JTO Finance</Text>
          </View>
          <View style={{ padding: 5 }}>
            <Text style={styles.newsContent}>
            JAKARTA, iNews.id - PT MNC Asuransi Indonesia (MNC Insurance) dan PT JTrust Olympindo Multi Finance menjalin kerja sama penyediaan asuransi kendaraan bermotor. Nasabah JTO Finance nantinya mendapatkan perlindungan asuransi dari MNC Insurance.
            {"\n"}"Perjanjian kerja sama ini tentu saja sejalan dengan rencana kerja MNC Insurance, di mana bidang multifinance menjadi salah satu fokus utama kami dalam mengembangkan perusahaan," ujar President Director MNC Insurance Sylvy Setiawan di MNC Financial Center, Jakarta, Rabu (15/5/2019).
            {"\n"}JTO Finance merupakan perusahaan pembiayaan kendaraan bermotor baik baru maupun bekas sedangkan MNC Insurance perusahaan penyedia jasa asuransi termasuk kendaraan bermotor. Kerja sama ini dinilai akan menguntungkan kedua perusahaan di samping konsumen.
            {"\n"}"Debitur JTO Finance kini dapat kami layani dengan fitur-fitur layanan kami mulai dari pelayanan call center 24 jam, pengajuan claim melalui aplikasi, perbaikan di bengkel-bengkel unggulan kami dan pelayanan cepat yang selama ini telah diberikan oleh bagian claim kami," kata Sales and Marketing Director MNC Insurance Rinawati.
            {"\n"}Seremoni penandatanganan perjanjian kerja sama ini dilakukan oleh Sylvy Setiawan selaku President Director MNC Insurance dan Kazuyuki Matsuoka selaku President Director JTO Finance dengan disaksikan oleh Board of Directors MNC Financial Services.
            {"\n"}MNC Insurance sebagai bagian dari MNC Financial Services mencatat kinerja positif pada tahun lalu dengan pertumbuhan premi bruto 24 persen. Hal ini juga sejalan dengan meningkatnya laba perusahaan sebesar 47 persen.
            {"\n"}"Pertumbuhan kami di tahun 2018 tentu saja akan terus kami jaga dengan memberikan pelayanan yang terbaik dan meningkatkan kualitas risiko yang kami terima. Hal ini untuk memastikan kelangsungan perusahaan yang stabil dan kemampuan kami untuk memberikan perlindungan atas risiko-risiko konsumen kami," kata Sylvy.
            {"\n"}Asuransi kendaraan bermotor MNC Insurance juga dapat dinikmati oleh konsumen ritel melalui pembelian langsung maupun secara online.
            {"\n"}Selain itu, MNC Insurance juga memberikan perlindungan melalui produk- produk asuransi lainnya seperti MNC Travel Express (asuransi perjalanan), MNC Personal Accident (Asuransi Kecelakaan Diri) maupun MNC Family Care (asuransi kecelakaan diri keluarga).
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143360"
  },
  imageView: {
    width: "100%",
    height: (Dimensions.get("window").height * 1) / 4
  },
  contentView: {
    width: "100%",
    //height: (Dimensions.get("window").height * 3) / 4,
    padding: 15
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  newsDate: {
    fontSize: 12,
    color: "white"
  },
  newsContent: {
    fontSize: 14,
    color: "white"
  }
});

export default BeritaDetail;
