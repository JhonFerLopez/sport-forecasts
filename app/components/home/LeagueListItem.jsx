import { useNavigation } from '@react-navigation/native';
import { Block, Text, theme } from 'galio-framework'; // Asumiendo que usas Galio
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('screen');

const LeagueListItem = ({ league, horizontal, full, style, countryColor, imageStyle }) => {
  const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('LeagueDetailsScreen', { league: league });
  };

  return (
    <Block row={horizontal} card flex style={[styles.league, styles.shadow, style]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Block flex style={[styles.imageContainer]}>
          <Image source={{ uri: league.logo }} style={imageStyles} resizeMode="contain"/>
        </Block>
      </TouchableOpacity>
      <TouchableOpacity  onPress={handlePress} activeOpacity={0.8}>
        <Block flex space="between" style={styles.leagueDescription}>
          <Text size={14} style={styles.leagueTitle}>
            {league.shortName || league.name}
          </Text>
          <Text size={12} muted={!countryColor} color={countryColor}>
            {league.country} - {league.name}
          </Text>
          <Text size={12} muted={!countryColor} color={countryColor}>
            año: - {league.start_date}
          </Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default LeagueListItem;

const styles = StyleSheet.create({
  league: {
    flexDirection: 'row', // Esto asegura la dirección horizontal
    alignItems: 'center',
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    minHeight: 114,
  },
  leagueTitle: {
    fontWeight: 'bold',
  },
  leagueDescription: {
    flex: 1, // Toma el resto del espacio disponible
    justifyContent: 'center',
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
  },
  horizontalImage: {
    height: 90,
    width: 90, 
  },
  fullImage: {
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});