import React, { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export type ProfileStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
};

const Faq = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<ProfileStackParamList>>();

  const [expanded, setExpanded] = React.useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcome}>{t('welcome faq')}!</Text>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>{t('FAQ')}</Text>

        {/* FAQ 1 */}
        <TouchableOpacity onPress={() => toggleAccordion(0)}>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{t('faq1.question')}</Text>
          </View>
        </TouchableOpacity>
        {expanded === 0 && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{t('faq1.answer')}</Text>
          </View>
        )}

        {/* FAQ 2 */}
        <TouchableOpacity onPress={() => toggleAccordion(1)}>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{t('faq2.question')}</Text>
          </View>
        </TouchableOpacity>
        {expanded === 1 && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{t('faq2.answer')}</Text>
          </View>
        )}

        {/* FAQ 3 */}
        <TouchableOpacity onPress={() => toggleAccordion(2)}>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{t('faq3.question')}</Text>
          </View>
        </TouchableOpacity>
        {expanded === 2 && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{t('faq3.answer')}</Text>
          </View>
        )}
      </View>

      {/* Get Started Button */}
      {/* <Button
        mode="contained"
        style={styles.getStartedButton}
        onPress={() => nav.navigate('Send')}>
        {t('get started')}
      </Button> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  faqContainer: {
    width: '100%',
    marginTop: 30,
  },
  faqTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F61',
    textAlign: 'center',
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: '#F1F1F1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  faqQuestion: {
    fontSize: 18,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  faqAnswer: {
    backgroundColor: '#FFE2E0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  faqAnswerText: {
    fontSize: 16,
    color: '#555',
  },
  getStartedButton: {
    marginTop: 20,
    width: '80%',
    borderRadius: 8,
  },
});

export default Faq;
