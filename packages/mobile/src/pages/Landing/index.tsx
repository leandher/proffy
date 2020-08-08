import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import purpleHeart from '../../assets/images/icons/heart.png';
import api from '../../services/api';

interface TotalConnectionResponse {
  total: number;
}

const Landing: React.FC = () => {
  const { navigate } = useNavigation();
  const [total, setTotal] = useState(0);

  const handleNavigateToGivenClasses = () => {
    navigate('GiveClasses');
  };

  const handleNavigateToStudyPages = () => {
    navigate('Study');
  };

  useEffect(() => {
    const getTotalConnections = async () => {
      const { data } = await api.get<TotalConnectionResponse>('connections');

      setTotal(data.total);
    };

    getTotalConnections();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyPages}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGivenClasses}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {total} conexões já realizadas <Image source={purpleHeart} />
      </Text>
    </View>
  );
};

export default Landing;
