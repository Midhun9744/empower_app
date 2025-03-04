import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {List, Divider, Button, Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../../../context/userContext';
import Colors from '../../../../utils/colors';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {LanguageContext} from '../../../../context/languageContext';

const SettingsListComponent = () => {
  const {dispatchUserEvent} = useContext(UserContext);
  const {t} = useTranslation();
  const {language, changeLanguage} = React.useContext(LanguageContext);
  
 const nav = useNavigation<StackNavigationProp<HomeStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Settings" color={Colors.white} />
      </Appbar.Header>

      {/* Settings Menu */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {/* Language Selection */}
        <TouchableOpacity
          onPress={() => changeLanguage(language === 'en' ? 'ml' : 'en')}>
          <List.Item
            title={t('language')}
            description={language === 'ml' ? 'മലയാളം' : 'English'}
            left={() => <Icon name="language" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />

        {/* FAQ */}
        <TouchableOpacity onPress={() => alert('FAQ section coming soon!')}>
          <List.Item
            title="FAQ"
            left={() => <Icon name="help-outline" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />
        

        {/* Terms & Policies */}
        <TouchableOpacity
          onPress={() => alert('Terms & Policies coming soon!')}>
          <List.Item
            title="Terms & Policies"
            left={() => <Icon name="description" size={24} color="#007BFF" />}
            right={() => <Icon name="chevron-right" size={24} color="#777" />}
          />
        </TouchableOpacity>
        <Divider />
      </ScrollView>

      {/* Logout Button at the Bottom */}
      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          icon="logout"
          buttonColor="#904e4e"
          textColor="#fff"
          onPress={() => dispatchUserEvent('LOGOUT', {})}>
          {t('logout')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: Colors.primary, // Header background color
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
});

export default SettingsListComponent;
